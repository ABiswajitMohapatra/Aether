import type {
  CrossValidation,
  FeatureImportance,
  HyperParams,
  MetricName,
  Metrics,
  ModelName,
  TaskType,
} from "@/lib/domain";
import { evaluatePredictions } from "@/lib/ml/metrics";
import { predictModel, trainModel } from "@/lib/ml/models";
import { trainTestSplit } from "@/lib/ml/preprocess";
import { validateExperimentConfig } from "@/lib/ml/registry";

export interface EngineResult {
  model: ModelName;
  params: HyperParams;
  trainMetrics: Metrics;
  testMetrics: Metrics;
  /** Null when cross-validation was skipped (disabled, or too few rows). */
  cvMetrics: CrossValidation | null;
  durationMs: number;
  featureImportance: FeatureImportance[];
  preview: { y: number[]; pred: number[] };
  coefficients: Record<string, number> | null;
}

/** Deterministic RNG, so a given seed always produces the same folds. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(length: number, seed: number) {
  const idx = Array.from({ length }, (_, i) => i);
  const rand = mulberry32(seed);
  for (let i = idx.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

/**
 * Split indices into k contiguous folds of an already-shuffled index list.
 * Every row appears in exactly one validation fold, so each row is predicted
 * exactly once across the whole procedure.
 */
function foldRanges(total: number, folds: number) {
  const base = Math.floor(total / folds);
  const remainder = total % folds;
  const ranges: Array<[number, number]> = [];
  let cursor = 0;
  for (let f = 0; f < folds; f += 1) {
    const size = base + (f < remainder ? 1 : 0);
    ranges.push([cursor, cursor + size]);
    cursor += size;
  }
  return ranges;
}

/** Number of folds, overridable with CV_FOLDS. CV_FOLDS=0 disables it. */
export function configuredFolds() {
  const raw = Number(process.env.CV_FOLDS ?? 5);
  if (!Number.isFinite(raw) || raw < 0) return 5;
  if (raw === 0) return 0;
  return Math.min(10, Math.max(2, Math.floor(raw)));
}

function meanOf(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

/** Population standard deviation across folds; 0 for a single fold. */
function stdOf(values: number[], mean: number) {
  if (values.length < 2) return 0;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

/**
 * k-fold cross-validation over the FULL dataset.
 *
 * This is an additional, more reliable estimate; it does not replace or modify
 * the 80/20 holdout numbers the rest of the app already reports. Metrics are
 * whatever `evaluatePredictions` produces for the task, so classification gets
 * accuracy/precision/recall/F1 and regression gets RMSE/MAE/R2/MAPE with no
 * metric names hardcoded here.
 */
export function crossValidate(input: {
  model: ModelName;
  params: HyperParams;
  task: TaskType;
  X: number[][];
  y: number[];
  folds?: number;
  seed?: number;
}): CrossValidation | null {
  const requested = input.folds ?? configuredFolds();
  if (requested < 2) return null;
  const total = input.X.length;
  // Each fold must be able to hold at least one validation row and still leave
  // training rows behind.
  const folds = Math.min(requested, total);
  if (folds < 2 || total < 4) return null;

  const order = shuffled(total, input.seed ?? 42);
  const ranges = foldRanges(total, folds);
  const perFold: Metrics[] = [];
  const started = Date.now();

  for (const [from, to] of ranges) {
    const validIdx = order.slice(from, to);
    const trainIdx = [...order.slice(0, from), ...order.slice(to)];
    if (validIdx.length === 0 || trainIdx.length === 0) continue;

    // A fold whose training split lost an entire class cannot be scored
    // meaningfully; skip it rather than reporting a misleading number.
    if (input.task === "classification") {
      const trainLabels = new Set(trainIdx.map((i) => input.y[i]));
      if (trainLabels.size < 2) continue;
    }

    try {
      const trained = trainModel({
        model: input.model,
        task: input.task,
        X: trainIdx.map((i) => input.X[i]),
        y: trainIdx.map((i) => input.y[i]),
        params: input.params,
      });
      const pred = predictModel(trained, validIdx.map((i) => input.X[i]));
      perFold.push(evaluatePredictions(input.task, validIdx.map((i) => input.y[i]), pred));
    } catch {
      // A single unusable fold must not fail the experiment; the remaining
      // folds still give an estimate and `folds` reports how many were scored.
      continue;
    }
  }

  if (perFold.length < 2) return null;

  // Average only the metrics that were actually produced for this task.
  const keys = new Set<MetricName>();
  for (const fold of perFold) {
    for (const key of Object.keys(fold) as MetricName[]) {
      if (Number.isFinite(fold[key])) keys.add(key);
    }
  }

  const mean: Metrics = {};
  const std: Metrics = {};
  for (const key of keys) {
    const values = perFold
      .map((fold) => fold[key])
      .filter((value): value is number => typeof value === "number" && Number.isFinite(value));
    if (values.length === 0) continue;
    const average = meanOf(values);
    mean[key] = average;
    std[key] = stdOf(values, average);
  }

  return {
    folds: perFold.length,
    requestedFolds: requested,
    rows: total,
    mean,
    std,
    perFold,
    durationMs: Date.now() - started,
  };
}

export function runSafeExperiment(input: {
  model: string;
  params: HyperParams;
  task: TaskType;
  X: number[][];
  y: number[];
  featureNames: string[];
  seed?: number;
  /** Set to 0 to skip cross-validation for this run. */
  folds?: number;
}): EngineResult {
  const validated = validateExperimentConfig(input.model, input.params, input.task);
  const split = trainTestSplit(input.X, input.y, 0.2, input.seed ?? 42);
  const started = Date.now();
  const trained = trainModel({
    model: validated.model,
    task: input.task,
    X: split.xTrain,
    y: split.yTrain,
    params: validated.params,
  });
  const trainPred = predictModel(trained, split.xTrain);
  const testPred = predictModel(trained, split.xTest);
  const durationMs = Date.now() - started;

  const importanceSource = trained.importances ?? [];
  const total = importanceSource.reduce((sum, value) => sum + Math.abs(value), 0) || 1;
  const featureImportance = input.featureNames.map((name, i) => ({
    name,
    importance: Math.abs(importanceSource[i] ?? 0) / total,
  }));

  let coefficients: Record<string, number> | null = null;
  if (trained.weights && trained.intercept !== undefined) {
    coefficients = { intercept: trained.intercept };
    input.featureNames.forEach((name, i) => {
      coefficients![name] = trained.weights?.[i] ?? 0;
    });
  }

  // Cross-validation runs after the holdout evaluation and never overwrites it.
  const cvMetrics = crossValidate({
    model: validated.model,
    params: validated.params,
    task: input.task,
    X: input.X,
    y: input.y,
    folds: input.folds,
    seed: input.seed ?? 42,
  });

  const previewCount = Math.min(80, split.yTest.length);
  return {
    model: validated.model,
    params: validated.params,
    trainMetrics: evaluatePredictions(input.task, split.yTrain, trainPred),
    testMetrics: evaluatePredictions(input.task, split.yTest, testPred),
    cvMetrics,
    durationMs,
    featureImportance,
    preview: {
      y: split.yTest.slice(0, previewCount),
      pred: testPred.slice(0, previewCount),
    },
    coefficients,
  };
}

import type { Metrics, TaskType } from "@/lib/domain";
import { mean } from "@/lib/ml/math";

export function rmse(y: number[], pred: number[]) {
  const n = y.length;
  if (n === 0) return 0;
  let sum = 0;
  for (let i = 0; i < n; i += 1) sum += (y[i] - pred[i]) ** 2;
  return Math.sqrt(sum / n);
}

export function mae(y: number[], pred: number[]) {
  const n = y.length;
  if (n === 0) return 0;
  let sum = 0;
  for (let i = 0; i < n; i += 1) sum += Math.abs(y[i] - pred[i]);
  return sum / n;
}

export function r2Score(y: number[], pred: number[]) {
  const n = y.length;
  if (n === 0) return 0;
  const yMean = mean(y);
  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i += 1) {
    ssRes += (y[i] - pred[i]) ** 2;
    ssTot += (y[i] - yMean) ** 2;
  }
  if (ssTot === 0) return 0;
  return 1 - ssRes / ssTot;
}

export function mape(y: number[], pred: number[]) {
  const n = y.length;
  if (n === 0) return 0;
  let sum = 0;
  let count = 0;
  for (let i = 0; i < n; i += 1) {
    if (Math.abs(y[i]) < 1e-9) continue;
    sum += Math.abs((y[i] - pred[i]) / y[i]);
    count += 1;
  }
  return count === 0 ? 0 : (sum / count) * 100;
}

export interface LabelCounts {
  label: number;
  tp: number;
  fp: number;
  fn: number;
  support: number;
}

/**
 * Per-class confusion counts. The previous implementation summed tp/fp/fn across
 * every class and divided, which is micro-averaging: for single-label problems
 * micro-precision === micro-recall === accuracy, so F1 was mathematically forced
 * to equal accuracy. That made "maximize accuracy and F1" meaningless.
 */
export function perClassCounts(y: number[], pred: number[]): LabelCounts[] {
  const labels = [...new Set([...y, ...pred])].sort((a, b) => a - b);
  return labels.map((label) => {
    let tp = 0;
    let fp = 0;
    let fn = 0;
    let support = 0;
    for (let i = 0; i < y.length; i += 1) {
      if (y[i] === label) support += 1;
      if (pred[i] === label && y[i] === label) tp += 1;
      else if (pred[i] === label && y[i] !== label) fp += 1;
      else if (pred[i] !== label && y[i] === label) fn += 1;
    }
    return { label, tp, fp, fn, support };
  });
}

function safeDiv(numerator: number, denominator: number) {
  return denominator === 0 ? 0 : numerator / denominator;
}

function prf(counts: LabelCounts) {
  const precision = safeDiv(counts.tp, counts.tp + counts.fp);
  const recall = safeDiv(counts.tp, counts.tp + counts.fn);
  const f1 = precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
  return { precision, recall, f1 };
}

/**
 * Binary problems report the positive (highest-valued) class, matching the
 * scikit-learn default for `f1_score`. Multiclass problems report the macro
 * average so every class contributes equally.
 */
export function classificationMetrics(y: number[], pred: number[]): Metrics {
  const n = y.length;
  if (n === 0) return { accuracy: 0, precision: 0, recall: 0, f1: 0 };

  let correct = 0;
  for (let i = 0; i < n; i += 1) if (pred[i] === y[i]) correct += 1;
  const accuracy = correct / n;

  const counts = perClassCounts(y, pred);
  if (counts.length <= 1) {
    return { accuracy, precision: accuracy, recall: accuracy, f1: accuracy };
  }

  if (counts.length === 2) {
    const positive = counts[counts.length - 1];
    const { precision, recall, f1 } = prf(positive);
    return { accuracy, precision, recall, f1 };
  }

  let precisionSum = 0;
  let recallSum = 0;
  let f1Sum = 0;
  for (const counted of counts) {
    const scored = prf(counted);
    precisionSum += scored.precision;
    recallSum += scored.recall;
    f1Sum += scored.f1;
  }
  return {
    accuracy,
    precision: precisionSum / counts.length,
    recall: recallSum / counts.length,
    f1: f1Sum / counts.length,
  };
}

export function regressionMetrics(y: number[], pred: number[]): Metrics {
  return {
    rmse: rmse(y, pred),
    mae: mae(y, pred),
    r2: r2Score(y, pred),
    mape: mape(y, pred),
  };
}

export function evaluatePredictions(task: TaskType, y: number[], pred: number[]): Metrics {
  return task === "classification" ? classificationMetrics(y, pred) : regressionMetrics(y, pred);
}

export function metricValue(metrics: Metrics | null | undefined, name: string) {
  if (!metrics) return Number.NaN;
  const value = metrics[name as keyof Metrics];
  return typeof value === "number" ? value : Number.NaN;
}

export function isBetter(
  candidate: number,
  incumbent: number,
  optimize: "minimize" | "maximize",
) {
  if (Number.isNaN(candidate)) return false;
  if (Number.isNaN(incumbent)) return true;
  return optimize === "minimize" ? candidate < incumbent : candidate > incumbent;
}

export function formatMetric(name: string, value: number | undefined | null) {
  if (value === undefined || value === null || Number.isNaN(value)) return "â€”";
  if (name === "accuracy" || name === "precision" || name === "recall" || name === "f1" || name === "r2") {
    return value.toFixed(3);
  }
  if (Math.abs(value) >= 100) return value.toFixed(1);
  if (Math.abs(value) >= 10) return value.toFixed(2);
  return value.toFixed(4);
}

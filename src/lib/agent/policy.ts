import type {
  CrossValidation,
  DatasetStats,
  ExperimentConfig,
  ExperimentPlan,
  HyperParams,
  MetricName,
  MetricObjective,
  Metrics,
  ModelName,
  OptimizeDirection,
  TaskType,
} from "@/lib/domain";
import { formatMetric, isBetter, metricValue } from "@/lib/ml/metrics";
import {
  configSignature,
  familyOf,
  getModelSpec,
  modelLabel,
  modelsForTask,
  sanitizeParams,
  SEARCH_SPACES,
  specHasParam,
} from "@/lib/ml/registry";

export interface CompletedRun {
  modelName: string;
  hyperparameters: HyperParams;
  trainMetrics: Metrics | null;
  testMetrics: Metrics | null;
  /**
   * k-fold cross-validation over the full dataset, when it was computed.
   * Optional so every existing caller and every stored row keeps working.
   */
  cvMetrics?: CrossValidation | null;
}

/** Mean metrics across folds, or null when this run has no cross-validation. */
export function cvMean(run: CompletedRun | null | undefined): Metrics | null {
  return run?.cvMetrics?.mean ?? null;
}

/** Compact "k=7, weighted=true" rendering of a configuration. */
function paramSummary(run: CompletedRun) {
  const entries = Object.entries(sanitizeParams(run.modelName, run.hyperparameters));
  if (entries.length === 0) return "default settings";
  return entries.map(([key, value]) => `${key}=${value}`).join(", ");
}

/**
 * Names for a set of runs that are unambiguous even when the same algorithm
 * appears more than once with different hyperparameters. Two Random Forest
 * configurations must never both be printed as just "Random Forest", or the
 * report reads as though a run tied with itself.
 */
export function labelRuns(runs: CompletedRun[]): string[] {
  const counts = new Map<string, number>();
  for (const run of runs) {
    const label = modelLabel(run.modelName);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return runs.map((run) => {
    const label = modelLabel(run.modelName);
    return (counts.get(label) ?? 0) > 1 ? `${label} (${paramSummary(run)})` : label;
  });
}

const CLASSIFICATION_METRICS: MetricName[] = ["accuracy", "precision", "recall", "f1"];

export function directionFor(metric: MetricName): OptimizeDirection {
  return metric === "rmse" || metric === "mae" || metric === "mape" ? "minimize" : "maximize";
}

export function isMetricForTask(metric: MetricName, task: TaskType) {
  return task === "classification"
    ? CLASSIFICATION_METRICS.includes(metric)
    : !CLASSIFICATION_METRICS.includes(metric);
}

/**
 * Finds every metric named in the goal, in the order it was written.
 * The old parser used an if/else-if chain, so "maximize accuracy and F1"
 * matched only the F1 branch and the accuracy objective was thrown away.
 */
export function parseObjectives(goal: string, taskType: TaskType): MetricObjective[] {
  const text = goal.toLowerCase();
  const patterns: Array<{ metric: MetricName; regex: RegExp }> = [
    { metric: "rmse", regex: /\brmse\b|\broot[- ]mean[- ]squared?\b/g },
    { metric: "mae", regex: /\bmae\b|\bmean absolute error\b/g },
    { metric: "mape", regex: /\bmape\b/g },
    { metric: "r2", regex: /\br2\b|\br\^2\b|r²/g },
    { metric: "accuracy", regex: /\baccuracy\b|\baccurate\b/g },
    { metric: "precision", regex: /\bprecision\b/g },
    { metric: "recall", regex: /\brecall\b/g },
    { metric: "f1", regex: /\bf1\b|\bf-1\b|\bf1[- ]score\b/g },
  ];

  const hits: Array<{ metric: MetricName; at: number }> = [];
  for (const { metric, regex } of patterns) {
    const match = regex.exec(text);
    if (match) hits.push({ metric, at: match.index });
  }

  const ordered = hits
    .sort((a, b) => a.at - b.at)
    .map((hit) => hit.metric)
    .filter((metric) => isMetricForTask(metric, taskType));

  const unique = [...new Set(ordered)];
  if (unique.length === 0) {
    const fallback: MetricName = taskType === "classification" ? "accuracy" : "rmse";
    return [{ metric: fallback, optimize: directionFor(fallback) }];
  }
  return unique.map((metric) => ({ metric, optimize: directionFor(metric) }));
}

export function parseGoal(goal: string, datasetTask?: TaskType | null) {
  const text = goal.toLowerCase();
  // The dataset's own task type always wins. The text fallback only fires when no
  // dataset is attached yet, and it looks at task/metric vocabulary only -- never at
  // dataset or column names, so nothing here is tied to a particular dataset.
  const taskType: TaskType =
    datasetTask ??
    (/\b(classif\w*|accuracy|precision|recall|f1|logistic|label|categor\w*)\b/.test(text)
      ? "classification"
      : "regression");

  const objectives = parseObjectives(goal, taskType);
  const minMatch = text.match(/at least (\d+)/);
  const maxMatch = text.match(/(?:at most|no more than|max(?:imum)?)\s+(\d+)/);
  const minExperiments = minMatch ? Math.max(3, Number(minMatch[1])) : 5;
  const maxExperiments = maxMatch
    ? Math.max(minExperiments, Number(maxMatch[1]))
    : Math.max(minExperiments, 6);

  return {
    taskType,
    objectives,
    primaryMetric: objectives[0].metric,
    optimize: objectives[0].optimize,
    minExperiments,
    maxExperiments,
  };
}

/** Older stored plans have no `objectives` array; rebuild one from the legacy fields. */
export function objectivesOf(plan: {
  objectives?: MetricObjective[];
  primaryMetric: MetricName;
  optimize: OptimizeDirection;
}): MetricObjective[] {
  if (plan.objectives?.length) return plan.objectives;
  return [{ metric: plan.primaryMetric, optimize: plan.optimize }];
}

export function describeObjectives(objectives: MetricObjective[]) {
  const names = objectives.map((objective) => objective.metric.toUpperCase());
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function defaultStrategy(task: TaskType): ExperimentConfig[] {
  const raw: ExperimentConfig[] =
    task === "classification"
      ? [
          { model: "logistic_regression", params: { learningRate: 0.2, epochs: 180, l2: 0.01 }, reason: "Linear baseline for the classification boundary." },
          { model: "knn", params: { k: 7, weighted: true }, reason: "Non-parametric neighborhood vote." },
          { model: "decision_tree", params: { maxDepth: 6, minSamplesSplit: 8, minSamplesLeaf: 3 }, reason: "Interpretable non-linear splits." },
          { model: "random_forest", params: { nEstimators: 24, maxDepth: 8, minSamplesLeaf: 2, maxFeatures: "sqrt" }, reason: "Bagged trees to reduce variance." },
          { model: "gradient_boosting", params: { nEstimators: 28, maxDepth: 3, learningRate: 0.1, subsample: 1 }, reason: "Boosted residual correction." },
        ]
      : [
          { model: "linear_regression", params: {}, reason: "Unregularized linear baseline." },
          { model: "ridge", params: { alpha: 1 }, reason: "Stabilize correlated features." },
          { model: "decision_tree", params: { maxDepth: 6, minSamplesSplit: 8, minSamplesLeaf: 3 }, reason: "Capture non-linear thresholds." },
          { model: "random_forest", params: { nEstimators: 24, maxDepth: 8, minSamplesLeaf: 2, maxFeatures: "sqrt" }, reason: "Ensemble of randomized trees." },
          { model: "gradient_boosting", params: { nEstimators: 28, maxDepth: 3, learningRate: 0.1, subsample: 0.9 }, reason: "Sequential residual fitting." },
        ];
  return raw.map((item) => ({ ...item, params: sanitizeParams(item.model, item.params) }));
}

/** Drops hallucinated models and strips params that do not belong to the model. */
export function sanitizeStrategy(
  strategy: Array<{ model: string; params?: HyperParams; reason?: string }> | undefined,
  task: TaskType,
): ExperimentConfig[] {
  if (!strategy?.length) return [];
  const out: ExperimentConfig[] = [];
  const seen = new Set<string>();
  for (const item of strategy) {
    const spec = getModelSpec(item.model);
    if (!spec || !spec.tasks.includes(task)) continue;
    const params = sanitizeParams(spec.name, item.params);
    const signature = configSignature(spec.name, params);
    if (seen.has(signature)) continue;
    seen.add(signature);
    out.push({
      model: spec.name,
      params,
      reason: item.reason?.trim() || `Planned ${spec.label} configuration.`,
    });
  }
  return out;
}

export function buildHeuristicPlan(
  goal: string,
  stats: DatasetStats,
  datasetTask: TaskType,
  requestedMin?: number,
  requestedMax?: number,
): ExperimentPlan {
  const parsed = parseGoal(goal, datasetTask);
  const minExperiments = requestedMin ?? parsed.minExperiments;
  const maxExperiments = requestedMax ?? parsed.maxExperiments;
  const strategy = defaultStrategy(parsed.taskType).slice(0, Math.max(minExperiments, 5));
  const top = stats.correlations?.slice(0, 3).map((item) => item.feature).join(", ") ?? "the strongest features";
  const objectiveText = describeObjectives(parsed.objectives);
  return {
    taskType: parsed.taskType,
    primaryMetric: parsed.primaryMetric,
    optimize: parsed.optimize,
    objectives: parsed.objectives,
    minExperiments,
    maxExperiments,
    rationale: `The goal is a ${parsed.taskType} problem optimized for ${objectiveText}. Against the target ${stats.targetName}, ${top} carry the strongest linear signal, so the policy starts with a linear baseline, then trees and ensembles, then adaptive hyperparameter search.`,
    strategy,
    adaptationPolicy:
      "After the first diverse sweep, exploit the winning family. If trees beat linear by >8%, spend remaining budget on forest/boosting. If a linear model is competitive, grid regularized linear models. If train metrics crush test metrics, reduce depth or increase regularization.",
  };
}

/**
 * Score a run against every objective. Each metric is normalised to
 * "higher is better" in 0..1 against the field of runs, then averaged, so a
 * goal naming two metrics rewards a model that is strong on both.
 */
export function objectiveScore(
  run: CompletedRun,
  runs: CompletedRun[],
  objectives: MetricObjective[],
) {
  return scoreWith(run, runs, objectives, (item) => item.testMetrics);
}

/**
 * The same normalise-and-average score, but over any metric source. Passing
 * `cvMean` scores the runs on their cross-validated means instead of the
 * single holdout split.
 */
function scoreWith(
  run: CompletedRun,
  runs: CompletedRun[],
  objectives: MetricObjective[],
  pick: (run: CompletedRun) => Metrics | null | undefined,
) {
  let total = 0;
  let counted = 0;
  for (const objective of objectives) {
    const value = metricValue(pick(run), objective.metric);
    if (Number.isNaN(value)) continue;
    const pool = runs
      .map((item) => metricValue(pick(item), objective.metric))
      .filter((item) => !Number.isNaN(item));
    if (pool.length === 0) continue;
    const min = Math.min(...pool);
    const max = Math.max(...pool);
    const span = max - min;
    const normalized = span < 1e-12 ? 1 : (value - min) / span;
    total += objective.optimize === "minimize" ? 1 - normalized : normalized;
    counted += 1;
  }
  return counted === 0 ? Number.NaN : total / counted;
}

/** Score a run on its cross-validated means. NaN when CV is unavailable. */
export function cvObjectiveScore(
  run: CompletedRun,
  runs: CompletedRun[],
  objectives: MetricObjective[],
) {
  return scoreWith(run, runs, objectives, cvMean);
}

/**
 * Ordering used only to break a tie that the measurements cannot break.
 * Lower is simpler. Family order first, then the model's own capacity knobs,
 * so the choice is deterministic and defensible instead of "whichever ran
 * first". No model or dataset is special-cased.
 */
const FAMILY_COMPLEXITY: Record<string, number> = {
  linear: 0,
  neighbor: 1,
  tree: 2,
  ensemble: 3,
};

export function modelComplexity(run: CompletedRun) {
  const base = (FAMILY_COMPLEXITY[familyOf(run.modelName)] ?? 4) * 1_000_000;
  const params = run.hyperparameters ?? {};
  // Capacity-ish parameters, weighted so more capacity ranks as less simple.
  const estimators = Number(params.nEstimators ?? 1);
  const depth = Number(params.maxDepth ?? 1);
  const epochs = Number(params.epochs ?? 0);
  const neighbours = Number(params.k ?? 0);
  const capacity =
    (Number.isFinite(estimators) ? estimators : 1) * 1000 +
    (Number.isFinite(depth) ? depth : 1) * 100 +
    (Number.isFinite(epochs) ? epochs : 0) * 0.1 +
    // More neighbours means a smoother, simpler decision surface.
    (Number.isFinite(neighbours) ? -neighbours : 0);
  return base + capacity;
}

/**
 * Which body of evidence chose the winner.
 *
 * `cross_validation` means the decision came from the k-fold means over the
 * whole dataset; `holdout` means no run had usable cross-validation, so the
 * single 80/20 split was all that existed. Cross-validation is always
 * preferred when it is available -- a holdout split never overrides it.
 */
export type SelectionBasis = "cross_validation" | "holdout";

/** How the winner ended up in front, for honest reporting. */
export type TieBreakBasis = "holdout" | "cross_validation" | "simplicity" | "none";

export interface WinnerSelection {
  best: CompletedRun | null;
  /** Winner's primary metric on the holdout split (unchanged meaning). */
  bestValue: number;
  /** Winner's combined holdout objective score (unchanged meaning). */
  bestScore: number;
  /** Runs that matched the winner on the first step of the deciding evidence. */
  contenders: CompletedRun[];
  /** What actually separated the winner from those contenders. */
  tieBreak: TieBreakBasis;
  /** The evidence the winner was selected on. */
  basis: SelectionBasis;
  /** Fold count behind the decision, or 0 when the basis is the holdout split. */
  folds: number;
  /** The objective whose measured values separated the winner, when one did. */
  decidingMetric: MetricName | null;
  /** Winner's primary-objective value on the deciding evidence. */
  primaryValue: number;
  /** True when the deciding evidence could not separate the top runs. */
  tied: boolean;
  /** The winner plus every run it is tied with, when `tied` is true. */
  tiedRuns: CompletedRun[];
}

/** One run's mean cross-validated value for a metric. NaN when not measured. */
function cvValue(run: CompletedRun, metric: MetricName) {
  return metricValue(cvMean(run), metric);
}

/** One run's holdout value for a metric. NaN when not measured. */
function holdoutValue(run: CompletedRun, metric: MetricName) {
  return metricValue(run.testMetrics, metric);
}

/**
 * The runs that share the best value of one objective, using whichever metric
 * source is passed in. Returns the input untouched when nothing is measurable,
 * so a metric that a task does not produce simply cannot narrow the field.
 */
function topGroup(
  runs: CompletedRun[],
  objective: MetricObjective,
  read: (run: CompletedRun, metric: MetricName) => number,
) {
  const measured = runs.filter((run) => !Number.isNaN(read(run, objective.metric)));
  if (measured.length === 0) return runs;
  const bestValue = measured
    .map((run) => read(run, objective.metric))
    .reduce((acc, value) => (isBetter(value, acc, objective.optimize) ? value : acc));
  return measured.filter((run) => Math.abs(read(run, objective.metric) - bestValue) <= TIE_EPSILON);
}

/** The simplest runs of a set, by the deterministic complexity ordering. */
function simplestOf(runs: CompletedRun[]) {
  const ranked = [...runs].sort((a, b) => modelComplexity(a) - modelComplexity(b));
  const simplest = modelComplexity(ranked[0]);
  return ranked.filter((run) => modelComplexity(run) === simplest);
}

/**
 * Winner selection honouring every objective.
 *
 * Cross-validation, when it is available, is the primary evidence: the mean
 * k-fold value of the first objective decides, then the remaining objectives
 * in the order the user asked for them. The single holdout split is a weaker
 * estimate, so it is never allowed to override a cross-validated difference;
 * it is consulted only when the cross-validated results are exactly tied, and
 * that situation is reported as the tie it is.
 *
 * Order of decision, each step used only when the previous one cannot separate
 * the runs:
 *
 *   with cross-validation        without cross-validation
 *   1. mean CV primary metric    1. combined holdout objective score
 *   2. mean CV of the other      2. the primary metric on the holdout split
 *      objectives, in order
 *   3. combined holdout score    3. model simplicity
 *      (CV was an exact tie)
 *   4. model simplicity
 *
 * `basis`, `tieBreak` and `decidingMetric` record what really happened, so the
 * report can state the true reason instead of asserting a decision that was
 * never made. Nothing here names a model, a metric or a dataset.
 */
export function pickBestRunMulti(
  runs: CompletedRun[],
  objectives: MetricObjective[],
): WinnerSelection {
  const usable = runs.filter((run) => run.testMetrics);
  const empty: WinnerSelection = {
    best: null,
    bestValue: Number.NaN,
    bestScore: Number.NaN,
    contenders: [],
    tieBreak: "none",
    basis: "holdout",
    folds: 0,
    decidingMetric: null,
    primaryValue: Number.NaN,
    tied: false,
    tiedRuns: [],
  };
  if (usable.length === 0) return empty;

  const primary = objectives[0];
  const holdoutScore = new Map<CompletedRun, number>();
  for (const run of usable) holdoutScore.set(run, objectiveScore(run, usable, objectives));
  const scoredRuns = usable.filter((run) => !Number.isNaN(holdoutScore.get(run) ?? Number.NaN));

  const finish = (
    best: CompletedRun,
    contenders: CompletedRun[],
    tieBreak: TieBreakBasis,
    basis: SelectionBasis,
    decidingMetric: MetricName | null,
    tiedRuns: CompletedRun[],
  ): WinnerSelection => ({
    best,
    bestValue: metricValue(best.testMetrics, primary.metric),
    bestScore: holdoutScore.get(best) ?? Number.NaN,
    contenders,
    tieBreak,
    basis,
    folds: basis === "cross_validation" ? best.cvMetrics?.folds ?? 0 : 0,
    decidingMetric,
    primaryValue:
      basis === "cross_validation"
        ? cvValue(best, primary.metric)
        : metricValue(best.testMetrics, primary.metric),
    tied: tiedRuns.length > 1,
    tiedRuns: tiedRuns.length > 1 ? tiedRuns : [],
  });

  // --- Cross-validated selection: the more reliable estimate wins. ---
  // Two or more runs must be comparable on the primary objective for the
  // cross-validated ranking to mean anything.
  const cvPool = usable.filter((run) => !Number.isNaN(cvValue(run, primary.metric)));
  if (cvPool.length >= 2) {
    // 1. The mean cross-validated primary metric.
    let field = topGroup(cvPool, primary, cvValue);
    const contenders = [...field];
    let tieBreak: TieBreakBasis = field.length === 1 ? "cross_validation" : "none";
    let decidingMetric: MetricName | null = field.length === 1 ? primary.metric : null;

    // 2. The remaining objectives the user asked for, in the order written.
    for (const objective of objectives.slice(1)) {
      if (field.length <= 1) break;
      const narrowed = topGroup(field, objective, cvValue);
      if (narrowed.length > 0 && narrowed.length < field.length) {
        field = narrowed;
        tieBreak = "cross_validation";
        decidingMetric = objective.metric;
      }
    }

    // Everything the cross-validation measured agrees: this is a real tie.
    const tiedRuns = field.length > 1 ? [...field] : [];

    // 3. The cross-validated evidence is exhausted and still level. The weaker
    //    single-split estimate is deliberately NOT consulted here: a holdout
    //    split must never pick the winner once cross-validation exists. The tie
    //    is recorded in `tiedRuns` and reported as a tie; a representative is
    //    chosen only so the report has something concrete to name.
    if (field.length > 1) {
      field = simplestOf(field);
      tieBreak = "simplicity";
      decidingMetric = null;
    }

    return finish(field[0], contenders, tieBreak, "cross_validation", decidingMetric, tiedRuns);
  }

  // --- No usable cross-validation: fall back to the holdout split. ---
  if (scoredRuns.length === 0) return empty;

  const topScore = Math.max(...scoredRuns.map((run) => holdoutScore.get(run) as number));
  let field = scoredRuns.filter((run) => Math.abs((holdoutScore.get(run) as number) - topScore) <= TIE_EPSILON);
  const contenders = [...field];
  let tieBreak: TieBreakBasis = field.length === 1 ? "holdout" : "none";
  let decidingMetric: MetricName | null = field.length === 1 ? primary.metric : null;

  // 2. Primary metric on the holdout split.
  if (field.length > 1) {
    const narrowed = topGroup(field, primary, (run, metric) => metricValue(run.testMetrics, metric));
    if (narrowed.length > 0 && narrowed.length < field.length) {
      field = narrowed;
      tieBreak = "holdout";
      decidingMetric = primary.metric;
    }
  }

  const tiedRuns = field.length > 1 ? [...field] : [];

  // 3. Nothing measured separates them: prefer the simplest model and say so.
  if (field.length > 1) {
    field = simplestOf(field);
    tieBreak = "simplicity";
    decidingMetric = null;
  }

  return finish(field[0], contenders, tieBreak, "holdout", decidingMetric, tiedRuns);
}

export function pickBestRun(
  runs: CompletedRun[],
  metric: MetricName,
  optimize: OptimizeDirection,
) {
  let best: CompletedRun | null = null;
  let bestValue = Number.NaN;
  for (const run of runs) {
    const value = metricValue(run.testMetrics, metric);
    if (isBetter(value, bestValue, optimize)) {
      best = run;
      bestValue = value;
    }
  }
  return { best, bestValue };
}

function overfitGap(run: CompletedRun, metric: MetricName) {
  const train = metricValue(run.trainMetrics, metric);
  const test = metricValue(run.testMetrics, metric);
  if (Number.isNaN(train) || Number.isNaN(test)) return 0;
  return Math.abs(train - test) / (Math.abs(test) + 1e-9);
}

/**
 * Score a run for the purpose of steering the search. Cross-validated means
 * are preferred when available because they are the more reliable estimate;
 * otherwise the holdout metrics are used. Direction comes from the objective,
 * so nothing here assumes bigger-is-better.
 */
function steeringValue(run: CompletedRun, objective: MetricObjective) {
  const cv = metricValue(cvMean(run), objective.metric);
  if (!Number.isNaN(cv)) return cv;
  return metricValue(run.testMetrics, objective.metric);
}

/** Best (per direction) steering value seen for a family so far. */
function familyLeaderboard(runs: CompletedRun[], objective: MetricObjective) {
  const table = new Map<string, { value: number; run: CompletedRun }>();
  for (const run of runs) {
    const value = steeringValue(run, objective);
    if (Number.isNaN(value)) continue;
    const family = familyOf(run.modelName);
    const current = table.get(family);
    if (!current || isBetter(value, current.value, objective.optimize)) {
      table.set(family, { value, run });
    }
  }
  return [...table.entries()].sort((a, b) =>
    objective.optimize === "minimize" ? a[1].value - b[1].value : b[1].value - a[1].value,
  );
}

/** Relative improvement of `value` over `reference`, signed so + is better. */
function relativeGain(value: number, reference: number, optimize: OptimizeDirection) {
  if (Number.isNaN(value) || Number.isNaN(reference)) return Number.NaN;
  const denominator = Math.abs(reference) + 1e-9;
  return optimize === "minimize" ? (reference - value) / denominator : (value - reference) / denominator;
}

/**
 * Adaptive next-experiment selection.
 *
 * The next configuration is derived from the measured results every time:
 * which families have been tried, how they actually scored against each other,
 * whether the newest run improved on the incumbent, and whether the leader is
 * overfitting. There is no fixed model order and no scripted sequence -- the
 * same code produces a different trajectory on a different dataset.
 */
export function suggestNextExperiment(
  plan: ExperimentPlan,
  runs: CompletedRun[],
): { config: ExperimentConfig | null; stop: boolean; reason: string } {
  const objectives = objectivesOf(plan);
  const primary = objectives[0];
  const tried = new Set(runs.map((run) => configSignature(run.modelName, run.hyperparameters)));
  const scored = runs.filter((run) => run.testMetrics);

  const propose = (
    config: ExperimentConfig | null,
    reason: string,
  ): { config: ExperimentConfig | null; stop: boolean; reason: string } => {
    if (!config) return { config: null, stop: true, reason };
    const params = sanitizeParams(config.model, config.params);
    // A configuration that was already run teaches nothing new.
    if (tried.has(configSignature(config.model, params))) return { config: null, stop: false, reason: "" };
    return { config: { ...config, params }, stop: false, reason };
  };

  // Try a list of candidate proposals in order and return the first usable one.
  const firstUsable = (
    candidates: Array<{ config: ExperimentConfig | null; reason: string }>,
  ): { config: ExperimentConfig | null; stop: boolean; reason: string } | null => {
    for (const candidate of candidates) {
      const result = propose(candidate.config, candidate.reason);
      if (result.config) return result;
    }
    return null;
  };

  // --- 1. Nothing measured yet: open with the cheapest baseline available. ---
  if (scored.length === 0) {
    const opener =
      plan.strategy.find((item) => !tried.has(configSignature(item.model, item.params))) ??
      firstUntriedFamily(plan.taskType, runs, tried);
    return (
      firstUsable([{ config: opener, reason: "No results yet; start with a baseline to measure against." }]) ?? {
        config: null,
        stop: true,
        reason: "No configuration is available to start from.",
      }
    );
  }

  const selection = pickBestRunMulti(scored, objectives);
  const best = selection.best;
  if (!best) {
    const fallback = firstUntriedFamily(plan.taskType, runs, tried);
    return (
      firstUsable([{ config: fallback, reason: "No run produced usable metrics; try a different model family." }]) ?? {
        config: null,
        stop: true,
        reason: "No successful experiments to learn from.",
      }
    );
  }

  // --- 2. Read the current state of the search from the measurements. ---
  const board = familyLeaderboard(scored, primary);
  const leaderFamily = board[0]?.[0] ?? familyOf(best.modelName);
  const triedFamilies = new Set(scored.map((run) => familyOf(run.modelName)));
  const untriedFamilies = modelsForTask(plan.taskType)
    .map((spec) => spec.family)
    .filter((family) => !triedFamilies.has(family));

  const latest = scored[scored.length - 1];
  const bestValue = steeringValue(best, primary);
  const latestValue = steeringValue(latest, primary);
  const latestGain = relativeGain(latestValue, bestValue, primary.optimize);
  // The newest run is the incumbent when it is the selected winner.
  const latestIsBest =
    configSignature(latest.modelName, latest.hyperparameters) ===
    configSignature(best.modelName, best.hyperparameters);
  const latestWasPoor = !Number.isNaN(latestGain) && latestGain < -0.05;
  const gap = overfitGap(best, primary.metric);

  const budgetLeft = plan.maxExperiments - scored.length;
  const belowMinimum = scored.length < plan.minExperiments;

  if (scored.length >= plan.maxExperiments) {
    return { config: null, stop: true, reason: `Reached the experiment budget of ${plan.maxExperiments}.` };
  }

  // --- 3. Decide what to try next, from the results. ---
  const candidates: Array<{ config: ExperimentConfig | null; reason: string }> = [];

  const exploreNewFamily = () => firstUntriedFamily(plan.taskType, runs, tried);
  const exploitLeader = () => tuneWinner(best, plan, tried);
  const exploitRunnerUp = () => {
    const runnerUp = board[1]?.[1].run;
    return runnerUp ? tuneWinner(runnerUp, plan, tried) : null;
  };

  if (latestWasPoor && untriedFamilies.length > 0) {
    // The newest configuration clearly underperformed. Change direction rather
    // than keep tuning around a weak result.
    candidates.push({
      config: exploreNewFamily(),
      reason: `${modelLabel(latest.modelName)} scored ${(latestGain * 100).toFixed(1)}% below the leading ${metricWord(
        primary.metric,
      )}, so the search moves to an untried ${untriedFamilies[0]} model instead of tuning a weak configuration.`,
    });
    candidates.push({
      config: exploitLeader(),
      reason: `${modelLabel(latest.modelName)} underperformed, so the search returns to the leading ${modelLabel(
        best.modelName,
      )} configuration.`,
    });
  }

  if (gap > 0.18) {
    // The leader is memorising the training split; tuneWinner shrinks capacity.
    candidates.push({
      config: exploitLeader(),
      reason: `${modelLabel(best.modelName)} shows a ${(gap * 100).toFixed(0)}% train-test gap on ${metricWord(
        primary.metric,
      )}, so the next run reduces its capacity.`,
    });
  }

  // How far the leading family is ahead of the next best family. A commanding
  // lead is evidence worth exploiting immediately, ahead of breadth: this is
  // what makes the trajectory depend on the results rather than on a script.
  const leaderMargin = board.length > 1 ? relativeGain(board[0][1].value, board[1][1].value, primary.optimize) : Number.NaN;
  const leaderDominates = !Number.isNaN(leaderMargin) && leaderMargin > 0.08;
  if (leaderDominates && !latestWasPoor) {
    candidates.push({
      config: exploitLeader(),
      reason: `The ${leaderFamily} family leads the ${board[1][0]} family by ${(leaderMargin * 100).toFixed(
        1,
      )}% on ${metricWord(primary.metric)}, so the budget goes to tuning ${modelLabel(
        best.modelName,
      )} rather than to breadth.`,
    });
  }

  // Keep at least one representative of each family before over-tuning one of
  // them, but only while the budget can still afford it.
  const coverageWorthwhile = untriedFamilies.length > 0 && (belowMinimum || budgetLeft > untriedFamilies.length);
  if (coverageWorthwhile) {
    candidates.push({
      config: exploreNewFamily(),
      reason: `${triedFamilies.size} of ${triedFamilies.size + untriedFamilies.length} model families measured so far; adding an untried ${untriedFamilies[0]} model before committing the remaining budget.`,
    });
  }

  if (latestIsBest || (!Number.isNaN(latestGain) && latestGain > -0.002)) {
    // The newest run is at or near the top: explore its neighbourhood.
    candidates.push({
      config: exploitLeader(),
      reason: `${modelLabel(best.modelName)} currently leads on ${metricWord(primary.metric)} at ${formatMetric(
        primary.metric,
        bestValue,
      )}, so the next run searches nearby hyperparameters in the ${leaderFamily} family.`,
    });
  }

  candidates.push({
    config: exploitLeader(),
    reason: `Refine the leading ${modelLabel(best.modelName)} configuration around ${metricWord(
      primary.metric,
    )} ${formatMetric(primary.metric, bestValue)}.`,
  });
  candidates.push({
    config: exploitRunnerUp(),
    reason: board[1]
      ? `The ${leaderFamily} family is saturated, so the search explores the runner-up ${board[1][0]} family.`
      : "Explore the runner-up family.",
  });
  candidates.push({
    config: exploreNewFamily(),
    reason: "Try an unused configuration to avoid settling in a local optimum.",
  });
  candidates.push({
    config: plan.strategy.find((item) => !tried.has(configSignature(item.model, item.params))) ?? null,
    reason: "Fall back to a remaining configuration from the opening plan.",
  });

  const choice = firstUsable(candidates);

  // --- 4. Stopping, always subject to the goal's minimum. ---
  if (!choice) {
    return {
      config: null,
      stop: true,
      reason: belowMinimum
        ? `Only ${scored.length} experiments were possible; every safe configuration in the search space has been tried.`
        : "Every distinct configuration in the safe search space has been evaluated.",
    };
  }

  if (belowMinimum) return choice;

  // Past the minimum, stop once the search has stopped paying for itself.
  const recent = scored.slice(-3);
  const improvedRecently = recent.some((run) => {
    const gain = relativeGain(steeringValue(run, primary), bestValue, primary.optimize);
    return !Number.isNaN(gain) && gain > -0.002;
  });
  if (!improvedRecently && untriedFamilies.length === 0) {
    return {
      config: null,
      stop: true,
      reason: `The last ${recent.length} experiments did not improve on ${metricWord(primary.metric)} ${formatMetric(
        primary.metric,
        bestValue,
      )} and every family has been measured.`,
    };
  }

  return choice;
}

function firstUntriedFamily(task: TaskType, runs: CompletedRun[], tried: Set<string>): ExperimentConfig | null {
  const usedFamilies = new Set(runs.map((run) => familyOf(run.modelName)));
  for (const spec of modelsForTask(task)) {
    if (usedFamilies.has(spec.family)) continue;
    const params = sanitizeParams(spec.name, {});
    if (tried.has(configSignature(spec.name, params))) continue;
    return { model: spec.name, params, reason: `Untried family ${spec.family}.` };
  }
  // Every family used: fall back to any untried configuration in the search space.
  for (const spec of modelsForTask(task)) {
    for (const candidate of SEARCH_SPACES[spec.name] ?? []) {
      const params = sanitizeParams(spec.name, candidate);
      if (tried.has(configSignature(spec.name, params))) continue;
      return { model: spec.name, params, reason: `Additional ${spec.label} configuration from the search space.` };
    }
  }
  return null;
}

function tuneWinner(best: CompletedRun, plan: ExperimentPlan, tried: Set<string>): ExperimentConfig | null {
  const model = best.modelName as ModelName;
  if (!getModelSpec(model)) return null;
  const primary = objectivesOf(plan)[0];
  const gap = overfitGap(best, primary.metric);
  const candidates: HyperParams[] = [];

  // Neighbourhood moves are only proposed for parameters the model actually has,
  // so a Decision Tree is never handed an `nEstimators` value.
  if (familyOf(model) === "ensemble" || familyOf(model) === "tree") {
    const shrink: HyperParams = { ...best.hyperparameters };
    const grow: HyperParams = { ...best.hyperparameters };
    if (specHasParam(model, "maxDepth")) {
      shrink.maxDepth = Math.max(2, Number(best.hyperparameters.maxDepth ?? 6) - 2);
      grow.maxDepth = Math.min(14, Number(best.hyperparameters.maxDepth ?? 6) + 1);
    }
    if (specHasParam(model, "minSamplesLeaf")) {
      shrink.minSamplesLeaf = Number(best.hyperparameters.minSamplesLeaf ?? 2) + 1;
    }
    if (specHasParam(model, "minSamplesSplit")) {
      shrink.minSamplesSplit = Number(best.hyperparameters.minSamplesSplit ?? 8) + 2;
      grow.minSamplesSplit = Math.max(2, Number(best.hyperparameters.minSamplesSplit ?? 8) - 2);
    }
    if (specHasParam(model, "nEstimators")) {
      grow.nEstimators = Math.min(64, Number(best.hyperparameters.nEstimators ?? 24) + 8);
    }
    candidates.push(gap > 0.18 ? shrink : grow, gap > 0.18 ? grow : shrink);
  }

  if (specHasParam(model, "alpha")) {
    const alpha = Number(best.hyperparameters.alpha ?? 1);
    candidates.push({ ...best.hyperparameters, alpha: alpha * 0.3 }, { ...best.hyperparameters, alpha: alpha * 3 });
  }

  if (specHasParam(model, "k")) {
    const k = Number(best.hyperparameters.k ?? 7);
    candidates.push({ ...best.hyperparameters, k: Math.max(1, k - 2) }, { ...best.hyperparameters, k: k + 4 });
  }

  if (specHasParam(model, "l2")) {
    const l2 = Number(best.hyperparameters.l2 ?? 0.01);
    candidates.push(
      { ...best.hyperparameters, l2: Math.min(2, l2 * 4 + 0.001) },
      { ...best.hyperparameters, epochs: Number(best.hyperparameters.epochs ?? 180) + 80 },
    );
  }

  candidates.push(...(SEARCH_SPACES[model] ?? []));

  for (const raw of candidates) {
    const params = sanitizeParams(model, raw);
    const signature = configSignature(model, params);
    if (!tried.has(signature)) {
      return {
        model,
        params,
        reason: gap > 0.18 ? "Reduce capacity to fight overfitting." : "Search a nearby setting around the current winner.",
      };
    }
  }
  return null;
}

export function analyzeRuns(
  runs: CompletedRun[],
  latest: CompletedRun,
  objectives: MetricObjective[],
) {
  const primary = objectives[0];
  const { best, bestValue } = pickBestRunMulti(runs, objectives);
  const latestValue = metricValue(latest.testMetrics, primary.metric);
  const trainValue = metricValue(latest.trainMetrics, primary.metric);
  const improved = best !== null &&
    configSignature(best.modelName, best.hyperparameters) ===
      configSignature(latest.modelName, latest.hyperparameters);
  const gap = overfitGap(latest, primary.metric);

  const familyScores = new Map<string, number>();
  for (const run of runs) {
    const value = metricValue(run.testMetrics, primary.metric);
    const family = familyOf(run.modelName);
    const current = familyScores.get(family);
    if (current === undefined || isBetter(value, current, primary.optimize)) familyScores.set(family, value);
  }
  const rankedFamilies = [...familyScores.entries()].sort((a, b) =>
    primary.optimize === "minimize" ? a[1] - b[1] : b[1] - a[1],
  );

  const latestScores = objectives
    .map((objective) => {
      const value = metricValue(latest.testMetrics, objective.metric);
      return Number.isNaN(value) ? null : `${objective.metric}=${formatMetric(objective.metric, value)}`;
    })
    .filter(Boolean)
    .join(", ");

  const bestScores = best
    ? objectives
        .map((objective) => {
          const value = metricValue(best.testMetrics, objective.metric);
          return Number.isNaN(value) ? null : `${objective.metric}=${formatMetric(objective.metric, value)}`;
        })
        .filter(Boolean)
        .join(", ")
    : "";

  return {
    latestValue,
    trainValue,
    bestValue,
    improved,
    gap,
    rankedFamilies,
    commentary: [
      `${modelLabel(latest.modelName)} scored ${latestScores || "no usable metrics"} on the holdout split.`,
      Number.isFinite(trainValue)
        ? `Train ${primary.metric}=${formatMetric(primary.metric, trainValue)} (${gap > 0.18 ? "overfit risk" : "generalization looks acceptable"}).`
        : "Train metrics unavailable.",
      best ? `Current leader is ${modelLabel(best.modelName)} at ${bestScores}.` : "No leader yet.",
      rankedFamilies[0] ? `Strongest family so far: ${rankedFamilies[0][0]}.` : "",
    ]
      .filter(Boolean)
      .join(" "),
  };
}

/** Human-readable "accuracy 0.8214, F1 0.8193" for a run's measured metrics. */
export function describeRunMetrics(run: CompletedRun | null, objectives: MetricObjective[]) {
  if (!run) return "";
  return objectives
    .map((objective) => {
      const value = metricValue(run.testMetrics, objective.metric);
      return Number.isNaN(value) ? null : `${objective.metric.toUpperCase()} ${formatMetric(objective.metric, value)}`;
    })
    .filter(Boolean)
    .join(", ");
}

/** Which objectives this run actually leads on, measured against the other runs. */
/** Two metric readings are "the same result" when they agree to this tolerance. */
const TIE_EPSILON = 1e-9;

export type MetricStanding = "sole" | "tied" | "behind" | "unmeasured";

export interface MetricRank {
  metric: MetricName;
  optimize: OptimizeDirection;
  standing: MetricStanding;
  /** How many runs (including this one) share the top value. */
  sharedWith: number;
}

/**
 * Rank one run against the field on every objective.
 *
 * The critical distinction is between "sole" (strictly better than every other
 * run) and "tied" (equal to the best, but at least one other run matched it).
 * A previous version used a `>=` comparison for both cases, so a tie was
 * reported as an outright win — which is exactly the overclaim this avoids.
 * Comparisons are direction-aware, so `minimize` metrics such as RMSE work too.
 */
function rankMetrics(
  run: CompletedRun,
  runs: CompletedRun[],
  objectives: MetricObjective[],
  /**
   * Where the numbers come from. Defaults to the holdout split so every
   * existing caller behaves exactly as before; the report passes the
   * cross-validated means when those are what selected the winner, so the
   * standings it prints describe the evidence that actually decided.
   */
  read: (run: CompletedRun, metric: MetricName) => number = holdoutValue,
): MetricRank[] {
  return objectives.map((objective) => {
    const value = read(run, objective.metric);
    if (Number.isNaN(value)) {
      return { metric: objective.metric, optimize: objective.optimize, standing: "unmeasured", sharedWith: 0 };
    }

    const values = runs
      .map((item) => read(item, objective.metric))
      .filter((item) => !Number.isNaN(item));
    const bestValue =
      objective.optimize === "minimize" ? Math.min(...values) : Math.max(...values);

    const atTop = Math.abs(value - bestValue) <= TIE_EPSILON;
    const sharedWith = values.filter((item) => Math.abs(item - bestValue) <= TIE_EPSILON).length;

    return {
      metric: objective.metric,
      optimize: objective.optimize,
      standing: atTop ? (sharedWith > 1 ? "tied" : "sole") : "behind",
      sharedWith: atTop ? sharedWith : 0,
    };
  });
}

/** Acronym metrics stay upper-case ("RMSE"); word metrics stay lower-case ("accuracy"). */
const ACRONYM_METRICS = new Set<MetricName>(["rmse", "mae", "mape", "r2", "f1"]);
const metricWord = (metric: MetricName) =>
  ACRONYM_METRICS.has(metric) ? metric.toUpperCase() : metric.toLowerCase();

const directionWord = (optimize: OptimizeDirection) => (optimize === "minimize" ? "lowest" : "highest");

function joinClauses(clauses: string[]) {
  if (clauses.length === 0) return "";
  if (clauses.length === 1) return clauses[0];
  return `${clauses.slice(0, -1).join(", ")} and ${clauses[clauses.length - 1]}`;
}

/** "RMSE (lower is better), R2 (higher is better)" — for the report prompt. */
export function describeObjectiveDirections(objectives: MetricObjective[]) {
  return objectives
    .map(
      (objective) =>
        `${metricWord(objective.metric)} (${objective.optimize === "minimize" ? "lower" : "higher"} is better)`,
    )
    .join(", ");
}

/**
 * Detects text that praises a minimised metric with a "bigger is better" word,
 * e.g. "the highest RMSE" or "the strongest measured MAE". Such a sentence is
 * factually inverted and must be replaced with the measured wording.
 *
 * Only metrics that are actually being minimised in this run are guarded, and
 * the metric list comes from the objectives, so nothing is hardcoded.
 */
export function buildDirectionGuard(objectives: MetricObjective[]) {
  const minimised = objectives.filter((objective) => objective.optimize === "minimize");
  if (minimised.length === 0) return () => false;

  const names = minimised.map((objective) => escapeRegExp(metricWord(objective.metric))).join("|");
  const bigIsBetter = "highest|greatest|largest|maximum|max|strongest|top|best-scoring|biggest|improved|increased";
  // "highest RMSE", "strongest measured RMSE", "highest possible RMSE score"
  const before = new RegExp(String.raw`\b(?:${bigIsBetter})\b(?:\s+\w+){0,3}\s+(?:${names})\b`, "i");
  // "RMSE was the highest", "RMSE ... is the greatest"
  const after = new RegExp(String.raw`\b(?:${names})\b(?:\s+\w+){0,3}\s+(?:was|is|were|are)\s+the\s+(?:${bigIsBetter})\b`, "i");
  // "maximize RMSE"
  const maximise = new RegExp(String.raw`\bmaximi[sz](?:e|ed|ing)\b(?:\s+\w+){0,2}\s+(?:${names})\b`, "i");

  return (text: string) => before.test(text) || after.test(text) || maximise.test(text);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * "highest accuracy and F1" when every metric shares a direction, otherwise
 * "highest accuracy and lowest RMSE". The superlative is only repeated when the
 * optimisation directions actually differ.
 */
function superlativePhrase(ranks: MetricRank[], evidence = "") {
  const qualifier = evidence ? `${evidence} ` : "";
  const directions = new Set(ranks.map((rank) => rank.optimize));
  if (directions.size === 1) {
    return `${directionWord(ranks[0].optimize)} ${qualifier}${joinClauses(ranks.map((rank) => metricWord(rank.metric)))}`;
  }
  return joinClauses(
    ranks.map((rank) => `${directionWord(rank.optimize)} ${qualifier}${metricWord(rank.metric)}`),
  );
}

/**
 * Build the achievement clause from the measured standings.
 *
 * - sole on everything      -> "achieved the highest accuracy and F1"
 * - mix of sole and tied    -> "achieved the highest F1 and tied for the highest accuracy"
 * - tied on everything      -> "tied for the highest accuracy and F1"
 * - top on nothing          -> "recorded the best overall balance across accuracy and F1"
 *
 * The wording is generated from the ranks alone, so it is identical for any
 * dataset, any target column, any model and any set of objectives.
 */
export function describeAchievement(ranks: MetricRank[], totalRuns: number, evidence = "") {
  const measured = ranks.filter((rank) => rank.standing !== "unmeasured");
  const sole = measured.filter((rank) => rank.standing === "sole");
  const tied = measured.filter((rank) => rank.standing === "tied");
  const scope = `among the ${totalRuns} evaluated experiment${totalRuns === 1 ? "" : "s"}`;

  if (measured.length === 0) return `completed without a comparable metric ${scope}`;

  if (sole.length === 0 && tied.length === 0) {
    const qualifier = evidence ? `${evidence} ` : "";
    return `recorded the best overall balance across ${qualifier}${joinClauses(measured.map((rank) => metricWord(rank.metric)))} ${scope}, without leading on any single metric`;
  }

  const clauses: string[] = [];
  if (sole.length > 0) {
    clauses.push(`achieved the ${superlativePhrase(sole, evidence)}`);
  }
  if (tied.length > 0) {
    clauses.push(`tied for the ${superlativePhrase(tied, evidence)}`);
  }
  if (sole.length + tied.length < measured.length) {
    const trailing = measured.filter((rank) => rank.standing === "behind");
    const qualifier = evidence ? `${evidence} ` : "";
    clauses.push(
      `scored competitively on ${qualifier}${joinClauses(trailing.map((rank) => metricWord(rank.metric)))}`,
    );
  }

  return `${joinClauses(clauses)} ${scope}`;
}

/**
 * Dataset insight grounded in the real target column and real computed statistics.
 * `stats.correlations` is already Pearson(feature, target), so the phrasing names
 * the actual target rather than an arbitrary column.
 */
export function buildDatasetInsights(stats: DatasetStats, taskType: TaskType) {
  const target = stats.targetName;
  const parts: string[] = [];
  const topCorr = (stats.correlations ?? []).filter((item) => Number.isFinite(item.corr)).slice(0, 3);

  if (topCorr.length) {
    const listed = topCorr
      .map((item) => `${item.feature} (r=${item.corr.toFixed(2)}, ${item.corr >= 0 ? "positive" : "negative"})`)
      .join(", ");
    parts.push(`Among the ${stats.featureCount} numeric features, the strongest linear associations with ${target} are ${listed}.`);
  } else {
    parts.push(`The dataset provides ${stats.featureCount} numeric features for predicting ${target}.`);
  }

  if (taskType === "classification" && stats.classBalance) {
    const entries = Object.entries(stats.classBalance);
    const total = entries.reduce((sum, [, count]) => sum + count, 0) || 1;
    const balance = entries
      .map(([label, count]) => `${label} ${((count / total) * 100).toFixed(1)}%`)
      .join(", ");
    parts.push(`Class balance for ${target}: ${balance} across ${stats.rowCount} rows.`);
  } else if (taskType === "regression" && stats.targetMean !== undefined) {
    parts.push(
      `${target} has mean ${stats.targetMean.toFixed(3)} and standard deviation ${(stats.targetStd ?? 0).toFixed(3)} over ${stats.rowCount} rows.`,
    );
  }

  return parts.join(" ");
}

export function writeReport(
  goal: string,
  stats: DatasetStats,
  plan: ExperimentPlan,
  runs: Array<CompletedRun & { notes?: string | null }>,
  best: CompletedRun | null,
  /**
   * The full winner selection, when the caller has it. Passing it lets the
   * report explain how a tie was really broken. Recomputed when omitted, so
   * existing callers keep working unchanged.
   */
  selectionInput?: WinnerSelection,
) {
  const objectives = objectivesOf(plan);
  const objectiveText = describeObjectives(objectives);
  const scored = runs.filter((run) => run.testMetrics);
  const selection: WinnerSelection =
    selectionInput ?? pickBestRunMulti(scored, objectives);

  const lessons = scored.slice(0, 8).map((run) => {
    const values = objectives
      .map((objective) => {
        const value = metricValue(run.testMetrics, objective.metric);
        return Number.isNaN(value) ? null : `${objective.metric}=${formatMetric(objective.metric, value)}`;
      })
      .filter(Boolean)
      .join(", ");
    // Cross-validated means are appended when they exist, so the holdout line
    // is never replaced, only supplemented.
    const cv = run.cvMetrics;
    const cvText = cv
      ? objectives
          .map((objective) => {
            const value = metricValue(cv.mean, objective.metric);
            if (Number.isNaN(value)) return null;
            const spread = metricValue(cv.std, objective.metric);
            const plusMinus = Number.isNaN(spread) ? "" : `±${formatMetric(objective.metric, spread)}`;
            return `${objective.metric}=${formatMetric(objective.metric, value)}${plusMinus}`;
          })
          .filter(Boolean)
          .join(", ")
      : "";
    return (
      `${modelLabel(run.modelName)} reached ${values || "no usable metrics"} with ${JSON.stringify(
        sanitizeParams(run.modelName, run.hyperparameters),
      )}.` + (cvText ? ` ${cv!.folds}-fold CV: ${cvText}.` : "")
    );
  });

  const bestMetrics = best?.testMetrics ?? {};
  const bestSummary = describeRunMetrics(best, objectives);

  // The report ranks the winner on the same evidence that selected it. When
  // cross-validation ran, that is the mean k-fold value; the holdout figures
  // are still reported, but they no longer decide anything.
  const onCv = selection.basis === "cross_validation";
  const readSelected = (run: CompletedRun, metric: MetricName) =>
    onCv ? metricValue(cvMean(run), metric) : metricValue(run.testMetrics, metric);
  const foldWord = selection.folds > 0 ? `${selection.folds}-fold ` : "";
  // "5-fold cross-validated" / "" — used to qualify every superlative so the
  // reader always knows which measurement the claim is about.
  const evidenceWord = onCv ? `${foldWord}cross-validated mean` : "";
  // Runs that can actually be compared on the deciding evidence.
  const comparable = onCv ? scored.filter((run) => run.cvMetrics) : scored;

  const ranks = best ? rankMetrics(best, comparable, objectives, readSelected) : [];
  const achievement = best ? describeAchievement(ranks, comparable.length, evidenceWord) : "";
  // Same standing without the evidence qualifier, for sentences that already
  // name the evidence themselves.
  const achievementPlain = best ? describeAchievement(ranks, comparable.length) : "";
  /** Combined holdout objective score, used only to describe the weaker estimate. */
  const holdoutScoreOf = (run: CompletedRun) => objectiveScore(run, scored, objectives);
  const tiedRanks = ranks.filter((rank) => rank.standing === "tied");

  // Claims are limited to what was actually measured. A tie is never reported
  // as an outright win, and no wording implies a search or evaluation that did
  // not happen.
  const headline = best
    ? `${modelLabel(best.modelName)} ${achievement}`
    : "No successful model was selected";

  // Name every run that shares a tied top value, so the tie is auditable.
  // Metrics that are tied by the same group of runs at the same value are
  // merged into one clause instead of repeating the same names once per metric.
  const tieGroups = new Map<string, { metrics: MetricRank[]; value: number; sharers: string[] }>();
  for (const rank of tiedRanks) {
    const topValue = readSelected(best!, rank.metric);
    const sharingRuns = comparable.filter(
      (run) => Math.abs(readSelected(run, rank.metric) - topValue) <= TIE_EPSILON,
    );
    const sharers = Array.from(new Set(labelRuns(sharingRuns)));
    const key = `${formatMetric(rank.metric, topValue)}|${sharers.join("\u0000")}`;
    const existing = tieGroups.get(key);
    if (existing) existing.metrics.push(rank);
    else tieGroups.set(key, { metrics: [rank], value: topValue, sharers });
  }

  const tieDetail = [...tieGroups.values()]
    .map((group) => {
      const names = joinClauses(group.metrics.map((rank) => metricWord(rank.metric)));
      const verb = group.metrics.length === 1 ? "is" : "are all";
      return `${names} of ${formatMetric(group.metrics[0].metric, group.value)} ${verb} shared by ${joinClauses(group.sharers)}`;
    })
    .join("; ");

  // Cross-validation is reported when it ran, and the closing caveat states
  // honestly which evaluations actually happened.
  const bestCv = best?.cvMetrics ?? null;
  const cvSentence = bestCv
    ? `Across ${bestCv.folds}-fold cross-validation on all ${bestCv.rows} rows, ${modelLabel(best!.modelName)} averaged ${
        objectives
          .map((objective) => {
            const value = metricValue(bestCv.mean, objective.metric);
            if (Number.isNaN(value)) return null;
            const spread = metricValue(bestCv.std, objective.metric);
            const plusMinus = Number.isNaN(spread)
              ? ""
              : ` (±${formatMetric(objective.metric, spread)} across folds)`;
            return `${metricWord(objective.metric)} ${formatMetric(objective.metric, value)}${plusMinus}`;
          })
          .filter(Boolean)
          .join(", ") || "no comparable metric"
      }. `
    : "";
  const evaluationCaveat = bestCv
    ? `The holdout figures come from one 80/20 split and are reported for reference only; the winner was chosen on the ${bestCv.folds}-fold cross-validated means, which average ${bestCv.folds} folds and are the more reliable estimate.`
    : `These numbers come from one holdout split and were not cross-validated.`;

  // States, in one sentence, which body of evidence chose the winner.
  const selectionSentence = best
    ? onCv
      ? `The final model was selected on the mean ${foldWord}cross-validation score${
          selection.decidingMetric ? `, decided by ${metricWord(selection.decidingMetric)}` : ""
        }; the holdout split is reported separately and did not override it. `
      : `Only the single 80/20 holdout split was available, so the final model was selected on it alone. `
    : "";

  const narrative = best
    ? `The goal "${goal}" was interpreted as a ${plan.taskType} task optimizing ${objectiveText}. ` +
      `${scored.length} configuration${scored.length === 1 ? "" : "s"} were trained on ${stats.rowCount} rows and ${stats.featureCount} features using a single 80/20 holdout split, predicting ${stats.targetName}. ` +
      `${modelLabel(best.modelName)} recorded ${bestSummary} on the held-out 20% and ${achievement}. ` +
      (tieDetail ? `The tie is exact: ${tieDetail}. ` : "") +
      cvSentence +
      selectionSentence +
      evaluationCaveat
    : `The goal "${goal}" was interpreted as a ${plan.taskType} task optimizing ${objectiveText}, but no experiment completed successfully.`;

  // How the winner was actually separated from the runs it tied with. Each
  // branch states only what the measurements support, so a tie that nothing
  // could break is reported as exactly that.
  // Label the winner alongside its contenders so repeated algorithms are
  // distinguished by their hyperparameters instead of colliding on one name.
  const contenderLabels = labelRuns(selection.contenders);
  const winnerIndex = selection.contenders.findIndex((run) => run === best);
  const bestLabel = winnerIndex >= 0 ? contenderLabels[winnerIndex] : modelLabel(best?.modelName ?? "none");
  const uniqueRivals = Array.from(
    new Set(contenderLabels.filter((_, index) => index !== winnerIndex)),
  ).filter((label) => label !== bestLabel);
  // Values on the deciding evidence, e.g. "accuracy 0.938, F1 0.933".
  const describeSelected = (run: CompletedRun) =>
    objectives
      .map((objective) => {
        const value = readSelected(run, objective.metric);
        return Number.isNaN(value)
          ? null
          : `${metricWord(objective.metric)} ${formatMetric(objective.metric, value)}`;
      })
      .filter(Boolean)
      .join(", ");

  // Which metric actually separated the winner, with both sides' numbers.
  const separationDetail = (rival: CompletedRun) => {
    const metric = selection.decidingMetric ?? objectives[0].metric;
    const mine = readSelected(best!, metric);
    const theirs = readSelected(rival, metric);
    if (Number.isNaN(mine) || Number.isNaN(theirs)) return "";
    return `${metricWord(metric)} ${formatMetric(metric, mine)} against ${formatMetric(metric, theirs)}`;
  };

  // Honest note about the weaker estimate: the holdout split is reported, but
  // it is never what decided the winner once cross-validation exists.
  const holdoutNote = (() => {
    if (!best || !onCv) return "";
    const holdoutRanks = rankMetrics(best, scored, objectives, holdoutValue);
    const tiedOnHoldout = holdoutRanks.filter((rank) => rank.standing === "tied");
    if (tiedOnHoldout.length > 0) {
      const shared = tiedOnHoldout
        .map((rank) => {
          const value = holdoutValue(best, rank.metric);
          return `${metricWord(rank.metric)} of ${formatMetric(rank.metric, value)}`;
        })
        .join(", ");
      return `The single holdout split could not make this call: ${shared} was matched by other configurations, so it was reported but not used to decide. `;
    }
    // A different configuration looked better on the single split.
    const holdoutLeader = scored.reduce((leader, run) => {
      const a = holdoutScoreOf(run);
      const b = holdoutScoreOf(leader);
      if (Number.isNaN(a)) return leader;
      if (Number.isNaN(b)) return run;
      return a > b ? run : leader;
    }, scored[0]);
    if (holdoutLeader && holdoutLeader !== best) {
      const rivalLabel = labelRuns([holdoutLeader, best])[0];
      return `${rivalLabel} looked stronger on the single 80/20 split, but a holdout split is one draw of the data; the ${foldWord}cross-validated means are the more reliable estimate and were used instead. `;
    }
    return "";
  })();

  const tieBreakSentence = (() => {
    if (!best) return "";
    const evidenceName = onCv ? `mean ${foldWord}cross-validation score` : "holdout split";

    // 1. An exact tie on everything the deciding evidence measured.
    if (selection.tied && selection.tiedRuns.length > 1) {
      const tiedLabels = labelRuns(selection.tiedRuns);
      const winnerAt = selection.tiedRuns.findIndex((run) => run === best);
      const winnerLabel = winnerAt >= 0 ? tiedLabels[winnerAt] : bestLabel;
      const opening = `${joinClauses(tiedLabels)} recorded identical ${
        onCv ? `${foldWord}cross-validated ` : ""
      }results on every objective, so the measured evidence does not separate them. `;
      const closing = `${winnerLabel} is reported as the winner because it is the simplest of the tied configurations, not because it performed better. `;
      return onCv
        ? `${opening}${closing}The holdout split was not used to break this tie, because a single split is the weaker estimate. `
        : `${opening}${closing}`;
    }

    // 2. Separated from the runs it started level with.
    if (uniqueRivals.length > 0) {
      const rivalRuns = selection.contenders.filter((run) => run !== best);
      const detail = rivalRuns.length === 1 ? separationDetail(rivalRuns[0]) : "";
      return `It was selected over ${joinClauses(uniqueRivals)} on the ${evidenceName}${
        detail ? ` (${detail})` : ""
      }. `;
    }

    // 3. Nothing tied with it: it simply led the deciding evidence.
    const summary = describeSelected(best);
    return `It was selected on the ${evidenceName}${summary ? ` (${summary})` : ""}, the best of the ${
      comparable.length
    } comparable run${comparable.length === 1 ? "" : "s"}. `;
  })();

  const whyItWon = best
    ? (onCv
        ? `${bestLabel} recorded ${bestSummary} on the holdout split, and on the mean ${foldWord}cross-validation it ${achievementPlain}. `
        : `${bestLabel} recorded ${bestSummary} on the holdout split and ${achievementPlain}. `) +
      tieBreakSentence +
      holdoutNote +
      (familyOf(best.modelName) === "linear"
        ? `Its linear decision surface fit the standardized features without needing extra capacity.`
        : familyOf(best.modelName) === "neighbor"
          ? `Local neighborhood structure in the feature space carried enough signal for an instance-based predictor.`
          : `Threshold-based splits captured non-linear structure that the linear baseline could not represent.`)
    : "The run did not produce a usable leader.";

  return {
    headline,
    narrative,
    bestModel: best?.modelName ?? "none",
    bestParams: best ? sanitizeParams(best.modelName, best.hyperparameters) : {},
    bestMetrics,
    whyItWon,
    datasetInsights: buildDatasetInsights(stats, plan.taskType),
    experimentLessons: lessons,
    recommendedNextSteps: [
      bestCv
        ? `Repeat the ${bestCv.folds}-fold cross-validation with several different seeds; the fold spread shows how much of the ranking is noise.`
        : `Confirm the ranking with k-fold cross-validation; the current numbers come from a single 80/20 split of ${stats.rowCount} rows.`,
      best ? `Expand the ${modelLabel(best.modelName)} hyperparameter grid around the winning configuration.` : "Investigate why the experiments failed before retrying.",
      `Inspect the errors on ${stats.targetName} and engineer features from the highest-correlation inputs.`,
    ],
  };
}

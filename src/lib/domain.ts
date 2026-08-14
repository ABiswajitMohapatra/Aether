export type TaskType = "regression" | "classification";
export type OptimizeDirection = "minimize" | "maximize";
export type ProjectStatus = "draft" | "running" | "completed" | "failed";
export type ExperimentStatus = "queued" | "running" | "completed" | "failed";

export type AgentPhase =
  | "idle"
  | "analyzing_dataset"
  | "planning"
  | "selecting"
  | "training"
  | "evaluating"
  | "analyzing"
  | "deciding"
  | "reporting"
  | "completed"
  | "failed";

export type MetricName = "rmse" | "mae" | "r2" | "mape" | "accuracy" | "precision" | "recall" | "f1";

export type ModelName =
  | "linear_regression"
  | "ridge"
  | "lasso"
  | "elastic_net"
  | "knn"
  | "decision_tree"
  | "random_forest"
  | "gradient_boosting"
  | "logistic_regression";

export type HyperParams = Record<string, string | number | boolean>;

export interface DatasetStats {
  rowCount: number;
  featureCount: number;
  targetName: string;
  featureNames: string[];
  missingCount: number;
  targetMean?: number;
  targetStd?: number;
  targetMin?: number;
  targetMax?: number;
  classBalance?: Record<string, number>;
  featureSummary: Array<{
    name: string;
    mean: number;
    std: number;
    min: number;
    max: number;
  }>;
  correlations?: Array<{ feature: string; corr: number }>;
}

export interface DatasetPayload {
  X: number[][];
  y: number[];
  featureNames: string[];
  targetName: string;
  classNames?: string[];
}

export interface Metrics {
  rmse?: number;
  mae?: number;
  r2?: number;
  mape?: number;
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1?: number;
}

/**
 * Result of k-fold cross-validation over the full dataset. This is recorded in
 * addition to the 80/20 holdout metrics, never instead of them.
 */
export interface CrossValidation {
  /** How many folds were actually scored (a degenerate fold is skipped). */
  folds: number;
  /** How many folds were requested, so a shortfall is visible. */
  requestedFolds: number;
  /** Rows the folds were drawn from. */
  rows: number;
  /** Mean of each metric across the scored folds. */
  mean: Metrics;
  /** Population standard deviation of each metric across the scored folds. */
  std: Metrics;
  /** Raw per-fold metrics, so nothing is taken on trust. */
  perFold: Metrics[];
  durationMs: number;
}

export interface PredictionPreview {
  y: number[];
  pred: number[];
}

export interface FeatureImportance {
  name: string;
  importance: number;
}

export interface ExperimentPlanItem {
  model: ModelName;
  params: HyperParams;
  reason: string;
}

/** One metric the goal asked us to optimize, plus the direction that improves it. */
export interface MetricObjective {
  metric: MetricName;
  optimize: OptimizeDirection;
}

export interface ExperimentPlan {
  taskType: TaskType;
  /** Kept for backwards compatibility: always equal to objectives[0].metric. */
  primaryMetric: MetricName;
  /** Kept for backwards compatibility: always equal to objectives[0].optimize. */
  optimize: OptimizeDirection;
  /**
   * Every metric named in the goal, in the order it was mentioned. A goal such as
   * "maximize accuracy and F1" yields two entries, so the report and the winner
   * selection can honour both instead of silently collapsing to one.
   */
  objectives: MetricObjective[];
  rationale: string;
  minExperiments: number;
  maxExperiments: number;
  strategy: ExperimentPlanItem[];
  adaptationPolicy: string;
}

export interface ExperimentConfig {
  model: ModelName;
  params: HyperParams;
  reason: string;
}

export interface FinalReport {
  headline: string;
  narrative: string;
  bestModel: string;
  bestParams: HyperParams;
  bestMetrics: Metrics;
  whyItWon: string;
  datasetInsights: string;
  experimentLessons: string[];
  recommendedNextSteps: string[];
}

export interface AgentLogEntry {
  id: string;
  projectId: string;
  experimentId?: string | null;
  node: string;
  phase: AgentPhase;
  level: "info" | "success" | "warn" | "error";
  message: string;
  payload?: unknown;
  createdAt: string;
}

export const PHASE_ORDER: AgentPhase[] = [
  "analyzing_dataset",
  "planning",
  "training",
  "evaluating",
  "analyzing",
  "deciding",
  "reporting",
];

export const PHASE_LABELS: Record<AgentPhase, string> = {
  idle: "Idle",
  analyzing_dataset: "Analyzing dataset",
  planning: "Planning",
  selecting: "Selecting experiment",
  training: "Training",
  evaluating: "Evaluating",
  analyzing: "Analyzing",
  deciding: "Deciding next step",
  reporting: "Reporting",
  completed: "Completed",
  failed: "Failed",
};

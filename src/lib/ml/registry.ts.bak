import { z } from "zod";
import type { HyperParams, ModelName, TaskType } from "@/lib/domain";

export interface ParamSpec {
  type: "number" | "integer" | "boolean" | "enum";
  min?: number;
  max?: number;
  values?: Array<string | number | boolean>;
  default: number | string | boolean;
}

export interface ModelSpec {
  name: ModelName;
  label: string;
  family: "linear" | "neighbor" | "tree" | "ensemble";
  tasks: TaskType[];
  description: string;
  params: Record<string, ParamSpec>;
}

export const MODEL_REGISTRY: ModelSpec[] = [
  {
    name: "linear_regression",
    label: "Linear Regression",
    family: "linear",
    tasks: ["regression"],
    description: "Ordinary least squares baseline with standardized features.",
    params: {},
  },
  {
    name: "ridge",
    label: "Ridge",
    family: "linear",
    tasks: ["regression"],
    description: "L2-regularized linear model for stable coefficients.",
    params: {
      alpha: { type: "number", min: 0.0001, max: 1000, default: 1 },
    },
  },
  {
    name: "lasso",
    label: "Lasso",
    family: "linear",
    tasks: ["regression"],
    description: "L1-regularized linear model that can zero out weak features.",
    params: {
      alpha: { type: "number", min: 0.0001, max: 50, default: 0.05 },
    },
  },
  {
    name: "elastic_net",
    label: "Elastic Net",
    family: "linear",
    tasks: ["regression"],
    description: "Combined L1/L2 regularized linear model.",
    params: {
      alpha: { type: "number", min: 0.0001, max: 50, default: 0.1 },
      l1Ratio: { type: "number", min: 0, max: 1, default: 0.5 },
    },
  },
  {
    name: "logistic_regression",
    label: "Logistic Regression",
    family: "linear",
    tasks: ["classification"],
    description: "Linear classifier trained with gradient descent.",
    params: {
      learningRate: { type: "number", min: 0.01, max: 1, default: 0.2 },
      epochs: { type: "integer", min: 40, max: 400, default: 180 },
      l2: { type: "number", min: 0, max: 2, default: 0.01 },
    },
  },
  {
    name: "knn",
    label: "k-Nearest Neighbors",
    family: "neighbor",
    tasks: ["regression", "classification"],
    description: "Instance-based predictor using distance-weighted neighbors.",
    params: {
      k: { type: "integer", min: 1, max: 40, default: 7 },
      weighted: { type: "boolean", default: true },
    },
  },
  {
    name: "decision_tree",
    label: "Decision Tree",
    family: "tree",
    tasks: ["regression", "classification"],
    description: "Single CART tree with MSE or Gini splits.",
    params: {
      maxDepth: { type: "integer", min: 2, max: 16, default: 6 },
      minSamplesSplit: { type: "integer", min: 2, max: 40, default: 8 },
      minSamplesLeaf: { type: "integer", min: 1, max: 20, default: 3 },
    },
  },
  {
    name: "random_forest",
    label: "Random Forest",
    family: "ensemble",
    tasks: ["regression", "classification"],
    description: "Bagged trees with random feature subsets.",
    params: {
      nEstimators: { type: "integer", min: 8, max: 80, default: 24 },
      maxDepth: { type: "integer", min: 3, max: 16, default: 8 },
      minSamplesLeaf: { type: "integer", min: 1, max: 12, default: 2 },
      maxFeatures: { type: "enum", values: ["sqrt", "log2", "all"], default: "sqrt" },
    },
  },
  {
    name: "gradient_boosting",
    label: "Gradient Boosting",
    family: "ensemble",
    tasks: ["regression", "classification"],
    description: "Stage-wise additive trees fit to residuals.",
    params: {
      nEstimators: { type: "integer", min: 8, max: 80, default: 28 },
      maxDepth: { type: "integer", min: 1, max: 6, default: 3 },
      learningRate: { type: "number", min: 0.01, max: 0.5, default: 0.1 },
      subsample: { type: "number", min: 0.6, max: 1, default: 1 },
    },
  },
];

export const SEARCH_SPACES: Record<string, Array<HyperParams>> = {
  ridge: [{ alpha: 0.1 }, { alpha: 1 }, { alpha: 10 }, { alpha: 50 }],
  lasso: [{ alpha: 0.01 }, { alpha: 0.05 }, { alpha: 0.2 }],
  elastic_net: [
    { alpha: 0.05, l1Ratio: 0.2 },
    { alpha: 0.1, l1Ratio: 0.5 },
    { alpha: 0.2, l1Ratio: 0.8 },
  ],
  knn: [
    { k: 5, weighted: true },
    { k: 11, weighted: true },
    { k: 15, weighted: false },
  ],
  decision_tree: [
    { maxDepth: 4, minSamplesSplit: 8, minSamplesLeaf: 4 },
    { maxDepth: 6, minSamplesSplit: 8, minSamplesLeaf: 3 },
    { maxDepth: 10, minSamplesSplit: 4, minSamplesLeaf: 2 },
    { maxDepth: 8, minSamplesSplit: 12, minSamplesLeaf: 5 },
  ],
  random_forest: [
    { nEstimators: 18, maxDepth: 6, minSamplesLeaf: 3, maxFeatures: "sqrt" },
    { nEstimators: 28, maxDepth: 8, minSamplesLeaf: 2, maxFeatures: "sqrt" },
    { nEstimators: 36, maxDepth: 12, minSamplesLeaf: 1, maxFeatures: "log2" },
  ],
  gradient_boosting: [
    { nEstimators: 20, maxDepth: 2, learningRate: 0.1, subsample: 1 },
    { nEstimators: 32, maxDepth: 3, learningRate: 0.08, subsample: 0.9 },
    { nEstimators: 40, maxDepth: 3, learningRate: 0.05, subsample: 1 },
  ],
  logistic_regression: [
    { learningRate: 0.15, epochs: 160, l2: 0.02 },
    { learningRate: 0.25, epochs: 220, l2: 0.005 },
    { learningRate: 0.1, epochs: 300, l2: 0.05 },
  ],
};

export function getModelSpec(name: string) {
  return MODEL_REGISTRY.find((model) => model.name === name);
}

export function modelsForTask(task: TaskType) {
  return MODEL_REGISTRY.filter((model) => model.tasks.includes(task));
}

export function isModelName(name: unknown): name is ModelName {
  return typeof name === "string" && MODEL_REGISTRY.some((model) => model.name === name);
}

/** True only when `key` is a real hyperparameter of `modelName`. */
export function specHasParam(modelName: string, key: string) {
  const spec = getModelSpec(modelName);
  return Boolean(spec && key in spec.params);
}

export function paramKeysOf(modelName: string) {
  return Object.keys(getModelSpec(modelName)?.params ?? {});
}

/**
 * Single source of truth for hyperparameters. Any key that is not declared in
 * the model's registry spec is dropped, so a Decision Tree can never carry an
 * `nEstimators` value into a plan, into training, or into experiment history.
 */
export function sanitizeParams(modelName: string, params: HyperParams | null | undefined): HyperParams {
  const spec = getModelSpec(modelName);
  if (!spec) return {};
  const incoming = params ?? {};
  const cleaned: HyperParams = {};
  for (const [key, def] of Object.entries(spec.params)) {
    const raw = incoming[key] ?? def.default;
    if (def.type === "boolean") {
      cleaned[key] = typeof raw === "string" ? raw === "true" : Boolean(raw);
      continue;
    }
    if (def.type === "enum") {
      cleaned[key] = def.values?.includes(raw as never) ? raw : def.default;
      continue;
    }
    const numeric = Number(raw);
    if (!Number.isFinite(numeric)) {
      cleaned[key] = def.default;
      continue;
    }
    const bounded = Math.min(def.max ?? numeric, Math.max(def.min ?? numeric, numeric));
    cleaned[key] = def.type === "integer" ? Math.round(bounded) : bounded;
  }
  if (typeof incoming.randomState === "number" && Number.isFinite(incoming.randomState)) {
    cleaned.randomState = Math.round(incoming.randomState);
  }
  return cleaned;
}

export function validateExperimentConfig(modelName: string, params: HyperParams, task: TaskType) {
  const spec = getModelSpec(modelName);
  if (!spec) {
    throw new Error(`Model "${modelName}" is not in the safe registry`);
  }
  if (!spec.tasks.includes(task)) {
    throw new Error(`Model "${modelName}" cannot be used for ${task}`);
  }

  const cleaned = sanitizeParams(spec.name, params);

  const schema = z.object({
    model: z.string(),
    params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  });
  return schema.parse({ model: spec.name, params: cleaned }) as {
    model: ModelName;
    params: HyperParams;
  };
}

export function configSignature(model: string, params: HyperParams) {
  const cleaned = getModelSpec(model) ? sanitizeParams(model, params) : params;
  const keys = Object.keys(cleaned).sort();
  return `${model}:${keys.map((key) => `${key}=${String(cleaned[key])}`).join("|")}`;
}

export function modelLabel(name: string) {
  return getModelSpec(name)?.label ?? name;
}

export function familyOf(name: string) {
  return getModelSpec(name)?.family ?? "linear";
}

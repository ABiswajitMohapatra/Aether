import type { ModelName, TaskType } from "@/lib/domain";
import {
  addIntercept,
  argmax,
  clip,
  matMul,
  matVec,
  mean,
  mulberry32,
  solveLinearSystem,
  transpose,
} from "@/lib/ml/math";
import { bootstrapIndices, fitTree, predictTree, predictTreeMany, type TreeNode } from "@/lib/ml/tree";
import { applyScaler, fitScaler, type Scaler } from "@/lib/ml/preprocess";

export interface TrainedModel {
  model: ModelName;
  task: TaskType;
  scaler?: Scaler;
  weights?: number[];
  intercept?: number;
  trees?: TreeNode[];
  learningRate?: number;
  init?: number;
  knnX?: number[][];
  knnY?: number[];
  k?: number;
  weighted?: boolean;
  importances?: number[];
}

export interface TrainInput {
  model: ModelName;
  task: TaskType;
  X: number[][];
  y: number[];
  params: Record<string, number | string | boolean>;
}

function num(params: Record<string, number | string | boolean>, key: string, fallback: number) {
  const value = params[key];
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function bool(params: Record<string, number | string | boolean>, key: string, fallback: boolean) {
  const value = params[key];
  return typeof value === "boolean" ? value : fallback;
}

function str(params: Record<string, number | string | boolean>, key: string, fallback: string) {
  const value = params[key];
  return typeof value === "string" ? value : fallback;
}

function maxFeaturesOf(params: Record<string, number | string | boolean>) {
  const raw = params.maxFeatures;
  if (raw === "sqrt" || raw === "log2" || raw === "all") return raw;
  if (typeof raw === "number") return raw;
  return "sqrt";
}

function fitLinear(X: number[][], y: number[], alpha: number, l1Ratio = 0, maxIter = 80) {
  const scaler = fitScaler(X);
  const Xs = applyScaler(X, scaler);
  const n = Xs.length;
  const d = Xs[0]?.length ?? 0;

  if (l1Ratio === 0) {
    const Xi = addIntercept(Xs);
    const Xt = transpose(Xi);
    const XtX = matMul(Xt, Xi);
    for (let i = 1; i < XtX.length; i += 1) XtX[i][i] += alpha;
    const Xty = matVec(Xt, y);
    const beta = solveLinearSystem(XtX, Xty);
    return {
      scaler,
      intercept: beta[0],
      weights: beta.slice(1),
      importances: beta.slice(1).map((w) => Math.abs(w)),
    };
  }

  let weights = Array.from({ length: d }, () => 0);
  let intercept = mean(y);
  const l1 = alpha * l1Ratio;
  const l2 = alpha * (1 - l1Ratio);

  for (let iter = 0; iter < maxIter; iter += 1) {
    intercept = mean(y.map((yi, i) => yi - Xs[i].reduce((s, xij, j) => s + xij * weights[j], 0)));
    for (let j = 0; j < d; j += 1) {
      let rho = 0;
      let norm = 0;
      for (let i = 0; i < n; i += 1) {
        let pred = intercept;
        for (let k = 0; k < d; k += 1) {
          if (k !== j) pred += Xs[i][k] * weights[k];
        }
        rho += Xs[i][j] * (y[i] - pred);
        norm += Xs[i][j] * Xs[i][j];
      }
      const denom = norm + n * l2;
      if (denom === 0) {
        weights[j] = 0;
        continue;
      }
      weights[j] = softThreshold(rho / n, l1) / (denom / n);
    }
  }

  return {
    scaler,
    intercept,
    weights,
    importances: weights.map((w) => Math.abs(w)),
  };
}

function softThreshold(value: number, lambda: number) {
  if (value > lambda) return value - lambda;
  if (value < -lambda) return value + lambda;
  return 0;
}

function predictLinear(row: number[], intercept: number, weights: number[]) {
  return intercept + row.reduce((sum, value, i) => sum + value * (weights[i] ?? 0), 0);
}

function sigmoid(z: number) {
  const x = clip(z, -30, 30);
  return 1 / (1 + Math.exp(-x));
}

function fitLogistic(X: number[][], y: number[], lr: number, epochs: number, l2: number) {
  const scaler = fitScaler(X);
  const Xs = applyScaler(X, scaler);
  const classes = [...new Set(y)].sort((a, b) => a - b);
  const n = Xs.length;
  const d = Xs[0]?.length ?? 0;
  const models = classes.map(() => ({
    intercept: 0,
    weights: Array.from({ length: d }, () => 0),
  }));

  for (let epoch = 0; epoch < epochs; epoch += 1) {
    for (let c = 0; c < classes.length; c += 1) {
      const model = models[c];
      let gInt = 0;
      const gW = Array.from({ length: d }, () => 0);
      for (let i = 0; i < n; i += 1) {
        const target = y[i] === classes[c] ? 1 : 0;
        const z = predictLinear(Xs[i], model.intercept, model.weights);
        const err = sigmoid(z) - target;
        gInt += err;
        for (let j = 0; j < d; j += 1) gW[j] += err * Xs[i][j];
      }
      model.intercept -= (lr * gInt) / n;
      for (let j = 0; j < d; j += 1) {
        model.weights[j] -= (lr * (gW[j] / n + l2 * model.weights[j]));
      }
    }
  }

  const importances = Array.from({ length: d }, () => 0);
  for (const model of models) {
    model.weights.forEach((w, j) => {
      importances[j] += Math.abs(w);
    });
  }

  return {
    scaler,
    classes,
    models,
    importances,
  };
}

function predictLogisticRow(
  row: number[],
  classes: number[],
  models: Array<{ intercept: number; weights: number[] }>,
) {
  const scores = models.map((model) => sigmoid(predictLinear(row, model.intercept, model.weights)));
  return classes[argmax(scores)] ?? 0;
}

function fitKnn(X: number[][], y: number[], k: number, weighted: boolean) {
  const scaler = fitScaler(X);
  const Xs = applyScaler(X, scaler);
  return { scaler, knnX: Xs, knnY: y, k, weighted };
}

function predictKnn(
  row: number[],
  knnX: number[][],
  knnY: number[],
  k: number,
  weighted: boolean,
  task: TaskType,
) {
  const distances = knnX.map((other, i) => {
    let dist = 0;
    for (let j = 0; j < other.length; j += 1) {
      const d = other[j] - row[j];
      dist += d * d;
    }
    return { i, dist: Math.sqrt(dist) };
  });
  distances.sort((a, b) => a.dist - b.dist);
  const neighbors = distances.slice(0, Math.max(1, Math.min(k, distances.length)));
  if (task === "classification") {
    const votes = new Map<number, number>();
    for (const neighbor of neighbors) {
      const weight = weighted ? 1 / (neighbor.dist + 1e-6) : 1;
      votes.set(knnY[neighbor.i], (votes.get(knnY[neighbor.i]) ?? 0) + weight);
    }
    let best = knnY[neighbors[0].i];
    let bestVote = -1;
    for (const [label, vote] of votes) {
      if (vote > bestVote) {
        best = label;
        bestVote = vote;
      }
    }
    return best;
  }
  let num = 0;
  let den = 0;
  for (const neighbor of neighbors) {
    const weight = weighted ? 1 / (neighbor.dist + 1e-6) : 1;
    num += weight * knnY[neighbor.i];
    den += weight;
  }
  return den === 0 ? 0 : num / den;
}

export function trainModel(input: TrainInput): TrainedModel {
  const { model, task, X, y, params } = input;
  const seed = num(params, "randomState", 42);

  if (model === "linear_regression" || model === "ridge" || model === "lasso" || model === "elastic_net") {
    const alpha =
      model === "linear_regression" ? 0 : Math.max(0, num(params, "alpha", model === "ridge" ? 1 : 0.1));
    const l1Ratio =
      model === "lasso" ? 1 : model === "elastic_net" ? clip(num(params, "l1Ratio", 0.5), 0, 1) : 0;
    const fitted = fitLinear(X, y, alpha, l1Ratio);
    return {
      model,
      task,
      scaler: fitted.scaler,
      intercept: fitted.intercept,
      weights: fitted.weights,
      importances: fitted.importances,
    };
  }

  if (model === "logistic_regression") {
    const fitted = fitLogistic(X, y, num(params, "learningRate", 0.2), num(params, "epochs", 180), num(params, "l2", 0.01));
    return {
      model,
      task,
      scaler: fitted.scaler,
      intercept: 0,
      weights: fitted.models[0]?.weights,
      importances: fitted.importances,
      trees: undefined,
      knnY: fitted.classes,
      knnX: fitted.models.map((m) => [m.intercept, ...m.weights]),
    };
  }

  if (model === "knn") {
    const fitted = fitKnn(X, y, Math.max(1, Math.round(num(params, "k", 5))), bool(params, "weighted", true));
    return {
      model,
      task,
      scaler: fitted.scaler,
      knnX: fitted.knnX,
      knnY: fitted.knnY,
      k: fitted.k,
      weighted: fitted.weighted,
    };
  }

  if (model === "decision_tree") {
    const fitted = fitTree(X, y, {
      task,
      maxDepth: Math.round(num(params, "maxDepth", 6)),
      minSamplesSplit: Math.round(num(params, "minSamplesSplit", 8)),
      minSamplesLeaf: Math.round(num(params, "minSamplesLeaf", 3)),
      maxFeatures: "all",
      seed,
    });
    return { model, task, trees: [fitted.tree], importances: fitted.importances };
  }

  if (model === "random_forest") {
    const nEstimators = Math.max(5, Math.round(num(params, "nEstimators", 25)));
    const rng = mulberry32(seed);
    const trees: TreeNode[] = [];
    const importances = Array.from({ length: X[0]?.length ?? 0 }, () => 0);
    for (let t = 0; t < nEstimators; t += 1) {
      const bag = bootstrapIndices(X.length, rng);
      const xb = bag.map((i) => X[i]);
      const yb = bag.map((i) => y[i]);
      const fitted = fitTree(xb, yb, {
        task,
        maxDepth: Math.round(num(params, "maxDepth", 8)),
        minSamplesSplit: Math.round(num(params, "minSamplesSplit", 6)),
        minSamplesLeaf: Math.round(num(params, "minSamplesLeaf", 2)),
        maxFeatures: maxFeaturesOf(params),
        seed: Math.floor(rng() * 1e9),
      });
      trees.push(fitted.tree);
      fitted.importances.forEach((value, i) => {
        importances[i] += value;
      });
    }
    return { model, task, trees, importances };
  }

  if (model === "gradient_boosting") {
    const nEstimators = Math.max(5, Math.round(num(params, "nEstimators", 30)));
    const learningRate = num(params, "learningRate", 0.1);
    const subsample = clip(num(params, "subsample", 1), 0.5, 1);
    const rng = mulberry32(seed);
    const init = task === "classification" ? mean(y) : mean(y);
    let residual = y.map((value) => value - init);
    const trees: TreeNode[] = [];
    const importances = Array.from({ length: X[0]?.length ?? 0 }, () => 0);
    for (let t = 0; t < nEstimators; t += 1) {
      const count = Math.max(8, Math.floor(X.length * subsample));
      const idx = Array.from({ length: X.length }, (_, i) => i);
      const selected: number[] = [];
      for (let i = 0; i < count; i += 1) selected.push(idx[Math.floor(rng() * idx.length)]);
      const xb = selected.map((i) => X[i]);
      const yb = selected.map((i) => residual[i]);
      const fitted = fitTree(xb, yb, {
        task: "regression",
        maxDepth: Math.round(num(params, "maxDepth", 3)),
        minSamplesSplit: Math.round(num(params, "minSamplesSplit", 8)),
        minSamplesLeaf: Math.round(num(params, "minSamplesLeaf", 3)),
        maxFeatures: str(params, "maxFeatures", "all") as "all",
        seed: Math.floor(rng() * 1e9),
      });
      trees.push(fitted.tree);
      fitted.importances.forEach((value, i) => {
        importances[i] += value;
      });
      const pred = predictTreeMany(fitted.tree, X);
      residual = residual.map((value, i) => value - learningRate * pred[i]);
    }
    return { model, task, trees, learningRate, init, importances };
  }

  throw new Error(`Unsupported model: ${model}`);
}

export function predictModel(trained: TrainedModel, X: number[][]) {
  const scaled = trained.scaler ? applyScaler(X, trained.scaler) : X;

  if (
    trained.model === "linear_regression" ||
    trained.model === "ridge" ||
    trained.model === "lasso" ||
    trained.model === "elastic_net"
  ) {
    return scaled.map((row) => predictLinear(row, trained.intercept ?? 0, trained.weights ?? []));
  }

  if (trained.model === "logistic_regression") {
    const classes = trained.knnY ?? [0, 1];
    const packed = trained.knnX ?? [];
    const models = packed.map((row) => ({ intercept: row[0] ?? 0, weights: row.slice(1) }));
    return scaled.map((row) => predictLogisticRow(row, classes, models));
  }

  if (trained.model === "knn") {
    return scaled.map((row) =>
      predictKnn(row, trained.knnX ?? [], trained.knnY ?? [], trained.k ?? 5, trained.weighted ?? true, trained.task),
    );
  }

  if (trained.model === "decision_tree") {
    const tree = trained.trees?.[0];
    if (!tree) return X.map(() => 0);
    const pred = predictTreeMany(tree, X);
    return trained.task === "classification" ? pred.map((value) => Math.round(value)) : pred;
  }

  if (trained.model === "random_forest") {
    const trees = trained.trees ?? [];
    return X.map((row) => {
      const votes = trees.map((tree) => predictTree(tree, row));
      if (trained.task === "classification") {
        const counts = new Map<number, number>();
        for (const vote of votes) counts.set(Math.round(vote), (counts.get(Math.round(vote)) ?? 0) + 1);
        let best = votes[0] ?? 0;
        let bestCount = -1;
        for (const [label, count] of counts) {
          if (count > bestCount) {
            best = label;
            bestCount = count;
          }
        }
        return best;
      }
      return mean(votes);
    });
  }

  if (trained.model === "gradient_boosting") {
    const trees = trained.trees ?? [];
    const lr = trained.learningRate ?? 0.1;
    const init = trained.init ?? 0;
    return X.map((row) => {
      let value = init;
      for (const tree of trees) value += lr * predictTree(tree, row);
      return trained.task === "classification" ? Math.round(clip(value, 0, 10)) : value;
    });
  }

  return X.map(() => 0);
}

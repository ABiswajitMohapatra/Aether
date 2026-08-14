import { mean, mulberry32, sampleWithoutReplacement, variance } from "@/lib/ml/math";

export interface TreeNode {
  leaf: boolean;
  value?: number;
  feature?: number;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  n?: number;
  impurity?: number;
}

export interface TreeOptions {
  maxDepth: number;
  minSamplesSplit: number;
  minSamplesLeaf: number;
  maxFeatures: number | "sqrt" | "log2" | "all";
  task: "regression" | "classification";
  seed?: number;
  nClasses?: number;
}

function featureCount(maxFeatures: TreeOptions["maxFeatures"], nFeatures: number) {
  if (maxFeatures === "all") return nFeatures;
  if (maxFeatures === "sqrt") return Math.max(1, Math.floor(Math.sqrt(nFeatures)));
  if (maxFeatures === "log2") return Math.max(1, Math.floor(Math.log2(nFeatures)));
  if (maxFeatures > 0 && maxFeatures < 1) return Math.max(1, Math.floor(maxFeatures * nFeatures));
  return Math.max(1, Math.min(nFeatures, Math.floor(maxFeatures)));
}

function majorityClass(y: number[], idx: number[]) {
  const counts = new Map<number, number>();
  for (const i of idx) counts.set(y[i], (counts.get(y[i]) ?? 0) + 1);
  let best = y[idx[0]] ?? 0;
  let bestCount = -1;
  for (const [label, count] of counts) {
    if (count > bestCount) {
      best = label;
      bestCount = count;
    }
  }
  return best;
}

function gini(counts: Map<number, number>, n: number) {
  if (n === 0) return 0;
  let sum = 0;
  for (const count of counts.values()) {
    const p = count / n;
    sum += p * p;
  }
  return 1 - sum;
}

interface Split {
  feature: number;
  threshold: number;
  gain: number;
}

function bestSplit(
  X: number[][],
  y: number[],
  idx: number[],
  options: TreeOptions,
  rng: () => number,
): Split | null {
  const nFeatures = X[0]?.length ?? 0;
  const k = featureCount(options.maxFeatures, nFeatures);
  const features = sampleWithoutReplacement(
    Array.from({ length: nFeatures }, (_, i) => i),
    k,
    rng,
  );
  const n = idx.length;
  let parentImpurity = 0;
  let totalSum = 0;
  let totalSumSq = 0;
  const parentCounts = new Map<number, number>();

  if (options.task === "regression") {
    const values = idx.map((i) => y[i]);
    parentImpurity = variance(values) * n;
    for (const value of values) {
      totalSum += value;
      totalSumSq += value * value;
    }
  } else {
    for (const i of idx) parentCounts.set(y[i], (parentCounts.get(y[i]) ?? 0) + 1);
    parentImpurity = gini(parentCounts, n) * n;
  }

  let best: Split | null = null;

  for (const feature of features) {
    const ordered = idx
      .map((i) => ({ i, v: X[i][feature] }))
      .sort((a, b) => a.v - b.v);
    if (ordered[0].v === ordered[ordered.length - 1].v) continue;

    let leftSum = 0;
    let leftSumSq = 0;
    let leftN = 0;
    const leftCounts = new Map<number, number>();

    for (let t = 0; t < ordered.length - options.minSamplesLeaf; t += 1) {
      const yi = y[ordered[t].i];
      leftN += 1;
      if (options.task === "regression") {
        leftSum += yi;
        leftSumSq += yi * yi;
      } else {
        leftCounts.set(yi, (leftCounts.get(yi) ?? 0) + 1);
      }
      if (leftN < options.minSamplesLeaf) continue;
      if (t + 1 < ordered.length && ordered[t].v === ordered[t + 1].v) continue;
      const rightN = n - leftN;
      if (rightN < options.minSamplesLeaf) continue;

      let gain = 0;
      if (options.task === "regression") {
        const leftSSE = leftSumSq - (leftSum * leftSum) / leftN;
        const rightSum = totalSum - leftSum;
        const rightSumSq = totalSumSq - leftSumSq;
        const rightSSE = rightSumSq - (rightSum * rightSum) / rightN;
        gain = parentImpurity - leftSSE - rightSSE;
      } else {
        const rightCounts = new Map<number, number>();
        for (const [label, count] of parentCounts) {
          const l = leftCounts.get(label) ?? 0;
          const r = count - l;
          if (r > 0) rightCounts.set(label, r);
        }
        const leftG = gini(leftCounts, leftN) * leftN;
        const rightG = gini(rightCounts, rightN) * rightN;
        gain = parentImpurity - leftG - rightG;
      }

      if (!best || gain > best.gain) {
        best = {
          feature,
          threshold: (ordered[t].v + ordered[t + 1].v) / 2,
          gain,
        };
      }
    }
  }

  if (!best || best.gain <= 1e-12) return null;
  return best;
}

function build(
  X: number[][],
  y: number[],
  idx: number[],
  depth: number,
  options: TreeOptions,
  rng: () => number,
  importances: number[],
): TreeNode {
  const values = idx.map((i) => y[i]);
  const leafValue = options.task === "classification" ? majorityClass(y, idx) : mean(values);
  const impurity = options.task === "classification" ? 0 : variance(values);

  if (
    depth >= options.maxDepth ||
    idx.length < options.minSamplesSplit ||
    new Set(values).size === 1
  ) {
    return { leaf: true, value: leafValue, n: idx.length, impurity };
  }

  const split = bestSplit(X, y, idx, options, rng);
  if (!split) {
    return { leaf: true, value: leafValue, n: idx.length, impurity };
  }

  const leftIdx: number[] = [];
  const rightIdx: number[] = [];
  for (const i of idx) {
    if (X[i][split.feature] <= split.threshold) leftIdx.push(i);
    else rightIdx.push(i);
  }
  if (leftIdx.length === 0 || rightIdx.length === 0) {
    return { leaf: true, value: leafValue, n: idx.length, impurity };
  }

  importances[split.feature] += split.gain;
  return {
    leaf: false,
    feature: split.feature,
    threshold: split.threshold,
    n: idx.length,
    impurity,
    left: build(X, y, leftIdx, depth + 1, options, rng, importances),
    right: build(X, y, rightIdx, depth + 1, options, rng, importances),
  };
}

export function fitTree(X: number[][], y: number[], options: TreeOptions) {
  const importances = Array.from({ length: X[0]?.length ?? 0 }, () => 0);
  const rng = mulberry32(options.seed ?? 7);
  const tree = build(
    X,
    y,
    X.map((_, i) => i),
    0,
    options,
    rng,
    importances,
  );
  return { tree, importances };
}

export function predictTree(tree: TreeNode, row: number[]): number {
  let node = tree;
  while (!node.leaf && node.left && node.right && node.feature !== undefined) {
    node = row[node.feature] <= (node.threshold ?? 0) ? node.left : node.right;
  }
  return node.value ?? 0;
}

export function predictTreeMany(tree: TreeNode, X: number[][]) {
  return X.map((row) => predictTree(tree, row));
}

export function bootstrapIndices(n: number, rng: () => number) {
  return Array.from({ length: n }, () => Math.floor(rng() * n));
}

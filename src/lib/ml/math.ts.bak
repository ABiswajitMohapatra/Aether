export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededInt(rng: () => number, min: number, max: number) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function shuffleInPlace<T>(items: T[], rng: () => number) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = items[i];
    items[i] = items[j];
    items[j] = tmp;
  }
  return items;
}

export function mean(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function variance(values: number[]) {
  if (values.length === 0) return 0;
  const mu = mean(values);
  return values.reduce((sum, value) => sum + (value - mu) ** 2, 0) / values.length;
}

export function std(values: number[]) {
  return Math.sqrt(variance(values));
}

export function median(values: number[]) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function pearson(x: number[], y: number[]) {
  const n = Math.min(x.length, y.length);
  if (n === 0) return 0;
  const mx = mean(x.slice(0, n));
  const my = mean(y.slice(0, n));
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i += 1) {
    const vx = x[i] - mx;
    const vy = y[i] - my;
    num += vx * vy;
    dx += vx * vx;
    dy += vy * vy;
  }
  const den = Math.sqrt(dx * dy);
  return den === 0 ? 0 : num / den;
}

export function clip(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function argmax(values: number[]) {
  let best = 0;
  for (let i = 1; i < values.length; i += 1) {
    if (values[i] > values[best]) best = i;
  }
  return best;
}

export function uniqueSorted(values: number[]) {
  return [...new Set(values)].sort((a, b) => a - b);
}

export function solveLinearSystem(rawA: number[][], rawB: number[]) {
  const n = rawA.length;
  const M = rawA.map((row, i) => {
    if (row.length !== n) {
      throw new Error("Matrix must be square");
    }
    return [...row, rawB[i]];
  });

  for (let k = 0; k < n; k += 1) {
    let pivotRow = k;
    let pivotAbs = Math.abs(M[k][k]);
    for (let i = k + 1; i < n; i += 1) {
      const candidate = Math.abs(M[i][k]);
      if (candidate > pivotAbs) {
        pivotAbs = candidate;
        pivotRow = i;
      }
    }
    if (pivotAbs < 1e-12) {
      M[k][k] += 1e-6;
    } else if (pivotRow !== k) {
      const swap = M[k];
      M[k] = M[pivotRow];
      M[pivotRow] = swap;
    }
    const pivot = M[k][k] === 0 ? 1e-6 : M[k][k];
    for (let i = k + 1; i < n; i += 1) {
      const factor = M[i][k] / pivot;
      for (let j = k; j <= n; j += 1) {
        M[i][j] -= factor * M[k][j];
      }
    }
  }

  const x = Array.from({ length: n }, () => 0);
  for (let i = n - 1; i >= 0; i -= 1) {
    let sum = M[i][n];
    for (let j = i + 1; j < n; j += 1) {
      sum -= M[i][j] * x[j];
    }
    const diag = Math.abs(M[i][i]) < 1e-12 ? 1e-12 : M[i][i];
    x[i] = sum / diag;
  }
  return x;
}

export function addIntercept(X: number[][]) {
  return X.map((row) => [1, ...row]);
}

export function transpose(A: number[][]) {
  if (A.length === 0) return [];
  return A[0].map((_, j) => A.map((row) => row[j]));
}

export function matMul(A: number[][], B: number[][]) {
  const n = A.length;
  const m = B[0]?.length ?? 0;
  const p = B.length;
  const out: number[][] = Array.from({ length: n }, () => Array.from({ length: m }, () => 0));
  for (let i = 0; i < n; i += 1) {
    for (let k = 0; k < p; k += 1) {
      const aik = A[i][k];
      for (let j = 0; j < m; j += 1) {
        out[i][j] += aik * B[k][j];
      }
    }
  }
  return out;
}

export function matVec(A: number[][], v: number[]) {
  return A.map((row) => row.reduce((sum, value, i) => sum + value * v[i], 0));
}

export function identity(n: number) {
  return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
}

export function normalSample(rng: () => number) {
  const u = Math.max(rng(), 1e-9);
  const v = Math.max(rng(), 1e-9);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

export function choice<T>(items: T[], rng: () => number) {
  return items[Math.floor(rng() * items.length)];
}

export function sampleWithoutReplacement<T>(items: T[], k: number, rng: () => number) {
  const copy = [...items];
  shuffleInPlace(copy, rng);
  return copy.slice(0, Math.min(k, copy.length));
}

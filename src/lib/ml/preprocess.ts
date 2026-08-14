import type { DatasetPayload, DatasetStats, TaskType } from "@/lib/domain";
import { mean, mulberry32, pearson, shuffleInPlace, std } from "@/lib/ml/math";

export interface Scaler {
  mean: number[];
  scale: number[];
}

export function fitScaler(X: number[][]): Scaler {
  if (X.length === 0) return { mean: [], scale: [] };
  const cols = X[0].length;
  const means: number[] = [];
  const scales: number[] = [];
  for (let j = 0; j < cols; j += 1) {
    const col = X.map((row) => row[j]);
    const mu = mean(col);
    const sigma = std(col);
    means.push(mu);
    scales.push(sigma < 1e-9 ? 1 : sigma);
  }
  return { mean: means, scale: scales };
}

export function applyScaler(X: number[][], scaler: Scaler) {
  return X.map((row) => row.map((value, j) => (value - scaler.mean[j]) / scaler.scale[j]));
}

export function trainTestSplit(
  X: number[][],
  y: number[],
  testSize = 0.2,
  seed = 42,
): { xTrain: number[][]; yTrain: number[]; xTest: number[][]; yTest: number[] } {
  const idx = X.map((_, i) => i);
  shuffleInPlace(idx, mulberry32(seed));
  const nTest = Math.max(1, Math.floor(idx.length * testSize));
  const testIdx = idx.slice(0, nTest);
  const trainIdx = idx.slice(nTest);
  return {
    xTrain: trainIdx.map((i) => X[i]),
    yTrain: trainIdx.map((i) => y[i]),
    xTest: testIdx.map((i) => X[i]),
    yTest: testIdx.map((i) => y[i]),
  };
}

export function computeDatasetStats(payload: DatasetPayload, taskType: TaskType): DatasetStats {
  const { X, y, featureNames, targetName, classNames } = payload;
  const featureSummary = featureNames.map((name, j) => {
    const col = X.map((row) => row[j]);
    return {
      name,
      mean: mean(col),
      std: std(col),
      min: Math.min(...col),
      max: Math.max(...col),
    };
  });

  const correlations = featureNames
    .map((feature, j) => ({
      feature,
      corr: pearson(
        X.map((row) => row[j]),
        y,
      ),
    }))
    .sort((a, b) => Math.abs(b.corr) - Math.abs(a.corr));

  const classBalance =
    taskType === "classification"
      ? y.reduce<Record<string, number>>((acc, value) => {
          const label = classNames?.[value] ?? String(value);
          acc[label] = (acc[label] ?? 0) + 1;
          return acc;
        }, {})
      : undefined;

  return {
    rowCount: X.length,
    featureCount: featureNames.length,
    targetName,
    featureNames,
    missingCount: 0,
    targetMean: mean(y),
    targetStd: std(y),
    targetMin: Math.min(...y),
    targetMax: Math.max(...y),
    classBalance,
    featureSummary,
    correlations,
  };
}

export function parseCsv(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2) {
    throw new Error("CSV must include a header and at least one row");
  }
  const headers = splitCsvLine(lines[0]);
  const rows = lines.slice(1).map(splitCsvLine);
  return { headers, rows };
}

function splitCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      cells.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  cells.push(current.trim());
  return cells;
}

export function csvToPayload(
  headers: string[],
  rows: string[][],
  targetColumn: string,
): DatasetPayload {
  const targetIndex = headers.indexOf(targetColumn);
  if (targetIndex < 0) {
    throw new Error(`Target column "${targetColumn}" was not found`);
  }
  const featureIndexes = headers
    .map((name, i) => ({ name, i }))
    .filter((col) => col.i !== targetIndex);

  const numericFeatureIdx = featureIndexes.filter((col) =>
    rows.every((row) => row[col.i] === "" || Number.isFinite(Number(row[col.i]))),
  );
  if (numericFeatureIdx.length === 0) {
    throw new Error("No numeric feature columns were detected");
  }

  const targetValues = rows.map((row) => row[targetIndex]);
  const targetIsNumeric = targetValues.every((value) => Number.isFinite(Number(value)));
  let y: number[];
  let classNames: string[] | undefined;
  if (targetIsNumeric && new Set(targetValues).size > 12) {
    y = targetValues.map(Number);
  } else {
    classNames = [...new Set(targetValues)];
    const index = new Map(classNames.map((name, i) => [name, i]));
    y = targetValues.map((value) => index.get(value) ?? 0);
  }

  const X = rows.map((row) => numericFeatureIdx.map((col) => Number(row[col.i] || 0)));
  return {
    X,
    y,
    featureNames: numericFeatureIdx.map((col) => col.name),
    targetName: targetColumn,
    classNames,
  };
}

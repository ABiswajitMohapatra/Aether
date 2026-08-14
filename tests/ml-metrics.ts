import { classificationMetrics, r2Score, rmse } from "@/lib/ml/metrics";
import { solveLinearSystem } from "@/lib/ml/math";
import { runSafeExperiment } from "@/lib/ml/engine";

export function assertClose(actual: number, expected: number, eps = 1e-6) {
  if (Math.abs(actual - expected) > eps) {
    throw new Error(`Expected ${expected}, received ${actual}`);
  }
}

export function runMetricChecks() {
  assertClose(rmse([0, 1, 2], [0, 1, 2]), 0);
  assertClose(r2Score([1, 2, 3, 4], [1, 2, 3, 4]), 1);
  const clf = classificationMetrics([0, 1, 1, 0], [0, 1, 0, 0]);
  if (!clf.accuracy || clf.accuracy < 0.7) {
    throw new Error("Classification accuracy check failed");
  }
  const solved = solveLinearSystem(
    [
      [2, 1],
      [1, 2],
    ],
    [5, 4],
  );
  assertClose(solved[0], 2, 1e-8);
  assertClose(solved[1], 1, 1e-8);
}

export function runLinearSanity() {
  const X = Array.from({ length: 40 }, (_, i) => [i + 1]);
  const y = X.map((row) => 3 * row[0] + 2);
  const result = runSafeExperiment({
    model: "linear_regression",
    params: {},
    task: "regression",
    X,
    y,
    featureNames: ["x"],
    seed: 1,
  });
  if ((result.testMetrics.r2 ?? 0) < 0.99) {
    throw new Error(`Linear regression should recover a perfect line, got R2=${result.testMetrics.r2}`);
  }
}

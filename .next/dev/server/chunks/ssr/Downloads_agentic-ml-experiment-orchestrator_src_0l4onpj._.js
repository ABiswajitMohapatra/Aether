module.exports = [
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatDuration",
    ()=>formatDuration,
    "formatTime",
    ()=>formatTime,
    "prettyMetric",
    ()=>prettyMetric,
    "prettyModel",
    ()=>prettyModel
]);
function formatDuration(ms) {
    if (!ms && ms !== 0) return "—";
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
}
function formatTime(iso) {
    return new Date(iso).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
function prettyModel(name) {
    return name.replace(/_/g, " ").replace(/\b\w/g, (ch)=>ch.toUpperCase());
}
function prettyMetric(name) {
    if (name === "r2") return "R²";
    if (name === "rmse") return "RMSE";
    if (name === "mae") return "MAE";
    if (name === "mape") return "MAPE";
    if (name === "f1") return "F1";
    return name[0]?.toUpperCase() + name.slice(1);
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addIntercept",
    ()=>addIntercept,
    "argmax",
    ()=>argmax,
    "choice",
    ()=>choice,
    "clip",
    ()=>clip,
    "identity",
    ()=>identity,
    "matMul",
    ()=>matMul,
    "matVec",
    ()=>matVec,
    "mean",
    ()=>mean,
    "median",
    ()=>median,
    "mulberry32",
    ()=>mulberry32,
    "normalSample",
    ()=>normalSample,
    "pearson",
    ()=>pearson,
    "sampleWithoutReplacement",
    ()=>sampleWithoutReplacement,
    "seededInt",
    ()=>seededInt,
    "shuffleInPlace",
    ()=>shuffleInPlace,
    "solveLinearSystem",
    ()=>solveLinearSystem,
    "std",
    ()=>std,
    "transpose",
    ()=>transpose,
    "uniqueSorted",
    ()=>uniqueSorted,
    "variance",
    ()=>variance
]);
function mulberry32(seed) {
    let a = seed >>> 0;
    return function next() {
        a |= 0;
        a = a + 0x6d2b79f5 | 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function seededInt(rng, min, max) {
    return Math.floor(rng() * (max - min + 1)) + min;
}
function shuffleInPlace(items, rng) {
    for(let i = items.length - 1; i > 0; i -= 1){
        const j = Math.floor(rng() * (i + 1));
        const tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
    }
    return items;
}
function mean(values) {
    if (values.length === 0) return 0;
    return values.reduce((sum, value)=>sum + value, 0) / values.length;
}
function variance(values) {
    if (values.length === 0) return 0;
    const mu = mean(values);
    return values.reduce((sum, value)=>sum + (value - mu) ** 2, 0) / values.length;
}
function std(values) {
    return Math.sqrt(variance(values));
}
function median(values) {
    if (values.length === 0) return 0;
    const sorted = [
        ...values
    ].sort((a, b)=>a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}
function pearson(x, y) {
    const n = Math.min(x.length, y.length);
    if (n === 0) return 0;
    const mx = mean(x.slice(0, n));
    const my = mean(y.slice(0, n));
    let num = 0;
    let dx = 0;
    let dy = 0;
    for(let i = 0; i < n; i += 1){
        const vx = x[i] - mx;
        const vy = y[i] - my;
        num += vx * vy;
        dx += vx * vx;
        dy += vy * vy;
    }
    const den = Math.sqrt(dx * dy);
    return den === 0 ? 0 : num / den;
}
function clip(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function argmax(values) {
    let best = 0;
    for(let i = 1; i < values.length; i += 1){
        if (values[i] > values[best]) best = i;
    }
    return best;
}
function uniqueSorted(values) {
    return [
        ...new Set(values)
    ].sort((a, b)=>a - b);
}
function solveLinearSystem(rawA, rawB) {
    const n = rawA.length;
    const M = rawA.map((row, i)=>{
        if (row.length !== n) {
            throw new Error("Matrix must be square");
        }
        return [
            ...row,
            rawB[i]
        ];
    });
    for(let k = 0; k < n; k += 1){
        let pivotRow = k;
        let pivotAbs = Math.abs(M[k][k]);
        for(let i = k + 1; i < n; i += 1){
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
        for(let i = k + 1; i < n; i += 1){
            const factor = M[i][k] / pivot;
            for(let j = k; j <= n; j += 1){
                M[i][j] -= factor * M[k][j];
            }
        }
    }
    const x = Array.from({
        length: n
    }, ()=>0);
    for(let i = n - 1; i >= 0; i -= 1){
        let sum = M[i][n];
        for(let j = i + 1; j < n; j += 1){
            sum -= M[i][j] * x[j];
        }
        const diag = Math.abs(M[i][i]) < 1e-12 ? 1e-12 : M[i][i];
        x[i] = sum / diag;
    }
    return x;
}
function addIntercept(X) {
    return X.map((row)=>[
            1,
            ...row
        ]);
}
function transpose(A) {
    if (A.length === 0) return [];
    return A[0].map((_, j)=>A.map((row)=>row[j]));
}
function matMul(A, B) {
    const n = A.length;
    const m = B[0]?.length ?? 0;
    const p = B.length;
    const out = Array.from({
        length: n
    }, ()=>Array.from({
            length: m
        }, ()=>0));
    for(let i = 0; i < n; i += 1){
        for(let k = 0; k < p; k += 1){
            const aik = A[i][k];
            for(let j = 0; j < m; j += 1){
                out[i][j] += aik * B[k][j];
            }
        }
    }
    return out;
}
function matVec(A, v) {
    return A.map((row)=>row.reduce((sum, value, i)=>sum + value * v[i], 0));
}
function identity(n) {
    return Array.from({
        length: n
    }, (_, i)=>Array.from({
            length: n
        }, (_, j)=>i === j ? 1 : 0));
}
function normalSample(rng) {
    const u = Math.max(rng(), 1e-9);
    const v = Math.max(rng(), 1e-9);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function choice(items, rng) {
    return items[Math.floor(rng() * items.length)];
}
function sampleWithoutReplacement(items, k, rng) {
    const copy = [
        ...items
    ];
    shuffleInPlace(copy, rng);
    return copy.slice(0, Math.min(k, copy.length));
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/metrics.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "classificationMetrics",
    ()=>classificationMetrics,
    "evaluatePredictions",
    ()=>evaluatePredictions,
    "formatMetric",
    ()=>formatMetric,
    "isBetter",
    ()=>isBetter,
    "mae",
    ()=>mae,
    "mape",
    ()=>mape,
    "metricValue",
    ()=>metricValue,
    "perClassCounts",
    ()=>perClassCounts,
    "r2Score",
    ()=>r2Score,
    "regressionMetrics",
    ()=>regressionMetrics,
    "rmse",
    ()=>rmse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-ssr] (ecmascript)");
;
function rmse(y, pred) {
    const n = y.length;
    if (n === 0) return 0;
    let sum = 0;
    for(let i = 0; i < n; i += 1)sum += (y[i] - pred[i]) ** 2;
    return Math.sqrt(sum / n);
}
function mae(y, pred) {
    const n = y.length;
    if (n === 0) return 0;
    let sum = 0;
    for(let i = 0; i < n; i += 1)sum += Math.abs(y[i] - pred[i]);
    return sum / n;
}
function r2Score(y, pred) {
    const n = y.length;
    if (n === 0) return 0;
    const yMean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mean"])(y);
    let ssRes = 0;
    let ssTot = 0;
    for(let i = 0; i < n; i += 1){
        ssRes += (y[i] - pred[i]) ** 2;
        ssTot += (y[i] - yMean) ** 2;
    }
    if (ssTot === 0) return 0;
    return 1 - ssRes / ssTot;
}
function mape(y, pred) {
    const n = y.length;
    if (n === 0) return 0;
    let sum = 0;
    let count = 0;
    for(let i = 0; i < n; i += 1){
        if (Math.abs(y[i]) < 1e-9) continue;
        sum += Math.abs((y[i] - pred[i]) / y[i]);
        count += 1;
    }
    return count === 0 ? 0 : sum / count * 100;
}
function perClassCounts(y, pred) {
    const labels = [
        ...new Set([
            ...y,
            ...pred
        ])
    ].sort((a, b)=>a - b);
    return labels.map((label)=>{
        let tp = 0;
        let fp = 0;
        let fn = 0;
        let support = 0;
        for(let i = 0; i < y.length; i += 1){
            if (y[i] === label) support += 1;
            if (pred[i] === label && y[i] === label) tp += 1;
            else if (pred[i] === label && y[i] !== label) fp += 1;
            else if (pred[i] !== label && y[i] === label) fn += 1;
        }
        return {
            label,
            tp,
            fp,
            fn,
            support
        };
    });
}
function safeDiv(numerator, denominator) {
    return denominator === 0 ? 0 : numerator / denominator;
}
function prf(counts) {
    const precision = safeDiv(counts.tp, counts.tp + counts.fp);
    const recall = safeDiv(counts.tp, counts.tp + counts.fn);
    const f1 = precision + recall === 0 ? 0 : 2 * precision * recall / (precision + recall);
    return {
        precision,
        recall,
        f1
    };
}
function classificationMetrics(y, pred) {
    const n = y.length;
    if (n === 0) return {
        accuracy: 0,
        precision: 0,
        recall: 0,
        f1: 0
    };
    let correct = 0;
    for(let i = 0; i < n; i += 1)if (pred[i] === y[i]) correct += 1;
    const accuracy = correct / n;
    const counts = perClassCounts(y, pred);
    if (counts.length <= 1) {
        return {
            accuracy,
            precision: accuracy,
            recall: accuracy,
            f1: accuracy
        };
    }
    if (counts.length === 2) {
        const positive = counts[counts.length - 1];
        const { precision, recall, f1 } = prf(positive);
        return {
            accuracy,
            precision,
            recall,
            f1
        };
    }
    let precisionSum = 0;
    let recallSum = 0;
    let f1Sum = 0;
    for (const counted of counts){
        const scored = prf(counted);
        precisionSum += scored.precision;
        recallSum += scored.recall;
        f1Sum += scored.f1;
    }
    return {
        accuracy,
        precision: precisionSum / counts.length,
        recall: recallSum / counts.length,
        f1: f1Sum / counts.length
    };
}
function regressionMetrics(y, pred) {
    return {
        rmse: rmse(y, pred),
        mae: mae(y, pred),
        r2: r2Score(y, pred),
        mape: mape(y, pred)
    };
}
function evaluatePredictions(task, y, pred) {
    return task === "classification" ? classificationMetrics(y, pred) : regressionMetrics(y, pred);
}
function metricValue(metrics, name) {
    if (!metrics) return Number.NaN;
    const value = metrics[name];
    return typeof value === "number" ? value : Number.NaN;
}
function isBetter(candidate, incumbent, optimize) {
    if (Number.isNaN(candidate)) return false;
    if (Number.isNaN(incumbent)) return true;
    return optimize === "minimize" ? candidate < incumbent : candidate > incumbent;
}
function formatMetric(name, value) {
    if (value === undefined || value === null || Number.isNaN(value)) return "â€”";
    if (name === "accuracy" || name === "precision" || name === "recall" || name === "f1" || name === "r2") {
        return value.toFixed(3);
    }
    if (Math.abs(value) >= 100) return value.toFixed(1);
    if (Math.abs(value) >= 10) return value.toFixed(2);
    return value.toFixed(4);
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryLine",
    ()=>HistoryLine,
    "ImportanceBars",
    ()=>ImportanceBars,
    "MetricBars",
    ()=>MetricBars,
    "ScatterPlot",
    ()=>ScatterPlot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/metrics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/format.ts [app-ssr] (ecmascript)");
;
;
;
function MetricBars({ items, invert, metric }) {
    if (items.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyPlot, {
            label: "Metrics appear after the first completed run"
        }, void 0, false, {
            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
            lineNumber: 14,
            columnNumber: 12
        }, this);
    }
    const values = items.map((item)=>item.value).filter((value)=>Number.isFinite(value));
    const max = Math.max(...values, 1e-6);
    const min = Math.min(...values);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: items.map((item)=>{
            const width = invert ? (max - item.value + (max - min) * 0.08) / (max - min + 1e-6) * 100 : item.value / max * 100;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prettyModel"])(item.label)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                                lineNumber: 28,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mono text-[#e8ebf4]",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMetric"])(metric, item.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                        lineNumber: 27,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-2 overflow-hidden rounded-full bg-white/5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-full rounded-full ${item.active ? "bg-[#5eead4]" : "bg-gradient-to-r from-[#8b9cff] to-[#5eead4]"}`,
                            style: {
                                width: `${Math.max(8, Math.min(100, width))}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                            lineNumber: 32,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                        lineNumber: 31,
                        columnNumber: 13
                    }, this)
                ]
            }, item.label, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                lineNumber: 26,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function HistoryLine({ points, metric }) {
    if (points.length === 0) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyPlot, {
        label: "The learning curve will plot here"
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 51,
        columnNumber: 35
    }, this);
    const w = 520;
    const h = 180;
    const ys = points.map((p)=>p.y);
    const min = Math.min(...ys);
    const max = Math.max(...ys);
    const pad = (max - min) * 0.18 || 0.05;
    const yAt = (value)=>{
        const lo = min - pad;
        const hi = max + pad;
        return h - 24 - (value - lo) / (hi - lo || 1) * (h - 40);
    };
    const xAt = (index)=>24 + index * (w - 48) / Math.max(points.length - 1, 1);
    const d = points.map((p, i)=>`${i === 0 ? "M" : "L"}${xAt(i)},${yAt(p.y)}`).join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${w} ${h}`,
        className: "h-44 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "16",
                y: "16",
                fill: "#8b93a7",
                fontSize: "10",
                children: metric.toUpperCase()
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: d,
                fill: "none",
                stroke: "#5eead4",
                strokeWidth: "2.2"
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            points.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: xAt(i),
                            cy: yAt(p.y),
                            r: "3.5",
                            fill: "#e3c27a"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                            x: xAt(i),
                            y: h - 6,
                            textAnchor: "middle",
                            fill: "#8b93a7",
                            fontSize: "10",
                            children: p.x
                        }, void 0, false, {
                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this)
                    ]
                }, `${p.label}-${i}`, true, {
                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function ScatterPlot({ y, pred }) {
    if (!y.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyPlot, {
        label: "Predicted vs actual appears after evaluation"
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 84,
        columnNumber: 25
    }, this);
    const w = 320;
    const h = 220;
    const all = [
        ...y,
        ...pred
    ];
    const min = Math.min(...all);
    const max = Math.max(...all);
    const proj = (value)=>{
        const t = (value - min) / (max - min || 1);
        return 24 + t * (Math.min(w, h) - 48);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: `0 0 ${w} ${h}`,
        className: "h-52 w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "24",
                y1: h - 24,
                x2: w - 16,
                y2: "24",
                stroke: "rgba(227,194,122,0.35)",
                strokeDasharray: "4 4"
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            y.map((value, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: 24 + (pred[i] - min) / (max - min || 1) * (w - 48),
                    cy: h - 24 - (value - min) / (max - min || 1) * (h - 48),
                    r: "3",
                    fill: "rgba(94,234,212,0.8)"
                }, i, false, {
                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                    lineNumber: 98,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "24",
                y: h - 8,
                fill: "#8b93a7",
                fontSize: "10",
                children: "predicted"
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                x: "12",
                y: "16",
                fill: "#8b93a7",
                fontSize: "10",
                children: [
                    "actual ",
                    proj(min) ? "" : ""
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function ImportanceBars({ items }) {
    if (!items.length) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyPlot, {
        label: "Feature importance is recorded per run"
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 117,
        columnNumber: 29
    }, this);
    const max = Math.max(...items.map((item)=>item.importance), 1e-6);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: items.slice().sort((a, b)=>b.importance - a.importance).slice(0, 8).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-[110px_1fr_42px] items-center gap-2 text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate text-[#8b93a7]",
                        children: item.name
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                        lineNumber: 127,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-1.5 rounded-full bg-white/5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-full rounded-full bg-[#8b9cff]",
                            style: {
                                width: `${item.importance / max * 100}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                            lineNumber: 129,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                        lineNumber: 128,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mono text-right text-[#e8ebf4]",
                        children: item.importance.toFixed(2)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                        lineNumber: 134,
                        columnNumber: 13
                    }, this)
                ]
            }, item.name, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
                lineNumber: 126,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
function EmptyPlot({ label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid h-36 place-items-center rounded-2xl border border-dashed border-white/10 text-center text-sm text-[#8b93a7]",
        children: label
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/domain.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PHASE_LABELS",
    ()=>PHASE_LABELS,
    "PHASE_ORDER",
    ()=>PHASE_ORDER
]);
const PHASE_ORDER = [
    "analyzing_dataset",
    "planning",
    "training",
    "evaluating",
    "analyzing",
    "deciding",
    "reporting"
];
const PHASE_LABELS = {
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
    failed: "Failed"
};
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dashboard",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/metrics.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$components$2f$charts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/charts.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$domain$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/domain.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const DEFAULT_GOAL = "Use the California Housing dataset and find the best regression model. Try different algorithms and hyperparameters and minimize RMSE. Try at least 5 different experiments.";
const DATASET_GOALS = {
    "california-housing": {
        name: "California Housing Sweep",
        goal: DEFAULT_GOAL
    },
    diabetes: {
        name: "Diabetes Progression Sweep",
        goal: "Use the Diabetes Progression dataset and find the best regression model. Minimize MAE, then compare RMSE. Try at least 5 different algorithms and hyperparameters."
    },
    "wine-quality": {
        name: "Wine Quality Sweep",
        goal: "Predict wine quality from physicochemical tests. Find the best regression model and minimize RMSE. Try linear models, trees, and boosting."
    },
    iris: {
        name: "Iris Classifier Sweep",
        goal: "Classify Iris flowers and maximize accuracy. Try logistic regression, kNN, trees, and ensembles. Report precision, recall, and F1."
    },
    income: {
        name: "Income Bracket Sweep",
        goal: "Predict whether income exceeds $50K and maximize F1. Compare linear and tree models, then tune the winner."
    }
};
function suggestionFor(dataset) {
    if (!dataset) return {
        name: "New experiment",
        goal: DEFAULT_GOAL
    };
    return DATASET_GOALS[dataset.slug] ?? {
        name: `${dataset.name} Sweep`,
        goal: dataset.taskType === "classification" ? `Use the ${dataset.name} dataset and find the best classification model. Maximize accuracy and F1. Try at least 5 experiments.` : `Use the ${dataset.name} dataset and find the best regression model. Minimize RMSE. Try different algorithms and hyperparameters.`
    };
}
function Dashboard() {
    const [projects, setProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [datasets, setDatasets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [project, setProject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [dataset, setDataset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [runs, setRuns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [logs, setLogs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [goal, setGoal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_GOAL);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("California Housing Sweep");
    const [datasetId, setDatasetId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [maxExperiments, setMaxExperiments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(6);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [llm, setLlm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploadOpen, setUploadOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const loadLists = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const [projectRes, datasetRes, metaRes] = await Promise.all([
            fetch("/api/projects"),
            fetch("/api/datasets"),
            fetch("/api/meta")
        ]);
        const projectJson = await projectRes.json();
        const datasetJson = await datasetRes.json();
        const metaJson = await metaRes.json();
        setProjects(projectJson.projects);
        setDatasets(datasetJson.datasets);
        setLlm(metaJson.llm);
        setDatasetId((current)=>{
            if (current) return current;
            const housing = datasetJson.datasets.find((item)=>item.slug === "california-housing") ?? datasetJson.datasets[0];
            return housing?.id ?? "";
        });
    }, []);
    const refreshSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (id)=>{
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) return;
        const json = await res.json();
        setProject(json.project);
        setDataset(json.dataset);
        setRuns(json.experiments);
        setLogs(json.logs);
        setGoal(json.project.goal);
        setName(json.project.name);
        setMaxExperiments(json.project.maxExperiments);
        if (json.project.datasetId) setDatasetId(json.project.datasetId);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void loadLists();
    }, [
        loadLists
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedId) void refreshSelected(selectedId);
    }, [
        selectedId,
        refreshSelected
    ]);
    const metric = project?.primaryMetric ?? "rmse";
    const invert = project?.optimize === "minimize";
    const best = runs.find((run)=>run.id === project?.bestExperimentId) ?? null;
    const completed = runs.filter((run)=>run.status === "completed" && run.testMetrics);
    async function createProject() {
        setError(null);
        const res = await fetch("/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                goal,
                datasetId,
                maxExperiments,
                minExperiments: Math.min(5, maxExperiments)
            })
        });
        const json = await res.json();
        if (!res.ok || !json.project) {
            setError(json.error ?? "Could not create project");
            return null;
        }
        setSelectedId(json.project.id);
        await loadLists();
        return json.project.id;
    }
    async function saveAndRun() {
        setBusy(true);
        setError(null);
        try {
            let id = selectedId;
            if (!id || project?.status === "completed" || project?.status === "failed") {
                id = await createProject();
            } else if (id) {
                await fetch(`/api/projects/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name,
                        goal,
                        datasetId,
                        maxExperiments,
                        minExperiments: Math.min(5, maxExperiments)
                    })
                });
            }
            if (!id) return;
            const start = await fetch(`/api/projects/${id}/start`, {
                method: "POST"
            });
            if (!start.ok) {
                const json = await start.json();
                throw new Error(json.error ?? "Unable to start the agent");
            }
            await refreshSelected(id);
            let done = false;
            while(!done){
                const step = await fetch(`/api/projects/${id}/step`, {
                    method: "POST"
                });
                const json = await step.json();
                if (!step.ok) throw new Error(json.error ?? "Experiment step failed");
                await refreshSelected(id);
                done = Boolean(json.done);
            }
            await loadLists();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Run failed");
        } finally{
            setBusy(false);
        }
    }
    const currentPhase = project?.phase ?? "idle";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen px-4 py-4 text-[#e8ebf4] md:px-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "panel mb-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl px-5 py-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                viewBox: "0 0 64 64",
                                className: "h-11 w-11",
                                "aria-label": "Aether",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                            id: "ag",
                                            x1: "0",
                                            y1: "0",
                                            x2: "1",
                                            y2: "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "0%",
                                                    stopColor: "#f4c56a"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 7
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "55%",
                                                    stopColor: "#d79b3c"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                    lineNumber: 207,
                                                    columnNumber: 7
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                    offset: "100%",
                                                    stopColor: "#8a5cf6"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 7
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                            lineNumber: 205,
                                            columnNumber: 5
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 204,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "2",
                                        y: "2",
                                        width: "60",
                                        height: "60",
                                        rx: "16",
                                        fill: "#0d1117"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 211,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                        x: "2.75",
                                        y: "2.75",
                                        width: "58.5",
                                        height: "58.5",
                                        rx: "15.25",
                                        fill: "none",
                                        stroke: "url(#ag)",
                                        strokeWidth: "1.5",
                                        opacity: "0.7"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 212,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                        cx: "32",
                                        cy: "32",
                                        rx: "21",
                                        ry: "9.5",
                                        fill: "none",
                                        stroke: "url(#ag)",
                                        strokeWidth: "2",
                                        opacity: "0.55",
                                        transform: "rotate(-28 32 32)"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 213,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M32 14 L44 46 L37.6 46 L34.9 38.4 L29.1 38.4 L26.4 46 L20 46 Z",
                                        fill: "url(#ag)"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 214,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M32 25.5 L34.2 33.2 L29.8 33.2 Z",
                                        fill: "#0d1117"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 215,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "50",
                                        cy: "21",
                                        r: "3",
                                        fill: "#f4c56a"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 216,
                                        columnNumber: 3
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                        cx: "14",
                                        cy: "43",
                                        r: "2.4",
                                        fill: "#8a5cf6"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 217,
                                        columnNumber: 3
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[11px] uppercase tracking-[0.22em] text-[#e3c27a]",
                                        children: "Agentic experiment lab"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl font-semibold tracking-tight",
                                        children: "Aether"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 221,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-3 text-sm text-[#8b93a7]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-white/10 px-3 py-1",
                                children: "Planner → Train → Evaluate → Analyze → Decide"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 225,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-white/10 px-3 py-1",
                                children: [
                                    "LLM ",
                                    llm?.generative ? "live" : "policy + optional Ollama",
                                    " · ",
                                    llm?.model ?? "adaptive"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "panel rounded-[28px] p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                        children: "Projects"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 237,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-full bg-white/8 px-3 py-1 text-xs text-[#5eead4]",
                                        onClick: ()=>{
                                            setSelectedId(null);
                                            setProject(null);
                                            setRuns([]);
                                            setLogs([]);
                                            const first = datasets.find((item)=>item.slug === "california-housing") ?? datasets[0];
                                            if (first) {
                                                setDatasetId(first.id);
                                                const suggestion = suggestionFor(first);
                                                setName(suggestion.name);
                                                setGoal(suggestion.goal);
                                            }
                                        },
                                        children: "New"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 238,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    projects.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedId(item.id),
                                            className: `w-full rounded-2xl border px-3 py-3 text-left ${selectedId === item.id ? "border-[#5eead4]/40 bg-white/8" : "border-white/5 bg-white/3"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "truncate text-sm font-medium",
                                                            children: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                            lineNumber: 267,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusPill, {
                                                            status: item.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                            lineNumber: 268,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 line-clamp-2 text-xs text-[#8b93a7]",
                                                    children: item.goal
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                    lineNumber: 270,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                            lineNumber: 259,
                                            columnNumber: 15
                                        }, this)),
                                    projects.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-[#8b93a7]",
                                        children: "No projects yet. Launch the first sweep."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 273,
                                        columnNumber: 39
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "panel rounded-[28px] p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex flex-wrap items-end justify-between gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-[11px] uppercase tracking-[0.18em] text-[#8b93a7]",
                                                        children: "Natural-language goal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "text-2xl font-semibold",
                                                        children: "What should the agent optimize?"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                        lineNumber: 282,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 280,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                disabled: busy,
                                                onClick: ()=>void saveAndRun(),
                                                className: "rounded-full bg-[#5eead4] px-5 py-2.5 text-sm font-semibold text-[#06221d] disabled:opacity-60",
                                                children: busy ? "Agent running…" : "Start experiment"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 284,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid gap-3 md:grid-cols-[1fr_110px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: name,
                                                onChange: (e)=>setName(e.target.value),
                                                className: "rounded-2xl border border-white/10 bg-black/20 px-4 py-3 outline-none",
                                                placeholder: "Project name"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 293,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "flex flex-col justify-center rounded-2xl border border-white/10 bg-black/20 px-3 py-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] uppercase tracking-[0.14em] text-[#8b93a7]",
                                                        children: "Max runs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: 3,
                                                        max: 12,
                                                        value: maxExperiments,
                                                        onChange: (e)=>setMaxExperiments(Number(e.target.value)),
                                                        className: "bg-transparent outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 299,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 292,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mb-2 text-[11px] uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Pick a dataset"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 312,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-3",
                                                children: datasets.map((item)=>{
                                                    const active = item.id === datasetId;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setDatasetId(item.id);
                                                            const suggestion = suggestionFor(item);
                                                            setName(suggestion.name);
                                                            setGoal(suggestion.goal);
                                                            setSelectedId(null);
                                                            setProject(null);
                                                            setRuns([]);
                                                            setLogs([]);
                                                        },
                                                        className: `rounded-2xl border px-3 py-3 text-left ${active ? "border-[#5eead4]/50 bg-[#5eead4]/8" : "border-white/8 bg-black/20"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center justify-between gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "truncate text-sm font-medium",
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                        lineNumber: 335,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[10px] uppercase tracking-[0.12em] text-[#e3c27a]",
                                                                        children: item.taskType
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                        lineNumber: 336,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 334,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "mt-1 text-[11px] text-[#8b93a7]",
                                                                children: [
                                                                    item.rowCount,
                                                                    " rows · ",
                                                                    item.featureColumns.length,
                                                                    " features · ",
                                                                    item.source
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 340,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 313,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 311,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: goal,
                                        onChange: (e)=>setGoal(e.target.value),
                                        rows: 4,
                                        className: "mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-[15px] leading-7 outline-none"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#8b93a7]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-[#8b9cff]",
                                                onClick: ()=>setUploadOpen((v)=>!v),
                                                children: "Or upload your own CSV"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 355,
                                                columnNumber: 15
                                            }, this),
                                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#fb7185]",
                                                children: error
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 358,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    uploadOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadPanel, {
                                        onDone: (id)=>{
                                            void loadLists().then(()=>{
                                                if (!id) return;
                                                setDatasetId(id);
                                                setSelectedId(null);
                                                setProject(null);
                                                setRuns([]);
                                                setLogs([]);
                                                setName("Uploaded dataset sweep");
                                                setGoal("Use the uploaded dataset and find the best model. Try at least 5 experiments.");
                                            });
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 361,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 278,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Pipeline, {
                                phase: currentPhase,
                                running: busy || project?.status === "running"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "grid gap-4 lg:grid-cols-[1.1fr_0.9fr]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel rounded-[28px] p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Agent activity"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 382,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "max-h-[360px] space-y-3 overflow-auto pr-1",
                                                children: [
                                                    logs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-[#8b93a7]",
                                                        children: "The agent will narrate each node here."
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 39
                                                    }, this),
                                                    logs.map((log)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                            className: "rounded-2xl border border-white/5 bg-black/20 px-3 py-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mb-1 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: log.level === "error" ? "text-[#fb7185]" : "text-[#5eead4]",
                                                                            children: log.node
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                            lineNumber: 388,
                                                                            columnNumber: 23
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "mono",
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatTime"])(log.createdAt)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                            lineNumber: 389,
                                                                            columnNumber: 23
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 387,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm leading-6",
                                                                    children: log.message
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 391,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, log.id, true, {
                                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                            lineNumber: 386,
                                                            columnNumber: 19
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 383,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 381,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel rounded-[28px] p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Current experiment"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 397,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CurrentCard, {
                                                run: runs[runs.length - 1] ?? null,
                                                metric: metric,
                                                phase: currentPhase
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 398,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 396,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 380,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "panel rounded-[28px] p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Experiment history"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 404,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-[#8b93a7]",
                                                children: [
                                                    completed.length,
                                                    " completed runs"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 405,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 403,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overflow-x-auto",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                            className: "w-full min-w-[720px] text-left text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                    className: "text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "pb-3",
                                                                children: "Run"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 411,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "pb-3",
                                                                children: "Model"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 412,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "pb-3",
                                                                children: "Hyperparameters"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 413,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "pb-3",
                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prettyMetric"])(metric)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 414,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "pb-3",
                                                                children: "R² / Acc"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 415,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "pb-3",
                                                                children: "Duration"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 416,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                                className: "pb-3",
                                                                children: "Status"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                lineNumber: 417,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                        lineNumber: 410,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                    children: runs.map((run)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "border-t border-white/5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 mono text-[#e3c27a]",
                                                                    children: [
                                                                        "#",
                                                                        run.runNumber
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 423,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prettyModel"])(run.modelName)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 424,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 text-xs text-[#8b93a7]",
                                                                    children: JSON.stringify(run.hyperparameters)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 425,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 mono",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMetric"])(metric, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 426,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 mono",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMetric"])("r2", run.testMetrics?.r2 ?? run.testMetrics?.accuracy)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 427,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3 mono",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDuration"])(run.trainDurationMs)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 430,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatusPill, {
                                                                        status: run.status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                        lineNumber: 432,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                                    lineNumber: 431,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, run.id, true, {
                                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                            lineNumber: 422,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                    lineNumber: 420,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                            lineNumber: 408,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 407,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "grid gap-4 lg:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel rounded-[28px] p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Model comparison"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 443,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$components$2f$charts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MetricBars"], {
                                                metric: metric,
                                                invert: invert,
                                                items: completed.map((run)=>({
                                                        label: `${run.modelName} #${run.runNumber}`,
                                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric),
                                                        active: run.id === best?.id
                                                    }))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 444,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 442,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel rounded-[28px] p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Search trajectory"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 455,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$components$2f$charts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HistoryLine"], {
                                                metric: metric,
                                                points: completed.map((run)=>({
                                                        x: run.runNumber,
                                                        y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric),
                                                        label: run.modelName
                                                    }))
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 456,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "grid gap-4 lg:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel rounded-[28px] p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Predicted vs actual"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 469,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$components$2f$charts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScatterPlot"], {
                                                y: best?.preview?.y ?? [],
                                                pred: best?.preview?.pred ?? []
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 470,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 468,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel rounded-[28px] p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-3 text-sm uppercase tracking-[0.16em] text-[#8b93a7]",
                                                children: "Feature importance"
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 473,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$components$2f$charts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImportanceBars"], {
                                                items: best?.featureImportance ?? []
                                            }, void 0, false, {
                                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                                lineNumber: 474,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 472,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 467,
                                columnNumber: 11
                            }, this),
                            project?.report && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReportCard, {
                                report: project.report
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 478,
                                columnNumber: 31
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BestModelCard, {
                                best: best,
                                metric: metric
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 482,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DatasetCard, {
                                dataset: dataset ?? datasets.find((item)=>item.id === datasetId) ?? null
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 483,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel overflow-hidden rounded-[28px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/images/lab-orb.svg",
                                        alt: "",
                                        className: "h-44 w-full object-cover opacity-80"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 485,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 text-sm leading-6 text-[#8b93a7]",
                                        children: "Safe tools only: dataset inspection, registry models, holdout metrics, and MLflow-style tracking. The LLM never executes generated code."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                        lineNumber: 486,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 484,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 481,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 200,
        columnNumber: 5
    }, this);
}
function Pipeline({ phase, running }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "panel rounded-[28px] p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-2 md:grid-cols-7",
            children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$domain$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PHASE_ORDER"].map((item)=>{
                const active = phase === item || item === "training" && phase === "selecting";
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `rounded-2xl border px-3 py-3 ${active ? "phase-active border-[#5eead4]/40 bg-[#5eead4]/8" : "border-white/5"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `h-2 w-2 rounded-full ${active && running ? "pulse-dot bg-[#5eead4]" : "bg-white/20"}`
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                    lineNumber: 509,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] uppercase tracking-[0.14em] text-[#8b93a7]",
                                    children: active && running ? "live" : "node"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                    lineNumber: 510,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                            lineNumber: 508,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm font-medium",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$domain$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PHASE_LABELS"][item]
                        }, void 0, false, {
                            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                            lineNumber: 512,
                            columnNumber: 15
                        }, this)
                    ]
                }, item, true, {
                    fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                    lineNumber: 504,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
            lineNumber: 500,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 499,
        columnNumber: 5
    }, this);
}
function CurrentCard({ run, metric, phase }) {
    if (!run) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-[#8b93a7]",
            children: "Waiting for the planner to queue the first training job."
        }, void 0, false, {
            fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
            lineNumber: 531,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] uppercase tracking-[0.16em] text-[#e3c27a]",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$domain$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PHASE_LABELS"][phase]
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 535,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: "mt-1 text-xl font-semibold",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prettyModel"])(run.modelName)
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-[#8b93a7]",
                children: run.decisionReason || run.notes
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 537,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "mt-4 grid grid-cols-2 gap-3 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-black/20 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]",
                                children: [
                                    "Holdout ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prettyMetric"])(metric)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 540,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "mono mt-1 text-lg",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMetric"])(metric, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric))
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 541,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 539,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-black/20 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-[11px] uppercase tracking-[0.14em] text-[#8b93a7]",
                                children: "Duration"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 544,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "mono mt-1 text-lg",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDuration"])(run.trainDurationMs)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 543,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 538,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 534,
        columnNumber: 5
    }, this);
}
function BestModelCard({ best, metric }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "panel rounded-[28px] p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] uppercase tracking-[0.18em] text-[#e3c27a]",
                children: "Best model"
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 555,
                columnNumber: 7
            }, this),
            best ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-2 text-2xl font-semibold",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prettyModel"])(best.modelName)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 558,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mono mt-3 text-3xl text-[#5eead4]",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatMetric"])(metric, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["metricValue"])(best.testMetrics, metric))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 559,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs uppercase tracking-[0.16em] text-[#8b93a7]",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["prettyMetric"])(metric)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 560,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "mt-4 overflow-auto rounded-2xl bg-black/30 p-3 text-xs text-[#cdd3e3]",
                        children: JSON.stringify(best.hyperparameters, null, 2)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 561,
                        columnNumber: 11
                    }, this),
                    best.coefficients && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 text-xs leading-6 text-[#8b93a7]",
                        children: Object.entries(best.coefficients).slice(0, 6).map(([key, value])=>`${key} ${value.toFixed(3)}`).join(" · ")
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 565,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm text-[#8b93a7]",
                children: "The leaderboard fills in as soon as the first model is evaluated."
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 574,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 554,
        columnNumber: 5
    }, this);
}
function DatasetCard({ dataset }) {
    if (!dataset) return null;
    const top = dataset.stats.correlations?.slice(0, 4) ?? [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "panel rounded-[28px] p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] uppercase tracking-[0.18em] text-[#8b93a7]",
                children: "Dataset"
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 585,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mt-2 text-xl font-semibold",
                children: dataset.name
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 586,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6 text-[#8b93a7]",
                children: dataset.description
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 587,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 grid grid-cols-2 gap-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Rows",
                        value: String(dataset.rowCount)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 589,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Features",
                        value: String(dataset.featureColumns.length)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 590,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Task",
                        value: dataset.taskType
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 591,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Stat, {
                        label: "Target",
                        value: dataset.targetColumn
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 592,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 588,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-1 text-xs text-[#8b93a7]",
                children: top.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: item.feature
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 597,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mono text-[#e8ebf4]",
                                children: [
                                    "r=",
                                    item.corr.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 598,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.feature, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 596,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 594,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 584,
        columnNumber: 5
    }, this);
}
function ReportCard({ report }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "panel rounded-[28px] p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[11px] uppercase tracking-[0.18em] text-[#e3c27a]",
                children: "Final report"
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 609,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mt-2 text-2xl font-semibold",
                children: report.headline
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 610,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 max-w-3xl text-[15px] leading-8 text-[#c5cad8]",
                children: report.narrative
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 611,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 grid gap-4 md:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold",
                                children: "Why it won"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-7 text-[#8b93a7]",
                                children: report.whyItWon
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 615,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-semibold",
                                children: "Dataset insight"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-7 text-[#8b93a7]",
                                children: report.datasetInsights
                            }, void 0, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 619,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-5 space-y-2 text-sm text-[#c5cad8]",
                children: report.experimentLessons.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "rounded-2xl bg-black/20 px-3 py-2",
                        children: item
                    }, item, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 624,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 622,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 608,
        columnNumber: 5
    }, this);
}
function UploadPanel({ onDone }) {
    const [file, setFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [headers, setHeaders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [target, setTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    async function inspect(next) {
        const form = new FormData();
        form.set("file", next);
        const res = await fetch("/api/datasets/preview", {
            method: "POST",
            body: form
        });
        const json = await res.json();
        if (!res.ok) {
            setMessage(json.error ?? "Could not parse CSV");
            return;
        }
        setHeaders(json.headers ?? []);
        setTarget(json.headers?.[json.headers.length - 1] ?? "");
    }
    async function upload() {
        if (!file) return;
        const form = new FormData();
        form.set("file", file);
        form.set("targetColumn", target);
        form.set("name", file.name);
        const res = await fetch("/api/datasets", {
            method: "POST",
            body: form
        });
        const json = await res.json();
        if (!res.ok) {
            setMessage(json.error ?? "Upload failed");
            return;
        }
        setMessage("Dataset added to the lab.");
        onDone();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 rounded-2xl border border-white/10 bg-black/20 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "file",
                accept: ".csv",
                onChange: (e)=>{
                    const next = e.target.files?.[0] ?? null;
                    setFile(next);
                    if (next) void inspect(next);
                }
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 670,
                columnNumber: 7
            }, this),
            headers.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex flex-wrap items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: target,
                        onChange: (e)=>setTarget(e.target.value),
                        className: "rounded-xl bg-black/30 px-3 py-2",
                        children: headers.map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                children: header
                            }, header, false, {
                                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                                lineNumber: 683,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 681,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>void upload(),
                        className: "rounded-full bg-white/10 px-4 py-2 text-sm",
                        children: "Add dataset"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                        lineNumber: 686,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 680,
                columnNumber: 9
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xs text-[#8b93a7]",
                children: message
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 691,
                columnNumber: 19
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 669,
        columnNumber: 5
    }, this);
}
function StatusPill({ status }) {
    const color = status === "completed" ? "text-[#86efac]" : status === "running" ? "text-[#5eead4]" : status === "failed" ? "text-[#fb7185]" : "text-[#8b93a7]";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `text-[11px] uppercase tracking-[0.14em] ${color}`,
        children: status
    }, void 0, false, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 699,
        columnNumber: 10
    }, this);
}
function Stat({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl bg-black/20 px-3 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-[10px] uppercase tracking-[0.14em] text-[#8b93a7]",
                children: label
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 705,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-sm",
                children: value
            }, void 0, false, {
                fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
                lineNumber: 706,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/agentic-ml-experiment-orchestrator/src/components/dashboard.tsx",
        lineNumber: 704,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Downloads_agentic-ml-experiment-orchestrator_src_0l4onpj._.js.map
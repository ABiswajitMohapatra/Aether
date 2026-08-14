module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "jsonError",
    ()=>jsonError,
    "publicDataset",
    ()=>publicDataset,
    "publicExperiment",
    ()=>publicExperiment,
    "publicProject",
    ()=>publicProject
]);
function publicDataset(row) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        source: row.source,
        taskType: row.taskType,
        targetColumn: row.targetColumn,
        featureColumns: row.featureColumns,
        rowCount: row.rowCount,
        description: row.description,
        stats: row.stats,
        createdAt: row.createdAt.toISOString()
    };
}
function publicProject(row) {
    return {
        ...row,
        createdAt: row.createdAt.toISOString(),
        updatedAt: row.updatedAt.toISOString()
    };
}
function publicExperiment(row) {
    return {
        ...row,
        createdAt: row.createdAt.toISOString(),
        completedAt: row.completedAt ? row.completedAt.toISOString() : null
    };
}
function jsonError(message, status = 400) {
    return Response.json({
        error: message
    }, {
        status
    });
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/preprocess.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyScaler",
    ()=>applyScaler,
    "computeDatasetStats",
    ()=>computeDatasetStats,
    "csvToPayload",
    ()=>csvToPayload,
    "fitScaler",
    ()=>fitScaler,
    "parseCsv",
    ()=>parseCsv,
    "trainTestSplit",
    ()=>trainTestSplit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-route] (ecmascript)");
;
function fitScaler(X) {
    if (X.length === 0) return {
        mean: [],
        scale: []
    };
    const cols = X[0].length;
    const means = [];
    const scales = [];
    for(let j = 0; j < cols; j += 1){
        const col = X.map((row)=>row[j]);
        const mu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(col);
        const sigma = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["std"])(col);
        means.push(mu);
        scales.push(sigma < 1e-9 ? 1 : sigma);
    }
    return {
        mean: means,
        scale: scales
    };
}
function applyScaler(X, scaler) {
    return X.map((row)=>row.map((value, j)=>(value - scaler.mean[j]) / scaler.scale[j]));
}
function trainTestSplit(X, y, testSize = 0.2, seed = 42) {
    const idx = X.map((_, i)=>i);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["shuffleInPlace"])(idx, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(seed));
    const nTest = Math.max(1, Math.floor(idx.length * testSize));
    const testIdx = idx.slice(0, nTest);
    const trainIdx = idx.slice(nTest);
    return {
        xTrain: trainIdx.map((i)=>X[i]),
        yTrain: trainIdx.map((i)=>y[i]),
        xTest: testIdx.map((i)=>X[i]),
        yTest: testIdx.map((i)=>y[i])
    };
}
function computeDatasetStats(payload, taskType) {
    const { X, y, featureNames, targetName, classNames } = payload;
    const featureSummary = featureNames.map((name, j)=>{
        const col = X.map((row)=>row[j]);
        return {
            name,
            mean: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(col),
            std: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["std"])(col),
            min: Math.min(...col),
            max: Math.max(...col)
        };
    });
    const correlations = featureNames.map((feature, j)=>({
            feature,
            corr: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pearson"])(X.map((row)=>row[j]), y)
        })).sort((a, b)=>Math.abs(b.corr) - Math.abs(a.corr));
    const classBalance = taskType === "classification" ? y.reduce((acc, value)=>{
        const label = classNames?.[value] ?? String(value);
        acc[label] = (acc[label] ?? 0) + 1;
        return acc;
    }, {}) : undefined;
    return {
        rowCount: X.length,
        featureCount: featureNames.length,
        targetName,
        featureNames,
        missingCount: 0,
        targetMean: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(y),
        targetStd: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["std"])(y),
        targetMin: Math.min(...y),
        targetMax: Math.max(...y),
        classBalance,
        featureSummary,
        correlations
    };
}
function parseCsv(text) {
    const lines = text.split(/\r?\n/).map((line)=>line.trim()).filter(Boolean);
    if (lines.length < 2) {
        throw new Error("CSV must include a header and at least one row");
    }
    const headers = splitCsvLine(lines[0]);
    const rows = lines.slice(1).map(splitCsvLine);
    return {
        headers,
        rows
    };
}
function splitCsvLine(line) {
    const cells = [];
    let current = "";
    let inQuotes = false;
    for(let i = 0; i < line.length; i += 1){
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
function csvToPayload(headers, rows, targetColumn) {
    const targetIndex = headers.indexOf(targetColumn);
    if (targetIndex < 0) {
        throw new Error(`Target column "${targetColumn}" was not found`);
    }
    const featureIndexes = headers.map((name, i)=>({
            name,
            i
        })).filter((col)=>col.i !== targetIndex);
    const numericFeatureIdx = featureIndexes.filter((col)=>rows.every((row)=>row[col.i] === "" || Number.isFinite(Number(row[col.i]))));
    if (numericFeatureIdx.length === 0) {
        throw new Error("No numeric feature columns were detected");
    }
    const targetValues = rows.map((row)=>row[targetIndex]);
    const targetIsNumeric = targetValues.every((value)=>Number.isFinite(Number(value)));
    let y;
    let classNames;
    if (targetIsNumeric && new Set(targetValues).size > 12) {
        y = targetValues.map(Number);
    } else {
        classNames = [
            ...new Set(targetValues)
        ];
        const index = new Map(classNames.map((name, i)=>[
                name,
                i
            ]));
        y = targetValues.map((value)=>index.get(value) ?? 0);
    }
    const X = rows.map((row)=>numericFeatureIdx.map((col)=>Number(row[col.i] || 0)));
    return {
        X,
        y,
        featureNames: numericFeatureIdx.map((col)=>col.name),
        targetName: targetColumn,
        classNames
    };
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/app/api/datasets/preview/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/preprocess.ts [app-route] (ecmascript)");
;
;
const dynamic = "force-dynamic";
async function POST(request) {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonError"])("Upload a CSV file");
    const text = await file.text();
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCsv"])(text);
    return Response.json({
        headers: parsed.headers,
        preview: parsed.rows.slice(0, 6),
        rowCount: parsed.rows.length
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__139j1ew._.js.map
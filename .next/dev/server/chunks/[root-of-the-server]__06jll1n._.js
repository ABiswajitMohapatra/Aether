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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "db",
    ()=>db,
    "pool",
    ()=>pool
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/node-postgres/driver.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
}
const globalForDb = globalThis;
const pool = globalForDb.__arenaNextJsPostgresqlPool ?? new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$pg$29$__["Pool"]({
    connectionString: databaseUrl
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForDb.__arenaNextJsPostgresqlPool = pool;
}
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$node$2d$postgres$2f$driver$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["drizzle"])(pool);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/schema.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "agentLogs",
    ()=>agentLogs,
    "datasets",
    ()=>datasets,
    "experiments",
    ()=>experiments,
    "projects",
    ()=>projects,
    "trackingRuns",
    ()=>trackingRuns
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/pg-core/columns/integer.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/pg-core/columns/jsonb.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/pg-core/table.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/pg-core/columns/text.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/pg-core/columns/timestamp.js [app-route] (ecmascript)");
;
const datasets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("datasets", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    slug: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("slug").notNull().unique(),
    source: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("source").notNull(),
    taskType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("task_type").$type().notNull(),
    targetColumn: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("target_column").notNull(),
    featureColumns: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("feature_columns").$type().notNull(),
    rowCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("row_count").notNull(),
    description: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("description").notNull(),
    stats: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("stats").$type().notNull(),
    payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("payload").$type().notNull(),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
const projects = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("projects", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    goal: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("goal").notNull(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("status").$type().notNull().default("draft"),
    phase: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("phase").$type().notNull().default("idle"),
    taskType: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("task_type").$type(),
    primaryMetric: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("primary_metric"),
    optimize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("optimize"),
    datasetId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("dataset_id").references(()=>datasets.id),
    maxExperiments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("max_experiments").notNull().default(6),
    minExperiments: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("min_experiments").notNull().default(5),
    bestExperimentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("best_experiment_id"),
    plan: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("plan").$type(),
    report: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("report").$type(),
    summary: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("summary"),
    error: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("error"),
    nextConfig: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("next_config"),
    iteration: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("iteration").notNull().default(0),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow(),
    updatedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("updated_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
const experiments = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("experiments", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    projectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("project_id").notNull().references(()=>projects.id, {
        onDelete: "cascade"
    }),
    runNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("run_number").notNull(),
    modelName: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("model_name").notNull(),
    hyperparameters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("hyperparameters").$type().notNull(),
    datasetInfo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("dataset_info").$type(),
    status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("status").notNull().default("queued"),
    trainMetrics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("train_metrics").$type(),
    testMetrics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("test_metrics").$type(),
    cvMetrics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("cv_metrics").$type(),
    featureImportance: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("feature_importance").$type(),
    preview: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("preview").$type(),
    coefficients: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("coefficients").$type(),
    trainDurationMs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$integer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["integer"])("train_duration_ms"),
    notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("notes"),
    decisionReason: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("decision_reason"),
    trackingUri: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("tracking_uri"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow(),
    completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("completed_at", {
        withTimezone: true
    })
});
const agentLogs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("agent_logs", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    projectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("project_id").notNull().references(()=>projects.id, {
        onDelete: "cascade"
    }),
    experimentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("experiment_id"),
    node: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("node").notNull(),
    phase: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("phase").notNull(),
    level: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("level").notNull().default("info"),
    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("message").notNull(),
    payload: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("payload"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
const trackingRuns = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$table$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pgTable"])("tracking_runs", {
    id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("id").primaryKey(),
    experimentId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("experiment_id").notNull().references(()=>experiments.id, {
        onDelete: "cascade"
    }),
    projectId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("project_id").notNull(),
    name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("name").notNull(),
    params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("params").$type().notNull(),
    metrics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("metrics").$type().notNull(),
    tags: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$jsonb$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonb"])("tags").$type().notNull(),
    artifactUri: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$text$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["text"])("artifact_uri"),
    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$pg$2d$core$2f$columns$2f$timestamp$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["timestamp"])("created_at", {
        withTimezone: true
    }).notNull().defaultNow()
});
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/id.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createId",
    ()=>createId
]);
function createId(prefix) {
    const id = crypto.randomUUID();
    return prefix ? `${prefix}_${id}` : id;
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/logger.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "logger",
    ()=>logger
]);
function stamp(level, scope, message, extra) {
    const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] [${scope}] ${message}`;
    if (extra !== undefined) {
        console.log(line, extra);
        return;
    }
    console.log(line);
}
const logger = {
    debug (scope, message, extra) {
        stamp("debug", scope, message, extra);
    },
    info (scope, message, extra) {
        stamp("info", scope, message, extra);
    },
    warn (scope, message, extra) {
        stamp("warn", scope, message, extra);
    },
    error (scope, message, extra) {
        stamp("error", scope, message, extra);
    }
};
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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/metrics.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-route] (ecmascript)");
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
    const yMean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(y);
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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/tree.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bootstrapIndices",
    ()=>bootstrapIndices,
    "fitTree",
    ()=>fitTree,
    "predictTree",
    ()=>predictTree,
    "predictTreeMany",
    ()=>predictTreeMany
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-route] (ecmascript)");
;
function featureCount(maxFeatures, nFeatures) {
    if (maxFeatures === "all") return nFeatures;
    if (maxFeatures === "sqrt") return Math.max(1, Math.floor(Math.sqrt(nFeatures)));
    if (maxFeatures === "log2") return Math.max(1, Math.floor(Math.log2(nFeatures)));
    if (maxFeatures > 0 && maxFeatures < 1) return Math.max(1, Math.floor(maxFeatures * nFeatures));
    return Math.max(1, Math.min(nFeatures, Math.floor(maxFeatures)));
}
function majorityClass(y, idx) {
    const counts = new Map();
    for (const i of idx)counts.set(y[i], (counts.get(y[i]) ?? 0) + 1);
    let best = y[idx[0]] ?? 0;
    let bestCount = -1;
    for (const [label, count] of counts){
        if (count > bestCount) {
            best = label;
            bestCount = count;
        }
    }
    return best;
}
function gini(counts, n) {
    if (n === 0) return 0;
    let sum = 0;
    for (const count of counts.values()){
        const p = count / n;
        sum += p * p;
    }
    return 1 - sum;
}
function bestSplit(X, y, idx, options, rng) {
    const nFeatures = X[0]?.length ?? 0;
    const k = featureCount(options.maxFeatures, nFeatures);
    const features = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sampleWithoutReplacement"])(Array.from({
        length: nFeatures
    }, (_, i)=>i), k, rng);
    const n = idx.length;
    let parentImpurity = 0;
    let totalSum = 0;
    let totalSumSq = 0;
    const parentCounts = new Map();
    if (options.task === "regression") {
        const values = idx.map((i)=>y[i]);
        parentImpurity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["variance"])(values) * n;
        for (const value of values){
            totalSum += value;
            totalSumSq += value * value;
        }
    } else {
        for (const i of idx)parentCounts.set(y[i], (parentCounts.get(y[i]) ?? 0) + 1);
        parentImpurity = gini(parentCounts, n) * n;
    }
    let best = null;
    for (const feature of features){
        const ordered = idx.map((i)=>({
                i,
                v: X[i][feature]
            })).sort((a, b)=>a.v - b.v);
        if (ordered[0].v === ordered[ordered.length - 1].v) continue;
        let leftSum = 0;
        let leftSumSq = 0;
        let leftN = 0;
        const leftCounts = new Map();
        for(let t = 0; t < ordered.length - options.minSamplesLeaf; t += 1){
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
                const leftSSE = leftSumSq - leftSum * leftSum / leftN;
                const rightSum = totalSum - leftSum;
                const rightSumSq = totalSumSq - leftSumSq;
                const rightSSE = rightSumSq - rightSum * rightSum / rightN;
                gain = parentImpurity - leftSSE - rightSSE;
            } else {
                const rightCounts = new Map();
                for (const [label, count] of parentCounts){
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
                    gain
                };
            }
        }
    }
    if (!best || best.gain <= 1e-12) return null;
    return best;
}
function build(X, y, idx, depth, options, rng, importances) {
    const values = idx.map((i)=>y[i]);
    const leafValue = options.task === "classification" ? majorityClass(y, idx) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(values);
    const impurity = options.task === "classification" ? 0 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["variance"])(values);
    if (depth >= options.maxDepth || idx.length < options.minSamplesSplit || new Set(values).size === 1) {
        return {
            leaf: true,
            value: leafValue,
            n: idx.length,
            impurity
        };
    }
    const split = bestSplit(X, y, idx, options, rng);
    if (!split) {
        return {
            leaf: true,
            value: leafValue,
            n: idx.length,
            impurity
        };
    }
    const leftIdx = [];
    const rightIdx = [];
    for (const i of idx){
        if (X[i][split.feature] <= split.threshold) leftIdx.push(i);
        else rightIdx.push(i);
    }
    if (leftIdx.length === 0 || rightIdx.length === 0) {
        return {
            leaf: true,
            value: leafValue,
            n: idx.length,
            impurity
        };
    }
    importances[split.feature] += split.gain;
    return {
        leaf: false,
        feature: split.feature,
        threshold: split.threshold,
        n: idx.length,
        impurity,
        left: build(X, y, leftIdx, depth + 1, options, rng, importances),
        right: build(X, y, rightIdx, depth + 1, options, rng, importances)
    };
}
function fitTree(X, y, options) {
    const importances = Array.from({
        length: X[0]?.length ?? 0
    }, ()=>0);
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(options.seed ?? 7);
    const tree = build(X, y, X.map((_, i)=>i), 0, options, rng, importances);
    return {
        tree,
        importances
    };
}
function predictTree(tree, row) {
    let node = tree;
    while(!node.leaf && node.left && node.right && node.feature !== undefined){
        node = row[node.feature] <= (node.threshold ?? 0) ? node.left : node.right;
    }
    return node.value ?? 0;
}
function predictTreeMany(tree, X) {
    return X.map((row)=>predictTree(tree, row));
}
function bootstrapIndices(n, rng) {
    return Array.from({
        length: n
    }, ()=>Math.floor(rng() * n));
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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/models.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "predictModel",
    ()=>predictModel,
    "trainModel",
    ()=>trainModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/tree.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/preprocess.ts [app-route] (ecmascript)");
;
;
;
function num(params, key, fallback) {
    const value = params[key];
    return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function bool(params, key, fallback) {
    const value = params[key];
    return typeof value === "boolean" ? value : fallback;
}
function str(params, key, fallback) {
    const value = params[key];
    return typeof value === "string" ? value : fallback;
}
function maxFeaturesOf(params) {
    const raw = params.maxFeatures;
    if (raw === "sqrt" || raw === "log2" || raw === "all") return raw;
    if (typeof raw === "number") return raw;
    return "sqrt";
}
function fitLinear(X, y, alpha, l1Ratio = 0, maxIter = 80) {
    const scaler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fitScaler"])(X);
    const Xs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyScaler"])(X, scaler);
    const n = Xs.length;
    const d = Xs[0]?.length ?? 0;
    if (l1Ratio === 0) {
        const Xi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addIntercept"])(Xs);
        const Xt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["transpose"])(Xi);
        const XtX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["matMul"])(Xt, Xi);
        for(let i = 1; i < XtX.length; i += 1)XtX[i][i] += alpha;
        const Xty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["matVec"])(Xt, y);
        const beta = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["solveLinearSystem"])(XtX, Xty);
        return {
            scaler,
            intercept: beta[0],
            weights: beta.slice(1),
            importances: beta.slice(1).map((w)=>Math.abs(w))
        };
    }
    let weights = Array.from({
        length: d
    }, ()=>0);
    let intercept = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(y);
    const l1 = alpha * l1Ratio;
    const l2 = alpha * (1 - l1Ratio);
    for(let iter = 0; iter < maxIter; iter += 1){
        intercept = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(y.map((yi, i)=>yi - Xs[i].reduce((s, xij, j)=>s + xij * weights[j], 0)));
        for(let j = 0; j < d; j += 1){
            let rho = 0;
            let norm = 0;
            for(let i = 0; i < n; i += 1){
                let pred = intercept;
                for(let k = 0; k < d; k += 1){
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
        importances: weights.map((w)=>Math.abs(w))
    };
}
function softThreshold(value, lambda) {
    if (value > lambda) return value - lambda;
    if (value < -lambda) return value + lambda;
    return 0;
}
function predictLinear(row, intercept, weights) {
    return intercept + row.reduce((sum, value, i)=>sum + value * (weights[i] ?? 0), 0);
}
function sigmoid(z) {
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(z, -30, 30);
    return 1 / (1 + Math.exp(-x));
}
function fitLogistic(X, y, lr, epochs, l2) {
    const scaler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fitScaler"])(X);
    const Xs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyScaler"])(X, scaler);
    const classes = [
        ...new Set(y)
    ].sort((a, b)=>a - b);
    const n = Xs.length;
    const d = Xs[0]?.length ?? 0;
    const models = classes.map(()=>({
            intercept: 0,
            weights: Array.from({
                length: d
            }, ()=>0)
        }));
    for(let epoch = 0; epoch < epochs; epoch += 1){
        for(let c = 0; c < classes.length; c += 1){
            const model = models[c];
            let gInt = 0;
            const gW = Array.from({
                length: d
            }, ()=>0);
            for(let i = 0; i < n; i += 1){
                const target = y[i] === classes[c] ? 1 : 0;
                const z = predictLinear(Xs[i], model.intercept, model.weights);
                const err = sigmoid(z) - target;
                gInt += err;
                for(let j = 0; j < d; j += 1)gW[j] += err * Xs[i][j];
            }
            model.intercept -= lr * gInt / n;
            for(let j = 0; j < d; j += 1){
                model.weights[j] -= lr * (gW[j] / n + l2 * model.weights[j]);
            }
        }
    }
    const importances = Array.from({
        length: d
    }, ()=>0);
    for (const model of models){
        model.weights.forEach((w, j)=>{
            importances[j] += Math.abs(w);
        });
    }
    return {
        scaler,
        classes,
        models,
        importances
    };
}
function predictLogisticRow(row, classes, models) {
    const scores = models.map((model)=>sigmoid(predictLinear(row, model.intercept, model.weights)));
    return classes[(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["argmax"])(scores)] ?? 0;
}
function fitKnn(X, y, k, weighted) {
    const scaler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fitScaler"])(X);
    const Xs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyScaler"])(X, scaler);
    return {
        scaler,
        knnX: Xs,
        knnY: y,
        k,
        weighted
    };
}
function predictKnn(row, knnX, knnY, k, weighted, task) {
    const distances = knnX.map((other, i)=>{
        let dist = 0;
        for(let j = 0; j < other.length; j += 1){
            const d = other[j] - row[j];
            dist += d * d;
        }
        return {
            i,
            dist: Math.sqrt(dist)
        };
    });
    distances.sort((a, b)=>a.dist - b.dist);
    const neighbors = distances.slice(0, Math.max(1, Math.min(k, distances.length)));
    if (task === "classification") {
        const votes = new Map();
        for (const neighbor of neighbors){
            const weight = weighted ? 1 / (neighbor.dist + 1e-6) : 1;
            votes.set(knnY[neighbor.i], (votes.get(knnY[neighbor.i]) ?? 0) + weight);
        }
        let best = knnY[neighbors[0].i];
        let bestVote = -1;
        for (const [label, vote] of votes){
            if (vote > bestVote) {
                best = label;
                bestVote = vote;
            }
        }
        return best;
    }
    let num = 0;
    let den = 0;
    for (const neighbor of neighbors){
        const weight = weighted ? 1 / (neighbor.dist + 1e-6) : 1;
        num += weight * knnY[neighbor.i];
        den += weight;
    }
    return den === 0 ? 0 : num / den;
}
function trainModel(input) {
    const { model, task, X, y, params } = input;
    const seed = num(params, "randomState", 42);
    if (model === "linear_regression" || model === "ridge" || model === "lasso" || model === "elastic_net") {
        const alpha = model === "linear_regression" ? 0 : Math.max(0, num(params, "alpha", model === "ridge" ? 1 : 0.1));
        const l1Ratio = model === "lasso" ? 1 : model === "elastic_net" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(num(params, "l1Ratio", 0.5), 0, 1) : 0;
        const fitted = fitLinear(X, y, alpha, l1Ratio);
        return {
            model,
            task,
            scaler: fitted.scaler,
            intercept: fitted.intercept,
            weights: fitted.weights,
            importances: fitted.importances
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
            knnX: fitted.models.map((m)=>[
                    m.intercept,
                    ...m.weights
                ])
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
            weighted: fitted.weighted
        };
    }
    if (model === "decision_tree") {
        const fitted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fitTree"])(X, y, {
            task,
            maxDepth: Math.round(num(params, "maxDepth", 6)),
            minSamplesSplit: Math.round(num(params, "minSamplesSplit", 8)),
            minSamplesLeaf: Math.round(num(params, "minSamplesLeaf", 3)),
            maxFeatures: "all",
            seed
        });
        return {
            model,
            task,
            trees: [
                fitted.tree
            ],
            importances: fitted.importances
        };
    }
    if (model === "random_forest") {
        const nEstimators = Math.max(5, Math.round(num(params, "nEstimators", 25)));
        const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(seed);
        const trees = [];
        const importances = Array.from({
            length: X[0]?.length ?? 0
        }, ()=>0);
        for(let t = 0; t < nEstimators; t += 1){
            const bag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["bootstrapIndices"])(X.length, rng);
            const xb = bag.map((i)=>X[i]);
            const yb = bag.map((i)=>y[i]);
            const fitted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fitTree"])(xb, yb, {
                task,
                maxDepth: Math.round(num(params, "maxDepth", 8)),
                minSamplesSplit: Math.round(num(params, "minSamplesSplit", 6)),
                minSamplesLeaf: Math.round(num(params, "minSamplesLeaf", 2)),
                maxFeatures: maxFeaturesOf(params),
                seed: Math.floor(rng() * 1e9)
            });
            trees.push(fitted.tree);
            fitted.importances.forEach((value, i)=>{
                importances[i] += value;
            });
        }
        return {
            model,
            task,
            trees,
            importances
        };
    }
    if (model === "gradient_boosting") {
        const nEstimators = Math.max(5, Math.round(num(params, "nEstimators", 30)));
        const learningRate = num(params, "learningRate", 0.1);
        const subsample = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(num(params, "subsample", 1), 0.5, 1);
        const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(seed);
        const init = task === "classification" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(y) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(y);
        let residual = y.map((value)=>value - init);
        const trees = [];
        const importances = Array.from({
            length: X[0]?.length ?? 0
        }, ()=>0);
        for(let t = 0; t < nEstimators; t += 1){
            const count = Math.max(8, Math.floor(X.length * subsample));
            const idx = Array.from({
                length: X.length
            }, (_, i)=>i);
            const selected = [];
            for(let i = 0; i < count; i += 1)selected.push(idx[Math.floor(rng() * idx.length)]);
            const xb = selected.map((i)=>X[i]);
            const yb = selected.map((i)=>residual[i]);
            const fitted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fitTree"])(xb, yb, {
                task: "regression",
                maxDepth: Math.round(num(params, "maxDepth", 3)),
                minSamplesSplit: Math.round(num(params, "minSamplesSplit", 8)),
                minSamplesLeaf: Math.round(num(params, "minSamplesLeaf", 3)),
                maxFeatures: str(params, "maxFeatures", "all"),
                seed: Math.floor(rng() * 1e9)
            });
            trees.push(fitted.tree);
            fitted.importances.forEach((value, i)=>{
                importances[i] += value;
            });
            const pred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictTreeMany"])(fitted.tree, X);
            residual = residual.map((value, i)=>value - learningRate * pred[i]);
        }
        return {
            model,
            task,
            trees,
            learningRate,
            init,
            importances
        };
    }
    throw new Error(`Unsupported model: ${model}`);
}
function predictModel(trained, X) {
    const scaled = trained.scaler ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyScaler"])(X, trained.scaler) : X;
    if (trained.model === "linear_regression" || trained.model === "ridge" || trained.model === "lasso" || trained.model === "elastic_net") {
        return scaled.map((row)=>predictLinear(row, trained.intercept ?? 0, trained.weights ?? []));
    }
    if (trained.model === "logistic_regression") {
        const classes = trained.knnY ?? [
            0,
            1
        ];
        const packed = trained.knnX ?? [];
        const models = packed.map((row)=>({
                intercept: row[0] ?? 0,
                weights: row.slice(1)
            }));
        return scaled.map((row)=>predictLogisticRow(row, classes, models));
    }
    if (trained.model === "knn") {
        return scaled.map((row)=>predictKnn(row, trained.knnX ?? [], trained.knnY ?? [], trained.k ?? 5, trained.weighted ?? true, trained.task));
    }
    if (trained.model === "decision_tree") {
        const tree = trained.trees?.[0];
        if (!tree) return X.map(()=>0);
        const pred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictTreeMany"])(tree, X);
        return trained.task === "classification" ? pred.map((value)=>Math.round(value)) : pred;
    }
    if (trained.model === "random_forest") {
        const trees = trained.trees ?? [];
        return X.map((row)=>{
            const votes = trees.map((tree)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictTree"])(tree, row));
            if (trained.task === "classification") {
                const counts = new Map();
                for (const vote of votes)counts.set(Math.round(vote), (counts.get(Math.round(vote)) ?? 0) + 1);
                let best = votes[0] ?? 0;
                let bestCount = -1;
                for (const [label, count] of counts){
                    if (count > bestCount) {
                        best = label;
                        bestCount = count;
                    }
                }
                return best;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mean"])(votes);
        });
    }
    if (trained.model === "gradient_boosting") {
        const trees = trained.trees ?? [];
        const lr = trained.learningRate ?? 0.1;
        const init = trained.init ?? 0;
        return X.map((row)=>{
            let value = init;
            for (const tree of trees)value += lr * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$tree$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictTree"])(tree, row);
            return trained.task === "classification" ? Math.round((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(value, 0, 10)) : value;
        });
    }
    return X.map(()=>0);
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/registry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODEL_REGISTRY",
    ()=>MODEL_REGISTRY,
    "SEARCH_SPACES",
    ()=>SEARCH_SPACES,
    "configSignature",
    ()=>configSignature,
    "familyOf",
    ()=>familyOf,
    "getModelSpec",
    ()=>getModelSpec,
    "isModelName",
    ()=>isModelName,
    "modelLabel",
    ()=>modelLabel,
    "modelsForTask",
    ()=>modelsForTask,
    "paramKeysOf",
    ()=>paramKeysOf,
    "sanitizeParams",
    ()=>sanitizeParams,
    "specHasParam",
    ()=>specHasParam,
    "validateExperimentConfig",
    ()=>validateExperimentConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const MODEL_REGISTRY = [
    {
        name: "linear_regression",
        label: "Linear Regression",
        family: "linear",
        tasks: [
            "regression"
        ],
        description: "Ordinary least squares baseline with standardized features.",
        params: {}
    },
    {
        name: "ridge",
        label: "Ridge",
        family: "linear",
        tasks: [
            "regression"
        ],
        description: "L2-regularized linear model for stable coefficients.",
        params: {
            alpha: {
                type: "number",
                min: 0.0001,
                max: 1000,
                default: 1
            }
        }
    },
    {
        name: "lasso",
        label: "Lasso",
        family: "linear",
        tasks: [
            "regression"
        ],
        description: "L1-regularized linear model that can zero out weak features.",
        params: {
            alpha: {
                type: "number",
                min: 0.0001,
                max: 50,
                default: 0.05
            }
        }
    },
    {
        name: "elastic_net",
        label: "Elastic Net",
        family: "linear",
        tasks: [
            "regression"
        ],
        description: "Combined L1/L2 regularized linear model.",
        params: {
            alpha: {
                type: "number",
                min: 0.0001,
                max: 50,
                default: 0.1
            },
            l1Ratio: {
                type: "number",
                min: 0,
                max: 1,
                default: 0.5
            }
        }
    },
    {
        name: "logistic_regression",
        label: "Logistic Regression",
        family: "linear",
        tasks: [
            "classification"
        ],
        description: "Linear classifier trained with gradient descent.",
        params: {
            learningRate: {
                type: "number",
                min: 0.01,
                max: 1,
                default: 0.2
            },
            epochs: {
                type: "integer",
                min: 40,
                max: 400,
                default: 180
            },
            l2: {
                type: "number",
                min: 0,
                max: 2,
                default: 0.01
            }
        }
    },
    {
        name: "knn",
        label: "k-Nearest Neighbors",
        family: "neighbor",
        tasks: [
            "regression",
            "classification"
        ],
        description: "Instance-based predictor using distance-weighted neighbors.",
        params: {
            k: {
                type: "integer",
                min: 1,
                max: 40,
                default: 7
            },
            weighted: {
                type: "boolean",
                default: true
            }
        }
    },
    {
        name: "decision_tree",
        label: "Decision Tree",
        family: "tree",
        tasks: [
            "regression",
            "classification"
        ],
        description: "Single CART tree with MSE or Gini splits.",
        params: {
            maxDepth: {
                type: "integer",
                min: 2,
                max: 16,
                default: 6
            },
            minSamplesSplit: {
                type: "integer",
                min: 2,
                max: 40,
                default: 8
            },
            minSamplesLeaf: {
                type: "integer",
                min: 1,
                max: 20,
                default: 3
            }
        }
    },
    {
        name: "random_forest",
        label: "Random Forest",
        family: "ensemble",
        tasks: [
            "regression",
            "classification"
        ],
        description: "Bagged trees with random feature subsets.",
        params: {
            nEstimators: {
                type: "integer",
                min: 8,
                max: 80,
                default: 24
            },
            maxDepth: {
                type: "integer",
                min: 3,
                max: 16,
                default: 8
            },
            minSamplesLeaf: {
                type: "integer",
                min: 1,
                max: 12,
                default: 2
            },
            maxFeatures: {
                type: "enum",
                values: [
                    "sqrt",
                    "log2",
                    "all"
                ],
                default: "sqrt"
            }
        }
    },
    {
        name: "gradient_boosting",
        label: "Gradient Boosting",
        family: "ensemble",
        tasks: [
            "regression",
            "classification"
        ],
        description: "Stage-wise additive trees fit to residuals.",
        params: {
            nEstimators: {
                type: "integer",
                min: 8,
                max: 80,
                default: 28
            },
            maxDepth: {
                type: "integer",
                min: 1,
                max: 6,
                default: 3
            },
            learningRate: {
                type: "number",
                min: 0.01,
                max: 0.5,
                default: 0.1
            },
            subsample: {
                type: "number",
                min: 0.6,
                max: 1,
                default: 1
            }
        }
    }
];
const SEARCH_SPACES = {
    ridge: [
        {
            alpha: 0.1
        },
        {
            alpha: 1
        },
        {
            alpha: 10
        },
        {
            alpha: 50
        }
    ],
    lasso: [
        {
            alpha: 0.01
        },
        {
            alpha: 0.05
        },
        {
            alpha: 0.2
        }
    ],
    elastic_net: [
        {
            alpha: 0.05,
            l1Ratio: 0.2
        },
        {
            alpha: 0.1,
            l1Ratio: 0.5
        },
        {
            alpha: 0.2,
            l1Ratio: 0.8
        }
    ],
    knn: [
        {
            k: 5,
            weighted: true
        },
        {
            k: 11,
            weighted: true
        },
        {
            k: 15,
            weighted: false
        }
    ],
    decision_tree: [
        {
            maxDepth: 4,
            minSamplesSplit: 8,
            minSamplesLeaf: 4
        },
        {
            maxDepth: 6,
            minSamplesSplit: 8,
            minSamplesLeaf: 3
        },
        {
            maxDepth: 10,
            minSamplesSplit: 4,
            minSamplesLeaf: 2
        },
        {
            maxDepth: 8,
            minSamplesSplit: 12,
            minSamplesLeaf: 5
        }
    ],
    random_forest: [
        {
            nEstimators: 18,
            maxDepth: 6,
            minSamplesLeaf: 3,
            maxFeatures: "sqrt"
        },
        {
            nEstimators: 28,
            maxDepth: 8,
            minSamplesLeaf: 2,
            maxFeatures: "sqrt"
        },
        {
            nEstimators: 36,
            maxDepth: 12,
            minSamplesLeaf: 1,
            maxFeatures: "log2"
        }
    ],
    gradient_boosting: [
        {
            nEstimators: 20,
            maxDepth: 2,
            learningRate: 0.1,
            subsample: 1
        },
        {
            nEstimators: 32,
            maxDepth: 3,
            learningRate: 0.08,
            subsample: 0.9
        },
        {
            nEstimators: 40,
            maxDepth: 3,
            learningRate: 0.05,
            subsample: 1
        }
    ],
    logistic_regression: [
        {
            learningRate: 0.15,
            epochs: 160,
            l2: 0.02
        },
        {
            learningRate: 0.25,
            epochs: 220,
            l2: 0.005
        },
        {
            learningRate: 0.1,
            epochs: 300,
            l2: 0.05
        }
    ]
};
function getModelSpec(name) {
    return MODEL_REGISTRY.find((model)=>model.name === name);
}
function modelsForTask(task) {
    return MODEL_REGISTRY.filter((model)=>model.tasks.includes(task));
}
function isModelName(name) {
    return typeof name === "string" && MODEL_REGISTRY.some((model)=>model.name === name);
}
function specHasParam(modelName, key) {
    const spec = getModelSpec(modelName);
    return Boolean(spec && key in spec.params);
}
function paramKeysOf(modelName) {
    return Object.keys(getModelSpec(modelName)?.params ?? {});
}
function sanitizeParams(modelName, params) {
    const spec = getModelSpec(modelName);
    if (!spec) return {};
    const incoming = params ?? {};
    const cleaned = {};
    for (const [key, def] of Object.entries(spec.params)){
        const raw = incoming[key] ?? def.default;
        if (def.type === "boolean") {
            cleaned[key] = typeof raw === "string" ? raw === "true" : Boolean(raw);
            continue;
        }
        if (def.type === "enum") {
            cleaned[key] = def.values?.includes(raw) ? raw : def.default;
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
function validateExperimentConfig(modelName, params, task) {
    const spec = getModelSpec(modelName);
    if (!spec) {
        throw new Error(`Model "${modelName}" is not in the safe registry`);
    }
    if (!spec.tasks.includes(task)) {
        throw new Error(`Model "${modelName}" cannot be used for ${task}`);
    }
    const cleaned = sanitizeParams(spec.name, params);
    const schema = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        model: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        params: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].record(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(), __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].union([
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean()
        ]))
    });
    return schema.parse({
        model: spec.name,
        params: cleaned
    });
}
function configSignature(model, params) {
    const cleaned = getModelSpec(model) ? sanitizeParams(model, params) : params;
    const keys = Object.keys(cleaned).sort();
    return `${model}:${keys.map((key)=>`${key}=${String(cleaned[key])}`).join("|")}`;
}
function modelLabel(name) {
    return getModelSpec(name)?.label ?? name;
}
function familyOf(name) {
    return getModelSpec(name)?.family ?? "linear";
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/engine.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "configuredFolds",
    ()=>configuredFolds,
    "crossValidate",
    ()=>crossValidate,
    "runSafeExperiment",
    ()=>runSafeExperiment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/models.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/preprocess.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/registry.ts [app-route] (ecmascript)");
;
;
;
;
/** Deterministic RNG, so a given seed always produces the same folds. */ function mulberry32(seed) {
    let a = seed >>> 0;
    return ()=>{
        a = a + 0x6d2b79f5 >>> 0;
        let t = Math.imul(a ^ a >>> 15, 1 | a);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function shuffled(length, seed) {
    const idx = Array.from({
        length
    }, (_, i)=>i);
    const rand = mulberry32(seed);
    for(let i = idx.length - 1; i > 0; i -= 1){
        const j = Math.floor(rand() * (i + 1));
        [idx[i], idx[j]] = [
            idx[j],
            idx[i]
        ];
    }
    return idx;
}
/**
 * Split indices into k contiguous folds of an already-shuffled index list.
 * Every row appears in exactly one validation fold, so each row is predicted
 * exactly once across the whole procedure.
 */ function foldRanges(total, folds) {
    const base = Math.floor(total / folds);
    const remainder = total % folds;
    const ranges = [];
    let cursor = 0;
    for(let f = 0; f < folds; f += 1){
        const size = base + (f < remainder ? 1 : 0);
        ranges.push([
            cursor,
            cursor + size
        ]);
        cursor += size;
    }
    return ranges;
}
function configuredFolds() {
    const raw = Number(process.env.CV_FOLDS ?? 5);
    if (!Number.isFinite(raw) || raw < 0) return 5;
    if (raw === 0) return 0;
    return Math.min(10, Math.max(2, Math.floor(raw)));
}
function meanOf(values) {
    return values.reduce((sum, value)=>sum + value, 0) / values.length;
}
/** Population standard deviation across folds; 0 for a single fold. */ function stdOf(values, mean) {
    if (values.length < 2) return 0;
    const variance = values.reduce((sum, value)=>sum + (value - mean) ** 2, 0) / values.length;
    return Math.sqrt(variance);
}
function crossValidate(input) {
    const requested = input.folds ?? configuredFolds();
    if (requested < 2) return null;
    const total = input.X.length;
    // Each fold must be able to hold at least one validation row and still leave
    // training rows behind.
    const folds = Math.min(requested, total);
    if (folds < 2 || total < 4) return null;
    const order = shuffled(total, input.seed ?? 42);
    const ranges = foldRanges(total, folds);
    const perFold = [];
    const started = Date.now();
    for (const [from, to] of ranges){
        const validIdx = order.slice(from, to);
        const trainIdx = [
            ...order.slice(0, from),
            ...order.slice(to)
        ];
        if (validIdx.length === 0 || trainIdx.length === 0) continue;
        // A fold whose training split lost an entire class cannot be scored
        // meaningfully; skip it rather than reporting a misleading number.
        if (input.task === "classification") {
            const trainLabels = new Set(trainIdx.map((i)=>input.y[i]));
            if (trainLabels.size < 2) continue;
        }
        try {
            const trained = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trainModel"])({
                model: input.model,
                task: input.task,
                X: trainIdx.map((i)=>input.X[i]),
                y: trainIdx.map((i)=>input.y[i]),
                params: input.params
            });
            const pred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictModel"])(trained, validIdx.map((i)=>input.X[i]));
            perFold.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluatePredictions"])(input.task, validIdx.map((i)=>input.y[i]), pred));
        } catch  {
            continue;
        }
    }
    if (perFold.length < 2) return null;
    // Average only the metrics that were actually produced for this task.
    const keys = new Set();
    for (const fold of perFold){
        for (const key of Object.keys(fold)){
            if (Number.isFinite(fold[key])) keys.add(key);
        }
    }
    const mean = {};
    const std = {};
    for (const key of keys){
        const values = perFold.map((fold)=>fold[key]).filter((value)=>typeof value === "number" && Number.isFinite(value));
        if (values.length === 0) continue;
        const average = meanOf(values);
        mean[key] = average;
        std[key] = stdOf(values, average);
    }
    return {
        folds: perFold.length,
        requestedFolds: requested,
        rows: total,
        mean,
        std,
        perFold,
        durationMs: Date.now() - started
    };
}
function runSafeExperiment(input) {
    const validated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateExperimentConfig"])(input.model, input.params, input.task);
    const split = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trainTestSplit"])(input.X, input.y, 0.2, input.seed ?? 42);
    const started = Date.now();
    const trained = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trainModel"])({
        model: validated.model,
        task: input.task,
        X: split.xTrain,
        y: split.yTrain,
        params: validated.params
    });
    const trainPred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictModel"])(trained, split.xTrain);
    const testPred = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$models$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["predictModel"])(trained, split.xTest);
    const durationMs = Date.now() - started;
    const importanceSource = trained.importances ?? [];
    const total = importanceSource.reduce((sum, value)=>sum + Math.abs(value), 0) || 1;
    const featureImportance = input.featureNames.map((name, i)=>({
            name,
            importance: Math.abs(importanceSource[i] ?? 0) / total
        }));
    let coefficients = null;
    if (trained.weights && trained.intercept !== undefined) {
        coefficients = {
            intercept: trained.intercept
        };
        input.featureNames.forEach((name, i)=>{
            coefficients[name] = trained.weights?.[i] ?? 0;
        });
    }
    // Cross-validation runs after the holdout evaluation and never overwrites it.
    const cvMetrics = crossValidate({
        model: validated.model,
        params: validated.params,
        task: input.task,
        X: input.X,
        y: input.y,
        folds: input.folds,
        seed: input.seed ?? 42
    });
    const previewCount = Math.min(80, split.yTest.length);
    return {
        model: validated.model,
        params: validated.params,
        trainMetrics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluatePredictions"])(input.task, split.yTrain, trainPred),
        testMetrics: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["evaluatePredictions"])(input.task, split.yTest, testPred),
        cvMetrics,
        durationMs,
        featureImportance,
        preview: {
            y: split.yTest.slice(0, previewCount),
            pred: testPred.slice(0, previewCount)
        },
        coefficients
    };
}
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/tracking/store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "logTrackingRun",
    ()=>logTrackingRun
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/logger.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
async function logTrackingRun(input) {
    const artifactUri = `experiments/mlruns/${input.projectId}/${input.id}`;
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trackingRuns"]).values({
        id: input.id,
        experimentId: input.experimentId,
        projectId: input.projectId,
        name: input.name,
        params: input.params,
        metrics: input.metrics,
        tags: input.tags,
        artifactUri
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).set({
        trackingUri: artifactUri
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].id, input.experimentId));
    try {
        const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), artifactUri);
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, "params"), {
            recursive: true
        });
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, "metrics"), {
            recursive: true
        });
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, "tags"), {
            recursive: true
        });
        await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, "meta.yaml"), [
            `run_id: ${input.id}`,
            `experiment_id: ${input.experimentId}`,
            `name: ${input.name}`,
            `status: FINISHED`,
            `start_time: ${Date.now()}`
        ].join("\n"));
        await Promise.all(Object.entries(input.params).map(([key, value])=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, "params", key), String(value))));
        await Promise.all(Object.entries(input.metrics).filter(([, value])=>typeof value === "number").map(([key, value])=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, "metrics", key), String(value))));
        await Promise.all(Object.entries(input.tags).map(([key, value])=>(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(__TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(dir, "tags", key), value)));
    } catch (error) {
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn("tracking", "Unable to persist MLflow-style files", error);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/agent/llm.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "completeJson",
    ()=>completeJson,
    "describeLLM",
    ()=>describeLLM,
    "getLLM",
    ()=>getLLM,
    "llmAvailability",
    ()=>llmAvailability,
    "resetLLMAvailability",
    ()=>resetLLMAvailability
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/logger.ts [app-route] (ecmascript)");
;
function env(name) {
    const value = process.env[name];
    return value && value.trim().length > 0 ? value.trim() : null;
}
class OpenAICompatibleProvider {
    baseUrl;
    apiKey;
    model;
    id;
    label;
    isGenerative;
    constructor(baseUrl, apiKey, model, label){
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.model = model;
        this.id = "openai-compatible";
        this.isGenerative = true;
        this.label = label;
    }
    async complete(system, user, options) {
        const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                temperature: options?.temperature ?? 0.2,
                response_format: options?.json ? {
                    type: "json_object"
                } : undefined,
                messages: [
                    {
                        role: "system",
                        content: system
                    },
                    {
                        role: "user",
                        content: user
                    }
                ]
            })
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`OpenAI-compatible LLM failed: ${response.status} ${text}`);
        }
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (!content) throw new Error("LLM returned an empty completion");
        return content;
    }
}
class AnthropicProvider {
    apiKey;
    model;
    id;
    label;
    isGenerative;
    constructor(apiKey, model){
        this.apiKey = apiKey;
        this.model = model;
        this.id = "anthropic";
        this.label = "Anthropic";
        this.isGenerative = true;
    }
    async complete(system, user, options) {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": this.apiKey,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: this.model,
                max_tokens: 1400,
                temperature: options?.temperature ?? 0.2,
                system,
                messages: [
                    {
                        role: "user",
                        content: user
                    }
                ]
            })
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Anthropic LLM failed: ${response.status} ${text}`);
        }
        const data = await response.json();
        const content = data.content?.map((part)=>part.text ?? "").join("");
        if (!content) throw new Error("Anthropic returned an empty completion");
        return content;
    }
}
class OllamaProvider {
    baseUrl;
    model;
    id;
    label;
    isGenerative;
    constructor(baseUrl, model){
        this.baseUrl = baseUrl;
        this.model = model;
        this.id = "ollama";
        this.isGenerative = true;
        this.label = `Ollama / ${model}`;
    }
    async complete(system, user, options) {
        const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: this.model,
                stream: false,
                format: options?.json ? "json" : undefined,
                options: {
                    temperature: options?.temperature ?? 0.2
                },
                messages: [
                    {
                        role: "system",
                        content: system
                    },
                    {
                        role: "user",
                        content: user
                    }
                ]
            })
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Ollama failed: ${response.status} ${text}`);
        }
        const data = await response.json();
        if (!data.message?.content) throw new Error("Ollama returned an empty completion");
        return data.message.content;
    }
}
function envInt(name, fallback, min, max) {
    const raw = env(name);
    if (!raw) return fallback;
    const parsed = Number.parseInt(raw, 10);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
}
let cached = null;
/**
 * The generative provider is only ever suspended for a cooldown window, never
 * for the lifetime of the process. A single slow request used to poison every
 * later call, which silently downgraded the whole run to the policy engine.
 * FORCE_POLICY_ENGINE=1 is still a permanent, deliberate opt-out.
 */ const forcedPolicyEngine = process.env.FORCE_POLICY_ENGINE === "1";
let consecutiveFailures = 0;
let suspendedUntil = 0;
function llmTimeoutMs() {
    return envInt("LLM_TIMEOUT_MS", 30_000, 1_000, 120_000);
}
function cooldownMs() {
    const base = envInt("LLM_COOLDOWN_MS", 60_000, 0, 900_000);
    // Back off gradually: 1x, 2x, 4x ... capped at 8x.
    return base * Math.min(8, 2 ** Math.max(0, consecutiveFailures - 1));
}
function generativeSuspended() {
    if (forcedPolicyEngine) return true;
    if (envInt("LLM_MAX_FAILURES", 3, 1, 100) <= consecutiveFailures && cooldownMs() === 0) return true;
    return Date.now() < suspendedUntil;
}
function resetLLMAvailability() {
    consecutiveFailures = 0;
    suspendedUntil = 0;
    cached = null;
}
function llmAvailability() {
    return {
        forcedPolicyEngine,
        consecutiveFailures,
        suspended: generativeSuspended(),
        retryInMs: Math.max(0, suspendedUntil - Date.now()),
        timeoutMs: llmTimeoutMs()
    };
}
function getLLM() {
    if (cached) return cached;
    const openaiKey = env("OPENAI_API_KEY");
    const openaiBase = env("OPENAI_BASE_URL");
    const openaiModel = env("OPENAI_MODEL") ?? env("LLM_MODEL") ?? "gpt-4o-mini";
    if (openaiKey) {
        cached = new OpenAICompatibleProvider(openaiBase ?? "https://api.openai.com/v1", openaiKey, openaiModel, openaiBase ? `OpenAI-compatible / ${openaiModel}` : `OpenAI / ${openaiModel}`);
        return cached;
    }
    const anthropicKey = env("ANTHROPIC_API_KEY");
    if (anthropicKey) {
        cached = new AnthropicProvider(anthropicKey, env("ANTHROPIC_MODEL") ?? "claude-3-5-sonnet-latest");
        return cached;
    }
    const ollamaBase = env("OLLAMA_BASE_URL") ?? "http://127.0.0.1:11434";
    const ollamaModel = env("OLLAMA_MODEL") ?? "qwen2.5:7b";
    cached = new OllamaProvider(ollamaBase, ollamaModel);
    return cached;
}
async function completeJson(system, user, fallback) {
    if (generativeSuspended()) {
        return {
            value: fallback(),
            source: "policy"
        };
    }
    const llm = getLLM();
    const timeoutMs = llmTimeoutMs();
    let timer;
    try {
        const raw = await Promise.race([
            llm.complete(system, user, {
                json: true,
                temperature: 0.15
            }),
            new Promise((_, reject)=>{
                timer = setTimeout(()=>reject(new Error(`LLM timeout after ${timeoutMs}ms`)), timeoutMs);
            })
        ]);
        const start = raw.indexOf("{");
        const end = raw.lastIndexOf("}");
        const slice = start >= 0 && end >= 0 ? raw.slice(start, end + 1) : raw;
        const value = JSON.parse(slice);
        // A success fully clears the failure streak.
        consecutiveFailures = 0;
        suspendedUntil = 0;
        return {
            value,
            source: "llm"
        };
    } catch (error) {
        consecutiveFailures += 1;
        const maxFailures = envInt("LLM_MAX_FAILURES", 3, 1, 100);
        if (consecutiveFailures >= maxFailures) {
            suspendedUntil = Date.now() + cooldownMs();
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn("llm", `Generative LLM failed ${consecutiveFailures}x; using the policy engine for the next ${Math.round(cooldownMs() / 1000)}s`, error);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].warn("llm", `Generative LLM call failed (${consecutiveFailures}/${maxFailures}); using the policy engine for this step`, error);
        }
        return {
            value: fallback(),
            source: "policy"
        };
    } finally{
        if (timer) clearTimeout(timer);
    }
}
function describeLLM() {
    const openaiKey = env("OPENAI_API_KEY");
    if (openaiKey) {
        return {
            id: "openai-compatible",
            label: env("OPENAI_BASE_URL") ? "OpenAI-compatible" : "OpenAI",
            model: env("OPENAI_MODEL") ?? "gpt-4o-mini",
            generative: true
        };
    }
    if (env("ANTHROPIC_API_KEY")) {
        return {
            id: "anthropic",
            label: "Anthropic",
            model: env("ANTHROPIC_MODEL") ?? "claude-3-5-sonnet-latest",
            generative: true
        };
    }
    return {
        id: "ollama-or-policy",
        label: "Ollama / Adaptive policy",
        model: env("OLLAMA_MODEL") ?? "qwen2.5:7b",
        generative: false
    };
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/agent/policy.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeRuns",
    ()=>analyzeRuns,
    "buildDatasetInsights",
    ()=>buildDatasetInsights,
    "buildDirectionGuard",
    ()=>buildDirectionGuard,
    "buildHeuristicPlan",
    ()=>buildHeuristicPlan,
    "cvMean",
    ()=>cvMean,
    "cvObjectiveScore",
    ()=>cvObjectiveScore,
    "describeAchievement",
    ()=>describeAchievement,
    "describeObjectiveDirections",
    ()=>describeObjectiveDirections,
    "describeObjectives",
    ()=>describeObjectives,
    "describeRunMetrics",
    ()=>describeRunMetrics,
    "directionFor",
    ()=>directionFor,
    "isMetricForTask",
    ()=>isMetricForTask,
    "labelRuns",
    ()=>labelRuns,
    "modelComplexity",
    ()=>modelComplexity,
    "objectiveScore",
    ()=>objectiveScore,
    "objectivesOf",
    ()=>objectivesOf,
    "parseGoal",
    ()=>parseGoal,
    "parseObjectives",
    ()=>parseObjectives,
    "pickBestRun",
    ()=>pickBestRun,
    "pickBestRunMulti",
    ()=>pickBestRunMulti,
    "sanitizeStrategy",
    ()=>sanitizeStrategy,
    "suggestNextExperiment",
    ()=>suggestNextExperiment,
    "writeReport",
    ()=>writeReport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/registry.ts [app-route] (ecmascript)");
;
;
function cvMean(run) {
    return run?.cvMetrics?.mean ?? null;
}
/** Compact "k=7, weighted=true" rendering of a configuration. */ function paramSummary(run) {
    const entries = Object.entries((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(run.modelName, run.hyperparameters));
    if (entries.length === 0) return "default settings";
    return entries.map(([key, value])=>`${key}=${value}`).join(", ");
}
function labelRuns(runs) {
    const counts = new Map();
    for (const run of runs){
        const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(run.modelName);
        counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return runs.map((run)=>{
        const label = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(run.modelName);
        return (counts.get(label) ?? 0) > 1 ? `${label} (${paramSummary(run)})` : label;
    });
}
const CLASSIFICATION_METRICS = [
    "accuracy",
    "precision",
    "recall",
    "f1"
];
function directionFor(metric) {
    return metric === "rmse" || metric === "mae" || metric === "mape" ? "minimize" : "maximize";
}
function isMetricForTask(metric, task) {
    return task === "classification" ? CLASSIFICATION_METRICS.includes(metric) : !CLASSIFICATION_METRICS.includes(metric);
}
function parseObjectives(goal, taskType) {
    const text = goal.toLowerCase();
    const patterns = [
        {
            metric: "rmse",
            regex: /\brmse\b|\broot[- ]mean[- ]squared?\b/g
        },
        {
            metric: "mae",
            regex: /\bmae\b|\bmean absolute error\b/g
        },
        {
            metric: "mape",
            regex: /\bmape\b/g
        },
        {
            metric: "r2",
            regex: /\br2\b|\br\^2\b|r²/g
        },
        {
            metric: "accuracy",
            regex: /\baccuracy\b|\baccurate\b/g
        },
        {
            metric: "precision",
            regex: /\bprecision\b/g
        },
        {
            metric: "recall",
            regex: /\brecall\b/g
        },
        {
            metric: "f1",
            regex: /\bf1\b|\bf-1\b|\bf1[- ]score\b/g
        }
    ];
    const hits = [];
    for (const { metric, regex } of patterns){
        const match = regex.exec(text);
        if (match) hits.push({
            metric,
            at: match.index
        });
    }
    const ordered = hits.sort((a, b)=>a.at - b.at).map((hit)=>hit.metric).filter((metric)=>isMetricForTask(metric, taskType));
    const unique = [
        ...new Set(ordered)
    ];
    if (unique.length === 0) {
        const fallback = taskType === "classification" ? "accuracy" : "rmse";
        return [
            {
                metric: fallback,
                optimize: directionFor(fallback)
            }
        ];
    }
    return unique.map((metric)=>({
            metric,
            optimize: directionFor(metric)
        }));
}
function parseGoal(goal, datasetTask) {
    const text = goal.toLowerCase();
    // The dataset's own task type always wins. The text fallback only fires when no
    // dataset is attached yet, and it looks at task/metric vocabulary only -- never at
    // dataset or column names, so nothing here is tied to a particular dataset.
    const taskType = datasetTask ?? (/\b(classif\w*|accuracy|precision|recall|f1|logistic|label|categor\w*)\b/.test(text) ? "classification" : "regression");
    const objectives = parseObjectives(goal, taskType);
    const minMatch = text.match(/at least (\d+)/);
    const maxMatch = text.match(/(?:at most|no more than|max(?:imum)?)\s+(\d+)/);
    const minExperiments = minMatch ? Math.max(3, Number(minMatch[1])) : 5;
    const maxExperiments = maxMatch ? Math.max(minExperiments, Number(maxMatch[1])) : Math.max(minExperiments, 6);
    return {
        taskType,
        objectives,
        primaryMetric: objectives[0].metric,
        optimize: objectives[0].optimize,
        minExperiments,
        maxExperiments
    };
}
function objectivesOf(plan) {
    if (plan.objectives?.length) return plan.objectives;
    return [
        {
            metric: plan.primaryMetric,
            optimize: plan.optimize
        }
    ];
}
function describeObjectives(objectives) {
    const names = objectives.map((objective)=>objective.metric.toUpperCase());
    if (names.length === 1) return names[0];
    return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
function defaultStrategy(task) {
    const raw = task === "classification" ? [
        {
            model: "logistic_regression",
            params: {
                learningRate: 0.2,
                epochs: 180,
                l2: 0.01
            },
            reason: "Linear baseline for the classification boundary."
        },
        {
            model: "knn",
            params: {
                k: 7,
                weighted: true
            },
            reason: "Non-parametric neighborhood vote."
        },
        {
            model: "decision_tree",
            params: {
                maxDepth: 6,
                minSamplesSplit: 8,
                minSamplesLeaf: 3
            },
            reason: "Interpretable non-linear splits."
        },
        {
            model: "random_forest",
            params: {
                nEstimators: 24,
                maxDepth: 8,
                minSamplesLeaf: 2,
                maxFeatures: "sqrt"
            },
            reason: "Bagged trees to reduce variance."
        },
        {
            model: "gradient_boosting",
            params: {
                nEstimators: 28,
                maxDepth: 3,
                learningRate: 0.1,
                subsample: 1
            },
            reason: "Boosted residual correction."
        }
    ] : [
        {
            model: "linear_regression",
            params: {},
            reason: "Unregularized linear baseline."
        },
        {
            model: "ridge",
            params: {
                alpha: 1
            },
            reason: "Stabilize correlated features."
        },
        {
            model: "decision_tree",
            params: {
                maxDepth: 6,
                minSamplesSplit: 8,
                minSamplesLeaf: 3
            },
            reason: "Capture non-linear thresholds."
        },
        {
            model: "random_forest",
            params: {
                nEstimators: 24,
                maxDepth: 8,
                minSamplesLeaf: 2,
                maxFeatures: "sqrt"
            },
            reason: "Ensemble of randomized trees."
        },
        {
            model: "gradient_boosting",
            params: {
                nEstimators: 28,
                maxDepth: 3,
                learningRate: 0.1,
                subsample: 0.9
            },
            reason: "Sequential residual fitting."
        }
    ];
    return raw.map((item)=>({
            ...item,
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(item.model, item.params)
        }));
}
function sanitizeStrategy(strategy, task) {
    if (!strategy?.length) return [];
    const out = [];
    const seen = new Set();
    for (const item of strategy){
        const spec = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getModelSpec"])(item.model);
        if (!spec || !spec.tasks.includes(task)) continue;
        const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(spec.name, item.params);
        const signature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(spec.name, params);
        if (seen.has(signature)) continue;
        seen.add(signature);
        out.push({
            model: spec.name,
            params,
            reason: item.reason?.trim() || `Planned ${spec.label} configuration.`
        });
    }
    return out;
}
function buildHeuristicPlan(goal, stats, datasetTask, requestedMin, requestedMax) {
    const parsed = parseGoal(goal, datasetTask);
    const minExperiments = requestedMin ?? parsed.minExperiments;
    const maxExperiments = requestedMax ?? parsed.maxExperiments;
    const strategy = defaultStrategy(parsed.taskType).slice(0, Math.max(minExperiments, 5));
    const top = stats.correlations?.slice(0, 3).map((item)=>item.feature).join(", ") ?? "the strongest features";
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
        adaptationPolicy: "After the first diverse sweep, exploit the winning family. If trees beat linear by >8%, spend remaining budget on forest/boosting. If a linear model is competitive, grid regularized linear models. If train metrics crush test metrics, reduce depth or increase regularization."
    };
}
function objectiveScore(run, runs, objectives) {
    return scoreWith(run, runs, objectives, (item)=>item.testMetrics);
}
/**
 * The same normalise-and-average score, but over any metric source. Passing
 * `cvMean` scores the runs on their cross-validated means instead of the
 * single holdout split.
 */ function scoreWith(run, runs, objectives, pick) {
    let total = 0;
    let counted = 0;
    for (const objective of objectives){
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(pick(run), objective.metric);
        if (Number.isNaN(value)) continue;
        const pool = runs.map((item)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(pick(item), objective.metric)).filter((item)=>!Number.isNaN(item));
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
function cvObjectiveScore(run, runs, objectives) {
    return scoreWith(run, runs, objectives, cvMean);
}
/**
 * Ordering used only to break a tie that the measurements cannot break.
 * Lower is simpler. Family order first, then the model's own capacity knobs,
 * so the choice is deterministic and defensible instead of "whichever ran
 * first". No model or dataset is special-cased.
 */ const FAMILY_COMPLEXITY = {
    linear: 0,
    neighbor: 1,
    tree: 2,
    ensemble: 3
};
function modelComplexity(run) {
    const base = (FAMILY_COMPLEXITY[(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(run.modelName)] ?? 4) * 1_000_000;
    const params = run.hyperparameters ?? {};
    // Capacity-ish parameters, weighted so more capacity ranks as less simple.
    const estimators = Number(params.nEstimators ?? 1);
    const depth = Number(params.maxDepth ?? 1);
    const epochs = Number(params.epochs ?? 0);
    const neighbours = Number(params.k ?? 0);
    const capacity = (Number.isFinite(estimators) ? estimators : 1) * 1000 + (Number.isFinite(depth) ? depth : 1) * 100 + (Number.isFinite(epochs) ? epochs : 0) * 0.1 + // More neighbours means a smoother, simpler decision surface.
    (Number.isFinite(neighbours) ? -neighbours : 0);
    return base + capacity;
}
/** One run's mean cross-validated value for a metric. NaN when not measured. */ function cvValue(run, metric) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(cvMean(run), metric);
}
/** One run's holdout value for a metric. NaN when not measured. */ function holdoutValue(run, metric) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric);
}
/**
 * The runs that share the best value of one objective, using whichever metric
 * source is passed in. Returns the input untouched when nothing is measurable,
 * so a metric that a task does not produce simply cannot narrow the field.
 */ function topGroup(runs, objective, read) {
    const measured = runs.filter((run)=>!Number.isNaN(read(run, objective.metric)));
    if (measured.length === 0) return runs;
    const bestValue = measured.map((run)=>read(run, objective.metric)).reduce((acc, value)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBetter"])(value, acc, objective.optimize) ? value : acc);
    return measured.filter((run)=>Math.abs(read(run, objective.metric) - bestValue) <= TIE_EPSILON);
}
/** The simplest runs of a set, by the deterministic complexity ordering. */ function simplestOf(runs) {
    const ranked = [
        ...runs
    ].sort((a, b)=>modelComplexity(a) - modelComplexity(b));
    const simplest = modelComplexity(ranked[0]);
    return ranked.filter((run)=>modelComplexity(run) === simplest);
}
function pickBestRunMulti(runs, objectives) {
    const usable = runs.filter((run)=>run.testMetrics);
    const empty = {
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
        tiedRuns: []
    };
    if (usable.length === 0) return empty;
    const primary = objectives[0];
    const holdoutScore = new Map();
    for (const run of usable)holdoutScore.set(run, objectiveScore(run, usable, objectives));
    const scoredRuns = usable.filter((run)=>!Number.isNaN(holdoutScore.get(run) ?? Number.NaN));
    const finish = (best, contenders, tieBreak, basis, decidingMetric, tiedRuns)=>({
            best,
            bestValue: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(best.testMetrics, primary.metric),
            bestScore: holdoutScore.get(best) ?? Number.NaN,
            contenders,
            tieBreak,
            basis,
            folds: basis === "cross_validation" ? best.cvMetrics?.folds ?? 0 : 0,
            decidingMetric,
            primaryValue: basis === "cross_validation" ? cvValue(best, primary.metric) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(best.testMetrics, primary.metric),
            tied: tiedRuns.length > 1,
            tiedRuns: tiedRuns.length > 1 ? tiedRuns : []
        });
    // --- Cross-validated selection: the more reliable estimate wins. ---
    // Two or more runs must be comparable on the primary objective for the
    // cross-validated ranking to mean anything.
    const cvPool = usable.filter((run)=>!Number.isNaN(cvValue(run, primary.metric)));
    if (cvPool.length >= 2) {
        // 1. The mean cross-validated primary metric.
        let field = topGroup(cvPool, primary, cvValue);
        const contenders = [
            ...field
        ];
        let tieBreak = field.length === 1 ? "cross_validation" : "none";
        let decidingMetric = field.length === 1 ? primary.metric : null;
        // 2. The remaining objectives the user asked for, in the order written.
        for (const objective of objectives.slice(1)){
            if (field.length <= 1) break;
            const narrowed = topGroup(field, objective, cvValue);
            if (narrowed.length > 0 && narrowed.length < field.length) {
                field = narrowed;
                tieBreak = "cross_validation";
                decidingMetric = objective.metric;
            }
        }
        // Everything the cross-validation measured agrees: this is a real tie.
        const tiedRuns = field.length > 1 ? [
            ...field
        ] : [];
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
    const topScore = Math.max(...scoredRuns.map((run)=>holdoutScore.get(run)));
    let field = scoredRuns.filter((run)=>Math.abs(holdoutScore.get(run) - topScore) <= TIE_EPSILON);
    const contenders = [
        ...field
    ];
    let tieBreak = field.length === 1 ? "holdout" : "none";
    let decidingMetric = field.length === 1 ? primary.metric : null;
    // 2. Primary metric on the holdout split.
    if (field.length > 1) {
        const narrowed = topGroup(field, primary, (run, metric)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric));
        if (narrowed.length > 0 && narrowed.length < field.length) {
            field = narrowed;
            tieBreak = "holdout";
            decidingMetric = primary.metric;
        }
    }
    const tiedRuns = field.length > 1 ? [
        ...field
    ] : [];
    // 3. Nothing measured separates them: prefer the simplest model and say so.
    if (field.length > 1) {
        field = simplestOf(field);
        tieBreak = "simplicity";
        decidingMetric = null;
    }
    return finish(field[0], contenders, tieBreak, "holdout", decidingMetric, tiedRuns);
}
function pickBestRun(runs, metric, optimize) {
    let best = null;
    let bestValue = Number.NaN;
    for (const run of runs){
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric);
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBetter"])(value, bestValue, optimize)) {
            best = run;
            bestValue = value;
        }
    }
    return {
        best,
        bestValue
    };
}
function overfitGap(run, metric) {
    const train = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.trainMetrics, metric);
    const test = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric);
    if (Number.isNaN(train) || Number.isNaN(test)) return 0;
    return Math.abs(train - test) / (Math.abs(test) + 1e-9);
}
/**
 * Score a run for the purpose of steering the search. Cross-validated means
 * are preferred when available because they are the more reliable estimate;
 * otherwise the holdout metrics are used. Direction comes from the objective,
 * so nothing here assumes bigger-is-better.
 */ function steeringValue(run, objective) {
    const cv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(cvMean(run), objective.metric);
    if (!Number.isNaN(cv)) return cv;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, objective.metric);
}
/** Best (per direction) steering value seen for a family so far. */ function familyLeaderboard(runs, objective) {
    const table = new Map();
    for (const run of runs){
        const value = steeringValue(run, objective);
        if (Number.isNaN(value)) continue;
        const family = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(run.modelName);
        const current = table.get(family);
        if (!current || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBetter"])(value, current.value, objective.optimize)) {
            table.set(family, {
                value,
                run
            });
        }
    }
    return [
        ...table.entries()
    ].sort((a, b)=>objective.optimize === "minimize" ? a[1].value - b[1].value : b[1].value - a[1].value);
}
/** Relative improvement of `value` over `reference`, signed so + is better. */ function relativeGain(value, reference, optimize) {
    if (Number.isNaN(value) || Number.isNaN(reference)) return Number.NaN;
    const denominator = Math.abs(reference) + 1e-9;
    return optimize === "minimize" ? (reference - value) / denominator : (value - reference) / denominator;
}
function suggestNextExperiment(plan, runs) {
    const objectives = objectivesOf(plan);
    const primary = objectives[0];
    const tried = new Set(runs.map((run)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(run.modelName, run.hyperparameters)));
    const scored = runs.filter((run)=>run.testMetrics);
    const propose = (config, reason)=>{
        if (!config) return {
            config: null,
            stop: true,
            reason
        };
        const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(config.model, config.params);
        // A configuration that was already run teaches nothing new.
        if (tried.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(config.model, params))) return {
            config: null,
            stop: false,
            reason: ""
        };
        return {
            config: {
                ...config,
                params
            },
            stop: false,
            reason
        };
    };
    // Try a list of candidate proposals in order and return the first usable one.
    const firstUsable = (candidates)=>{
        for (const candidate of candidates){
            const result = propose(candidate.config, candidate.reason);
            if (result.config) return result;
        }
        return null;
    };
    // --- 1. Nothing measured yet: open with the cheapest baseline available. ---
    if (scored.length === 0) {
        const opener = plan.strategy.find((item)=>!tried.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(item.model, item.params))) ?? firstUntriedFamily(plan.taskType, runs, tried);
        return firstUsable([
            {
                config: opener,
                reason: "No results yet; start with a baseline to measure against."
            }
        ]) ?? {
            config: null,
            stop: true,
            reason: "No configuration is available to start from."
        };
    }
    const selection = pickBestRunMulti(scored, objectives);
    const best = selection.best;
    if (!best) {
        const fallback = firstUntriedFamily(plan.taskType, runs, tried);
        return firstUsable([
            {
                config: fallback,
                reason: "No run produced usable metrics; try a different model family."
            }
        ]) ?? {
            config: null,
            stop: true,
            reason: "No successful experiments to learn from."
        };
    }
    // --- 2. Read the current state of the search from the measurements. ---
    const board = familyLeaderboard(scored, primary);
    const leaderFamily = board[0]?.[0] ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(best.modelName);
    const triedFamilies = new Set(scored.map((run)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(run.modelName)));
    const untriedFamilies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelsForTask"])(plan.taskType).map((spec)=>spec.family).filter((family)=>!triedFamilies.has(family));
    const latest = scored[scored.length - 1];
    const bestValue = steeringValue(best, primary);
    const latestValue = steeringValue(latest, primary);
    const latestGain = relativeGain(latestValue, bestValue, primary.optimize);
    // The newest run is the incumbent when it is the selected winner.
    const latestIsBest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(latest.modelName, latest.hyperparameters) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(best.modelName, best.hyperparameters);
    const latestWasPoor = !Number.isNaN(latestGain) && latestGain < -0.05;
    const gap = overfitGap(best, primary.metric);
    const budgetLeft = plan.maxExperiments - scored.length;
    const belowMinimum = scored.length < plan.minExperiments;
    if (scored.length >= plan.maxExperiments) {
        return {
            config: null,
            stop: true,
            reason: `Reached the experiment budget of ${plan.maxExperiments}.`
        };
    }
    // --- 3. Decide what to try next, from the results. ---
    const candidates = [];
    const exploreNewFamily = ()=>firstUntriedFamily(plan.taskType, runs, tried);
    const exploitLeader = ()=>tuneWinner(best, plan, tried);
    const exploitRunnerUp = ()=>{
        const runnerUp = board[1]?.[1].run;
        return runnerUp ? tuneWinner(runnerUp, plan, tried) : null;
    };
    if (latestWasPoor && untriedFamilies.length > 0) {
        // The newest configuration clearly underperformed. Change direction rather
        // than keep tuning around a weak result.
        candidates.push({
            config: exploreNewFamily(),
            reason: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(latest.modelName)} scored ${(latestGain * 100).toFixed(1)}% below the leading ${metricWord(primary.metric)}, so the search moves to an untried ${untriedFamilies[0]} model instead of tuning a weak configuration.`
        });
        candidates.push({
            config: exploitLeader(),
            reason: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(latest.modelName)} underperformed, so the search returns to the leading ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} configuration.`
        });
    }
    if (gap > 0.18) {
        // The leader is memorising the training split; tuneWinner shrinks capacity.
        candidates.push({
            config: exploitLeader(),
            reason: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} shows a ${(gap * 100).toFixed(0)}% train-test gap on ${metricWord(primary.metric)}, so the next run reduces its capacity.`
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
            reason: `The ${leaderFamily} family leads the ${board[1][0]} family by ${(leaderMargin * 100).toFixed(1)}% on ${metricWord(primary.metric)}, so the budget goes to tuning ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} rather than to breadth.`
        });
    }
    // Keep at least one representative of each family before over-tuning one of
    // them, but only while the budget can still afford it.
    const coverageWorthwhile = untriedFamilies.length > 0 && (belowMinimum || budgetLeft > untriedFamilies.length);
    if (coverageWorthwhile) {
        candidates.push({
            config: exploreNewFamily(),
            reason: `${triedFamilies.size} of ${triedFamilies.size + untriedFamilies.length} model families measured so far; adding an untried ${untriedFamilies[0]} model before committing the remaining budget.`
        });
    }
    if (latestIsBest || !Number.isNaN(latestGain) && latestGain > -0.002) {
        // The newest run is at or near the top: explore its neighbourhood.
        candidates.push({
            config: exploitLeader(),
            reason: `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} currently leads on ${metricWord(primary.metric)} at ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(primary.metric, bestValue)}, so the next run searches nearby hyperparameters in the ${leaderFamily} family.`
        });
    }
    candidates.push({
        config: exploitLeader(),
        reason: `Refine the leading ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} configuration around ${metricWord(primary.metric)} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(primary.metric, bestValue)}.`
    });
    candidates.push({
        config: exploitRunnerUp(),
        reason: board[1] ? `The ${leaderFamily} family is saturated, so the search explores the runner-up ${board[1][0]} family.` : "Explore the runner-up family."
    });
    candidates.push({
        config: exploreNewFamily(),
        reason: "Try an unused configuration to avoid settling in a local optimum."
    });
    candidates.push({
        config: plan.strategy.find((item)=>!tried.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(item.model, item.params))) ?? null,
        reason: "Fall back to a remaining configuration from the opening plan."
    });
    const choice = firstUsable(candidates);
    // --- 4. Stopping, always subject to the goal's minimum. ---
    if (!choice) {
        return {
            config: null,
            stop: true,
            reason: belowMinimum ? `Only ${scored.length} experiments were possible; every safe configuration in the search space has been tried.` : "Every distinct configuration in the safe search space has been evaluated."
        };
    }
    if (belowMinimum) return choice;
    // Past the minimum, stop once the search has stopped paying for itself.
    const recent = scored.slice(-3);
    const improvedRecently = recent.some((run)=>{
        const gain = relativeGain(steeringValue(run, primary), bestValue, primary.optimize);
        return !Number.isNaN(gain) && gain > -0.002;
    });
    if (!improvedRecently && untriedFamilies.length === 0) {
        return {
            config: null,
            stop: true,
            reason: `The last ${recent.length} experiments did not improve on ${metricWord(primary.metric)} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(primary.metric, bestValue)} and every family has been measured.`
        };
    }
    return choice;
}
function firstUntriedFamily(task, runs, tried) {
    const usedFamilies = new Set(runs.map((run)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(run.modelName)));
    for (const spec of (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelsForTask"])(task)){
        if (usedFamilies.has(spec.family)) continue;
        const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(spec.name, {});
        if (tried.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(spec.name, params))) continue;
        return {
            model: spec.name,
            params,
            reason: `Untried family ${spec.family}.`
        };
    }
    // Every family used: fall back to any untried configuration in the search space.
    for (const spec of (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelsForTask"])(task)){
        for (const candidate of __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEARCH_SPACES"][spec.name] ?? []){
            const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(spec.name, candidate);
            if (tried.has((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(spec.name, params))) continue;
            return {
                model: spec.name,
                params,
                reason: `Additional ${spec.label} configuration from the search space.`
            };
        }
    }
    return null;
}
function tuneWinner(best, plan, tried) {
    const model = best.modelName;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getModelSpec"])(model)) return null;
    const primary = objectivesOf(plan)[0];
    const gap = overfitGap(best, primary.metric);
    const candidates = [];
    // Neighbourhood moves are only proposed for parameters the model actually has,
    // so a Decision Tree is never handed an `nEstimators` value.
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(model) === "ensemble" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(model) === "tree") {
        const shrink = {
            ...best.hyperparameters
        };
        const grow = {
            ...best.hyperparameters
        };
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["specHasParam"])(model, "maxDepth")) {
            shrink.maxDepth = Math.max(2, Number(best.hyperparameters.maxDepth ?? 6) - 2);
            grow.maxDepth = Math.min(14, Number(best.hyperparameters.maxDepth ?? 6) + 1);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["specHasParam"])(model, "minSamplesLeaf")) {
            shrink.minSamplesLeaf = Number(best.hyperparameters.minSamplesLeaf ?? 2) + 1;
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["specHasParam"])(model, "minSamplesSplit")) {
            shrink.minSamplesSplit = Number(best.hyperparameters.minSamplesSplit ?? 8) + 2;
            grow.minSamplesSplit = Math.max(2, Number(best.hyperparameters.minSamplesSplit ?? 8) - 2);
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["specHasParam"])(model, "nEstimators")) {
            grow.nEstimators = Math.min(64, Number(best.hyperparameters.nEstimators ?? 24) + 8);
        }
        candidates.push(gap > 0.18 ? shrink : grow, gap > 0.18 ? grow : shrink);
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["specHasParam"])(model, "alpha")) {
        const alpha = Number(best.hyperparameters.alpha ?? 1);
        candidates.push({
            ...best.hyperparameters,
            alpha: alpha * 0.3
        }, {
            ...best.hyperparameters,
            alpha: alpha * 3
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["specHasParam"])(model, "k")) {
        const k = Number(best.hyperparameters.k ?? 7);
        candidates.push({
            ...best.hyperparameters,
            k: Math.max(1, k - 2)
        }, {
            ...best.hyperparameters,
            k: k + 4
        });
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["specHasParam"])(model, "l2")) {
        const l2 = Number(best.hyperparameters.l2 ?? 0.01);
        candidates.push({
            ...best.hyperparameters,
            l2: Math.min(2, l2 * 4 + 0.001)
        }, {
            ...best.hyperparameters,
            epochs: Number(best.hyperparameters.epochs ?? 180) + 80
        });
    }
    candidates.push(...__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SEARCH_SPACES"][model] ?? []);
    for (const raw of candidates){
        const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(model, raw);
        const signature = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(model, params);
        if (!tried.has(signature)) {
            return {
                model,
                params,
                reason: gap > 0.18 ? "Reduce capacity to fight overfitting." : "Search a nearby setting around the current winner."
            };
        }
    }
    return null;
}
function analyzeRuns(runs, latest, objectives) {
    const primary = objectives[0];
    const { best, bestValue } = pickBestRunMulti(runs, objectives);
    const latestValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(latest.testMetrics, primary.metric);
    const trainValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(latest.trainMetrics, primary.metric);
    const improved = best !== null && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(best.modelName, best.hyperparameters) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(latest.modelName, latest.hyperparameters);
    const gap = overfitGap(latest, primary.metric);
    const familyScores = new Map();
    for (const run of runs){
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, primary.metric);
        const family = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(run.modelName);
        const current = familyScores.get(family);
        if (current === undefined || (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isBetter"])(value, current, primary.optimize)) familyScores.set(family, value);
    }
    const rankedFamilies = [
        ...familyScores.entries()
    ].sort((a, b)=>primary.optimize === "minimize" ? a[1] - b[1] : b[1] - a[1]);
    const latestScores = objectives.map((objective)=>{
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(latest.testMetrics, objective.metric);
        return Number.isNaN(value) ? null : `${objective.metric}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, value)}`;
    }).filter(Boolean).join(", ");
    const bestScores = best ? objectives.map((objective)=>{
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(best.testMetrics, objective.metric);
        return Number.isNaN(value) ? null : `${objective.metric}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, value)}`;
    }).filter(Boolean).join(", ") : "";
    return {
        latestValue,
        trainValue,
        bestValue,
        improved,
        gap,
        rankedFamilies,
        commentary: [
            `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(latest.modelName)} scored ${latestScores || "no usable metrics"} on the holdout split.`,
            Number.isFinite(trainValue) ? `Train ${primary.metric}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(primary.metric, trainValue)} (${gap > 0.18 ? "overfit risk" : "generalization looks acceptable"}).` : "Train metrics unavailable.",
            best ? `Current leader is ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} at ${bestScores}.` : "No leader yet.",
            rankedFamilies[0] ? `Strongest family so far: ${rankedFamilies[0][0]}.` : ""
        ].filter(Boolean).join(" ")
    };
}
function describeRunMetrics(run, objectives) {
    if (!run) return "";
    return objectives.map((objective)=>{
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, objective.metric);
        return Number.isNaN(value) ? null : `${objective.metric.toUpperCase()} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, value)}`;
    }).filter(Boolean).join(", ");
}
/** Which objectives this run actually leads on, measured against the other runs. */ /** Two metric readings are "the same result" when they agree to this tolerance. */ const TIE_EPSILON = 1e-9;
/**
 * Rank one run against the field on every objective.
 *
 * The critical distinction is between "sole" (strictly better than every other
 * run) and "tied" (equal to the best, but at least one other run matched it).
 * A previous version used a `>=` comparison for both cases, so a tie was
 * reported as an outright win — which is exactly the overclaim this avoids.
 * Comparisons are direction-aware, so `minimize` metrics such as RMSE work too.
 */ function rankMetrics(run, runs, objectives, /**
   * Where the numbers come from. Defaults to the holdout split so every
   * existing caller behaves exactly as before; the report passes the
   * cross-validated means when those are what selected the winner, so the
   * standings it prints describe the evidence that actually decided.
   */ read = holdoutValue) {
    return objectives.map((objective)=>{
        const value = read(run, objective.metric);
        if (Number.isNaN(value)) {
            return {
                metric: objective.metric,
                optimize: objective.optimize,
                standing: "unmeasured",
                sharedWith: 0
            };
        }
        const values = runs.map((item)=>read(item, objective.metric)).filter((item)=>!Number.isNaN(item));
        const bestValue = objective.optimize === "minimize" ? Math.min(...values) : Math.max(...values);
        const atTop = Math.abs(value - bestValue) <= TIE_EPSILON;
        const sharedWith = values.filter((item)=>Math.abs(item - bestValue) <= TIE_EPSILON).length;
        return {
            metric: objective.metric,
            optimize: objective.optimize,
            standing: atTop ? sharedWith > 1 ? "tied" : "sole" : "behind",
            sharedWith: atTop ? sharedWith : 0
        };
    });
}
/** Acronym metrics stay upper-case ("RMSE"); word metrics stay lower-case ("accuracy"). */ const ACRONYM_METRICS = new Set([
    "rmse",
    "mae",
    "mape",
    "r2",
    "f1"
]);
const metricWord = (metric)=>ACRONYM_METRICS.has(metric) ? metric.toUpperCase() : metric.toLowerCase();
const directionWord = (optimize)=>optimize === "minimize" ? "lowest" : "highest";
function joinClauses(clauses) {
    if (clauses.length === 0) return "";
    if (clauses.length === 1) return clauses[0];
    return `${clauses.slice(0, -1).join(", ")} and ${clauses[clauses.length - 1]}`;
}
function describeObjectiveDirections(objectives) {
    return objectives.map((objective)=>`${metricWord(objective.metric)} (${objective.optimize === "minimize" ? "lower" : "higher"} is better)`).join(", ");
}
function buildDirectionGuard(objectives) {
    const minimised = objectives.filter((objective)=>objective.optimize === "minimize");
    if (minimised.length === 0) return ()=>false;
    const names = minimised.map((objective)=>escapeRegExp(metricWord(objective.metric))).join("|");
    const bigIsBetter = "highest|greatest|largest|maximum|max|strongest|top|best-scoring|biggest|improved|increased";
    // "highest RMSE", "strongest measured RMSE", "highest possible RMSE score"
    const before = new RegExp(String.raw`\b(?:${bigIsBetter})\b(?:\s+\w+){0,3}\s+(?:${names})\b`, "i");
    // "RMSE was the highest", "RMSE ... is the greatest"
    const after = new RegExp(String.raw`\b(?:${names})\b(?:\s+\w+){0,3}\s+(?:was|is|were|are)\s+the\s+(?:${bigIsBetter})\b`, "i");
    // "maximize RMSE"
    const maximise = new RegExp(String.raw`\bmaximi[sz](?:e|ed|ing)\b(?:\s+\w+){0,2}\s+(?:${names})\b`, "i");
    return (text)=>before.test(text) || after.test(text) || maximise.test(text);
}
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
/**
 * "highest accuracy and F1" when every metric shares a direction, otherwise
 * "highest accuracy and lowest RMSE". The superlative is only repeated when the
 * optimisation directions actually differ.
 */ function superlativePhrase(ranks, evidence = "") {
    const qualifier = evidence ? `${evidence} ` : "";
    const directions = new Set(ranks.map((rank)=>rank.optimize));
    if (directions.size === 1) {
        return `${directionWord(ranks[0].optimize)} ${qualifier}${joinClauses(ranks.map((rank)=>metricWord(rank.metric)))}`;
    }
    return joinClauses(ranks.map((rank)=>`${directionWord(rank.optimize)} ${qualifier}${metricWord(rank.metric)}`));
}
function describeAchievement(ranks, totalRuns, evidence = "") {
    const measured = ranks.filter((rank)=>rank.standing !== "unmeasured");
    const sole = measured.filter((rank)=>rank.standing === "sole");
    const tied = measured.filter((rank)=>rank.standing === "tied");
    const scope = `among the ${totalRuns} evaluated experiment${totalRuns === 1 ? "" : "s"}`;
    if (measured.length === 0) return `completed without a comparable metric ${scope}`;
    if (sole.length === 0 && tied.length === 0) {
        const qualifier = evidence ? `${evidence} ` : "";
        return `recorded the best overall balance across ${qualifier}${joinClauses(measured.map((rank)=>metricWord(rank.metric)))} ${scope}, without leading on any single metric`;
    }
    const clauses = [];
    if (sole.length > 0) {
        clauses.push(`achieved the ${superlativePhrase(sole, evidence)}`);
    }
    if (tied.length > 0) {
        clauses.push(`tied for the ${superlativePhrase(tied, evidence)}`);
    }
    if (sole.length + tied.length < measured.length) {
        const trailing = measured.filter((rank)=>rank.standing === "behind");
        const qualifier = evidence ? `${evidence} ` : "";
        clauses.push(`scored competitively on ${qualifier}${joinClauses(trailing.map((rank)=>metricWord(rank.metric)))}`);
    }
    return `${joinClauses(clauses)} ${scope}`;
}
function buildDatasetInsights(stats, taskType) {
    const target = stats.targetName;
    const parts = [];
    const topCorr = (stats.correlations ?? []).filter((item)=>Number.isFinite(item.corr)).slice(0, 3);
    if (topCorr.length) {
        const listed = topCorr.map((item)=>`${item.feature} (r=${item.corr.toFixed(2)}, ${item.corr >= 0 ? "positive" : "negative"})`).join(", ");
        parts.push(`Among the ${stats.featureCount} numeric features, the strongest linear associations with ${target} are ${listed}.`);
    } else {
        parts.push(`The dataset provides ${stats.featureCount} numeric features for predicting ${target}.`);
    }
    if (taskType === "classification" && stats.classBalance) {
        const entries = Object.entries(stats.classBalance);
        const total = entries.reduce((sum, [, count])=>sum + count, 0) || 1;
        const balance = entries.map(([label, count])=>`${label} ${(count / total * 100).toFixed(1)}%`).join(", ");
        parts.push(`Class balance for ${target}: ${balance} across ${stats.rowCount} rows.`);
    } else if (taskType === "regression" && stats.targetMean !== undefined) {
        parts.push(`${target} has mean ${stats.targetMean.toFixed(3)} and standard deviation ${(stats.targetStd ?? 0).toFixed(3)} over ${stats.rowCount} rows.`);
    }
    return parts.join(" ");
}
function writeReport(goal, stats, plan, runs, best, /**
   * The full winner selection, when the caller has it. Passing it lets the
   * report explain how a tie was really broken. Recomputed when omitted, so
   * existing callers keep working unchanged.
   */ selectionInput) {
    const objectives = objectivesOf(plan);
    const objectiveText = describeObjectives(objectives);
    const scored = runs.filter((run)=>run.testMetrics);
    const selection = selectionInput ?? pickBestRunMulti(scored, objectives);
    const lessons = scored.slice(0, 8).map((run)=>{
        const values = objectives.map((objective)=>{
            const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, objective.metric);
            return Number.isNaN(value) ? null : `${objective.metric}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, value)}`;
        }).filter(Boolean).join(", ");
        // Cross-validated means are appended when they exist, so the holdout line
        // is never replaced, only supplemented.
        const cv = run.cvMetrics;
        const cvText = cv ? objectives.map((objective)=>{
            const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(cv.mean, objective.metric);
            if (Number.isNaN(value)) return null;
            const spread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(cv.std, objective.metric);
            const plusMinus = Number.isNaN(spread) ? "" : `±${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, spread)}`;
            return `${objective.metric}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, value)}${plusMinus}`;
        }).filter(Boolean).join(", ") : "";
        return `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(run.modelName)} reached ${values || "no usable metrics"} with ${JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(run.modelName, run.hyperparameters))}.` + (cvText ? ` ${cv.folds}-fold CV: ${cvText}.` : "");
    });
    const bestMetrics = best?.testMetrics ?? {};
    const bestSummary = describeRunMetrics(best, objectives);
    // The report ranks the winner on the same evidence that selected it. When
    // cross-validation ran, that is the mean k-fold value; the holdout figures
    // are still reported, but they no longer decide anything.
    const onCv = selection.basis === "cross_validation";
    const readSelected = (run, metric)=>onCv ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(cvMean(run), metric) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(run.testMetrics, metric);
    const foldWord = selection.folds > 0 ? `${selection.folds}-fold ` : "";
    // "5-fold cross-validated" / "" — used to qualify every superlative so the
    // reader always knows which measurement the claim is about.
    const evidenceWord = onCv ? `${foldWord}cross-validated mean` : "";
    // Runs that can actually be compared on the deciding evidence.
    const comparable = onCv ? scored.filter((run)=>run.cvMetrics) : scored;
    const ranks = best ? rankMetrics(best, comparable, objectives, readSelected) : [];
    const achievement = best ? describeAchievement(ranks, comparable.length, evidenceWord) : "";
    // Same standing without the evidence qualifier, for sentences that already
    // name the evidence themselves.
    const achievementPlain = best ? describeAchievement(ranks, comparable.length) : "";
    /** Combined holdout objective score, used only to describe the weaker estimate. */ const holdoutScoreOf = (run)=>objectiveScore(run, scored, objectives);
    const tiedRanks = ranks.filter((rank)=>rank.standing === "tied");
    // Claims are limited to what was actually measured. A tie is never reported
    // as an outright win, and no wording implies a search or evaluation that did
    // not happen.
    const headline = best ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} ${achievement}` : "No successful model was selected";
    // Name every run that shares a tied top value, so the tie is auditable.
    // Metrics that are tied by the same group of runs at the same value are
    // merged into one clause instead of repeating the same names once per metric.
    const tieGroups = new Map();
    for (const rank of tiedRanks){
        const topValue = readSelected(best, rank.metric);
        const sharingRuns = comparable.filter((run)=>Math.abs(readSelected(run, rank.metric) - topValue) <= TIE_EPSILON);
        const sharers = Array.from(new Set(labelRuns(sharingRuns)));
        const key = `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(rank.metric, topValue)}|${sharers.join("\u0000")}`;
        const existing = tieGroups.get(key);
        if (existing) existing.metrics.push(rank);
        else tieGroups.set(key, {
            metrics: [
                rank
            ],
            value: topValue,
            sharers
        });
    }
    const tieDetail = [
        ...tieGroups.values()
    ].map((group)=>{
        const names = joinClauses(group.metrics.map((rank)=>metricWord(rank.metric)));
        const verb = group.metrics.length === 1 ? "is" : "are all";
        return `${names} of ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(group.metrics[0].metric, group.value)} ${verb} shared by ${joinClauses(group.sharers)}`;
    }).join("; ");
    // Cross-validation is reported when it ran, and the closing caveat states
    // honestly which evaluations actually happened.
    const bestCv = best?.cvMetrics ?? null;
    const cvSentence = bestCv ? `Across ${bestCv.folds}-fold cross-validation on all ${bestCv.rows} rows, ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} averaged ${objectives.map((objective)=>{
        const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(bestCv.mean, objective.metric);
        if (Number.isNaN(value)) return null;
        const spread = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(bestCv.std, objective.metric);
        const plusMinus = Number.isNaN(spread) ? "" : ` (±${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, spread)} across folds)`;
        return `${metricWord(objective.metric)} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, value)}${plusMinus}`;
    }).filter(Boolean).join(", ") || "no comparable metric"}. ` : "";
    const evaluationCaveat = bestCv ? `The holdout figures come from one 80/20 split and are reported for reference only; the winner was chosen on the ${bestCv.folds}-fold cross-validated means, which average ${bestCv.folds} folds and are the more reliable estimate.` : `These numbers come from one holdout split and were not cross-validated.`;
    // States, in one sentence, which body of evidence chose the winner.
    const selectionSentence = best ? onCv ? `The final model was selected on the mean ${foldWord}cross-validation score${selection.decidingMetric ? `, decided by ${metricWord(selection.decidingMetric)}` : ""}; the holdout split is reported separately and did not override it. ` : `Only the single 80/20 holdout split was available, so the final model was selected on it alone. ` : "";
    const narrative = best ? `The goal "${goal}" was interpreted as a ${plan.taskType} task optimizing ${objectiveText}. ` + `${scored.length} configuration${scored.length === 1 ? "" : "s"} were trained on ${stats.rowCount} rows and ${stats.featureCount} features using a single 80/20 holdout split, predicting ${stats.targetName}. ` + `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} recorded ${bestSummary} on the held-out 20% and ${achievement}. ` + (tieDetail ? `The tie is exact: ${tieDetail}. ` : "") + cvSentence + selectionSentence + evaluationCaveat : `The goal "${goal}" was interpreted as a ${plan.taskType} task optimizing ${objectiveText}, but no experiment completed successfully.`;
    // How the winner was actually separated from the runs it tied with. Each
    // branch states only what the measurements support, so a tie that nothing
    // could break is reported as exactly that.
    // Label the winner alongside its contenders so repeated algorithms are
    // distinguished by their hyperparameters instead of colliding on one name.
    const contenderLabels = labelRuns(selection.contenders);
    const winnerIndex = selection.contenders.findIndex((run)=>run === best);
    const bestLabel = winnerIndex >= 0 ? contenderLabels[winnerIndex] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best?.modelName ?? "none");
    const uniqueRivals = Array.from(new Set(contenderLabels.filter((_, index)=>index !== winnerIndex))).filter((label)=>label !== bestLabel);
    // Values on the deciding evidence, e.g. "accuracy 0.938, F1 0.933".
    const describeSelected = (run)=>objectives.map((objective)=>{
            const value = readSelected(run, objective.metric);
            return Number.isNaN(value) ? null : `${metricWord(objective.metric)} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, value)}`;
        }).filter(Boolean).join(", ");
    // Which metric actually separated the winner, with both sides' numbers.
    const separationDetail = (rival)=>{
        const metric = selection.decidingMetric ?? objectives[0].metric;
        const mine = readSelected(best, metric);
        const theirs = readSelected(rival, metric);
        if (Number.isNaN(mine) || Number.isNaN(theirs)) return "";
        return `${metricWord(metric)} ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(metric, mine)} against ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(metric, theirs)}`;
    };
    // Honest note about the weaker estimate: the holdout split is reported, but
    // it is never what decided the winner once cross-validation exists.
    const holdoutNote = (()=>{
        if (!best || !onCv) return "";
        const holdoutRanks = rankMetrics(best, scored, objectives, holdoutValue);
        const tiedOnHoldout = holdoutRanks.filter((rank)=>rank.standing === "tied");
        if (tiedOnHoldout.length > 0) {
            const shared = tiedOnHoldout.map((rank)=>{
                const value = holdoutValue(best, rank.metric);
                return `${metricWord(rank.metric)} of ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(rank.metric, value)}`;
            }).join(", ");
            return `The single holdout split could not make this call: ${shared} was matched by other configurations, so it was reported but not used to decide. `;
        }
        // A different configuration looked better on the single split.
        const holdoutLeader = scored.reduce((leader, run)=>{
            const a = holdoutScoreOf(run);
            const b = holdoutScoreOf(leader);
            if (Number.isNaN(a)) return leader;
            if (Number.isNaN(b)) return run;
            return a > b ? run : leader;
        }, scored[0]);
        if (holdoutLeader && holdoutLeader !== best) {
            const rivalLabel = labelRuns([
                holdoutLeader,
                best
            ])[0];
            return `${rivalLabel} looked stronger on the single 80/20 split, but a holdout split is one draw of the data; the ${foldWord}cross-validated means are the more reliable estimate and were used instead. `;
        }
        return "";
    })();
    const tieBreakSentence = (()=>{
        if (!best) return "";
        const evidenceName = onCv ? `mean ${foldWord}cross-validation score` : "holdout split";
        // 1. An exact tie on everything the deciding evidence measured.
        if (selection.tied && selection.tiedRuns.length > 1) {
            const tiedLabels = labelRuns(selection.tiedRuns);
            const winnerAt = selection.tiedRuns.findIndex((run)=>run === best);
            const winnerLabel = winnerAt >= 0 ? tiedLabels[winnerAt] : bestLabel;
            const opening = `${joinClauses(tiedLabels)} recorded identical ${onCv ? `${foldWord}cross-validated ` : ""}results on every objective, so the measured evidence does not separate them. `;
            const closing = `${winnerLabel} is reported as the winner because it is the simplest of the tied configurations, not because it performed better. `;
            return onCv ? `${opening}${closing}The holdout split was not used to break this tie, because a single split is the weaker estimate. ` : `${opening}${closing}`;
        }
        // 2. Separated from the runs it started level with.
        if (uniqueRivals.length > 0) {
            const rivalRuns = selection.contenders.filter((run)=>run !== best);
            const detail = rivalRuns.length === 1 ? separationDetail(rivalRuns[0]) : "";
            return `It was selected over ${joinClauses(uniqueRivals)} on the ${evidenceName}${detail ? ` (${detail})` : ""}. `;
        }
        // 3. Nothing tied with it: it simply led the deciding evidence.
        const summary = describeSelected(best);
        return `It was selected on the ${evidenceName}${summary ? ` (${summary})` : ""}, the best of the ${comparable.length} comparable run${comparable.length === 1 ? "" : "s"}. `;
    })();
    const whyItWon = best ? (onCv ? `${bestLabel} recorded ${bestSummary} on the holdout split, and on the mean ${foldWord}cross-validation it ${achievementPlain}. ` : `${bestLabel} recorded ${bestSummary} on the holdout split and ${achievementPlain}. `) + tieBreakSentence + holdoutNote + ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(best.modelName) === "linear" ? `Its linear decision surface fit the standardized features without needing extra capacity.` : (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["familyOf"])(best.modelName) === "neighbor" ? `Local neighborhood structure in the feature space carried enough signal for an instance-based predictor.` : `Threshold-based splits captured non-linear structure that the linear baseline could not represent.`) : "The run did not produce a usable leader.";
    return {
        headline,
        narrative,
        bestModel: best?.modelName ?? "none",
        bestParams: best ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(best.modelName, best.hyperparameters) : {},
        bestMetrics,
        whyItWon,
        datasetInsights: buildDatasetInsights(stats, plan.taskType),
        experimentLessons: lessons,
        recommendedNextSteps: [
            bestCv ? `Repeat the ${bestCv.folds}-fold cross-validation with several different seeds; the fold spread shows how much of the ranking is noise.` : `Confirm the ranking with k-fold cross-validation; the current numbers come from a single 80/20 split of ${stats.rowCount} rows.`,
            best ? `Expand the ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(best.modelName)} hyperparameter grid around the winning configuration.` : "Investigate why the experiments failed before retrying.",
            `Inspect the errors on ${stats.targetName} and engineer features from the highest-correlation inputs.`
        ]
    };
}
}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/agent/graph.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "loadProjectBundle",
    ()=>loadProjectBundle,
    "runProjectToCompletion",
    ()=>runProjectToCompletion,
    "startProject",
    ()=>startProject,
    "stepProject",
    ()=>stepProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/id.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/logger.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/engine.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/metrics.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/registry.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$tracking$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/tracking/store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/agent/llm.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/agent/policy.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$tracking$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$tracking$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
async function writeLog(projectId, node, phase, message, level = "info", payload, experimentId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"]).values({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createId"])("log"),
        projectId,
        experimentId,
        node,
        phase,
        level,
        message,
        payload: payload ?? null
    });
}
async function setPhase(projectId, phase, extra) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"]).set({
        phase,
        updatedAt: new Date(),
        ...extra
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"].id, projectId));
}
function asCompleted(rows) {
    return rows.filter((row)=>row.status === "completed" && row.testMetrics).map((row)=>({
            modelName: row.modelName,
            hyperparameters: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(row.modelName, row.hyperparameters),
            trainMetrics: row.trainMetrics,
            testMetrics: row.testMetrics,
            cvMetrics: row.cvMetrics
        }));
}
async function startProject(projectId) {
    const [project] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"].id, projectId));
    if (!project) throw new Error("Project not found");
    if (!project.datasetId) throw new Error("Select a dataset before starting");
    const [dataset] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"].id, project.datasetId));
    if (!dataset) throw new Error("Dataset not found");
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].projectId, projectId));
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"].projectId, projectId));
    await setPhase(projectId, "analyzing_dataset", {
        status: "running",
        error: null,
        report: null,
        summary: null,
        bestExperimentId: null,
        iteration: 0,
        nextConfig: null
    });
    await writeLog(projectId, "dataset_analyst", "analyzing_dataset", `Inspecting ${dataset.name}: ${dataset.rowCount} rows, ${dataset.featureColumns.length} features, target ${dataset.targetColumn}.`);
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseGoal"])(project.goal, dataset.taskType);
    const top = dataset.stats.correlations?.slice(0, 4) ?? [];
    await writeLog(projectId, "dataset_analyst", "analyzing_dataset", `Task inferred as ${parsed.taskType}, optimizing ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["describeObjectives"])(parsed.objectives)}. Strongest linear signals against the target ${dataset.targetColumn}: ${top.map((item)=>`${item.feature} (r=${item.corr.toFixed(2)})`).join(", ") || "n/a"}.`, "success", {
        stats: dataset.stats,
        parsed
    });
    await setPhase(projectId, "planning");
    await writeLog(projectId, "planner", "planning", "Creating an experiment strategy from the goal and dataset profile.");
    const fallbackPlan = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildHeuristicPlan"])(project.goal, dataset.stats, dataset.taskType, project.minExperiments, project.maxExperiments);
    // Model names and their legal hyperparameters come from the registry, so the
    // planner prompt stays correct for whatever models are registered.
    const allowedModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelsForTask"])(dataset.taskType);
    const planned = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["completeJson"])([
        "You are the planner node of an ML experiment orchestrator.",
        "Return only JSON matching the experiment plan schema.",
        `Use only these model names: ${allowedModels.map((spec)=>spec.name).join(", ")}.`,
        "For each model use only its listed hyperparameters:",
        allowedModels.map((spec)=>`${spec.name}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["paramKeysOf"])(spec.name).join(", ") || "(none)"}`).join("; "),
        "Never invent models, never mix hyperparameters between models, and never execute code."
    ].join(" "), JSON.stringify({
        goal: project.goal,
        dataset: {
            name: dataset.name,
            taskType: dataset.taskType,
            stats: dataset.stats
        },
        availableModels: fallbackPlan.strategy.map((item)=>item.model),
        constraints: {
            minExperiments: project.minExperiments,
            maxExperiments: project.maxExperiments
        }
    }, null, 2), ()=>fallbackPlan);
    // The objective set is derived from the goal text, never from the LLM, so a goal
    // naming several metrics can't be silently collapsed to a single one.
    const llmStrategy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeStrategy"])(planned.value?.strategy, dataset.taskType);
    const strategy = (llmStrategy.length ? llmStrategy : fallbackPlan.strategy).slice(0, project.maxExperiments);
    const plan = {
        ...fallbackPlan,
        rationale: planned.value?.rationale?.trim() || fallbackPlan.rationale,
        adaptationPolicy: planned.value?.adaptationPolicy?.trim() || fallbackPlan.adaptationPolicy,
        taskType: dataset.taskType,
        objectives: fallbackPlan.objectives,
        primaryMetric: fallbackPlan.primaryMetric,
        optimize: fallbackPlan.optimize,
        minExperiments: project.minExperiments,
        maxExperiments: project.maxExperiments,
        strategy: strategy.length ? strategy : fallbackPlan.strategy
    };
    const first = plan.strategy[0] ?? null;
    await setPhase(projectId, "planning", {
        plan,
        taskType: plan.taskType,
        primaryMetric: plan.primaryMetric,
        optimize: plan.optimize,
        nextConfig: first,
        summary: plan.rationale
    });
    await writeLog(projectId, "planner", "planning", `Plan ready (${planned.source}): ${plan.rationale}`, "success", plan);
    if (first) {
        await writeLog(projectId, "planner", "planning", `First experiment queued: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(first.model)} â€” ${first.reason}`);
    }
    return {
        plan,
        first
    };
}
async function stepProject(projectId) {
    const [project] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"].id, projectId));
    if (!project) throw new Error("Project not found");
    if (project.status !== "running") {
        return {
            done: project.status === "completed",
            project
        };
    }
    if (!project.datasetId || !project.plan) {
        throw new Error("Project is missing a dataset or plan");
    }
    const [dataset] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"].id, project.datasetId));
    if (!dataset) throw new Error("Dataset not found");
    const history = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].projectId, projectId)).orderBy(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].runNumber);
    const completed = asCompleted(history);
    const plan = project.plan;
    const objectives = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["objectivesOf"])(plan);
    const rawPending = project.nextConfig ?? null;
    // Strip any parameter that does not belong to this model before it is stored
    // or trained, so history always reflects the real hyperparameters used.
    const pending = rawPending ? {
        ...rawPending,
        params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(rawPending.model, rawPending.params)
    } : null;
    if (!pending) {
        return finalize(projectId, project, dataset, completed, plan);
    }
    const runNumber = history.length + 1;
    const experimentId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createId"])("exp");
    await setPhase(projectId, "selecting");
    await writeLog(projectId, "selector", "selecting", `Selected experiment ${runNumber}: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(pending.model)} ${JSON.stringify(pending.params)}`, "info", pending, experimentId);
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).values({
        id: experimentId,
        projectId,
        runNumber,
        modelName: pending.model,
        hyperparameters: pending.params,
        datasetInfo: {
            name: dataset.name,
            rows: dataset.rowCount,
            features: dataset.featureColumns,
            target: dataset.targetColumn,
            split: "80/20 holdout"
        },
        status: "running",
        decisionReason: pending.reason
    });
    await setPhase(projectId, "training");
    await writeLog(projectId, "executor", "training", `Training ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(pending.model)} on ${dataset.name}. Arbitrary generated code is not executed; only the validated registry path runs.`, "info", undefined, experimentId);
    try {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$engine$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runSafeExperiment"])({
            model: pending.model,
            params: pending.params,
            task: dataset.taskType,
            X: dataset.payload.X,
            y: dataset.payload.y,
            featureNames: dataset.payload.featureNames,
            seed: 42 + runNumber
        });
        await setPhase(projectId, "evaluating");
        await writeLog(projectId, "evaluator", "evaluating", `Holdout ${objectives.map((objective)=>`${objective.metric}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(result.testMetrics, objective.metric))}`).join(", ")} in ${result.durationMs}ms.`, "success", result.testMetrics, experimentId);
        if (result.cvMetrics) {
            await writeLog(projectId, "evaluator", "evaluating", `${result.cvMetrics.folds}-fold cross-validation on ${result.cvMetrics.rows} rows: ${objectives.map((objective)=>`${objective.metric}=${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(result.cvMetrics.mean, objective.metric))}` + `±${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["formatMetric"])(objective.metric, (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$metrics$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["metricValue"])(result.cvMetrics.std, objective.metric))}`).join(", ")} in ${result.cvMetrics.durationMs}ms.`, "success", result.cvMetrics, experimentId);
        }
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).set({
            status: "completed",
            // Record the exact validated parameters the trainer used.
            modelName: result.model,
            hyperparameters: result.params,
            trainMetrics: result.trainMetrics,
            testMetrics: result.testMetrics,
            cvMetrics: result.cvMetrics,
            featureImportance: result.featureImportance,
            preview: result.preview,
            coefficients: result.coefficients,
            trainDurationMs: result.durationMs,
            notes: pending.reason,
            completedAt: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].id, experimentId));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$tracking$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logTrackingRun"])({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createId"])("run"),
            experimentId,
            projectId,
            name: `${pending.model}-${runNumber}`,
            params: result.params,
            metrics: result.testMetrics,
            tags: {
                dataset: dataset.slug,
                task: dataset.taskType,
                metric: objectives.map((objective)=>objective.metric).join("+")
            }
        });
        const updatedCompleted = [
            ...completed,
            {
                modelName: result.model,
                hyperparameters: result.params,
                trainMetrics: result.trainMetrics,
                testMetrics: result.testMetrics,
                cvMetrics: result.cvMetrics
            }
        ];
        await setPhase(projectId, "analyzing");
        const analysisFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["analyzeRuns"])(updatedCompleted, updatedCompleted[updatedCompleted.length - 1], objectives);
        const analysis = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["completeJson"])("You are the experiment analyst. Return JSON {commentary: string} using only the provided metrics. Do not invent numbers or claim any evaluation that is not listed.", JSON.stringify({
            objectives,
            latest: updatedCompleted[updatedCompleted.length - 1],
            history: updatedCompleted
        }), ()=>({
                commentary: analysisFallback.commentary
            }));
        await writeLog(projectId, "analyst", "analyzing", analysis.value.commentary || analysisFallback.commentary, "info", analysisFallback, experimentId);
        const { best } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickBestRunMulti"])(updatedCompleted, objectives);
        const bestRow = (await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].projectId, projectId))).find((row)=>best !== null && row.status === "completed" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(row.modelName, row.hyperparameters) === (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["configSignature"])(best.modelName, best.hyperparameters));
        await setPhase(projectId, "deciding");
        const decisionFallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["suggestNextExperiment"])(plan, updatedCompleted);
        const decision = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["completeJson"])("You are the decision agent. Return JSON {stop:boolean, reason:string, config?:{model,params,reason}|null}. Use only registry models and numeric params. Prefer stopping after the minimum experiments if gains are tiny.", JSON.stringify({
            plan,
            completed: updatedCompleted,
            suggested: decisionFallback
        }), ()=>decisionFallback);
        // The LLM may not stop early: the goal's minimum experiment count wins.
        const belowMinimum = updatedCompleted.length < plan.minExperiments;
        const wantsStop = decision.value.stop && !belowMinimum;
        const proposed = decision.value.config ?? decisionFallback.config;
        const validated = proposed ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeStrategy"])([
            proposed
        ], plan.taskType)[0] ?? null : null;
        const chosen = validated ?? decisionFallback.config;
        const nextConfig = wantsStop || updatedCompleted.length >= plan.maxExperiments ? null : chosen ? {
            ...chosen,
            params: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sanitizeParams"])(chosen.model, chosen.params)
        } : null;
        await setPhase(projectId, nextConfig ? "deciding" : "reporting", {
            iteration: runNumber,
            nextConfig,
            bestExperimentId: bestRow?.id ?? experimentId
        });
        await writeLog(projectId, "decision", "deciding", nextConfig ? `${decision.value.reason || decisionFallback.reason} Next: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["modelLabel"])(nextConfig.model)}.` : decision.value.reason || decisionFallback.reason, nextConfig ? "info" : "success", {
            nextConfig,
            stop: !nextConfig
        }, experimentId);
        if (!nextConfig) {
            return finalize(projectId, {
                ...project,
                bestExperimentId: bestRow?.id ?? experimentId
            }, dataset, updatedCompleted, plan);
        }
        return {
            done: false,
            experimentId
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Training failed";
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].error("executor", message, error);
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).set({
            status: "failed",
            notes: message,
            completedAt: new Date()
        }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].id, experimentId));
        await writeLog(projectId, "executor", "training", message, "error", undefined, experimentId);
        const fallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["suggestNextExperiment"])(plan, completed);
        await setPhase(projectId, fallback.config ? "deciding" : "failed", {
            nextConfig: fallback.config,
            error: fallback.config ? null : message,
            status: fallback.config ? "running" : "failed"
        });
        return {
            done: !fallback.config,
            error: message
        };
    }
}
async function finalize(projectId, project, dataset, completed, plan) {
    await setPhase(projectId, "reporting");
    const objectives = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["objectivesOf"])(plan);
    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["pickBestRunMulti"])(completed, objectives);
    const best = selection.best;
    const fallback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeReport"])(project.goal, dataset.stats, plan, completed, best, selection);
    const generated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["completeJson"])([
        "You are the final report agent. Return JSON with keys headline, narrative, bestModel, bestParams, bestMetrics, whyItWon, datasetInsights, experimentLessons, recommendedNextSteps.",
        "Use ONLY the numbers provided. Never invent metrics, models, or hyperparameters.",
        best?.cvMetrics ? `Evaluation was an 80/20 holdout split PLUS ${best.cvMetrics.folds}-fold cross-validation on all ${best.cvMetrics.rows} rows; both sets of numbers are supplied. Report the cross-validated figures as the more reliable estimate. Do NOT claim a 'genuine search over the hypothesis space', generalization guarantees, or that a model is 'best on unseen data'.` : "Evaluation was a single 80/20 holdout split. Do NOT claim cross-validation, a 'genuine search over the hypothesis space', generalization guarantees, or that a model is 'best on unseen data'.",
        // The winner is chosen by the code, never by the model. State the rule so
        // the generated prose cannot justify the choice with the wrong evidence.
        selection.basis === "cross_validation" ? `The final model was ALREADY selected, using the mean ${selection.folds}-fold cross-validation score as the primary metric${selection.decidingMetric ? ` (decided by ${selection.decidingMetric})` : ""}. Say that the winner was selected on the mean ${selection.folds}-fold cross-validation score, and report the holdout numbers separately as a single-split reference. NEVER say or imply the winner was chosen because it had the best holdout score.${selection.tied ? " The cross-validated results are exactly tied between two or more configurations: report this as a tie and do not claim the winner performed better." : ""}` : "No cross-validated results are available, so the winner was selected on the single holdout split. Do not claim any other evidence was used.",
        "Say 'best measured <metric> among the evaluated experiments'. If several objectives were given, mention every one of them.",
        // Direction is stated per metric so error metrics are never described as
        // "highest". This list is generated from the objectives, so it stays
        // correct for any metric set on any dataset.
        `Optimisation direction for each metric: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["describeObjectiveDirections"])(objectives)}. ` + `For a metric that is minimised, the best result is the LOWEST value: write "lowest <metric>" and never "highest <metric>", "strongest <metric>", "greatest <metric>" or "improved <metric>" when you mean the winner.`,
        `datasetInsights must be about predicting the target column "${dataset.targetColumn}" and must not describe another column as the thing being predicted.`
    ].join(" "), JSON.stringify({
        goal: project.goal,
        objectives,
        targetColumn: dataset.targetColumn,
        evaluation: best?.cvMetrics ? `80/20 holdout split plus ${best.cvMetrics.folds}-fold cross-validation` : "single 80/20 holdout split, no cross-validation",
        // How the winner was actually chosen, so the prose matches the code.
        selection: {
            basis: selection.basis,
            folds: selection.folds,
            decidingMetric: selection.decidingMetric,
            tied: selection.tied,
            primaryValue: selection.primaryValue
        },
        dataset: dataset.stats,
        completed,
        fallback
    }), ()=>fallback);
    // Anything the model says that we cannot verify is replaced by the measured text.
    const generatedValue = generated.value ?? fallback;
    // Only affirmative claims are rejected. An honest disclaimer such as
    // "these numbers were not cross-validated" must be allowed through.
    const NEGATED = String.raw`(?<!\b(?:not|never|without|no)\s)(?<!\b(?:not|never|without|no)\s\w{1,12}\s)`;
    const banned = new RegExp([
        String.raw`genuine search over the hypothesis space`,
        String.raw`\bexhaustive(?:ly)? search`,
        NEGATED + String.raw`best on unseen data`,
        NEGATED + String.raw`generali[sz]es best`,
        // Claiming cross-validation is only a lie when it did not run. When the
        // winner really has k-fold results, the claim is true and allowed.
        ...best?.cvMetrics ? [] : [
            NEGATED + String.raw`cross[- ]validat(?:ed|ion)\b`
        ],
        NEGATED + String.raw`\bguarantee[sd]?\b`,
        NEGATED + String.raw`will (?:perform|generali[sz]e) best`,
        NEGATED + String.raw`proven to\b`,
        String.raw`\bstatistically significant\b`
    ].join("|"), "i");
    // A minimised metric (RMSE, MAE, MAPE) described with a "bigger is better"
    // superlative is factually wrong, so that sentence is discarded in favour of
    // the measured text. Built from the objectives, so it covers any metric.
    const wrongDirection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$policy$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["buildDirectionGuard"])(objectives);
    const rejectsClaim = (text)=>typeof text !== "string" || !text.trim() || banned.test(text) || wrongDirection(text);
    const report = {
        ...fallback,
        headline: rejectsClaim(generatedValue.headline) ? fallback.headline : generatedValue.headline,
        narrative: rejectsClaim(generatedValue.narrative) ? fallback.narrative : generatedValue.narrative,
        whyItWon: rejectsClaim(generatedValue.whyItWon) ? fallback.whyItWon : generatedValue.whyItWon,
        // These four are always the measured values, never the model's version.
        bestModel: fallback.bestModel,
        bestParams: fallback.bestParams,
        bestMetrics: best?.testMetrics ?? fallback.bestMetrics,
        datasetInsights: fallback.datasetInsights,
        experimentLessons: fallback.experimentLessons,
        recommendedNextSteps: fallback.recommendedNextSteps
    };
    await setPhase(projectId, "completed", {
        status: "completed",
        report,
        summary: report.narrative,
        nextConfig: null
    });
    await writeLog(projectId, "reporter", "completed", report.headline, "success", report);
    return {
        done: true,
        report
    };
}
async function runProjectToCompletion(projectId) {
    await startProject(projectId);
    let guard = 0;
    while(guard < 20){
        const result = await stepProject(projectId);
        if (result.done) return result;
        guard += 1;
    }
    throw new Error("Experiment loop exceeded the safety guard");
}
async function loadProjectBundle(projectId) {
    const [project] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"].id, projectId));
    if (!project) return null;
    const [dataset] = project.datasetId ? await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"].id, project.datasetId)) : [
        null
    ];
    const runs = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].projectId, projectId)).orderBy(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].runNumber);
    const logs = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"].projectId, projectId)).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"].createdAt));
    return {
        project,
        dataset,
        experiments: runs,
        logs: logs.reverse()
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/app/api/projects/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/sql/expressions/conditions.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/agent/graph.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/api.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const dynamic = "force-dynamic";
async function GET(_request, context) {
    const { id } = await context.params;
    const bundle = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$graph$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadProjectBundle"])(id);
    if (!bundle) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonError"])("Project not found", 404);
    return Response.json({
        project: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProject"])(bundle.project),
        dataset: bundle.dataset ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicDataset"])(bundle.dataset) : null,
        experiments: bundle.experiments.map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicExperiment"]),
        logs: bundle.logs.map((log)=>({
                ...log,
                createdAt: log.createdAt.toISOString()
            }))
    });
}
async function PATCH(request, context) {
    const { id } = await context.params;
    const body = await request.json();
    const [existing] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"].id, id));
    if (!existing) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonError"])("Project not found", 404);
    if (existing.status === "running") return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonError"])("Pause or wait for the run to finish before editing");
    const [row] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].update(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"]).set({
        name: body.name?.trim() || existing.name,
        goal: body.goal?.trim() || existing.goal,
        datasetId: body.datasetId ?? existing.datasetId,
        maxExperiments: body.maxExperiments ?? existing.maxExperiments,
        minExperiments: body.minExperiments ?? existing.minExperiments,
        updatedAt: new Date()
    }).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"].id, id)).returning();
    return Response.json({
        project: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicProject"])(row)
    });
}
async function DELETE(_request, context) {
    const { id } = await context.params;
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["agentLogs"].projectId, id));
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["experiments"].projectId, id));
    await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"]).where((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$conditions$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["eq"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["projects"].id, id));
    return Response.json({
        ok: true
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__06jll1n._.js.map
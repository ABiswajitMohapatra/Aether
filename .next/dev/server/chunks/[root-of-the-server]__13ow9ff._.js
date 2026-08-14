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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/datasets.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "builtinDatasets",
    ()=>builtinDatasets,
    "describeBuiltin",
    ()=>describeBuiltin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/math.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/preprocess.ts [app-route] (ecmascript)");
;
;
function californiaHousing() {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(20260322);
    const n = 1600;
    const X = [];
    const y = [];
    for(let i = 0; i < n; i += 1){
        const medInc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(Math.exp(1.15 + 0.45 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng)), 0.5, 15);
        const houseAge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(15 + 14 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 1, 52);
        const aveRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(5.4 + 1.1 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 2.2, 12);
        const aveBedrms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(1.05 + 0.18 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 0.6, 3.2);
        const population = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(Math.exp(6.8 + 0.7 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng)), 80, 9000);
        const aveOccup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(2.9 + 0.7 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 1.1, 8);
        const latitude = 32.6 + rng() * 9.2;
        const longitude = -124.2 + rng() * 10.1;
        const sf = Math.exp(-((latitude - 37.8) ** 2) / 1.4 - (longitude + 122.3) ** 2 / 1.6);
        const la = Math.exp(-((latitude - 34.05) ** 2) / 1.6 - (longitude + 118.25) ** 2 / 1.8);
        const coastal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(0.15 + 1.7 * sf + 1.4 * la + 0.08 * (-118 - longitude) / 6, 0, 2.4);
        const value = 0.72 * medInc + 0.18 * aveRooms + 0.08 * (houseAge / 20) * coastal - 0.22 * aveOccup - 0.05 * aveBedrms + 1.15 * coastal + 0.00001 * Math.min(population, 4000) + 0.28 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng);
        X.push([
            medInc,
            houseAge,
            aveRooms,
            aveBedrms,
            population,
            aveOccup,
            latitude,
            longitude
        ]);
        y.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(value, 0.15, 5));
    }
    return {
        X,
        y,
        featureNames: [
            "MedInc",
            "HouseAge",
            "AveRooms",
            "AveBedrms",
            "Population",
            "AveOccup",
            "Latitude",
            "Longitude"
        ],
        targetName: "MedHouseVal"
    };
}
function diabetesProgression() {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(91);
    const n = 900;
    const X = [];
    const y = [];
    for(let i = 0; i < n; i += 1){
        const age = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(48 + 12 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 20, 80);
        const sex = rng() > 0.5 ? 1 : 0;
        const bmi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(26 + 5 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 16, 48);
        const bp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(90 + 14 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 60, 140);
        const s1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(180 + 30 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 80, 300);
        const s2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(120 + 25 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 40, 240);
        const s3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(50 + 12 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 15, 110);
        const s4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(4.5 + 1.3 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 1, 10);
        const s5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(4.6 + 0.5 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 3, 6.5);
        const s6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(91 + 11 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 50, 140);
        const target = 1.8 * (bmi - 25) + 0.7 * (bp - 90) + 8 * (s5 - 4.5) - 0.35 * s3 + 4 * sex + 0.08 * age + 6 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng) + 140;
        X.push([
            age,
            sex,
            bmi,
            bp,
            s1,
            s2,
            s3,
            s4,
            s5,
            s6
        ]);
        y.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(target, 40, 320));
    }
    return {
        X,
        y,
        featureNames: [
            "age",
            "sex",
            "bmi",
            "bp",
            "s1",
            "s2",
            "s3",
            "s4",
            "s5",
            "s6"
        ],
        targetName: "progression"
    };
}
function wineQuality() {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(17);
    const n = 1200;
    const X = [];
    const y = [];
    for(let i = 0; i < n; i += 1){
        const fa = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(8.3 + 1.7 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 4.5, 15);
        const va = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(0.53 + 0.18 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 0.12, 1.4);
        const ca = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(0.27 + 0.18 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 0, 1);
        const sugar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(2.5 + 1.4 * Math.abs((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng)), 0.8, 14);
        const chlorides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(0.087 + 0.04 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 0.02, 0.4);
        const fso2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(16 + 10 * Math.abs((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng)), 2, 70);
        const tso2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(46 + 28 * Math.abs((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng)), 8, 220);
        const density = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(0.9967 + 0.002 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 0.99, 1.004);
        const ph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(3.31 + 0.15 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 2.8, 4);
        const sulphates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(0.66 + 0.17 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 0.3, 1.8);
        const alcohol = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(10.4 + 1.1 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 8.2, 14.5);
        const quality = 3.1 + 0.32 * alcohol - 1.7 * va + 0.9 * sulphates + 0.15 * ca - 1.8 * chlorides - 8 * (density - 0.996) + 0.18 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng);
        X.push([
            fa,
            va,
            ca,
            sugar,
            chlorides,
            fso2,
            tso2,
            density,
            ph,
            sulphates,
            alcohol
        ]);
        y.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(quality, 3, 8));
    }
    return {
        X,
        y,
        featureNames: [
            "fixed_acidity",
            "volatile_acidity",
            "citric_acid",
            "residual_sugar",
            "chlorides",
            "free_sulfur_dioxide",
            "total_sulfur_dioxide",
            "density",
            "pH",
            "sulphates",
            "alcohol"
        ],
        targetName: "quality"
    };
}
function irisFlowers() {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(3);
    const centers = [
        [
            5.0,
            3.4,
            1.5,
            0.2
        ],
        [
            5.9,
            2.8,
            4.3,
            1.3
        ],
        [
            6.6,
            3.0,
            5.5,
            2.0
        ]
    ];
    const X = [];
    const y = [];
    for(let c = 0; c < 3; c += 1){
        for(let i = 0; i < 120; i += 1){
            X.push(centers[c].map((value, j)=>value + (j < 2 ? 0.28 : 0.22) * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng)));
            y.push(c);
        }
    }
    return {
        X,
        y,
        featureNames: [
            "sepal_length",
            "sepal_width",
            "petal_length",
            "petal_width"
        ],
        targetName: "species",
        classNames: [
            "setosa",
            "versicolor",
            "virginica"
        ]
    };
}
function incomeClass() {
    const rng = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mulberry32"])(44);
    const n = 1400;
    const X = [];
    const y = [];
    for(let i = 0; i < n; i += 1){
        const age = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(38 + 12 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 18, 75);
        const education = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(10 + 3.2 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 4, 16);
        const hours = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(40 + 9 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 10, 80);
        const capital = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(Math.exp(2.2 + 1.8 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng)) - 8, 0, 20000);
        const experience = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clip"])(age - education - 6 + 2 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng), 0, 50);
        const score = 0.08 * (age - 30) + 0.55 * (education - 10) + 0.04 * (hours - 40) + 0.00012 * capital + 0.05 * experience + 0.7 * (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$math$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["normalSample"])(rng);
        X.push([
            age,
            education,
            hours,
            capital,
            experience
        ]);
        y.push(score > 0.6 ? 1 : 0);
    }
    return {
        X,
        y,
        featureNames: [
            "age",
            "education_years",
            "hours_per_week",
            "capital_gain",
            "experience"
        ],
        targetName: "high_income",
        classNames: [
            "<=50K",
            ">50K"
        ]
    };
}
function builtinDatasets() {
    const defs = [
        {
            slug: "california-housing",
            name: "California Housing",
            taskType: "regression",
            targetColumn: "MedHouseVal",
            description: "District-level California housing data. Predict median house value from income, occupancy, and geography.",
            build: californiaHousing
        },
        {
            slug: "diabetes",
            name: "Diabetes Progression",
            taskType: "regression",
            targetColumn: "progression",
            description: "Clinical measurements used to predict a quantitative disease progression score.",
            build: diabetesProgression
        },
        {
            slug: "wine-quality",
            name: "Wine Quality",
            taskType: "regression",
            targetColumn: "quality",
            description: "Physicochemical wine tests used to estimate expert quality scores.",
            build: wineQuality
        },
        {
            slug: "iris",
            name: "Iris Flowers",
            taskType: "classification",
            targetColumn: "species",
            description: "Classic 3-class flower dataset for quick classification experiments.",
            build: irisFlowers
        },
        {
            slug: "income",
            name: "Income Bracket",
            taskType: "classification",
            targetColumn: "high_income",
            description: "Tabular census-style features for predicting whether income exceeds $50K.",
            build: incomeClass
        }
    ];
    return defs.map((def)=>({
            slug: def.slug,
            name: def.name,
            taskType: def.taskType,
            targetColumn: def.targetColumn,
            description: def.description,
            payload: def.build()
        }));
}
function describeBuiltin(dataset) {
    return {
        ...dataset,
        stats: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeDatasetStats"])(dataset.payload, dataset.taskType),
        featureColumns: dataset.payload.featureNames,
        rowCount: dataset.payload.X.length
    };
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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/seed.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "ensureSeeded",
    ()=>ensureSeeded
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/id.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$datasets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/datasets.ts [app-route] (ecmascript)");
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
let seeded = false;
// Jab do API routes ek saath seeding shuru karte hain, dono ko ek hi promise
// par wait karana hai — warna dono same slug insert karke duplicate key error dete hain.
let seeding = null;
async function runSeed() {
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select({
        slug: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"].slug
    }).from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"]);
    const have = new Set(existing.map((row)=>row.slug));
    const builtins = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$datasets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["builtinDatasets"])();
    for (const dataset of builtins){
        if (have.has(dataset.slug)) continue;
        const described = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$datasets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["describeBuiltin"])(dataset);
        const inserted = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"]).values({
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createId"])("ds"),
            name: described.name,
            slug: described.slug,
            source: "builtin",
            taskType: described.taskType,
            targetColumn: described.targetColumn,
            featureColumns: described.featureColumns,
            rowCount: described.rowCount,
            description: described.description,
            stats: described.stats,
            payload: described.payload
        })// Agar koi doosra request pehle hi ye slug daal chuka hai to chup-chaap skip karo.
        .onConflictDoNothing({
            target: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"].slug
        }).returning({
            slug: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"].slug
        });
        if (inserted.length > 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info("seed", `Inserted builtin dataset ${dataset.slug}`);
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$logger$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["logger"].info("seed", `Builtin dataset ${dataset.slug} already present, skipped`);
        }
    }
    seeded = true;
}
async function ensureSeeded() {
    if (seeded) return;
    if (!seeding) {
        seeding = runSeed().finally(()=>{
            seeding = null;
        });
    }
    await seeding;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/app/api/datasets/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/node_modules/drizzle-orm/sql/expressions/select.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/index.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/db/schema.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/id.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/preprocess.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/seed.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const dynamic = "force-dynamic";
/**
 * Upload row cap.
 *
 * Override with MAX_UPLOAD_ROWS in .env (e.g. MAX_UPLOAD_ROWS=50000).
 * The cap exists because every experiment trains on the full dataset and the
 * k-fold cross-validation re-trains it once per fold, all inside the request
 * process. Distance-based models such as k-NN are the practical limit: their
 * cost grows with the square of the row count, so a run that takes ~2s at
 * 2,000 rows takes ~60s at 10,000.
 */ const MAX_UPLOAD_ROWS = (()=>{
    const raw = Number(process.env.MAX_UPLOAD_ROWS);
    return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 25000;
})();
async function GET() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureSeeded"])();
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].select().from(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"]).orderBy((0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$node_modules$2f$drizzle$2d$orm$2f$sql$2f$expressions$2f$select$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["desc"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"].createdAt));
    return Response.json({
        datasets: rows.map(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicDataset"])
    });
}
async function POST(request) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$seed$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ensureSeeded"])();
    const form = await request.formData();
    const file = form.get("file");
    const targetColumn = String(form.get("targetColumn") ?? "");
    const name = String(form.get("name") ?? "").trim();
    if (!(file instanceof File)) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonError"])("Upload a CSV file");
    if (!targetColumn) return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonError"])("Choose a target column");
    const text = await file.text();
    const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseCsv"])(text);
    if (parsed.rows.length > MAX_UPLOAD_ROWS) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonError"])(`Please keep uploaded CSVs to ${MAX_UPLOAD_ROWS.toLocaleString("en-US")} rows or fewer (this file has ${parsed.rows.length.toLocaleString("en-US")}).`);
    }
    const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["csvToPayload"])(parsed.headers, parsed.rows, targetColumn);
    const taskType = payload.classNames ? "classification" : "regression";
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$preprocess$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computeDatasetStats"])(payload, taskType);
    const [row] = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insert(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$db$2f$schema$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["datasets"]).values({
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$id$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createId"])("ds"),
        name: name || file.name.replace(/\.csv$/i, ""),
        slug: `upload-${Date.now()}`,
        source: "upload",
        taskType,
        targetColumn,
        featureColumns: payload.featureNames,
        rowCount: payload.X.length,
        description: `Uploaded CSV with ${payload.X.length} rows.`,
        stats,
        payload
    }).returning();
    return Response.json({
        dataset: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicDataset"])(row)
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__13ow9ff._.js.map
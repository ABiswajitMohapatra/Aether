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
"[project]/Downloads/agentic-ml-experiment-orchestrator/src/app/api/meta/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/agent/llm.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/agentic-ml-experiment-orchestrator/src/lib/ml/registry.ts [app-route] (ecmascript)");
;
;
const dynamic = "force-dynamic";
async function GET() {
    return Response.json({
        llm: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$agent$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["describeLLM"])(),
        models: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$agentic$2d$ml$2d$experiment$2d$orchestrator$2f$src$2f$lib$2f$ml$2f$registry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODEL_REGISTRY"].map((model)=>({
                name: model.name,
                label: model.label,
                family: model.family,
                tasks: model.tasks,
                description: model.description
            }))
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ouxn0y._.js.map
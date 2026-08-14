import { logger } from "@/lib/logger";

export interface LLMCompleteOptions {
  json?: boolean;
  temperature?: number;
}

export interface LLMProvider {
  id: string;
  label: string;
  isGenerative: boolean;
  complete(system: string, user: string, options?: LLMCompleteOptions): Promise<string>;
}

function env(name: string) {
  const value = process.env[name];
  return value && value.trim().length > 0 ? value.trim() : null;
}

class OpenAICompatibleProvider implements LLMProvider {
  id = "openai-compatible";
  label: string;
  isGenerative = true;
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
    private readonly model: string,
    label: string,
  ) {
    this.label = label;
  }

  async complete(system: string, user: string, options?: LLMCompleteOptions) {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        temperature: options?.temperature ?? 0.2,
        response_format: options?.json ? { type: "json_object" } : undefined,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`OpenAI-compatible LLM failed: ${response.status} ${text}`);
    }
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error("LLM returned an empty completion");
    return content;
  }
}

class AnthropicProvider implements LLMProvider {
  id = "anthropic";
  label = "Anthropic";
  isGenerative = true;

  constructor(
    private readonly apiKey: string,
    private readonly model: string,
  ) {}

  async complete(system: string, user: string, options?: LLMCompleteOptions) {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1400,
        temperature: options?.temperature ?? 0.2,
        system,
        messages: [{ role: "user", content: user }],
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Anthropic LLM failed: ${response.status} ${text}`);
    }
    const data = (await response.json()) as { content?: Array<{ text?: string }> };
    const content = data.content?.map((part) => part.text ?? "").join("");
    if (!content) throw new Error("Anthropic returned an empty completion");
    return content;
  }
}

class OllamaProvider implements LLMProvider {
  id = "ollama";
  label: string;
  isGenerative = true;
  constructor(
    private readonly baseUrl: string,
    private readonly model: string,
  ) {
    this.label = `Ollama / ${model}`;
  }

  async complete(system: string, user: string, options?: LLMCompleteOptions) {
    const response = await fetch(`${this.baseUrl.replace(/\/$/, "")}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: this.model,
        stream: false,
        format: options?.json ? "json" : undefined,
        options: { temperature: options?.temperature ?? 0.2 },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Ollama failed: ${response.status} ${text}`);
    }
    const data = (await response.json()) as { message?: { content?: string } };
    if (!data.message?.content) throw new Error("Ollama returned an empty completion");
    return data.message.content;
  }
}

function envInt(name: string, fallback: number, min: number, max: number) {
  const raw = env(name);
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

let cached: LLMProvider | null = null;

/**
 * The generative provider is only ever suspended for a cooldown window, never
 * for the lifetime of the process. A single slow request used to poison every
 * later call, which silently downgraded the whole run to the policy engine.
 * FORCE_POLICY_ENGINE=1 is still a permanent, deliberate opt-out.
 */
const forcedPolicyEngine = process.env.FORCE_POLICY_ENGINE === "1";
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

/** Clears the cooldown so a recovered provider is retried immediately. */
export function resetLLMAvailability() {
  consecutiveFailures = 0;
  suspendedUntil = 0;
  cached = null;
}

export function llmAvailability() {
  return {
    forcedPolicyEngine,
    consecutiveFailures,
    suspended: generativeSuspended(),
    retryInMs: Math.max(0, suspendedUntil - Date.now()),
    timeoutMs: llmTimeoutMs(),
  };
}

export function getLLM(): LLMProvider {
  if (cached) return cached;

  const openaiKey = env("OPENAI_API_KEY");
  const openaiBase = env("OPENAI_BASE_URL");
  const openaiModel = env("OPENAI_MODEL") ?? env("LLM_MODEL") ?? "gpt-4o-mini";
  if (openaiKey) {
    cached = new OpenAICompatibleProvider(
      openaiBase ?? "https://api.openai.com/v1",
      openaiKey,
      openaiModel,
      openaiBase ? `OpenAI-compatible / ${openaiModel}` : `OpenAI / ${openaiModel}`,
    );
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

export async function completeJson<T>(
  system: string,
  user: string,
  fallback: () => T,
): Promise<{ value: T; source: "llm" | "policy" }> {
  if (generativeSuspended()) {
    return { value: fallback(), source: "policy" };
  }
  const llm = getLLM();
  const timeoutMs = llmTimeoutMs();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const raw = await Promise.race([
      llm.complete(system, user, { json: true, temperature: 0.15 }),
      new Promise<string>((_, reject) => {
        timer = setTimeout(() => reject(new Error(`LLM timeout after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    const slice = start >= 0 && end >= 0 ? raw.slice(start, end + 1) : raw;
    const value = JSON.parse(slice) as T;
    // A success fully clears the failure streak.
    consecutiveFailures = 0;
    suspendedUntil = 0;
    return { value, source: "llm" };
  } catch (error) {
    consecutiveFailures += 1;
    const maxFailures = envInt("LLM_MAX_FAILURES", 3, 1, 100);
    if (consecutiveFailures >= maxFailures) {
      suspendedUntil = Date.now() + cooldownMs();
      logger.warn(
        "llm",
        `Generative LLM failed ${consecutiveFailures}x; using the policy engine for the next ${Math.round(
          cooldownMs() / 1000,
        )}s`,
        error,
      );
    } else {
      logger.warn(
        "llm",
        `Generative LLM call failed (${consecutiveFailures}/${maxFailures}); using the policy engine for this step`,
        error,
      );
    }
    return { value: fallback(), source: "policy" };
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export function describeLLM() {
  const openaiKey = env("OPENAI_API_KEY");
  if (openaiKey) {
    return {
      id: "openai-compatible",
      label: env("OPENAI_BASE_URL") ? "OpenAI-compatible" : "OpenAI",
      model: env("OPENAI_MODEL") ?? "gpt-4o-mini",
      generative: true,
    };
  }
  if (env("ANTHROPIC_API_KEY")) {
    return {
      id: "anthropic",
      label: "Anthropic",
      model: env("ANTHROPIC_MODEL") ?? "claude-3-5-sonnet-latest",
      generative: true,
    };
  }
  return {
    id: "ollama-or-policy",
    label: "Ollama / Adaptive policy",
    model: env("OLLAMA_MODEL") ?? "qwen2.5:7b",
    generative: false,
  };
}

import type { InterpreterStep } from "../template-engine/types";

export type ProviderId = "anthropic" | "openai" | "ollama";

export interface ProviderConfig {
  id: string;
  type: ProviderId;
  baseUrl?: string;
  apiKey?: string;
  /** Extra headers (e.g. HTTP-Referer for Perplexity). */
  headers?: Record<string, string>;
}

export interface ModelConfig {
  id: string;
  providerId: string;
  /** The model's API id (e.g. "claude-haiku-4-5", "gpt-4o-mini"). */
  modelName: string;
  /** Optional default max tokens. */
  maxTokens?: number;
}

export interface InterpreterSettings {
  enabled: boolean;
  defaultModelId?: string;
  /**
   * Optional per-role model defaults — referenced by an `InterpreterStep`'s
   * `outputAs` when no explicit `modelId` is set on the step.
   */
  defaultModelByRole?: Record<string, string>;
  defaultPromptContext?: string;
  /** Per-run dollar ceiling, advisory only. */
  costCeilingUsd?: number;
  providers: ProviderConfig[];
  models: ModelConfig[];
}

export interface RunStepResult {
  outputAs: string;
  raw: string;
  parsed?: unknown;
  modelId: string;
  /** Approximate usage if the provider returns it. */
  usage?: { inputTokens?: number; outputTokens?: number };
}

export type { InterpreterStep };

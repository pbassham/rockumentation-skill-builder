import type { ModelConfig, ProviderConfig } from "../types";

export interface SendArgs {
  system?: string;
  prompt: string;
  model: ModelConfig;
  provider: ProviderConfig;
  maxTokens?: number;
  temperature?: number;
  /** When set, request structured/JSON output. */
  jsonMode?: boolean;
}

export interface SendResult {
  text: string;
  usage?: { inputTokens?: number; outputTokens?: number };
}

export type SendFn = (args: SendArgs) => Promise<SendResult>;

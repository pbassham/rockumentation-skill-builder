import { send as anthropic } from "./anthropic";
import { send as openai } from "./openai";
import { send as ollama } from "./ollama";
import type { SendFn } from "./types";

export const providers: Record<string, SendFn> = {
  anthropic,
  openai,
  ollama,
};

export type { SendFn, SendArgs, SendResult } from "./types";

import { join } from "node:path";
import { mkdir } from "node:fs/promises";
import type { InterpreterSettings, ProviderConfig, ModelConfig } from "./types";

const SETTINGS_PATH = join(process.cwd(), "config", "interpreter.json");

let cached: InterpreterSettings | null = null;

export async function getSettings(): Promise<InterpreterSettings> {
  if (cached) return cached;
  const file = Bun.file(SETTINGS_PATH);
  if (await file.exists()) {
    try {
      cached = (await file.json()) as InterpreterSettings;
      return cached;
    } catch {
      // fall through to defaults
    }
  }
  cached = seedDefaults();
  return cached;
}

export async function saveSettings(s: InterpreterSettings): Promise<void> {
  cached = s;
  await mkdir(join(process.cwd(), "config"), { recursive: true });
  await Bun.write(SETTINGS_PATH, JSON.stringify(s, null, 2));
}

export function clearCache(): void {
  cached = null;
}

function seedDefaults(): InterpreterSettings {
  const providers: ProviderConfig[] = [];
  const models: ModelConfig[] = [];

  if (process.env.ANTHROPIC_API_KEY) {
    providers.push({
      id: "anthropic",
      type: "anthropic",
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    models.push(
      {
        id: "claude-haiku-4-5",
        providerId: "anthropic",
        modelName: "claude-haiku-4-5",
        maxTokens: 1024,
      },
      {
        id: "claude-sonnet-4-5",
        providerId: "anthropic",
        modelName: "claude-sonnet-4-5",
        maxTokens: 4096,
      },
    );
  }
  if (process.env.OPENAI_API_KEY) {
    providers.push({
      id: "openai",
      type: "openai",
      apiKey: process.env.OPENAI_API_KEY,
    });
    models.push({
      id: "gpt-4o-mini",
      providerId: "openai",
      modelName: "gpt-4o-mini",
      maxTokens: 1024,
    });
  }
  if (process.env.OLLAMA_BASE_URL) {
    providers.push({
      id: "ollama",
      type: "ollama",
      baseUrl: process.env.OLLAMA_BASE_URL,
    });
  }

  const defaultModelId = models[0]?.id;

  return {
    enabled: providers.length > 0,
    defaultModelId,
    defaultModelByRole: {},
    providers,
    models,
  };
}

/** Convenience lookup. */
export function findModel(
  s: InterpreterSettings,
  modelId: string,
): { model: ModelConfig; provider: ProviderConfig } | undefined {
  const model = s.models.find((m) => m.id === modelId);
  if (!model) return undefined;
  const provider = s.providers.find((p) => p.id === model.providerId);
  if (!provider) return undefined;
  return { model, provider };
}

import type { SendFn } from "./types";

/**
 * Anthropic Messages API.
 * https://docs.anthropic.com/en/api/messages
 */
export const send: SendFn = async ({
  system,
  prompt,
  model,
  provider,
  maxTokens,
  temperature,
}) => {
  const apiKey = provider.apiKey;
  if (!apiKey) throw new Error("Anthropic provider missing apiKey");
  const url =
    (provider.baseUrl ?? "https://api.anthropic.com") + "/v1/messages";
  const body: Record<string, unknown> = {
    model: model.modelName,
    max_tokens: maxTokens ?? model.maxTokens ?? 1024,
    messages: [{ role: "user", content: prompt }],
  };
  if (system) body.system = system;
  if (temperature != null) body.temperature = temperature;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      ...(provider.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Anthropic ${res.status}: ${errBody.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    content: Array<{ type: string; text?: string }>;
    usage?: { input_tokens?: number; output_tokens?: number };
  };
  const text = (data.content || [])
    .map((c) => (c.type === "text" ? c.text || "" : ""))
    .join("")
    .trim();
  return {
    text,
    usage: data.usage
      ? {
          inputTokens: data.usage.input_tokens,
          outputTokens: data.usage.output_tokens,
        }
      : undefined,
  };
};

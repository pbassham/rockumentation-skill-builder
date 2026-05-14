import type { SendFn } from "./types";

/** OpenAI Chat Completions. */
export const send: SendFn = async ({
  system,
  prompt,
  model,
  provider,
  maxTokens,
  temperature,
  jsonMode,
}) => {
  const apiKey = provider.apiKey;
  if (!apiKey) throw new Error("OpenAI provider missing apiKey");
  const url =
    (provider.baseUrl ?? "https://api.openai.com") + "/v1/chat/completions";
  const messages: { role: string; content: string }[] = [];
  if (system) messages.push({ role: "system", content: system });
  messages.push({ role: "user", content: prompt });

  const body: Record<string, unknown> = {
    model: model.modelName,
    messages,
    max_tokens: maxTokens ?? model.maxTokens ?? 1024,
  };
  if (temperature != null) body.temperature = temperature;
  if (jsonMode) body.response_format = { type: "json_object" };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(provider.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenAI ${res.status}: ${errBody.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    choices: Array<{ message: { content: string } }>;
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };
  const text = data.choices?.[0]?.message?.content?.trim() ?? "";
  return {
    text,
    usage: data.usage
      ? {
          inputTokens: data.usage.prompt_tokens,
          outputTokens: data.usage.completion_tokens,
        }
      : undefined,
  };
};

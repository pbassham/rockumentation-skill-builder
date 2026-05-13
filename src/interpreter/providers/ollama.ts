import type { SendFn } from "./types";

/** Ollama /api/chat. */
export const send: SendFn = async ({
  system,
  prompt,
  model,
  provider,
  temperature,
  jsonMode,
}) => {
  const baseUrl = provider.baseUrl || "http://localhost:11434";
  const messages: { role: string; content: string }[] = [];
  if (system) messages.push({ role: "system", content: system });
  messages.push({ role: "user", content: prompt });

  const body: Record<string, unknown> = {
    model: model.modelName,
    messages,
    stream: false,
  };
  if (temperature != null) body.options = { temperature };
  if (jsonMode) body.format = "json";

  const res = await fetch(baseUrl + "/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(provider.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Ollama ${res.status}: ${errBody.slice(0, 300)}`);
  }
  const data = (await res.json()) as {
    message?: { content?: string };
    prompt_eval_count?: number;
    eval_count?: number;
  };
  return {
    text: (data.message?.content || "").trim(),
    usage: {
      inputTokens: data.prompt_eval_count,
      outputTokens: data.eval_count,
    },
  };
};

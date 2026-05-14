import { runStep, getSettings } from "./interpreter";
import type { InterpreterSettings } from "./interpreter";

export interface RefInfo {
  slug: string;
  title: string;
  breadcrumb: string;
  content: string;
}

const SYSTEM_PROMPT = `You generate concise descriptions for AI agent skill reference files. These descriptions help an AI agent decide which reference file to consult when a user asks a question.

Rules:
- Start with "Use when" followed by a description of the user intent or task
- Focus on what questions or tasks this reference answers, not implementation details
- Be specific about the domain and scope
- 80-150 characters ideal, never exceed 200 characters
- Do not wrap in quotes
- One sentence only, no trailing period`;

/**
 * Generate a per-reference description via the configured interpreter.
 * Backwards-compatible signature: callers can still pass an Anthropic API
 * key directly and we will inject a one-shot Anthropic settings override.
 */
export async function generateDescription(
  ref: RefInfo,
  context: { skillName: string; pageTitle: string },
  apiKey?: string,
): Promise<string> {
  const settings = await resolveSettings(apiKey);
  const userPrompt = `Skill: "${context.skillName}" — ${context.pageTitle}
Reference: "${ref.title}"
Path: ${ref.breadcrumb}

Content (first 3000 chars):
${ref.content.slice(0, 3000)}

Write a concise description for when an AI agent should consult this reference.`;

  const result = await runStep(
    {
      id: "describe",
      systemContext: SYSTEM_PROMPT,
      prompt: userPrompt,
      outputAs: "describe",
      outputFormat: "text",
      maxTokens: 256,
    },
    {},
    "",
    settings,
  );

  let text = result.raw.trim();
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1);
  }
  return text;
}

async function resolveSettings(apiKey?: string): Promise<InterpreterSettings> {
  if (apiKey) {
    return {
      enabled: true,
      defaultModelId: "claude-haiku-4-5",
      providers: [{ id: "anthropic", type: "anthropic", apiKey }],
      models: [
        {
          id: "claude-haiku-4-5",
          providerId: "anthropic",
          modelName: "claude-haiku-4-5",
          maxTokens: 256,
        },
      ],
    };
  }
  return getSettings();
}

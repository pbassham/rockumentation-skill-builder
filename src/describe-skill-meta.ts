/**
 * AI helper that drafts a SKILL.md `description` and a short `preText`
 * intro from a list of source URLs (plus optional labels/notes the user
 * has already filled in).
 *
 * Used by the bundle detail panel's "Generate with AI" button so users
 * don't have to write SKILL.md frontmatter copy by hand before building.
 *
 * Mirrors describe.ts: routes through the configured interpreter so the
 * same provider/model resolution applies, and accepts an optional one-
 * shot Anthropic API key for browser-supplied keys.
 */
import { runStep, getSettings } from "./interpreter";
import type { InterpreterSettings } from "./interpreter";

export interface SkillMetaSource {
  url: string;
  label?: string;
  note?: string;
}

export interface GeneratedSkillMeta {
  description: string;
  preText: string;
}

const SYSTEM_PROMPT = `You write SKILL.md frontmatter for AI Agent Skills.

Given a kebab-case skill name and a list of documentation source URLs (with
optional labels/notes), produce JSON with two fields:

- description: the SKILL.md frontmatter "Use when…" line. Keyword-rich,
  mentions trigger phrases, ideally 200-400 chars, never exceeds 1024
  chars. The agent reads this to decide whether to load the skill at
  all, so it must be specific about the domain.
- preText: 1-3 short markdown paragraphs (or a short bulleted list) that
  give a human-friendly overview of what this skill covers. Appears in
  SKILL.md just above the Topics list. Keep it under 600 chars total.
  Plain markdown only — no headings (those would clash with ## Topics).

Output ONLY a single JSON object: {"description": "...", "preText": "..."}.
No prose, no code fence, no commentary.`;

export async function generateSkillMeta(
  skillName: string,
  sources: SkillMetaSource[],
  apiKey?: string,
): Promise<GeneratedSkillMeta> {
  const settings = await resolveSettings(apiKey);
  const sourceLines = sources
    .map((s, i) => {
      const parts = [`${i + 1}. ${s.url}`];
      if (s.label) parts.push(`   label: ${s.label}`);
      if (s.note) parts.push(`   note: ${s.note}`);
      return parts.join("\n");
    })
    .join("\n");

  const userPrompt = `Skill name: ${skillName}

Sources:
${sourceLines}

Write the description and preText now.`;

  const result = await runStep(
    {
      id: "describe-skill-meta",
      systemContext: SYSTEM_PROMPT,
      prompt: userPrompt,
      outputAs: "skill-meta",
      outputFormat: "text",
      maxTokens: 1024,
    },
    {},
    "",
    settings,
  );

  return parseMetaJson(result.raw);
}

function parseMetaJson(raw: string): GeneratedSkillMeta {
  let text = raw.trim();
  // Strip ```json ... ``` fences if the model added them anyway.
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  }
  // Some models wrap JSON in extra text; try to extract the first {...}.
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start >= 0 && end > start) text = text.slice(start, end + 1);
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (err: any) {
    throw new Error(
      `AI did not return valid JSON for skill meta: ${err.message}`,
    );
  }
  const o = parsed as Record<string, unknown>;
  const description =
    typeof o.description === "string" ? o.description.trim() : "";
  const preText = typeof o.preText === "string" ? o.preText.trim() : "";
  if (!description) {
    throw new Error("AI returned empty description.");
  }
  return { description, preText };
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
          maxTokens: 1024,
        },
      ],
    };
  }
  return getSettings();
}

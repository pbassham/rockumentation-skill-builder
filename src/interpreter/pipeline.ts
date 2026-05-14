import { compile, evaluate } from "../template-engine";
import type { Template, Variables } from "../template-engine/types";
import { runStep } from "./runner";
import { getSettings } from "./settings";
import type { InterpreterSettings } from "./types";

export interface PipelineResult {
  stepOutputs: Record<string, string>;
  promptResolutions: Record<string, string>;
  usage: { inputTokens: number; outputTokens: number };
}

/**
 * Execute a template's `interpreterPipeline` (if any) and the trailing
 * auto-step that batches `{{prompt:"…"}}` placeholders à la
 * obsidian-clipper.
 */
export async function runPipeline(
  template: Template,
  variables: Variables,
  url: string,
  settings?: InterpreterSettings,
): Promise<PipelineResult> {
  const stepOutputs: Record<string, string> = {};
  const promptResolutions: Record<string, string> = {};
  const usage = { inputTokens: 0, outputTokens: 0 };
  const s = settings ?? (await getSettings());

  const enabledSteps = (template.interpreterPipeline ?? []).filter(
    (st) => st.enabled !== false,
  );

  if (
    !s.enabled ||
    (!enabledSteps.length && !hasPromptPlaceholders(template))
  ) {
    return { stepOutputs, promptResolutions, usage };
  }

  // 1. Run explicit pipeline steps in order.
  for (const step of enabledSteps) {
    const result = await runStep(step, variables, url, s, stepOutputs);
    stepOutputs[step.outputAs] = result.raw;
    if (result.usage) {
      usage.inputTokens += result.usage.inputTokens ?? 0;
      usage.outputTokens += result.usage.outputTokens ?? 0;
    }
  }

  // 2. Collect all `{{prompt:"…"}}` placeholders from the template body
  //    and properties, batch them into a single trailing call (the
  //    clipper-compatible `prompts_responses` JSON contract).
  const collected = collectPrompts(template);
  if (collected.length > 0) {
    const promptList = collected
      .map((p, i) => `Prompt ${i + 1}: ${p.text}`)
      .join("\n");
    const system = `You are an assistant that responds with a JSON object of the shape {"prompts_responses":[{"prompt":"…","response":"…"}]}. Each entry corresponds positionally to the listed prompts. Respond ONLY with valid JSON.`;
    const userPrompt = `Use the page context below to answer the prompts.\n\nContext:\n${truncate(String(variables.contentMarkdown || variables.content || ""), 12000)}\n\n${promptList}`;
    const stepResult = await runStep(
      {
        id: "__auto_prompts__",
        prompt: userPrompt,
        systemContext: system,
        outputAs: "__prompts_responses__",
        outputFormat: "json",
      },
      variables,
      url,
      s,
      stepOutputs,
    );
    if (stepResult.usage) {
      usage.inputTokens += stepResult.usage.inputTokens ?? 0;
      usage.outputTokens += stepResult.usage.outputTokens ?? 0;
    }
    const parsed = stepResult.parsed as
      | { prompts_responses?: Array<{ prompt?: string; response?: string }> }
      | undefined;
    const responses = parsed?.prompts_responses ?? [];
    collected.forEach((p, i) => {
      promptResolutions[p.placeholder] = String(responses[i]?.response ?? "");
    });
  }

  return { stepOutputs, promptResolutions, usage };
}

function hasPromptPlaceholders(t: Template): boolean {
  if (compile(t.noteContentFormat).prompts.length > 0) return true;
  if (compile(t.noteNameFormat || "").prompts.length > 0) return true;
  for (const p of t.properties ?? []) {
    if (compile(p.value).prompts.length > 0) return true;
  }
  return false;
}

function collectPrompts(
  t: Template,
): Array<{ text: string; placeholder: string }> {
  const sources: string[] = [t.noteContentFormat, t.noteNameFormat || ""];
  for (const p of t.properties ?? []) sources.push(p.value);
  const seen = new Set<string>();
  const out: Array<{ text: string; placeholder: string }> = [];
  for (const src of sources) {
    for (const p of compile(src).prompts) {
      const key = p.placeholder;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(p);
    }
  }
  return out;
}

function truncate(s: string, n: number): string {
  return s.length <= n ? s : s.slice(0, n) + "…";
}

// keep `evaluate` import used downstream
void evaluate;

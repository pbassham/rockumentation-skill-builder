import { compile, evaluate } from "../template-engine";
import type { Variables } from "../template-engine/types";
import { findModel } from "./settings";
import { providers } from "./providers";
import type {
  InterpreterSettings,
  InterpreterStep,
  RunStepResult,
} from "./types";

/**
 * Run a single interpreter step against the current variable map.
 * - Renders `systemContext` and `prompt` through the template engine.
 * - Picks a model: `step.modelId` → `defaultModelByRole[outputAs]` → `defaultModelId`.
 * - Sends to the provider; parses the response per `outputFormat`.
 */
export async function runStep(
  step: InterpreterStep,
  variables: Variables,
  url: string,
  settings: InterpreterSettings,
  stepOutputs: Record<string, string> = {},
): Promise<RunStepResult> {
  if (!settings.enabled) {
    throw new Error("Interpreter is disabled in settings.");
  }
  const modelId =
    step.modelId ||
    settings.defaultModelByRole?.[step.outputAs] ||
    settings.defaultModelId;
  if (!modelId) throw new Error("No model selected for interpreter step.");

  const found = findModel(settings, modelId);
  if (!found) throw new Error(`Model "${modelId}" not configured.`);
  const { model, provider } = found;
  const send = providers[provider.type];
  if (!send) throw new Error(`No provider implementation for ${provider.type}`);

  const sysCompiled = step.systemContext ? compile(step.systemContext) : null;
  const userCompiled = compile(step.prompt);
  const renderedSystem = sysCompiled
    ? await evaluate(sysCompiled, { variables, url, stepOutputs })
    : undefined;
  const renderedPrompt = await evaluate(userCompiled, {
    variables,
    url,
    stepOutputs,
  });

  const jsonMode = step.outputFormat === "json" || !!step.schema;

  const result = await send({
    system: renderedSystem,
    prompt: renderedPrompt,
    model,
    provider,
    maxTokens: step.maxTokens,
    temperature: step.temperature,
    jsonMode,
  });

  let parsed: unknown | undefined;
  if (step.outputFormat === "json") {
    parsed = safeParseJson(result.text);
  }

  return {
    outputAs: step.outputAs,
    raw: result.text,
    parsed,
    modelId,
    usage: result.usage,
  };
}

function safeParseJson(raw: string): unknown {
  // Trim code fences if model wrapped JSON.
  let s = raw.trim();
  if (s.startsWith("```")) {
    s = s.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  }
  try {
    return JSON.parse(s);
  } catch {
    return undefined;
  }
}

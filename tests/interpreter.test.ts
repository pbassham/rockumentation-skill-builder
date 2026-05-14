import { test, expect } from "bun:test";
import { runStep } from "../src/interpreter/runner";
import { providers } from "../src/interpreter/providers";
import type {
  InterpreterStep,
  InterpreterSettings,
} from "../src/interpreter/types";

// Inject a deterministic fake provider so we can test runStep without network.
providers.fake = async ({ system, prompt }) => {
  return {
    text: JSON.stringify({ system: system ?? null, prompt }),
    usage: { inputTokens: 10, outputTokens: 20 },
  };
};

const settings: InterpreterSettings = {
  enabled: true,
  defaultModelId: "fake-model",
  providers: [{ id: "fake-prov", type: "fake" as any }],
  models: [{ id: "fake-model", providerId: "fake-prov", modelName: "fake-1" }],
};

test("runStep renders prompt + system through template engine", async () => {
  const step: InterpreterStep = {
    id: "describe",
    outputAs: "describe",
    outputFormat: "text",
    systemContext: "You describe {{ topic }}.",
    prompt: "Title: {{ title }}",
  };
  const result = await runStep(
    step,
    { topic: "Rock", title: "API Patterns" },
    "https://example.com",
    settings,
  );
  expect(result.modelId).toBe("fake-model");
  const echoed = JSON.parse(result.raw) as { system: string; prompt: string };
  expect(echoed.system).toBe("You describe Rock.");
  expect(echoed.prompt).toBe("Title: API Patterns");
});

test("runStep parses JSON when outputFormat is json", async () => {
  const step: InterpreterStep = {
    id: "extract",
    outputAs: "extract",
    outputFormat: "json",
    prompt: "irrelevant",
  };
  const result = await runStep(step, {}, "https://example.com", settings);
  expect(result.parsed).toBeDefined();
  const parsed = result.parsed as { system: unknown; prompt: string };
  expect(parsed.prompt).toBe("irrelevant");
});

test("runStep can reference prior step outputs", async () => {
  const step: InterpreterStep = {
    id: "refine",
    outputAs: "refine",
    outputFormat: "text",
    prompt: "Previous: {{ step:describe }}",
  };
  const result = await runStep(step, {}, "https://example.com", settings, {
    describe: "ROCKSTAR",
  });
  const echoed = JSON.parse(result.raw) as { prompt: string };
  expect(echoed.prompt).toBe("Previous: ROCKSTAR");
});

test("runStep throws when interpreter is disabled", async () => {
  const step: InterpreterStep = {
    id: "x",
    outputAs: "x",
    outputFormat: "text",
    prompt: "p",
  };
  await expect(
    runStep(step, {}, "https://example.com", { ...settings, enabled: false }),
  ).rejects.toThrow(/disabled/i);
});

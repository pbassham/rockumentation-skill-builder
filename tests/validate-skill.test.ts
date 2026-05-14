import { test, expect } from "bun:test";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { validateSkill } from "../src/validate-skill";

async function makeSkill(
  name: string,
  files: Record<string, string>,
): Promise<string> {
  const dir = join(tmpdir(), `validate-skill-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, name);
  await mkdir(join(dir, "references"), { recursive: true });
  for (const [rel, content] of Object.entries(files)) {
    const full = join(dir, rel);
    await mkdir(join(full, ".."), { recursive: true });
    await Bun.write(full, content);
  }
  return dir;
}

const GOOD_SKILL_MD = `---
name: good-skill
description: A keyword-rich description of what this skill covers and when to load it for testing purposes.
---

# Good Skill

This is a brief overview that explains what the skill does in enough detail to satisfy the body length heuristic. It includes information about when an agent should load it, what topics it covers, and how to use the references below to get more detail on specific subjects.

## Topics

- [Alpha](references/alpha.md) — first topic
- [Beta](references/beta.md) — second topic
`;

const GOOD_REF = `# Alpha\n\n${"This reference contains enough body text to pass the minimum content threshold for the validator. ".repeat(5)}`;

test("validateSkill passes for a well-formed skill", async () => {
  const dir = await makeSkill("good-skill", {
    "SKILL.md": GOOD_SKILL_MD,
    "references/alpha.md": GOOD_REF,
    "references/beta.md": GOOD_REF,
  });
  const result = await validateSkill(dir);
  expect(result.ok).toBe(true);
  expect(result.problems.filter((p) => p.severity === "error").length).toBe(0);
  await rm(dir, { recursive: true, force: true });
});

test("validateSkill fails when name does not match folder", async () => {
  const dir = await makeSkill("good-skill", {
    "SKILL.md": GOOD_SKILL_MD.replace("name: good-skill", "name: wrong-name"),
    "references/alpha.md": GOOD_REF,
    "references/beta.md": GOOD_REF,
  });
  const result = await validateSkill(dir);
  expect(result.ok).toBe(false);
  expect(
    result.problems.some((p) => /(does not |must )match/.test(p.message)),
  ).toBe(true);
  await rm(dir, { recursive: true, force: true });
});

test("validateSkill warns when references are mostly empty", async () => {
  const dir = await makeSkill("good-skill", {
    "SKILL.md": GOOD_SKILL_MD,
    "references/alpha.md": "# Alpha\n",
    "references/beta.md": "# Beta\n",
  });
  const result = await validateSkill(dir);
  expect(
    result.problems.some((p) => /reference files/.test(p.message)),
  ).toBe(true);
  await rm(dir, { recursive: true, force: true });
});

test("validateSkill flags missing description", async () => {
  const dir = await makeSkill("good-skill", {
    "SKILL.md": `---\nname: good-skill\n---\n\n# Good\n\n${"body ".repeat(120)}\n\n## Topics\n\n- [A](references/a.md)\n`,
    "references/a.md": GOOD_REF,
  });
  const result = await validateSkill(dir);
  expect(
    result.problems.some(
      (p) => p.severity === "error" && /description/.test(p.message),
    ),
  ).toBe(true);
  await rm(dir, { recursive: true, force: true });
});

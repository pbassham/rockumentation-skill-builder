/**
 * Skill validator.
 *
 * The canonical validation rules live in the upstream Python library
 * `skills-ref` (https://pypi.org/project/skills-ref/) — that's the
 * reference implementation maintained alongside the Agent Skills spec
 * itself. We shell out to its `skills-ref validate` CLI so we always
 * pick up the latest spec changes without re-porting rules by hand.
 *
 * On top of that we layer "skill is too thin" heuristics that the spec
 * doesn't cover (short SKILL.md body, missing/empty `## Topics` list,
 * reference files that came back empty). Those checks live here
 * because they're specific to how *this* generator produces skills.
 *
 * If the `skills-ref` binary is not on PATH and `uvx` isn't available
 * either, we fall back to a small TypeScript port of the spec rules so
 * the build never silently skips validation. The fallback is best-
 * effort and should only kick in during local development; production
 * (Dockerfile) installs `skills-ref` explicitly.
 */
import { readdir } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import { parseFrontmatter } from "./frontmatter";

export type ValidationSeverity = "error" | "warning";

export interface ValidationProblem {
  severity: ValidationSeverity;
  message: string;
  /** "skills-ref" for upstream spec rules, "local" for our heuristics. */
  source: "skills-ref" | "local";
}

export interface SkillValidationResult {
  ok: boolean;
  problems: ValidationProblem[];
  /** Which validator backend produced the spec-rule problems. */
  backend: "skills-ref" | "uvx" | "fallback";
}

/** Heuristic minimums for "is this skill actually useful?" checks. */
const MIN_SKILL_BODY_CHARS = 400;
const MIN_TOPIC_COUNT = 1;
const MIN_REFERENCE_BODY_CHARS = 200;
const MAX_THIN_REFERENCE_RATIO = 0.5;

export async function validateSkill(
  skillDir: string,
): Promise<SkillValidationResult> {
  const absDir = resolve(skillDir);
  const problems: ValidationProblem[] = [];

  // 1. Spec rules — defer to upstream `skills-ref` so we stay in sync
  //    with the published Agent Skills spec.
  const { problems: specProblems, backend } = await runSkillsRef(absDir);
  problems.push(...specProblems);

  // 2. Local heuristics — always run, regardless of which backend
  //    handled the spec rules. These flag thin / empty skills the
  //    upstream validator doesn't care about.
  await runLocalHeuristics(absDir, problems);

  const ok = !problems.some((p) => p.severity === "error");
  return { ok, problems, backend };
}

interface SkillsRefRun {
  problems: ValidationProblem[];
  backend: "skills-ref" | "uvx" | "fallback";
}

/**
 * Run the upstream Python validator. Tries `skills-ref` on PATH first,
 * then `uvx skills-ref` (which fetches the package on demand), then
 * falls back to the in-process TS port.
 */
async function runSkillsRef(skillDir: string): Promise<SkillsRefRun> {
  // The PyPI package is `skills-ref` but it installs an executable
  // named `agentskills` (see cli.py in the upstream repo). Try the
  // installed binary first, then fall back to running it through uvx
  // (which fetches the package on demand without polluting the host
  // Python environment).
  const candidates: { backend: SkillsRefRun["backend"]; cmd: string[] }[] = [
    { backend: "skills-ref", cmd: ["agentskills", "validate", skillDir] },
    {
      backend: "uvx",
      cmd: ["uvx", "--from", "skills-ref", "agentskills", "validate", skillDir],
    },
  ];
  for (const { backend, cmd } of candidates) {
    const result = await trySpawn(cmd);
    if (result === null) continue; // binary not found — try next.
    return { backend, problems: parseSkillsRefOutput(result) };
  }
  // Last resort: TS port.
  return { backend: "fallback", problems: await fallbackSpecRules(skillDir) };
}

async function trySpawn(
  cmd: string[],
): Promise<{ exitCode: number; stdout: string; stderr: string } | null> {
  try {
    const proc = Bun.spawn(cmd, {
      stdout: "pipe",
      stderr: "pipe",
    });
    const [stdout, stderr] = await Promise.all([
      new Response(proc.stdout).text(),
      new Response(proc.stderr).text(),
    ]);
    const exitCode = await proc.exited;
    return { exitCode, stdout, stderr };
  } catch {
    // ENOENT or any spawn failure → not available.
    return null;
  }
}

/**
 * Parse `skills-ref validate` output. Exit 0 means valid; exit 1 means
 * problems, formatted as:
 *   Validation failed for <path>:
 *     - <error message>
 *     - <error message>
 */
function parseSkillsRefOutput(run: {
  exitCode: number;
  stdout: string;
  stderr: string;
}): ValidationProblem[] {
  if (run.exitCode === 0) return [];
  const problems: ValidationProblem[] = [];
  const text = `${run.stderr}\n${run.stdout}`;
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*-\s+(.+)$/);
    if (m) {
      problems.push({
        severity: "error",
        message: m[1].trim(),
        source: "skills-ref",
      });
    }
  }
  if (problems.length === 0) {
    // Non-zero exit but no parsed messages — surface raw stderr so
    // failures aren't silent.
    problems.push({
      severity: "error",
      message: `skills-ref exited with code ${run.exitCode}: ${(run.stderr || run.stdout).trim().slice(0, 500)}`,
      source: "skills-ref",
    });
  }
  return problems;
}

async function runLocalHeuristics(
  skillDir: string,
  problems: ValidationProblem[],
): Promise<void> {
  const skillMdPath = join(skillDir, "SKILL.md");
  let raw: string;
  try {
    raw = await Bun.file(skillMdPath).text();
  } catch {
    // If SKILL.md is missing, skills-ref already reported it.
    return;
  }

  const { body } = splitFrontmatter(raw);
  const trimmed = body.trim();
  if (trimmed.length < MIN_SKILL_BODY_CHARS) {
    problems.push({
      severity: "warning",
      source: "local",
      message: `SKILL.md body is very short (${trimmed.length} chars). Skill may be missing content.`,
    });
  }

  // Count "## Topics" entries — the bullet list of references.
  const topicsHeader = body.match(/^##\s+Topics\b/m);
  let topicEntries = 0;
  if (topicsHeader && topicsHeader.index !== undefined) {
    const after = body.slice(topicsHeader.index + topicsHeader[0].length);
    const nextSection = after.match(/^##\s/m);
    const section =
      nextSection && nextSection.index !== undefined
        ? after.slice(0, nextSection.index)
        : after;
    topicEntries = (section.match(/^\s*-\s+\[/gm) ?? []).length;
  }
  if (topicEntries < MIN_TOPIC_COUNT) {
    problems.push({
      severity: "warning",
      source: "local",
      message:
        "SKILL.md has no Topics list (or is empty). Agents won't be able to discover references.",
    });
  }

  await checkReferences(skillDir, problems);
}

async function checkReferences(
  skillDir: string,
  problems: ValidationProblem[],
): Promise<void> {
  const refsDir = join(skillDir, "references");
  let files: string[];
  try {
    files = (await readdir(refsDir)).filter((f) => f.endsWith(".md"));
  } catch {
    return;
  }
  if (files.length === 0) return;

  let thin = 0;
  for (const file of files) {
    const text = await Bun.file(join(refsDir, file)).text();
    const { body } = splitFrontmatter(text);
    const stripped = body
      .replace(/^>.*$/gm, "")
      .replace(/\s+/g, " ")
      .trim();
    if (stripped.length < MIN_REFERENCE_BODY_CHARS) thin++;
  }

  const ratio = thin / files.length;
  if (ratio > MAX_THIN_REFERENCE_RATIO) {
    problems.push({
      severity: "warning",
      source: "local",
      message: `${thin} of ${files.length} reference files have less than ${MIN_REFERENCE_BODY_CHARS} chars of content. The source page may not have downloaded correctly.`,
    });
  } else if (thin > 0) {
    problems.push({
      severity: "warning",
      source: "local",
      message: `${thin} of ${files.length} reference files are very short and may be missing content.`,
    });
  }
}

/**
 * Minimal port of the upstream spec rules used only when neither
 * `skills-ref` nor `uvx` is installed locally. Kept in sync with
 * https://github.com/agentskills/agentskills/blob/main/skills-ref/src/skills_ref/validator.py
 * — when the upstream rules change, prefer fixing the install path
 * over expanding this fallback.
 */
async function fallbackSpecRules(
  skillDir: string,
): Promise<ValidationProblem[]> {
  const problems: ValidationProblem[] = [];
  const skillMdPath = join(skillDir, "SKILL.md");
  let raw: string;
  try {
    raw = await Bun.file(skillMdPath).text();
  } catch {
    problems.push({
      severity: "error",
      source: "local",
      message: "Missing SKILL.md",
    });
    return problems;
  }

  const { fm } = splitFrontmatter(raw);
  const dirName = basename(skillDir);
  const ALLOWED = new Set([
    "name",
    "description",
    "license",
    "allowed-tools",
    "metadata",
    "compatibility",
  ]);
  const extras = Object.keys(fm).filter((k) => !ALLOWED.has(k));
  if (extras.length > 0) {
    problems.push({
      severity: "warning",
      source: "local",
      message: `Frontmatter has unexpected fields: ${extras.join(", ")}`,
    });
  }
  const name = typeof fm.name === "string" ? fm.name.trim() : "";
  const description =
    typeof fm.description === "string" ? fm.description.trim() : "";
  if (!name) {
    problems.push({
      severity: "error",
      source: "local",
      message: "Frontmatter is missing required field: name",
    });
  } else {
    if (name.length > 64) {
      problems.push({
        severity: "error",
        source: "local",
        message: `Skill name "${name}" exceeds 64 chars (${name.length})`,
      });
    }
    if (name !== name.toLowerCase()) {
      problems.push({
        severity: "error",
        source: "local",
        message: `Skill name "${name}" must be lowercase`,
      });
    }
    if (name.startsWith("-") || name.endsWith("-")) {
      problems.push({
        severity: "error",
        source: "local",
        message: "Skill name cannot start or end with a hyphen",
      });
    }
    if (name.includes("--")) {
      problems.push({
        severity: "error",
        source: "local",
        message: "Skill name cannot contain consecutive hyphens",
      });
    }
    if (!/^[a-z0-9-]+$/.test(name)) {
      problems.push({
        severity: "error",
        source: "local",
        message: `Skill name "${name}" contains invalid characters`,
      });
    }
    if (name !== dirName) {
      problems.push({
        severity: "error",
        source: "local",
        message: `Directory name "${dirName}" must match skill name "${name}"`,
      });
    }
  }
  if (!description) {
    problems.push({
      severity: "error",
      source: "local",
      message: "Frontmatter is missing required field: description",
    });
  } else if (description.length > 1024) {
    problems.push({
      severity: "error",
      source: "local",
      message: `Description exceeds 1024 chars (${description.length})`,
    });
  }
  return problems;
}

function splitFrontmatter(text: string): {
  fm: Record<string, unknown>;
  body: string;
} {
  if (!text.startsWith("---")) return { fm: {}, body: text };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: text };
  const yaml = text.slice(3, end).trim();
  const body = text.slice(end + 4).replace(/^\s*\n/, "");
  const fm: Record<string, unknown> = {};
  for (const line of yaml.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    fm[m[1]] = value;
  }
  if (!fm.description) {
    const { description } = parseFrontmatter(text);
    if (description) fm.description = description;
  }
  return { fm, body };
}

export function formatProblems(result: SkillValidationResult): string {
  if (result.problems.length === 0) return "";
  const header = `  (validator: ${result.backend})`;
  const lines = result.problems.map(
    (p) =>
      `  ${p.severity === "error" ? "\u2717" : "\u26A0"}  [${p.severity}] ${p.message}${p.source === "skills-ref" ? "" : "  (heuristic)"}`,
  );
  return [header, ...lines].join("\n");
}

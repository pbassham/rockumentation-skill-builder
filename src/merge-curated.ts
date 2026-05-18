/**
 * Refresh-with-merge primitives for curated bundles.
 *
 * Fresh-build mode (default) rewrites every file from scratch. Refresh
 * mode runs the same pipeline but splices each file's user-editable
 * regions (frontmatter description, hand-written prose above
 * `## Topics`) through from the existing on-disk copy. The cron job and
 * the "Refresh from source" UI action both rely on this — without it,
 * descriptions and hand-edits would be clobbered on every refresh.
 *
 * Functions are pure and string-in/string-out so they can be unit
 * tested without touching the filesystem.
 */

import { parseFrontmatter } from "./frontmatter";

/**
 * Merge a freshly-generated reference markdown file with the existing
 * on-disk copy. The body comes from `fresh`; the `description` field in
 * frontmatter is preserved from `existing` when present (since users /
 * Claude regenerations write descriptions there).
 *
 * Other fresh frontmatter fields (source, sourceLabel) always win
 * because the upstream URL or its label may have changed.
 *
 * Pass `existing = null` to indicate the file doesn't exist yet — the
 * function returns `fresh` unchanged in that case.
 */
export function mergeReferenceMarkdown(
  existing: string | null,
  fresh: string,
): string {
  if (!existing) return fresh;
  const existingDesc = parseFrontmatter(existing).description;
  if (!existingDesc) return fresh;
  return replaceFrontmatterField(fresh, "description", existingDesc);
}

/**
 * Merge a freshly-generated SKILL.md with the existing on-disk copy.
 *
 * Preservation rules:
 * - Frontmatter `description` line is taken from existing (if present)
 *   so user-customized descriptions survive a refresh. All other
 *   frontmatter (metadata.generatedAt, sources, version, author) comes
 *   from `fresh`.
 * - Everything **above** the first `## Topics` heading in the body is
 *   taken from existing (intro paragraph, preText, Additional
 *   Instructions, any hand-written sections).
 * - `## Topics` and everything below it is taken from `fresh` — that's
 *   the regenerated reference index built from current frontmatter
 *   descriptions.
 *
 * Pass `existing = null` for first-time generation.
 */
export function mergeSkillMarkdown(
  existing: string | null,
  fresh: string,
): string {
  if (!existing) return fresh;

  // 1. Merge frontmatter `description`.
  const existingDesc = readSkillDescription(existing);
  const merged = existingDesc
    ? replaceFrontmatterField(fresh, "description", existingDesc)
    : fresh;

  // 2. Splice pre-topics body section.
  const existingSplit = splitAtTopics(existing);
  const freshSplit = splitAtTopics(merged);

  // If either side lacks a `## Topics` heading, fall back to the merged
  // frontmatter-only result — don't try to be clever.
  if (!existingSplit.topicsOnward || !freshSplit.topicsOnward) {
    return merged;
  }

  return (
    freshSplit.beforeBody +
    existingSplit.preTopicsBody +
    freshSplit.topicsOnward
  );
}

/** Read the top-level `description:` field from SKILL.md frontmatter. */
function readSkillDescription(content: string): string | undefined {
  if (!content.startsWith("---\n")) return undefined;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return undefined;
  const yaml = content.slice(4, end);
  // Match a top-level (no leading whitespace) `description:` line.
  const quoted = yaml.match(/^description:\s*"((?:[^"\\]|\\.)*)"/m);
  if (quoted) return quoted[1]!.replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  const bare = yaml.match(/^description:\s*(.+)$/m);
  return bare ? bare[1]!.trim() : undefined;
}

/**
 * Replace (or insert) a top-level scalar field in a markdown file's
 * frontmatter, preserving everything else. Used so we can splice in a
 * preserved description without rewriting the YAML serializer.
 */
function replaceFrontmatterField(
  content: string,
  field: string,
  value: string,
): string {
  if (!content.startsWith("---\n")) return content;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return content;
  const yaml = content.slice(4, end);
  const rest = content.slice(end);
  const yamlValue = yamlScalar(value);
  const lineRe = new RegExp(`^${field}:.*$`, "m");
  let newYaml: string;
  if (lineRe.test(yaml)) {
    newYaml = yaml.replace(lineRe, `${field}: ${yamlValue}`);
  } else {
    // Insert as the first line — keeps top-level keys at the top.
    newYaml = `${field}: ${yamlValue}\n${yaml}`;
  }
  return `---\n${newYaml}${rest}`;
}

function yamlScalar(value: string): string {
  // Also quote and escape `---` as \u002D\u002D\u002D because upstream
  // skills-ref's frontmatter parser uses `content.split("---", 2)` which
  // breaks on URLs that contain literal `---`.
  if (
    /[:#{}[\],&*?|>!%@`"\\\n]/.test(value) ||
    /^\s|\s$/.test(value) ||
    value.includes("---")
  ) {
    const escaped = value
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/---/g, "\\u002D\\u002D\\u002D");
    return `"${escaped}"`;
  }
  return value;
}

/**
 * Split a SKILL.md into (frontmatter+intro before `## Topics`,
 * `## Topics` onward). Used by the splice merge.
 *
 * `beforeBody` is the frontmatter block (including closing `---\n`).
 * `preTopicsBody` is the body content above `## Topics` (intro,
 * preText, etc.). `topicsOnward` starts with `## Topics`.
 */
function splitAtTopics(content: string): {
  beforeBody: string;
  preTopicsBody: string;
  topicsOnward: string | null;
} {
  let beforeBody = "";
  let body = content;
  if (content.startsWith("---\n")) {
    const end = content.indexOf("\n---\n", 4);
    if (end !== -1) {
      beforeBody = content.slice(0, end + 5);
      body = content.slice(end + 5);
    }
  }
  // Match `## Topics` at line start (allow trailing whitespace).
  const m = body.match(/^## Topics\s*$/m);
  if (!m || m.index === undefined) {
    return { beforeBody, preTopicsBody: body, topicsOnward: null };
  }
  return {
    beforeBody,
    preTopicsBody: body.slice(0, m.index),
    topicsOnward: body.slice(m.index),
  };
}

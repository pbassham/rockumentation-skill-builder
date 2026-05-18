/**
 * Parse YAML frontmatter from a markdown file, extracting commonly-used
 * scalar fields. Only handles flat string fields — we deliberately do not
 * pull in a full YAML parser for reference files.
 */
export function parseFrontmatter(content: string): {
  description?: string;
  source?: string;
  sourceLabel?: string;
  body: string;
} {
  if (!content.startsWith("---\n")) {
    return { body: content };
  }

  const endIndex = content.indexOf("\n---\n", 4);
  if (endIndex === -1) {
    return { body: content };
  }

  const yaml = content.slice(4, endIndex);
  const body = content.slice(endIndex + 5);

  return {
    description: readScalar(yaml, "description"),
    source: readScalar(yaml, "source"),
    sourceLabel: readScalar(yaml, "sourceLabel"),
    body,
  };
}

function readScalar(yaml: string, key: string): string | undefined {
  const quoted = yaml.match(
    new RegExp(`^${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m"),
  );
  if (quoted) return quoted[1]!.replace(/\\"/g, '"').trim();
  const bare = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  return bare ? bare[1]!.trim() : undefined;
}

/**
 * Set or update the description in a file's YAML frontmatter, preserving
 * any other known fields (source, sourceLabel).
 */
export function setDescription(content: string, description: string): string {
  const parsed = parseFrontmatter(content);
  return buildFrontmatter(
    {
      description,
      source: parsed.source,
      sourceLabel: parsed.sourceLabel,
    },
    parsed.body,
  );
}

/**
 * Build a frontmatter block + body. Fields with `undefined` / empty values
 * are skipped. Always emits in a stable order: description, source, sourceLabel.
 */
export function buildFrontmatter(
  fields: {
    description?: string;
    source?: string;
    sourceLabel?: string;
  },
  body: string,
): string {
  const lines: string[] = ["---"];
  const order: Array<keyof typeof fields> = [
    "description",
    "source",
    "sourceLabel",
  ];
  let any = false;
  for (const key of order) {
    const value = fields[key];
    if (!value) continue;
    any = true;
    lines.push(`${key}: ${yamlScalar(value)}`);
  }
  if (!any) return body;
  lines.push("---", "");
  return lines.join("\n") + body;
}

function yamlScalar(value: string): string {
  // Quote anything with YAML-significant characters or surrounding whitespace.
  // Also quote and escape `---` because upstream skills-ref splits frontmatter
  // with a naive `content.split("---", 2)` that breaks on URLs containing it.
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

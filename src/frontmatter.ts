/**
 * Parse YAML frontmatter from a markdown file, extracting the description field.
 */
export function parseFrontmatter(content: string): {
  description?: string;
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

  const descMatch =
    yaml.match(/^description:\s*"((?:[^"\\]|\\.)*)"/m) ||
    yaml.match(/^description:\s*(.+)$/m);

  return {
    description: descMatch
      ? descMatch[1]!.replace(/\\"/g, '"').trim()
      : undefined,
    body,
  };
}

/**
 * Set or update the description in a file's YAML frontmatter.
 */
export function setDescription(content: string, description: string): string {
  const { body } = parseFrontmatter(content);
  const escaped = description.replace(/"/g, '\\"');
  return `---\ndescription: "${escaped}"\n---\n${body}`;
}

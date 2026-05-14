import type {
  CompiledTemplate,
  FilterArg,
  FilterCall,
  TemplateNode,
} from "./types";

/**
 * Parse an obsidian-clipper-style DSL string into a compiled template.
 *
 * Recognized placeholder forms:
 *   {{ variable }}                           → variable node
 *   {{ variable | filter:arg | filter2 }}    → variable node with filters
 *   {{ prompt:"text" | filter }}             → prompt node (LLM batch sugar)
 *   {{ step:stepId | filter }}               → step-output reference
 *
 * Filter arg shapes:
 *   bare           foo
 *   quoted         "foo bar"
 *   list           "a","b",c
 *   parenthesized  ("a","b")
 *   map literal    ("a":"b","c":"d")
 */
export function compile(source: string): CompiledTemplate {
  const nodes: TemplateNode[] = [];
  const prompts: { text: string; placeholder: string }[] = [];

  const re = /\{\{([\s\S]*?)\}\}/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let promptCounter = 0;

  while ((match = re.exec(source)) !== null) {
    if (match.index > lastIdx) {
      nodes.push({ kind: "text", value: source.slice(lastIdx, match.index) });
    }
    const inner = match[1]!.trim();
    const node = parsePlaceholder(inner, promptCounter);
    if (node.kind === "prompt") {
      prompts.push({ text: node.text, placeholder: node.placeholder });
      promptCounter++;
    }
    nodes.push(node);
    lastIdx = re.lastIndex;
  }
  if (lastIdx < source.length) {
    nodes.push({ kind: "text", value: source.slice(lastIdx) });
  }

  return { source, nodes, prompts };
}

function parsePlaceholder(inner: string, promptIndex: number): TemplateNode {
  // Split head (`variable` / `prompt:"…"` / `step:id`) from filters by `|`,
  // but respect quoted strings and parens.
  const segments = splitTopLevel(inner, "|");
  const head = segments[0]!.trim();
  const filterParts = segments.slice(1);
  const filters = filterParts.map(parseFilterCall);

  // prompt:"…"
  const promptMatch = head.match(/^prompt\s*:\s*"([\s\S]*)"\s*$/);
  if (promptMatch) {
    const text = promptMatch[1]!;
    const placeholder = `__prompt_${promptIndex}__`;
    return { kind: "prompt", text, filters, placeholder };
  }

  // step:id
  const stepMatch = head.match(/^step\s*:\s*([\w.-]+)\s*$/);
  if (stepMatch) {
    return { kind: "step", stepId: stepMatch[1]!, filters };
  }

  // bare variable name (may contain `.` for nested lookup)
  const name = head;
  return { kind: "variable", name, filters };
}

function parseFilterCall(raw: string): FilterCall {
  const trimmed = raw.trim();
  // filter or filter:args
  const colonIdx = indexOfTopLevel(trimmed, ":");
  if (colonIdx === -1) {
    return { name: trimmed, args: [] };
  }
  const name = trimmed.slice(0, colonIdx).trim();
  const argsStr = trimmed.slice(colonIdx + 1).trim();
  const args = parseArgs(argsStr);
  return { name, args };
}

/**
 * Parse a filter arguments string. Accepts:
 *   foo                       → ["foo"]
 *   "foo bar"                 → ["foo bar"]
 *   "a","b",c                 → ["a", "b", "c"]
 *   ("a","b")                 → ["a", "b"]
 *   ("a":"b","c":"d")         → [{a:"b", c:"d"}]
 *   .alert,.footer            → [".alert", ".footer"]   (when used as a single arg)
 */
function parseArgs(raw: string): FilterArg[] {
  let s = raw.trim();
  // Strip outer parens if present.
  if (s.startsWith("(") && s.endsWith(")")) {
    s = s.slice(1, -1).trim();
  }
  if (s === "") return [];

  // Map literal? Detect by presence of `:` outside strings AND each segment has key:value.
  const segments = splitTopLevel(s, ",");
  const looksLikeMap = segments.every((seg) => {
    const c = indexOfTopLevel(seg.trim(), ":");
    return c !== -1;
  });
  if (looksLikeMap && segments.length > 0 && hasUnquotedColon(s)) {
    const map: Record<string, string> = {};
    for (const seg of segments) {
      const c = indexOfTopLevel(seg, ":");
      const key = stripQuotes(seg.slice(0, c).trim());
      const value = stripQuotes(seg.slice(c + 1).trim());
      map[key] = value;
    }
    return [map];
  }

  // Otherwise: list of bare/quoted strings.
  if (segments.length === 1) {
    return [stripQuotes(segments[0]!.trim())];
  }
  return [segments.map((seg) => stripQuotes(seg.trim()))];
}

function stripQuotes(s: string): string {
  if (s.length >= 2) {
    const first = s[0];
    const last = s[s.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return s.slice(1, -1);
    }
  }
  return s;
}

/**
 * Split a string by `delim` at top level — i.e. ignoring delimiters that
 * appear inside `"…"` strings or `(…)` parens.
 */
function splitTopLevel(s: string, delim: string): string[] {
  const out: string[] = [];
  let buf = "";
  let depth = 0;
  let inStr: '"' | "'" | null = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i]!;
    if (inStr) {
      buf += c;
      if (c === inStr && s[i - 1] !== "\\") inStr = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = c;
      buf += c;
      continue;
    }
    if (c === "(") depth++;
    if (c === ")") depth--;
    if (depth === 0 && c === delim) {
      out.push(buf);
      buf = "";
      continue;
    }
    buf += c;
  }
  if (buf.length > 0 || out.length > 0) out.push(buf);
  return out;
}

function indexOfTopLevel(s: string, ch: string): number {
  let depth = 0;
  let inStr: '"' | "'" | null = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i]!;
    if (inStr) {
      if (c === inStr && s[i - 1] !== "\\") inStr = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = c;
      continue;
    }
    if (c === "(") depth++;
    if (c === ")") depth--;
    if (depth === 0 && c === ch) return i;
  }
  return -1;
}

function hasUnquotedColon(s: string): boolean {
  let inStr: '"' | "'" | null = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i]!;
    if (inStr) {
      if (c === inStr && s[i - 1] !== "\\") inStr = null;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = c;
      continue;
    }
    if (c === ":") return true;
  }
  return false;
}

import { builtinFilters } from "./filters";
import type {
  CompiledTemplate,
  FilterCall,
  FilterCallContext,
  FilterFn,
  TemplateNode,
  Variables,
} from "./types";

export interface EvaluateOptions {
  variables: Variables;
  url: string;
  /** Custom + builtin filters (custom override builtin). */
  filters?: Record<string, FilterFn>;
  /** Pipeline outputs keyed by step id. */
  stepOutputs?: Record<string, string>;
  /** Map of `__prompt_N__` placeholders → resolved text from interpreter. */
  promptResolutions?: Record<string, string>;
}

/**
 * Evaluate a compiled template string against the given variables and
 * pipeline outputs. Async because filter implementations may await
 * downstream resources.
 */
export async function evaluate(
  compiled: CompiledTemplate,
  opts: EvaluateOptions,
): Promise<string> {
  const filters: Record<string, FilterFn> = {
    ...builtinFilters,
    ...(opts.filters ?? {}),
  };
  const baseOrigin = safeOrigin(opts.url);
  const ctx: FilterCallContext = {
    url: opts.url,
    baseOrigin,
    variables: opts.variables,
  };

  let out = "";
  for (const node of compiled.nodes) {
    out += await evaluateNode(node, ctx, filters, opts);
  }
  return out;
}

async function evaluateNode(
  node: TemplateNode,
  ctx: FilterCallContext,
  filters: Record<string, FilterFn>,
  opts: EvaluateOptions,
): Promise<string> {
  if (node.kind === "text") return node.value;

  let value: string;
  let nodeFilters: FilterCall[] = [];

  if (node.kind === "variable") {
    value = lookupVariable(opts.variables, node.name);
    nodeFilters = node.filters;
  } else if (node.kind === "step") {
    value = opts.stepOutputs?.[node.stepId] ?? "";
    nodeFilters = node.filters;
  } else if (node.kind === "prompt") {
    value = opts.promptResolutions?.[node.placeholder] ?? "";
    nodeFilters = node.filters;
  } else {
    return "";
  }

  for (const call of nodeFilters) {
    const fn = filters[call.name];
    if (!fn) {
      console.warn(`Unknown filter: ${call.name}`);
      continue;
    }
    try {
      value = await fn(value, call.args, ctx);
    } catch (err) {
      console.warn(`Filter "${call.name}" threw:`, (err as Error).message);
    }
  }
  return value;
}

function lookupVariable(vars: Variables, name: string): string {
  if (name in vars) return stringify(vars[name]);
  // Dotted path lookup: e.g. `meta.author` or `schema.Article.headline`
  const parts = name.split(".");
  let cur: unknown = vars;
  for (const p of parts) {
    if (cur != null && typeof cur === "object" && p in (cur as object)) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return "";
    }
  }
  return stringify(cur);
}

function stringify(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}

function safeOrigin(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

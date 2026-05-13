/**
 * Template engine types. The DSL mirrors obsidian-clipper:
 *
 *   {{ variable | filter:arg | filter2:(key:value, key2:value2) }}
 *   {{ prompt:"text" | filter }}
 *   {{ step:stepId | filter }}
 */

export type FilterArg = string | string[] | Record<string, string>;

export interface FilterCallContext {
  url: string;
  baseOrigin: string;
  variables: Variables;
}

export type FilterFn = (
  input: string,
  args: FilterArg[],
  ctx: FilterCallContext,
) => string | Promise<string>;

export type Variables = Record<string, unknown>;

/** A single chained filter call: name + parsed args. */
export interface FilterCall {
  name: string;
  args: FilterArg[];
}

/** A `{{ ... }}` placeholder parsed from a template string. */
export type TemplateNode =
  | { kind: "text"; value: string }
  | { kind: "variable"; name: string; filters: FilterCall[] }
  | { kind: "prompt"; text: string; filters: FilterCall[]; placeholder: string }
  | { kind: "step"; stepId: string; filters: FilterCall[] };

export interface CompiledTemplate {
  source: string;
  nodes: TemplateNode[];
  /** All `prompt:"…"` placeholders in source order, for clipper-compat batching. */
  prompts: { text: string; placeholder: string }[];
}

/** A property declared on a template — supports the same DSL in `value`. */
export interface TemplateProperty {
  id?: string;
  name: string;
  value: string;
  type?: "text" | "multitext" | "number" | "date" | "boolean" | "checkbox";
}

/** One LLM step in a multi-stage interpreter pipeline. */
export interface InterpreterStep {
  id: string;
  name?: string;
  /** Reference into InterpreterSettings.models; falls back to the default. */
  modelId?: string;
  /** System / preamble — variables interpolated. */
  systemContext?: string;
  /** User prompt — variables interpolated. */
  prompt: string;
  /** Variable name made available to later steps + the template. */
  outputAs: string;
  outputFormat?: "text" | "json" | "markdown";
  /** Optional JSON-schema-ish validation for structured output. */
  schema?: Record<string, unknown>;
  enabled?: boolean;
  maxTokens?: number;
  temperature?: number;
}

/** Names the way one defuddle output becomes one or more articles. */
export type SplitterId =
  | "single"
  | "by-heading"
  | "by-toc-links"
  | "by-toc-anchors"
  | "by-toc-pages"
  | "by-selector"
  | "interpreter";

export interface SplitterConfig {
  id: SplitterId;
  /** Step id (used when `id === "interpreter"`). */
  stepId?: string;
  /** Heading level to split on for `by-heading` (default 2). */
  level?: number;
  /** CSS selector for `by-selector` — each match becomes one article. */
  selector?: string;
  /** Optional CSS selector (relative to each match) to use for the article title. */
  titleSelector?: string;
  /**
   * For `by-toc-anchors`: CSS selector for the TOC `<a>` links whose `href`
   * fragments (`#welcome`) define the chapter boundaries in the page body.
   * Each link's text becomes the chapter title; the body content between
   * one anchor and the next becomes the chapter content.
   */
  tocSelector?: string;
  /**
   * For `by-toc-pages`: optional CSS selector for the page-content container
   * to extract markdown from after fetching each linked page (defaults to
   * letting defuddle pick).
   */
  pageContentSelector?: string;
  /**
   * For `by-toc-pages`: limits which TOC links are followed. By default,
   * only same-origin links whose pathname starts with the source page's
   * pathname are kept. Provide a glob (e.g. `/lava/**`) to override.
   */
  urlIncludes?: string[];
}

/** Top-level template definition. */
export interface Template {
  id: string;
  name: string;
  description?: string;
  /** Glob strings or `r:` regex source. Most-specific wins. */
  triggers: string[];
  /** File-name template (DSL). */
  noteNameFormat: string;
  /** Body template (DSL). */
  noteContentFormat: string;
  /** Default user-visible folder hint (informational only here). */
  path?: string;
  /** Used as additional system context when running the interpreter. */
  context?: string;
  properties?: TemplateProperty[];
  splitter?: SplitterConfig;
  interpreterPipeline?: InterpreterStep[];
  /** Optional per-template behavior tag (carried over from clipper). */
  behavior?: string;
}

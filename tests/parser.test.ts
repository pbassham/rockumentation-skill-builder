import { test, expect } from "bun:test";
import { compile } from "../src/template-engine/parser";

test("parses bare variable", () => {
  const c = compile("{{ title }}");
  expect(c.nodes).toHaveLength(1);
  const n = c.nodes[0]!;
  expect(n.kind).toBe("variable");
  if (n.kind === "variable") {
    expect(n.name).toBe("title");
    expect(n.filters).toHaveLength(0);
  }
});

test("parses variable with chained filters", () => {
  const c = compile(
    '{{fullHtml|selectorHtml:".center-container"|remove_html:".alert-title,.article-footer"|absolutize|markdown|replace:("xaml":"xml","XAMLCopy":"")}}',
  );
  // single placeholder = single node
  expect(c.nodes).toHaveLength(1);
  const n = c.nodes[0]!;
  expect(n.kind).toBe("variable");
  if (n.kind === "variable") {
    expect(n.name).toBe("fullHtml");
    expect(n.filters.map((f) => f.name)).toEqual([
      "selectorHtml",
      "remove_html",
      "absolutize",
      "markdown",
      "replace",
    ]);
    // last filter is map literal with two pairs
    const replace = n.filters[4]!;
    expect(replace.args).toHaveLength(1);
    const a = replace.args[0]!;
    expect(typeof a).toBe("object");
    expect(Array.isArray(a)).toBe(false);
    expect(a as Record<string, string>).toEqual({
      xaml: "xml",
      XAMLCopy: "",
    });
  }
});

test("parses prompt placeholder", () => {
  const c = compile('{{ prompt:"Summarize this" | trim }}');
  const n = c.nodes[0]!;
  expect(n.kind).toBe("prompt");
  if (n.kind === "prompt") {
    expect(n.text).toBe("Summarize this");
    expect(n.placeholder).toBe("__prompt_0__");
    expect(n.filters.map((f) => f.name)).toEqual(["trim"]);
  }
  expect(c.prompts).toEqual([
    { text: "Summarize this", placeholder: "__prompt_0__" },
  ]);
});

test("parses step reference", () => {
  const c = compile("{{ step:describe | trim }}");
  const n = c.nodes[0]!;
  expect(n.kind).toBe("step");
  if (n.kind === "step") {
    expect(n.stepId).toBe("describe");
    expect(n.filters.map((f) => f.name)).toEqual(["trim"]);
  }
});

test("preserves surrounding text", () => {
  const c = compile("Title: {{ title }} done");
  expect(c.nodes).toHaveLength(3);
  expect(c.nodes[0]).toEqual({ kind: "text", value: "Title: " });
  expect(c.nodes[2]).toEqual({ kind: "text", value: " done" });
});

test("rockrms-lava body DSL parses", () => {
  // Real Lava-style template body the user showed in the v3 plan.
  const src =
    '{{fullHtml|selectorHtml:".center-container"|remove_html:".alert-title,.article-footer"|absolutize|markdown}}';
  const c = compile(src);
  expect(c.nodes).toHaveLength(1);
  const n = c.nodes[0]!;
  if (n.kind !== "variable") throw new Error("expected variable");
  expect(n.filters.map((f) => f.name)).toEqual([
    "selectorHtml",
    "remove_html",
    "absolutize",
    "markdown",
  ]);
});

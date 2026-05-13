import { test, expect } from "bun:test";
import { extractWithTemplate } from "../src/extract";

const LONG = Array.from(
  { length: 12 },
  (_, i) =>
    `<p>Paragraph ${i + 1}: this is meaningful body text about Rock RMS configuration, blocks, and Lava commands. Enough words to satisfy article-extraction heuristics in defuddle and produce a clean markdown output.</p>`,
).join("\n");

const FIXTURE = `<!doctype html>
<html>
<head>
  <title>Test Page</title>
  <meta property="og:title" content="Test Page" />
</head>
<body>
  <article>
    <h1>Test Page</h1>
    <h2 id="alpha">Alpha Section</h2>
    <p>Alpha content with <code>foo</code>.</p>
    ${LONG}
    <h2 id="beta">Beta Section</h2>
    <p>Beta content with a list:</p>
    <ul><li>One</li><li>Two</li><li>Three</li><li>Four</li></ul>
    ${LONG}
  </article>
</body>
</html>`;

test("extractWithTemplate produces clean markdown (no Partial conversion banner)", async () => {
  const result = await extractWithTemplate(
    FIXTURE,
    "https://example.org/test-page",
    "default-defuddle",
  );
  expect(result.articles.length).toBeGreaterThan(0);
  for (const a of result.articles) {
    expect(a.content).not.toMatch(/Partial conversion completed with errors/);
  }
});

test("default-defuddle template renders body markdown", async () => {
  const result = await extractWithTemplate(
    FIXTURE,
    "https://example.org/some-page",
    "default-defuddle",
  );
  expect(result.template.id).toBe("default-defuddle");
  expect(result.articles.length).toBeGreaterThan(0);
  const combined = result.articles.map((a) => a.content).join("\n");
  expect(combined).toMatch(/Alpha/);
  expect(combined).toMatch(/foo/);
});

test("rockumentation-print template chosen for community.rockrms.com URLs", async () => {
  const result = await extractWithTemplate(
    FIXTURE,
    "https://community.rockrms.com/anything",
  );
  expect(result.template.triggers?.some((t) => /rockrms/.test(t))).toBe(true);
});

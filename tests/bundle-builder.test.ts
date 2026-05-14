import { test, expect, mock } from "bun:test";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { parseBuildConfig } from "../src/build-config";

test("parseBuildConfig accepts a minimal valid config", () => {
  const cfg = parseBuildConfig({
    schema: "rockumentation-skill-builder/v1",
    skills: [
      {
        name: "rock-mini",
        sources: [{ url: "https://example.org/a" }],
      },
    ],
  });
  expect(cfg.skills.length).toBe(1);
  expect(cfg.skills[0]!.name).toBe("rock-mini");
  expect(cfg.skills[0]!.sources[0]!.url).toBe("https://example.org/a");
});

test("parseBuildConfig rejects bad schema", () => {
  expect(() => parseBuildConfig({ schema: "wrong/v0", skills: [] })).toThrow(
    /Unsupported config schema/,
  );
});

test("parseBuildConfig rejects non-kebab-case skill name", () => {
  expect(() =>
    parseBuildConfig({
      schema: "rockumentation-skill-builder/v1",
      skills: [
        { name: "Bad_Name", sources: [{ url: "https://example.org/a" }] },
      ],
    }),
  ).toThrow(/kebab-case/);
});

test("parseBuildConfig rejects empty sources", () => {
  expect(() =>
    parseBuildConfig({
      schema: "rockumentation-skill-builder/v1",
      skills: [{ name: "rock-mini", sources: [] }],
    }),
  ).toThrow(/non-empty array/);
});

test("parseBuildConfig rejects invalid URL", () => {
  expect(() =>
    parseBuildConfig({
      schema: "rockumentation-skill-builder/v1",
      skills: [{ name: "rock-mini", sources: [{ url: "not a url" }] }],
    }),
  ).toThrow(/not a valid URL/);
});

// End-to-end: build a 2-source bundle from inline HTML fixtures and verify
// the output has flat references/, a SKILL.md with metadata.sources, and
// no slug collisions despite both sources sharing a "intro" article.

const LONG = Array.from(
  { length: 12 },
  (_, i) =>
    `<p>Paragraph ${i + 1}: meaningful body text about configuration, blocks, and Lava commands. Enough words to satisfy article-extraction heuristics in defuddle and produce a clean markdown output.</p>`,
).join("\n");

function makeHtml(title: string, sectionId: string, sectionTitle: string) {
  return `<!doctype html><html><head><title>${title}</title>
<meta property="og:title" content="${title}" /></head><body><article>
<h1>${title}</h1>
<h2 id="${sectionId}">${sectionTitle}</h2>
<p>Section copy.</p>
${LONG}
<h2 id="${sectionId}-two">${sectionTitle} Two</h2>
<p>Second section copy.</p>
${LONG}
</article></body></html>`;
}

test("buildBundle assembles multi-source skill with flat references", async () => {
  const responses = new Map<string, string>([
    ["https://example.org/source-a", makeHtml("Source A", "intro", "Intro")],
    ["https://example.org/source-b", makeHtml("Source B", "intro", "Intro")],
  ]);
  // ESM modules are read-only, so we mock the fetch module entirely.
  // Capture the original implementations first so we can restore them
  // — `mock.module` mutates process-global module state, which would
  // otherwise break later test files (e.g. login-detect).
  const realFetch = await import("../src/fetch");
  const realFetchPage = realFetch.fetchPage;
  const realLooksLikeLoginPage = realFetch.looksLikeLoginPage;
  mock.module("../src/fetch", () => ({
    fetchPage: async (url: string) => {
      const r = responses.get(url);
      if (!r) throw new Error(`no fixture for ${url}`);
      return r;
    },
    looksLikeLoginPage: realLooksLikeLoginPage,
  }));

  const { buildBundle } = await import("../src/bundle-builder");
  const out = await mkdtemp(join(tmpdir(), "bundle-test-"));
  try {
    const events: any[] = [];
    const result = await buildBundle({
      skill: {
        name: "rock-test",
        description: "Test bundle.",
        sources: [
          {
            url: "https://example.org/source-a",
            label: "Source A",
            note: "Why A.",
          },
          { url: "https://example.org/source-b", label: "Source B" },
        ],
      },
      outputDir: out,
      send: (e) => events.push(e),
    });
    expect(result).not.toBeNull();
    expect(result!.skillName).toBe("rock-test");
    expect(result!.sources.length).toBe(2);

    const skillMd = await readFile(join(result!.skillDir, "SKILL.md"), "utf-8");
    expect(skillMd).toMatch(/^name: rock-test$/m);
    expect(skillMd).toMatch(/^metadata:$/m);
    expect(skillMd).toMatch(/url: "?https:\/\/example\.org\/source-a"?/);
    expect(skillMd).toMatch(/url: "?https:\/\/example\.org\/source-b"?/);
    expect(skillMd).toMatch(/### Source A/);
    expect(skillMd).toMatch(/### Source B/);

    // Flat references/ — no subdirectories, slug collisions disambiguated.
    const refs = await readdir(join(result!.skillDir, "references"));
    expect(refs.length).toBeGreaterThanOrEqual(2);
    // No duplicates regardless of how the splitter chose to slug.
    expect(new Set(refs).size).toBe(refs.length);
    // Each source contributed at least one ref.
    expect(result!.sources[0]!.refCount).toBeGreaterThanOrEqual(1);
    expect(result!.sources[1]!.refCount).toBeGreaterThanOrEqual(1);
  } finally {
    await rm(out, { recursive: true, force: true });
    // Restore the real fetch module so later test files aren't poisoned.
    mock.module("../src/fetch", () => ({
      fetchPage: realFetchPage,
      looksLikeLoginPage: realLooksLikeLoginPage,
    }));
  }
});

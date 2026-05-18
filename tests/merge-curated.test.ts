import { describe, test, expect } from "bun:test";
import {
  mergeReferenceMarkdown,
  mergeSkillMarkdown,
} from "../src/merge-curated";

describe("mergeReferenceMarkdown", () => {
  test("returns fresh when no existing file", () => {
    const fresh = "---\ndescription: \nsource: https://x\n---\nbody";
    expect(mergeReferenceMarkdown(null, fresh)).toBe(fresh);
  });

  test("preserves existing description when present", () => {
    const existing =
      "---\ndescription: My custom desc\nsource: https://old\n---\nold body\n";
    const fresh =
      "---\ndescription: \nsource: https://new\nsourceLabel: NewLabel\n---\nnew body\n";
    const out = mergeReferenceMarkdown(existing, fresh);
    expect(out).toContain("description: My custom desc");
    expect(out).toContain("source: https://new");
    expect(out).toContain("sourceLabel: NewLabel");
    expect(out).toContain("new body");
    expect(out).not.toContain("old body");
  });

  test("uses fresh description when existing has none", () => {
    const existing = "---\nsource: https://old\n---\nold body\n";
    const fresh =
      "---\ndescription: fresh-desc\nsource: https://new\n---\nnew body\n";
    expect(mergeReferenceMarkdown(existing, fresh)).toBe(fresh);
  });

  test("preserves quoted description with special chars", () => {
    const existing =
      '---\ndescription: "Has: colon and \\"quote\\""\nsource: https://x\n---\nbody\n';
    const fresh = "---\ndescription: \nsource: https://x\n---\nnew\n";
    const out = mergeReferenceMarkdown(existing, fresh);
    expect(out).toContain('description: "Has: colon and \\"quote\\""');
  });
});

describe("mergeSkillMarkdown", () => {
  const fresh = [
    "---",
    "name: rock-user",
    "description: Auto-generated default",
    "metadata:",
    "  generatedAt: 2026-05-18T00:00:00.000Z",
    "---",
    "",
    "This skill bundles 3 references from 1 source.",
    "",
    "## Topics",
    "",
    "- [A](references/a.md) — desc a",
    "- [B](references/b.md) — desc b",
    "",
  ].join("\n");

  test("returns fresh when no existing", () => {
    expect(mergeSkillMarkdown(null, fresh)).toBe(fresh);
  });

  test("preserves existing top-level description", () => {
    const existing = [
      "---",
      "name: rock-user",
      "description: My hand-crafted description",
      "metadata:",
      "  generatedAt: 2026-01-01T00:00:00.000Z",
      "---",
      "",
      "Old intro.",
      "",
      "## Topics",
      "",
      "- old stuff",
      "",
    ].join("\n");
    const out = mergeSkillMarkdown(existing, fresh);
    expect(out).toContain("description: My hand-crafted description");
    expect(out).toContain("generatedAt: 2026-05-18T00:00:00.000Z");
  });

  test("preserves hand-written prose above ## Topics", () => {
    const existing = [
      "---",
      "name: rock-user",
      "description: Existing desc",
      "metadata:",
      "  generatedAt: 2026-01-01T00:00:00.000Z",
      "---",
      "",
      "This skill bundles 3 references from 1 source.",
      "",
      "## Additional Instructions",
      "",
      "Always quote citations.",
      "",
      "## Topics",
      "",
      "- stale topics",
      "",
    ].join("\n");
    const out = mergeSkillMarkdown(existing, fresh);
    expect(out).toContain("## Additional Instructions");
    expect(out).toContain("Always quote citations.");
    // Fresh topics block wins.
    expect(out).toContain("- [A](references/a.md) — desc a");
    expect(out).not.toContain("- stale topics");
  });

  test("falls back to fresh when existing lacks ## Topics", () => {
    const existing =
      "---\nname: x\ndescription: keep\n---\nbody without topics\n";
    const out = mergeSkillMarkdown(existing, fresh);
    // Description still preserved.
    expect(out).toContain("description: keep");
  });
});

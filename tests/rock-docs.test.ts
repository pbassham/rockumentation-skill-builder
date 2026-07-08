import { test, expect } from "bun:test";
import {
  ROCK_TOPIC_BOOKS,
  enumerateTopicBooks,
  enumerateTopicSections,
  detectRockDocsVersion,
  compareRockVersions,
} from "../src/rock-docs";
import { matchByUrl } from "../templates";
import { refreshTargets, MONTHLY_REFRESH_MAX_AGE_MS } from "../src/prebuild-curated";
import {
  curatedIdFor,
  curatedBundleRelDir,
  curatedBundleId,
} from "../src/curated-tracked";
import { parseBuildConfig, type BundledSkill } from "../src/build-config";

// ---------------------------------------------------------------------
// enumerateTopicBooks
// ---------------------------------------------------------------------

const NEW_INDEX_HTML = `<!doctype html>
<html><body>
  <div class="topics">
    <a href="/documentation/core-concepts/rock-fundamentals">Rock Fundamentals</a>
    <a href="/documentation/core-concepts/security/background-checks/intro-to-background-checks">Background Checks</a>
    <a href="/documentation/church-management/people">People</a>
    <a href="/documentation/engagement">Engagement</a>
    <a href="/documentation/digital-publishing/websites">Websites</a>
    <a href="/documentation/supporting-rock/hosting">Hosting</a>
    <a href="/documentation/bookcontent/5/360">Legacy book</a>
    <a href="/documentation/brand-new-topic/intro">Brand New Topic</a>
  </div>
</body></html>`;

test("enumerateTopicBooks collects distinct topic slugs, excluding bookcontent", () => {
  const topics = enumerateTopicBooks(
    NEW_INDEX_HTML,
    "https://community.rockrms.com/documentation",
  );
  const slugs = topics.map((t) => t.slug);
  expect(slugs).toEqual([
    "core-concepts",
    "church-management",
    "engagement",
    "digital-publishing",
    "supporting-rock",
    "brand-new-topic",
  ]);
  // Known topics keep their curated labels; unknown ones get title-case.
  expect(topics[0]!.label).toBe("Core Concepts");
  expect(topics[5]!.label).toBe("Brand New Topic");
  expect(topics[0]!.url).toBe(
    "https://community.rockrms.com/documentation/core-concepts",
  );
});

test("enumerateTopicBooks returns [] for non-index URLs and other hosts", () => {
  expect(
    enumerateTopicBooks(
      NEW_INDEX_HTML,
      "https://community.rockrms.com/documentation/core-concepts",
    ),
  ).toEqual([]);
  expect(
    enumerateTopicBooks(NEW_INDEX_HTML, "https://example.org/documentation"),
  ).toEqual([]);
});

// ---------------------------------------------------------------------
// enumerateTopicSections
// ---------------------------------------------------------------------

const TOPIC_HTML = `<!doctype html>
<html><body>
  <nav class="book-toc">
    <a href="/documentation/core-concepts/rock-fundamentals">Rock <b>Fundamentals</b></a>
    <a href="/documentation/core-concepts/security/background-checks">Background Checks</a>
    <a href="/documentation/core-concepts/security/background-checks/intro-to-background-checks">Intro to Background Checks</a>
    <a href="/documentation/core-concepts/rock-fundamentals">Duplicate link</a>
    <a href="/documentation/church-management/people">Other topic</a>
  </nav>
</body></html>`;

test("enumerateTopicSections dumps the section tree with depth and titles", () => {
  const sections = enumerateTopicSections(
    TOPIC_HTML,
    "https://community.rockrms.com/documentation/core-concepts",
  );
  expect(sections.map((s) => s.path)).toEqual([
    "rock-fundamentals",
    "security/background-checks",
    "security/background-checks/intro-to-background-checks",
  ]);
  expect(sections[0]!.title).toBe("Rock Fundamentals");
  expect(sections[0]!.depth).toBe(1);
  expect(sections[2]!.depth).toBe(3);
  expect(sections[2]!.slug).toBe("intro-to-background-checks");
});

// ---------------------------------------------------------------------
// detectRockDocsVersion
// ---------------------------------------------------------------------

test("detectRockDocsVersion returns the highest book-asset version", () => {
  const html = `
    <img src="https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/a.png">
    <img src="https://rockrms.blob.core.windows.net/documentation/Books/9/1.19.0/images/b.png">
    <img src="https://rockrms.blob.core.windows.net/documentation/Books/9/1.9.2/images/c.png">
  `;
  expect(detectRockDocsVersion(html)).toBe("1.19.0");
});

test("detectRockDocsVersion returns null without a marker", () => {
  expect(detectRockDocsVersion("<html><body>no assets</body></html>")).toBe(
    null,
  );
});

test("compareRockVersions orders numerically, not lexically", () => {
  expect(compareRockVersions("1.19.0", "1.9.2")).toBeGreaterThan(0);
  expect(compareRockVersions("1.19", "1.19.0")).toBe(0);
  expect(compareRockVersions("1.18.1", "1.19.0")).toBeLessThan(0);
});

// ---------------------------------------------------------------------
// Template routing
// ---------------------------------------------------------------------

test("template routing sends each Rock docs URL shape to the right template", () => {
  const route = (url: string) => matchByUrl(url)?.id;
  // Topic roots → the new topic-book template.
  expect(route("https://community.rockrms.com/documentation/core-concepts")).toBe(
    "rock-topic-book",
  );
  expect(
    route("https://community.rockrms.com/documentation/church-management/"),
  ).toBe("rock-topic-book");
  // The index itself is NOT a topic book.
  expect(route("https://community.rockrms.com/documentation")).not.toBe(
    "rock-topic-book",
  );
  // Legacy books keep the rock-manual template.
  expect(
    route("https://community.rockrms.com/documentation/bookcontent/39/362"),
  ).toBe("rock-manual");
  // Deep topic pages fall through to the print catch-all, not topic-book.
  expect(
    route(
      "https://community.rockrms.com/documentation/core-concepts/search/universal-search/intro-to-universal-search",
    ),
  ).not.toBe("rock-topic-book");
  // Hub regression: /Lava keeps its TOC-hub template.
  expect(route("https://community.rockrms.com/Lava")).toBe("rock-toc-hub");
});

test("every ROCK_TOPIC_BOOKS url routes to rock-topic-book", () => {
  for (const t of ROCK_TOPIC_BOOKS) {
    expect(matchByUrl(t.url)?.id).toBe("rock-topic-book");
  }
});

// ---------------------------------------------------------------------
// parseBuildConfig round-trip for the new fields
// ---------------------------------------------------------------------

test("parseBuildConfig round-trips rockVersion and refreshCadence", () => {
  const cfg = parseBuildConfig({
    schema: "rockumentation-skill-builder/v1",
    skills: [
      {
        name: "rock-mini",
        rockVersion: "19",
        refreshCadence: "monthly",
        sources: [{ url: "https://example.org/a" }],
      },
    ],
  });
  expect(cfg.skills[0]!.rockVersion).toBe("19");
  expect(cfg.skills[0]!.refreshCadence).toBe("monthly");
});

test("parseBuildConfig drops an invalid refreshCadence", () => {
  const cfg = parseBuildConfig({
    schema: "rockumentation-skill-builder/v1",
    skills: [
      {
        name: "rock-mini",
        refreshCadence: "hourly",
        sources: [{ url: "https://example.org/a" }],
      },
    ],
  });
  expect(cfg.skills[0]!.refreshCadence).toBeUndefined();
});

// ---------------------------------------------------------------------
// refreshTargets cadence logic
// ---------------------------------------------------------------------

const mkBundle = (
  name: string,
  extra: Partial<BundledSkill> = {},
): BundledSkill => ({
  name,
  sources: [{ url: "https://example.org" }],
  ...extra,
});

test("refreshTargets: weekly bundles always run; fresh monthly bundles are skipped", () => {
  const now = new Date("2026-07-08T00:00:00Z");
  const weekly = mkBundle("rock-core-concepts", { rockVersion: "19" });
  const freshMonthly = mkBundle("rock-user", {
    rockVersion: "18",
    refreshCadence: "monthly",
  });
  const staleMonthly = mkBundle("rock-hosting", {
    rockVersion: "18",
    refreshCadence: "monthly",
  });
  const lastBuilt = (b: BundledSkill): Date | null => {
    if (b.name === "rock-user") return new Date("2026-07-01T00:00:00Z"); // 7d ago
    if (b.name === "rock-hosting")
      return new Date(now.getTime() - MONTHLY_REFRESH_MAX_AGE_MS - 1);
    return null;
  };
  const targets = refreshTargets(
    [weekly, freshMonthly, staleMonthly],
    lastBuilt,
    now,
  );
  expect(targets.map((b) => b.name)).toEqual([
    "rock-core-concepts",
    "rock-hosting",
  ]);
});

test("refreshTargets: monthly bundle with unknown last build is included", () => {
  const monthly = mkBundle("rock-user", { refreshCadence: "monthly" });
  const targets = refreshTargets([monthly], () => null, new Date());
  expect(targets.map((b) => b.name)).toEqual(["rock-user"]);
});

test("refreshTargets: an explicit bundleName always runs, even fresh monthly", () => {
  const monthly = mkBundle("rock-user", { refreshCadence: "monthly" });
  const targets = refreshTargets(
    [monthly, mkBundle("rock-advanced")],
    () => new Date(),
    new Date(),
    "rock-user",
  );
  expect(targets.map((b) => b.name)).toEqual(["rock-user"]);
});

// ---------------------------------------------------------------------
// Versioned ids and directories
// ---------------------------------------------------------------------

test("curatedIdFor keeps historical ids for v18 and unversioned bundles", () => {
  expect(curatedIdFor(mkBundle("rock-user", { rockVersion: "18" }))).toBe(
    "curated-rock-user",
  );
  expect(curatedIdFor(mkBundle("rock-advanced"))).toBe(
    "curated-rock-advanced",
  );
  // Matches the legacy id shape exactly.
  expect(curatedIdFor(mkBundle("rock-user", { rockVersion: "18" }))).toBe(
    curatedBundleId("rock-user"),
  );
});

test("curatedIdFor prefixes v19+ bundles with the version", () => {
  expect(
    curatedIdFor(mkBundle("rock-core-concepts", { rockVersion: "19" })),
  ).toBe("curated-v19-rock-core-concepts");
  expect(
    curatedIdFor(mkBundle("rock-core-concepts", { rockVersion: "20" })),
  ).toBe("curated-v20-rock-core-concepts");
});

test("curatedBundleRelDir nests versioned bundles under v<n>/", () => {
  expect(
    curatedBundleRelDir(mkBundle("rock-user", { rockVersion: "18" })),
  ).toBe("v18/rock-user");
  expect(
    curatedBundleRelDir(mkBundle("rock-core-concepts", { rockVersion: "19" })),
  ).toBe("v19/rock-core-concepts");
  expect(curatedBundleRelDir(mkBundle("rock-advanced"))).toBe("rock-advanced");
});

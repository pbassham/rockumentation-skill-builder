/**
 * Discovery probe for the NEW Rock RMS documentation site (v19+).
 *
 * Run this from a machine with network access to community.rockrms.com
 * (cloud sandboxes may block it):
 *
 *   bun scripts/discover-rock-docs.ts
 *
 * It fetches the documentation index and every topic book root (plain
 * AND print mode), then writes:
 *
 *   - scripts/rock-docs-discovery.json   — machine-readable report
 *   - tests/fixtures/rock-docs-index.html — index fixture for tests
 *   - tests/fixtures/rock-topic-book.html — first topic root (print)
 *
 * Commit the output. The report answers everything the migration coded
 * against assumptions:
 *   1. Real topic slugs (vs the guesses in ROCK_TOPIC_BOOKS)
 *   2. Whether a topic root renders the full book in print mode
 *      (data-article-id count / Rockumentation marker → by-toc-links
 *      works; otherwise the crawl fallback needs a TOC selector)
 *   3. Candidate TOC selectors for rock-topic-book-crawl
 *   4. Rock version markers (detectRockDocsVersion signal + any
 *      version-selector markup)
 *   5. Whether legacy bookcontent URLs still serve v18 content without
 *      a login wall (the monthly v18 refresh depends on it)
 *   6. Per-topic section trees (raw material for the future
 *      functional/role-shaped v19 bundle set)
 */

import { join } from "node:path";
import { buildPrintUrl, ensureDir } from "../src/utils";
import { looksLikeLoginPage } from "../src/fetch";
import {
  ROCK_TOPIC_BOOKS,
  enumerateTopicBooks,
  enumerateTopicSections,
  detectRockDocsVersion,
  type RockTopicBook,
} from "../src/rock-docs";

const DOCS_INDEX = "https://community.rockrms.com/documentation";
const LEGACY_BOOK_SAMPLE =
  "https://community.rockrms.com/documentation/bookcontent/5/360"; // Person & Family Field Guide
const FIXTURES_DIR = join(import.meta.dir, "..", "tests", "fixtures");
const REPORT_PATH = join(import.meta.dir, "rock-docs-discovery.json");

async function fetchRaw(
  url: string,
): Promise<{ status: number; html: string }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "RockumentationSkillBuilder/1.0 (https://github.com/rockumentation-skill-builder)",
    },
  });
  return { status: res.status, html: await res.text().catch(() => "") };
}

/** Signals used by templates/extractors, computed from raw HTML. */
function pageSignals(html: string) {
  const articleIds = html.match(/data-article-id\s*=/gi)?.length ?? 0;
  const tocCandidates = [
    ".book-toc",
    ".left-container",
    "#toc",
    ".toc",
    ".sidebar",
    "nav",
  ].filter((sel) => {
    const cls = sel.startsWith(".")
      ? new RegExp(`class=["'][^"']*\\b${sel.slice(1)}\\b`, "i")
      : sel.startsWith("#")
        ? new RegExp(`id=["']${sel.slice(1)}["']`, "i")
        : new RegExp(`<${sel}[\\s>]`, "i");
    return cls.test(html);
  });
  return {
    bytes: html.length,
    hasRockumentationMarker: /\.Rockumentation\s*\(/i.test(html),
    dataArticleIdCount: articleIds,
    looksLikeLoginPage: looksLikeLoginPage(html),
    detectedRockVersion: detectRockDocsVersion(html),
    tocSelectorCandidates: tocCandidates,
    hasVersionSelectorMarkup:
      /<(?:select|option|button|a)[^>]*>[^<]*\bv(?:ersion)?\s*\.?\s*1?\d{1,2}(?:\.\d+)*\b/i.test(
        html,
      ) || /version-(?:picker|selector|dropdown)/i.test(html),
  };
}

async function main() {
  await ensureDir(FIXTURES_DIR);
  const report: Record<string, unknown> = {
    generatedAt: new Date().toISOString(),
    docsIndex: DOCS_INDEX,
  };

  // ----- 1. Documentation index ---------------------------------------
  console.log(`Fetching index: ${DOCS_INDEX}`);
  const index = await fetchRaw(DOCS_INDEX);
  await Bun.write(join(FIXTURES_DIR, "rock-docs-index.html"), index.html);
  const liveTopics = enumerateTopicBooks(index.html, DOCS_INDEX);
  const legacyBookLinks =
    index.html.match(/href=["']\/documentation\/bookcontent\/\d+\/\d+["']/gi)
      ?.length ?? 0;
  const configured = new Set(ROCK_TOPIC_BOOKS.map((t) => t.slug));
  report.index = {
    status: index.status,
    ...pageSignals(index.html),
    liveTopicSlugs: liveTopics.map((t) => t.slug),
    configuredTopicSlugs: [...configured],
    topicsMissingFromConfig: liveTopics
      .filter((t) => !configured.has(t.slug))
      .map((t) => t.slug),
    configuredTopicsMissingFromLive: ROCK_TOPIC_BOOKS.filter(
      (t) => !liveTopics.some((l) => l.slug === t.slug),
    ).map((t) => t.slug),
    legacyBookcontentLinkCount: legacyBookLinks,
  };
  console.log(
    `  live topics: [${liveTopics.map((t) => t.slug).join(", ")}] — legacy bookcontent links: ${legacyBookLinks}`,
  );

  // ----- 2. Topic roots, plain + print ---------------------------------
  // Probe the union of live-enumerated and configured topics so a wrong
  // slug guess in ROCK_TOPIC_BOOKS shows up as a 404 in the report.
  const probeTopics: RockTopicBook[] = [...liveTopics];
  for (const t of ROCK_TOPIC_BOOKS) {
    if (!probeTopics.some((p) => p.slug === t.slug)) probeTopics.push(t);
  }
  const topics: Record<string, unknown> = {};
  let savedTopicFixture = false;
  for (const topic of probeTopics) {
    console.log(`Fetching topic: ${topic.url}`);
    const plain = await fetchRaw(topic.url);
    const printUrl = buildPrintUrl(topic.url);
    const print = await fetchRaw(printUrl);
    const sections = enumerateTopicSections(
      print.html || plain.html,
      topic.url,
    );
    topics[topic.slug] = {
      url: topic.url,
      plain: { status: plain.status, ...pageSignals(plain.html) },
      print: { url: printUrl, status: print.status, ...pageSignals(print.html) },
      sectionCount: sections.length,
      sections,
    };
    if (!savedTopicFixture && print.status === 200 && print.html) {
      await Bun.write(
        join(FIXTURES_DIR, "rock-topic-book.html"),
        print.html,
      );
      report.topicFixtureSlug = topic.slug;
      savedTopicFixture = true;
    }
  }
  report.topics = topics;

  // ----- 3. Legacy bookcontent sample ----------------------------------
  console.log(`Fetching legacy sample: ${LEGACY_BOOK_SAMPLE}`);
  const legacy = await fetchRaw(buildPrintUrl(LEGACY_BOOK_SAMPLE));
  report.legacyBookSample = {
    url: LEGACY_BOOK_SAMPLE,
    status: legacy.status,
    ...pageSignals(legacy.html),
  };

  await Bun.write(REPORT_PATH, JSON.stringify(report, null, 2) + "\n");
  console.log(`\nWrote ${REPORT_PATH}`);
  console.log(`Wrote ${join(FIXTURES_DIR, "rock-docs-index.html")}`);
  if (savedTopicFixture) {
    console.log(
      `Wrote ${join(FIXTURES_DIR, "rock-topic-book.html")} (topic: ${report.topicFixtureSlug})`,
    );
  } else {
    console.warn("No topic root returned 200 in print mode — no topic fixture saved.");
  }
  console.log(
    "\nCommit these files, then review the report to finalize ROCK_TOPIC_BOOKS slugs, the rock-topic-book-crawl TOC selector, and detectRockDocsVersion.",
  );
}

await main();

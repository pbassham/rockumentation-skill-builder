/**
 * Curated list of Rock RMS root URLs that the UI exposes as a one-click
 * batch-build picker.
 *
 * Two kinds of entries exist:
 *   - `single` — one URL ⇒ one skill. Built by calling /api/build directly.
 *   - `index`  — one URL whose page links to many skills (e.g. the
 *                /documentation bookshelf). Built by expanding the index
 *                server-side and looping per child URL.
 *
 * Plus a separate set of `CURATED_BUNDLES` — multi-source skills built via
 * /api/build-config. Bundles are role-shaped (e.g. customizer, developer)
 * so end users only load the skills they need.
 *
 * Keep this list short and high-signal. Anything else can still be built via
 * the "Custom URL" form.
 */
import type { BundledSkill, BundledSource } from "./build-config";
import { ROCK_TOPIC_BOOKS } from "./rock-docs";

/**
 * Source entry for one of the new-docs topic books. URL + label come
 * from `ROCK_TOPIC_BOOKS` (single source of truth, drift-checked
 * against the live site on scheduled refreshes). The template is
 * pinned so extraction never depends on URL auto-detection.
 */
function topicSource(slug: string): BundledSource {
  const topic = ROCK_TOPIC_BOOKS.find((t) => t.slug === slug);
  if (!topic) throw new Error(`Unknown Rock topic book slug: ${slug}`);
  return { url: topic.url, label: topic.label, templateId: "rock-topic-book" };
}

export interface CuratedRoot {
  /** Display label shown in the checklist. */
  label: string;
  /** Optional one-line description. */
  description?: string;
  /** Absolute URL to build. */
  url: string;
  /**
   * `single` builds one skill from this URL.
   * `index`  expands this URL into N child URLs server-side and builds each.
   */
  kind: "single" | "index";
}

export interface CuratedRootGroup {
  label: string;
  description?: string;
  items: CuratedRoot[];
}

export const CURATED_ROOT_GROUPS: CuratedRootGroup[] = [
  {
    label: "Documentation",
    description:
      "Long-form Rock manuals (Getting Started, User Guides, Administration).",
    items: [
      {
        label: "All Rock Manuals (legacy, ≤ v18)",
        description:
          "Builds one skill per legacy bookcontent manual linked from the documentation index (~22 manuals, Rock v18 and earlier).",
        url: "https://community.rockrms.com/documentation",
        kind: "index",
      },
    ],
  },
  {
    label: "Lava & Styling",
    description: "Hub pages whose sidebar links to many sub-pages.",
    items: [
      {
        label: "Lava",
        description: "Filters, tags, commands, shortcodes.",
        url: "https://community.rockrms.com/Lava",
        kind: "single",
      },
      {
        label: "Styling",
        description: "Rock's design system, theming, and CSS conventions.",
        url: "https://community.rockrms.com/styling",
        kind: "single",
      },
      {
        label: "Workflow Actions",
        description:
          "Catalog of every workflow action grouped by category (AI, Communications, Finance, etc.).",
        url: "https://community.rockrms.com/WorkflowActions",
        kind: "single",
      },
    ],
  },
  {
    label: "Developer Resources",
    description: "Per-topic guides linked from the /developer index page.",
    items: [
      {
        label: "Developer Codex",
        url: "https://community.rockrms.com/developer/developer-codex",
        kind: "single",
      },
      {
        label: "Helix",
        url: "https://community.rockrms.com/developer/helix",
        kind: "single",
      },
      {
        label: "Mobile Docs",
        url: "https://community.rockrms.com/developer/mobile-docs",
        kind: "single",
      },
      {
        label: "AI Agents",
        url: "https://community.rockrms.com/developer/ai-agents",
        kind: "single",
      },
      {
        label: "Apple TV Docs",
        url: "https://community.rockrms.com/developer/apple-tv-docs",
        kind: "single",
      },
      {
        label: "Roku Docs",
        url: "https://community.rockrms.com/developer/roku-docs",
        kind: "single",
      },
      {
        label: "Obsidian",
        url: "https://community.rockrms.com/developer/obsidian",
        kind: "single",
      },
      {
        label: "Design System",
        url: "https://community.rockrms.com/developer/design-system",
        kind: "single",
      },
      {
        label: "Packaging Plugins & Themes",
        url: "https://community.rockrms.com/developer/packaging-plugins-themes",
        kind: "single",
      },
      {
        label: "Quickstart Tutorials",
        url: "https://community.rockrms.com/developer/quickstart-tutorials",
        kind: "single",
      },
      {
        label: "Realtime Visualizer",
        url: "https://community.rockrms.com/developer/realtime-visualizer",
        kind: "single",
      },
      {
        label: "Dynamic LINQ Syntax",
        url: "https://community.rockrms.com/developer/dynamic-linq-syntax",
        kind: "single",
      },
      {
        label: "SQL Style Guide",
        url: "https://community.rockrms.com/developer/sql-style-guide",
        kind: "single",
      },
      {
        label: "Slingshot",
        url: "https://community.rockrms.com/developer/slingshot",
        kind: "single",
      },
      {
        label: "The Long & Short on Shortcodes",
        url: "https://community.rockrms.com/developer/the-long-short-on-shortcodes",
        kind: "single",
      },
      {
        label: "Rock Branches",
        url: "https://community.rockrms.com/developer/rock-branches",
        kind: "single",
      },
      {
        label: "Changelog",
        url: "https://community.rockrms.com/developer/changelog",
        kind: "single",
      },
      {
        label: "101 — Launchpad",
        url: "https://community.rockrms.com/developer/101---launchpad",
        kind: "single",
      },
      {
        label: "202 — Ignition",
        url: "https://community.rockrms.com/developer/202---ignition",
        kind: "single",
      },
      {
        label: "303 — Blast Off",
        url: "https://community.rockrms.com/developer/303---blast-off",
        kind: "single",
      },
    ],
  },
];

/**
 * Curated multi-source bundles. Each `BundledSkill` produces ONE skill
 * folder with a flat `references/` directory aggregating every source
 * URL listed under it. Built via /api/build-config.
 *
 * Roles in mind:
 *   - rock-hosting: planning + infrastructure (one-time, pre-launch)
 *   - rock-user: day-to-day end-user features
 *   - rock-administration: admin configuration including workflow building
 *   - rock-advanced: what a staff developer touches every day building
 *     interfaces and tools inside Rock — Lava, theming, SQL, shortcodes
 *   - rock-mobile: building a Rock Mobile app (its own deliverable)
 *   - rock-developer: contributing to Rock core / writing native plugins
 *     (mostly internal — coding standards, commit discipline, etc.)
 *
 * Versioning: Rock rebuilt its documentation site for v19+. Bundles
 * built from the legacy `/documentation/bookcontent/...` books carry
 * `rockVersion: "18"` and refresh on a MONTHLY cadence (old docs still
 * get fixes, just rarely). The v19+ topic-book bundles below carry
 * `rockVersion: "19"` and refresh weekly. Hub-based bundles (Lava,
 * developer docs) are version-agnostic living docs — no rockVersion.
 * Versioned bundles are tracked on disk under `curated-bundles/v<n>/`.
 *
 * The user can edit/extend this list freely — it's plain TypeScript data.
 */
export const CURATED_BUNDLES: BundledSkill[] = [
  {
    name: "rock-user",
    description:
      "(Rock v18 and earlier) Use when answering end-user questions about how to use Rock RMS day to day — managing people and families, groups, finance, communications, events, prayer, reporting, check-in, and the LMS. Bundles every 'User Guides' manual. For Rock v19+, load rock-church-management / rock-engagement instead.",
    rockVersion: "18",
    refreshCadence: "monthly",
    sources: [
      {
        url: "https://community.rockrms.com/documentation/bookcontent/5/360",
        label: "Person & Family Field Guide",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/7/361",
        label: "Rock Your Groups",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/39/362",
        label: "Engagement",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/8/363",
        label: "Communicating With Rock",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/6/364",
        label: "Taking Off With Reporting",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/29/365",
        label: "Event & Calendar Guide",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/11/366",
        label: "Raising Up With Prayer",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/15/367",
        label: "Rock Solid Finances",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/43/354",
        label: "Learning Management System",
      },
    ],
  },
  {
    name: "rock-administration",
    description:
      "(Rock v18 and earlier) Use when administering Rock RMS — running check-in (legacy and NextGen), configuring and building workflows, designing assessments, sending email and SMS, running BI reports, scaling a Rock instance, and managing universal search. Bundles every 'Administration' manual plus the full Workflow Actions catalog (every action grouped by category — AI, Communications, Finance, etc.) and the Blasting Off With Workflows guide. For Rock v19+, load rock-core-concepts / rock-supporting-rock instead.",
    rockVersion: "18",
    refreshCadence: "monthly",
    sources: [
      {
        url: "https://community.rockrms.com/documentation/bookcontent/9/368",
        label: "Rock Admin Hero Guide",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/12/369",
        label: "Blasting Off With Workflows",
      },
      {
        url: "https://community.rockrms.com/WorkflowActions",
        label: "Workflow Actions",
        note: "Every workflow action grouped by category (AI, Communications, Finance, etc.).",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/32/371",
        label: "Universal Search",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/10/372",
        label: "Checking-out Check-in",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/42/350",
        label: "Checking-out Check-in - NextGen",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/37/351",
        label: "Assessments",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/34/352",
        label: "Email Template Survival Guide",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/35/353",
        label: "Business Intelligence",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/40/344",
        label: "Hyper Scaling Rock RMS",
      },
    ],
  },
  {
    name: "rock-advanced",
    description:
      "Use when a Rock RMS staff developer is building inside Rock day to day — authoring Lava templates and shortcodes, writing Helix blocks, designing and building Rock-powered websites, writing custom SQL reports or dataview filters, and theming/styling. Covers Lava (filters, tags, commands, shortcodes), Helix, Designing and Building Websites Using Rock, Styling, the SQL Style Guide, Dynamic LINQ syntax, and shortcode authoring.",
    sources: [
      {
        url: "https://community.rockrms.com/Lava",
        label: "Lava",
        note: "Filters, tags, commands, shortcodes — the templating language used everywhere in Rock.",
      },
      {
        url: "https://community.rockrms.com/developer/helix",
        label: "Helix",
        note: "Helix block framework: HTMX, Lava applications, Lava commands, forms, strategies.",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/14/370",
        label: "Designing and Building Websites Using Rock",
      },
      {
        url: "https://community.rockrms.com/styling",
        label: "Styling",
        note: "Rock's design system, theming, and CSS conventions.",
      },
      {
        url: "https://community.rockrms.com/developer/sql-style-guide",
        label: "SQL Style Guide",
        note: "House style for SQL written against the Rock database.",
      },
      {
        url: "https://community.rockrms.com/developer/dynamic-linq-syntax",
        label: "Dynamic LINQ Syntax",
        note: "Filter syntax used in dataviews, reports, and Lava `Where` filters.",
      },
      {
        url: "https://community.rockrms.com/developer/the-long-short-on-shortcodes",
        label: "Lava Shortcodes",
        note: "Authoring custom Lava shortcodes.",
      },
    ],
  },
  {
    name: "rock-mobile",
    description:
      "Use when building a Rock Mobile app — iOS, Android, Apple TV, or Roku. Covers the Mobile Docs (shell setup, blocks, styling, deep links, push, app store submission), Apple TV docs, and Roku docs. This is the bundle to load whenever the question is about a native Rock-powered mobile or TV app.",
    sources: [
      {
        url: "https://community.rockrms.com/developer/mobile-docs",
        label: "Mobile Docs",
        note: "Building Rock Mobile apps (iOS/Android via Xamarin/.NET MAUI).",
      },
      {
        url: "https://community.rockrms.com/developer/apple-tv-docs",
        label: "Apple TV Docs",
      },
      {
        url: "https://community.rockrms.com/developer/roku-docs",
        label: "Roku Docs",
      },
    ],
  },
  {
    name: "rock-hosting",
    description:
      "(Rock v18 and earlier) Use when planning a Rock RMS implementation, choosing between self-hosted and Azure deployments, or scoping infrastructure. Bundles every 'Getting Started' manual from the legacy Rock documentation index. For Rock v19+, load rock-supporting-rock instead.",
    rockVersion: "18",
    refreshCadence: "monthly",
    sources: [
      {
        url: "https://community.rockrms.com/documentation/bookcontent/2/357",
        label: "Planning for Rock",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/1/358",
        label: "Rock Solid Internal Hosting",
      },
      {
        url: "https://community.rockrms.com/documentation/bookcontent/31/359",
        label: "Rock Solid Azure Hosting",
      },
    ],
  },
  {
    name: "rock-developer",
    description:
      "Use when contributing to Rock RMS itself or writing native C#/Vue plugins for Rock — coding standards, commit discipline, the release process, the Obsidian (Vue 3) block framework, the design system, AI agent integration, packaging plugins and themes for the Rock Shop, Slingshot bulk imports, the realtime visualizer, quickstart tutorials, branch model, changelog, and the 101/202/303 onboarding tracks. NOT for end-user, admin, Lava, or mobile-app questions — load rock-user / rock-administration / rock-advanced / rock-mobile for those.",
    sources: [
      {
        url: "https://community.rockrms.com/developer/developer-codex",
        label: "Developer Codex",
        note: "Coding standards, commit discipline, release process, and core conventions.",
      },
      {
        url: "https://community.rockrms.com/developer/obsidian",
        label: "Obsidian",
        note: "Vue 3 / TypeScript front-end framework powering modern Rock blocks.",
      },
      {
        url: "https://community.rockrms.com/developer/design-system",
        label: "Design System",
        note: "Component library, design tokens, and patterns.",
      },
      {
        url: "https://community.rockrms.com/developer/ai-agents",
        label: "AI Agents",
        note: "Building AI-powered features inside Rock.",
      },
      {
        url: "https://community.rockrms.com/developer/packaging-plugins-themes",
        label: "Packaging Plugins & Themes",
        note: "Plugin/theme manifest format and the Rock Shop publishing flow.",
      },
      {
        url: "https://community.rockrms.com/developer/slingshot",
        label: "Slingshot",
        note: "Bulk-import format for migrating data into Rock.",
      },
      {
        url: "https://community.rockrms.com/developer/realtime-visualizer",
        label: "Realtime Visualizer",
      },
      {
        url: "https://community.rockrms.com/developer/quickstart-tutorials",
        label: "Quickstart Tutorials",
      },
      {
        url: "https://community.rockrms.com/developer/rock-branches",
        label: "Rock Branches",
      },
      {
        url: "https://community.rockrms.com/developer/changelog",
        label: "Changelog",
      },
      {
        url: "https://community.rockrms.com/developer/101---launchpad",
        label: "101 — Launchpad",
      },
      {
        url: "https://community.rockrms.com/developer/202---ignition",
        label: "202 — Ignition",
      },
      {
        url: "https://community.rockrms.com/developer/303---blast-off",
        label: "303 — Blast Off",
      },
    ],
  },

  // -------------------------------------------------------------------
  // Rock v19+ — one bundle per topic book on the rebuilt documentation
  // site (https://community.rockrms.com/documentation). Each topic root
  // renders the entire book; the rock-topic-book template splits it
  // into one reference per article. A second, functional/role-shaped
  // v19 set (mapping sections across topics) is planned once the site's
  // section tree has been enumerated — see TODO.md.
  // -------------------------------------------------------------------
  {
    name: "rock-core-concepts",
    description:
      "Use when working with Rock RMS fundamentals on Rock v19+ — person records and families, attributes and defined types, security and roles, universal search, blocks, pages, and the core data model. Built from the 'Core Concepts' topic book of the rebuilt Rock documentation.",
    rockVersion: "19",
    refreshCadence: "weekly",
    sources: [topicSource("core-concepts")],
  },
  {
    name: "rock-church-management",
    description:
      "Use for day-to-day ministry operations in Rock RMS v19+ — managing people and groups, check-in, giving and finances, events and calendars, and reporting. Built from the 'Church Management' topic book of the rebuilt Rock documentation.",
    rockVersion: "19",
    refreshCadence: "weekly",
    sources: [topicSource("church-management")],
  },
  {
    name: "rock-engagement",
    description:
      "Use when building engagement processes in Rock RMS v19+ — connections, steps, streaks, assessments, prayer, and communications that move people along their journey. Built from the 'Engagement' topic book of the rebuilt Rock documentation.",
    rockVersion: "19",
    refreshCadence: "weekly",
    sources: [topicSource("engagement")],
  },
  {
    name: "rock-digital-publishing",
    description:
      "Use when publishing digital content with Rock RMS v19+ — websites and the CMS, themes and styling, content channels, media, and mobile/TV app content. Built from the 'Digital Publishing' topic book of the rebuilt Rock documentation.",
    rockVersion: "19",
    refreshCadence: "weekly",
    sources: [topicSource("digital-publishing")],
  },
  {
    name: "rock-supporting-rock",
    description:
      "Use when supporting a Rock RMS v19+ instance — planning and hosting, installation and updates, scaling, administration, and troubleshooting. Built from the 'Supporting Rock' topic book of the rebuilt Rock documentation.",
    rockVersion: "19",
    refreshCadence: "weekly",
    sources: [topicSource("supporting-rock")],
  },
];

/**
 * If `html` looks like the Rock documentation bookshelf index page, return
 * the absolute URLs of every manual it links to. Returns `[]` otherwise.
 *
 * The index page renders books as
 *   `<div class="bookshelf"><div class="book"><div class="img-content">
 *     <a href="/documentation/bookcontent/<bookId>/<versionId>">…</a></div></div>`
 * grouped under section `<h3 class="title">` headings. We scrape every
 * `bookcontent/<id>/<id>` link in document order and de-duplicate.
 */
export function enumerateDocumentationIndex(
  html: string,
  sourceUrl: string,
): string[] {
  let base: URL;
  try {
    base = new URL(sourceUrl);
  } catch {
    return [];
  }
  if (base.host !== "community.rockrms.com") return [];
  const path = base.pathname.replace(/\/+$/, "").toLowerCase();
  if (path !== "/documentation") return [];

  const seen = new Set<string>();
  const out: string[] = [];
  const re = /href=["'](\/documentation\/bookcontent\/\d+\/\d+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const abs = new URL(m[1]!, base).toString();
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push(abs);
  }
  return out;
}

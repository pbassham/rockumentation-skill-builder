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
 * Keep this list short and high-signal. Anything else can still be built via
 * the "Custom URL" form.
 */
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
        label: "All Rock Manuals",
        description:
          "Builds one skill per book listed on the documentation index page (~22 manuals).",
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

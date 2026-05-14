# AGENTS.md — rockumentation-skill-builder

This repo's primary purpose is to **generate AI Agent Skills** from Rock RMS
(and other) documentation pages. The output is a folder containing a
`SKILL.md` plus `references/*.md`, designed to be consumed by Claude / VS Code
Agent Skills / Copilot.

## Always follow the Agent Skills format

Every generated skill MUST conform to the VS Code Agent Skills convention.
**Before changing how `SKILL.md` is generated, or when adding/updating any
template that emits skills, consult the canonical `/create-skill` skill** at:

- `/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/copilot/assets/prompts/skills/create-skill/SKILL.md`
- `/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/copilot/assets/prompts/skills/agent-customization/references/skills.md`

Required SKILL.md shape:

```yaml
---
name: <kebab-case, must equal folder name, ≤64 chars>
description: 'Keyword-rich. Mention trigger phrases / "Use when…". ≤1024 chars.'
---
```

Body sections (in this order):

1. Source + Generated metadata blockquote
2. Brief overview (1–3 sentences) — what this skill covers and when to load it
3. `## Topics` — bulleted list of `[Title](references/<slug>.md) — short description` for progressive loading
4. (Optional) `## Additional Instructions` for custom guidance

Hard rules:

- **Folder name == frontmatter `name`** — both come from `deriveSkillName(url, pageTitle)` in `src/utils.ts`. Numeric / single-char URL slugs (`/362`) MUST fall back to the page title (`rock-engagement`). Do not remove this fallback.
- **Keep SKILL.md under ~500 lines.** Push detail into `references/`.
- **One topic = one reference file**, slugified from the chapter title.
- **Never write garbled or duplicated content**: if a page splits into chapters, use the page's own authoritative outline (TOC sidebar, anchor list) rather than guessing from heading levels — those repeat across long manuals.

## Template authoring rules

When the user discovers a Rock URL pattern that extracts poorly:

1. **Inspect the page first** (curl + grep for the distinctive container/TOC/anchor classes). Do not guess.
2. **Pick the right splitter** in this priority order:
   - `by-toc-anchors` — page has a sidebar/TOC of `<a href="#frag">` links pointing at in-page anchors (Rock manuals, long single-page books). Splits between consecutive anchors. Authoritative.
   - `by-toc-pages` — hub page (e.g. `/Lava`, `/styling`) whose sidebar TOC links to many separate sub-pages. Fetches each linked page (with auth cookie) and emits one reference file per page. Default include filter = same-origin + pathname starts with hub pathname; override via `urlIncludes` globs.
   - `by-toc-links` — multi-page Rockumentation TOC walker.
   - `by-selector` — page is a catalog of repeated cards (e.g. `.panel-lavaitem`).
   - `by-heading` — markdown already has clean `^## ` boundaries.
   - `single` — one article per page.
3. **Make triggers specific.** `bestMatch` picks the longest static URL prefix; `default-defuddle` (`**`) is the catch-all. More-specific Rock templates beat it automatically.
4. **Register in `templates/index.ts`.**
5. **Verify**: skill folder name is meaningful, SKILL.md has a real Topics list, each reference contains real markdown (no "Partial conversion completed with errors" banner, no duplicated content from sibling chapters).

## Detection beyond URLs

Rockumentation is a JavaScript plugin churches install on their own servers — the URL host is unpredictable. [src/extract.ts](src/extract.ts) sniffs the raw HTML for `$('article').Rockumentation()` (and the `data-article-id` carousel) and upgrades the matched template from `default-defuddle` to `rockumentation-print` when it sees the marker. Add similar content sniffers — never URL-only checks — for any plugin-style template that may appear on third-party hosts.

## Skill validation

Every build runs [src/validate-skill.ts](src/validate-skill.ts) on the generated folder. Spec rules come from the upstream [`skills-ref`](https://pypi.org/project/skills-ref/) Python library — we shell out to its `agentskills validate` CLI so we stay in sync with the published Agent Skills spec instead of maintaining a hand-ported copy. The wrapper tries `agentskills` on PATH first, then `uvx --from skills-ref agentskills` (no install needed if `uv` is on PATH), then a small TS fallback so builds never silently skip validation.

On top of the spec rules we layer "skill is too thin" heuristics specific to this generator (short SKILL.md body, missing/empty `## Topics` list, references with <200 chars of body). Those live in `runLocalHeuristics` and are tagged `(heuristic)` in the formatted output. Errors fail the CLI with exit code 2; the server emits them on the SSE `complete` event and the UI surfaces them under each batch row.

Local development: install via `pipx install skills-ref` or rely on `uvx`. Docker: the Dockerfile installs `skills-ref` via `pipx` so production always uses the canonical validator.

When changing the generator, re-run `bun test` AND validate `./output` to confirm no regressions.

## Repo conventions

- Bun runtime — `bun test`, `bun run src/index.ts`, `bun --hot src/server.ts`. See [CLAUDE.md](CLAUDE.md).
- DOM access goes through `parseHTML`/`htmlToMarkdown` exported by [src/dom.ts](src/dom.ts) — defuddle's bundled Turndown requires the linkedom DOM globals shim installed there.
- After any splitter or generator change: run `bun test` AND re-run a real extraction (`bun run src/index.ts <url> --output ./output`) to verify the SKILL.md and references look right.

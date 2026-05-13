# TODO

Ideas and planned improvements for the Rockumentation Skill Builder.

## Features

- [ ] **Autopublish to a skill gallery (e.g. agentskills.io)**
  - Optional checkbox in the publish step to also push the skill to a public, third-party skill registry
  - Needs an account/API token field, stored per-user
  - Decide on metadata mapping (skill name, description, tags) and publish endpoint
- [ ] **Support the other Rock community doc types**
  - Currently targeted at the Rockumentation `printable` view
  - Add fetchers/extractors for: News articles, Showcase entries, Q&A threads, Blog posts, Release notes
  - Each source likely needs its own HTML parser; keep the rest of the pipeline shared
- [ ] **Installation instructions per agent**
  - On the build result and gallery detail pages, show a tabbed snippet for installing the skill into:
    Claude Code (`~/.claude/skills/`), Claude Desktop, Cursor, Continue.dev, etc.
  - Include the exact `git clone` / `cp -r` / drag-and-drop steps for each
- [ ] **View and download stats**
  - Track per-skill counters: page views, ZIP downloads, individual file views
  - Display on the gallery list (e.g. "↓ 142 · 👁 980") and on the detail page
  - Storage: a small KV/SQLite layer or counter objects in Tigris (atomic increments via conditional writes)
  - Privacy: aggregate only, no IP retention
- [ ] **Delete a skill from the gallery**
  - Owner-only delete action on the gallery detail page
  - Needs an ownership model — simplest: capture a delete token at publish time and surface it once in the result card with a "Save this to delete later" hint, or require a passphrase/email
  - Server route to remove the zip + meta + files prefix from object storage
- [ ] **Collapse multiple builds of the same source URL into a single gallery entry**
  - Group by `sourceUrl`; keep the entry but show a version history / list of revisions
  - Surface the latest by default, with a "previous versions" disclosure
  - Decide retention: keep all, or auto-prune after N revisions

## Polish / DX

- [ ] Search and tag filter on the gallery
- [ ] Rate limit `/api/build` and `/api/describe` to protect the server-side Anthropic key
- [ ] OpenGraph / Twitter card metadata on gallery detail pages
- [ ] Light mode

## Known Gaps

- Old gallery entries published before the build/publish split don't have individual files in storage — only the zip. Their detail page shows an empty file list.

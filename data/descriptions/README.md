# Curated reference descriptions

Each file in `data/descriptions/<skill-name>/<slug>.md` is a one- or
two-sentence description used by AI agents to decide whether to load
that reference. The file body is **just the description text** — no
frontmatter, no markdown structure.

## How they're used

- When `generateSkill` writes a new reference file, it seeds the
  description from this cache (per-file frontmatter in `output/...`
  always wins, so you can override per-build with manual edits).
- When you click *Generate descriptions* in the UI, every successful
  generation is written back here so the next contributor inherits it.

## How to contribute a better description

1. Open the file you want to improve from the *Manage skill* panel
   in the UI (each row has a `Suggest` button that links here).
2. Edit on GitHub, open a PR.
3. Keep it short, action-oriented, and keyword-rich — that's what
   makes Skills routing accurate.

Good shape: `"Use when user asks about <topic>; covers <subtopics>."`

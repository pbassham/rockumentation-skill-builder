# Rockumentation Skill Builder

A CLI tool that converts [Rock RMS](https://www.rockrms.com/) Rockumentation pages into [Agent Skills](https://agentskills.io/) directories — structured markdown that AI coding agents can use as reference documentation.

## What It Does

Point it at any Rockumentation URL and it will:

1. **Fetch** the full documentation page (using print mode to get all content)
2. **Extract** each article from the page, preserving the URL-based hierarchy (parent/child relationships)
3. **Convert** HTML to clean markdown with GFM support (tables, code blocks, etc.)
4. **Generate** an Agent Skills directory with:
   - `SKILL.md` — overview with YAML frontmatter and a hierarchical table of contents
   - `references/` — one markdown file per article, each with a breadcrumb path showing where it fits in the hierarchy

## Install

Requires [Bun](https://bun.sh/).

```bash
git clone <repo-url>
cd rockumentation-skill-builder
bun install
```

## Usage

```bash
bun run src/index.ts <rockumentation-url> [--output <dir>]
```

### Examples

```bash
# Developer Codex (103 articles)
bun run src/index.ts https://community.rockrms.com/developer/developer-codex

# Mobile Docs (259 articles)
bun run src/index.ts https://community.rockrms.com/developer/mobile-docs

# Custom output directory
bun run src/index.ts https://community.rockrms.com/lava -o ./skills
```

Output lands in `./output/<skill-name>/` by default.

### Output Structure

```
output/rock-developer-codex/
├── SKILL.md                          # Overview + hierarchical TOC
└── references/
    ├── coding-standards.md           # > Path: Developer Codex > Coding Standards
    ├── rules.md                      # > Path: Developer Codex > Coding Standards > Rules
    ├── naming-conventions.md
    ├── c.md                          # > Path: ... > Naming Conventions > C#
    └── ...
```

Each reference file includes a breadcrumb at the top so the agent knows the article's context:

```markdown
> **Path:** Developer Codex > Coding Standards > Rules

# Rules

The following rules have been agreed to by all those who "Code for Core"...
```

## Using the Generated Skill

Copy the generated skill directory into your AI agent's skills folder. The `SKILL.md` frontmatter and hierarchical TOC give the agent structured access to the full documentation.

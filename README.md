# Rockumentation Skill Builder

A tool that converts [Rock RMS](https://www.rockrms.com/) Rockumentation pages into [Agent Skills](https://agentskills.io/) directories — structured markdown that AI coding agents can use as reference documentation.

**🌐 Live at [rockumentation-skill-builder.fly.dev](https://rockumentation-skill-builder.fly.dev/)** — use the hosted version to build skills, browse the public gallery of community-shared skills, and publish your own.

Also available as a local web UI or CLI — see below.

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

## Web UI

```bash
bun run ui
```

Opens at [http://localhost:3456](http://localhost:3456). Enter a Rockumentation URL, choose an output directory, and optionally add custom instructions to include in the generated skill. Progress streams in real time.

For private docs behind a login, expand the "Login for Private Docs" section and enter your Rock RMS username and password. Credentials are sent directly to the Rock site and are never stored.

For development with hot reload:

```bash
bun run dev
```

## CLI

```bash
bun run cli <rockumentation-url> [options]
```

### Options

| Flag                        | Short | Description                                                                                               |
| --------------------------- | ----- | --------------------------------------------------------------------------------------------------------- |
| `--output <dir>`            | `-o`  | Output directory (default: `./output`)                                                                    |
| `--username <user>`         | `-u`  | Rock RMS username for private docs                                                                        |
| `--password <pass>`         | `-p`  | Rock RMS password                                                                                         |
| `--merge-threshold <lines>` | `-m`  | Merge leaf articles shorter than this many lines into their parent reference file (default: 0 = disabled) |

### Examples

```bash
# Developer Codex (103 articles)
bun run cli https://community.rockrms.com/developer/developer-codex

# Mobile Docs with merging (reduces 258 files to ~133)
bun run cli https://community.rockrms.com/developer/mobile-docs -m 50

# Custom output directory
bun run cli https://community.rockrms.com/lava -o ./skills

# Private docs (requires login)
bun run cli https://rock.example.com/rockumentation/internal-docs -u myuser -p 'mypassword'
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

## Staying Under File Limits

Some platforms (e.g. Claude.ai) limit skills to 200 files. For large documentation sites, there are two strategies:

### Merge Small Articles

Use `--merge-threshold` (CLI) or the "Merge Threshold" field (UI) to automatically merge short leaf articles into their parent reference file. Merged articles appear as `## Title {#slug}` subsections within the parent file, and the TOC links to the anchor.

```bash
# Merge articles under 50 lines into their parents
bun run cli https://community.rockrms.com/developer/mobile-docs -m 50
```

On rebuild, stale reference files from previously-separate articles are automatically cleaned up.

### Split Into Multiple Skills

If merging alone isn't enough, use the **Split Skill** panel in the web UI to extract top-level categories into separate skills. After a build, the UI shows each category with its file count — check the ones you want to extract and click "Split Selected." Each extracted category becomes its own skill directory alongside the original, with its own SKILL.md and references.

## AI Descriptions

Reference files can have AI-generated descriptions that tell the agent when to use each file. These are stored as YAML frontmatter in each reference file and appear in the SKILL.md table of contents.

To generate descriptions:

1. Set `ANTHROPIC_API_KEY` in a `.env` file, or enter it in the UI's "AI Settings" section
2. After a build, use the "Reference Descriptions" panel to generate missing descriptions or regenerate all
3. Descriptions are preserved across rebuilds

## ZIP Export

After building a skill, click "Download ZIP" in the result card to get a ready-to-upload archive containing `SKILL.md` and the `references/` directory.

## Public Gallery (hosted version)

The hosted instance at [rockumentation-skill-builder.fly.dev](https://rockumentation-skill-builder.fly.dev/) lets you publish your generated skill so others can browse and download it. After building a skill, click **Publish to Gallery** — the skill (zip + individual files) is uploaded to object storage and a permanent shareable link is returned.

Browse the public gallery at [/gallery](https://rockumentation-skill-builder.fly.dev/gallery).

## Deploying Your Own

The project ships with a `Dockerfile` and `fly.toml` for [Fly.io](https://fly.io/). To deploy your own:

```bash
fly launch --no-deploy   # accept the existing fly.toml
fly deploy
```

For the public gallery feature, provision Tigris object storage (free tier) and set the Anthropic key:

```bash
fly storage create               # auto-injects AWS_* + BUCKET_NAME secrets
fly secrets set ANTHROPIC_API_KEY=sk-ant-...
fly deploy
```

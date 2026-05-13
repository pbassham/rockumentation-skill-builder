# Templates

Templates declare _how to extract a clean Markdown skill from an HTML page_. They are TypeScript modules in this directory; the registry in [`index.ts`](./index.ts) auto-exposes them to the CLI, server, and UI.

A template mirrors the [obsidian-clipper](https://github.com/obsidianmd/obsidian-clipper) shape with two additions:

- **`splitter`** — chooses how one page becomes 1..N articles.
- **`interpreterPipeline`** — an ordered list of LLM steps whose outputs feed back into the template via `{{step:<id>}}` placeholders.

## DSL

Placeholders are `{{ … }}`. Three node kinds are recognized:

| Node         | Example                            | Notes                                                                                  |
| ------------ | ---------------------------------- | -------------------------------------------------------------------------------------- |
| Variable     | `{{title}}`                        | Lookup; supports dotted paths (`{{meta.author}}`).                                     |
| Step output  | `{{step:find-content}}`            | Reads from a previous interpreter step.                                                |
| Prompt sugar | `{{prompt:"Summarize this page"}}` | Compatibility with obsidian-clipper. Compiled into a single trailing batched LLM call. |

Filters chain with `|`:

```
{{fullHtml|selectorHtml:".center-container"|remove_html:".alert,.footer"|markdown|replace:("xaml":"xml")}}
```

### Built-in filters

- `selector:".sel"` / `selectorHtml:".sel"` — DOM scoping (linkedom).
- `remove_html:".sel,.sel2"` — strip elements matching the selector list.
- `remove_attr:("style":".panel-body")` — strip an attribute scoped to a selector.
- `remove_attr:("style","class")` / `remove_attr:"style"` — strip attribute(s) globally.
- `strip_tags` / `strip_attr` — variants.
- `replace:("xaml":"xml","XAMLCopy":"")` — literal map replacement.
- `regex_replace:"pattern","repl"` — global regex replace.
- `markdown` — convert HTML → Markdown (defuddle's converter).
- `absolutize` — rewrite root-relative `href`/`src` to absolute URLs (uses page origin).
- `trim` / `lower` / `upper` / `slug` / `wikilink` / `domain` — text helpers.

## Variables

Built by `src/extractors/defuddle.ts`:

`content`, `contentMarkdown`, `fullHtml`, `title`, `author`, `description`, `published`, `image`, `domain`, `site`, `language`, `wordCount`, `favicon`, `meta.<name>`, `schema.<path>`, `url`, `baseOrigin`, `date`, `now`.

Pipeline outputs are exposed as `{{step:<outputAs>}}` and as bare `{{<outputAs>}}` after the pipeline runs.

## Splitters

| Id             | Behavior                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------- |
| `single`       | Render `noteContentFormat` once.                                                                  |
| `by-heading`   | Split rendered Markdown on `## ` (configurable level).                                            |
| `by-toc-links` | Walk `.left-container` TOC; emit one article per `data-article-id`. (Rockumentation print pages.) |
| `interpreter`  | Read a JSON `{ articles: [...] }` from a named pipeline step.                                     |

## Multi-stage interpreter

```ts
interpreterPipeline: [
  { id: "find-content",     prompt: "...", outputAs: "selector",  outputFormat: "text" },
  { id: "convert-to-skill", prompt: "Use {{step:find-content}}...", outputAs: "convert-to-skill", outputFormat: "markdown" },
],
noteContentFormat: "{{step:convert-to-skill}}",
```

Each step picks its model from `step.modelId` → `InterpreterSettings.defaultModelByRole[outputAs]` → `defaultModelId`. Settings live in `./config/interpreter.json` (gitignored), seeded from `ANTHROPIC_API_KEY` / `OPENAI_API_KEY` / `OLLAMA_BASE_URL` on first run.

## Triggers

- Glob: `https://community.rockrms.com/lava/**`
- Regex (prefix `r:`): `r:^https?://example\\.com/.*`

The most-specific match wins (longest static prefix).

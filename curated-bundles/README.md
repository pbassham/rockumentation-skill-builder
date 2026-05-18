# curated-bundles

Tracked source of truth for curated skill bundles. Each subdirectory is
one bundle (matching the `name` field in `src/curated-roots.ts`) and
contains its `SKILL.md` plus `references/` directory.

These files are written by:

- The weekly cron (`refreshAllCurated`) — pulls fresh source markdown,
  preserves user-edited descriptions and any hand-written prose above
  `## Topics`, and commits any actual diff.
- The "Save & Publish" button in the curated bundle editor.

Both paths use `mergeReferenceMarkdown` / `mergeSkillMarkdown` from
`src/merge-curated.ts` so existing descriptions and customizations
survive a refresh.

The Fly deploy workflow has `paths-ignore: ['curated-bundles/**']` so
bot commits to this directory do not trigger a redeploy loop.

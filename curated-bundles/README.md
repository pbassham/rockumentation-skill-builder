# curated-bundles

Tracked source of truth for curated skill bundles. Each bundle
(matching the `name` field in `src/curated-roots.ts`) contains its
`SKILL.md` plus `references/` directory.

## Layout — one folder per Rock version

Rock rebuilt its documentation site for v19+, so bundles are organized
by the Rock release they document:

- `v18/` — bundles built from the legacy
  `/documentation/bookcontent/...` books (Rock v18 and earlier):
  `rock-user`, `rock-administration`, `rock-hosting`. Refreshed on a
  **monthly** cadence — old docs still receive fixes, just rarely.
- `v19/` — bundles built from the new topic books
  (`/documentation/core-concepts`, `church-management`, `engagement`,
  `digital-publishing`, `supporting-rock`). Refreshed **weekly**.
- top level — version-agnostic living bundles built from hub pages
  (`/Lava`, `/developer/*`): `rock-advanced`, `rock-mobile`,
  `rock-developer`. Refreshed weekly.

Pick the folder matching the Rock version you run; skill names stay the
same across versions. When a new Rock release ships, its bundles get a
new `v<n>/` folder and the outgoing version drops to the monthly
cadence (`rockVersion` / `refreshCadence` in `src/curated-roots.ts`).

## How these files are written

- The weekly cron (`refreshAllCurated`) — pulls fresh source markdown,
  preserves user-edited descriptions and any hand-written prose above
  `## Topics`, and commits any actual diff. Monthly-cadence bundles are
  skipped until their `metadata.generatedAt` stamp is ≥30 days old.
- The "Save & Publish" button in the curated bundle editor.

Both paths use `mergeReferenceMarkdown` / `mergeSkillMarkdown` from
`src/merge-curated.ts` so existing descriptions and customizations
survive a refresh.

The Fly deploy workflow has `paths-ignore: ['curated-bundles/**']` so
bot commits to this directory do not trigger a redeploy loop.

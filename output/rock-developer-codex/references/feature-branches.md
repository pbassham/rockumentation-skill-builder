> **Path:** Developer Codex > Coding Standards > Feature Branches

# Feature Branches

When working on larger projects use a feature branch. This allows changes to be fully vetted and polished before being placed into the develop branch. It also helps to reduce the number of migrations needed as tweaks are made. When merging your feature branch, you’ll want to smash your migrations into a single new migration in the develop branch.

Feature branches should follow the naming standard: <type>-<initials>-<base branch>-<description>

Type: This could be one of “feature”, “bugfix”, or “pr”

Initials: This should be your own initials

Base Branch: This is the branch that you branched off

Description: This describes what changes you are making

**Example**: `feature-je-develop-shortcodes`

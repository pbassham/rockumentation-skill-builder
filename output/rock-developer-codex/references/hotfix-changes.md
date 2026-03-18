> **Path:** Developer Codex > Coding Standards > Hotfix Changes

# Hotfix Changes

If the change in the hotfix branch included a migration, avoid model changes. Migrations should be a Plugin migration and it should be stored in the Rock\\Plugin\\HotFixes folder.

When making changes in a hotfix branch it is important to do the following after committing your code to the hotfix branch:

-   Switch to the develop branch and merge the changes from hotfix branch into develop and resolve any merge conflicts.
-   If the change in the hotfix branch included a plugin migration, that migration code should be commented out in the develop branch and added to a normal EF migration or as a migration roll-up. It’s likely that customers will run your migration first in the hotfix branch, and then again when they do the next major update from the EF migration. Because of this, make sure that when adding the migration to the normal EF migration that it accounts for this possibility and will run a second time without causing any issues.
-   Test the changes (and migration) in the develop branch.

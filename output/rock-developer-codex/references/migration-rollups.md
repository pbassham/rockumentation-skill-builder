> **Path:** Developer Codex > Coding Standards > Writing Migrations > Migration Rollups

# Migration Rollups

Follow these rules when creating a migration for tasks in “Migration Rollups":

-   Each task from rollups should have its own method, which is called in Up()
-   For plugin migrations the method name should follow the template `P<###>_<BriefTopicDescription>`. Example: P132\_CheckinClientInstaller.
-   Include the Asana migration rollup task title in the method's comment
-   Indicate which file(s) the migration was created in on the asana task

> **Path:** Developer Codex > Coding Standards > Writing Migrations > General Rules

# General Rules

-   **Never** modify an existing migration unless Jon or the DSD have given explicit instructions and always add a
-   AttributeValue Guids are **NOT reliable** and can’t be used as a way to find an existing block’s setting value.
-   When writing migrations that could take a while (e.g. updating a lot of data) do this in the form of a Post Update - Rock Update Helper (aka “Run Once”) job instead of a typical migration. (See Rock Update Helper below for more details).
    -   Because adding an index to an existing, large table can take a long time (
-   To improve readability encapsulate each migration feature into its own method and call them in Up()
-   ALL migrations must be able to run multiple times without causing adverse effects.
-   Stored Procedures, Functions, and long SQL scripts should be in a file rather than using in-line SQL. The file is put into a resource and then called from that resource. See the [202 – Ignition guide for details](https://www.rockrms.com/Rock/Developer/BookContent/17/17#migrationresources) on doing this.
-   Create an accompanying “Down” migration when possible.
-   Use CodeGen\_PagesBlocksAttributesMigration.sql to help write migrations that involve new pages, blocks, blocktypes.
-   Put “Up” migrations created by CodeGen\_PagesBlocksAttributesMigration.sql in their own method called "CodeGenMigrationsUp()", which is called in Up()
-   Put “Down” migrations created by CodeGen\_PagesBlocksAttributesMigration.sql in their own method called "CodeGenMigrationsDown()”, which is called in Down()
-   The code copied/pasted from CodeGen\_PagesBlocksAttributesMigration.sql should not be updated to use Rock.SystemGuid’s.
-   Rock.SystemGuid.\* classes are sometimes used in migrations, so they should not be deleted or modified. Instead, decorate them with Obsolete until the next giant migration squish.
-   Do not use RockContext in EF Migrations. RockContext can’t be used until all the EF Migrations have been completed. Otherwise, RockContext operations will throw an error because the schema doesn’t match.
-   When registering Mobile or Obsidian block types, be sure to register its underlying EntityType first using `UpdateEntityType()` with a well-known Guid. Then register the block type using `RockMigrationHelper.AddOrUpdateEntityBlockType()` with its own well-known Guid.

Field names in the Rock.Data. MigrationHelper methods should not be changed. A new method should be created with the correct field names and the method with the old field names should be deprecated, and any calls to the deprecated method should be wrapped with #pragma warning disable 0618 and #pragma warning restore 0618 compiler directives.

> Follow the process below if there is a migration with an error and a fix is needed. The process changes a bit depending on when the fix is needed. This is because some customers are running against the pre-alpha-release branch.

![](https://sparkdevnetwork.gitbook.io/rock-developer-codex/~gitbook/image?url=https%3A%2F%2Fstatic.slab.com%2Fprod%2Fuploads%2F3xqnyj9y%2Fposts%2Fimages%2FySyXNZIb9lQ-nK-Kfv2fKUNv.png&width=768&dpr=4&quality=100&sign=679807fa&sv=2)

1.  Develop – if the change is found before it has been added to the ‘pre-alpha-stage-release’ branch do the following:
2.  ~Pre-alpha-stage – If the change was found after being merged into ‘pre-alpha-stage’ but before ‘pre-alpha-release’:~
3.  Pre-alpha-release – If the change was found post merge into the pre-alpha-release then bring it to the technical architect to determine the path forward. This will in most cases be brought to the developer discussion meeting.

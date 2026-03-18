> **Path:** Developer Codex > Coding Standards > Obsidian Chop, Swap, Sneak > Process to Chop or Swap

# Process to Chop or Swap

When it comes time to replace an existing, production webforms block with a new Obsidian block, there are a few things to consider. Depending on the answers to these questions you are either dealing with a simple case or a complex case.

-   Do the BlockType Attribute's Keys (and underlying values) match 100%?
    -   If they do not, it is a complex case.
-   If it's being Chopped, was it previously **Swapped** or **Sneaked**?
    -   If so, it's a complex case.

## Simple Case: Follow a Process

### If Chop (first time only)

1.  Replace Obsidian block's BlockTypeGuid with the one in the webforms block:
    1.  `// was [Rock.SystemGuid.BlockTypeGuid( *{Original Obsidian GUID}* )]`
    2.  `[Rock.SystemGuid.BlockTypeGuid( *{Original WebForms GUID}* )]`
2.  Uncomment `[SupportedSiteTypes( Model.SiteType.Web )]`
3.  WebForms block:
    1.  Delete it from the repo
4.  Commit and push changes

### If Swap

1.  Replace Obsidian block's BlockTypeGuid with the one in the webforms block:
    1.  `// was [Rock.SystemGuid.BlockTypeGuid( *{Original Obsidian GUID*} )]`
    2.  `[Rock.SystemGuid.BlockTypeGuid( *{Original WebForms GUID}* )]`
2.  Uncomment `[SupportedSiteTypes( Model.SiteType.Web )]`
3.  WebForms block:
    1.  Update and comment out the old Guid and add a new ***new*** well-known Guid
        1.  `// was[Rock.SystemGuid.BlockTypeGuid( *{Original WebForms GUID}* )]`
        2.  `[Rock.SystemGuid.BlockTypeGuid( *{NEW WELL KNOWN WebForms GUID}* )]`
4.  Commit and push changes

## Complex Case: Using the Job

The RockMigrationHelper.ReplaceWebformsWithObsidianBlockMigration(…) helper will create a job that performs either a chop or swap of a block type. This helper method will create a `Rock.Jobs.PostUpdateDataMigrationsReplaceWebFormsBlocksWithObsidianBlocks` job that performs the chop/swap. It is used like this:

```csharp
RockMigrationHelper.ReplaceWebformsWithObsidianBlockMigration(
    "Chop <or Swap> <Description of item(s) being chopped/swapped>",
    blockTypeReplacements: new Dictionary<string, string> {
        { "ABC123-1111-1111-1111-111111111111", "DEF456-2222-2222-2222-222222222222" }
    },
    migrationStrategy: "Chop", // or "Swap"
    jobGuid: "<New GUID of Job Instance that will run to execute the chop>"  );
```

Where the first Guid (ABC123-…) is the block type of the original block being replaced and the second Guid (DEF456-…) is the new block type to replace the original with.

When you are ready to chop/swap your Obsidian block follow these steps:

1.  Backup your local database
2.  Test locally by simply adding a throw-away Rock\\Plugin\\HotFixes\\###\_TEMP\_TEST\_CHOP-or-SWAP.cs
3.  Start Rock and then manually run the job that got created
    1.  Verify that the original block instances were replaced with the new block type and the block settings were all copied over.
    2.  (if chop) Verify that the old block type files and \[BlockType\] record were deleted.
4.  If successful…
    1.  Create a sub-task in your conversion task called "Chop: <block type name>"
    2.  Put the contents of your `ReplaceWebformsWithObsidianBlockMigration(..)`into the description field.
    3.  Copy the link to that sub-task and paste it into the [v17 Chop: Merge Sets of Obsidian Blocks to develop and Chop Migration (v17)](https://app.asana.com/0/1202219145039915/1205224310208486)
    4.  Restore your database (for cleanup purposes).
5.  ~Later, when the Pre-Alpha Release is packaged, the *packager*~ \[You\] will:
    1.  ~Move your old/new block type Guids with all the others into new post-update (See [Post Update / Run Once Job](https://community.rockrms.com/developer/developer-codex/coding-standards/writing-migrations/post-update-rock-update-helper-for-migrating)) ReplaceWebformsWithObsidianBlockMigration data migration job.~
    2.  Add the job to the Rock.Migrations.RockStartup.DataMigrationStartup.OnStartup() method.
    3.  Run the job and (if chop) verify the files were deleted.
    4.  (if chop) ~The packager~ \[You\] will commit the deletion of those files since they are now considered 'chopped'. ~(Note: these files will not be added to the official release package's `deletefile.lst`so that they are not prematurely deleted upon update but instead will be deleted by the post-update job.~

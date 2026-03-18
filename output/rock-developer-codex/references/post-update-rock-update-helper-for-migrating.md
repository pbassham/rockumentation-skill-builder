> **Path:** Developer Codex > Coding Standards > Writing Migrations > Post-Update / Rock Update Helper (For Migrating Data)

# Post-Update / Rock Update Helper (For Migrating Data)

*Also known internally as a “Run Once Job”, this job performs data moving as necessary for a particular Rock update/release.*

When you have the need to migrate data but cannot do it in a regular EF migration or Hotfix/Plugin data migration (possibly due to the length of time it takes to run), you can create a custom job that will run after Rock starts.

1.  Create a new Job in the Rock.Jobs namespace.
2.  Add a new well-known Guid to the Rock.SystemGuid.ServiceJob class with the naming convention “DATA\_MIGRATIONS\_\_TOPIC” (e.g. `DATA_MIGRATIONS_150_SYSTEM_PHONE_NUMBERS`).
3.  Register the job to be run immediately on startup by adding its well-known Guid to the runOnceJobGuids collection within the Rock.Migrations.RockStartup.DataMigrationStartup.OnStartup() method. (Example [as seen here](https://github.com/SparkDevNetwork/Rock/blob/f570b9dfe1b0350aad0835791e166e54f9f02913/Rock.Migrations/RockStartup/DataMigrationsStartup.cs#L1))
4.  Create a migration to add a new \[ServiceJob\] record. (This is the job you registered in step 3.) It will run on startup:
    1.  The method [AddPostUpdateServiceJob](https://github.com/SparkDevNetwork/Rock/blob/1973a2b26a1a7b5667932f6f4a99ac909aa0c5e9/Rock/Data/MigrationHelper.cs#L8265) in the MigrationHelper class may be used to register the Rock Update Job. For example:

```csharp
RockMigrationHelper.AddPostUpdateServiceJob( 
                name: "Rock Update Helper v15.2 - Replace WebForms Blocks with Obsidian Blocks",
                description: "This job will replace WebForms blocks with their Obsidian blocks on all sites, pages, and layouts.",
                jobType: FullyQualifiedJobClassName,
                cronExpression: "0 0 21 1/1 * ? *",
                guid: Rock.SystemGuid.ServiceJob.DATA_MIGRATIONS_152_REPLACE_WEB_FORMS_BLOCKS_WITH_OBSIDIAN_BLOCKS
            );
```

-   If working in a hotfix branch, the migration should be added as a plugin migration (see the “Hotfix Changes” section within this codex).
-   If working in the develop branch – or wherever the migration token currently resides – the migration should be added as a proper EF migration.

> **Path:** Developer Codex > Coding Standards > Bypassing Entity Framework 'Save' Conventions

# Bypassing Entity Framework 'Save' Conventions

In order to improve the performance of certain queries, we have written them in pure SQL. However, doing so bypasses the Pre-Save and Post-Save operations within Entity Framework. To document this, we must add an [Engineering Note](https://community.rockrms.com/developer/developer-codex/coding-standards/documenting-code#engineering-notes) within the SaveHook namespace for each model that is bypassed.

Please use the opening text as a template, and then list the locations were the EF operations are not called because of a direct SQL query.

```csharp
/*
     [DD/MM/YYYY] - [YOUR INITIALS]

     The following areas of Rock bypass the pre and post save actions
     for [MODEL_NAME]. Be aware that any code you put in here might not
     execute under these situations:
     
        - The Stale Anonymous Visitor stage of the RockCleanup job.
        - etc.

     Reason: Performance
*/
```

[An example commit using this kind of change and note addition.](https://github.com/SparkDevNetwork/Rock/commit/17f37a30b52059daa44f44e90b56793d22f33811#diff-645816f28a68e87def1e9dbd89e58a22e6a01eb0e6d65c1fb5e6768fcaeadd56)

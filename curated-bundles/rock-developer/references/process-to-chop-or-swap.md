---
description: "Use when migrating production WebForms blocks to Obsidian blocks, determining if replacement is simple or complex, and executing chop or swap operations"
source: "https://community.rockrms.com/developer/developer-codex"
sourceLabel: Developer Codex
---
> **Path:** 

When it comes time to replace an existing, production webforms block with a new Obsidian block, there are a few things to consider. Depending on the answers to these questions you are either dealing with a simple case or a complex case.

- Do the BlockType Attribute's Keys (and underlying values) match 100%?
	- If they do not, it is a complex case.
- If it's being Chopped, was it previously **Swapped** or **Sneaked**?
	- If so, it's a complex case.

## Simple Case: Follow a Process

### If Chop (first time only)

1. Replace Obsidian block's BlockTypeGuid with the one in the webforms block:
	1. `// was [Rock.SystemGuid.BlockTypeGuid( *{Original Obsidian GUID}* )] `
		2. `[Rock.SystemGuid.BlockTypeGuid( *{Original WebForms GUID}* )]`
2. Uncomment `[SupportedSiteTypes( Model.SiteType.Web )]`
3. WebForms block:
	1. Delete it from the repo
4. Commit and push changes

### If Swap

1. Replace Obsidian block's BlockTypeGuid with the one in the webforms block:
	1. `// was [Rock.SystemGuid.BlockTypeGuid( *{Original Obsidian GUID*} )] `
		2. `[Rock.SystemGuid.BlockTypeGuid( *{Original WebForms GUID}* )]`
2. Uncomment `[SupportedSiteTypes( Model.SiteType.Web )] `
3. WebForms block:
	1. Update and comment out the old Guid and add a new ***new*** well-known Guid
		1. `// was[Rock.SystemGuid.BlockTypeGuid( *{Original WebForms GUID}* )]`
				2. `[Rock.SystemGuid.BlockTypeGuid( *{NEW WELL KNOWN WebForms GUID}* )] `
4. Commit and push changes

## Complex Case: Using the Job

The RockMigrationHelper.ReplaceWebformsWithObsidianBlockMigration(…) helper will create a job that performs either a chop or swap of a block type. This helper method will create a `Rock.Jobs.PostUpdateDataMigrationsReplaceWebFormsBlocksWithObsidianBlocks` job that performs the chop/swap. It is used like this:

```
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

1. Backup your local database
2. Test locally by simply adding a throw-away Rock\\Plugin\\HotFixes\\###\_TEMP\_TEST\_CHOP-or-SWAP.cs
3. Start Rock and then manually run the job that got created
	1. Verify that the original block instances were replaced with the new block type and the block settings were all copied over.
		2. (if chop) Verify that the old block type files and \[BlockType\] record were deleted.
4. If successful…
	1. Create a sub-task in your conversion task called "Chop: <block type name\>"
		2. Put the contents of your `ReplaceWebformsWithObsidianBlockMigration(..)`into the description field.
		3. Copy the link to that sub-task and paste it into the [v17 Chop: Merge Sets of Obsidian Blocks to develop and Chop Migration (v17)](https://app.asana.com/0/1202219145039915/1205224310208486)
		4. Restore your database (for cleanup purposes).
5. ~~Later, when the Pre-Alpha Release is packaged, the *packager*~~ \[You\] will:
	1. ~~Move your old/new block type Guids with all the others into new post-update (See [Post Update / Run Once Job](https://community.rockrms.com/developer/developer-codex/coding-standards/writing-migrations/post-update-rock-update-helper-for-migrating)) ReplaceWebformsWithObsidianBlockMigration data migration job.~~
		2. Add the job to the Rock.Migrations.RockStartup.DataMigrationStartup.OnStartup() method.
		3. Run the job and (if chop) verify the files were deleted.
		4. (if chop) ~~The packager~~ \[You\] will commit the deletion of those files since they are now considered 'chopped'. ~~(Note: these files will not be added to the official release package's `deletefile.lst`so that they are not prematurely deleted upon update but instead will be deleted by the post-update job.~~

---

## Pre-Alpha Release Process for Developers {#pre-alpha-release-process-for-developers}

Once your feature / hotfix has been merged to develop, it will be merged into the upcoming "pre-alpha-release" within the next or following Tuesday.

Do the following:

1. Update the "Pre-Alpha Version: TBD" in your task (if the task has one).
	1. You will increment the current pre-aplha version by 1 revision you can get the current version from [https://prealpha.rocksolidchurchdemo.com](https://prealpha.rocksolidchurchdemo.com/).
		2. Example: The next pre-aplha version based on the image below would be 1.14.0.11 or 1.14.11

![](https://community.rockrms.com/GetImage.ashx?Id=66692)

click the Rock Information link from the tool bar at the bottom of the page.

![](https://community.rockrms.com/GetImage.ashx?Id=66693)

Rock Information

1. Assign a due date of that following Wednesday for the two sub-tasks:
	1. D: If Core Project, Verify Release Notes
		2. D: If Core Project, Test on Spark / Pre-Alpha
2. On that Wednesday, first thing in the morning, assign those two tasks and complete them (unless\*\*)
3. If success, assign this task to the DSD: "D: Assign to DSD for Closure"

---

## Verify Release Notes {#verify-release-notes}

Check the release notes here [https://admin.sparkdevnetwork.org/CoreDeveloperReleaseNotes](https://admin.sparkdevnetwork.org/CoreDeveloperReleaseNotes)

This involves just making sure your commit message made it in there.

If you don't see your release note, contact the person who performed the recent pre-alpha-release (or the DSD) to figure out why it did not make it into the release notes.

---

## Developer Discussion Decisions {#developer-discussion-decisions}

Any decision to be codified must be recorded here:

06/30/17 DT: Adding all bin files back to GitHub so that new dll’s are not missed during update package creation

---

## SQL Formatting {#sql-formatting}

This syntax is also in the Consulting Codex. If updating here please also make the same changes in that guide.

Whenever you need to write SQL for a migration, tool or for sharing in the community please use the following conventions.

Example

```
SELECT
  g.[Id]
  , g.[Name]
  , g.[Guid]
  , gt.[Name]
FROM
  [Group] g
  INNER JOIN [GroupType] gt ON gt.[Id] = g.[GroupTypeId]
WHERE
  gt.[Id] = 12

INSERT INTO [Group]
  ([Name], [IsSystem], [Guid])
VALUES
  (‘Ted Decker Group’, 0, ‘A55B9391-B673-4FBD-4691-63388F41533A’)

UPDATE [Group]
SET
  [Name] = ‘Ted Decker Group’
  , [IsSystem] = 0
WHERE [Id] = 12
```

Note the following:

- All keywords are upper case
- All tables and fields are enclosed in brackets (whether they are needed or not)
- Joins should use the JOIN clause (WHERE clauses are for filters only)
- [https://poorsql.com/](https://poorsql.com/) can be used to help format the SQL

---

## UI Standards {#ui-standards}

Since we currently lack a UI standards other than: use the Stark Detail and Stark List blocks as your template, here is the start of something more.

---

## Notification Boxes {#notification-boxes}

These should be placed at the top of the block inside the panel (beneath the panel heading) if there is one; otherwise place at the top below any title text the block may have.

![](https://community.rockrms.com/GetImage.ashx?Id=66694)

---

## Use of Bootstrap Grid/Row/Column {#use-of-bootstrap-gridrowcolumn}

You usually don't need to include extra `.row .col-md-12` divs as shown below:

```
<div class="row">
  <div class="col-md-12">
    ...
  </div>
</div>
```

(unless you need to use floats inside the column)

A bootstrap `row` has a margin of -15px, and a bootstrap column has a margin of 15px. The two divs effectively cancel each other, and are generally not needed inside of Rock blocks.

Example:

[https://codepen.io/garrettjohnson/pen/jOPWMpa?editors=1000](https://codepen.io/garrettjohnson/pen/jOPWMpa?editors=1000)

---

## Tips, Tricks, and Recommendations {#tips-tricks-and-recommendations}

# Tips, Tricks, and Recommendations

---

## LINQ Debugging {#linq-debugging}

When debugging some EF LINQ related thing, save yourself some time and add a temporary `**rockContext.SqlLogging(true)**;` before your LINQ results run (add a corresponding `**rockContext.SqlLogging(false)**;` after it). That will output the runnable SQL, number of SQL calls made, and the timing for each. It’s quite amazing.

```
/* Call# 1*/
/*
GetAttendanceData at offset 9658 in file:line:column d:\Misc\Rock\RockWeb\Blocks\Groups\GroupSchedulerAnalytics.ascx.cs:383:17
btnUpdate_Click at offset 109 in file:line:column d:\Misc\Rock\RockWeb\Blocks\Groups\GroupSchedulerAnalytics.ascx.cs:811:13
ProcessRequest at offset 49 in file:line:column c:\Windows\Microsoft.NET\Framework\v4.0.30319\Temporary ASP.NET Files\vs\47815ad5\220e6552\App_Web_a1fossi1.2.cs:0:0
*/
BEGIN

DECLARE
@p__linq__0 Int = 59,
@p__linq__1 DateTime2 = '4/22/2019 12:00:00 AM',
@p__linq__2 DateTime2 = '4/28/2019 11:59:59 PM'

SELECT 
    [Extent1].[Id] AS [Id], 
    [Extent1].[OccurrenceId] AS [OccurrenceId], 
    [Extent1].[PersonAliasId] AS [PersonAliasId], 
    [Extent1].[CampusId] AS [CampusId], 
    [Extent1].[DeviceId] AS [DeviceId], 
[… removed by editor]
    [Extent1].[ForeignGuid] AS [ForeignGuid], 
    [Extent1].[ForeignKey] AS [ForeignKey]
    FROM  [dbo].[Attendance] AS [Extent1]
    INNER JOIN [dbo].[AttendanceOccurrence] AS [Extent2] ON [Extent1].[OccurrenceId] = [Extent2].[Id]
    WHERE (1 = [Extent1].[RequestedToAttend]) AND (([Extent2].[GroupId] = @p__linq__0) OR (([Extent2].[GroupId] IS NULL) AND (@p__linq__0 IS NULL))) AND ((convert (datetime2, convert(varchar(255), [Extent1].[StartDateTime], 102) ,  102)) >= @p__linq__1) AND ((convert (datetime2, convert(varchar(255), [Extent1].[StartDateTime], 102) ,  102)) <= @p__linq__2)

END
GO

/* Call# 1: ElapsedTime [2.0246ms], SQLConnection.Statistics['ExecutionTime'] = [1ms] */
####SQLLogging Summary: _callCounts:1, _callMSTotal:2.0246, _callMSTotal/_callCounts:2.0
```

---

## Visual Studio Recommended Settings {#visual-studio-recommended-settings}

To reduce the amount of time to load and debug Rock in Visual Studio. You should set ‘Enable Diagnostic Tools while debugging’ to false, ‘Show elapsed time PerfTip while debugging’ to false, and ‘Enable IntelliTrace’ (Only available in some versions of Visual Studio). In Rock’s case, these can noticeably slow things down due to the large number of database roundtrips that Rock does to setup Attributes. However, if you need these features to help troubleshoot a performance issue, they can be turned on as needed.

![](https://community.rockrms.com/GetImage.ashx?Id=66695)

To enable editing of a block’s source when RockWeb is running, **disable** ‘Edit and Continue’ (Yes, disable it to make it work!)

![](https://community.rockrms.com/GetImage.ashx?Id=66697)

To reduce the amount of time that it takes to Build Rock (either on startup of a debug session or when doing a Build Solution), right click on the RockWeb project and select ‘Property Pages’ from the context menu to change RockWeb’s build settings. Set ‘Before running startup page’ to ‘Build Page’ and turn off ‘Build Web site as part of solution’. This will speed up builds significantly, but you’ll want to manually build the RockWeb project once in a while to make sure all the blocks compile. Note that the ‘Build Page’ option will also build the currently active UserControl (Rock Block) that you are editing.

![](https://community.rockrms.com/GetImage.ashx?Id=66698)

If you often get Out of Memory exceptions when debugging Rock, it could be caused by "overlapping" debug sessions (you temporarily have multiple instances of Rock running because one app domain is still shutting down). To help prevent this, you can add a 'Terminate All' button to your Debug menu and use that to stop debugging instead of the ‘Stop Debugging’ button.

![](https://community.rockrms.com/GetImage.ashx?Id=66699)

![](https://community.rockrms.com/GetImage.ashx?Id=66701)

VS will automatically format pasted text by default. This can be a problem when creating migrations containing lava or other text that should be left alone. Ctrl+Z will undo the correction. Alternatively, VS can be configured to not format pasted text. Under Tools \> Options \> Text Editor uncheck “Automatically format on paste”.

![](https://community.rockrms.com/GetImage.ashx?Id=66702)

Also, set up IIS Express to run in 64bit mode. This will also reduce memory issues and most closely matches production (regular IIS runs in 64bit mode by default)

![](https://community.rockrms.com/GetImage.ashx?Id=66703)

---

## GhostDoc Settings {#ghostdoc-settings}

To reduce the amount of time to load Rock in Visual Studio change the following settings for GhostDoc. Under **Tools \> GhostDoc \> Options**. (This reduced load time from 4:30 seconds to 11 seconds.)

![](https://community.rockrms.com/GetImage.ashx?Id=66704)

![](https://community.rockrms.com/GetImage.ashx?Id=66705)

![](https://community.rockrms.com/GetImage.ashx?Id=66706)

---

## SQL Database Recommended Settings {#sql-database-recommended-settings}

Please configure your local SQL databases to prevent using read-committed snapshots. Using snapshots in Rock while changing data can cause timeouts or errors when updating key constrained values. A programmer could find this issue when using a second `RockContext` in Rock while an existing `RockContext` is completing a (wrapped) transaction.

***In order to complete this, all connections to \[YOUR\_DB\_NAME\] need to be closed.***

Run the query `ALTER DATABASE [YOUR_DB_NAME] SET READ_COMMITTED_SNAPSHOT OFF`

or you can use *SQL Server Management Studio* to update your settings:

![](https://community.rockrms.com/GetImage.ashx?Id=66707)

Setting Read Committed Snapshot On to FALSE in SSMS

For further technical reading, [https://sqlperformance.com/2014/05/t-sql-queries/read-committed-snapshot-isolation](https://sqlperformance.com/2014/05/t-sql-queries/read-committed-snapshot-isolation).

---

## Logging {#logging}

Logging is an important part of writing a quality application. It can communicate issues to the user, help troubleshoot customer issues, and if not used correctly could bring the system to its knees. The current logging implementation takes ~8 microseconds to write something to the log file. This sounds fast, but if done inside a loop these times could add up fast. Your logging should be done with the RockLogger's Verbose, Debug, Information, Warning, Error, and Fatal methods and should almost always pass in the correct RockLogDomains constant. The majority of your logging should take place at the Verbose, Debug, and Information levels, because these levels will be actually written the least and have a smaller chance of unintentionally hurting performance. A logging call that doesn't physically write to log takes between 30 and 90 nanoseconds to complete, which isn't really a big deal, but again if done in a loop over a large data set could add up.

**DO**: Use the Verbose, Debug, Information, Warning, Error, and Fatal method calls.

**DO**: Pass the correct domain from RockLogDomains to the above method calls.

**DO**: Log the least amount of information necessary to achieve the desired result.

**AVOID**: Adding logging calls inside loops that could be large. If you do have to log in a loop consider using the Verbose log method.

**AVOID**: Using the RockLogger to log application exceptions. These should still use the ExceptionLog entity.

Usage Examples:

`RockLogger.Log.Warning( RockLogDomains.Jobs, $"No SMS message found in system communication {systemCommunication.Title}. All attendance reminders were sent via email.");`

`RockLogger.Log.Fatal( RockLogDomains.Communications, ex, "Foo was not able to send the bar-data during the foobar call." );`

---

## Installation Checklist {#installation-checklist}

*1.* SQL Server – Developer Edition (*Rock supports SQL Server 2016 and above so at least one person should be using 2016*)

- SQL Server Management Studio (v18.11.1) see [https://community.rockrms.com/developer/book/19/55/content#installingyourmicrosoftsqlserverdatabaseenvironment](https://community.rockrms.com/developer/book/19/55/content#installingyourmicrosoftsqlserverdatabaseenvironment)) You might also verify your "Retain CR/LF on copy or save" for the results grid.

![](https://community.rockrms.com/GetImage.ashx?Id=66708)

Optional: Azure Data Studio

2\. Visual Studio

- Visual Studio 2022 \[Version 17.7.4\] (for Rock v14 and newer)
	- Extension: GhostDoc
		- Extension: Visual Studio Spell Checker (VS2022)
		- Extension: Git Web Links (allows you to right-click in code and copy a link to the line in Github. (Be sure your have Git installed for Windows and that it is in your PATH). You can install it using the Visual Studio Extension Manager or from: [https://github.com/reduckted/GitWebLinks/tree/master/visual-studio](https://github.com/reduckted/GitWebLinks/tree/master/visual-studio))
- You will need to install these workloads: "ASP.NET and web development", "Node.js development", and maybe (??) ".NET desktop development" (try without it).

![](https://community.rockrms.com/GetImage.ashx?Id=66709)

3. SmartGit \[Version 22.1.7\] - see [these installation instructions](https://triumph.slab.com/posts/installing-smart-git-on-windows-vrshc3xc)

- You will also need to get your `license.lic` file from your manager or IT.
- In your Rock project's .git/config file, please add this line in bold:

> \[remote "origin"\]url = https://github.com/SparkDevNetwork/Rock.gitfetch = +refs/heads/\*:refs/remotes/origin/\*fetch = +refs/tags/\*:refs/tags/\*

4\. Other things to install

- Ngrok
- PaperCut ([https://github.com/ChangemakerStudios/Papercut](https://github.com/ChangemakerStudios/Papercut)) or SMTP4Dev
- [Zpl Printer Emulator (Chrome app/plugin)](https://chrome.google.com/webstore/detail/zpl-printer/phoidlklenidapnijkabnfdgmadlcmjo) for certain printer testing without using paper
- Node.js ([https://nodejs.org/en/download/](https://nodejs.org/en/download/))
- Optional
	- VS Code
		- Extension: REST Client by Huachao Mao

5. Update Windows Defender - Exclude your development directory from Windows Defender. This will increase your build and load times.

  How To: [https://www.youtube.com/watch?v=BonLkFNnO9w](https://www.youtube.com/watch?v=BonLkFNnO9w)

---

## Maintaining Compatibility {#maintaining-compatibility}

Maintaining code compatibility with previous versions of Rock within the established support window is extremely important, because we need to offer a predictable and stable operating environment for developers and users of third-party plugins.

For this reason, it's important to avoid any changes that would result in breaking backward-compatibility. The current policy for Rock development is that we should strive to maintain compatibility with the two previous major releases of the application. After this support window has passed, obsoleted methods will be removed from the code in the following release.

Do not break backwards compatibility unless instructed to do so, and only obsolete methods when agreed upon by the technical lead.

---

## Binary Compatibility {#binary-compatibility}

A source code change is considered binary-compatible if the compiler generates the same intermediate code (IL) for public declarations as the previous code. In this case, it can be used by a dependent component such as a plug-in without requiring that assembly to be rebuilt or altered in any way. It's important to understand that some code changes may be source-compatible so that they do not require any source-code changes in the dependent component, but still fail the test of binary compatibility because the component requires recompilation to work correctly.

---

## Tips for Maintaining Compatibility {#tips-for-maintaining-compatibility}

Be mindful of which classes, properties, methods, etc. that you declare as `public` or `protected`. There are a lot of things that need to be public (RockWeb needs it, another dll needs it, or a plugin developer would need it), but in many cases `internal` or `private` is the better choice and will avoid breaking changes.

Also be aware that code elements marked as `internal` are still available to be referenced in unit tests or integration tests, because the test projects are given access to the internals of other Rock assemblies using the `InternalsVisibleToAttribute`.

---

## Obsoleting a Type or Method {#obsoleting-a-type-or-method}

When it is necessary to obsolete a Type or Method because it has been superseded, apply both the .NET `[Obsolete(…)]` Attribute and the custom `[RockObsolete( "1.X" )]` Attribute. (where 1.X means the item is obsoleted as of Rock 1.X.0 (aka X.0))

When Obsoleting a method, add the reason why as an engineering note above the method (see Documenting Code).

---

## Compatibility FAQ {#compatibility-faq}

There are many ways in which backward compatibility can be broken, and the rules are not always clear because they may depend upon the circumstances. The purpose of this section is to document scenarios that have been encountered and tested in Rock, to provide some guidance for developers making similar changes in the future.

As a general rule, any changes that alter the existing public surface area of a type will violate the requirement for backwards compatibility.

**Q. Can I add Optional Parameters to an Existing Method?**

**A**. No. Any change that alters the signature of a public or protected method will break code compiled using the previous assembly. Instead, add the new method signature with the original one intact. Keep in mind that plugins do not get re-compiled as often as core.

**Q. Can I remove the "virtual" modifier from a public method or property?**

**A**. Sometimes. Removing the virtual modifier will break compatibility for any derived classes that override the method or property, but not where the usage is a simple reference. This change may be justified in circumstances where an override is highly unlikely, and renaming the property or method is undesirable - for example, where a calculated property on a data model is modified to map directly to a database column.

Old Declaration (calculated field)

`public virtual DateTime? NextStartDateTime { get; }`

New Declaration (database column)

`public DateTime? NextStartDateTime { get; set; }`

**Q. How can I test for binary compatibility?**

**A**. One method of testing if a code change is binary compatible is to create a test plugin project containing some sample code (such as a Lava filter) that references the property or method you are testing and produces some verifiable output. Compile the plugin and reference it from RockWeb, then make the code change and rebuild the Rock application with the changes. Confirm binary compatibility by verifying that the plugin loads and produces the same output with the code changes.

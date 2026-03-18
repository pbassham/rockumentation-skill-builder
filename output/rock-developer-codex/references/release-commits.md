> **Path:** Developer Codex > Coding Standards > Committing Code > Release Commits [+]

# Release Commits \[+\]

These represent commits that should be noted in the release notes.

**Release Commit Intent**

-   Target your writing for Alisha Marble, not a developer.
-   The message should be centered around what changed in Rock, and not what changed in code.

**Release Commit Structure**

-   Your commit message should be a complete sentence with a period at the end, but before any Fixes notes.
-   Must start with a `+`
-   After the plus sign, include the within parentheses. For example: `(CMS)`, `(Check-in)`, `(Reporting)`. (see [Release Notes](https://admin.sparkdevnetwork.org/CoreDeveloperReleaseNotes) for full list)
-   After that, the first word in your commit message should be a *Leading Keyword* (see below).

| Intent | Leading Keyword | Description | Examples |
| --- | --- | --- | --- |
| Improved | Improve, Improves, Improved, Update, Updates, Updated | Should be used when increasing the capability of an existing feature. | \- (Reporting) Improved the speed of Attendance Analytics by 30%. Updated Font Awesome to version 4.7.   
  
\+ (Core) Improved the database index fill factor from 80% from 100% to reduce table size and improve maintenance performance. In the past, this was changed due to a common practice of reserving space to reduce page splits int he tables but, upon further research, it is an industry recommendation to fill the pages to 100% to reduce database footprint and improve maintenance task performance.  
  
\+ (Workflow) Updated the Member Attended Group workflow trigger type on groups and group types to also optionally set an attendance date attribute. |
| Added | Add, Adds, Added | Should be used when adding a new feature to Rock, or when adding a new capability to an existing feature. | \+ (Lava) Added a new NearestGroups Lava filter that returns a list of the closest groups to an individual. Optionally, you can provide a specific geopoint (e.g. '33.58622,-112.135094') to find nearby groups.  
  
 - Added a new block to display communications in the queue to be sent. Added to Giving Analytics the ability to display transactions from any Tax Deductible account rather than just transactions that have a type of "contribution".   
  
  
 |
| Fixed | Fix, Fixes, Fixed | Used for all bug fixes. Be sure to accurately describe the fix and what was affected. | \+ (Core) Fixed misspelled 'amount' in NumberBox validation message. (Fixes #2214) Another more complex example:   
  
\+ (Lava) Fixed 'content channel view' block to no longer break when invalid Lava is provided (now it politely tells you that your Lava doesn't make the grade). (Fixes #2078) |

-   If the commit fixes an issue, make sure to add the “Fixes” note to the end of your commit message so that the commit is automatically linked to the issue in GitHub and the issue gets automatically closed. The issue number should be at the end of the line in parentheses. For example:

\+ (Workflow) Fixed issue where Person Entry Form replaced the person FirstName as the NickName in the database. **(Fixes #6305)**

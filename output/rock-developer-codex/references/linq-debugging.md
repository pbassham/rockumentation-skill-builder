> **Path:** Developer Codex > Coding Standards > Tips, Tricks, and Recommendations > LINQ Debugging

# LINQ Debugging

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

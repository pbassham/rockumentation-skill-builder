---
description: "Use when a user needs to create, configure, or implement scheduled jobs that run custom code periodically in Rock RMS"
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

Someday you’ll decide you need to run some custom code on a regular, periodic basis. When that happens, you’ll be glad you learned about Rock Jobs.

A Rock Job is a fairly simple thing. Under the covers, Rock Jobs are just an extension of the popular open-source Quartz job scheduling system. A Rock Job is just a class that implements the Quartz IJob interface, and the only method you need to implement is the Execute method -- which is the starting point for your code. Let’s look at a simple example in the RunSQL job:

```
using System.ComponentModel;
using System.Web;

using Rock.Attribute;
using Rock.Data;
using Rock.Model;
using Rock.Web.UI.Controls;

...
[DisplayName( "Run SQL" )]
[Description( "Job to run quick SQL queries on a schedule." )]

[DisallowConcurrentExecution]
public class RunSQL : RockJob
{ 
   ...
   public virtual void Execute( IJobExecutionContext context )
   {
       JobDataMap dataMap = context.JobDetail.JobDataMap;

       // run a SQL query to do something
       string query = GetAttributeValue( "SQLQuery" );
       int? commandTimeout = GetAttributeValue( "CommandTimeout").AsIntegerOrNull();
       try
       {
           int rows = DbService.ExecuteCommand( query, System.Data.CommandType.Text, null, commandTimeout );
       }
       catch ( System.Exception ex )
       {
           HttpContext context2 = HttpContext.Current;
           ExceptionLogService.LogException( ex, context2 );
           throw;
       }
   }
}
```

## Job Settings

You’ll notice on the first line of the Execute method we’re setting a variable which is the JobDataMap object from the context’s JobDetail. With this object GetString() method you can fetch any administrator configurable Job settings you’ve added to your job. These settings are really just like the Block settings you’ve already learned about.

There are two settings in this job, one that holds the SQL the job will run, and a configurable timeout setting -- in case the SQL is expected to take a long time to execute:

```
[CodeEditorField( "SQL Query", "SQL query to run", CodeEditorMode.Sql, CodeEditorTheme.Rock, 200, true, "", "General", 0, "SQLQuery" )]

[IntegerField( "Command Timeout", "Maximum amount of time (in seconds) to wait for the SQL Query to complete. Leave blank to use the SQL default (30 seconds).", false, 180, "General", 1, "CommandTimeout")]
```

![](https://community.rockrms.com/GetImage.ashx?Id=66715)

You can fetch the value of a job setting just like you fetch block settings using the GetAttributeValue method as shown here:

```
string query = GetAttributeValue( "SQLQuery" );
```

When the value is expected to be a datatype other than a string, you can use one of Rock’s handy “As\*” extension methods to get the datatype you’re expecting as seen here:

```
int? commandTimeout = GetAttributeValue( "CommandTimeout").AsIntegerOrNull();
```

### Result

One thing missing from this job something that lets the Job Scheduler know the results of the execution. These results are just a user friendly message that the admin can see in the “Last Status Message” on the Jobs Administration page. The message is simply set using the context.Result property. Here is an example from the SendBirthdayEmail job:

`context.Result = string.Format( "{0} birthday emails sent", recipients.Count() );`

### Exceptions

It's also a good idea to wrap your execute code with a try-catch block. In the event that something goes wrong, you can log the exception using Rock’s logging service as seen here:

`ExceptionLogService.LogException( ex, HttpContext.Current );`

That’s really it. To get started just create a project named appropriately as per the [Naming Conventions](https://www.rockrms.com/Rock/Developer/BookContent/16/16#namingconventions) and create a class that extends IJob.

### Last Step

Once you’ve created your project, remember to add a reference to the RockWeb project. See the **Adding the Project to RockWeb** chapter for those details.

---

## Developer 303 {#303---blast-off}

Getting the deep details to become an effective Rock developer.

Important

This is currently still a DRAFT document with several sections that are still TBD.

You’ve made it through the fundamentals and are now about to learn the advanced topics that will make you a bonafide Rock-it scientist. Although there are a few more topics to discuss regarding Rock Blocks, in this book we’re also going to dive into other important areas of Rock that will show you how to create your own custom Rock Jobs, Data View filters, Workflow Actions, etc.

You can use this document (and the code) as a reference, so feel free to just jump to the sections that are important to you.

## Coding for the Target Persona

Before we get going, let's make sure you understand something vital: the Rock target personas. These six people represent various target user audiences in Rock:

![](https://community.rockrms.com/GetImage.ashx?Id=66714)

And of course, not shown above is the Sally Smith who attends that church. She’s just as normal as normal can be.

When developing something, remember who you’re interacting with. If you have an informational message to show Sally or Pete, don’t scare them with technical terms they know nothing about. Use simple, plain language that an untrained (in Rock) person can understand.

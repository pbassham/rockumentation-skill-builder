---
description: "Use when a Rock developer needs to implement logging, configure logging levels, or understand Rock's logging engine and best practices"
source: "https://community.rockrms.com/developer/303---blast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

Starting with Rock v17, there is a new logging engine in Rock. Logging is an important part of writing a quality application. It can communicate issues to the administrator, help troubleshoot customer issues, and *if not used correctly* could bring the system to its knees. The current logging implementation takes ~8 microseconds to write something to the log file. This sounds fast, but if done inside a loop these times could add up fast.

Rock uses the [Microsoft.Extensions.Logging](https://learn.microsoft.com/en-us/dotnet/core/extensions/logging) library and pattern for logging. But since we don't have full Dependency Injection, there are two steps to performing logging.

First, create the logger with a call like:

```
var logger = RockLogger.LoggerFactory.CreateLogger<YourClassName>();
```

You can then use the logger by issuing a call such as this:

```
logger.LogWarning( "your text");
```

There are 6 verbosity levels you can log for (Critical, Error, Warning, Information, Debug, Trace). The majority of your logging should take place using *Debug* or *Information*, because these levels will be actually written the least and have a smaller chance of unintentionally hurting performance. See the Logging Levels section below for more details.

Logging is also enabled or disabled based on category. The category is always the full class name of your class, such as `Rock.Jobs.RockCleanup.` Only categories (classes) that are marked with the C# attribute `Rock.Logging.RockLoggingCategoryAttribute` will show up in the list. You'll want to add this C# attribute on every class that you add logs to.

```
[RockLoggingCategory]
public class RockCleanup : RockJob
```

If you want to add a specific project namespace as a category, you can add this to your project's AssemblyInfo.cs.

```
// Register friendly logging category names.
[assembly: Rock.Logging.RockLoggingCategory( "com.RockSolidChurch.MyProject" )]
```

But don't worry, even if you don't mark it you can still log to it and add your category under the Advanced section. The attribute just controls if it will show up in the Categories to Log drop down list. So you should only decorate classes that you expect will be high-profile logging. If it's just something you want to be able to enable while developing, consider not decorating it and manually entering it in the Advanced section.

For log entries to be written, the logger must first be enabled under `Admin Tools > System Settings > Rock Logs` as seen here:

![](https://community.rockrms.com/GetImage.ashx?Id=66726)

Once enabled, the logs will appear on that same page.

## Advanced Configuration

If you need to enable logging for a category not marked with the `RockLoggingCategoryAttribute` then it can be enabled in the Advanced section. For example, if you want to enable the legacy "CMS" logging domain at the "Information" (and above) level as well as the plugin category "com.rocksolidchurch.MyLogicController" at the "Error" (and above) level, you could enter the following in the Custom Settings text box.

```
{
    "LogLevel": {
        "CMS": "Information",
        "com.rocksolidchurch.MyLogicController": "Error"
    }
}
```

## Logging Levels

To promote consistency, clarity, and best practices across RockRMS development, this outlines how to appropriately use each SeriLog logging level.

- **Critical** \- Use for extreme errors that require immediate attention.
	- *Note*: Using this level requires approval by the Director of Software Development (DSD).
- **Error** \- Application errors that have caused a failure in a specific operation. For example, exceptions that are caught and handled but should really be reviewed by a Rock Administrator to verify or correct an underlying issue.
	- Example: `Unable to instantiate class com.rocksolidchurchdemo.SampleJob for job #38.`

Anything below Error is likely to never be seen by an Administrator unless they are being assisted by the core team or a partner.

- **Warning** \- Something unexpected happened, but the application is still working. Recoverable issues (e.g., invalid input gracefully handled).
	- *Note*: We should avoid using unless you have a good use case this since it's really just noise that no Administrator is likely to ever review/notice.
		- Example: `Job #38 completed but reported error: {error message}.`
		- Example: `Timeout waiting for Mailgun to respond.`
- **Information** \- General events that represent normal application flow.
	- *Note*: We should avoid using this since it's really noise that no Administrator is likely to ever review/notice.
		- Example: `Job #38 executed in 2.38 seconds.`
- **Debug** \- Debugging information helpful during development or advanced troubleshooting between the Core team and a partner church/organization.
	- *Note*: It's OK to use these in situations where you think there could be future trouble, but realize these will not be seen by anyone except during troubleshooting sessions with the Core team or a partner.
		- Example: `Starting job #38 / Finished job #38.`
- **Trace** \- Extremely detailed logs, often for internal use only.
	- Note: **Avoid using.** Using this level requires approval by the Director of Software Development (DSD). Don't add tracing logs just because, but if you add them to solve a problem then consider leaving them (with DSD approval) if you think they ever might be useful again.
		- Example:
Instantiating class xyz / Adding configuration setting Key=Value / Calling Execute() method / Updating ServiceJobHistory / Updating ServiceJob / Cleaning Up from Running job #38.

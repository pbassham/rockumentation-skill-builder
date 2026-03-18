> **Path:** Developer Codex > Coding Standards > Logging

# Logging

Logging is an important part of writing a quality application. It can communicate issues to the user, help troubleshoot customer issues, and if not used correctly could bring the system to its knees. The current logging implementation takes ~8 microseconds to write something to the log file. This sounds fast, but if done inside a loop these times could add up fast. Your logging should be done with the RockLogger's Verbose, Debug, Information, Warning, Error, and Fatal methods and should almost always pass in the correct RockLogDomains constant. The majority of your logging should take place at the Verbose, Debug, and Information levels, because these levels will be actually written the least and have a smaller chance of unintentionally hurting performance. A logging call that doesn't physically write to log takes between 30 and 90 nanoseconds to complete, which isn't really a big deal, but again if done in a loop over a large data set could add up.

**DO**: Use the Verbose, Debug, Information, Warning, Error, and Fatal method calls.

**DO**: Pass the correct domain from RockLogDomains to the above method calls.

**DO**: Log the least amount of information necessary to achieve the desired result.

**AVOID**: Adding logging calls inside loops that could be large. If you do have to log in a loop consider using the Verbose log method.

**AVOID**: Using the RockLogger to log application exceptions. These should still use the ExceptionLog entity.

Usage Examples:

`RockLogger.Log.Warning( RockLogDomains.Jobs, $"No SMS message found in system communication {systemCommunication.Title}. All attendance reminders were sent via email.");`

`RockLogger.Log.Fatal( RockLogDomains.Communications, ex, "Foo was not able to send the bar-data during the foobar call." );`

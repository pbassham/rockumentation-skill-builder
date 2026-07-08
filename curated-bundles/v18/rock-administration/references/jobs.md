---
description: "Use when configuring scheduled jobs, understanding default Rock jobs, or managing automated tasks like check-in, cleanup, analytics, and data processing"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Jobs

Jobs allow you to run a sequence of code on a defined schedule. A good example of this is the *Rock Cleanup* job that comes configured to run every day at 1:00 am. This job runs through a series of clean-up steps (like trimming the *Audit Log*) to help keep the Rock database clean and tidy.

Below is a list of jobs that ship with Rock.

| Name | Description | Default Schedule |
| --- | --- | --- |
| Auto Open Locations | Related to check-in, this job will automatically reopen rooms that have been closed. This allows closed rooms for one service to be open for the next service. You can select a *Parent Location* to limit which rooms are opened. You can also set a *Re-open Period* which tells the job to only open rooms that have been modified (e.g., closed) within this amount of time. This job only works for Locations that are of type *Room*. | None |
| Calculate Family Analytics | This job populates Rock's family analytics. See our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#personfamilyanalytics) for more information. | At 8:00 pm, only on Tuesday |
| Calculate Group Requirements | This job processes group requirements defined in the system. You can read more about this in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#grouprequirements) manual. | Every day at 3:00 am |
| Calculate Metrics | This job runs any metrics with a defined schedule. You can read more about this in the [Taking Off With Reporting](https://community.rockrms.com/documentation/bookcontent/6#metrics) manual. | Every 15 minutes |
| Calculate Person Duplicates | This Run SQL job scours your Rock database on a nightly basis looking for possible duplicates. Those that are found are listed under Rock's data integrity tools. You can read more about these tools in the [Data Integrity](#dataintegrity) chapter. | Every day at 3:00 am |
| Calculate Person Signals | Re-calculates all person signals to ensure that the top-most signal is still the current one. To learn more about signals, see the [Person Signal Types](#personsignaltypes) section. | Every day at 3:15 am |
| Campaign Manager | Handles the processing of all configured [connection campaigns](https://community.rockrms.com/documentation/bookcontent/39#connectioncampaigns), creating new connection requests and assigning them to connectors as needed. | Every day at 7:00 am |
| Charge Future Transactions | Charge future transactions where the *FutureProcessingDateTime* is now or has passed. | Every 10 minutes |
| Chat Sync | Job that performs synchronization tasks between Rock and the external chat system. | Every day at 5:00 am |
| Collect Hosting Metrics | This job can only be activated by navigating to Admin Tools \> Settings \> System Configuration \> Web.Config Settings and toggling the *Enable Database Performance Counters* setting. This job will collect metrics related to the usage of resources like the database connection pool. See the [System Configuration](#systemconfiguration) section for details. | Every five minutes |
| Communication Queue Alert | Sends an email to a list of recipients when there are communications that have been queued to send for longer than a specified time period. See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information on working with communications in Rock. | Every 15 minutes |
| Complete Workflows | Closes all the Workflows of the configured type that are older than a certain number of minutes. You can read more about this in the [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12#autoclosingworkflows) manual. | None |
| Connection Requests Automation | If you have any Status Automation rules configured on a Connection Type, this job will process them and make updates as needed. For more details see the [Engagement](https://community.rockrms.com/documentation/bookcontent/39#automatingstatuschanges) guide. | Every day at 11:00 pm |
| Connection Request Workflow Triggers | Connection Request workflows that are triggered by *Future Follow-up Date Reached* are launched by this job. The job also changes the state of these requests from *Future Follow Up* to *Active* and adds a "Future Follow-up Complete" action.      By default, the *Number of Days to Look Back* setting is set to '1'. This means if the job is run today, it will launch workflows and change states for connection requests where the Future Follow Up date was yesterday. | Every day at 7:00 am |
| Content Channel Item Self Update | This job helps automate showing or hiding certain content channel items. For full details see the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#contentchannelitemselfupdate) guide. | None |
| Data Automation | Updates person and family information based on Data Integrity settings. To learn more about Data Integrity settings, see the [Data Integrity](#dataintegrity) chapter. | Every Tuesday at 4:00 am |
| Database Maintenance | Performs routine SQL Server database maintenance. See the [Care and Feeding of Rock](#careandfeedingofrock) section for more information. | None |
| Data View to Workflow | Starts a workflow for each entity in a specified Data View. | None |
| Get Scheduled Payments | This job downloads transactions from the payment gateway for any scheduled transactions. You can read more about this in the [Rock Solid Finances](https://community.rockrms.com/documentation/bookcontent/15#downloadingtransactions) manual. | None |
| Giving Automation | This job updates giving classification attributes and Giving Journey stages. It also creates giving alerts. For more information check out the [Rock Solid Finances](https://community.rockrms.com/documentation/bookcontent/15#givingoverview) guide. | Every day at 10:00 pm |
| Group Attendance Reporting | This job will create new Person attributes to track a person's *First Attended Date*, *Last Attended Date*, *Times Attended in Last 12 Months* and/or *Times Attended in Last 16 Weeks* for groups specified by a Data View. These attributes can be manually assigned categories and security as needed. This job considers all attendance in the specified groups, regardless of whether the person is currently an active member of the group. For more information see our [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#groupattendancereporting) guide. | None |
| Group Leader Absence Notifications | This job sends an email to group leaders in the specified group type with a list of group members who haven't attended group meeting occurrences a specified number of times. See our [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#groupleaderabsencenotifications) guide for more information. | None |
| Group Leader Pending Notifications | This job sends out emails to group leaders with pending notifications. You can read more about this in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#groupleaderpendingnotifications) manual. | None |
| Group Sync | This job syncs any configured groups. You can read more about this in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#groupsync) manual. | None |
| Index Content Collections | A job that updates the content collections search index. | Every day at 4:45 am |
| Index Entities (Universal Search Re-Index) | Re-indexes the selected entity types in Universal Search. See our [Universal Search](https://community.rockrms.com/documentation/bookcontent/32/) guide for more information. | Every day at 5:00 am |
| Index Rock Site | Configures Rock to index a specified site. Includes the option to set login credentials to allow indexing of password-protected pages. | None |
| Job Pulse | Runs continuously to help monitor the jobs engine. Don't disable this job. | Every 30 seconds |
| Launch Workflow | Will start a new workflow of the type selected in the configuration. | None |
| Location Services Verify | Attempts to standardize and geocode addresses that haven't been verified yet. It also attempts to re-verify addresses that failed in the past after a given wait period. | Every day at 3:00 am |
| PBX CDR Download | This job downloads CDR information for the specified PBX component. | None |
| Populate Interaction Session Data | This job will update Interaction *counts* and *durations* for InteractionSession records. | Every 10 minutes |
| Process BI Analytics | This job takes care of schema changes (dynamic Attribute Value Fields) and data updates to Person analytic tables. To read more about BI and Rock, see the [Business Intelligence](https://community.rockrms.com/documentation/bookcontent/35/) guide. | Every day at 5:00 am |
| Process Communication Flows | This job processes [Communication Flows](https://community.rockrms.com/documentation/bookcontent/8/#communicationflows) creating new communications as needed and tracks conversions for flows that have goals. | Every 5 minutes |
| Process Elevated Security | This job calculates each person's [Account Protection Profile](https://community.rockrms.com/documentation/bookcontent/5#accountprotectionprofiles) level. | Every day at 3:15 am |
| Process Group History | Updates group history for enabled group types. To learn more about group history, see the [Group History](https://community.rockrms.com/documentation/bookcontent/7#grouphistory) chapter of the Rock Your Groups manual. | Every day at 3:30 am |
| Process Reminders | A job which processes reminders, including creating appropriate notifications and updating the reminder count value for people with active reminders. | At 6:00 am, Monday through Friday |
| Process Signature Documents | Sends any digital signature invites that need to be sent for groups that require a signed document. | Every day at 9:00 am |
| Process Workflows | Looks at all active workflows and runs the activities of those that are active. | Every 10 minutes |
| Rock Cleanup | Runs a series of cleanup steps to manage the Rock database. You can change the settings for many of the steps, but we recommend keeping the defaults in most cases. For instance, you may want to enable *Fix Attendance Records Never Marked Present* if you're using *Presence* with Check-in. | Every day at 1:00 am |
| Run Lava | Runs a Lava template on a given schedule using common merge fields and commands. This is helpful when triggering web requests, performing Lava SQL updates and more. | None |
| Run SQL | This job simply runs a SQL script on a given schedule. This is helpful if you’d like to automate the changing of data on a certain schedule. | None |
| Send Assessment Reminders | Sends reminders to persons with pending assessments if the created date/time is less than the calculated cutoff date and the last reminder date is greater than the calculated reminder date. See our [Assessments](https://community.rockrms.com/documentation/bookcontent/37/) guide for more information. | Every day at 8:00 am |
| Send Attendance Reminders for Group Type | This job is used to remind group leaders to take attendance for the groups they lead, for groups of the specified type. You can read more about this job in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#sendattendanceremindersforgrouptype) manual. | Every day at 4:00 pm for the Small Group group type. |
| Send Birthday Email | Sends an email to people in the database who have a birthday on that day. | None |
| Send Communications | Sends out queued communications. Communications can be sent in serial or in parallel according to the *Parallel Communications* setting. We don't recommend changing the number of allowed parallel communications without careful analysis of your bandwidth usage and limits.      See the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information on working with communications in Rock. | Every 10 minutes |
| Send Credit Card Expiration Notices | Notifies (by email) anyone with a scheduled credit card transaction that expires in the following month. It can also be configured to launch a custom workflow. You can read more about this in the [Rock Solid Finances](https://community.rockrms.com/documentation/bookcontent/15#expiringcreditcardnotification) manual. | First of every month at 7:30 am |
| Send Data View Email | This job will send a System Communication of your choosing to the list of people returned by the selected Data View. | None |
| Send Following Events | The Send Following Event Notification job sends out emails to specified individuals when following events occur. When you add a Following Event of the "Person Note Added" Following Event type, this job will take longer the first time it runs.  This initial run establishes "Last Notified" dates for followed people and their notes. | At 7:00 am, Monday through Friday |
| Send Following Suggestions | The Send Following Suggestion Notification job calculates and sends following suggestions to people who are eligible for following. | At 3:00 pm, Monday through Friday |
| Send Group Attendance Digest | This job sends an email containing a summary of attendance data for certain groups. The groups must be structured a specific way for this job to work, so be sure to check out the [Group Attendance Digest](https://community.rockrms.com/documentation/bookcontent/7#groupattendancedigest) section of our [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7/) guide for configuration instructions. | None |
| Send Group Attendance Reminders | This job is used to remind group leaders to take attendance for the groups they lead, for groups of any type where the *Send Attendance Reminder* option is enabled. You can read more about this job in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#sendgroupattendancereminders) manual. | Every 15 minutes |
| Send Group Email | Sends out an email to the selected group's active members using the template you choose, with an option to include members of descendant groups. If a person is a member of multiple groups in the tree, they will receive an email for each group. This job works well for sending automated group email reminders. | None |
| Send Group Requirements Notification | Sends out reminders to group leaders when group members don't meet all requirements. You can read more about this in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#grouprequirementjobs) manual. | None |
| Send Group Schedule Notifications | Sends Group Scheduling Confirmation and Reminder emails to people that haven't been notified yet. See our [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#groupschedulingcommunications) guide for more information. | Every day at 4:00 pm |
| Send Learning Notifications | This job will send any unsent class announcements as well as an available activity digest emails for all their newly available activities within a learning program. The class announcements SystemCommunication is configured by the job setting and contains the Person and Announcement merge fields. The Available Activity Notification is configured by the learning program and contains ActivityCount and Courses (a list of CourseInfo) merge fields. | Every day at 7:00 am |
| Send Note Notifications | Sends out digest notifications of notes which have been added as a reply to watched notes, as well as notes which were added and require approval prior to being displayed. | Every two hours |
| Send Prayer Comments | Sends comments added to prayer requests to the requestor. See our [Raising Up With Prayer](https://community.rockrms.com/documentation/bookcontent/11/) guide for more information. | None |
| Send Registration Payment Reminders | The Event Payment Reminders job sends out payment reminders to the registration contacts when a balance is due. See the [Event and Calendar Guide](https://community.rockrms.com/documentation/bookcontent/29#registration-payment-reminders) for more information. | None |
| Send Registration Reminders | Sends out reminders to registrants of upcoming events. You can read more about event registrations in the [Event and Calendar Guide](https://community.rockrms.com/documentation/bookcontent/29/). | Every hour |
| Send RSVP Reminders | Sends a reminder to people who have accepted an RSVP invitation. | None |
| Send Sign-Up Reminders | Send any sign-up reminders that are due to be sent. | Every day at 8:00 am |
| Spark Link | This job fetches Rock notifications from the Spark Development Network. | At 57 minutes past the hour, every seven hours |
| Steps Automation | When this job runs, new steps are created and completed for people in a Data View. The Data View is added to the Step Type configuration, so each Step Type may use a different Data View. This job respects the 'Allow Multiple' and 'Prerequisite Steps' configuration options of each Step Type. | Every day at 4:00 am |
| Sync Media | Synchronizes media content from configured Media Accounts. This is how new Media Elements and folders are added to Rock after you've uploaded new content to your video provider. | At 15 minutes past the hour, every two hours |
| Update Analytics Source Postal Code | Job to update the AnalyticsSourcePostalCode table with geographical and census data. | None |
| Update Learning Program Completions | A job that updates learning program completion records for programs that track completion status. | Every day at 5:00 am |
| Update Persisted Attribute Values | The *AttributeValue* table in Rock has properties that store persisted versions of the *Value* property. At times, the persisted values may fall out of sync with the actual *Value*. This job finds these cases, and updates the persisted values to reflect the current *Value*.      To make sure we don't miss anything, the *Rebuild Percentage* in the job's configuration forces this update on a percentage of *AttributeValue* records, even if it doesn't appear that those records need to be updated. | Every day at 2:15 am |
| Update Persisted Datasets | This job will update the persisted data in any Persisted Datasets that need to be refreshed. | None |
| Update Persisted Dataviews | Runs Data Views marked as "persisted" and caches the results for much quicker data lookups. | Every minute |
| Update Personalization Data | Updates the list of people in personalization segments. You can read more about personalization and personalization segments in our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#personalization) manual. | Every day at 1:20 am |
| Update Step Program Completions | Job that updates Step Program Completion Data. | Every day at 2:00 am |

# Note

You can code your own jobs if you have access to a developer.

# Configuring a Job

You can maintain current jobs or add new jobs under Admin Tools \> Settings \> Jobs Administration.  
There you'll see a list of currently configured jobs. You can click a job to modify the configuration or click the Add button in the grid footer to create a new job.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/jobs-administration-v18.png)

Jobs List

Clicking on an existing job, or adding a new job, will bring you to the page pictured below.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/jobs-newjob-v18.png)

Adding A New Job

# No Need to Restart

When you add or modify a job there's no need to restart your website. Changes will be automatically updated within a few minutes.

# Pause Jobs

There will be times when you'll need to temporarily stop running a job. Instead of deleting the job and re-creating it later, simply inactivate the job until you’re ready to run it again.

# Care and Feeding of Rock

Just like car engines, sometimes databases get messy and need a tune up. Rock comes with the Database Maintenance job configured to do just that. Running on a schedule, this job rebuilds database indexes that need tuning. Because this job comes ready out of the box, you don't need to do any configuring. You can view the details and configuration options, though, by opening the Database Maintenance job from the Jobs List, located at Admin Tools \> Settings \> Jobs Administration.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/database-maintenance-config-v18.png)

Database Maintenance Job Detail

# Persisted Attribute Values

The *Update Persisted Attribute Values* job is an important part of Rock’s system that helps keep your data accurate and up to date.

Let’s take a moment to explain what’s happening behind the scenes. We’ll talk a little about databases and SQL (a tool for managing data). Don’t worry if you’re not familiar with these terms—you don’t need to be an expert to use Rock. But having a basic understanding might help if you ever need to troubleshoot something.

Take the *Baptism Date* as an example. This is an attribute you might use in Rock, and all it does is store a date. Simple, right? Well, behind the scenes, Rock stores that date in a format that the system can understand. For example, if Ted Decker was baptized on January 12, 2006, Rock saves it as `2006-01-12T00:00:00.0000000`. This format helps Rock organize and process data, but it’s not very user-friendly.

Note that for certain attribute types, like Group (which displays the group’s name when you see it in Rock), the persisted values are automatically updated when the underlying data changes. This means that if you change a group's name, the persisted attribute values will be updated to reflect the new name.

To make it easier for you to read dates, Rock also saves them in a simpler format (like 1/12/2006) using something called the *PersistedTextValue* and *PersistedHtmlValue*. This is the format you’ll see in reports or on pages in Rock. Using these persisted values makes Rock faster by eliminating the need for additional formatting steps. When you use a persisted value, it's already in a ready-to-use format, saving you time and ensuring the dates you see in Rock are formatted consistently.

Rock also has something called *PersistedCondensedTextValue* and *PersistedCondensedHtmlValue*, which are shorter versions of the same information. In the case of dates, though, the condensed and regular formats are usually identical since dates are already short.

Now, here’s where things can get tricky: if you make changes to data using SQL (which we recommend avoiding), the dates displayed in Rock might not update correctly. For example, if you changed Ted’s baptism date from 1/12/2006 to 12/1/2006 using SQL, the system will still show the old date. This happens because Rock’s persisted values (the ones that make dates easy to read) don’t update automatically when you use SQL.

That’s where the *Update Persisted Attribute Values* job comes in. This job scans for anything out of sync and fixes it. It knows what to update by checking a setting called *IsPersistedValueDirty*. If this setting says '1,' it means Rock needs to make an update. If it says '0,' everything is fine.

If you do use SQL to change values, make sure you update the *IsPersistedValueDirty* property to '1.' This tells Rock’s job to correct the persisted values so everything stays accurate.

But what happens if someone forgets to make that additional update? Rock has a solution for that too. The *Update Persisted Attribute Values* job has a setting called *Rebuild Percentage*, which updates a percentage of the records, even if the *IsPersistedValueDirty* setting isn’t triggered. By default, this ensures all records get reviewed and updated every four days, just in case.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/update-persisted-attribute-values-v18.png)

Update Persisted Attribute Values


---
description: Use when configuring automated attendance reminder jobs for groups and group types in Rock RMS
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Service Jobs Relating to Groups

Service jobs allow you to set up reoccurring tasks that run on a schedule you define. Below are jobs that relate to groups.

# Learn More

This section highlights unique aspects of service jobs relating to groups. For information on setting up jobs in general, see the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#jobs).

# Send Attendance Reminders for Group Type

This job sends reminders to group leaders to enter attendance. All individuals in the group with a role that has the 'Is Leader' setting will receive this reminder. Keep in mind that this job will only send reminders to groups of the configured type if the group type's *Send Attendance Reminder* option is disabled (unchecked).

A couple of key configuration options for this job are:

- **Group Type:** The group type that the reminders are for.
  
- **System Communication:** The system communication that you would like to use for sending the reminder. Rock ships with a *Group Attendance Reminder* system communication for this purpose.
  
- **Send Reminders:** By default, a reminder will always be sent the day the group meets. By adding values here, you can configure additional reminders if the attendance has not been entered. For instance, entering *2,4* would send reminders two and four days after the group has met if no attendance has been entered.
  
- **Send Using:** Choose whether the reminder should be sent via SMS text message, email or either according to the group leader's preference. Group leaders can set their preference in the [Group Leader Toolbox](#groupleadertoolbox).
  
- **Campuses:** You can select one or more campuses to only send reminders for groups associated with that campus. This does require that the groups are tied to a campus.
  
- **Parent Group:** If you choose a group here, reminders will only be sent to groups that are children (and grandchildren, etc.) of the selected group.

Note that the attendance reminder options available on the group type apply to the *Send Group Attendance Reminders* job described below.

# SMS Job Errors

If the reminder job is configured for SMS, and if a person's communication preference is SMS but they don't have an active/valid SMS number, then the job will record an error. Similarly, if the job can't find the SMS configuration it needs, then it will also record an error message to the job's status/history message.

# Send Group Attendance Reminders

This job is very similar to the *Send Attendance Reminders for Group Type* job discussed above. This job sends a reminder to group leaders about entering attendance for their group meeting. The key difference between the two jobs is that *Send Attendance Reminders for Group Type* requires a group type, while *Send Group Attendance Reminders* does not. That means you can have one job handling all of your reminders for all of your group types.

Keep in mind that this job will only send reminders for group types where the *Send Attendance Reminder* option is enabled under the *Attendance / Check-in* panel. Each group type can continue to have its own *Attendance Reminder Communication Template*.

![Send Attendance Reminder Option](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/send-attendance-reminder-option-v18.png)

Send Attendance Reminder Option

This job is configured to run every 15 minutes. It looks for Group Types that have *Send Attendance Reminder* checked and once a group's scheduled Start Time is within the *Attendance Reminder Start Offset Minutes* setting, the attendance reminder is sent. This can only happen once per day.

To get a little technical, when a reminder is sent, the *Attendance Occurrence* record is created, and the current date/time is written to the *AttendanceReminderLastSentDateTime* property. This ensures that we never send the same reminder twice in one day.

# Group Leader Pending Notifications

This job allows you to notify group leaders of newly pending members in their groups. This provides the following customization options:

- **Group Type:** The group type to filter off for limiting the groups that are checked for pending members.
  
- **Include Previously Notified:** This determines if only newly pending members should be sent to leaders, or if pending members who have already been sent once should also be considered. Note that when you initially set up this job, none of the current pending members will have been marked as sent, so they will all be sent to leaders on the first run.
  
- **Notification Email:** This is the system communication template that should be used. A sample system communication called *Pending Group Members Notification* is provided out of the box for you to use or edit as you see fit.
  
- **Group Role Filter/Role:** This is an optional setting that allows you to only include pending members of a specified role. If you don’t select a role, all roles will be considered. You must first select a Group Type before specifying a role.
  
- **Pending Age:** Only pending members who have been added or updated within the number of days set here will be included. For instance, you might set this to seven to select pending members added within the past week. Leave this blank to not consider the last time a record was updated.

The notification will be sent to all group members of the group whose role has been configured as *Is Leader*.

# Keeping Your Options Open

Keep in mind that you can set up multiple instances of this job. This allows you to send one scheduled communication for newly pending members and a separate for older pending members that the group leaders have already been made aware of.

# Send Group Attendance Digest

This job sends a summary of group attendance information to certain group *Leaders*. See the [Group Attendance Digest](#groupattendancedigest) section above for details on the group structure requirements for this job. When you’re configuring this job, pay close attention to the following configuration options:

- **Parent Group:** The job needs to know the highest-level parent group in the group structure to identify which child groups apply to the job. Again, this job expects a very specific group structure to be in place, so be sure to check out the [Group Attendance Digest](#groupattendancedigest) section above to make sure you're set up correctly.
  
- **System Communication:** This is the system communication template that should be used. A sample system communication called *Group Attendance Digest* is provided out of the box for you to use or edit as you see fit.
  
- **Date Range:** You can choose to send the attendance digest for either the ‘Current Week’ or the ‘Previous Week’.

In order for the job to work correctly, the groups taking attendance must meet on a regular (i.e., Weekly) schedule.

# Process Group History

This job creates historical snapshots of Groups and Group Members for any group types that have history enabled. Once the job runs, groups that have history enabled will show an 'Archive' option instead of 'Delete'. See the [Group History](#grouphistory) chapter for more details.

This job is set to run once per day in Rock.

# Group Attendance Reporting

This job will create new Person attributes to track a person's *First Attended Date*, *Last Attended Date*, *Times Attended in Last 12 Months* and/or *Times Attended in Last 16 Weeks* for groups specified by a Data View. These attributes can be manually assigned categories and security as needed. This job considers all attendance in the specified groups, regardless of whether the person is currently an active member of the group.

When you're setting up this job, you have the following options:

- **Group Data View:** You'll need to create a data view that returns the group or groups that you want to report on. For instance, you might select all groups of the Small Group type to report on a person's attendance in small groups.
  
- **Reporting Label:** This gets used as part of the name of the attribute(s) that will be created by the job. In the example screenshot below the Reporting Label was "Small Group" so each attribute name starts with that phrase.
  
- **Tracked Values:** For the groups returned by your data view, select the attendance data you want to track. In the example screenshot below all four options were selected, so four new attributes were created.

In the example pictured below, new attributes have been added to show Small Group involvement. In this case the attributes were manually assigned to the *Visit Information* category, to allow them to show on the Person Profile.

![Group Attendance Reporting Attributes](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-attendance-reporting-job-results-v18.png)

Group Attendance Reporting Attributes

This job will create a new attribute only if it does not find an existing attribute (e.g., from a prior run of the job) to update. This depends on how the job itself is configured. For instance, changing the *Reporting Label* will result in new attributes being created with the new label.

# Group Leader Absence Notifications

The Group Leader Absence Notifications job is intended to alert group leaders when a member of the group has been absent a configured number of times in a row. This is so the leaders can follow up with absent people or update their status in the group if needed. Rock ships with a System Communication created specifically for this notification, called *Absence Group Member Notification*. When you’re configuring this job, pay close attention to the following configuration options:

- **Group Type:** Because the job only runs for one Group Type at a time, you'll need multiple instances of this job if you want to run it for multiple Group Types.
  
- **Notification Email:** You can use the *Absence Group Member Notification* System Communication that ships with Rock, or you can create your own.
  
- **Group Role Filter/Role:** This applies to the members of the group. If set, only group members with the provided Group Member Role will be evaluated and reported by this job.
  
- **Minimum Absences:** This is the minimum number of consecutive meeting occurrences for which a person must be absent in order to be included in the Notification Email. If left blank, then '3' will be used. Setting this to '0' will cause the job to fail.


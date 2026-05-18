---
description: "Use when configuring group attendance tracking, enabling attendance features for group types, or setting up attendance reminder emails and schedules"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Attendance

Group Attendance

Whether you're following the leadership principle of *inspect what you expect* or you simply want to keep a pulse on the health of a group, the group attendance feature can simplify the process of gathering participation details of your group members.

# Configuring a Group for Attendance

Before a group can take attendance, its group type must first be configured to enable attendance tracking under Admin Tools \> Settings \> General \> Group Types. From here you should select the group type you'd like to configure check-in for. Under the *Attendance / Check-in* tab enable the setting *Takes Attendance*.

While this one setting is all you need to enable the attendance features, there are a couple of other settings that help improve the attendance tools:

- **Group Schedule Options:** While a group schedule is not required to take attendance, having a schedule will simplify the attendance entry because it will guide the user to enter attendance on those dates when the group meets.
  
- **Schedule Exclusions:** While each group can set its own schedule (including exclusion dates) you may want to set exclusion dates for every group of this type. This is especially helpful when using the simple schedule option where you only specify the day of the week and the start time for a group. Adding these group type schedule exclusions helps to keep email attendance reminders from being sent.
  
- **Send Attendance Reminder:** This checkbox will enable the sending of an attendance reminder email or text message to the group leader the day the group is scheduled to meet.

# Entering Attendance Information

## Internal Attendance Features

There are several ways to collect group attendance. The first is to use the internal attendance features built into the Group Viewer under People \> Group Viewer. You'll notice an attendance button on the group details block for groups that are configured to take attendance.

![Group Attendance Button](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-attendance-v18.png)

Group Attendance Button

Selecting this option will bring up the group attendance grid. This grid lists the previously entered attendance for the group and allows you to enter new attendance records from the add button in the grid's header or footer.

![Group Attendance List](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-attendance-list-v18.png)

Attendance List

Selecting the button will take you to the attendance entry screen pictured below. From this screen you can check off all those who attended the group or note that the group did not meet on its scheduled date and time. You can also print an attendance sheet, which allows attendance to be collected via a register.

![Attendance Entry](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/attendance-entry-v18.png)

Attendance Entry

## External Attendance Features

Entering attendance on this internal screen is great for staff-entered attendance. Often times you will want to push the responsibility of attendance entry to the group leaders. One way to do this is to allow them access to the leader toolbox. See the [Group Leader Toolbox](#groupleadertoolbox) chapter for details on this set of tools.

## Rapid Attendance Entry

The Rapid Attendance Entry method of recording attendance may come in handy for your groups. To learn more, see the [Rapid Attendance Entry](https://community.rockrms.com/documentation/bookcontent/10#rapidattendanceentry) chapter of the [Checking-out Check-in](https://community.rockrms.com/documentation/bookcontent/10/) manual.

# Attendance Reminders

You can also configure Rock to send a communication to the group leader on the day that their group meets to remind them to take attendance. This communication will include a link to take them straight to the attendance detail screen. Since each group leader gets an individual communication, we have enabled this link to not require a login to help simplify the process (either the *Manage Members* or the *Edit* privilege must be present for a group leader to enter attendance).

Do you have some groups that you don't want to send a reminder about attendance? No problem, we’ve got you covered! When attendance reminders are turned on for a group type, you can exclude individual groups. All you need is a Data View that includes the groups you want to exclude. Simply add this Data View to the *Excluded Groups Data View* field on the *Send Group Attendance Reminders* job and those groups won’t get the reminders going forward.

There are two other key configuration points for attendance reminders.

The first is the system communication that is used as the template for the reminder. This template can be edited by navigating to Admin Tools \> Settings \> Communications \> System Communications \> Group Attendance Reminder. See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information. If the template is configured for both email and SMS, and if your system is set up to send emails and text messages, then the reminder can use either medium. Group leaders will receive either an email or a text, depending on how the job is set up.

The other configuration point is the job that is run to send the communications on a daily basis. This job must be created for every group type that requires reminders. For more information on this job see the [Service Jobs Relating To Groups](#servicejobsrelatingtogroups) chapter below.

# Before You Report

When running reports on attendance data be sure to filter on *Did Attend* to show those who attended the event.

# Group Attendance Digest

The *Group Attendance Digest* is an email containing a summary of attendance information for one or more groups. See the [Service Jobs Relating to Groups](#sendgroupattendancedigest) chapter for information on setting up the Send Group Attendance Digest job.

![Example Group Attendance Digest Email](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/group-attendance-digest-email-v10.png)

Example Group Attendance Digest Email

The Group Attendance Digest may not be the right fit for all of your groups. It’s only intended for a specific type of groups structure that we’ll describe below.

![Group Structure for Attendance Digest](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/group-attendance-digest-flowchart.png)

Group Structure for Attendance Digest

The chart above has three “Regions” with two “Groups” below each region. But you’re not limited to those numbers. You can have only one region with five child groups below it, or ten regions with a single child group each. The only requirement is that you need all three hierarchical levels, with a single parent group at the very top.


---

## Group Sync {#group-sync}

> **Path:** Rock Your Groups > Group Sync

Group Sync

Have you ever thought, *"With people constantly coming and going, how am I supposed to keep the members of this group up to date in Rock?"* Well, the Group Sync might just turn out to be your next best friend.

Group Sync automates the process of keeping group membership updated by adding and removing members for you. Take, for instance, a security group that gives access to a toolbox for your group leaders. Without Group Sync, every time a leader is added or changed someone would have to remember to manually adjust the toolbox security group accordingly. With the Group Sync feature, this can all be automated for you.

# Configuring Group Sync

Configuring your groups to sync takes only a few one-time steps. After you've got it all set up, you can sit back and watch Rock do the work for you.

To get started, you'll want to make sure that Group Sync is enabled for the groups you're working with. This is set at the Group Type level, as described in the [Group Types](#grouptypes) chapter above.

Next, you'll need to create a [Data View](https://community.rockrms.com/documentation/bookcontent/6#filteringusingdataviews) that returns the people who should be synced as group members. The list of people in this data view will be compared against the list of the group's current members. If there are any differences between those lists, the group's membership is updated so that it matches the data view.

With Group Sync enabled and your data view in place, go to the group you'd like to sync and edit its details. If you have *Administrate* access to the group, you'll see a panel labeled Group Sync Settings. At first, when you're just getting started, there won't be anything listed in this panel. Click the to add your sync as described below.

![Group Sync Settings](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-sync-settings-v18.png)

Group Sync Settings

# Group Sync Job

As noted in the prior section above, the *Sync Interval* setting for the group controls how frequently the group's members are checked against the data view. However, this is only part of the equation.

There's a system job called *Group Sync* that actually does the syncing we've been describing in this chapter. By default, this job runs once every 20 minutes. Most of your groups won't need to be synced that frequently, so you generally don't need to worry about when the job runs. The only time it might cause an issue is if you've configured a group to sync at a more frequent interval than the job. That should be an extreme case, but if you need to change the frequency of the job you can do so under Admin Tools \> Settings \> System \> Jobs Administration.

# Security Tip

The *Group Sync* job has a setting to create new logins in such a way that the individual will need to reset their password on their first login. This setting is initially set to not require a reset. Feel free to change this if you'd like.

# Managing Synced Group Members

Once a Group Role is managed by a sync, members cannot be added to that role manually. You can still manually add people to the group, just not with that role.

That's because if you're manually adding a person to a synced group, then it means the person doesn't meet the criteria of your data view. The sync would remove that person from the group the next time it runs, undoing your manual work. That's why each sync is specific to a role, so you can have some roles that are synced and others that are managed manually.

For the same reason, you can't manually remove synced group members. If you did, they would just be put back in the group by the sync the next time it runs. If you need to remove a synced group member, consider updating the data view to account for that person's scenario.

If you want to stop syncing a group, you can remove the sync from that group’s settings, and it will keep the members. At that point, members of the group would need to be managed manually.

You’ll also notice icons in the group's member list, to notify you that the member is being automatically synced. The icon is also displayed in the upper-right corner of the list. If you hover your cursor over the icon, Rock will display the roles being used to sync the members of the group. From there, you can manually sync the group rather than waiting for the Group Sync job.


---

## Group Following {#group-following}

> **Path:** Rock Your Groups > Group Following

Group Following

Hopefully by now you've seen how to follow a person. If not, stop what you're doing and [read this](https://community.rockrms.com/documentation/bookcontent/5#following). You can also follow a group. Why...? Following a group allows you to put that group into easy reach from your [My Dashboard](https://community.rockrms.com/documentation/bookcontent/5#mydashboard) page.

# How To Follow

Following is super simple. First navigate to the group you'd like to follow. Then, press the follow star in the upper right of the group detail block.

![Following A Group](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-follow-v18.png)

Following A Group

Also note that when you have an event registration that places registrants into a group, you can configure the registration to notify all individuals who are following that group.


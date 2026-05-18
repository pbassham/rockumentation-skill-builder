---
description: "Use when configuring locations, schedules, and group type settings needed to set up volunteer scheduling in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Scheduling

This chapter delves into the administrative setup and management capabilities of the Group Scheduling feature. In the [prior chapter](#scheduletoolbox) we covered what volunteers are empowered to do themselves. Now, we’ll show you how that all gets set up, and what Group Scheduling looks like on the administrative side.

Before starting to scheduling volunteers, you’ll need to configure things like locations and schedules. Locations ensure volunteers know where they're needed, while Schedules pinpoint when their help is required. Then, the Group Scheduler is used to place volunteers into those positions at those times.

# Configuring Group Scheduling

There are two critical pieces of the puzzle you need before starting to schedule volunteers. It’s simple to get these pieces because when it comes to asking for help, people are hardwired to know *when* and *where* they are needed. So, we are going to make sure our *Named Locations* and *Schedules* are configured.

Be sure to check out the [Checking-Out Check-In](https://community.rockrms.com/documentation/bookcontent/10/#locations) user guide for more detail about adding locations. For *Group Scheduler*, however, you will be adding more than rooms. Perhaps you’ll be adding sections, areas or positions. These might be used to schedule specific areas of your lobby for the greeters to be stationed. Or, if you’ll be using Rock to schedule your band and technical teams, add a location named ‘Audio’ or ‘Piano’ and change the location type to be a position.

# Adding Location Types

Location Types (Campus, Building, Room, etc.) are *Defined Types*. To add more, open the Defined Type *Location Type* associated with the Location category and click the button.

![Named Locations](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/named-locations-gs-v18.png)

Named Locations

Next up: schedules, also known as times. This is found in Admin Tools \> Settings \> General \> Schedules. You should have a few parent groups for different types of schedules. For group scheduling, we want to make sure the times are accurate since, you guessed it, location and time are critical aspects of scheduling volunteers.

![Schedules](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/schedules-gs-v18.png)

Schedules

# One Schedule

It is best practice to have one schedule for each time. If you have multiple sites with the same start times, you will only need one schedule for that time.

Lastly, make sure scheduling is enabled on the Group Type. Navigate to Admin Tools \> Settings \> General \> Group Types \> Serving Team | Scheduling. There are additional settings you can configure for your organization. To enable, check the *Scheduling Enabled* box as pictured below.

Group Type Scheduling

![Group Type Scheduling](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-type-scheduling-v18.png)

1 Scheduling Enabled

Enabling scheduling unlocks all of the scheduling features for groups of this type.

2 Schedule Confirmation Communication

Select the System Communication that you want to send to people to confirm their schedule. Rock ships with the *Scheduling Confirmation Email* System Communication for this purpose.

# Email Security and Schedule Responses

Some email security tools automatically open links to scan them. This can unintentionally accept or decline a person's schedule, especially if a decline reason is required. To avoid this, use the *Scheduling Confirmation Email (One Button)* template, the default template, which prevents this behavior.

3 Schedule Cancellation Workflow

You can optionally launch a workflow whenever a person indicates they can't make it at their scheduled time. You might use this to notify people that you're a person shorter than planned.

4 Requires Reason If Schedule Declined

This setting determines if a reason is required if a person says they can't attend at their scheduled time. The available reasons are stored as a Defined Type called *Group Schedule Decline Reason*.

5 Schedule Reminder Communication

This is the System Communication to use for sending people a reminder about their scheduled serving time. Rock ships with the *Scheduling Reminder Email* System Communication for this purpose, but you can use a custom communication if desired.

6 Schedule Confirmation Offset Days

This is simply the number of days before the scheduled serving time that you want to send the confirmation email.

7 Schedule Reminder Offset Days

This is similar to the setting described above but applies to the reminder email.

8 Schedule Confirmation Logic

Here you can choose to *Ask* the person if they accept their schedule, or you can have all schedules automatically accepted by choosing *Auto Accept* instead. If this is set to *Auto Accept*, then the confirmation email will only contain a Decline button.  

# Changing Schedule Confirmation Logic

Keeping in mind it should happen rarely, use caution when changing the *Schedule Confirmation Logic* setting. In some scenarios, changing this setting could result in a person who is not confirmed receiving a confirmation email with only a Decline button and no way to Accept the assignment. This typically happens when changing from *Ask* to *Auto Accept* before the person receives their confirmation email.

9 Schedule Coordinator Notification Options

Here you can designate which types of schedule changes the group's *Schedule Coordinator* should be alerted to. See the [Schedule Coordinator Notification](#schedule-coordinator-notifications) section below for more details.

In the Group Type configuration pictured above, note the *Schedule Confirmation Email* and *Schedule Reminder Email* settings. These communications can be sent via email or SMS messaging.

To send these as SMS messages you'll need to be sure to have SMS messaging configured (see the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8#smsindetail) guide for details) and the person needs to have an SMS enabled phone number. You'll also need to make sure the [System Communications](https://community.rockrms.com/documentation/bookcontent/8#systemcommunications) for these are configured for SMS. With all that in place, the communication medium will be decided based on the person's group member communication preference or, if not specified there, the person's personal profile communication preference.

# Configuring Groups

We're almost to the fun part. The *Group Scheduler* requires some information from the group before it’s ready. In the *Group Viewer*, add *Meeting Details* for every location that needs assigned people. This might be a pretty long list for some groups like the list we see in the screenshot below.

![Meeting Details](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/meeting-details-sg-v18.png)

Meeting Details

At the end of the day, the goal for this page is to have separation and customization for each group. You can break your groups up any way that works best for your flow of work. We recommend that you do some planning before jumping in and creating groups so you can maximize the effectiveness of this feature for your staff.

## Meeting Details

Click on the icon in the *Meeting Details* tab.

This opens a window to add a new location. The properties include Location, Type, and Schedule(s).

![Adding Meeting Details](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-location-gs-v18.png)

Adding Meeting Details

You can select multiple schedules (i.e., service times) just by clicking on them one by one. Make sure you use the same schedule for every group in the meeting details. This will avoid scheduling conflicts. More properties can be selected to add the minimum, desired and maximum people needed for that room and its times.

![Capacities](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/capacities-group-location-v18.png)

Capacities

You have the option to choose different capacities for each time. The *Group Location* screen pictured above is where all those details are customized.

When it's complete, you shouldn’t have to do anything in the meeting details again until your organization opens more rooms or adds times.

# Members

It goes without saying: it’s best practice for your volunteers to be members in the group to appear on the people list in the Group Scheduler, although there are other ways to search for people in the Group Scheduler. We’ll discuss that later.

Next, you'll need to set up the group's Scheduling options. Even though scheduling is enabled at the Group Type level, there are settings you can control for each group individually.

![Scheduling](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-viewer-edit-scheduling-v18.png)

Scheduling

# Setting up Permissions

You'll want to be sure that the right people have the proper permissions to access and manage groups. We have all the info you need on how group security works for both group leaders and staff in the [Securing Groups](#securinggroups) chapter above.

# Group Scheduler

Now the moment of truth…the *Group Scheduler* page. This is where the magic happens. Okay, maybe not actual magic, but it is where the scheduling happens. This page will become very familiar to your staff, since it’s the "magic page" for organizing group members into a location.

# Obsidian Group Scheduler

The following Group Scheduler documentation shows the newer *Obsidian* version. For the previous version, see the [v16 Group Scheduler Documentation](https://community.rockrms.com/documentation/bookcontent/7/296#groupscheduler).

The Group Scheduler can be accessed from People \> Group Scheduling \> Group Scheduler.

![Group Scheduler - Filled](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-empty-v18.png)

Group Scheduler - Filled

## Using Group Scheduler

At first the group scheduler will be empty as pictured below. Let’s start from here to show how we can build a full schedule from a blank canvas. First, we’ll tour some of the features and functions on this page.

![Group Scheduler - Empty](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-empty-v18-1.png)

Group Scheduler - Empty

You may have noticed that each group location has a progress bar showing the status of the schedule and how close the location is to being filled. The status is indicated by the color of the bar:

1. **Red:** There are not enough accepted invites to reach the minimum number of individuals needed.
2. **Yellow:** There are enough accepted invites to reach the minimum number, but not the desired number.
3. **Green:** There are enough accepted invites to reach or exceed the desired number.
4. **Orange:** There are too many accepted invites and the maximum number is exceeded.

This is based on how the location is configured, which we mentioned above in the [Configuring Groups](#configuringgroups) section. You can hover over the progress bar to see the configured capacities and the counts for each type of invite response.

At this point we’re ready to start scheduling some volunteers. There are two ways to add people to the schedule.

## Auto Schedule Vs. Manual Schedule

Imagine being able to effortlessly match every volunteer with their perfect serving role. That’s what Rock’s *Auto Scheduling* feature does. It takes the guesswork out of scheduling and ensures your team is ready to serve without a hitch. With just a click, you can confidently assign volunteers based on their preferences, saving time and avoiding scheduling conflicts.

Auto Scheduling relies on preferences set by each volunteer, either through their *My Account* page or the internal site, where administrators can view and update them as needed. This seamless connection ensures everyone’s availability and preferences are up-to-date, whether volunteers manage their preferences themselves or a staff member adjusts them after a quick chat.

Rock’s logic avoids double-booking volunteers, even the multi-talented ones who are ready for any role. By referencing your schedule configuration, the system ensures no one is assigned to overlapping time slots. As long as you’re using the same schedules to represent the same time frames, then the auto scheduler won’t double book anyone. This is why it’s best to have one shared schedule for a given time, rather than multiple schedules for the same time.

So how exactly does the auto scheduler place people? Are there scenarios where a person can't be automatically scheduled? The table below shows different scenarios for Alisha Marble, who is volunteering with the Children's team. Whether she gets auto scheduled depends on several factors, but it's mostly driven by her preferences. Each row on the table represents a different scenario and its outcome.

| Alisha's Current Schedule | Alisha's Schedule Preference | Alisha's Location Preference | Volunteers Already Assigned/Capacity | Auto-Schedule Result |
| --- | --- | --- | --- | --- |
| \- | \- | \- | 0/3 - Bears   0/3 - Bobcats | Alisha is not scheduled because she has no preferences set. |
| Every Week | \- | \- | 0/3 - Bears   0/3 - Bobcats | Alisha is not scheduled because she has no schedule preference set. |
| Every Week | 10:30am | \- | 0/3 - Bears   0/3 - Bobcats | Alisha is scheduled in the Bears room at 10:30am due to her schedule preference. |
| Every Week | 10:30am | Bears Room | 0/3 - Bears   0/3 - Bobcats | Alisha is scheduled in the Bears room at 10:30am due to her schedule and location preferences. |
| Every Week | 10:30am | Bears Room | 3/3 - Bears   0/3 - Bobcats | Alisha is not scheduled because her preferred location is full. |
| Every Week | 10:30am | \- | 3/3 - Bears   0/3 - Bobcats | Alisha is scheduled for the Bobcats room at 10:30am due to her schedule preference and not having a location preference. |
| Every Week | 10:30am | \- | 3/3 - Bears   3/3 - Bobcats | Alisha is not scheduled because no rooms are available at her preferred time of 10:30am. |

  

*Manual scheduling* is in the name. It’s physically placing people into their serving locations. If we're being realistic here, we know there are going to be those few people who never get around to setting their preferences, so in those cases you’ll have to manually place them.

We’ll start with auto-scheduling, since that should fill in a good portion of our schedule for us. This also means people with preferences set get priority. After clicking the Auto Schedule button, people will be added to the schedule automatically as shown below.

![Auto Schedule](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-autoschedule-v18.png)

Auto Schedule

So, we've got several slots already filled in, but there are still some openings. We can use manual scheduling to fill those gaps. Click the icon for a location/schedule to manually add people to the schedule. As pictured below, all you need to do is check the box next to the person’s name and click Assign. You can find people using the *Search* box near the top-right corner, which is very helpful if you have long lists to look through.

![Add Person Manually](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-add-person-manually-v18.png)

Add Person Manually

You might have noticed the three different tabs above the list of people. Here's what they mean:

- **All Group Members** - Displays everyone in the group who isn't yet scheduled.
- **Matching Week** - Only shows people who are available for the week you're looking at. It checks if they've said "yes" to helping out that week through the *Schedule Template*.
- **Matching Assignment** - Only shows people who are available for the exact time or place you're trying to fill this week. It helps you see who is already working that specific job or possibly available to work it.

Keep in mind that people who have a blackout date can't be auto or manually scheduled.

![Blackout](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-blackout-v18.png)

Blackout

Similarly, you can see if someone has a conflict with another schedule.

![Conflict](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-conflict-v18.png)

Conflict

If you have multiple sites that are close enough to each other that some people volunteer at more than one location, you will run into a scheduling conflict that doesn’t appear as one if the locations have different schedules. For example, one site might have a 4:30pm and 6:00pm schedule while the other only has a 5:00pm schedule. If someone is scheduled for the 4:30pm slot at one site, Rock won’t see a conflict if you try to schedule them for 5:00pm at a different site.

# Note

If both sites have a 4:30pm and 6:00pm schedule, make sure those schedules in your meeting details are the same for all groups. There is no need to have location-specific 4:30pm schedules in the schedule tree.

Block settings enable additional tabs to appear at the top of the *Select Individuals* popup.

![Conflict](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-select-individuals-tab-v18.png)

Alternate Group, Parent Group, and Data View

## Confirmation Communication

You will typically send a mass communication once you have your teams set up for them to accept or decline. Click on the Send Confirmations button near the top of the block to send a confirmation. Rock will automatically send either SMS or email confirmations based on the person's preferences and available information.

![Send Confirmations](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-send-now-v18.png)

Send Confirmations

Alternatively, you can send an individual a communication to accept or decline by clicking on the three dots near their name. This opens a drop-down list of options where you can choose the Resend Confirmation button to send the email or SMS message to confirm or decline again.

![Resend Confirmation](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-resend-confirmation-v18.png)

Resend Confirmation

Note the other options you have for managing scheduled people. As pictured above, you can do things like mark them as Confirmed, or update their schedule preferences.

## Clone Schedules

Clicking the Clone Schedules button near the top-right of the scheduler allows you to copy schedules and existing assignments from one week to another. As pictured below, you can choose to do this only for certain groups, locations or schedules.

![Clone Schedule](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-clone-schedule-v18.png)

Clone Schedule

# Schedule Status Board

The status board gives you a bird’s-eye view of rooms and times, showing what's covered and what is still needed. You can access the status board by navigating to People \> Group Scheduling \> Group Schedule Status Board.

The block settings allow you to choose a parent group to filter out any unnecessary groups showing in the select groups list. The Dates button opens a slider bar to choose how many weeks to show at a time. You can also access the *Group Schedule Roster* and *Group Schedule Communications* pages directly by clicking their links near the top of the page.

![Status Board](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-schedule-status-board-v18.png)

Status Board

# Schedule Analytics

The analytics board acts similarly to the scheduler page. You can choose the group, location and schedule then hit Update to show records of the response, or lack thereof, in one place.

![Schedule Analytics](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-scheduler-analytics-v18.png)

Schedule Analytics

# Group Schedule Roster

The *Group Schedule Roster* shows you who’s serving, plain and simple. Of course, you can see this information from other group scheduling tools, but the roster provides a clean, simplified view of volunteers and where they’re scheduled. This layout is great for printing, to give your staff a paper copy they can use to track volunteers. It even comes pre-populated with checkboxes next to each person’s name, so individuals can be marked off the printed list.

To access the roster, navigate to People \> Group Scheduling \> Group Schedule Roster.

![Group Schedule Roster](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-schedule-roster-v18.png)

Group Schedule Roster

You can click the icon to access the configuration for the roster. These settings let you add or remove the groups, locations and schedules shown on the roster. This way you can rapidly print several different rosters for the day. This is also where you change the date of the roster, to view assignments on different dates.

![Roster Configuration](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-schedule-roster-config-v18.png)

Roster Configuration

By default, the roster is updated automatically every 10 seconds, to pick up scheduling changes as they occur. After all, you don’t want to print outdated rosters, and last-minute changes are always a risk. This “Live Update” feature can be disabled, or set to a different refresh frequency, by accessing the block’s settings. Just keep in mind that a very frequent refresh rate may negatively impact performance.

# Group Scheduling Communications

There are different ways to send group scheduling communications from Rock. You can send scheduling confirmation requests from the *Group Scheduler* page as described above, or you can wait for a job to run to send them for you. You can also send custom one-time communications if you need to.

## Send Group Schedule Notifications Job

Rock will automatically send out confirmation and schedule communications based on the values you set on the Group Type Detail page. By default, these communications will be sent daily at 4pm to people who have not already received them. If you want to change the sending time, you can edit that time in the "Send Group Schedule Notifications" job, which can be viewed under Admin Tools \> Settings \> System \> Jobs Administration.

We have "Scheduling Confirmation Email" and "Group Attendance Reminder" system communications already set up for you, which are of course customizable to fit your organization’s lingo. Just like all system communications, you can view and modify them under Admin Tools \> Settings \> Communications \> System Communications.

See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8#systemcommunications) guide for more information on working with system communications.

## Custom Group Scheduling Communications

While schedule and confirmation communications are certainly useful, sometimes you’ll want to send other types of communications to your teams. On top of that, maybe you just want to contact volunteers who have Accepted the invite, or only those that are serving on Sunday. The *Group Schedule Communication* block lets you do all that, and more, quickly and easily. You can navigate to it directly from People \> Group Scheduling \> Group Schedule Communication or you can access it from the *Group Schedule Status Board*.

![Group Schedule Communication](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-schedule-communication-v18.png)

Group Schedule Communication

# Schedule Coordinator Notifications

Ever been caught off guard by a last-minute volunteer change? Picture this: It’s Sunday morning, the next service is starting soon, and a crucial volunteer has dropped out. As the *Schedule Coordinator* for your serving team, you'll be the first to know, giving you time to adjust and ensure everything runs smoothly.

The Schedule Coordinator can be notified when a volunteer accepts or declines a serving opportunity, or if the volunteer signs up for additional serving opportunities via the *Schedule Toolbox*. The emails Schedule Coordinators receive will look like the one pictured below but will change slightly depending on which action the volunteer takes.

![Scheduling Response](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/scheduling-response-email-v16.png)

Scheduling Response

To start getting notified, there’s a few simple configuration items needed. We’ll walk you through them below.

You can start by updating the *Scheduling* settings on the Group Type ( Admin Tools \> General Settings \> Group Types). Specifically, you’ll make selections for the *Schedule Coordinator Notification Options*. These are the notification options that all groups of this type will use by default.

![Schedule Coordinator Notification Options](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/schedule-coordinator-notification-options-v18.png)

Schedule Coordinator Notification Options

Note above that the *Decline* option is selected. This will send a notification when the volunteer declines a serving opportunity for groups of this type. Any combination of Accept, Decline, or Self-Schedule may be used. You can also select none of the options, which means these notifications will not be sent.

That’s all that’s needed for the Group Type. Next, we’ll drill down to the Group level via the Group Viewer (People \> Group Viewer). There are two important settings you’ll want to know about.

![Schedule Coordinator Notification Settings](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/schedule-coordinator-settings-v18.png)

Schedule Coordinator Notification Settings

The System Communication (Admin Tools \> Communications \> System Communications) that the Schedule Coordinator receives is the *Scheduling Response Email*. It’s ready to use out of the box and contains all the logic needed to decide whether to send an accept, decline, or self-schedule notification.


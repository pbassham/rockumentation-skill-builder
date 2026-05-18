---
description: Use when setting up streak types to track attendance or engagement patterns for groups and activities
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Add New Streak Type

Add New Streak Type

Adding new streak types may look like a simple task because there aren’t a ton of fields. While it’s true that the setup is simple, don’t take it lightly. Before you start, it’s best to have a plan in mind for why and how you want to use the streak type.

In this example we’ll be tracking streaks for our “ASU Student Group”, a small group that meets weekly on Saturdays. Everything related to the group has already been set up. In fact, the group is already well-established and has been meeting regularly for a while. They weren’t taking attendance in Rock at first but started a few months ago. With that backdrop in mind, let’s add a new streak type for this group.

Add New Streak Type

![Add New Streak Type](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-add-new-streak-type-v18.png)

1 Name

Provide a name for the streak type. For our example we’re just using the name of the small group.

2 Active

Set the streak type to active or inactive.

3 Description

You can optionally provide a description for the streak type.

4 Start Date

The start date controls how far back in time the streak type can look for data. In this example we used 8/1/2021, so engagements from July 2021 or earlier won’t be included in these streak calculations.

5 Sync Linked Activity

If this is enabled, then additions to a person's attendance or interactions (based on the Linked Activity) will cause a matching update to the person's engagement map. The reverse will also happen, where adding to a person's engagement map will result in creating new attendance or interaction data.

6 Require Enrollment

If enabled, an individual would need to be manually enrolled in the streak type. Otherwise, the person's engagement will create an enrollment into the streak type for them automatically.

7 Linked Activity

This setting, combined with the *Activity Target* setting described below, helps link the streak type to group, schedule, location, interaction, financial and attendance data. There are several options to choose from:

- **None**  
	You can choose not to have any Linked Activity. In this case you'll have to manage everything (enrollments, maps, exclusions) manually.
- **Attendance: Any**  
	Use this option to cast a wide net. As the name implies, this option will use any available attendance data to build streaks.
- **Attendance: Group**  
	You might use the group option to track streaks for something like weekend attendance. In that case, the *Activity Target* would be the group you use for weekend attendance tracking. The locations and schedules associated with the group are then used to build the streak type maps.
- **Attendance: Group Type**  
	If you select group type then all groups of a certain type (according to your *Activity Target* selection) will be included in the occurrence and engagement maps. For example, you may want to use this linked activity if you're tracking streaks for serving because, in many cases, serving groups all share the same group type.
- **Attendance: Group Type Purpose**  
	With this option, all groups under any group types that share the same purpose are used to build occurrence and engagement maps. For example, you might have two different group types that both contain serving groups. You'll pick the specific purpose in the *Activity Target* field below.
- **Attendance: Check-In Configuration**  
	If you select this option then any group that's used in the specified *Activity Target* check-in configuration will count toward the occurrence and engagement maps. This option is probably best for more complex streaks, like tracking children’s check-in.
- **Interactions**  
	You can use interaction data to drive your streaks. You can choose either Interaction Channels, Interaction Components or Interaction Mediums as the Linked Activity. This is a great way to track engagement beyond traditional in-person attendance.
- **Financial Transaction**  
	Giving is another area where a person can have a streak. You can optionally limit the financial transactions that are evaluated for the streak to a specified account.

It’s important to remember that for this example we’re using the *Attendance: Group* linked activity.

8 Activity Target

This field changes according to your *Linked Activity* selection (above). Specify the group, group type, group type purpose, financial account or check-in template you want to use to build maps for the streak type.

In this example we selected *Attendance: Group* as the linked activity. This allowed us to specify “ASU Student Group” as the group we want for our streak type.

9 Frequency

The frequency determines whether this is a *Daily*, *Weekly*, *Monthly* or *Yearly* streak type. Pick the frequency that makes the most sense for what you’re tracking. Our example group meets once every week on Saturdays, so *Weekly* was selected. You might pick *Daily* if you’re tracking something that meets several days per week.

10 Day of Week Start

If the frequency is *Weekly*, then you can optionally choose the start day of the week. You’ll only need this if you want to use a different start day than the system default.

# Warning

You can’t manually change the *Start Date* or *Frequency* after they’re saved. Generally, the only way to correct these fields is to start over with a new streak type.


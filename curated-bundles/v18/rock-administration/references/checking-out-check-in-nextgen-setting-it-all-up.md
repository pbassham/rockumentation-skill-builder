---
description: "Use when configuring Rock check-in schedules, service times, and cloning schedules for worship services and events"
source: "https://community.rockrms.com/documentation/bookcontent/42/350"
sourceLabel: Checking-out Check-in - NextGen
---
> **Path:** Checking-out Check-in - NextGen > Setting It All Up

Setting It All Up

With your configuration all documented (you did document it, right?), let's jump in and start configuring check-in for your organization.

# Simple Sample

Keep in mind that sample configurations are already present at installation. Feel free to modify these settings, adding new items as needed.

# Service Times

Let's start with something simple by configuring our service times (schedules) under Admin Tools \> Check-in \> Schedules. You'll use the values on this list later in the check-in configuration. They are used to help determine which services are active (allow check-in) at any given time.

![Editing A Schedule](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/schedule-edit-v18.png)

Editing A Schedule

1. Configure your weekend service schedules at Admin Tools \> Check-in \> Schedules.
2. Modify, and if needed, add additional services times to the Service Times category. If you have multiple campuses with different service times, add each unique start time to this list. If two campuses share the same start time, you should only add it once. Our suggestion is to put *all* campus weekend service times in this one category, Service Times.
3. Be sure to set the correct check-in start and end times. The built-in example values start check-in 30 minutes before each service begins and end 30 minutes *after the start*. Adjust these values to fit the needs of your organization.
4. Schedules that overlap will present the person checking in with a choice during that overlap period.
5. Click Edit Schedule to set the day, time and recurrence settings as pictured below.
![Schedule Builder](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/schedule-edit-schedule-builder-v18.png)

Schedule Builder

# Cloning Schedules

At many churches, adding a new schedule for dedicated events often involves duplicating the setup of regular worship services. Staff must manually check each location to ensure it is included in the new schedule. While this is manageable for smaller churches, larger ones with hundreds of locations face an elevated risk of errors, making the process cumbersome and stressful. New to version 17 of Rock, you can now clone schedules.

## How to Clone a Schedule:

1. Go into Admin Tools \> Settings \> Check-In \> Check-In Configuration \> Weekly Service Check-In \> Schedule.
2. Click the Clone Schedule button on the upper right-hand corner.
3. From here a pop up with Copy Schedule will appear. Make sure to add a Source Schedule (the original schedule) and a Destination Schedule (the cloned schedule)
4. This will copy all the enabled locations from the source scheduled into the destination schedule.

# Watch for Matching GroupId

Deleting GroupLocationSchedule records based only on the ScheduleId can cause issues because a single Schedule can be used with different check-in configurations. To delete records safely, you need to ensure that the GroupId in the record matches a group that is part of the current check-in configuration.

# Taking Exception

Of course, there will be times when your regularly-scheduled programming is interrupted by special events or holidays. For example, let's say there are no Saturday services on Easter weekend. You can tell Rock to ignore your regular schedule for that date. This is called an exclusion, and there are two ways to set it up. Let's check them out.

The first way to set up an exclusion is at the schedule parent category level in the main *Schedules* page, found at Admin Tools \> Check-In \> Schedules. This is an easy way to inactivate all schedules in a category for specific date ranges. In the tree navigation, select the parent category for which you want to create an exclusion, such as "Event Schedule" as shown in the screenshot below. Click the to name the exclusion and set the date parameters.

![Scheduled Exclusions](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/scheduled-exclusions-v18.png)

Scheduled Exclusions

The second way to set up an exclusion is at the schedule event (or child) level. From the Schedules page, drill down in the tree navigation to the specific event you want to create an exclusion for. Click the Edit button to display the schedule details for the event, then click Edit Schedule. In the Exclusions section of the Schedule Builder page, click Add Date Range to specify the exclusion parameters as pictured below.

![Schedule Builder Exclusion](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/schedule-builder-add-exclusion-v18.png)

Schedule Builder

# Locations

Next, let’s configure the locations where our children meet.

![Location Details](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/location-details-v18.png)

Location Details

1. Navigate to Admin Tools \> Check-in \> Named Locations.
2. Start by renaming the top-level campus.
3. Next enter each building on your campus.
4. Finally, add locations (or modify the existing ones) for each room that will need to be set up for check-in.

# Areas and Groups

Rock comes with several pre-configured check-in types. Most organizations should be able to simply tweak what is already there using the following steps.

Start by navigating to the check-in configuration screen at Admin Tools \> Check-in \> Check-in Configuration and then select *Weekly Service Check-in*. You'll see the sample configuration for check-in. Note that area headings are blue, with their associated groups indented below in green. If your structure is vastly different, you may want to check with other Rock organizations to ensure that you're on the right track.

![Check-in Configuration (Area)](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/checkin-area-configuration-v18.png)

Check-in Configuration (Area)

# About Load Balancing

When the Load Balancing option is used, Rock strives to keep family members who belong to the same check-in group (such as twins or a family member with their guest/friend) together in the same location or room within a single family check-in session. To help prevent unwanted splitting, it is recommended to order your rooms by largest capacity first. Additionally, Rock respects each location's capacity (soft threshold) when balancing the load. Consequently, rooms may not always be perfectly balanced when Load Balancing is in use.

# No Labels

If for some reason you do not want labels, just delete them from the Area. It's that simple.

Once you have your areas configured, move down to the groups under each area. You'll notice that groups have a green top border. Under each area, configure the groups that are needed for your organization.

![Check-in Configuration (Group)](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/checkin-group-configuration-v18.png)

Check-in Configuration (Group)

# Settings

There are several settings that can be configured for the check-in type that control the behavior of check-in. While the default values are probably sufficient for most installations, you can change any of them to suit your particular needs. These are updated by selecting the Edit button on the Check-in Type. You get there from Admin Tools \> Check-In \> Check-in Configuration.

![Editing Settings](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/checkin-settings-v18.png)

Editing Individual Settings

The General Settings have a few extra options if the *Check-In Type* is set to Family. Below we have descriptions for those settings that only apply if you are using the Family Check-In type.

![Family Settings](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/check-in-extra-family-settings-v18.png)

Editing Family Settings

# Location Schedules

Now that we have many of the details covered, we can schedule the locations and their availability. This allows you to configure check-in to only allow certain rooms to be used at specific times. We'll do this from the Schedule Builder.

1. First head to Admin Tools \> Settings \> Check-in Configuration.
2. Select the Schedule button in the lower right corner of the check-in configuration screen.
3. Now you'll see a large grid. Each combination of location/group will have a row, while each possible schedule time will have a column. To make configuration easier, you may wish to filter the locations by a specific campus or building, check-in area, or schedule.
4. Check the check box for each schedule time when you wish to allow check-in for the specific location/group.
5. Don’t forget to click the Save button at the bottom of the screen.
![Schedule Builder](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/check-in-schedule-builder-v18.png)

Schedule Builder


---

## All About Labels {#all-about-labels}

> **Path:** Checking-out Check-in - NextGen > All About Labels

All About Labels

Out-of-the-box, Rock comes with a sample set of labels for use with check-in: Child Label, Note Label, Parent Label and Name Tag. There are five different types of labels, each suited to different scenarios: *Family*, *Person*, *Attendance*, *Checkout*, and *Person Location*\-based. To learn more about label types, see the [Appendix - Label Types](#appendixlabeltypes)

| Label Description | Sample |
| --- | --- |
| **Child Label:** This is the label that will be placed on the child. It uses the *Person* label type. | ![Child Label](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/label-child.png) |
| **Note Label:** This label highlights any allergy or legal notes as well as providing a place for writing custom notes. It uses the *Person Location* label type. | ![Note Label](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/label-notes.png) |
| **Parent Label:** This is the label that will be handed to the parents at check-in to be used as a token for checking the child out. It uses the *Family* label type. | ![Parents Label](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/label-parents.png) |
| **Name Tag:** This label can be used as a name tag for volunteer or event check-in. It uses the *Person* label type. | ![Name Tag](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/label-name-tag.png) |

# A Note On First Visit

The first visit check-in icon will display if it's the child's first time checking into a group of any type (they've never checked into any group before). The flag does not look at the 'First Visit' person attribute, instead it solely uses group attendance data.


---

## Label Designer {#label-designer}

> **Path:** Checking-out Check-in - NextGen > Label Designer

Label Designer

The Label Designer feature in Rock offers a straightforward interface for creating custom labels tailored to different check-in scenarios. In the past, you may have needed to code labels using ZPL, which required significant technical expertise. Now, the Label Designer eliminates the need for complex coding, allowing you to add elements like text, icons, and security codes to your labels with just a few clicks. This feature is an incredible improvement, whether you're designing labels for children, volunteers, or attendees.

When designing a label, there are two main steps to the process: giving the label a name and filling out essential details, and then designing the actual label. You can access the first step by navigating to Admin Tools \> Settings \> Check-in \> Next-gen Labels. Let’s walk through these steps to understand what’s involved.

![Next-Gen Labels](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/next-gen-labels-list-v18.png)

Working with Label Setup

# Label Setup

![Working with Label Setup](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/label-designer-label-setup-v18.png)

Next-Gen Labels

With the basic setup complete, you can now start designing the label itself. After creating a new label, click on the Label Designer button to begin customizing your label’s layout.

# Creating Custom Labels

The Label Designer provides a blank canvas and a panel of controls on the left, which you can drag and drop onto the label. Adding images, security codes, or text is as simple as selecting the desired control and positioning it on the label. Let’s explore a few key features to help you get the most out of this design tool.

![Label Designer Overview](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/label-designer-overview-v18.png)

Label Designer Overview

# Customizing Controls

Every control you place on the label comes with its own customization options. For example, the Attendee Info control lets you display attendee-specific details such as name, birth date, or custom attributes. As you design your label, it’s a good idea to review these settings to ensure the final product looks exactly how you want.

![Customizing Controls](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/label-designer-customizing-controls-v18.png)

Customizing Controls

Finally, you can right-click on any control to manage its layering. This enables creative designs by allowing elements to overlap and appear in front of or behind other elements, like the cake and star icons in the example shown above.

# Linking Labels to Check-in

Once your labels are designed, you’ll need to link them to the appropriate check-in configurations under Admin Tools \> Settings \> Check-in Configuration. Make sure each label is correctly assigned to its corresponding check-in area, just as you would with legacy labels. This is done under the *Next-Gen Check-in Labels* section as pictured below.

![Linking Labels to Check-in](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/label-designer-link-to-checkin-v18.png)

Linking Labels to Check-in

If you’ve been using labels in Rock prior to v16.7, you’ll need to replicate those labels in Label Designer. So, if a check-in area previously had a Parent Label and a Child Label, you’ll need to create a matching Parent Label and Child Label in the Label Designer.


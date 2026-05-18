---
description: "Use when configuring check-in schedules, service times, and cloning schedules for Rock administration setup"
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Setting It All Up

Setting It All Up

With your configuration all documented (you did document it, right?), let's jump in and start configuring check-in for your organization.

# Simple Sample

Keep in mind that sample configurations are already present at installation. Feel free to modify these settings, adding new items as needed.

# Service Times

Let's start with something simple by configuring our service times (schedules) under Admin Tools \> Check-in \> Schedules. You'll use the values on this list later in the check-in configuration. They are used to help determine which services are active (allow check-in) at any given time.

![Editing A Schedule](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/schedule-edit-v15.png)

Editing A Schedule

1. Configure your weekend service schedules at Admin Tools \> Check-in \> Schedules.
2. Modify, and if needed, add additional services times to the Service Times category. If you have multiple campuses with different service times, add each unique start time to this list. If two campuses share the same start time, you should only add it once. Our suggestion is to put *all* campus weekend service times in this one category, Service Times.
3. Be sure to set the correct check-in start and end times. The built-in example values start check-in 30 minutes before each service begins and end 30 minutes *after the start*. Adjust these values to fit the needs of your organization.
4. Schedules that overlap will present the person checking in with a choice during that overlap period.
5. Click Edit Schedule to set the day, time and recurrence settings as pictured below.
![Schedule Builder](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/schedule-edit-schedule-builder.png)

Schedule Builder

# Cloning Schedules

At many churches, adding a new schedule for dedicated events often involves duplicating the setup of regular worship services. Staff must manually check each location to ensure it is included in the new schedule. While this is manageable for smaller churches, larger ones with hundreds of locations face an elevated risk of errors, making the process cumbersome and stressful. New to version 17 of Rock, you can now clone schedules.

## How to Clone a Schedule:

1. Go into Admin Tools \> Settings \> Check-In \> Check-In Configuration \> Weekly Service Check-In \> Schedule.
2. Click the Clone Scheduled Button on the upper right-hand corner.
3. From here a pop up with Copy Schedule will appear. Make sure to add a Source Schedule (the original schedule) and a Destination Schedule (the cloned schedule)
4. This will copy all the enabled locations from the source scheduled into the destination schedule.

# Watch for Matching GroupId

Deleting GroupLocationSchedule records based only on the ScheduleId can cause issues because a single Schedule can be used with different check-in configurations. To delete records safely, you need to ensure that the GroupId in the record matches a group that is part of the current check-in configuration.

# Taking Exception

Of course, there will be times when your regularly-scheduled programming is interrupted by special events or holidays. For example, let's say there are no Saturday services on Easter weekend. You can tell Rock to ignore your regular schedule for that date. This is called an exclusion, and there are two ways to set it up. Let's check them out.

The first way to set up an exclusion is at the schedule parent category level in the main *Schedules* page, found at Admin Tools \> Check-In \> Schedules. This is an easy way to inactivate all schedules in a category for specific date ranges. In the tree navigation, select the parent category for which you want to create an exclusion, such as "Event Schedule" as shown in the screenshot below. Click the to name the exclusion and set the date parameters.

![Scheduled Exclusions](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/scheduled-exclusions-v13.png)

Scheduled Exclusions

The second way to set up an exclusion is at the schedule event (or child) level. From the Schedules page, drill down in the tree navigation to the specific event you want to create an exclusion for. Click the Edit button to display the schedule details for the event, then click Edit Schedule. In the Exclusions section of the Schedule Builder page, click Add Date Range to specify the exclusion parameters as pictured below.

![Schedule Builder Exclusion](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/schedule-builder-add-exclusion-v13.png)

Schedule Builder

# Locations

Next, let’s configure the locations where our children meet.

![Location Details](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/location-details-v13.png)

Location Details

1. Navigate to Admin Tools \> Check-in \> Named Locations.
2. Start by renaming the top-level campus.
3. Next enter each building on your campus.
4. Finally, add locations (or modify the existing ones) for each room that will need to be set up for check-in.

# Areas and Groups

Rock comes with several pre-configured check-in types. Most organizations should be able to simply tweak what is already there using the following steps.

Start by navigating to the check-in configuration screen at Admin Tools \> Check-in \> Check-in Configuration and then select *Weekly Service Check-in*. You'll see the sample configuration for check-in. Note that area headings are blue, with their associated groups indented below in green. If your structure is vastly different, you may want to check with other Rock organizations to ensure that you're on the right track.

![Check-in Configuration (Area)](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-area-configuration-v13.png)

Check-in Configuration (Area)

# About Load Balancing

When the Load Balancing option is used, Rock strives to keep family members who belong to the same check-in group (such as twins or a family member with their guest/friend) together in the same location or room within a single family check-in session. To help prevent unwanted splitting, it is recommended to order your rooms by largest capacity first. Additionally, Rock respects each location's capacity (soft threshold) when balancing the load. Consequently, rooms may not always be perfectly balanced when Load Balancing is in use.

# No Labels

If for some reason you do not want labels, just delete them from the Area. It's that simple.

Once you have your areas configured, move down to the groups under each area. You'll notice that groups have a green top border. Under each area, configure the groups that are needed for your organization.

![Check-in Configuration (Group)](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-group-configuration-v16.png)

Check-in Configuration (Group)

# Settings

There are several settings that can be configured for the check-in type that control the behavior of check-in. While the default values are probably sufficient for most installations, you can change any of them to suit your particular needs. These are updated by selecting the Edit button on the Check-in Type. You get there from Admin Tools \> Check-In \> Check-in Configuration.

![Editing Settings](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-settings-v14.png)

Editing Individual Settings

The General Settings have a few extra options if the *Check-In Type* is set to Family. Below we have descriptions for those settings that only apply if you are using the Family Check-In type.

![Family Settings](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-extra-family-settings-v14.png)

Editing Family Settings

## Check-in Display Settings

You can also control the content of the start page, the family select list results, the person select list results, and what is shown when someone successfully checks in. Four different templates are inside the *Display Settings* section when editing a check-in configuration. Typically, you won't need to make changes to these templates.

![Display Settings](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-display-settings-v13.png)

Display Settings

# Location Schedules

Now that we have many of the details covered, we can schedule the locations and their availability. This allows you to configure check-in to only allow certain rooms to be used at specific times. We'll do this from the Schedule Builder.

1. First head to Admin Tools \> Check-in \> Check-in Configuration.
2. Select the Schedule button in the lower right corner of the check-in configuration screen.
3. Now you'll see a large grid. Each combination of location/group will have a row, while each possible schedule time will have a column. To make configuration easier, you may wish to filter the locations by a specific campus or building, check-in area, or schedule.
4. Check the check box for each schedule time when you wish to allow check-in for the specific location/group.
5. Don’t forget to click the Save button at the bottom of the screen.
![Schedule Builder](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-schedule-builder-v16.png)

Schedule Builder


---

## All About Labels {#all-about-labels}

> **Path:** Checking-out Check-in > All About Labels

All About Labels

Out-of-the-box, Rock comes with a standard set of labels for use with check-in. There are two different types of labels: plain-text and icon-based. The icon-based labels, while more attractive, require that you install a specific font on each of your printers. This really isn’t hard (we walk you through it below), but some organizations may want to keep it simple and stick with the plain-text labels. Each of these labels is discussed below, with some notes on their usage.

| Label Description | Sample |
| --- | --- |
| **Child Label (Plain Text):** This is the label that will be placed on the child. This is a plain-text version that does not require installing the rockcheckin.ttf font on each printer. | ![Child Label Plain-Text](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/label-child-text.png) |
| **Child Label (Icons):** This is an icon version of the child check-in label. | ![Child Label](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/label-child.png) |
| **Note Label:** This label highlights any allergy or legal notes as well as providing a place for writing custom notes. | ![Note Label](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/label-notes.png) |
| **Parent Label:** This is the label that will be handed to the parents at check-in to be used as a token for checking the child out. | ![Parents Label](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/label-parents.png) |
| **Name Tag:** This label can be used as a name tag for volunteer or event check-in. | ![Name Tag](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/label-name-tag.png) |

# A Note On First Visit

The first visit check-in icon will display if it's the child's first time checking into a group of any type (they've never checked into any group before). The flag does not look at the 'First Visit' person attribute, instead it solely uses group attendance data.

# Label Settings

There are a few things you can configure for labels. The default values are probably sufficient for most installations, but you can change any of them to suit your particular needs. You get there from Admin Tools \> Check-In \> Check-in Labels and then select the label you would like to edit.

![Edit Check-in Label](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/label-settings-v13.png)

Edit Check-in Label

# Label Editor

The label editor is for advanced users who are able to edit the label in its native ZPL format. If you're just getting started you may want to use the [ZebraDesigner](#installingzebradesigner) program instead to modify your labels.

![Label Editor](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/label-editor-v13.png)

Label Editor


---

## Kiosks {#kiosks}

> **Path:** Checking-out Check-in > Kiosks

Kiosks are the hardware devices used to check-in. Setting up kiosks allows you to specify the check-in configuration for a specific device or set of devices. This is helpful if, for example, you have a set of kiosks in your youth area and only want them used for the services in that area.

The two main configuration points for the kiosk are:

1. **Locations:** Kiosks are assigned to allow check-in for selected locations.
2. **Printing:** Kiosks also help manage how and where printing takes place. See the [Printing](#printing) section for more options for label printing.

# Configuring Kiosks

You can manage your check-in kiosks under Admin Tools \> Check-in \> Devices. Keep in mind that Rock supports multiple types of devices. Check-in kiosks are just one type. (Printers are also configured here.)

When the check-in system starts up, it lists the kiosk devices so the attendant can select which kiosk configuration to use.

It's also helpful to know that when you define a check-in kiosk configuration, it can be used on multiple physical machines at the same time. This means that when you define a check-in kiosk for use in your youth building, that definition can be used for each check-in computer or tablet in that area. Think of these configuration definitions as kiosk templates, not physical machines.

Whether you are adding a new kiosk or editing an existing one, you'll use the screen below to manage the configuration.

![Kiosk Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/device-setup-with-camera-v13.png)

Kiosk Configuration


---

## Locations {#locations}

> **Path:** Checking-out Check-in > Locations

Locations configure where individuals can check in. Think of them like buildings or rooms for your check-in. Locations are tied to check-in groups and enabled through schedules. Let's take a look at an example to see how they work.

![Check-in Locations](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-locations.png)

Sample Configuration

The diagram above shows a configuration for a large church's *Three Year Olds* check-in group. As you can see, the church has two campuses it calls *North* and *South* and each of these campuses has multiple locations (aka, rooms) for their three-year-olds. Based on attendance patterns, all of these rooms are not needed during all services. In this configuration, the *Crickets Room* is not set up to be used during the second service of the day.

# Editing Locations

Locations are edited under Admin Tools \> Check-in \> Named Locations. Locations are hierarchical in nature, so build them out to match the structure of your buildings.

![Check-in Locations](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/location-details-v13.png)

Named Locations

# Scheduling Locations

Group/Location pairs are matched to schedules at Admin Tools \> Check-in \> Check-in Configuration (click the Schedule button.)

# Opening / Closing Locations

We've seen how you can enable or disable a location based on a schedule. Each location also has an open/closed state. Say for instance you want the *Bears Room* to be used for your 9:00 am service but need to be able to close it if it reaches capacity. Once it reaches capacity, you can close the room from the [Check-in Manager](#checkinmanager) or the [Device Manager](#devicemanager) (more info on these below) and it will no longer be available as an option for check-in.

Of course, you probably don’t want to keep the room closed forever. If you’ve closed the *Bears Room* for your 9:00 am service, you’ll want it open again for your 10:30 am service. You can manually open rooms the same way that they were manually closed, or you can configure the [Auto Open Locations](https://community.rockrms.com/documentation/bookcontent/9#jobs) job to reopen them for you automatically at certain intervals.

# Location Thresholds

In addition to simply closing rooms manually, you can also configure locations to have threshold limits for the number of people that can be checked into the location at once. These limits are evaluated during check-in and once they are reached, the location will automatically stop being available as an option for people to check into.

1. **Threshold:** If this number is reached, check-in will not allow people to check into the location unless an attendant overrides the threshold.
2. **Threshold (Absolute):** Once this number is reached, check-in will absolutely not allow people to check in to the location at all, ever… even if an attendant attempts to override the threshold.


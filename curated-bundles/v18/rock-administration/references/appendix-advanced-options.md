---
description: "Use when configuring advanced check-in options like preventing duplicate check-ins, custom label printing for groups, or setting room capacity thresholds"
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Appendix - Advanced Options

This chapter is intended only for those who need to configure some of the advanced options that are not enabled out-of-the-box in Rock.

# Prevent Duplicate Check-in

By default, when you enable the [Prevent Duplicate Check-in](#settings) option for a check-in *Area*, it affects all groups under that area. If you find yourself in a situation where you really only wanted one specific group type to be affected, don't check this option under the check-in area. Instead, you can add a Boolean attribute with a key of `PreventDuplicateCheckin` to the group type under Admin Tools \> General Settings \> Group Types. You can even add it to a group type that is inherited by other group types.

The underlying *Filter By Previous Checkin* workflow action used by the check-in system always checks for this specific attribute and value if the [Prevent Duplicate Check-in](#settings) option is not already checked. The end result is that you can control which check-in areas do not allow re-checking-in instead of using the "all or nothing" option within Check-in Configuration.

An example of this might be you wanting to prevent duplicate check-in for kids/youth (to prevent label reprinting shenanigans) but allowing it for Classes/Events where duplicate check-in is a great way to reprint a name tag for an adult if the printer ate it or similar.

# Printing a Label for Specific Groups

The *Label* field type is an advanced option for group attributes that you may find helpful in specific situations. For example, you could run into a scenario where you have a group that needs labels printed but is of a group type that doesn't print labels. Rather than create a new group type, you can create a group attribute with the field type *Label* that the groups of that type can use. If a group selects a Label value, Rock will print that label at check-in.

To add the Label attribute, go to the *Group Attributes* section of the group type's detail screen, and click to add a new attribute. For the *Field Type*, select "Label" and click Save. Now that the group attribute is available, individual groups can choose the type of label they want printed in the *Edit* screen of the *Group Viewer*.

# In Addition...

Note: This label prints *in addition to* the labels printed for the area, or group type.

# Check-in Room Threshold

Although Rock examines room capacity when starting the check-in process to avoid displaying over-capacity rooms during check-in, there is another feature that will double-check the capacity again before allowing a person to check-in. This feature will add a bit more strain on your system, so you should consider wisely before enabling it on your system.

# Absolute threshold

When attempting to check-in a child using the manager override, please note that even your manager cannot bypass the location's "absolute" threshold... and that makes your local fire department happy too.

## Enabling the Threshold

First, you will need to have each room's threshold set.

Go to Admin Tools \> General Settings \> Workflow Configuration, edit the workflow called "Unattended Check-in", expand the *Save Attendance* activity and expand the *Save Attendance* action. You will see a setting for *Enforce Strict Location Threshold*. To enable, simply change the response from No to Yes. Once you are done be sure to hit save before exiting the page.

![save attendance](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-threshold-settings-v13.png)

Save Attendance

Just before the attendance record is saved, the action verifies the room count again. If a room is at capacity, a warning message is created for people trying to check in.

# Absolute threshold

NOTE: The formatting and layout of the check-in 'warning' messages can be seen in the check-in area's "Success Template" under Admin Tools \> Check-in \> Check-in Configuration.

Table of Contents

- [Welcome](#welcome)
- [Check-In Systems](#checkinsystems)
- [Check-In Processes Available in Rock](#checkinprocessesavailableinrock)
- [Learning the Lingo](#learningthelingo)
- [Individual and Family Check-In in Rock](#individualandfamilycheckininrock)
- [The Administration Screen](#theadministrationscreen)
- [Types of Customization](#typesofcustomization)
- [Sample Configurations](#sampleconfigurations)
- [Planning Your Configuration](#planningyourconfiguration)
- [Setting It All Up](#settingitallup)
- [All About Labels](#allaboutlabels)
- [Kiosks](#kiosks)
- [Locations](#locations)
- [Printing](#printing)
- [Rock Cloud Printing](#rockcloudprinting)
- [Allergies and Legal Notes](#allergiesandlegalnotes)
- [Ability Levels](#abilitylevels)
- [First Time Registration](#firsttimeregistration)
- [Check-in Registration](#checkinregistration)
- [Check-In Manager](#checkinmanager)
- [Device Manager](#devicemanager)
- [Attendance Analytics](#attendanceanalytics)
- [Printers](#printers)
- [Check-In Relationships](#checkinrelationships)
- [Check-In Kiosk Options](#checkinkioskoptions)
- [Going Deeper With Areas](#goingdeeperwithareas)
- [Check-In Test Area](#checkintestarea)
- [Themes](#themes)
- [Creating Custom Labels](#creatingcustomlabels)
- [Beyond Children's Check-In](#beyondchildrenscheckin)
- [Rapid Attendance Entry](#rapidattendanceentry)
- [Attendance Self Entry](#attendanceselfentry)
- [Additional Check-In Options](#additionalcheckinoptions)
- [Mobile Check-in](#mobilecheckin)
- [Check-in Celebrations](#checkincelebrations)
- [Appendix - Advanced Options](#appendixadvancedoptions)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


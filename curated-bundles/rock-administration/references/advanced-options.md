---
description: "Use when configuring Rock check-in rules, enrollment preferences, anonymous access, schedule selection automation, or designing custom check-in labels"
source: "https://community.rockrms.com/documentation/bookcontent/42/350"
sourceLabel: Checking-out Check-in - NextGen
---
> **Path:** Checking-out Check-in - NextGen > Advanced Options

Advanced Options

This chapter is intended for those who need to configure some of the advanced options which may not be enabled out-of-the-box in Rock.

# Advanced Option - Check-in Rule: Already Enrolled in Group

You might wonder why you would use the *Prefer Enrolled Groups* option. For example, let's say there is a general group called "General 2nd" for all 2nd graders and a set of "permanent" small groups for the same grade, where kids are assigned to specific leaders. These small groups use the **Already Enrolled In Group** rule.

- On Noah's first visit, he checks into the "General 2nd" group since it's his only match.
- During the week, he is assigned to a permanent group.
- On his next visit, Noah matches both the "General 2nd" group and his permanent group.

If **Matching Logic** is set to **Must Be Enrolled**, both groups are available for Noah to choose. If set to **Prefer Enrolled Groups**, the "General 2nd" group is removed, ensuring Noah checks into his assigned small group with his leader.

# Advanced Option - Allowing Anonymous Access

Out of the box, the NextGen check-in system requires authentication to interact with it. However, to break free of this requirement follow these steps:

1. Update page security of the next-gen check-in pages to allow anonymous.
2. Configure a way to prevent access to these pages from undesired sources such as the public Internet.
	# Warning!
	This is critical because otherwise you will expose and leak the REST api key you set up in the next two steps!
3. Create a REST API key and add it to the *APP - Check-in Devices* security role (or otherwise give it access to the check-in v2 API endpoints).
4. Edit *Check-in Kiosk* block settings and set the REST API key to use for anonymous access.

# Advanced Option - Select All Schedules Automatically

There is also a setting in the new *Check-in Kiosk* block called *Select All Schedules Automatically* that, when enabled, will automatically select all available schedules instead of asking the individual to make a selection.

![Block settings for the new Check-in Kiosk block](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/advanced-options-check-in-kiosk-block-settings.png)

Check-in Kiosk Block Settings

# Appendix - Label Types

For those looking to create custom check-in labels, this section provides an overview of different label types and tips on when to use each. You'll also find a list of available Lava merge fields and data for each label type to help guide your design choices.

- **Family:** Only one instance of this label is printed for a check-in session (i.e. trip through the kiosk). The following merge fields are available in this label type:
	- `AllAttendance` (an array of `LabelAttendanceDetail`)
		- `Family` (type `Group`)
		- `JustCompletedAchievements` (an array of string)
		- `JustCompletedAchievementIds` (an array of int)
		- `CheckInDateTime` (type DateTime)
		- `CurrentDateTime` (type DateTime)
		- `NickNames` (an array of string)
		- `FirstNames` (an array of string)
		- `LastNames` (an array of string)
		- `AreaNames` (an array of string)
		- `GroupNames` (an array of string)
		- `LocationNames` (an array of string)
		- `ScheduleNames` (an array of string)
- **Person:** One label is printed for every person checked in during that session. The following merge fields are available in this label type:
	- `Person` (type `Person`)
		- `PersonAttendance` (an array of `LabelAttendanceDetail`)
		- `AllAttendance` (an array of `LabelAttendanceDetail`)
		- `Family` (type `Group`)
		- `JustCompletedAchievements` (an array of string)
		- `JustCompletedAchievementIds` (an array of int)
		- `InProgressAchievements` (an array of string)
		- `InProgressAchievementIds` (an array of int)
		- `PreviouslyCompletedAchievements` (an array of string)
		- `PreviouslyCompletedAchievementIds` (an array of int)
		- `IsFirstTime` (type bool)
		- `AreaNames` (an array of string)
		- `CheckInDateTime` (type DateTime)
		- `CurrentDateTime` (type DateTime)
		- `GroupNames` (an array of string)
		- `GroupRoleNames` (an array of string)
		- `LocationNames` (an array of string)
		- `ScheduleNames` (an array of string)
		- `SecurityCode` (type string)
- **Attendance:** One label is printed for every Attendance record record, i.e. if you check Noah into the 9am service Bears room AND the 11am service Bears room, he will get 2 of these labels because 2 attendance records were created. The following merge fields are available in this label type:
	- `Attendance` (type `LabelAttendanceDetail`)
		- `Person` (type `Person`)
		- `Location` (type NamedLocationCache)
		- `PersonAttendance` (an array of `LabelAttendanceDetail`)
		- `AllAttendance` (an array of `LabelAttendanceDetail`)
		- `Family` (type `Group`)
		- `JustCompletedAchievements` (an array of string)
		- `JustCompletedAchievementIds` (an array of int)
		- `InProgressAchievements` (an array of string)
		- `InProgressAchievementIds` (an array of int)
		- `PreviouslyCompletedAchievements` (an array of string)
		- `PreviouslyCompletedAchievementIds` (an array of int)
		- `CheckInDateTime` (type DateTime)
		- `CurrentDateTime` (type DateTime)
		- `GroupRoleNames` (an array of string)
- **Checkout:** One label is printed for each person during check-out. The following merge fields are available in this label type:
	- `Attendance` (type `LabelAttendanceDetail`)
		- `Person` (type `Person`)
		- `Family` (type `Group`)
		- `CheckInDateTime` (type DateTime)
		- `CheckoutDateTime` (type DateTime)
		- `CurrentDateTime` (type DateTime)
		- `GroupRoleNames` (an array of string)
- **Person Location:** One label is printed for each person at each location. If you check Noah into the 9am service Bears room AND the 11am service Bears room, he will get one of these labels. I fyou check Noah into the 9am service Bears room AND the 11am service Kittens room, he will get two of these labels. The following merge fields are available in this label type:
	- `Person` (type `Person`)
		- `Location` (type NamedLocationCache)
		- `PersonAttendance` (an array of `LabelAttendanceDetail`)
		- `LocationAttendance` (an array of `LabelAttendanceDetail`)
		- `AllAttendance` (an array of `LabelAttendanceDetail`)
		- `JustCompletedAchievements` (an array of string)
		- `JustCompletedAchievementIds` (an array of int)
		- `InProgressAchievements` (an array of string)
		- `InProgressAchievementIds` (an array of int)
		- `PreviouslyCompletedAchievements` (an array of string)
		- `PreviouslyCompletedAchievementIds` (an array of int)
		- `AreaNames` (an array of string)
		- `CheckInDateTime` (type DateTime)
		- `CurrentDateTime` (type DateTime)
		- `GroupNames` (an array of string)
		- `GroupRoleNames` (an array of string)
		- `IsFirstTime` (type bool)
		- `ScheduleNames` (an array of string)
		- `SecurityCode` (type string)

## Other Merge Fields

Items above such as `Group` or `Person` can be found in your *Model Map* power tool (under Admin Tools \> Settings \> Model Map). However some items such as `LabelAttendanceDetail` and `AchievementBag` are not found there. Therefore, we're including a few more items here to help you understand what these things represent.

- `LabelAttendanceDetail`
	- `Person` (type `Person`)
		- `StartDateTime` (type DateTime)
		- `EndDateTime` (type DateTime?)
		- `IsFirstTime` (type bool)
		- `Area` (type `GroupTypeCache`)
		- `Campus` (type `CampusCache`)
		- `Device` (type `DeviceCache`)
		- `Group` (type `GroupCache`)
		- `Location` (type `NamedLocationCache`)
		- `Schedule` (type `NamedScheduleCache`)
		- `SearchType` (type `DefinedValueCache`)
		- `GroupMembers` (an array of `GroupMember`)
		- `SecurityCode` (type string)
		- `Source` (type `DefinedValueCache`)
		- `JustCompletedAchievements` (an array of `AchievementBag`)
		- `InProgressAchievements` (an array of `AchievementBag`)
		- `PreviouslyCompletedAchievements` (an array of `AchievementBag`)
- `AchievementBag`
	- `Id` (type string, IdKey value)
		- `AchievementTypeId` (type string, IdKey value)
		- `Name` (type string)
		- `Progress` (type decimal)
		- `TargetCount` (type int?)
		- `IsSuccess` (type bool)
		- `IsClosed` (type bool)
		- `StartDateTime` (type DateTime)
		- `EndDateTime` (type DateTime?)

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
- [Label Designer](#labeldesigner)
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
- [Beyond Children's Check-In](#beyondchildrenscheckin)
- [Rapid Attendance Entry](#rapidattendanceentry)
- [Attendance Self Entry](#attendanceselfentry)
- [Additional Check-In Options](#additionalcheckinoptions)
- [Check-in Celebrations](#checkincelebrations)
- [Advanced Options](#advancedoptions)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


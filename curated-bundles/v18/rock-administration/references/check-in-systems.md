---
description: Use when determining which digital check-in system type to implement for a church or organization
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Check-In Systems

Check-In Systems

Before we get into the details of Rock’s check-in system, let’s start with a broad overview of what check-in is and how it works.

In general terms, check-in involves a person attending a group at a location at a specific time. Each of these elements ties to a component in Rock. A person. A group or area. A location. A time (schedule). The check-in system consists of a series of screens that allow a guest to identify each of these elements and capture them in an electronic record. In many check-in systems, the process ends with some kind of identification label being printed.

# Types of Digital Check-In Systems

Digital check-in systems have been in use for over a decade. Over the years these systems have developed into three basic categories:

- Centralized self-service check-in
- Decentralized check-in
- Centralized attended check-in

There are pros and cons to each system. Let’s take a look at each.

## Centralized Self-Service Check-In

With the centralized self-service model, attendees check themselves in at a main kiosk that serves multiple areas and rooms.

**Pros:**

- Once people are familiar with the system, they become comfortable and efficient with the check-in process
- Does not require as many volunteers
- Families with multiple kids can check-in all of their kids at the same time

**Cons:**

- Can be somewhat intimidating for first-time guests

## Decentralized Check-In

Decentralized check-in places a kiosk in every room where check-in is required.

**Pros:**

- Attendees get to observe the room (considering the teacher and students in the room) before checking in
- Can be fast since you don’t need to select the location and there are smaller lines due to the greater number of kiosks

**Cons:**

- Higher equipment costs due to the number of kiosks and printers needed
- Families with multiple kids of different ages need to go through the check-in process more than once
- Increased support costs due to the number of kiosks required

## Centralized Attended Check-In

In this model, attendees walk up to a kiosk that is staffed by a volunteer who performs the check-in process for the guest.

**Pros:**

- Good experience for first-time guests

**Cons:**

- After the first check-in many people may prefer to do the process themselves
- Must have a volunteer for each kiosk
- Can be slower since there is an added communication layer

# Registration Mode

Rock has [Registration Mode](#checkinregistration) for churches that desire to register or edit new families as they arrive.


---

## Checking-out Check-in {#checking-out-check-in}

> **Path:** Checking-out Check-in

This skill catalogs the chapters of *Checking-out Check-in* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Checking-out Check-in > Welcome

Attendance data is the backbone of any organization's information strategy. Not only can it provide safety and security to the children who attend your events, it also provides a window into each person's ongoing relationship with your organization.

As you read through this guide and start to think about configuring check-in for your organization, you'll realize the system has a ton of flexibility. Keep in mind that the downside of flexibility is complexity. To keep it simple, consider using the out-of-the-box configuration as much as possible, renaming locations, groups and service times as needed. As you get more comfortable with Rock, you can dive deeper into some of the more complex configurations.


---

## Check-In Processes Available in Rock {#check-in-processes-available-in-rock}

> **Path:** Checking-out Check-in > Check-In Processes Available in Rock

Check-In Processes Available in Rock

Rock provides two different types of basic check-in processes: Family and Individual.

Family check-in allows a family to check in multiple family members at once. A family can walk up to a central kiosk and check in everyone at the same time with a minimum number of steps. Adults may be checked into volunteer (or other) groups while also checking in their children.

As you might guess, Individual check-in checks in one person at a time. The process leads one person through the selection of groups, locations, and times, then repeats for each additional family member.

The check-in process is similar for both systems. Rock defaults to the Family check-in configuration, but you can easily change this when configuring your check-in process. More on that in a bit.

While Individual check-in is typically used for decentralized scenarios and Family is typically used for centralized, there is no requirement that you stick to this pattern. You could choose to use the family check-in configuration with a decentralized system, letting families check-in all of their children at the first location, then taking the kids to individual rooms without needing to check them in again. The system is designed to be flexible.


---

## Learning the Lingo {#learning-the-lingo}

> **Path:** Checking-out Check-in > Learning the Lingo

Learning the Lingo

Let's talk about vocabulary. Feel free to revisit this section as you go through the manual to clarify the meanings of these terms.

| Term | Definition |
| --- | --- |
| Check-in Configurations | A check-in configuration is what you start with when configuring check-in. All the settings are associated with a particular configuration. When you start a check-in kiosk, one of the first things you'll be asked is which check-in configuration to use. Examples of check-in configurations include Volunteer Check-In and Weekly Service Check-In (for kids). |
| Areas | This is a high-level collection of related check-in groups. Typically, these will match your organizational structure. Within an area, you'll probably have several groups that individuals can check into. Areas allow you to organize your groups into collections of similar groups. Example areas in the default configuration include: Nursery/Preschool, Elementary, Jr High and High School. For those who like to know how things work under the hood, areas are simply Rock group types. For everyone else, it’s ok... just keep the hood closed. |
| Sub-Areas | If needed you can create sub-areas, which act as a hierarchy of areas. Even though Rock allows it, we strongly encourage you to keep your structure simple. (Some of the largest organizations using Rock do so without the need for sub-areas.) |
| Group | This is the classification unit that a person checks into. A newborn would be checked into the *Infants* group while a second-grader would be checked into the *Grades 2-3* group. Note that these are just examples. You can easily customize your groups.  Deeper Knowledge: while classification units are called groups, and they are actual Rock groups under the hood, individuals are not added as group members when they check in, since their relationship with the group is not permanent. |
| Locations | If a group is *what* someone checks into, the location is *where*. In most cases this will be a room. Specifying locations makes sense for larger organizations that might have multiple rooms for each group. |
| Service Schedule | Groups tell us *what*, locations tell us *where*, and the schedule tells us *when*. Starting to understand the structure? Again, this makes sense if you consider that most churches have multiple services. |
| Labels | In most check-in scenarios, you'll want to print out some form of label or tag. These might be used for a nametag or a check-in/check-out token. Rock allows you to print as many (or few) labels as you want. It's also easy to customize these labels to your liking. |
| Kiosk | A kiosk is the device that is used to process the check-in. |
| Printer | The printer is what prints the labels. Rock allows you to configure where and how these labels get printed. More on that later... |


---

## Individual and Family Check-In in Rock {#individual-and-family-check-in-in-rock}

> **Path:** Checking-out Check-in > Individual and Family Check-In in Rock

Individual and Family Check-In in Rock

Before we get into the more technical aspects of configuration, let’s step back and take a general look at how individual and family check-in works in Rock.

![Check-in Overview](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-overview.png)

Check-In Overview

The specific screens the guest will be guided through are based on whether they’re checking in an individual or a family, as well as the check-in system settings set up by the administrator. But as you can see, the process is similar for both.

Now let’s take a more specific look at the family check-in process. Here, Ted and Cindy Decker are checking in their children, Noah and Alex.

![Family Check-In Walkthrough](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/family-walkthrough.png)

Family Check-In Walkthrough

There is also an optional Ability Level screen that is displayed if any areas or groups selected have an ability level requirement (e.g., crawling, walking, potty-trained, etc.). This screen is used to filter the available areas and/or groups. You can learn more about it in the [Ability Levels](#abilitylevels) chapter below.

# Previous Check-Ins

By default, when accessing the Family Selection screen, family members who have previously checked in within the last 10 days will already be selected. If 10 days is too short (or too long) a timespan, you can change this value in the Check-in Configuration area. See the [Setting It all Up](#settingitallup) chapter below for more information.

The process described above is practically the same for an individual, but the process is only done once rather than cycled through multiple family members.

As you can see, many of the screens will be skipped over if there is only one selection. This means if a family only has one teen, for example, they will only have to enter the phone number and select their family. The rest of the screens will be skipped, and their label(s) will print. This makes check-in very quick and simple.


---

## The Administration Screen {#the-administration-screen}

> **Path:** Checking-out Check-in > The Administration Screen

The Administration Screen

OK, ready to get a little more technical? Let’s take a look at the Administration Screen.

The Administration screen is where you choose your check-in options for the kiosk device you're starting.

![Admin Screen](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/walkthru-1.png)

Check-in Administration Screen

The Administration screen is the first screen you come to when you launch the check-in system. From this screen you can configure the check-in session by selecting:

- Check-in Theme
- Kiosk Device
- Check-in Configuration
- Areas

The Check-in Theme field is where you select which look and feel you want to use for the check-in screens at that kiosk. You can learn more about the themes that ship with Rock in the [Themes](#themes) chapter below.

The Kiosk Device field is where you choose which kiosk device to set this kiosk to. Among other things, this sets the location for the kiosk, determining which location-matching groups can check in here.

The Check-in Configuration field allows you to select which check-in configuration you want to use for the kiosk.

The Area(s) and Additional Area(s) checkboxes are where you identify which check-in areas you want to enable for the kiosk. Rock’s check-in system will allow checking into any area from any number of configurations at the same time, but it can only use one type of configuration settings at a time. Area(s) are all of the areas in the selected configuration that are allowed to check in based on their location matching the location setting of the kiosk device. Additional Area(s) are any other areas also configured to use the selected kiosk device but from different check-in configurations.

The selections you make on this screen will be remembered for future sessions.

# Tip

You can bypass this screen by entering [URL Parameters](#urlparameters).

Let’s ramp this up another notch and look at the types of customization you can do with Rock’s check-in system. Then we’ll dive into planning and configuring the check-in system for *your* organization.


---

## Types of Customization {#types-of-customization}

> **Path:** Checking-out Check-in > Types of Customization

Types of Customization

We've mentioned several times that Rock lets you customize the check-in process in powerful ways. Here are some details on the different ways you can customize the system and the level of effort needed for each.

| Type | Level of Effort | Description |
| --- | --- | --- |
| Area, Group and Schedule Structure | Easy | In all likelihood no two organizations will have the same areas, groups and schedules for their check-in. Rock's check-in configuration tools make these changes a simple process. |
| Labels | Easy/Moderate | Depending on the type of customization required, labels can be easy or a bit tricky. Most of this depends on the level of graphics required for your labels. Read [below](#creatingcustomlabels) for a deeper discussion about how to modify the labels. |
| Look and Feel | Moderate | While Rock ships with several different check-in themes, you can add your own with some basic knowledge of HTML/CSS and Less. |
| Workflow Process | Difficult (but possible) | Rock's check-in process runs on top of the workflow engine. The check-in workflow handles actions such as selecting families from the entered phone number and selecting rooms that match the chosen family member. Each step of the check-in process is controlled by a workflow activity or action. You can customize workflows to do certain tasks, such as checking room balance based on last name or family address. These types of changes do require deep knowledge of the workflow engine (and possibly of writing custom code).  The out-of-the-box workflow is based on over 30 years of check-in experience through first-hand work with lots of organizations. It should fit the needs of all but a few. If you feel that you are one that needs something different, you might confirm that the reasoning is based on strategy, not preference. If it's strategic in nature, you might consider engaging a Rock consultant to assist you with the configuration and custom coding. |


---

## Sample Configurations {#sample-configurations}

> **Path:** Checking-out Check-in > Sample Configurations

Sample Configurations

Before we get much further, let's stop and take a look at two different check-in configurations. The first is for our fictitious *Rock Solid Church*. It's also the default check-in configuration that ships with Rock. The second is a sample configuration for a larger church, *Boulder Solid Church*, which has two campuses. This second option will give you some ideas about how things can be modified to meet an organization's needs.

# Rock Solid Church Configuration

![Default Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-config-default.png)

Default Configuration

## Points of Interest

1. Note how Jr High and High School have their own areas with only a single check-in group in each one. This is a preference. You could combine them into a single *Youth Area* and put both groups in it. In this case *Rock Solid Church* has broken them out for reporting reasons.
2. Pay close attention to the age ranges in the groups. Notice how they are fairly wide. Wider ranges tend to work better because they give you some leeway in unique family edge cases. Also note that the age ranges overlap. It's important that there are no gaps in the age ranges.
3. This church has decided to use a centralized kiosk for check-in. They have also defined a printer device for this kiosk.
4. For simplicity's sake, we are not showing the mapping of the check-in schedule (service times) to the various locations (rooms). Keep in mind that each location can determine which service times it's available for.

# Boulder Solid Church Configuration

![Large Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.13.0/images/checkin-config-large-a-v13.png)

Default Configuration

![Large Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.13.0/images/checkin-config-large-b-v13.png)

## Points of Interest

1. Notice that Boulder Solid Church has two campuses, *North* and *South*. These two campuses can share the same check-in group, with each location (campus \> room) being attached to the group. This is true even if the two campuses have different service times.
2. Note how the *North* campus has two rooms (Bobcats & Turtles) for their K-1 group. By using schedules, they can configure check-in to use the Turtle room for only their most popular services.
3. This church has configured a second kiosk in Rock that is dedicated to their youth ministry.
4. You might be questioning the strategy of a church this size only using two check-in kiosks for the whole church. You'll learn later that a kiosk, as defined in Rock, is a device configuration template that can be used by multiple physical machines.
5. You've probably noticed that this configuration has more areas and groups. In some cases, like the kids' area, this configuration is the best fit for the structure of the buildings. In the teen area, it's more for reporting reasons since the youth are all in the same large room.


---

## Planning Your Configuration {#planning-your-configuration}

> **Path:** Checking-out Check-in > Planning Your Configuration

Planning Your Configuration

Before jumping into the configuration of the check-in system, it's important to take a step back and do some planning. No matter how well you know your organization's structure in your head, it's critical that you put it all down on paper. This will help you get the configuration done right the first time and reduce the chance for error. Be sure to consider the following:

- What groups will you be checking into?
- Are they broken down by age, ability, gender or grade?
- How are these groups organized into areas?
- What rooms/locations are used for each group?
- Do these locations vary by:
- Day of the week (e.g., Saturday vs. Sunday)
	- Service times
- Will you have special events (think Christmas, Easter, etc.) that will impact your normal configuration? If so, briefly write out how these will differ.
- If you have multiple campuses, how does this change by campus?

# Consistent Configuration

We strongly encourage multi-site organizations to select just one area/group configuration as a standard. This will greatly simplify the attendance reporting and configuration. Of course, locations and schedules will need to be specific to the campus but do try to keep the groups and areas consistent.

We've provided a [Check-in Configuration Worksheet](http://storage.rockrms.com/resources/checkin-template-v1_0_0.pdf) to help you plan your configuration. Use your answers above to complete the worksheet.


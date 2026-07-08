---
description: "Use when users need help understanding how to set up sign-up opportunities, manage registrations, or navigate the sign-ups finder interface"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Sign-Ups

Sign-Ups

In today's fast-paced world time is a precious commodity, and we often find ourselves looking for ways to make a difference in our community while juggling busy schedules. Fortunately, there are short-term serving opportunities that allow us to give back without committing to a long-term project. Whether it's a food drive or a few hours spent volunteering at a local shelter, every small effort counts towards making a positive impact.

However, organizing these short-term opportunities and managing the logistics of people who are signing up can be a daunting task. The Sign-Ups feature simplifies the process and makes it easier than ever for people to get involved in serving opportunities that align with their passions and availability. That includes addressing a major pain point for many organizations, which is ensuring that thresholds are respected. But best of all, it's easy to set up and start using. But don’t think of Sign-Ups as being only for serving projects. This is a flexible tool that has a variety of potential applications.

# Sign-Up Walkthrough

Let's start by walking through the sign-up process from the perspective of an online guest. When someone wants to sign up, they’ll go to the Sign-Ups Finder page under the Connect area of your external website. From there you can filter the Opportunities, to find the best fit based on date and location. Note that there are many block settings and filter options available here, which we'll look at a little later.

![Sign-Ups Finder](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/sign-ups-finder-v15.png)

Sign-Ups Finder

In the results you can see the description, date, time and location of the opportunity. At the bottom of each card, you can register for the opportunity or view additional details. The registration form is short and simple. As pictured below, you can easily register yourself and others.

![Sign-Ups Register](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/sign-ups-register-external-site-v15.png)

Sign-Ups Register

You’ll see a confirmation screen after registering, and that’s all it takes. It’s a simple way to sign up for something without needing to configure, for instance, an entire event registration template.

# Managing Sign-Ups

Before we move on, it’s important to become familiar with some terminology.

1. A *Project* is a group and is used to organize other Projects or to house *Opportunities*, which we'll look at next. Projects are one of two types:
	1. *In Person* means the opportunities take place on a specific date and time, like hosting a car wash fundraiser for a day.
		2. *Project Due* means the opportunities are due by the specified date and time, like the deadline for a clothing drive.
2. A person registers for an *Opportunity*, as we saw in the section above. Opportunities are events with a date, time and location.

# Sign-Up Group Group Type

Projects are groups of a type called Sign-Up Group. You can create new sign-up group types by inheriting them from the Sign-Up Group type. We'll cover creating new Sign-Ups group types a little later.

## Managing Projects

To access your projects, navigate to People \> Sign-Ups. On the left are projects, which are organized into a hierarchical tree view. In the below example, Habitat for Humanity doesn’t have any opportunities, but is used to group other projects. To the right is a Sign-Up Overview. Here you’ll find the schedule and the participant count for each opportunity. The Sign-Up Overview only appears when you first access the page before a project is selected on the left.

![Sign-Ups Overview](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-overview-v18.png)

Sign-Ups Overview

At the bottom of the Sign-Up Overview list, you can click *Select Action* to email either leaders or all participants of the selected opportunities. Each person will get one communication, even if they registered for multiple opportunities.

You’re able to use the below Lava fields in your Sign-Up Overview communication. Note that we’re looping over opportunities because one person can be in multiple opportunities.

##### Sign-Up Overview Communication Lava Fields



{% for opportunity in Opportunities %}
    Project Name: {{ opportunity.ProjectName }}
    Opportunity Name: {{ opportunity.OpportunityName }}
    Address: {{ opportunity.FormattedAddress }}
    Next Start Date & Time: {{ opportunity.NextStartDateTime }}
    Leader Count: {{ opportunity.LeaderCount }}
    Participant Count: {{ opportunity.ParticipantCount }}
{% endfor %}


## Managing Opportunities

Clicking on a project to the left will display the opportunities for that project to the right. This is where you would come to edit the project, but we’ll get to that in the next section. For now, let’s see what you can do on this page.

![Sign-Up Opportunity Detail](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-opportunity-detail-v18.png)

Sign-Up Opportunity Detail

## Managing Members

Click the icon to see the people who have registered for that opportunity. In the screenshot below you can see details of the opportunity including the location, schedule and capacity information. You can also come here to add or remove people from the list, or to manage Roles (i.e., Leader, Member).

![Sign-Up Opportunity Attendee List](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-opportunity-attendee-list-v18.png)

Sign-Up Opportunity Attendee List

It does feel like you’re managing members of a group. The screens and features used to manage the attendee list are generally the same as with members of groups. But do keep in mind that the project is the group, and the opportunities are what people sign up for. So, if you have multiple opportunities under one project, everyone who signs up for any of the opportunities will all be added to the same group.

# Configuring Sign-Ups

Now we’ll look at the setup that’s used to configure Sign-Ups.

## Group Types

The first thing you’ll need is a group type, and we’ve got one ready for you. The *Sign-Up Group* group type is used by Rock, so editing is limited, but many features are available.

There are too many group type configuration options to cover here (check out the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#grouptypes) manual) but you might edit this group type to add group requirements or attributes. If you're using group requirements, individuals will need to be logged in so Rock can determine if they meet those requirements.

You could also work with more than one group type in Sign-Ups. This way you can leverage different features depending on the Sign-Up scenario. However, there are a couple special steps you'll need to take:

1. Your new sign-up group type needs to have its *Inherited Group Type* value set to "Sign-Up Group" before proceeding.
2. Then you'll need to add your new group type to *Allowed Child Group Types* in the configuration for the original "Sign-Up Group" group type.
3. Your new group type needs to have *Group Schedule Options* selected (e.g., Custom, Named). Also, ensure at least one *Location Selection Mode* is chosen (e.g., Named, Address).
4. By default, the public *Sign-Up Finder* block is only configured to show Opportunities for the original "Sign-Up Group" that ships with Rock. You'll have to edit the block's settings to show other Project \[Group\] Types.

## Project Configuration

Projects are created and managed from People \> Sign-Ups. Click a project from the tree menu on the left, then click the Edit button.

![Sign-Up Project Detail](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-project-details-v18.png)

Sign-Up Project Detail

## Setting up Opportunities

With your projects in place, you’re ready to start adding opportunities to them. Remember, an opportunity is what the person registers for, so this is where you’ll set the schedule, location and attendance goals.

![Sign-Up Edit Opportunity](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-edit-opportunity-v18.png)

Sign-Up Edit Opportunity

## Send Reminders System Job

Rock ships with a job called *Send Sign Up Reminders* that runs daily at 8am. There isn’t anything you need to configure with this job but be aware that reminders won’t be sent until it runs.

![Send Sign Up Reminders](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-send-sign-up-reminders-v18.png)

Send Sign Up Reminders

## Sign-Ups Finder Block Settings

The public-facing block that’s used to search opportunities has several settings you’ll want to know about. Adjust these settings to change how the person interacts with the Sign-Ups Finder, and what filtering options are available to them.

![Sign-Up Finder Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/sign-ups-finder-block-settings-v16.png)

Sign-Up Finder Block Settings

## Registration Block Settings

You have some options when it comes to the person’s experience when they register for an opportunity. You’ll want to review these settings to ensure they meet the needs of each opportunity.

The goal is to craft the experience you desire for the specific ministry need. In addition to the settings below, don't forget to review the Sign-Up Finder settings detailed above. These settings, combined with the Project Type, significantly influence how people interact with sign-ups.

![Registration Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/sign-up-register-v17.png)

Registration Block Settings

# Confirmations and Reminders Using SMS

By default, the "Sign-Up Group Registration" and "Sign-Up Group Reminder" System Communications will be sent using SMS text messaging in addition to email. You'll need to add your organization's phone number to the configuration located at Admin Tools \> Settings \> Communications \> System Communications. Without your phone number in place, system errors will occur when attempting to send these communications.

# Group Registration and Attendance

Now that you’re familiar with projects and opportunities, let’s change the scenario from what we saw at the start of this chapter. In this section we’ll cover how to use sign-ups for groups and how to take attendance for sign-up events.

## Group Registration

As we saw in the prior section, the Sign-Up Register block has three modes. When it’s set to Group mode then people can be signed up from an existing group. This takes a few steps to set up, but we’ll walk you through it.

First, we need to talk about Id Keys. The Sign-Up Register block needs to know what you’re signing up for. It needs to know the project, the location and the schedule. Normally we would pass in the Id’s for those entities from the URL. But with sign-ups, we’re going to need the IdKey instead of the Id. The IdKey is an alphanumeric string of characters that represents the Id. For instance, an entity with an Id of 4 has an IdKey of “da0BJvBpzX”.

You’re going to need a new page to house the Sign-Up Register block set to Group mode. As you’re setting this page up give it a route with parameters. The easiest way is to copy the route from the sign-ups registration page that ships with Rock, change the route names, and add a parameter for GroupId. The route for your registration page might look like:

`signup-group/{ProjectId}/location/{LocationId}/schedule/{ScheduleId}/group/{GroupId}`

Then, all you need to do is use Lava to generate the IdKey for each entity. There is a property on each of these entities called "IdKey" and you'll need to use Lava to access it. If you want to find the IdKey for a group, you might use Lava like the below:



{% group Id:113 %}
{% endgroup %}

    {{ group.IdKey }}


Note that the ProjectId is the IdKey for the sign-up group. In the end your URL would look like:

`yourchurch.org/signup-group/7QVlZ89BZW/location/KewldO1moa/schedule/Dx9l4aPaEX/group/7oWlzzdljq`

Anyone who is in the group can use this link to register themselves or others for the given project.

![Group Registration](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/sign-ups-group-registration-v15.png)

Group Registration

## Taking Attendance

Taking attendance for a sign-up group works similarly to the Group Registration process described above. You’ll need to build a URL, and then that URL can be used to take attendance.

You’ll need a page with the Sign-Up Attendance Detail block. Rock ships with one under the route of signups/attendance. Instead of the GroupId, we’ll be passing in the Attendance Date. So, your URL will look like:

`signups/attendance/{ProjectId}/location/{LocationId}/schedule/{ScheduleId}/attendancedate/{AttendanceDate}`

The Send Attendance Reminder job uses the Group Attendance Reminder system communication. But you’ll have to set up the link in that email to look something like this:



{% capture attendanceLink %}
    {{ 'Global' | Attribute:'PublicApplicationRoot' }}signup/attendance/{ProjectId}/location/{LocationId}/schedule/{ScheduleId}?AttendanceDate={{ Occurrence | Date:'yyyy-MM-dd' | EscapeDataString }}
{% endcapture %}


Note the date formatting above. If you’re building a link directly to the page, the date should be formatted in that way:

`yourchurch.com/signups/attendance/7QVlZ89BZW/location/KewldO1moa/schedule/Dx9l4aPaEX/attendancedate/2023-08-26`

Once you arrive at the page all you need to do is mark who is present and save.

![Attendance Detail](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/sign-ups-attendance-detail-v15.png)

Attendance Detail

# Sign-Up Permissions

Managing security permissions within Sign-Ups can seem challenging at first. But don't worry, we're going to break it down so you can see what permissions a person needs to perform various functions, and where to set them up.

First, we'll look at the places where permissions are set up. Sign-Up permissions are granted in one of three ways:

- **Group Role Permissions:** People in the group with a role of Leader will have additional permissions. This is controlled at the Group Type level. Out of the box, the Leader role for groups of type "Sign-Up Group" has *Edit* and *Manage Members* permissions. See the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7/296#groupmembers) manual for more information on configuring group roles.  
	![Sign-Up Group Type Roles](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-permissions-group-type-roles-v18.png)
	Sign-Up Group Type Roles
- **Project Permissions:** Some people, like Rock Administrators, will have access to project-level permissions. We'll dive into the details shortly, but for now just be aware that permissions can be granted to individual Users or Security Roles at the project level.  
	![Project Permissions](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-permissions-project-level-security-v18.png)
	Project Permissions
- **Group Type Permissions:** Similar to what you'll find when looking at the above project-level permissions, you can grant permissions from the group type itself by clicking the padlock icon as shown below. You can grant permissions to *Manage Members*, *Edit*, *Administrate*, and *Schedule*.  
	![Group Type Permissions](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-permissions-group-type-security-v18.png)
	Group Type Permissions

Some permissions overlap (e.g., *Edit* and *Manage Members*) between group role permissions and group type security. This means *Edit* access can be given via a Leader role, or via a system Security Role. To simplify things, we'll use the phrase "group type level" to refer to both role and security settings since they're configured in the same area.

Next, we'll dive in to what happens when you set up the permissions described above. We'll use Ted Decker as our project Leader, who has access to Rock but does not have full Rock Administration permissions. We'll go through the Sign-Ups area from Ted's perspective using out-of-the-box permission configurations.

### Delete Project

![Permissions to Delete Project](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-permissions-delete-project-v18.png)

Permissions to Delete Projects

Note that *Edit* isn't the only permission that lets you delete. Security Roles or Users who have been granted *Schedule* permission can also delete.

### Change, Remove, and Secure projects

![Project Permissions](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-permissions-project-permissions-v18.png)

Project Permissions

### Managing Attendee List

To add or remove attendees from the list, the person needs either *Manage Members*, *Edit*, or *Schedule* permissions at the project or group type levels.

![Attendee List Permissions](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-permissions-attendee-list-v18.png)

Attendee List Permissions

### Adding Sign-Up Groups

There are two ways to add sign-up groups to the list. You can add a child group to an existing group, or you can start a brand new sign-up group by adding to the top-level of the list. There's extra security needed to add top-level sign-up groups, which we'll cover below.

If you want to add new top-level sign-up groups to the list, you'll need to update the security on the block itself as well as on the Sign-Up Group *Group Type*. Similar to above, this requires *Edit* permission.

![Grant Top-Level Security](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/sign-ups-permissions-grant-top-level-security-v18.png)

Grant Top-Level Security

Table of Contents

- [Welcome](#welcome)
- [Connections](#connections)
- [10,000 Foot View of Connections](#10000footviewofconnections)
- [Working With Requests](#workingwithrequests)
- [Entering New Requests](#enteringnewrequests)
- [Configuring Connection Types](#configuringconnectiontypes)
- [Placement Group Configuration](#placementgroupconfiguration)
- [Connection Workflows](#connectionworkflows)
- [Connection Campaigns](#connectioncampaigns)
- [First Steps for Steps](#firststepsforsteps)
- [Next Steps for Steps](#nextstepsforsteps)
- [Steps Charts](#stepscharts)
- [Steps Badges](#stepsbadges)
- [Streaks Overview](#streaksoverview)
- [Streaks Maps](#streaksmaps)
- [Streak Types](#streaktypes)
- [Add New Streak Type](#addnewstreaktype)
- [Streak Type Detail](#streaktypedetail)
- [Streak Enrollment Detail](#streakenrollmentdetail)
- [Streak Type Rebuild](#streaktyperebuild)
- [Achievements](#achievements)
- [Sign-Ups](#signups)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


---
description: Use when setting up attendance tracking for group events or gatherings to monitor RSVPs and expected attendance
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group RSVP

Group RSVP

If you’re hosting an event, class or other type of gathering, it can be very important to know how many people plan to attend. The expected attendance can impact things like the location, the refreshments and even how many chairs you'll need. Those are just some of the reasons why Rock comes with an RSVP system that lets you track whether invitees actually plan on attending your function.

If this brings Rock’s event registration features to mind, you’re not too far off. You already know how robust and flexible event registration features can be, but sometimes it might be a little more than you need. Group RSVP is for when you just need to know who’s coming, plain and simple.

# Enable Group RSVP

The RSVP function is enabled in group type settings, making RSVP features available to any groups within that type. All RSVP features are tied directly to a group. That means you must have a group created before you can use RSVP. The group doesn't need to have any members, but it needs to exist so individuals who accept your RSVP can be added to it.

To enable RSVP for a group type, navigate to Admin Tools \> General Settings \> Group Types and open the RSVP settings for the group type.

![Enable Group RSVP](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-type-enable-group-rsvp-v18.png)

Enable Group RSVP

# RSVP - Group Viewer

After you’ve enabled RSVP for a group type, you’ll see a couple of changes when viewing groups of that type from the *Group Viewer* page.

First, you’ll notice the addition of a new icon that will take you to the *Group RSVP List* page, where you can view or add occurrences. We’ll talk more about occurrences in the [RSVP Occurrences](#rsvp-occurrences) section below.

![Group Viewer With RSVP](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-viewer-rsvp-enabled-v18.png)

Group Viewer With RSVP

Second, you can Edit a group to access the *RSVP Reminder System Communication* and *RSVP Reminder Offset Days* for that group. These settings are only available for groups where RSVP has been enabled on the group type.

![Group Viewer RSVP Reminder Settings](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-viewer-rsvp-reminder-settings-v18.png)

Group Viewer RSVP Reminder Settings

# Group RSVP List

Clicking the icon takes you to the *Group RSVP List* page. It will be empty when you first start, but after you add a few occurrences to the list (see [RSVP Occurrences](#rsvpoccurrences)) you’ll quickly see how useful this page is. Let's take a look.

![RSVP List Page](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/rsvp-list-page-v18.png)

RSVP List Page

# RSVP Occurrences

Let’s look at how to add an occurrence to the RSVP List. You'll need to have at least one occurrence set up for the group before you can start sending your RSVP emails.

![Add Occurrence](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/rsvp-detail-add-occurrence-v18.png)

Add Occurrence

# Decline Reasons

The list of *Available Decline Reasons* can be maintained from the Admin Tools \> General Settings \> Defined Type list under *Group RSVP Decline Reason*.

# RSVP Email Requests

Now that we have an occurrence set up, we’re ready to send out some invitations.

Adding an RSVP request to an e-mail is as simple as clicking and dragging the RSVP tool button (look for the icon) into your email. If you’re not sure how to get to this point, check out the [Communication Wizard](https://community.rockrms.com/documentation/bookcontent/8#communicationwizard) section in the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide.

![Add RSVP To New Communication](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/rsvp-add-to-new-communication-v18.png)

Add RSVP To New Communication

After the RSVP buttons have been added to the body of your email, use the panel on the right to select the group and occurrence.

![Add Occurrence to Email](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/rsvp-add-occurrence-to-email-v18.png)

Add Occurrence to Email

# RSVP Detail

Now that we’ve sent our email, we need to monitor the responses. We’ll do this from the *RSVP Detail* page, which you can get to by clicking an occurrence from the *RSVP List* page.

The detail block at the top of the *RSVP Detail* page shows the occurrence details and a graph of responses. The list block at the bottom of the page shows your invitees and their responses.

![RSVP Detail Page](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/rsvp-detail-page-v18.png)

RSVP Detail Page

Not only can you view responses, but you can also update responses or add decline notes if you need to. This ensures you always have accurate information, especially if the invitee responds (or changes their response) by phone or in person.

If you didn’t turn on the *Show Decline Reasons* option for the occurrence, then the *Decline Reason* and *Decline Note* columns won’t be shown.

# Missing Invitees?

If you used the Register Recipients button when sending your email, then everyone from your email will be on this list. Otherwise, you'll only see people who have responded.

# Responding to RSVP Requests

It may be helpful for you to know what individuals will be seeing and doing after they receive your RSVP email.

Clicking either Accept or Decline in the email will bring the invitee to your external site. What happens at that point depends on how you’ve set up your group, occurrence and email.

## Public Group Member Attributes

When adding a member attribute to either a group or group type, you'll notice a *Public* setting. This setting controls whether the member attribute is included as part of the RSVP response process.

![Enable Public Attributes](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-member-attributes-public-v18.png)

Enable Public Attributes

If the *Public* setting is enabled, then the group member attribute will be shown to RSVP invitees who accept your invitation. This allows you to gather additional information from the invitee beyond knowing that they plan to attend. We’ll show you exactly what this looks like in the [Accept](#accept) section below.

## Accept

Invitees will be taken to your website after clicking “Accept” in the RSVP email they received. If you’ve attached any public member attributes to your group, then invitees will be asked to provide additional information (i.e., attribute values) accordingly.

For example, the *RSVP Response* page pictured below has a field labeled “Need Childcare?” with a drop-down menu below it. This prompts the individual to disclose if they need childcare before finalizing their RSVP acceptance. You can see how this particular member attribute was set up in the [Public Group Member Attributes](#publicgroupmemberattributes) section above.

![RSVP Accept With Attribute](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/rsvp-response-accept-with-attribute.png)

RSVP Accept With Attribute

After the invitee clicks the Accept button on the page pictured above, they’ll be brought to the acceptance confirmation page pictured below.

If you didn't add any public member attributes to your group, then the above page is skipped because there is nothing else the invitee needs to provide. Instead, invitees will be taken directly to the acceptance confirmation page pictured below when they click “Accept” from the RSVP email.

![RSVP Accept Message](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/rsvp-response-accept-default-message.png)

RSVP Accept Message

The generic acceptance message pictured above can be customized if desired (see [RSVP Occurrences](#rsvpoccurrences)).

# Accepts Become Group Members

Rock will always add a person who accepts the RSVP into the group as a group member. This is especially needed when, for example, group member attributes are used. If an individual declines the RSVP invitation, they won’t be removed from the group.

## Decline

Just like clicking Accept, you control what happens when a person clicks Decline.

If the person declines, and if you enabled decline reasons, then they’ll be asked to provide a reason.

![RSVP Decline With Reason](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/rsvp-response-decline-with-reason.png)

RSVP Decline With Reason

In the above example a custom decline message is displayed near the top of the block. If you didn’t customize your decline message, then the generic message (pictured below) will appear instead.

If you didn’t enable decline reasons, then the invitee will be taken directly to the page below from the email.

![RSVP Decline Message](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/rsvp-response-decline-default-message.png)

RSVP Decline Message

# Group RSVP Reminders

The *Send Rsvp Reminders* job will send a reminder to people who have accepted an RSVP invitation. Those who have declined or who haven’t responded won’t receive a reminder.

The job is ready for you to use out of the box, but it must be manually configured and is intended to be run daily. It will use the *RSVP Reminder System Communication* for the content, as configured at either the group or group type level. If you haven’t selected a *System Communication* to use, then the job will not send a reminder.

# Sending Reminders using SMS

If a person's communication preference is SMS, and if the *System Communication* you use for RSVP reminders is fully configured for SMS, then the reminder will be sent as a text instead of an email.

![Group RSVP Reminders Job](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-rsvp-reminders-job-v18.png)

Group RSVP Reminders Job

Don’t forget that the *Send Rsvp Reminders* job will reference the configured *RSVP Reminder Offset Days* value (either from the group type or for a particular group) to determine when to send reminders for any given occurrence.

Table of Contents

- [Overview](#overview)
- [Searching for Groups](#searchingforgroups)
- [Group Viewer](#groupviewer)
- [Group Types](#grouptypes)
- [Securing Groups](#securinggroups)
- [Group Strategies](#groupstrategies)
- [Group Schedules](#groupschedules)
- [Group Attendance](#groupattendance)
- [Group Sync](#groupsync)
- [Group Following](#groupfollowing)
- [Group Members](#groupmembers)
- [Group Placement](#groupplacement)
- [Alternate Placements](#alternateplacements)
- [Group History](#grouphistory)
- [Group Leader Toolbox](#groupleadertoolbox)
- [Group Finder](#groupfinder)
- [Schedule Toolbox](#scheduletoolbox)
- [Group Scheduling](#groupscheduling)
- [Group Blocks](#groupblocks)
- [Service Jobs Relating to Groups](#servicejobsrelatingtogroups)
- [Group Requirements](#grouprequirements)
- [Fundraising Groups](#fundraisinggroups)
- [Group RSVP](#grouprsvp)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


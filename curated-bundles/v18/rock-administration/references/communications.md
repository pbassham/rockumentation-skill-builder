---
description: "Use when you need to set up, customize, or configure email and SMS communication templates, system communications, transports, or messaging mediums in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Communications

Communications

These settings help Rock use powerful tools to communicate with your attendees. While each tool is covered below, additional information can be found in the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/communications-page-v18.png)

Communications

# Communication Templates

You'll find over time that you often send the same types of emails and SMS messages over and over. When you see this pattern consider making a communication template to help simplify these tasks and improve consistency.

# System Communications

*System Communications* (formerly known as "System Emails") are communication templates that are used by Rock to send very specific messages. Typically, these are automated communications, such as the message someone receives when they've forgotten their password and requested to reset it.

*System Communications* can be used with either emails or SMS messaging. While Rock sets these up to look professional from the start, you may want to modify them to match your organization's branding. You can edit these communications under Admin Tools \> Settings \> System Communications.

# Communication Mediums

When you send a new communication from People \> New Communication or from the bottom of any grid that contains a list of people, you can select to send either an SMS message or an email. Both of those are communication mediums. You can configure the settings for each medium from the *Communication Mediums* page. This is where you can set the *Email* transport to use normal SMTP or a bulk delivery service like SendGrid. This is also where you can configure the SMS medium to use Twilio to send text messages.

# Communication Transports

We mentioned services like SendGrid, Twilio and SMTP in the Communications Mediums section. These delivery options are called transports. They take the message contents and make sure that they get to the recipients. Each transport has a set of configuration options specific to its needs. For example, the Twilio transport requires an account SID and a token to tie into your account.

# Don't Forget...

If you activate a new transport, you must then navigate to Admin Tools \> Settings \> Communication Mediums to set it as the Transport Container for a Communication Medium.

Like channels, new transports can easily be added over time, from either the core Rock team or third parties.

# SMS Phone Numbers

This menu item is a hotlink to the *SMS Phone Numbers* defined type. This defined type helps you configure the SMS environment. See the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information on SMS.

# Safe Sender Domains

This menu item is a hotlink to the *Safe Sender Domains* defined type. This defines the domains that can be used to send emails. If an email communication is created with a *From* address that isn't from one of these domains, the *Organization Email* global attribute value will be used instead and the original value will be used as the *Reply To* address. This helps reduce the likelihood of communications being rejected by the receiving email servers.

# Send Photo Requests

These pages allow you to send and administrate requests for photos from your community. You can find detailed instructions for these tools in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#photorequests).

# System Communication Categories

This page allows you to create and manage categories (e.g., Event Registration, Groups) for your system communications.

# Communication Queue

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/communication-queue-v18.png)

Communications

The *Communication Queue* is where communications that are pending approval or have failed to be sent are stored. Ideally, you'll never see anything listed here but, if you do, you’ll know something elsewhere in the system needs attention.

While the *Communication Queue* doesn't require any configuration, the *Send Communication* job settings will affect what may end up in the queue. By default, the *Send Communication* job waits 30 minutes before sending any new communication to prevent any sending overlap for communications requiring approval.

Also, you can use the *Communication Queue Alert* job to send an email notice to specified recipients when a communication is sent to the *Communication Queue*. This helps to ensure the queue is being monitored regularly.

The *Send Communication* and *Communication Queue Alert* jobs can be configured by going to Admin Tools \> Settings \> Jobs Administration.

# Communication List Categories

The *Communication List Categories* page is where you can view, edit and create new categories for use with communication lists. Communication list categories can be used for a number of powerful functions, from segmenting communication lists to allowing communication recipients to subscribe and unsubscribe from lists. To learn more about communication list categories, see the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8#communicationlistcategories) manual.

# Communication Lists

This page allows you to view, modify and add communication lists to be used with the *Communication Wizard*. To learn more about communication lists and sending communications, check out the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8#communicationlists) manual.

# Communication Template Categories

This page allows you to view, modify and add communication template categories. To learn more about communication templates, check out the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) manual.

# SMS Pipeline

This is where you'll configure your SMS phone numbers with the necessary actions used by your organization. Check out the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8#smspipeline) manual for more details.

# Nameless People

If you receive SMS messages from phone numbers Rock doesn't recognize, the number becomes associated with a Nameless Person record. This page is where you can view these phone numbers and link them to a person in your system. For more information check out the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8#namelesspeople) guide.

# Communications Settings

This page is used to specify the template you want to use for approver notification emails. By default, the *Communication Approval Email* template that ships with Rock is selected. For details see the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8#approvernotificationemails) guide.

# SMS Snippets

Come here to create and maintain your list of *SMS Snippets*. With snippets you can create and save SMS message content that can be easily referenced and reused across multiple messages. Stay tuned as we roll out additional places where snippets can be used, like Check-in Manager and SMS Conversations.


---

## Check-in {#check-in}

> **Path:** Rock Admin Hero Guide > Check-in

Check-in

Rock's check-in system is very powerful. With that power comes several configuration options. This section of the administrative tools groups all of the check-in configuration into one place.

![Check-in Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/checkin-settings-v18.png)

Check-in

# Check-in Configuration

These screens help manage the setup of your check-in configurations. These settings are discussed in detail in the [Checking-out Check-in](https://community.rockrms.com/documentation/bookcontent/10#areasandgroups) guide.

# Named Locations

This configuration screen allows you to define specific locations with a name. You'll want to use this to define your campuses, buildings and rooms. These *Named Locations* can then be used with configuring groups, check-in, etc.

The *Named Locations* page can alternatively be accessed from Admin Tools \> Settings \> Named Locations.

# Schedules

Several features require the configuration of repeating schedules. For instance, check-in needs to know your organization’s schedules to be able to configure the time check-in should start. These screens allow you to create those schedules.

The *Schedules* page is also available under Admin Tools \> Settings \> Schedules.

# Devices

The devices screens are used to manage devices that interact with Rock in some way. Today this is primarily used to help manage check-in kiosks and printers but in the future we hope to add support for all types of devices.

The list of devices is also available under Admin Tools \> Settings \> Devices.

# Check-in Labels

The check-in process can be configured to use several formats of printed labels. These labels and their configuration are managed using these screens. The [Checking-out Check-in](https://community.rockrms.com/documentation/bookcontent/10#allaboutlabels) guide also covers the creation and configuration of these labels.

# Ability Levels

This is a short-cut link to the *Ability Levels* defined type. *Ability Levels* are used to classify developmental stages. *Ability Levels* can also be accessed under Admin Tools \> Settings \> Defined Types \> Ability Levels.

# Label Merge Fields

This is a short-cut link to the *Label Merge Fields* defined type. *Label Merge Fields* are used to find and print data for labels. This defined type is also available under Admin Tools \> Settings \> Defined Types \> Label Merge Fields.

# Search Type

This is a short-cut link to the *Search Type* defined type. *Search Type* are the ways to search for a family (e.g., phone, name, etc.) in check-in. You can also manage this defined type from Admin Tools \> Settings \> Defined Types \> Search Type.


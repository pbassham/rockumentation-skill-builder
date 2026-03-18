> **Path:** Mobile Docs > 🧱 Essentials > Chat > Fallback Chat Notifications

# Fallback Chat Notifications

Send a System Communication as a fallback to Chat members who don't receive device notifications.

M v7.0C v18.0

Warning

To maintain performance and avoid placing unnecessary load on the Rock server, fallback notifications will be sent to a maximum of 50 members per Chat Channel. However, the recommended use case is much smaller: ideally 3 to 5 members per Channel for optimal effectiveness and responsiveness.

## Overview

Using Rock Automations, this feature enables a configurable fallback chat notification - such as *“You have a secured chat message from Ted Decker at Rock Solid Church”* - to be sent to all individuals in a Chat who either do not have the Rock Mobile app installed (as known by a personal device record) or do not have notifications enabled on their device. SMS and email delivery are both supported.

![](https://community.rockrms.com/GetImage.ashx?Id=68212)

## Getting Started

Note

To get started with Chat in Rock, contact the AppFactory team to discuss the required pre-configuration for your mobile app.

Once you have Chat up and running, adding fallback notifications takes just a few minutes.

### Add a Chat Message Trigger

Navigate to `Admin Tools > General > Automations` and click the \[+\] button to add a new Automation Trigger.

#### Trigger Properties

| Name | Description |
| --- | --- |
| Name | Give this trigger a name of your choosing (e.g. *Send Fallback Chat Notifications*). You might have a single trigger to handle fallback notifications for all Chat Channels of a given Channel Type, or you can get as granular as you'd like. Your decision here should dictate how you name this trigger.   |
| Description | Like all things in Rock, make sure to provide a good description! You and your team will thank you later. |
| Trigger Type | Choose **Chat Message** |
| Trigger when \[Any|All\] of the rules are true | Should all of the rules be required to match, or should a single rule match be enough to trigger Automation Events? |
| Criteria | Add as many criteria rules as you'd like. |

### Add a Send Fallback Chat Notification Event

Once you've added your Automation Trigger, you can add as many Automation Events as you'd like to be fired when the trigger criteria are met. In our example, we'll choose the **Send Fallback Chat Notification** event type.

#### Event Settings

| Name | Description |
| --- | --- |
| Event Type | Choose **Send Fallback Chat Notification** |
| System Communication | The sytem communication to be sent as a fallback notification. Email and SMS are supported. |
| Notification Suppression Minutes | The number of minutes the system will suppress notifications if the recipient has already received a recent notification. |
| Device Seen Within Days | A Chat member will be excluded from fallback notifications if they have accessed Rock using a personal device within this number of days. Note that the same device must also currently have Rock notifications enabled. |

## System Communication

We've provided an example **Fallback Chat Notification** System Communication with both an SMS and email Lava template. You'll find that we've provided plenty of merge fields, including the contents of the chat message that was sent, allowing you to provide as little or as much detail as you'd like in the fallback notification. The ultimate goal should be to bring the individual to the conversation by providing a link to get them there.

### Deep Linking to the Rock Mobile Chat Page

Follow the documentation on [Deep Linking](https://community.rockrms.com/page/3516?slug=essentials%2fadvanced-topics%2fdeep-linking) to configure a link to the page within your Rock Mobile App that contains the [Chat View](https://community.rockrms.com/page/3516?slug=essentials%2fblocks%2fcommunication%2fchat-view) block and use that link within your System Communication to bring individuals directly to the app if they already have it installed (but have notifications disabled).

Warning

Mailgun's tracking of links within an email sent by Rock will break Deep Linking, and the individual will instead be taken directly to the Deep Link's fallback page. In order to prevent this, add the following attribute to the link within your email's Message Body:  
  
<a href="{{ chatUrl }}" disable-tracking="true">{{ chatUrl }}</a>  
  
It's likely that SendGrid has a similar mechanism to disable tracking.

### Linking to the Web Chat View Block

You can also use Rock's [Chat View](https://community.rockrms.com/page/3516?slug=essentials%2fblocks%2fcommunication%2fchat-view) block within a Rock website. Be sure to add this block to a page on your public-facing website and use this as the **Fallback Page** when setting up your Deep Link.

### Styling

There’s no styling X-Ray available.

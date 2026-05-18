---
description: "Use when users need requirements, setup steps, or configuration instructions for Rock Mobile Chat functionality"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Rock Chat (Mobile)

Rock Chat (Mobile)

Rock Mobile Chat opens the door to an exciting new communication experience for attendees and staff powered by [Rock Mobile](https://origin.rockrms.com/rock-mobile). Communicate in real-time with your whole organization or chat with a smaller team, or any group you're a part of, all in Rock.

![Rock Mobile Chat preview on mobile](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/Chat-Mobile-Preview-v17.jpg)

Rock Mobile Chat mobile preview

# Requirements for Rock Mobile Chat

To use Rock Mobile Chat you must have a [Rock Mobile](https://origin.rockrms.com/rock-mobile) app and sign-up for the [Rock Mobile Chat add-on](https://www.triumph.tech/rock-mobile-chat).

# Chat Web-Version

Rock Chat can also be used on your *web-instance*, and although it is ready for use, we recommend you limit its use to Administrators and Staff until it reaches feature parity with our mobile chat.

# Data Privacy in Chat

While Rock Chat is secure and designed for everyday use, no chat system is immune from data incidents such as breaches or unauthorized access. For this reason, you should avoid sharing sensitive information (for example, financial data, health records or passwords) in chat messages. Any sensitive data sent is at your own risk and liability for such data remains with the sender.

Rock chat has extensive features such as:

- Real-time messaging with typing indicators and read receipts
- Support for threads, reactions, and media attachments
- Direct messages and group chats tied to Rock group data
- Push notifications

Although we use Getstream for chat, you will not need to interact with it to use chat. As you configure your chat groups through Rock, the information is passed immediately to Getstream through our API. Just get to messaging and let us handle the hard work.

# Configure Chat

To start configuring Chat, you will need an *API Key*. You can sign-up for Rock Chat through the [Rock Mobile Chat add-on](https://www.triumph.tech/rock-mobile-chat). Our Mobile team will send you your chat key and API Secret. Once you have these, navigate to Admin Tools \> Settings \> Chat Configuration.

![Chat Configuration settings in Rock](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/Chat-Configuration-v18.png)

Chat Configuration settings

Once you click Save with a proper API key, you are ready to configure your *chat channels*. Your chat channel types will sync with our chat provider (Getstream) immediately.

To make *chat channels*, start with enabling *chat* at the Group Type level. Navigate to Admin Tools \> Settings \> Group Types and select the group type you want to configure. You will notice a new *Chat* tab.

![Chat Group Type settings in Rock](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/Chat-Group-Type-Settings-v17.png)

Chat settings at the Group Type level

- **Enable Chat** – Allow groups using this group type to access Rock Chat.
- **Make Channel Public** – Enable to let any user find and join the channel via search.
- **Enable Chat for All Groups** – If enabled, all groups of this type will have chat enabled by default.
- **Always Show Channel** – Enable to display the channel in the list for all users, allowing anyone to join.
- **Allow Members to Leave Channel** – If enabled, users can leave groups of this type. Generally, this setting should be enabled only for shared channels users may want to opt out of such as a “General” chat since leaving a channel means leaving the group in Rock itself!
- **Push Notification Mode** – Control how Push Notifications are sent to chat channels of this type.

Choose how notifications are sent for chat channels of this type:

- *All Messages* – Receive alerts for every message.
- *Mentions* – Notify only when directly mentioned in a message.
- *Silent* – No notifications.

# Cap on Group Types

You can only configure 50 group types to be chat channels.

With a *Group Type* enabled for chat, we will move to configuring individual *groups*.

Navigate to People \> Group Viewer and select a group to specify the settings for its chat channel. You will notice the settings look similar to the *Group Type* settings.

![Chat settings at the Group level](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/Chat-Group-Settings-v18.png)

Chat settings inherited or overridden at the Group level

For most chat-enabled groups, you'll want to inherit settings from the *Group Type*. But there are times when going custom makes sense:

- **Privacy matters.** Some groups may need tighter control than the type allows. For example, a *Finance* team might need a private channel, while *Hospitality* can stay public.
- **Not every group needs chat.** Small teams usually benefit from chat, but a short-term class or small task force might not need the distraction.

Picking a fitting Channel Avatar is crucial. Find an image that is recognizable at all sizes and makes sense for the chat theme. For example, your organization's logo makes sense on a "General" chat, but you may want a dollar sign emoji for the Finance team channel. For the best results, keep your image to 120 x 120 pixels. *Don't fret though, you can have a group without an avatar.*

There is a different kind of chat channel we haven't explored yet that is created for large, generally "organization-wide" groups. That group is called a *Shared Channel*, and it was made specifically for large groups. To configure a *Shared Channel*, go to People \> Group Viewer.

![Chat Shared Channels in Group Viewer](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/Chat-Shared-Channels-v18.png)

Creating a Chat Shared Channel

Sometimes you need to get the word out to everyone, like announcing that the big event is next week or the annual BBQ is this Sunday. That’s where a central, all-church chat shines. Think of it as your digital mountaintop, something like a “General” or “Org-Wide” channel where live announcements reach the masses.

These *Chat Shared Channels* are a special Group Type designed for broad communication. You can configure them just like any other group type.

To create one, click the button, then select Add Child To Selected. You’ll get a new group that acts as a live chat channel for your whole community.

# Use Web Chat

# Caution: For Internal Use Only

The Web Chat block should only be used on internal pages for now, in the future as new features and polish come to this block, it will be ready for a wider audience.

## Web Chat block

For rock-native chat access, add the "Chat View" block to a page. For more on adding blocks, see the [Building and Designing Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14/337#addingablocktoapageexternalsite) guide.

![Web Chat block preview](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/Chat-Preview-v18.png)

Web Chat block in action

**How you can use the web chat block:**

- Create an internal "chat" page for staff to communicate.
- Have a bulletin to post important updates.

For safety you can configure the minimum age in the Chat block settings, if the person does not have an age entered a verification screen will pop-up.

# Page Layout for Web Chat

Currently, the Web Chat block looks best and scrolls smoothly on the "Full Worksurface" page layout. It functions well on any layout, but looks best when it uses this layout.

# Fallback Chat Notifications

With Rock Automations, Fallback Chat Notifications act as your safety net for urgent messages. If someone in a Chat doesn’t have the Rock Mobile app installed—or has notifications turned off—Rock can automatically step in and deliver the message another way. Imagine a notification like, “You have a secured chat message from Ted Decker at Rock Solid Church” arriving by SMS or email, ensuring no one misses a communication.

![Automation Detail](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/chat-fallback-automation-detail-v18.png)

Automation Detail

Once you have Chat up and running, adding fallback notifications takes just a few minutes.

# Warning

To maintain performance and avoid placing unnecessary loads on the Rock server, Fallback Chat notifications will be sent to a maximum of 50 members per Channel. For best performance and responsiveness, keep it to 3–5 members.

## Add a Chat Message Trigger

Navigate to Admin Tools \> General \> Automations and click the \[+\] button to add a new Automation Trigger.

### Trigger Properties

![Add Automation Trigger](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/chat-fallback-automation-trigger-v18.png)

Add Automation Trigger

![Trigger Criteria](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/chat-fallback-trigger-criteria-v18.png)

Trigger Criteria

### Add a Send Fallback Chat Notification Event

Once you've added your Automation Trigger, you can add as many Automation Events as you'd like to be fired when the trigger criteria are met. In our example, we'll choose the *Send Fallback Chat Notification* event type.

### Event Settings

![Event Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/chat-fallback-event-settings-v18.png)

Event Settings

### System Communication

We've provided an example Fallback Chat Notification System Communication with both an SMS and email Lava template. You'll find that we've provided plenty of merge fields, including the contents of the chat message that was sent, allowing you to provide as little or as much detail as you'd like in the fallback notification. The ultimate goal should be to bring the individual to the conversation by providing a link to get them there.

![System Communication Chat Fallback](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/system-communication-chat-fallback-v18.png)

System Communication Chat Fallback

### Deep Linking to the Rock Mobile Chat Page

Follow the documentation on *Deep Linking* to configure a link to the page within your Rock Mobile App that contains the Chat View block and use that link within your System Communication to bring individuals directly to the app if they already have it installed (but have notifications disabled).

# Warning

Mailgun's tracking of links within an email sent by Rock will break *Deep Linking*, and the individual will instead be taken directly to the Deep Link's fallback page. In order to prevent this, add the following attribute to the link within your email's Message Body:

##### Link Attribute


<a href\="{{ chatUrl }}" disable-tracking\="true"\>{{ chatUrl }}</a\>

It's likely that SendGrid has a similar mechanism to disable tracking.

### Linking to the Web Chat View Block

You can also use Rock's Chat View block within a Rock website. Be sure to add this block to a page on your public-facing website and use this as the Fallback Page when setting up your *Deep Link*.

Table of Contents

- [Welcome](#welcome)
- [Sending a Communication](#sendingacommunication)
- [Under the Hood of Communications](#underthehoodofcommunications)
- [SMS Pipeline](#smspipeline)
- [SMS in Detail](#smsindetail)
- [Configuring Email](#configuringemail)
- [Communication Lists](#communicationlists)
- [Communication Wizard (Legacy)](#communicationwizardlegacy)
- [Communication Wizard](#communicationwizard)
- [Simple Editor](#simpleeditor)
- [Communication Flows](#communicationflows)
- [Mass Push Notifications](#masspushnotifications)
- [Approvals](#approvals)
- [Communication Preferences](#communicationpreferences)
- [Communication History and Analytics](#communicationhistoryandanalytics)
- [Communication Saturation Report](#communicationsaturationreport)
- [System Communications](#systemcommunications)
- [Integrations](#integrations)
- [Rock Chat (Mobile)](#rockchatmobile)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


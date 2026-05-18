---
description: Use when user needs to send bulk email or SMS messages to groups of recipients in Rock Mobile
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Allows you to send out Email/SMS communications to a group of recipients.

M v5.0 C v15.0

This block is relatively simple to use, but it requires a decent understanding of [Communications in Rock](https://community.rockrms.com/rocku/communication).

## Setup

For this block to work correctly, you must pass in a valid `EntitySetGuid` page parameter. This will populate the list of recipients that receive the communication. The EntitySetType should be of Person.

You can generate these EntitySetGuid parameters auto-magically, using the [Group Member List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-list) block.

## Settings

| Setting | Description |
| --- | --- |
| Enable Email | Enable 'Email' as a communication transport. |
| Enable SMS | Enable 'SMS' as a communication transport. |
| Show From Name | Show the 'From Name' field for the email communication transport. |
| Show Reply To | Show the 'Reply To' field for the email communication transport. |
| Show Parent Communication Toggle | Show the toggle that enables/disables parent communication. You can use this in accordance with the 'ForceSendToParents' parameter. |
| Is Bulk | Whether or not the communication should be flagged as bulk. |
| Allowed SMS Numbers | The system phone numbers that are available to use as the 'From Number' for SMS communication. If none are supplied, all of the numbers in the list are available. |
| Show Only Personal SMS Number | Only SMS numbers tied to the current individual will be shown. Those with ADMIN rights will see all SMS numbers. |
| Hide Personal SMS Number | Only SMS numbers that are not tied to an individual will be shown. |
| Person Profile Page | This page is navigated to from the list of recipients that the communication failed to send to. The page is pushed to with a PersonGuid and a GroupMemberGuid parameter, of the person that the communication failed to deliver to. |
| SMS Character Limit | The amount of characters to limit an SMS message to. |
| Show Additional Email Recipients | Whether or not the field should be enabled to show additional email recipients. |

## Page Parameters

This block supports many query strings that can be used to override the block settings. This allows you to set a default, then customize the experience for each individual based on something like the group role or other data from Rock.

| Name | Type | Description |
| --- | --- | --- |
| EntitySetGuid | Guid | The EntitySet that sets the recipients for the communication. |
| EnableSms | bool | Takes precedence over the 'Enable Sms' block setting. Use this to enable/disable the sending of an SMS communication. |
| EnableEmail | bool | Takes precedence over the 'Enable Email' block setting. Use this to enable/disable the sending of an Email communication. |
| FromEmail | string | The email to send the communication from. If none are supplied, the block will assume the email of the current person. |
| FromNumberGuid | Guid | The Guid of the System Phone Number to set this block to use. Note, that this number must be available to the block. You can see more information in the configuring phone numbers section. |
| MaxRecipients | int | This doesn't limit the number of email recipients but is the maximum number before [approval is required](https://community.rockrms.com/Rock/BookContent/8#approvingemails). The confirmation message on the final page will change to say the message has been submitted for approval. |
| ForceSendToParents | bool | If parent communication is enabled, this will force any communication to also be sent to the parents of any children in the recipients. |
| ShowFromName | bool | Whether or not to show the 'From Name' Email field. |
| ShowReplyTo | bool | Whether or not to show the 'Reply To' Email field. |
| IsBulk | bool | Takes precedence over the 'Is Bulk' block setting. Whether or not to set the communication as bulk or not. |
| ReplyTo | string | When provided (and Show Reply To is enabled), the "Reply To" value for an Email communication will be hard-coded to the provide value. |
| FromNumberGuid | Guid | The Guid of the system phone number to limit the SMS communication to (From Number). Note that this number must be available to the block. |

## Security (Approving Communications)

This block uses a unique security verb, named `Approve`. This security role determines if someone is allowed to instantly queue a communication, or if it must be submitted for approval beforehand. It is highly recommended to configure the security on this block, to ensure not anyone can send a communication to a large number of people.

![](https://community.rockrms.com/GetImage.ashx?Id=66886)

Here is the security action configured to behave exactly the same as the web block:

![](https://community.rockrms.com/GetImage.ashx?Id=66885)

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71451)

---

## Communication List Subscribe {#communication-list-subscribe}

Allows the user to subscribe or unsubscribe from specific communication lists.

This block heavily depends on an understanding of [Communications in Rock](https://community.rockrms.com/rocku/communication). If you are unfamiliar, please refer to the link referenced.

## Block Configuration

### Communication List Strategies

Select the categories of the communication lists to display, or select none to show all that the user is authorized to view.

### Show Description

If enabled then the description of the communication list will be shown.

### Show Medium Preference

If enabled, a segment picker will be displayed for lists that the person is subscribed to in order to set their preferred communication type.

### Show Push Notifications as Medium Preference

If enabled, push notification will be displayed as an option for medium preference.

### Filter Groups By Campus Context

If enabled, groups will be filtered by the current campus context. If a campus is not set on the communication list, then it will be displayed no matter what.

### Always Include Subscribed Lists

When filtering by campus, you may want to display lists that the user is subscribed to regardless of the campus context. Enabling this will do just that.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=66887)

---

## Communication View {#communication-view}

M v2.0

This block is simple to use, but it's important to understand its function. When authoring a new push communication, you may have seen the question for **Open Action**, which includes the options `Link to Mobile Page` and `Show Details`. This block handles the Show Details option.

If you've ever wanted to show additional information to someone after they tap a notification, you can! The content you enter into the **Additional Details** box will be shown in the app via this block. Start by creating a new page and adding the Communication View block. Next, you'll need to tell the app which page has this block so it knows where to direct people that tap on notifications. Under the Application tab, click Edit and select the page you created for **Communication View Page**.

![](https://community.rockrms.com/GetImage.ashx?Id=66889)

Note that not every formatting option is supported in the mobile app, so don't go crazy with fonts and colors. Images are supported, and will generally try to adhere to the layout you set in the editor. For more info on what's supported, check out the [HTML control](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/html).

### Parameters

| Name | Type | Description |
| --- | --- | --- |
| CommunicationRecipientGuid | Guid | The Guid for the communication recipient. |

---

## SMS Conversation List {#sms-conversation-list}

*Manage your inbox of SMS Conversations.*

M v5.0 C v15.0

## Configuration

### Allowed SMS Numbers

This setting allows you to designate which phone numbers are permitted as From numbers. If no numbers are selected, all numbers will be available.

### Show Only Personal SMS Number

When this setting is turned on, only SMS numbers associated with the current person will display. Administrators, however, will be able to view all SMS numbers.

### Hide Personal SMS Number

Enable this setting to only show SMS numbers that aren't linked to a specific person - essentially, numbers without an "Assigned To Person" value.

### Show Conversations From Months Ago

Limits the conversations shown to those of X months ago or newer.

### Max Conversations

The max number of conversations to show in the panel.

### Database Timeout

The number of seconds to wait before reporting a database timeout.

### Conversation Page

The page that the person will be pushed to when selecting a conversation. It would be wise that this page include a [SMS Conversation](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/communication/sms-conversation) block. This page will be pushed to with the `PhoneNumberGuid` and `PersonGuid` parameters.

### Person Search Stopped Typing Behavior Threshold

The amount of time to wait before executing the person search command, from the millisecond that the person stops typing.

### Page Parameters

The following query string parameters are recognized and utilized by this block.

| Name | Type | Description |
| --- | --- | --- |
| AutoFocusPersonSearch | bool | A boolean indicating whether or not the Person Search field should be automatically focused upon display. Defaults to true. |

### Styling

![The SMS Conversation List CSS X-Ray](https://community.rockrms.com/GetImage.ashx?Id=66892)

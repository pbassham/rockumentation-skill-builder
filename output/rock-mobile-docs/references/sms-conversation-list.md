> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Communication > SMS Conversation List

# SMS Conversation List

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

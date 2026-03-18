> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Communication > Chat View

# Chat View

Enables a full-featured real-time chat experience with support for threads, reactions, media, group messaging and more.

M v7.0Cv17.1 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

Note

To get started with Chat in Rock Mobile, contact the App Factory team to discuss the required pre-configuration for your mobile app.

### Overview

The **Chat View** block brings a modern, real-time messaging experience to your Rock-powered app. Chat channels are automatically synced from your Rock groups, allowing users to communicate in group chats, direct messages, or community discussions — all based on their existing group memberships.

Features include:

-   Real-time messaging with typing indicators and read receipts
-   Support for threads, reactions, and media attachments
-   Direct messages and group chats tied to Rock group data
-   Push notifications

This block is ideal for fostering engagement in small groups, ministries, volunteer teams, or campus-wide discussions.

### Page Parameters

Note

The Direct Channel CID value uses a specific format  
  
Direct Channel CID  
rock-grouptype-{{ GroupTypeId }}:rock-group-{{ GroupId }}

| Key | Type | Description |
| --- | --- | --- |
| ChannelId | string | If provided, this will limit the block to the passed channel. Value uses direct channel cid format. |
| SelectedChannelId | string | If provided, this will pre-select the block to the passed channel. Value uses direct channel cid format. |
| MessageId | string | If provided, the block will scroll to the passed in message. This cannot be used independently of ChannelId or SelectedChannelId. |

### Block Settings

#### Filter Shared Channels by Campus

If enabled, the channel list will filter according to the current person's campus. Groups without a campus will not be filtered out according to this setting.

#### Minimum Age

The integer value of the minimum age required to view this block. If the person does not have a stored Birth Date, they will be prompted.

#### Age Verification Template

If a person does not have a birthdate, this is the template that will render above the input for the person to enter their birthdate.

#### Age Restriction Template

If a person is under the specified [Minimum Age](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/communication/chat-view#minimum-age), this is the template that will be displayed.

### Styling

There’s no styling X-Ray available.

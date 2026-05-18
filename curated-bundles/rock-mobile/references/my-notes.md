---
description: "Use when users need to view, edit, delete, or manage their personal notes in Rock Mobile, including linking notes to people, reminders, or connections"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

View and comprehensively manage any note you have created.

Mv6.1 Cv16.7 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

Warning

**Fluid** is the required Lava Engine Liquid Framework

## Block Configuration

### Note Item Template

This template is pretty complicated. It is what is displayed for each note item in the list. There are a handful of merge fields and commands that you can use to customize this template.

### Merge Fields

| Property | Description |
| --- | --- |
| Note | A custom object containing useful information about the note. You can all of the properties available [here](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/core/my-notes#note-items). |
| PersonEntityTypeId | The ID of the system Person entity type. |
| PersonAliasEntityTypeId | The ID of the system Person Alias entity type. |
| PersonAliasEntityTypeGuid | The GUID of the system Person Alias entity type. |
| ReminderEntityTypeId | The ID of the system Reminder entity type. |
| ConnectionEntityTypeId | The ID of the system Connection Request entity type. |
| ReminderNoteTypeGuid | The GUID of the configured Reminder Note Type (to use for new reminders). |
| ConnectionNoteTypeGuid | The GUID of the configured Connection Request Note Type (to use for new connections). |
| PersonDetailPage | The GUID of the configured person detail page. |
| ReminderDetailPage | The GUID of the configured reminder detail page. |
| ConnectionDetailPage | The GUID of the configured Connection Request detail page. |
| AddConnectionPage | The GUID of the configured Add Connection Page. |
| GroupNotesByDate | Whether or not you have configured this block to group the notes by the date they were left. |

## Commands

| Commands |  |
| --- | --- |
| DeleteNote | Triggers a deletion of the note. If this note has a linked reminder or connection, it will prompt the individual to ask if they want to delete the note or both the note and linked entity. |
| ShowNoteDetail | Pushes to an edit view of the note. |
| EditNote | Shows a cover sheet allowing someone to edit a note. |
| LinkToPerson | Shows UI to link the note to a person. Only works on notes that are not currently linked to an entity. |

### Enable Swipe for Options

If enabled, the note will be both left and right swipe-able with options to add a reminder, connection, link to person, edit or delete.

### Person Note Types

The note types to allow when linking a note to a person. If none are checked, all of the note types will be included.

### Reminder Note Types

The note type to update the note to when adding a reminder from the note.

### Connection Note Type

The note type to update the note to when adding a connection request from the note.

### Person Profile Detail Page

The page to use to view the details of a person.

### Reminder Detail Page

The page to use to edit or add a reminder.

### Add Connection Page

The page to use when adding a new connection from the note.

### Connection Detail Page

The page to use when viewing the details of a connection request.

### Group Notes by Date

Whether or not the notes should be grouped by the date they were left.

## Note Items

The Note item you have access to in the [Note Item Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/core/my-notes#note-item-template) has the following properties available to you.

| Property | Type | Description |
| --- | --- | --- |
| Id | int | The ID of the Note. |
| Guid | Guid | The GUID of the note. |
| EntityId | int | The ID of the entity associated with this note. |
| EntityGuid | Guid | The GUID of the entity associated with this note. |
| NoteTypeId | int | The ID of the note type. |
| NoteTypeGuid | Guid | The GUID of the note type. |
| NoteTypeEntityTypeId | int | The ID of the Entity Type associated with the Note Type. |
| EntityName | string | The friendly name of the linked entity. |
| NoteText | string | The text of the note. |
| NoteDate | DateTime | The date that the note was created. |
| NoteTypeName | string | The friendly name of the Note Type. |
| PhotoUrl | string | If this is a person note, this value will be the PhotoUrl of the person. |
| IsPrivateNote | bool | Whether or not this note is private. |
| IsAlert | bool | Whether or not this is an alert note. |

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71484)

---

## Notification Messages {#notification-messages}

Displays a list of in-app notification messages for the currently logged-in person. This is not a history of push notifications — these are persistent, actionable inbox messages stored in Rock and scoped to the person. Messages expire after 90 days and are ordered newest-first. Unauthenticated visitors see no messages.

## Tap Behavior & Routing

When a person taps a message, Rock determines the destination server-side based on the notification type. There are three possible outcomes:

**Navigate within the app** — the most common outcome on mobile. The person is taken to a relevant page inside the app with context pre-loaded.

**Open in the browser** — occurs when the destination page only exists on a web site and has no mobile equivalent. Rock automatically falls back to opening the full URL in the device's browser.

**Show an informational message** — occurs when the destination cannot be resolved or a required configuration is missing. A dialog is shown instead of navigating.

Tapping a message marks it as read. Some types delete the message after it is tapped; others keep it in the list in a read state.

### More Details

When a mention notification is created, Rock records which page the mention occurred on and what the page parameters were at that moment. When the notification is tapped, Rock tries to navigate back to context using that stored information.

In-app navigation works automatically when the notification was created from within the mobile app. Rock stores the originating page directly and navigates back to it. Route matching is only relevant in cross-site scenarios, where a notification was created on a web page and opened in a mobile app. In that case, Rock looks for a mobile page with a matching route name. If none exists, it falls back to opening the web URL in the browser.

## Notification Types

| Type | Description |
| --- | --- |
| Note Mentions | Generated when someone @mentions the person in a note anywhere in Rock. Tapping navigates to the page where the note lives. If that page exists in the current mobile app, navigation stays in-app. If the page is web-only, it opens in the browser. Message is kept after reading. |
| Connection Request Mentions | Generated when someone @mentions the person in a connection request note. Follows the same routing behavior as Note Mention. Because connection request pages are typically web-only, this will most often open in the browser when tapped from mobile. Message is kept after reading. |
| SMS Conversations | Generated when an unread SMS arrives on a system phone number the person monitors. Tapping opens the SMS Conversation page configured in the mobile site's settings. If that page has not been set up, the person sees an error message instead of navigating. The notification is deleted after it is tapped. |

---

## CRM {#crm}

# CRM

---

## Group Members {#group-members}

### M v5.0C v15.2

Allows you to view the other members of a group person belongs to (e.g. Family groups).

Not to be confused with the [Group Member List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-list) block, this block displays the other members that belong to the same Group Type supplied through block configuration, for the `Person` retrieved from context. The main use-case for this block is to display a Person's family members.

## Getting Started

This block is pretty straightforward to get working. The only thing really required is a `Person` context, which can be configured through the page settings.

![](https://community.rockrms.com/GetImage.ashx?Id=67234)

Navigate to `Mobile Applications > Person Profile Page > Edit`.

![](https://community.rockrms.com/GetImage.ashx?Id=67235)

Under `Advanced Settings`, set the `Person Parameter Name` of the `Context Parameters`.

## Block Settings

### Members Template

This is the template that will be used to display the members.

#### Merge Fields

The members template gets supplied the following merge fields.

| Field | Type | Description |
| --- | --- | --- |
| Groups | A list of an object containing a Group and CanEdit field. | This is an anonymous object that contains the Rock.Model.Group & a CanEdit boolean value that depicts whether or not the CurrentPerson has authorization to edit the Person retrieved from context. |
| Person | Rock.Model.Person | The person retrieved from context. |
| EditPage | Guid | This merge field is supplied from the [Group Edit Page](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/crm/group-members#group-edit-page) block setting. |

### Group Type

The group type to display members for. Defaults to `Family`.

### Auto Create Group

If enabled, a new `Rock.Model.Group` will be created for the `Person` retrieved from context if it does not already exist.

### Group Edit Page

The page to push to when a group is selected. Exposed in the [Members Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/crm/group-members#members-template) through a merge field.

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

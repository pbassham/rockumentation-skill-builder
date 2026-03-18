> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Core > My Notes

# My Notes

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
| Note |   A custom object containing useful information about the note. You can all of the properties available [here](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/core/my-notes#note-items).   |
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

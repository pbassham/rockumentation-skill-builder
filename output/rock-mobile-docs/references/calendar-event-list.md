> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Events > Calendar Event List

# Calendar Event List

Displays a list of events from a calendar.

## Parameters 

| Name | Type | Description |
| --- | --- | --- |
| CampusGuid | Guid | An optional Guid of the campus to filter the events list to. |

## Settings 

### Calendar

The calendar to pull events from.

### Detail Page

The mobile page to push onto the navigation stack when viewing details of an event. This will not work with an external web page.

### Event Template 

The template to use when rendering event items.

#### Merge Fields 

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| Items | List | The entire list of occurrence items. |

### Day Header Template 

The XAML to use when rendering the day header above a grouping of events.

### Enable Campus Filtering 

If enabled then events will be filtered by campus to the campus context of the page and user.

### Show Past Events 

When enabled past events will be included on the calendar, otherwise, only future events will be shown.

### Styling 

![](https://community.rockrms.com/GetImage.ashx?Id=67245)

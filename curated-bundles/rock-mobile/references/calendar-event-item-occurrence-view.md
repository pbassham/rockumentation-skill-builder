---
description: "Use when displaying details about a specific event occurrence including registration status, location, schedule, and contact information"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

This block displays a specific event item occurrence.

## Page Parameters

| Name | Type | Description |
| --- | --- | --- |
| EventOccurrenceGuid | Guid | The guid of the particular event occurrence. |

## Block Configuration

### Registration URL

The base URL to use when linking to the registration page.

### Template

The template to use when rendering the Event Item Occurrence.

#### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| RegistrationUrl | string | [Registration URL](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/events/calendar-event-item-occurrence-view#registration-url) |
| EventItemOccurrence | EventItemOccurrence |  |
| Event | EventItem |  |
| RegistrationStatusLabel | string | Status of the first registration instance. |
| RegistrationStatusLabels | Array\[string\] | Status of each registration instance. |

If **Spots Available** has a value and there's less than 1 spot remaining, the registration status label returns "Full" unless the waitlist is enabled, which returns "Join Wait List". Otherwise, it's "Full".

#### Merge Field Types

##### EventItemOccurrence 

| Property | Type | Description |
| --- | --- | --- |
| EventItemId | int | The event item identifier. |
| CampusId | int? | The campus identifier (optional). |
| Location | string | The description of the location. |
| ScheduleId | int? | The schedule identifier (optional). |
| ContactPersonAliasId | int? | The contact person alias Id. |
| ContactPhone | string | A string containing the contact person's phone number. |
| ContactEmail | string | A string containing the contact person's email. |
| Note | string | The campus note. |
| NextStartDateTime | DateTime | The next occurrence datetime (optional). |

##### EventItem

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the event. |
| Summary | string | A summary of the EventItem. |
| Description | string | The description of the EventItem. |
| PhotoId | int? | The identifier for the photo. (optional) |
| DetailsUrl | string | Gets or sets the details for an external event. |
| IsActive | bool | Whether or not the EventItem is active. |
| IsApproved | bool | Whether or not the EventItem is approved. |
| ApprovedByPersonAliasId | int? | If approved, the Id of the person that approved it (optional). |
| ApprovedOnDateTime | DateTime | If approved, the DateTime that it was approved. (optional). |

---

## Calendar Event List {#calendar-event-list}

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

---

## Calendar View {#calendar-view}

Displays a calendar of events.

### Query Strings

|  |  | Description |
| --- | --- | --- |
| CampusGuid | GUID | Sets the campus context. |

Note

If the campus context is not set by query string, the local context from the [Campus Context Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/campus-context-picker) will be used. If that doesn't have a value and the individual is signed in, the campus associated with their account will be used instead.  

### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| Items | List | A list of details pertaining to the calendar event. |

### Styling

Additional styling options for formatting the calendar presentation.

![](https://community.rockrms.com/GetImage.ashx?Id=67246)

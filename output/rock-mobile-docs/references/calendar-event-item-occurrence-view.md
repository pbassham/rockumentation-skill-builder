> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Events > Calendar Event Item Occurrence View

# Calendar Event Item Occurrence View

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
| EventItemOccurrence | EventItemOccurrence | The specific occurrence and the details of it. |
| Event | EventItem | The entire list of last prayed details. |
| RegistrationStatusLabel | string | Status of first registration instance. |
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

> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Events > Event Item Occurrence List By Audience Lava

# Event Item Occurrence List By Audience Lava

*Block that takes an audience and displays calendar item occurrences for it using Lava.*

## Query Parameters 

The query parameters this block looks for upon initialization are as follows:

| Name | Type | Description |
| --- | --- | --- |
| CampusGuid | Guid | An optional Guid of the campus to filter event items to. |

## Block Configuration

### List Title

The title to make available in the lava.

### Audience 

The audience to show calendar items for.

### Calendar 

Filters the events by a specific calendar.

### Campuses

List of which campuses to show occurrences for. This setting will be ignored if `Use Campus Context` is enabled.

### Use Campus Context

Determine if the campus should be read from the campus context of the page.

### Date Range

Optional date range to filter the occurrences on.

### Max Occurrences 

The maximum number of occurrences to show.

### Event Detail Page 

The page to use for showing event details.

### Lava Template

The template to use when rendering event items.

#### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| CurrentPage | Page | The current page of the individual. |
| ListTitle | string | The title of the list. |
| EventDetailPage | Guid | The Guid of the event detail page to navigate to. |
| EventItemOccurrences | List | A list of all event item occurrences. |
| FilteredCampuses | List | A list of campuses based on the filters provided. |
| Audience | Audience | The audience to display events for. |
| Calendar | Calendar | The event calendar to display. |

### Enabled Lava Commands

The Lava commands that should be enabled for this block; only affects Lava rendered on the server.

### Styling

There’s no styling X-Ray available.

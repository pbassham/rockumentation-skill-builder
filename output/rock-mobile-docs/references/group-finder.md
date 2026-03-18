> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Group Finder

# Group Finder

M3.0 C13.0

This block provides the ability to search for groups based on campus, day of week, time of day, location, and custom attributes.

Note

The returned groups matching the filters do not account for user security. Use the HasRightsToLava filter to check view permissions for each group as needed.

## Query Strings

| Value | Description |
| --- | --- |
| LoadResults | true – Bypasses the filter and shows results immediately. |

## Template

The Deploy button is not required for content changes.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| DetailPage | Guid | The page GUID defined in the block settings. |
| Groups | List | A collection of Group objects. |
| Distances | List<groupId, distance> | A collection of key value pairs with the groupId and distance in miles. |

### Settings

| Property | Type | Description |
| --- | --- | --- |
| Campus Context Enabled | bool | When enabled and Campus context is set by the [Campus Context Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/campus-context-picker) or [Set Context command](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#setcontext), the campus value will be selected automatically. |
| Show Location Filter | bool | When enabled, provides a selection between the person's Home address or a new address. An OS permission will appear to request location access.  
  
Note that groups without a location will **not** be returned in the results when the location filter is enabled. |

## Styles

| Class | Type |
| --- | --- |
| .group-finder-filter | [StackLayout](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.stacklayout?view=xamarin-forms) |
| .campus-picker | [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker) |
| .day-of-week-picker | [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker) |
| .time-of-day-picker | [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker) |
| .group-finder-search-button | [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms) |

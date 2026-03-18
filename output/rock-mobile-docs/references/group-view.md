> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Group View

# Group View

Displays a page to allow the user to view the details about a group.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to view the details of. |

## Settings

| Setting | Description |
| --- | --- |
| Group Edit Page | The page that will be navigated to when the 'edit' button is pressed. GroupGuid will be passed in as a page parameter. |
| Show Leader List | Specifies if the leader list should be shown. This value is made available to the template as ShowLeaderList. |

## Template

The **Deploy** button is not required for content changes.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| Group | Group | The group that is retrieved from the GroupGuid parameter. |
| GroupEditPage | Guid | The Guid of the page that is passed when the Edit button is pressed. Retrieved from the Group Edit Page block configuration. |
| ShowLeaderList | boolean | True or False depending on the Show Leader List setting. |

### Styling

There’s no styling X-Ray available.

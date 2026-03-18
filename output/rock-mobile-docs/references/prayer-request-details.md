> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Prayer > Prayer Request Details

# Prayer Request Details

Displays a form to submit a new prayer request or edit an existing one.

### M v3.0

![](https://community.rockrms.com/GetImage.ashx?Id=67281)

### M v7.0C v16.8

In this update, the block now supports the inclusion of prayer request attributes. Those of the supported [Field Types](https://community.rockrms.com/developer/mobile-docs/essentials/field-types) will be included in the form.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| RequestGuid | Guid | The Guid of the request you wish to display details of. |
| GroupGuid | Guid | An optional page parameter containing the Guid of the specific group. |
| RequestorPersonGuid C v15.0 | Guid | If passed in, this will update the block to use the Person with the Guid corresponding to this value instead of the currently logged-in person. |

## Settings

| Name | Description |
| --- | --- |
| Show Category | If disabled, category selection will be unavailable, and only the default category will be applied. |
| Parent Category | A top-level category. This controls which categories the person can choose from when entering their prayer request. |
| Default Category | The default category to use for all new prayer requests. |
| Enable Auto Approve | If enabled, prayer requests are automatically approved; otherwise, they must be approved by an admin before the prayer team can see them. |
| Expires After (Days) | The number of days until the request will expire (only applies when Enable Auto Approve is true). |
| Show Header | If enabled, an 'Add/Edit Prayer Request' header will be displayed. |
| Show Urgent Flag | If enabled, requestors will be able to flag prayer requests as urgent. |
| Show Public Display Flag | If enabled, requestors will be able to set whether or not they want their request displayed on the public website. |
| Default to Public | If enabled, all prayers will be set to public by default. |
| Character Limit | If set to something other than 0, this will limit the number of characters allowed when entering a new prayer request. |
| Show Campus | Should the campus field be displayed? If there is only one active campus then the campus field will not show. |
| Require Campus | Require that a campus be selected. The campus will not be displayed if there is only one available campus, in which case if this is set to true then the single campus is automatically used. |
| Require Last Name | Requires that the requestor's last name be entered. The first name is always required. |
| Enable Person Matching | Links the prayer request to an existing person if a match can be made between the requester and an existing person. |
| Completion Action | The action performed after saving the prayer request. |
| Completion Xaml | The XAML markup that is used when the Completion Action is set to Show Completion Xaml. Lava is supported. |
| Workflow | An optional workflow to start when a prayer request is created. The PrayerRequest will be set as the workflow 'Entity' attribute when processing is started. |

### Styling

There’s no styling X-Ray available.

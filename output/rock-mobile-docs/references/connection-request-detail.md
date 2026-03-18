> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Connection > Connection Request Detail

# Connection Request Detail

M v3.0C v13.3

This block is used to display details for a particular connection request. If you are unfamiliar with Connections in Rock, please refer to the [connections manual](https://community.rockrms.com/Rock/BookContent/39#connections).

### Style Classes

| Class | Element | Description |
| --- | --- | --- |
| connection-request-detail-layout | [Scroll View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/scroll-view) | Outer content wrapper |
| connection-request-detail-frame | Frame | Main content wrapper |
| connection-request-detail-content | StackLayout | Content within frame wrapper |
| status-pill-layout | FlexLayout | Pill content wrapper |
| contact-button-\[xxx\] | [Button](https://community.rockrms.com/developer/mobile-docs/styling/legacy/styling-components/button) | \[Name of action\] (Ex: Mobile) |
| request-activities-frame | Frame | Wrapper around activities section |
| request-activities | StackLayout | Wrapper of activity content |
| add-activity-sheet | StackLayout | Wrapper of content in CoverSheet |
| activity-container | Grid | Individual activity wrapper |

## Block Configuration

### Parameters

| Key | Type |
| --- | --- |
| ConnectionRequestGuid | Guid |
| ConnectionRequestId Cv16.1 | Id |

### Header Template

This is the content that is rendered above the lists of your requests. This allows you to put a logo, header, or do whatever you like to style the top of this block.

### Merge Fields

Merge fields are fields that are available to use within the template. So in the header template, you have access to these objects:

| Field | Type | Property |
| --- | --- | --- |
| ConnectionRequest | ConnectionRequest | The specific connection request, as retrieved by the corresponding Guid. |

## Activity Template

This is the main template that is used to display the details of the request/activity. You can fully customize this template to style and provide the exact functionality you want.

### Merge Fields

In the opportunity template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| ConnectionRequest | ConnectionRequest | The specific connection request, as retrieved by the corresponding Guid. |
| Activities | List<ConnectionRequestActivity> | A list of all the corresponding activities for the particular request. |

### No Activities Content

You may have noticed in some other blocks, there is a block setting to provide content when there is nothing to display. Often seen as something like a:

```xaml
<NotificationBox Text="There are no corresponding activities." />
```

We have decided to make this an even easier piece of the puzzle to set, by including it in the template itself. If you wish to customize this content, the piece you are looking for is:

```lava
{% if ConnectionOpportunities == empty %}
    //- Put your content here!
{% endif %}
```

### Page Settings

**Person Profile Page**

M v5.0

When the profile button is pressed, this is the page that will be pushed. Out of the box, the profile button provides the `PersonGuid` through a query string parameter upon navigating to this page.

If this setting is left blank, the Profile action button will not be shown.

**Group Detail Page**

When the group button is pressed, this is the page that will be pushed. The group button passes the `GroupGuid` through a query string parameter.

**Workflow Page**

When the workflow button is pressed, this is the page that will be pushed. This button passes the `WorkflowGuid` through a query string parameter.

### Reminder Page

If supplied, a Reminder button will be shown that will display the selected page within a cover sheet.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71482)

> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Prayer > Prayer Card View

# Prayer Card View

### M v3.0

Provides an additional experience to pray using a card based view.

The prayer card view block provides an intuitive experience of prayer using a card-based view. Users can scroll through and pray for open prayer requests, by tapping a button when they have finished their prayer. When the button is tapped, the total prayers received count is incremented and can be viewed in the prayer details.

## Getting Content

To get content for this list, you must first make sure there are open prayer requests. If there are not or you are unsure, navigate to `People > Prayer` on your Rock server. In the prayer requests section, you can see if there are any active prayer requests and/or add one for demonstration.

## Query Parameters

The query parameters this block looks for upon initialization are as follows.

| Name | Type | Description |
| --- | --- | --- |
| CampusGuid | Guid | An optional Guid of the campus to display prayer requests for. |

## Block Settings

### Template 

This is the main template that is used to display the entire view of an individual's prayer requests. You can make changes here to edit styling and functionality (if desired).

#### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| PrayerRequestItems | List<[PrayerRequest](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view#prayerrequest-type)\> | The entire list of prayer requests. |
| PrayedWorkflowType | Guid | The guid of the workflow to launch when a user marks that they have prayed. |
| LastPrayed | List<[PrayerRequestLastPrayedDetail](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view#prayerrequestlastprayeddetail)\> | The entire list of last prayed details. |

#### Merge Field Types 

These merge fields offer a few unique types, `PrayerRequest` and `PrayerRequestLastPrayedDetail`.

##### PrayerRequest Type

The PrayerRequest type offers these entity properties.

| Property | Type |
| --- | --- |
| FirstName | string |
| LastName | string |
| Email | string |
| RequestedByPersonAliasId | int (optional) |
| CategoryId | int? (optional) |
| Text | string |
| Answer | string |
| EnteredDateTime | DateTime |
| ExpirationDate | DateTime (optional) |
| GroupId | int (optional) |
| AllowComments | bool |
| IsUrgent | bool (optional) |
| IsPublic | bool (optional) |
| IsActive | bool (optional) |
| IsApproved | bool (optional) |
| FlagCount | int (optional) |
| PrayerCount | int (optional) |
| ApprovedByPersonAliasId | int (optional) |
| CampusId | int (optional) |
| ApprovedOnDateTime | DateTime (optional) |
| LanguageValueId | int (optional) |

##### PrayerRequestLastPrayedDetail

The PrayerRequestLastPrayedDetail type offers the following properties.

| Property | Type |
| --- | --- |
| RequestId | int |
| PrayerDateTime | DateTime |
| FirstName | string |
| LastName | string |

### Title Content

The XAML content to show below the campus picker and above the prayer requests.

### Hide-Campus When Known

If this is set to `Yes`, the campus picker will be hidden if the campus can be inferred from `CurrentPerson` or as a page parameter. If [Always Hide-Campus](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view#always-hide-campus) is set to `Yes`, this setting will be irrelevant.

### Always Hide-Campus

If this is set to `Yes`, the block hides the campus picker and disables filtering by campus.

### Category

A top-level category. This controls which categories are shown when starting a prayer session.

### Public Only

If selected, all non-public prayer requests will be excluded.

### Order

The order that requests should be displayed.

### Campus Types

Allows selecting which campus types to filter campuses by.

### Campus Statuses

This allows selecting which campus statuses to filter campuses by.

### Max Requests

The maximum number of requests to display. Leave blank for all.

### Load Last Prayed Collection

Loads an optional collection of last prayed times for the requests. This is available as a separate merge field in Lava.

### Prayed Workflow

An optional workflow type to launch when someone presses the Pray button. Prayer Request will be passed to the workflow as a generic `Entity` field type. Additionally, if the workflow type has any of the following attribute keys defined, those attribute values will also be set as: `PrayerOfferedByPersonId`.

### Include Group Requests

Includes prayer requests that are attached to a group.

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

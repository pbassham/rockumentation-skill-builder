---
description: "Use when configuring or customizing the prayer card view block in Rock mobile, including template settings, merge fields, and prayer request display options"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

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

---

## Prayer Request Details {#prayer-request-details}

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

---

## Prayer Session {#prayer-session}

Mv3.0 📔  [Prayer Manual](https://community.rockrms.com/Rock/BookContent/11)

Display a collection of approved prayer requests one at a time for focused experience.

Typically prefixed by the [Prayer Session Setup](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-session-setup) block, this provides many configuration options for a tailored and intimate prayer time.

To display multiple prayers at once, check out the [Prayer Card View](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view) block.  

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| Category | Guid | An optional Guid of the prayer category key. Can be used in place of the Prayer Session Setup block. |
| GroupGuid | Guid | An optional Guid to filter prayer requests to the specific group. |
| MyCampus | bool | An optional boolean to filter to the context of the current campus. |

## Settings

| Name | Type | Description |
| --- | --- | --- |
| Prayed Button Text | string | The text to display inside the Prayed button. |
| Show Follow Button | bool | Indicates if the Follow button should be shown. |
| Show Inappropriate Button | bool | Indicates if the button to flag a request as inappropriate should be shown. |
| Public Only | bool | When enabled, only prayers marked as **Public** will be shown. |
| Inappropriate Flag Limit | int | The number of flags a prayer request has to get from the prayer team before it is automatically unapproved. |
| Create Interactions for Prayers | bool | If enabled, this block will record an interaction whenever somebody prays for a prayer request. |
| Include Group Requests | bool | Includes prayer requests that are attached to a group. |
| Order | select | The order in which to display the individual prayer requests. Prayers flagged as **Urgent** requests will appear first regardless. |

## Merge Fields

| Name | Type | Description |
| --- | --- | --- |
| PrayedButtonText | string | The text defined in the Prayed Button Text setting. |
| ShowFollowButton | bool | The boolean defined in the Show Follow Button setting. |
| ShowInappropriateButton | bool | The boolean defined in the Show Inappropriate Button setting. |
| SessionContext | string | A JSON dictionary representing the Session Context. |
| Request | PrayerRequest | This is the Prayer Request object. |

---

## Prayer Session Setup {#prayer-session-setup}

Displays some options to the user to configure their prayer session.

### M v3.0

This block is used to begin a prayer session using the [Prayer Session](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-session) block. If you are unfamiliar with Rock's prayer functionality, please refer to the [Rock: Prayer Overview](https://www.rockrms.com/Content/RockExternal/Misc/Coronavirus/PrayerOverview.pdf).

## Settings

| Name | Type | Description |
| --- | --- | --- |
| Title Text | string | The title to display at the top of the block. Leave blank to hide. |
| Instruction Text | string | Instructions to help the individual know how to use the block. |
| Prayer Page | Guid | The page to push onto the navigation stack to begin the prayer session. |
| Parent Category | Guid | The parent category to use as the root category available for the user to pick from. |
| Show Campus Filter | bool | If enabled and the user has a primary campus, then the user will be offered to limit prayer requests to just their campus. |

### Styling

There’s no styling X-Ray available.

---

## Reminders {#reminders}

# Reminders

---

## Reminder Dashboard {#reminder-dashboard}

M v5.0 C v15.1 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

Displays general reminder information and filtering options for the Current Person.

## Block Configuration

### Reminder List Page

The page that is navigated to when a `Reminder Type` or filter card option is pressed.

### Reminder Edit Page

The page that is navigated to when the `Add Reminder` button is pressed.

### Reminder Types Include

The reminder types to include. Leave all unchecked to include all reminder types (except for the reminder types selected in [Reminder Type Exclude](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/reminders/reminder-dashboard#reminder-type-exclude)).

### Reminder Type Exclude

The reminder types to exclude. This setting is only effective if no specific reminder types are checked in [Reminder Types Include](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/reminders/reminder-dashboard#reminder-types-include).

### Enable Color Pair Calculation

When enabled, the filter cards and reminder icons will automatically apply color recipes to ensure the foreground and background color pass accessibility tests and standards.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71443)

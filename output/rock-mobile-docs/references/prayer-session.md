> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Prayer > Prayer Session

# Prayer Session

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

> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Prayer > My Prayer Requests

# My Prayer Requests

### M v2.0C v12.4

Shows a list of prayer requests that the user has previously entered.

This block is used by an individual to manage the prayer requests that they've previously posted.

## Query Parameters

The query parameters this block looks for upon initialization are as follows.

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | An optional Guid of the group to filter prayer requests to. |

## Block Configuration

### Edit Page

The page that will be used for editing a prayer request. Try setting this to a page containing the [Prayer Request Details](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-request-details) block.

### Answer Page

This page is used for allowing the user to enter an answer to prayer. Try setting this to a page containing the [Answer To Prayer](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/answer-to-prayer) block.

### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| PrayerRequestItems | List<[PrayerRequest](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view#prayerrequest-type)\> | The entire list of prayer requests. |
| EditPage | Guid | The Guid of the page to edit a prayer request. |
| AnswerPage | Guid | The Guid of the page to answer a prayer request. |

### Styling

There’s no styling X-Ray available.

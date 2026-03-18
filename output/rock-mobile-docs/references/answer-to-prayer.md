> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Prayer > Answer to Prayer

# Answer to Prayer

Displays an existing prayer request and allows the user to enter the answer to prayer.

M v3.0

## Getting Started

If you haven't yet set up a block that lists prayer requests in some order, I would recommend starting with that. A couple of examples of those are [Prayer Card View](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view) and [My Prayer Requests](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/my-prayer-requests). Those blocks both have a setting that should link to a page containing this block.

## Query Parameters

The query parameters this block looks for upon initialization are as follows.

| Name | Type | Description |
| --- | --- | --- |
| RequestGuid | Guid | The Guid of the prayer request being answered. |

## Block Configuration

### Return Page

If set then the current page will be replaced with the Return Page on Save. If not set then a Pop Page is performed instead.

## Enforce Security 

Ensures that the person editing the request is the owner of the request.

### Template 

The template for how to display the prayer request.

#### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| PrayerRequest | [PrayerRequest](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view#prayerrequest-type) | The prayer request that is being answered. |

### Styling

There’s no styling X-Ray available.

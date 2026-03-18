> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Content Channel Item View

# Content Channel Item View

Displays a content channel item by formatting it with XAML.

This block is useful for quickly displaying content channel items like messages or promotions. Instead of writing an entity command to get the data, this block will pull the full content channel item for you.

It functions similarly to the [Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content) block in that the XAML template is up to you to define. Its advantage lies in the built-in data pull and optional interaction write so you don't have to wire them up yourself.

## Parameters

Context can be provided to the block via item Id or Guid; you don't need to pass both.

Important

When passing multiple parameters to the page, ensure this one is first, or the block context will not be set.

| Name | Type | Description |
| --- | --- | --- |
| ContentChannelItemId | Int | The Id of the content channel item. |
| ContentChannelItemGuid | Guid | The Guid of the content channel item. |

## Settings

| Name | Description |
| --- | --- |
| Content Channel | Limits the retrieved item to a specific content channel. |
| Log Interactions | If enabled, an interaction associated with the content channel item will be added to the queue. |

## Template

The Lava commands that are enabled for this block will only Lava rendered on the server.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| Item | ContentChannelItem | The full Content Channel Item that was retrieved. |

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

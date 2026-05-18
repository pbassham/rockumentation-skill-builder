---
description: "Use when a user needs to display, configure, or style SMS text message conversations in a Rock mobile app interface"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Manage an SMS message conversation with a modern UI.

M v5.0 C v15.0

## Configuration

### Snippet Type

The type of snippets that will be made available via the snippet keyboard button.

### Message Count

The number of messages to be returned each time more messages are requested.  

### Database Timeout

The number of seconds to wait before reporting a database timeout.

## Page Parameters

The following query string parameters are recognized and utilized by this block.

| Name | Type | Description |
| --- | --- | --- |
| PhoneNumberGuid | Guid | The Rock phone number that should be used for this conversation. |
| PersonGuid | Guid | The Guid of the Person to be communicated with. |

## Styling

![The SMS Conversations CSS X-Ray.](https://mobiledocs.rockrms.com/~gitbook/image?url=https%3A%2F%2F1618311306-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LnfHr7q46y6lOQNgsA4%252Fuploads%252Fk7iya2nTxabJdteQjSOu%252FSMS%2520Conversations%2520XRay.png%3Falt%3Dmedia%26token%3D48b493af-8844-4ee9-ac8a-7e1ef9878277&width=768&dpr=4&quality=100&sign=62f8fbe8&sv=2)

### Message Bubbles

To style message bubbles, we introduced the following custom CSS classes.

| Value | Type | Description |
| --- | --- | --- |
| \-rock-inbound-background-color | Color | The color of the inbound messages background. |
| \-rock-inbound-text-color | Color | The color of the inbound messages text. |
| \-rock-outbound-background-color | Color | The color of the outbound messages background. |
| \-rock-outbound-text-color | Color | The color of the outbound messages text. |

You can target these elements by using the `^MessageBubble` selector.

```
^MessageBubble {
  -rock-inbound-background-color: orange;
}
```

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71452)

---

## Connection {#connection}

This section refers to the "Connection" mobile block group.

---

## Add Connection Request {#add-connection-request}

Allows a Person to create a new Connection.

M v5.0C v16.1

## Block Configuration

If you are unfamiliar with Connections in Rock, please first refer to the [connections manual](https://community.rockrms.com/Rock/BookContent/39#connections).

### Connection Types

The connection types that will be made available to this block. If none are selected, all available connection types will be shown.

### Post Save Action

The navigation command to execute after a save successfully occurs.

### Post Cancel Action

The navigation command to execute when the "cancel" button is pressed.

## Page Parameters

| Kry | Type | Description |
| --- | --- | --- |
| RequesterId | string | The Id Key of the requester. |
| ConnectionTypeId | string | When provided, the connection type will be locked to this value and only display opportunities of its' own type. |
| ConnectionOpportunityId | string | When provided, the connection opportunity will be locked to this value. Must be accompanied with a *ConnectionTypeId*. |
| ConnectorId | string | When provided, the connector list will pre-select to this value. The field will not be locked. |

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Communication > SMS Conversation

# SMS Conversation

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

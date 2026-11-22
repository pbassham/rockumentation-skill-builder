---
description: Use when user wants to share content with a specific contact via email or SMS while tracking the interaction for outreach reporting
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile19.1  Core19.1

Opens a cover sheet that lets the user pick someone from their My Contacts outreach list and share a piece of content with that specific person, rather than handing off to the OS share sheet. Picking a contact prompts the user to share via Email or Message (using the contact's stored email address and phone number); the email/SMS is pre-filled with the supplied subject, body, and URL. Each share is recorded as a Rock Interaction so the outreach activity can be reported on.

Use this command on detail pages where the share is part of an intentional outreach flow (sermon to a specific person, prayer card to a family member, event invite to a contact) and you want it tracked as an interaction. For a generic "share to anything" button, use `ShareContent` instead.

Note

This command needs a logged-in person, and it only lists that person's own contacts. It uses the v2 contacts API added in Core 19.1.

## Properties (ShareWithContactParameters)

| Property | Type | Description |
| --- | --- | --- |
| Url | string | The URL to share. Appended to the body of the email or message. Required; if null or empty, the command is a no-op. |
| Subject | string | Pre-populates the email subject line. Falls back to `"Check this out!"` when null or whitespace. Ignored for message (SMS). |
| Body | string | Pre-populates the email body and the message body. The `Url` is appended after this text. Falls back to `"I thought you might find this interesting: "` when null or whitespace. |
| RelatedEntityTypeId | integer | The Rock EntityTypeId of the thing being shared (e.g. Content Channel Item, Group). Stored on the resulting Interaction so reports can group shares by content type. Optional. |
| RelatedEntityId | integer | The Id of the specific record being shared. Stored on the Interaction alongside `RelatedEntityTypeId`. Optional. |

The following properties are required at a bare minimum:

1. Url
2. RelatedEntityTypeId

## Behavior

When the user taps a contact in the cover sheet:

1. If the contact has no email and no phone number, the OS share sheet is opened and the interaction is recorded with operation `Anonymous`.
2. If the contact has either, an action panel asks "How would you like to share with FirstName?" with one button per available channel:
3. Email: opens the platform email composer with `Subject` (default "Check this out!") and `Body` followed by the `Url`.
4. Message: opens the platform SMS composer with `Body` followed by the `Url`. The default body for both is "I thought you might find this interesting:".
5. After the composer closes, the interaction is recorded with operation `Confirmed` if the message was sent, or `Unknown` if the OS can't tell. Nothing is recorded if it was cancelled.

## Examples

Share a sermon with a contact

```
<Button Text="Share with a Contact"
    Command="{Binding ShareWithContact}">
    <Button.CommandParameter>
        <Rock:ShareWithContactParameters Url="{Binding SermonUrl}"
            Subject="This week's sermon"
            Body="Thought you'd enjoy this week's message:"
            RelatedEntityTypeId="{Binding ContentChannelItemEntityTypeId}"
            RelatedEntityId="{Binding SermonId}" />
    </Button.CommandParameter>
</Button>
```

Minimal share (URL only)

```
<Button Text="Share"
    Command="{Binding ShareWithContact}">
    <Button.CommandParameter>
        <Rock:ShareWithContactParameters Url="https://example.org/event/summer-camp" />
    </Button.CommandParameter>
</Button>
```

## Notes

1. The composer result reported by the OS is not reliable on iOS, so a successful share is sometimes recorded as `Unknown`.
2. The cover sheet's contact list is the same My Contacts that backs the Outreach Toolbox. A user with no contacts will see an empty state.
3. Interactions are queued locally and synced to the server on the normal interaction flush cadence. They will not appear in Rock immediately.
4. Pre-filled email and SMS bodies are concatenated as `{Body} {Url}`.

See [Outreach Toolbox](https://community.rockrms.com/developer/mobile-docs/essentials/features/outreach-toolbox) for how outreach fits together, and [My Contacts](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/engagement/my-contacts) for the contact list this command shows.

## Related

- [ShareContent](https://community.rockrms.com/developer/mobile-docs/commands/sharecontent) opens the share sheet for text or a link.
- [ShareViewImage](https://community.rockrms.com/developer/mobile-docs/commands/shareviewimage) shares an image of a view on the page.
- [CopyToClipboard](https://community.rockrms.com/developer/mobile-docs/commands/copytoclipboard) copies text to the clipboard.

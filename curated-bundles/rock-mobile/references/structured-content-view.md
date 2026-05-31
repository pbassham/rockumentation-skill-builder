---
description: "Use when displaying interactive structured content like sermon notes with rich formatting, tap-to-reveal sections, and note-taking areas in Rock mobile apps"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

*Displays a structured content channel item for the user to view and fill out.*

This block displays structured content from Rock in the app. You can use this to display interactive sermon notes with tap-to-reveal areas and note-taking areas.

## Block Settings

| Name | Description |
| --- | --- |
| Document Not Found Content C v15.1 | The XAML content to render when there is no document found. Leave blank to render nothing. |

## Content Channel

You'll see a channel called "Message Notes" that comes out of the box with Rock, so you typically won't need to set this up manually unless you have another purpose in mind. When editing a content channel, you can check the **Is Structured Content** option to enable this functionality. This will change the **Default Content Control** option to **Editor Tool Configuration**.

![](https://community.rockrms.com/GetImage.ashx?Id=66876)

Adding new child items to this content channel will allow you to edit the structured content with a rich editor. Check out the [Supported Formatting](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/structured-content-view#supported-formatting) section to see what's available. In order to link this note item to a Message, simply add it as a child to the content channel item for the Message.

![](https://community.rockrms.com/GetImage.ashx?Id=66877)

### Mobile App

In the app, you'll need a page with the Structured Content View block added. Thankfully there aren't any block settings to worry about, so you'll just need to add a link to this page that passes context using the `ItemGuid` query string with a value of the content channel item GUID. In the case of Message Notes, you can use Lava to look at the ChildItems of a message to get the Notes/Structured Content item.

```
<!-- Set the content channel type Guid of Message Notes -->
{% assign typeGuid = '48951e97-0e45-4494-b87c-4eb9fca067eb' %}

{% assign noteItem = '' %}
{% for childItem in Item.ChildItems %}
    
    <!-- Skip any child items that are not of type Message Notes -->
    {% if childItem.ChildContentChannelItem.ContentChannelType.Guid == typeGuid %}
        
        <!-- Assign the note and skip the remaining child items -->
        {% assign noteItem = childItem.ChildContentChannelItem %}
        {% break %}
    {% endif %}
{% endfor %}

{% if noteItem != '' %}
    {% assign noteGuid = noteItem.Guid %}
    <Button Text="Message Notes"
        Command="{Binding PushPage}"
        CommandParameter="{{ yourMessageNotesPageGuid }}?ItemGuid={{ noteGuid }}" />
{% endif %}
```

### Supported Formatting

Not all formatting options are supported natively in the app, but here's what can be used safely:

1. Text
2. Heading
3. List (ordered and unordered)
4. Image
	1. ~~Image captions~~
5. ~~Checklist~~
6. Quote
	1. Left-aligned
		2. ~~Center-aligned~~ (stays aligned left)
7. Warning
8. Code
9. Note (can be left blank or default content entered)
10. ~~Delimiter~~
11. ~~Link~~
12. ~~Table~~

When highlighting text, the following formatting is supported:

1. Bold (depending on font support)
2. Italic (depending on font support)
3. ~~Link~~
4. ~~Marker~~
5. Fill-in
6. ~~Code~~

### Notes

When using note blocks in structured content, they will only display if a user is logged in. We recommend putting a content block above this one that only displays if a user is not logged in, and prompts them to log in or at least lets them know that the notes are missing until they do so.

### Styling

There’s no styling X-Ray available.

---

## Workflow Entry {#workflow-entry}

*Displays a native workflow form.*

This is an extremely powerful block for managing workflows from a mobile application. If you aren't sure what workflows are quite yet, please refer to [Blasting Off With Workflows](https://community.rockrms.com/Rock/BookContent/12#workflownotes), a Rock manual that goes over the subject.

Important

Not all Rock field types are supported by this block. Those that aren't will be omitted within the app. See [Field Types](https://community.rockrms.com/developer/mobile-docs/essentials/field-types) for more info about which types are supported.  

Important

This block does not currently support Conditional Display Logic and will only respect the `Visible`, `Editable` and `Required` attributes of the field. In cases where conditional logic is required, you should consider using an external browser or a [WebView](https://mobiledocs.rockrms.com/essentials/controls/content-controls/web-view)[.](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/web-view)  

### Page Parameters

| Name | Type | Description |
| --- | --- | --- |
| WorkflowTypeGuid | Guid | Sets the workflow type context for the block if the Workflow Type block setting is empty. *This parameter will* *not* *override the block setting* |

### Block Configuration

Warning

Enable Person Entry is not supported within Rock Mobile

| Workflow Type | The type of workflow that is to be launched when a page containing this block is rendered. To manage your existing workflow types navigate to '*General Settings \> Workflow Configuration*'. |
| --- | --- |
| Completion Action | The completion action can be set to one of three different options. **1**. *Show Message From Workflow:* The block will display the configured message in the workflow settings. **2**. *Show Completion Xaml:* The block will display the XAML set in the Completion Xaml block setting. Within this template, the workflow attribute values can be accessed as usual: {{ Workflow \| Attribute:'Key' }}**3**. *Redirect to Page:* The block will redirect the individual to the page set in the Redirect To Page block setting. |
| Completion XAML | The Xaml to render upon completion. Note that the Completion Action must be set to *Show Completion Xaml*. |
| Enabled Lava Commands | The lava commands that this block is allowed to use. Note, that if your workflow utilizes Lava, you must match these settings to give your workflow full functionality. Please note that you may have to also enable the '*Process Lava on Server'* setting in the '*Mobile Settings'* of the block. A good example of how to find and enable that setting is seen [here](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content#using-lava). |
| Redirect To Page | This is the page in your mobile app to redirect to upon completion. Note that the Completion Action must be set to *Redirect to Page*. |

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

---

## Voice Agent {#cms-voice-agent}

C19.0S19.0

The conversational surface of the [Voice Agent feature](https://community.rockrms.com/developer/mobile-docs/essentials/features/voice-agent). It opens a live realtime audio session with the configured provider, streams the microphone up, plays the assistant's spoken response back, and renders an optional on-screen transcript. It also exposes a per-person settings sheet for voice, speed, push-to-talk, and subtitles.

## What it does

- Opens a realtime audio session with the provider detected from the API key and streams the microphone up.
- Plays the assistant's spoken response back through the device.
- Renders a running transcript as on-screen bubbles when subtitles are on.
- Provides a center mic control (open-mic or press-and-hold, depending on Push to Talk) and a Stop button.
- Exposes a Settings cover sheet (gear icon, bottom-left) for per-person voice, speed, push-to-talk, and subtitle preferences.
- Requests microphone permission on load and keeps the screen awake for the duration of the session.

## Settings

| Setting | What it does |
| --- | --- |
| API Key | The key obtained from the OpenAI or xAI developer portal. The prefix (`sk-` or `xai-`) determines which provider the block talks to. The key is never sent to the device; the server exchanges it for a short-lived token. |
| Model | The realtime model used for audio interactions (for example `gpt-realtime-2` or the xAI realtime model name). Must be a model the provider recognizes; an invalid value causes the block to replace its UI with an inline "Voice agent unavailable" error. |
| Instructions | The system prompt that defines how the assistant should behave during conversations: persona, scope, tone, and what it is and is not allowed to share. Sent to OpenAI only; xAI sessions start without a server-side instruction payload. |
| Stop Action | The navigation action to perform when the person taps the in-block Stop button. If the block is shown inside a cover sheet, the cover sheet is dismissed in addition to (or instead of) this action. |
| Rock MCP (Model Context Protocol) | Pick a Rock AI Agent of type "MCP" to expose its tools to the voice session. The block builds the MCP URL automatically using the public application root and a per-person API key. |
| External MCP | A value list of fully-qualified MCP server URLs from outside Rock that should also be available to the agent. |

## Personal settings

In addition to the admin-controlled block settings above, the block exposes an in-app Settings cover sheet (gear icon in the bottom-left of the block) that lets each person choose:

- Voice. The synthesized voice used for the assistant's responses. Available voices depend on the active provider. A preview button plays a short sample phrase using the current person's nickname.
- Speed. Playback speed for the assistant's voice. Typical range is roughly 0.5x to 1.5x; 1.0 is normal speed. (Only available on OpenAI.)
- Push to Talk. When on, the microphone is muted by default and the center button becomes a press-and-hold button. When off (hands-free), the mic stays open whenever it has not been explicitly muted.
- Subtitles. Toggles the on-screen transcript bubbles.

Each of these is persisted as a per-person block preference and restored the next time the block loads, so each person keeps their own preferred voice and interaction style.

## Permissions

The block requests microphone permission via the platform permission helper on load. If the person denies the request, the block does not start a session and surfaces nothing further; the rest of the page renders normally. Microphone permissions can then be enabled within the OS settings. The display is kept awake for the duration of the session and released on unload.

## Notes

- Requires an authenticated person. The block will not start a session for an anonymous visitor.
- Give it a navbar-free surface. Place the block on a page or cover sheet with no host navbar so its own controls own the screen.
- Switching providers resets an incompatible voice. If the API key is changed from one provider to the other, a saved per-person voice that no longer matches the active provider is replaced with that provider's default on the next launch.

---

## Check-in {#blocks-check-in}

This section refers to the 'CMS' mobile block group.

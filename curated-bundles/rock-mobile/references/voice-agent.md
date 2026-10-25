---
description: "Use when a user wants to enable voice conversation in a mobile app with real-time transcription, hands-free control, and permission-based access for staff and attendees"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

C19.0M19.0

Provides a real-time, conversational voice assistant inside your mobile app. The block opens a live audio session with an AI provider, streams the microphone up, plays the assistant's spoken response back, and renders a running transcript on screen (if enabled). Use it to give people a hands-free way to ask questions about themselves, their family, their giving, upcoming events, or anything else you expose through an MCP agent.

## What it does

- Opens a realtime audio session with the provider detected from the API key and streams the microphone up.
- Plays the assistant's spoken response back through the device.
- Renders a running transcript as on-screen bubbles when subtitles are on.
- Provides a center mic control (open-mic or press-and-hold, depending on Push to Talk) and a Stop button.
- Exposes a Settings cover sheet (gear icon, bottom-left) for per-person voice, speed, push-to-talk, and subtitle preferences.
- Requests microphone permission on load and keeps the screen awake for the duration of the session.

## Who uses it

The Voice Agent behaves the same way for everyone, but what a person can actually do through it depends on who they are, because every tool call the agent makes runs as the signed-in person.

- **Staff**. A staff member talking to the agent gets results scoped to their own Rock permissions. If the connected AI Agent exposes tools that read or update records, staff can reach exactly what their security role allows. This makes the block useful as a hands-free way to look things up or take action without navigating menus.
- **Attendees**. An attendee has no administrative tools and no elevated access. They interact with the same agent, but it can only surface what they are personally entitled to see, for example their own profile, family, giving, or registrations. They cannot reach staff-only data, and the experience naturally stays within their own information. You can tighten this further by setting security on an individual tool or skill, so a capability you only want staff to use is simply unavailable when an attendee asks for it.

Because access is decided per person at the tool layer, you can ship a single block to your whole congregation and trust that each person's conversation stays inside their own permissions.

## Placement

For the best experience, give the block a full, distraction-free surface. Place it on a page or a cover sheet that has no navbar, so the transcript, pulse bar, and controls own the whole screen. A surrounding navigation chrome competes with the block's own bottom controls and breaks the sense of a dedicated, focused conversation. The block already manages its own Stop action and keeps the screen awake, so it does not need a host navbar to function.

## Settings

| Setting | What it does |
| --- | --- |
| API Key | The key obtained from the OpenAI or xAI developer portal. The prefix (`sk-` or `xai-`) determines which provider the block talks to. The key is never sent to the device; the server exchanges it for a short-lived token. |
| Model | The realtime model used for audio interactions. For xAI we recommend `grok-voice-latest`, which always points to xAI's newest voice model. OpenAI has no equivalent, so name a version such as `gpt-realtime-2.1`. See Choosing a model below for when to pin a version. The provider must recognize the value; an invalid or retired model replaces the block with an inline "Voice agent unavailable" message. |
| Instructions | The system prompt that defines how the assistant should behave during conversations: persona, scope, tone, and what it is and is not allowed to share. Applies to both OpenAI and xAI. |
| Stop Action | The navigation action to perform when the person taps the in-block Stop button. If the block is shown inside a cover sheet, the cover sheet is dismissed in addition to (or instead of) this action. |
| Rock MCP (Model Context Protocol) | Pick a Rock AI Agent of type "MCP" to expose its tools to the voice session. The block builds the MCP URL automatically using the public application root and a per-person API key. |
| External MCP | A value list of fully-qualified MCP server URLs from outside Rock that should also be available to the agent. |

## Providers

The block supports two realtime providers and detects which one to use from the prefix of the configured API key:

- Keys that start with `sk-` use **OpenAI Realtime**.
- Keys that start with `xai-` use **xAI Realtime** (Grok Voice).

The provider choice also sets the default voice (`alloy` for OpenAI, `eve` for xAI) and which voices the in-app settings sheet offers. If an administrator switches the API key from one provider to the other, any saved per-person voice that no longer matches the active provider is replaced with that provider's default on the next launch.

The block works with each provider's Realtime API only. OpenAI's GPT-Live is a separate product that is not compatible with that API, so the block does not support it.

## Voice models

Note

These recommendations reflect the models, pricing, and tool-calling behavior available as of October 2026. Realtime voice offerings change quickly, so check each provider's current lineup before committing to a model.

### Choosing a model

The Model setting accepts either a specific version, such as `grok-voice-3.0`, or an alias, such as `grok-voice-latest`, that the provider points at its newest version.

- **Use the alias when the provider offers one.** You get each new model the day it is released, with no change on your side, and you never end up on a retired model. When xAI released Grok Voice 3.0 on October 14, 2026, every block set to `grok-voice-latest` moved to it automatically.
- **Pin a version when predictability matters more.** An alias can move to a model that costs more, responds differently, or sounds different, and the provider does not ask first. Pin a version if your budget is tight or you have tuned your instructions around one model's behavior.
- **OpenAI has no alias, so OpenAI blocks are always pinned.** Plan to update the Model setting when OpenAI releases a new realtime model.
- **If you pin, watch for retirements.** Providers deprecate older models and later shut them down. A deprecated model keeps working until its shutdown date; after that the block shows "Voice agent unavailable" until you update the Model setting. For example, OpenAI shuts down `gpt-realtime` and `gpt-realtime-mini` on January 20, 2027.

### Breakdown

`gpt-realtime-2.1` (OpenAI), recommended

OpenAI's current realtime model, replacing `gpt-realtime-2` at the same price. Use with a thorough system prompt. In our testing, `gpt-realtime-2` scored 10/10 on tool calls with a prompt and 7/10 without. Interruptions feel the most natural of the options here, though background noise and speakerphone echo can still cut a reply short.

Pricing: $32 per 1M audio input tokens ($0.40 cached), $64 per 1M audio output tokens. About $0.50 to $1.00 per 5-minute session.

`grok-voice-latest` (xAI), currently Grok Voice 3.0

Tool calling is solid. Choose Grok when you want simple, predictable per-minute billing. Trade-off: interruptions rely on xAI's own detection and can feel less smooth than OpenAI, with brief overlap when someone breaks in. For pastoral conversations with frequent emotional interruptions, test it in a realistic setting first.

Pricing: Flat $0.08 per minute. About $0.40 per 5-minute session.

`gpt-realtime-mini` (OpenAI), not recommended

Failed about 60% of tool calls in testing (4/10 with or without a prompt), including wrong tools and wrong answers, not just refusals. OpenAI shuts this model down on January 20, 2027. Its replacement, `gpt-realtime-2.1-mini`, has not been tested with the block yet.

### Official model references

- OpenAI realtime models and pricing: [https://developers.openai.com/api/docs/models](https://developers.openai.com/api/docs/models)
- OpenAI deprecation schedule: [https://developers.openai.com/api/docs/deprecations](https://developers.openai.com/api/docs/deprecations)
- xAI (Grok) voice models: [https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech)

## Security

The block never hands the configured API key to the mobile client. On every session start the server mints a short-lived ephemeral token (5 minute TTL) against the provider's `/realtime/client_secrets` endpoint and returns only that token to the device. The block also requires an authenticated person.

## MCP tools

The voice agent can be extended with MCP (Model Context Protocol) servers so the assistant can call tools and read context from Rock or from external systems.

- Rock MCP binds the session to a Rock-hosted MCP agent (configured under AI Agents in Rock). The block automatically provisions a per-person MCP API key on first use and embeds it in the MCP URL so the agent can authenticate REST calls back to Rock as the current person. The key is reused on subsequent sessions.
- External MCP lets you attach any number of third-party MCP server URLs that should also be available to the agent during the session.

Both lists are merged and passed to the realtime session as the available tool set. You tailor what the agent can actually do by choosing which skills and tools the connected AI Agent exposes. Add the capabilities you want people to reach by voice, leave off the ones you don't, and the conversation is shaped accordingly. For how to build and configure these agents, see the Rock AI Agents manual: [https://community.rockrms.com/developer/ai-agents](https://community.rockrms.com/developer/ai-agents)

### How the MCP API key is scoped per person

Each person who uses the Voice Agent has their own MCP API key. The first time someone opens the block, Rock creates a unique key for them and stores it on their account. Every session they have from then on reuses that same key.

The key is embedded in the MCP server URL the voice agent uses to call back into Rock. So when the agent runs a tool on someone's behalf, the request carries that person's key, and Rock uses it to identify exactly which person is on the other end. Permissions, data access, and any tool that depends on knowing who the person is all resolve to that person automatically. Because every person has a different key, two people using the same voice agent stay fully isolated: their sessions never share state, and one person's voice agent can never see another person's data.

## Personal settings

In addition to the admin-controlled block settings above, the block exposes an in-app Settings cover sheet (gear icon in the bottom-left of the block) that lets each person choose:

- Voice. The synthesized voice used for the assistant's responses. OpenAI offers Alloy, Ash, Ballad, Coral, Echo, Sage, Shimmer, Verse, Marin, and Cedar. xAI offers Eve, Ara, Rex, Sal, and Leo. A preview button plays a short sample phrase using the current person's nickname.
- Speed. Playback speed for the assistant's voice: Slow, Medium (normal speed), or Fast. Shown only when the block uses OpenAI.
- Push to Talk. When on, the microphone is muted by default and the center button becomes a press-and-hold button. When off (hands-free), the mic stays open whenever it has not been explicitly muted.
- Subtitles. Toggles the on-screen transcript bubbles.

Each of these is saved as a per-person block preference and restored the next time the block loads, so each person keeps their own preferred voice and interaction style.

## Microphone permission

The block requests microphone permission via the platform permission helper on load. If the person denies the request, the block does not start a session and surfaces nothing further; the rest of the page renders normally. Microphone permissions can then be enabled within the OS settings. The display is kept awake for the duration of the session and released on unload.

## Notes

- Requires an authenticated person. The block will not start a session for an anonymous visitor.
- Echo and background noise. The block works around speakerphone echo and background noise as well as it can, but neither is fully solved. A cough, a nearby conversation, or the assistant's own voice on speaker can still cut a reply short. Headphones or a quiet room give the best results.

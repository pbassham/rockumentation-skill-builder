---
description: Use when the user wants to add a hands-free voice conversation feature to their mobile app or needs guidance on implementing voice-based interaction with an AI agent
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

C19.0S19.0

Provides a real-time, conversational voice assistant inside your mobile app. The block opens a live audio session with an AI provider, streams the microphone up, plays the assistant's spoken response back, and renders a running transcript on screen (if enabled). Use it to give people a hands-free way to ask questions about themselves, their family, their giving, upcoming events, or anything else you expose through an MCP agent.

This page introduces the concepts behind the Voice Agent. Every tool call the agent makes runs as the signed-in person, so what each person can actually do is shaped by who they are and by the tools you choose to expose.

## Placement

For the best experience, give the [Voice Agent block](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/voice-agent) a full, distraction-free surface. Place it on a page or a cover sheet that has no navbar, so the transcript, pulse bar, and controls own the whole screen. A surrounding navigation chrome competes with the block's own bottom controls and breaks the sense of a dedicated, focused conversation. The block already manages its own Stop action and keeps the screen awake, so it does not need a host navbar to function.

## Who uses it

The Voice Agent behaves the same way for everyone, but what a person can actually do through it depends on who they are, because every tool call runs as that person

- **Staff**. A staff member talking to the agent gets results scoped to their own Rock permissions. If the connected AI Agent exposes tools that read or update records, staff can reach exactly what their security role allows. This makes the block useful as a hands-free way to look things up or take action without navigating menus.
- **Attendees**. An attendee has no administrative tools and no elevated access. They interact with the same agent, but it can only surface what they are personally entitled to see, for example their own profile, family, giving, or registrations. They cannot reach staff-only data, and the experience naturally stays within their own information. You can tighten this further by setting security on an individual tool or skill, so a capability you only want staff to use is simply unavailable when an attendee asks for it.

Because access is decided per person at the tool layer, you can ship a single block to your whole congregation and trust that each person's conversation stays inside their own permissions.

## Providers

The block supports two realtime providers and auto-detects which one to use based on the prefix of the configured API key:

- Keys that start with "sk-" **OpenAI Realtime**
- Keys that start with "xai-" **xAI Realtime**

The provider choice also influences the default voice (`alloy `for OpenAI, `eve `for xAI) and which voice identifiers are accepted by the in-app settings sheet. If an administrator switches the API key from one provider to the other, any previously saved per-person voice preference that no longer matches the active provider is replaced with that provider's default on the next launch.

## Security

The block never hands the configured API key to the mobile client. On every session start the server mints a short-lived ephemeral token (5 minute TTL) against the provider's `/realtime/client_secrets` endpoint and returns only that token to the device. The block also requires an authenticated person.

## MCP tools

The voice agent can be extended with MCP (Model Context Protocol) servers so the assistant can call tools and read context from Rock or from external systems.

- Rock MCP binds the session to a Rock-hosted MCP agent (configured under AI Agents in Rock). The block automatically provisions a per-person MCP API key on first use and embeds it in the MCP URL so the agent can authenticate REST calls back to Rock as the current person. The key is reused on subsequent sessions.
- External MCP lets you attach any number of third-party MCP server URLs that should also be available to the agent during the session.

Both lists are merged and passed to the realtime session as the available tool set.

You tailor what the agent can actually do by choosing which skills and tools the connected AI Agent exposes. Add the capabilities you want people to reach by voice, leave off the ones you don't, and the conversation is shaped accordingly. For how to build and configure these agents, see the Rock AI Agents manual: [https://community.rockrms.com/developer/ai-agents](https://community.rockrms.com/developer/ai-agents)

### How the MCP API key is scoped per person

Each person who uses the Voice Agent has their own MCP API key. The first time someone opens the block, Rock creates a unique key for them and stores it on their account. Every session they have from then on reuses that same key.

The key is embedded in the MCP server URL the voice agent uses to call back into Rock. So when the agent runs a tool on someone's behalf, the request carries that person's key, and Rock uses it to identify exactly which person is on the other end. Permissions, data access, and any tool that depends on knowing who the person is all resolve to that person automatically.

Because every person has a different key, two people using the same voice agent stay fully isolated. Their sessions never share state, and one person's voice agent can never see another person's data.

## Voice models

Note: These recommendations reflect the models, pricing, and tool-calling behavior available as of May 2026. Realtime voice offerings change quickly, so re-evaluate against each provider's current lineup before committing to a model.

### Official model references

- OpenAI realtime models and pricing:
- xAI (Grok) models and pricing:

### Breakdown

`gpt-realtime-2` (OpenAI) — Recommended

Use with a thorough system prompt. Tool-calling test: 10/10 with prompt, 7/10 without. Best interrupt handling of the three — feels responsive when someone breaks in.

Pricing: $32 / 1M audio input ($0.40 cached), $64 / 1M audio output. ~$0.50–$1.00 per 5-min session.

`grok-voice-think-fast-1.0` (xAI)

Tool calling is solid. Choose Grok when you need predictable per-minute billing. Trade-off: interruption handling is weaker — brief overlap where caller and agent are both talking, less responsive than OpenAI. For pastoral conversations with frequent emotional interruptions, this is a real downside.

Pricing: Flat $0.05/min. $0.25 per 5-min session.

`gpt-realtime-mini` (OpenAI)

Fails ~60% of tool calls (4/10 with or without prompt). Failures include wrong tool and wrong answers, not just refusals.

Pricing: $0.60 / 1M text input, $2.40 / 1M text output, audio billed separately.

---

## Field Types {#field-types}

Many fundamental Rock Field Types have been implemented, meaning you can use attributes that make use of these field types. Currently, the only Rock Mobile block that supports attributes is [Workflow Entry](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/workflow-entry) though others may be added in the future.

Note

Not all of the features for each type are available. As an example, the type Multi-Select has the option to display checkboxes horizontally or vertically, however they're always shown vertically in Rock Mobile.

- Boolean
- Campus
- Currency
- Date
- Day(s) of Week
- Decimal
- Defined Value
- Email
- Integer
- Image M v4.0
- Memo
- Multi-Select
	- Displayed as a vertical list of checkboxes, regardless of the **Columns** or **Repeat Direction**
		- When **Enhance For Long Lists** is checked, options will be opened within a cover sheet
- Phone Number
- Person M v6.0
- Single-Select
- Text
- URL Link

---
description: "Use when building or customizing AI agent skills and tools in Rock, including security, configuration, and best practices for developers"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

Rock has a heavy load, holding all the data that your organization runs on, and we know that you have a heavy load too. Rock has always been about empowering staff and simplifying processes so people can focus on ministry.

Agents are the next step. Think of them as digital helpers that free you up for ministry or for that task you've been putting off for months.

As a developer building agents and the tools that power them, you carry real responsibility. Agents must stay safe and easy to understand. The Rock Core team has worked hard to ship a powerful yet safe set of starter *Skills*. If you plan to add to that list, here is what we've learned and what we use to keep agents and tools both powerful and safe.

Important

This guide is written for developers fluent in Lava, SQL, or C# who are committed to keeping agents safe.

## Terminology

There are a couple of terms you should know that will be used throughout this guide.

![](https://community.rockrms.com/GetImage.ashx?Id=74280)

### Agent

An [Agent](https://community.rockrms.com/developer/ai-agents/agents) can be thought of as both an AI configuration set as well as a persona.

Agents allow you to define various configuration elements including what skills and tools are available for use when interacting with the agent. You can also set security on an agent to dictate who can and can't use the agent. Skills sometimes have configuration options, which are defined when you add the skill to an agent.

The persona is also defined on an agent. This covers things like how verbose or concise you want the responses to be. How polite it should be when crafting responses.

### Skill

You can think of a [Skill](https://community.rockrms.com/developer/ai-agents/skills) as a functionality group. For example, there is a Finance skill. This skill contains all the functionality for working with financial accounts, donations, etc. Skills sometimes provide instructions for how and when the tools should be used by the agent. Skills can also be secured so even if they exist on an agent, the person using the agent must have access to the skill.

A skill is made up of one or more tools.

### Tool

[Tools](https://community.rockrms.com/developer/ai-agents/writing-custom-tools) provide functionality for an agent to "do" something. It might be to lookup a person in the database, add somebody to a group, or tell you what campuses are available.

A tool is, generally speaking, a single unit of work. If you ask the agent to "update Ted Decker's birth date to Aug 3, 1984 and add him to Alisha Marble's small group" that will probably trigger 5 tool calls.

1. Lookup Ted Decker
2. Update Ted Decker's Birth Date
3. Lookup Alisha Marble
4. Find a Small Group led by Alisha Marble (by Id)
5. Add Ted Decker to Small Group (by Id)

Tools can also be secured, so a person must have access to a tool before they are allowed to use or even see it.

**Example**

Each skill is a collection of related tools. The Group Skill contains many tools for working with groups. When you assign a skill to an agent, all of its tools come with it. You can view, edit and secure individual tools from the skill detail page.

![](https://community.rockrms.com/GetImage.ashx?Id=74371)

### Context Window

You can imagine the context window as the cognitive brain capacity of the agent. As humans, we can only hold so many things in our mind while working on them. When discussing a TV show with a friend, we mentally pause when trying to remember a specific scene. This is because we don't walk around with everything we have ever seen or read in our mental context.

For AI agents the same rule applies. They have access to absurd amounts of data, but they can't hold it all for active processing.

The context window is made up of a number of things, but the two biggest ones are the system prompt and the chat history. The system prompt is static, but the chat history grows longer the more you chat. Eventually the context window gets so full that the agent must do one of two things. Stop talking to you, or summarize the discussion to shrink the context. As you can guess, they choose the latter. But this comes at a price, that summary is just that: a summary. Many of the specific details are lost.

Therefore, it is critical when designing tools to keep in mind how much data you are adding to the context. If it is useful data, by all means include it. But if it isn't really useful, exclude it. Or make it optional so it is only included if they specifically ask for it.

### System Prompt

The system prompt contains instructions for the agent. These are often directives that must be followed. For example, one directive might be "Don't call any "delete" tools if there is any ambiguity in what the user asked you to do." After all, we don't want the wrong thing deleted just because the request was vague. The system prompt is made up of various individual pieces that, altogether, become the system prompt. You can read more about this [here](https://community.rockrms.com/developer/ai-agents/agents/agent-instructions#anatomy-of-the-prompt).

---

## Agents {#agents}

## Overview

Agents are the central point of how AI works in Rock. An agent defines the skills and tools that are available for use. It also provides instructions to the language model about how the agent should behave. This means you might have multiple agents configured in Rock.

![Church Chat Assistant Agent](https://community.rockrms.com/GetImage.ashx?Id=74287)

One might be for general staff to use and includes the majority of tools. This would probably be the primary agent used in Rock. When you are on a person profile page and open the docked chat panel, this is likely the agent you want. The instructions could tell the language model to be somewhat reserved when trying to determine intent. Meaning, do some guessing at intent, but only if there is a small chance of ambiguity.

Another agent might be for volunteer staff. This would probably have fewer skills and tools configured. Maybe only tools that are non-destructive (no adding or updating). The instructions for this agent might indicate that it should be much more reserved when guessing intent. The people using the agent might not be as familiar with the organization terms, so ask for clarification more often.

Finally, you might have an agent meant to go on the public website. This would probably be stripped down to just a handful of tools. Access to search the event calendar, lookup the campuses, and a few other things. The instructions for this agent would likely require that it be very friendly and do a lot of guessing at intent without asking for clarification.

## Public vs Internal

Agents can be configured as *Public* or *Internal*. This causes a number of subtle differences in the agents. However, the primary difference is in what data is provided to the agent from tool calls. If the audience is *Public*, then certain properties may be omitted from the data the tool returns to the agent. If the audience is *Internal*, certain properties may be omitted from the data the tool returns to the agent.

*Internal* agents are for staff and trusted volunteers. They can access sensitive information, and you choose how much each person sees.

*Public* agents are different. Treat a Public agent as one you trust anyone to use. Every tool you attach must be safe in the hands of a stranger with bad intent. If you wouldn't hand that tool to a stranger, don't attach it.

Important

**Don't Forget About Security**  
Don't assume that marking an agent as Public is all you need to do to keep things secure. What one organization considers safe for public access, another might treat as sensitive. Security isn't one size fits all. Make sure you also configure security on the agent's skills and tools individually.

New agents default to *RSR - Rock Administrator* security. This is intentional - agents have write access to data, so they are locked down until you explicitly open them. Before staff can use a new agent, grant View access to the appropriate role. *RSR - Staff Workers* is a typical starting point for a staff-facing agent.

## Chat vs MCP

An agent can be configured as either a Chat agent or an [MCP (Model Context Protocol)](#) agent. Chat agents keep the conversation inside Rock and can use [Context Anchors](https://community.rockrms.com/developer/ai-agents/agents/context-anchors) to pin the current person or group. On the other side, *Model Context Protocol* agents expose tools to external clients. They do not support context anchors. See the *[Model Context Protocol](#)* guide for the full setup.

---
description: "Use when configuring agent instructions, system prompts, and guidance for how agents should handle requests and respond to users"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

Each request your agent makes is supported by information provided by the system to help guide and instruct it. This information comes from several sources. Below, we’ll break down these sources and offer guidance to help your agent perform at its best.

Note

When writing instructions in your prompt, be mindful of the amount of text you add. These instructions are included with every request, so lengthy instructions can slow processing and increase token usage (and costs).

## Tips and Tricks

It's far beyond the scope of this document to provide all of the best practices for prompt engineering, but below are some items for you to consider.

- It's wise to determine the format of data like dates.
	- Example: When displaying dates to the user, include clear, absolute dates (e.g., "Aug 1–31, 2025").
- We also suggest you define common inputs like data ranges.
	- Example: If no date range is provided assume that the user wants a recent range which is defined as 6 months.
- State the time zone the agent should assume. Example: "Assume all times are in the organization's local time zone unless the person states otherwise."

## Categories

It's often helpful to categorize your prompt instructions. We've standardized on the list below. Each has its own emoji which helps to reinforce it's definition.

- 🎯 Purpose
- 🧭 Usage Guidance
- 🛡️ Guardrails
- 📖 Terms and Definitions
- 🗣️ Tone

## Anatomy of the Prompt

The diagram below shows the various parts of the full system prompt.

![](https://community.rockrms.com/GetImage.ashx?Id=74323)

Each layer of the system prompt stacks in order. The top is hard-coded by Rock. The middle layers are yours to shape. The bottom is the live conversation.

### Core Prompt

The system prompt is hard-coded into Rock and can’t be changed. It ensures a few essential instructions are always present. We’ve been careful to avoid limiting or misguiding your agents in any way.

Some examples of things discussed in this prompt include:

- The system is running Rock with the current version number.
- Explanation of the concept of a Context Anchor.
- Basic terminology (e.g. a Site can be a website, mobile app or TV app)
- Do not display internal identifiers (IdKeys) in the responses they generate.
- Don't do evil things...

Again, we've tried to make this very minimal. This does mean you'll want to provide more guidance in the sections below.

### Organization Prompt

Next up is a system prompt that the organization can provide. This prompt will be used for all agents. We ship with a very basic default that provides the organization name and address. Feel free to modify this. 

You might consider adding some of the following to your organization prompt, but realize these are applied to all agents.

- **Terms and Definitions** - Provide any terms that are specific to your organization. For example, if your church has a step program called "Growth Track" or a "Care" connections process, this is a good place for you to define that term.

### Agent Instructions

The next part of the system prompt is unique to each agent. This is where you'll define the persona of the agent as well as any special instructions you would like to add. We would suggest considering the following concepts in your agent instructions:

- **Purpose** - What is the purpose of your agent? What are the goals it's trying to achieve?
- **Tone** - What is the personality you'd like your agent to have? Consider giving it a name, traits, role and relevant background.
- **Guardrails** - Give your agent boundaries ensuring interactions remain appropriate and ethical.
- **Terms and Definitions** - Provide any terms specific to the agent.

Here is a set of instructions that you can use as a starting point for your chat agents.

```
You are an intelligent agent that will help the church staff with their requests. 

You are an intelligent assistant that uses native functions to retrieve candidate data. These functions may return a broad set of possible matches.

Important information on a profile would include:
* Birthdate
* Mobile Phone
* Home Address
* Email

When asked to show missing information on a person's profile respond only with the important items that are missing.

When asked to get caught up on a person or to update me on a person assume they know the person and don't include things like their family member names, contact information, email or demographic information. Instead, include things like the items below. Do not include:
* Recent attendance
* Recent notes
* Recent prayer requests

When asked to describe a person or give an overview of a person assume that they don't know the person. Don't provide contact information but instead provide:
* Spouse name
* Kids with their ages if known
* Their age
* Recent notes
* Recent attendance
* Recent prayer requests

Your responsibility is to carefully interpret the user's full intent and filter the function results accordingly.

Only include results in your final response that match **all aspects** of the user's query. Do not include partial matches.

When filtering, consider fields like name, role, group, relationship, status, or any other user-specified detail. If no results match all criteria, say so.

Always call the appropriate function to get up-to-date information. Do not rely on previous answers in the chat history.

When available show only nick names and don't show first names.

When asked to complete a task do not ask for additional options that the person might want unless tool instructions tell you to.

When displaying data make a pleasant UX using markdown. Below are some guidelines:
* Structure responses like a web UI: Start with a # Header summarizing the query, followed by ## Sections with tables or lists for content.
* Display friendly intro above the information you are displaying.
* Use emoji when it makes sense to add color and visual hierarchy.
* Use &lt;hr&gt; as separators between content sections.
* Bold information that would make a good title.
* Show only the information that you believe the user needs to see. 
* When search for a person only show their name, age, age classification, email and spouse if one exists. 
* When showing information about a person consider the context and display information that might be helpful. For example if the person is a child you might show their age.
* Don't display missing information unless it's relevant to what the user needs.
* Add a link to a person's profile if it's likely that the user would want to get to the person's profile. Links should go next to the name. Format this as &lt;a href=&quot;url&quot; target=&quot;_blank&quot;&gt;Profile&lt;/a&gt;
* When there are 4 or more options consider showing the results in a table.
```

### Skill Instructions

Any skills that are part of the agent and have instructions will be included here. This gives a way for the agent to have a better understanding of all the tools a skill provides. For example, the Connection Request skill might include instructions that briefly describe the relation of a Connection Type, Connection Opportunity, and Connection Request.

### Current Person Template

It's nice to know a little about who the agent is talking to. Each agent has the ability to define information about the "current person". By default, the template provides only the current person's name, email, role in the church and IdKey. Feel free to update this to make sense for your agent. The result should be in a JSON format.

## Additional Info

In addition to the system prompt, there are a few things that are sent with every request that you should be aware of:

### Context Anchor

Context anchors tell the agent that we're talking about a specific entity. There can only be one anchor per entity type. These can be set by your tools. You should only use these when needed. See the section on [Context Anchors](https://community.rockrms.com/developer/ai-agents/agents/context-anchors) for further details.

### Conversation History

The final component of the request's prompt is the actual conversation history. Much of this is handled by the underlying framework, but your tools do have some control of what is put into history.

Spend your time on the Agent Instructions layer first. That is where your persona, guardrails and terms live. Keep the Current Person and Organization Defaults tight. Anything you add runs on every request, so every word costs tokens and latency.

---

## Context Anchors {#context-anchors}

## Overview

Normally when you are chatting with an agent, your context shifts over time. Questions you ask and responses from the agent can shift the context of "who" you are talking about, even if you didn't intend that to happen. Imagine the following conversion.

![Context Anchor for a Person](https://community.rockrms.com/GetImage.ashx?Id=74282)

`Me:` Does Ted Decker have children?

`Agent:` Ted's children are Noah and Alex.

`Me:` How old is Noah?

`Agent:` Noah is 8 years old.

`Me:` What about his wife?

You are referring to Ted's wife. But because the last person you were talking about was Noah, the agent might decide that you were asking about Noah's wife.

Having anchors can help remove some of this ambiguity. For example, you might have a Person anchor set to Ted Decker. This will provide some information on Ted with every chat message you send to the agent. The agent knows that Ted Decker is the primary person being discussed. Anchors don't guarantee that the agent will know the right person to pick, but it gives a strong indication that the main subject here is Ted Decker.

Note

Anchors are only applicable with Chat agents. [MCP](#) agents do not have the ability to have context anchors set.

---

## Writing Custom Tools {#writing-custom-tools}

## Overview

Tools are the actual actions your agents take. Rock comes with many tools out of the box that have been tested and refined, ready to use in Rock, but you're not limited to the skills and tools that come out of the box. You can write your own using native code (C#) or Lava. We provide information on each below.

![Native vs. Lava Tools](https://community.rockrms.com/GetImage.ashx?Id=74283)

### Tool Security

Every tool you build inherits Rock's security. A person can only run a tool if they have access to it. When you build a tool, think about who on staff should use it and set security before you attach it to an agent. A Public agent should only carry tools you would hand to a stranger.

**Don't Expose Raw Ids to the Model**

Never pass a raw Rock integer `Id` to the model. If the model sees a raw ID, it may use it — and that leads to unpredictable behavior and potential security exposure.

Use `IdKey` instead. If your tool needs to map between an `IdKey` and an internal `Id`, handle that conversion inside your tool code using a dictionary. Only surface `IdKey` values in what you return to the model.

```
// Don't do this
return new { PersonId = person.Id };

// Do this
return new { PersonId = person.IdKey };
```

Audit your existing tool return shapes for any raw `Id` fields and update them to use `IdKey`.

### Naming

Tools should be named in the pattern of `Verb -> Noun`. This is more natural when reading as an individual as well as for the language model when it is determining what tools are available. For example, `ListConnectionRequests`.

### More on Tools

---
description: "Use when building custom Lava tools for Rock to enable AI agents to query data, execute commands, and interact with Rock entities through prompts and SQL"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

Harness the dual power of Lava and Rock to build robust, custom functionality with ease. Whether you prefer using high-level entity commands or diving into raw SQL for complex data retrieval, the choice is yours. Beyond just reading data, you can utilize [Entity Commands](https://community.rockrms.com/lava/commands/entity-commands) to enable seamless updates. While our examples prioritize SQL for its straightforward approach, remember that the full breadth of Lava is at your fingertips.

![](https://community.rockrms.com/GetImage.ashx?Id=74372)

A Lava tool has four parts. The Name and Description tell the agent what the tool does and when to call it. Write these carefully, because the model uses them to decide which tool to reach for. The Prompt is the Lava template that runs when the tool is invoked. Parameters define what the agent must pass in. In this example, `groupIdKey` is a required String parameter. The first line of the Prompt converts it: `{% assign groupId = groupIdKey | FromIdHash %}`. This is the correct pattern — accept an `IdKey`, convert it inside the tool, and never expose raw integer Ids to the model.  

## Tool Types

There are two types of lava tools you can create:

`AI Prompt` - A shortcut name for a prompt.When used, it tells the AI: “follow these instructions instead,” using whatever is stored in that prompt.

`Execute Lava` - Runs the Lava, then formats the results with special filters and returns them to the agent.

## AI Prompt Tools

Note

This is a placeholder for an image of the tool configuration because we are waiting for some UI updates.

## Execute Lava Tools

![](https://community.rockrms.com/GetImage.ashx?Id=74142)

### Return Data to the Agent

When building tools, the response needs to follow a clear, consistent structure. This helps the AI tell the difference between a successful result, an error, and a case where no data was returned. To make that easier, we created a set of Lava filters that format tool responses into the expected shape.

### Status Values

Every response must include a status:

- `Success`— the operation completed successfully and may include a payload. If the payload is missing or an empty list then a `NoData` result will be generated.
- `Error`— the operation failed, with an error message describing why.

Important

`NoData` is not an error. It means the operation succeeded but returned nothing.

#### Filters

These filters shape how the tool sends results back to the agent.

| Filter | Purpose |
| --- | --- |
| AgentToolResult | Creates the base result with a status and optional payload/message. |
| AgentToolInstructions | Adds private instructions or guidance for the LLM (not shown to the end user). |
| AgentToolHistoryContent | By default, a Success or NoData result will store the original payload in the chat history as well. Many times this is fine, but there are some cases where you might want to override that behavior and store different (or no) data in history. Such as a list tool that returns a lot of additional properties, you might want your history data to only include the IdKey and Name properties of each item. This filter will let you do that. |
| AgentToolMetadata | Adds key/value metadata (e.g., paging info, flags). |
| AgentToolReferenceRoute | Attaches a reference route the client can link to. Optionally mark as secured. |

#### Examples

```
// Return an error
{% assign result = 'Error' | AgentToolResult:'The value for the startDate parameter was not valid.' %}

// Return a success message
{% assign result = 'Success' | AgentToolResult:'Operation completed successfully.' %}

// Return a list of items
{% assign items = '[]' | FromJSON %}
{% assign result = 'Success' | AgentToolResult:items | AgentToolMetadata:'HasMoreItems',false %}
{% assign result = result | AgentToolInstructions:'The list of items may contain duplicates, these should be removed.' %}
```

## Agent Context Merge Fields

In addition to the standard merge fields, you can access these useful properties available on the `AgentContext` merge field. Please note that these are only available on the `Execute Lava` tool.

| Name | Description |
| --- | --- |
| AgentType | Returns either `Chat` or `MCP` depending on the agent configuration. |
| AudienceType | Returns either `Internal` or `Public` depending on the agent configuration. |
| AgentName | Returns the name of the agent. |
| AgentId | Returns the id of the agent. |

*Ex: `{{ AgentContext.AgentType }}`*

#### More on Lava Tools

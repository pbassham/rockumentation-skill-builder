---
description: "Use when creating native Rock skills in C# by inheriting from AgentSkillComponent and registering tools with attributes"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

Native skills are written in compiled C# and give you the full power of Rock. A skill is a class that groups related tools together, provides shared instructions to the language model, and can be secured as a unit. This guide covers how to create the skill class and register its tools. For the individual tool patterns (Lookup, List, Get, AddOrUpdate, and so on), see the Native Tools section.

## Creating the Skill Class

Create a class that inherits from `AgentSkillComponent` in the `Rock.AI.Agent.Skills` namespace. By convention, skills are declared as `internal sealed partial class` and split across multiple files, with one file per tool. Decorate the class with a few attributes so Rock can discover and describe it. Dependencies such as `ILogger<T>` are injected through the constructor.

```
[Description( "This skill provides functionality to manage prayer." )]
[AgentSkillGuid( "0EF2BBFD-52D9-441B-9BE5-F4C5D2B42ED0" )]
[EntityTypeGuid( "6033D65E-C782-45BA-9A74-23F9B9353A27" )]
internal sealed partial class PrayerSkill : AgentSkillComponent
{
    private readonly ILogger _logger;

    public PrayerSkill( ILogger<PrayerSkill> logger )
    {
        _logger = logger ?? throw new ArgumentNullException( nameof( logger ) );
    }
}
```
- `[AgentSkillGuid]` - Required. This is the discovery marker. A class without it is never registered as a skill.
- `[EntityTypeGuid]` - Associates the skill with its entity type.
- `[Description]` - Administrator-facing description shown while configuring the skill. It is not sent to the language model.
- `[AgentSkillName]` - Optional. Overrides the skill name. If omitted, the name is derived from the class name.
- `[AgentPurpose]`, `[AgentUsage]`, `[AgentGuardrail]` - Optional class-level instructions that are sent to the language model. Each can be specified multiple times.

## Adding Tools

Each tool is a method on the skill class. Decorate every tool method with an `[AgentToolGuid]` (this is what registers the method as a tool) and a `[Description]`. Add any of the optional instruction attributes to guide the model. The method should return an `AgentToolResult`, which you build with the base-class `Success`, `Error`, and `NoData` helpers. Put a `[Description]` on each parameter, since parameter descriptions are sent to the model.

```
[Description( "Lists prayer requests that match the filters." )]
[AgentToolGuid( "99F1EDE0-F431-49BE-80F5-97032710143B" )]
[AgentUsage( "Most filters are optional. If none are provided, the most recent prayer requests are returned." )]
public AgentToolResult ListPrayerRequests(
    [Description( "Optional. The IdKey of the category to filter by." )]
    string categoryIdKey = null,
    int pageNumber = 1 )
{
    var helper = new AgentToolHelper( AgentRequestContext, _logger );

    // Build, filter, and return your results here.
    // See the Native Tools section for the full patterns.

    return NoData();
}
```

See the Native Tools section for the detailed patterns each kind of tool follows (Lookup, List, Get, AddOrUpdate, AvailableAttributes, Summary, Insights, and Delete), and the Agent Tool Helper article for the helper methods that handle validation, pagination, security, and saving.

## Registration

You do not need to wire anything up. At startup Rock reflects over every class that inherits from `AgentSkillComponent` and carries an `[AgentSkillGuid]`, registers the skill, and registers each method that carries an `[AgentToolGuid]` as a tool. From there an administrator can add the skill to an agent and secure it.

Note

Skills and tools that are removed from code are not automatically deleted from the database. If you remove a skill or tool, clean up the corresponding record separately.

If your skill needs per-agent options (a default category, a campus, a toggle, and so on), you can expose configuration that administrators set when they add the skill to an agent. See Skill Configuration for details.

---

## Skill Configuration {#skill-configuration}

## Overview

A native skill can expose configuration options that an administrator sets when they add the skill to an agent. The same skill can then behave differently on different agents. For most cases you declare configuration the same way you would on a block, using Rock field-type attributes, and the base class handles the editing UI for you. When you need a richer editing experience you can provide a custom Obsidian control.

## Declaring Configuration

Declare each option as a Rock field-type attribute on the skill class, following the same conventions used for blocks: declare them vertically, assign properties rather than using constructor arguments, and define the keys as constants in a nested `ConfigurationKey` class.

```
[BooleanField(
    "Require Approval",
    Description = "When enabled, new items created by this skill must be approved before they take effect.",
    DefaultBooleanValue = true,
    Key = ConfigurationKey.RequireApproval )]
[Description( "This skill provides functionality to manage prayer." )]
[AgentSkillGuid( "0EF2BBFD-52D9-441B-9BE5-F4C5D2B42ED0" )]
[EntityTypeGuid( "6033D65E-C782-45BA-9A74-23F9B9353A27" )]
internal sealed partial class PrayerSkill : AgentSkillComponent
{
    private static class ConfigurationKey
    {
        public const string RequireApproval = "requireApproval";
    }
}
```

With field-type attributes alone, the base `AgentSkillComponent` automatically renders the editing UI, converts values for storage, and persists them. You do not need to write any UI code for this common case. File, image, background-check, and structured-content field types are not supported for skill configuration.

## Reading Configuration Values

Inside a tool, read the values from the base-class `ConfigurationValues` property. This is a read-only dictionary of the values configured for the specific agent that the current request is running under.

```
var requireApproval = true;

if ( ConfigurationValues.TryGetValue( ConfigurationKey.RequireApproval, out var value ) )
{
    requireApproval = value.AsBoolean();
}
```

## Custom Configuration UI

When field-type attributes are not enough (for example, you need a picker populated from live data), override the configuration methods on `AgentSkillComponent` and point them at your own Obsidian control: `GetComponentDefinition` returns the control URL and its options, while `GetPublicConfiguration` and `GetPrivateConfiguration` translate values between the UI and storage. `ExecuteComponentRequest` handles any dynamic requests the control makes back to the server. The built-in `PrayerSkill` uses this approach to present a prayer-category picker.

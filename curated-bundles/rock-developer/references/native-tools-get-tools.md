---
description: Use when building a simple Get tool that loads an entity and returns formatted results for an AI agent
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

Unsurprisingly, this tool might be the most simple pattern you have to work with. We'll break it down into two steps:

1. Load entity
2. Return result

## Load Entity

Loading the entity is straight forward with the tool helper to handle all the error checking for you.

```
public IAgentToolResult GetGroup( string groupIdKey )
{
    var helper = new AgentToolHelper( AgentRequestContext, _logger );

    var group = helper.GetRequiredEntity<Group>( groupIdKey, checkSecurity: true );

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }
```

As you can see, there isn't much to it. Just get the entity from the helper and then check for errors. The helper will handle missing or invalid IdKey values, and handle checking security and reporting any errors.

## Return Result

```
return Success( GetFullGroupResult( group ) )
        .WithHistoryContent( new KeyNameResult
        {
            Id = group.Id,
            Name = group.Name,
        } );
}
```

Simple huh? Magically, all the data is populated into a result object. Okay, not quite. Because your Add or Update and Get tools both return the same data, we move that logic into it's own method so it can be re-used. We'll take a look at that below. But first we want to call out the history content. Your Get method should not store the full result object in chat history. Instead just store the reference. If the language model needs the full data again later, it can call your Get tool again.

## Get Full Result

As we mentioned, you will want to create a `GetFull...Result()` method that converts your entity into a result object. This method will then be used by your various tools when they need to return a full object. Obviously our example does not really return the full group result. There are many more properties you would want to include, but this should give you an idea on the pattern.

```
private GroupResult GetFullGroupResult( Group group )
{
    var result = new GroupResult
    {
        Id = group.Id,
        Name = group.Name,
        GroupType = new KeyNameResult( group.GroupType.Id, group.GroupType.Name ),
        IsActive = group.IsActive ?? false,
        GroupAdministrator = PersonResult.NameOnly( group.GroupAdministratorPersonAlias ),
        AttributeValues = group.GetAttributeValueResults( AgentRequestContext ).ToList(),
    };

    result.Sanitize( AgentRequestContext );

    return result;
}
```

At a high level, all we are doing is mapping over the properties we want. We use the extension method `GetAttributeValueResults()` (which is defined in the Rock.AI.Agent namespace) to get the attribute values in the proper format. Finally, we call the `Sanitize()` method to allow the result to do any security checks and clear out any values that are not valid for the request.

Important

Don't just include all properties that exist on the entity. Give thought to if it makes sense. For example, a group has an `IsSecurityRole` property. But that probably doesn't make sense to include in this case. However, `GroupCapacity` probably would make sense.

Note

For simplicity, we didn't use any cache calls for things like GroupType. In reality, you should use cache whenever possible to reduce the risk of lazy loading additional entities from the database.

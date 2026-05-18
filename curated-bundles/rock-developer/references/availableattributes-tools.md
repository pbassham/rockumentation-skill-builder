---
description: Use when discovering which data fields are available for an entity and their expected data types
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

Tools to get the available attributes can be broken down into 2 basic parts.

1. Loading or initializing the entity.
2. Retrieving the attributes.

Note

When we are talking about available attributes in this tool, we are talking about the attribute definitions. Not the actual values. In other words, the data required for the language model to construct a value for the attribute. Such as the Key and expected data type (string, number, campus lookup, etc).

## Loading the Entity

Loading the entity is generally straight forward, but there is one important considering you need to keep in mind. The language model might be calling this tool to get available attributes for an Add operation. In which case, there would be no existing entity. So just like when dealing with attributes in C#, you need to construct an in-memory instance and set the required properties so that qualified attributes will be matched.

```
public IAgentToolResult GetCampusAvailableAttributes(
    string campusIdKey = null,
    string campusStatusIdKey = null )
{
    var helper = new AgentToolHelper( AgentRequestContext, _logger );
    Campus campus;
```

Lets start by looking at the simple definition of our tool. We have a `campusIdKey` and `campusStatusIdKey` that we can use to figure out what attributes should be returned. Do note that campus actually has more qualified properties that we would want to include, but we are going to keep it simple for now.

```
if ( campusIdKey.IsNotNullOrWhiteSpace() )
    {
        campus = helper.GetRequiredEntity<Campus>( campusIdKey );

        if ( campus == null )
        {
            return helper.ErrorResult;
        }
    }
```

Next we handle the case of getting available attributes for a specific entity. Taken by itself, this code should make sense without too much explanation. We are checking if they gave us a specific campus, and if so we load it and return the available attributes.

```
else
    {
        var status = helper.GetRequiredEntity<DefinedValue>( campusStatusIdKey );

        if ( status == null )
        {
            return helper.ErrorResult
                .WithInstructions( "Call the LookupCampusStatuses tool to determine available statuses" );
        }

        campus = new Campus
        {
            CampusStatusValueId = status.Id,
        };
    }
```

Next we have the case of checking attributes for an add operation. In this case, we are saying that the status is required. Even though the actual `CampusStatusValueId` is optional, it is considered a data error for it to be null so we are treating it as required. If it was truly optional, you could simplify this code further as you wouldn't need to error out.

Depending on your use case, you may not have the `WithInstructions()` call. It just depends on how the language model is expected to know how to get that value.

## Retrieving Attributes

Whether we are getting attributes for a new item or for an existing item, once we have the entity the pattern is the same. We load the attributes using our read-only context and then we return a success message with those attributes. The helper has a method built to get all those attributes for you.

```
campus.LoadAttributes( AgentRequestContext.RockContext );

    return Success( helper.GetAvailableAttributes( campus ) );
}
```

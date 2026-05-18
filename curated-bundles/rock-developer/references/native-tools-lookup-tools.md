---
description: Use when implementing lookup tools that retrieve and format cached data without parameters for AI natural language processing
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

Lookup tools usually take no parameters and are straightforward to implement. There are basically three steps.

1. Load data
2. Format data
3. Return data

Typically, steps one and two will be the same since you can often do both in a single query or cache request. For clarity, we will list them separately.

## Load Data

Whenever possible, use cache objects if they are available. Let's take a look at a lookup for connection types.

```
public IAgentToolResult LookupConnectionTypes()
{
    var currentPerson = AgentRequestContext.RockRequestContext.CurrentPerson;

    var connectionTypes = ConnectionTypeCache.All( AgentRequestContext.RockContext )
        .Where( ct => ct.IsActive
            && ct.IsAuthorized( Authorization.VIEW, currentPerson ) )
        .ToList();
```

As you can see, loading the data is usually pretty simple. We don't have any parameters to worry about so we are just loading all items and then checking security (if applicable).

## Format Data

Next we need to format the data into our custom result objects. We don't want to return everything, just enough information for the language model to pick the right one when given a natural language request.

```
var connectionTypeResults = connectionTypes
        .Select( ct => new ConnectionTypeResult
        {
            Id = ct.Id,
            Name = ct.Name,
            Description = ct.Description,
        } )
        .ToList();
```

In our example here, we are including description. But that might not always be helpful. With connection types, the descriptions tend to provide more information that would be relevant to the language model. Other entities, the description might be more public information details and not relevant. We are also including it here just for the example of how to format the history data next.

```
var connectionTypeHistory = connectionTypeResults
        .Select( ct => new ConnectionTypeResult
        {
            Id = ct.Id,
            Name = ct.Name,
        } )
        .ToList();
```

If your main result object already matches what you want the history to be, you can skip this. Remember, the success content is by default also the history content. In this case, we only want to return the IdKey and Name, so we are creating an additional history content value.

## Return Data

So now that we have our data collected, the final - and simplest - step is to just create the tool result.

```
return Success( connectionTypeResults )
        .WithHistoryContent( connectionTypeHistory );
}
```

---
description: Use when you need to understand how to build lookup tools that translate data into agent-readable formats for quick reference retrieval
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

`Lookup`*Tools* help Rock AI agents find the exact information they need and return it in a format the agent can use. There are basically three steps to a `Lookup`.

1. Load data
2. Format data
3. Return data

## Load Data

```
{% sql return:'results' %}
    SELECT
        DISTINCT [Id], [Name]
    FROM
        [GroupType]
{% endsql %}
```

As you can see, this is quite simple. We just run a simple select statement to retrieve the data we want. In this case, our lookup is meant to just allow the translation of a *Group Type's* name to the `IdKey` value. So all we need to load is the `Id` and `Name`. There is nothing wrong with including more data, but you should only do so if it is required by all other tools. Remember, you can always add a Get tool to get more details about an item.

Since lookup tools do not have any arguments for filtering, we have no need of a where clause.

## Format Data

```
{% assign items = null %}

{% for row in results %}
    {% assign idKey = row.Id | ToIdHash %}
    {% assign item = row | AsDictionary %}
    {% assign item = item | AddToDictionary:'IdKey',idKey | RemoveFromDictionary:'Id' %}

    {% assign items = items | AddToArray:item %} 
{% endfor %}
```

Sometimes you might be able to return the SQL results directly. But remember that you shouldn't include integer Id numbers, so most of the time you will want to follow this pattern to at least translate the `Id` number to an `IdKey`. What we are doing with each row is fairly simple.

1. First we convert the row's `Id` value to an `IdHash` (this returns the `IdKey` value).
2. Next we convert the entire SQL row to a dictionary object.
3. Then we add the `IdKey` value to the dictionary and at the same time remove the `Id` value.
4. Finally we add the dictionary item to our list of formatted items.

## Return Data

```
{% assign result = 'Success' | AgentToolResult:items %}
```

The last thing to be done is return our formatted items to the agent for processing. If by chance there were no items, this will automatically return a `NoData` response so the agent will understand that we were successful, but found no results.

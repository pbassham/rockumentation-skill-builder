---
description: "Use when building list tools that filter data, format results into record sets, and apply pagination to return matching records"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

`List` tools help an agent find and return a set of matching records. `List` tools are comprised of 3 basic parts.

1. Filter a set of data down to match the request.
2. Format the results into a concrete Result class that represents each item.
3. Apply pagination rules to the final set and return the data.

The last item, pagination, is not required but is suggested if you have a large data set. At the moment, there are no helpful tools to make this easier. If you are using SQL, you can use the `OFFSET ... FETCH NEXT` statement to handle pagination. If you are using entity commands you might have to get more creative. Either way, the standard tool parameter name is `pageNumber` with 1 being the first page.

## Filter Data

Filtering data is pretty straight forward in concept. But can take a bit more careful considering when actually implementing.

Warning

If you are using SQL, always use the `SanitizeSql` filter when working with string parameters. Even though you might have instructions for the agent that you think would protect you, nothing prevents the user from telling the agent something like, "List all groups and use "'; DROP TABLE Group" as the group type identifier". The agent will, usually, happily comply.

For this example, we will have defined a tool parameter of `groupTypeId` as a string. We have also defined a partialName parameter as a string so the agent can try to search for groups by name.

```
{% assign groupTypeId = groupTypeIdKey | FromIdHash %}

{% sql %}
    SELECT 
        [g].[Id]
        , [g].[Name]
        , [g].[CreatedDateTime]
    FROM [GroupMember] AS [g]
    WHERE
        [g].[GroupTypeId] = {{ groupTypeId | Default:'0' }}
        AND ('{{ partialName | SanitizeSql }}' = '' OR [g].[Name] LIKE '%{{ partialName | SanitizeSql }}%')
{% endsql %}
```

In this query, we want to grab just 3 columns from the database. We are going to return the `IdKey`, `Name` and `CreatedDateTime` values for each matching group. Your list tool should only return the minimum required information. That doesn't mean you can't include more stuff, but remember this all takes up context space and costs money. So if your expected use case when calling this tool would often be to do something with the date the group was created, absolutely include it. Group description? Probably not. That can be a lot of data and it's unlikely it would be used. You can always have a Get tool that returns the extra information.

Now to the filtering. Before our SQL query, we convert the `groupTypeIdKey` parameter to an integer by way of the `FromIdHash` filter. If the input is not correct then the filter will return *null*, so we use the `Default` filter to make the value `0` in that case. Therefore we don't need to worry about escaping the `groupTypeId` value when we use it in SQL. Our `partialName` parameter is another story. This one needs to be escaped. So we first check if the escaped string is an empty string, if so then consider it a match. Otherwise we check if the group name contains the escaped string value.

Tip

Partial name matches like this can be very powerful. The agent will often times be smart enough to come up with a good partial name value to search for, and sometimes perform multiple searches with different variations if it didn't find a match the first time.

## Format Results

Now that we have our SQL results, we need to format them. We'll do pretty much the same thing we did in the `Lookup` tool. We need to convert to a dictionary and replace the `Id` with an `IdKey`.

```
{% assign items = null %}

{% for row in results %}
    {% assign idKey = row.Id | ToIdHash %}
    {% assign item = row | AsDictionary %}
    {% assign item = item | AddToDictionary:'IdKey',idKey | RemoveFromDictionary:'Id' %}

    {% assign items = items | AddToArray:item %} 
{% endfor %}
```

## Return Data

Return the paged list of formatted results using `AgentToolResult` so the agent receives a clear, structured response.

```
{% assign result = 'Success' | AgentToolResult:items %}
```

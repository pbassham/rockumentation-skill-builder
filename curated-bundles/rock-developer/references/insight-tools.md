---
description: "Use when analyzing or aggregating data patterns like counts, group statistics, or summary metrics rather than retrieving individual records"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

`Insight` tools help an agent analyze data instead of retrieve individual records. `Insight` tools can be broken down into 3 simple parts.

1. Filter and aggregate data.
2. Format the data
3. Return the data.

## Filter Data

Because insight tools are opinionated, the only inputs would be filter options. The output is completely left up to your discretion which usually simplifies the logic you need to do.

For this example, we will have defined a tool parameter of `groupTypeId` as a string. This will be optional. The agent can request insights about all group types, or a specific group type.

```
{% assign groupTypeId = groupTypeIdKey | FromIdHash | Default:'0' %}

{% sql %}
    SELECT
        COUNT(*) AS [TotalMemberCount]
        , COUNT(DISTINCT [gm].[GroupId]) AS [GroupCount]
        , COUNT(CASE WHEN [GroupMemberStatus] = 0 THEN 1 END) AS [InactiveMemberCount]
        , COUNT(CASE WHEN [GroupMemberStatus] = 1 THEN 1 END) AS [ActiveMemberCount]
        , COUNT(CASE WHEN [GroupMemberStatus] = 2 THEN 1 END) AS [PendingMemberCount]
    FROM [GroupMember] AS [gm]
    INNER JOIN [Group] AS [g] ON [g].[Id] = [gm].[GroupId]
    WHERE ({{ groupTypeId }} = 0 OR [gm].[GroupTypeId] = {{ groupTypeId }})
          AND [gm].[IsArchived] = 0
          AND [g].[IsActive] = 1
          AND [g].[IsArchived] = 0
{% endsql %}
```

In this query, we want to grab some counts of all group members and groups that match the requested *Group Type* - or all group types if none was specified. At the top we use the `FromIdHash` filter to convert the `IdKey` to an integer `Id`. If it is *null* then the `Default` filter will give us the value of `0`. Then later in our where statement, we use a compound comparison to check if the `groupTypeId` value is 0 or if it matches the group members group type.

Our select statement gathers all the counts for us as a single row result set.

## Format Result

```
{% assign response = null %}

{% for row in results %}
    {% assign response = row | AsDictionary %}
{% endfor %}

{% if response == null %}
    {% assign response = response | AddToDictionary:'TotalMemberCount',0 %}
    {% assign response = response | AddToDictionary:'GroupCount',0 %}
    {% assign response = response | AddToDictionary:'InactiveMemberCount',0 %}
    {% assign response = response | AddToDictionary:'ActiveMemberCount',0 %}
    {% assign response = response | AddToDictionary:'PendingMemberCount',0 %}
{% endif %}
```

Formatting the result is pretty simple. We just convert the row to a dictionary. If there were no rows, then SQL will actually give us an empty result set which means our `response` will still be *null*. If that is the case, create a response object that has 0 counts. You technically don't need to do this, a `NoData` response would probably suffice. But this gives you a nice example of how to handle it if you wanted to do something a bit more complex.

## Return Result

Return the aggregated result using `AgentToolResult` so the agent receives a clear summary of the data.

```
{% assign result = 'Success' | AgentToolResult:response %}
```

In this case, we simply return the response object to the agent. If we wanted, we could add some instructions to give hints on how the agent should display the information.

---
description: Use when you need to understand how to retrieve and format a single specific record using Get tools with ID parameters and related data joins
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

`Get` tools are used when the agent needs one specific record, not a list. Unsurprisingly, this tool might be the most simple pattern you have to work with. We'll break it down into three steps:

1. Load data
2. Format result
3. Return result

## Load Data

Our tool has been configured with a `groupIdKey` parameter of type string.

```
{% assign groupId = groupIdKey | FromIdHash %}

{% sql %}
    SELECT 
        [g].[Id]
        , [g].[Name]
        , [g].[CreatedDateTime]
        , [g].[Description]
        , [gt].[Id]
        , [gt].[Name]
    FROM [Group] AS [g]
    INNER JOIN [GroupType] AS [gt] ON [gt].[Id] = [g].[GroupTypeId]
    WHERE
        [g].[Id] = {{ groupId | Default:'0' }}
{% endsql %}
```

As with our list tool, we first convert the `groupIdKey` parameter into an integer `groupId` value which will be used to filter to the one group. It will either be *null* (in which case we default it to `0`), or an integer value so we don't need to escape it.

Beyond that one detail, it's just a normal SQL statement to pull in the various columns we are interested in along with any join statements we need to gather additional information. In this case, we are pulling in the *Group Type* identifier and name so we can include those in the result.

## Format Result

```
{% assign response = null %}

{% for row in results %}
    {% assign idKey = row.Id | ToIdHash %}
    {% assign item = row | AsDictionary %}
    {% assign item = item | AddToDictionary:'IdKey',idKey | RemoveFromDictionary:'Id' %}

    {% assign groupTypeIdKey = row.GroupTypeId | ToIdHash %}
    {% assign groupTypeName = row.GroupTypeName %}
    {% assign groupType = '' | AddToDictionary:'IdKey',groupTypeIdKey | AddToDictionary:'Name',groupTypeName %}
    {% assign item = item | AddToDictionary:'GroupType',groupType | RemoveFromDictionary:'GroupTypeId' | RemoveFromDictionary:'GroupTypeName' %}
    
    {% assign response = item %}
{% endfor %}
```

Now that we have our SQL results, we need to translate it into a single object. Because trying to check how many rows we have and return an error at this point would be quite verbose, we're going to cheat just a little. We set our response object to null and then loop over the SQL results. Since our select statement guarantees that we get either 0 or 1 result, this little trick works. Our `response` variable will either be null or a single dictionary object.

Inside the loop, we convert our group identifier to an IdKey, much like we did in the List tool. However, we handle the group type values differently. In this case, we replace the `GroupTypeId` and `GroupTypeName` properties with a single `GroupType` value that itself is a dictionary of `IdKey` and `Name`. This provides better context to the agent and is the pattern the built-in tools use.

The final JSON of our response object would look like this.

```
{
  "IdKey": "QRk23js90H",
  "Name": "Ted's Group",
  "CreatedDateTime": "2023-08-12T14:35:08",
  "Description": "Ted Decker leads this small group with his wife Cindy.",
  "GroupType": {
    "IdKey": "Lk3F8sMnw0",
    "Name": "Small Groups"
  }
}
```

## Return Result

Return the single result using `AgentToolResult`, and return an error if the record is not found.

```
{% if response != null %}
    {% assign result = 'Success' | AgentToolResult:response %}
{% else %}
    {% assign result = 'Error' | AgentToolResult:'That group was not found.' %}
{% endif %}
```

As you can see, our pattern to return the result is slightly different than usual. If our `result` variable is not null, then we return a success message with the content of the variable. However, if it is null then we want to return an error to clearly indicate that something is wrong. In this case, we don't want to return a `NoData` response because that also implies a successful operation. But not finding the single specific item that was requested is indicative of an error, so we want to clearly report that state.

---
description: "Use when deciding whether a tool should be a Lookup or List type, or when naming and structuring data retrieval tools for AI agent skills"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

We have broken tools down into a number of recommended types, which are identified by the verb prefix on the tool name. You will likely run into cases where you are not sure if your tool should be `List` or `Lookup` for certain entities. This will be especially true for small result sets, such as Campus as it could fit either option. Do your best to think through the most likely use case.

To see these, navigate to `Admin Tools > Settings > AI Agents > AI Skills` then click on a skill.

![Rock's Default Tools for the Person Skill](https://community.rockrms.com/GetImage.ashx?Id=74285)

## Lookup

Provides a set of items needed as *inputs* to other tools. In general, these tools should not have filters. Instead they should return all items. There are of course exceptions, such as when the expected number of items is beyond a reasonable amount that would fit in the context window.

These will often return metadata / additional properties needed for the filtering. For example, a *Lookup* tool for campuses might include the status of the campus (open vs. closed) as an additional property. This would allow the language model to perform filtering if it needs to based on the campus being open or closed.

The result should typically include a summarized version of the result set in history. Meaning, if your *Lookup* had an *Id*, *Name*, *Status* and *Location* then the history should only have the *Id* and *Name*. This allows the language model to refer back to the list of items later in the chat history without needing to pull the whole set again. For example, the individual might ask how many *Connection Requests* are open for the Phoenix campus. Then later ask about Peoria campus. Having the minimal *Id* and *Name* in chat history will allow it to skip looking up all the campuses again.

## List

These are for dynamic results that represent real-time or historical records. These generally have a set of filters as they normally deal with large data sets.

The result items should be mildly summarized. For example, when listing *Connection Requests*, don't include the list of activities. That information is typically not required to decide if the item is relevant to the individual's request. However, the *Connection Opportunity* (*Id* and *Name* only) is likely relevant. Remember that the entire result set must fit within the context window, which you can assume that only half the entire window is available as a lot would already be used up by the input data.

Important

As a general rule, *List* tools should not include any history data. This means you must remember to call `WithoutHistoryContent()` on the result object.  

### ForPerson

These tools are expected to operate on a single person. An example would be `ListPersonalDevicesForPerson`. There is clear indication to the language model what we are doing. We are **List**ing a set of personal devices **for** a single **person**.

`ForPerson` should be used when it would not make much sense to allow listing items for the whole database. For example, personal devices are a good candidate because there is really no other filtering option but *Person*. Even if we filtered by *Device Type*, we would expect to have thousands or tens of thousands of results. That will not be helpful to the language model, but listing personal devices for Ted Decker would make sense, as we would expect to have at most a dozen records.

## Get

*Get* tools are used to fetch details about a single item. For example, while the list tool for *Connection Requests* would exclude activity details, the *Get* tool should include them.

The default pattern for *Get* tools is to include a slightly summarized version of the entire result object in the chat history. Again, in the example of a *Connection Request* this would probably mean excluding the full list of activities, though you might consider including the three most recent activities in a property called `RecentActivities`.

Once again, the deciding factor is context window size. If our *Get* methods return objects that takes up 10,000 tokens each, then 3 different *Get* methods would quickly push the conversation over the threshold before your conversation gets summarized.

### Summary

A *Summary* tool follows the naming pattern of a `Get` prefix and a `Summary` suffix, with a singular entity name in between. Such as `GetCampusSummary`. These tools are designed to return structured summary counts grouped by a predetermined set of properties, such as *Type* and *Status*. These would typically take filtering arguments and possibly even an argument to specify how to group the data if more than one grouping is supported.

*Summary* tools return a single total property per group dimension. If you have a need to return more than that single count value then you should probably be looking at an *Insights* tool.

Important

Since the resulting datasets can be quite large, they should normally be excluded from *Chat History*. Remember that each time you add a dimension, your result set grows exponentially. Unless you know your dataset will always be small it should be excluded from chat history. As an alternative, you might consider only including the first dimension level in chat history.

### Insights

*Insights* provide structured and opinionated analytics about an entity type. These follow the naming pattern of a `Get` prefix and an `Insights` suffix, with a singular entity name in between. Such as `GetConnectionRequestInsights`. These typically will not have any filters, though there may be exceptions. *Connection Requests* are one such exception. Since two *Connection Requests* each under a different *Connection Type* might have vastly different purposes, it might make sense to have a required filter to select with *Connection Type* you want insights on.

Like summaries, *Insights* provide aggregate data. However, this data is always structured a specific way and does not allow the language model to pick how the data is structured. In addition to aggregate data, other data may be included. For example, when getting *Insights* on *Connection Requests*, it might make sense to include the top 5 connectors or just the 10 oldest *Connection Requests* that haven't been connected yet.

### AvailableAttributes

These are special *Get* tools that return a collection of attribute definitions so that the language model knows what attributes are available when adding or updating entities. These usually take parameters to cover two scenarios. The first scenario is getting the attributes of an existing item. The second is getting attributes of a new item.

Lets consider a Group. For the first scenario, you can accept a `groupIdKey` parameter. With this you can load the group and then get the available attributes. But what about when a new group is created? In this scenario you have to take any parameters that are used as qualifiers on attributes. In this case, it would be `groupTypeIdKey`. This way, if the `groupIdKey` parameter is blank, you can create a new in-memory Group, set the `GroupTypeId` property and then load attributes.

## AddOrUpdate

The pattern you should most often use is a single tool for handling both adding new items and updating existing items. If you are working with an entity where it doesn't make sense to allow one of those operations then you can drop that verb.

These tools take an optional parameter that specifies the item to edit by its `IdKey`. If this parameter is not specified, then it is considered an Add operation.

When updating, there are certain properties that are difficult to update. More specifically, it is difficult to know what the language model is intending. For example, take a string property. This is a nullable data type, so it would be perfectly valid to set the value to null. But how do we know if the parameter is null because it wasn't specified (and isn't meant to be updated), or if it was specified as null because the value is supposed to be cleared?

To solve that in C#, we use a value wrapper called `SetOrClear`. This has a property called `ClearValue` that allows the language model to inform us that it wants to explicitly clear the existing value. If a property is required, such as an integer, then your method parameter can simply be a `int?` and you can check if it is null to determine if it is supposed to be set or not.

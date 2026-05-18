---
description: "Use when implementing list tools with filtering, pagination, and result formatting for Rock platform queries"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

List tools are comprised of 3 basic parts.

1. Filter a set of data down to match the request.
2. Format the results into a concrete Result class that represents each item.
3. Apply pagination rules to the final set.

There is also two different patterns for working with paged content. The first is Page Number paging. This is best for data that is not secured, meaning no `IsAuthorized()` check needs to be performed. The other is Cursor Paging, which is ideal for situations where you need to work with per-item security - which requires the full objects to be loaded.

## Page Number Paging

This type of paging uses an integer page number, starting at 1, to request items. This is best for simple queries where you can use a `.Select()` to pull just the few values you need to get your results. When requesting 25 items at a time and page number 3, we simply skip 50 items and then take the next 25.

### Filter Data

Filtering data is pretty straight forward in concept. Lets take a look at a simple example of how to accept filter arguments and apply them to a database query.

Normally you would have to do a bunch of conditional checks to make sure the parameter was valid or not empty or whatever before modifying the queryable. But we have some helper tools to make your life easier.

```
public IAgentToolResult ListCampuses(
    bool isActive = true,
    [Description( "Call LookupCampusTypes to find valid values." )]
    string campusTypeIdKey = null,
    pageNumber = 1 )
{
    var helper = new AgentToolHelper( AgentRequestContext, _logger );

    var query = new CampusService( AgentRequestContext.RockContext )
        .Queryable()
        .Where( c => c.IsActive == isActive );

    query = helper.WhereOptionalIdKey( query, c => c.CampusTypeValueId, campusTypeIdKey );

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }
```

Our list tool is taking three parameters. The first is a required argument, `isActive`, that we provide a default value for. What we mean by "required" here is that we are always going to filter with this argument. In this case, it means we can only list inactive campuses or active campuses, not both. If we wanted to do both we would make the `isActive `argument nullable to imply that filter can be excluded.

The second parameter is the campus type. Since this is an entity reference, it is an idKey. In this case it is fully optional. If they don't provide a value it defaults to null. And if it is null or empty we aren't going to filter on it. We have also given the language model a hint as to how to find the valid values.

The final parameter allows the language model to select different pages from the result set. By default, we will start on the first page.

Now we get to the actual filtering. Once we have our queryable we apply the `isActive` filter, remember this is required so we always filter on it.

Next, we use a helper method to filter the `CampusTypeValueId` property, `WhereOptionalIdKey()`. This particular method allows `campusTypeIdKey` to be null or empty. If so then no filtering is performed. Otherwise it decodes the IdKey. If it isn't valid then it will register an error message. To see all the various `Where...()` methods available, check out the helper tool documentation.

Finally we check for errors. Doing this once after all query filters have been applied allows us to return multiple error messages at once. Meaning, if the first parameter is invalid, we don't want to return an error just to have the language model retry with the same invalid *second* parameter.

### Format Results

In most cases, you don't want to materialize the entire entity. When you are listing results, you typically just want a minimal representation of the object. Not the full details. The goal is to give the language model enough information to respond to the individual's request without overloading the token count.

```
var campusesQry = query
        .AsExpandable()
        .Select( c => new CampusResult
        {
            Id = c.Id,
            Name = c.Name,
            LeaderPerson = PersonResult.NameOnly( c.LeaderPersonAlias ),
            AttributeValues = c.CampusAttributeValues
                .GetGridAttributeValueResults( AgentRequestContext )
                .ToList(),
        } )
        .OrderBy( c => c.Name )
        .ThenBy( c => c.Id );
```

In this case, we are just returning the identifier, name, leader and any attribute values marked to show on grid. You'll notice a few unusual things, so lets dive in.

The first thing is probably the `.AsExpandable()` call at the start. This puts the queryable in a state where it can expand certain method calls into actual expression trees before it is translated to SQL. Normally, if you try to call LINQ to SQL with a method call in the select statement, it will fail because it can't translate that method to SQL. This allows us to make certain method calls available.

Further down we are constructing our `LeaderPerson` property in an unusual way for queries. The factory method `NameOnly()` can take either a PersonAlias or a Person and it will return a PersonResult with the correct properties filled in.

Next, the way we are getting the `AttributeValues` property populated is also unusual for queries. This is very similar to how we are constructing the PersonResult. In this case, we are using the `CampusAttributeValues` property, which allows us to access the attribute values directly in SQL. The extension method we are calling, `GetGridAttributeValueResults()`, takes will perform some filtering - such as only grid attributes - and return a set of `AttributeValueResult` objects.

Finally we have our ordering. To make sure pagination works correctly, always end your ordering with `.ThenBy( x => x.Id )`. This ensures the order can't possibly change between calls. Meaning, if two items have the same name, the order won't flip between calls because we enforce Id as the final ordering mechanism. In the case of our Campus tool, we are ordering by name because that makes the most sense. For other entity types, it might make more sense to order by the most recent item.

### Paginate

The final step is to apply pagination rules. Under normal circumstances, this is extremely simple.

```
var page = helper.GetPaginatedItems( campusesQry, pageNumber );
    var historyPage = page.WithItems( page.Items.Select( c => new KeyNameResult
    {
        Id = c.Id,
        Name = c.Name,
    } ).ToList() );

    return helper.GetPaginatedResult( page, historyPage );
}
```

This is the most basic pagination logic. We call `GetPaginatedItems()` to get the object that represents the page of items and additional paging details. Then we construct the history page (the data that will be stored in chat history) to be a minimal set of KeyNameResult objects. Then we call `GetPaginatedResult()` with those page results. It is generally recommended to return minimal history results. This way if the language model decides to display the items and asks the user to pick one, it will still have access to the IdKey and Name for later tool calls.

You might wonder why two calls instead of one. The answer is there are times you will need to do extra processing with the actual items included in the results. For example, you might have to run a second query to load some additional data that is expensive, so you only want to do it for the items in the page.

## Cursor Paging

This type of paging uses an opaque cursor string that contains instructions for how to get the next page. This type of paging is best, if not required, when working with per-item security where you can't just skip `n` number of items. For example, if you are pulling a list of groups, you can't just skip 50 items to start page 3, because they might not have had access to group number 40, so the second page actually returned groups 26 - 51 instead of 25 - 50. In this case, the cursor contains the information so that we know to start at item 51 (or more specifically, all items "after" item 51).

### Filter Data

Filtering data is pretty straight forward in concept. Lets take a look at a simple example of how to accept filter arguments and apply them to a database query.

Normally you would have to do a bunch of conditional checks to make sure the parameter was valid or not empty or whatever before modifying the queryable. But we have some helper tools to make your life easier.

```
public IAgentToolResult ListCampuses(
    bool isActive = true,
    [Description( "Call LookupCampusTypes to find valid values." )]
    string campusTypeIdKey = null,
    string cursor = null )
{
    var helper = new AgentToolHelper( AgentRequestContext, _logger );

    var query = new CampusService( AgentRequestContext.RockContext )
        .Queryable()
        .Where( c => c.IsActive == isActive );

    query = helper.WhereOptionalIdKey( query, c => c.CampusTypeValueId, campusTypeIdKey );

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }
```

Our list tool is taking three parameters. The first is a required argument, `isActive`, that we provide a default value for. What we mean by "required" here is that we are always going to filter with this argument. In this case, it means we can only list inactive campuses or active campuses, not both. If we wanted to do both we would make the `isActive` argument nullable to imply that filter can be excluded.

The second parameter is the campus type. Since this is an entity reference, it is an idKey. In this case it is fully optional. If they don't provide a value it defaults to null. And if it is null or empty we aren't going to filter on it. We have also given the language model a hint as to how to find the valid values.

The final parameter allows the language model to select different pages from the result set. By default, we will start on the first page.

Now we get to the actual filtering. Once we have our queryable we apply the `isActive` filter, remember this is required so we always filter on it.

Next, we use a helper method to filter the `CampusTypeValueId` property, `WhereOptionalIdKey()`. This particular method allows `campusTypeIdKey` to be null or empty. If so then no filtering is performed. Otherwise it decodes the IdKey. If it isn't valid then it will register an error message. To see all the various Where...() methods available, check out the helper tool documentation.

Finally we check for errors. Doing this once after all query filters have been applied allows us to return multiple error messages at once. Meaning, if the first parameter is invalid, we don't want to return an error just to have the language model retry with the same invalid *second* parameter.

### Apply Pagination Rules

In this case, we need to materialize the full entity which means we will do pagination before formatting the result.

```
var paginator = new CursorPaginator<Campus>( currentPerson, qry => qry
        .OrderBy( c => c.Name )
        .ThenBy( c => c.Id ) );

    var cursorPage = helper.GetCursorPaginatedItems( query, paginator, cursor );
```

The class CursorPaginator handles the filtering and sorting for us. This is done by passing the Person object to use for security checks and then a lambda function that supplies the ordering details. After that, our helper is given the query, paginator and cursor value (from a previous call).

### Format Results

Once we have the paged items, we can do additional work on them. Such as loading in attributes and formatting the full entity objects down to the result object that will be provided to the language model.

```
cursorPage.Items.LoadAttributes( AgentRequestContext.RockContext );

    var resultPage = cursorPage.WithItems( cursorPage.Items
        .Select( c => new CampusResult
        {
            Id = c.Id,
            Name = c.Name,
            LeaderPerson = PersonResult.NameOnly( c.LeaderPersonAlias ),
            AttributeValues = c.GetGridAttributeValueResults( AgentRequestContext ).ToList(),
        } )
        .ToList() );

    var historyPage = page.WithItems( cursorPage.Items.Select( c => new KeyNameResult
    {
        Id = c.Id,
        Name = c.Name,
    } ).ToList() );

    return helper.GetPaginatedResult( resultPage, historyPage );
}
```

First we load all the attributes in bulk for the entire result set. Then we build the individual result objects. Notice that here, we use the `GetGridAttributeValueResults()` extension method on the Campus entity directly rather than on the `CampusAttributeValues` property. This is because the Campus is already in memory so we want to use the bulk-loaded attribute values.

As with page number paging, if you don't want to return history results, simply call the `GetPaginatedResult()` method without the history object.

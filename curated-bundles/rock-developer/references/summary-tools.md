---
description: Use when building summary tools that aggregate data with filtering options and configurable grouping dimensions
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

Summary tools provide aggregate information over a set of items. These will typically half filters to refine items and often will include a parameter that dictates the primary aggregate grouping. We are going to break this down into these parts:

1. Setup
2. Filtering
3. Dimension Configuration
4. Grouping
5. Building Result

## Setup

Working with summary tools requires a small amount of initial setup before we start filtering. This includes the method signature as well as creating a few things we'll be using later in the tool.

```
public IAgentToolResult GetConnectionRequestSummary(
    string connectionTypeIdKey = null,
    string connectionOpportunityIdKey = null,
    string campusIdKey = null,
    string connectorPersonIdKey = null,

    [Description( "Must be blank or exactly one of these values (do not infer additional values): ConnectionType, ConnectionOpportunity, Campus, ConnectionStatus" )]
    string primaryDimension = null )
{
    var helper = new AgentToolHelper( AgentRequestContext, _logger );
    var dimensions = new List<string> { "ConnectionType", "ConnectionOpportunity", "Campus", "ConnectionStatus" };
```

Our tool takes a total of 5 arguments. The first 4 are filtering arguments answering the question "what do we want a summary of". The last argument determines how the data is grouped, answering the question "what am I trying to learn". Note that the argument is called \`primaryDimension\` instead of \`dimension\`. Summary tools should aggregate on multiple levels whenever possible. This allows the language model to provide better answers after parsing the data. You'll see how we do this later.

At the start of our method's logic, we create our standard helper and then a list of available dimensions that can be used for grouping data. These must match the description of your \`primaryDimension\` argument.

## Filtering

To get our aggregate results we first need to figure out what data to include.

```
var query = new ConnectionRequestService( AgentRequestContext.RockContext )
        .Queryable()
        .Where( cr => !cr.ConnectedDateTime.HasValue );

    query = helper.WhereOptionalIdKey( query, cr => cr.ConnectionTypeId, connectionTypeIdKey );
    query = helper.WhereOptionalIdKey( query, cr => cr.ConnectionOpportunityId, connectionOpportunityIdKey );
    query = helper.WhereOptionalIdKey( query, cr => cr.CampusId, campusIdKey );
    query = helper.WhereOptionalIdKey( query, cr => cr.ConnectorPersonAlias.PersonId, connectorPersonIdKey );
```

In this case, our query only includes active connection requests. We will never allow summary results to include already completed requests. Next, we apply any conditional filters based on the arguments we were passed. There are various \`Where...\` helper methods available. See the helper documentation for details on all of them. The to summarize, if the argument values are null or blank, no filtering will be performed. If there was an error parsing the value, an error will be reported.

## Dimension Configuration

Now that we have our query that represents what data to be summarized, we need to decide how we want to group it. Earlier we mentioned that summary tools aggregate across multiple levels. That is where these dimensions come in. The `dimensions` variable contains both the list of valid dimensions we can group by, as well as the order we perform that grouping in.

```
helper.SetPrimaryDimension( primaryDimension, dimensions );

    // If we are grouping by opportunity, then it doesn't make sense
    // to still group by type.
    if ( "ConnectionOpportunity".Equals( primaryDimension, StringComparison.OrdinalIgnoreCase ) )
    {
        dimensions.Remove( "ConnectionType" );
    }

    // Remove any dimensions that have already been satisfied by
    // filter options.
    helper.RemoveSatisfiedDimensions( connectionTypeIdKey, dimensions, ["ConnectionType"] );
    helper.RemoveSatisfiedDimensions( connectionOpportunityIdKey, dimensions, ["ConnectionOpportunity", "ConnectionType"] );
    helper.RemoveSatisfiedDimensions( campusIdKey, dimensions, ["Campus"] );

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }
```

Our helper has a number of methods to help you when working with your list of dimensions. None of these methods do anything magical, they just clean up the code so it can be concise and easy to understand.

First we set our primary dimension. What this does is find the `primaryDimension` in the `dimensions` list and move it to the front. In other words, if the language model passed `Campus` as the primary dimension, it gets moved to the front so we first group by the connection request's campus. Then after that we will group by connection type, then connection opportunity and finally connection status.

Next we handle a special case. If the requested primary dimension is connection opportunity, it doesn't make sense to also group by connection type - because there will always be just one. So if they want connection opportunity as the primary dimension then we remove connection type from the list of dimensions.

After that we remove any other dimensions that don't make sense based on filters. The `RemoveSatisfiedDimensions` method will simply remove the dimensions listed in the 3rd parameter from the `dimensions` list in the second parameter if the first parameter is not null or empty. There are a few variations of this method to also handle filters of different data types. In other words, if we are filtering on a specific campus, there is no reason to aggregate on campus because it will always result in a single item.

Finally, we check for any errors that have been encountered up until now.

## Grouping

Grouping is actually a two-stage process. The first stage happens in SQL and will be covered here. The second stage happens in C# and will be handled when we build the results.

```
// Perform the SQL level grouping of all data into a set of rows
    // that contain the count of each possible combination of grouped
    // values.
    var groupCounts = query
        .GroupBy( cr => new
        {
            cr.ConnectionOpportunity.ConnectionTypeId,
            cr.ConnectionOpportunityId,
            cr.CampusId,
            cr.ConnectionStatusId,
        } )
        .Select( cr => new SummaryGroupCount
        {
            ConnectionTypeId = cr.Key.ConnectionTypeId,
            ConnectionOpportunityId = cr.Key.ConnectionOpportunityId,
            CampusId = cr.Key.CampusId,
            ConnectionStatusId = cr.Key.ConnectionStatusId,
            Count = cr.Count(),
        } )
        .ToList();
```

As you can see, there isn't much to this in terms of logic. We take our query and then group by *all possible dimensions*. Meaning, every item listed in our `dimensions` array should be present in our `GroupBy` call. What this is going to do is give us back a list of rows that cover all possible group-by combinations. Next we take that data and convert it into a C# POCO that represents these grouped counts. Doing this is fast in SQL and then allows us to quickly perform nested grouping in our dimensions.

## Building Result

The building of the result is actually the most complex part and we'll take a look at it in chunks.

```
var summary = GetSummaryResult( helper, dimensions, groupCounts );

    return Success( summary ).WithoutHistoryContent();
}
```

At the end of our main tool method, we just call our `GetSummaryResult` method, which we will see in a moment. Unfortunately the rest of this isn't something that a single helper can do for us - although there are a few helper methods you can re-use for specific parts. But for now lets take a look at this method.

We are not including history content. This is because for this example we have a lot of dimensions. That means our result object grows exponentially and will be quite large. If you are building a summary tool that only has one or two dimensions with a limited set of values, it is probably fine to have the history content.

### Get Summary Result

The GetSummaryResult method handles the high-level grouping of our dimensions. There are helper methods it calls to do the actual grouping for each dimension, but this handles pulling it all together. It make use of a few standard classes: `SummaryResult` and `SummaryGroupResult`. The `SummaryResult` class contains the overall result that will be returned to the language model. It contains, among other things, the top level `SummaryGroupResults`. The group results represent the group names/counts at each dimension level.

```
private SummaryResult GetSummaryResult( AgentToolHelper helper, List<string> dimensions, List<SummaryGroupCount> groupCounts )
{
    List<SummaryGroupResult> groups = null;
    var state = GetSummaryState( groupCounts );
    var summary = new SummaryResult
    {
        GroupingDimensions = dimensions,
    };

    foreach ( var dimension in dimensions )
    {
        switch ( dimension )
        {
            case "ConnectionType":
                groups = helper.GetDimension( groups, groupCounts, c => c.ConnectionTypeId, state.ConnectionTypes );
                break;

            case "ConnectionOpportunity":
                groups = helper.GetDimension( groups, groupCounts, c => c.ConnectionOpportunityId, state.ConnectionOpportunities );
                break;

            case "Campus":
                groups = helper.GetDimension( groups, groupCounts, c => c.CampusId, state.Campuses );
                break;

            case "ConnectionStatus":
                groups = helper.GetDimension( groups, groupCounts, c => c.ConnectionStatusId, state.ConnectionStatuses );
                break;
        }

        summary.Groups ??= groups;
    }

    summary.Total = summary.Groups.Sum( g => g.Total );

    return summary;
}
```

So lets break this down as best we can. Up top, before our `foreach` loop, we initialize some data. Our groups variable will hold the "last result groups" from our previous dimension. We initialize it to null because we don't have a previous dimension yet. Then we initialize our custom state by calling `GetSummaryState` method. Our summary state contains all the cached lookups we will need (i.e. connection type names) as well the root `groupCounts`. Finally, we initialize our main result object and set the `GroupingDimensions` property to the dimensions that the result will contain. This allows the language model to understand what each nested grouping level means.

Next is our `foreach` loop. All we do is check which dimension this loop is for and then call the appropriate methods. At each dimension we call the helper method GetDimension with the appropriate arguments. The first two parameters tell it what to build dimensions for. If `groups` is null, then it will use `groupCounts` and build the root level dimension. Otherwise, it will loop over groups and build the dimension for each group. In either case, it returns all the group objects that were created.

At the end of our loop, we assign `groups` to the root summary result `Groups` property if it is null (meaning the first loop). This whole loop process lets us quickly build the groupings at each dimension level without getting into complex recursion calls. It also allows us to re-order the dimensions in any way we want.

Finally, we set the `Total` number of items on the summary result.

### Get Summary State

This method simply builds a state object that contains all the data required to build our groupings. Even though Rock has a lot of data in cache, it is usually best to build a secondary cache here. For example, instead of calling ConnectionTypeCache.Get() on repeatedly when building our groupings, we get all the connection types from cache at once and build a simple Id to Name dictionary. This drastically improves performance. Cache is fast compared to database, but there is still a lot of overhead that happens when getting things from cache. Especially when you know you are going to be getting the same thing over and over again.

```
private SummaryState GetSummaryState( List<SummaryGroupCount> groupCounts )
{
    var connectionOpportunityIds = groupCounts.Select( fc => fc.ConnectionOpportunityId ).Distinct().ToList();
    var connectionOpportunities = new ConnectionOpportunityService( AgentRequestContext.RockContext )
        .Queryable()
        .Where( co => connectionOpportunityIds.Contains( co.Id ) )
        .Select( co => new
        {
            co.Id,
            co.Name,
        } )
        .ToDictionary( co => co.Id, co => co.Name );

    var connectionStatusIds = /* ... */
    var connectionStatuses = /* ... */

    return new SummaryState
    {
        ConnectionTypes = ConnectionTypeCache.All( AgentRequestContext.RockContext )
            .ToDictionary( ct => ct.Id, ct => ct.Name ),
        ConnectionOpportunities = connectionOpportunities,
        ConnectionStatuses = connectionStatuses,
        Campuses = CampusCache.All( AgentRequestContext.RockContext )
            .ToDictionary( c => c.Id, c => c.Name ),
    };
}
```

Once again, we are looking at a slightly simplified version of this, but you will easily get the idea.

First, we get all the connection opportunity identifies that are referenced in our custom `SummaryGroupCount` list. Then, using that we query the database and create a dictionary that maps the Id number to the Name. In If you have cache you should use it, but in this case this shows how to handle an item that we don't have cache for. Rinse and repeat for each lookup table you need to build from the database.

Then we build our custom `SummaryState` object by using either the lookup tables we loaded from the database, or ones we pulled from cache.

### Custom Data Classes

For reference, here are the custom POCOs that we create and use.

```
private class SummaryGroupCount : ISummaryGroupCount
{
    public int ConnectionTypeId { get; set; }

    public int ConnectionOpportunityId { get; set; }

    public int? CampusId { get; set; }

    public int ConnectionStatusId { get; set; }

    public int Count { get; set; }
}

private class SummaryState
{
    public Dictionary<int, string> ConnectionOpportunities { get; set; }

    public Dictionary<int, string> ConnectionStatuses { get; set; }

    public Dictionary<int, string> ConnectionTypes { get; set; }

    public Dictionary<int, string> Campuses { get; set; }
}
```

---
description: "Use when building analytics tools that aggregate entity data and return structured, opinionated insights with curated metrics like counts and top results"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

`Insights` tools provide structured, opinionated analytics about an entity type. They follow the naming pattern of a `Get` prefix and an `Insights` suffix with a singular entity name in between, such as `GetConnectionRequestInsights`. Unlike a Summary tool, the shape of the result is decided by you, not by the language model. Inputs are usually just a few optional filters. In addition to aggregate counts, an insights result often includes curated extras, such as the top ten connectors or the oldest unconnected requests.

## Filter and Aggregate

Start by building the query and applying any optional filters, then perform the aggregation in SQL. As with a Summary tool, group by every dimension you will need and select the counts into a small POCO. This keeps the heavy lifting in SQL and lets you compose the final result quickly in memory.

```
[Description( "Returns the insights of connection requests." )]
[AgentPurpose( "Retrieves a set of insights into connection requests." )]
[AgentToolGuid( "51e14e2d-09a4-440e-9e7d-df1bf22bd918" )]
public AgentToolResult GetConnectionRequestInsights(
    string connectionOpportunityIdKey = null,
    string campusIdKey = null )
{
    var helper = new AgentToolHelper( AgentRequestContext, _logger );

    var query = new ConnectionRequestService( AgentRequestContext.RockContext )
        .Queryable()
        .Where( cr => !cr.ConnectedDateTime.HasValue );

    query = helper.WhereOptionalIdKey( query, cr => cr.ConnectionOpportunityId, connectionOpportunityIdKey );
    query = helper.WhereOptionalIdKey( query, cr => cr.CampusId, campusIdKey );

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }

    // Aggregate in SQL into a set of counts per combination of values.
    var groupCounts = query
        .GroupBy( cr => new
        {
            cr.ConnectorPersonAliasId,
            cr.ConnectionStatusId,
        } )
        .Select( cr => new InsightsGroupCount
        {
            ConnectorPersonAliasId = cr.Key.ConnectorPersonAliasId,
            ConnectionStatusId = cr.Key.ConnectionStatusId,
            Count = cr.Count(),
        } )
        .ToList();

    var insights = GetInsightsResult( groupCounts );

    return Success( insights ).WithoutHistoryContent();
}
```

## Build and Return the Result

A helper method turns the raw counts into the opinionated result object. Here we compute totals, a breakdown by status, and the top connectors. Because the payload is decided entirely by you, there is no dimension argument. Use a small cached state object (a dictionary of Id to Name) rather than repeatedly calling the cache while building the result.

```
private ConnectionRequestInsightsResult GetInsightsResult( List<InsightsGroupCount> groupCounts )
{
    var state = GetInsightsState( groupCounts );

    var insights = new ConnectionRequestInsightsResult
    {
        ActiveCount = groupCounts.Sum( gc => gc.Count ),
        UnassignedCount = groupCounts
            .Where( gc => !gc.ConnectorPersonAliasId.HasValue )
            .Sum( gc => gc.Count ),
        CountByStatus = groupCounts
            .GroupBy( gc => gc.ConnectionStatusId )
            .Select( g => new SummaryGroupResult
            {
                Id = g.Key,
                Name = state.ConnectionStatuses[g.Key],
                Total = g.Sum( gc => gc.Count ),
            } )
            .ToList(),
    };

    // Include a curated extra: the ten busiest connectors.
    // (Query the top connector person aliases and project to PersonResult.)

    return insights;
}
```

Note

Insights differ from Summary tools. A Summary tool lets the language model choose the primary grouping dimension, while an Insights tool always returns the same structured shape. Insights results are usually large, so return them with `WithoutHistoryContent()` to keep them out of chat history.

---

## Delete {#delete}

## Overview

`Delete` tools permanently remove an entity. They follow the naming pattern of a `Delete` prefix and a singular entity name, such as `DeletePrayerRequest`. Because deleting is destructive, these tools should always carry an `[AgentGuardrail]` so the language model treats them carefully. The pattern is simple: load the required entity, delete it, and save.

```
[Description( "Deletes a prayer request from the system." )]
[AgentToolGuid( "423AFDB5-1095-4D55-8631-4F284FC0AFED" )]
[AgentGuardrail( "This action will permanently delete the specified prayer request. Ensure that this action is intentional and that you have the correct prayer request identifier before proceeding." )]
public AgentToolResult DeletePrayerRequest( string prayerRequestIdKey )
{
    using var rockContext = RockApp.Current.CreateRockContext();
    var helper = new AgentToolHelper( rockContext, AgentRequestContext, _logger );
    var prayerRequestService = new PrayerRequestService( rockContext );

    var existingPrayerRequest = helper.GetRequiredEntity<PrayerRequest>( prayerRequestIdKey, checkSecurity: true );

    if ( helper.HasErrors )
    {
        return helper.ErrorResult;
    }

    prayerRequestService.Delete( existingPrayerRequest );

    try
    {
        rockContext.SaveChanges();
    }
    catch ( Exception ex )
    {
        _logger.LogError( ex, "An error occurred while deleting a prayer request." );
        return Error( "An error occurred while deleting the prayer request." );
    }

    return Success( "The prayer request has been deleted." );
}
```

We load the entity with `GetRequiredEntity`, passing `checkSecurity: true` so the person's authorization is verified before anything is removed. After checking for errors, we delete through the entity's service and save inside a try/catch, returning a clear error if the save fails. A short success message is enough for the model to confirm the outcome to the user.

Warning

Delete tools are permanent and cannot be undone. Always attach an `[AgentGuardrail]`, require the entity's IdKey rather than inferring it, and think hard before adding a delete tool to a Public agent. When in doubt, have the agent confirm intent with the user before calling a delete tool.

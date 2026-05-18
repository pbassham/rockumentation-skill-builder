---
description: Use when implementing custom Rock blocks or plugins that need to execute data views programmatically with best practices for caching and performance
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

Normally, data views are created and used by the Rock administrators. In these cases, executing the data view is handled internally by Rock. Sometimes, you might need to run a data view yourself. For example, a custom block might have a setting to select a data view that you will then do something with. In these cases, there are some best practice patterns you should follow.

First off, know that there is information about data views that is cached in memory. Rock has DataViewCache and DataViewFilterCache objects - although you are not likely to need to interact with the latter one directly. While you can execute a data view by loading it from the database and then calling its `GetQuery()` method, the correct way is by accessing the DataViewCache object instead.

The reasons will become more apparent as you read further about the DataViewCache object. For now it is suffice to say that we probably cache more data than you realize and that executing a data view from the model object is far more expensive than you realize. A data view also consists of a tree of DataViewFilter objects and all their attribute values. Executing a data view through the DataView object requires that entity framework load that entire tree, which can end up costing several round trips to the database to get everything. With DataViewCache all this data is already in memory.

There are three main method groups you will find on the DataViewCache object:

1. GetEntityIds()
2. GetQuery()
3. GetExpression()

And they should be used in that order of priority. Meaning, if all you need is the identifiers it is more efficient to use `GetEntityIds()` instead of `GetQuery().Select( a => a.Id ).ToList()`. To understand why we'll look over them in reverse order. All of these methods will use as much cached information as they can.

## GetExpressions()

This method will return just the expression. This should be considered a "low level" API. If you find yourself needing to use it, stop and ask *why* you need to use it because there is a good chance you are doing it wrong.

Here is an example of something you should not do:

```
// Get the Data View result.
var personService = new PersonService( rockContext );
var paramExpression = personService.ParameterExpression;
var whereExpression = dataViewCache
    .GetExpression( personService, paramExpression );
IQueryable<int> personIdQry = personService
    .Get( paramExpression, whereExpression )
    .Select( p => p.Id );
```

A case where you might need the expression is if you are building a low-level LINQ query and need to "add on" the data view filtering to the same queryable. Again, this is pretty rare.

## GetQuery()

There are some rare cases where you might need the actual expression, but usually you are just needing a queryable that you can then do something with. The above example really should be written like this:

```
// Get the Data View result.
IQueryable<int> personIdQry = dataViewCache.GetQuery()
    .Select( p => p.Id );
```

Not only is this more concise, but it more accurately reflects your intended purpose.

## GetEntityIds()

The above example to get the `personIdQry` is required if you need to then pass it to another query (for example, getting all group members who are in a data view).

But sometimes we already have a list of things in memory and we want to check if they are also in a data view. For example, we might have already loaded a set of GroupMember records and now want to know which ones are in a specific data view. You could do something like this so that you have a concrete list of person identifiers that you can then check:

```
// Get the Data View result.
List<int> dataViewPersonIds = dataViewCache.GetQuery()
    .Select( p => p.Id )
    .ToList();
var personIds = groupMemberPersonIds
    .Where( id => dataViewPersonIds.Contains( id ) )
    .ToList();
```

The problem with the above is two fold. First, you are calling a method that does not accurately describe what you want to accomplish - you are calling `GetQuery()` when you don't actually want a queryable. Second, this code will always cause at least one hit to the database. Even if the data view is persisted it will still need one round trip to get all the persisted values.

A better way would be to call the `GetEntityIds()` method. This returns a collection instead of a queryable, meaning you don't need to call `ToList()` on it.

```
// Get the Data View result.
List<int> dataViewPersonIds = dataViewCache.GetEntityIds();
var personIds = groupMemberPersonIds
    .Where( id => dataViewPersonIds.Contains( id ) )
    .ToList();
```

This obviously solves the first concern. But it also solves the second concern.

When you call `GetEntityIds()` on a DataViewCache object it will check if the data view is persisted and pull values from the persisted values if it can just like `GetQuery()` will. However, it will also cache those values in memory. So the next time somebody calls `GetEntityIds()` it just immediately returns the in-memory set of identifiers without ever touching the database.

This means the call on line 2 causes no database hits and returns in microseconds. The call chain on lines 3 through 5 also do not hit the database which means even with hundreds of values to check, it also completes in microseconds.

So while our original code above using `GetQuery()` probably took 7-9 milliseconds, the new code using `GetEntityIds()` is probably closer to 0.02 milliseconds.

---

## Extending Communication Transports {#extending-communication-transports}

## SMS Transports

In Rock v12.1, we’ve added the `ISmsPipelineWebhook` interface that will let you identify the location of any corresponding webhook. The `SmsPipelineWebhookPath` property will be used by the SMS Pipeline block to display the full URL to the webhook which is useful when administrators are setting up the interface with the remote service.

---

## JavaScript and Partial Postbacks {#javascript-and-partial-postbacks}

There can be some confusion over when to use `$(document).ready()` vs `pageLoad()` vs `add_init()` in JavaScript. It really depends on the situation. The following summary from [this old article](https://web.archive.org/web/20161025081657/http://encosia.com/document-ready-and-pageload-are-not-the-same/) should help. If you need more details see [this MSDN article](https://docs.microsoft.com/en-us/previous-versions/aspnet/bb386417\(v=vs.100\)) on AJAX Client Life-Cycle Events.

Caution

This information applies only to the Webforms parts of Rock and should be considered legacy/obsoleted.  The Obsidian framework in Rock does not use or rely on jQuery or the Asp.NET lifecycle.

## Using $(document).ready()

- Ideal for one-time initialization.
- Optimization black magic; may run slightly earlier than pageLoad().
- Does not re-attach functionality to elements affected by partial postbacks.

## Using pageLoad()

- Unsuitable for one-time initialization if used with UpdatePanels.
- Slightly less optimized in some browsers, but consistent.
- Perfect for re-attaching functionality to elements within UpdatePanels.

## Using Sys.Application.add\_init( function(){} )

- Useful for one-time initialization if only ASP.NET AJAX is available.
- More work is required to wire the event up.
- Exposes you to the “sys is undefined” error if you aren’t careful.

`app.add_load(ApplicationLoad);`

`app.add_init(ApplicationInit);`

---

## Currency {#currency}

Rock supports a single currency and that currency should be set via the “Organization Currency Code” Global Attribute.

![](https://community.rockrms.com/GetImage.ashx?Id=66727)

This attribute tells the system that all currency values are in this currency. If you change this currency the values will **NOT** get updated. Rock will just display the new currency symbol and format.

Rock has been updated to support payment gateways which support multiple currencies. These gateways are responsible for calculating the value that should be stored in Rock. For example if the user is giving in Euro, and the Organization’s Rock Instance is using USD, it is the responsibility of the gateway to convert Euro to USD and return the USD value which will get saved to Rock.In this case, Rock will display both the Euro and USD value, but only the USD value with be used for calculations.

## Usage in Data Model

Although only one special gateway currently handles transactions in foreign currencies, when a transaction is created which has a foreign currency associated with it, the gateway will:

- Store the foreign currency ‘code’ (from the Currency Code defined type) into the `FinancialTransaction.ForeignCurrencyCodeValueId` property.
- Store the foreign currency amount into the corresponding `FinancialTransactionDetail.``*ForeignCurrencyAmount*`property.
- Store the Organization’s currency (typically USD) amount into the corresponding `FinancialTransactionDetail.Amount` property.

For a *scheduled* transaction (i.e. recurring gift) of a foreign currency, it is handled a bit differently. This is because the exact amount of the individual’s foreign currency can only be converted to the organization’s currency amount at the time of the actual transaction. That is because foreign exchange rates are always changing. Therefore, when a *scheduled* transaction is created which has a foreign currency associated with it, the gateway will:

- Store the foreign currency ‘code’ (from the Currency Code defined type) into the `FinancialScheduledTransaction.ForeignCurrencyCodeValueId` property.
- Store the foreign currency amount into the corresponding `FinancialScheduledTransactionDetail.``*Amount*`property.

Again, until an actual financial transaction occurs for that scheduled-transaction, it is not possible to know the non-foreign currency (USD) value. However once it occurs, the transaction should be recorded as described in the section above.

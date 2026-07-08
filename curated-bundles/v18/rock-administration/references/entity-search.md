---
description: "Use when configuring reusable Entity Search queries in Rock to fetch data via API v2, Lava Entity Commands, or custom payloads without writing SQL"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Entity Search

Entity Search

*Entity Search* makes querying Rock feel less like writing code and more like getting answers. With just a few simple expressions, you can refine and fetch exactly the data you need, right when you need it.

When you're building custom tools, *Entity Search* gives you a flexible way to work with Rock records—no SQL required. You can use the Searches you write with API v2 or even Entity Commands in Lava. We'll explore both options in a bit.

To add an *Entity Search*, navigate to Admin Tools \> Settings \> Entity Search.

![Entity Search list displaying existing saved entity search queries](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/Entity-Search-v18.png)

Entity Search List

To add a new *Entity Search*, press .

![Detailed configuration screen for a saved entity search](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/entity-search-detail-v18.png)

Entity Search Detail

Make sure to click Save once you are done, and you have a Search that is ready for API v2 usage!

Our *Entity Search* uses Language Integrated Queries—also known as LINQ—a way to query data in the programming language C#. More on how to use LINQ on our [Dynamic LINQ syntax](https://community.rockrms.com/developer/dynamic-linq-syntax).

If your expression is accurate, it will display JSON data when you select .

![Preview of search results showing JSON data for Decker Family group](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/Preview-Search-Results-v18.png)

Preview Results

When you create a search query, you can configure its security by pressing .

![Security settings for an entity search showing permissions](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/Secure-Entity-Search-v18.png)

Secure Entity Search

By default, only View permissions are given to all users. To use this query in an API call or *Entity Search*, you must give Execute permissions.

# Reuse Searches with *Entity Search*

Define your search once using *Entity Search* and reuse it across Rock with the `entitysearch` parameter. It keeps your Lava cleaner, your logic centralized, and your filters consistent. You can still customize results with expressions or parameters like `groupby`, `select`, and `sort`.

For more on using an *Entity Search* query with Lava, see the Lava Docs on [Entity Commands](https://community.rockrms.com/lava/commands/entity-commands).

## Extend Entity Search with Payloads

Once you've created an *Entity Search* in Rock, you've built a reusable query that refines and retrieves data. But sometimes, the built-in UI options don't give you quite enough flexibility.

That's where *payloads* come in.

A payload is a block of JSON you can attach to a request to customize how your *Entity Search* behaves. Instead of replacing your query, the payload lets you refine, override, or extend it—just for that specific use case.

### Example: Simple Filter and Select

```
{
  "where": "id < 10"
  "select": "new (Id, Guid, Name, GroupType.Name as Type)",
  "order": "id, name desc, type.name",
  "skip": 2,
  "take": 1
}
```
- **Filter**: Include only items where `Id < 10`.
- **Select Fields**:
	- `Id`
		- `Guid`
		- `Name`
		- `GroupType.Name` (renamed to `Type`)
- **Sort** the results by:
	- `Id` in *ascending* order
		- `Name` in *descending* order
		- `GroupType.Name` in *ascending* order
- **Skip** the first `2` items after sorting.
- **Take** only `1` item from the remaining results.
```
{
  "id": 2,
  "guid": "628c51a8-4613-43ed-a18d-4a6fb999273e",
  "name": "RSR - Rock Administration",
  "type": "Security Role"
}
```

### Example: Group and Count

```
{
  "where": "GroupTypeId == 1 || GroupTypeId == 10",
  "groupby": "new (GroupTypeId, GroupType.Name)",
  "select": "new { Key.GroupTypeId, Key.Name, Count() as Total }",
  "order": "Total desc",
  "skip": 0,
  "take": 10
}
```

**What it does:**

- Filter the `Group` records where `GroupTypeId` is `1` or `10`.
- Group the filtered records by:
	- `GroupTypeId`
		- `GroupType.Name`
- Select the grouped values:
	- `GroupTypeId`
		- `GroupType.Name`
- Attempt to sort the results by `Total` in *descending* order.
- Skip the first `0` records (i.e., start at the top).
- Take the first `10` results after sorting.
```
{
  "count": 2,
  "items": [
    {
      "groupTypeId": 1,
      "name": "Security Role",
      "total": 25
    },
    {
      "groupTypeId": 10,
      "name": "Family",
      "total": 42
    }
  ]
}
```

### Unique Payload Properties:

| Field | Description |
| --- | --- |
| `take` | Maximum number of results to return |
| `skip` | How many results to skip (for paging) |

## Use Entity Search With the v2 API

You can find all entities with available REST endpoints in the API v2 Docs, located at Admin Tools \> Settings \> API v2 Docs. These endpoints can be used with your custom code.

![API v2 documentation interface with execution and response preview](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/Rock-Rest-API-v2-v17.png)

API v2 Execution

To try an operation that uses a SearchKey—such as a `GET` or `POST`—this is what you will do:

1. Find the endpoint for your created *SearchKey*—in this case we are using Groups.
2. Click on a statement that has `{searchKey}` appended to the end of the method.
3. Click Try it Out.
4. Type in the key created for your *SearchKey*.
5. Click Execute.
6. You should see an output in the Response Body reflecting your search query.

# Match Your Endpoint and Entity

Be sure the endpoint you’re using exactly matches the Entity Type you set when configuring *Entity Search*. A mismatch here can cause unexpected results.


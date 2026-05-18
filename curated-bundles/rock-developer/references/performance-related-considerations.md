---
description: "Use when optimizing Rock code performance, leveraging caches to reduce database queries, or improving LINQ query efficiency"
source: "https://community.rockrms.com/developer/303---blast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

Performance is usually something we don’t consider too much until it becomes a problem. The programming mantra “Make it work, then make it right, then make it fast” applies to most of us. The next few sections walk through a few areas where you might be able to find a good balance between learning to write code that is functional and fast at the same time.

## Rock Cache

Rock ships with a whole host of cached models that can be leveraged to really increase the performance of your code. The basic operations of reading from cache are pretty simple:

**Reading by Id**

```
var definedTypeCache = DefinedTypeCache.Read( definedTypeId );
```

**Reading by Guid**

This is especially useful when for loading things using the Rock.SystemGuid class constants:

```
var definedTypeCache = DefinedTypeCache.Read( definedTypeGuid );
```

**Loading All**

Not every cached item has an All() method but in most situations it exists where it makes sense. For example if you need to load all campuses or all defined types, the all method exists:

```
List<CampusCache> campuses = CampusCache.All();
```

**Leveraging Cache**

Cache is something that is easy to remember to use when it’s an obvious situation. Things like defined types or values, campuses, entity types, and global attributes are no-brainers when it comes to loading from cache. It becomes harder to really know how to use cache when you are in other less common situations.

A good example of this is using SystemGuid values to query the database directly rather than using the guid to look up the item in cache first, then query the database. This saves an entire join in the underlying SQL of a Linq query which can pay huge dividends if you are in a loop or if you are writing code that will be executed over and over again:

**Before:**

This example seems pretty simple and it hardly seems worth changing. In test environments this runs very quickly (around 56 ms):

```
var families = peopleInGroup.SelectMany(
        p => p.Members.Where(
        gm => gm.Group.GroupType.Guid == 
          new Guid( Rock.SystemGuid.GroupType.GROUPTYPE_FAMILY )
        )
    ).Select(gm => gm.Group).ToList();
```

**After:**

This only shaves about 10 ms off the overall time but if you were doing something like this in a loop, all those milliseconds add up!

```
var familyGroupType = GroupTypeCache.Read( Rock.SystemGuid.GroupType.GROUPTYPE_FAMILY );
var families = peopleInGroup.SelectMany(
        p => p.Members.Where(
        gm => gm.Group.GroupTypeId == familyGroupType.Id
     )
    ).Select( gm => gm.Group ).ToList();
```

## Using LINQ

A lot of performance issues when writing code for Rock can be traced back to poorly written code where it is usually easier (probably more logical) to fetch data from the database using the standard Rock Entity Framework services or model methods when it’s needed rather than pre-fetching data or writing more complex Linq queries to load the data. A deeper knowledge and comfort level with using Linq can really pay dividends in these situations.

## Read-Only RockContext

Rock can handle multiple connection strings for your database context. One option is to add an additional connection that is for read-only data. If your data is replicated to another instance that is up-to-date with your primary database context, you add the connection string to your web.config with the name “RockContextReadOnly”. You can use the RockContextReadOnly class as your context for data requests, since it is derived from the standard RockContext base class. The RockContextReadOnly class was designed to only get data, and will not allow you to save, delete, or insert. The class will throw exceptions if you attempt to do anything but retrieve. However if you do not have the correct read-only connection string configured, the class will default to retrieving data via your base RockContext connection.

## Avoiding SQL fetches in loops, row events, etc.

When inside a loop, avoid repeated LINQ queries. If you can fetch your data in one call, it will generally perform better.

Also, *never* reuse a RockContext inside a loop. In practice, each query will perform slower and slower with each loop. After about the 50-100 iterations, it will basically grind to a halt.

```
// This is BAD. Don't do this:
using ( var rockContext = new RockContext() )
{
    var serviceWrapper = new MyItemServiceWrapper( rockContext );
    foreach ( var item in items )
    {
        currentResults = ProcessItem( rockContext, serviceWrapper, ... );
    }
}
```

We know it seems counterintuitive, but fetch a new RockContext inside the loop wrapped in a `using` like this:

```
// This is better:
foreach ( var item in items )
{
    using ( var rockContext = new RockContext() )
    {
        var serviceWrapper = new MyItemServiceWrapper( rockContext );
        currentResults = ProcessItem( rockContext, serviceWrapper, settings, item, currentResults );
    }
}
```

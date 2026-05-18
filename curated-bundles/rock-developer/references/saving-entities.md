---
description: "Use when saving new or updated entities to Rock database, or handling entity relationships after save operations"
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

We're just guessing, but at some point you'll probably need to save an edited entity or add a new one back to the Rock database. The RockContext and the service classes we covered in the last chapter are used for doing this. It's pretty simple so we'll just illustrate with a couple of examples.

If you're updating an existing entity that you just fetched via a service method, all you need to do is call the `SaveChanges()` method on the rockContext you used to construct the service.

```
var rockContext = new RockContext();
var prayerRequestService = new PrayerRequestService( rockContext );

// Fetch an existing prayer request that has the given id
PrayerRequest prayerRequest = prayerRequestService.Get( prayerRequestId );

// Change the approved flag to true and then save it.
prayerRequest.IsApproved = true;
rockContext.SaveChanges();
```

If you're adding a new entity you just add it to the service method and then call the `SaveChanges()` method on the rockContext you used to contruct the service.

```
var rockContext = new RockContext();
var prayerRequestService = new PrayerRequestService( rockContext );

PrayerRequest prayerRequest = new PrayerRequest { 
    IsActive = true, 
    IsApproved = false, 
    AllowComments = false,
    EnteredDateTime = RockDateTime.Now,
    // ...
};
prayerRequestService.Add( prayerRequest );
rockContext.SaveChanges();
```

## Caution When Saving Then Attempting to View Entity Properties

When you save a new entity using the service layer, be aware that Entity Framework will not automatically hydrate the related entity properties unless you use a new service (with a new RockContext) to re-fetch the item.

For example, a PrayerRequest has a relationship to a Category entity. Consider the case when we're setting a new prayer request's category by setting it's `CategoryId` property and then saving it:

```
var rockContext = new RockContext();
var prayerRequestService = new PrayerRequestService ( rockContext );
PrayerRequest prayerRequest = new PrayerRequest { 
    CategoryId = 9,
    // ...
};
prayerRequestService.Add( prayerRequest );
rockContext.SaveChanges();
```

You might wish that the prayer request's Category property would now reflect the correct category entity, however it does not. It is null. Even if you try to load it again using the same service after saving it, it will be null:

```
// Does not work
prayerRequest = prayerRequestService.Get( prayerRequest.Id ); // Warning!
var category = prayerRequest.Category; // THIS IS NULL
```

Instead, you need to fetch the item using a new service if you need the updated property as a fully hydrated entity:

```
// Will work
prayerRequest = new PrayerRequestService( new RockContext() ).Get( prayerRequest.Id ); // Good.
var category = prayerRequest.Category; // Now it's there.
```

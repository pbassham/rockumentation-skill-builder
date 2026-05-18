---
description: "Use when implementing custom business logic, validation, or cascading deletes in Rock model classes using PreSaveChanges and PostSaveChanges hooks"
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

A well written framework is like a stream where the water flows smoothly downhill. Code is not repeated and much of the business and validation logic is provided for in the service layer. Let’s see how that can easily be accomplished in Rock.

Rock allows your models to respond to saves either before they take place in `PreSaveChanges()`or after in `PostSaveChanges()`. Let’s take a look at each and see some of the options of each.

## PreSaveChanges

PreSaveChanges is a great place to place logic to prep data from saving. It also allows you to handle cascading deletes when the model doesn’t handle them intrinsically. Below is an example of an override to the PreSaveChanges for a model. This code should be applied to your model class.

```
public override void PreSaveChanges( Rock.Data.DbContext dbContext, EntityState state )
{
    try
    {
        var rockContext = ( RockContext ) dbContext;

        switch ( state )
        {
            case EntityState.Added:
                {
                    break;
                }
            case EntityState.Modified:
                {
                    var changeEntry = dbContext.ChangeTracker.Entries<Group>().Where( a => a.Entity == this ).FirstOrDefault();
                    var origName = ( string ) changeEntry.OriginalValues["Name"];
                    var newName = ( string ) changeEntry.CurrentValues["Name"];
                    break;
                }
            case EntityState.Deleted:
                {
                    break;
                }
            case EntityState.Detached:
            case Entity.EntityState.Unchanged:
                {
                    break;
                }
        }
    }
    catch { }
}
```

## PostSaveChanges

PostSaveChanges get’s called after the save. This is a great to to do things like save details to history, create transactions to process other steps or makes API calls to update remote systems. It’s a lot like its PreSave brother, but at this point you don’t have access to the pre/post state of the values, just the current state of the model after the save.

```
public override void PostSaveChanges( Data.DbContext dbContext )
{
    try
    {
        var rockContext = ( RockContext ) dbContext;

        var id = this.Id;

        switch ( this.SaveState )
        {
            case System.Data.Entity.EntityState.Added:
                {
                    break;
                }
            case System.Data.Entity.EntityState.Modified:
                {
                    break;
                }
            case System.Data.Entity.EntityState.Deleted:
                {
                    break;
                }
            case System.Data.Entity.EntityState.Detached:
            case System.Data.Entity.EntityState.Unchanged:
                {
                    break;
                }
        }
    }
    catch { }

    base.PostSaveChanges( dbContext );
}
```

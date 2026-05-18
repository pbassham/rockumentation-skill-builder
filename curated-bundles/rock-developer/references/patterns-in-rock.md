---
description: "Use when implementing flexible, schema-agnostic data storage on Rock models that may evolve without database migrations"
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

# Additional Settings

Sometimes, models should store data whose structure might need to change over time, without the headache of having to constantly add new properties and schema changes. This is where the Additional Settings pattern shines.

Warning

Make sure you don't use this pattern unless authorized or instructed to do so; we don't want to bloat the database with non-indexable or difficult-to-query data. But when you've got the green light, here's how it's done.

You'll notice below that all of the Additional Settings members are decorated with the `[RockInternal]` attribute. This means they may change in the near term, and we have the freedom to change them as needed, without the risk of impacting plugin developers.

## Implement IHasAdditionalSettings Interface

The `Model` in question (i.e. Page, ContentChannelItem, Etc.) should implement this interface, which will require a `AdditionalSettingsJson` property to be added.

```
public partial class Page : Model<Page>, IOrdered, ICacheable, IHasAdditionalSettings
{
    ...
    
    /// <inheritdoc/>
    [RockInternal( "1.16.4" )]
    [DataMember]
    public string AdditionalSettingsJson { get; set; }
    
    ...
}
```

But you shouldn't interact with this property directly! We have helper methods for this, [detailed below](https://community.rockrms.com/developer/303---blast-off/patterns-in-rock#use-extension-methods-to-read-and-write-additional-settings).

## Implement IHasReadOnlyAdditionalSettings Interface (sometimes)

If the corresponding `ModelCache` needs to be able to access this additional settings data - but, of course, shouldn't be able to change the data - it should implement this second interface.

Rock's PageCache is a good example; we need to be able to quickly access a Page's additional settings data when writing Interactions, so the cache has been enhanced to read this data.

```
public class PageCache : ModelCache<PageCache, Page>, IHasReadOnlyAdditionalSettings
{
    ...

    /// <inheritdoc/>
    [RockInternal( "1.16.4" )]
    [DataMember]
    public string AdditionalSettingsJson { get; private set; }
    
    ...
    
    /// <summary>
    /// Gets the interaction intent defined value identifiers.
    /// </summary>
    /// <remarks>
    ///     <para>
    ///         <strong>This is an internal API</strong> that supports the Rock
    ///         infrastructure and not subject to the same compatibility standards
    ///         as public APIs. It may be changed or removed without notice in any
    ///         release and should therefore not be directly used in any plug-ins.
    ///     </para>
    /// </remarks>
    [RockInternal( "1.16.4" )]
    [DataMember]
    public List<int> InteractionIntentValueIds
    {
        get
        {
            if ( _interactionIntentValueIds == null )
            {
                var intentSettings = this.GetAdditionalSettings<PageService.IntentSettings>();

                _interactionIntentValueIds = intentSettings.InteractionIntentValueIds ?? new List<int>();
            }

            return _interactionIntentValueIds;
        }
    }

    private List<int> _interactionIntentValueIds;
    
    ...
}
```

Note that the `PageCache.InteractionIntentValueIds` property also takes further measures to ensure we only deserialize the additional settings data *once* and then store the deserialized value in a private backing field for subsequent reads. This is a cache object after all; it should provide *quick* access to this data.

## Use Extension Methods to Read and Write Additional Settings

Because the property is a JSON string, we shouldn't interact directly with it. Instead, we have a comprehensive set of helper methods to do this work in a consistent way. These extension methods operate against the interfaces described above, and live within the AdditionalSettingsExtensions class.

### Create a Settings POCO

The extension methods expect you to specify a simple object `Type` to serve as the structure of the settings object. While this object can live anywhere, a convenient place is within the model's service class.

For example, here is a POCO used to keep track of a Page's Interaction intent settings, stored within the [PageService.cs](https://github.com/SparkDevNetwork/Rock/blob/8a04c79ba2cbed3e729264bf7e9e4c235337c032/Rock/Model/CMS/Page/PageService.cs#L391) class file:

```
#region IHasAdditionalSettings Models

/// <summary>
/// Page intent settings.
/// </summary>
/// <remarks>
///     <para>
///         <strong>This is an internal API</strong> that supports the Rock
///         infrastructure and not subject to the same compatibility standards
///         as public APIs. It may be changed or removed without notice in any
///         release and should therefore not be directly used in any plug-ins.
///     </para>
/// </remarks>
[RockInternal( "1.16.4" )]
public class IntentSettings
{
    /// <summary>
    /// Interaction intent defined value identifiers.
    /// </summary>
    public List<int> InteractionIntentValueIds { get; set; }
}

#endregion IHasAdditionalSettings Models
```

### Use GetAdditionalSettings() to Read Existing Values

By simply calling this method with the `<TSettings>` POCO that represents the settings object in question, you'll get back a copy of the deserialized settings that are already stored in the database, or a new instance of the object for you to begin adding settings values as needed.

For example, the Page Properties block reads the Page's Interaction intent values in order to set those values within a Defined Value picker:

```
var intentSettings = page.GetAdditionalSettings<PageService.IntentSettings>();
if ( intentSettings.InteractionIntentValueIds?.Any() == true )
{
    dvpPageIntents.SetValues( intentSettings.InteractionIntentValueIds );
}
else
{
    dvpPageIntents.ClearSelection();
}
```

### Use SetAdditionalSettings() to Add or Change Values

No need to manually serialize your POCO; this method will do the heavy lifting for you. Simply provide the object containing the new or updated settings values, and it will be serialized into the `AdditionalSettingsJSON` property, ready to be saved to the database.

To complete our Page Properties block example, here are the Interaction intent settings being 1) once again retrieved, 2) updated, and 3) re-added to the Page model.

Because the `GetAdditionalSettings()` method will create and return a new instance of the POCO if one doesn't already exist within the serialized JSON, there is no need to perform a null check:

```
var intentSettings = page.GetAdditionalSettings<PageService.IntentSettings>();

var selectedIntentValueIds = dvpPageIntents.SelectedValuesAsInt;
intentSettings.InteractionIntentValueIds = selectedIntentValueIds;

page.SetAdditionalSettings( intentSettings );
```

### Be Sure to Call RockContext.SaveChanges()

While the `SetAdditionalSettings()` method will, indeed, serialize and set the values on the model instance, it's up to you to save those changes to the database, just like any other changes you make to a given model.

---

## Appendix - Developer Environment, Upgrading Your Rockit SDK {#appendix---developer-environment-upgrading-yo}

## The Hard Way

It is possible to use the standard RockUpdate block to update your Rockit SDK, but you will need to jump through a few hoops because Visual Studio can lock files that will prevent the RockUpdate block from working correctly.

*Get Daniel’s notes and add them here.*

## The Other Hard Way

*Find the other person who described another way to do it...*

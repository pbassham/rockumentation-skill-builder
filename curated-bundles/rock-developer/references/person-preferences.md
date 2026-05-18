---
description: "Use when implementing user preference storage and retrieval for blocks, such as remembering filter, sort, or display settings per person"
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Want to delight the individuals using your block? Save their preference the first time you ask for it. The Rock framework has a mechanism for storing and retrieving preferences (or settings) for the currently logged in person or tracked visitor. For example, let's say your block has options for sorting or filtering, and you'd like to "remember" how the user set them each time they use the block. This is an ideal case for setting and getting Person Preferences.

Preferences are not limited to just blocks. You can associate preferences with any entity in Rock. There are also "global" preferences. These are still unique to each person, but they are not attached to any specific entity. Global preferences make a good place to store information that should be shared between many different blocks.

For consistency and future compatibility, keys should be in kebab case. Meaning `grid-page-size-preference` instead of `GridPageSizePreference`.

## Accessing Preferences

Accessing preferences is handled by an instance of PersonPreferenceCollection. You don't need to create this yourself, it will be handled automatically by the RockBlock base class.

### GetBlockPersonPreferences()

This is the method you will probably use most to access person preferences. It will return a collection configured to store your preferences on the specific block.

There might be cases where you want preferences to be shared between all instances of your block. This method will do that for you. The preference collection that is returned will be scoped to the BlockType.Id for you. This means different instances of the same block will be accessing the same preference collection.

You can also store preferences globally. They are still unique to the person, but they are not attached to any specific block or entity. These can be useful if you have a preference that needs to be shared between different block types. When using global preferences remember that other developers might be storing data here too so ensure your keys are unique.

If you need to attach preferences to some other entity (rare) you can use this method to scope those preferences to any entity in the system. In fact, if you call this method and pass in the block instance, it is the same as calling GetBlockPersonPreferences(). When using preferences returned by this method remember to make the keys unique. Other developers might be storing preferences on these entities too.

## Person Preference Collection

Once you have your preference collection, all you need to do is call the methods below to access and update the values.

### SetValue( string key, string value )

Use this to store a setting value for a given key.

In this example you can see the Rock:Grid saving a collection of the current block's filter preferences previously stored for the current user. This preference is specific to the person as well as scoped to the current block instance.

```
int pageSize;
// ...
var preferences = GetBlockPersonPreferences();
preferences.SetValue( "grid-page-size-preference", pageSize.ToString() );
preferences.Save();
```

A person's individual preference setting can be retrieved using the `GetValue( string )` method. Here we see the preferred page size setting being fetched. Now the Rock:Grid will automatically reselect the last page size the person had selected.

```
// grid-page-size-preference will come from the block instance.
var preferences = GetBlockPersonPreferences();
string pageSize = preferences.GetValue( "grid-page-size-preference" );
```

In another example, we see a block retrieving a *global* preference setting. This would be an example of a preference value that we want to apply to all blocks across the entire system.

```
// default-grid-page-size will come from the individual's global preferences.
var preferences = GetGlobalPersonPreferences();
string defaultPageSize = preferences.GetValue( "default-grid-page-size" );
```

Save the preference values that have been modified by previously calling `SetValue( string key, string value )`. You don't need to worry about tracking if the value actually changed. That is all done automatically for you. If nothing has changed then `Save()` won't do anything.

This allows you to set a number of preference values and then save them all at once. Otherwise, you would be generating a database call each time you call `SetValue( string key, string value )`.

In this example you can see the Rock:Grid saving multiple preference values at once.

```
int pageSize;
bool showDescription;
// ...
var preferences = GetBlockPersonPreferences();
preferences.SetValue( "grid-page-size-preference", pageSize.ToString() );
preferences.SetValue( "grid-show-description", showDescription.ToString() );
preferences.Save();
```

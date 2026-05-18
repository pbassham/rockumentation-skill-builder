---
description: Use when building universal field types for Rock that work across UI frameworks without WebForms dependencies
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

The current (legacy) field types are all tightly integrated with WebForms. This has made converting them to Obsidian a real chore. So we knew we needed to come up with a new pattern so that we don't have to go through this again in the future.

What we have landed on is a concept called "Universal Field Types". We call then "universal" because they are meant to work on any UI framework or platform without requiring any code changes to the field types. How this was achieved was to remove all UI functionality from the field type C# file.

So with a Universal Field Type, you only work with pure data and logic. No UI. If you want to allow the user to pick an item from a list of items, you simply return the items as JSON objects and the UI framework will handle displaying and selecting those items.

This means, as a field type developer, you lose some customization that could be performed. But it also means the field type is now far simpler to build since you don't need to worry about creating the UI. Another benefit is that filtering is automatically supported. And finally, these field types will work on any platform with any UI framework that Rock decides to support field types on. Meaning, when the next-next-generation UI for Rock comes along in 10-15 years, as a plugin author (and any core field types using this pattern) nothing has to be done to make the field type supported.

## Types of Fields

Okay, so what types of fields can be created since you don't have control of the UI? Currently there are three basic types:

1. Item Picker
2. Tree Item Picker
3. Search Picker

### Item Picker

The item picker comes in a few flavors depending on how you configure it (by way of overriding base methods and properties). You can choose to have it displayed as either a drop down list or a longer list of items. Both come in single select and multi-select variants. Meaning, if you choose a "list" of items, it will display as either a list of radio buttons or a list of check-boxes.

![Radio button list](https://community.rockrms.com/GetImage.ashx?Id=66787)

![Checkbox list](https://community.rockrms.com/GetImage.ashx?Id=66788)

![Single Select Drop Down](https://community.rockrms.com/GetImage.ashx?Id=66789)

![Multi-Select Drop Down](https://community.rockrms.com/GetImage.ashx?Id=66790)

To create one, let's take a look at the general structure with the methods and properties you are most likely to override.

```
[FieldTypeGuid( "ce7da41c-d39a-4e80-a441-ea113b45db16" )]
public class TestFieldType : UniversalItemPickerFieldType
{
    protected override bool IsMultipleSelection => false;
    
    protected override UniversalItemValuePickerDisplayStyle GetDisplayStyle(
        Dictionary<string, string> privateConfigurationValues );
    
    protected override List<ListItemBag> GetListItems(
        Dictionary<string, string> privateConfigurationValues );
    
    protected override List<ListItemBag> GetItemBags(
        IEnumerable<string> values,
        Dictionary<string, string> privateConfigurationValues );
}
```

There are a few other things you can override, but this is enough to make a fully functional field type.

On line 4 we have the property `IsMultipleSelection`, which lets us tell the framework if this field type is a single selection or multi-selection type.

Next on lines 6 and 7 we have the method `GetDisplayStyle`. This returns an enum with 3 options: `Auto`, `List`, `Condensed`. The last two options will show your items as either a checkbox/radio list or as a drop down list. The first options, which is the default, leaves it up to the UI framework to decide. For example, on the web it might decide to display as a list of radio buttons. But on the Mobile Shell it might decide a condensed (drop down list) representation is better due to limited space.

Next we have `GetListItems` on lines 9 and 10. This method should return the items you want available in the UI while in edit mode. i.e. the items that make up the drop down list contents or radio buttons.

Finally on lines 12-14 we have the method `GetItemBags`. If `GetListItems` is called when in Edit mode, `GetItemBags` is what is called when in View mode. It is passed the currently selected values and you need to return the item bags that represent those items. That is, the text strings to display.

Okay. So the first two things really aren't needed unless we want to override them. So lets take a look at an entire item picker field type that will be in `Auto` mode and only allow single selection.

```
[FieldTypeGuid( "ce7da41c-d39a-4e80-a441-ea113b45db16" )]
public class TestFieldType : UniversalItemPickerFieldType
{
    protected override List<ListItemBag> GetListItems(
        Dictionary<string, string> privateConfigurationValues )
    {
        using ( var rockContext = new RockContext() )
        {
            return new CampusService( rockContext ).Queryable()
                .Select( c => new ListItemBag
                {
                    Value = c.Guid.ToString(),
                    Text = c.Name
                } )
                .ToList();
        }
    }
    
    protected override List<ListItemBag> GetItemBags(
        IEnumerable<string> values,
        Dictionary<string, string> privateConfigurationValues )
    {
            return new CampusService( rockContext ).Queryable()
                .Where( c => values.Contains( c.Guid.ToString() ) )
                .Select( c => new ListItemBag
                {
                    Value = c.Guid.ToString(),
                    Text = c.Name
                } )
                .ToList();
    }
}
```

That is all the code you would need to write to make your field type work. This will automatically work in Data View filtering as well.

### Tree Item Picker

The tree item picker is actually extremely simple to implement as far as the field type code goes. It does come in two flavors: a single select and a multi-select variant.

![Tree Item Picker](https://community.rockrms.com/GetImage.ashx?Id=67341)

To create one, let's take a look at the general structure with the methods and properties you are most likely to override.

```
[FieldTypeGuid( "ce7da41c-d39a-4e80-a441-ea113b45db16" )]
public class TestFieldType : UniversalItemTreePickerFieldType
{
    protected override bool IsMultipleSelection => false;
    
    protected override string GetRootRestUrl(
        Dictionary<string, string> privateConfigurationValues );
    
    protected override List<ListItemBag> GetItemBags(
        IEnumerable<string> values,
        Dictionary<string, string> privateConfigurationValues );
}
```

On line 4 we have the property `IsMultipleSelection`, which lets us tell the framework if this field type is a single selection or multi-selection type.

Lines 6 and 7 contain the `GetRootRestUrl` method. This method will return the URL of the API to call to retrieve the items for the tree picker.

Finally on lines 12-14 we have the method `GetItemBags`. It is passed the currently selected values and you need to return the item bags that represent those items. That is, the text strings to display.

Assuming we are creating a single selection field type, our full field type code might look like this:

```
[FieldTypeGuid( "ce7da41c-d39a-4e80-a441-ea113b45db16" )]
public class TestFieldType : UniversalItemTreePickerFieldType
{
    protected override string GetRootRestUrl(
        Dictionary<string, string> privateConfigurationValues )
    {
        return "/api/v2/plugins/com.myorganization/models/widgets/tree";
    }
    
    protected override List<ListItemBag> GetItemBags(
        IEnumerable<string> values,
        Dictionary<string, string> privateConfigurationValues )
    {
        return new LocationService( rockContext ).Queryable()
            .Where( l => values.Contains( l.Guid.ToString() )
            .Select( l => new ListItemBag
            {
                Value = l.Guid.ToString(),
                Text = l.Name
            } )
            .ToList();
    }
}
```

So that is pretty simple. But obviously we need to implement our API handler, so we'll take a look at that next.

```
[HttpPost]
[Route( "api/v2/plugins/com.myorganization/models/widgets/tree" )]
[RestActionGuid( "eb007a09-7a4e-4773-bd5a-729c8fc61e93" )]
public IHttpActionResult PostTreeItems(
    [FromBody] UniversalItemTreePickerOptionsBag options )
{
    using ( var rockContext = new RockContext() )
    {
        var locationService = new LocationService( rockContext );
        var expandGuids = GetExpandGuids( locationService,
            options.ExpandToValues?.AsGuidList() );
        var locations = LoadLocations( locationService,
            options.ParentValue.AsGuidOrNull(),
            expandGuids );
        
        return Ok( locations );
    }
}

private List<Guid> GetExpandGuids( LocationService locationService,
    List<Guid> expandToGuids );
    
private List<TreeItemBag> LoadLocations( LocationService locationService,
    Guid? parentGuid,
    List<Guid> expandGuids );
```

So first of all, on line 1 you can see that this is a POST request. This is also why we have the `[FromBody]` attribute on line 5, because the data from the UI control is sent in the body of the POST request.

Next on line 2 you will see our new pattern for API endpoints for plugins. This new pattern is described in more detail elsewhere, but basically it comes down to 2 things that must be followed:

1. Use the `api/v2/` prefix. This causes responses to be `camelCase` encoded instead of `PascalCase` which is required by the new UI components - as that is the normal naming convention for JavaScript.
2. Use the `plugins` path segment next, followed by your organization code. This helps ensure we will never have naming conflicts. We suggest you follow the full pattern so that you match the new core API endpoints, but after the organization path segment you can kind of do whatever you want.

Alright. So our main API endpoint method is basically doing 2 things:

First it calls `GetExpandGuids` to do something. The tree picker may need your code to automatically expand certain nodes so that specific descendant nodes can be made visible immediately. One example of this is editing an existing value. You don't want the currently selected values to be collapsed because otherwise the user wouldn't know what is currently selected. So this method will take the guids of the items that *need to made visible* and then translate those into the guids of all ancestor nodes that need to be automatically expanded.

The second thing this API endpoint does is call `LoadLocations`. This, as you can imagine, actually performs the loading of the items. You will see shortly why this must be its own method rather than just coded directly in the endpoint method.

So lets take a look at the `GetExpandGuids` first to see what it does.

```
private List<Guid> GetExpandGuids( LocationService locationService,
    List<Guid> expandToGuids )
{
    var expandGuids = new List<Guid>();
    
    if ( expandToGuids == null )
    {
        return expandGuids;
    }
    
    foreach ( var guid in expandToGuids )
    {
        var location = locationService.Get( guid )?.ParentLocation;
        
        while ( location != null )
        {
            if ( !expandGuids.Contains( location.Guid ) )
            {
                expandGuids.Add( location.Guid );
            }
            
            location = location.ParentLocation;
        }
    }
    
    return expandGuids;
}
```

This method should be fairly understandable. We basically loop over each guid that needs to be automatically visible (meaning, all ancestors must be expanded). Then we walk up the tree of ancestors and add those guids to a list of guids to be expanded.

Next we need to load the locations.

```
private List<TreeItemBag> LoadLocations( LocationService locationService,
    Guid? parentGuid,
    List<Guid> expandGuids )
{
    var locationQry = locationService.Queryable()
        .Where( l => l.Name != null && l.Name != string.Empty )
        .Where( l =>
            (
                parentGuid.HasValue
                && l.ParentLocation.Guid == parentGuid.Value
            )
            || (!parentGuid.HasValue && !l.ParentLocationId.HasValue ) );
    
    var items = new List<TreeItemBag>();
    
    foreach ( var location in locationQry )
    {
        var item = new TreeItemBag
        {
            Value = location.Guid.ToString(),
            Text = location.Name,
            IsFolder = true,
            IsActive = location.IsActive,
            HasChildren = location.ChildLocations.Any()
        };
        
        if ( expandGuids.Contains( location.Guid ) )
        {
            item.Children = LoadLocations( locationService,
                location.Guid,
                expandGuids );
        }
        
        items.Add( item );
    }
    
    return items;
}
```

This one has a little more going on, but it's actually simpler than it looks. We'll start with that where clause. The first `Where` clause on line 6 makes sure we only include named locations, which has specific meaning in Rock. The second `Where` clause on lines 7-12 looks gnarly, but is pretty simple. Essentially, if we have a `parentGuid` value, then we only want to return locations with a matching parent location. Otherwise, if we don't have a `parentGuid` value, then we only want to return "root" locations with no parent.

Now further down into our `TreeItemBag` that we create we set the expected `Value` and `Text` properties. We also set `IsActive` to match the status of the location.

The `IsFolder` property on line 22 has some specific meaning in certain situations, which currently don't apply to what we are doing here. But it is still best to follow best practice. Essentially this property means "is it physically possible for this node to contain children". In our case, a location can always possibly have children so we just set it to `true`. In the case of say a categorized Data View picker, you would only set the Category nodes to `true` and the Data View nodes to `false`.

Then the `HasChildren` property on line 24 just means "does this node *currently* have children".

Now, back to the idea of auto-expanding nodes. Lines 27 - 32 handle this. If this location guid is one of the ones that needs to be auto-expanded, we recursively call back int ourselves and load the child locations and place them into the `Children` property. This is also why this method must be a standalone method and not made part of the main API endpoint method.

That's it. That was a little more work than a simple item picker field type, but still incredibly simple. It took just about 100 lines of code across both the field type and REST API endpoint to fully build a tree item picker field type. And once again, filtering is automatically functional when used in a Data View.

## Search Field

The search field type comes in a single flavor. There is no multi-select feature for it.

![](https://community.rockrms.com/GetImage.ashx?Id=66791)

Before we get into the code, lets inspect what those search results look like. As you can see, this looks like the Person Picker that has been in Rock for years. Functionally, this works very similar. The big difference is that while the Person Picker API endpoint returned HTML to build the UI, the search field type API endpoint returns a JSON object that *describes* the search result. Then the framework builds the UI for you.

First up, we have the name "Main Campus". Just below that is an optional description. This can be rather lengthy if you need it. Making it too long won't break the UI, but your users may just feel overwhelmed and say "I don't know how to use this".

To the right of the name, we have optional labels. In web, these are basically bootstrap labels. You want to limit these to one, or maybe two if they are one-word labels. You get control of the coloring used (such as "info" in the sample above).

Finally, below the name and description we have additional details. These are also optional. You can have as many of these as you want, but again your users might feel overwhelmed. These come as an ordered key-value pair.

Because this one is so simple in the field type code, we're just going to jump straight to what the full class code looks like.

```
[FieldTypeGuid( "ff3cfe56-1808-4f61-b57e-3844be3e3042" )]
public class TestFieldType : UniversalItemSearchPickerFieldType
{
    protected override List<ListItemBag> GetItemBags(
        IEnumerable<string> values,
        Dictionary<string, string> privateConfigurationValues )
    {
        return new CampusService( rockContext ).Queryable()
            .Where( c => values.Contains( c.Guid.ToString() )
            .Select( c => new ListItemBag
            {
                Value = c.Guid.ToString(),
                Text = c.Name
            } )
            .ToList();
    }
    
    protected override GetSearchUrl(
        Dictionary<string, string, privateConfigurationValues )
    {
        return "/api/v2/plugins/com.myorganization/models/widgets/search";
    }
}
```

Alright. So if you have been reading this whole article in order, by now the `GetItemBags` method on lines 4 - 16 looks pretty similar. It is passed the currently selected values and you need to return the item bags that represent those items. That is, the text strings to display.

Next we have the `GetSearchUrl` method on lines 18 - 22. This simply returns the API endpoint to be called whenever the user types something in the search field. So lets jump into the code for that endpoint.

```
[HttpPost]
[Route( "api/v2/plugins/com.myorganization/models/widgets/search" )]
[RestActionGuid( "131fb70d-6970-4370-a993-a00cf71367a5" )]
public IHttpActionResult PostSearchItems(
    [FromBody] UniversalItemSearchPickerOptionsBag options )
{
    using ( var rockContext = new RockContext() )
    {
        var campuses = new CampusService( rockContext ).Queryable()
            .Where( c => c.Name.Contains( options.Value ) )
            .ToList()
            .Select( c =>
            {
                var item = new UniversalItemSearchPickerItemBag
                {
                    Value = c.Guid.ToString(),
                    Title = c.Name,
                    Description = c.Description,
                    Details = new List<ListItemBag>(),
                    Labels = new List<ListItemBag>()
                };
                
                item.Details.Add( new ListItemBag
                {
                    Value = "Status",
                    Text = c.CampusStatusValue.Value
                };
                
                item.Labels.Add( new ListItemBag
                {
                    Value = "info",
                    Text = c.CampusTypeValue.Value
                } );
                
                return item;
            } )
            .ToList();
        
        return Ok( campuses );
    }
}
```

So first of all, on line 1 you can see that this is a POST request. This is also why we have the `[FromBody]` attribute on line 5, because the data from the UI control is sent in the body of the POST request.

Next on line 2 you will see our new pattern for API endpoints for plugins. If you don't know what we mean by this, please see the description of the API route for the Tree Item Picker above.

Okay, so `options` contains a few things but the most important is the search `Value`. This is what has been typed in the search box. Our filtering in the `Where` clause on line 10 is pretty basic. We just want all campuses whose name is a partial match for the search value.

Next you will see something a little strange on line 11. We call `ToList()` before we call `Select()`. This is a bit unusual, but is because we need to process these items with LINQ to objects instead of LINQ to SQL. In other words, the code inside the `Select()` on lines 12 - 36 can't be converted to SQL so first we move all the campus objects into memory.

Inside our `Select()` statement, we first create an instance of `UniversalItemSearchPickerItemBag` to represent a single item in the search results. You can find more details about the properties above, or in the XML documentation. After that we add a single detail and a single label.

The detail item is pretty self explanatory if you compare it to the image sample above. The label gets a small amount of explanation. The text to display in the label is of course stored in the `Text` property. The `Value` property describes the type of label to display. This follows the standard bootstrap label types available in Rock: `info`, `success`, `warning`, `danger`, and `primary`.

What all this means, is that while you don't get to paint the UI yourself, you still get pretty good ability to customize how the results look. By adding labels and details you can provide the context required to help your users find the right items.

## Configuration

We mentioned above that these new field types do not allow you to interact with the UI directly. You simply pass data down to the framework and it decides how to paint the UI. If you've been reading through this from top to bottom you might be wondering how you are supposed to provide that configuration UI. You know, the one that shows up when configuring an Attribute to use your custom field type.

Well this is actually extremely simple. So simple in fact, that we had a bit of a facepalm moment about why we never did this years ago.

While a custom block type does allow you to provide a custom configuration UI, very few blocks need to take advantage of this because there is another way to create that UI. By adding C# attributes that describe what configuration options are available. In other words, you can simply do something like this in your universal field type.

```
[FieldTypeGuid( "d79f1ea2-c768-4df2-8ff6-b72f0770090d" )]
[BooleanField( "Include Inactive",
    Description = "Include inactive campuses.",
    DefaultBooleanValue = true,
    Key = "IncludeInactive",
    Order = 0 )]
public class TestFieldType : UniversalItemPickerFieldType
{
    protected override List<ListItemBag> GetListItems(
        Dictionary<string, string> privateConfigurationValues )
    {
        var includeInactive = privateConfigurationValues
            .GetValueOrDefault( "IncludeInactive", string.Empty )
            .AsBoolean();

        using ( var rockContext = new RockContext() )
        {
            var campusQry = new CampusService( rockContext ).Queryable();
            
            if ( !includeInactive )
            {
                campusQry = campusQry.Where( c => c.IsActive );
            }
            
            return campusQry
                .Select( c => new ListItemBag
                {
                    Value = c.Guid.ToString(),
                    Text = c.Name
                } )
                .ToList();
        }
    }
}
```

On lines 2 - 6 we define a configuration value we want to show on the UI, "Include Inactive". Then on lines 12 - 14 we read that value and convert it to a boolean. Finally, on lines 20 - 23 we update the query to exclude inactive campuses if that configuration value hasn't been enabled.

There are some drawbacks, such as if you need to further customize the UI by dynamically showing and hiding configuration options you are out of luck. But that is a fairly uncommon thing that field types do. And the few times they do it, even core field types, we really could get away with just having all of them show and using the help text (Description property) state that it is only effective when some other configuration value is set a certain way.

The upside, is we just removed about 100 lines of code. And quite a bit more if you have more than one configuration option. Additionally, now you have a fully functional field type, including data view filtering support and configuration options and when the next UI framework comes along (or some new platform we add), you don't have to do a single thing to be supported.

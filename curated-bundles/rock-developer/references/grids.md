---
description: "Use when implementing or configuring a Grid control in Obsidian to display, filter, sort, and paginate tabular data"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

The Grid control in Obsidian is essentially an HTML table on steroids. It displays data in columns that you define just like a table, but it also handles all the bonus features like paging, filtering, exporting and much more.

The grid in Obsidian is designed to do client-side filtering and sorting. This means all the data must be sent down at once. So if you have a grid of 10,000 rows with paging set to 500, you aren't just dealing with 500 rows. All 10,000 rows must be sent down to the browser before anything will render. This provides near-realtime filtering and sorting capabilities without having to wait for a page reload.

Note

This is not meant to be an API reference that discusses every option. Look at the source code and the in-line documentation for that. We just want to give you an overview of how it works and how to give it data.

## Grid Pieces

To simplify things, we are going to say that a Grid is composed of four main pieces.

1. The grid state.
2. The Grid component itself.
3. The column definitions.
4. The row data.

## Grid State

This is an internal piece of the "grid". It handles things like:

- Caching of data.
- Tracking column definitions.
- Tracking row data.
- Filtering row data.
- Sorting row data.
- Row selection.

We aren't going to go into depth on all of this, but suffice to say the bulk logic of a grid is handled by this grid state class.

## Grid Component

The UI component handles pretty much anything UI related to a grid. Such as displaying the rows, pagination, displaying filters as well as handling grid actions.

The component properties also provide you with a way to set many of the internal grid state values.

## Column Definitions

When defining a grid, the inner content is made up of column components. These are not actually rendered anywhere. When the grid is instantiated it scans these pseudo components to get the configuration data about all the columns to include. This means the properties on the columns are not reactive. However, the inner templates you define are reactive.

## Row Data

The row data is an array of objects. They are completely unknown in that the Grid itself does not care about the structure. The column definitions handle mapping the row data into something that can be displayed. Row data can be supplied to the grid one of two ways. Either as a direct array of objects, or as a function that returns a promise containing the array of objects.

If a promise is returned, then the grid will show a "data loading" indication while waiting for the data to be retrieved.

## Sample Grid

### Server Code

Let's take an example of the C# code required to get the grid data. This will be a simple grid that displays all the campuses in the system.

```
public GridBuilder<Campus> GetGridBuilder()
{
    return new GridBuilder<Campus>()
        .WithBlock( this )
        .AddField( "guid", c => c.Guid )
        .AddTextField( "name", c => c.Name )
        .AddTextField( "description", c => c.Description )
        .AddField( "location", c => c.Location.ToListItemBag() )
        .AddDateTimeField( "createdDateTime", c => c.CreatedDateTime )
        .AddAttributeFields( GetGridAttributes() );
}

private List<AttributeCache> GetGridAttributes()
{
    var entityTypeId = EntityTypeCache.Get<Campus>().Id;
    
    return AttributeCache.GetOrderedGridAttributes( entityTypeId, "", "" );
}
```

There is more we need, but lets pause here and look at these two. These two methods are used to do two things. First they get called to build the "grid definition". This is metadata that describes what will be in the grid. For example, which attribute columns or custom columns are defined on the block. Then, it is also used to get an instance of GridBuilder that will build the row data.

The second method, `GetGridAttributes()`, does exactly what it says. It gets the attributes that are marked to show on grid for the entity. If you specifically do not want to include attributes on your grid then you can exclude this as well as the call to `AddAttributeFields()` on the grid builder.

The other method, `GetGridBuilder()`, returns an instance of a `GridBuilder<T>` that will build both the definition and the final row data. When constructing the grid, you call various `Add...Field()` methods to add the fields that make up the row object. Notice that we use camelCase names for the field names.

As you can see, we are adding the Guid, Name, Description, Location and CreateDateTime fields. In addition we also add any attributes designated to be shown on the grid.

Finally, note the call to `.WithBlock( this )`. This adds custom data from the block into the grid definition. This includes things like block action URLs and any custom columns defined on the block. If you are populating a "light weight" grid, you probably don't need this call.

```
public override object GetObsidianBlockInitialization()
{
    var builder = GetGridBuilder();

    return new MyBlockBox
    {
        GridDefinition = builder.BuildDefinition()
    };
}

[BlockAction]
public BlockActionResult GetRowData()
{
    using ( var rockContext = new RockContext() )
    {
        var campuses = new CampusService( rockContext ).Queryable().ToList();
        var builder = GetGridBuilder();
        var gridAttributeIds = GetGridAttributes().Select( a => a.Id ).ToList();
        
        Helper.LoadFilteredAttributes( campuses,
            rockContext,
            a => gridAttributeIds.Contains( a.Id ) );
        
        var gridDataBag = builder.Build( campuses );
        
        return ActionOk( gridDataBag );
    }
}
```

So the first thing we have is our standard block initialization method. This sends down an object that includes the grid definition. This will get used by the TypeScript code to initialize the grid.

Next we have our block action to get the row data. As you can see, this is very simplified. We aren't filtering out inactive campuses, performing security checks or ordering the results. All of which you might need to do. But for simplicity, this is enough.

In the middle is some logic for attributes. We get the grid attributes and then take just the attribute Id. Next we use the attribute Helper class to load the attributes for the entire list of campuses but filter it to just the attributes that will display on the grid. This is a performance thing since most attributes are not set to show on grid, we don't need to bother loading them since we aren't going to use them.

Finally, we call the `Build()` method on the builder and return the results. This calls all those lambda methods in the `Add...Field()` method calls to construct each row object.

That is pretty much all you need on the server for a Grid.

### Browser Code

Now let's take a look at some code that will run on the browser. First we will take a look at the template that will be defined for the block.

```
<Grid :definition="configuration.gridDefinition"
      :data="loadGridData"
      keyField="guid"
      itemTerm="campus"
      tooltipField="description"
      :entityTypeGuid="EntityType.Campus"
      @addItem="onAddCampus">
    <TextColumn name="name"
                field="name"
                title="Name" />
    
    <DateColumn name="createdDateTime"
                field="createdDateTime"
                title="Created On"
                :filter="dateValueFilter"
                visiblePriority="sm" />
                
    <Column name="location"
            title="Location"
            filterValue="{{ row.location.value }}"
            :filter="pickExistingValueFilter"
            quickFilterValue="{{ row.location.text }}">
        <template #format="{ row }">
            <span>{{ row.location?.text }}</span>
        </template>
    </Column>
    
    <EditColumn @click="onEditClick" />
</Grid>
```

First off, we have a few things on the Grid component that are required. `definition` and `data` are both required at a bare minimum. `keyField` should also be included and is practically required if you want any advanced functionality to work (like row re-ordering or any grid actions).

The other properties `itemTerm`, `tooltipField`, and `entityTypeGuid` are optional but should be included to get the full experience. If your grid represents actual entities then you should set `entityTypeGuid`, otherwise many features won't work.

Finally we have the `addItem` event. There are a number of events, but this one gets called when the "add" button on the grid is clicked. Providing a listener to the event also causes it to know that you want the add button to show up.

Next, let's take a look at our columns. The `name` property is required for all columns, however the built-in action columns (like `EditColumn`) define these automatically. These are often the same value as the `field` property, but that isn't a requirement. The `name` will be used to uniquely identify the column in the Grid.

We define 3 data columns and then 1 action column. The first is a simple text column that pulls its value from the `name` field. It will not support any column specific filtering since we didn't provide a `filter` property - but it will still participate in the quick filter. Since we didn't specify a `quickFilterValue` it will just use whatever value is referenced by the `field` property.

The next column is a Date column and we have added two additional properties. The `filter` property is going to specify that we want to use the date value filter (which gets imported from the grid control file). The other is the `visiblePriority` property. This specifies that the column should only be visible on small screens or larger but hidden on extra-small screens.

Our third column is a custom column that will display the name of the Location. The pick existing value filter displays all the unique values of the column and lets the individual pick which ones to filter on. To do that, it needs to know how to get the filter value for comparison so we have specified the `filterValue` property. If a string is specified it uses a lava-like syntax to construct the filter value. In this case, we are using the `value` property of the ListItemBag in that field. We also provided a `quickFilterValue` that tells the grid how to get the quick filter value, this is also a lava-like syntax. In this case we want the `text` value of the ListItemBag.

Our Location column is a bit custom so we have provided the template to tell the grid how to format and display the value. We are doing something pretty simple here, but you can actually use full Obsidian components to render and display data. In this case, we are simply using standard component syntax to display the `text` value of the ListItemBag.

Important

Be aware that the template uses component syntax rather than the lava-like syntax. Even though they look almost identical. This is why we use the ?. syntax when accessing name property. The lava-like syntax is forgiving of null references; JavaScript is not, so it would throw an error if row.location wasn't defined.  

The last column we have is a standard action column for editing the row, this is a pencil button. All we need to provide is the function to call when it is clicked, and it will automatically pass our function the row identifier.

```
async function loadGridData(): Promise<GridDataBag> {
    const result = await invokeBlockAction<GridDataBag>("GetRowData");

    if (result.isSuccess && result.data) {
        return result.data;
    }
    else {
        throw new Error(result.errorMessage ?? "Unknown error while trying to load grid data.");
    }
};

function onEditClick(key: string): void {
    window.location.href = \`/Campus/${key}\`;
}

function onAddCampus(): void {
    window.location.href = "/Campus/New";
}
```

Here we see the function to load the grid row data and the two callback functions. There isn't much to say here, the code is hopefully pretty easy to read.

If you want a fully featured grid, there is obviously much more to implement, but that is the quick start for how to provide the data. In later sections we'll cover some of the more nuanced bits and how to handle special cases like row re-ordering and such.

### Grid Actions

If you are not inheriting from RockListBlockType, but you still want to take advantage of the grid's default actions when dealing with Person entities, you will need to write a little more code...

![Common grid actions for people entities](https://community.rockrms.com/GetImage.ashx?Id=72431)

**Server Code**

You will need to implement a `CreateGridEntitySet(...)` and `CreateGridCommunication(...)` block action since the Grid will call those as needed.

```
/// <summary>
        /// Creates an entity set for the subset of selected rows in the grid.
        /// </summary>
        /// <returns>An action result that contains the identifier of the entity set.</returns>
        [BlockAction]
        public virtual BlockActionResult CreateGridEntitySet( GridEntitySetBag entitySet )
        {
            if ( entitySet == null )
            {
                return ActionBadRequest( "No entity set data was provided." );
            }

            if ( !IsAllowedToCreateEntitySet( entitySet ) )
            {
                return ActionForbidden( "You are not allowed to create entity sets." );
            }

            var rockEntitySet = GridHelper.CreateEntitySet( entitySet );

            if ( rockEntitySet == null )
            {
                return ActionBadRequest( "No entities were found to create the set." );
            }

            return ActionOk( rockEntitySet.Id.ToString() );
        }

        /// <summary>
        /// Creates a communication for the subset of selected rows in the grid.
        /// </summary>
        /// <returns>An action result that contains identifier of the communication.</returns>
        [BlockAction]
        public virtual BlockActionResult CreateGridCommunication( GridCommunicationBag communication )
        {
            if ( communication == null )
            {
                return ActionBadRequest( "No communication data was provided." );
            }

            if ( !IsAllowedToCreateCommunication( communication ) )
            {
                return ActionForbidden( "You are not allowed to create communications." );
            }

            var rockCommunication = GridHelper.CreateCommunication( communication, RequestContext );

            if ( rockCommunication == null )
            {
                return ActionBadRequest( "Grid has no recipients." );
            }

            return ActionOk( rockCommunication.Id.ToString() );
        }
```

**Browser/Obsidian Code**

In the grid's definition, you will also need to set the `personKeyField` which should either be an IdKey or a guid

```
<Grid :definition="config.gridDefinition ?? undefined"
          :data="gridDataSource"
          keyField="guid"
          personKeyField="personGuid" <!-- This is needed for person grid actions to work -->
          itemTerm="Person"
```

---

## Grid Reference {#grid-reference}

# Grid Reference

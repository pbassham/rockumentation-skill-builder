---
description: Use when designing method signatures that accept multiple behavioral parameters or options to determine if a POCO should replace individual parameters
source: "https://community.rockrms.com/developer/developer-codex"
sourceLabel: Developer Codex
---
> **Path:** 

***When building a method that takes options (parameters) that change the behavior of the method, a POCO should be used instead of individual parameters. This is a recent change to our style (12/1/2021).***

The reason for this is that many methods have grown over the years to include additional parameters. Because we need to maintain backwards binary compatibility that means we need to keep the old method signatures around, thus resulting in multiple methods that just call the main method. It often also leaves us with a method that has 8 or more parameters that must be passed in order to get to the one parameter you actually want.

This is cumbersome in both the method implementation as well as when calling the method.

For example, suppose you have a method called `GetCampuses()` and need to pass it the following parameters that alter it's behavior:

- includeInactive
- campusType
- campusStatus

If these are all passed as parameters then we might have ended up with the following method signatures defined for our method:

```
GetCampuses();
GetCampuses( bool includeInactive );
GetCampuses( bool includeInactive, CampusType campusType );
GetCampuses( bool includeInactive, CampusType campusType, CampusStatus campusStatus );
```

Instead, we will pass a POCO that defines the options:

```
GetCampuses( CampusQueryOptions options = null );

class CampusQueryOptions
{
    public bool IncludeInactive { get; set; }
}
```

In our implementation of `GetCampuses()`, we would check if options is null and if so assign a new (empty) `CampusQueryOptions` value to it. Ideally, this should be taken from a static field somewhere to reduce the number of object creations.

However, the point is we can now add additional options to `CampusQueryOptions` without changing any method signatures or existing code. When adding new options a default value should be set in the POCO that maintains the desired existing functionality.

For example, suppose our initial `CampusQueryOptions` POCO didn't have `IncludeInactive` and the method was always including in-active campuses. If that was the desired intention then the initial value should be set to `true`. On the other hand, if the intention was that normally the method would not include inactive campuses, then the initial value could be `false`. Said another way, is the current implementation a bug or intended? Often, this decision should be made with the DSD and/or PO.

If the new option does not need to alter existing functionality then it can be simply defined with a default value that means as much. In our example above, when we add the campusType and campusStatus values, we would alter the POCO in a way to maintain that. In this case, by using nullable values:

```
class CampusQueryOptions
{
    public bool IncludeInactive { get; set; }

    public CampusType? CampusType { get; set; } = null;

    public CampusStatus? CampusStatus { get; set; } = null;
}
```

Note: The `= null;` is not necessary, but was added above to make the point that the value is null by default and would therefore be ignored in the `GetCampuses()` method.

Remember to document these new `CampusType` and `CampusStatus` properties properly. A comment that says "gets or sets the campus type" is not enough. Your comment should indicate how the query will change based on the value set: "Limits the results to only campuses that match the specified CampusType. If null, then all campus types will be included."

In this particular case, a better POCO would probably be one that takes multiple campus types and statuses. It is likely that at some point we will want to set "get all campuses that are either open or pending":

```
class CampusQueryOptions
{
    public bool IncludeInactive { get; set; }

    public List<CampusType> CampusTypes { get; set; } = null;

    public List<CampusStatus> CampusStatuses { get; set; } = null;
}
```

In this case, your documentation comment would be along the lines of "Limits the results to only campuses that match one of the specified values. If null or empty, then all campus types will be included."

Remember, that this new "options POCO" only applies to *behavior parameters*. Meaning, if one of the parameters to your `GetCampuses()` method is `RockContext`, that should not be included in the POCO. That parameter doesn't alter the behavior of the method, simply where it gets the data from. Likewise, if you instead had something like `FilterCampuses()` that took a list of campuses, you would define it as such:

```
FilterCampuses( List<Campus> campuses, CampusQueryOptions options );
```

As you can see, we can now use `CampusQueryOptions` in both the `GetCampuses()` method as well as the `FilterCampuses()` method. Sometimes this can't be done, but whenever possible you should try to implement the specific properties and functionality in a way that can be used beyond your one specific method.

This new "options POCO" style does not apply across the board to every method you create. Remember that your method name should clearly indicate the intent. So if your method is a laser focused implementation that is *not* intended to be changed, you don't need to use a POCO (unless you are going to have a ton of parameters right off the bat). An example of this would be something like:

```
/// <summary>
/// This method will retrieve all campuses that are currently active,
/// open and physical.
/// </summary>
GetAllCurrentPhysicalCampuses( bool includeInactive = false );
```

Three things to note.

1. Our method name clearly states what the method is doing by use of a few terms:
	1. "All" - This implies everything with no additional filtering options available.
		2. "Current" - This implies the campus is Open. We could have said "Open" in the method name, but that locks us into a specific status. i.e. what if we later added a "Temporary" status?
		3. "Physical" - This implies that only Type = Physical will be returned.
2. Because of how specific the method name is, a developer that comes along later should think twice about altering the method to add some new feature.
3. The XML documentation clearly states the intent of what is returned. In this case we do use the word "open" but later that might change to "open or temporary".

**Remember**: to keep these methods focused on a single task. i.e. our above `GetCampuses()` and `FilterCampuses()` methods should only be concerned about loading the data and returning the models. They should not be performing any conversions (such as to a ViewModel) or calculations. Keep the unit of work on target. This serves to keep the method easy to understand, easy to unit test, and easy to re-use. It also helps keep the POCO in a state that can be re-used by other similar methods.

---

## POCO Location {#poco-location}

When dealing with methods/options POCOs that involve the `Rock.Model` namespace (that is things like `GroupType` and `GroupTypeService`) the following rules apply.

1. Place the *file* that contains the POCO in Rock\\Model\\\[Domain\]\\\[Entity\]\\Options\\\[PocoName\].cs. Example: Rock\\Model\\Group\\GroupType\\Options\\GroupFilterOptions.cs
2. Place the *class* in the namespace that matches the folder structure. Example: `namespace Rock.Model.Group.GroupType.Options { }`

A similar pattern should be used for anything outside the `Rock.Model` namespace, though the exact formula has not been set in stone just yet. For now, plan on using a child namespace of `Options` to whatever namespace your method is in to store the POCO.

---

## Rock Hotkeys {#rock-hotkeys}

Do not add any new` Alt+?` hotkeys without approval from the Product Owner (PO) Team. We want to keep these from overlapping and not add them without careful consideration.

When adding, always ensure the button has a tooltip that shows the hotkey.

---

## Service Layers {#service-layers}

Rock uses multiple service layers to provide the ability to re-use code when possible.

Code re-use decreases the amount of time it takes to build new functionality in the long run. A second benefit is that when a bug is found, we only need to fix the one method that provides that logic rather than hunt for all variations that have been copied and pasted.

In the Rock world, we define 4 layers:

1. **Data Service Layer**
	1. Methods related to loading and filtering data from the database.
		2. Methods related to filtering on security, though these should be kept separate from the above methods.
		3. No attempt at formatting, other than some basic things like Person.FullName.
		4. Minimal calculations performed, other than what is strictly required. For example, you might need to run a calculation to store a value into a database column
2. **Client Service Layer**
	1. Methods related to taking data already loaded in memory (or an IQueryable<\>) and converting it into something usable by the client: view models.
		2. Most calculations performed, such as item counts, totals, etc.
		3. Some formatting performed, such as taking a Group object and getting a string that contains both the group name and the group type if required: "Ted's Group (Small Groups)".
3. **Block Layer**
	1. Additional calculations and formatting required before transmission to the client.
		2. Conversions to and from custom block view models.
4. **Client Layer** (Mobile shell, Obsidian)
	1. Final formatting and rendering.
		2. End-user calculations that should be performed on the fly (e.g. a total field below a form that allows the individual to specify quantities).

---

## Guidelines {#guidelines}

There is a lot of existing code in Rock that does not follow the above layers. Our goal is not to go back and rewrite everything to use the new layer model. Instead, when new functionality is added these guidelines should be used.

You will notice below the use of the word "avoid" instead of forbidden. If you can't think of a way to adhere to the guidelines and still accomplish your goal then they can be bent or even broken. However, that should happen with the approval of the DSD to make sure that doesn't paint us into a corner later.

- Avoid putting a lower layer's functionality into a higher layer.
	- Example: Do not create a method in GroupTypeService that return a GroupTypeViewModel. View models should be handled by the client service.
- Avoid putting a higher layer's functionality into a lower layer, attempt to split the functionality instead.
	- Example: ConnectionTypeClientService.GetConnectionTypes() should not query the database directly. Instead, move the query logic into a reusable method that lives in the Data Service Layer. This allows others to retrieve the same data but format it differently.

Remember, the goal is to make our lives easier in the long run. There will be times when you are building a complex LINQ query that needs to both query the database, perform calculations and format results. Depending on the calculations it might not be performant to try and separate the logic into the data service layer and the client service layer. In such a case, just get the approval of the DSD to your solution.

---

## Data Service Layer {#data-service-layer}

The data service layer is responsible for loading data from and storing data into the database. This includes common filtering methods that will be used by multiple client services and/or blocks.

All Data Service Layer classes should reside in the **Rock.Model** namespace and folder structure inside the **Rock** project. The Model and ModelService classes should be placed directly in the **Rock.Model** namespace, but follow the **Rock\\Model\\\[Domain\]\\\[Entity\]\\** folder structure. For instance, ConnectionType and ConnectionTypeService classes go in the Rock.Model namespace, but reside as the files Rock\\Model\\Connection\\ConnectionType\\ConnectionType.cs and Rock\\Model\\Connection\\ConnectionType\\ConnectionTypeService.cs.

Any additional classes, such as ConnectionTypeQueryOptions, should go in the namespace **Rock.Model.Connection.ConnectionType** (in the case of this specific class, to follow the Method Behavior Parameters pattern it would go in Rock.Model.Connection.ConnectionType.Options namespace).

---

## EntityTypeConfiguration {#entitytypeconfiguration}

*Each model class has an EntityTypeConfiguration in the main class file. In a few special cases there are some things to point out.*

- Cascade Null - Entity Framework has a WillCascadeOnDelete(bool), but it doesn't have ON DELETE SET NULL. So, in those cases where we really want it to NULL instead, we can accomplish this by editing the migration a little. See [https://github.com/SparkDevNetwork/Rock/commit/6953aa1986d46c9c84663ce818333425c0807c01#diff-c186f80fb19435fe5f3021730e98123b508f15928b1e05b17881a12f3c4848d9R35-R42](https://github.com/SparkDevNetwork/Rock/commit/6953aa1986d46c9c84663ce818333425c0807c01#diff-c186f80fb19435fe5f3021730e98123b508f15928b1e05b17881a12f3c4848d9R35-R42) for an example.
- Global Filter on Queries. There are a couple of cases where we want all queries on a model to exclude some records. For example, a soft-delete indicator. We accomplish this by using [https://entityframework-plus.net/query-filter](https://entityframework-plus.net/query-filter). In our case we use it to exclude Group and GroupMembers that have IsArchived = true. In addition to the filter, we also override the GroupService.Queryable to exclude IsArchived. We do both to ensure that IsArchived Groups don't show up in results unless we explicitly ask for IsArchive records.

---

## Client Service Layer {#client-service-layer}

The client service layer has two primary responsibilities:

1. Translating data into a common format that can be used by all lower layers.
2. Performing common logic operations that can be reused by other components.

Think of it this way: The data service layer is responsible for the question "what data am I working with?" while the client service layer is responsible for "what do I do with this data?"

All client service layer classes should reside in the **Rock.ClientService** namespace and folder structure inside the **Rock** project.

**Example**

![](https://sparkdevnetwork.gitbook.io/rock-developer-codex/~gitbook/image?url=https%3A%2F%2Fstatic.slab.com%2Fprod%2Fuploads%2F3xqnyj9y%2Fposts%2Fimages%2FkTLOZOtOQ1dHs1sagGFcYdqb.png&width=768&dpr=4&quality=100&sign=99a2709&sv=2)

ConnectionTypeClientService.cs

The folder structure for the client service layer follows that of the data service layer, that is: **Rock\\ClientService\\\[Domain\]\\\[Entity\]\\**. The namespace should match the folder structure. All service classes should have the suffix ClientService. For example, the primary class to handle ConnectionType client service methods would be:

- Class: ConnectionTypeClientService
- Namespace: Rock.ClientService.Connection.ConnectionType
- File: Rock\\ClientService\\Connection\\ConnectionType\\ConnectionTypeClientService

As with the Method Behavior Parameters pattern, any options POCOs should go in a **\*.Options** sub-namespace.

---

## Block Layer {#block-layer}

The block layer is where the logic for a specific block lives. This usually consists of a pattern similar to:

1. Using page parameters and block settings to define the functional configuration.
2. Using that configuration to lookup data via the data service layer.
3. Filtering and translating that data via the client service layer into something the block (and later client layer) can more easily consume.
4. Preparing the data for display by the client layer. Ideally this is almost a direct passthru from the client service layer. But some blocks might need to perform even more adjustments, such as the event registration entry block.
5. Sending the data to the client layer.

Step 3 is important. The ideal situation is that the block layer does not perform any logic. Note we said *ideal*. In reality, that probably will seldom be the case. But as much *reusable* logic as possible should be put in the client service layer. Note again we said *reusable*. That is an important distinction. Just because your block has logic doesn't automatically mean it can (or should) be reused.

A method that returns a list of campuses that should be displayed in a list to the user is a reusable piece of logic. A method that returns some rendered Lava from a set of connection types is probably not reusable. It's too specific to the block itself and the output medium.

It might help to think of the Block Layer almost as an API layer. You are providing api methods (block actions) for the client to use to get to the specific data it wants. Additional block configuration allows those block actions to be reused in different ways on different pages.

---

## Client Layer {#client-layer}

Finally comes the client layer. In the WebForms world, this layer and the block layer are often one and the same. But in newer technologies these are distinct layers. Rock Mobile is a completely separate application running on a different device. Obsidian (and other JavaScript frameworks) are also separate applications that run on different devices from the server. Those are very distinct layers.

You may or may not have much direct interaction with the client layer depending on your area of focus. But you need to have an understanding of how the separation of layers works and what each layer is primarily responsible for.

Put simply, the client layer is responsible for final formatting and rendering. When a client wants to display a list of *things*, it may receive a JSON array that contains the information to be displayed. Such as the name and identifier. It can choose to display that any way it desires. Or more specifically, any way that fits the medium it is using.

For example, on a desktop website, there is plenty of screen space available. The client layer might then choose to display that list as a set of horizontal checkboxes. However, on a mobile phone application, there is not much screen space. So it might opt to display a field that shows only the selected items and then a popup when pressed to show all available choices.

The point is, under ideal circumstances, it is up to the client to decide final formatting and rendering.

**Note**: Lava puts a wrench in that statement. When you have a Lava template, it becomes the block layer that handles the formatting. While not ideal in this 4-layer model, it is the world we live in.

---

## Implementation {#implementation}

Let's look at a simple block that displays Connection Types for the user to interact with. We're going to invert our layer model and look at the methods that will be in play:

- Client Layer
	- ShowPage()
- Block Layer
	- GetContent()
- Client Service Layer
	- GetConnectionTypes()
		- GetConnectionTypeCounts()
- Data Service Layer
	- GetConnectionTypesQuery()
		- GetViewAuthorizedConnectionTypes()

Each of the methods calls a method in either it's own layer or the layer below (remember we are inverted, so we are saying the client service layer calls methods in either the client service layer or the data service layer).

![](https://community.rockrms.com/GetImage.ashx?Id=66670)

As you can see, everything flows nicely from the client layer all the way down to the data service layer. In reality, this block came out slightly differently because of the need to use Lava to format the final output, but you get the idea.

We now have two methods in the data service layer that can be reused.

One to get an IQueryable of connection types. This method takes an Options parameter that specifies how the query should be constructed. Now the logic of how to construct that query is self contained. If we decide that an "inactive" connection type means something slightly different now, we only have one place we need to update.

The second method is special to connection types. We have some special logic applied to connection types to say when a person can view the connection type (related to if they are assigned as a connector to any request inside the connection type). Again, this method can be reused by other code to further filter a list of connection types.

In our client service layer, we have a helper method to get our connection types. This applies security filtering and would would return a view model ready to send down to the client (in reality, this method actually had to be omitted because of our custom lava formatting we applied in the block, but you get the idea).

Our second client service method gets all the request counts related to that connection type. Total requests, requests assigned to be, overdue requests, etc.

Finally, our block and client layers have simple methods that just call up the chain and do some minor tweaking to the data.

---

## Namespaces {#namespaces}

As a general rule, don't add a new namespace without approval from the DSD or PO.

The exception to this is adding a standard "model domain" where you can see that is already the pattern. For example, if `Rock.Something.Core`, `Rock.Something.CMS`, `Rock.Something.CRM` namespaces already exist, adding `Rock.Something.Workflow` is probably fine. However, do not add `Rock.Something.CoolNewFeature` without getting that approved. Once created, it's nearly impossible to rename these so we want to be sure it's a well-thought-out name that won't conflict with possible upcoming features.

In regards to Rock.ViewModels and Rock.Enums assembly, the following rules apply and should not be deviated from without approval from PO currently.

1. Do not add any classes, interfaces, or enums to the root of the namespace.
2. Your namespace should match one of the following patterns:
- \[Domain\]
- Blocks.\[Domain\].\[BlockName\]
- Controls
- Utility

For example, the following namespaces would be considered valid:

- Rock.ViewModels.CMS
- Rock.Blocks.Core.CampusDetail
- Rock.ViewModels.Utility
- Rock.Enums.Core

However, the following would *not* be valid:

- Rock.ViewModels.GroupFinder
- Rock.Enums.Thinker

---

## Code Security {#code-security}

When accepting data back from a post-back, assume someone has tampered with it and re-validate it. In other words, never use an ID in a hidden field that you didn’t expect someone could change (they can change them).

1. Do not use simple “Id” fields (person.Id, etc) to identify a person, if it’s not possible to the `PersonActionIdentifier` then use Guids. Even then, realize Guids are also not hidden or secret, and therefore must not be accepted without revalidating they haven’t been tampered with. This is *especially* true for public facing blocks.

---

## Patterns in Rock {#patterns-in-rock}

See [Patterns in Rock](https://community.rockrms.com/page/3514?slug=patterns-in-rock#additional-settings) within Developer 303 Guide.

---

## Rock Architecture {#rock-architecture}

Below are a few architecture rules that you should keep in mind while using Rock.

1. Lava is an important part of the Rock ecosystem. Our design pattern is that if you have access to write Lava, then, in many ways, you have the keys to the kingdom. In many cases the Lava author has access to data that is not accessible to the CurrentPerson (logged in individual). It’s up to them to determine how to handle that. We do provide many filters and means of knowing if the person should have access ‘HasRightsTo’, but these need to be optionally used. Having access to this data is important for personalization and tailoring the experience to the individual.
2. Home Directory – While most people install Rock in the application home directory, we should never take it for granted that it will always be there. Some have installed it under a directory in the home ([http://myorg.com/rock/](http://myorg.com/rock/)). So always use MapPath (~/) or similar logic when making URLs. Lava has a similar filter ResolveRockUrl.
3. Be mindful of where you wrap your new RockContext()’s with a using. Disposing the RockContext() used to fetch an entity will disable lazy-loading:

![](https://community.rockrms.com/GetImage.ashx?Id=66674)

4. When a block has an on RowDataBound situation, you can use a block private RockContext like this (but see rule 36):

![](https://community.rockrms.com/GetImage.ashx?Id=66675)

5. Dynamic Objects and Lava – You’ll often find the need to create custom objects to pass to Lava as merge objects. Instead of using POCOs you can use the RockDynamic `LavaDataObject` object. Below is a quick example of its usage.  

![](https://community.rockrms.com/GetImage.ashx?Id=66676)

6. Creating or using POCOs that you need to make available to lava

- If you are creating plain C# class that you want to make available to Lava, have it inherit from Rock.Utility.RockDynamic Rock.Lava.LavaDataObject. Inheriting from there will make all of the declared properties available to Lava. This is an example:

![](https://community.rockrms.com/GetImage.ashx?Id=66677)

- Use the suffix of "Info" as seen above when the object represents a special set or subset of properties related to an entity.
- If you are trying to make an object available to Lava, but aren’t able to have it inherit from Rock.Lava.LavaDataObject, you can use Rock.Lava.LavaDataObject as a proxy. This is an example:

![](https://community.rockrms.com/GetImage.ashx?Id=66678)

![](https://community.rockrms.com/GetImage.ashx?Id=66679)

![](https://community.rockrms.com/GetImage.ashx?Id=66680)

7. When creating a new model that utilizes EntityId and EntityType and if the EntityType could be Person then the stored procedure dbo.spCrm\_PersonMerge needs to be updated to handle the new model. This stored procedure is used to merge Person records, and if it is not updated then the new model will have orphaned rows after a Person merge. In general the stored procedure will need to have logic to handle the new model. Usually the EntityId will have to be updated from the old Person.Id to the new Person.Id. A simple example is the Document Model. The EntityId is updated to the new Person.Id if DocumentType .EntityTypeId is the Person EntityType.

```
UPDATE [dbo].[Document]
SET [EntityId] = @NewId
WHERE [Id] IN (
     SELECT d.[Id]
     FROM [Document] d
     JOIN [DocumentType] dt ON dt.[Id] = d.[DocumentTypeId]
     WHERE dt.[EntityTypeId] = @PersonEntityTypeId
     AND d.[EntityId] = @OldId)
```

---

## Locks: C# and/or SQL {#locks-c-andor-sql}

If you run into a situation where you think you need a `lock()` in code, you must first consult with the DSD. In general, our philosophy is that locks should be very rare. It's really only necessary in cases where you cannot control the environment in which your code is being run (OS, filesystem, database, etc.). Read this [Thread Safety and Locks](https://triumph.slab.com/posts/thread-safety-and-locks-45sk2yi0).

Due to the increasing nature of clustered/web-farm Rock environments, we are looking into database level locking strategy. Once we have a convention for locking at the database level, we will put that information here. For now, most cases should involve relying on the unique constraints of the table' definitions to prevent accidental insertion of the same thing twice (for example, a system setting with the same key).

---

## Event Bus vs TransactionQueue {#event-bus-vs-transactionqueue}

Rock has two *primary* approaches for performing a run-time (non-job initiated) task:

- via an ITransaction added into the TransactionQueue or
- via a Message (BusStartedTaskMessage) 'sent' or 'published' into the

See [Event Bus](https://triumph.slab.com/posts/event-bus-65nk4duh) for details on how the bus works.

The TransactionQueue (only local to the particular Rock server instance) is processed every minute or so, but the Event Bus can happen nearly immediately.

Because of the speed of the Event Bus, care needs to be taken to ensure the corresponding related message data has truly be saved/committed before attempting to use that data. For this reason, it is often best to use `SendWhen(...)` when triggering bus "Send" messages from a SaveHook.

The Event Bus is typically used if the 'event' needs to be consumed by an external system listening to the bus, and/or when an event could be handled by *any one* of the Rock servers in a Web Farm. Note: Internally, Rock uses the Event Bus to "Publish" and consume when the Rock cache is cleared.

---

## Building Blocks {#building-blocks}

When building blocks one must:

1. Ensure that block settings are updated without having to do a full page reload via the Block\_BlockUpdated event.
	1. **Page.OnInit** event delegate wireup.

![](https://community.rockrms.com/GetImage.ashx?Id=66681)

![Block_BlockUpdated event handler method.](https://community.rockrms.com/GetImage.ashx?Id=66682)

---

## Block Settings {#block-settings}

Starting in v9, all new blocks should use the ‘Vertical’ format for block settings, where the Properties of the FieldAttribute is assigned (not the constructor parameters)

Example:

```
[BooleanField( "Enable Giving",
        Description = "If true, the giving data will be loaded otherwise it will be skipped.",
        Key = AttributeKey.EnableGiving,
        DefaultBooleanValue = true,
        Order = 3 )]
```

---

## RockInternal Attribute {#rockinternal-attribute}

The RockInternal attribute is used to signify internal code within Rock. This attribute requires a first parameter of a version string that represents the Rock Version it was introduced in. An optional boolean parameter of "keepInternalForever" indicates whether it should stay internal forever (ex. WebForms code needs to use it but plugins never should). In the future, a helper tool will be run before every major release that provides a list of all "internal" items that should now be made public based on this version number.

The should be used in the follow 3 cases:

1. Code is for internal use only and will always be used for internal use only
	1. Code has no intention of ever becoming available to 3rd party plugins
		2. If the property needs to be accessed by code in RockWeb, it must be public and denoted with the `[RockInternal]` attribute alongside a specific version and the "true" value for the optional "keepInternalForever" parameter
2. Code is *currently* for internal use only but should become public eventually
	1. Code for a new feature but the method names and parameters are not yet confirmed
		2. Feature is considered experimental
		3. The intention is that this code will eventually become public
3. Code is public for plugins to use
	1. Once internal-use code becomes fully public, the "RockInternal" attribute is removed and the accessor is switched to "public"

---

## JavaScript {#javascript}

Write JavaScript so that multiple instances of the block can co-operate on a single page.

When writing a large amount of JavaScript for a library or a specific component (i.e., assetManager.js) put it into an appropriate folder under RockWeb\\Scripts\\Rock\\. The files under the Controls folder are put into the “RockUi” bundle, files under the Extensions folder are put into the “RockLibs” bundle, and these bundles are cached on the client.

Add unbundled or individual JavaScript files into a block using the AddScriptLink like this:

```
RockPage.AddScriptLink( "~/Scripts/jquery.signalR-2.2.0.min.js", fingerprint: false );
RockPage.AddScriptLink( "~/Scripts/Chartjs/Chart.js", true );
```

When JavaScript is needed in a block, put it into the whenever possible similar to what is shown here.

Example 1:

```
string script = string.Format( @"
new Clipboard('#{0}');
$('#{0}').tooltip();", btnCopyToClipboard.ClientID );
ScriptManager.RegisterStartupScript( btnCopyToClipboard, btnCopyToClipboard.GetType(), "share-copy_" + this.ClientID, script, true );
```

Example 2:

```
var script = string.Format( @"
Rock.controls.bootstrapButton.onCompleted({0})", this.ClientID );
ScriptManager.RegisterStartupScript( this, this.GetType(), "BootstrapButton_" + this.ClientID, script, true );
```

If the script is not specific to an instance of the block and only one script is needed per page (regardless of how many instances of the block are on the page) then use the same key (i.e., rock-colorpicker) when calling RegisterStartupScript like this:

```
string script = $@"$('.rock-colorpicker-input').colorpicker({{
colorSelectors: {definedValues.ToJson(Newtonsoft.Json.Formatting.Indented).Replace("\"","'")}
}});";
ScriptManager.RegisterStartupScript( this, this.GetType(), "rock-colorpicker", script, true );
```

---

## Defined Types & Defined Values {#defined-types-defined-values}

When creating a feature that has new defined types and defined values, you must add them (new well known GUIDs) as constants to the Rock.SystemGuid.DefinedType and Rock.SystemGuid.DefinedValue classes. However when consuming these do not assume they exist, still check for and handle nulls.

---

## Documentation {#documentation}

If a feature or commit is completed that requires documentation be updated, you must add a “Documentation” Task in Asana (Under the Community team). Be sure to add as many notes as possible and mark yourself as the contact. Screenshots are also appreciated. When including a screenshot, the resolution should be 1280x960, scroll bars should be removed (cropped), and make sure your cursor is not an accidental part of the screenshot. The [Window Resizer](https://chromewebstore.google.com/detail/window-resizer/kkelicaakdanhinjdeammmilcgefonfh) Chrome plugin makes it easy to resize your browser window to the correct dimensions.

---

## Known ''Gotchas' {#known-gotchas}

[Removing Columns From a Grid](#)

---

## Removing Columns From a Grid {#removing-columns-from-a-grid}

Do not remove columns that exist in the Grid’s Html definition. This will cause the event binding for row buttons to be lost. For example, if you have a grid that has a campus column declared:

```
<Rock:Grid ID="gSteps"
  runat="server"
  DisplayType="Full"
  AllowSorting="true"
  OnRowSelected="gSteps_Edit"
  CssClass="js-grid-step-list"
  OnRowDataBound="gSteps_RowDataBound"
  ExportSource="ColumnOutput" >
  <Columns>
  ...
  <Rock:RockBoundField
    DataField="CampusName"
    HeaderText="Campus"
    SortExpression="Campus.Name"
    ExcelExportBehavior="AlwaysInclude"/>
  <Rock:DeleteField OnClick="DeleteStep_Click" />
</Rock:Grid>
```

And then you have the following code somewhere in the code behind:

```
var campusCount = CampusCache.All().Count;
if (campusCount <= 1 )
{
   var campusColumn = gSteps.ColumnsOfType<RockBoundField>()
    .Where( a => a.DataField == "CampusName" )
    .FirstOrDefault();
   if ( campusColumn != null )
   {
      gSteps.Columns.Remove(campusColumn);
   }
}
```

Removing the column will cause the delete field to lose its binding to `DeleteStep_Click`.

---

## Bypassing Entity Framework 'Save' Conventions {#bypassing-entity-framework-save-conventions}

In order to improve the performance of certain queries, we have written them in pure SQL. However, doing so bypasses the Pre-Save and Post-Save operations within Entity Framework. To document this, we must add an [Engineering Note](https://community.rockrms.com/developer/developer-codex/coding-standards/documenting-code#engineering-notes) within the SaveHook namespace for each model that is bypassed.

Please use the opening text as a template, and then list the locations were the EF operations are not called because of a direct SQL query.

```
/*
     [DD/MM/YYYY] - [YOUR INITIALS]

     The following areas of Rock bypass the pre and post save actions
     for [MODEL_NAME]. Be aware that any code you put in here might not
     execute under these situations:
     
        - The Stale Anonymous Visitor stage of the RockCleanup job.
        - etc.

     Reason: Performance
*/
```

[An example commit using this kind of change and note addition.](https://github.com/SparkDevNetwork/Rock/commit/17f37a30b52059daa44f44e90b56793d22f33811#diff-645816f28a68e87def1e9dbd89e58a22e6a01eb0e6d65c1fb5e6768fcaeadd56)

---

## Writing Migrations {#writing-migrations}

There are three types of migrations:

1. Standard EF Migration - These are required when a model change needs to occur since the code is tightly coupled to the database change. For this type, you must reserve the [*developer migration token*](https://community.rockrms.com/Developer/MigrationToken) to let other developers know you are about to make a model/db change.
2. Migration Rollups (in Asana) or Data Migrations - Any data migration that does not have to be closely coordinated with a corresponding code/class change can be put into the [Migration Rollups](https://app.asana.com/0/22067109204476/list) project under a v.X.Y.Z section for the branch in question. (*We put them in Asana in order to reduce the size of the Rock.Migrations.dll since each EF migration causes it to grow larger.)*
3. Hotfix Migrations (Rock/Plugin/HotFixes/\*) - These are very similar to the Migration Rollups type since they do not have to be closely coordinated with a corresponding code/class change, but they are going into a release of Rock that is *earlier* than where the EF code migration token is currently located. Like standard EF migrations, they are also ordered ([example: \[MigrationNumber( 145, ... )\]](https://github.com/SparkDevNetwork/Rock/blob/351c39fed9e914ace8c15351fae1394d364043f0/Rock/Plugin/HotFixes/145_UpdateWistiaVideosToVimeo.cs#L23)). Note: We often just put these migrations into the the [Migration Rollups](https://app.asana.com/0/22067109204476/list) project to avoid needing to coordinate the hotfix version number with other developers. In that case, they will be collected from Asana and put into a HotFix migration when the hotfix release is being packaged for the alpha testing phase.

Subpages describe each of these in further detail.

---

## Standard EF Migrations {#standard-ef-migrations}

Due to the way normal EF migrations work (being highly controlled and ordered), they must be coordinated amongst the core developers—so only one developer can write a migration at a time. Developers must claim the migration token *if no one else has it* at [www.rockrms.com/Developer/MigrationToken](http://www.rockrms.com/Developer/MigrationToken). It is good for 40 minutes but if more time is needed just claim it again before time runs out.

---

## Feature Branch Merging Workflow {#feature-branch-merging-workflow}

Before merging your feature branch into develop or a hotfix branch do the following:

1. From your feature branch copy the migration **Up\\Down** code you were testing with to a text editor temporarily.
2. Check out the destination branch (develop, hotfix, etc.) in SmartGit.
3. Obtain the [migration token](https://community.rockrms.com/Developer/MigrationToken).
4. From PackageManager console run `Add-Migration <your migration name>` against the destination branch you checked out in SmartGit.
	1. Make sure to select the **Rock.Migrations** project before running the command.
5. Paste in the code from the text editor into the new migration .cs file and adjust the method name if applicable.
6. **DON'T COMMIT AND PUSH YET**
7. Run `Update-Database` from PackageManager console in your destination branch and test your migration thoroughly (also extend the migration token if required).
8. **IF ALL IS WELL** commit and push your code.

---

## Data Migrations {#data-migrations}

For data migrations add the task to the Asana Migration Rollups Project. Place the task in the earliest version section where it is needed. In this way we can batch as many operations possible. These migrations are added to the Rock solution when the pre-alpha build and deploy is done.

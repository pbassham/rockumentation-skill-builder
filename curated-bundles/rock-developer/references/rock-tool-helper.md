---
description: "Use when implementing Native Tools that need validation, error collection, pagination, or standardized entity access patterns"
source: "https://community.rockrms.com/developer/ai-agents"
sourceLabel: AI Agents
---
> **Path:** 

## Overview

There is a lot of logic and error checking involved when writing *Native Tools*, and much of it is repetitive. To reduce that overhead, Rock provides the *Rock Tool Helper*, a centralized class that standardizes common patterns like validation, error collection, pagination and safe entity access so your tools stay more consistent and the AI agent receives clearer, more actionable feedback.

For example, validating an `IdKey`. In a typical block action, this is rarely a concern. If an `IdKey` is invalid, it is usually safe to return a generic “entity not found” error because the UI should prevent that situation from happening in the first place. It is considered an unexpected case.

With a language model, that assumption does not hold. The model may send incorrect values, such as a campus name instead of a campus IdKey. In these cases, a generic “not found” response is not sufficient. The response needs to clearly explain what went wrong, such as stating that the campusIdKey value is invalid.

This type of validation logic is repeated often. Duplicating it across multiple *Native Tools* increases the risk of inconsistency and subtle errors. To address this, a helper class is provided to centralize and standardize the logic.

The helper is designed to collect errors as they occur. Instead of failing on the first invalid value, it tracks all issues encountered during execution. Once validation reaches an appropriate point, you can check for errors and return them all at once. This allows the language model to correct everything in a single response instead of resolving issues one at a time.

The helper has a property of `ErrorResult`. This will return an `IAgentToolResult` initialized with all error messages, instructions and any metadata that have been reported. If you need to do some custom validation, you can use the exposed `AddError()`, `AddInstructions()`, and `AddMetadata()` methods to report your own information to be included with the final result.

## Initialization

There are two ways to initialize the helper. One is for read-only access to the database (get, lookup, list) and the other is for read-write access (add, update). If you happen to create a read-only helper and try to save changes, it will throw an exception. So you don't have to worry too much about doing it wrong.

Creating a read-only helper requires that you pass in the AgentRequestContext and a logger. The former is available as a property from the base class of your component. The logger is usually injected into your constructor with dependency injection. The AgentRequestContext provides a RockContext that can be used for read-only database operations, so the helper will automatically use that.

```
// Read-only helper
var helper = new RockToolHelper( AgentRequestContext, _logger );
```

To create a read-write helper, you simply need to create and pass in a RockContext in addition to the other parameters. The `_rockContextFactory` is also usually injected into your constructor via dependency injection.

```
// Read-write helper
using var rockContext = _rockContextFactory.CreateRockContext();
var helper = new RockToolHelper( rockContext, AgentRequestContext, _logger );
```

## Results

We already mentioned the `ErrorResult` property. But once again, this will create a new `IAgentToolResult` instance that includes all errors that have been reported, any instructions, and all metadata key/value pairs. If you happen to call it when there are no errors, then an exception will be thrown. This is to make sure, as a pattern, you don't accidentally try to return an error result that has no error messages.

There is also a `HasErrors` property that will tell you if there have been any errors reported. So a common pattern would be to perform various tasks and then at an appropriate place in the logic do this:

```
if ( helper.HasErrors )
{
    return helper.ErrorResult;
}
```

If you are working with paginated data, such as from a list tool, you can use the `GetPaginatedResult()` method. This will return either a success result or a no-data result, depending on if there are any items in the items you pass to it. This method won't check for nor include any errors, but it will include any instructions and metadata that have been reported. By default, items will be sanitized if they inherit from `EntityResultBase`. You can turn this off by argument when calling the method.

```
return helper.GetPaginatedResult( page );
```

Tip

It's also important to note that in both cases, a standard `IAgentToolResult` is returned. This means you can call the chain methods as if you created the result yourself.

## Reporting Methods

There isn't much to say about these, but there are a few methods you can call to add reported information to the helper. This information will be used when constructing result objects. That means you can do your own custom checks and add errors, information and metadata, and then later check for errors and your details will be included along with any that were internally reported by other helper methods.

- `AddError` - Adds the string to the list of errors.
- `AddInstructions` - Adds the string to the list of instructions.
- `AddMetadata` - Adds a single key-value pair to the list of metadata.
```
helper.AddError( "The rating value is invalid." );
helper.AddInstructions( "Ratings must be between 0 and 5." );
helper.AddMetadata( "ratingRange", "Ratings must be between 0 and 5." );
```

## Pagination Methods

Pagination can be both complex and require a lot of boilerplate. To help with that there are a few methods you can call to help you with your list tools when you need to paginate the results.

- `GetPaginatedItems` - This method will take a queryable or set of items and a page number and apply the proper skip and take LINQ calls. It will also handle adding metadata to provide the language model with hints about the results, such as if there is more rows available. You can optionally pass the page size and whether it should sanitize the returned results. This method is meant to be used when you don't need to do security checks. If you need security checks, you must use cursor pagination.
- `GetCursorPaginatedItems` - This method takes a queryable, paginator, and previous cursor value. You can also optionally pass in the page size. The paginator will perform all the heavy lifting to update the query to pick up where the last cursor left off. This method must be used if you need to perform security checks, otherwise the page numbering will be off. When using this pagination, your ordering must end with ordering on the Id.
```
// Use default page size and sanitize returned items.
var page = helper.GetPaginatedItems( campusQry, 1 );

// Use custom page size and don't sanitize returned items.
var page = helper.GetPaginatedItems( campusQry, 1, 10, sanitizeForSecurity: false );

// Use default page size and order by Name and then Id.
var paginator = new CursorPaginator<Campus>( currentPerson, qry => qry.OrderBy( c => c.Name ).ThenBy( c => c.Id ) );
var page = helper.GetCursorPaginatedItems( campusQry, paginator, previousCursorValue );
```

## Entity Accessor Methods

Accessing entity references is one of the things that is extremely repetitive, and prone to mistakes. To do things properly, there are a lot of checks that happen and different errors reported for different situations. The methods below are all meant to load an entity by its IdKey value. In all cases, if the IdKey value is invalid an error will be reported; if the entity cannot be found by the IdKey an error will also be reported.

Each method can also be passed a parameter to specify if security should be checked. This is `false` by default. If security check is requested and the individual is not authorized then an error will be reported.

- `GetOptionalEntity` - This method will attempt to load an entity from the database. No error will be reported if the IdKey value is blank or null. If an entity is loaded, it will be returned.
- `TryGetOptionalEntity` - This method will attempt to load an entity from the database. No error will be reported if the IdKey value is blank or null. If an entity is loaded then true will be returned. False will be returned in all other cases, whether an error occurred or not.
- `GetRequiredEntity` - This method will attempt to load an entity from the database. An error will be reported if the IdKey value is blank or null. If an entity is loaded, it will be returned.
- `TryGetRequiredentity` - This method will attempt to load an entity from the database. An error will be reported if the IdKey value is blank or null. If an entity is loaded then true will be returned. False will be returned in all other cases, which indicates an error.
```
// Try to load an optional campus.
var campus = helper.GetOptionalEntity<Campus>( campusIdKey );

// Try to load an optional campus, and default to a default value if one can't be found.
if ( !helper.TryGetOptionalEntity<Campus>( campusIdKey, out var campus ) )
{
    campus = defaultCampus;
}

// Try to load a required group, check security.
var group = helper.GetRequiredEntity<Group>( groupIdKey, checkSecurity: true );

// Try to get a required campus, return an error if it can't be loaded.
if ( !helper.TryGetRequiredEntity<Campus>( campusIdKey, out var campus ) )
{
    return helper.ErrorResult;
}

// Attempt to load multiple entities and report an error at the end if any failed.
var campus = helper.GetRequiredEntity<Campus>( campusIdKey );
var group = helper.GetOptionalEntity<Group>( groupIdKey, checkSecurity: true );

if ( helper.HasErrors )
{
    return helper.ErrorResult;
}
```

## Attribute Methods

Entity Attributes can be easily worked with by using helper methods. They will automatically handle security for you unless you explicitly disable the security option. There is an additional check that happens beyond the basic security check. If the agent is configured for a public audience type, then only attributes marked Public will be exposed.

- GetAvailableAttributes - This provides a list of attributes that are available for use on the entity.
- SetAttributeValues - Sets the attribute values of an entity from a list of `AttributeValueResult` objects.
```
// Get all available attributes for a group.
var attrs = helper.GetAvailableAttributes( group );

// Get all available attributes for a group, bypassing security checks.
var attrs = helper.GetAvailableAttributes( group, enforceSecurity: false );

// Update the attributes of a group, bypassing security checks.
helper.SetAttributeValues( group, attributeValues, enforceSecurity: false );
```

Note

The `enforceSecurity` parameter only affects the `IsAuthorized()` checks on the attribute. It does not bypass the public audience check.

## Update Methods

A number of methods exist to help with updating entities from an agent tool. Because the information provided is coming from a language model instead of a hard-coded front-end, where we know all the values are provided and exactly what form they take, we have a few more hoops to jump through than normal. The documentation on the Add or Update tools will provide more details, but essentially we have to deal with null values a bit differently. Otherwise, null could mean both "set the value to null" as well as "value was simply not provided".

- `UpdateProperty` - Updates an entity's property using the provided expression and value from the language model.
- `UpdateNavigationProperty` - Updates an entity's property to reference another entity. This will update both the navigation property (e.g. `PrimaryFamily`) and the foreign key property (e.g. `PrimaryFamilyId`).
- `UpdateDefinedValueProperty` - Similar to UpdateNavigationProperty, but this has additional logic to deal with attribute values. If the foreign key property is decorated with a DefinedValue attribute, it's information will be used to validate the specified reference.
```
// Update a person's first name. firstName is data type string. If it is
// null or empty then no change will be made.
helper.UpdateProperty( person, p => p.FirstName, firstName );

// Update a group's description. description is data type SetOrClear<string>.
helper.UpdateProperty( group, g => g.Description, description );

// Update a campus's leader. leaderPersonIdKey is data type SetOrClear<string>.
helper.UpdateNavigationProperty( campus, c => c.LeaderPersonAlias, leaderPersonIdKey );

// Update a person's connection status. connectionStatusIdKey is data type SetOrClear<string>.
helper.UpdateDefinedValueProperty( person, p => p.ConnectionStatusValue, connectionStatusIdKey );
```

Note

Whenever the parameter is of type `SetOrClear<>`, then it special handling comes into play. In all cases, if the `ClearValue` property is true, then the entity's value is set to null. Otherwise the value is updated to match the inner `Value` property. In the case of navigation properties, a blank or white-space `Value` property is ignored.  
  
When a parameter is not of type `SetOrClear<>` and it is a nullable type (such as `int?`), then it will be ignored if it is null. This pattern is most often used when the entity property is required, and we therefore know that null simply means "was not provided."

## Query Methods

Much like updating entities, querying them also presents problems. The problems are much easier to solve, but that can still clutter up your code having a bunch of micro if checks all over the place. The tool helper provides a number of methods to make building your queries easier, as well as at a glance to understand if it is required or optional.

- `WhereOptionalIdKey` - Filters a query to a foreign key property (e.g. `PrimaryFamilyId`) based on a string containing an optional IdKey. No error will be reported if the value is missing.
- `WhereRequiredIdKey` - Filters a query to a foreign key property (e.g. `PrimaryFamilyId`) based on a string containing a IdKey. An error will be reported if the value is missing.
- `WhereOptionalProperty` - Filters a non-foreign key property (e.g. `BirthYear`) based on a nullable value of the same data type. No error will be reported if the value is missing.
- `WhereRequiredProperty` - Filters a non-foreign key property (e.g. `BirthYear`) based on a nullable value of the same data type. An error will be reported if the value is missing. This method/pattern would usually only be used if there was some other check that happened first to land you in a branch where the value was now required instead of optional.
```
// Update the queryable to filter people by their primary family.
// primaryFamilyIdKey is data type string.
queryable = helper.WhereRequiredIdKey( queryable, p => p.PrimaryFamilyId, primaryFamilyIdKey );

// Update the queryable to filter people by their primary family, but only a value was provided.
// primaryFamilyIdKey is data type string.
queryable = helper.WhereOptionalIdKey( queryable, p => p.PrimaryFamilyId, primaryFamilyIdKey );

// Update the queryable to filter based on birth year if provided.
// birthYear is data type int?.
queryable = helper.WhereOptionalIdKey( queryable, p => p.BirthYear, birthYear );
```

Tip

If you have a truly required property, meaning it is not nullable, then simply using the standard `Where()` LINQ method. An example of this might be a tool that lists groups and you require that `groupTypeId` be provided. In that case, make it a non-nullable `int` and then use `Where( g => g.GroupTypeId == groupTypeId )`.

## Save Methods

Saving is pretty easy, but most of the time you need to save the entity and then any attribute values that might have been modified. This either requires that you just always try to save the attribute values, which isn't performant, or that you keep track if any attribute values actually changed. This also required you to do the save in a transaction to make sure everything saves consistently. But we have some methods to do that for you.

- `SaveChanges` - Saves the modified entities and any modified attribute values. This does not check if there have been any errors reported.
- `SaveChangesIfNoErrors` - Checks if there have been any errors reported on the helper. If not, then calls the helper `SaveChanges()` for you.

These save methods will perform the following steps for you:

1. Create a transaction.
2. Save all entities that have been modified and are attached to the context.
3. Save any modified attribute values that were updated via the `SetAttributeValues()` helper method.
4. Log any exception during the save and report the error in the tool.
```
// Save any and all changes, regardless of any errors being reported.
helper.SaveChanges();

// Save changes if nothing has gone wrong, and then return the error if
// something happened before or during the save.
helper.SaveChangesIfNoError()

if ( helper.HasErrors )
{
    return helper.ErrorResult;
}
```

## Summary Methods

These methods provider standard functionality when building summary tools and working with grouping data by multiple dimensions. First is a set of methods when working with the dimensions themselves.

- SetPrimaryDimension - Find the specified dimension in the list of dimensions and moves it to the front. This will report an error if the dimension was not found. This is used when you have multiple dimensions and the language model has requested a specific dimension to be prioritized.
- RemoveSatisfiedDimensions - This method will remove a set of dimensions from the list of available dimensions if the condition is met. In the case of a `string` condition, if the value is not null and not white space then the dimensions are removed. In the case of a `int?` and `bool?`, if there is a valid then the dimensions are removed.
```
string campusIdKey;
bool? isActive;
var dimensions = new List<string> { "Campus", "Leader", "IsActive" };

// Remove the "Campus" and "Leader" dimensions if campusIdKey not null or white space.
helper.RemoveSatisfiedDimensions( campusIdKey, dimensions, ["Campus", "Leader"]);

// Remove the "IsActive" dimension if isActive has a value.
helper.RemoveSatisfiedDimensions( isActive, dimensions, ["IsActive"] );
```

Another set of methods is for building the dimensions. Right now, these are limited to working with integer properties, such as `CampusId`. More overrides will be added as we gain more understanding of how dimensions on other property types will be used. For a full example of how to use these, take a look at the [summary tool](https://community.rockrms.com/developer/ai-agents/writing-custom-tools/native-tools/summary-tools#get-summary-result).

- `BuildDimension` - Builds a single grouped dimension from a set of grouped SQL records. This is designed to be called repeatedly to build multiple dimensions for your summary results.
```
Dictionary<int, string> campusNameLookup;
List<SummaryGroupResult> groups = null;
List<ConnectionRequestCounts> source;

// Build a single dimension for connection requests grouped by campus.
groups = helper.BuildDimension( groups, source, g => g.CampusId, campusNameLookup );
```

---

## Tool Parameters {#tool-parameters}

## Top Level Parameters

Contrary to the typical Rock pattern, do *not* create a POCO representation of your tool parameters. Flatten the list into top-level arguments to the method.

There are two primary reasons for this. First, these tools are never intended to be called by other C# code. Therefore we do not have to worry about breaking changes like we do for other utility methods. Second, the language model can easily get confused with nested POCO objects. And if you start with a single POCO, you are almost guaranteed to have nested POCO properties. Possibly nested multiple layers deep.

```
// ✅ Good
public IAgentToolResult SendEmail( string communicationIdKey, bool sendImmediately = false )

// ⛔ Bad
public IAgentToolResult SendEmail( SendEmailOptions options )
```

Because of how C# handles method parameters, there are some rules that automatically get enforced and passed along to the language model to give it a better hint about how to handle them when it constructs the arguments to pass to your tool.

- If a parameter has no default value, it is automatically enforced that it is *required*.
- Conversely, to mark a parameter as *optional*, you can give it a default value. If it is truly optional, the default should be null.
- For most reference types (numbers, bools, etc) you can use the `?` suffix operator to indicate that it allows a null value.

## Naming

Carefully think through how you name each parameter as well as whether it supports null values or not. In a normal C# method that operates on a person, a parameter name of `idKey` is good enough. We will general assume it is a person identifier it needs. And if we do it wrong, we'll get an immediate error and fix the code so it never errors again. With a language model, every time it does it wrong, it forgets that it did it wrong so it might do it wrong again. So naming the argument `personIdKey` will provide much more context to the language model.

```
// ✅ Good. Clearly identifies what kind of IdKey to pass.
public IAgentToolResult SendEmail( string communicationIdKey )

// ⛔ Bad. Maybe it's the person's IdKey we are sending to?
public IAgentToolResult SendEmail( string idKey )
```

## Null Handling

Similarly, if you have an integer parameter called `numberOfDays` but do not make it nullable and give it a default value of null the language model might not treat it the way you expect. For example, suppose you have (`int numberOfDays = 0`), you might assume this means it is optional. But the language model could easily infer that you meant "the number is required, but we will give you a default value if you forget". By using `int?` and a default value of `null` you are explicitly stating it is optional.

```
// ✅ Implies that sendImmediately is a necessary field, but we will provide a default value.
public IAgentToolResult SendEmail( string communicationIdKey, bool sendImmediately = false )

// ✅ Implies that attachmentId is completely optional and no default will be provided.
public IAgentToolResult SendEmail( string communicationIdKey, int? attachmentId = null )
```

---

## Gotchas {#gotchas}

## Overview

Things to look out for when writing native tools.

## Queryable object creation must be identical

When using a queryable to get the data directly from the database, as opposed to materializing full entity objects and then pulling out the specific properties you want, you may run into the following error:

> The type 'Rock.AI.Agent.Classes.Entity.PersonResult' appears in two structurally incompatible initializations within a single LINQ to Entities query. A type can be initialized in two places in the same query, but only if the same properties are set in both places and those properties are set in the same order.

This is a requirement of EF that all object initialization calls have the same structure. For example, lets take a look at this sample. We want to get both the requester and connector, but we want the connector to be able to display the photo.

```
queryable.Select( cr => new ConnectionRequestResult
{
    Requester = new PersonResult
    {
        NickName = cr.RequesterPersonAlias.Person.NickName,
        LastName = cr.RequesterPersonAlias.Person.LastName,
    },
    Connector = new PersonResult
    {
        NickName = cr.ConnectorPersonAlias.Person.NickName,
        LastName = cr.ConnectorPersonAlias.Person.LastName,
        PhotoId = cr.ConnectorPersonAlias.Person.PhotoId,
    }
} )
```

This will cause the above error because EF sees that we are creating two differently structured PersonResult objects. Even though this is logically perfectly valid, EF will have a problem with it. We don't know why, but you can't do this. Instead, you would have to make sure that all PersonResult objects are initialized the exact same way.

---

## Debugging Tools {#debugging-tools}

## Overview

Sometimes a tool does not behave the way you expect. When that happens, you can add debugging instructions to your prompt to better understand how the model evaluated the request and why it chose one tool over another.

## Explain Reasoning

One useful approach is to ask the model to explain how it handled the request, including which tools it considered and why it did or did not call them. For example:

> add a connection request for ted decker. He is interested in the greeters. This is high importance. \[Debugging: Explain your reasoning for any tools that were at all considered but eventually not called\]

The AI will still attempt to handle the request normally, but it will also return additional context about the tools it considered, the choices it made and the reasoning behind those decisions.

---

## Skills {#skills}

## Overview

Skills group related tools together so agents can work more effectively. They also provide shared usage context, which helps the agent understand how the tools connect without repeating the same explanation on every tool. For example, an *Event Registration skill* can explain how *Registration Templates*, *Registration Instances*, *Registrations* and *Registrants* relate to each other, giving the agent the structure it needs across the entire skill.

Skills also give you a single place to manage security. Instead of applying permissions tool by tool, you can secure the skill as a whole so related tools stay consistent over time, even as new ones are added.

Skills can be built using compiled C# or created with Lava, depending on the level of complexity and control needed.

## Skill Considerations

Before creating new skills, keep these principles in mind:

1. **Think in terms of usage.** Design skills around how agents will use them. Group tools in a way that makes logical sense, so your agents can work more effectively.
2. **Avoid overload.** Too many tools or skills increase confusion and raise the chance of incorrect tool selection.
3. **Optimize context size.** Each additional tool contributes to the size of the language model’s context for every call. Fewer, well-structured skills and tools help agents perform more reliably and efficiently. The larger the context, the higher the cost.
4. **Will existing tools work.** Existing tools might accomplish what you need already. Many skills have configuration options that let you refine how they behave. Changing the system prompt might also be enough to make the existing skills work for you by providing additional terminology. An example of this might be if you were using groups in Rock to track sports teams. If you use the system prompt to tell the agent that sports teams are actually groups of a specific type, that might be enough without having to create a new set of skills for "sports teams".

---

## Creating Skills {#creating-skills}

## Overview

Creating new skills in Lava is straightforward. When defining a skill, you’ll provide a name, description, and optional instructions. Here are some tips to keep in mind:

- **Name:** The name is critical since the agent orchestrator uses it to decide when and whether its tools should be called. Choose something clear that helps the AI understand the purpose of the tools within the skill.
- **Description:** This field is for internal reference only and is not exposed to the agent. Use it to document the purpose and scope of the skill for human readers.
- **Instructions:** This field is passed to the agent to give additional context about how the skill and its tools should be used. Its content is appended to the agent’s system prompt, so keep it concise. We recommend leaving it blank at first and only adding guidance when necessary. When used, instructions here often carry more weight than tool-level instructions alone.

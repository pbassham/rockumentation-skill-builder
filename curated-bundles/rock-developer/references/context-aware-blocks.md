---
description: Use when developing custom Rock blocks that need to access and respond to entities in the user's current context
source: "https://community.rockrms.com/developer/303\u002D\u002D\u002Dblast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

A context-aware block is so-named because its behavior is determined by the Rock entities that are active in the user's current context. The block may be designed to display information or perform actions that affect the specific Rock entities the individual user is currently working with.

The Notes block is an example of such a component - it can be used to add, edit or remove notes for a Rock entity such as a Person *or a* Group, and individual instances of the block inspect the current context to determine which Person or Group the notes are associated with.

Rock entities exist in the user's context when they are relevant to the current environment that the user is operating in. For example, when the Person Profile page is displayed, all of the context-aware blocks on that page display information about the selected person. Other entities related to that person *may* also be in context, such as the Campus with which the person is associated or the Group that represents the person’s family.

Rock provides the means to configure your custom block to work with specific types of entities, to determine which entities are available from the current user context and to easily access those entities. How your custom block makes use of the context is entirely dependent on the functionality you are seeking to implement.

## Site vs Page Context

An entity can be set into the context for the *site* level or a *page*, and there are certain blocks that do this. For example the CampusContextSetter block has a "Context Scope" setting, and when set to 'Site' the user selected campus will then be put into the context (for that person) for the site so that future/other pages the person visits can present information specific to the campus they selected earlier.

![](https://community.rockrms.com/GetImage.ashx?Id=66721)

Behind the scenes, that site scoped context is put into a long lasting cookie (`Rock_Context`). Additionally, blocks can also put the *page* scoped context into a long lasting cookie which will include the page Id (`Rock_Context:<pageId>`).

```
// set context and refresh below with the correct query string if needed
RockPage.SetContextCookie( campus, pageScope, false );
```

## Creating a Context-Aware Block

To configure your custom block to respond to entities that are in the current user context, decorate the block with the `ContextAwareAttribute`. Doing this will cause the RockBlock base class to populate these entities into the `ContextEntities` dictionary.

```
[ContextAware(typeof(Rock.Model.Person), IsConfigurable = false)]
// or
[ContextAware( typeof(Campus), typeof(Person) )]
```

To specify the types of entities that your block should respond to, set the `EntityType` or `EntityTypes` parameter to one or more Rock entities by specifying their corresponding .NET Types. If this parameter is omitted, the block can be used with entities of any type.

To allow configuration of the type of Rock entity that a specific instance of the block can respond to, set the `IsConfigurable` property to `true`. If you have provided a list of EntityTypes in the `ContextAwareAttribute`, the selection will be restricted to one of those Entity Types.

If you have a block that can work with any entity, you can just use the plain attribute. In this case the context entity type can be configured via a block setting:

```
[ContextAware]
```

In this case, the block will automatically have a new *block setting* to allows configuration of a particular entity type:

![](https://community.rockrms.com/GetImage.ashx?Id=66722)

## Accessing the Context

When a context-aware block is loaded at runtime, the block configuration is inspected to determine which Rock entity types are required. Entities of those types are retrieved from the current user context and stored in the block `ContextEntities` dictionary, using the `System.Type.FullName` of the entity type as the key. The context is determined from a combination of form data, page query string and page route parameters, with each one being inspected in turn for references to active Rock entities. Only one entity of each type can be in the context at any time.

To retrieve an entity instance from the context, reference it by type name in the ContextEntities dictionary.

```
var personContext = ContextEntities( “Rock.Model.Person” );
```

Alternatively, you can use one of the ContextEntity methods.

```
var personContext = ContextEntity<Person>();
```
```
// Get the entity from the block's context:
var contextEntity = this.ContextEntity();
```

If no entity of the specified type exists in the context, the `ContextEntity` reference will return `null`. It’s important to design your block in such a way that it can correctly handle the situation where there is no entity of the necessary type available.

Because there are some blocks (such as the ReminderLinks) block that works with many kinds of EntityTypes, it may be necessary to make a distinction between site or page scoped context entities. In these situations the RockPage.GetScopedEntityContexts(...) method might be used to get the collection of entities you are interested in:

```
var entityCollection = RockPage.GetScopedContextEntities( ContextEntityScope.Page );
```

## Runtime Configuration

When a block is added to a page, the page properties (gear) will show a Context Parameters section under the Advanced Settings of the page properties popup.

![](https://community.rockrms.com/GetImage.ashx?Id=66723)

This is how you can establish the parameter name that should be used to fill the context using that parameter’s value.

---

## Attributes {#attributes}

Attributes are one of the secrets to Rock's amazing capability. Pretty much anything in Rock can have an attribute -- and you can add them at runtime or bake them into your code.

## Adding Attribute Viewing/Editing Capabilities (the Attribute Value Container)

If you have a block that handles a particular entity which may have attributes, you can use the `AttributeValuesContainer` to quickly add view and edit capability to the block.

```
<div class="row">
    <div class="col-md-6">
        <Rock:AttributeValuesContainer ID="avcAttributes" runat="server" />
    </div>
</div>
```

### On View

```
connectionRequest.LoadAttributes();
avcAttributesReadOnly.AddDisplayControls( connectionRequest, Rock.Security.Authorization.VIEW, this.CurrentPerson );
```

### On Edit

```
device.LoadAttributes();
avcAttributes.AddEditControls( device );
```

...or

```
// to exclude attributes due to security:
avcAttributes.AddEditControls( campus, Rock.Security.Authorization.EDIT, CurrentPerson );
```

### On Save

```
avcAttributes.GetEditValues( device );
// Put these two saves in one transaction
rockContext.WrapTransaction( () =>
   {
      rockContext.SaveChanges();
      device.SaveAttributeValues();
  } );
```

---
description: "Use when building Obsidian blocks in Rock RMS, including architecture of C# blocks, TypeScript components, and Block Actions for server-client communication"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

Obsidian blocks are made up of multiple parts that all work together to display data to and interact with the individual.

## Anatomy of an Obsidian Block

The parts that make up an Obsidian block are the C# Block, the TypeScript Component and then the Block Actions.

At a high level, the C# Block provides the server-level logic and database access required to render the block on the web page.

The TypeScript Component then handles the required steps to take data provided by C# and render the block on the page and process the interactions with the user.

Finally, the Block Actions provide a sort of API that allows the TypeScript code to communicate with the C# code. For instance, when the user makes a change and clicks save, a Block Action is used to send that data to the server so it can update the database. The Block Action then provides information back to the TypeScript block with details about what to do next.

Lets take a hypothetical block that uses C# logic to calculate the length of a string typed by the user. We'll also put in a block setting that sets the maximum length that can be entered in the UI field. This is what the high-level life cycle of that block would look like. The blue boxes represent C# and the green boxes represent TypeScript.

![](https://community.rockrms.com/GetImage.ashx?Id=66767)

When the page loads, the C# method `GetObsidianBlockInitialization()` is called. That data it returns is then given to the TypeScript function `setup()` so it can initialize the UI. After that a processing loop begins. When the user clicks our custom button, that triggers the TypeScript `onFormSubmit()` function which in turn calls the C# `CalculateLength()` action method. The UI is updated and the processing loop continues.

Data flows between the C# code and the TypeScript code by way of bags and boxes. Under the hood, these are the same things: just simple POCO objects that contain properties. However, the term box is generally used when the bag is being used by the framework to provide additional data behind the scenes. And a box usually wraps a bag that the developer will use for their own details.

### C# Block

The most minimalist Obsidian Block's C# code can be pretty small. You basically inherit from a specific class and then implement a single method. Below is a slightly more realistic sample of what a basic block might look like in the C# implementation.

```
/// <summary>
/// A stark block that doesn't really do anything.
/// </summary>
[DisplayName( "Stark Block" )]
[Category( "Example" )]
[Description( "A stark block that doesn't really do anything." )]
[IconCssClass( "fa fa-square" )]
[SupportedSiteTypes( Model.SiteType.Web )]

#region Block Attributes

[IntegerField( "Max Length",
    Description = "The maximum string length that can be entered.",
    DefaultIntegerValue = 20,
    IsRequired = true,
    Order = 0,
    Key = AttributeKey.MaximumLength )]

#endregion

[Rock.SystemGuid.BlockTypeGuid( "1D6794F5-876B-47B9-9C9B-5C2C2CC81074" )]
[Rock.SystemGuid.EntityTypeGuid( "C03CE9ED-8572-4BE5-AB2A-FF7498494905" )]
public class StarkBlock : RockBlockType
{
    public static class AttributeKey
    {
        public const string MaximumLength = "MaximumLength";
    }
    
    // Methods Region
    
    // Block Actions Region
}
```

An Obsidian Rock Block inherits from `RockBlockType` and uses a number of C# attributes to specify the user friendly information such as DisplayName and Description. IconCssClass is used to give the administrator a visual hint about what the block does. Category determines what collection this block is a part of and generally follows the standard Rock domain rules.

You will also notice an attribute called `SupportedSiteTypes`. This tells the Rock framework if this block is a web block, or a mobile block; or both (though plugins do not have access to create mobile blocks). There are also `BlockTypeGuid` and `EntityTypeGuid` attributes. These must be present so that Rock can map this block type to the `BlockType` and `EntityType` tables. Each next-gen block (such as Obsidian or Mobile) exists in the `BlockType` table as well as the `EntityType` table. The latter, because Rock needs to know how to find the C# class to instantiate for the block.

Along with these standard bits of information, most blocks will have a set of Block Attributes that allow the administrator to adjust the behavior of the block. In our example above, we just define a maximum length setting.

When the Rock page is being rendered, the method below will be called to start the initialization process.

```
#region Methods

/// <inheritdoc />
public override object GetObsidianBlockInitialization()
{
    return new
    {
        MaximumLength = GetAttributeValue( AttributeKey.MaximumLength ).AsInteger()
    };
}

#endregion
```

This method returns an object, though usually this would be a named bag, that is then encoded and sent down to the browser. In our example here, we are taking the Maximum Length block attribute value and sending it down to the TypeScript component. This will be used later by the component when setting up the user interface.

Note

There is also a GetObsidianBlockInitializationAsync method you can override if you need to perform any asynchronous calls before returning the initialization object.  

A more normal block would probably be performing initial validation of query string parameters, loading data from the database, checking security and other operations just to name a few. Instead of throwing exceptions, you should always return a valid object and include any error information in that. This allows you to display a helpful message to the individual, for example, describing that the item was not found or could not be edited.

We'll cover the block actions region shortly.

Note

Because the returned object is serialized into JSON, any property keys or values you include must be supported by JSON.

### TypeScript Component

As you are about to see, building the TypeScript component for your block is nearly as painless. Let's start with an overview of what the block looks like.

```
<template>
    ...
</template>

<script setup lang="ts">
    import Block from "@Obsidian/Templates/block";
    import RockButton from "@Obsidian/Controls/rockButton";
    import RockForm from "@Obsidian/Controls/rockForm";
    import TextBox from "@Obsidian/Controls/textBox";
    import { useConfigurationValues, useInvokeBlockAction } from "@Obsidian/Utility/block";
    import { ref } from "vue";

    const box = useConfigurationValues<InitializationBox>();
    const invokeBlockAction = useInvokeBlockAction();

    // #region Values
    
    // #region Event Handlers
</script>
```

As you can see there is not much to it. We have an HTML template up top and then in our script block is all our logic. Our script logic is pretty straight forward. The first few lines import all the components and functions we need.

The first line of actual logic (line 13) obtains the configuration values that were returned by the C# `GetObsidianBlockInitialization()` method. The next line gives us a function reference that we can use to send block actions. The `useInvokeBlockAction()` function performs some glue work behind the scenes to make sure our block action requests get routed to the correct block.

```
// #region Values

const textValue = ref<string>("");
const responseText = ref<string>("");
const maxTextLength = ref<number>(box.maximumLength);

// #endregion
```

Next comes the simple values. The `textValue` variable will hold the value typed in the text box by the individual while `responseText` will contain the message in the response to our block action call. The `maxTextLength` will be initialized to the value that was provided from the configuration box which comes indirectly from the block attribute value. All of these are available in the template.

If we had any computed values, such as maybe the number of remaining characters before `maxTextLength` is hit, these would come after the "Values" region. Usually in a region called "Computed Values".

```
// #region Event Handlers

async function onFormSubmit(): Promise<void> {
    const parameters = {
        text: textValue.value
    };

    const result = await invokeBlockAction<CalculateLengthResponseBag>("CalculateLength", parameters);

    if (result.isSuccess && result.data) {
        responseText.value = result.data.message ?? "Unable to calculate length.";
    }
    else {
        responseText.value = \`Error: ${result.errorMessage || "Unknown error."}\`;
    }
}

// #endregion
```

Because our block is so simple, the meat of the whole thing is our event handler for when the form is submitted. When the "Calculate" button (defined later in the template) is clicked, it triggers the RockForm to validate the inputs and then fires off the Submit event which we handle here.

Invoking the block action is as simple as calling that `invokeBlockAction()` helper function we were given and specifying the name of the action and any parameters to send it. In this case, the only parameter is the `text` parameter that contains the string entered by the individual.

Note

Remember: The engine takes care of keeping textValue in sync with whatever the individual has typed in the text box. So we don't have to do any logic with that, we just access the variable and we get the current value.  

We specify that our expected return type is `CalculateLengthResponseBag` and then check to see that the response was successful. We also check if we actually got a data object back, just to be safe (this also makes TypeScript happy).

Assuming we got a successful response, we set our `responseText` to the message returned by the action. You'll note that we include a default message if there wasn't one. While this should never happen, it is certainly possible that it could due to broken proxies or other things that return a 200 OK response but not the data we expected.

Finally, if we didn't get a successful response, we display the error message or again a default error.

Now let's take a look at the HTML template that renders the UI.

```
<template>
    <Block title="Stark Block">
        <RockForm @submit="onFormSubmit">
            <TextBox v-model="textValue"
                     label="Text"
                     help="Enter the text you can calculate the length of."
                     rules="required"
                     showCountDown
                     :maxLength="maxTextLength" />

            <div v-if="responseText">{{ responseText }}</div>

            <RockButton type="submit">Calculate</RockButton>
        </RockForm>
    </Block>
</template>
```

The `Block` element is going to render our standard block panel for us. We just need to tell it what title to put in the header.

The `RockForm` element is going to handle all the form validation. When the form submit button is clicked (the Calculate button), it will perform validation and then emit the "submit" event, which we have tied to our `onFormSubmit()` function.

Next we wire up our text box. We give it the label, help bubble text and specify that the validation rules are `required`, so that it won't submit until the individual types something in. We want to show the character countdown and then specify the maximum length allowed for entry.

Underneath that we have a simple div that will contain the response text from the block action. It only displays if there is actually anything inside the `responseText` variable.

Finally, our `RockButton` is configured to be a submit button so it will trigger the form.

## Block Actions

Block actions allow the TypeScript component to communicate back with the C# block. Essentially, these are API endpoints that can be called directly on the block. Behind the scenes, there is a lot of wiring up happening so that in your C# code you have access to the original query string and your block attributes.

All this automatic wiring means you can treat your block action methods the same as you would the `GetObsidianBlockInitialization` method. Meaning, if you need to check a block setting, just call `GetAttributeValue`. If you need to check if the person has Edit permissions to the block before performing an action, just call `IsAuthorized`.

However, block actions are not stateful. A new instance of your class is instantiated each time a block action is called. This means you cannot simply assign some value to an instance field and make use of it during another block action call.

Note

Tip: In the rare case where you do need to provide some kind of state between action calls, you should encrypt the data and send it to the client as a Base64 encoded string. This prevents tampering with the state data.

```
/// <summary>
/// Gets the length of the string.
/// </summary>
/// <param name="text">The text entered by the individual.</param>
/// <returns>A response that represents the result of the action.</returns>
[BlockAction]
public BlockActionResult CalculateLength( string text )
{
    if ( text == null )
    {
        return ActionBadRequest();
    }
    
    string message = $"Your text was {text.Length} characters.";
    
    return ActionOk( new
    {
        Message = message
    } );
}
```

Obviously, this block action could be performed purely on the web browser. But it makes for a good demonstration. A block action is simply a public instance method that is decorated with the `[BlockAction]` attribute. The name of the action is taken from the method name by default, but can be changed by passing a parameter to the attribute.

The return type should be BlockActionResult. If you are familiar with IActionResult in ASP Net Core, this provides a similar experience. You can return different data objects as well as different error codes by way of various `Action...()` methods on the base class.

As you can see in the example above, we take the `text` provided by the TypeScript component as a parameter. If it is null, then we return a Bad Request response type. An empty string might be expected, but null means something went wrong.

Next we construct a message to be returned to the component to inform the individual of the length of the string. Most actions would have far more logic here.

Finally, We call `ActionOk()` and pass in an anonymous object that contains the message. You could technically just call `ActionOk( message )` and it would work, but it wouldn't be friendly for future features. If you later decide you need to add an additional bit of information to the data returned, you have to change the return type from a plain string to an object. So it's better to always return an object even if it only contains a single property.

## BlockCrumbs

Breadcrumbs can be customized by implementing the `IBreadCrumbBlock` interface on the block class and providing an implementation of `GetBreadCrumbs`. Below is a simple example that customizes the text of a breadcrumb and limits the parameters to only those necessary for the route.

```
public BreadCrumbResult GetBreadCrumbs( PageReference pageReference )
{
    // pageReference.Parameters will
    // contain both Route and QueryString parameters
    // for the page currently being viewed. 

    // Get the entity key for the lookup.    
    var entityKey = pageReference.GetPageParameter( PageParameterKey.LearningActivityId ) ?? "";

    // Get the name of this specific entity from the database, or from the cache if you can.
    var entityName = new Service<MyEntityType>( RockContext ).GetSelect( entityKey, e => e.Name );
    
    // You can optionally exclude parameters from the generated breadcrumb by removing them
    var paramKeysToInclude = new List<string> { "MyRouteRequiredParameter".ToLower() };
    var paramsToIncludeInBreadCrumb = pageReference.Parameters
        .Where( kv => paramKeysToInclude.Contains( kv.Key.ToLower() ) )
        .ToDictionary( kv => kv.Key, kv => kv.Value );

    var breadCrumbPageRef = new PageReference( pageReference.PageId, pageReference.RouteId, paramsToIncludeInBreadCrumb  );
    
    var breadCrumb = new BreadCrumbLink( entityName ?? "New Entity", breadCrumbPageRef );

    return new BreadCrumbResult
    {
        BreadCrumbs = new List<IBreadCrumb>
        {
            breadCrumb
        }
    };
}
```

Important

If your block requires Route parameters to work you'll want to implement the IBreadCrumbBlock interface to ensure that the Route parameters are available even if the those parameter values are not in the Session context (e.g. link sharing or after a server restart).  

## Boxes and Bags and Entities, oh my !

In the code samples above, we used anonymous object types. That is *not* good practice. There are a few reasons for this, but the most obvious is that it is error prone. For example, we initially returned an anonymous object from the `GetObsidianBlockInitialization()` method. In that we assigned the `MaximumLength` property to the integer value of the block attribute.

But if we forgot to call the `.AsInteger()` at the end, C# would have still happily compiled. But our data type would be wrong when we try access it from TypeScript which might cause an error. Or worse, it might just happen to initially work with the value we tested, but not work with other values.

Instead, we use classes that define all the properties and their types. These classes are generally called "bags". Because a bag contains a number of things that are usually related to each other in purpose. For instance, you might toss a bunch of spare change into a bag so you can transport it to the bank. But you wouldn't toss a bunch of quarters that you plan to use for practicing your trick shots into that same bag, that would just get confusing. Instead, those quarters go into a different bag.

Note

We originally used a suffix of ViewModel, but early on we realized that what we are creating doesn't really fit the standard definition of a "view model". On top of that, we already had a lot of "view" sounding words with various meanings, so we decided to eliminate one and use Bag instead. This is why the assembly is called Rock.ViewModels instead of Rock.Bags.

There are cases where certain features of Rock require their own data "behind the scenes" in addition to the custom data you want to return. For example, all Detail blocks have some standard data that is set by both the framework and your code; and then also the custom bag that contains the data to display. In these cases we have what we call a "box".

The rule of thumb is that any class that is used to transfer information between the server and the web browser should be in a bag. The exception, is a few specific features of blocks that will use boxes. We will go over the different situations in which you use a box when we cover Detail blocks and List blocks in a later section. But for now, a box should be returned from `GetObsidianBlockIntialization()` as well as used when passing data to or returning data from certain block actions, such as the Save action of a detail block.

The definition of our bag might look something like this:

```
namespace Rock.ViewModels.Blocks.Example.StarkBlock
{
    public class InitializationBox
    {
        public int MaximumLength { get; set; }
    }
}
```

So, in our GetObsidianBlockInitialization() method should really look something like this:

```
/// <inheritdoc/>
public override object GetObsidianBlockInitialization()
{
    return new InitializationBox
    {
        MaximumLength = GetAttributeValue( AttributeKey.MaximumLength ).AsInteger()
    };
}
```

With that in mind, we would do the same thing with our block action. Instead of returning an anonymous type it really should be returning a bag that contains the message. Our bag definition would look like:

```
namespace Rock.ViewModels.Blocks.Example.StarkBlock
{
    public class CalculateLengthResponseBag
    {
        public string Message { get; set; }
    }
}
```

Then our updated CalculateLength method would look like the following:

```
/// <summary>
/// Gets the length of the string.
/// </summary>
/// <param name="text">The text entered by the individual.</param>
/// <returns>A response that represents the result of the action.</returns>
[BlockAction]
public BlockActionResult CalculateLength( string text )
{
    if ( text == null )
    {
        return ActionBadRequest();
    }
    
    string message = $"Your text was {text.Length} characters.";
    
    return ActionOk( new CalculateLengthResponseBag
    {
        Message = message
    } );
}
```

Tip

If your block action takes more than 2 or 3 parameters, consider using a bag to pass in the data instead.

One final use of bags is entity data. If you need to send down an entity, create a custom bag for it that includes only the data you need. There are some methods in Rock that convert an entity to a view model, but these have a specific use and include far more data than you probably should be sending down.

## Code Generation

Important

The code generation currently only applies to core code, not plugins.

We've talked about some of the reasons to use bags instead of anonymous objects. Related to the reason of proper type checking is consistency of those bag definitions between C# and TypeScript. To that end, the Code Generator tool will automatically generate your TypeScript bag definitions for you.

First off, you should be putting all your bags in the Rock.ViewModels project. Anything specific to your block should go in `Rock.ViewModels.Blocks.[Domain].[BlockName]`. Any bags that are going to be general use or domain specific should go in `Rock.ViewModels.[Domain]`.

Note

If your Domain is actually a sub-domain, include that too in the namespace. For example, Rock.ViewModels.Blocks.Workflows.FormBuilder.FormBuilderTemplateDetail.

To run the Code Generator tool, open the Visual Studio solution file in the Rock.CodeGeneration folder. When you run it and tell it to generate the Obsidian View Models it will generate TypeScript definitions for every single class in the Rock.ViewModels assembly. If you make a change to one of your bags, just run the tool again and it will update the TypeScript files for you.

Note

We haven't talked about enumerations yet, but there is a Rock.Enums assembly and the same rules apply there. The Code Generator tool will automatically create the TypeScript files for any enums in Rock.Enums.

## Person Preferences

The [101 Developer Guide](https://community.rockrms.com/developer/book/16/16/content#personpreferences) talks more in depth about what person preferences are, so we'll just cover how to access them from inside Obsidian TypeScript code here.

### Preference Provider

Accessing preferences is handled through a preference provider. A component can get the preference provider for it's block with the following code.

```
import { usePersonPreferences } from "@Obsidian/Utility/block";

const provider = usePersonPreferences();
```

Preferences that are attached to the block instance are immediately available in the `blockPreferences` property. This is an instance of a `PersonPreferenceCollection` class, which we will discuss in the next section. There are two other functions available on the provider:

- getGlobalPreferences()
- getEntityPreferences()

The first method, as you might guess, grants you access to the individual's global preferences. This does not mean these are shared amongst all people, but rather that they are not attached to any entity.

The second method allows you to request the preferences attached to a specific entity given it's entity type and the identifier of the entity. Both of these can be the Guid, IdKey, or Id value.

Both methods also return a Promise to a `PersonPreferenceCollection`. The reason it is a promise is the preference values must be requested from the server. The `blockPreferences` properties is not a promise because the preference values are loaded with the block.

### Person Preference Collection

When using a `PersonPreferenceCollection` to access preferences, there are two things to keep in mind regarding the keys.

1. You do not need to add the `block-123-` prefix yourself. Simply use the `blockPreferences` property to get the collection and then access the key. Meaning, if you need to store the campus preference for the block, use the key `campus-preference` rather than `block-123-campus-preference`. The prefix will automatically be applied for you.
2. Use kebab-case for key names when possible. For example, use `campus-preference` instead of `campusPreference` or `CampusPreference`.

Accessing preference values is primarily done via three functions: `getValue()`, `setValue()` and `save()`.

You can probably guess what each of these does so we won't go into too much detail. `getValue()` will return either the value associated with the key or an empty string. It will never return `null` or `undefined`. `setValue()` will set the value associated with the key. If you pass an empty string for the value then the preference will be deleted.

After calling `setValue()` you will need to call the `save()` function at some point. If you are setting a bunch of preference values, then make all the `setValue()` calls first and then a final call to `save()`. The `save()` function will return a Promise that lets you know when the save operation has completed and the modified values have been updated on the server.

Change tracking is also handled by the collection. If you call `setValue()` with a new value that is the same as the old value, then no operation is performed and `save()` will also do nothing.

There is one other function that might be useful to be aware of: `withPrefix()`. This function will return a new collection limited to the values that start with the given prefix. Any values you set will also use this new prefix.

Here is an example of how everything might look to get and then set a preference value.

```
import { usePersonPreferences } from "@Obsidian/Utility/block";

// We only need the block preferences, so no need to save the provider.
const preferences = usePersonPreferences().blockPreferences;
let campusPreference = preferences.getValue("campus-preference");

// Do some work with the campusPreference which changes the value.

preferences.setValue("campus-preference", campusPreference);
preferences.save();
```

## Security

Caution

Security is an important consideration. Don't leave it as the last thing you think about when designing your block. Otherwise you will be tempted to cut corners and say "that should be good enough".

The security with Obsidian blocks can be summed up in three words: There is none.

Okay, that isn't entirely true, but it's a good way to think of it. On the C# side, you have security. You can check security and enforce it. The same is not true on the TypeScript side.

A simple example of this would be a block that allows normal users to edit the Name and Description, but only administrators should be able to edit the Contact Person. You can provide a boolean in your Box that tells the TypeScript component to hide the Contact Person during editing. But if your Save block action doesn't perform the same security check, you just wasted your time.

Remember that there is no security in the browser. If you send down an object to the browser that says "don't show contact person", there is nothing stopping the individual from opening their browser tools and switching that flag to say "do show the contact person". They could then make the edit in the browser and click Save.

So your Save block action needs to not trust the data coming from the browser. Always check (or re-check) security in every block action. Also remember to think through the security in your initialization method. Don't send down sensitive data to the user expecting it will be hidden. Assume that once it leaves the server, anybody can view it.

The same is true of any data, not just secure data. If your TypeScript component gives them a radio button list of 3 items, "one", "two" and "three", nothing prevents the individual from editing stuff in the browser. They might send back "four". In your block action you need to re-validate the information that came in and handle it appropriately.

Warning

It's worth saying again. Never trust data from the client. Always re-check security and re-validate the data itself. Something that seems like no big deal to you can be used by a bad actor to exploit your code into a back door.

## Other Block Life Cycle Events

### Block Updated

If you need to update your block's UI/data based on a block setting change (similar to the old BlockUpdated event in Rock webforms) you can do it in a few ways listed here from most common to least common:

1. Add the `onConfigurationValuesChanged(useReloadBlock())` to your .obs block. Note you'll want to also add `import { onConfigurationValuesChanged, useReloadBlock } from "@Obsidian/Utility/block";`
2. If you need more control (perhaps you need to call a block action after the settings change), you can implement your own custom function `onConfigurationValuesChanged(myCustomFunction())`
3. Or, add a `[ConfigurationChangedReload( BlockReloadMode.Block )]` attribute to the C# block. This will reload the block as if the page were first being loaded.

### Block Roles: Primary, Secondary, etc.

By default, all blocks treated as "Content" blocks.  However, you can override this default role by decorating your block class with a C# attribute:

`[Rock.Cms.DefaultBlockRole( BlockRole.Primary )]`

**Available Block Roles**

- **System** \- Used for blocks that provide core system-level functionality on the page.
- **Navigation** \- Used for blocks that manage page navigation.
- **Content** \- The default role. Typically used for blocks that display informational or visual content. This content might be static or dynamic (e.g., a Lava-powered copyright footer).
- **Primary** \- Indicates that the block delivers the main functionality of the page.
- **Secondary** \- The block provides secondary functionality for the page. These are commonly hidden when a Primary block enters edit mode.

#### Setting the Secondary Role

If your block serves a supporting function and should be hidden when the Primary block enters edit mode, you can set it to the Secondary role like this:

`[Rock.Cms.DefaultBlockRole( Rock.Enums.Cms.BlockRole.Secondary )]`

That's all you need to do to achieve that functionality! Crazy, right??

Any `<DetailBlock` will automatically hide secondary blocks when going into edit mode.

#### Assigning a Role per Block Instance

If your block’s role depends on how it's used in a specific context (rather than its block type), you can configure the role at the block instance level. To do this, open the block’s Advanced Settings, where you’ll find the Block Role option. This allows you to assign the appropriate role without modifying the block’s code.

![Block Settings > Advanced Settings - Role](https://community.rockrms.com/GetImage.ashx?Id=69840)

#### Lower Level Control

If you need finer control over block behavior, Obsidian provides a set of utility functions you can use in your component. These are available by importing from `@Obsidian/Utility/block`:

- hideBlockRole(role)
- showBlockRole(role)
- reloadBlockRole(role)
- useBlockActions() - This lets you override the default behavior of the block (hide, show, reload) when requested by one of the above functions.

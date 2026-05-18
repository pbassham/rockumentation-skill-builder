---
description: "Use when developing custom UI controls in Obsidian, including component file structure, .obs file conventions, and Control Gallery documentation"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

Note

Much of this information is targeted at core UI controls rather than plugins. The general principals are still valid for plugins, but obviously the file paths and API paths will be very different for a plugin.

## .OBS Files

Instead of using a standard file extension for the framework we're using, we use .obs for our component files. This is short for Obsidian and it allows us to potentially change the underlying framework in the future without needing to rename files.

This file extension change is one of the reasons you really need to make sure you [development environment](https://community.rockrms.com/developer/obsidian/core-development-environment) is set up correctly, so your editor knows what to do.

## Where to Start

The best place to start is `Rock.JavaScript.Obsidian/Framework/Controls`. This is the location where any general controls should be located. Create a file here with that .obs extension following the [Obsidian Component Structure](https://community.rockrms.com/developer/obsidian/obsidian-component-structure). In rare cases, it may make more sense to use a TypeScript file (.ts extension), such as with complicated multi-part component (see. `grid.ts for example`) or if you're writing a renderless or functional component.

If your component requires multiple files in order to separate logic and templates out to several components that work together as one more powerful component, and those sub-components shouldn't be available for use outside of the "super" component, then they should be placed in a subdirectory. If they are internal to the Rock project, then they can be placed in the `Internal` subdirectory, or if there are numerous subcomponents, it may be better to place them in a separate subdirectory named after the main component.

All of these subcomponent files should end with `.partial.obs`. This will ensure that all of the subcomponents are compiled together with the main component, creating fewer files to download but allowing us to develop them in a more modular way.

## The Control Gallery

There is an Obisidian block called "Control Gallery" where we have a list of most of the Obsidian controls and demo them, many of their options, and how to use them in your own code. Whenever you create a control, it should be added to this gallery. This not only helps document our controls for everyone, it can also be used as a sandbox where you can test your components as you develop them.

To add a component to the gallery, go to `Rock.JavaScript.Obsidian.Blocks/src/Example`. In there is the `controlGallery.ts`. In there, depending on when you look, you may find a *lot* of gallery components. Originally, we defined these gallery components here, but since this file ballooned to multiple thousands of lines, we've started moving them to their own files. At some point, they will all be moved out, and we may not update this document immediately when that happens, so ignore this if it's no longer the case.

In that directory, you should also see a `ControlGallery` directory. In here is where we are defining the gallery components. Each component should have its own `.partial.obs` file, which builds out a demo for that component.

### Register Your Component in the Gallery

For now, just copy another component file from this folder and rename it to match the name of your component. We'll talk a little more about what's going on inside of a gallery component in a bit, but before we do, go back into `controlGallery.ts`. At the very top of the file is a large list of imports. Your gallery component should be imported here at the top, then near the bottom of the file should be a variable named `controlGalleryComponents` with a massive list of all the gallery components. Add the imported gallery component to the end of this list. That's all that's needed to register it in the control gallery, now let's go back and take a look inside a gallery component.

### The Gallery Component

Most gallery components are quite similar as they follow a similar pattern so they look and act consistent in the control gallery. Here's an approximation of what you'll find in a gallery component:

```
<template>
    <!-- 1 -->
    <GalleryAndResult :value="value"
                      <!-- 2 -->
                      :importCode="importCode"
                      :exampleCode="exampleCode"
                      enableReflection>

        <!-- 3 -->
        <MyControl v-model="value" :someOption="someOption" ... />

        <template #settings>
            <div class="row">
                <!-- 4 -->
                <div class="col-md-3">
                    <CheckBox label="Some Option" 
                              v-model="someOption"
                              help="This option does something" />
                </div>
                ...
            </div>

            <!-- 5 -->
            <p class="text-semibold font-italic">This is an important note</p>
            <p>This is a less important note</p>
            
        </template>
    </GalleryAndResult>
</template>

<script setup lang="ts">
    import { computed, ref } from "vue";
    /* 1 */
    import GalleryAndResult from "./galleryAndResult.partial.obs";
    /* 3 */
    import MyControl from "@Obsidian/Controls/myControl.obs";
    import CheckBox from "@Obsidian/Controls/checkBox.obs";
    import { getSfcControlImportPath } from "./utils.partial";

    const value = ref({});

    /* 4 */
    const someOption = ref(false);
    ...
    
    /* 2 */
    const importCode = getSfcControlImportPath("myControl");
    const exampleCode = computed(() => {
        return \`<MyControl v-model="value"${someOption.value ? \` someOption\` : ""} ... />\`;
    });
</script>
```

The important pieces are notated with a numbered comment.

**1**: `GalleryAndResult` is a component specifically for the control gallery that wraps around these gallery components to make sure they all look and act in a similar fashion. For any components with a v-model or props with large/complicated data, you can pass that in to the `value` prop so that people have a way of seeing what goes into and comes out of a component. If you have multiple values to pass in, you can set the `hasMultipleValues` prop and pass in an object to `value` with the property keys being the name of the prop. You can see `buttonDropDownListGallery.partial.obs` for an example of that. These values show up in a well on the top right of the gallery. I recommend looking through `GalleryAndResult`'s source code to see what other more edge-case options there are.

**2**: The `importCode` and `exampleCode` props are used to show some examples of code for importing and using the control. `importCode` will almost always use the `getSfcControlImportPath` helper function to generate the import code needed and all you need to give it is the camel case name of the component. `exampleCode` is a little more involved. Previously, we simple set it to a static string of some example code, but since moving these gallery components to their own files, we've started making them dynamic computed strings that show the options that are currently being used so as options are adjusted in the gallery, people can see how to effect that change in the example code.

**3**: This is your control that you're demonstrating. Make sure you pass in all of the relevant props that developers can use.

**4**: This `settings` slot is where you implement all of the options/props for your component. Initialize all of the options to their default and provide a useful input control for people to change the options on the fly while using the gallery. For example, boolean options should use checkboxes, options that only have a few possible values can use a dropdown or radio list to allow people to quickly switch between the values. You may even want to use something like the `EntityTypePicker` if the prop takes a entity type GUID.

Usually these options are displayed on a Bootstrap grid for organization

**5**: Notes go at the end of the `settings` slot. Often there is something we want people to know that aren't obvious or discoverable from the rest of the gallery, so we leave them some notes here. It's very common for input components - which all use the `RockFormField` component - not to show every single option that `RockFormField` uses. Instead, there's a note telling people that this component also supports all the same options as `RockFormField`.

### Security Grants and Security Grant Tokens

Obsidian controls are limited by the standard API authentication in order to determine access rights, unlike Webforms, so, for instance, if a person doesn't have permission to see an item that would normally be a drop down, it won't show up. To alleviate this, we have security grants that blocks can provide to allow controls access to what the block specifies.

On a high level, blocks create security grants on the back end specifying allowed access to entities, entity types, etc. Those grants are passed to the front end as an encoded token string and the Obsidian blocks provide those tokens to their child controls and the controls pass those tokens to API calls. The API endpoints use the token to retrieve the security grants and determine if the user has access to data provided by that endpoint.

### Creating a Security Grant

Creating a security grant is generally the responsibility of a block. This is usually done via method called `GetSecurityGrantToken` that is called during the initialization of the block and passed to the client via the block's configuration "box". The `RenewSecurityGrantToken` block action should also be implemented to renew the token. By default, the tokens expire after an hour, but the client automatically renews them using the block action while the block is still instantiated on the page.

In the `GetSecurityGrantToken` method, a `new SecurityGrant` is instantiated. The most basic way to then provide grant rules, then, is to instantiate an `EntitySecurityGrantRule` or `EntityTypeSecurityGrantRule` (there are other grant rule types, but these are the most common), passing in the entity (type) being granted access to and an `Authorization` type (`VIEW`, `EDIT`, etc.):

```
private string GetSecurityGrantToken(SomeEntity entity)
{
    var securityGrant = new SecurityGrant();

    securityGrant.AddRule( new EntitySecurityGrantRule( entity, Authorization.VIEW ) );

    return securityGrant.ToToken();
}
```

Note that `SomeEntity` is just a made up entity type used purely as an example. There are helper methods to help with common rule sets and such, but we won't go over those here. Instead, look through existing blocks to see how they handle security grant rules.

### Providing the Security Grant Token

In the block on the front end, we need to take the token passed down by the back end and provide it to the controls. There is a very prescriptive way this is done inside the script section of the block:

```
import { getSecurityGrant, provideSecurityGrant, useConfigurationValues } from "@Obsidian/Utility/block";

const config = useConfigurationValues<SomeBlockBox<SomeBlockOptionsBag>>();
const securityGrant = getSecurityGrant(config.securityGrantToken);
provideSecurityGrant(securityGrant);
```

Note that `SomeBlockBox<SomeBlockOptionsBag>` is purely made up as an example and are not actual types. You can see we're pulling the token from the given `config` and passing it to `getSecurityGrant`. This gives us an object representing the security grant and also handles the scheduling the renewal of the token. Finally we call `provideSecurityGrant` to `provide` the grant so child components can inject it. This is done with the following code inside a component's script:

```
import { useSecurityGrantToken } from "@Obsidian/Utility/block";
const securityGrantToken = useSecurityGrantToken();
```

This injects the token into the component. Then the token needs to be sent along as part of the parameters being sent to an API call so the endpoint can authorize access based on the token.

```
const options: SomeControlSomeActionOptionsBag= {
    securityGrantToken: securityGrantToken.value
};
const url = "/api/v2/Controls/SomeControlSomeAction";
const response = await post<SomeControlSomeActionResultsBag>(url, undefined, options);
```

### Checking Access

When implementing an API endpoint in `ControlsController.cs`, you need to accept the token as one of the options, create the security grant from the token and then use the grant to verify if access is granted:

```
public IHttpActionResult SomeControlSomeAction( [FromBody] SomeControlSomeActionOptionsBag options )
{
    var grant = SecurityGrant.FromToken( options.SecurityGrantToken );
    
    // Getting a single entity?
    if ( entity is ISecured securedEntity )
    {
        var isAuthorized = securedEntity.IsAuthorized( Authorization.VIEW, RockRequestContext.CurrentPerson )
            || grant?.IsAccessGranted( entity, Authorization.VIEW ) == true;
    
        if ( !isAuthorized )
        {
            return Unauthorized();
        }
    }
    
    // Or getting a list of entities?
    entities = entities.Where( e => e.IsAuthorized( Authorization.VIEW, RockRequestContext.CurrentPerson )
        || grant?.IsAccessGranted( e, Authorization.VIEW ) == true )
    .ToList();
}
```

If the endpoint is meant to get a single entity or manipulate an entity, then check the access and if the user has not been granted access, then return `Unauthorized()` to send back a 401 status. If the endpoint is doing something other than fetching, make sure to use the appropriate `Authorization` type, such as `Authorization.EDIT` or `Authorization.DELETE`.

If the endpoint is grabbing a list of entities, then it doesn't need to return `Unauthorized()` when not authorized to access something. Instead, just exclude those entities from the list.

More coming soon...

- General use controls
- Drop Down style pickers
- RockFormField for input controls
- Tiered / multi-item pickers
- API endpoints
	- ControlsController
		- ViewModels (OptionsBag and ResultsBag) -\> Generate Obsidian View Models
- Types

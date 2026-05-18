---
description: "Use when building detail blocks that display entity information with edit capabilities, labels, badges, and customizable header/footer actions"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

A detail block is a term used to identify a very specific type of block. These blocks show an entity on screen with an Edit button that allows for editing one or more values of the entity. Detail blocks also have labels, badges, and custom actions defined by the block developer.

## Detail Block Anatomy

![](https://community.rockrms.com/GetImage.ashx?Id=66772)

Detail blocks have a very specific look and feature set. These are meant to be standardized so that we can adjust the look of all detail blocks by editing a single file. This means while you can turn features on and off, the UI layout is not up to you. As a block developer you simply provide a list of things to be displayed and the detail block component will handle the layout for you.

Note

The screenshot above is very noisy with how many things are shown, but that is a sample with all the bells and whistles enabled. It is unlikely you will have everything populated like this.

![](https://community.rockrms.com/GetImage.ashx?Id=66771)

The top header row contains the block title as well as the header actions. The title is automatically calculated by the detail block component from the properties you provide it. On the right side are the header actions. These are strongly formatted, which means you simply provide a list of actions (name, icon, color, callback) and the detail block component will handle the layout.

The header actions contain a composite of primary header actions provided by you plus some auto generated ones. The question mark will show up if you provided any help text. The square toggles full-screen mode. And the vertical ellipsis will show up if there are any secondary header actions.

![](https://community.rockrms.com/GetImage.ashx?Id=66770)

Next row is the label and badge bar. You provide the same strongly typed set of block actions and they will be rendered as labels. Normally, your labels won't have actions associated with them and will just display the label text. But since they are block actions they *can* respond to clicks, which means you can use them to toggle functionality on and off too.

On the far right of this bar is where the badges will go. These are also handled automatically by the component and will automatically display any badges configured for this entity type. Though you can tell it to not show any badges.

Note

If there are no labels and the badges are hidden then the entire bar will be hidden from view.

Next comes the body, which we don't really need to go into. This is all free-form area for you to fill up.

![](https://community.rockrms.com/GetImage.ashx?Id=66769)

At the bottom is the footer actions. On the left is the primary footer actions. The default feature buttons will be displayed first (in this screenshot, "Edit" and "Delete"). Following them will be any primary footer actions that you provide. Once again this is a strongly typed block action.

On the far right are the secondary actions. Any actions provided by the detail block will be shown first (such as the security button), followed by your custom secondary actions.

In order for all this magic to work, you need to supply the detail block component with a few additional values.

- entityTypeGuid
- entityTypeName
- name (of entity)
- entityKey

This is the minimum required set. With these, the detail block component can automatically handle things like the panel title, the security button, displaying badges and more.

There are a lot of other properties you can pass to customize the behavior, and to an extent the look, of a detail block. Take a look in the gallery to see all the options available to you.

### Panel Actions

The custom actions and labels that you can provide are defined by a collection of PanelAction objects. Each visual element is represented by a single PanelAction which consists of the following properties:

- title
- iconCssClass
- type
- handler

The title is the text to display for the action. In the case of a label, it is the text to show inside the label. The title should be kept very short, probably no more than two words.

IconCssClass contains the class to use to draw the associated icon. For example, a header action doesn't have any text so you would use something like `fa fa-user` to tell the block how to draw your action button.

Type indicates the color style of the action and can be one of the following: default, primary, success, info, warning, danger, link.

handler is a JavaScript function that will be called when the action is clicked. If you just want to display something and have it not be clickable leave this undefined.

Note

The type property is required. Also, one of either title or iconCssClass must be specified. In some cases both can be specified.

### Code Generation Tool

Important

The Code Generator tool is currently only available for core blocks, not for plugins.

There is a lot of boiler plate code involved with creating any block, especially a detail block.

If the entity has an `IsSystem` property, then there is standard logic that is usually applied to prevent editing or limit what can be edited. If the entity has an `IsActive` property, there is a standard checkbox and label that usually show up.

We didn't want to require the block developer write all this boilerplate code by hand or copy it from an existing block (both of which can be prone to error), so the code generation tool will do this for you.

When you run the Code Generation tool, select the Obsidian Detail Block option to start the process.

![](https://community.rockrms.com/GetImage.ashx?Id=66768)

On this screen you will click the pencil at the top to select the entity you are creating a detail block for. Then select all the properties you want to include in the block. There are a couple things to take note of.

First, we are including `IsSystem` even though we don't plan to include it in the UI. This is because we need it in the entity bag so that the UI can decide if editing should be allowed.

Second, we only select the navigation properties and not the integer identifier properties. When the boilerplate code is generated, the bags will contain `ListItemBag` objects for these properties that contain the name and guid of the associated entities. This is what the pickers use.

Finally, there are some options you can adjust on the right-hand side. If you do not want your detail block to support attribute values then you can turn those off.

Note

All detail blocks should have attribute value support unless you are explicitly instructed to not support attributes. If you think it is a mistake for the block to support attributes bring it up with the DSD rather than just turning it off.

You can also select if you want the detail security logic to be entity or CMS security.

- Entity security means the entity itself is used to verify authorization.
- CMS security means the security on the block is used to determine the access permissions to the entity.

Important

A detail block should always have security of some kind. A number of the older WebForms blocks did not do any security checks beyond if the user had View access to the block. If you are converting a WebForms detail block that does not do any security checks then you should create the new block with CMS security selected.  
Check the existing security on the page(s) that use the block to determine if the effective View and Edit permissions are the same. Then discuss with the DSD to see if any further action needs to be taken.

Once you have made your selections, click the Preview button to get a list of all the generated files.

![](https://community.rockrms.com/GetImage.ashx?Id=67339)

This screen allows you to review the files that will be generated. On the left is the files that were generated. The right side view shows you the path (relative to the Rock solution) it will be written to as well as a preview of the contents. If a file already exists at that location you can view the differences between them.

You can also select which files to actually save. This is helpful if you want to quickly update the bag with new properties but not overwrite all the custom logic you've written.

Tip

If the file has a green check mark instead of the check box, that means the file on disk is already up to date and doesn't need to be written.

When you are ready, click Save to write the files to disk and add them to the appropriate projects.

At this point, you have generated some of the TypeScript files and all the C# files. But the TypeScript ViewModels have not yet been generated. In order to do this part you need to close the Code Generation tool and build the Rock.ViewModels project.

Re-launch the Code Generation tool and this time select the Obsidian View Models option. You can turn off any view models you don't want, but best to just leave everything on. Click the Preview button and once again you will get a screen that shows you the files that were generated and need to be saved to disk. When you are ready, click Save.

At this point, you should be able to build and run the Rock solution and your new detail block should be available and functional. Once you have verified that the boilerplate code is working you can begin adding your custom logic and UI components.

Note

By default the TypeScript onSave() handler indicates that all properties you selected are valid. This means that all values would be looked at and saved to the database. Any properties that are meant to be "read-only" (such as IsSystem in the picture above) should be removed from this list.

Note

There are a few properties that are detected by a matching name and if you include them additional functionality will automatically be added. These include: Name, Description, IsSystem and IsActive.  

## Special Block Types

This section contains some specific details to be aware of when building special detail blocks. By "special" we just mean they don't fit the pattern exactly and you might need to make some additional manual modifications.

### Component Instance Blocks

A component instance is something like a Binary File Type. There are components (like AWS, Azure, Database) that handle the actual storage. These components don't actually exist in the database. They are C# code only. Instead we have instances of them in the database in the form of the Binary File Type model.

The configuration is taken from the attributes on the components. But in order to make that work there is some special code that needs to be called to make sure those attributes exist in the database.

Also, components by default have Order and Active attributes. When components are used as singletons these specify the order of the component and if it is active. When the components are used as instances, these are not used so they need to be excluded from the detail block.

You can see an example of how to do that in this commit: [https://github.com/SparkDevNetwork/Rock/commit/8a3f0a891c5e35350175f59e2cad11a78eeac486](https://github.com/SparkDevNetwork/Rock/commit/8a3f0a891c5e35350175f59e2cad11a78eeac486)

The various calls to `EnsureComponentInstanceAttributes()` method make sure the attributes have been created for the instance. This only has to happen once for each component but if the attributes already exist the method just doesn't do anything, so it's safer to call it every time you `LoadAttributes()`.

Finally, when we get the attributes to send to the client and then get them back from the client we use a method called `IsAttributeIncluded()` to determine if the attribute should be included. This will check the keys and exclude the Order and Active attributes.

## Demo

<iframe src="https://player.vimeo.com/video/712900177?title=0&byline=0" allowfullscreen></iframe>

A few updates that have changed since the video was recorded.

First, note that when in the editPanel.ts file and adding new values the video shows using plain "ref()" function calls (at around 8:00). You will see this is slightly different for "name" and "description" in the code generated. These now use the "propertyRef()" function. This is to better support attributes with qualifier column values. The "propertyRef()" function allows you to create a ref and associate the SQL Column Name (C# Property Name) of the column.

Do remember that this isn't just the name of the variable you are assigning it to nor is it always the name of the property on the bag. So if you are creating a ref for the "leaderPerson" property on the bag, the underlying SQL column and C# property is most likely "LeaderPersonAliasId", and that needs to be what you pass as the second parameter to "propertyRef()".

Also, at around 8:10 in the video we add the new variables we create to the "watch()" function call. Instead, the code generation tool now creates a "propValues" array for you to assign these to. If your value is a "propertyRef()" then assign it to this array. If it is not, then pass it to the watch() function directly.

---

## Creating List Blocks {#creating-list-blocks}

These are also mostly standard, cookie cutter blocks and typically just display a list of records for a particular entity. Use the Code Generator tool to create a vanilla List block and then modify it as needed:

![](https://community.rockrms.com/GetImage.ashx?Id=66773)

Important

The Code Generator tool is currently only available to core blocks, not plugins.

If you want to look at an example of an Obsidian List block you can review the [ObsidianGalleryList](https://github.com/SparkDevNetwork/Rock/blob/develop/Rock.Blocks/Example/ObsidianGalleryList.cs) block which displays all people records in the Rock instance.

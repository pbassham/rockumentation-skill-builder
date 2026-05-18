---
description: "Use when building a new Obsidian field type, enabling field type support, or implementing field type components in Rock"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

*Step-by-Step guide to Building an Obsidian Field Type*

Here we'll be going over the practical steps of building a field type because it involves multiple files and it can be difficult to remember some of the steps or where some of the files reside. We will not be diving much into concepts or patterns that you need to implement. For those, you can find you can look at the [Creating Field Types](https://community.rockrms.com/developer/obsidian/creating-field-types) page where there's an overview of the concepts as well as a reference of all the methods you'll need to create/override/use and how they're used.

Also, just a note before we get started. I'm going to be using three X's as a placeholder for the name of the field type you're looking to create, using different capitalization to represent how it should be capitalized:

| X's | Case | Example |
| --- | --- | --- |
| xxx | camelCase | locationList |
| Xxx | PascalCase | LocationList |
| XXX | ALL\_CAPS | LOCATION\_LIST |

### Enabling Obsidian Field Type Support

To start, we need the front end to know that the field type you're working on has Obsidian support, otherwise it won't even show up as an option, even if you've created everything else.

Find the C# version of the field type under `Rock/Field/Types/XxxFieldType.cs`. In that file, add `Utility.RockPlatform.Obsidian` to `RockPlatformSupport` list. Next, copy the GUID string from inside `Rock.SystemGuid.FieldTypeGuid` to your clipboard. Then replace that GUID string with `Rock.SystemGuid.FieldType.XXX` (replace the XXX with the ALL\_CAPS name of the field type). This will probably be underlined in a red squiggle for now. We'll fix that next.

Open `Rock/SystemGuid/FieldType.cs`. If your field type isn't listed here, add it to this list, following the pattern of the existing field type constants in the file, putting it in alphabetical order, and pasting the GUID you copied earlier as the value. Those red squiggles from before should be gone now.

Build the Rock project, then start up the code generator and run the "Obsidian System Guids" function. Make sure "FieldType" is checked and hit Preview, then "Save", then you can exit the generator.

Congratulations! You've just told Obsidian that the field type exists.

### Creating the Obsidian Field Type

In the `Rock.JavaScript.Obsidian/Framework/FieldTypes` folder, create the `xxxField.partial.ts` and `xxxFieldComponents.ts` files. It's probably best to copy an existing similar field type's files so you have a skeleton to give you a kickstart. Once you have that started, open `Rock.JavaScript.Obsidian/Framework/FieldTypes/index.ts` and import and register your field type, following the same pattern as you see throughout the file.

If you've been using the build script that watches for changes to rebuild, then now is the time to restart it (or start it if it wasn't running yet) to pick up the new files and build them. You shouldn't need to restart the Obsidian build after this unless you create some other new files.

For information on what you should be doing in these two TypeScript files, see [Creating Field Types](https://community.rockrms.com/developer/obsidian/creating-field-types).

### Converting Value for the Database/Client

In the `XxxFieldType.cs` file, for (probably) most field types, you'll need to implement the `GetPublicConfigurationValues`, `GetPrivateConfigurationValues`, `GetPublicValue`, and `GetPrivateEditValue` methods. Often, the C# version of the field type uses IDs or GUIDs to reference certain values, but in Obsidian, we usually use `ListItemBag` objects. Because of this - and other similar situations - you'll often need to implement `GetPublicConfigurationValues` to convert some configuration values and `GetPublicValue` and/or `GetPublicEditValue` to get the field's value in formats that the client can use.

If you use those, you'll also need to use `GetPrivateConfigurationValues` and `GetPrivateEditValue` to convert the values from the client to formats that should be saved in the database and used by the C# version of the field type.

For more information on those methods and other methods you may need to implement in the field type class, see the C# reference section of [Creating Field Types](https://community.rockrms.com/developer/obsidian/creating-field-types).

Warning

If your implementations GetPublicValue and GetPublicEditValue each return different values, there are potential situations where getTextValue (and other getXxxValue methods) in the Obsidian field type file could get the "edit" value (if a value from the edit component doesn't get saved to the server before being requested), so getTextValue et al should be designed in a way that it can handle either variation on the value.  

### Testing Field Types

The best way to test that field types are working correctly is to set up a testing page that has both of the "Core \> Attributes" and "Obsidian \> Core \> Attributes" blocks on it. Make sure to configure them so they're equivalent (e.g. both can edit values and are for the same entity type). I recommend setting them to an entity type that doesn't have any attributes by default to eliminate scrolling through long lists of attributes.

![](https://community.rockrms.com/GetImage.ashx?Id=66785)

Make sure to create, configure, and edit attributes on both of the blocks, switching back and forth between the two blocks and making sure that any changes made in one reflect in the other after a refresh.

### Add to Field Type Gallery

In the `Rock.JavaScript.Obsidian.Blocks/src/Example/fieldTypeGallery.obs` file, add an example of your new field type. Keep it in alphabetical order according to the name of the field type.

Example:

```
getFieldTypeGalleryComponent("MultiSelect", "pizza", FieldTypeGuids.MultiSelect, {
    repeatColumns: "4",
    repeatDirection: "Horizontal",
    enhancedselection: "false",
    values: '[{"value": "pizza", "text": "Pizza"}, {"value": "sub", "text": "Sub"}, {"value": "bagel", "text": "Bagel"}]'
}),
```

The first argument is the name of the field type, the second is the initial value, the third is the field type GUID, and the fourth is the configuration values you want to initialize it with.

Then open the Field Type Gallery block in your browser and verify that it looks good (***changing the configuration values does not have an affect at the moment. This will hopefully be fixed soon***).

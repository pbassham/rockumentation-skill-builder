> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Group Edit

# Group Edit

This is a block that allows you to edit specific details and attributes about a particular group.

## Getting Content

Content is passed in through a page parameter, referenced as `GroupGuid`. There are quite a few examples of passing page parameters (also known as query parameters) lying around the documentation, and here is a great [example](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list#using-query-parameters).

### Page parameters

The parameters that this block looks for are as follows.

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to edit. |

## Block Configuration

### Show Header

This setting determines whether a "Group Details" header should be displayed.

### Limiting Group Configuration

Each configurable facet of the group will have two options, one to show the field and the other to enable the ability to edit the field.

![](https://community.rockrms.com/GetImage.ashx?Id=67260)

These are the configurable fields. For instance, if I wanted to show the group name and disable the ability to edit it, I could leave `Show Group Name` checked, but uncheck `Enable Group Name Edit`. It's also important to keep in mind that if a field isn't shown, it isn't possible to edit it, so that value will be irrelevant.

### Attribute Category

This should be set to a category of group attributes that you would like to show and be editable.

### Group Detail Page

This setting should be set to a page that you wish to [replace the current one with](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands#replacepage) when the "cancel" button is pressed. It takes the `GroupGuid` and passes it as a page parameter.

### Styling

There’s no styling X-Ray available.

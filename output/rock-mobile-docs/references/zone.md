> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Zone

# Zone

M v6.0 Inherits from [Microsoft.Maui.Controls.Grid](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/layouts/grid?view=net-maui-8.0)

M v1.0 Inherits from [Xamarin.Forms.StackLayout](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.stacklayout)

This control should only be used in your mobile templates. It defines the zones and their names that are made available to blocks when you configure a page.

Note that when you add multiple blocks to a zone, there will be a space between them. This comes from the default spacing on a StackLayout which is `10`. If you want to remove the gap, simply add a `Spacing="0"` property to your zone and all the blocks within will touch.

Properties ^^^

| Property | Type | Description |
| --- | --- | --- |
| ZoneName | string | The name of the zone that will be used on the page details page when deciding where to place a block. |

### Example

```
<Rock:Zone ZoneName="Main" />
```

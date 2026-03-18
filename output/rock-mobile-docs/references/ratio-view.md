> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Ratio View

# Ratio View

*Constrain a view to a certain ratio.*

M v4.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

This is a simple view that allows you to constrain the size to a certain ratio.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Ratio | string | The ratio to constrain the view to (ex: "16:9"). |

### Example

```
<Rock:RatioView Ratio="16:9">
    <Rock:Image Source="example.com/image.png" />
</Rock:RatioView>
```

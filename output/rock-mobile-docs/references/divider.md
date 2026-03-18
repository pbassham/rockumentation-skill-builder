> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Divider

# Divider

*Displays a separator line much like an HTML <hr> tag.*

M v1.0

*Inherits from* [*BoxView*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/boxview)

### Properties

| Name | Type | Description |
| --- | --- | --- |
| Thickness | string | The vertical thickness of the line. Valid values are: Thick - 2 units in height, Thicker - 4 units in height, Thickest - 8 units in height. If not specified, the default is 1 unit. |

```
<Rock:Divider />
<Rock:Divider Thickness="Thick" />
<Rock:Divider Thickness="Thicker" />
<Rock:Divider Thickness="Thickest" />
```

Note

Use the margin helper CSS classes like .my-12 to easily adjust the vertical spacing around your divider.  

```
<Rock:Divider StyleClass="my-12" />
```

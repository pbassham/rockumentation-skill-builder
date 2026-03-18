> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Picker

# Picker

Inherits from [Xamarin.Forms.Picker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.picker)

The picker will allow the user to select from a list of available items. If the field is not marked as required then the user can also leave it empty. When the field is tapped then a popup will appear allowing the user to select which item to choose.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label title to be used when wrapped in a control that displays a label for the field. |
| IsRequired | bool | If True then any validation performed will require that a value be selected. |
| Items | List | The items to be made available for user selection. (readonly) |
| SelectedItem | PickerItem | The item that has been selected by the user. (readonly) |
| SelectedValue | string | The item value that has been selected by the user. |
| SelectedValueAsInt | int? | The currently selected value cast to an integer, or null if there is no valid selection. (readonly) |
| SelectedValueAsGuid | Guid? | The currently selected value cast to a Guid, or null if there is no valid selection. (readonly) |

### Example

```
<Rock:FieldContainer>
    <Rock:Picker Label="Rock Picker"
                 IsRequired="false"
                 SelectedValue="2">
        <Rock:PickerItem Value="1" Text="One" />
        <Rock:PickerItem Value="2" Text="Two" />
        <Rock:PickerItem Value="3" Text="Three" />
        <Rock:PickerItem Value="4" Text="Four" />
        <Rock:PickerItem Value="5" Text="Five" />
    </Rock:Picker>
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67200)

![](https://community.rockrms.com/GetImage.ashx?Id=67201)

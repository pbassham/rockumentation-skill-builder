> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Multi Picker

# Multi Picker

Inherits from [Xamarin.Forms.Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label)

The multi picker will allow the user to make multiple selections from a list of available items. If the field is not marked as required then the user can also leave it empty. When the field is tapped then a new model screen is shown with the list of items and a toggle for each one.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label title to be used when wrapped in a control that displays a label for the field. |
| IsRequired | bool | If True then any validation performed will require that at least one value be selected. |
| Items | List | The items to be made available for user selection. (readonly) |
| SelectedItems | IEnumerable | The items that have been selected by the user. (readonly) |
| SelectedValues | IList | The item values that have been selected by the user. |
| SelectedValuesAsDelimited | string | The selected values as a comma delimited string. Useful with bindings to send the selected values back to the server. (readonly) |

## Example

```
<Rock:FieldContainer>
    <Rock:MultiPicker Label="Rock Multi Picker"
                      IsRequired="false"
                      SelectedValues="1,3,5">
        <Rock:PickerItem Value="1" Text="One" />
        <Rock:PickerItem Value="2" Text="Two" />
        <Rock:PickerItem Value="3" Text="Three" />
        <Rock:PickerItem Value="4" Text="Four" />
        <Rock:PickerItem Value="5" Text="Five" />
    </Rock:MultiPicker>
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67196)

![](https://community.rockrms.com/GetImage.ashx?Id=67197)

As you can see in this example, the `SelectedValues` property can be used to set the initial selection with a comma delimited string. There is some magic happening in XAML that allows that to work. But you try to bind to that property or read its value then you get an array of strings back. That is why the `SelectedValuesAsDelimited` property exists, it automatically converts that array into a comma delimited string for you.

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Check Box List

# Check Box List

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

This field displays a series of check boxes for the user to turn on or off. An example of how this could be used is with a filter of categories where you want to display a list of categories and allow the user to pick which ones to show.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label associated with this input field. |
| IsRequired | bool | If set to true then the user will be required to fill this in. This value is currently ignored. |
| Options | List | The list of checkbox options that will be presented to the user. The displayed text is taken from the Name property and the stored value is taken from the Value property. |
| SelectedValues | IEnumerable | The options that have been selected by the user. This corresponds to the Value property of the parameter objects. |
| SelectedValueText | string | A comma separated list that represents the current selection as a single string. |

### Example

```
<Rock:FieldContainer>
    <Rock:CheckBoxList Label="Categories">
        <Rock:Parameter Name="All Church" Value="38" />
        <Rock:Parameter Name="Men" Value="39" />
        <Rock:Parameter Name="Women" Value="40" />
    </Rock:CheckBoxList>
</Rock:FieldContainer>
```

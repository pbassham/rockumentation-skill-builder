> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Literal

# Literal

*Inherits from [Xamarin.Forms.Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label)*

This field acts as a read-only field for you. Basically, it is a simple label that can be used with the field container. For example, if you wish to display some attribute values that the user does not have access to edit, you can use the Literal to display the formatted value of the attribute.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label associated with this input field. |
| IsRequired | bool | Ignored since this field is not editable. |
| Text | string | The text to display in the field's contents. |

### Example

```
<Rock:FieldContainer>
    <Rock:Literal Label="Category" Text="All Church" />
</Rock:FieldContainer>
```

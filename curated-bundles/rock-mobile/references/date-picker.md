---
description: "Use when building mobile forms that require date selection inputs, email validation fields, or read-only label displays in Rock mobile applications"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

*Inherits from [Xamarin.Forms.DatePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.datepicker)*

Presents a field that displays the selected date (or placeholder text) and allows the user to change the date. During edit mode, the date picker also exposes a Clear button that allows the user to clear the selected date completely.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label title to be used when wrapped in a control that displays a label for the field. |
| IsRequired | bool | If True then any validation performed will require that a date be selected. |
| Placeholder | string | The text to display in the field if no date is selected. |
| SelectedDate | DateTime? | The currently selected date or null if no date is selected. |
| DatePickerStyle M v6.0 | DatePickerStyle | (iOS only) - Use this to change the OS-level style of the Date Picker. |

### DatePickerStyle M v6.0

This property/enum only makes a difference on iOS.

| Name | Description |
| --- | --- |
| Wheels | The default value -- displays the Wheels style date picker. |
| Inline | A calendar style date picker. |

### Example

```
<Rock:FieldContainer>
    <Rock:DatePicker Label="Rock Date Picker"
        IsRequired="false"
        SelectedDate="7/4/2019" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67193)

Native date picker on iOS

Note

How to update the year is not immediately apparent on Android - you must tap the year at the top and not the date between the arrows.

![](https://community.rockrms.com/GetImage.ashx?Id=67194)

Native date picker on Android

```
<Rock:FieldContainer>
    <Rock:DatePicker Label="Rock Date Picker"
        IsRequired="false"
        SelectedDate="7/4/2019"
        DatePickerStyle="inline" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67195)

Native iOS picker with an `Inline` DatePickerStyle.

---

## Email Box {#email-box}

*Inherits from [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box)*

The Email Box view provides an input box for the user to enter an e-mail address. It ensures the value is a somewhat valid address during validation. This does not sure it is a working e-mail address, only that it matches a basic syntax format.

### Properties

See [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box) for available properties.

### Example

```
<Rock:FieldContainer>
    <Rock:EmailBox Label="Rock Email Box"
                   IsRequired="false"
                   Text="ted@rocksolidchurchdemo.com" />
</Rock:FieldContainer>
```

---

## Literal {#literal}

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

---

## Marital Status Picker {#marital-status-picker}

Inherits from [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker).

Note

This control is only available in Shell v2 and later. It also requires your Rock Server to be on v1.13.0 or later as it needs the server to send down the Marital Status Defined Values.

This control provides a convenience for you to place a picker for a person's marital status. It automatically populates the available options based on what you have defined on the server. The picker item values are the defined value Guids.

### Example

```
<Rock:MaritalStatusPicker Label="Marital Status" IsRequired="true" />
```

---

## Multi Picker {#multi-picker}

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

---

## Number Box {#number-box}

Inherits from [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box)

The Number Box view provides an input box for the user to enter a decimal number. It ensures the value is a valid decimal number during validation. The number may be negative and may or may not contain a fractional amount. However, if it does contain a decimal separator then it must also include at least one digit after the separator.

### Properties

See [TextBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-box) for available properties.

### Example

```
<Rock:FieldContainer>
    <Rock:NumberBox Label="Rock Number Box"
                    IsRequired="false"
                    Text="-1325" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67198)

---

## Phone Number Box {#phone-number-box}

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The phone number box is actually a compound view composed of an optional Picker and a text box. The text box is for the actual phone number to be entered. If the Rock server is configured with more than one country code then the picker will become visible for the user to select the country code to use with the phone number.

If the entered country code and phone number match one of the formatting expressions in Rock then the phone number will be formatted according to those rules.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label title to be used when wrapped in a control that displays a label for the field. |
| IsRequired | bool | If True then any validation performed will require that a phone number be entered. |
| CountryCode | string | Contains the selected country code, even if the picker is not visible. |
| PhoneNumber | string | Contains the formatted phone number, not including the country code. |

### Example

```
<Rock:FieldContainer>
    <Rock:PhoneNumberBox Label="Rock Phone Number Box"
                         IsRequired="false"
                         CountryCode="1"
                         PhoneNumber="(800) 555-1234" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67199)

The example above includes the country code so you can see what it looks like. Most Rock installations will probably have only one country code so that picker will not be visible.

---

## Picker {#picker}

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

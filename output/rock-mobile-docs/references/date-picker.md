> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Date Picker

# Date Picker

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

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Segment Picker

# Segment Picker

M v1.0

*Inherits from* [*ContentView*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/contentview)

![](https://community.rockrms.com/GetImage.ashx?Id=71466)

Think of the Segment Picker as somewhere between a single select field and a set of tabs. Basically, it displays a single horizontal bar with each option making up a segment of the bar. Visually, as the user selects different segments, the control updates to put a border around that segment.

Important

Because the control shows only one row, avoid adding too many or overly long item names, especially for narrow phone screens.

## Properties 

| Property | Type | Description |
| --- | --- | --- |
| Options | List | A collection of PickerItems which provide the values to be displayed inside the Segment Picker. This is also the default content property so PickerItems can be specified as direct child elements. |
| SegmentSelectedCommand | ICommand | The command to be executed when the user selects one of the segments. The parameter will be the value of the SelectedValue property. |
| SelectedIndex | int | The integer index of the selected segment. Defaults to 0. |
| SelectedTextColor | Color | The color to use for the text of the selected segment. This should be paired with the TintColor to ensure that the selected item is easily readable. Defaults to **White**. |
| SelectedValue | string | The value, as provided by the PickerItem, of the currently selected segment. This property is read-only. |
| TintColor | Color | The color to use when tinting various parts of the control. Defaults to the primary app color. |

Note that you cannot set the `background-color` via CSS, however the `BackgroundColor` property in XAML works just fine.

## Examples

```xaml
<Rock:SegmentPicker>
    <Rock:PickerItem Value="12" Text="All" />
    <Rock:PickerItem Value="13" Text="Men" />
    <Rock:PickerItem Value="14" Text="Women" />
</Rock:SegmentPicker>
```

```xaml
<Rock:SegmentPicker SegmentSelectedCommand="{Binding PushPage}">
    <Rock:PickerItem Value="{{ pageGuid1 }}" Text="All" />
    <Rock:PickerItem Value="{{ pageGuid2 }}" Text="Men" />
    <Rock:PickerItem Value="{{ pageGuid3 }}" Text="Women" />
</Rock:SegmentPicker>
```

## Styling

You can target special CSS properties to style certain aspects of the picker.

| Property | Type | Description |
| --- | --- | --- |
| \-rock-tint-color | Color | Sets the tint color of the unselected segments. |
| \-rock-selected-tint-color | Color | Sets the tint color of the selected segment. |

```css
^SegmentPicker {
  -rock-tint-color: red;
  -rock-selected-tint-color: orange;
}
```

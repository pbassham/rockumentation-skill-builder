---
description: Use when building mobile UI components that need horizontal segmented selection controls with multiple options displayed as a single row of selectable segments
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

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

```
<Rock:SegmentPicker>
    <Rock:PickerItem Value="12" Text="All" />
    <Rock:PickerItem Value="13" Text="Men" />
    <Rock:PickerItem Value="14" Text="Women" />
</Rock:SegmentPicker>
```
```
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

```
^SegmentPicker {
  -rock-tint-color: red;
  -rock-selected-tint-color: orange;
}
```

---

## Styled Border {#styled-border}

*Inherits from* [*Border*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/border)

M v6.0

### Overview

With the release of Shell v6 and the transition to .NET MAUI, the commonly used `Frame` control was deprecated. This was an intentional move, as it has been replaced by the more performant and feature-rich Border control.

However, one key limitation of `Border` is its lack of CSS support. To address this, **StyledBorder** was introduced—offering CSS compatibility while retaining all the benefits of the new `Border` control.

For general usage and additional features, refer to the official [Microsoft Border documentation](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/border): 

### Styling

The following CSS classes are available for use with this control:

| CSS Property | Corresponding Property | Description |
| --- | --- | --- |
| border-radius | CornerRadius | Sets the corner radius of the frame. |
| border-width | double | Defines the width of the border stroke. |
| border-color | Color | Specifies the color of the border stroke. |

## Example

```
<Rock:StyledBorder
    StyleClass="border, bg-interface-softest, border-primary-strong, p-16">
    <Label Text="Borders borders borders oh my!" />
</Rock:StyledBorder>
```

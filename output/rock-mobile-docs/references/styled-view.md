> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Styled View

# Styled View

M v1.0

*Inherits from* [*Border*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/border)

Note

This component was introduced with the original Xamarin Forms release of Rock Mobile, offering functionality that exceeded what was achievable at the time. Although it remains functional, you might want to consider using a Border element instead, as it can handle most of the same styling requirements.

Have you ever wished you could make your layouts do... more? A little more pizzazz, a little more wow factor, a little more... style. This view lets you do just that. Most of its functionality centers on borders and what you can do with them. However, it's not just about adding a border. Because you can do that now. The power comes when you apply things like corner radius to individual corners, add gradients to your border color, gradient background colors, and much more.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| BackgroundGradientAngle | int | A value between 0-360 to define the angle of the background gradient. |
| BackgroundGradientStartColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The start color of the background gradient. |
| BackgroundGradientEndColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The end color of the background gradient. |
| BackgroundGradientStops | [GradientStop](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view#gradient-stop)\[\]   | A list of GradientStop objects that define a multi color background gradient. |
| BorderColor | Color | The color of the border. |
| BorderGradientAngle | int | A value between 0-360 to define the angle of the border gradient. |
| BorderGradientStartColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The start color of the border gradient. |
| BorderGradientEndColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The end color of the border gradient. |
| BorderGradientStops | [GradientStop](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view#gradient-stop)\[\]   | A list of GradientStop objects that define a multi color border gradient. |
| BorderIsDashed | boolean | Whether or not the border needs to be dashed. |
| BorderThickness | float | The thickness of the border. |
| CornerRadius | CornerRadius | The radius of each of the four corners. Specified as "topLeft,topRight,bottomLeft,bottomRight". |
| HasShadow | bool | Whether or not to draw a shadow beneath the control. Note: For this to work we need to clip the view. This means that individual corner radii will be lost. In this case the TopLeft value will be used for all corners. |
| Elevation | int | The Material Design elevation desired. Note: For this to work we need to clip the view. This means that individual corner radii will be lost. In this case the TopLeft value will be used for all corners. |
| OffsetAngle | double | The rotation of the StyledView when Sides is not its default value of 4. |
| Sides | int | The number of sides to the shape. Default is 4. |

### Gradient Stop

| Property | Type | Description |
| --- | --- | --- |
| Color | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color to use for this segment of the gradient. |
| Offset | float | Value between 0 and 1 that specifies the stop point offset. |

## Examples

```
<Rock:StyledView BackgroundColor="#bc91d7"
    CornerRadius="60,0,0,60"
    IsClippedToBounds="true"
    HorizontalOptions="FillAndExpand"
    HeightRequest="150" />
```

### Gradient Stops

```
<Rock:StyledView HeightRequest="300">
    <Rock:StyledView.BackgroundGradientStops>
        <Rock:GradientStop Color="Yellow"
            Offset="0.0" />
        <Rock:GradientStop Color="Green"
            Offset="0.5" />
    </Rock:StyledView.BackgroundGradientStops>
</Rock:StyledView>
```

### Linear Gradient Brush

This can be applied to more than StyledViews: [https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/brushes/lineargradient](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/brushes/lineargradient)

```
<Rock:StyledView HeightRequest="300">
    <Rock:StyledView.Background>
        <LinearGradientBrush StartPoint="0,0"
            EndPoint="1,1">
            <GradientStop Color="Pink"
                Offset="0.0" />
            <GradientStop Color="Purple"
                Offset="0.5" />
        </LinearGradientBrush>
    </Rock:StyledView.Background>
</Rock:StyledView>
```

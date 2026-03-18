> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Styled Border

# Styled Border

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

> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > Palette Color

# Palette Color

M v1.0

Rock Mobile gives you the ability to have a whole suite of named colors that can be used in CSS. Things like the primary app color. But what if you want to access those colors in XAML as well? This extension gives you the ability to do just that.

To see the various colors available to you check out the [Colors styling page](https://community.rockrms.com/developer/mobile-docs/styling/style-guide/colors).

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ColorName | string | The name of the palette color to be used. |

The colors below are available as of Rock Server 1.12.5:

-   Text-Color
-   Heading-Color
-   Background-Color
-   App-Primary
-   App-Secondary
-   App-Success
-   App-Info
-   App-Danger
-   App-Warning
-   App-Light
-   App-Dark
-   App-Brand

### Example

```
<Label Text="Welcome to Rock!"
       TextColor="{Rock:PaletteColor App-Primary}" />
```

This would set the label's text color to be the application's primary color, as defined in the app bundle. These color names are case-insensitive.

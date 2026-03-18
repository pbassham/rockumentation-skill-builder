> **Path:** Mobile Docs > 🎨 Styling > Legacy > Colors

# Colors

*The world is much brighter with color.*

Application Colors are the specific colors that you'll define specifically for your application. The names should look familiar to you as they are pulled from the [Bootstrap](https://getbootstrap.com/) framework. The second set of colors provides a standard and well-designed palette for you to use within your application. This palette comes from the [Tailwind](https://tailwindcss.com/) framework.

## Hex Colors

When specifying a color with a hexadecimal number, you can use 3, 4, 6, or 8 digits, with an optional "#" prefix. If 3 digits are specified, they are interpreted as RGB doublet data for a fully opaque color. For example, "#123" specifies the color that is represented by "#FF112233".

If you provide a 4-digit hexadecimal number, then the data is interpreted as above, except that the first digit specifies the alpha channel. For example, "#1234" specifies the color that is represented by "#11223344".

When providing a 6-digit hexadecimal number, the data is interpreted as a fully opaque color with those RGB values. For example, "#112233" specifies the color that is represented by "#FF112233". Finally, you can explicitly provide an 8-digit number that completely specifies the Alpha, Red, Green, and Blue channels, in that order.

Note that, in the paragraph above, the fully expanded color description is of the format, AARRGGBB. That is: the first pair of hexadecimal digits specify the Alpha channel; the second pair specifies the Red channel; the third pair specifies the Green channel; and the final pair specifies the Blue channel.

Here's a handy chart with all of the opacity / alpha transparency values.

## Interface Colors

There are several interface colors that can be set through the mobile application settings. The follow CSS notation can be used to access these colors in your application's stylesheets.

-   `?color-background` - the background color for the application.
-   `?color-heading` - the text color for headings.
-   `?color-text` - the general text color.

## Application Colors

The following colors are available for you to use and customize for your application. You can access these colors in your CSS using the notation `?color-colorname` (e.g. `?color-primary`).

![](https://community.rockrms.com/GetImage.ashx?Id=67106)

Application colors can be used with XAML properties of type `Color` using the following syntax.

```
<Rock:Tag Text="Custom Pallette Color" 
        BackgroundColor="{Rock:PaletteColor pink-800}"
        TextColor="{Rock:PaletteColor App-Primary}" />
```

## Palette Colors

Creating sets of well matched colors can be difficult. We've incorporated the well-balanced colors of the [Tailwind CSS framework](https://tailwindcss.com/docs/customizing-colors) so you'll have easy access to a great set of colors for your application.

When using these colors you'll reference the color name and the saturation value. For example to use the 600 weight of gray for text you'd use `.text-gray-600`. To use the same gray as a background you'd reference `.bg-gray-600`.

You can access these colors in your CSS using the notation `?color-colorname-intensity` (e.g. `?color-gray-400`).

Palette colors can be used with XAML properties of type `Color` using the following syntax.

```
<Rock:Tag Text="Custom Pallette Color" 
        BackgroundColor="{Rock:PaletteColor pink-800}"
        TextColor="{Rock:PaletteColor pink-200}" />
```

### Gray

![](https://community.rockrms.com/GetImage.ashx?Id=67105)

### Red

![](https://community.rockrms.com/GetImage.ashx?Id=67104)

### Orange

![](https://community.rockrms.com/GetImage.ashx?Id=67103)

### Yellow

![](https://community.rockrms.com/GetImage.ashx?Id=67102)

### Green

![](https://community.rockrms.com/GetImage.ashx?Id=67101)

### Teal

![](https://community.rockrms.com/GetImage.ashx?Id=67100)

### Blue

![](https://community.rockrms.com/GetImage.ashx?Id=67099)

### Indigo

![](https://community.rockrms.com/GetImage.ashx?Id=67098)

### Purple

![](https://community.rockrms.com/GetImage.ashx?Id=67097)

### Pink

![](https://community.rockrms.com/GetImage.ashx?Id=67096)

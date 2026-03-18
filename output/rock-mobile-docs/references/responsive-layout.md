> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Responsive Layout

# Responsive Layout

M v1.0

*Inherits from [Xamarin.Forms.Layout](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout-1)*

If you are familiar with Bootstrap's responsive grid system, this will be familiar to you. The ResponsiveLayout allows you to quickly build a layout that will be responsive to the size of the device that is currently being used to view the content. Smaller devices can display data in a vertical layout while larger devices can display the same content with multiple columns of content. It even works when rotating tablets to orientations.

The ResponsiveLayout takes any View as a child, but you would normally use the [ResponsiveColumn](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/responsive-column) as the direct child views. The ResponsiveColumn view provides additional properties that let you specify the various settings to indicate the width of a column on various device sizes. See the advanced section below for how to do the same with any generic view.

A row is identified as the child views required to "fill up" the number of available columns (by default, 12). And a single layout can contain multiple rows. Meaning, you don't need to add up 12 columns and then close the layout and start a new layout, you can just keep going. So if you use the default configuration of 12 available columns and have 4 total sub-views, each one set to use 6 columns on a Medium device, then that will end up laying out a 2x2 grid on a medium device or 4x1 (4 rows, 1 column) grid on a small and extra small device.

Speaking of device sizes, we define a number of them for you to use. These are known as the breakpoints. The width of the entire device is used in the calculation of which break-point to use. Below we use the term pixel, but be aware this is the "normalized" pixel. For example, your average Retina iPad actually has 2,048 pixels in landscape, but it reports to the application as 1,024.

-   **Extra Small**: Devices < 576px wide (phones in portrait mode)
-   **Small**: Devices >= 576px and < 720px wide (most phones in landscape, some small tablets in portrait)
-   **Medium**: Devices >= 720px and < 992px wide (a few larger phones in landscape, most tablets in portrait)
-   **Large**: Devices >= 992px and < 1200px wide (most tablets in landscape)
-   **Extra Large**: Devices >= 1200px wide (some larger tablets in landscape, such as the iPad Pro)

Now, if we assume that you want something to display as a single column on Extra Small and Small devices, but two columns on Medium devices and above, you would only need to specify Medium to be a value of 6. The layout will determine the current break-point that should be used and then check if you have specified a column count. If not it will move down to the next smaller break-point size and repeat the process until finds a specified column count. If a column count is never specified, it is assumed to use the full-width of the layout. So in this example, Extra Small and Small devices would end up using 12 column segments (one display column) and Medium, Large and Extra Large devices would use 6 column segments (two display columns).

Each [ResponsiveColumn](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/responsive-column) can not only specify how many column segments it will take up at various device sizes, it can also optionally specify in what order that column is displayed. If you don't specify an order, then the order you defined the columns is used. But this lets you, for example, specify one order to be used for small devices and a different ordering used for medium and larger devices.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ColumnCount | int | The column count for this layout. This allows you to override the normal layout calculations and use a custom number of columns to make up an entire row. Defaults to 12. |
| ColumnSpacing | double | The amount of space between columns when they are laid out side by side. Defaults to 6.0. |
| RowSpacing | double | The amount of space in between rows when they are laid out. Defaults to 6.0. |

### Basic Example

```
<Rock:ResponsiveLayout ColumnCount="2">
    <Rock:ResponsiveColumn ExtraSmall="1">
        <Rock:Image Source="https://image.source.com/image.png" Aspect="AspectFill"/>
    </Rock:ResponsiveColumn>
    <Rock:ResponsiveColumn ExtraSmall="1">
        <Rock:Image Source="https://image.source.com/image.png" Aspect="AspectFill"/>
    </Rock:ResponsiveColumn>
</Rock:ResponsiveLayout>
```

### Responsive Example

```
<Rock:ResponsiveLayout>
    <Rock:ResponsiveColumn Small="7" Medium="9" ExtraSmallOrder="1" SmallOrder="0">
        <Label Text="This is our main body content." />
    </Rock:ResponsiveColumn>
    <Rock:ResponsiveColumn Small="5" Medium="3" ExtraSmallOrder="0" SmallOrder="1">
        <Label Text="This might be our navigation menu" />
    </Rock:ResponsiveColumn>
</Rock:ResponsiveLayout>
```

### Advanced Example

```
<Rock:ResponsiveLayout>
    <Label Text="This is our main body content."
           Rock:ResponsiveLayout.Small="7"
           Rock:ResponsiveLayout.Medium="9"
           Rock:ResponsiveLayout.ExtraSmallOrder="1"
           Rock:ResponsiveLayout.SmallOrder="0" />
    <Label Text="This might be our navigation menu."
           Rock:ResponsiveLayout.Small="5"
           Rock:ResponsiveLayout.Medium="3"
           Rock:ResponsiveLayout.ExtraSmallOrder="0"
           Rock:ResponsiveLayout.SmallOrder="1" />
</Rock:ResponsiveLayout>
```

### Styling

| Property | Type | Description |
| --- | --- | --- |
| \-rock-responsive-layout-row-spacing | int | Sets the [Row Spacing property.](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/responsive-layout#properties) |
| \-rock-responsive-layout-column-spacing | int | Sets the [Column Spacing property.](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/responsive-layout#properties) |

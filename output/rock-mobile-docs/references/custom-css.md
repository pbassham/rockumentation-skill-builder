> **Path:** Mobile Docs > 🎨 Styling > Legacy > Custom CSS

# Custom CSS

If the need arises to add CSS inline on a single page, it can be done with the following syntax:

```bash
<Grid>
    <Grid.Resources>
        <StyleSheet>
            <![CDATA[
            ^grid {
                background-color: lightgray;
            }
            ]]>
        </StyleSheet>
    </Grid.Resources>
</Grid>
```

In most cases though, it's recommended to add custom styles globally to your app in the Styles tab of the application settings under the Advanced Options section. This allows styles to be defined once and accessible from any page within the app.

![](https://community.rockrms.com/GetImage.ashx?Id=67119)

Here you can add custom classes, target specific views, etc. There are several custom variables you can use in your CSS to represent colors and settings. These variables are listed below.

### Custom Utility Classes

Rock Mobile provides a set of utility class selectors to help target your styling to specific platforms, device types, pages, and blocks. Each is discussed below.

#### Targeting Platforms

If you need to target styling to a specific platform (iOS or Android) you can use the parent classes `.ios` or `.android`.

```
.ios .heading1 {
    font-size: 33;
}
```

Note

  You can also target specific platforms in XAML with the OnPlatform class.  

#### Targeting Device Types

Similar to platforms you can also target device types with `.phone` or `.tablet`.

```
.phone .heading1 {
    font-size: 33;
}
```

#### Combining Platform and and Device Types

Need to get really specific? You can combine the two classes as shown below. In general, you should try to make your design work without too many of these specific styles.

```
.ios.phone .heading1 {
    color: red;
}
```

#### Styling Pages

When configuring a page you can provide a CSS class you would like to add to the page. This will allow you to scope the styling of elements on that page.

```
.page-aboutus .heading1 {
    font-size: 33;
}
```

#### Styling Blocks

Each Rock mobile block has a CSS class assigned to it. This allows you to target the visual elements within a specific block. The pattern to use is `.block-[block type name lowercase]`. For example, the calendar block would be `.block-calendarview`.

```
.block-calendarview .heading1 {
    font-size: 33;
}
```

#### Styling Controls

Each XAML component can also be targeted. The selector for the control is its name in all lowercase. For instance the `Label` control becomes `label` , a `DatePicker` would be `datepicker`.

If you wanted to style all instances of `FieldStack` you could use the CSS below.

```
fieldstack {
    border-color: #c4c4c4;
}
```

The CSS above would make the border color of all instances of `FieldStack` a gray color. Many controls in Rock Mobile inherit from other controls. For instance, the `Address` control inherits from `FieldStack`. The CSS above would not affect the `Address` control. If you want all controls that inherit from another control add a `^` in front of the selector. The CSS below would select controls that are a `FieldStack` or inherit from one.

```
^fieldstack {
    border-color: #c4c4c4;
}
```

#### Combining it All

The example below is not a best practice but shows you how you can use all of the utility classes together if needed. If you find yourself writing these types of CSS rules you're trying to swim upstream and should consider a better styling strategy.

```
.ios.phone.page-aboutus .block-content .heading1 {
    font-size: 33;
}
```

### Custom CSS Properties

Rock Mobile has a couple of custom CSS properties for use in mobile. These include:

#### Text Shadow

This property allows you to add a shadow to Labels. The syntax looks like this:

`-rock-text-shadow: [distanceX] [distanceY] [blurRadius] [color]`

Example:

```
.hero .hero-title {
    font-size: 24;
    color: white;
    -rock-text-shadow: 2 2 4 black;
}
```

### Color Variables

Warning

Unlike normal CSS, referencing an invalid custom variable with the ? syntax will cause the app to crash.  

Downhill includes several color variables that you can use in your CSS to reference colors defined in the administrative settings as well as a curated palette of colors that will bring consistency to your application.

#### Interface & Application Colors

| Variable | Value |
| --- | --- |
| ?color-text | Text Color provided in the Style settings. |
| ?color-heading | Heading Color provided in the Style settings. |
| ?color-primary | Primary Color provided in the Style settings. |
| ?color-secondary | Secondary Color provided in the Style settings. |
| ?color-success | Success Color provided in the Style settings. |
| ?color-danger | Danger Color provided in the Style settings. |
| ?color-warning | Warning Color provided in the Style settings. |
| ?color-light | Light Color provided in the Style settings. |
| ?color-dark | Dark Color provided in the Style settings. |

#### Palette Colors

[Palette colors](https://community.rockrms.com/developer/mobile-docs/styling/legacy/text/color#palette-colors) can be referenced with the following notation:

`?color-{color}-{intensity}`

Example: `?color-orange-400`

### Alert Colors

Alert boxes are made up of three different colors:

-   Background Color
-   Text Color
-   Border Color

These three colors are generated based on the Bootstrap alert recipe from the application colors above. The patterns for usage are:

`?color-{application-color}-{property}`

Example: `?color-primary-background`, `?color-primary-border`, `?color-primary-text`

### Misc Variables

Warning

Unlike normal CSS, referencing an invalid custom variable with the ? syntax will cause the app to crash.  

Below are some additional variables you can reference:

| Variable | Value |
| --- | --- |
| ?radius-base | The base radius that is configured. |
| ?spacing-base | The default value to use for margins and padding. |
| ?font-size-default | The default font size. |
| ?color-text | The default color for text. |
| ?color-heading | The default color for use with headings. |
| ?color-background | The default background color. |

### Shell CSS Functions

Below are some additional items that behave like functions in your CSS. These allow you to run calculations to provide the CSS value.

| Function | Usage |
| --- | --- |
| ?shell-font-scale(floatValue) M v2.0C v12.1 | Takes the passed in floatValue number and multiplies it by the system font scale. This is usually set by the user in the device accessibility settings. |

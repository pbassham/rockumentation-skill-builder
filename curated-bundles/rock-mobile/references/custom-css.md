---
description: "Use when styling Rock Mobile apps with CSS, including inline styles, global styles, utility classes for platforms/devices, and targeting pages or blocks"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

If the need arises to add CSS inline on a single page, it can be done with the following syntax:

```
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

- Background Color
- Text Color
- Border Color

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

---

## 👨‍💻 Developers {#developers}

# 👨‍💻 Developers

---

## Fundamentals {#fundamentals}

*We all have to start somewhere, so why not start at the beginning.*

## Important Note for Developers

Adding a new block type into the mobile application itself is not supported at this time. It has been discussed but there are various issues that come up with making changes to the mobile application, even for the core team. Therefore at the moment pull requests will not be supported to the mobile application itself. Though if you have ideas bring them up, it's not that we don't want to add new features, they are just more complex to implement as it requires synchronizing the rollout between your users and your server. That said there are various ways to add new functionality to the mobile application without having to modify the application itself.

First, you can re-use existing block types and simply provide different configuration options. While some block types that wouldn't do much, for example a Workflow Entry block, others allow you great flexibility depending on what configuration you send them. Two blocks that excel at customization are the `Content` and `Dynamic Content` block types. Before we get to those, lets talk about some commands that are available to all blocks.

## Pages and Blocks

First, the content in the app is provided via pages and blocks from your Rock server. Each Rock page represents a page in your mobile application and the blocks on that Rock page define the content that is displayed on the page. A page can contain either a single block or multiple blocks. For example, you might have a block that provides a banner image at the top and then a second block that shows a scrolling list of content channel items.

Because a block that provides information for a mobile application does not have a web presence, a new block type was created. Part of the reason for this was performance. It takes a long time to instantiate a regular `RockBlock` because we have to initialize the entire page and ASP.NET stack to do it properly. For these reasons, a new base block type was created: `IRockBlockType`. This interface provides the minimal required bits and pieces in order to have a block exist in the system. There is also a base class that provides a a number of helper methods for your blocks: `RockBlockType`.

The next piece of the block puzzle is a new interface that defines that an `IRockBlockType` can be used for mobile applications: `IRockMobileBlockType`. This defines a few properties and methods that must exist for a block to be able to provide the required information to a mobile application:

- RequiredMobileAbiVersion - This defines the minimum "Abi" (no that's not a typo) version that the mobile application must support in order for the block to function correctly. For example, if we add a new supported block type in the mobile app, this number would increase.
- MobileBlockType - This instructs the mobile application which class to instantiate to handle displaying and interacting with the block data.
- GetMobileConfigurationValues() - Returns a customized object that is JSON encoded and passed to an instance of the MobileBlockType above. This allows you to return a custom set of configuration values based on the block's settings. For example, you might have a block setting where the user selects a Defined Value. The value is stored as a Guid which isn't too helpful for display purposes, so you might use this method to send over the display value of the Defined Value instead.

### Block Actions

Another aspect of these new block types is that they support their own API actions. This allows your block to respond to API requests without having to build a new API endpoint. A block's action has a name and set of parameters. The action name does not have to be unique in the system.

In the context of a mobile application, you might have a block that displays a large set of data but you only want to load 5 items at a time. Instead of creating a new API endpoint to deal with loading those next pages of items, you simply define an action on your block type that takes a parameter of "page number" and returns the set of 5 items for that page.

A block type can have any number of actions, each taking their own set of parameters.

### Custom Settings

Most blocks have a pretty simple configuration UI and can just use the standard Attribute Values configuration view. A few blocks might need a more custom UI to handle dynamically showing and hiding elements based on the user's selection. Don't worry, we've got you covered. There is a way to build a custom UI that is displayed in the Block Settings popup in either pure C# code or with an .ascx file.

A custom setting UI is declared by creating a subclass of `RockCustomSettingsProvider` or `RockCustomSettingsUserControlProvider`. The former allows you to build the UI in pure C# while the latter uses an `ascx` user control to build the UI. Whichever class you inherit from, you would then add a `[TargetType( typeof( nnn ) )]` decorator on your subclass. This `TargetType` identifies the class type that it targets. In other words, the block type class you are building a custom settings UI for.

You can define more than one custom settings UI for your block by creating multiple sub-classes. Each implementation specifies the title used on the tab the UI is housed inside. This means if you have a rather complex UI that would be easier in multiple tabs, you can do just that (though they cannot interact with each other).

As a bonus, if all of your settings are custom settings, meaning the `Basic Settings` tab would normally be empty, you can define the title of your custom settings tab to be `Basic Settings` and it will put placed in the `Basic Settings` tab rather than a new tab.

## Dates and Times

Generally speaking, any dates that travel over the wire (network) should be passed in a DateTimeOffset object. This allows us to capture the original time zone data. Once we have it captured we can decide if we need to discard the time zone info or not. But if we don't have it, our hand is forced.

When exposing the date to the user, via Lava or some other means the user would be interacting with, it should be converted to the device's time zone. This can be easily done by the `DateTimeOffset.LocalDateTime` property.

One notable exception to this rule is anytime you are working with a "concrete" date. That is a date that shouldn't change across time zones. For example, a person's Birth Date. We don't say "I was born on June 3rd, UTC-07:00". We just say "June 3rd". It doesn't matter what time zone you are in, you celebrate your birthday when the calendar says it's June 3rd. In these cases, you especially need to use DateTimeOffset on the wire but you can discard the time zone information by accessing the `DateTimeOffset.Date` property. If you just use a DateTime object then it will be converted to local time zone and you won't know what the original value was.

A related example of a concrete date is group attendance. The group meets on "Wednesdays at 7pm", not "Wednesdays at 7pm UTC-07:00". So when the leader takes attendance and says "John was here on Wednesday at 7pm", we discard any time zone information and just take the date and time as a concrete date. Even though this might not be a technically correct timestamp.

Working with multiple time zones requires some judgement calls. Sometimes we need to convert, sometimes we don't. If you are unsure, ask the product owner.

---

## Core & Shell Dependencies {#core-shell-dependencies}

Special care must be taken when adding new features. This is because coordination is needed with both the Rock Mobile Shell version and the Rock Core version.

## Tags

Items that require a specific mobile shell version will be tagged with an "M" like so:

**URL reference** − https://img.shields.io/badge/M-v1.0-ee7725?style=flat M v2.0

Items that require a specific version of the core Rock server are tagged with a "C" like so:

**URL reference** − https://img.shields.io/badge/C-v12.0-ee7725?style=flat C v12.0

If an item requires a specific version of both the Mobile shell and Core server version, it will include both tags. You'll see these at the block, component, and settings level.

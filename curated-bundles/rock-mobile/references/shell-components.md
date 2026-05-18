---
description: "Use when styling mobile shell UI components like navigation bar, tab bar, status bar, and their colors, transparency, and blur effects"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

How to style various elements of the shell.

## Status Bar

The Status Bar is part of the mobile operation that shows the time and status of things like the cellular signal and battery. Your application doesn't have much control of this area of the display, but you can set the color of the foreground using the CSS below.

![](https://community.rockrms.com/GetImage.ashx?Id=67088)

```
NavigationPage {
  -rock-status-bar-text: light;
}
```

*(Valid values: light, dark)*

## Navigation Bar

The Navigation Bar is the top header of your application. It typically holds the header image and any content you want on the right side.

![](https://community.rockrms.com/GetImage.ashx?Id=67089)

You can style this bar with the following CSS.

```
.navigation-bar {
    -maui-bar-background-color: #9acced;
    -maui-bar-text-color: #ffffff;
}
```

On iOS, the Navigation Bar normally has a small 1-pixel shadow/border line between the bottom of the bar and the page content. If you are trying to create a seamless color flow from the bar to your page background you can use the following CSS to turn that off.

```
.navigation-bar {
    -rock-ios-hide-navigation-bar-separator: true;
}
```

### Navigation Bar Transparency and Blur (iOS)

M v4.0

In iOS, there is a pattern in which the navigation bar is see-through and blurs the content beneath:

![](https://mobiledocs.rockrms.com/~gitbook/image?url=https%3A%2F%2Fi.stack.imgur.com%2F1qBtE.png&width=768&dpr=4&quality=100&sign=a6d6f798&sv=2)

You can accomplish the same thing easily. There are settings to adjust this in the Styles tab of your mobile application app builder:

![](https://community.rockrms.com/GetImage.ashx?Id=67090)

Or, alternatively, through CSS:

```
.navigation-bar {
    -maui-bar-background-color: rgba(255, 0, 0, 0.30); 
    -rock-ios-navbar-transparent: true;
    -rock-ios-navbar-blur: ultrathin;
}
```

To produce an outcome of:

![](https://community.rockrms.com/GetImage.ashx?Id=67091)

## Tab Bar

The Tab Bar only displays when the shell is set to Tab mode.

![](https://community.rockrms.com/GetImage.ashx?Id=67092)

You can style this bar with the following CSS.

```
.tab-bar {
    -maui-bar-background-color: #9acced;
    -rock-selected-tab-color: #ffffff;
    -rock-unselected-tab-color: #d0d0d0;
}
```

Note: `-rock-selected-tab-color` and `-rock-unselected-tab-color` are only available in v2 and later of the mobile shell.

## Additional Styling

M v4.0

Here are some more miscellaneous properties to allow customization of the shell.

| Property | Type | Description |
| --- | --- | --- |
| .navigation-bar-title | Label | Style the title of the page that displays on the navigation bar. |
| .navigation-bar-image | Image | Style the image that, if uploaded, displays in the middle of the navigation bar. |

---

## Migrating {#migrating}

Use this page as a resource when migrating your application to use the new colors and styles available in Core v16.7.

## Style Framework

To ease migration, there is now an additional setting in your mobile application labeled `Mobile Style Framework`. Any change to this setting requires a deploy to take effect.

![](https://community.rockrms.com/GetImage.ashx?Id=67095)

There are three values that can drastically impact the styling of your application.

### Default (.NET MAUI)

This should be the value any new application uses. This ensures that your mobile shell utilizes the latest and greatest styling components and enables full light and dark mode responsiveness. When the framework is set to this value, none of the old legacy colors will be utilized.

### Blended (XF + MAUI)

This is useful for an existing application when it comes time to migrate to the new style framework. This ensures all of the legacy block CSS and colors are included, and they take a higher priority over the new styles/colors. When you have it set to this, you may notice some parts of your application become dark mode responsive while others do not.

### Legacy

Maintain the same exact styling patterns as any mobile shell application before V6. This is the default for existing applications. You can view the legacy documentation [here](https://community.rockrms.com/developer/mobile-docs/styling/legacy).

---

## Forms {#forms}

## CSS X-Ray for Field Container

### Individual Layout

Below is the image of an x-ray for Field Container with a Individual Layout.

![](https://community.rockrms.com/GetImage.ashx?Id=71438)

### Grouped Layout

Below is the image of an X-Ray for Field Container with a Grouped Layout.

![](https://community.rockrms.com/GetImage.ashx?Id=71439)

### Unlabeled Field Container 

To styled the unlabeled field inside a field container you can target a Rock custom css properties \`-rock-placeholder-text-color\`

Example:

```
^borderlessentry,
^datepicker,
^picker,
^entry,
^editor,
^personpicker {
 -rock-placeholder-text-color: red;   
}
```

![](https://community.rockrms.com/GetImage.ashx?Id=71442)

---

## Legacy {#styling-legacy}

This contains the styling documentation for applications targeting a Rock version <17 or mobile shell version <6.

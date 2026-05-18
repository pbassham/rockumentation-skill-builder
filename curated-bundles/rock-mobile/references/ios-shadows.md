---
description: "Use when styling UI elements in Rock Mobile with shadows, frames, drop shadows on iOS, or customizing tag appearance with CSS"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

There are two main ways to add shadows to your elements:

1. [Frame](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/frame)
2. [Rock:StyledView](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view)

Frame shadows are thick and don't have any configuration settings. The StyledView does have an `Elevation` property that can modify the intensity, but it's still quite limited. Here's a way to add flexible shadows to your elements on iOS.

Important

This shadow effect only works on iOS, meaning Android devices will have no shadow.

Using [this documentation](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/platform/ios/visualelement-drop-shadow) as a reference, here's how to set this up in Rock Mobile. First, you'll need to add an `xmlns` property to a parent element, in this example a StackLayout.

```
<StackLayout xmlns:ios="clr-namespace:Xamarin.Forms.PlatformConfiguration.iOSSpecific;assembly=Xamarin.Forms.Core"></StackLayout>
```

Let's say we want to add a [BoxView](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/boxview) within our content area. Here's how that might look:

```
<StackLayout xmlns:ios="clr-namespace:Xamarin.Forms.PlatformConfiguration.iOSSpecific;assembly=Xamarin.Forms.Core">
    <BoxView Color="Yellow"
        HeightRequest="256"
        WidthRequest="256"
        HorizontalOptions="Center"
        VerticalOptions="Center" />
</StackLayout>
```

Finally, let's add the drop shadow effect with some special properties:

```
<StackLayout xmlns:ios="clr-namespace:Xamarin.Forms.PlatformConfiguration.iOSSpecific;assembly=Xamarin.Forms.Core" >
    <BoxView Color="Yellow"
        HeightRequest="256"
        WidthRequest="256"
        HorizontalOptions="Center"
        VerticalOptions="Center"
        ios:VisualElement.IsShadowEnabled="true"
        ios:VisualElement.ShadowColor="Blue"
        ios:VisualElement.ShadowOpacity="0.75"
        ios:VisualElement.ShadowRadius="12" />
</StackLayout>
```

After loading the page, there should be a yellow square with a blue shadow on iOS, whereas Android will only show a yellow square. You can modify these four `VisualElement` values to tailor the shadow to your liking.

Important

You might try adding the `xmlns` to your Layout, but the shadow effect will only work on elements directly within your Layout and not your page. Unfortunately, you'll need to add this within every block that you want to use it in.

---

## Styling Components {#styling-components}

# Styling Components

---

## Tags {#tags}

Tags are amazing as they come, but you can style them with just a bit of CSS.

## Tag Selectors

Tags can be selected in CSS using the `.tag` class. There are several additional hooks available to limit your selections.

| Selector | Description |
| --- | --- |
| .tag-sm | Selects only small tags. |
| .tag-md | Selects the default sized tags. |
| .tag-lg | Selects only large tags. |
| .tag-\[type\] | Selects tags by their type. Options include:   .tag-primary   .tag-secondary   .tag-success   .tag-info   .tag-warning   .tag-danger |

## Example

```
.tag.tag-sm.tag-info {
    /* would select small tags of type info */
}
```

## Styling the Tag's Text

To style the text of the tag use the `.tag-text` child selector.

```
.tag .tag-text {
    color: #ee7625;
}
```

---

## Bible {#bible}

# Bible Reader

The Bible Reader element renders all the child elements in a StackLayout. In many cases we use the standard style class names, so if you need to modify how something looks you should probably constrain it to the [Bible Reader](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/bible-reader) itself, such as `^BibleReader .paragraph`.

## Headings

There are a few different types of headings in the Bible. They all render as a Label with the style class `heading`.

Psalms also has one additional header type that you will encounter. There are 5 "sub-books" in Psalms. These are treated as headings that get an additional style class of psalm-book.

## Sub heading

Subheadings are primarily used in Psalms and Song of Solomon and are rendered as a Label with the style class `subheading`. There are some additional classes that will be applied in certain use cases:

- **psalm-title** – An introduction to the Psalm, usually giving the author or circumstances of its composition (e.g., Psalm 23)
- **speaker** – Used only in Song of Solomon. In the printed text, appears centered in small caps.
- **psalm-acrostic-title** – Only in Psalm 119. Contains the Hebrew letter for that section.
- textual-note – Appears only before John 8 and Mark 16.

## Block

There are places where one or more verses are supposed to be shown "blocked off" from other verses. In a physical Bible, this is denoted by vertical space before and after the block of verses. In the mobile rendering of the Bible this is handled by an empty ContentView before and after the block of verses. Both of these ContentView's have the style class block.

## Text

Finally there is the normal paragraph text that contains the content of the verses. These are also rendered as Label elements and have the style class text.

## Copyright

The default copyright text is rendered in a [Html](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/html) container and will have the copyright class applied to it. The individual inside will have the paragraph class applied to them.

Note

When using a custom font in the BibleReader, ensure that the following unicode characters are provided: \\x2070, \\x00b9, \\x00b2, \\x00b3, \\x2074, \\x2075, \\x2076, \\x2077, \\x2078, \\x2079.

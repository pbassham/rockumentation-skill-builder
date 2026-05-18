---
description: "Use when customizing spacing, margins, and layout properties in Rock Mobile, or implementing device-specific UI variations for phone and tablet displays"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

### Spacing

Warning

This section was true for shell v1-5 when it was based on Xamarin Forms. In shell v6+, the default spacing in .NET MAUI is usually 0, and Rock Mobile styling has been updated for that.

Be aware that many layouts have default spacing parameters. If things don't line up correctly you may have to remove this default spacing.

Important

Be warned that much of the styling of Rock Mobile has been done with the default spacing in mind. If you disable it you may notice that many controls are closer than usual. When you disable spacing you may find yourself swimming upstream.

For example, StackLayouts have a default `Spacing` property set to 10. This means each control within the layout will have a 10-unit space between it and its neighbor. For a StackLayout, the spacing will be relative to its `Orientation` property. When set to Horizontal it will be horizontal spacing, Vertical would be vertical spacing.

Other layout controls also have this same behavior. Below is a list of others (this is not meant to be an inclusive list).

- Grid - Has default `RowSpacing` and `ColumnSpacing` values
- ResponsiveLayout - Has a default `ColumnSpacing` value
- Frame - Has a default `Padding` of 10

### Device Type Customization

As you assign values to properties you may want to have different values for a phone vs. a tablet. This is often the case when working with the sizes of images and cards (via the Ratio properties). Providing different properties is possible using the syntax below.

```
<Label Text="{Rock:OnDeviceType Phone='I am a phone!', Tablet='I am a tablet!'}" 
    Margin="{Rock:OnDeviceType Phone='20, 20, 20, 20', Tablet='0, 0, 0, 0' }" />

<Image Source="https://yourserver.com/photo.jpg" 
    Ratio="{Rock:OnDeviceType Phone=4:3, Tablet=4:2}" />
```

If you'd like to change more than just a property, and instead provide different markup, you can use the controls below.

```
<Rock:OnDeviceType>
    <Rock:OnDeviceType.Phone>
        <BoxView Color="Red" HeightRequest="10" />
    </Rock:OnDeviceType.Phone>
    <Rock:OnDeviceType.Tablet>
        <BoxView Color="Blue" HeightRequest="10" />
    </Rock:OnDeviceType.Tablet>
</Rock:OnDeviceType>
```

### StringFormat Data Binding

From time to time, you’ll find yourself needing to Bind data as part of a string. You may be tempted to just throw your Binding in the middle of the string as you would in Lava, but you’ll be disappointed as nothing will show up. This is where StringFormat comes into play.

```
<Label Text="{Binding Name, StringFormat='Hey there {0}!'}" />
```

In this case, the Key we are Binding to is Name and we want it to output “Hey there Ted!”. We use {0} to insert our Binding Value into the string where we want it to show up.

## YouVersion Bible App Links

The YouVersion Bible app provides deep linking for many of the resource types they have available. We won't cover the full breadth of options here, but this will get you started. If someone has the Bible app installed, these resources will be opened natively in the app, falling back to the external browser experience if necessary.

For the most part, any URL you provide from the [bible.com website](https://www.bible.com/) will work. We recommend using that as a reference to ensure your URL is valid and to always test once you've added it to the app.

Here's a button snippet you can copy for quick additions to your app:

```
<Button Text="Bible App"
    StyleClass="btn, btn-primary"
    Command="{Binding OpenExternalBrowser}"
    CommandParameter="https://www.bible.com/" />
```

### Bible Reference

Passage references include a version ID in the route (59 is for [ESV](https://www.esv.org/)) followed by a three-letter book identifier. Be very careful to provide valid values, especially for the version number! You may notice slugs in some of the URLs provided by the website, but they're typically unnecessary.

| Type | URL Pattern |
| --- | --- |
| Book | [https://www.bible.com/bible/59/GEN.1](https://www.bible.com/bible/59/GEN.1) |
| Verse | [https://www.bible.com/bible/59/GEN.1.1](https://www.bible.com/bible/59/GEN.1.1) |
| Multi-verse | [https://www.bible.com/bible/59/GEN.1.1-4](https://www.bible.com/bible/59/GEN.1.1-4) |
| Reading Plan | [https://www.bible.com/reading-plans/16169](https://www.bible.com/reading-plans/16169) |
| Video | [https://www.bible.com/videos/25490](https://www.bible.com/videos/25490) |
| Podcast Episode | [https://www.bible.com/podcasts/395/episodes/59548](https://www.bible.com/podcasts/395/episodes/59548) |

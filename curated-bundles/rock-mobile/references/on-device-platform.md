---
description: Use when customizing Rock Mobile UI elements to display different content or styles based on the device's operating system platform or device type
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M v1.0

Warning

This is deprecated in Rock Mobile V6 and later. There is a built-in XAML extension for .NET MAUI.  

In some cases, it can be useful to customize content or appearance across platforms—for example, applying one style on Android and a different one on iOS to match each platform's native aesthetic. This extension provides a way to set content or property values depending on the device's OS platform.

### Example

```
<Label Text="{OnPlatform iOS=Hello iOS!, Android=Hello Android!}" />
```

### Example

```
<ContentView>
    <OnPlatform x:TypeArguments="View">
        <On Platform="iOS"><Label Text="Hello iOS"/></On>
        <On Platform="Android"><Label Text="Hello Android"/></On>
    </OnPlatform>
</ContentView>
```

Note

  You can also style platforms independently via Custom CSS classes.  

Below is legacy documentation for the original `Rock:OnDevicePlatform` extension.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Android | object | The value to be used when the device is running on Android. |
| iOS | object | The value to be used when the device is running on iOS. |
| Default | object | The value to be used when the device is running on something else. |

### Examples

```
<Label Text="Hello World!"
    TextColor="{Rock:OnDevicePlatform Android=Blue, iOS=Red, Default=Black}" />
```

When running on an Android device, the text will be blue. If instead running on an iOS device then the text will be red. Otherwise, the text will be black. While not currently required, the Default value should be specified in case we add other platforms in the future.

```
<StackLayout>
    <Rock:OnDevicePlatform>
        <Rock:OnDevicePlatform.Android>
            <Button Text="Go" />
        </Rock:OnDevicePlatform.Android>
        <Rock:OnDevicePlatform.Default>
            <Label Text="This feature required Android." />
        </Rock:OnDevicePlatform.Default>
    </Rock:OnDevicePlatform>
</StackLayout>
```

Here is a more interesting example. In this case, we are replacing not just a property but an entire element. On Android, they will see a button that they can tap. On every other platform, they will see a label that informs them the feature only works on Android.

---

## On Device Type {#on-device-type}

M v1.0

Warning

This is deprecated in Rock Mobile V6 and later. There is a built-in XAML extension for .NET MAUI.  

Similar to the [On Device Platform](https://community.rockrms.com/developer/mobile-docs/essentials/controls/xaml-extensions/on-device-platform), this extension lets you change property values and entire nodes depending on what type of device the app is running on. A good use case for this would be if you want to display a different image on tablets than you do on phones.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Phone | object | The value to be used when the device is a phone. |
| Tablet | object | The value to be used when the device is a tablet. |
| Default | object | The value to be used when the device is something else. |

### Example

```
<Image Source="https://www.rocksolidchurchdemo.com/GetImage.ashx?guid=923329f4-819e-4eaa-8d96-9611624736e8"
       HeightRequest="{Rock:OnDeviceType Phone=300, Tablet=150}" />
```

When running on a phone, the image will have a height of 300 pixels. But on a tablet it will only have a height of 150 pixels. This might be useful if you are worried that the image might take up too much vertical space on a tablet under normal sizing circumstances.

```
<StackLayout>
    <Rock:OnDeviceType>
        <Rock:OnDeviceType.Tablet>
            <Button Text="Go" />
        </Rock:OnDeviceType.Tablet>
        <Rock:OnDeviceType.Default>
            <Label Text="This feature requires a tablet." />
        </Rock:OnDeviceType.Default>
    </Rock:OnDeviceType>
</StackLayout>
```

Here is a more interesting example. In this case we are replacing not just a property but an entire element. On tablet devices, they will see a button which they can tap. On every other device type they will see a label that informs them the feature only works on tablets.

---

## Palette Color {#palette-color}

M v1.0

Rock Mobile gives you the ability to have a whole suite of named colors that can be used in CSS. Things like the primary app color. But what if you want to access those colors in XAML as well? This extension gives you the ability to do just that.

To see the various colors available to you check out the [Colors styling page](https://community.rockrms.com/developer/mobile-docs/styling/style-guide/colors).

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ColorName | string | The name of the palette color to be used. |

The colors below are available as of Rock Server 1.12.5:

- Text-Color
- Heading-Color
- Background-Color
- App-Primary
- App-Secondary
- App-Success
- App-Info
- App-Danger
- App-Warning
- App-Light
- App-Dark
- App-Brand

### Example

```
<Label Text="Welcome to Rock!"
       TextColor="{Rock:PaletteColor App-Primary}" />
```

This would set the label's text color to be the application's primary color, as defined in the app bundle. These color names are case-insensitive.

---

## Seconds To Time String Converter {#seconds-to-time-string-converter}

M v2.0

The purpose of this converter is to allow you to take a value in seconds and have it displayed as a time string, such as `HH:MM:SS`. There are a few properties that let you customize the format.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ShowHours | [TimeSegmentVisibility](https://community.rockrms.com/developer/mobile-docs/essentials/controls/xaml-extensions/seconds-to-time-string-converter#time-segment-visibility) | How to show the hours segment of the time string. Defaults to **Automatic**. |
| ShowMinutes | [TimeSegmentVisibility](https://community.rockrms.com/developer/mobile-docs/essentials/controls/xaml-extensions/seconds-to-time-string-converter#time-segment-visibility) | How to show the minutes segment of the time string. Defaults to **Automatic**. |
| ShowSeconds | [TimeSegmentVisibility](https://community.rockrms.com/developer/mobile-docs/essentials/controls/xaml-extensions/seconds-to-time-string-converter#time-segment-visibility) | How to show the seconds segment of the time string. Defaults to **Automatic**. |

### Time Segment Visibility

| Value | Description |
| --- | --- |
| Automatic | The value will be hidden unless it is non-zero or a prior segment is visible. |
| Never | The segment will never be visible. |
| Always | The segment will always be visible. |

### Example

```
<Label Text="{Binding Value, Converter={Rock:SecondsToTimeStringConverter ShowMinutes=Always}}" />
```

---

## Features {#features}

## Overview

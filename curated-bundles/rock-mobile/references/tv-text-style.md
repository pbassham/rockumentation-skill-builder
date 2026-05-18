---
description: "Use when styling text in Apple TV apps, including text styles, font weights, and formatting like bold, italic, and strikethrough in TVML"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

TVML offer's several different ways to style text. One thing that should be noted is that Apple TV apps are not HTML. The styling of apps should be more consistent with the [Apple Design Language](https://developer.apple.com/design/human-interface-guidelines/tvos/overview/themes/) vs creating highly custom branded apps.

Below are some of the design patterns for text that will help you know what's available.

## Text Styles

![](https://community.rockrms.com/GetImage.ashx?Id=66451)

```
<?xml version="1.0" encoding="UTF-8"?>
<document>
    <descriptiveAlertTemplate>
        <infoTable>
            <info style="text-align: center; tv-line-spacing: 10;">
                <text style="tv-text-style: body;">body</text>
                <text style="tv-text-style: callout;">callout</text>
                <text style="tv-text-style: caption1;">caption1</text>
                <text style="tv-text-style: caption2;">caption2</text>
                <text style="tv-text-style: footnote;">footnote</text>
                <text style="tv-text-style: headline;">headline</text>
                <text style="tv-text-style: subhead;">subhead</text>
                <text style="tv-text-style: subtitle1;">subtitle1</text>
                <text style="tv-text-style: subtitle2;">subtitle2</text>
                <text style="tv-text-style: subtitle3;">subtitle3</text>
                <text style="tv-text-style: title1;">title1</text>
                <text style="tv-text-style: title2;">title2</text>
                <text style="tv-text-style: title3;">title3</text>
            </info>
        </infoTable>
    </descriptiveAlertTemplate>
</document>
```

## Font Weight

![](https://community.rockrms.com/GetImage.ashx?Id=66452)

```
<?xml version="1.0" encoding="UTF-8"?>
<document>
    <head>
        <style>
            .font {
                tv-text-style: title3;
            }
        </style>
    </head>
    <descriptiveAlertTemplate>
        <infoTable>
            <info style="text-align: center; tv-line-spacing: 10;">
                <text class="font" style="font-weight: ultralight;">ultralight</text>
                <text class="font" style="font-weight: thin;">thin</text>
                <text class="font" style="font-weight: light;">light</text>
                <text class="font" style="font-weight: regular;">regular</text>
                <text class="font" style="font-weight: medium;">medium</text>
                <text class="font" style="font-weight: semibold;">semibold</text>
                <text class="font" style="font-weight: bold;">bold</text>
                <text class="font" style="font-weight: heavy;">heavy</text>
                <text class="font" style="font-weight: black;">black</text>
            </info>
        </infoTable>
    </descriptiveAlertTemplate>
</document>
```

## Text Tags (Bold/Italic/Strike)

![](https://community.rockrms.com/GetImage.ashx?Id=66456)

```
<?xml version="1.0" encoding="UTF-8"?>
<document>
    <head>
        <style>
            .font {
                tv-text-style: title3;
            }
        </style>
    </head>
    <descriptiveAlertTemplate>
        <infoTable>
            <info style="text-align: center; tv-line-spacing: 10;">
                <text class="font">This is <b>Bold</b> text</text>
                <text class="font">This is <i>Italic</i> text</text>
                <text class="font">This is <strike>Strike</strike> text</text>
            </info>
        </infoTable>
    </descriptiveAlertTemplate>
</document>
```

## Font Family

![](https://community.rockrms.com/GetImage.ashx?Id=66457)

```
<?xml version="1.0" encoding="UTF-8"?>
<document>
    <head>
        <style>
            .font {
                tv-text-style: none;
                font-size: 48;
            }
        </style>
    </head>
    <descriptiveAlertTemplate>
        <infoTable>
            <info style="text-align: center; tv-line-spacing: 10;">
                <text class="font" style="font-family: 'Apple SD Gothic Neo';">Apple SD Gothic Neo</text>
                <text class="font" style="font-family: 'Arial';">Arial</text>
                <text class="font" style="font-family: 'Copperplate';">Copperplate</text>
                <text class="font" style="font-family: 'Courier';">Courier</text>
                <text class="font" style="font-family: 'Helvetica';">Helvetica</text>
                <text class="font" style="font-family: 'Helvetica Neue';">Helvetica Neue</text>
                <text class="font" style="font-family: 'Menlo';">Menlo</text>
                <text class="font" style="font-family: 'Times New Roman';">Times New Roman</text>
                <text class="font" style="font-family: 'TimesNewRomanPS-BoldMT';">Times New Roman Bold</text>
                <text class="font" style="font-family: 'Trebuchet MS';">Trebuchet MS</text>
            </info>
        </infoTable>
    </descriptiveAlertTemplate>
</document>
```

## Text Shadow

[https://developer.apple.com/documentation/tvml/text-shadow](https://developer.apple.com/documentation/tvml/text-shadow)

Text shadows are great for titles overlaid on images and can be defined with the following syntax:

1. The horizontal shadow movement
2. The vertical shadow movement
3. The blur radius
4. The color and transparency
```
<text style="text-shadow: 0px 1px 10px rgba(0,0,0,0.5);">Summer Camp</text>
```

Shadows may get clipped vertically depending on the wrapper size, so it's recommended to keep the shadow close to the text.

---

## Media Queries {#media-queries}

## Theme

You can style dependent on the current theme using the snippet below.

```
<style>
    @media tv-template and (tv-theme:light) {
        .foo { color: rgba(0,0,0); }
    }
    @media tv-template and (tv-theme:dark) {
        .foo { color: rgba(255,255,255); }
    }
</style>
```

---

## Themes {#themes}

There are two major themes in Apple TV *Light* and *Dark*. For the most part the individual will select their theme and the app will respond to it. Your styles have can [media queries](https://community.rockrms.com/developer/apple-tv-docs/styling/media-queries) to style the page differently depending on the theme.

You can also define a theme for a specific page. Doing so kicks in Apple's built in theme characteristics. Below is the sample markup for this and how the page differs when in dark and light modes.

```
<productTemplate theme="light">
```

**Dark**

![](https://community.rockrms.com/GetImage.ashx?Id=66458)

**Light**

![](https://community.rockrms.com/GetImage.ashx?Id=66459)

---

## Built in Images {#built-in-images}

tvOS comes with several image resource libraries built into the operating system. These include files for common use cases needed in building TV apps.

Links to the various libraries are below in order by usefulness.

- Button Icons
- Miscellaneous Icons
- Movie Rating Icons
- TV Rating Icons

You also have access to any of the [SF symbols](https://github.com/SparkDevNetwork/Rock-AppleTvShell/commit/a400cb72389ab81b61085171c9642725a1613e54#diff-e308d19248954ed2beb7226bbde33c632b0dd6bdc70b7b85c580bf264b939e98R331-R332).

Similar to Rock Mobile, Apple TV offers the ability to utilize custom resources. By embedding images directly into the Apple TV shell, developers can access these resources in the same manner as standard tvOS assets.

Note

Ensure to not include the file extension as tvOS removes file extensions when references resources.

## Overlay Checkmark

![](https://community.rockrms.com/GetImage.ashx?Id=66460)

This checkmark graphic can be added to images over the bottom right corner to indicate selection.

```
<lockup>
    <img src="https://rockrms.com/image" />
    <overlay>
        <badge src="resource://overlay-checkmark" style="tv-position: footer; tv-align: right;" />
    </overlay>
</lockup>
```

---

## References {#references}

*Explore this library to see examples of different implementations.*

There's no guarantee that the layout shown is possible with just TVML, as some of these apps may utilize features only available in a native implementation.

---

## Apple Arcade {#apple-arcade}

![](https://community.rockrms.com/GetImage.ashx?Id=66461)

![](https://community.rockrms.com/GetImage.ashx?Id=66462)

Note the tile text is only shown on highlight

![](https://community.rockrms.com/GetImage.ashx?Id=66463)

![](https://community.rockrms.com/GetImage.ashx?Id=66464)

![](https://community.rockrms.com/GetImage.ashx?Id=66465)

![](https://community.rockrms.com/GetImage.ashx?Id=66466)

Shows default or popular content before search

![Note the tile text is not truncated - it fades away and auto-scrolls when focused](https://community.rockrms.com/GetImage.ashx?Id=66467)

![](https://community.rockrms.com/GetImage.ashx?Id=66468)

![](https://community.rockrms.com/GetImage.ashx?Id=66469)

![](https://community.rockrms.com/GetImage.ashx?Id=66470)

![](https://community.rockrms.com/GetImage.ashx?Id=66471)

---

## Apple Fitness {#apple-fitness}

![Note the Sign Out option available on picture selection](https://community.rockrms.com/GetImage.ashx?Id=66472)

![](https://community.rockrms.com/GetImage.ashx?Id=66473)

![Note the NEW tags overlaid on the thumbnails](https://community.rockrms.com/GetImage.ashx?Id=66474)

![](https://community.rockrms.com/GetImage.ashx?Id=66475)

![](https://community.rockrms.com/GetImage.ashx?Id=66476)

![](https://community.rockrms.com/GetImage.ashx?Id=66477)

![](https://community.rockrms.com/GetImage.ashx?Id=66478)

![](https://community.rockrms.com/GetImage.ashx?Id=66479)

---

## Apple Podcasts {#apple-podcasts}

![](https://community.rockrms.com/GetImage.ashx?Id=66480)

![](https://community.rockrms.com/GetImage.ashx?Id=66481)

![](https://community.rockrms.com/GetImage.ashx?Id=66482)

![](https://community.rockrms.com/GetImage.ashx?Id=66483)

![](https://community.rockrms.com/GetImage.ashx?Id=66484)

![](https://community.rockrms.com/GetImage.ashx?Id=66485)

![](https://community.rockrms.com/GetImage.ashx?Id=66486)

![](https://community.rockrms.com/GetImage.ashx?Id=66487)

![](https://community.rockrms.com/GetImage.ashx?Id=66488)

![](https://community.rockrms.com/GetImage.ashx?Id=66489)

![](https://community.rockrms.com/GetImage.ashx?Id=66490)

![](https://community.rockrms.com/GetImage.ashx?Id=66491)

![](https://community.rockrms.com/GetImage.ashx?Id=66492)

![](https://community.rockrms.com/GetImage.ashx?Id=66493)

![](https://community.rockrms.com/GetImage.ashx?Id=66494)

![](https://community.rockrms.com/GetImage.ashx?Id=66495)

---

## Apple TV+ {#apple-tv}

![](https://community.rockrms.com/GetImage.ashx?Id=66496)

![](https://community.rockrms.com/GetImage.ashx?Id=66497)

![](https://community.rockrms.com/GetImage.ashx?Id=66498)

![](https://community.rockrms.com/GetImage.ashx?Id=66499)

![](https://community.rockrms.com/GetImage.ashx?Id=66500)

![](https://community.rockrms.com/GetImage.ashx?Id=66501)

![](https://community.rockrms.com/GetImage.ashx?Id=66502)

![](https://community.rockrms.com/GetImage.ashx?Id=66503)

![](https://community.rockrms.com/GetImage.ashx?Id=66504)

![](https://community.rockrms.com/GetImage.ashx?Id=66505)

![](https://community.rockrms.com/GetImage.ashx?Id=66506)

![](https://community.rockrms.com/GetImage.ashx?Id=66507)

![](https://community.rockrms.com/GetImage.ashx?Id=66508)

![](https://community.rockrms.com/GetImage.ashx?Id=66509)

![](https://community.rockrms.com/GetImage.ashx?Id=66510)

![](https://community.rockrms.com/GetImage.ashx?Id=66511)

![](https://community.rockrms.com/GetImage.ashx?Id=66512)

---

## 👨‍💻 Developer {#developer}

# 👨‍💻 Developer

---

## RockTvApp {#rocktvapp}

The `RockTvApp` is a wrapper for the Apple `App` class. It provides several helper and wrapper functions to make life easier. Specifically this class is needed to allow for the Shell to have basic logic to handle network issues and parse errors gracefully.

## Application Images

The native App class will call the same events on the `RockTvApp` object. There's no reason why you could not attach to the native `App` class events, but in general you should keep your logic in the `RockTvApp`. Below are a summary of the events that are supported.

- [onLaunch](https://developer.apple.com/documentation/tvmljs/app/1627407-onlaunch)
- [onError](https://developer.apple.com/documentation/tvmljs/app/1627353-onerror)
- [onExit](https://developer.apple.com/documentation/tvmljs/app/1627419-onexit)
- [onResume](https://developer.apple.com/documentation/tvmljs/app/1627415-onresume)
- [onSuspend](https://developer.apple.com/documentation/tvmljs/app/1627431-onsuspend)## Methods

The RockTvApp supports the following methods.

- reload - Calling this will call the [App reload](https://developer.apple.com/documentation/tvmljs/app/1627357-reload) function.

## AppState

The RockTvApp has an AppState property that provides state information about the application. These values come from the shell logic. This is a bridge between the shell and the application. These are intentionally named the same as Rock Mobile when possible.

| Name | Example | Description |
| --- | --- | --- |
| AppUrl | https://www.server.com/ | The base URL of the server that is hosting the application. |
| AppId | 12 | The Rock site ID that is powering the application. |
| SessionGuid | FC0001DF-4F5E-45F3-B0EA-A780AF75E7E9 | The unique identifier for the session. This will change when the application is opened and closed. |
| CurrentPageGuid | B7565390-6308-4770-ACF9-8DED06E3C04A | The GUID of the current page. |
| ApplicationJavaScriptUrl | https://www.server.com/api... | The URL where the application's JavaScript can be found. |
| HomepageGuid | 6927EE98-B335-4576-8EBE-3C312C9CF480 | The GUID of the application's homepage. |

## Helper Functions

Below are a set of the helper functions available to you.

#### createAlertDocument(title, description)

The function will return a TVML document with the title and description inserted. The alert is rather plain, but you can override it in your application. The primary reason it's defined in the Shell is to allow for handling errors when things don't go well loading the application's JavaScript.

```
var alert = RockTvApp.createAlertDocument("Made It", "Looks like we made it.");
```

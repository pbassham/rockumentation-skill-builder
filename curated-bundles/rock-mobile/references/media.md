---
description: "Use when configuring video playback in Rock mobile apps, including resume functionality, metadata, and media element properties"
source: "https://community.rockrms.com/developer/roku-docs"
sourceLabel: Roku Docs
---
> **Path:** 

The commands below are related to the playback of media within the app.

Note

You cannot play YouTube content in a Roku TV application.

## Notes

Both of the media commands below share some common functionality as it relates to working with `MediaElements`. Here are some things you should know.

To set the resume location from an existing interaction provide the map from the interaction using the `rockWatchMap `property.

To append to the watch map of an existing interaction provide both the `rockInteractionGuid `as well as the `rockWatchMap `property.

If you provide a `rockWatchMap `without a `rockInteractionGuid `property the watch map will be used for determining the resume location, but a new interaction will be written with a fresh watch map (so the watch map will start where they last left off).

## Play Video

Plays the video file using the provided configuration.

```
<Rock:ContentNode rockCommand="playVideo" 
    rockVideoUrl="https://church.com/demo.mp3" />
```

Additional configuration options include the following:

| Parameter | Type | Description |
| --- | --- | --- |
| rockVideoUrl | string | The URL to the video file to play. Should be MP4 or HLS file. |
| rockVideoMediaElementGuid | atring | This determines how you'd like the contents of the page cached by CDNs. Your options are: **Public** \- The contents of the URL will have a public cache control header placed on them. Append ':600' to provide a seconds value for determining how long to cache the response. **Personal** \- The URL will be appended with the logged in person's guid. This makes the URLs specific (cached) by the person. Append ':600' to provide a seconds value for determining how long to cache the response. **Private** \- The page response will have a private cache control header applied. |
| rockVideoRelatedEntityTypeId | int | The Entity Type ID that the media file is related to. |
| rockVideoRelatedEntityId | int | The Entity ID that the media file is related to. |
| rockVideoEnableResume | boolean | Determines if the enabled resume feature is enabled. This allows the individual to start the playing of the media file where they last left off. Defaults to true. |
| rockVideoTitle | string | The title of the media file. This will show as meta data when the file is in the player. |
| rockVideoSubtitle | string | The subtitle of the media file. This shows as meta data when the file is in the player. |
| rockVideoArtworkImageURL | string | The URL where the media file's artwork can be loaded. This will show as meta data when the file is in the player. |
| rockVideoDescription | string | The description of the media file. This will show as meta data when the file is in the player. |
| rockInteractionGuid | string | The GUID of the interaction that should be used to append to. |
| rockWatchMap | string | The existing watch map that, when provided, will be used to append to. |
| rockIsLive | bool | If true, the video should be treated as a livestream (and jump to live). |

## Play Audio

Plays the audio file using the provided configuration.

```
<Rock:ContentNode rockCommand="playAudio" 
    rockAudioUrl="https://church.com/demo.mp3" />
```

| Parameter | Type | Description |
| --- | --- | --- |
| rockAudioUrl | string | The URL to the video file to play. Should be MP3 file. |
| rockVideoMediaElementGuid | int | The GUID of the Rock media file. This is only needed if the audio/video is a Rock Media Element. This will be used to track watches. |
| rockAudioRelatedEntityTypeId | int | The Entity Type ID that the media file is related to. |
| rockAudioRelatedEntityId | int | The Entity ID that the media file is related to. |
| rockAudioEnableResume | boolean | Determines if the enabled resume feature is enabled. This allows the individual to start the playing of the media file where they last left off. |
| rockAudioTitle | string | The title of the media file. This will show as meta data when the file is in the player. |
| rockAudioSubtitle | string | The subtitle of the media file. This shows as meta data when the file is in the player. |
| rockAudioArtworkImageURL | string | The URL where the media file's artwork can be loaded. This will show as meta data when the file is in the player. |
| rockAudioDescription | string | The description of the media file. This will show as meta data when the file is in the player. |
| rockInteractionGuid | string | The GUID of the interaction that should be used to append to. |
| rockWatchMap | string | The existing watch map that, when provided, will be used to append to. |

---

## Utility {#utility}

Useful commands to use around the application.

## Set Context

Sets a context for the lifetime of the application (until closed).

```
<Rock:ContentNode 
    title = "Set Context"
    rockCommand="setContext"
    rockContextKey="Campus"
    rockContextValue="4c294b37-fcc1-4432-87ff-3ce73f14a482" />
```

## Clear Context

Clears the specified context provided by the key.

```
<Rock:ContentNode 
    title = "Clear Context"
    rockCommand="clearContext"
    rockContextKey="Campus" />
```

---

## Personal {#personal}

Commands that relate to the Current Person.

## Login

Allows for an individual to login to the TV Application.

Important

Be sure that your application has defined a Login page before using this command. That setting is used to configure the QR code.

```
<Rock:Button rockCommand="login" 
    rockLoginPageGuid="0C64D387-0A87-ECAA-48A5-B38A62CC704C" 
    rockLoginTimeoutPageGuid="E6F3553B-6270-04AD-4882-F6A99FB3875D"
    rockLoginSuccessPageGuid="C1EAA112-B225-74AA-4F2D-3EA0E72560FE"
    text="Login">
</Rock:Button>
```

| Parameter | Type | Description |
| --- | --- | --- |
| rockLoginPageGuid | string | This tells the shell where to navigate to show the login information. This page will be passed a set of custom values which are documented below. |
| rockLoginTimeoutPageGuid | string | The page to display after the login period expires. |
| rockLoginSuccessPageGuid | string | The page to display after a successful login. Consider displaying a personalized welcome to navigate back to the homepage. |
| rockLoginTimeoutDuration | int | The amount of time in seconds (default to 600, 10 mins) that the login will wait until it times out. |
| rockLoginCheckDuration | int | The number of seconds between the requests to the server to check to see if the authentication has completed (default 5 seconds). |
| rockLoginClearNavigationStack | bool | Determines if the navigation stack should be cleared after successfully logging in. This ensures that if the individual hits back that it does not show impersonalized information (default true). |

Below is a list of IDs that can be accessed in SceneGraph. Due to platform limitations, we couldn't really use merge fields.

| Key | Description |
| --- | --- |
| lgnQrPoster | When navigating to the login page, the application searches for a view with this ID and sets the uri to the login page, appending the verification code. |
| lgnCodeLabel | When navigating to the login page, the application searches for a view with this ID and sets the text to the verification code. |

This allows for a person to logout from the app.

| Parameter | Type | Description |
| --- | --- | --- |
| rockLogoutPageGuid | string | The GUID of the page to show once the person has been logged out. |
| rockLogoutClearNavigationStack | bool | Determines if the navigation stack should be cleared before logging out (default true). |

---

## 📚 Resources {#resources}

# 📚 Resources

---

## Controls {#controls}

Roku applications are built with an XML language named [SceneGraph](https://developer.roku.com/docs/developer-program/core-concepts/scenegraph-xml/overview.md). Most of your application will be comprised with the built-in SceneGraph components. This section covers the custom components provided with Roku.

---

## Button {#button}

*Extends* [*Button*](https://developer.roku.com/docs/references/scenegraph/widget-nodes/button.md)

## Description

In order to properly handle commands, we extended the Roku Button with an additional `rockCommand` field. It also has fields for all of the different command parameters (such as `rockVideoUrl`).

## Examples

```
<Rock:Button rockCommand="pushPage" 
    rockPageGuid="4443b83e-86c9-4e35-9637-13b8991856ed" />
```

---

## Content Node {#content-node}

*Extends* [*Content Node*](https://developer.roku.com/docs/references/scenegraph/control-nodes/contentnode.md)

## Description

In order to properly handle commands, we extended the Roku Content Node with an additional `rockCommand` field. It also has fields for all of the different command parameters (such as `rockVideoUrl`).

## Examples

```
<Rock:ContentNode rockCommand="pushPage" 
    rockPageGuid="4443b83e-86c9-4e35-9637-13b8991856ed" />
```

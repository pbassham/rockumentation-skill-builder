---
description: "Use when configuring video or audio playback commands in Apple TV apps, including resume tracking and media metadata"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

The commands below are related to the playback of media within the app.

Note

  You cannot play YouTube content in an Apple TV application. ([Why?](https://medium.com/bpxl-craft/apple-tv-a-world-without-webkit-5c428a64a6dd))  

## Notes

Both of the media commands below share some common functionality as it relates to working with `MediaElements`. Here are some things you should know.

1. To set the resume location from an existing interaction provide the map from the interaction using the `rockWatchMap` property.
2. To append to the watch map of an existing interaction provide both the `rockInteractionGuid` as well as the `rockWatchMap` property.
3. If you provide a `rockWatchMap` without a `rockInteractionGuid` property the watch map will be used for determining the resume location, but a new interaction will be written with a fresh watch map (so the watch map will start where they last left off).

## Play Video

Plays the video file using the provided configuration.

```
<buttonLockup rockCommand="playVideo" 
     rockVideoUrl="https://rockrms.blob.core.windows.net/videos/rock-sample-video.mp4">
    <badge src="resource://button-preview" />
    <title>Play</title>
</buttonLockup>
```

Additional configuration options include the following:

| Parameter | Type | Description |
| --- | --- | --- |
| rockVideoUrl | string | The URL to the video file to play. Should be MP4 or HLS file. |
| rockVideoMediaElementGuid | string | The GUID of the Rock media file. This is only needed if the audio/video is a Rock Media Element. This will be used to track watches. |
| rockVideoRelatedEntityTypeId | int | The Entity Type ID that the media file is related to. |
| rockVideoRelatedEntityId | int | The Entity ID that the media file is related to. |
| rockVideoEnableResume | boolean | Determines if the enabled resume feature is enabled. This allows the individual to start the playing of the media file where they last left off. Defaults to true. |
| rockVideoTitle | string | The title of the media file. This will show as meta data when the file is in the player. |
| rockVideoSubtitle | string | The subtitle of the media file. This shows as meta data when the file is in the player. |
| rockVideoArtworkImageURL | string | The URL where the media file's artwork can be loaded. This will show as meta data when the file is in the player. |
| rockVideoDescription | string | The description of the media file. This will show as meta data when the file is in the player. |
| rockInteractionGuid | string | The GUID of the interaction that should be used to append to. |
| rockWatchMap | string | The existing watch map that, when provided, will be used to append to. |

## Play Audio

Plays the audio file using the provided configuration.

```
<buttonLockup rockCommand="playAudio" 
    rockAudioUrl="https://rockrms.blob.core.windows.net/videos/rock-sample-audio.mp3">
    <badge src="resource://button-preview" />
    <title>Play</title>
</buttonLockup>
```

Additional configuration options include the following:

| rockAudioUrl | string | The URL to the video file to play. Should be MP3 file. |
| --- | --- | --- |
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

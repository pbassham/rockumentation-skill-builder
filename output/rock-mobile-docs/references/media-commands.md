> **Path:** Mobile Docs > 🧱 Essentials > Commands > Media Commands

# Media Commands

Block commands pertaining to media content.

## PlayAudio

M v1.0

Like the [PlayVideo](https://community.rockrms.com/developer/mobile-docs/essentials/commands/media-commands#playvideo) command, this initiates a full-screen playback of an audio file. Given that it's audio, there won't be much to see.

The `CommandParameter` consists of a string that contains the URL of the audio file to be played.

Note

Starting in M v2.0 you can also pass in a PlayAudioParameters object which contains the following properties.  

| Property | Type | Description |
| --- | --- | --- |
| ThumbnailSource | string | The URL that contains the image to displayed as the thumbnail of the media player. This overrides any embedded artwork found in the metadata. |
|  |  | *(See* *PlayVideoParameters* *for more properties)* |

**Examples**

```
<Button Text="Tap"
        Command="{Binding PlayAudio}"
        CommandParameter="http://www.noiseaddicts.com/samples_1w72b820/2541.mp3" />
```

```
<Button Text="Tap"
        Command="{Binding PlayAudio}">
    <Button.CommandParameter>
        <Rock:PlayAudioParameters
            Source="http://www.noiseaddicts.com/samples_1w72b820/2541.mp3"
            ThumbnailSource="https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg" />
    </Button.CommandParameter>
</Button>
```

## PlayVideo

M v1.0

This command initiates the playing of a video in full-screen. Usually, it is better to use the [MediaPlayer](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/media-player) view instead, but there are times you just want to play a video when the user taps a button.

The `CommandParameter` consists of a string that contains the URL of the video to be played.

Note

Starting in M v2.0 you can also pass a PlayVideoParameters object that lets you customize the look of the media player. It contains the following properties.   

| Property | Type | Description |
| --- | --- | --- |
| Source | string | The URL of the media to be played. |
| BackgroundColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | A color to be used behind the media. |
| Title | string | Overrides any metadata in the media and sets the title text to be displayed. |
| Subtitle | string | Overrides any metadata in the media and sets the subtitle text to be displayed. |
| ControlsContent | [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view) | Contains the view tree that should be used to provide UI controls, this replaces the default controls. |
| OverlayContent | [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view) | Contains the view tree that will be displayed over top of the media. The default content only shows for audio files and displays the artwork. |

Important

Note that watch map integration is not currently supported with the PlayVideo command. If this is needed, you'll have to use the Media Player component instead.  

**Examples**

```
<Button Text="Tap"
        Command="{Binding PlayVideo}"
        CommandParameter="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
```

```
<Button Text="Tap"
        Command="{Binding PlayVideo}">
    <Button.CommandParameter>
        <Rock:PlayVideoParameters
            Source="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            Title="Big Buck Bunny" />
    </Button.CommandParameter>
</Button>
```

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Media Player > Legacy

# Legacy

*The documentation for the Media Player before Rock Mobile version 6 (.NET MAUI).*

M v2.0C v12.4

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

While there are commands that will allow you to start playback of an audio or video file in full-screen mode, usually you want that video embedded on the page. For example, on your message library pages, you might want to display the sermon title, then the video in-line, and then the description of that sermon. This view will allow you to have a video embedded into a page. The video itself can be set to auto-play (use sparingly) or to wait for the user to instruct it to play.

If a video is not set to `AutoPlay` then a thumbnail will be displayed. If you specify a `ThumbnailSource` for the view, then that image will be used as the thumbnail. Otherwise, the view will attempt to generate a thumbnail by inspecting the stream and using the `ThumbnailPosition` property value as the offset into the video to capture a thumbnail. Due to limitations in both iOS and Android, auto-thumbnail generation only works on MP4/M4V files. It will not work on HLS streams (usually having an `m3u8` extension).

Important

HLS (.m3u8) streams from the service Resi are not supported on Android due to an issue on their end. If you need support for this, you'll need to utilize another streaming service.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Source | string | The URL to be loaded into the video player. Supports MP4 and HLS. |
| ThumbnailSource | string | The URL to be loaded as the thumbnail. Overrides any automatic thumbnail generation. |
| PlayButtonSource | string | The URL to be loaded as the play button if AutoPlay is false. This image can be any size but we recommend 128x128. It will be displayed inside a 64x64 box, but will maintain aspect ratio. Defaults to resource://Rock.Mobile.Resources.PlayButton.png. |
| AutoPlay | bool | If true then the video will start playing as soon as it has loaded into the player. Defaults to false. |
| InitialAspectRatio | string | The initial aspect ratio to use until the video has loaded and we know the actual aspect ratio. Can be specified as either a width:height ratio (example 16:9) or as a decimal number (example 1.77777). Defaults to 16:9. |
| ThumbnailPosition | double? | The position into the video to use to generate a thumbnail automatically if no ThumbnailSource is specified. Value is specified in seconds. Defaults to 2. |
| Title | string | The text to display in the title position of the screen controls. This overrides any data found in the media metadata. M v2.0 |
| Subtitle | string | The text to display in the subtitle position of the screen controls. This overrides any data found in the media metadata. M v2.0 |
| OverlayContent | [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view) | The view tree to display as an overlay on top of the media. Defaults to a standard view that displays album artwork for audio files only. M v2.0 |
| ControlsContent | [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view) | The view tree to be used as the on-screen controls. Defaults to the standard screen controls you normally see. M v2.0 |
| PlaybackCompletedCommand | [Command](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.command) | The command to be executed when the media plays to the end. M v5.0 |
| PlaybackCompletedCommandParameter | object | The parameter to pass to the PlaybackCompletedCommand. M v5.0 |
| WatchMap | [WatchMapParameters](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/media-player/legacy#watch-map-properties) | Enables the Watch Map feature in the media player that allows saving playback position to the server and resuming a previous session. Defaults to null.  
M v2.0C v12.4 |

### Watch Map Properties

M v2.0C v12.4

| Property | Type | Description |
| --- | --- | --- |
| SaveChanges | bool | If true then changes to the watch map will be saved to the server if possible. Defaults to true. |
| WatchMap | string | A special run length encoded representation of the watch map that was previously saved. Defaults to null. |
| InteractionGuid | Guid? | The unique identifier of an existing Interaction to be updated. If the interaction cannot be found or does not match this video then a new interaction will be created. Defaults to null. |
| MediaElementGuid | Guid? | The unique identifier of the MediaElement that is being watched. This value is required to save changes. Defaults to null. |
| RelatedEntityTypeId | int? | An optional value to store in the interaction's RelatedEntityTypeId property. Defaults to null. |
| RelatedEntityId | int? | An optional value to store in the interaction's RelatedEntityId property. Defaults to null. |

### Examples

```
<Rock:MediaPlayer Source="https://example.com/video_file.mp4"
                  AutoPlay="false" />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67156)

```
<StackLayout>
    {% mediaelement id:'1' %}
        {% assign interactionGuid = null %}
        {% assign watchMap = null %}

        {% if CurrentPerson and CurrentPerson != null %}
            {% sql personId:'{{ CurrentPerson.Id }}' mediaId:'{{ mediaelement.Id }}' %}
SELECT TOP 1
[I].[Guid],
[I].[InteractionData]
FROM [Interaction] AS [I]
INNER JOIN [InteractionComponent] AS [IComp] ON [IComp].[Id] = [I].[InteractionComponentId]
INNER JOIN [InteractionChannel] AS [IChan] ON [IChan].[Id] = [IComp].[InteractionChannelId]
INNER JOIN [PersonAlias] AS [PA] ON [PA].[Id] = [I].[PersonAliasId]
WHERE [IChan].[Guid] = 'D5B9BDAF-6E52-40D5-8E74-4E23973DF159'
  AND [PA].[PersonId] = @personId
  AND [IComp].[EntityId] = @mediaId
  AND [I].[InteractionDateTime] >= DATEADD(DAY, -7, GETDATE())
ORDER BY [I].[InteractionDateTime] DESC
            {% endsql %}
            {% assign result = results | First %}
            {% if result != null %}
                {% assign interactionGuid = result.Guid %}
                {% assign watchMap = result.InteractionData | FromJSON | Property:'WatchMap' %}
            {% endif %}
        {% endif %}

        <Rock:MediaPlayer Source="{{ mediaelement.DefaultFileUrl | Escape }}"
            ThumbnailSource="{{ mediaelement.DefaultThumbnailUrl | Escape }}">
            <Rock:MediaPlayer.WatchMap>
                <Rock:WatchMapParameters MediaElementGuid="{{ mediaelement.Guid }}"
                    {% if interactionGuid != null %}
                        InteractionGuid="{{ interactionGuid }}"
                        WatchMap="{{ watchMap }}"
                    {% endif %}
                    />
            </Rock:MediaPlayer.WatchMap>
        </Rock:MediaPlayer>
    {% endmediaelement %}
</StackLayout>
```

This second example shows how to configure the MediaPlayer to save the watch interaction when watching a media element video.

### Closed Captioning

The MediaPlayer doesn't have a way to toggle captions on or off, but iOS users can take advantage of the **Closed Captions + SDH** option that will show them. This is currently found under Settings > Accessibility > Subtitles & Captioning. Some video hosts like Vimeo can auto-generate captions.

![](https://community.rockrms.com/GetImage.ashx?Id=67155)

For more information, check out Apple's official documentation:

[Display subtitles and captions on iPhone | Apple Support](https://support.apple.com/guide/iphone/subtitles-and-captions-iph3e2e23d1/ios)

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Media Player

# Media Player

Mv6.0 Cv12.4

*Inherits from [Maui.CommunityToolkit.MediaElement](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/maui/views/mediaelement?tabs=android)*

This versatile control lets you play audio and video files natively within your app. It offers a wide range of properties to customize the playback experience and includes expected OS-level features like fullscreen, picture-in-picture, TV casting, captions (when available), and more.

Elevate your content experience by integrating with Rock’s [Media Accounts](https://community.rockrms.com/Rock/BookContent/9#digitalmedia). When powered by a Media Element, the associated watch map unlocks features like analytics and cross-platform watch history—so users can start playback on one device and pick up right where they left off on another, as long as they're signed in.

Tip

When playing videos, it's recommended to provide the HLS format over a fixed resolution. This allows the player to determine the appropriate resolution based on network speed, so people with a slower connection aren't forced to buffer a high resolution video.

### YouTube

You might assume you can use the native Media Player to play videos uploaded to YouTube, but that’s not possible due to platform restrictions. YouTube doesn’t provide the direct video source required by our player, as they maintain full control over playback through their own interface.

Uploading media content to YouTube is a great strategy for the audience there, however it's recommended to host videos elsewhere for the best integration with your digital platforms. If you sync these into Rock as Media Elements, you'll gain access to the analytics that Rock provides.

##### ⚠️ YouTube Embeds and HTTP Referrer Requirement

As of October 2025, YouTube now requires an HTTP referrer for all embedded video playback.

Apps that embed YouTube videos directly in a WebView without a hosting context will experience blocked playback. This includes using `<WebView Source="{{ videoUrl }}" />` with direct YouTube links. When the referrer is missing, YouTube will block playback and show **Error 153**.

This change is required by YouTube and cannot be bypassed with client-side logic. Any future YouTube embeds in Rock Mobile should use the pattern below to ensure consistent playback.

**Solution**

1.  Create a hosted HTML page that embeds the YouTube video using an <iframe>
2.  Point the WebView to that hosted page instead of the direct YouTube embed URL.
3.  Ensure the page is served over HTTPS and includes proper headers so the HTTP referrer is passed to YouTube.

**Hosted Page Example**

```html
<!DOCTYPE html>
  <html>
  <body style="margin:0; padding:0;">
    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/{{ videoId }}" frameborder="0" allowfullscreen>
    </iframe>
  </body>
</html>
```

Now, link to your hosted page instead of the video embed URL:  
`<WebView Source="https://yourdomain.com/embed.html" />`

### Properties

| Property Name | Type | Description |
| --- | --- | --- |
| Title | string | The title of the media being played. |
| Subtitle | string | The subtitle of the media being played. |
| IsCastEnabled | bool | Indicates if casting to external devices is enabled. |
| ThumbnailSource | string | The source of the thumbnail image. |
| WatchMap | WatchMapParameters | Parameters for watching the media with mapped data. |
| PlaybackCompletedCommand | ICommand | Command executed when media playback is completed. |
| PlaybackCompletedCommandParameter | object | Parameter for the playback completed command. |
| ThumbnailPosition | double? | The position of the thumbnail in the media timeline. |
| PlayButtonSource | string | The source of the play button image. |
| InitialAspectRatio | string | The initial aspect ratio of the media player. |
| ShowThumbnail | bool | Indicates whether the thumbnail should be shown. |
| AllowsPictureInPicturePlayback | bool | iOS only. Indicates whether Picture in Picture is enabled. Defaults to true. |

Note

The Media Player received major updates in v6. While all existing properties from earlier versions should still function, they’re now considered deprecated.

#### Watch Map Properties

Mv2.0 Cv12.4

The easiest way to get data needed for a Watch Map is to use the [AppendWatches filter](https://community.rockrms.com/lava/filters/other-filters#appendwatches).

| Property | Type | Description |
| --- | --- | --- |
| SaveChanges | bool | If true then changes to the watch map will be saved to the server. Defaults to true. |
| WatchMap | string | Encoded representation of the previously saved watch map. Defaults to null. |
| InteractionGuid | Guid? | Identifier of the existing Interaction. Defaults to null. |
| MediaElementGuid | Guid? | Identifier of the MediaElement. Required to save changes. Defaults to null. |
| RelatedEntityTypeId | int? | Optional value for RelatedEntityTypeId. Defaults to null. |
| RelatedEntityId | int? | Optional value for RelatedEntityId. Defaults to null. |

### Inherited Properties

These properties are inherited from the control we built on top of. You can view a full list of the supported properties [here](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/maui/views/mediaelement?tabs=android#properties), although we've trimmed down this documentation to only have the ones of interest.  

| Property | Type | Description | Default Value |
| --- | --- | --- | --- |
| Aspect | Aspect | Determines the scaling mode for the media. | Aspect.AspectFit |
| ShouldAutoPlay | bool | Automatically start playback when the Source is set. Bindable. | false |
| ShouldLoopPlayback | bool | Resume playback after reaching the end. Bindable. | false |
| ShouldKeepScreenOn | bool | Keep screen active during playback. Bindable. | false |
| ShouldMute | bool | Whether the audio is muted. Bindable. | false |
| ShouldShowPlaybackControls | bool | Show platform playback controls. Shown briefly on iOS/Windows. Bindable. | true |
| Source | string | Media source URL. |  |
| Speed | double | Playback speed. Bindable. | 1 |

### Examples

A simple player with Source defined:

```xaml
<Rock:MediaPlayer Source="https://example.com/video_file.mp4" />
```

Inclusion of the WatchMap object and some properties:

```xaml
<Rock:MediaPlayer Source="https://example.com/video_file.mp4">
  <Rock:MediaPlayer.WatchMap>
      <Rock:WatchMapParameters MediaElementGuid="{{ mediaElement.Guid }}"
          InteractionGuid="{{ interactionGuid }}"
          WatchMap="{{ watchMap }}" />
  </Rock:MediaPlayer.WatchMap>
</Rock:MediaPlayer>
```

This example shows how to pull the Watch Map data directly via SQL, if the [AppendWatches filter](https://community.rockrms.com/lava/filters/other-filters#appendwatches) in Lava isn't a good fit (uncommon).

```xaml
<Grid>
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
</Grid>
```

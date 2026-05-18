---
description: Use when implementing embedded video/audio playback in Rock Mobile apps using the legacy Media Player control for versions before 6.0
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

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
| WatchMap | [WatchMapParameters](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/media-player/legacy#watch-map-properties) | Enables the Watch Map feature in the media player that allows saving playback position to the server and resuming a previous session. Defaults to null.   M v2.0C v12.4 |

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

The MediaPlayer doesn't have a way to toggle captions on or off, but iOS users can take advantage of the **Closed Captions + SDH** option that will show them. This is currently found under Settings \> Accessibility \> Subtitles & Captioning. Some video hosts like Vimeo can auto-generate captions.

![](https://community.rockrms.com/GetImage.ashx?Id=67155)

For more information, check out Apple's official documentation:

[Display subtitles and captions on iPhone | Apple Support](https://support.apple.com/guide/iphone/subtitles-and-captions-iph3e2e23d1/ios)

---

## Notification Box {#notification-box}

M v1.0

*Inherits from [Xamarin.Forms.Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame)*

It happens. Something goes wrong and you need to display an error message to the user. Or perhaps something goes right and you want to be sure the user has feedback that everything is taken care of. Either way, you need a nice way to display a message on the page that has some nice colorful visual indicators.

The NotificationBox allows you to display a color-coded notification on the page. The notification will be colored to match the type of notification and contain the text you specify. You can also include an optional header text to stand out even more.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text to be displayed as the message of the notification. |
| HeaderText | string | An optional bit of text that can be used to give the user context about the message. |
| NotificationType | [NotificationType](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/notification-box#notification-type) | The type of notification to display. Defaults to Information. |

#### Notification Type

- Information
- Success
- Validation
- Warning
- Error
- Primary
- Secondary
- Dark
- Light

### Example

```
<Rock:NotificationBox NotificationType="Information"
                      HeaderText="Information Needed"
                      Text="Please update your information below to keep our records current." />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67158)

---

## Paragraph Text {#paragraph-text}

M v1.0

*Inherits from [Xamarin.Forms.StackLayout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/stack-layout)*

Using a normal Label for text works great, but if you have several paragraphs worth of text it won't have the best typography. Correctly styled text should have a good amount of spacing between paragraphs. This helps individuals to read the content quicker. Using a single Label will give you the proper line returns, but it won't have the best spacing.

The ParagraphText control allows you provide a text string that contains several paragraphs worth of content. It will parse this and ensure each paragraph gets its own Label. These labels will have a CSS style class of `body` applied to them. It's this class that applies the correct amount of margin below the Label. You can also override this class to provide a different-sized text/margin.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text to show. This can also be provided via the content of the tag. |
| LabelCssClass | string | A string of the CSS classes to apply to each Label that represents a paragraph. If no value is applied each paragraph will have a body class added to it. |

### Example

```
<Rock:ParagraphText>
    Leverage agile frameworks to provide a robust synopsis for high level
    overviews. Iterative approaches to corporate strategy foster collaborative
    thinking to further the overall value proposition. Organically grow the
    holistic world view of disruptive innovation via workplace diversity
    and empowerment.
    Bring to the table win-win survival strategies to ensure proactive
    domination. At the end of the day, going forward, a new normal that has
    evolved from generation X is on the runway heading towards a streamlined
    cloud solution. User generated content in real-time will have multiple
    touchpoints for offshoring.
    Capitalize on low hanging fruit to identify a ballpark value added
    activity to beta test. Override the digital divide with additional
    clickthroughs from DevOps. Nanotechnology immersion along the information
    highway will close the loop on focusing solely on the bottom line.
</Rock:ParagraphText>
```

Note

Don't worry if your paragraphs have more than one line-break between them. All extra line breaks will be ignored.

---

## QR Code {#qr-code}

M v1.0

Ever wish you could display a QR Code in your application based on something generated on the server? Okay maybe this isn't a common thing just yet, but we think QR Codes will become a great way to pass information without having to make direct contact.

QR Codes allow you to store lots of information. But the more information you store, the more complex they become. The more complex they become the more difficult they are to scan. That isn't to say you can't scan them, but think of it like the old Where's Waldo books. Imagine you had two Waldo pages. One page had Waldo standing all by himself in an open field. It only takes a quick glance to know where he is. Now imagine your standard "complex" Waldo page. It's not hard to find him because he is obscured and barely visible, it's just because there is a lot of clutter that looks similar around him.

The same is true of QR Code complexity. A simple code can be scanned without trouble. A complex code might take a bit more finesse on the scanner to get things lined up properly. So the moral of the Waldo story is test your codes. It isn't just the complexity, but the size and color choices also play a role. So test your code at the "most complex" it could be and verify it will scan easily. Otherwise you might need to adjust size and color (assuming you can't make it less complex) so it's easier to scan.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| BackgroundColor | Color | The background color behind the QR Code. Transparent by default. |
| Color | Color | The color of the foreground blocks. Defaults to Black. |
| Level | [ECCLevel](https://mobiledocs.rockrms.com/essentials/controls/content-controls/qr-code#ecclevel) | Error correction level. Defaults to M. |
| Content | string | The content to encode into the QR Code. |

#### ECCLevel

ECC Level or Error Correcting Code Level, defines how much of the QR Code can be damaged before it can no longer be scanned. A higher ECC Level means a more complex image, so you shouldn't plan on just using the highest ECC Level and calling it a day. Since we are displaying on a screen, the chance of damage is near zero (unless your finger is in the way).

| Value | Description |
| --- | --- |
| L | Allows for up to 7% damage. |
| M | Allows for up to 15% damage. |
| Q | Allows for up to 25% damage. |
| H | Allows for up to 30% damage. |

### Example

```
<Rock:QRCode Content="{{ CurrentPerson.Guid }}" />
```

In this example, we are assuming the user is logged in and that we are processing Lava on the server. This would generate a QR Code on screen whose scanned content would contain the person's unique identifier. Later, you could use this with another application to scan the QR Code and know who the person is. Another option would be to encode something like the Guid value of an Event Registration Registrant. Then when scanned you could display the details of their registration.

---

## Ratio View {#ratio-view}

*Constrain a view to a certain ratio.*

M v4.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

This is a simple view that allows you to constrain the size to a certain ratio.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Ratio | string | The ratio to constrain the view to (ex: "16:9"). |

### Example

```
<Rock:RatioView Ratio="16:9">
    <Rock:Image Source="example.com/image.png" />
</Rock:RatioView>
```

---

## Redirect {#redirect}

M v1.0

*Inherits from [Xamarin.Forms.View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view)*

While technically a View, this control does not actually render any content. Instead, it is used as a way for you to redirect the user to another page. This works similarly to the `ReplacePage` command. The primary difference is that the `Redirect` view does not require user interaction. This allows you to simply put the `Redirect` view in your XAML and the user is automatically redirected to the target page before the current page content is ever displayed.

If the `Redirect` view is encountered before the page is fully rendered then the redirect happens after the page has finished initializing but before the page is displayed. On the other hand, if it is encountered after the page is fully rendered then the redirect happens immediately.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The page identifier that the user will be redirected to. |
| QueryString | string | An optional set of query string parameters that will be passed to the page. Note: This value must be XML escaped for the XAML to be parsed properly. |

### Example

```
<Rock:Redirect PageGuid="8beefd7c-9939-4892-9cb2-243e58fca457"
    QueryString="ItemType=Person&amp;ItemId=4823" />
```

---

## Responsive Column {#responsive-column}

M v1.0

*Inherits from* [*Xamarin.Forms.StackLayout*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.stacklayout)

Let's just get the obvious out of the way - you are probably reading the wrong page. We imagine you meant to be reading the [ResponsiveLayout](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/responsive-layout) page instead. Unless you are just looking for the API reference all the juicy details are over there.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| ExtraSmall | int? | The number of column segments that this column occupies on extra small devices. Defaults to null. |
| Small | int? | The number of column segments that this column occupies on small devices. Defaults to null. |
| Medium | int? | The number of column segments that this column occupies on medium devices. Defaults to null. |
| Large | int? | The number of column segments that this column occupies on large devices. Defaults to null. |
| ExtraLarge | int? | The number of column segments that this column occupies on extra large devices. Defaults to null. |
| ExtraSmallOrder | int? | Overrides the default ordering of columns on extra small devices. Defaults to null. |
| SmallOrder | int? | Overrides the default ordering of columns on small devices. Defaults to null. |
| MediumOrder | int? | Overrides the default ordering of columns on medium devices. Defaults to null. |
| LargeOrder | int? | Overrides the default ordering of columns on large devices. Defaults to null. |
| ExtraLargeOrder | int? | Overrides the default ordering of columns on extra large devices. Defaults to null. |
| Spacing | double | Specifies the amount of spacing between child views (inherited from StackLayout). Defaults to 10. |

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Media Progress Bar

# Media Progress Bar

M v2.0

Inherits from [Xamarin.Forms.View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view)

Functionally, this control behaves just like a [Slider](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.slider). However, the Slider has a few quirks that make it unsuitable for use with tracking progress of a media player. Visually this renders a track bar as well as a thumb that shows the current position of playback. It can also be used by the person to scrub through the media by moving the thumb along the track.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Position | double | The current position of the playback in fractional seconds. |
| Duration | double | The total length of the media being played in fractional seconds. |
| ThumbSize | double | The diameter of the drawn thumb on the play track. Defaults to 12. |
| TrackBackgroundColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color of the track background for the region that has not been played. Defaults to 50% gray at 65% opacity. |
| TrackProgressColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color of the track background for the played region. Defaults to the application's primary color. |
| ThumbColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color of the thumb knob. Defaults to White. |

### Example

```
<Rock:MediaProgressBar Duration="{Binding Duration}"
                       Position="{Binding Position}" />
```

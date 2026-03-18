> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > Seconds To Time String Converter

# Seconds To Time String Converter

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

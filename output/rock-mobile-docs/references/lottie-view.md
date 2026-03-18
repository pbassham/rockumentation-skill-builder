> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Lottie View

# Lottie View

*A component that seamlessly displays engaging animations to enhance your mobile app's user experience.*

M v6.0

### Quick Links

1.  [Lottie Files Gallery](https://lottiefiles.com/featured)

### Lottie Files

Lottie files are JSON-based animations. These files are lightweight, scalable, and can be rendered natively on mobile and web platforms, allowing for high-quality animations with minimal performance impact. Lottie animations can include complex animations and interactivity, making them an excellent choice for adding visual flair to your applications.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Source | Source | The source of the lottie file. |
| Progress | TimeSpan | The current playback progress of the animation. |
| RepeatCount | int | The number of times to repeat the animation. Default is 0 (no repeat). A value of -1 will repeat forever. |
| RepeatMode | [RepeatMode](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/lottie-view#repeat-mode) | The way in which to repeat the animation. Default is Restart. |
| IsAnimationEnabled | bool | Determines whether the control will play the animation provided. |
| AnimationCompletedCommand | Command | A command that executes once the animation has completed. |
| AnimationCompletedCommandParameter | object | The parameter to pass to the animation completed command. |

#### Repeat Mode

| Value | Description |
| --- | --- |
| Restart | Restarts the animation from the beginning. |
| Reverse | Reverses the animation from the end back to the beginning. |

### Examples

```
<Rock:LottieView Source="https://church.com/lottiefile.json"
    HeightRequest="64"
    WidthRequest="64" />
```

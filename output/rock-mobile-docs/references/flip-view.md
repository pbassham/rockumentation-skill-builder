> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Flip View

# Flip View

M v2.0C v12.4

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*.*

This is a simple view that allows you to have two views take up the same space on the page. You wire up whatever interaction you want to cause the view to flip from front to back and vice-versa. So you can wire it up to a tap on the view itself, or whatever else you want.

There are two ways to initiate a flip. You can bind the `IsFlipped` property to a boolean value that will cause the view to flip when the value changes. This is probably not a common situation for you. Instead there is a `FlipCommand` property that you can bind to an action to initiate the flip, as you will see in the example below.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| FrontView | View | The view content to display on the front side. |
| BackView | View | The view content to display on the back side. |
| IsFlipped | boolean | If true then the back view will be displayed, otherwise the front view will be displayed. *Default is* *false**.* |
| IsHeightNormalized | boolean | If true then the flip view will always take the height of whichever view is taller and ensure it always takes up that much space. If false then when you flip views content below may shift up or down. *Default is* *true**.* |
| Duration | boolean | The time in milliseconds that the transition between views will take. *Default is* *400**.* |
| Orientation | [FlipOrientation](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/flip-view#flip-orientation) | The orientation of the flip. *Default is* *Horizontal**.* |
| Easing | [Easing](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.easing) | The type of animation easing function to use. *Default is* *Linear**.* |
| FlipCommand | ICommand | You can bind an action to this property to initiate a flip. |

### Flip Orientation

| Value | Description |
| --- | --- |
| Horizontal | The content is flipped horizontally. |
| Vertical | The content is flipped vertically. |

### Example

The `FlipCommand` is not a standard command, so as you can see we are actually using a named reference to the FlipView in our binding.

```
<Rock:FlipView x:Name="textCard">
    <Rock:FlipView.GestureRecognizers>
        <TapGestureRecognizer Command="{Binding FlipCommand, Source={x:Reference textCard}}" />
    </Rock:FlipView.GestureRecognizers>
    
    <Rock:FlipView.FrontView>
        <Label Text="Front Text" />
    </Rock:FlipView.FrontView>

    <Rock:FlipView.BackView>
        <Label Text="Back Text" />
    </Rock:FlipView.BackView>
</Rock:FlipView>
```

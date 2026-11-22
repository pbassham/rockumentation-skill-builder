---
description: Use when building UI animations in Rock Mobile to respond to user actions or view loading events
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Animations change how an element looks over a set amount of time, such as fading in a label or shaking a field. You define an animation once, then start it when the person does something or when the page loads.

There are two kinds. **Triggered** animations run when something starts them. **Passive** animations stay attached to an element and update it whenever a value they track changes. Each animation has its own page, listed below.

## Defining Animations

**Define an animation in the `Resources` of an ancestor.** Animations are referenced by name, so each one needs an `x:Key` and has to be defined on an element above the one that uses it. You can’t define it on the element itself. In this layout, an animation for `myLabel` can go on the `VerticalStackLayout` or the `ScrollView`:

```
<ScrollView>
    <VerticalStackLayout>
        <Label x:Name="myLabel"
            Text="Hello Rock!" />
    </VerticalStackLayout>
</ScrollView>
```

Here it’s defined on the `VerticalStackLayout`:

```
<VerticalStackLayout>
    <VerticalStackLayout.Resources>
        <Rock:FadeToAnimation x:Key="FadeOut"
            Target="{x:Reference myLabel}"
            Duration="2000"
            Opacity="0" />
    </VerticalStackLayout.Resources>

    <Label x:Name="myLabel"
        Text="Hello Rock!" />
</VerticalStackLayout>
```

This animation targets `myLabel` and changes its `Opacity` from its current value to `0` over 2,000 milliseconds (2 seconds). Defining an animation doesn’t start it.

## Starting Animations

**Start an animation with a trigger or a behavior.** A trigger starts it when the person does something, such as tapping a button. A behavior starts it automatically when the element loads.

### With a Trigger

Add a `BeginAnimation` to an event trigger. When the person taps this button, the label fades out over 2 seconds:

```
<ScrollView>
    <VerticalStackLayout>
        <VerticalStackLayout.Resources>
            <Rock:FadeToAnimation x:Key="FadeOut"
                Target="{x:Reference myLabel}"
                Duration="2000"
                Opacity="0" />
        </VerticalStackLayout.Resources>

        <Label x:Name="myLabel"
            Text="Hello Rock!" />

        <Button Text="Fade">
            <Button.Triggers>
                <EventTrigger Event="Clicked">
                    <Rock:BeginAnimation Animation="{StaticResource FadeOut}" />
                </EventTrigger>
            </Button.Triggers>
        </Button>
    </VerticalStackLayout>
</ScrollView>
```

### With a Behavior

To start the animation when the page loads, add a `BeginAnimationBehavior` to the element instead:

```
<ScrollView>
    <VerticalStackLayout>
        <VerticalStackLayout.Resources>
            <Rock:FadeToAnimation x:Key="FadeOut"
                Target="{x:Reference myLabel}"
                Duration="2000"
                Opacity="0" />
        </VerticalStackLayout.Resources>

        <Label x:Name="myLabel"
            Text="Hello Rock!">
            <Label.Behaviors>
                <Rock:BeginAnimationBehavior Animation="{StaticResource FadeOut}" />
            </Label.Behaviors>
        </Label>
    </VerticalStackLayout>
</ScrollView>
```

A behavior starts when its element is attached to its parent, which can happen before the page is fully visible. To cover that gap, the animation waits 250 milliseconds before it begins.

## Stopping Animations

**Stop a running animation with an `EndAnimation` trigger.** Here, one button starts the fade and the other stops it:

```
<ScrollView>
    <VerticalStackLayout>
        <VerticalStackLayout.Resources>
            <Rock:FadeToAnimation x:Key="FadeOut"
                Target="{x:Reference myLabel}"
                Duration="2000"
                Opacity="0" />
        </VerticalStackLayout.Resources>

        <Label x:Name="myLabel"
            Text="Hello Rock!" />

        <Button Text="Start Fade">
            <Button.Triggers>
                <EventTrigger Event="Clicked">
                    <Rock:BeginAnimation Animation="{StaticResource FadeOut}" />
                </EventTrigger>
            </Button.Triggers>
        </Button>

        <Button Text="Stop Fade">
            <Button.Triggers>
                <EventTrigger Event="Clicked">
                    <Rock:EndAnimation Animation="{StaticResource FadeOut}" />
                </EventTrigger>
            </Button.Triggers>
        </Button>
    </VerticalStackLayout>
</ScrollView>
```

An `EndAnimationBehavior` also exists, but because behaviors run when the element loads, it’s rarely useful.

## Triggered Animations

**Triggered animations stay idle until something starts them,** such as a tap on a button or a behavior when the page loads.

- [BackgroundColorAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/backgroundcoloranimation) changes an element’s background color.
- [BounceInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceinanimation) bounces an element into view.
- [BounceOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceoutanimation) bounces an element out of view.
- [ColorAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/coloranimation) animates any color property.
- [CornerRadiusAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/cornerradiusanimation) animates a corner radius.
- [DoubleAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/doubleanimation) animates any number property.
- [FadeInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeinanimation) fades and slides an element into view.
- [FadeOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeoutanimation) fades and slides an element out of view.
- [FadeToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadetoanimation) fades an element to a set opacity.
- [FlipAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/flipanimation) flips an element into view like a card.
- [GroupAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/groupanimation) starts several animations together.
- [HeartAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/heartanimation) pulses an element like a heartbeat.
- [IntAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/intanimation) animates any whole-number property.
- [JumpAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/jumpanimation) makes an element jump up and down.
- [RelRotateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/relrotatetoanimation) rotates an element by a number of degrees.
- [RelScaleToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/relscaletoanimation) scales an element by a relative amount.
- [RotateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatetoanimation) rotates an element to a set angle.
- [RotateXToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatextoanimation) tilts an element on its x-axis.
- [RotateYToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotateytoanimation) turns an element on its y-axis.
- [ScaleToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/scaletoanimation) scales an element to a set size.
- [ShakeAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/shakeanimation) shakes an element side to side.
- [ThicknessAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/thicknessanimation) animates a margin or padding.
- [TranslateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/translatetoanimation) moves an element from its normal position.
- [TurnstileInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/turnstileinanimation) swings an element into view.
- [TurnstileOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/turnstileoutanimation) swings an element out of view.

## Passive Animations

**Passive animations are always active.** They track a value and update the element whenever that value changes. For example, a color can blend from one value to another as someone drags a slider.

- [AnimateProgressColor](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogresscolor) changes a color as a tracked value moves.
- [AnimateProgressCornerRadius](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogresscornerradius) changes a corner radius as a tracked value moves.
- [AnimateProgressDouble](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressdouble) changes a number as a tracked value moves.
- [AnimateProgressInt](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressint) changes a whole number as a tracked value moves.
- [AnimateProgressThickness](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressthickness) changes a margin or padding as a tracked value moves.

---

## AnimateProgressColor {#animateprogresscolor}

Mobile1.0

A passive animation that changes a `Color` property between the `From` and `To` values as a tracked value moves, such as blending a color as someone drags a slider.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| From | Color | The value to use when Progress is at or below Minimum. |
| To | Color | The value to use when Progress is at or above Maximum. |
| Property | string | The name of the property to animate. |
| Progress | double | The current value being tracked. |
| Minimum | double | The lowest value Progress is clamped to. Defaults to 0. |
| Maximum | double | The highest value Progress is clamped to. Defaults to 100. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |

## Example

Attach the animation to an element’s `Behaviors` and bind `Progress` to a value that changes, like a slider’s `Value`. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for how passive animations work.

```
<VerticalStackLayout>
    <Slider x:Name="mySlider"
        Minimum="0"
        Maximum="100" />

    <BoxView Color="Blue"
        HeightRequest="100">
        <BoxView.Behaviors>
            <Rock:AnimateProgressColor Property="Color"
                From="Red"
                To="Green"
                Progress="{Binding Path=Value, Source={x:Reference mySlider}}" />
        </BoxView.Behaviors>
    </BoxView>
</VerticalStackLayout>
```

## Related

- [ColorAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/coloranimation) animates a color property once, when it’s triggered.
- [BackgroundColorAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/backgroundcoloranimation) changes an element’s background color.
- [AnimateProgressDouble](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressdouble) changes a number as a tracked value moves.

---

## AnimateProgressCornerRadius {#animateprogresscornerradius}

Mobile1.0

A passive animation that changes a `CornerRadius` property between the `From` and `To` values as a tracked value moves.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| From | CornerRadius | The value to use when Progress is at or below Minimum. |
| To | CornerRadius | The value to use when Progress is at or above Maximum. |
| Property | string | The name of the property to animate. |
| Progress | double | The current value being tracked. |
| Minimum | double | The lowest value Progress is clamped to. Defaults to 0. |
| Maximum | double | The highest value Progress is clamped to. Defaults to 100. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |

## Example

Attach the animation to an element’s `Behaviors` and bind `Progress` to a value that changes, like a slider’s `Value`. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for how passive animations work.

```
<VerticalStackLayout>
    <Slider x:Name="mySlider"
        Minimum="0"
        Maximum="100" />

    <BoxView Color="Blue"
        HeightRequest="100">
        <BoxView.Behaviors>
            <Rock:AnimateProgressCornerRadius Property="CornerRadius"
                From="15,15,5,5"
                To="5,5,15,15"
                Progress="{Binding Path=Value, Source={x:Reference mySlider}}" />
        </BoxView.Behaviors>
    </BoxView>
</VerticalStackLayout>
```

## Related

- [CornerRadiusAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/cornerradiusanimation) animates a corner radius once, when it’s triggered.
- [AnimateProgressThickness](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressthickness) changes a margin or padding as a tracked value moves.
- [AnimateProgressDouble](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressdouble) changes a number as a tracked value moves.

---

## AnimateProgressDouble {#animateprogressdouble}

Mobile1.0

A passive animation that changes a `double` property, such as `HeightRequest` or `Opacity`, between the `From` and `To` values as a tracked value moves.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| From | double | The value to use when Progress is at or below Minimum. |
| To | double | The value to use when Progress is at or above Maximum. |
| Property | string | The name of the property to animate. |
| Progress | double | The current value being tracked. |
| Minimum | double | The lowest value Progress is clamped to. Defaults to 0. |
| Maximum | double | The highest value Progress is clamped to. Defaults to 100. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |

## Example

Attach the animation to an element’s `Behaviors` and bind `Progress` to a value that changes, like a slider’s `Value`. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for how passive animations work.

```
<VerticalStackLayout>
    <Slider x:Name="mySlider"
        Minimum="0"
        Maximum="100" />

    <BoxView Color="Blue"
        HeightRequest="100">
        <BoxView.Behaviors>
            <Rock:AnimateProgressDouble Property="HeightRequest"
                From="25"
                To="200"
                Progress="{Binding Path=Value, Source={x:Reference mySlider}}" />
        </BoxView.Behaviors>
    </BoxView>
</VerticalStackLayout>
```

## Related

- [DoubleAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/doubleanimation) animates a number property once, when it’s triggered.
- [AnimateProgressInt](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressint) changes a whole number as a tracked value moves.
- [AnimateProgressColor](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogresscolor) changes a color as a tracked value moves.

---

## AnimateProgressInt {#animateprogressint}

Mobile1.0

A passive animation that changes an `int` property between the `From` and `To` values as a tracked value moves.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| From | int | The value to use when Progress is at or below Minimum. |
| To | int | The value to use when Progress is at or above Maximum. |
| Property | string | The name of the property to animate. |
| Progress | double | The current value being tracked. |
| Minimum | double | The lowest value Progress is clamped to. Defaults to 0. |
| Maximum | double | The highest value Progress is clamped to. Defaults to 100. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |

## Example

Attach the animation to an element’s `Behaviors` and bind `Progress` to a value that changes, like a slider’s `Value`. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for how passive animations work.

```
<VerticalStackLayout>
    <Slider x:Name="mySlider"
        Minimum="0"
        Maximum="100" />

    <BoxView Color="Blue"
        HeightRequest="100">
        <BoxView.Behaviors>
            <Rock:AnimateProgressInt Property="TabIndex"
                From="0"
                To="15"
                Progress="{Binding Path=Value, Source={x:Reference mySlider}}" />
        </BoxView.Behaviors>
    </BoxView>
</VerticalStackLayout>
```

## Related

- [IntAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/intanimation) animates a whole-number property once, when it’s triggered.
- [AnimateProgressDouble](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressdouble) changes a number as a tracked value moves.

---

## AnimateProgressThickness {#animateprogressthickness}

Mobile1.0

A passive animation that changes a `Thickness` property, such as `Margin` or `Padding`, between the `From` and `To` values as a tracked value moves.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| From | Thickness | The value to use when Progress is at or below Minimum. |
| To | Thickness | The value to use when Progress is at or above Maximum. |
| Property | string | The name of the property to animate. |
| Progress | double | The current value being tracked. |
| Minimum | double | The lowest value Progress is clamped to. Defaults to 0. |
| Maximum | double | The highest value Progress is clamped to. Defaults to 100. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |

## Example

Attach the animation to an element’s `Behaviors` and bind `Progress` to a value that changes, like a slider’s `Value`. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for how passive animations work.

```
<VerticalStackLayout>
    <Slider x:Name="mySlider"
        Minimum="0"
        Maximum="100" />

    <BoxView Color="Blue"
        HeightRequest="100">
        <BoxView.Behaviors>
            <Rock:AnimateProgressThickness Property="Margin"
                From="0"
                To="20,20,10,10"
                Progress="{Binding Path=Value, Source={x:Reference mySlider}}" />
        </BoxView.Behaviors>
    </BoxView>
</VerticalStackLayout>
```

## Related

- [ThicknessAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/thicknessanimation) animates a margin or padding once, when it’s triggered.
- [AnimateProgressCornerRadius](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogresscornerradius) changes a corner radius as a tracked value moves.
- [AnimateProgressDouble](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressdouble) changes a number as a tracked value moves.

---

## BackgroundColorAnimation {#backgroundcoloranimation}

Mobile1.0

Animates the `BackgroundColor` of the target from its current value to a new color.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| ToColor | Color | The color to transition the background to. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:BackgroundColorAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    ToColor="#ee7725" />
```

## Related

- [ColorAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/coloranimation) animates any color property, such as `TextColor`.
- [AnimateProgressColor](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogresscolor) changes a color as a tracked value moves.
- [FadeToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadetoanimation) fades an element to a set opacity.

---

## BounceInAnimation {#bounceinanimation}

Mobile1.0

Animates the `Scale` and `Opacity` of the target to make it bounce into view.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:BounceInAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## Related

- [BounceOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceoutanimation) bounces an element out of view.
- [FadeInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeinanimation) fades and slides an element into view.
- [TurnstileInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/turnstileinanimation) swings an element into view.

---

## BounceOutAnimation {#bounceoutanimation}

Mobile1.0

Animates the `Scale` and `Opacity` of the target to make it bounce out of view.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:BounceOutAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## Related

- [BounceInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceinanimation) bounces an element into view.
- [FadeOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeoutanimation) fades and slides an element out of view.
- [TurnstileOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/turnstileoutanimation) swings an element out of view.

---

## ColorAnimation {#coloranimation}

Mobile1.0

Animates the named property of the target, which must be a `Color`, between two values.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Property | string | The name of the property to animate. |
| From | Color | The starting value. If not set, the property’s current value is used. |
| To | Color | The ending value. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:ColorAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Property="TextColor"
    Duration="2000"
    To="#ee7725" />
```

## Related

- [BackgroundColorAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/backgroundcoloranimation) changes an element’s background color.
- [AnimateProgressColor](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogresscolor) changes a color as a tracked value moves.
- [DoubleAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/doubleanimation) animates any number property.

---

## CornerRadiusAnimation {#cornerradiusanimation}

Mobile1.0

Animates the named property of the target, which must be a `CornerRadius`, between two values.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Property | string | The name of the property to animate. |
| From | CornerRadius | The starting value. If not set, the property’s current value is used. |
| To | CornerRadius | The ending value. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:CornerRadiusAnimation x:Key="Demo"
    Target="{x:Reference myBox}"
    Property="CornerRadius"
    Duration="2000"
    To="15,15,5,5" />
```

## Related

- [ThicknessAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/thicknessanimation) animates a margin or padding.
- [AnimateProgressCornerRadius](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogresscornerradius) changes a corner radius as a tracked value moves.
- [DoubleAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/doubleanimation) animates any number property.

---

## DoubleAnimation {#doubleanimation}

Mobile1.0

Animates the named property of the target, which must be a `double`, between two values.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Property | string | The name of the property to animate. |
| From | double | The starting value. If not set, the property’s current value is used. |
| To | double | The ending value. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:DoubleAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Property="Opacity"
    Duration="2000"
    To="0.5" />
```

## Related

- [IntAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/intanimation) animates any whole-number property.
- [ColorAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/coloranimation) animates any color property.
- [AnimateProgressDouble](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressdouble) changes a number as a tracked value moves.

---

## FadeInAnimation {#fadeinanimation}

Mobile1.0

Animates the `Opacity` and vertical position of the target to make it appear. As it fades in, it also slides up or down into its final position.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Direction | string | The direction the element slides: Up or Down. Defaults to Up. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:FadeInAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Direction="Down" />
```

## Related

- [FadeOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeoutanimation) fades and slides an element out of view.
- [FadeToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadetoanimation) fades an element to a set opacity without moving it.
- [BounceInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceinanimation) bounces an element into view.

---

## FadeOutAnimation {#fadeoutanimation}

Mobile1.0

Animates the `Opacity` and vertical position of the target to make it disappear. As it fades out, it also slides up or down from its current position.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Direction | string | The direction the element slides: Up or Down. Defaults to Up. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:FadeOutAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Direction="Down" />
```

## Related

- [FadeInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeinanimation) fades and slides an element into view.
- [FadeToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadetoanimation) fades an element to a set opacity without moving it.
- [BounceOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceoutanimation) bounces an element out of view.

---

## FadeToAnimation {#fadetoanimation}

Mobile1.0

Animates the `Opacity` of the target from its current value to a new value.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Opacity | double | The opacity the element should have when the animation finishes, from 0 to 1.0. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:FadeToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Opacity="0.25" />
```

## Related

- [FadeInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeinanimation) fades and slides an element into view.
- [FadeOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeoutanimation) fades and slides an element out of view.
- [DoubleAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/doubleanimation) animates any number property.

---

## FlipAnimation {#flipanimation}

Mobile1.0

Animates the `Opacity` and `RotationY` of the target to make it appear. As it fades in, it also rotates on its y-axis, growing from a single vertical line to full width, as if a card were being turned 90 degrees.

Note

For an easy way to flip between two sections of content, use the [Flip View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/flip-view).

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Direction | string | The direction the element rotates: Left or Right. Defaults to Right. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:FlipAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Direction="Left" />
```

## Related

- [TurnstileInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/turnstileinanimation) swings an element into view.
- [RotateYToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotateytoanimation) turns an element on its y-axis.
- [FadeInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeinanimation) fades and slides an element into view.

---

## GroupAnimation {#groupanimation}

Mobile1.0

Groups animations so they can be triggered at the same time. Add the animations to group as child elements. Unlike other animations, it doesn’t take the shared animation properties; each child animation sets its own.

Note

When several animations in a group target the same element, they play one after another, from top to bottom. Each one waits for the previous one to finish.

## Example

Define the group in the `Resources` of a parent element, then start it with a trigger or behavior like any other animation. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:GroupAnimation x:Key="FadeOut">
    <Rock:FadeToAnimation Target="{x:Reference myLabel}"
        Duration="2000"
        Opacity="0" />
    <Rock:FadeToAnimation Target="{x:Reference myButton}"
        Duration="2000"
        Opacity="0" />
</Rock:GroupAnimation>
```

## Related

- [FadeToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadetoanimation) fades an element to a set opacity.
- [TranslateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/translatetoanimation) moves an element from its normal position.
- [ScaleToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/scaletoanimation) scales an element to a set size.

---

## HeartAnimation {#heartanimation}

Mobile1.0

Animates the `Scale` of the target to simulate a heartbeat, growing and shrinking slightly.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:HeartAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="1000" />
```

## Related

- [JumpAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/jumpanimation) makes an element jump up and down.
- [ShakeAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/shakeanimation) shakes an element side to side.
- [ScaleToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/scaletoanimation) scales an element to a set size.

---

## IntAnimation {#intanimation}

Mobile1.0

Animates the named property of the target, which must be an `int`, between two values.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Property | string | The name of the property to animate. |
| From | int | The starting value. If not set, the property’s current value is used. |
| To | int | The ending value. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:IntAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Property="TabIndex"
    Duration="2000"
    To="12" />
```

## Related

- [DoubleAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/doubleanimation) animates any number property.
- [AnimateProgressInt](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressint) changes a whole number as a tracked value moves.

---

## JumpAnimation {#jumpanimation}

Mobile1.0

Animates the `TranslationY` of the target to make it jump up and down.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:JumpAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## Related

- [ShakeAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/shakeanimation) shakes an element side to side.
- [HeartAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/heartanimation) pulses an element like a heartbeat.
- [TranslateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/translatetoanimation) moves an element from its normal position.

---

## RelRotateToAnimation {#relrotatetoanimation}

Mobile1.0

Animates the `Rotation` of the target to spin it by a number of degrees from where it is now. The rotation happens on the z-axis, so it doesn’t distort the element’s perspective.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The number of degrees to rotate the element by. Use a negative number to rotate the other way. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:RelRotateToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Rotation="-45" />
```

## Related

- [RotateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatetoanimation) rotates an element to a set angle.
- [RotateXToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatextoanimation) tilts an element on its x-axis.
- [RotateYToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotateytoanimation) turns an element on its y-axis.

---

## RelScaleToAnimation {#relscaletoanimation}

Mobile1.0

Animates the `Scale` of the target by a relative amount, making it larger or smaller than its current size.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Scale | double | The amount to change the element’s scale by. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:RelScaleToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Scale="0.8" />
```

## Related

- [ScaleToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/scaletoanimation) scales an element to a set size.
- [HeartAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/heartanimation) pulses an element like a heartbeat.

---

## RotateToAnimation {#rotatetoanimation}

Mobile1.0

Animates the `Rotation` of the target to spin it to a set angle. The rotation happens on the z-axis, so it doesn’t distort the element’s perspective.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The angle, in degrees, to rotate the element to. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:RotateToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Rotation="180" />
```

## Related

- [RelRotateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/relrotatetoanimation) rotates an element by a number of degrees.
- [RotateXToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatextoanimation) tilts an element on its x-axis.
- [RotateYToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotateytoanimation) turns an element on its y-axis.

---

## RotateXToAnimation {#rotatextoanimation}

Mobile1.0

Animates the `RotationX` of the target to tilt it on its x-axis, shifting its perspective.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The angle, in degrees, to rotate the element to. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:RotateXToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Rotation="90" />
```

## Related

- [RotateYToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotateytoanimation) turns an element on its y-axis.
- [RotateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatetoanimation) rotates an element to a set angle.
- [FlipAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/flipanimation) flips an element into view like a card.

---

## RotateYToAnimation {#rotateytoanimation}

Mobile1.0

Animates the `RotationY` of the target to turn it on its y-axis, shifting its perspective.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The angle, in degrees, to rotate the element to. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:RotateYToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Rotation="90" />
```

## Related

- [RotateXToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatextoanimation) tilts an element on its x-axis.
- [RotateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/rotatetoanimation) rotates an element to a set angle.
- [FlipAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/flipanimation) flips an element into view like a card.

---

## ScaleToAnimation {#scaletoanimation}

Mobile1.0

Animates the `Scale` of the target to a set size, making it larger or smaller than it normally would be.

Note

This animation ignores the `RepeatForever` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Scale | double | The scale to animate the element to. A value of 1 is its normal size. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:ScaleToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    Scale="1.2" />
```

## Related

- [RelScaleToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/relscaletoanimation) scales an element by a relative amount.
- [HeartAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/heartanimation) pulses an element like a heartbeat.
- [BounceInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceinanimation) bounces an element into view.

---

## ShakeAnimation {#shakeanimation}

Mobile1.0

Animates the `TranslationX` of the target so it looks like it’s being shaken back and forth.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:ShakeAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## Related

- [JumpAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/jumpanimation) makes an element jump up and down.
- [HeartAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/heartanimation) pulses an element like a heartbeat.
- [TranslateToAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/translatetoanimation) moves an element from its normal position.

---

## ThicknessAnimation {#thicknessanimation}

Mobile1.0

Animates the named property of the target, which must be a `Thickness` such as `Margin` or `Padding`, between two values.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Property | string | The name of the property to animate. |
| From | Thickness | The starting value. If not set, the property’s current value is used. |
| To | Thickness | The ending value. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:ThicknessAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Property="Margin"
    Duration="2000"
    To="15" />
```

## Related

- [CornerRadiusAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/cornerradiusanimation) animates a corner radius.
- [AnimateProgressThickness](https://community.rockrms.com/developer/mobile-docs/essentials/animations/animateprogressthickness) changes a margin or padding as a tracked value moves.
- [DoubleAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/doubleanimation) animates any number property.

---

## TranslateToAnimation {#translatetoanimation}

Mobile1.0

Animates the `TranslationX` and `TranslationY` of the target to shift it away from its normal position.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| TranslateX | double | How far to shift the element on the x-axis. |
| TranslateY | double | How far to shift the element on the y-axis. |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:TranslateToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    TranslateX="30"
    TranslateY="-15" />
```

## Related

- [JumpAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/jumpanimation) makes an element jump up and down.
- [ShakeAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/shakeanimation) shakes an element side to side.
- [FadeInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeinanimation) fades and slides an element into view.

---

## TurnstileInAnimation {#turnstileinanimation}

Mobile1.0

Animates the `RotationY` and `Opacity` of the target to give it a turnstile effect as it appears on the screen.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:TurnstileInAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## Related

- [TurnstileOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/turnstileoutanimation) swings an element out of view.
- [FlipAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/flipanimation) flips an element into view like a card.
- [BounceInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceinanimation) bounces an element into view.

---

## TurnstileOutAnimation {#turnstileoutanimation}

Mobile1.0

Animates the `RotationY` and `Opacity` of the target to give it a turnstile effect as it disappears from the screen.

Note

This animation ignores the `Easing` property.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | The element to animate. |
| Duration | string | The length of the animation in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing curve to use: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SpringIn or SpringOut. Defaults to Linear. |
| Delay | int | How long to wait before the animation begins, in milliseconds. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until it’s stopped. Defaults to false. |

## Example

Define the animation in the `Resources` of a parent element, then start it with a trigger or behavior. See [Animations](https://community.rockrms.com/developer/mobile-docs/essentials/animations) for the full setup.

```
<Rock:TurnstileOutAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## Related

- [TurnstileInAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/turnstileinanimation) swings an element into view.
- [BounceOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/bounceoutanimation) bounces an element out of view.
- [FadeOutAnimation](https://community.rockrms.com/developer/mobile-docs/essentials/animations/fadeoutanimation) fades and slides an element out of view.

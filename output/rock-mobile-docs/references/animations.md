> **Path:** Mobile Docs > 🧱 Essentials > Animations

# Animations

Animations provide a way to make adjustments to the UI in response to user actions over a pre-determined amount of time.

Animations in Rock Mobile Shell are provided by the [AlohaKit animation library](https://github.com/jsuarezruiz/AlohaKit.Animations). That page has some samples and screenshots to give you a few ideas of what you can build. But we'll give you some information on *how* to build it here.

## Defining Animations

Let's talk about simple animations first. Animations are referenced by name and defined in the Resources of an element. In order to access an animation, it must be defined in an ancestor of where you are trying to reference it. Said another way, let's suppose you have the following XAML defined:

```xaml
<ScrollView>
  <StackLayout>
    <Label x:Name="myLabel" Text="Hello Rock!" />
  </StackLayout>
</ScrollView>
```

If you wanted to apply an animation to the label called `myLabel` then you would need to define it on either the `StackLayout` or the `ScrollView`. As long as it's defined above the element you are going to be referencing it from then you are fine. You cannot define it on the element itself.

So let's take an example of what this might look like:

```xaml
<StackLayout>
  <StackLayout.Resources>
    <Rock:FadeToAnimation x:Key="FadeOut"
      Target="{x:Reference myLabel}"
      Duration="2000"
      Opacity="0" />
  </StackLayout.Resources>

  <Label x:Name="myLabel" Text="Hello Rock!" />
</StackLayout>
```

This defines an animation that references `myLabel` as the target of the changes it will be making. The animation is going to be changing the `Opacity` property of the label over a duration of 2,000 milliseconds (2 seconds). Finally, it will change the opacity of the label from its current opacity to the target opacity of `0`. Note, this only defines the animation, it doesn't actually trigger it.

These types of animation definitions let you target specific visual elements with a pre-defined animation style.

### Starting Animations

Okay, we were able to define an animation but we need to start it somehow. You have two choices when it comes to triggering an animation.

1.  Trigger style in response to the user doing something.
2.  Automatically when the view loads (behavior style).

Let's modify our example above but include a trigger style activator based on the user tapping a button:

```xaml
<ScrollView>
  <StackLayout>
    <StackLayout.Resources>
      <Rock:FadeToAnimation x:Key="FadeOut"
        Target="{x:Reference myLabel}"
        Duration="2000"
        Opacity="0" />
    </StackLayout.Resources>

    <Label x:Name="myLabel" Text="Hello Rock!" />

    <Button Text="Fade">
      <Button.Triggers>
        <EventTrigger Event="Clicked">
          <Rock:BeginAnimation Animation="{StaticResource FadeOut}" />
        </EventTrigger>
      </Button.Triggers>
    </Button>
  </StackLayout>
</ScrollView>
```

We've added a button and a BeginAnimation trigger to it that starts the `FadeOut` animation we previously defined. Now, when the user taps the `Fade` button, the label above will slowly fade out over 2 seconds.

Another way we could define this is by behavior. Suppose we wanted the text to automatically fade out after the page loads? To do that we would use a BeginAnimationBehavior instead:

```xaml
<ScrollView>
  <StackLayout>
    <StackLayout.Resources>
      <Rock:FadeToAnimation x:Key="FadeOut"
        Target="{x:Reference myLabel}"
        Duration="2000"
        Opacity="0" />
    </StackLayout.Resources>

    <Label x:Name="myLabel" Text="Hello Rock!">
      <Label.Behaviors>
        <Rock:BeginAnimationBehavior Animation="{StaticResource FadeOut}" />
      </Label.Behaviors>
    </Label>
  </StackLayout>
</ScrollView>
```

The way behaviors work is that they begin when the element they are attached to are themselves attached to their parent element. Because there might be a delay between when this happens and when the page itself becomes fully visible, there is a hard-coded 250-millisecond delay before the referenced animation actually begins.

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | A reference to the targeted element to be animated. |
| Duration | string | The duration of the animation, in milliseconds. Defaults to 1000. |
| Easing | EasingType | The easing to use when calculating the animation curve: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SprintIn, SpringOut. Defaults to Linear. |
| Delay | int | A delay in milliseconds before the animation will begin. Defaults to 0. |
| RepeatForever | bool | Repeats the animation until stopped. Defaults to false. |

### Stopping Animations

You can also provide the ability to stop an animation by using a trigger. Technically, the library also supports stopping an animation using a behavior, but in our use case, those don't actually make sense. If you are curious though, it is available as `EndAnimationBehavior`. But here is an example of two buttons, one to start and one to stop an animation.

```xaml
<ScrollView>
  <StackLayout>
    <StackLayout.Resources>
      <Rock:FadeToAnimation x:Key="FadeOut"
        Target="{x:Reference myLabel}"
        Duration="2000"
        Opacity="0" />
    </StackLayout.Resources>

    <Label x:Name="myLabel" Text="Hello Rock!" />

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
  </StackLayout>
</ScrollView>
```

### Triggered Animations

Triggered animations are ones that are, well, triggered by some user interaction. Until the user activates that trigger event, such as tapping a button, the animation remains idle.

All of the animations in this section support the following properties.

| Property | Type | Description |
| --- | --- | --- |
| Target | VisualElement | A reference to the targetted element to be animated. |
| Duration | string | The duration of the animation, in milliseconds. *Defaults to* *1000**.* |
| Easing | EasingType | The easing to use when calculating the animation curve: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SprintIn, SpringOut. *Defaults to* *Linear**.* |
| Delay | int | A delay in milliseconds before the animation will begin. *Defaults to* *0**.* |
| RepeatForever | bool | Repeats the animation until stopped. *Defaults to* *false**.* |

### BounceInAnimation

Animates the `Scale` and `Opacity` of the target to make it appear.

Important

  This animation ignores the Easing property.  

```xaml
<Rock:BounceInAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## BounceOutAnimation

Animates the `Scale` and `Opacity` of the target to make it disappear.

Important

  This animation ignores the Easing property.  

```xaml
<Rock:BounceOutAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## BackgroundColorAnimation

Animates the `BackgroundColor` of the target from its current value to a new color.

Important

  This animation ignores the Easing property.  

| Property | Type | Description |
| --- | --- | --- |
| ToColor | Color | The target color that the BackgroundColor will be transitioned to. |

```xaml
<Rock:BackgroundColorAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    ToColor="#ee7725" />
```

### ColorAnimation

Animates the specified property of the target, which must be of type Color, between two values.

| Property | Type | Description |
| --- | --- | --- |
| From | Color | The value that the property will be transitioned from. If not set then the current property value is used. |
| Property | string | The name of the property to be animated. |
| To | Color | The value that the property will be transitioned to. |

```xaml
<Rock:ColorAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Property="TextColor"
    Duration="2000"
    To="#ee7725" />
```

### CornerRadiusAnimation

Animates the specified property of the target, which must be of type CornerRadius, between two values.

| Property | Type | Description |
| --- | --- | --- |
| From | CornerRadius | The value that the property will be transitioned from. If not set then the current property value is used. |
| Property | string | The name of the property to be animated. |
| To | CornerRadius | The value that the property will be transitioned to. |

```xaml
<Rock:CornerRadiusAnimation x:Key="Demo" Target="{x:Reference myBox}" Property="CornerRadius" Duration="2000" To="15,15,5,5" />
```

### DoubleAnimation

Animates the specified property, which must be of type double, of the target between two values.

| Property | Type | Description |
| --- | --- | --- |
| From | double | The value that the property will be transitioned from. If not set then the current property value is used. |
| Property | string | The name of the property to be animated. |
| To | double | The value that the property will be transitioned to. |

```xaml
<Rock:DoubleAnimation x:Key="Demo" Target="{x:Reference myLabel}" Property="Opacity" Duration="2000" To="0.5" />
```

### FadeInAnimation

  
Animates the Opacity and Y position of the element to make it visible. As the element is faded in it will also slide down or up to its final position.

This animation ignores the Easing property.

| Property | Type | Description |
| --- | --- | --- |
| Direction | string | The vertical movement direction of the element: Up or Down. Defaults to Up. |

```xaml
<Rock:FadeInAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Direction="Down" />
```

## FadeToAnimation

Animates the Opacity of the target from its current value to a new value.

| Property | Type | Description |
| --- | --- | --- |
| Opacity | double | The target opacity that the element should have once the animation finished. This value should be between 0 and 1.0. |

```xaml
<Rock:FadeToAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Opacity="0.25" />
```

## FadeOutAnimation

Animates the Opacity and Y position of the element to make it invisible. As the element is faded in, it will also slide down or up from its current position.

Important

  This animation ignores the Easing property.  

| Property | Type | Description |
| --- | --- | --- |
| Direction | string | The vertical movement direction of the element: Up or Down. Defaults to Up. |

```xaml
<Rock:FadeOutAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Direction="Down" />
```

### FlipAnimation

Animates the Opacity and RotationY axis of the element to make it visible. As the element is faded in it will also rotate along its y-axis (that is, it will grow from a single vertical line to full-width) as if a card were being turned 90 degrees.

Note

  Check out the Flip View for an easy way to animate between two sections of content.  

Important

  This animation ignores the Easing property.  

| Property | Type | Description |
| --- | --- | --- |
| Direction | string | The horizontal rotation direction of the element: Left or Right. Defaults to Right. |

```xaml
<Rock:FlipAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Direction="Left" />
```

## HeartAnimation

Animates the Scale of the target to simulate a heartbeat, growing and shrinking slightly.

Note

  This animation ignores the Easing property.  

```xaml
<Rock:HeartAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="1000" />
```

## IntAnimation

Animates the specified property of the target, which must be of type int, between two values.

| Property | Type | Description |
| --- | --- | --- |
| From | int | The value that the property will be transitioned from. If not set then the current property value is used. |
| Property | string | The name of the property to be animated. |
| To | int | The value that the property will be transitioned to. |

```xaml
<Rock:IntAnimation x:Key="Demo" Target="{x:Reference myLabel}" Property="TabIndex" Duration="2000" To="12" />
```

## JumpAnimation

Animates the TranslationY of the target to cause it to jump up and down.

Important

  This animation ignores the Easing property.  

```xaml
<Rock:JumpAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" />
```

## RelRotateToAnimation

Animates the Rotation of the target to spin the element by the number of degrees. This rotation happens along the Z-axis, meaning it does not distort the element's perspective at all.

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The delta angle that the target should be rotated by (positive or negative number). |

```xaml
<Rock:RelRotateToAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Rotation="-45" />
```

## RelScaleToAnimation

Animates the Scale of the target to make the element appear larger or smaller than it normally would.

| Property | Type | Description |
| --- | --- | --- |
| Scale | double | The delta amount that the target should be scaled by. |

```xaml
<Rock:RelScaleToAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Scale="0.8" />
```

## RotateToAnimation

Animates the Rotation of the target to spin the element to the specified final rotation value. This rotation happens along the Z-axis, meaning it does not distort the element's perspective at all.

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The absolute angle that the target should be rotated to. |

```xaml
<Rock:RotateToAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Rotation="180" />
```

## RotateXToAnimation

Animates the RotationX of the target to shift the perspective of the element.

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The absolute angle that the target should be rotated to. |

```xaml
<Rock:RotateXToAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Rotation="90" />
```

## RotateYToAnimation

Animates the RotationY of the target to shift the perspective of the element.

| Property | Type | Description |
| --- | --- | --- |
| Rotation | double | The absolute angle that the target should be rotated to. |

```xaml
<Rock:RotateYToAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Rotation="90" />
```

## ScaleToAnimation

Animates the Scale of the target to make the element appear larger or smaller than it normally would.

Important

  This animation ignores the RepeatForever property.  

| Property | Type | Description |
| --- | --- | --- |
| Scale | double | The absolute value that the target should be scaled to, a value of 1 means normal scale. |

```xaml
<Rock:ScaleToAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" Scale="1.2" />
```

## ShakeAnimation

Animates the TranslationX target to make it appear as if it were being shaken back and forth.

Important

  This animation ignores the Easing property.  

```xaml
<Rock:ShakeAnimation x:Key="Demo" Target="{x:Reference myLabel}" Duration="2000" />
```

## ThicknessAnimation

Animates the specified property of the target, which must be of type Thickness, between two values.

| Property | Type | Description |
| --- | --- | --- |
| From | Thickness | The value that the property will be transitioned from. If not set then the current property value is used. |
| Property | string | The name of the property to be animated. |
| To | Thickness | The value that the property will be transitioned to. |

```xaml
<Rock:ThicknessAnimation x:Key="Demo" Target="{x:Reference myLabel}" Property="Margin" Duration="2000" To="15" />
```

## TranslateToAnimation

Animates the `TranslationX` and `TranslationY` properties of the target to shift the element around from its normal position.

| Property | Type | Description |
| --- | --- | --- |
| TranslateX | double | The value that the element should be shifted to on the x-axis. |
| TranslateY | double | The value that the element should be shifted to on the y-axis. |

```xaml
<Rock:TranslateToAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000"
    TranslateX="30"
    TranslateY="-15" />
```

## TurnstileInAnimation

Animates the `RotationY` and `Opacity` properties of the target to give a turnstile effect to the element appearing on the screen.

Important

  This animation ignores the Easing property.  

```xaml
<Rock:TurnstileInAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## TurnstileOutAnimation

Animates the `RotationY` and `Opacity` properties of the target to give a turnstile effect to the element disappearing from the screen.

Important

  This animation ignores the Easing property.  

```xaml
<Rock:TurnstileOutAnimation x:Key="Demo"
    Target="{x:Reference myLabel}"
    Duration="2000" />
```

## GroupAnimation

This special animation does not conform to the common properties mentioned previously. This element lets you group animations so that they can be triggered at the same time. Animations to be grouped together can be added as child elements.

Note

When targeting the same element with multiple animations, they'll be played sequentially from top to bottom. The next animation will not start until the previous one has finished.

```xaml
<Rock:GroupAnimation x:Key="FadeOut">
    <Rock:FadeToAnimation Target="{x:Reference myLabel}"
        Duration="2000"
        Opacity="0" />
    <Rock:FadeToAnimation Target="{x:Reference myButton}"
        Duration="2000"
        Opacity="0" />
</Rock:GroupAnimation>
```

## Passive Animations

A passive animation is one that is always active and updates continuously whenever the property it uses to track progress changes. One example usage of this might be a slider that is used to specify the color of something. As the slider moves from one side to the other, the color slowly changes from one color to the other.

All of the animations in this section support the following properties.

| Property | Type | Description |
| --- | --- | --- |
| Property | string | The name of the property to be animated. |
| Progress | double | The current value being tracked. |
| Minimum | double | The minimum value to clamp Progress to. *Defaults to* *0**.* |
| Maximum | double | The maximum value to clamp Progress to. *Defaults to* *100**.* |
| Easing | EasingType | The easing to use when calculating the animation curve: BounceIn, BounceOut, CubicIn, CubicInOut, CubicOut, Linear, SinIn, SinInOut, SinOut, SprintIn, SpringOut. *Defaults to* *Linear**.* |

## AnimateProgressColor

Animates the Color-type property between the `From` and `To` values.

| Property | Type | Description |
| --- | --- | --- |
| From | Color | The value to use when Progress is less than or equal to Minimum.   |
| To | Color | The value to use when Progress is greater than or equal to Maximum.   |

```xaml
<StackLayout>
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
</StackLayout>
```

## AnimateProgressCornerRadius

Animates the CornerRadius-type property between the `From` and `To` values.

| Property | Type | Description |
| --- | --- | --- |
| From | CornerRadius | The value to use when Progress is less than or equal to Minimum.   |
| To | CornerRadius | The value to use when Progress is greater than or equal to Maximum.   |

```xaml
<StackLayout>
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
</StackLayout>
```

## AnimateProgressDouble

Animates the double-type property between the `From` and `To` values.

| Property | Type | Description |
| --- | --- | --- |
| From | double | The value to use when Progress is less than or equal to Minimum.   |
| To | double | The value to use when Progress is greater than or equal to Maximum.   |

```xaml
<StackLayout>
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
</StackLayout>
```

## AnimateProgressInt

Animates the int-type property between the `From` and `To` values.

| Property | Type | Description |
| --- | --- | --- |
| From | int | The value to use when Progress is less than or equal to Minimum. |
| To | int | The value to use when Progress is greater than or equal to Maximum. |
| Property | Type | Description |

```xaml
<StackLayout>
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
</StackLayout>
```

## AnimateProgressThickness

Animates the Thickness-type property between the `From` and `To` values.

| Property | Type | Description |
| --- | --- | --- |
| From | int | The value to use when Progress is less than or equal to Minimum.   |
| To | int | The value to use when Progress is greater than or equal to Maximum.   |

```xaml
<StackLayout>
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
</StackLayout>
```

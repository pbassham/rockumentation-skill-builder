> **Path:** Mobile Docs > 🧱 Essentials > Controls > Behaviors > Touch Behavior

# Touch Behavior

Polish your views to react to different types of gestures (in place of a non-animated TapGesture)

M v7.0

*Inherits from* [*TouchBehavior*](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/maui/behaviors/touch-behavior?tabs=toucheffect-xaml%2Ctouchbehavior-xaml)

The TouchBehavior allows you to add touch interaction to any VisualElement. It lets you customize visual properties like `BackgroundColor`, `Opacity`, `Rotation`, `Scale`, and more when the element is touched.

**Examples**

```
<HorizontalStackLayout HorizontalOptions="Center" VerticalOptions="Center">
    <HorizontalStackLayout.Behaviors>
        <Rock:TouchBehavior
            DefaultAnimationDuration="250"
            DefaultAnimationEasing="{x:Static Easing.CubicInOut}"
            PressedOpacity="0.6"
            PressedScale="0.8" />
    </HorizontalStackLayout.Behaviors>

    <ContentView
        HeightRequest="100"
        WidthRequest="10"
        BackgroundColor="Gold" />
        
    <Label Text="The entire layout receives touches" 
        VerticalOptions="Center" 
        LineBreakMode="TailTruncation"/>
    <ContentView
        HeightRequest="100"
        WidthRequest="10"
        BackgroundColor="Gold" />
</HorizontalStackLayout>
```

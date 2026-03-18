> **Path:** Mobile Docs > 🧱 Essentials > Controls > Effects > Blur Effect

# Blur Effect

M v4.0

You may have noticed the setting to adjust the [Navigation Bar Transparency and Blur (iOS)](https://community.rockrms.com/developer/mobile-docs/styling/style-guide/shell-components#navigation-bar-transparency-and-blur-ios-), but why stop there? You can apply the same effects to almost any iOS visual element (cards, StackLayout, etc).

The effect can be applied to almost any visual element:

```
<Rock:ContainedCard HeightRequest="300"
    BackgroundColor="Transparent"
    HasShadow="False">
    <Label TextColor="White"
        Text="Ultra Thin Blurred Card" />
    <Rock:ContainedCard.Effects>
        <Rock:BlurEffect BlurStyle="UltraThin" />
    </Rock:ContainedCard.Effects>
</Rock:ContainedCard>
```

Important

If a control provides a default background color, you must specify a background color of transparent. It's also recommended to remove all shadow effects.

![](https://community.rockrms.com/GetImage.ashx?Id=67186)

The Blur Effect has many great uses and interestingly enough can be used in more places than one might imagine.

```
<Grid VerticalOptions="FillAndExpand">
    <StackLayout VerticalOptions="FillAndExpand">
        <Rock:Image Source="https://server.com/photo.jpg" />
    </StackLayout>
    
    <ContentView VerticalOptions="Start">
        <ContentView.Effects>
            <Rock:BlurEffect BlurStyle="UltraThin" />
            
            <Rock:SafeAreaPaddingEffect Edges="Top" />
        </ContentView.Effects>
    </ContentView>
</Grid>
```

Above was a demonstration of how the Blur Effect can exclusively utilize the space defined by the SafeAreaPadding, even when there is no content within the visual element.

### Properties

The following properties are available to the effect.

| Property | Type | Description |
| --- | --- | --- |
| BlurStyle | IOSBlurStyle | What type of blur style would you like to be applied? |

### Blur Style

The blur style property is an enum, with the following accepted values:

-   Light
-   Dark
-   Thin
-   ThinDark
-   UltraThin
-   UltraThinDark
-   Thick
-   ThickDark
-   Chrome
-   ChromeLight
-   ChromeDark
-   System (default)
-   SystemDark
-   ExtraLight
-   ExtraDark

Here's a video that shows most of the blur styles that can apply to a visual element:

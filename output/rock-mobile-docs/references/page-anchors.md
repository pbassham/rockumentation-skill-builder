> **Path:** Mobile Docs > 🧱 Essentials > Tips and Tricks > Page Anchors

# Page Anchors

M v7.0

## Overview

Page Anchors allow navigation directly to specific elements on a new page during page navigation. This feature enhances user experience by allowing deep linking into a specific part of a new page immediately upon navigation.

## Example

```
<Button Text="Anchor scroll"
        Command="{Binding PushPage}"
        StyleClass="btn, btn-primary" 
        CommandParameter="5f4ef280-d58f-4c32-904d-49ef5e9904d7?PersonId=1#test" />
```

This example includes:

-   A page GUID: `5f4ef280-d58f-4c32-904d-49ef5e9904d7`
-   A query parameter: `PersonId=1`
-   An anchor fragment: `#test`

Upon navigation, the page will automatically scroll to the element named test.

### Defining Anchor Targets

To define a scrollable target on your page, set the x:Name attribute on the element you want to anchor to.

Example:

```
<ScrollView>
    <StackLayout>
        <ContentView Grid.Row="0" BackgroundColor="Red" HeightRequest="200"/>
        <ContentView Grid.Row="1" BackgroundColor="Green" HeightRequest="200"/>
        <ContentView Grid.Row="2" BackgroundColor="Blue" HeightRequest="200"/>
        <ContentView x:Name="test" Grid.Row="3" BackgroundColor="Black" HeightRequest="200"/>
        <ContentView Grid.Row="4" BackgroundColor="Purple" HeightRequest="200"/>
        <ContentView Grid.Row="5" BackgroundColor="White" HeightRequest="200"/>
        <ContentView Grid.Row="6" BackgroundColor="Orange" HeightRequest="200"/>
        <ContentView Grid.Row="7" BackgroundColor="Yellow" HeightRequest="200"/>
    </StackLayout>
</ScrollView>
```

In this example, the element named test will be the target for the anchor scroll.

## Advanced Example

You can specify anchor scrolling options using PushPageParameters and AnchorScrollParameters.

```
<Button Text="Anchor Scroll Options"
        Command="{Binding PushPage}"
        StyleClass="btn, btn-primary">
        <Button.CommandParameter>
            <Rock:PushPageParameters PageGuid="5f4ef280-d58f-4c32-904d-49ef5e9904d7" >
                 <Rock:PushPageParameters.AnchorOptions>
                    <Rock:AnchorScrollParameters AnchorId="test" Position="Center" />
                </Rock:PushPageParameters.AnchorOptions>
                <Rock:Parameter Name="PersonId" Value="562sWgf" />
            </Rock:PushPageParameters>
        </Button.CommandParameter>
</Button>
```

### AnchorScrollParameters Property

| Property | Type | Description |
| --- | --- | --- |
| AnchorId | string | The name assigned to the scrollable target. |
| Animated | bool | Specifies whether the scroll should be animated. |
| Delay | int | The number of seconds to delay before scrolling to the target. |
| Position | string | The final position of the target after scrolling. |

### Position Options:

-   Start - Scroll so the element aligns to the start (top) of the screen.
-   Center - Scroll so the element aligns to the center of the screen.
-   End - Scroll so the element aligns to the end (bottom) of the screen.

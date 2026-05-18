---
description: Use when implementing deep linking or navigation that scrolls to specific page elements using anchor fragments or AnchorScrollParameters
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

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

- A page GUID: `5f4ef280-d58f-4c32-904d-49ef5e9904d7`
- A query parameter: `PersonId=1`
- An anchor fragment: `#test`

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

- Start - Scroll so the element aligns to the start (top) of the screen.
- Center - Scroll so the element aligns to the center of the screen.
- End - Scroll so the element aligns to the end (bottom) of the screen.

---

## Troubleshooting {#troubleshooting}

Troubleshooting an issue in Rock Mobile can be a bit tricky since you don't have an inspector or a way to debug. Sometimes the error message won't be particularly helpful either. We'll include some common issues here and potential solutions to try, as well as some best practices.

Note

If there's no error message shown and the page is blank, that could indicate an issue with the Layout XAML. It's generally good practice to keep your Layout(s) simple.

## RockError #1000

"You appear to be disconnected from the internet."

This is most common when connected to Wi-Fi and the network goes down.

## RockError #1001

![](https://community.rockrms.com/GetImage.ashx?Id=67219)

This connection error is shown on app startup if the shell is unable to connect to the Rock server. The most common cause of this issue would be the Rock server itself going down.

Another issue that might arise is if your Public Application Root global attribute value is incorrect. This URL is used to reference resources the shell needs, so when it can't find them, you'll see this.

Note

Note that the shell cannot connect to localhost without additional tooling like [ngrok](https://ngrok.com/) or something that can expose Rock to the web.  

If you're only seeing an issue on Android, there may be a problem with the SSL certificate. Check out [this comment](https://chat.rockrms.com/channel/mobile?msg=iB9GxBDCavo6L6B9w) from RocketChat for more details.

## XAML Errors

### One of the identified items was in an invalid format.

Sometimes shown when a property has an invalid value, for example a Grid's `RowDefinitions`.

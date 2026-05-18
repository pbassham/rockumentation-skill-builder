---
description: "Use when building mobile UI components that display images with customization options like aspect ratios, placeholders, blur effects, and tap handlers"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M v1.0

*Inherits from Xamarin.Forms.ContentView*

Note

If you'd like to show an animated GIF, use the default [Image](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/image#load-animated-gifs) control instead.

One of the most common controls you'll want to use is the Image control. Because of its importance, effort has been invested into ensuring that it has all the power you need. Let's start with the basics.

```
<Rock:Image Source="https://server.com/photo.jpg" />
```

Is that it? No, we're just getting started. Below are all of the properties you can add to images.

![](https://community.rockrms.com/GetImage.ashx?Id=67127)

### Basic Image

#### Properties

| Property | Type | Description |
| --- | --- | --- |
| Aspect | Aspect | Determines how the image will fill the space allotted. Valid values are:   **AspectFill** \- Fill the space with the image, some parts of the image may be cropped.   **AspectFit** \- Scale the image to fit the space, may leave space empty.   **Fill** \- Scale to exactly fill the space, may warp the image. |
| BackgroudColor | Color | The color to use for the background. Useful as a placeholder while the image downloads. |
| Command | ICommand | The command to execute when the user taps the image. |
| CommandParameter | object | Parameters to pass to the command. |
| ErrorPlaceholder | string | URL of the fallback image if loading fails. |
| HeightRequest | int | Desired image height. |
| WidthRequest | int | Desired image width. |
| HorizontalOptions | [LayoutOption](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layoutoptions) | Layout within parent horizontally (e.g., Center, FillAndExpand). |
| LoadingPlaceholder | string | URL of a loading image placeholder. |
| Ratio | string | Format is width:height (e.g., '16:9'). When Aspect is set to AspectFill, this acts as a minimum ratio request. |
| Source | string | URL of the image. |
| VerticalOptions | [LayoutOption](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layoutoptions) | Layout within parent vertically. |
| Margin | Thickness | Use format Margin="Left,Top,Right,Bottom". |

Done now? Nope, still have much more to consider.

### Image Transformations

You can apply several different transformations to your images. Each is discussed below.

#### Blur

You can easily add a blur to your image with this simple transformation.

Warning

Blurring is a very CPU-intensive operation. The higher the radius value the more intensive this becomes. Use caution to not over blur something dynamically when you can instead replace it with a statically blurred image. Android devices have been known to crash with radius values over 15 or so.

| Property | Type | Description |
| --- | --- | --- |
| Radius | Float | The amount of blur to add. |

```
<Rock:Image Source="https://server.com/photo.jpg" >
    <Rock:BlurTransformation Radius="4" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67128)

#### Circle

The circle transformation masks your images into a circle shape. The syntax for this is below.

| Property | Type | Description |
| --- | --- | --- |
| BorderSize | int | The size of the optional border around the image. |
| BorderColor | Color | The color of the border around the image. |

![](https://community.rockrms.com/GetImage.ashx?Id=67129)

```
<Rock:Image
    Source="https://server.com/photo.jpg"
    BackgroundColor="#c4c4c4"
    HeightRequest="128"
    WidthRequest="128"
    Aspect="AspectFill"
    HorizontalOptions="Center"
    VerticalOptions="Fill">
    <Rock:CircleTransformation BorderSize="4"
        BorderColor="rgba(255, 255, 255, 0.58)" />
</Rock:Image>
```

#### Drop Shadow

The filter adds a customizable drop shadow to your images.

| Property | Type | Description |
| --- | --- | --- |
| Distance | double | Shadow offset distance. |
| Angle | double | Shadow direction angle. |
| Radius | double | Shadow blur radius. |
| Color | Color | Shadow color. |
| Opacity | double | Shadow opacity. |

Important

When using the drop shadow transformation be sure you do not have a background color. Otherwise, the background color will cover the drop shadow.

```
<Rock:Image
    Source="https://server.com/photo.jpg"
    BackgroundColor="#c4c4c4"
    HeightRequest="300"
    WidthRequest="300"
    Aspect="AspectFill"
    HorizontalOptions="Center"
    VerticalOptions="Fill">
    <Rock:DropShadowTransformation
        Distance="8"
        Angle="135"
        Radius="4"
        Color="#c4c4c4"
        Opacity="0.5" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67130)

#### Fill Color

This fills the image with the selected color. Not sure why you'd ever use this? Well, there's a great usage for this when used with [Masks](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cards/masks) on layered images.

| Property | Type | Description |
| --- | --- | --- |
| Color | Color | The color to fill the image with. |

```
<Rock:Image Source="https://server.com/photo.jpg" >
    <Rock:FillColorTransformation Color="#41BFD0" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67131)

## Flip

Flips the image either horizontally, vertically, or both.

| Property | Type | Description |
| --- | --- | --- |
| Direction | FlipDirection | One of: Horizontal, Vertical, Both |

```
<Rock:Image Source="https://server.com/photo.jpg" >
    <Rock:FlipTransformation Direction="Both" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67133)

#### Grayscale

Converts the image to grayscale.

| Property | Type | Description |
| --- | --- | --- |
| Saturation | double | 1.0 = original, 0.0 = grayscale, -1.0 = invert |

```
<Rock:Image Source="https://server.com/photo.jpg" >
    <Rock:GrayscaleTransformation Saturation="0" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67134)

#### Reflection

Draws a reflection of the image as if the image were sitting on a glass surface.

| Property | Type | Description |
| --- | --- | --- |
| Size | double | Size of the reflection area. |

```
<Rock:Image Source="https://server.com/photo.jpg" >
    <Rock:ReflectionTransformation Size="96" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67135)

#### Rounded

Rounds the corners of the image and optionally adds a border.

| Property | Type | Description |
| --- | --- | --- |
| CorderRadius | CornerRadius | One value or specific for each corner. |
| BorderSize | float | Optional border size. |
| BorderColor | Color | Border color. |

```
<Rock:Image Source="https://server.com/photo.jpg" >
    <Rock:RoundedTransformation CornerRadius="120, 0, 0, 120"
        BorderSize="4"
        BorderColor="rgba(255, 255, 255, 0.58)" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67136)

#### Tint

Tints the image using the provided color.

| Property | Type | Description |
| --- | --- | --- |
| Color | Color | Tint color applied to mid-tones of the image. |

```
<Rock:Image Source="https://server.com/photo.jpg" >
    <Rock:TintTransformation Color="#41BFD0" />
</Rock:Image>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67137)

Keep in mind you can use more than one transformation on a single image.

Now are we done? Not quite, what's the rush?

### Layering Images

Want to go to the next level with your images? Layer them!

```
<Grid>
    <!-- Bottom image -->
    <Rock:Image Source="https://server.com/photo.jpg"
        Aspect="Fill"
        HeightRequest="360"
        HorizontalOptions="FillAndExpand">
        <Rock:TintTransformation Color="#53AFBE" />
    </Rock:Image>

    <!-- Top mask -->
    <Rock:Image Source="resource://Rock.Mobile.Resources.Masks.vignette.png"
         Aspect="Fill"
         HeightRequest="360"
         HorizontalOptions="FillAndExpand">
         <Rock:FillColorTransformation Color="#53AFBE" />
     </Rock:Image>
</Grid>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67138)

To make this, simply stack the original mountain under one of our built-in [Masks](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cards/masks). Note how the mask is just a PNG with an alpha channel. Notice how the mask is black. Applying a [Fill Color](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls) transformation allows us to match the tint we added to the mountain photo producing a nice color vignette effect.  

![](https://community.rockrms.com/GetImage.ashx?Id=67139)

### Styling

#### Ratio vs. HeightRequest

While `HeightRequest` can be used to size images, using `Ratio` is preferred.

```
<Rock:Image Source="https://server.com/photo.jpg" Ratio="16:9" />
```

---

## Interaction {#interaction}

Mv1.0

*Inherits from [ContentView](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.contentview?)*

Whenever someone views a page in the mobile app, a page view [interaction](https://community.rockrms.com/Rock/BookContent/9#interactions) is automatically logged on the server. These interactions are typically queued and sent in bulk every minute or so.

But sometimes, you might want to log a custom interaction based on what the user did on the page—for example, tracking when they view a specific blog article. And yes, we know content channels now offer built-in ways to handle that too.

Anyway, this control doesn’t take up any space and offers a simple way to log a custom interaction. Just provide the `Operation`, `Summary`, and `ChannelId`, along with either a `ComponentId` or `ComponentName`. Everything else is optional.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ChannelId | int | The identifier of the channel where this interaction will be recorded. Must already exist. |
| ComponentId | int? | Specifies a specific component identifier where this interaction will be recorded. If used, the component must already exist. Defaults to null. |
| ComponentName | string | Specifies a component name for where this interaction will be recorded. If you use this property to pick the component then the system will look for a matching component and if not found create one. |
| Data | string | Custom data that should be stored with the interaction. There is no specific format requirements, as long as the data is a string. |
| EntityId | int? | Associates the interaction with the specified entity. The entity type will be taken from the channel configuration. Defaults to null. |
| Operation | string | The type of operation that identifies this interaction. There is no specific list of strings that you must use, but a few suggestions are View and Watch. |
| Summary | string | The text that describes this event in a user friendly manner. |

```
<Rock:Interaction Operation="Watched video"
    Summary="Watch"
    ChannelId="28"
    ComponentName="{{ video.Name | Escape }}"
    Data="{{ video.Url | Escape }}" />
```

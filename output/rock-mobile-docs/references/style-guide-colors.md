> **Path:** Mobile Docs > 🎨 Styling > Style Guide > Colors

# Colors

Understand color theory in Rock Mobile and learn how to leverage built in colors to build truly responsive and beautiful applications.

Theming is a very important aspect of a mobile application. Nowadays, dark mode responsiveness is built-in to nearly every application. Rock Mobile was able to simplify this process whilst making the design and development of mobile applications much easier.

## Interface Colors

These are the bread and butter of your application. Every single built-in text component has one of these classes applied.

![](https://community.rockrms.com/GetImage.ashx?Id=67083)

Interface colors

The colors you set here are respected in light mode. On dark mode, the colors swap in strength, allowing for a seamless transition of light and dark. For example, take the default interface colors:

![](https://community.rockrms.com/GetImage.ashx?Id=67084)

Interface Colors

This is the light mode representation of the colors. In dark mode, the values will swap:

![](https://community.rockrms.com/GetImage.ashx?Id=67085)

Interface Colors Dark Mode

To better describe the transition, when transitioning from light to dark mode:

-   Medium stays the same
-   The value of strong becomes the value of soft
-   The value of stronger becomes the value of softest
-   The value of strongest becomes the value of softer

Keep in mind, this is all **dynamic**! Meaning this is all extremely easy to utilize. All you need to do is assign an interface color to an object through CSS, and it will automatically become dark mode responsive.

These are useful colors to use around your application.

![](https://community.rockrms.com/GetImage.ashx?Id=67086)

These colors are a little more straightforward. The `Strong` and `Soft` values simply switch when transitioning from light to dark mode (and vice versa).

![](https://community.rockrms.com/GetImage.ashx?Id=67087)

The `Strong` and `Soft` values simply switch when transitioning from light to dark mode (and vice versa).

## Usage

### Supported Colors

The following colors are available to you out of the box.

-   Interface-Strongest
-   Interface-Stronger
-   Interface-Strong
-   Interface-Medium
-   Interface-Soft
-   Interface-Softer
-   Interface-Softest
-   Primary-Strong
-   Primary-Soft
-   Secondary-Strong
-   Secondary-Soft
-   Success-Strong
-   Success-Soft
-   Info-Strong
-   Info-Soft
-   Danger-Strong
-   Danger-Soft
-   Warning-Strong
-   Warning-Soft

The most primary method to utilize application colors are through CSS utility classes. The pattern for these classes is as follows:

| Class | Description |
| --- | --- |
| bg-{color} | Sets the background of the element.  
 |
| text-{color} | Sets the text color of the element. |
| border-{color} | Sets the border color of the element. |

For example:

```
//- A frame with the "softest" background and a "soft" border.
<Rock:StyledBorder 
    StyleClass="bg-interface-softest, border, border-interface-soft"
    Padding="16">
    
    //- A label with the "stronger" text color.
    <Label Text="{{ CurrentPerson.FullName }}"
        StyleClass="text-interface-strong" />
</Rock:StyledBorder>
```

Important

Using this method for applying colors causes the colors to not automatically respond to light/dark mode changes.

You can access these color variables in your application styles by using the `?color-{value}` syntax.

For example:

```
.my-card {
  padding: 16;
  background-color: ?color-interface-softest;
}

.my-header-label {
  text-color: ?color-interface-stronger;
}
```

Important

Using this method for applying colors causes the colors to not automatically respond to light/dark mode changes.

Palette colors can be used with XAML properties of type `Color` using the following syntax.

```
<Rock:Tag Text="Custom Palette Color" 
  BackgroundColor="{Rock:PaletteColor App-Primary-Soft}"
  TextColor="{Rock:PaletteColor Interface-Stronger}" />
```

Note

Interface colors don't need the "App-" prefix.

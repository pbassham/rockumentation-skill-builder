---
description: "Use when styling buttons in Rock Mobile with different colors, sizes, outline styles, and alignment options"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

## Default Buttons

The following utility classes have been created for use with buttons. You'll find this works very similar to that of Bootstrap.

![](https://community.rockrms.com/GetImage.ashx?Id=67108)

```
<Button Text="Primary" StyleClass="btn,btn-primary" />
<Button Text="Success" StyleClass="btn,btn-success" />
<Button Text="Info" StyleClass="btn,btn-info" />
<Button Text="Warning" StyleClass="btn,btn-warning" />
<Button Text="Danger" StyleClass="btn,btn-danger" />
<Button Text="Dark" StyleClass="btn,btn-dark" />
<Button Text="Light" StyleClass="btn,btn-light" />
<Button Text="Link" StyleClass="btn,btn-link" />
```

## Outline Buttons

You can create outline buttons with the following markup.

![](https://community.rockrms.com/GetImage.ashx?Id=67116)

```
<Button Text="Primary" StyleClass="btn,btn-outline-primary" />
<Button Text="Success" StyleClass="btn,btn-outline-success" />
<Button Text="Info" StyleClass="btn,btn-outline-info" />
<Button Text="Warning" StyleClass="btn,btn-outline-warning" />
<Button Text="Danger" StyleClass="btn,btn-outline-danger" />
<Button Text="Dark" StyleClass="btn,btn-outline-dark" />
<Button Text="Light" StyleClass="btn,btn-outline-light" />
```

## Button Sizes

You can also control the sizes of your buttons with these classes.

![](https://community.rockrms.com/GetImage.ashx?Id=67115)

```
<Button Text="Primary" StyleClass="btn,btn-primary,btn-lg" />
<Button Text="Success" StyleClass="btn,btn-primary" />
<Button Text="Info" StyleClass="btn,btn-primary,btn-sm" />
```

## Inline Buttons

By default buttons are blocks (they take the full width). You can make them inline by using the example code below.

### Centered

![](https://community.rockrms.com/GetImage.ashx?Id=67112)

```
<Button Text="Centered Justified"
        StyleClass="btn, btn-primary" HorizontalOptions="Center" />
```

### Left

![](https://community.rockrms.com/GetImage.ashx?Id=67113)

```
<Button Text="Left Justified"
        StyleClass="btn, btn-primary" HorizontalOptions="Start" />
```

### Right

![](https://community.rockrms.com/GetImage.ashx?Id=67114)

```
<Button Text="Right Justified"
        StyleClass="btn, btn-primary" HorizontalOptions="End" />
```

---

## Form Fields {#styling-components-form-fields}

*Below is a CSS X-Ray of different ways to style your form fields.*

![](https://community.rockrms.com/GetImage.ashx?Id=67117)

---

## Modals {#modals}

Modals are made from Popup pages. Below is a breakdown of the various CSS classes that make up a modal.

![](https://community.rockrms.com/GetImage.ashx?Id=67118)

### Styling the Backdrop

You can change the color of the modal backdrop with the CSS below:

```
^popuppage {
    -rock-modal-backdrop-color: #80000000;
}
```

The color value `#80000000` will set the backdrop color to black with a 50% alpha transparency.

Here is a cheat sheet of various alpha to [Hex Colors](https://community.rockrms.com/developer/mobile-docs/styling/legacy/colors#hex-colors).

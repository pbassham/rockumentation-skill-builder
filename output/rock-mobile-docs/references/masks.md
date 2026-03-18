> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Cards > Masks

# Masks

*Transparent gradient images to overlay on images for a beautiful design.*

The goal of any content strategy should be extensibility. In order to achieve rich designs, you need images that are crafted for each medium and use case. You probably don't want to spend time having to create different variations of each image though. To assist with that, we've designed a powerful masking system that can be used with images and cards, reducing the number of custom images needed in your mobile applications.

These image masks can be referenced directly within the `Source` of an Image, or you can apply them automatically inside the card components. For [Block Card](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cards/block-card) and [Contained Card](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cards/contained-card), the mask is placed on the image, while the mask for [Inline Card](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cards/inline-card) is placed over the entire card. This makes sense as the image on an Inline card takes up the full background.

| Use | Description | Property Name (Block and Contained) | Property Name (Inline) |
| --- | --- | --- | --- |
| Mask | This is the location of the mask image. You can either provided your own via a URL or take advantage of the masks that our built into the application (recommended) | ImageMask | CardMask |
| Opacity | The opacity of the mask. | ImageMaskOpactity | CardMaskOpacity |
| Color | The color to overlay the mask. | ImageMaskColor | CardMaskColor |

### Built-In Masks

While you can provide your own masks via a URL, you can save load time and bandwidth by using one of the built-in masks. These are highlighted below.

These masks give you several different options to start from. Using image transformations like Fill Color Flip, and Tint will provide additional customize to achieve your desired look. Learn more about [Layering Images](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls) to design beautiful cards and graphics in your apps!

When applying masks to cards, you can also append `-Flip` to the end of the mask name to flip the mask 180 degrees. For example, if you wanted a light fade flipped use `Fade-Light-Flip`.

![](https://community.rockrms.com/GetImage.ashx?Id=67025)

[Fade-Thin](resource://Rock.Mobile.Resources.Masks.fade-thin.png)

![](https://community.rockrms.com/GetImage.ashx?Id=67024)

[Fade-Light](resource://Rock.Mobile.Resources.Masks.fade-light.png)

![](https://community.rockrms.com/GetImage.ashx?Id=67023)

[Fade-Medium](resource://Rock.Mobile.Resources.Masks.fade-medium.png)

![](https://community.rockrms.com/GetImage.ashx?Id=67022)

[Fade-Dark](resource://Rock.Mobile.Resources.Masks.fade-dark.png)

![](https://community.rockrms.com/GetImage.ashx?Id=67021)

[Midline](resource://Rock.Mobile.Resources.Masks.midline.png)

![](https://community.rockrms.com/GetImage.ashx?Id=67020)

[Vignette](resource://Rock.Mobile.Resources.Masks.vignette.png)

![](https://community.rockrms.com/GetImage.ashx?Id=67019)

[Top-Bottom](resource://Rock.Mobile.Resources.Masks.top-bottom.png)

### Designing With Masks

As you set out to design with masks, keep in mind that the best designs will be a recipe that incorporates the properties of the card, image, and mask. Take for example the design below. The effect of the card comes from the card's background, the effects on the image as well as the mask.

![](https://community.rockrms.com/GetImage.ashx?Id=67018)

```
<Rock:InlineCard CardRatio="4:3"
    Title="Enjoy the Views"
    HeaderLocation="Center"
    ContentLocation="Bottom"
    Tagline="DESTINATIONS"
    Image="https://yourserver.com/image-grandtetonfence.jpg"
    ImageSaturation="0"
    ImageOpacity=".4"
    BackgroundColor="#6bac43"
    BackgroundMask="Midline"
    BackgroundMaskColor="#6bac43"
    BackgroundMaskOpacity=".6">
    Bring to the table win-win survival strategies... 
</Rock:InlineCard>
```

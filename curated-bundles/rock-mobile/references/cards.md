---
description: "Use when building card-based UI layouts in Rock mobile with Contained, Block, or Inline card components"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Cards are an essential piece of UI that serve as an entry point to additional information. As you'll see they are very extensible and allow you to quickly achieve remarkable results.

### Card Types

There are three types of cards for you to choose from. While they share many of the same elements that each have a different design style.

### Contained Card

The contained card is the classic design that keeps all of the content inside of a frame. There's plenty of options to adjust both the frame and content.

![](https://community.rockrms.com/GetImage.ashx?Id=67011)

```
<Rock:ContainedCard 
    Tagline="DESTINATIONS"
    Title="Start Your Adventure"
    Image="https://yourserver.com/image-grandtetonfence.jpg">
        Bring to the table win-win survival strategies to ensure...
</Rock:ContainedCard>
```

### Block Card

The block card is very similar to the Contained Card but the content is not in a clearly visible frame.

![](https://community.rockrms.com/GetImage.ashx?Id=67012)

```
<Rock:BlockCard 
    Tagline="DESTINATIONS"
    Title="Start Your Adventure"
    Image="https://yourserver.com/image-grandtetonpeak.jpg">
    Bring to the table win-win survival strategies... 
</Rock:BlockCard>
```

### Inline Card

The Inline Card places the image behind the content and provides several options to create striking designs.

![](https://community.rockrms.com/GetImage.ashx?Id=67013)

```
<Rock:InlineCard 
    Title="Start Your Adventure"
    HeaderLocation="Top"
    ContentLocation="Bottom"
    Tagline="DESTINATIONS"
    Image="https://yourserver.com/image-grandtetonfence.jpg">
    Bring to the table win-win survival strategies to ensure...
</Rock:InlineCard>
```

---

## Block Card {#block-card}

The block card is very similar to the Contained Card but the content is not in a clearly visible frame.

*Inherits from* *[StyledView](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view)* *\>* [*PancakeView*](https://github.com/sthewissen/Xamarin.Forms.PancakeView)

![](https://community.rockrms.com/GetImage.ashx?Id=67014)

### Properties

| Property | Type | Description |
| --- | --- | --- |
| AdditionalContent | object | The text or controls to add to the content of the card. If text is provided it will be converted to paragraphs based on line breaks. |
| BorderThickness | float | The thickness of the border. |
| BorderColor | Color | The color of the border. |
| Command | ICommand | The command to use when the card is clicked. |
| CommandParameter | object | The parameters to set to the command when clicked. |
| DescriptionLeft | object | The text or controls to place in the left description. |
| DescriptionRight | object | The text or controls to place in the right description. |
| Elevation | int | The Material Design elevation desired. |
| HasShadow | bool | Determines if a shadow should be shown behind the card. |
| Image | string | The URL of the image. |
| ImageLocation | VerticalAlignment | Determines where the image should be placed on the card. (Top, Bottom) |
| ImageMask | string | The URL or name of the image to use for the mask. |
| ImageMaskColor | Color | The color to use to tint the mask. |
| ImageMaskOpacity | double | The opacity to use on the mask. |
| ImageOpactity | double | The opacity of the image. |
| ImageRatio | string | Determines the size of the image based on the width of the parent container. The format is height:width with a default of 2.1:4. |
| ImageSaturation | double | The saturation of the image. |
| Tag | string | The text for the card's tag. |
| TagBackgroundColor | Color | The background color of the tag. |
| TagTextColor | Color | The text color of the tag. |
| Tagline | string | The text to display for the tag line. |
| TaglineJustification | HorizontalAlignment | The text alignment for the tagline. (Left, Right, Center) |
| Title | string | The text to display for the title. |
| TitleMaxLines | int | The maximum number of lines the title can be (default 2). |
| TitleJustification | HorizontalAlignment | The text alignment for the title (Left, Right, Center) |

---

## Contained Card {#contained-card}

The contained card is the classic design that keeps all of the content inside of a frame. There's plenty of options to adjust both the frame and content.

*Inherits from* [*StyledView*](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view) *\>* [*PancakeView*](https://github.com/sthewissen/Xamarin.Forms.PancakeView)

![](https://community.rockrms.com/GetImage.ashx?Id=67015)

### Properties

| Property | Type | Description |
| --- | --- | --- |
| AdditionalContent | object | The text or controls to add to the content of the card. If text is provided it will be converted to paragraphs based on line breaks. |
| BorderThickness | float | The thickness of the border. |
| BorderColor | Color | The color of the border. |
| Command | ICommand | The command to use when the card is clicked. |
| CommandParameter | object | The parameters to set to the command when clicked. |
| DescriptionLeft | object | The text or controls to place in the left description. |
| DescriptionRight | object | The text or controls to place in the right description. |
| Elevation | int | The Material Design elevation desired. |
| HasShadow | bool | Determines if a shadow should be shown behind the card. |
| Image | string | The URL of the image. |
| ImageLocation | VerticalAlignment | Determines where the image should be placed on the card. (Top, Bottom) |
| ImageMask | string | The URL or name of the image to use for the mask. |
| ImageMaskColor | Color | The color to use to tint the mask. |
| ImageMaskOpacity | double | The opacity to use on the mask. |
| ImageOpactity | double | The opacity of the image. |
| ImageRatio | string | Determines the size of the image based on the width of the parent container. The format is height:width with a default of 2.1:4. |
| ImageSaturation | double | The saturation of the image. |
| Tag | string | The text for the card's tag. |
| TagBackgroundColor | Color | The background color of the tag. |
| TagTextColor | Color | The text color of the tag. |
| Tagline | string | The text to display for the tag line. |
| TaglineJustification | HorizontalAlignment | The text alignment for the tagline. (Left, Right, Center) |
| Title | string | The text to display for the title. |
| TitleMaxLines | int | The maximum number of lines the title can be (default 2). |
| TitleJustification | HorizontalAlignment | The text alignment for the title (Left, Right, Center) |

---

## Inline Card {#inline-card}

The Inline Card places the image behind the content and provides several options to create striking designs.

*Inherits from* *[StyledView](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view)* *\>* [*PancakeView*](https://github.com/sthewissen/Xamarin.Forms.PancakeView)

![](https://community.rockrms.com/GetImage.ashx?Id=67016)

### Properties

| Property | Type | Description |
| --- | --- | --- |
| AdditionalContent | object | The text or controls to add to the content of the card. If text is provided it will be converted to paragraphs based on line breaks. |
| BackgroundMask | string | The URL or name of the image to use for the mask. |
| BackgroundMaskColor | double | The color to use to tint the mask. |
| BackgroundMaskOpacity | double | The opacity to use for the mask. |
| BorderThickness | float | The thickness of the border. |
| BorderColor | Color | The color of the border. |
| CardRatio | string | Determines the size of the image based on the width of the parent container. The format is height:width with a default of 4:3. |
| Command | ICommand | The command to use when the card is clicked. |
| CommandParameter | object | The parameters to set to the command when clicked. |
| DescriptionLeft | object | The text or controls to place in the left description. |
| DescriptionRight | object | The text or controls to place in the right description. |
| Elevation | int | The Material Design elevation desired. |
| HasShadow | bool | Determines if a shadow should be shown behind the card. |
| Image | string | The URL of the image. |
| ImageLocation | VerticalAlignment | Determines where the image should be placed on the card. (Top, Bottom) |
| ImageOpactity | double | The opacity of the image. |
| ImageSaturation | double | The saturation of the image. |
| Tag | string | The text for the card's tag. |
| TagBackgroundColor | Color | The background color of the tag. |
| TagTextColor | Color | The text color of the tag. |
| Tagline | string | The text to display for the tag line. |
| TaglineJustification | HorizontalAlignment | The text alignment for the tagline. (Left, Right, Center) |
| Title | string | The text to display for the title. |
| TitleMaxLines | int | The maximum number of lines the title can be (default 2). |
| TitleJustification | HorizontalAlignment | The text alignment for the title (Left, Right, Center) |

---

## Elements of a Card {#elements-of-a-card}

Below is a diagram of the various elements that make up a card.

![](https://community.rockrms.com/GetImage.ashx?Id=67017)

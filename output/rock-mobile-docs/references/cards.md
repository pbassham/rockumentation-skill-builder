> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Cards

# Cards

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

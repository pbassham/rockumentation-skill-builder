---
description: "Use when implementing native OS share dialogs to let users share text, URLs, or downloaded files to other apps and services"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile1.0

Using the ShareContent command you can open up the standard OS share dialog that lets the user share a piece of text or a URL to other apps and services.

If the `CommandParameter` is a plain string then it will simply share the text string. Alternatively, you can specify a `ShareContentParameters` object and supply additional options as seen below.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Title | string | The title of the share window. |
| Text | string | A text string to be shared. |
| Uri | string | A URL string to be shared. |
| ShareAsFile   Mobile2.0 | boolean | Indicates that the Uri should be downloaded to the device and then shared as a file so other applications on the device can be used to open the file. |

```
<Button Text="Tap"
    Command="{Binding ShareContent}"
    CommandParameter="Rock ChMS has an app!" />
```
```
<Button Text="Tap"
    Command="{Binding ShareContent}">
    <Button.CommandParameter>
        <Rock:ShareContentParameters Title="Endorse Rock!"
            Text="Rock ChMS has an app!"
            Uri="https://www.rockrms.com/" />
    </Button.CommandParameter>
</Button>
```
```
<Button Text="Tap"
    Command="{Binding ShareContent}">
    <Button.CommandParameter>
        <Rock:ShareContentParameters Title="Check out this movie!"
            Uri="https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg"
            ShareAsFile="true" />
    </Button.CommandParameter>
</Button>
```

## Property UX

Mobile6.0

The sharing experience will change depending on the Title, Text, and Uri provided. Providing only a Title will not work: a Text or Uri value is required. Let's review the options using the sample command here:

```
<Rock:ShareContentParameters Title="What is Rock"
    Text="Learn more about Rock RMS!"
    Uri="https://www.rockrms.com" />
```

These screenshots show the OS share prompt and content received within the Messages app.

**Title + Text**

![](https://community.rockrms.com/GetImage.ashx?Id=66941)

**Title + Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66942)

**Text + Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66943)

**Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66944)

**Title + Text + Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66945)

When sharing content via a URI, it is common for the content to include an image. The image is derived from the metadata of the webpage the URI links to. When using Rock RMS, editing this metadata can be done from within the advanced settings of the desired page.

Click [here](https://ogp.me/) for deeper insight on metadata properties.

```
<meta property="og:url" content="https://rockrms.com/">
<meta property="og:title" content="Rock Mobile">
<meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg">
```

Without this metadata present, no image will be displayed when sharing content.

## Related

- [ShareWithContact](https://community.rockrms.com/developer/mobile-docs/commands/sharewithcontact) shares something with one of the person's contacts.
- [ShareViewImage](https://community.rockrms.com/developer/mobile-docs/commands/shareviewimage) shares an image of a view on the page.
- [CopyToClipboard](https://community.rockrms.com/developer/mobile-docs/commands/copytoclipboard) copies text to the clipboard.

---

## ShareViewImage {#shareviewimage}

Mobile20.0

Turns a view on the page into a PNG image and opens the share sheet so the person can send it to another app. Use it for content that is made to be passed along as a picture, such as a verse card or a sermon quote.

The `CommandParameter` must be a `ShareViewImageParameters` object with its `View` set. Without a view, the command does nothing.

Note

The image is taken from the view exactly as it's displayed, including text and images loaded from the server. The view must be on screen and finished loading when the command runs. If the image can't be created, the person sees a short message instead of the share sheet.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| View | VisualElement | The view to capture, usually set with `{x:Reference}`. Everything inside the view is included in the image and nothing outside it is. Required. |
| Title | string | The title of the share sheet. Optional. |
| FileName | string | The name of the image file. Characters that aren't allowed in file names are removed, and `.png` is added if it's missing. Defaults to `share.png`. |

## Examples

```
<VerticalStackLayout>
    <Border x:Name="VerseCard"
        StyleClass="bg-interface-soft, p-16">
        <Label Text="Be still, and know that I am God."
            StyleClass="title2" />
    </Border>
    <Button Text="Share Verse"
        Command="{Binding ShareViewImage}">
        <Button.CommandParameter>
            <Rock:ShareViewImageParameters View="{x:Reference VerseCard}"
                Title="Share Verse"
                FileName="verse-of-the-day" />
        </Button.CommandParameter>
    </Button>
</VerticalStackLayout>
```

## Related

- [ShareContent](https://community.rockrms.com/developer/mobile-docs/commands/sharecontent) opens the share sheet for text or a link.
- [ShareWithContact](https://community.rockrms.com/developer/mobile-docs/commands/sharewithcontact) shares something with one of the person's contacts.
- [CopyToClipboard](https://community.rockrms.com/developer/mobile-docs/commands/copytoclipboard) copies text to the clipboard.

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > HTML

# HTML

## App Icon Styling

Inherits from [ContentView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/contentview)

This view enables HTML rendering on the page, though HTML support is limited in mobile applications and may impact performance. It's best to use HTML sparingly; you don’t need to avoid it altogether, but rendering numerous paragraphs may reduce responsiveness.

Since you’re defining HTML in an XML file, using `Text="{{ Item.Html }}"` won’t work directly. You’ll need to escape the HTML text or apply the CDATA approach shown below. Alternatively, you can use the [XamlWrap filter](https://community.rockrms.com/lava/filters/other-filters#xamlwrap) in Lava as well.

```
<Rock:Html>
    <![CDATA[
    <p>This is some sample text.</p>
    <p>This is a second paragraph.</p>
    ]]>
</Rock:Html>
```

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text content that contains the HTML. |
| Lava | bool | If true then the Text will be processed for any Lava before final rendering happens. Defaults to false. |
| FollowHyperlinks | bool | If true then any hyperlinks will be underlined and tappable. Must be absolute URLs. Defaults to false. |

Warning

When enabling FollowHyperlinks, the text will be tappable on iOS, however there is a bug in Xamarin Forms (shell v5) that prevents the text from being styled with an underline.

Did you know that formatted content can also be shown with Markdown?

[Markdown](https://mobiledocs.rockrms.com/essentials/controls/content-controls/markdown)

## Supported Tags

A limited subset of HTML tags is supported. Any non-supported tags will be rendered as their plain text contents (meaning, the HTML tags are stripped).

-   `h1 - h6`
-   `div`
-   `p`
-   `a`
-   `br`
-   `span`
-   `strong`
-   `b`
-   `em`
-   `i`
-   `code`
-   `pre`
-   `ol`
-   `ul`
-   `li`

## Styling

You can perform limited styling of rendered HTML content. This only operates at a block level and only with internal classes that are applied. This means you cannot specify your own CSS class in the HTML, nor can you target a specific inline element via CSS (such as a `span` tag).

Note

Note that **bold** and italic styles aren't natively supported for custom fonts added to the shell during the App Factory publishing process. While other font weights can be included, they must be uploaded and referenced as separate font family files. If you need to apply bold or italic formatting, the default font families on iOS and Android provide this support.

-   `<p>` are rendered with the `paragraph` class applied.
-   `<div>` tags are rendered with the `text` class applied.
-   `<pre>` tags are rendered with the `paragraph` class applied and are overridden to use a specific monospace font.
-   `<img>` are rendered with the `image` class applied.
-   Ordered and unordered lists are rendered in a container view. The container has either the `ordered-list` or `unordered-list` class applied. Individual list items are rendered with both the `text` and `list-item` classes applied.

The best way to style these elements would be with a custom `StyleClass` applied like so:

```
<Rock:Html StyleClass="html-content">...</Rock:Html>
```

Then in the custom CSS, target classes you want to change:

```
.html-content .paragraph { margin-bottom: 0; }
```

Important

In general, styling should be kept to basics, such as margins and possibly colors or font selections. The HTML control elements may change in future versions, so avoid applying styles to specific elements unless you're prepared for potential breakage down the line.

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Markdown

# Markdown

M v1.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

Another way that information is often styled in Rock is with something called [Markdown](https://www.markdownguide.org/cheat-sheet). This syntax allows you to indicate that you want things formatted in a certain fashion, but it does not give you the ability to specify exactly how that formatting is done. For example, you can specify that you want a heading, but you don't get to pick exactly how that heading is formatted.

Not everything in the Markdown syntax is supported, for example, tables and footnotes. But most of the basic syntax is supported. As with the [HTML](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/html) component, you will probably want to wrap your content in a `CDATA` tag.

When converting the markdown to XAML the Markdown control will add StyleClasses for you. Headings will get `.heading1-.heading6`, paragraphs will be assigned the `.text` class and links will be assigned the `.link` CSS class.

Note: Links are only clickable at a leaf block level (formatted strings don't support span user interactions). If a leaf block contains more than one link, the user is prompted. This is almost a feature since the text may be too small to be precise enough!

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The markdown text to be displayed. |
| Lava | bool | If true then the Text will be processed for any Lava before final rendering happens. Defaults to **false**. |

### Supported Syntax

| Syntax | Example(s) |
| --- | --- |
| Headings | \# h1 Heading  
\## h2 Heading  
\### h3 Heading  
\#### h4 Heading  
\##### h5 Heading  
\###### h6 Heading |
| Bold | \*\*This is bold text\*\*  
\_\_This is bold text\_\_ |
| Italic | \*This is italic text\*  
\_This is italic text\_ |
| Unordered List | \+ Create a list by starting a line with +, -, or \*  
\+ Sub-lists are made by indenting 2 spaces:  
\- Marker character change forces new list start:      
  \* Ac tristique libero volutpat at      
  + Facilisis in pretium nisl aliquet      
  - Nulla volutpat aliquam velit  
\+ Very easy! |
| Ordered List | 1\. Lorem ipsum dolor sit amet  
2\. Consectetur adipiscing elit  
3\. Integer molestie lorem at massa |
| Inline Code | Inline \`code\` |
| Code Fence | \`\`\`  
Sample code here  
\`\`\` |
| Links | \[link text\](https://www.rockrms.com)  
\[link with title\](https://www.rockrms.com "Visit Rock!") |
| Image | !\[Minion\](https://octodex.github.com/images/stormtroopocat.jpg) |

```
<Rock:Markdown>
    <![CDATA[
    # Heading
    This is some **bold** text.
    ]]>
</Rock:Markdown>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67147)

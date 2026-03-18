> **Path:** Mobile Docs > 🎨 Styling > Legacy > Styling Components > Bible

# Bible

# Bible Reader

The Bible Reader element renders all the child elements in a StackLayout. In many cases we use the standard style class names, so if you need to modify how something looks you should probably constrain it to the [Bible Reader](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/bible-reader) itself, such as `^BibleReader .paragraph`.

## Headings

There are a few different types of headings in the Bible. They all render as a Label with the style class `heading`.

Psalms also has one additional header type that you will encounter. There are 5 "sub-books" in Psalms. These are treated as headings that get an additional style class of psalm-book.

## Sub heading

Subheadings are primarily used in Psalms and Song of Solomon and are rendered as a Label with the style class `subheading`. There are some additional classes that will be applied in certain use cases:

-   **psalm-title** – An introduction to the Psalm, usually giving the author or circumstances of its composition (e.g., Psalm 23)
-   **speaker** – Used only in Song of Solomon. In the printed text, appears centered in small caps.
-   **psalm-acrostic-title** – Only in Psalm 119. Contains the Hebrew letter for that section.
-   textual-note – Appears only before John 8 and Mark 16.

## Block

There are places where one or more verses are supposed to be shown "blocked off" from other verses. In a physical Bible, this is denoted by vertical space before and after the block of verses. In the mobile rendering of the Bible this is handled by an empty ContentView before and after the block of verses. Both of these ContentView's have the style class block.

## Text

Finally there is the normal paragraph text that contains the content of the verses. These are also rendered as Label elements and have the style class text.

## Copyright

The default copyright text is rendered in a [Html](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/html) container and will have the copyright class applied to it. The individual inside will have the paragraph class applied to them.

Note

When using a custom font in the BibleReader, ensure that the following unicode characters are provided: \\x2070, \\x00b9, \\x00b2, \\x00b3, \\x2074, \\x2075, \\x2076, \\x2077, \\x2078, \\x2079.

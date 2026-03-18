> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Tag

# Tag

M v1.0

*Inherits from* [*RockMobile.StyledView*](https://mobiledocs.rockrms.com/essentials/controls#styledview)

Tags are pill-shaped labels that help to mark and categorize content. They usually consist of relevant keywords which make it easier to find and browse the corresponding piece of content. These are not directly correlated with Rock Tags.

![](https://community.rockrms.com/GetImage.ashx?Id=67170)

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text to display on the tag. |
| Type | string | The type (color) of the tag. Primary, Secondary, Success, Info, Warning Danger |
| Size | string | The size of tag to display. Small, Default, Large |
| TextColor | Color | Sets text color using any of the supported formats. |
| BackgroundColor | Color | Sets background color using any of the supported formats. |
| BorderColor | Color | Sets border color using any of the supported formats. |
| BorderThickness | Double | Sets the thickness of the border. This can be a single value or a specific value for Left, Top, Right, Bottom. |

```
<Rock:Tag Text="Articles"
     Type="Primary"
     Size="Default" />
```

## Structure

When styling tags via CSS, it's helpful to understand how this control is built. The Tag contains two underlying controls:

1.  [Styled View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view) – This is the container control
2.  Label– This is the text for the tag

All tags have a `.tag` class attached to them.

If you add a type an additional class with the pattern of `.tag-[typename]` will be applied.

Each size (Small, Default, & Large) will have `.tag-sm`, `.tag-default`, and `.tag-lg` appended.

Note

The corner radius for Tags is calculated automatically by the shell to ensure the rounding is always correct regardless of the content or padding.

To style the text of a tag you'd want to have a style similar to:

```
.tag ^Label {
    color: red;
}
```

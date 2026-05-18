---
description: "Use when handling notches, rounded corners, or safe area padding on mobile screens to keep content visible in safe zones"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mv6.0

Newer phones commonly have areas that are not considered safe for content. For example, a phone with a camera notch has an unsafe area around the notch because your content might not actually display. The same is true of devices with rounded screen corners.

However, sometimes things look strange if you just leave those spots blank. So often what you would do is draw your background in the unsafe area, which can be clipped, and then draw your foreground content in the safe area. So you might put a ContentView in the entire screen with its background color set and then use Padding to inset your actual content from the edges.

This behavior is what lets you make sure your content is displayed in the safe area. It does this by modifying the element it is attached to and setting the Padding property to a value that is safe for the current orientation of the screen.

Note

You may have noticed the mention of "padding" above. Because we are modifying the Padding property, this effect only works on layout type elements.  

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Edges | SafeAreaEdge | The edges that should have padding applied to them. Defaults to "All". |

### Safe Area Edge

| Value | Description |
| --- | --- |
| Left | The left padding edge will be modified so that the child content will be within the safe bounds. |
| Top | The top padding edge will be modified so that the child content will be within the safe bounds. |
| Right | The right padding edge will be modified so that the child content will be within the safe bounds. |
| Bottom | The bottom padding edge will be modified so that the child content will be within the safe bounds. |
| All | All padding edges will be modified so that the child content will be within the safe bounds. |

```
<ContentView>
    <ContentView.Behaviors>
        <Rock:SafeAreaPaddingBehavior Edges="Top" />
    </ContentView.Behaviors>
</ContentView>
```

### Safe Area Padding Effect

Mv2.0

To further align with the MAUI paradigm, the `SafeAreaPaddingEffect` has been migrated to a `SafeAreaPaddingBehavior`.

The effect will still work, but all it does under the hood is add the behavior if it doesn't previously exist.

```
<ContentView BackgroundColor="Blue">
    <ContentView.Effects>
        <Rock:SafeAreaPaddingEffect Edges="Top" />
    </ContentView.Effects>
    <Label Text="This label will vertically be below any unsafe area." />
</ContentView>
```

---

## Form Fields {#controls-form-fields}

*Rock Mobile supports several custom form fields. This page contains information on using form fields and covers each of the various field types.*

### Using Form Fields

Before we go through the various fields available, let's take a look at how they look with their different embed options.

The first way to display one of these fields is just by itself without a container view.

```
<Rock:TextBox Label="Name" Placeholder="Your Name" />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67188)

The `<Rock:FormField>` view provides a way to show the label. It also handles showing a required indicator. This will be covered in more detail when reading up on that view itself.

```
<Rock:FieldContainer>
        <Rock:TextBox Label="Name" Placeholder="Your Name" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67189)

Now we're talking. The `<Rock:FormGroup>` adds a border as well as some other sugar to your layout. Again, you can get all the details by reading up on the `FormGroup` view. However, note that in this sample we removed the `Label` from the `TextBox` and moved it to the `Title` property of the `FormGroup`. When displaying a single field this works well.

This will be the format the screenshots for each individual field will be shown in as it provides a good way to see the entire view and what it will look like.

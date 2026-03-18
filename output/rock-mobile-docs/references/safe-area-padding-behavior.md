> **Path:** Mobile Docs > 🧱 Essentials > Controls > Effects > Safe Area Padding Behavior

# Safe Area Padding Behavior

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

```xaml
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

```xaml
<ContentView BackgroundColor="Blue">
    <ContentView.Effects>
        <Rock:SafeAreaPaddingEffect Edges="Top" />
    </ContentView.Effects>
    <Label Text="This label will vertically be below any unsafe area." />
</ContentView>
```

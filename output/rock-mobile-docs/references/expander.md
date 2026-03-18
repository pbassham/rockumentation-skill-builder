> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Expander

# Expander

M v2.0C v12.4

*Inherits from* [*Microsoft.Maui.Controls.ContentView*](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.contentview)

The expander allows you to display two stacked views. A header view and then a content view. When the Expander is collapsed, the content is hidden. When expanded, it's shown. And then when tapping on the header it will toggle the state of the Expander.

Before shell v6, animations were used to show and hide content. However, properties related to animations will no longer work in shell v6 and later.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Content | [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view) | The content that will be displayed when expanded. This is the default property so it can be omitted when creating child elements. |
| ContentTemplate | [DataTemplate](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.datatemplate) | This will also provide content to be displayed but it doesn't create the views until they are needed. If your expanded content is rather heavy you might consider using this to improve initial page load performance. |
| Header | [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view) | The view that will make up the header of the expander. This is what will respond to tap events. |
| IsExpanded | bool | Allows you to set the initial state of the expander. *Defaults to* *false**.* |
| Direction | [ExpandDirection](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/expander#expand-direction) | Which direction the expander will expand in. *Defaults to* *Down**.* |
| ExpandAnimationLength | int | The duration of the expand animation in milliseconds. *Defaults to* *250**.* |
| CollapseAnimationLength | int | The duration of the collapse animation in milliseconds. *Defaults to* *250**.* |
| ExpandAnimationEasing | [Easing](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.easing) | The easing function to use when performing the animation. *Defaults to* *Linear**.* |
| CollapseAnimationEasing | [Easing](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.easing) | The easing function to use when performing the animation. *Defaults to* *Linear**.* |

### Expand Direction

| Value | Description |
| --- | --- |
| Down | Expands down below the header. |
| Up | Expands up above the header. |
| Left | Expands to the left of the header. |
| Right | Expands to the right of the header. |

## Example

```
<Rock:Expander>
    <Rock:Expander.Header>
        <Label Text="Tap for details" />
    </Rock:Expander.Header>
    <StackLayout>
        <Label Text="Some details about this event." />
        <Button Text="Register" StyleClass="btn btn-primary" />
    </StackLayout>
</Rock:Expander>
```

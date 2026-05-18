---
description: "Use when styling cover sheet navigation bars, configuring cover sheet display parameters, or implementing cover sheet presentation on iOS and Android"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

*The ins and outs of displaying and styling cover sheets*

M v4.0

Cover sheets are a commonly patterned way to present information to a user that doesn't rely on changing the navigation stack.

Important

Cover sheets cannot be opened within cover sheets. Some blocks utilize cover sheets to reveal content or forms, so be sure not to include these blocks in the navigation stack.

![](https://community.rockrms.com/GetImage.ashx?Id=67032)

## Android

Currently, there is not a ton of Android functionality. It works similarly to a [PushPage](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands#pushpage) but has an animation that slides from bottom to top instead of from right to left.

Warning

If you set IsNavigationPage to false, Android users won't have a way to close the cover sheet. You'll need a custom button that uses the CloseCoverSheet command.  

## Parameters

Listed below are the options provided via the `ShowCoverSheetCommandParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The Guid of the page to display in the cover sheet. Use this instead of Content. |
| Content | View | The content to display inside of the cover sheet. Use this instead of PageGuid. |
| ModalPresentationStyle | ModalPresentationStyle | \[iOS ONLY\] The way that the sheet is presented. There are currently four accepted values: FormSheet*,* PageSheet*,* FullScreen *and* OverFullScreen*.* Defaults to FormSheet. |
| IsNavigationPage | bool | Whether or not the page displayed should be converted into a page that has a toolbar with a dismiss button. Defaults to *true*. |
| SheetTitle | string | The title of the sheet, displays in the middle of the navigation bar. |
| DismissButtonText | string | The text to use in the dismiss button, seen in the toolbar (navigation bar) of the sheet. Defaults to *Cancel*. |
| WaitForReady | bool | When true, delays the sheet opening until the contents are loaded and ready to be shown.   Defaults to *True*. |
| ShowNavigationBar   M v5.0 | bool | Whether or not this instance should show a navigation bar. IsNavigationPage must be enabled. (defaults to false) |
| PrimaryActionButton   M v5.0 | Button | The button to use as the primary action in the top right corner of cover sheets. |
| SecondaryActionButton   M v5.0 | Button | The button to use as the secondary action in the top left corner of cover sheets. |

### Styling

M v5.0

![](https://community.rockrms.com/GetImage.ashx?Id=67034)

You can style the [Navigation Bar](https://community.rockrms.com/developer/mobile-docs/styling/style-guide/shell-components#navigation-bar) itself by targeting the `cover-sheet` class. For example, if you want to change the background bar color, text color, and remove the FullScreen separator:

```
.cover-sheet {
    -maui-bar-background-color: green;
    -maui-bar-text-color: #ffffff;
    -rock-status-bar-text: light;
    -rock-ios-hide-navigation-bar-separator: true;
}
```

Setting `-rock-ios-hide-navigation-bar-separator: true;` works on initial page loads, but changing the OS theme will reveal this separator on the current page.

## Examples

To show a cover sheet that displays another page, pass in the `PageGuid` as the `CommandParameter`.

```
<!-- Cover sheet used to display another page as content. -->
<Button Text="Tap"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowCoverSheet}"
    CommandParameter="71e80253-8d10-426b-8182-65dafe9b695f" />
```

To show a cover sheet from provided XAML content, pass in the XAML content you want to render inside of the `CommandParameter`.

```
<!-- Cover sheet with content as the parameter. -->
<Button Text="Tap"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowCoverSheet}">
    <Button.CommandParameter>
        <StackLayout>
            <Label Text="This is cover sheet content."
                StyleClass="h1" />
        </StackLayout>
    </Button.CommandParameter>
</Button>
```

Here is an extensive example with most of the `ShowCoverSheetParameters` properties utilized.

```
<Button Text="Tap"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowCoverSheet}">
    <Button.CommandParameter>
        <Rock:ShowCoverSheetParameters SheetTitle="Title" 
            ModalPresentationStyle="FullScreen">
            <Rock:ShowCoverSheetParameters.Content>
                <StackLayout>
                    <Label Text="This is cover sheet content."
                        StyleClass="h3" />
                </StackLayout>
            </Rock:ShowCoverSheetParameters.Content>
            <Rock:ShowCoverSheetParameters.PrimaryActionButton>
                <Button Command="{Binding ShowToast}" 
                    Text="Toast"
                    CommandParameter="That was a unique use of the PrimaryActionButton..." />
            </Rock:ShowCoverSheetParameters.PrimaryActionButton>
            <Rock:ShowCoverSheetParameters.SecondaryActionButton>
                <Button Command="{Binding CloseCoverSheet}" 
                    Text="Dismiss" />
            </Rock:ShowCoverSheetParameters.SecondaryActionButton>
        </Rock:ShowCoverSheetParameters>
    </Button.CommandParameter>
</Button>
```

## Closing a Cover Sheet

To close any open cover sheet, use the [CloseCoverSheet](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#closecoversheet) command.

```
<Button Text="Tap" Command="{Binding CloseCoverSheet}" />
```

---

## Divider {#divider}

*Displays a separator line much like an HTML <hr\> tag.*

M v1.0

*Inherits from* [*BoxView*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/boxview)

### Properties

| Name | Type | Description |
| --- | --- | --- |
| Thickness | string | The vertical thickness of the line. Valid values are: Thick \- 2 units in height, Thicker \- 4 units in height, Thickest \- 8 units in height. If not specified, the default is 1 unit. |

```
<Rock:Divider />
<Rock:Divider Thickness="Thick" />
<Rock:Divider Thickness="Thicker" />
<Rock:Divider Thickness="Thickest" />
```

Note

Use the margin helper CSS classes like .my-12 to easily adjust the vertical spacing around your divider.  

```
<Rock:Divider StyleClass="my-12" />
```

---

## Expander {#expander}

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

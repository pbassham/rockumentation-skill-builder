> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Cover Sheet

# Cover Sheet

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
| ModalPresentationStyle | ModalPresentationStyle | \[iOS ONLY\] The way that the sheet is presented. There are currently four accepted values: FormSheet*,* PageSheet*,* FullScreen *and* OverFullScreen*.* Defaults to FormSheet.   |
| IsNavigationPage | bool | Whether or not the page displayed should be converted into a page that has a toolbar with a dismiss button. Defaults to *true*.   |
| SheetTitle | string | The title of the sheet, displays in the middle of the navigation bar. |
| DismissButtonText | string | The text to use in the dismiss button, seen in the toolbar (navigation bar) of the sheet. Defaults to *Cancel*.  |
| WaitForReady | bool | When true, delays the sheet opening until the contents are loaded and ready to be shown.  
Defaults to *True*. |
| ShowNavigationBar  
M v5.0 | bool | Whether or not this instance should show a navigation bar. IsNavigationPage must be enabled. (defaults to false)   |
| PrimaryActionButton  
M v5.0 | Button | The button to use as the primary action in the top right corner of cover sheets. |
| SecondaryActionButton  
M v5.0 | Button | The button to use as the secondary action in the top left corner of cover sheets. |

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

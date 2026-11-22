---
description: "Use when implementing popup action sheets with multiple button options on mobile, including destructive actions"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile1.0

This action will show an action panel (think action sheet in iOS terms). This is basically a popup that contains a short message and a number of buttons the user can choose from. A common example of this would be a "reply" button in a mail application. When tapping the button it might then pop up an action sheet that contains a few buttons to help you decide what you intend to do: Reply, Reply All, Forward.

These popups usually have a Cancel button (though it's not strictly required). Additionally, you can specify a single "destructive" button that stands out to the user. Often, this would be a Delete type action and is usually styled red.

The `CommandParameter` must specify an instance of the `ShowActionPanelParameters` object.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Title | string | The title of the action panel; keep it short! |
| CancelTitle | string | The text to display in the cancel button (optional). *Defaults to empty string.* |
| DestructiveButton | ActionPanelButton | Defines the button that implies a destructive operation, for example on iOS this button becomes red (optional). *Defaults to* *null**.* |
| Buttons | ICollection<ActionPanelButton\> | A collection of buttons to be shown, this is the default content property meaning you would just add ActionPanelButton nodes as child elements. |

![](https://community.rockrms.com/GetImage.ashx?Id=66969)

Actions on iOS with automatic dark and light mode, revealed at the bottom of the screen

![](https://community.rockrms.com/GetImage.ashx?Id=66968)

Actions on Android that don't change with light or dark theme, revealed in the center of the screen

## Examples

```
<Button Text="Actions"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowActionPanel}">
    <Button.CommandParameter>
        <Rock:ShowActionPanelParameters Title="My Action Sheet"
            CancelTitle="Do Nothing">
            <Rock:ShowActionPanelParameters.DestructiveButton>
                <Rock:ActionPanelButton Title="Delete"
                    Command="{Binding PushPage}"
                    CommandParameter="c258265c-9645-46f1-a69b-0e0f149e5e83" />
            </Rock:ShowActionPanelParameters.DestructiveButton>
            <Rock:ActionPanelButton Title="First Button"
                Command="{Binding OpenBrowser}"
                CommandParameter="https://www.rockrms.com" />
            <Rock:ActionPanelButton Title="Second Button"
                Command="{Binding OpenExternalBrowser}"
                CommandParameter="https://community.rockrms.com/" />
        </Rock:ShowActionPanelParameters>
    </Button.CommandParameter>
</Button>
```

Thanks to the magic of XAML, we can simplify the definition of the destructive button a bit if we want, it's up to you.

```
<Button Text="Actions"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowActionPanel}">
    <Button.CommandParameter>
        <Rock:ShowActionPanelParameters Title="My Action Sheet"
            CancelTitle="Do Nothing"
            DestructiveButton="{Rock:ActionPanelButton Title=Delete, Command={Binding PushPage}, CommandParameter=c258265c-9645-46f1-a69b-0e0f149e5e83}">
            <Rock:ActionPanelButton Title="First Button"
                Command="{Binding OpenBrowser}"
                CommandParameter="https://www.rockrms.com" />
            <Rock:ActionPanelButton Title="Second Button"
                Command="{Binding OpenExternalBrowser}"
                CommandParameter="https://community.rockrms.com/" />
        </Rock:ShowActionPanelParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [ShowToast](https://community.rockrms.com/developer/mobile-docs/commands/showtoast) shows a short message that goes away on its own.
- [ShowAlert](https://community.rockrms.com/developer/mobile-docs/commands/showalert) shows an alert the person has to dismiss.

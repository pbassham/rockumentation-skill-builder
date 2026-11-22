---
description: "Use when displaying native confirmation or acknowledgment alerts with customizable title, message, and button actions in mobile apps"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile20.0

Shows a native alert with a title, a message and one or two buttons. Use it to confirm an action before it happens, such as discarding changes, or to tell the person something they need to acknowledge. Each button can run a command when it's chosen.

The `CommandParameter` must be a `ShowAlertParameters` object. Give it only a confirm button for a single-button alert, or add a cancel button for a confirmation. If you leave out the confirm button, an **OK** button is shown.

Note

On iOS a destructive confirm button uses the system's red destructive style. On Android it shows red text. On Android, closing the alert with the back button or by tapping outside it counts as choosing cancel, so the cancel button's command runs.

## Properties

### ShowAlertParameters

| Property | Type | Description |
| --- | --- | --- |
| Title | string | The title of the alert. |
| Message | string | The message shown below the title. |
| ConfirmButton | AlertButton | The confirm button. Defaults to a button titled **OK** that runs no command. |
| CancelButton | AlertButton | The cancel button. Only shown when it has a `Title`. Leave it out for a single-button alert. |

### AlertButton

| Property | Type | Description |
| --- | --- | --- |
| Title | string | The button text. |
| Command | ICommand | The command to run when this button is chosen. Optional. |
| CommandParameter | object | The parameter passed to `Command`. Optional. |
| IsDestructive | bool | Shows the button in red to warn that the action can't easily be undone. Only applies to the confirm button. Defaults to `false`. |

## Examples

```
<Button Text="Save"
    Command="{Binding ShowAlert}">
    <Button.CommandParameter>
        <Rock:ShowAlertParameters Title="Saved"
            Message="Your changes have been saved." />
    </Button.CommandParameter>
</Button>
```
```
<Button Text="Discard"
    Command="{Binding ShowAlert}">
    <Button.CommandParameter>
        <Rock:ShowAlertParameters Title="Discard changes?"
            Message="Your changes will be lost.">
            <Rock:ShowAlertParameters.ConfirmButton>
                <Rock:AlertButton Title="Discard"
                    IsDestructive="True"
                    Command="{Binding PopPage}" />
            </Rock:ShowAlertParameters.ConfirmButton>
            <Rock:ShowAlertParameters.CancelButton>
                <Rock:AlertButton Title="Keep Editing" />
            </Rock:ShowAlertParameters.CancelButton>
        </Rock:ShowAlertParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [ShowToast](https://community.rockrms.com/developer/mobile-docs/commands/showtoast) shows a short message that goes away on its own.
- [ShowActionPanel](https://community.rockrms.com/developer/mobile-docs/commands/showactionpanel) shows a list of actions to choose from.

---

## ShowCoverSheet {#showcoversheet}

Mobile4.0

Shows a [Cover Sheet](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cover-sheet).

```
<Button Text="Tap"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowCoverSheet}"
    CommandParameter="71e80253-8d10-426b-8182-65dafe9b695f" /> <!-- Page Guid -->
```

See [Cover Sheet](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cover-sheet) for how cover sheets look and behave.

## Related

- [CloseCoverSheet](https://community.rockrms.com/developer/mobile-docs/commands/closecoversheet) closes the cover sheet that is open.

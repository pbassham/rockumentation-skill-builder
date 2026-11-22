---
description: Use when you need to display popup windows or toast notifications in Rock Mobile Shell applications
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile1.0

Rock Mobile Shell supports the idea of small popup pages. These don't support navigation but can be useful for a simple display of additional content without leaving the current page.

If the `CommandParameter` is a string then it will be interpreted as a page GUID with optional query string parameters. This will display a full Rock page inside the popup view.

Alternatively, you can specify a view to use as the content for the popup. This is ideal for showing additional details of items or perhaps a list filter.

Finally, you can specify a `ShowPopupParameters` object and supply additional options as seen below.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Anchor | ShowPopupAnchor | Where to anchor the popup, possible values are Center, Top, and Bottom. *Defaults to* *Center**.* |
| Content | View | The view to display inside the popup, if set this will override the PageGuid property. |
| PageGuid | Guid | The Rock page to be displayed inside the popup. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | A collection of query string parameters that will be passed to the Rock page. |
| Title | string | The title of the popup. |
| ShowHeader | bool | Determines if the header should be shown. If disabled then you have complete control of the design. *Defaults to* *True**.* |

## Examples

```
<Button Text="Tap"
    Command="{Binding ShowPopup}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8?GroupId=18&amp;Mode=Edit" />
```
```
<Button Text="Tap"
    Command="{Binding ShowPopup}">
    <Button.CommandParameter>
        <Rock:ShowPopupParameters Title="Select Group"
            PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="ParentGroupId"
                Value="8293" />
        </Rock:ShowPopupParameters>
    </Button.CommandParameter>
</Button>
```
```
<Button Text="Tap"
    Command="{Binding ShowPopup}">
    <Button.CommandParameter>
        <Rock:ShowPopupParameters Title="Select Group"
            Anchor="Top">
            <Rock:ShowPopupParameters.Content>
                <VerticalStackLayout>
                    <Label Text="Hello Rock" />
                    <Button Text="Close"
                        Command="{Binding ClosePopup}" />
                </VerticalStackLayout>
            </Rock:ShowPopupParameters.Content>
        </Rock:ShowPopupParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [ClosePopup](https://community.rockrms.com/developer/mobile-docs/commands/closepopup) closes the popup that is open.

---

## ShowToast {#showtoast}

Mobile4.0

This command displays a "Toast" style message, often used to show quick and temporary messages, such as "saved" or "updated" and things of the sort.

If the `CommandParameter` is a string, it will display using the default styles with the command parameter as the message to display. For more control, pass a `ShowToastParameters` object.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text to display in the Toast. |
| Duration | ToastDuration | Either long (3.5 seconds) or short (2.0 seconds). |
| FontSize | int | The font size of the toast. |

## Examples

```
<Button Text="Toast Me"
    Command="{Binding ShowToast}"
    CommandParameter="Default Toast styling." />
```
```
<Button Text="Toast Me 2"
    Command="{Binding ShowToast}"
    CommandParameter="{Rock:ShowToastParameters Text='Butter or jam?', Duration='Long', FontSize='32'}" />
```

## Related

- [ShowAlert](https://community.rockrms.com/developer/mobile-docs/commands/showalert) shows an alert the person has to dismiss.
- [ShowActionPanel](https://community.rockrms.com/developer/mobile-docs/commands/showactionpanel) shows a list of actions to choose from.
- [PerformHapticFeedback](https://community.rockrms.com/developer/mobile-docs/commands/performhapticfeedback) makes the device give a short vibration.

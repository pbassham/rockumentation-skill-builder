---
description: Use when navigating to a new mobile page and replacing the entire stack without a back button option
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile1.0

This command replaces the entire navigation stack with a new page. This means there will be no back button to return to any previous page.

If the `CommandParameter` is a string, then it is expected to contain a page's Guid value and, optionally, a set of query string parameters. The first parameter is separated by a `?` and any additional parameters are separated by `&`. Since these query string parameters are inside an XML document, you must escape them (for example, your `&` must become `&amp;`).

If you are using data binding you can also bind the `CommandParameter` to a true GUID value, in which case it must be the GUID of a valid page.

Finally, if you need advanced parameter usage you can use a `ShowPageParameters` object.

Warning

When you use ShowPage to open a page in the tab bar, the active tab is switched automatically. However, it's important to note that because each tab maintains its own navigation stack, the ShowPage command will only function correctly if the targeted tab is currently displaying its root page; otherwise, the command will not take effect.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The Guid identifier of the page to be used to replace the current page. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Any additional query string parameters to be passed to the page. |
| WaitForReady | bool | Waits until the page is loaded before displaying it. (*Defaults to* *false**.*) |

```
<Button Text="Show Page"
    Command="{Binding ShowPage}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8" />
```
```
<Button Text="Show Page"
    Command="{Binding ShowPage}"
    CommandParameter="{Rock:ShowPageParameters PageGuid='e4d80e57-da60-4822-bc22-c071f02958e8', WaitForReady='True'}" />
```
```
<Button Text="Show Page"
    Command="{Binding ShowPage}">
    <Button.CommandParameter>
        <Rock:ShowPageParameters PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="GroupId"
                Value="18" />
            <Rock:Parameter Name="Mode"
                Value="Edit" />
        </Rock:ShowPageParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [PushPage](https://community.rockrms.com/developer/mobile-docs/commands/pushpage) opens a page on top of the current one.
- [PopPage](https://community.rockrms.com/developer/mobile-docs/commands/poppage) closes the current page and goes back.
- [ReplacePage](https://community.rockrms.com/developer/mobile-docs/commands/replacepage) replaces the current page with another one.

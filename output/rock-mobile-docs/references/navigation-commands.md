> **Path:** Mobile Docs > 🧱 Essentials > Commands > Navigation Commands

# Navigation Commands

Some blocks include a setting called *Navigate Mode*, which lets you control how navigation to another page should happen. The available options align with specific page navigation commands.

To keep things simple, let’s walk through an example: imagine the current navigation stack has two pages—`PageA` is the root or home page, and someone has navigated from there to `PageB`. Now, we want to navigate to a new page, `PageC`, and see how different Navigate Modes affect the stack.

| Value | Description |
| --- | --- |
| Push | Pushes a new page onto the navigation stack. If the user presses the back button they will be brought back to PageB |
| Replace | Replaces the current page with the new page. If the user presses the back button they will be taken to PageA |
| Show | Replaces the entire navigation stack with the new page. There will be no back button for the user to press. |

## MapAddress

M v3.0

This command tries to open a location—either an address or coordinates—directly in the device’s default maps app, like Google Maps or Apple Maps. It skips the step of launching a browser, making the experience quicker and more seamless for an individual.

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the location as you want it to appear on the user's map application. |
| Address | string | The address to which you want the app to locate. |
| Latitude | double? | The latitude of a place to locate. Useless without also providing "Longitude". |
| Longitude | double? | The longitude of a place to locate. Useless without also providing "Latitude". |

Note

This command will **not** work when defining properties inline: {Rock:MapAddressParameters Name='', Address=''}

Using an address (recommended):

```xaml
<Button Text="Get Directions"
    StyleClass="btn, btn-primary-strong"
    Command="{Binding MapAddress}">
    <Button.CommandParameter>
        <Rock:MapAddressParameters Name="Phoenix Convention Center"
            Address="100 N 3rd St, Phoenix, AZ 85004" />
    </Button.CommandParameter>  
</Button>
```

Using latitude/longitude:

```xaml
<Button Text="Get Directions"
    StyleClass="btn, btn-primary-strong"
    Command="{Binding MapAddress}">
    <Button.CommandParameter>
        <Rock:MapAddressParameters Name="Phoenix Convention Center"
            Lattitude="33.4498969"
            Longitude="-112.0705366" />
    </Button.CommandParameter>  
</Button>
```

## OpenAppSettings

M v3.0

This command will open the device's settings application and take the user directly to the settings for your mobile application.

There are currently no parameters available for this command.

```xaml
<Button Text="Settings" Command="{Binding OpenAppSettings}" />
```

## OpenBrowser

M v1.0

This command allows you to open a web address using the built-in browser inside the application.

If you are opening a URL to your own Rock server and wish to ensure the user is logged in, you can pass an empty `rckipid` parameter and an impersonation token will be automatically generated.

Note that tokens generated with an empty parameter will use the settings defined in Rock's [global attributes](https://community.rockrms.com/Rock/BookContent/9#configuringpersontokens), which may be more open than your specific implementation needs. Consider your impersonation strategy and understand the risk that individuals can share their impersonated URL without realizing it. Alternatively, you can use the Lava filter [PersonImpersonationToken](https://community.rockrms.com/lava/filters/person-filters#personimpersonationtoken).

The `CommandParameter` can either be a string, which contains the URL and query string parameters, or it can be a reference to an `OpenBrowserParameters` object which contains the following properties.

| Property | Type | Description |
| --- | --- | --- |
| Url | string | The URL to be opened. May contain query string parameters. |
| Parameters |   List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | Any additional query string parameters to be included with the URL. |

```xaml
<Button Text="Open Internal"
        Command="{Binding OpenBrowser}"
        CommandParameter="https://www.rockrms.com/" />
```

```xaml
<Button Text="Open Internal"
    Command="{Binding OpenBrowser}">
    <Button.CommandParameter>
        <Rock:OpenBrowserParameters Url="https://www.rockrms.com/">
            <Rock:Parameter Name="q" Value="rockrms" />
        </Rock:OpenBrowserParameters>
    </Button.CommandParameter>
</Button>
```

## OpenExternalBrowser

M v1.0

Similar to the OpenBrowser command, this one opens a URL in a browser window. The difference between the two is that this command uses the devices native web browser and opens the URL in that application. This means your user leaves your mobile app and gets sent over to Safari or Chrome.

If you are opening a URL to your own Rock server and wish to ensure the user is logged in, you can pass an empty `rckipid` parameter and an impersonation token will be automatically generated.

Note that tokens generated with an empty parameter will use the settings defined in Rock's [global attributes](https://community.rockrms.com/Rock/BookContent/9#configuringpersontokens), which may be more open than your specific implementation needs. Consider your impersonation strategy and understand the risk that individuals can share their impersonated URL without realizing it. Alternatively, you can use the Lava filter [PersonImpersonationToken](https://community.rockrms.com/lava/filters/person-filters#personimpersonationtoken).

The `CommandParameter` can either be a string, which contains the URL and query string parameters, or it can be a reference to an `OpenExternalBrowserParameters` object which contains the following properties.

| Property | Type | Description |
| --- | --- | --- |
| Url | string | The URL to be opened. May contain query string parameters. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | Any additional query string parameters to be included with the URL. |

```xaml
<Button Text="Open External"
    Command="{Binding OpenExternalBrowser}"
    CommandParameter="https://www.rockrms.com/" />
```

```xaml
<Button Text="Open External"
    Command="{Binding OpenExternalBrowser}">
    <Button.CommandParameter>
        <Rock:OpenExternalBrowserParameters Url="https://www.rockrms.com/">
            <Rock:Parameter Name="q" Value="rockrms" />
        </Rock:OpenExternalBrowserParameters>
    </Button.CommandParameter>
</Button>
```

## PopPage

M v1.0

This command works as the opposite of the `PushPage` command. Simply put, it behaves like the user tapping the back button in the navigation bar—it removes the current page from the stack and brings the previous one back into view. For example, imagine you’ve pushed a page asking the user to confirm an action, and you want a "Cancel" button that takes them back to where they were.

An added option here is that you can choose to reload the previous page before showing it again. To do that, just pass `true` to the `CommandParameter`.

Important

This command only works when a navstack is present and there's a page to return to. The navstack is not available when a Page is set to Show Full Screen or the shell's Application Type is set to Blank.

```xaml
<Button Text="Close" Command="{Binding PopPage}" />
```

```xaml
<Button Text="Close" Command="{Binding PopPage}" CommandParameter="true" />
```

Note

Did you know push page now support anchor-based navigation using fragment identifiers (e.g., #elementName) to automatically scroll to a specific element when a page loads. Read more here.  

## PushPage

M v1.0

This command pushes a new page onto the navigation stack. This type of navigation allows the user to use the back button to return to the page that pushed the new page.

If the `CommandParameter` is a string, then it is expected to contain a page's GUID value and, optionally, a set of query string parameters. The first parameter is separated by a `?` and any additional parameters are separated by `&`. Since these query string parameters are inside an XML document, you must escape them (for example, your `&` must become `&amp;`).

If you are using data binding you can also bind the `CommandParameter` to a true GUID value, in which case it must be the GUID of a valid page.

Finally, if you need advanced parameter usage you can use a `PushPageParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The Guid identifier of the page to be pushed onto the navigation stack. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | Any additional query string parameters to be passed to the page. |
| WaitForReady | bool |   Waits until the page is loaded before displaying it. (*Defaults to* *false**.*)   |

```xaml
<Button Text="Push Page"
    Command="{Binding PushPage}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8" />
```

```xaml
<Button Text="Show Page"
    Command="{Binding ShowPage}"
    CommandParameter="{Rock:PushPageParameters PageGuid='e4d80e57-da60-4822-bc22-c071f02958e8', WaitForReady='True'}" />
```

```xaml
<Button Text="Push Page"
    Command="{Binding PushPage}">
    <Button.CommandParameter>
        <Rock:PushPageParameters PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="GroupId" Value="18" />
            <Rock:Parameter Name="Mode" Value="Edit" />
        </Rock:PushPageParameters>
    </Button.CommandParameter>
</Button>
```

## ReplacePage

M v1.0

This command replaces the current page with a new page. This differs from the [PushPage](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands#pushpage) command. Using the ReplacePage command, if the user then taps the back button then they will be taken back to the page they were on *before* the page that called the ReplacePage command.

If the `CommandParameter` is a string, then it is expected to contain a page's GUID value and, optionally, a set of query string parameters. The first parameter is separated by a `?` and any additional parameters are separated by `&`. Since these query string parameters are inside an XML document, you must escape them (for example, your `&` must become `&amp;`).

If you are using data binding you can also bind the `CommandParameter` to a true GUID value, in which case it must be the GUID of a valid page.

Finally, if you need advanced parameter usage you can use a `PushPageParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The Guid identifier of the page to be used to replace the current page. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | Any additional query string parameters to be passed to the page. |
| WaitForReady | bool | Waits until the page is loaded before displaying it. (*Defaults to* *false**.*)   |

```xaml
<Button Text="Replace Page"
    Command="{Binding ReplacePage}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8" />
```

```xaml
<Button Text="Show Page"
    Command="{Binding ShowPage}"
    CommandParameter="{Rock:ReplacePageParameters PageGuid='e4d80e57-da60-4822-bc22-c071f02958e8', WaitForReady='True'}" />
```

```xaml
<Button Text="Replace Page"
    Command="{Binding ReplacePage}">
    <Button.CommandParameter>
        <Rock:ReplacePageParameters PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="GroupId" Value="18" />
            <Rock:Parameter Name="Mode" Value="Edit" />
        </Rock:ReplacePageParameters />
    </Button.CommandParameter>
</Button>
```

## ShowPage

M v1.0

This command replaces the entire navigation stack with a new page. This means there will be no back button to return to any previous page.

If the `CommandParameter` is a string, then it is expected to contain a page's Guid value and, optionally, a set of query string parameters. The first parameter is separated by a `?` and any additional parameters are separated by `&`. Since these query string parameters are inside an XML document, you must escape them (for example, your `&` must become `&amp;`).

If you are using data binding you can also bind the `CommandParameter` to a true GUID value, in which case it must be the GUID of a valid page.

Finally, if you need advanced parameter usage you can use a `PushPageParameters` object.

Warning

When you use ShowPage to open a page in the tab bar, the active tab is switched automatically. However, it's important to note that because each tab maintains its own navigation stack, the ShowPage command will only function correctly if the targeted tab is currently displaying its root page; otherwise, the command will not take effect.

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The Guid identifier of the page to be used to replace the current page. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | Any additional query string parameters to be passed to the page. |
| WaitForReady | bool |   Waits until the page is loaded before displaying it. (*Defaults to* *false**.*)   |

```xaml
<Button Text="Show Page"
    Command="{Binding ShowPage}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8" />
```

```xaml
<Button Text="Show Page"
    Command="{Binding ShowPage}"
    CommandParameter="{Rock:ShowPageParameters PageGuid='e4d80e57-da60-4822-bc22-c071f02958e8', WaitForReady='True'}" />
```

```xaml
<Button Text="Show Page"
    Command="{Binding ShowPage}">
    <Button.CommandParameter>
        <Rock:ShowPageParameters PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="GroupId" Value="18" />
            <Rock:Parameter Name="Mode" Value="Edit" />
        </Rock:ShowPageParameters />
    </Button.CommandParameter>
</Button>
```

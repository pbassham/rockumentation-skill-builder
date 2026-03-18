> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Scan Code

# Scan Code

M v2.0

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

This is a special control that allows you to initiate a scan of a barcode.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ButtonText | string | The text to display in the scan button that is automatically provided. Defaults to Scan. |
| ButtonStyleClass | IList | The CSS style classes to apply to the scan button. Defaults to btn, btn-default. |
| Command | ICommand | The command to be executed when a barcode has been detected and scanned. |
| CommandParameter | object | The parameter to be given to the Command when it is executed. |
| Mode | [CameraMode](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/scan-code#camera-mode) | The mode to be used with the camera. Defaults to Manual. |
| Scan | ICommand | This command can be used with a custom button to trigger the camera to be shown. (read-only) |
| Template | View | If supplied, allows you to override the default template built by the control. When this is set then the default Scan button is not generated. |
| Value | string | The code that was scanned from the barcode. (read-only) |

### Camera Mode

| Value | Description |
| --- | --- |
| Manual | The camera will not start until manually triggered. |
| Automatic | The camera will automatically start as soon as possible. |
| Passive | The camera will start automatically but have no visual presence. The user can still manually trigger the camera so that it shows up. This mode is most useful when users are knowledgeable and know that they can scan a code but you want to still show a UI for manual entry. |

### Example

```
<Rock:ScanCode x:Name="scanner"
               Command="{Binding PushPage}"
               Mode="Automatic">
    <Rock:ScanCode.CommandParameter>
        <Rock:PushPageParameters PageGuid="d6260c47-7364-405b-883c-f533b244a175">
            <Rock:Parameter Name="code"
                            Value="{Binding Source={x:Reference scanner}, Path=Value}" />
        </Rock:PushPageParameters>
    </Rock:ScanCode.CommandParameter>
</Rock:ScanCode>
```

The above example will create a barcode scanner and give it a name of `scanner` that is used later to reference it. It's configured for Automatic mode so as soon as the page loads, it will show a full-screen camera scanner interface. If the user closes that then they will return to the page and see the normal content as well as a `Scan` button that they can use to enter scan mode again.

When a code is detected, we have configured the Scan Code control to execute the Push Page command. We specify the Page Guid to transition to and then a parameter called `code` that takes its value from the Scan Code control's Value property. So when a code is scanned, the user will be redirected to a new page and that page will receive a query string parameter of `code` that contains the scanned code.

```
<Rock:ScanCode x:Name="scanner"
               Command="{Binding PushPage}">
    <Rock:ScanCode.Template>
        <Button Text="Custom Button"
                StyleClass="btn,btn-default"
                Command="{Binding Source={x:Reference scanner}, Path=Scan}" />
    </Rock:ScanCode.Template>
    <Rock:ScanCode.CommandParameter>
        <Rock:PushPageParameters PageGuid="d6260c47-7364-405b-883c-f533b244a175">
            <Rock:Parameter Name="code"
                            Value="{Binding Source={x:Reference scanner}, Path=Value}" />
        </Rock:PushPageParameters>
    </Rock:ScanCode.CommandParameter>
</Rock:ScanCode>
```

The above will generate a Scan Code control that runs in manual mode, meaning the user must do something to initiate the scan. In this case, we are providing a template so the default button isn't rendered. To be honest, our template is rather pointless because we could achieve the same by just modifying the existing properties. But the important part of the example is how we bind the button's command to the Scan command of the Scan Code control. From this, you can imagine the possibilities of using an [Image](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/image) control with a tap gesture recognizer that triggers the Scan command. Or any other custom interface you want to make.

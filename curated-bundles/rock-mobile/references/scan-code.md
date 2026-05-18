---
description: "Use when implementing barcode scanning functionality in Rock mobile apps, including camera modes, scan triggers, and passing scanned values to commands"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

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

---

## Validator {#validator}

M v1.0

Inherits from [NotificationBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/notification-box)

This control allows you to add client-side validation to your forms. For example, suppose you are building a custom Search form. It doesn't make sense to allow the user to search if they don't enter a term to search for. This control handles validation as well as displaying any validation errors.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ControlsToValidate | List | References to the controls to be included in validation. This is the default content property so you can simply add the control references as child elements. |

### Example

```
<Rock:FieldContainer>
    <Rock:TextBox x:Name="term"
                  Name="Search For"
                  IsRequired="true" />
</Rock:FieldContainer>

<Rock:Validator x:Name="validator">
    <x:Reference>term</x:Reference>
</Rock:Validator>

<Button StyleClass="btn,btn-primary"
        Text="Search"
        Command="{Binding Callback}">
    <Button.CommandParameter>
        <Rock:CallbackParameters Name="Search"
                                 Validator="{x:Reference validator}">
            <Rock:Parameter Name="SearchTerm"
                            Value="{Binding Text, Source={x:Reference term}}" />
        </Rock:CallbackParameters>
    </Button.CommandParameter>
</Button>
```

Everything above will render a simple text box for the user to type something into, and mark it as required. Then the validator will be there, though it won't be visible by default since there are no bad validations until it is run. Finally, we have a Search button that initiates a callback to the block. The command is configured to be a Callback command, and the parameters passed in include a reference to the Validator to be used during validation.

What might be new and need a little explanation is the `<x:Reference>` node. You are probably used to seeing `{x:Reference term}` like we have in the SearchTerm parameter so we can bind to the Text property of the text box. In this new format, `<x:Reference>term</x:Reference>` does something very similar. The entire node is replaced with a reference to the "term" text box. This allows you to use multiple `<x:Reference>` nodes inside the validator to specify multiple fields to be validated.

If the user taps on the Search button without entering any text in the Search For box, then the validator will show up and give some information about the field being required. It will also prevent the Callback from happening.

Important

Currently, the only command that supports validation is the Callback command.

---

## Volume Control {#volume-control}

M v2.0

*Inherits from [Xamarin.Forms.View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view)*

This control presents a simple volume icon on the screen. When tapped, a small popup will appear that allows the user to adjust the device volume.

There are no properties currently available to customize.

### Example

```
<Rock:VolumeControl />
```

---

## Zone {#zone}

M v6.0 Inherits from [Microsoft.Maui.Controls.Grid](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/layouts/grid?view=net-maui-8.0)

M v1.0 Inherits from [Xamarin.Forms.StackLayout](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.stacklayout)

This control should only be used in your mobile templates. It defines the zones and their names that are made available to blocks when you configure a page.

Note that when you add multiple blocks to a zone, there will be a space between them. This comes from the default spacing on a StackLayout which is `10`. If you want to remove the gap, simply add a `Spacing="0"` property to your zone and all the blocks within will touch.

Properties ^^^

| Property | Type | Description |
| --- | --- | --- |
| ZoneName | string | The name of the zone that will be used on the page details page when deciding where to place a block. |

### Example

```
<Rock:Zone ZoneName="Main" />
```

---

## Effects {#effects}

*What effects do you have access to in Rock Mobile?*

An effect is something that is applied to an element in XAML to change it's default appearance or behavior. Usually this is something that is platform specific, though not always.

## Example Effect

```
<StackLayout>
    <!-- StackLayout content goes here -->
    <StackLayout.Effects>
        <!-- Effects would go here to apply to the element -->
    </StackLayout.Effects>
</StackLayout>
```

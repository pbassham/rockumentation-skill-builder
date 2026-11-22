---
description: Use when you need to dynamically modify view properties or styling in response to user actions in Rock Mobile XAML layouts
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile3.0

There may be times you want to modify the appearance of something or hide it completely, in response to a user action. This command will let you change a property value on a view in your XAML. Here are a few quick examples:

Note

You might be tempted to try disabling the button that the command is attached to. This will most likely not work. When the command finishes executing the button will be automatically re-enabled. In these cases, you might need to hide the button and show a different, already disabled, button instead.

The `CommandParameter` must specify an instance of the `SetViewPropertyParameters` object.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| View | View | The view that will have its property value changed. |
| Name | string | The name of the property to change. |
| Value | object | The value to set. This will almost always be given as a string, but it will be automatically converted just as if you typed the same value into a normal XAML property. |
| Values | ICollection<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | A collection of parameters that describe the properties and their values to set. This is the default content property, meaning you would just add [Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter) nodes as child elements if you use this. |

You may notice above that there are two ways to set a property value. If you are only setting a single value you will probably find the `Name` and `Value` properties easier to deal with. But you can also set multiple properties at one time by using the `Values` collection instead. You cannot set properties on multiple views; for that, you would need to use multiple SetViewProperty commands.

## Examples

This first example demonstrates a simple action. When the button is tapped then the style class will change from success to danger.

```
<Button Text="Tap Me"
    x:Name="myButton"
    StyleClass="btn,btn-success"
    Command="{Binding SetViewProperty}"
    CommandParameter="{Rock:SetViewPropertyParameters View={x:Reference myButton}, Name=StyleClass, Value='btn,btn-danger'}" />
```

Our next example will show a more advanced version that changes two properties. We are going to do the same transition to a danger button, but also change the text displayed in the button. The first example showed the concise form, but it's a bit harder to read because of how long that string is. The second example will also show the more verbose form, which is a bit easier to read.

```
<Button Text="Tap Me"
    x:Name="myButton2"
    StyleClass="btn,btn-success"
    Command="{Binding SetViewProperty}">
    <Button.CommandParameter>
        <Rock:SetViewPropertyParameters View="{x:Reference myButton2}">
            <Rock:Parameter Name="StyleClass"
                Value="btn,btn-danger" />
            <Rock:Parameter Name="Text"
                Value="Tapped" />
        </Rock:SetViewPropertyParameters>
    </Button.CommandParameter>
</Button>
```

Our final example shows how to modify two views in response to a single action using the [AggregateCommand](https://community.rockrms.com/developer/mobile-docs/commands/aggregatecommand). In this case, we want to disable the button after it is tapped. But since we can't directly modify the IsEnabled property (since it gets re-enabled after the command finishes) we have to swap it out with a different button. Instead, we first make "myButton3" visible and then make "myButton4" invisible.

```
<Button Text="Tap Me"
    x:Name="myButton3"
    StyleClass="btn,btn-success"
    IsEnabled="False"
    IsVisible="False" />

<Button Text="Tap Me"
    x:Name="myButton4"
    StyleClass="btn,btn-success"
    Command="{Binding AggregateCommand}">
    <Button.CommandParameter>
        <Rock:AggregateCommandParameters>
            <Rock:CommandReference Command="{Binding SetViewProperty}">
                <Rock:SetViewPropertyParameters View="{x:Reference myButton3}"
                    Name="IsVisible"
                    Value="True" />
            </Rock:CommandReference>
            <Rock:CommandReference Command="{Binding SetViewProperty}">
                <Rock:SetViewPropertyParameters View="{x:Reference myButton4}"
                    Name="IsVisible"
                    Value="False" />
            </Rock:CommandReference>
        </Rock:AggregateCommandParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [SetPageTitle](https://community.rockrms.com/developer/mobile-docs/commands/setpagetitle) changes the page title.
- [ScrollToVisible](https://community.rockrms.com/developer/mobile-docs/commands/scrolltovisible) scrolls a view into sight.

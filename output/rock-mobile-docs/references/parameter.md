> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Parameter

# Parameter

M v1.0

The parameter control is not actually a visual control. However, you will see it used by various other controls, such as the [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker). Additionally, nearly all commands use the Parameter control to let you pass information to the command handler.

One of the things that makes this such a powerful element is that it supports binding. Both the `Name` and `Value` properties can be bound to another element. For example, you can bind the `Value` property to a text input field that the user fills in and then pass that data back to your block on the server.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the parameter. This can be either the displayed name or the name used, for example, in a query string parameter key. |
| Value | object | The value to be associated with the name. |

### Example

```
<StackLayout>
    <Rock:FieldContainer>
        <Rock:TextBox x:Name="tbSearch" Label="Search For" />
    </Rock:FieldContainer>

    <Button StyleClass="btn,btn-primary"
            Text="Search"
            Command="{Binding PushPage}">
        <Button.CommandParameter>
            <Rock:PushPageParameters PageGuid="8fedc079-e133-4577-bc11-35c24d5e439e">
                <Rock:Parameter Name="q"
                                Value="{Binding Source={x:Reference tbSearch}, Path=Text}" />
            </Rock:PushPageParameters>
        </Button.CommandParameter>
    </Button>
</StackLayout>
```

In the above example, we display a text box to the user as well as a button. When the button is tapped, we transition to a new page. That new page is passed a parameter of `q` whose value is whatever the user typed in the search box.

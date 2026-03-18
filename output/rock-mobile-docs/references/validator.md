> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Validator

# Validator

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

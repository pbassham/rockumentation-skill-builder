> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Command Reference

# Command Reference

Provide a command as a parameter for something else.

The `CommandReference` object is defined like a normal command reference:

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Command | ICommand | The command to be executed. |
| CommandParameter | object | The parameter to be passed to the command. In M v3.0 this became the default content property, so you can specify the parameter as a direct child node. |

Examples ^^^

```
<Button Text="Tap"
        Command="{Binding AggregateCommand}">
    <Button.CommandParameter>
        <Rock:AggregateCommandParameters>
            <Rock:CommandReference Command="{Binding SetContext}">
                <Rock:CommandReference.CommandParameter>
                    <Rock:SetContextParameters Name="Campus"
                                               Value="0a3a20eb-c4a8-44fe-9daf-d22b88fae377" />
                </Rock:CommandReference.CommandParameter>
            </Rock:CommandReference>
            <Rock:CommandReference Command="{Binding ReplacePage}"
                                   CommandParameter="b06173ed-aa2f-43d8-bd38-eb5becca1cbe" />
        </Rock:AggregateCommandParameters>
    </Button.CommandParameter>
</Button>
```

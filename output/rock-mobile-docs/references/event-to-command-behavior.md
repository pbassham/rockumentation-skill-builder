> **Path:** Mobile Docs > 🧱 Essentials > Controls > Behaviors > Event To Command Behavior

# Event To Command Behavior

Attach commands to events.

M v7.0

*Inherits from* [*EventToCommandBehavior*](https://learn.microsoft.com/en-us/dotnet/communitytoolkit/maui/behaviors/event-to-command-behavior)

The **EventToCommandBehavior** lets you link a command to an event in your UI. For example, the Text Editor control has a **TextChanged** event. With this behavior, you can trigger a command whenever that event occurs—like showing a toast notification every time the text is modified.

**Examples**

```
<Rock:FieldContainer>
    <Rock:TextEditor>
        <Rock:TextEditor.Behaviors>
            <Rock:EventToCommandBehavior EventName="TextChanged"
                Command="{Binding ShowToast}"
                CommandParameter="The text has been changed." />
        </Rock:TextEditor.Behaviors>
    </Rock:TextEditor >
</Rock:FieldContainer>
```

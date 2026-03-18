> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Execute Command

# Execute Command

*Allows a command to be executed upon initialization (and repeated).*

M v7.0

Inherits from [Microsoft.Maui.Controls.ContentView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/contentview?view=net-maui-8.0)

The `ExecuteCommand` control is a simple and flexible way to execute commands with customizable timing and repetition. It’s ideal for use cases like delayed actions or periodic updates.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Delay | int | The delay interval (in milliseconds) before the command executes. |
| Enabled | bool | Can be use to turn on/off the command. |
| Repeat | bool | Indicates if the command should repeat. Repeat indefinitely if RepeatCount is not specified. |
| RepeatCount | int | The number of times the command repeats. Use -1 for unlimited. |
| StartWithExecution | bool | If true, the command executes immediately before starting the delay timer. |
| Command | ICommand | The command to execute. |
| CommandParameter | object | A parameter passed to the command when executed |

## Example

In this example we used in an app to welcome people with a periodic toast message like, "Welcome to Rock Solid Church!!".

```
<Rock:ExecuteCommand
    Command="{Binding ShowToast}"
    CommandParameter="Welcome to Rock Solid Church!!"
    Delay="3000"
    Repeat="true" />
```

-   Command: Bound to the `ShowToast` command, which handles the logic for displaying the message.
-   CommandParameter: Passes the string `"Welcome to Rock Solid Church!!"` as a parameter to the command.
-   Delay: Specifies a 3-second delay (3000 ms) before executing the command.
-   Repeat: Ensures the command executes repeatedly (Repeat indefinitely if the `RepeatCount` is not specified).

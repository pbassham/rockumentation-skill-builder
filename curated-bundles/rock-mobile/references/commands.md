---
description: "Use when asking about how to handle button taps, gestures, and user interactions in Rock Mobile applications using Commands and CommandParameters"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

The .NET MAUI framework and the Rock Mobile application shell both utilize *Commands* to manage most actions and events. When a button is tapped, a Command executes. Typically, a Command is accessible via a `Command` property, although sometimes a view may support multiple Commands, in which case their names vary. Additionally, each Command can accept a parameter to fine-tune how it performs its task.

Since all Commands follow the same structure, you can use any Command anywhere. For instance, a Command configured for a button to open a browser window can also be assigned to a swipe gesture, enabling a browser to open when an individual swipes the screen.

Each Command has its own page in this section. Here’s how to set up a button to open a browser window when tapped:

```
<Button Text="Search"
    StyleClass="btn, btn-primary"
    Command="{Binding OpenBrowser}"
    CommandParameter="https://www.google.com/search?q=rockrms" />
```

Here, we bind the button's `Command` to the built-in `OpenBrowser` handler and pass the URL via the `CommandParameter`. Now, let’s add a textbox where an individual can enter a search term, using that term in the URL.

```
<Rock:FieldContainer>
    <Rock:TextBox Label="Search"
        x:Name="SearchTerm" />
</Rock:FieldContainer>

<Button Text="Search"
    StyleClass="btn, btn-primary"
    Command="{Binding OpenBrowser}">
    <Button.CommandParameter>
        <Rock:OpenBrowserParameters Url="https://www.google.com/search">
            <Rock:Parameter Name="q"
                Value="{Binding Text, Source={x:Reference SearchTerm}}" />
        </Rock:OpenBrowserParameters>
    </Button.CommandParameter>
</Button>
```

In this example, we create an inline object in XAML within the `CommandParameter` property of the button. The `<Rock:OpenBrowserParameters>` object sets the base URL, and the nested parameters are appended as query strings. We define a parameter `q`, which Google uses for the search term. By binding the textbox's value with `{Binding Text, Source={x:Reference SearchTerm}}`, we capture the input text from `SearchTerm` and insert it as the query value.

Now, we have a search button that opens a search results page using the text input without writing a single line of code!

Most Commands support a simplified form for `CommandParameter`. As seen in the `OpenBrowser` example, a static URL can be passed directly if no custom parameters are needed. Each Command specifies the forms its `CommandParameter` can accept.

Many Commands work within a block’s context (except for the `Callback` Command, which only functions in Content-derived blocks). While most Commands are accessible outside a block, such as in a flyout menu, some require page-specific context, like `ShowActionPanel`, which needs to know the page to overlay the panel.

## Shorthand Syntax

Command parameter objects also support a shorthand form for XAML extensions, which simplifies the syntax. Here’s a comparison:

```
<Button Text="Scroll"
    Command="{Binding ScrollToVisible}">
    <Button.CommandParameter>
        <Rock:ScrollToVisibleParameters Anchor="{x:Reference myLabel}"
            Position="Start" />
    </Button.CommandParameter>
</Button>
```

Using the shorthand, this becomes:

```
<Button Text="Scroll"
    Command="{Binding ScrollToVisible}"
    CommandParameter="{Rock:ScrollToVisibleParameters Anchor={x:Reference myLabel}, Position=Start}" />
```

This condensed syntax is more succinct but doesn’t support arrays in parameters. When values contain commas, they should be enclosed in single quotes within the double-quoted property string.

```
<Button Text="Send"
    Command="{Binding SendSms}"
    CommandParameter="{Rock:SendSmsParameters Message='Hello, Dave.', Recipients=1558881234}" />
```

## Running Several Commands

**Use [AggregateCommand](https://community.rockrms.com/developer/mobile-docs/commands/aggregatecommand) when one tap should run more than one Command.** A button has a single `Command` property, so on a button it’s the only option. On other views you can attach several `TapGestureRecognizer` elements instead, but the two don’t behave the same:

- **Order.** `AggregateCommand` runs its Commands one at a time and waits for each to finish before starting the next. Separate gesture recognizers all start on the same tap without waiting, so a slower Command, like `Callback` or `PushPage`, can finish after one listed below it.
- **Repeats.** A Command ignores new requests while it’s still running. With separate recognizers, a second use of the same Command on the same tap is dropped. `AggregateCommand` runs it again once the first one finishes.
- **Popups.** `AggregateCommand` reads all of its Commands before running the first, so a `ClosePopup` that clears the binding context doesn’t cancel the Commands after it.

Separate recognizers are fine when the Commands are independent and order doesn’t matter, such as writing an interaction next to a navigation. Otherwise, use AggregateCommand:

```
<Button Text="Save"
    Command="{Binding AggregateCommand}">
    <Button.CommandParameter>
        <Rock:AggregateCommandParameters>
            <Rock:CommandReference Command="{Binding ShowToast}"
                CommandParameter="Saved" />
            <Rock:CommandReference Command="{Binding PopPage}" />
        </Rock:AggregateCommandParameters>
    </Button.CommandParameter>
</Button>
```

## Nested Bindings

Complex binding scenarios often arise with nested action items like `ShowCoverSheet`, `ShowActionPanel`, and `ShowPopup`. These items may require additional `BindingContext` references to maintain functionality at deeper nesting levels, as demonstrated below:

```
<Button Text="Options"
    x:Name="ActionButton"
    Command="{Binding ShowActionPanel}">
    <Button.CommandParameter>
        <Rock:ShowActionPanelParameters Title="Options"
            CancelTitle="Cancel">
            <Rock:ActionPanelButton Title="Save and Continue"
                Command="{Binding BindingContext.AggregateCommand, Source={x:Reference ActionButton}}">
                <Rock:ActionPanelButton.CommandParameter>
                    <Rock:AggregateCommandParameters>
                        <Rock:CommandReference Command="{Binding BindingContext.ShowToast, Source={x:Reference ActionButton}}"
                            CommandParameter="Saved" />
                        <Rock:CommandReference Command="{Binding BindingContext.PushPage, Source={x:Reference ActionButton}}"
                            CommandParameter="2cda9cfc-4717-4455-bfc2-633735cda86f" />
                    </Rock:AggregateCommandParameters>
                </Rock:ActionPanelButton.CommandParameter>
            </Rock:ActionPanelButton>
        </Rock:ShowActionPanelParameters>
    </Button.CommandParameter>
</Button>
```

In this configuration, each binding reads its Command from the button’s `BindingContext` through `x:Reference`, so the Commands stay connected to the correct data context at each level.

## Navigate Mode

Some blocks include a setting called *Navigate Mode*, which lets you control how navigation to another page should happen. The available options align with specific page navigation commands.

To keep things simple, let’s walk through an example: imagine the current navigation stack has two pages. `PageA` is the root or home page, and someone has navigated from there to `PageB`. Now, we want to navigate to a new page, `PageC`, and see how different Navigate Modes affect the stack.

| Value | Description |
| --- | --- |
| Push | Pushes a new page onto the navigation stack. If the user presses the back button they will be brought back to PageB |
| Replace | Replaces the current page with the new page. If the user presses the back button they will be taken to PageA |
| Show | Replaces the entire navigation stack with the new page. There will be no back button for the user to press. |

---

## AddEventToCalendar {#addeventtocalendar}

Mobile3.0

You finally did it. You built that (almost) perfect calendar event detail page. It looks pretty, it shows all the information. You even got the time zone right! If only you could have that "Add to Calendar" button like everybody else.

Well, now your calendar event detail page *can* be perfect. This command allows you to specify all the details of a one-time event and add it to the user's default calendar.

The first time this command (or any other that accesses the calendar) is used it will prompt the user to allow access to their calendars.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| StartDateTime | DateTime | The start date and time of the event. If you provide any time zone information here it will be ignored. |
| EndDateTime | DateTime | The end date and time of the event. If you leave this blank then the time information from the StartDateTime will be dropped and it will become an all day event. |
| Title | string | The title (or name) of the event. Space is often limited when displaying the title so remember to keep it short. |
| Notes | string | Additional notes about the event. Think of this as the details when opened information. |
| Location | string | The location of the event. This can technically be anything you like such as "Main Auditorium", but if you put in an actual address then devices will usually make it link to the maps application. |
| Url | string | A URL that the user can follow to get more information about the event. |
| TimeZoneId | string | The IANA time zone identifier that the StartDateTime and EndDateTime are in. For example, "America/Phoenix". [Time zone reference sheet](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) |
| AlarmInMinutes | int | If set then an alarm will be added to the event that triggers this many minutes before the event happens. |

The following properties are required at a bare minimum:

- StartDateTime
- Title
- TimeZoneId
```
<Button Text="Add to Calendar"
    Command="{Binding AddEventToCalendar}">
    <Button.CommandParameter>
        <Rock:AddEventToCalendarParameters Title="Rock Solid Finances Class"
            StartDateTime="2021-07-04 18:30:00"
            EndDateTime="2021-07-04 20:00:00"
            Location="3120 W Cholla St, Phoenix AZ, 85029-4113"
            Url="https://www.rocksolidchurchdemo.com/page/414?EventOccurrenceId=3"
            TimeZoneId="America/Phoenix" />
    </Button.CommandParameter>
</Button>
```

---

## AggregateCommand {#aggregatecommand}

Mobile1.0

This is a special-use command. It allows you to chain multiple commands together. A common usage of this would be to combine the `SetContext` and `ReplacePage` commands to change an Entity context and then reload the current page.

You specify the child commands to execute by using an instance of the `AggregateCommandParameters` object.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Commands | ICollection<[CommandReference](https://community.rockrms.com/developer/mobile-docs/commands/command-reference)\> | The collection of commands that will be executed. This is the default property so you don't need to explicitly specify it. |

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

## Related

- [Command Reference](https://community.rockrms.com/developer/mobile-docs/commands/command-reference) passes a command and its parameter to something else.
- [Execute Command](https://community.rockrms.com/developer/mobile-docs/commands/execute-command) runs a command when it loads, and can repeat it.

---

## Callback {#callback}

Mobile1.0

Some blocks, currently just the `Content` block, support what is called Callbacks. You can learn more about these in the [Advanced: Dynamic Content](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics) and the [Developer](https://community.rockrms.com/developer/mobile-docs/developers/custom-blocks) chapters. But, for our purposes here, you can think of these as an API call back to the server's logic for the block.

If the `CommandParameter` is a plain string, then it is used as the name of the callback function to be queried on the server. If you need to pass any parameters to that function then `CommandParameter` should point to an instance of the `CallbackParameters` object.

Note

A callback runs a block action on the Content block, so the person must be able to view both the page and the block. If they can't, the block's content is replaced with an error message.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the callback to be called on the server. *(Required Field)* |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Any parameters that will be passed to the callback function. |
| Validator | [Validator](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/validator) | Optional reference to a validator that will be executed before sending the command to the block. If the validator fails then the command is not sent. |

## Examples

```
<Button Text="Tap"
    Command="{Binding Callback}"
    CommandParameter="CallbackName" />
```
```
<Button Text="Tap"
    Command="{Binding Callback}">
    <Button.CommandParameter>
        <Rock:CallbackParameters Name="CallbackName">
            <Rock:Parameter Name="GroupId"
                Value="18" />
        </Rock:CallbackParameters>
    </Button.CommandParameter>
</Button>
```

See [Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content) for the block that handles these callbacks.

---

## CallPhoneNumber {#callphonenumber}

Mobile1.0

We're sure you can think of other uses, but wouldn't it be nice if your application had your church's phone number displayed somewhere and the user could just tap on it to call your church office? Yep. That would be nice. If only the user was on a phone or something like that.

The `CommandParameter` specifies the phone number to be dialed, if it's blank then nothing will happen.

Note

This command needs a device that can place calls. On most tablets and simulators, nothing happens.

```
<Button Text="Tap"
    Command="{Binding CallPhoneNumber}"
    CommandParameter="15552138874" />
```

## Related

- [SendEmail](https://community.rockrms.com/developer/mobile-docs/commands/sendemail) starts a new email.
- [SendSms](https://community.rockrms.com/developer/mobile-docs/commands/sendsms) starts a new text message.

---

## ClearUserPreferences {#clearuserpreferences}

Mobile4.0

Removes every user preference saved on the device. That includes the values saved with [SetUserPreference](https://community.rockrms.com/developer/mobile-docs/commands/setuserpreference) and the preferences that blocks save for the person on the device. Use it for a reset action, such as a "Reset my preferences" button on a settings page.

The command takes no `CommandParameter`. Any value you pass is ignored.

Note

Only keys that start with `user-preference-` are removed. Other values saved with SetAppValue stay in place. Preferences are never sent to Rock, so this only affects the device the person is using.

## Examples

```
<Button Text="Reset Preferences"
    StyleClass="btn, btn-secondary"
    Command="{Binding ClearUserPreferences}" />
```

## Related

- [SetAppValue](https://community.rockrms.com/developer/mobile-docs/commands/setappvalue) stores an app value you can read later in Lava.
- [SetUserPreference](https://community.rockrms.com/developer/mobile-docs/commands/setuserpreference) saves a single preference on the device.

---

## CloseCoverSheet {#closecoversheet}

Mobile4.0

Closes any open [Cover Sheet](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cover-sheet).

```
<Button Text="Tap"
    Command="{Binding CloseCoverSheet}" />
```

See [Cover Sheet](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cover-sheet) for how cover sheets look and behave.

## Related

- [ShowCoverSheet](https://community.rockrms.com/developer/mobile-docs/commands/showcoversheet) opens a page as a cover sheet.

---

## ClosePopup {#closepopup}

Mobile1.0

This command is the opposite of the [ShowPopup](https://community.rockrms.com/developer/mobile-docs/commands/showpopup) command. If there is an open popup then it will be closed. This command takes no parameters.

```
<Button Text="Close"
    Command="{Binding ClosePopup}" />
```

## Related

- [ShowPopup](https://community.rockrms.com/developer/mobile-docs/commands/showpopup) opens a page as a popup.

---

## Command Reference {#command-reference}

Mobile1.0

Provide a command as a parameter for something else.

The `CommandReference` object is defined like a normal command reference:

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Command | ICommand | The command to be executed. |
| CommandParameter | object | The parameter to be passed to the command. In Mobile3.0 this became the default content property, so you can specify the parameter as a direct child node. |

## Examples

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

## Related

- [AggregateCommand](https://community.rockrms.com/developer/mobile-docs/commands/aggregatecommand) runs several commands in order.
- [Execute Command](https://community.rockrms.com/developer/mobile-docs/commands/execute-command) runs a command when it loads, and can repeat it.

---

## CopyToClipboard {#copytoclipboard}

Mobile7.0

This command sets text to the user's clipboard through the CommandParameter. It enhances the person experience by simplifying copy-and-paste actions.

The `CommandParameter` accepts a string representing the text to be copied to the person clipboard.

```
<Button Text="Copy to Clipboard"
    Command="{Binding CopyToClipboard}"
    CommandParameter="This text will be copied to your clipboard" />
```

## Related

- [ShareContent](https://community.rockrms.com/developer/mobile-docs/commands/sharecontent) opens the share sheet for text or a link.
- [ShareWithContact](https://community.rockrms.com/developer/mobile-docs/commands/sharewithcontact) shares something with one of the person's contacts.
- [ShareViewImage](https://community.rockrms.com/developer/mobile-docs/commands/shareviewimage) shares an image of a view on the page.

---

## CreateEntitySetAndNavigate {#createentitysetandnavigate}

Mobile6.0

This command is pretty complex. It does two things... First it generates an Entity Set based on the provided parameters and then performs a Navigation command with an appended query string of the entity set value.

Warning

This command calls `POST api/EntitySets/CreateFromItems/{entityTypeGuid}`, which needs Edit permission on that action of the EntitySets REST controller. You set it under Admin Tools \> Security \> REST Controllers. Starting with Core v16, grant it to the 'RSR - Mobile Application Users' role. Earlier versions use 'All Authenticated Users'. Without it, people see "You are not authorized to generate an entity set." and the app doesn't navigate.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| TimeToExpire | int | The amount of time (in minutes) before the entity set expires. |
| QueryStringParameterKey | string | The key associated with the newly generated Entity Set that will be passed along through the query string. Defaults to EntitySetGuid. |
| EntityTypeGuid | Guid | The Guid of the type of entity this entity set is in relation to. |
| EntityItemGuids | List<string\> | A list of the string Guid entity set items. You should only include entities that are of the same type provided by the EntityTypeGuid. |
| NavigateCommand | CommandReference | The navigation command to execute with the new entity set query string parameter. |

```
<Button Text="Create Entity Set And Navigate"
    Command="{Binding CreateEntitySetAndNavigate}">
    <Button.CommandParameter>
        <Rock:CreateEntitySetAndNavigateParameters EntityTypeGuid="72657ED8-D16E-492E-AC12-144C5E7567E7">
            <Rock:CreateEntitySetAndNavigateParameters.EntityItemGuids>
                <x:String>66D0FD8B-BFA0-41EA-8DAD-000040D0890D</x:String>
                <x:String>EE161CC8-5C25-4BA2-9E41-0000C8B80A39</x:String>
            </Rock:CreateEntitySetAndNavigateParameters.EntityItemGuids>
            <Rock:CreateEntitySetAndNavigateParameters.NavigateCommand>
                <Rock:CommandReference Command="{Binding PushPage}"
                    CommandParameter="f0ef45ac-4eb8-4ad1-b817-408d7d7fe0fc" />
            </Rock:CreateEntitySetAndNavigateParameters.NavigateCommand>
        </Rock:CreateEntitySetAndNavigateParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [SetContext](https://community.rockrms.com/developer/mobile-docs/commands/setcontext) sets an entity context value for the page.

---

## DownloadPass {#downloadpass}

Mobile5.0

This command adds a pass to the device wallet. Provide a URL that serves a pass file as the command parameter.

On iOS, the command downloads the file at the URL and hands the bytes to Apple Wallet (PassKit), prompting the individual to add the pass without leaving the app. The URL must return a valid `.pkpass` payload.

Android has no in-app wallet install, so the command opens the URL in an external browser. What happens next is up to that page or server.

The command is not tied to any pass provider. Any URL that returns a valid `.pkpass` file works, whether it comes from a Rock workflow, a file on your server, or a third-party pass service.

Because the platforms behave differently, decide whether the button should appear on Android at all, and if so, where it should send them. See [OnPlatform](https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/customize-ui-appearance) for varying content by device platform.

```
<Button Text="Download Pass"
    Command="{Binding DownloadPass}"
    CommandParameter="https://church.com/pass.pkpass" />
```

---

## EnablePushNotifications {#enablepushnotifications}

Mobile2.0

Normally, notifications are enabled by the application automatically on launch or during the onboarding process of a new user. But sometimes you might want to display a custom page that talks about why you are going to be sending them push notifications to encourage a better response. This command allows you to initiate the request to enable push notifications.

You might want to check out the Push Notification documentation for an example of how to integrate this command with UI that updates automatically based on notifications being enabled or disabled.

The optional `CommandParameter` is an instance of the `EnablePushNotificationsParameters` object that is outlined below.

Note

This command only works when push notifications are set up for the app, and the person still has to allow notifications on the device. See [Push Notifications](https://community.rockrms.com/developer/mobile-docs/app-factory/push-notifications) for the setup.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| EnabledMessage | string | The message that will be displayed if notifications have been enabled by the individual. Set to an empty string to not show this message. *Defaults to* *You're all set to receive push notifications.* |
| DisabledMessage | string | The message that will be displayed if notifications have been disabled by the individual. Set to an empty string to not show this message. *Defaults to* *Looks like you didn't allow push notifications. If you need to turn them on you can do that in your Settings app.* |

Note

Be aware that Android does not ever show a popup message. Instead, it will just automatically enable notifications and then show your EnabledMessage.

## Related

- [OpenAppSettings](https://community.rockrms.com/developer/mobile-docs/commands/openappsettings) opens the app's settings on the device, where the person can turn permissions back on.

---

## EndLiveActivity {#endliveactivity}

Mobile20.0  iOS16.1

Ends a Live Activity that was started with `StartLiveActivity`. Use it when the thing the activity tracks is over, such as when a child is checked out or a service has started.

The `CommandParameter` can be the activity's key as a string. To remove the activity from the Lock Screen right away, pass a `LiveActivityParameters` object with `Immediate` set to `True`. Otherwise iOS may leave the ended activity on the Lock Screen for a while.

Warning

Always end an activity that shows a sensitive detail, such as a check-in security code, with `Immediate` set.

Note

Your app must be built with Live Activities turned on. In apps built without it, this command does nothing.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| ActivityKey | string | The key the activity was started with. Required. |
| Immediate | bool | Removes the activity from the Lock Screen right away instead of letting iOS leave it there for a while. Defaults to `false`. |

## Examples

```
<Button Text="End Countdown"
    Command="{Binding EndLiveActivity}"
    CommandParameter="service" />
```
```
<Button Text="Check Out"
    Command="{Binding EndLiveActivity}">
    <Button.CommandParameter>
        <Rock:LiveActivityParameters ActivityKey="checkin"
            Immediate="True" />
    </Button.CommandParameter>
</Button>
```

## Related

- [StartLiveActivity](https://community.rockrms.com/developer/mobile-docs/commands/startliveactivity) starts a Live Activity.
- [UpdateLiveActivity](https://community.rockrms.com/developer/mobile-docs/commands/updateliveactivity) changes what a running Live Activity shows.

---

## Execute Command {#execute-command}

Mobile7.0

*Inherits from [ContentView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/contentview)*

The `ExecuteCommand` control is a simple and flexible way to execute commands with customizable timing and repetition. It’s ideal for use cases like delayed actions or periodic updates.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Delay | int | The delay interval (in milliseconds) before the command executes. |
| Enabled | bool | Can be used to turn on/off the command. |
| Repeat | bool | Indicates if the command should repeat. Repeat indefinitely if RepeatCount is not specified. |
| RepeatCount | int | The number of times the command repeats. Use -1 for unlimited. |
| StartWithExecution | bool | If true, the command executes immediately before starting the delay timer. |
| Command | ICommand | The command to execute. |
| CommandParameter | object | A parameter passed to the command when executed |

## Example

In this example we used in an app to welcome people with a periodic toast message like, "Welcome to Rock Solid Church!!".

```
<Rock:ExecuteCommand Command="{Binding ShowToast}"
    CommandParameter="Welcome to Rock Solid Church!!"
    Delay="3000"
    Repeat="true" />
```
- Command: Bound to the `ShowToast` command, which handles the logic for displaying the message.
- CommandParameter: Passes the string `"Welcome to Rock Solid Church!!"` as a parameter to the command.
- Delay: Specifies a 3-second delay (3000 ms) before executing the command.
- Repeat: Ensures the command executes repeatedly (Repeat indefinitely if the `RepeatCount` is not specified).

## Related

- [AggregateCommand](https://community.rockrms.com/developer/mobile-docs/commands/aggregatecommand) runs several commands in order.
- [Command Reference](https://community.rockrms.com/developer/mobile-docs/commands/command-reference) passes a command and its parameter to something else.

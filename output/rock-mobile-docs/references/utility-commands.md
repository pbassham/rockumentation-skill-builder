> **Path:** Mobile Docs > 🧱 Essentials > Commands > Utility Commands

# Utility Commands

## AddEventToCalendar

M v3.0

You finally did it. You built that (almost) perfect calendar event detail page. It looks pretty, it shows all the information. You even got the time zone right! If only you could have that "Add to Calendar" button like everybody else.

Well, now your calendar event detail page *can* be perfect. This command allows you to specify all the details of a one-time event and add it to the user's default calendar.

The first time this command (or any other that accesses the calendar) is used it will prompt the user to allow access to their calendars.

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

-   StartDateTime
-   Title
-   TimeZoneId

```
<Button Text="Add to Calendar" Command="{Binding AddEventToCalendar}">
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

## AggregateCommand

This is a special-use command. It allows you to chain multiple commands together. A common usage of this would be to combine the `SetContext` and `ReplacePage` commands to change an Entity context and then reload the current page.

You specify the child commands to execute by using an instance of the `AggregateCommandParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| Commands |   ICollection<[CommandReference](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/command-reference)\>   | The collection of commands that will be executed. This is the default property so you don't need to explicitly specify it. |

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

## Callback

Some blocks, currently just the `Content` block, support what is called Callbacks. You can learn more about these in the [Advanced: Dynamic Content](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics) and the [Developer](https://community.rockrms.com/developer/mobile-docs/developers/custom-blocks) chapters. But, for our purposes here, you can think of these as an API call back to the server's logic for the block.

If the `CommandParameter` is a plain string, then it is used as the name of the callback function to be queried on the server. If you need to pass any parameters to that function then `CommandParameter` should point to an instance of the `CallbackParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the callback to be called on the server. *(Required Field)* |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | Any parameters that will be passed to the callback function. |
| Validator | [Validator](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/validator) | Optional reference to a validator that will be executed before sending the command to the block. If the validator fails then the command is not sent. |

**Examples**

```
<Button Text="Tap"
    Command="{Binding Callback}"
    CommandParameter="UserTap" />
```

```
<Button Text="Tap"
    Command="{Binding Callback}">
    <Button.CommandParameter>
        <Rock:CallbackParameters>
            <Rock:Parameter Name="GroupId" Value="18" />
        </Rock:CallbackParameters>
    </Button.CommandParameter>
</Button>
```

## CopyToClipboard

This command sets text to the user's clipboard through the CommandParameter. It enhances the person experience by simplifying copy-and-paste actions.

The `CommandParameter` accepts a string representing the text to be copied to the person clipboard.

```
<Button Text="Copy to Clipboard"
    Command="{Binding CopyToClipboard}"
    CommandParameter="This text will be copied to your clipboard" />
```

## DownloadPass

M v5.0

This command can be used to download a pass directly to Apple Wallet (with user permission), providing a nicer experience when adding a pass without having to go through a browser intermediary.

Consider hiding this functionality on Android since it is mainly intended for iOS. On Android, this command will simply open an external browser with the URL matching the command parameter.

To show/hide content based on the device platform, check out the [OnPlatform extension](https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/customize-ui-appearance#customize-ui-appearance-with-a-markup-extension-based-on-the-platform).

```
<Button Text="Download Pass"
    Command="{Binding DownloadPass}"
    CommandParameter="https://church.com/pass.pkpass" />
```

## EnablePushNotifications

M v2.0

Normally, notifications are enabled by the application automatically on launch or during the onboarding process of a new user. But sometimes you might want to display a custom page that talks about why you are going to be sending them push notifications to encourage a better response. This command allows you to initiate the request to enable push notifications.

You might want to check out the [Push Notification State](https://community.rockrms.com/developer/mobile-docs/essentials/tips-and-tricks#push-notification-state) section for an example of how to integrate this command with UI that updates automatically based on notifications being enabled or disabled.

The optional `CommandParameter` is an instance of the `EnablePushNotificationsParameters` object that is outlined below.

| Property | Type | Description |
| --- | --- | --- |
| EnabledMessage | string | The message that will be displayed if notifications have been enabled by the individual. Set to an empty string to not show this message. *Defaults to* *You're all set to receive push notifications.* |
| DisabledMessage | string | The message that will be displayed if notifications have been disabled by the individual. Set to an empty string to not show this message. *Defaults to* *Looks like you didn't allow push notifications. If you need to turn them on you can do that in your Settings app.* |

Note

Be aware that Android does not ever show a popup message. Instead, it will just automatically enable notifications and then show your EnabledMessage.  

## Logout

M v1.0

This command will allow you to logout the current person from the application. It will then redirect to the homepage.

The `CommandParameter` can be one of the following items: M v2.0

-   A string that contains either the value "True" to indicate that the current page should be reloaded, or the Guid of the page to show instead of the home page.
-   An instance of the `LogoutParameters` object that is outlined below.

| Property | Type | Description |
| --- | --- | --- |
| ReloadPage | bool |   If true then the current page is reloaded instead of navigating away. *Defaults to* *false**.* |
| PageGuid | Guid? |   The page to navigate to instead of the home page. *Defaults to* *null**.* |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   |   Optional parameters to pass to the page in the query string. *Defaults to* *empty**.* |

```
<Button Text="Logout" 
    Command="{Binding Logout}" />
```

## PrayForRequest 

M v3.0 C v13.0

Prayer is a big thing for churches, at least it should be. To that end, we wanted to make prayer in your mobile applications as easy as possible. Rather than being limited to specific blocks that support prayer, we decided to give you a command that is available in any block. Using this command you can easily add "Pray" buttons to any page and any content block.

The `CommandParameter` can either be a plain string that represents the unique identifier (Guid) of the prayer request, or it can be an instance of the `PrayForRequestParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| Guid | Guid | The unique identifier of the prayer request to be prayed for. |
| RecordInteraction | bool | By default, all pray actions will record an Interaction record in Rock. You can override that by setting this to false. *Defaults to* *true**.* |
| WorkflowTypeGuid | Guid? | The pray action can launch a workflow to let you do custom processing on the server for that pray action. Provide a Workflow Type unique identifer here to indicate which workflow should be launched. *Defaults to* *null**.* |

**Examples**

The first example is a simple Pray button. No special processing happens, it just increments the prayer count for the request.

```
<Button Text="Pray"
    StyleClass="btn,btn-primary"
    Command="{Binding PrayForRequest}"
    CommandParameter="40C6134E-994B-4B11-9711-E867D894FE1B" />
```

This second example makes use of the `PrayForRequestParameters` object to disable the interaction and also provide a workflow to be launched.

```
<Button Text="Pray"
    StyleClass="btn,btn-primary"
    Command="{Binding PrayForRequest}">
    <Button.CommandParameter>
        <Rock:PrayForRequestParameters Guid="40C6134E-994B-4B11-9711-E867D894FE1B"
            RecordInteraction="False"
            WorkflowTypeGuid="27B5E487-D451-4025-8BEB-C4EDC354617C" />
    </Button.CommandParameter>
</Button>
```

## PageEvent

M v1.0

You learned, or will learn, elsewhere that you can use Lava on the mobile shell to handle certain page events and respond to them. Normally these page events are just ones generated by the system for you. However, you can trigger your own custom page events using this command.

The `CommandParameter` can either be a plain string that indicates the event name to be triggered, or it can be an instance of the `PageEventParameters` object. This latter method allows you to pass parameters into your lava logic.

| Property | Type | Description |
| --- | --- | --- |
| Event | string | The name of the event to be triggered. |
| Parameters | List<[Parameter](https://mobiledocs.rockrms.com/essentials/controls/developer-controls/parameter)\>   | Any parameters that will be passed to the Lava engine, these manifest as lava variables. |

**Examples**

```
<Button Text="Tap"
        Command="{Binding PageEvent}"
        CommandParameter="UserTap" />
```

```
<Button Text="Tap"
        Command="{Binding PageEvent}">
    <Button.CommandParameter>
        <Rock:PageEventParameters Event="UserTap">
            <Rock:Parameter Name="GroupId" Value="18" />
        </Rock:PageEventParameters>
    </Button.CommandParameter>
</Button>
```

## PerformHapticFeedback

M v3.0

This is to perform Haptic Feedback on a user's device. If you are unfamiliar with what haptic feedback is, [here](https://www.ultraleap.com/company/news/blog/what-is-haptic-feedback/) is a good reference.

The `CommandParameter` is a string, but can be left out unless you specifically want to implement the "LongPress" type. Everything else will default to the "Click" type.

| Property | Type | Description |
| --- | --- | --- |
| HapticFeedbackType | string | The type of haptic feedback you want to implement. Only two accepted values are "Click" or "LongPress". |

**Examples**

```
// Example with no command parameter. Defaults to "Click".
<Button Text="Haptic"
    Command="{Binding PerformHapticFeedback}" />
```

```
// Example with the "LongPress" command parameter.
<Button Text="Haptic LongPress"
    Command="{Binding PerformHapticFeedback}" CommandParameter="LongPress" />
```

## ReloadApplication

M v1.0

This instructs the application to reload as if you had just forced quit and started it again. This is a development tool that saves a few seconds when debugging stuff. It's not a command you'll want to use in a public app.

The `CommandParameter` is not used and will be ignored.

```
<Button Text="Reload"
    Command="{Binding ReloadApplication}" />
```

## ReloadPage

M v1.0

This instructs the application to reload the currently displayed page.

The `CommandParameter` is not used and will be ignored.

```
<Button Text="Reload"
    Command="{Binding ReloadPage}" />
```

## ScrollToVisible

M v1.0

There are two ways to initiate this command, we'll show them below. But the basic syntax is you specify the Anchor element that should be scrolled until it becomes visible. Think of this like the HTML Anchor href, or a "jump to" button.

You can either pass the view to be made visible directly by reference in the `CommandParameter` or you can pass an instance of the `ScrollToVisibleParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| Anchor | VisualElement | The view which resides inside a ScrollView that should be made visible. |
| Position | ScrollToPosition |   The position to put the view at after scrolling (see below). Defaults to MakeVisible |
| Animated | Boolean |   Sets whether the scroll should be animated. Defaults to True |

The options you have with the `Position` parameter are as follows:

-   `MakeVisible` - Just make sure the anchor is visible on screen
-   `Start` - Attempt to scroll until the anchor is at the start (top or left) of the screen
-   `Center` - Attempt to scroll until the anchor is at the center of the screen
-   `End` - Attempt to scroll until the anchor is at the end (bottom or right) of the screen

**Examples**

```
<StackLayout>
    <Button Text="Scroll"
        Command="{Binding ScrollToVisible}"
        CommandParameter="{x:Reference myLabel}" />

    <BoxView Color="Red"
        HeightRequest="1200" />

    <Label Text="My Label"
        x:Name="myLabel" />

    <BoxView Color="Blue"
        HeightRequest="1200" />
</StackLayout>
```

The above will scroll the first ScrollView in the view tree above the Label we specified as our anchor so that the label is visible. This by itself may be just fine for what you need, but it may not end up doing what you want. By default, the anchor will be scrolled until it becomes "just visible". In this case, since we need to scroll down, the label will end up at the bottom of the screen.

To accommodate those situations, you can specify a parameters object like so.

```
<Button Text="Scroll"
    Command="{Binding ScrollToVisible}">
    <Button.CommandParameter>
        <Rock:ScrollToVisibleParameters Anchor="{x:Reference myLabel}"
            Position="Start" />
    </Button.CommandParameter>
</Button>
```

This still indicates the same Label we want to use as the Anchor, but it also specifies the position we want it to end up at. Now, this is not a forced position. If there were nothing below the label, it wouldn't be possible for it to end up at the top. But since we have a lot of content below as well, there is enough room to scroll.

Finally, due to the way XAML works, there is a shorthand to the XAML above.

```
<Button Text="Scroll"
    Command="{Binding ScrollToVisible}"
    CommandParameter="{Rock:ScrollToVisibleParameters Anchor={x:Reference myLabel}, Position=Start}" />
```

## SetAppValue

M v2.0

The mobile shell has a concept of [AppValues](https://community.rockrms.com/developer/mobile-docs/essentials/lava#appvalues). These are values that survive for the life of the application and allow you to save and read the values later. But what good are app values if you can't set them? The syntax of this command is pretty straightforward. You either provide a parameter value of just a key name; or a key name followed by an equals sign followed by a value.

```
<Button Text="Remove Value"
    Command="{Binding SetAppValue}"
    CommandParameter="KeyToRemove" />
```

```
<Button Text="Set Value"
    Command="{Binding SetAppValue}"
    CommandParameter="KeyToSet=SomeValue" />
```

To utilize an app value, you have access to an `AppValues` dictionary in Lava:

```
{{ AppValues | ToJSON }}
```

## SetContext

M v1.0

This command allows you to set an entity context value based on a user's action. For example, you could build a custom Campus Context Picker and set the context when the user taps an action button.

The parameter should be an instance of the `SetContextParameters` class, which is described below.

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the entity whose context is to be set. For example Campus.   |
| Value | Guid? | The Guid value to set the context name to. If this is left blank then the context is unset. *Defaults to null.* |

```
<Button Text="Tap"
    Command="{Binding SetContext}">
    <Button.CommandParameter>
        <Rock:SetContextParameters Name="Campus"
           Value="e4d80e57-da60-4822-bc22-c071f02958e8" />
    </Button.CommandParameter>
</Button>
```

## SetUserPreference

M v4.0

Save user-specific properties that we only store on the shell. Be careful not to go overboard with these, as they directly affect your application size. In reality, this is just a [SetAppValue](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#setappvalue) command that prefixes the key with `user-preference-`.

```
<Button Text="Set User Preference"
    Command="{Binding SetUserPreference}"
    CommandParameter="KeyToSet=SomeValue" />
```

```
<Button Text="Remove User Preference"
    Command="{Binding SetUserPreference}"
    CommandParameter="KeyToRemove" />
```

## SetViewProperty

M v3.0

There may be times you want to modify the appearance of something or hide it completely, in response to a user action. This command will let you change a property value on a view in your XAML. Here are a few quick examples:

Note

You might be tempted to try disabling the button that the command is attached to. This will most likely not work. When the command finishes executing the button will be automatically re-enabled. In these cases, you might need to hide the button and show a different, already disabled, button instead.

The `CommandParameter` must specify an instance of the `SetViewPropertyParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| View | View | The view that will have it's property value changed. |
| Name | string | The name of the property to change. |
| Value | object | The value to set. This will almost always be given as a string, but it will be automatically converted just as if you typed the same value into a normal XAML property. |
| Values | ICollection<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | A collection of parameters that describe the properties and there values to set. This is the default content property, meaning you would just add [Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter) nodes as child elements if you use this.   |

You may notice above that there are two ways to set a property value. If you are only setting a single value you will probably find the `Name` and `Value` properties easier to deal with. But you can also set multiple properties at one time by using the `Values` collection instead. You cannot set properties on multiple views; for that, you would need to use multiple SetViewProperty commands.

**Examples**

This first example demonstrates a simple action. When the button is tapped then the style class will change from success to danger.

```
<Button x:Name="myButton"
    StyleClass="btn,btn-success"
    Text="Tap Me"
    Command="{Binding SetViewProperty}"
    CommandParameter="{Rock:SetViewPropertyParameters View={x:Reference myButton}, Name=StyleClass, Value='btn,btn-danger'}" />
```

Our next example will show a more advanced version that changes two properties. We are going to do the same transition to a danger button, but also change the text displayed in the button. The first example showed the concise form, but it's a bit harder to read because of how long that string is. The second example will also show the more verbose form, which is a bit easier to read.

```
<Button x:Name="myButton2"
    StyleClass="btn,btn-success"
    Text="Tap Me"
    Command="{Binding SetViewProperty}">
    <Button.CommandParameter>
        <Rock:SetViewPropertyParameters View="{x:Reference myButton2}">
            <Rock:Parameter Name="StyleClass" Value="btn,btn-danger" />
            <Rock:Parameter Name="Text" Value="Tapped" />
        </Rock:SetViewPropertyParameters>
    </Button.CommandParameter>
</Button>
```

Our final example shows how to modify two views in response to a single action using the [AggregateCommand](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#aggregatecommand). In this case, we want to disable the button after it is tapped. But since we can't directly modify the IsEnabled property (since it gets re-enabled after the command finishes) we have to swap it out with a different button. Instead, we first make "myButton3" visible and then make "myButton4" invisible.

```
<Button x:Name="myButton3"
    StyleClass="btn,btn-success"
    Text="Tap Me"
    IsEnabled="False"
    IsVisible="False" />
<Button x:Name="myButton4"
    StyleClass="btn,btn-success"
    Text="Tap Me"
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

## ShowActionPanel

M v1.0

This action will show an action panel (think action sheet in iOS terms). This is basically a popup that contains a short message and a number of buttons the user can choose from. A common example of this would be a "reply" button in a mail application. When tapping the button it might then pop up an action sheet that contains a few buttons to help you decide what you intend to do: Reply, Reply All, Forward.

These popups usually have a Cancel button (though it's not strictly required). Additionally, you can specify a single "destructive" button that stands out to the user. Often, this would be a Delete type action and is usually styled red.

The `CommandParameter` must specify an instance of the `ShowActionPanelParameters` object.

| Property | Type | Description |
| --- | --- | --- |
| Title | string | The title of the action panel; keep it short! |
| CancelTitle | string | The text to display in the cancel button (optional). *Defaults to empty string.* |
| DestructiveButton | ActionPanelButton | Defines the button that implies a destructive operation, for example on iOS this button becomes red (optional). *Defaults to* *null**.* |
| Buttons | ICollection<ActionPanelButton> | A collection of buttons to be shown, this is the default content property meaning you would just add ActionPanelButton nodes as child elements. |

![](https://community.rockrms.com/GetImage.ashx?Id=66969)

Actions on iOS with automatic dark and light mode, revealed at the bottom of the screen

![](https://community.rockrms.com/GetImage.ashx?Id=66968)

Actions on Android that don't change with light or dark theme, revealed in the center of the screen

**Examples**

```
<Button Text="Actions"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowActionPanel}">
    <Button.CommandParameter>
        <Rock:ShowActionPanelParameters Title="My Action Sheet"
            CancelTitle="Do Nothing">
            <Rock:ShowActionPanelParameters.DestructiveButton>
                <Rock:ActionPanelButton Title="Delete"
                    Command="{Binding PushPage}"
                    CommandParameter="c258265c-9645-46f1-a69b-0e0f149e5e83" />
            </Rock:ShowActionPanelParameters.DestructiveButton>
            <Rock:ActionPanelButton Title="First Button"
                Command="{Binding OpenBrowser}"
                CommandParameter="https://www.rockrms.com" />
            <Rock:ActionPanelButton Title="Second Button"
                Command="{Binding OpenExternalBrowser}"
                CommandParameter="https://community.rockrms.com/" />
        </Rock:ShowActionPanelParameters>
    </Button.CommandParameter>
</Button>
```

Thanks to the magic of XAML, we can simplify the definition of the destructive button a bit if we want, it's up to you.

```
<Button Text="Actions"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowActionPanel}">
    <Button.CommandParameter>
        <Rock:ShowActionPanelParameters Title="My Action Sheet"
            CancelTitle="Do Nothing"
            DestructiveButton="{Rock:ActionPanelButton Title=Delete, Command={Binding PushPage}, CommandParameter=c258265c-9645-46f1-a69b-0e0f149e5e83}">
            <Rock:ActionPanelButton Title="First Button"
                Command="{Binding OpenBrowser}"
                CommandParameter="https://www.rockrms.com" />
            <Rock:ActionPanelButton Title="Second Button"
                Command="{Binding OpenExternalBrowser}"
                CommandParameter="https://community.rockrms.com/" />
        </Rock:ShowActionPanelParameters>
    </Button.CommandParameter>
</Button>
```

## Write Interaction

M v2.0

Allows you to write an Interaction to Rock when the command is executed. For example, you could write an interaction in response to the user tapping a button. By default, only a single Interaction will be written no matter how many times the command is executed. Normally this is probably what you want. If for some reason you want to allow multiple Interactions to be generated, set the `IsMultipleAllowed` property to *true*.

This command takes a parameter object of type `[InteractionParameters](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)` that contains the following details.

## Parameters

In order for your parameters to be considered valid, you must provide at least one of `ChannelId` or `ChannelGuid`; and you must provide at least one of `ComponentId` or `ComponentName`. Also, note that some event sources will provide defaults for some of the properties in the table below or may even override a value you provide.

| Property | Type | Description |
| --- | --- | --- |
| ChannelId | int? |   The identifier of the channel where this interaction will be recorded. Must already exist. *Defaults to* *null**.* |
| ChannelGuid | Guid? |   The unique identifier of the channel where this interaction will be recorded. Must already exist. *Defaults to* *null**.* |
| ComponentId | int? |   Specifies a specific component identifier where this interaction will be recorded. If used, the component must already exist. *Defaults to* *null*.   |
| ComponentName | string |   Specifies a component name for where this interaction will be recorded. If you use this property to pick the component then the system will look for a matching component and if not found create one. *Defaults to* *null**.* |
| ComponentEntityId | int? |   If the channel is configured to have an Entity associated with the components then this would provide the Id of the Entity if it gets created from the ComponentName property. *Defaults to* *null**.* |
| Data | string |   Custom data that should be stored with the interaction. There is no specific format requirements, as long as the data is a string. *Defaults to* *null**.* |
| EntityId | int? |   Associates the interaction with the specified entity. The entity type will be taken from the channel configuration. *Defaults to* *null*.   |
| Operation | string | The type of operation that identifies this interaction. There is no specific list of strings that you must use, but a few suggestions are View and Watch. *Defaults to* *null**.* |
| Summary | string | The text that describes this event in a user friendly manner. *Defaults to* *null**.* |
| RelatedEntityTypeId | int? | Sets the EntityTypeId of the related entity that should be associated with this Interaction. *Defaults to* *null**.* |
| RelatedEntityId | int? | Sets the EntityId of the related entity that should be associated with this Interaction. *Defaults to* *null**.* |
| ChannelCustom1 | string | Sets the first custom interaction string value. *Defaults to* *null**.* |
| ChannelCustom2 | string | Sets the second interaction string value. *Defaults to* *null**.* |
| ChannelCustomIndexed1 | string | Sets the first custom indexed interaction string value. *Defaults to* *null**.* |
| IsMultipleAllowed | bool | Specifies if multiple interactions can be written for this single command. If set to *true* then each time the command is executed a new interaction will be written. Otherwise only the first execution will write an interaction. Note: If the page is reloaded then a new parameter object is created and a new interaction could again be written. *Defaults to* *false**.* |
| SendMode | InteractionSendMode | Currently accepts two values:Queued: Adds the interaction to the internal queue, that posts to the server every so often. This is recommended and is used to maintain high performance. Immediate: In some rare cases, you may want to make sure an interaction gets posted to the server as soon as possible. This will cause the interaction to bypass the internal queue and post immediately upon execution. Be cautious using this, as you could *flood* your server with POST requests. *Defaults to* *Queued**.* |

**Example**

```
<Button Text="Like" Command="{Binding WriteInteraction}">
    <Button.CommandParameter>
        <Rock:InteractionParameters Operation="Like"
            Summary="I like this."
            ChannelId="3"
            ComponentId="87" />
    </Button.CommandParameter>
</Button>
```

## ShowPopup

M v1.0

Rock Mobile Shell supports the idea of small popup pages. These don't support navigation but can be useful for a simple display of additional content without leaving the current page.

If the `CommandParameter` is a string then it will be interpreted as a page GUID with optional query string parameters. This will display a full Rock page inside the popup view.

Alternatively, you can specify a view to use as the content for the popup. This is ideal for showing additional details of items or perhaps a list filter.

Finally, you can specify a `ShowPopupParameters` object and supply additional options as seen below.

| Property | Type | Description |
| --- | --- | --- |
| Anchor | ShowPopupAnchor | Where to anchor the popup, possible values are Center, Top, and Bottom. *Defaults to* *Center**.*   |
| Content | View | The view to display inside the popup, if set this will override the PageGuid property. |
| PageGuid | Guid | The Rock page to be displayed inside the popup. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\>   | A collection of query string parameters that will be passed to the Rock page. |
| Title | string | The title of the popup. |
| ShowHeader | bool |   Determines if the header should be shown. If disabled then you have complete control of the design. *Defaults to* *True**.* |

**Examples**

```
<Button Text="Tap"
    Command="{Binding ShowPopup}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8?GroupId=18&amp;Mode=Edit" />
```

```
<Button Text="Tap"
    Command="{Binding ShowPopup}">
    <Button.CommandParameter>
        <Rock:ShowPopupParameters Title="Select Group"
            PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="ParentGroupId" Value="8293" />
        </Rock:ShowPopupParameters>
    </Button.CommandParameter>
</Button>
```

```
<Button Text="Tap"
    Command="{Binding ShowPopup}">
    <Button.CommandParameter>
        <Rock:ShowPopupParameters Title="Select Group"
            Anchor="Top">
            <Rock:ShowPopupParameters.Content>
                <StackLayout>
                    <Label Text="Hello Rock" />
                    <Button Text="Close"
                        Command="{Binding ClosePopup}" />
                </StackLayout>
            </Rock:ShowPopupParameters.Content>
        </Rock:ShowPopupParameters>
    </Button.CommandParameter>
</Button>
```

## ClosePopup

M v1.0

This command is the opposite of the [ShowPopup](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#showpopup) command. If there is an open popup then it will be closed. This command takes no parameters.

```
<Button Text="Close"
    Command="{Binding ClosePopup}" />
```

## Follow

M v1.0

The command is used to follow and unfollow specific entities.

Previously, this behavior was only utilized using the [Following Icon](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/following-icon), but now with this command, you can easily mimic that to create custom follow/unfollow buttons.

When following a person you'll want to use the PersonAlias entity type, not the Person.

Also, be sure to check out the [Security Considerations](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/following-icon#security-considerations) needed to enable following.

Note that this command does not refresh the page. If you have following icons and expect them to be updated from this command, it does not work as such. Consider using [SetViewProperty](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#setviewproperty) to make visual changes in response to follow and unfollow actions.

| Property | Type | Descriptions |
| --- | --- | --- |
| EntityId | int | The Id of the entity to follow or unfollow. |
| EntityTypeId | int | The Id of the entity type to follow or unfollow. |
| PurposeKey | string | An optional parameter that allows you to set a 'Purpose Key' while following or unfollowing. |
| NotificationText | string | The text to display on the Toast when an item is successfully followed/unfollowed. Note: Setting this as empty ("") will remove the Toast from ever being displayed, if you wish to do that. |
| NotificationType | [NotifcationType](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/notification-box#notification-type) | The notification type of the Toast to be displayed. |
| IsFollow | bool | Whether or not the command is used to follow or unfollow, set to false to configure "unfollowing" behavior. *Defaults to* *true**.* |
| UseHapticFeedback | bool |   If enabled, the command will perform haptic feedback when tapped. *Defaults to* *true**.* |

```
<StackLayout Orientation="Horizontal">
    {% assign group = 70 | GroupById %}
    
    <Button Text="Follow"
        Command="{Binding Follow}">
        <Button.CommandParameter>
            <Rock:FollowParameters EntityId="{{ group.Id }}"
                EntityTypeId="{{ group.TypeId }}" />
        </Button.CommandParameter>
    </Button>
    
    <Button Text="Unfollow"
        Command="{Binding Follow}">
        <Button.CommandParameter>
            <Rock:FollowParameters IsFollow="False"
                EntityId="{{ group.Id }}"
                EntityTypeId="{{ group.TypeId }}"
                NotificationText="Unfollowed!" />
        </Button.CommandParameter>
    </Button>
</StackLayout>
```

## ShowToast

M v4.0

This command displays a "Toast" style message, often used to show quick and temporary messages, such as "saved" or "updated" and things of the sort.

If the `CommandParameter`is a string, it will display using the default styles with the command parameter as the message to display.

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text to display in the Toast. |
| Duration | ToastDuration | Either long (3.5 seconds) or short (2.0 seconds). |
| FontSize | int | The font size of the toast. |

```
<Button Text="Toast Me"
    Command="{Binding ShowToast}"
    CommandParameter="Default Toast styling." />
```

```
<Button Text="Toast Me 2"
    Command="{Binding ShowToast}"
    CommandParameter="{Rock:ShowToastParameters Text='Butter or jam?' Duration='Long' FontSize='32'}" />
```

## ShowCoverSheet

M v4.0

Shows a [Cover Sheet](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cover-sheet).

```
<Button Text="Tap"
    StyleClass="btn, btn-primary"
    Command="{Binding ShowCoverSheet}"
    CommandParameter="71e80253-8d10-426b-8182-65dafe9b695f" /> <!-- Page Guid -->
```

## CloseCoverSheet

M v4.0

Closes any open [Cover Sheet](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cover-sheet).

```
<Button Text="Tap"
    Command="{Binding CloseCoverSheet}" />
```

## UpdatePersonProfilePhoto

M v5.0

This command is used to update the profile photo of either the `CurrentPerson`, or if a `PersonGuid` is supplied as the parameter, it will update theirs. Options are shown with the [ShowActionPanel](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#showactionpanel) command, including uploading an existing photo or capturing a new one.

Important

This command requires Edit permissions on the following API endpoint:  
POST api/People/UpdatePersonProfilePhoto?personGuid={personGuid}&filename={filename}  
  
Starting with Core v16, the role of 'RSR - Mobile Application Users' should be given permission. Previous versions should remain using the role of 'All Authenticated Users'.

```
<Button Text="Update Photo"
    Command="{Binding UpdatePersonProfilePhoto}"
    CommandParameter="8fedc6ee-8630-41ed-9fc5-c7157fd1eaa4" />
```

![](https://mobiledocs.rockrms.com/~gitbook/image?url=https%3A%2F%2F1618311306-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LnfHr7q46y6lOQNgsA4%252Fuploads%252FgWZYHADspHa7wd0qUeOF%252Fimage.png%3Falt%3Dmedia%26token%3Dd7eb4a13-51fb-46f7-98ee-f57b7e818eb3&width=768&dpr=4&quality=100&sign=c03d95a0&sv=2)

The action panel options shown with this command

There are some additional command parameters that can be used for extended functionality. These are `UpdatePersonProfilePhotoCommandParameters`.

| Property | Type | Description |
| --- | --- | --- |
| PersonGuid | Guid | The Guid of the Person to update the profile photo for. |
| Image | Image | The image to update the source of when the new profile image is uploaded. |

Here's an example for using the Image property:

```
<Rock:Image x:Name="PersonImage"
    Source="image.png" />

<Button Text="Update Photo"
    Command="{Binding UpdatePersonProfilePhoto}">
    <Button.CommandParameter>
        <Rock:UpdatePersonProfilePhotoCommandParameters Image="{x:Reference Name=PersonImage}" />
    </Button.CommandParameter>
</Button>
```

## CreateEntitySetAndNavigate 

M v6.0

This command is pretty complex. It does two things... First it generates an Entity Set based on the provided parameters and then performs a Navigation command with an appended query string of the entity set value.

| Property | Type | Description |
| --- | --- | --- |
| TimeToExpire | int | The amount of time (in minutes) before the entity set expires. |
| QueryStringParameterKey | string | The key associated with the newly generated Entity Set that will be passed along through the query string. Defaults to EntitySetGuid.   |
| EntityTypeGuid | Guid | The Guid of the type of entity this entity set is in relation to. |
| EntityItemGuids | List<string> | A list of the string Guid entity set items. You should only include entities that are of the same type provided by the EntityTypeGuid. |
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

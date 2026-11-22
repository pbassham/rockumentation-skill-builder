---
description: Use when user wants to send text messages from a mobile app to one or more phone numbers with optional message body
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile1.0

Don't you wish you could add a button with an icon of a chat bubble to your application that would allow your user to send a text message? Yeah, we did too. With this command, you can *request* to create a new text message to be sent to a number of people. Notice that we said "request". This does not immediately send the text message but simply uses the OS standard messaging application. In most cases, the user is sent over to the message application and can then later return to your application.

If the `CommandParameter` is a plain string, then it is used as a comma-delimited list of phone numbers that the message should be sent to. Alternatively, you can specify a `SendSmsParameters` object and supply the initial text to use as the message body as well as the list of recipients. This object is described below. Finally, you can also omit the `CommandParameter` entirely and it will simply open up a new blank message for the user to send.

Note

This command needs a device that can send text messages.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Message | string | The body of the message to be sent, this is optional and the user will be able to edit the content before it is sent. |
| Recipients | List<string\> | The phone numbers of the people who will receive the message. While this is a list of strings, it also accepts a comma delimited string to specify multiple numbers at once. |

```
<Button Text="Tap"
    Command="{Binding SendSms}"
    CommandParameter="15551239876" />
```
```
<Button Text="Tap"
    Command="{Binding SendSms}">
    <Button.CommandParameter>
        <Rock:SendSmsParameters Message="Welcome to Rock!"
            Recipients="15551239876,15552224444" />
    </Button.CommandParameter>
</Button>
```
```
<Button Text="Tap"
    Command="{Binding SendSms}">
    <Button.CommandParameter>
        <Rock:SendSmsParameters Message="Welcome to Rock!">
            <x:String>15551239876</x:String>
            <x:String>15552224444</x:String>
        </Rock:SendSmsParameters>
    </Button.CommandParameter>
</Button>
```
```
<Button Text="Tap"
    Command="{Binding SendSms}"
    CommandParameter="{Rock:SendSmsParameters Message=Welcome to Rock!, Recipients='15551239876,15552224444'}" />
```

## Related

- [CallPhoneNumber](https://community.rockrms.com/developer/mobile-docs/commands/callphonenumber) starts a phone call.
- [SendEmail](https://community.rockrms.com/developer/mobile-docs/commands/sendemail) starts a new email.

---

## SetAppValue {#setappvalue}

Mobile2.0

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

## Related

- [SetUserPreference](https://community.rockrms.com/developer/mobile-docs/commands/setuserpreference) saves a single preference on the device.
- [ClearUserPreferences](https://community.rockrms.com/developer/mobile-docs/commands/clearuserpreferences) removes every preference saved on the device.

---

## SetContext {#setcontext}

Mobile1.0

This command allows you to set an entity context value based on a user's action. For example, you could build a custom Campus Context Picker and set the context when the user taps an action button.

The parameter should be an instance of the `SetContextParameters` class, which is described below.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the entity whose context is to be set. For example Campus. |
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

## Related

- [CreateEntitySetAndNavigate](https://community.rockrms.com/developer/mobile-docs/commands/createentitysetandnavigate) creates an entity set and opens a page with it.

---

## SetPageTitle {#setpagetitle}

Mobile20.0

Changes the title shown in the navigation bar of the current page while the page is open. Use it when the right title depends on something the page loads or the person picks, such as the name of a group or an event.

The `CommandParameter` is a string. Pass text to replace the title, or an empty string to hide the title while keeping the navigation bar. Leave the `CommandParameter` off to put back the title set on the page in Rock.

Note

The new title only lasts while the page is open. The next time the page opens, it shows the title set in Rock again.

## Examples

```
<Button Text="Rename"
    Command="{Binding SetPageTitle}"
    CommandParameter="Small Group Leaders" />
```
```
<Button Text="Reset Title"
    Command="{Binding SetPageTitle}" />
```

## Related

- [SetViewProperty](https://community.rockrms.com/developer/mobile-docs/commands/setviewproperty) changes a property on a view.
- [ScrollToVisible](https://community.rockrms.com/developer/mobile-docs/commands/scrolltovisible) scrolls a view into sight.

---

## SetUserPreference {#setuserpreference}

Mobile4.0

Save user-specific properties that we only store on the shell. Be careful not to go overboard with these, as they directly affect your application size. In reality, this is just a [SetAppValue](https://community.rockrms.com/developer/mobile-docs/commands/setappvalue) command that prefixes the key with `user-preference-`.

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

## Related

- [SetAppValue](https://community.rockrms.com/developer/mobile-docs/commands/setappvalue) stores an app value you can read later in Lava.
- [ClearUserPreferences](https://community.rockrms.com/developer/mobile-docs/commands/clearuserpreferences) removes every preference saved on the device.

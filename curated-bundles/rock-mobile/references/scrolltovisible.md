---
description: Use when implementing scroll-to-anchor functionality to make specific UI elements visible within scrollable containers on mobile
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile1.0

There are two ways to initiate this command, we'll show them below. But the basic syntax is you specify the Anchor element that should be scrolled until it becomes visible. Think of this like the HTML Anchor href, or a "jump to" button.

You can either pass the view to be made visible directly by reference in the `CommandParameter` or you can pass an instance of the `ScrollToVisibleParameters` object.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Anchor | VisualElement | The view which resides inside a ScrollView that should be made visible. |
| Position | ScrollToPosition | The position to put the view at after scrolling (see below). Defaults to MakeVisible |
| Animated | Boolean | Sets whether the scroll should be animated. Defaults to True |

The options you have with the `Position` parameter are as follows:

- `MakeVisible` - Just make sure the anchor is visible on screen
- `Start` - Attempt to scroll until the anchor is at the start (top or left) of the screen
- `Center` - Attempt to scroll until the anchor is at the center of the screen
- `End` - Attempt to scroll until the anchor is at the end (bottom or right) of the screen

## Examples

```
<VerticalStackLayout>
    <Button Text="Scroll"
        Command="{Binding ScrollToVisible}"
        CommandParameter="{x:Reference myLabel}" />

    <BoxView Color="Red"
        HeightRequest="1200" />

    <Label Text="My Label"
        x:Name="myLabel" />

    <BoxView Color="Blue"
        HeightRequest="1200" />
</VerticalStackLayout>
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

## Related

- [SetViewProperty](https://community.rockrms.com/developer/mobile-docs/commands/setviewproperty) changes a property on a view.
- [SetPageTitle](https://community.rockrms.com/developer/mobile-docs/commands/setpagetitle) changes the page title.

---

## SendEmail {#sendemail}

Mobile1.0

With this command, you can *request* to create a new e-mail to be sent to a number of people. Notice that we said "request". This does not immediately send the e-mail but simply uses the OS standard e-mail application. In most cases, the user is sent over to the e-mail application and can then later return to your application.

If the `CommandParameter` is a plain string, then it is used as a comma-delimited list of e-mail addresses that the e-mail should be sent to. Alternatively, you can specify a `SendEmailParameters` object and supply the subject, the initial text to use as the e-mail body as well as the list of recipients. This object is described below. Finally, you can also omit the `CommandParameter` entirely and it will simply open up a new blank e-mail for the user to send.

Note

This command needs a mail account set up on the device.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Subject | string | The subject of the e-mail to be sent, this is optional and the user will be able to edit before it is sent. |
| Message | string | The body of the e-mail to be sent, this is optional and the user will be able to edit the content before it is sent. |
| Recipients | List<string\> | The e-mail addresses that will receive the e-mail. While this is a list of strings, it also accepts a comma delimited string to specify multiple e-mail addresses at once. |

```
<Button Text="Tap"
    Command="{Binding SendEmail}"
    CommandParameter="ted@rocksolidchurchdemo.com" />
```
```
<Button Text="Tap"
    Command="{Binding SendEmail}">
    <Button.CommandParameter>
        <Rock:SendEmailParameters Subject="Welcome to Rock!"
            Message="Thanks for saying you are coming to church tonight!"
            Recipients="ted@rocksolidchurchdemo.com, cindy@fakeinbox.com" />
    </Button.CommandParameter>
</Button>
```
```
<Button Text="Tap"
    Command="{Binding SendEmail}"
    CommandParameter="{Rock:SendEmailParameters Subject=Welcome to Rock!, Recipients=ted@rocksolidchurchdemo.com}" />
```

## Related

- [CallPhoneNumber](https://community.rockrms.com/developer/mobile-docs/commands/callphonenumber) starts a phone call.
- [SendSms](https://community.rockrms.com/developer/mobile-docs/commands/sendsms) starts a new text message.

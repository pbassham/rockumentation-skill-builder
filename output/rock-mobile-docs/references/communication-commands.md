> **Path:** Mobile Docs > 🧱 Essentials > Commands > Communication Commands

# Communication Commands

## CallPhoneNumber

M v1.0

We're sure you can think of other uses, but wouldn't it be nice if your application had your church's phone number displayed somewhere and the user could just tap on it to call your church office? Yep. That would be nice. If only the user was on a phone or something like that.

The `CommandParameter` specifies the phone number to be dialed, if it's blank then nothing will happen.

```
<Button Text="Tap"
    Command="{Binding CallPhoneNumber}"
    CommandParameter="15552138874" />
```

## SendEmail

M v1.0

With this command, you can *request* to create a new e-mail to be sent to a number of people. Notice that we said "request". This does not immediately send the e-mail but simply uses the OS standard e-mail application. In most cases, the user is sent over to the e-mail application and can then later return to your application.

If the `CommandParameter` is a plain string, then it is used as a comma-delimited list of e-mail addresses that the e-mail should be sent to. Alternatively, you can specify a `SendEmailParameters` object and supply the subject, the initial text to use as the e-mail body as well as the list of recipients. This object is described below. Finally, you can also omit the `CommandParameter` entirely and it will simply open up a new blank e-mail for the user to send.

| Property | Type | Description |
| --- | --- | --- |
| Subject | string | The subject of the e-mail to be sent, this is optional and the user will be able to edit before it is sent. |
| Message | string | The body of the e-mail to be sent, this is optional and the user will be able to edit the content before it is sent. |
| Recipients | List<string> | The e-mail addresses that will receive the e-mail. While this is a list of strings, it also accepts a comma delimited string to specify multiple e-mail addresses at once. |

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
    CommandParameter="{SendEmailParameters Subject=Welcome to Rock!, Recipients=ted@rocksolidchurchdemo.com}" />
```

## SendSms

M v1.0

Don't you wish you could add a button with an icon of a chat bubble to your application that would allow your user to send a text message? Yeah, we did too. With this command, you can *request* to create a new text message to be sent to a number of people. Notice that we said "request". This does not immediately send the text message but simply uses the OS standard messaging application. In most cases, the user is sent over to the message application and can then later return to your application.

If the `CommandParameter` is a plain string, then it is used as a comma-delimited list of phone numbers that the message should be sent to. Alternatively, you can specify a `SendSmsParameters` object and supply the initial text to use as the message body as well as the list of recipients. This object is described below. Finally, you can also omit the `CommandParameter` entirely and it will simply open up a new blank message for the user to send.

| Property | Type | Description |
| --- | --- | --- |
| Message | string | The body of the message to be sent, this is optional and the user will be able to edit the content before it is sent. |
| Recipients | List<string> | The phone numbers of the people who will receive the message. While this is a list of strings, it also accepts a comma delimited string to specify multiple numbers at once. |

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
    CommandParameter="{SendSmsParameters Message=Welcome to Rock!, Recipients='15551239876,15552224444'}" />
```

## ShareContent

M v1.0

Using the ShareContent command you can open up the standard OS share dialog that lets the user share a piece of text or a URL to other apps and services.

If the `CommandParameter` is a plain string then it will simply share the text string. Alternatively, you can specify a `ShareContentParameters` object and supply additional options as seen below.

| Property | Type | Description |
| --- | --- | --- |
| Title | string | The title of the share window. |
| Text | string | A text string to be shared. |
| Uri | string | A URL string to be shared. |
| ShareAsFile  
M v2.0 | boolean | Indicates that the Uri should be downloaded to the device and then shared as a file so other applications on the device can be used to open the file. |

```
<Button Text="Tap"
    Command="{Binding ShareContent}"
    CommandParameter="Rock ChMS has an app!" />
```

```
<Button Text="Tap"
    Command="{Binding ShareContent}">
    <Button.CommandParameter>
        <Rock:ShareContentParameters Title="Endorse Rock!"
            Text="Rock ChMS has an app!"
            Uri="https://www.rockrms.com/" />
    </Button.CommandParameter>
</Button>
```

```
<Button Text="Tap"
    Command="{Binding ShareContent}">
    <Button.CommandParameter>
        <Rock:ShareContentParameters Title="Check out this movie!"
            Uri="https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg"
            ShareAsFile="true" />
    </Button.CommandParameter>
</Button>
```

## Property UX

M v6.0

The sharing experience will change depending on the Title, Text, and Uri provided. Providing only a Title will not work ‒ a Text or Uri value is required. Let's review the options using the sample command here:

```
<Rock:ShareContentParameters Title="What is Rock"
    Text="Learn more about Rock RMS!"
    Uri="https://www.rockrms.com" />
```

These screenshots show the OS share prompt and content received within the Messages app.

**Title + Text**

![](https://community.rockrms.com/GetImage.ashx?Id=66941)

**Title + Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66942)

**Text + Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66943)

**Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66944)

**Title + Text + Uri**

![](https://community.rockrms.com/GetImage.ashx?Id=66945)

When sharing content via a URI, it is common for the content to include an image. The image is derived from the metadata of the webpage the URI links to. When using Rock RMS, editing this metadata can be done from within the advanced settings of the desired page.

Click [here](https://ogp.me/) for deeper insight on metadata properties.

```
<meta property="og:url" content="https://rockrms.com/">
<meta property="og:title" content="Rock Mobile">
<meta property="og:image" content="https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg">
```

Without this metadata present, no image will be displayed when sharing content.

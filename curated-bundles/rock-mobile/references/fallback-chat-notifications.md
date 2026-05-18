---
description: Use when configuring fallback notifications for Chat members without the Rock Mobile app or disabled notifications via email or SMS.
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Send a System Communication as a fallback to Chat members who don't receive device notifications.

M v7.0C v18.0

Warning

To maintain performance and avoid placing unnecessary load on the Rock server, fallback notifications will be sent to a maximum of 50 members per Chat Channel. However, the recommended use case is much smaller: ideally 3 to 5 members per Channel for optimal effectiveness and responsiveness.

## Overview

Using Rock Automations, this feature enables a configurable fallback chat notification - such as *“You have a secured chat message from Ted Decker at Rock Solid Church”* - to be sent to all individuals in a Chat who either do not have the Rock Mobile app installed (as known by a personal device record) or do not have notifications enabled on their device. SMS and email delivery are both supported.

![](https://community.rockrms.com/GetImage.ashx?Id=68212)

## Getting Started

Note

To get started with Chat in Rock, contact the AppFactory team to discuss the required pre-configuration for your mobile app.

Once you have Chat up and running, adding fallback notifications takes just a few minutes.

### Add a Chat Message Trigger

Navigate to `Admin Tools > General > Automations` and click the \[+\] button to add a new Automation Trigger.

#### Trigger Properties

| Name | Description |
| --- | --- |
| Name | Give this trigger a name of your choosing (e.g. *Send Fallback Chat Notifications*). You might have a single trigger to handle fallback notifications for all Chat Channels of a given Channel Type, or you can get as granular as you'd like. Your decision here should dictate how you name this trigger. |
| Description | Like all things in Rock, make sure to provide a good description! You and your team will thank you later. |
| Trigger Type | Choose **Chat Message** |
| Trigger when \[Any\|All\] of the rules are true | Should all of the rules be required to match, or should a single rule match be enough to trigger Automation Events? |
| Criteria | Add as many criteria rules as you'd like. |

### Add a Send Fallback Chat Notification Event

Once you've added your Automation Trigger, you can add as many Automation Events as you'd like to be fired when the trigger criteria are met. In our example, we'll choose the **Send Fallback Chat Notification** event type.

#### Event Settings

| Name | Description |
| --- | --- |
| Event Type | Choose **Send Fallback Chat Notification** |
| System Communication | The sytem communication to be sent as a fallback notification. Email and SMS are supported. |
| Notification Suppression Minutes | The number of minutes the system will suppress notifications if the recipient has already received a recent notification. |
| Device Seen Within Days | A Chat member will be excluded from fallback notifications if they have accessed Rock using a personal device within this number of days. Note that the same device must also currently have Rock notifications enabled. |

## System Communication

We've provided an example **Fallback Chat Notification** System Communication with both an SMS and email Lava template. You'll find that we've provided plenty of merge fields, including the contents of the chat message that was sent, allowing you to provide as little or as much detail as you'd like in the fallback notification. The ultimate goal should be to bring the individual to the conversation by providing a link to get them there.

### Deep Linking to the Rock Mobile Chat Page

Follow the documentation on [Deep Linking](https://community.rockrms.com/page/3516?slug=essentials%2fadvanced-topics%2fdeep-linking) to configure a link to the page within your Rock Mobile App that contains the [Chat View](https://community.rockrms.com/page/3516?slug=essentials%2fblocks%2fcommunication%2fchat-view) block and use that link within your System Communication to bring individuals directly to the app if they already have it installed (but have notifications disabled).

Warning

Mailgun's tracking of links within an email sent by Rock will break Deep Linking, and the individual will instead be taken directly to the Deep Link's fallback page. In order to prevent this, add the following attribute to the link within your email's Message Body:  
  
<a href="{{ chatUrl }}" disable-tracking="true"\>{{ chatUrl }}</a\>  
  
It's likely that SendGrid has a similar mechanism to disable tracking.

### Linking to the Web Chat View Block

You can also use Rock's [Chat View](https://community.rockrms.com/page/3516?slug=essentials%2fblocks%2fcommunication%2fchat-view) block within a Rock website. Be sure to add this block to a page on your public-facing website and use this as the **Fallback Page** when setting up your Deep Link.

### Styling

There’s no styling X-Ray available.

---

## Codex {#codex}

We use the Figma service to generate screenshots. When you are ready to contribute screenshots for documentation you will need to create an account there. Once your account is setup you can go to this [link](https://www.figma.com/file/I4GTr4rmlRdNq1On63tfln/Device-Documentation-Screenshots/duplicate) to create your own personal screenshot template. You only need to visit it once, from then on just login to Figma and it will show in your personal templates, and if you accidentally mess it up, just delete it and visit the above link again.

All screenshots should be generated on both iOS and Android so that users can see the slight differences on each platform. On an iPhone, you should use the Simulator configured for an iPhone 11. For Android, we recommend a Pixel 2 - though any device that runs at 1080x1920 resolution will work. When using the iOS simulator, it must be run on the Mac directly. Using it through Visual Studio on a PC will result in an incorrect image as it will attempt to pre-apply the border mask.

Once you have your screenshots, drag the iOS screenshot into the bottom left device. Once it is in place, select the screenshot in the left-panel (bubble 1 below). Next center it horizontally and vertically using the center align buttons (bubble 2 below). Next drag your Android screenshot into the bottom right device. Again select it in the left-panel (bubble 3 below) and center it using the same buttons you used for the iOS screenshot.

To export, click on the `Devices` word just above the top two devices, you should see a blue outline around both of the top devices. Finally click the "Export Devices" button. Save the file to disk.

Once you have saved the image you probably want to cleanup your template. Select the two images (bubbles 1 and 3) and delete them.

![](https://community.rockrms.com/GetImage.ashx?Id=66934)

---

## Application Strategy {#application-strategy}

Below are some points to consider when developing your application.

1. Think through each block you add. Determine where it should be run (client and/or server). If at all possible have it run on the client. For example if you have a Content block on a page that acts as a header it can be downloaded to the client and never needs to call the server on the page load.

---

## XAML Styling {#xaml-styling}

Below are various styling rules we recommend when writing XAML.

1. When using a StyleClass place it as the first parameter when defining Labels, or when the CSS class name helps define the intent of the control. Good: `<Label StyleClass="h1" Text="My Title" />`
2. Bad: `<Label Text="My Title" StyleClass="h1" />`
3. When using a control (like a Label) that does not need a body do not provide an end tag. Good: `<Label Text="My Label" />`

     Bad: `<Label Text="My Label"></Label>`

When you need to align controls horizontally you have quite a few options. We recommend using the following guidelines when selecting a strategy.

1. [StackLayout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/stacklayout) \- StackLayouts are a performant away to align controls horizontally (Orientation="Horizontal"). StackLayouts don't offer a lot in the way of placement options. *Web Equivalent: DIVs with floats*
2. ResponsiveLayout - ResponsiveLayouts are a Rock Mobile addition that create column grids much like Bootstrap's grid in CSS. It allows you to provide a different number and size of columns based on the size of the view.
3. [Grid](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/grid) \- The Xamarin Forms Grid is a very powerful layout tool. It can slow down performance a bit if they become too numerous or complex. *Web Equivalent: HTML Tables (on steroids)*
4. Others ([AbsoluteLayout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/absolute-layout)/[RelativeLayout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/relative-layout)/[FlexLayout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/flex-layout)) - There are numerous other options to look at. Their uses are more advanced.

---

## Resources {#resources}

Below are resources for digging in deeper.

> A good developer reads as much code as they write. - Anonymous

> “To steal ideas from one person is plagiarism; to steal from many is research.” – Anonymous

Below are some sources you can turn to to see how other Xamarin developers have crafted amazing apps.

- [Ask Xammy Blog](https://askxammy.com/)
	- [Burger App](https://askxammy.com/replicating-burger-ui-app-in-xamarin-forms/) (especially good)
- [SyncFusion Essential UI Kit](https://github.com/syncfusion/essential-ui-kit-for-xamarin.forms#coding-style) (warning this does contain some closed source components)

---

## Documentation {#documentation}

When updating the demo app there are CSS styles and snippets that can help you out. Below are some examples.

To add a code snippet in the demo app use:

```
<Label StyleClass="code">
    {{ '<Rock:Image Source="https://yourserver.com/photo.jpg" />' | XamlWrap }}
</Label>
```

Result:

![](https://community.rockrms.com/GetImage.ashx?Id=66935)

Note the `code` CSS class handles the styling. For code snippets that are more than one line you'll need to use a Lava capture.

```
<Label StyleClass="code">
        {% capture source %}<Button Text="Action Name" 
        StyleClass="btn, btn-primary-outline"  />{% endcapture %}{{ source | XamlWrap }}</Label>
```

---
description: "Use when configuring Rock mobile app settings like application name, type, orientation, pages, and API key"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Now it's time to configure your app. There are some options that are not covered below; they are beyond the scope of this walkthrough. Start by filling in the **Application Name** and optional **Description**.

Note

Don't worry too much about the name you enter. It will be used to identify your application in Rock but has no effect on the official app name once deployed to the app stores.

## Application Type

You have three options when it comes to the **Application Type**. Choose what makes the most sense for your app; you can always change your selection later.

### Blank (not recommended)

This option will not provide a Flyout panel or tabbed navigation. Generally you'll want one of those, so **Blank** should only be selected when you need to remove those elements for a specific use case.

### Flyout (recommended)

This is the most common type of application and one your users will be familiar with. A menu icon (three horizonal bars) will be displayed in the top left of your app and when pressed will reveal a slide out panel form the left side. Users can also swipe from the left side of the screen to reveal the Flyout panel.

![](https://community.rockrms.com/GetImage.ashx?Id=66803)

The menu icon can be seen in the navbar on the left.

![](https://community.rockrms.com/GetImage.ashx?Id=66802)

The Flyout panel can contain links, Login information, and more.

### Tabbed

When this option is selected users will be shown a tabs at the bottom of the app. If your app only has a few top-level pages this can be a great alternative to the Flyout. Each page can have a custom image associated with it which is displayed above the name.

![](https://community.rockrms.com/GetImage.ashx?Id=66801)

## Lock Orientation

You can force the application to be locked in Portrait or Landscape mode for both phones and tablets. **Portrait** is recommended for both, unless you're putting additional development effort into a landscape experience for tablets.

Note

Changing the tablet orientation lock may not apply immediately on devices where the app is already installed—it can take up to two full app reloads before the change takes effect. On a fresh install, the lock applies right away.

## Application Pages

You'll have the option to set the Login, Profile, and Communication View pages here... but we haven't created them yet. Although this guide won't dig into setting these up, know that coming back to add these page links is important for the app to understand where these fundamental areas exist for navigation.

## API Key

Think of this key like a credential to connect to your mobile app. You'll use it with some other fields to access your application in a [future section](https://community.rockrms.com/developer/mobile-docs/building-your-first-app/deploying-your-app). Set the value to something relatively complex and unique to your organization, but still easy to type on a mobile keyboard.

Important

Be aware that certain special characters will not compile when it's time to publish through App Factory. We recommend sticking to letters and numbers for your API Key.

**Bad**: mobileapp, Rock, testing

**Better**: Gr33nToolb0x, ctr2p7

## Flyout XAML

If you've selected an Application Type of Flyout then you can customize what appears inside via XAML. The default template will include a `<ListView>` that references a `{Binding MenuItems}` source; this will automatically add any pages with the Display In Navigation option checked. It is recommended to leave this alone unless you need custom functionality.

Important

Lava will not work inside the Flyout XAML; if you add some the app will crash upon opening.

## Homepage Routing Logic

This is the logic to use to determine which page someone lands on when opening the application. Make sure to output a valid mobile page Guid as the destination.

Client-side Lava is enabled including access to [Shell Lava Variables](https://community.rockrms.com/developer/mobile-docs/essentials/lava).

Typically, this is used to force authentication by checking for CurrentPerson and navigating to the Login or Onboarding pages if null.

---

## Mobile Docs {#mobile-docs}

![<br>](https://community.rockrms.com/GetImage.ashx?Id=67647)

## Welcome👋

***Rock Mobile is a native mobile extension of Rock RMS. This site is the documentation for building mobile applications that are linked to Rock.***

ti ti-gift [**Release Notes**](https://www.rockrms.com/mobilereleasenotes)

Keep an eye on new features and bug fixes.

ti ti-bug [**Report Issues**](https://github.com/SparkDevNetwork/Rock.Mobile-Issues)

Let us know if you have problems with the shell.

This documentation will help you with building your Rock Mobile application. Be sure to check back regularly for updates. There's also a community of like-minded mobile developers in the [community chat](https://chat.rockrms.com/channel/mobile)! Join the **#mobile** channel and ask questions to others using Rock Mobile, or help provide answers.

---

## 📱 Building Your First App {#building-your-first-app}

This guide will walk you through the process of creating a new mobile application in Rock: adding some content, deploying, and finally testing with the Rock Mobile Core app. When we're finished you'll have everything you need to begin building the app of your dreams.

---

## Creating An App {#creating-an-app}

This guide will walk you through the process of creating a new mobile application in Rock: adding some content, deploying, and finally testing with the Rock Mobile Core app. When we're finished you'll have everything you need to begin building the app of your dreams.

Let's begin by creating a new mobile application within Rock. Mobile applications can be found under **Admin Tools \> CMS Configuration**.

![Note: Your menu might look different](https://community.rockrms.com/GetImage.ashx?Id=66798)

Select the **Mobile Applications** box to view a list of all the apps in your Rock instance.

![](https://community.rockrms.com/GetImage.ashx?Id=66799)

Click the **Plus** icon to create a new app, or select a previously created app from the list below.

![](https://community.rockrms.com/GetImage.ashx?Id=66800)

---

## Adding Content {#adding-content}

When saving a new app, or selecting an existing one from the list, you'll be taken to the **Application** page. The title bar will show the name of your app on the left and the Site/App Id on the right, as well as the deployment status. Underneath you'll find tabbed navigation for the different areas of your app and some of the configuration values you previously selected.

![](https://community.rockrms.com/GetImage.ashx?Id=66804)

To begin adding content to our app we need to navigate to the **Pages** area. The homepage has already been created for you. Selecting this page will bring you to the page details area where you can change the configuration and add blocks, similar to the process on Rock web.

Let's add our first block by selecting the Content block and dragging it into the **Main** section.

![](https://community.rockrms.com/GetImage.ashx?Id=66805)

![](https://community.rockrms.com/GetImage.ashx?Id=66806)

Once added click the Gear icon to change the block properties. In this Content block we'll add our first lines of XAML. Let's add a label and card to our page with the XAML below:

```
<StackLayout StyleClass="p-16"
    Spacing="16">
 
    <Label Text="News Feed"
        StyleClass="h4" />
    
    <Rock:ContainedCard Image="https://realchip.rocks/Content/Chip%20Rocks/Images/Chip%20Sticker@4x.png"
        Tagline="ANNOUNCEMENT"
        Title="Welcome to Rock Mobile"
        ImageRatio=".75:1">
        Check out just how easy it is to create a new mobile app for your organization...
    </Rock:ContainedCard>
    
</StackLayout>
```

First we started with a [StackLayout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/stacklayout), which can display any number of child elements in a vertical orientation. Next we added a [Label](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/text/label) control with some text and a style class. Finally we added a [Contained Card](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/cards/contained-card) with some various text properties.

Below the content input are some options for enabling Lava commands and selecting if block is Dynamic Content. If enabled, making changes to the XAML content will be shown upon refresh of the page instead of requiring a full redeploy.

Note

Page contents should be wrapped inside a [Xamarin Forms layout](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/controls/layouts) to allow for rendering of multiple child elements. It's generally recommended to use a `<StackLayout>`.  

Clicking Save will add our XAML to the block. Now let's deploy our application and view it on a device.

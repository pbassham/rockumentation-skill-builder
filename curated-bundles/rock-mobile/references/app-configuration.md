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

Keep a copy of this key somewhere safe outside Rock. If it's ever lost, see [API Key](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/api-key) for how to restore it.

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

## Welcome 👋

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

---

## Deploying Your App {#deploying-your-app}

## Deployment

![](https://community.rockrms.com/GetImage.ashx?Id=66807)

Navigating to the **Application** page for your app shows the deployment status in the top right. New apps start as Not Deployed, so you'll need to click the **Deploy** button in the bottom right corner to test your app. The first deploy may take a few moments, but generally this process happens quickly.

Note that making changes to the app (like adding new pages and blocks or changing block settings and application colors) will require you to **Deploy** again, as well as reloading the app, to see the changes. Changes to Content blocks that have a **Dynamic Content** value of Yes will be shown without a new deployment. When a user opens the app and is shown the splash / launch screen the app is pulling the latest deployment from your server (or wherever your bundle is hosted).

![](https://community.rockrms.com/GetImage.ashx?Id=66808)

## Testing

Once your app is deployed, test it on your phone with the Rock Core app from the [App Store](https://apps.apple.com/us/app/rock-core/id1498547817) or [Google Play](https://play.google.com/store/apps/details?id=org.sparkdevnetwork.rockmobile). Use its [App Switcher](https://community.rockrms.com/developer/mobile-docs/essentials/app-switcher) to connect it to your server. That page covers the values you'll need, testing against a sandbox, and getting back to the Rock Core app.

When it comes time to publish your app into the stores, get started with [App Factory](https://community.rockrms.com/developer/mobile-docs/app-factory).

---

## 📖 Lexicon {#lexicon}

Below are a few of the basic terms that will help you come up to speed as you start navigating the documentation and begin your first mobile app project.

| Name | Description |
| --- | --- |
| Application | Includes all of the Rock Mobile blocks, content, branding, and other configurable areas. Most visual elements are found here. |
| App Factory | Required publishing service for all Rock Mobile apps ([see more](https://community.rockrms.com/developer/mobile-docs/app-factory)) |
| Block | A single piece of content or functionality on a page, such as a content list or a login form. Blocks are added and configured in Rock, and the Shell displays them. ([see more](https://community.rockrms.com/developer/mobile-docs/essentials/blocks)) |
| Command | An action someone triggers from a button or link, such as opening a page, showing a cover sheet, or playing audio. ([see more](https://community.rockrms.com/developer/mobile-docs/commands)) |
| Core | The Rock server powering your app ([see more](https://community.rockrms.com/developer/mobile-docs/developers/versioning)) |
| Cover Sheet | A page that slides up over the current page, used for details or short tasks. Commands and Helix can both open one. |
| Deploy | A button in Rock you can click to send out changes for all app users including configuration, pages, blocks, and content. Deploying doesn't need a store update. A new Shell version goes through Publishing instead. |
| Device Type | The type of device the application is running on. The only two options are Phone and Tablet. An iPad reports as Tablet. |
| Firebase App Distribution | Google's service for installing Android builds that aren't in the Google Play Store. Pre-release builds of the Rock Core app for Android are distributed here. ([see more](https://community.rockrms.com/developer/mobile-docs/app-factory/pre-release-testing)) |
| Helix (Lava Applications) | Lets a page update parts of itself from Lava endpoints on your Rock server without reloading, so you can build interactive screens entirely in Lava. Rock calls this feature Lava Applications. ([see more](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications)) |
| Lava | Rock's templating language. Blocks use it to merge data from Rock into the XAML they display. ([see more](https://community.rockrms.com/developer/mobile-docs/essentials/lava)) |
| Layout | Divides a page into zones. Every page uses one layout, and a layout can have separate phone and tablet versions. |
| Mobile Style Framework | The application setting that picks the styling system: Default (.NET MAUI), Blended, or Legacy. Default is the recommended option and the only one that fully supports light and dark mode. Its utility classes were originally named Downhill CSS, a name you'll still see on the Legacy pages. ([see more](https://community.rockrms.com/developer/mobile-docs/styling/style-guide)) |
| Page | A single screen in the app. Pages are created in Rock under your mobile application, and each page holds blocks arranged in zones. |
| Platform / Operating System (OS) | The platform the application is running on. The options are iOS and Android. iPads run iOS and are identified by a Device Type of Tablet. |
| Pre-Release | A pre-alpha, alpha, or beta Shell build you can test before it ships, installed as a test version of the Rock Core app through TestFlight on iOS or Firebase App Distribution on Android, separate from the store version. ([see more](https://community.rockrms.com/developer/mobile-docs/app-factory/pre-release-testing)) |
| Publishing | The process by which App Factory distributes your apps into the Apple App Store and Google Play Console. This only includes new Shell versions, which go through Apple and Google review. Content changes use Deploy instead. |
| Push Notification | A message sent from Rock to people's devices, even when the app is closed. It requires setup through App Factory. ([see more](https://community.rockrms.com/developer/mobile-docs/app-factory/push-notifications)) |
| Rock Core app | Spark's own Rock Mobile app, sometimes called the "orange app." You can connect it to your Rock server to build and test your app before your own Shell is published through App Factory. The App Store and Google Play versions run production releases. Pre-release builds of the same app are offered separately through TestFlight and Firebase App Distribution, for people who opt in. [Apple App Store](https://apps.apple.com/us/app/rock-mobile-core/id1498547817) \| [Google Play](https://play.google.com/store/apps/details?id=org.sparkdevnetwork.rockmobile) |
| Shell | Handles the tricky stuff like navigation, authentication, API calls, and more. The Shell is updated and maintained by the development team at Triumph Tech, whereas everything in the Application layer is under your control, built upon the Shell. The Shell has its own version number, shown with an M label on articles, separate from the Rock (C) version. |
| Shell Type | The overall navigation style of the app: Blank, Flyout (a side menu), or Tabbed (a tab bar). Set in your application's settings in Rock. |
| Splash Screen | This is a static image shown briefly when the app is launched. Behind the scenes, the shell is connecting to the Rock server and getting the latest changes. |
| TestFlight ([link](https://testflight.apple.com/)) | Apple's service for testing apps that aren't published in the App Store. App Factory will send your iOS app here for review first. Pre-release builds of the Rock Core app for iOS are distributed here too. |
| XAML | The markup that describes what a block displays, such as text, images, buttons, and how they're arranged. Many blocks let you write XAML directly, often with Lava mixed in. ([see more](https://community.rockrms.com/developer/mobile-docs/essentials/controls)) |
| Zone | A named area of a layout that holds blocks. |

---

## 🧱 Essentials {#essentials}

# 🧱 Essentials

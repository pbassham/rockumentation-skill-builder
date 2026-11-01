---
description: "Use when user needs guidance on deploying Rock mobile apps, testing with the Rock Mobile Core app, or configuring app switcher settings with API credentials"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

## Deployment

![](https://community.rockrms.com/GetImage.ashx?Id=66807)

Navigating to the **Application** page for your app shows the deployment status in the top right. New apps start as Not Deployed, so you'll need to click the **Deploy** button in the bottom right corner to test your app. The first deploy may take a few moments, but generally this process happens quickly.

Note that making changes to the app (like adding new pages and blocks or changing block settings and application colors) will require you to **Deploy** again, as well as reloading the app, to see the changes. Changes to Content blocks that have a **Dynamic Content** value of Yes will be shown without a new deployment. When a user opens the app and is shown the splash / launch screen the app is pulling the latest deployment from your server (or wherever your bundle is hosted).

![](https://community.rockrms.com/GetImage.ashx?Id=66808)

## Testing

Note

Note that the shell cannot connect to localhost without additional tooling like [ngrok](https://ngrok.com/) or something that can expose Rock to the web.  

The best way to test your application is using the Rock Mobile Core app available on the app stores.

**Apple / iOS**: [https://apps.apple.com/us/app/rock-core/id1498547817](https://apps.apple.com/us/app/rock-core/id1498547817)**Google** / **Android**: [https://play.google.com/store/apps/details?id=org.sparkdevnetwork.rockmobile](https://play.google.com/store/apps/details?id=org.sparkdevnetwork.rockmobile)

Simply tap and hold the screen with two fingers and a small popup with app information will appear. Tapping the **App Switcher** button will allow you to change the server to which the app connects.

![](https://community.rockrms.com/GetImage.ashx?Id=66809)

The App Switcher page has three fields that are required to connect to your server. All of this information can be found by navigating to the application's internal page (under **Home \> CMS Configuration \> Mobile Applications**) and selecting your app. Let's take a look at each of them.

### Application Id

This is the ID given to the application by Rock when it is created. It cannot be changed. To find your application ID, navigate to the **Application** page and find the Site/App Id in the top right. Alternatively, you can see the number in the URL bar.

![](https://community.rockrms.com/GetImage.ashx?Id=66810)

![](https://community.rockrms.com/GetImage.ashx?Id=66811)

## API URL

This is simply the URL to your Rock server's API. The **Public Application Root** with `/api` will be your URL. For example: [https://www.rockrms.com/api](https://www.rockrms.com/api)

## API Key

This was configured when creating your application. You can change this value during development, but any apps using this key will need to update their App Switcher page in order to connect again.

Important

You should not change this value after your app has been deployed to the stores. If it needs to be changed for any reason please reach out to App Factory for assistance.

When finished, your form will look something like this:

![](https://community.rockrms.com/GetImage.ashx?Id=66812)

Tap the **Launch App** button to connect and view your app. The App Switcher page will remember what you've entered so you only have to do this once.

Warning

If the connection fails, double-check that you've inserted the correct values and haven't mistyped anything. Also, be sure that your app has been deployed and has a green status tag.

## Rock Core App Connection

You can always connect back to the original Rock Mobile Core app if needed:

**App Id**

36

**API URL**

https://www.rockrms.com/api

**API Key**

rocksolidpihc

When it comes time to publish your app into the stores, get started with [App Factory](https://community.rockrms.com/developer/mobile-docs/app-factory).

---

## 📖 Lexicon {#lexicon}

Below are a few of the basic terms that will help you come up to speed as you start navigating the documentation and begin your first mobile app project.

| Name | Description |
| --- | --- |
| Application | Includes all of the Rock Mobile blocks, content, branding, and other configurable areas. Most visual elements are found here. |
| App Factory | Required publishing service for all Rock Mobile apps ([see more](https://community.rockrms.com/developer/mobile-docs/app-factory)) |
| Block | A single piece of content or functionality on a page, such as a content list or a login form. Blocks are added and configured in Rock, and the Shell displays them. ([see more](https://community.rockrms.com/developer/mobile-docs/essentials/blocks)) |
| Command | An action someone triggers from a button or link, such as opening a page, showing a cover sheet, or playing audio. ([see more](https://community.rockrms.com/developer/mobile-docs/essentials/commands)) |
| Core | The Rock server powering your app ([see more](https://community.rockrms.com/developer/mobile-docs/developers/core-shell-dependencies)) |
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

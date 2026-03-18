> **Path:** Mobile Docs > 🧱 Essentials > Advanced Topics > Deep Linking

# Deep Linking

Link from external websites directly into content within your application.

M v14.0C v4.0

Warning

Deep linking is easy to configure, but if configured incorrectly, can be difficult to fix. Please wait until you have coordinated publication with App Factory before setting up this feature.  

What is deep linking? You have encountered it without even knowing it. Using Amazon as an example, let's give the following process:

1.  Amazon is installed on the mobile device.
2.  You are sent a link to an Amazon product via message.

When the link is clicked, the product is opened directly in the app, not the browser.

The great news is that you can now achieve the same thing using Rock, and it isn't super complex.

## Getting Started 

First things first, we need to enable the deep linking HTTP module. This module catches all related deep-linking requests and handles them accordingly and efficiently.

To enable this module, navigate to `Admin Tools > CMS Configuration > HTTP Modules > Deep Links`, and set Active to `Yes`.

![](https://community.rockrms.com/GetImage.ashx?Id=67222)

This will require a Rock restart to take effect.

### Configuration Necessities

There are a few pieces of information you're going to need handy in order to configure deep linking. If you are unsure or unable to get any of the following information, please reach out to your [App Factory](https://mobiledocs.rockrms.com/app-factory/overview) contact.

| Name | Platform | Description |
| --- | --- | --- |
| Team Id | iOS | The Team Id used in relationship with your apple developer profile. ([Here](https://developer.apple.com/account/resources/identifiers), and then into your specific app) |
| Bundle Id | iOS | The Bundle Id used in relationship with your apple developer profile. ([Here](https://developer.apple.com/account/resources/identifiers), and then into your specific app) |
| Package Name | Android | The package name used in relationship with your Google developer account. ([Here](https://play.google.com/console/), into your specific app, and then into App Integrity on the left-hand side, then into App Signing and scroll down to Digital Asset Links). |
| Certificate Fingerprint | Android | The package name used in relationship with your Google developer account. ([Here](https://play.google.com/console/), into your specific app, and then into App Integrity on the left-hand side, then into App Signing). This is referred to as the "SHA-256 certificate fingerprint" in the play console. |
| Deep Link Path Prefix | Both | The prefix you want to correspond to your deep linking. |

All of these are given to you, with the exception of one piece of data to think about, your Deep Link Path Prefix. This is the prefix of all the routes that you plan to re-route to your mobile app. A common one is 'm' (for mobile). When you set your prefix, every deep link will be structured as such: `example.com/<DeepLinkPrefix>/<DeepLinkRoute>`.

Once you have all of these things, they go into the deep linking configuration directly.

Once this is saved, let's go ahead and test to make sure our server is processing deep link requests. Navigate to `<yourdomain>.com/.well-known/apple-app-site-association` and `<yourdomain>.com/.well-known/assetlinks.json`, you should see an output of a blank screen with just some text on it. As long as no errors are displayed on the page, and you put in the right configuration values, it is safe to assume that everything is good to go.

![](https://community.rockrms.com/GetImage.ashx?Id=67223)

## Creating Deep Links

Warning

Use of a deep link will bypass all Homepage Routing Logic. Be sure to apply any necessary routing logic on pages that could be navigated to via a deep link.

Now that we've configured deep links, it's time to actually add some. In our mobile application detail, we should now see a new Deep Links tab. Sweet!

![](https://community.rockrms.com/GetImage.ashx?Id=67224)

From here on, it should be easy to configure. Let's go ahead and add a deep link by pressing the add button in the bottom right-hand corner of the tab.

![](https://community.rockrms.com/GetImage.ashx?Id=67225)

Here is an example of a deep link configured - when `example.com/m/christmas` is navigated to, it will open directly to the Christmas page in the mobile application. Let's go through and break down all of these settings.

| Setting | Description |
| --- | --- |
| Route | The web route that we are linking to our mobile application. |
| Mobile Page | The mobile page that we are linking to from our route. |
| Fallback Method | Determines whether to redirect to a Rock page or an external URL if the app isn't installed. |
| Fallback Page | The page to fall back to if someone does not have the application installed. |
| Fallback URL | The URL to fall back to if someone does not have the application installed. |

You should take a look at [passing parameters to the fallback](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/deep-linking#passing-parameters).

## Passing Parameters

### To The Mobile Page

Linking directly to content is cool and all. But what if I need that to be personalized content, or have the content rendered based on something dynamic? You can do that with routes by introducing curly brackets (`{ key }`) to the route.

![](https://community.rockrms.com/GetImage.ashx?Id=67226)

If someone clicks a link to `example.com/m/christmas/b0b2d0b0-248f-4a8a-90a3-310807680ce5`, a parameter of `GroupGuid=b0b2d0b0-248f-4a8a-90a3-310807680ce5` would be passed along to the page.

### To The Fallback 

#### Fallback Page 

When you use a Rock page, the parameters from the route are automatically passed along. If the page you're directing to has a route with the same route parameter key, the value is injected there.

#### Fallback URL 

The fallback URL replaces any dynamic content in the original route with the same value. So for instance, if the route was:  

![](https://community.rockrms.com/GetImage.ashx?Id=67227)

## Extra Pieces

Before configuring deep linking, please make sure you have coordinated the publishing process already. This is a piece that needs to be wired up in a few different places and included in your app at compile time. If you fail to communicate that you wish to include/activate deep linking then this setting will not apply or work.

## Testing

With everything configured, it's time to test. On iOS, deep links can be tested against the TestFlight build before the update goes live. Unfortunately, the update must go live on Android before it can be tested.

Deep linking is implemented uniquely in the shell for each platform's requirements, so be sure to test both when you can. It may work for one and not the other, so if there are any issues, let the App Factory team know which platform is affected.

Typing a deep link URL into your browser app will not open the Rock Mobile app. You can use a Notes app or something with text entry to add the URL, then tap on it. This emulates the more common use case of someone tapping a deep link from their email or an SMS communication.

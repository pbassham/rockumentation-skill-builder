---
description: Use when configuring deep links to route external URLs directly into a Rock mobile application on iOS or Android
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Link from external websites directly into content within your application.

M v14.0C v4.0

Warning

Deep linking is easy to configure, but if configured incorrectly, can be difficult to fix. Please wait until you have coordinated publication with App Factory before setting up this feature.  

What is deep linking? You have encountered it without even knowing it. Using Amazon as an example, let's give the following process:

1. Amazon is installed on the mobile device.
2. You are sent a link to an Amazon product via message.

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

Test from a tapped link, never from the address bar. Both platforms ignore universal links and app links for URLs that are typed or pasted into a browser. Chrome blocks the app launch when the intent is "redirected from a typed in URL" or fires without a user gesture, and iOS behaves the same way. Tapping the link from Notes, Messages, or an email is the only reliable test. A link that fails in the address bar is not evidence of a broken configuration.

Once a link works, be careful about how you leave the app. Tapping the breadcrumb in the top-right corner of Safari tells iOS to prefer the website, and iOS remembers that choice for the whole domain. Every later tap opens Safari until the user taps OPEN in a Smart App Banner. If deep links stop working partway through a testing session, this is usually why. Reinstalling the app or testing on a clean device resets it.

## When a Link Won't Open The App

A correctly configured deep link will still open in the browser in a few situations. These are deliberate operating system behaviors, not configuration problems.

### Links on your own domain

When someone is already browsing your site in Safari and taps a link to that same domain, iOS keeps them in Safari. Apple's documentation states that iOS "respects the user's most likely intent and opens the link in Safari."

This matters because deep links resolve against your Rock server's domain, in the form `example.com/DeepLinkPrefix/DeepLinkRoute`. Any interstitial page hosted on that same domain, such as a QR code landing page, an NFC landing page, or a "choose an option" menu, will not hand its links off to the app.

Host the interstitial page on a different host than your deep link domain. A subdomain works, as long as it is not listed in the app's associated domains. Keep the buttons pointed at your normal deep link URLs and every tap will open the app.

### Redirects and scripted navigation 

Universal links and app links require a direct user tap. A server redirect, a window.location assignment, or a timer-driven navigation will land in the browser instead. Link to the deep link URL directly rather than routing through a shortener or a redirect.

### Getting into the app from a typed URL

Add a [Smart App Banner](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/PromotingAppswithAppBanners/PromotingAppswithAppBanners.html) to the page. Its OPEN button is the only supported route into the app when someone reaches the page by typing the URL, and the app-argument value carries the deep link through. Add a meta tag named apple-itunes-app whose content sets app-id to your App Store ID and app-argument to the full deep link URL. The banner also clears the Safari preference described in Testing above.

### The app opens but lands on the homepage

This is a Rock configuration issue rather than a platform one. The app matches the incoming path against the deep link routes in the mobile bundle. When no route matches, it navigates to the homepage and shows "Unable to find the page specified." Check the Route value on the Deep Links tab against the actual URL path, including the Deep Link Path Prefix.

Two notes before you publish. The Smart App Banner subsection now describes the meta tag in prose rather than showing markup, so add the actual snippet in your CMS code block if you want partners copying it directly. And keep the last subsection even though it isn't an OS behavior, since it's the failure people most often misreport as "deep linking is broken."

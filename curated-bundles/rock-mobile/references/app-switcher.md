---
description: "Use when configuring Rock Core app to test mobile applications during development, sandbox testing, or connecting to different servers"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

The App Switcher points the Rock Core app at any Rock Mobile application, so you can see your own app on a real phone without publishing it. Use it while you build your app, to try changes on a sandbox before they reach your live app, and to run a pre-release build against your own server.

## Opening the Switcher

Install the Rock Core app from the [App Store](https://apps.apple.com/us/app/rock-core/id1498547817) or [Google Play](https://play.google.com/store/apps/details?id=org.sparkdevnetwork.rockmobile).

In the app, tap and hold the screen with two fingers. A small popup with app information appears. Tap **App Switcher** to change the server the app connects to.

![The app information popup with the App Switcher button](https://community.rockrms.com/GetImage.ashx?Id=66809)

## Connection Fields

The App Switcher needs three values. You'll find all of them on your application's page under **Admin Tools \> Settings \> Mobile Applications**.

| Field | Where to find it |
| --- | --- |
| App Id | The Site/App Id in the top right of your application's page, or the number in the page's URL. Rock assigns it when the app is created, and it can't be changed. |
| API URL | Your server's **Public Application Root** followed by `/api`, such as `https://www.rockrms.com/api`. |
| API Key | The key you set when you created the application. If you change it during development, re-enter it in the App Switcher on every device you test with. |

![The Site/App Id on the application page](https://community.rockrms.com/GetImage.ashx?Id=66810)

![The App Id in the page URL](https://community.rockrms.com/GetImage.ashx?Id=66811)

Important

Don't change the API Key after your app has been published to the stores. If it needs to change for any reason, reach out to App Factory for help.

When you're done, the form looks something like this:

![The App Switcher form filled in](https://community.rockrms.com/GetImage.ashx?Id=66812)

Tap **Launch App** to connect. The App Switcher remembers what you entered, so you only need to do this once per server.

## Sandbox Testing

**If your organization has a sandbox copy of Rock, test your app changes there first.** Make your page and block changes on the sandbox, deploy them there, then enter the sandbox's App Id, API URL and API Key in the App Switcher. Your published app keeps loading from your production server, so the people using it won't see anything until you make the same changes there.

If your sandbox was copied from production, the App Id and API Key are usually the same as production, and only the API URL changes.

## Pre-Release Builds

Pre-release builds of Rock Core from TestFlight and Firebase App Distribution include the App Switcher too. Some features in a pre-release build need a matching pre-release version of Rock, so a sandbox running that version is the best place to point one. See [Pre-Release Testing](https://community.rockrms.com/developer/mobile-docs/app-factory/pre-release-testing) to install a build.

## Back to Rock Core

To connect back to the original Rock Core app, enter these values:

| Field | Value |
| --- | --- |
| App Id | 36 |
| API URL | https://www.rockrms.com/api |
| API Key | rocksolidpihc |

## Troubleshooting

If the app won't connect, check these:

- **Typos:** Re-check all three values, especially the API URL and API Key.
- **Deployment:** The app has to be deployed first. Its status on the application page should show a green tag. See [Deploying Your App](https://community.rockrms.com/developer/mobile-docs/building-your-first-app/deploying-your-app).
- **Reachability:** The phone has to reach your server over the internet. The app can't connect to `localhost` unless you expose it with a tool like [ngrok](https://ngrok.com/).
- **Changed key:** If someone changed the API Key, enter the new one in the App Switcher.

---

## Blocks {#blocks}

Rock Mobile uses blocks the same way as Rock Web does. You create pages, add blocks to them, and configure them. Then when you deploy your app all that information will get bundled up so the mobile app knows how to communicate with your site.

Important

Note that Page and Block security only works for Roles, not individual User accounts.

Many blocks are self-explanatory, though we're not saying they don't need some documentation too. We'll continue adding some helpful hints about all the blocks, such as what is available in Lava merges and what-not.

If there is missing or unclear documentation, please feel free to file a documentation request on our [issues board](https://github.com/SparkDevNetwork/Rock.Mobile-Issues).

## Integrated Scroll

Some blocks will have built-in scrolling mechanics. This means that the [Zone](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/zone) in which the block resides should not be placed within any sort of layout that provides scrolling (such as `ScrollView`). These blocks will have a special badge in the documentation, that looks like this:

Integrated Scroll

## Mark a block to expand vertically

Mobile6.0

In some cases, you may want a block to stretch to the full height of the zone (in 99% of cases, this entails the entire screen). In Xamarin, this was achieved by the use of a now-deprecated `FillAndExpand` property.

In MAUI, this is achieved through the use of an attached property. **Within the block, you want to expand** add a `Rock:Zone.Expands="true"` property on the outermost layout.

![](https://community.rockrms.com/GetImage.ashx?Id=66816)

Currently, for other block types (blocks with the Integrated Scroll tag), we have an internal flag that gets set to mark a block to expand.

---

## CMS {#cms}

This section refers to the 'CMS' mobile block group.

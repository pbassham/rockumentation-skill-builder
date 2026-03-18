> **Path:** Mobile Docs > 📱 Building Your First App > Deploying Your App

# Deploying Your App

## Deployment

![](https://community.rockrms.com/GetImage.ashx?Id=66807)

Navigating to the **Application** page for your app shows the deployment status in the top right. New apps start as Not Deployed, so you'll need to click the **Deploy** button in the bottom right corner to test your app. The first deploy may take a few moments, but generally this process happens quickly.

Note that making changes to the app (like adding new pages and blocks or changing block settings and application colors) will require you to **Deploy** again, as well as reloading the app, to see the changes. Changes to Content blocks that have a **Dynamic Content** value of Yes will be shown without a new deployment. When a user opens the app and is shown the splash / launch screen the app is pulling the latest deployment from your server (or wherever your bundle is hosted).

![](https://community.rockrms.com/GetImage.ashx?Id=66808)

## Testing

Note

Note that the shell cannot connect to localhost without additional tooling like [ngrok](https://ngrok.com/) or something that can expose Rock to the web.  

The best way to test your application is using the Rock Mobile Core app available on the app stores.

**Apple / iOS**: [https://apps.apple.com/us/app/rock-mobile-showcase/id1498547817](https://apps.apple.com/us/app/rock-mobile-showcase/id1498547817) Google / **Android**: [https://play.google.com/store/apps/details?id=org.sparkdevnetwork.rockmobile](https://play.google.com/store/apps/details?id=org.sparkdevnetwork.rockmobile)

Simply tap and hold the screen with two fingers and a small popup with app information will appear. Tapping the **App Switcher** button will allow you to change the server to which the app connects.

![](https://community.rockrms.com/GetImage.ashx?Id=66809)

The App Switcher page has three fields that are required to connect to your server. All of this information can be found by navigating to the application's internal page (under **Home > CMS Configuration > Mobile Applications**) and selecting your app. Let's take a look at each of them.

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

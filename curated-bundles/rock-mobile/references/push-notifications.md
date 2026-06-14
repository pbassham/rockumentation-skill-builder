---
description: "Use when answering questions about sending push notifications to Rock Mobile app users, configuring notification transports, or authoring notification messages with links and details"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

![](https://community.rockrms.com/GetImage.ashx?Id=67061)

Push notifications are a great way to communicate with people using your app. With Rock Mobile, you can send messages to specific individuals, communication lists, or to everyone that has the app installed, even when they're not signed in.

## Authoring Notifications

If you've used the Communication Wizard in Rock to send emails or SMS messages before, you'll be right at home. You can read more about how to use this in the [Communicating With Rock manual](https://community.rockrms.com/Rock/BookContent/8#communicationwizard).

There are two options for the Open Action - `Link to Mobile Page` and `Show Details`. The former is self-explanatory, allowing you to reference a mobile app page (don't pick a page from a non-mobile site). You can also pass query strings, which may be needed depending on which page you're linking to. For example, if you want to promote the latest message that was just posted, you can link to the Message Details page and pass a query string of `Guid` with the value of the content channel item's GUID, assuming you're using this flow to power your messages in-app.

When selecting the Open Action of `Show Details`, a text editor will appear. Many of the formatting options available here will not be shown in the app, so keep your message as basic as possible. In general, the same [Supported Tags](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls) in HTML should work here. This will open the message in the app if you've got the [Communication View](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/communication/communication-view) block configured.

You can also add images to your details message. These will not be shown in the notification itself, only in the app when the notification is opened. It's recommended to resize and compress your image to optimize performance and avoid image pop-in when the page is opened.

For a standard 16:9 image, we'd recommend no larger than 960x540 and a few hundred KB.

![](https://community.rockrms.com/GetImage.ashx?Id=67062)

You'll typically want 100% when adding images so they stretch full-width.

## Configuration

During the App Factory process, app notifications are configured. A few changes must be made within your Rock instance to ensure your app users are able to receive push notifications properly.

### Service Account JSON

To properly configure the push notification transport, you should download your Service Account JSON from the [Triumph Tech Partner Portal](https://www.triumph.tech/partner-portal/mobile). If you can't see your mobile application listed, you should reach out for [support](https://www.triumph.tech/mobile-shell-update-request) from Triumph Tech.

### Communications

Rock administrators will need to access the Communications page via 'Admin Tools'. Both the 'Communication Transport' and 'Communication Mediums' pages will need to be accessed in order to establish the connection between Rock and the push notification system that will ultimately be sent through Apple and Google.

### Communication Transport

Locate the line item 'Rock Mobile Push'. This property is required in order for the Rock instance to successfully generate an individual's Personal Device Id (See Personal Device Id below for more information).

![](https://community.rockrms.com/GetImage.ashx?Id=67063)

### Communication Mediums

The Communication Transport is only the first of a two-part setup process within the Rock instance. Once the transport is enabled, Rock must understand that you would like to utilize the 'Rock Mobile Push' transport as the Push Notification Medium. Within Communication Mediums, a 'Push Notification' property must be set.

![](https://community.rockrms.com/GetImage.ashx?Id=67064)

Ensure Push Notifications are 'Active', and the transport container is 'Rock Mobile Push'

With the aforementioned communication changes set, the Rock instance is one last step away from being able to send push notifications successfully.

## Setting Up The App

In order for someone to receive a notification from your app, they must have notifications enabled. To do that, the app must request access to send notifications, allowing them to define their preferences. There's a command called [EnablePushNotifications](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#enablepushnotifications) that you can use to initiate this request. There is also an application setting called **Enable Notifications Automatically** under Advanced Settings. When enabled, this will request notification access at launch.

You may want to determine on a page if Push Notifications are enabled and ready for use so that you can prompt the user to enable them. For example, if you have a page that lets the user sign up to receive push notifications about an upcoming event, you might want to make sure notifications are enabled - or at least tell the user they have disabled them. We provide two values in your AppValues model to detect these states.

1. **core\_PushNotificationHasBeenRequested** - This will be a True boolean value if the user has ever been prompted to enable push notifications. Otherwise, it will be False.
2. **core\_NotificationsAreEnabled** - This will be a True boolean value if notifications are determined to be enabled on the device. Otherwise, it will be False.

In the example below, we are manually building an if-else block by making use of the IsVisible properties. The first StackLayout will be shown if the user has never been asked to enable push notifications. The second StackLayout will be shown if the user has been asked but either denied or disabled notifications. The third and final StackLayout will be shown if they have been both asked and have notifications enabled.

Additionally, the first block will let them click a button to enable notifications. The second block has a button they can click to go to Settings and turn notifications back on.

You might wonder why we are doing it this way even though the AppValues are accessible via Lava. The reason to use bindings like this is so the UI is reactive. Suppose they have manually turned off notifications. The second block will show prompting them to go to settings and re-enable them. The user clicks the button, goes to settings and turns notifications back on, and then returns to the application. As soon as the app loads it will update the AppValues which will trigger the Binding to update and hide the second block and show the third block instead. All without having to actually reload the page.

```
//- If
<VerticalStackLayout IsVisible="{Binding AppValues.core_PushNotificationHasBeenRequested, Converter={Rock:InverseBooleanConverter}}">
    <Label Text="Would you like to enable push notifications?" />
    <Button StyleClass="btn,btn-primary"
        Text="Enable Notification"
        Command="{Binding EnablePushNotifications}" />
</VerticalStackLayout>

//- Elseif
<VerticalStackLayout IsVisible="{Binding AppValues.core_PushNotificationHasBeenRequested}">
    <VerticalStackLayout IsVisible="{Binding AppValues.core_NotificationsAreEnabled, Converter={Rock:InverseBooleanConverter}}">
        <Label Text="Your notifications are disabled, would you like to fix that?" />
        <Button StyleClass="btn,btn-primary"
            Text="Settings"
            Command="{Binding OpenAppSettings}" />
    </VerticalStackLayout>

    //- Else
    <VerticalStackLayout IsVisible="{Binding AppValues.core_NotificationsAreEnabled}">
        <Label Text="You'll be hearing from us." />
    </VerticalStackLayout>
</VerticalStackLayout>
```

## Sending a Push Notification

Now that the Push Notification medium is established, the Rock instance understands where the Push Notification communication is sent. The final step to sending a push notification is to enable the Push Notification communication option within the 'New Communication' block settings.

![](https://community.rockrms.com/GetImage.ashx?Id=67065)

After selecting a communication list or generating a manual list, a prompt for the communication medium will appear. To send a push notification select 'Push'.

![](https://community.rockrms.com/GetImage.ashx?Id=67066)

## Alternative Sending Methods

Rock allows for more than just the ability to send push notifications via a communication list or manual list. The Mass Push Notification allows the Rock instance to send anyone who has downloaded the app a push notification regardless of if the user is logged in. This is quite powerful and should be used for special circumstances. For example, Mass Push Notifications are useful if the "Campus is closed due to weather". There are many uses for this functionality but bear in mind that when it is used, everyone, no matter their login status will receive a push notification.

There's also a workflow action called Send Push Notification. You can provide the page that individuals will open in the app when they tap the notification. As you might imagine, this unlocks powerful capabilities with alerts or conditional notifications.

## Personal Device ID

Each time the Rock Mobile application is downloaded, a Personal Device and ultimately a Personal Device Id (PersonalDeviceId) is generated. The id that is generated within that field is utilized by the communication transport's server key to make a connection to the push notification system for device verification. If the push notification system has the same device ID, a push notification will be sent when generated. Otherwise, the generated push notification will fail to send.

This is one of the first points of emphasis to debug if push notifications are failing to send but all aforementioned steps of the setup process are successfully established. Below is a helpful SQL query that can be run to ensure users and devices are receiving a valid 'PersonalDeviceId'.

```
SELECT
  p.[NickName],
  p.[Id],
  pd.[Id] AS [DeviceId],
  pd.[PersonAliasId], 
  pd.[Name],
  pd.[DeviceRegistrationId],
  pd.[Guid]
FROM [PersonalDevice] pd
  LEFT JOIN [PersonAlias] pa ON pd.[PersonAliasId] = pa.[Id]
  LEFT JOIN [Person] p ON pa.[PersonId] = p.[Id]
```

Important

On Jun 24, 2024 the legacy service used to power push notifications will stop working. The updated version of this service is integrated with Core v15.2+ and you'll need to coordinate with the App Factory team to update your Service Account JSON in Rock.This update will not require a shell update to the app stores, but you can use this link: https://www.triumph.tech/mobile-shell-update-request

---

## Rock Logins {#rock-logins}

The app stores require our team to provide credentials that can log into the app when we submit it. We’ll need you to set up two separate logins (one for each store) and keep them active for the duration of your Rock Mobile app, to assist with the initial publishing and the Shell updates.

These credentials do not need special permissions and can be for demo access only.

Please see the below documentation on quickly setting these up and provide the credentials here.

## Creating Credentials

### Step 1

Go to the current profile you have for our team or create a new one for Triumph Tech. Navigate to the Security tab on the profile page.

![](https://community.rockrms.com/GetImage.ashx?Id=67068)

### Step 2

Create one new login for Apple, as seen below.

![](https://community.rockrms.com/GetImage.ashx?Id=67069)

### Step 3

Then create a second for Google in the same pattern. It is ok to use the same password. When you're done the account list should look something like:

![](https://community.rockrms.com/GetImage.ashx?Id=67070)

---

## Shell Update Requirements {#shell-update-requirements}

In general, the goal of Rock Mobile is to always keep shell versions compatible with future versions of Rock Core so that you aren't required to update until you want access to the latest additions. That being said, every app shell will need to be updated infrequently to target the latest versions of Android and iOS, otherwise your app may be unavailable to those on the latest OS versions.

## Android

[https://support.google.com/googleplay/android-developer/answer/11926878](https://support.google.com/googleplay/android-developer/answer/11926878)

![](https://community.rockrms.com/GetImage.ashx?Id=67071)

Every year Google updates Android with a new version and underlying API level. The Rock Mobile shell targets an API level and is updated periodically as those become available. Google's policy is that existing apps must target the latest major Android version's API level within two years, or that app won't be available to new Android versions.

To put it simply, your Rock Mobile app on Android needs a shell update published to the Play Store at least once every 1-2 years, but an annual cadence is recommended.

---

## ✨ Releases {#releases}

# ✨ Releases

---

## Release v19.1 {#release-v191}

## Overview

This release moves the Rock Mobile Shell from **v7.0 straight to v19.0**. There is no public v8.0 (and nothing in between). Going forward, the Shell version line matches the **Rock core version**, so the app and the server now share the same version number (v19) instead of the old mismatched scheme where Shell v7 ran against Rock core v18. If you have automation, documentation, or theme logic that keys off the Shell version string, expect it to report **19.0** now rather than 7.0 or 8.0.

**We recommend running a Shell version that matches your Rock core version** (for example, Shell v19.x against Rock core v19.x). The Shell and Core ship contracts to each other, and a large mismatch between the two can cause features to behave incorrectly or fail to load. Aligning the version numbers is exactly what this jump is meant to make easy: keep them on the same major version. In general, dot releases will only contain bug fixes and minor enhancements, not new features.

## Breaking Changes

1. **Version line realigned to Rock core**. The Shell jumped from v7.0 to v19.0, skipping v8.0 and everything up to v18, to stay in step with Rock core versioning. Anything that compares or parses the Shell version (release pipelines, "what version am I on" checks, conditional theme logic) needs to account for the jump. There is no functional downgrade. v19.0 contains everything that was in v7.0, plus the work below.
2. **Avatar control now renders with a native border.** The Avatar control was rebuilt on the native border control rather than the previous rounded frame. Avatars look the same out of the box, but if you authored a custom theme or page XAML that styled the avatar's old inner frame directly, review those screens after upgrading to confirm shape and spacing still look correct.

## Styling Change

The default card styling no longer draws a border, and we added a drop shadow for a cleaner card look. If you prefer the previous bordered and no shadow look, you can restore it by adding the following to your styles

```
.default-card {
  border-color: ?color-interface-soft;
  border-width: 1;
  -rock-box-shadow: false;
  border-radius: 8;
}
```

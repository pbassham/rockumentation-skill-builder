> **Path:** Mobile Docs > 🏭 App Factory > Push Notifications

# Push Notifications

Brief communications sent from Rock to user's devices.

Important

On June 24, 2024 the legacy service used to power push notifications will stop working.The updated version of this service is integrated with Core v15.2+ and you'll need to coordinate with the App Factory team to update your Service Account JSON in Rock.This update will not require a shell update to the app stores, but you can use this link: https://www.triumph.tech/mobile-shell-update-request

![](https://community.rockrms.com/GetImage.ashx?Id=67061)

Push notifications are a great way to communicate with your app users. With Rock Mobile, you can send messages to specific individuals, communication lists, or to everyone that has the app installed, even when they're not signed in.

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

## Communication Mediums

The Communication Transport is only the first of a two-part setup process within the Rock instance. Once the transport is enabled, Rock must understand that you would like to utilize the 'Rock Mobile Push' transport as the Push Notification Medium. Within Communication Mediums, a 'Push Notification' property must be set.

![](https://community.rockrms.com/GetImage.ashx?Id=67064)

Ensure Push Notifications are 'Active', and the transport container is 'Rock Mobile Push'

With the aforementioned communication changes set, the Rock instance is one last step away from being able to send push notifications successfully.

## Sending a Push Notification

Now that the Push Notification medium is established, the Rock instance understands where the Push Notification communication is sent. The final step to sending a push notification is to enable the Push Notification communication option within the 'New Communication' block settings.

![](https://community.rockrms.com/GetImage.ashx?Id=67065)

After selecting a communication list or generating a manual list, a prompt for the communication medium will appear. To send a push notification select 'Push'.

![](https://community.rockrms.com/GetImage.ashx?Id=67066)

## Alternative Push Notification Sending Method

With push notifications, Rock allows for more than just the ability to send them via a communication list or manual list. The Mass Push Notification allows the Rock instance to send anyone who has downloaded the app a push notification regardless of if the user is logged in. This is quite powerful and should be used for special circumstances. For example, Mass Push Notifications are useful if the "Campus is closed due to weather". There are many uses for this functionality but bear in mind that when it is used, everyone, no matter their login status will receive a push notification.

## Personal Device ID

Each time the Rock Mobile application is downloaded, a Personal Device and ultimately a Personal Device Id (PersonalDeviceId) is generated. The id that is generated within that field is utilized by the communication transport's server key to make a connection to the push notification system for device verification. If the push notification system has the same device ID, a push notification will be sent when generated. Otherwise, the generated push notification will fail to send.

This is one of the first points of emphasis to debug if push notifications are failing to send but all aforementioned steps of the setup process are successfully established. Below is a helpful SQL query that can be run to ensure users and devices are receiving a valid 'PersonalDeviceId'.

```sql
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

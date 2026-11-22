---
description: Use when user needs to create custom follow/unfollow buttons or commands for entities like people and groups in Rock Mobile applications
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile1.0

The command is used to follow and unfollow specific entities.

Previously, this behavior was only utilized using the [Following Icon](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/following-icon), but now with this command, you can easily mimic that to create custom follow/unfollow buttons.

When following a person you'll want to use the PersonAlias entity type, not the Person.

Note that this command does not refresh the page. If you have following icons and expect them to be updated from this command, it does not work as such. Consider using [SetViewProperty](https://community.rockrms.com/developer/mobile-docs/commands/setviewproperty) to make visual changes in response to follow and unfollow actions.

Warning

Following needs a logged-in person. If no one is logged in, the command shows its not-logged-in message instead.  
  
The command calls `POST api/Followings/{entityTypeId}/{entityId}` to follow and `DELETE api/Followings/{entityTypeId}/{entityId}` to unfollow. Both actions on the Followings REST controller need Edit permission, which you set under Admin Tools \> Security \> REST Controllers. Starting with Core v16, grant it to the 'RSR - Mobile Application Users' role. Earlier versions use 'All Authenticated Users'. Without it, people see "Unable to process your request." The [Security Considerations](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/following-icon#security-considerations) section of Following Icon walks through the setup.

## Properties

| Property | Type | Descriptions |
| --- | --- | --- |
| EntityId | int | The Id of the entity to follow or unfollow. |
| EntityTypeId | int | The Id of the entity type to follow or unfollow. |
| PurposeKey | string | An optional parameter that allows you to set a 'Purpose Key' while following or unfollowing. |
| NotificationText | string | The text to display on the Toast when an item is successfully followed/unfollowed. Note: Setting this as empty ("") will remove the Toast from ever being displayed, if you wish to do that. |
| NotificationType | [NotificationType](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/notification-box#notification-type) | The notification type of the Toast to be displayed. |
| IsFollow | bool | Whether or not the command is used to follow or unfollow, set to false to configure "unfollowing" behavior. *Defaults to* *true**.* |
| UseHapticFeedback | bool | If enabled, the command will perform haptic feedback when tapped. *Defaults to* *true**.* |

```
<HorizontalStackLayout>
    {% assign group = 70 | GroupById %}

    <Button Text="Follow"
        Command="{Binding Follow}">
        <Button.CommandParameter>
            <Rock:FollowParameters EntityId="{{ group.Id }}"
                EntityTypeId="{{ group.TypeId }}" />
        </Button.CommandParameter>
    </Button>

    <Button Text="Unfollow"
        Command="{Binding Follow}">
        <Button.CommandParameter>
            <Rock:FollowParameters IsFollow="False"
                EntityId="{{ group.Id }}"
                EntityTypeId="{{ group.TypeId }}"
                NotificationText="Unfollowed!" />
        </Button.CommandParameter>
    </Button>
</HorizontalStackLayout>
```

---

## Logout {#logout}

Mobile1.0

This command will allow you to logout the current person from the application. It will then redirect to the homepage.

The `CommandParameter` can be one of the following items: Mobile2.0

- A string that contains either the value "True" to indicate that the current page should be reloaded, or the Guid of the page to show instead of the home page.
- An instance of the `LogoutParameters` object that is outlined below.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| ReloadPage | bool | If true then the current page is reloaded instead of navigating away. *Defaults to* *false**.* |
| PageGuid | Guid? | The page to navigate to instead of the home page. *Defaults to* *null**.* |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Optional parameters to pass to the page in the query string. *Defaults to* *empty**.* |

```
<Button Text="Logout"
    Command="{Binding Logout}" />
```

---

## MapAddress {#mapaddress}

Mobile3.0

This command tries to open a location, either an address or coordinates, directly in the device’s default maps app, like Google Maps or Apple Maps. It skips the step of launching a browser, making the experience quicker and more seamless for an individual.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the location as you want it to appear on the user's map application. |
| Address | string | The address to which you want the app to locate. |
| Latitude | double? | The latitude of a place to locate. Useless without also providing "Longitude". |
| Longitude | double? | The longitude of a place to locate. Useless without also providing "Latitude". |

Note

This command will **not** work when defining properties inline: {Rock:MapAddressParameters Name='', Address=''}

Using an address (recommended):

```
<Button Text="Get Directions"
    StyleClass="btn, btn-primary-strong"
    Command="{Binding MapAddress}">
    <Button.CommandParameter>
        <Rock:MapAddressParameters Name="Phoenix Convention Center"
            Address="100 N 3rd St, Phoenix, AZ 85004" />
    </Button.CommandParameter>
</Button>
```

Using latitude/longitude:

```
<Button Text="Get Directions"
    StyleClass="btn, btn-primary-strong"
    Command="{Binding MapAddress}">
    <Button.CommandParameter>
        <Rock:MapAddressParameters Name="Phoenix Convention Center"
            Latitude="33.4498969"
            Longitude="-112.0705366" />
    </Button.CommandParameter>
</Button>
```

---

## OpenAppSettings {#openappsettings}

Mobile3.0

This command will open the device's settings application and take the user directly to the settings for your mobile application.

There are currently no parameters available for this command.

```
<Button Text="Settings"
    Command="{Binding OpenAppSettings}" />
```

## Related

- [EnablePushNotifications](https://community.rockrms.com/developer/mobile-docs/commands/enablepushnotifications) asks the person to allow push notifications.

---

## OpenBrowser {#openbrowser}

Mobile1.0

This command allows you to open a web address using the built-in browser inside the application.

If you are opening a URL to your own Rock server and wish to ensure the user is logged in, you can pass an empty `rckipid` parameter and an impersonation token will be automatically generated.

Note that tokens generated with an empty parameter will use the settings defined in Rock's [global attributes](https://community.rockrms.com/Rock/BookContent/9#configuringpersontokens), which may be more open than your specific implementation needs. Consider your impersonation strategy and understand the risk that individuals can share their impersonated URL without realizing it. Alternatively, you can use the Lava filter [PersonImpersonationToken](https://community.rockrms.com/lava/filters/person-filters#personimpersonationtoken).  

The built-in browser does not store Rock authentication tokens long-term, so passing an empty rckipid parameter is how individuals are signed in automatically. However, Rock will not create or accept a personal token for anyone whose Account Protection Profile is listed under "Disable Usage of Personal Tokens for the Following Protection Profiles" in Security Settings (by default, the Extreme profile). Those individuals will need to sign in manually each time the browser opens, even if they check "Stay signed in." Everyone else is signed in through the token as expected.

The `CommandParameter` can either be a string, which contains the URL and query string parameters, or it can be a reference to an `OpenBrowserParameters` object which contains the following properties.

Note

When the URL has an empty `rckipid` parameter, the app calls `GET api/People/GetCurrentPersonImpersonationToken` to get a sign-in token. That action of the People REST controller needs View permission, which you set under Admin Tools \> Security \> REST Controllers. Starting with Core v16, grant it to the 'RSR - Mobile Application Users' role. Earlier versions use 'All Authenticated Users'. Tokens are only added to HTTPS URLs on the Rock server's own domain or the site's impersonation token domains. If the person isn't logged in, or the permission is missing, the page opens signed out with no message.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Url | string | The URL to be opened. May contain query string parameters. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Any additional query string parameters to be included with the URL. |

```
<Button Text="Open Internal"
    Command="{Binding OpenBrowser}"
    CommandParameter="https://www.rockrms.com/" />
```
```
<Button Text="Open Internal"
    Command="{Binding OpenBrowser}">
    <Button.CommandParameter>
        <Rock:OpenBrowserParameters Url="https://www.rockrms.com/">
            <Rock:Parameter Name="q"
                Value="rockrms" />
        </Rock:OpenBrowserParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [OpenExternalBrowser](https://community.rockrms.com/developer/mobile-docs/commands/openexternalbrowser) opens a URL in the device's own browser.

---

## OpenExternalBrowser {#openexternalbrowser}

Mobile1.0

Similar to the OpenBrowser command, this one opens a URL in a browser window. The difference between the two is that this command uses the devices native web browser and opens the URL in that application. This means your user leaves your mobile app and gets sent over to Safari or Chrome.

If you are opening a URL to your own Rock server and wish to ensure the user is logged in, you can pass an empty `rckipid` parameter and an impersonation token will be automatically generated.

Note that tokens generated with an empty parameter will use the settings defined in Rock's [global attributes](https://community.rockrms.com/Rock/BookContent/9#configuringpersontokens), which may be more open than your specific implementation needs. Consider your impersonation strategy and understand the risk that individuals can share their impersonated URL without realizing it. Alternatively, you can use the Lava filter [PersonImpersonationToken](https://community.rockrms.com/lava/filters/person-filters#personimpersonationtoken).

Because this command uses the device's native browser, individuals who sign in and check "Stay signed in" will remain signed in. However, Rock will not create or accept a personal token for anyone whose Account Protection Profile is listed under "Disable Usage of Personal Tokens for the Following Protection Profiles" in Security Settings (by default, the Extreme profile). For those individuals, appending rckipid to the query string will override their existing browser sign-in, so they will not stay signed in. If this affects your staff or other high-protection individuals, consider leaving rckipid off of the URL.

The `CommandParameter` can either be a string, which contains the URL and query string parameters, or it can be a reference to an `OpenExternalBrowserParameters` object which contains the following properties.

Note

When the URL has an empty `rckipid` parameter, the app calls `GET api/People/GetCurrentPersonImpersonationToken` to get a sign-in token. That action of the People REST controller needs View permission, which you set under Admin Tools \> Security \> REST Controllers. Starting with Core v16, grant it to the 'RSR - Mobile Application Users' role. Earlier versions use 'All Authenticated Users'. Tokens are only added to HTTPS URLs on the Rock server's own domain or the site's impersonation token domains. If the person isn't logged in, or the permission is missing, the page opens signed out with no message.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Url | string | The URL to be opened. May contain query string parameters. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Any additional query string parameters to be included with the URL. |

```
<Button Text="Open External"
    Command="{Binding OpenExternalBrowser}"
    CommandParameter="https://www.rockrms.com/" />
```
```
<Button Text="Open External"
    Command="{Binding OpenExternalBrowser}">
    <Button.CommandParameter>
        <Rock:OpenExternalBrowserParameters Url="https://www.rockrms.com/">
            <Rock:Parameter Name="q"
                Value="rockrms" />
        </Rock:OpenExternalBrowserParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [OpenBrowser](https://community.rockrms.com/developer/mobile-docs/commands/openbrowser) opens a URL in the browser inside the app.

---

## PageEvent {#pageevent}

Mobile1.0

You learned, or will learn, elsewhere that you can use Lava on the mobile shell to handle certain page events and respond to them. Normally these page events are just ones generated by the system for you. However, you can trigger your own custom page events using this command.

The `CommandParameter` can either be a plain string that indicates the event name to be triggered, or it can be an instance of the `PageEventParameters` object. This latter method allows you to pass parameters into your lava logic.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Event | string | The name of the event to be triggered. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Any parameters that will be passed to the Lava engine, these manifest as lava variables. |

## Examples

```
<Button Text="Tap"
    Command="{Binding PageEvent}"
    CommandParameter="UserTap" />
```
```
<Button Text="Tap"
    Command="{Binding PageEvent}">
    <Button.CommandParameter>
        <Rock:PageEventParameters Event="UserTap">
            <Rock:Parameter Name="GroupId"
                Value="18" />
        </Rock:PageEventParameters>
    </Button.CommandParameter>
</Button>
```

See the Page Events section of [Dynamic Content](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/dynamic-content) for how to handle these events in Lava.

---

## PerformHapticFeedback {#performhapticfeedback}

Mobile3.0

Performs haptic feedback, a short vibration, on the person's device. See the .NET MAUI [haptic feedback](https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/device/haptic-feedback) docs for how each type feels on iOS and Android.

The `CommandParameter` is a string, but can be left out unless you specifically want to implement the "LongPress" type. Everything else will default to the "Click" type.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| HapticFeedbackType | string | The type of haptic feedback you want to implement. Only two accepted values are "Click" or "LongPress". |

## Examples

```
<!-- Example with no command parameter. Defaults to "Click". -->
<Button Text="Haptic"
    Command="{Binding PerformHapticFeedback}" />
```
```
<!-- Example with the "LongPress" command parameter. -->
<Button Text="Haptic LongPress"
    Command="{Binding PerformHapticFeedback}"
    CommandParameter="LongPress" />
```

## Related

- [ShowToast](https://community.rockrms.com/developer/mobile-docs/commands/showtoast) shows a short message that goes away on its own.

---

## PlayAudio {#playaudio}

Mobile1.0

Like the [PlayVideo](https://community.rockrms.com/developer/mobile-docs/commands/playvideo) command, this initiates a full-screen playback of an audio file. Given that it's audio, there won't be much to see.

The `CommandParameter` consists of a string that contains the URL of the audio file to be played.

Note

Starting in Mobile2.0 you can also pass in a PlayAudioParameters object which contains the following properties.

Note

The audio URL must use HTTPS. Otherwise the app shows an "Insecure Source Detected" alert instead of playing it.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| ThumbnailSource | string | The URL that contains the image to displayed as the thumbnail of the media player. This overrides any embedded artwork found in the metadata. |
|  |  | *(See* *PlayVideoParameters* *for more properties)* |

## Examples

```
<Button Text="Tap"
    Command="{Binding PlayAudio}"
    CommandParameter="http://www.noiseaddicts.com/samples_1w72b820/2541.mp3" />
```
```
<Button Text="Tap"
    Command="{Binding PlayAudio}">
    <Button.CommandParameter>
        <Rock:PlayAudioParameters Source="http://www.noiseaddicts.com/samples_1w72b820/2541.mp3"
            ThumbnailSource="https://upload.wikimedia.org/wikipedia/commons/c/c5/Big_buck_bunny_poster_big.jpg" />
    </Button.CommandParameter>
</Button>
```

## Related

- [PlayVideo](https://community.rockrms.com/developer/mobile-docs/commands/playvideo) plays a video.

---

## PlayVideo {#playvideo}

Mobile1.0

This command initiates the playing of a video in full-screen. Usually, it is better to use the [MediaPlayer](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/media-player) view instead, but there are times you just want to play a video when the user taps a button.

The `CommandParameter` consists of a string that contains the URL of the video to be played.

Note

Starting in Mobile2.0 you can also pass a PlayVideoParameters object that lets you customize the look of the media player. It contains the following properties.

Note

The video URL must use HTTPS. Otherwise the app shows an "Insecure Source Detected" alert instead of playing it.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Source | string | The URL of the media to be played. |
| BackgroundColor | [Color](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.graphics.color) | A color to be used behind the media. |
| Title | string | Overrides any metadata in the media and sets the title text to be displayed. |
| Subtitle | string | Overrides any metadata in the media and sets the subtitle text to be displayed. |
| ControlsContent | [View](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.view) | Contains the view tree that should be used to provide UI controls, this replaces the default controls. |
| OverlayContent | [View](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.view) | Contains the view tree that will be displayed over top of the media. The default content only shows for audio files and displays the artwork. |

Important

Note that watch map integration is not currently supported with the PlayVideo command. If this is needed, you'll have to use the Media Player component instead.

## Examples

```
<Button Text="Tap"
    Command="{Binding PlayVideo}"
    CommandParameter="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
```
```
<Button Text="Tap"
    Command="{Binding PlayVideo}">
    <Button.CommandParameter>
        <Rock:PlayVideoParameters Source="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            Title="Big Buck Bunny" />
    </Button.CommandParameter>
</Button>
```

## Related

- [PlayAudio](https://community.rockrms.com/developer/mobile-docs/commands/playaudio) plays an audio file.

---

## PopPage {#poppage}

Mobile1.0

This command works as the opposite of the `PushPage` command. Simply put, it behaves like the user tapping the back button in the navigation bar: it removes the current page from the stack and brings the previous one back into view. For example, imagine you’ve pushed a page asking the user to confirm an action, and you want a "Cancel" button that takes them back to where they were.

An added option here is that you can choose to reload the previous page before showing it again. To do that, just pass `true` to the `CommandParameter`.

Important

This command only works when a navstack is present and there's a page to return to. The navstack is not available when a Page is set to Show Full Screen or the shell's Application Type is set to Blank.

```
<Button Text="Close"
    Command="{Binding PopPage}" />
```
```
<Button Text="Close"
    Command="{Binding PopPage}"
    CommandParameter="true" />
```

Note

Did you know push page now support anchor-based navigation using fragment identifiers (e.g., #elementName) to automatically scroll to a specific element when a page loads. Read more here.

## Related

- [PushPage](https://community.rockrms.com/developer/mobile-docs/commands/pushpage) opens a page on top of the current one.
- [ReplacePage](https://community.rockrms.com/developer/mobile-docs/commands/replacepage) replaces the current page with another one.
- [ShowPage](https://community.rockrms.com/developer/mobile-docs/commands/showpage) replaces the whole navigation stack with a new page.

---

## PrayForRequest {#prayforrequest}

Mobile3.0  Core13.0

Prayer is a big thing for churches, at least it should be. To that end, we wanted to make prayer in your mobile applications as easy as possible. Rather than being limited to specific blocks that support prayer, we decided to give you a command that is available in any block. Using this command you can easily add "Pray" buttons to any page and any content block.

The `CommandParameter` can either be a plain string that represents the unique identifier (Guid) of the prayer request, or it can be an instance of the `PrayForRequestParameters` object.

Warning

This command calls `PUT api/PrayerRequests/Prayed/{guid}`, which needs Edit permission on that action of the PrayerRequests REST controller. You set it under Admin Tools \> Security \> REST Controllers. Starting with Core v16, grant it to the 'RSR - Mobile Application Users' role. Earlier versions use 'All Authenticated Users'. Without it, the command fails silently and the prayer count doesn't change. People who aren't logged in can pray too, as long as the app's REST user has the permission.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Guid | Guid | The unique identifier of the prayer request to be prayed for. |
| RecordInteraction | bool | By default, all pray actions will record an Interaction record in Rock. You can override that by setting this to false. *Defaults to* *true**.* |
| WorkflowTypeGuid | Guid? | The pray action can launch a workflow to let you do custom processing on the server for that pray action. Provide a Workflow Type unique identifier here to indicate which workflow should be launched. *Defaults to* *null**.* |

## Examples

The first example is a simple Pray button. No special processing happens, it just increments the prayer count for the request.

```
<Button Text="Pray"
    StyleClass="btn,btn-primary"
    Command="{Binding PrayForRequest}"
    CommandParameter="40C6134E-994B-4B11-9711-E867D894FE1B" />
```

This second example makes use of the `PrayForRequestParameters` object to disable the interaction and also provide a workflow to be launched.

```
<Button Text="Pray"
    StyleClass="btn,btn-primary"
    Command="{Binding PrayForRequest}">
    <Button.CommandParameter>
        <Rock:PrayForRequestParameters Guid="40C6134E-994B-4B11-9711-E867D894FE1B"
            RecordInteraction="False"
            WorkflowTypeGuid="27B5E487-D451-4025-8BEB-C4EDC354617C" />
    </Button.CommandParameter>
</Button>
```

See [Prayer](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer) for the blocks that list, show and manage prayer requests.

---

## PushPage {#pushpage}

Mobile1.0

This command pushes a new page onto the navigation stack. This type of navigation allows the user to use the back button to return to the page that pushed the new page.

If the `CommandParameter` is a string, then it is expected to contain a page's GUID value and, optionally, a set of query string parameters. The first parameter is separated by a `?` and any additional parameters are separated by `&`. Since these query string parameters are inside an XML document, you must escape them (for example, your `&` must become `&amp;`).

If you are using data binding you can also bind the `CommandParameter` to a true GUID value, in which case it must be the GUID of a valid page.

Finally, if you need advanced parameter usage you can use a `PushPageParameters` object.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The Guid identifier of the page to be pushed onto the navigation stack. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Any additional query string parameters to be passed to the page. |
| WaitForReady | bool | Waits until the page is loaded before displaying it. (*Defaults to* *false**.*) |

```
<Button Text="Push Page"
    Command="{Binding PushPage}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8" />
```
```
<Button Text="Push Page"
    Command="{Binding PushPage}"
    CommandParameter="{Rock:PushPageParameters PageGuid='e4d80e57-da60-4822-bc22-c071f02958e8', WaitForReady='True'}" />
```
```
<Button Text="Push Page"
    Command="{Binding PushPage}">
    <Button.CommandParameter>
        <Rock:PushPageParameters PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="GroupId"
                Value="18" />
            <Rock:Parameter Name="Mode"
                Value="Edit" />
        </Rock:PushPageParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [PopPage](https://community.rockrms.com/developer/mobile-docs/commands/poppage) closes the current page and goes back.
- [ReplacePage](https://community.rockrms.com/developer/mobile-docs/commands/replacepage) replaces the current page with another one.
- [ShowPage](https://community.rockrms.com/developer/mobile-docs/commands/showpage) replaces the whole navigation stack with a new page.

---

## ReloadApplication {#reloadapplication}

Mobile1.0

This instructs the application to reload as if you had just forced quit and started it again. This is a development tool that saves a few seconds when debugging stuff. It's not a command you'll want to use in a public app.

The `CommandParameter` is not used and will be ignored.

```
<Button Text="Reload"
    Command="{Binding ReloadApplication}" />
```

## Related

- [ReloadPage](https://community.rockrms.com/developer/mobile-docs/commands/reloadpage) reloads the current page.

---

## ReloadPage {#reloadpage}

Mobile1.0

This instructs the application to reload the currently displayed page.

The `CommandParameter` is not used and will be ignored.

```
<Button Text="Reload"
    Command="{Binding ReloadPage}" />
```

## Related

- [ReloadApplication](https://community.rockrms.com/developer/mobile-docs/commands/reloadapplication) reloads the whole app.

---

## ReplacePage {#replacepage}

Mobile1.0

This command replaces the current page with a new page. This differs from the [PushPage](https://community.rockrms.com/developer/mobile-docs/commands/pushpage) command. Using the ReplacePage command, if the user then taps the back button then they will be taken back to the page they were on *before* the page that called the ReplacePage command.

If the `CommandParameter` is a string, then it is expected to contain a page's GUID value and, optionally, a set of query string parameters. The first parameter is separated by a `?` and any additional parameters are separated by `&`. Since these query string parameters are inside an XML document, you must escape them (for example, your `&` must become `&amp;`).

If you are using data binding you can also bind the `CommandParameter` to a true GUID value, in which case it must be the GUID of a valid page.

Finally, if you need advanced parameter usage you can use a `ReplacePageParameters` object.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| PageGuid | Guid | The Guid identifier of the page to be used to replace the current page. |
| Parameters | List<[Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter)\> | Any additional query string parameters to be passed to the page. |
| WaitForReady | bool | Waits until the page is loaded before displaying it. (*Defaults to* *false**.*) |

```
<Button Text="Replace Page"
    Command="{Binding ReplacePage}"
    CommandParameter="e4d80e57-da60-4822-bc22-c071f02958e8" />
```
```
<Button Text="Replace Page"
    Command="{Binding ReplacePage}"
    CommandParameter="{Rock:ReplacePageParameters PageGuid='e4d80e57-da60-4822-bc22-c071f02958e8', WaitForReady='True'}" />
```
```
<Button Text="Replace Page"
    Command="{Binding ReplacePage}">
    <Button.CommandParameter>
        <Rock:ReplacePageParameters PageGuid="e4d80e57-da60-4822-bc22-c071f02958e8">
            <Rock:Parameter Name="GroupId"
                Value="18" />
            <Rock:Parameter Name="Mode"
                Value="Edit" />
        </Rock:ReplacePageParameters>
    </Button.CommandParameter>
</Button>
```

## Related

- [PushPage](https://community.rockrms.com/developer/mobile-docs/commands/pushpage) opens a page on top of the current one.
- [PopPage](https://community.rockrms.com/developer/mobile-docs/commands/poppage) closes the current page and goes back.
- [ShowPage](https://community.rockrms.com/developer/mobile-docs/commands/showpage) replaces the whole navigation stack with a new page.

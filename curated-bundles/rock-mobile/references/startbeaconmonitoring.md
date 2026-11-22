---
description: Use when enabling automatic location-based check-in with beacon monitoring and configuring permission screens for proximity attendance
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile7.0  Core17.1

Starts monitoring for your organization's beacons so the person is checked in and out automatically. Before it starts, the command checks the phone's location and Bluetooth access and shows a sheet that walks the person through whatever is missing. Use it on the page where people opt in to automatic check-in.

The `CommandParameter` is optional. Leave it empty to use the default screens, or pass a `StartBeaconMonitoringCommandParameters` object to change the text or image on each screen.

Warning

The app must be built with Proximity Attendance enabled (the `EnableProximityAttendance` build option). Without it, the command shows a "Proximity Attendance Unavailable" alert and does not start.

Note

Monitoring needs location access set to Always (iOS) or Allow all the time (Android), with precise location on, plus Bluetooth access. The command asks for location access, and on Android for Bluetooth access, then sends the person to the system settings for anything that has to be changed there. On iOS, Background App Refresh must also be on, or the command shows an alert and does not start.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| AllowLocationPermissionTitle | string | Title of the screen that asks for location access. Defaults to "Allow Location Access to Start Proximity Check In". |
| AllowLocationPermissionSubtitle | string | Subtitle of the location screen. Defaults to "Your location lets the app check you in automatically when you arrive." |
| AllowLocationPermissionView | View | Replaces the built-in instruction image on the location screen. |
| AllowBluetoothPermissionTitle | string | Title of the screen that asks for Bluetooth access (Android only). Defaults to "Allow Bluetooth to Start Proximity Check In". |
| AllowBluetoothPermissionSubtitle | string | Subtitle of the Bluetooth screen. Defaults to "Choose Allow so the app can find check-in beacons nearby." |
| AllowBluetoothPermissionView | View | Replaces the built-in instruction image on the Bluetooth screen. |
| OpenSettingsTitle | string | Title of the screen that sends the person to the system settings. Defaults to "Update Your Location Settings". |
| OpenSettingsSubtitle | string | Subtitle of the settings screen. Defaults to "Choose Always and turn on Precise Location." on iOS and "Choose Allow all the time and turn on Use precise location." on Android. |
| OpenSettingsView | View | Replaces the built-in instruction image on the settings screen. |
| SuccessScreenTitle | string | Title of the screen shown once monitoring has started. Defaults to "Success". |
| SuccessScreenSubtitle | string | Subtitle of the success screen. Defaults to "Location-based check-in has been successfully configured." |
| SuccessScreenView | View | Replaces the built-in check mark on the success screen. |

## Examples

```
<Button Text="Turn On Automatic Check-in"
    StyleClass="btn, btn-primary"
    Command="{Binding StartBeaconMonitoring}" />
```
```
<Button Text="Turn On Automatic Check-in"
    StyleClass="btn, btn-primary"
    Command="{Binding StartBeaconMonitoring}">
    <Button.CommandParameter>
        <Rock:StartBeaconMonitoringCommandParameters AllowLocationPermissionTitle="Check In Automatically"
            SuccessScreenSubtitle="You're all set. We'll check you in when you arrive." />
    </Button.CommandParameter>
</Button>
```

See [Proximity Attendance](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/proximity-attendance) for setup, device requirements and troubleshooting.

## Related

- [StopBeaconMonitoring](https://community.rockrms.com/developer/mobile-docs/commands/stopbeaconmonitoring) stops watching for beacons.

---

## StartConfetti {#startconfetti}

Mobile7.0

Starts the confetti animation in a [Confetti View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/confetti-view) by turning on its `IsAnimationEnabled` property. Use it to celebrate something the person just did, such as finishing a form or reaching a goal, instead of playing the confetti as soon as the page loads.

The `CommandParameter` must be a reference to the `Rock:ConfettiView` to start, usually set with `{x:Reference name}`. Any other value is ignored and nothing happens.

Note

A Confetti View plays as soon as it loads unless you set `IsAnimationEnabled` to `False` on it. Turn it off when you want this command to decide when the confetti starts.

## Examples

```
<Grid Rock:Zone.Expands="true">
    <Rock:ConfettiView x:Name="confetti"
        IsAnimationEnabled="False">
        <Rock:ConfettiSystem Colors="Red, White, Blue"
            Emitter="Infinite"
            Shapes="rectangle, circle, star"
            Position="Center" />
    </Rock:ConfettiView>

    <Button Text="Celebrate"
        StyleClass="btn, btn-primary"
        VerticalOptions="End"
        Command="{Binding StartConfetti}"
        CommandParameter="{x:Reference confetti}" />
</Grid>
```

Use StopConfetti to stop the animation again. See [Confetti View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/confetti-view) for the confetti systems, shapes and emitters you can configure.

## Related

- [StopConfetti](https://community.rockrms.com/developer/mobile-docs/commands/stopconfetti) stops the confetti animation.

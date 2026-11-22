---
description: "Use when building iOS Lock Screen and Dynamic Island status cards that display real-time information like check-ins, countdowns, or progress updates"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile20.0  iOS16.1

Starts a Live Activity, the status card iOS shows on the Lock Screen and in the Dynamic Island. Use it for something the person wants to glance at for the next few hours, such as a check-in with its security code or a countdown to the start of a service. If an activity is already running under the same `ActivityKey`, it's updated instead of a second one being started.

The `CommandParameter` must be a `LiveActivityParameters` object with both `ActivityKey` and `Title` set. Without them, the command does nothing. Use `UpdateLiveActivity` to change a running activity and `EndLiveActivity` to remove it.

Warning

Treat a Live Activity as an extra on top of a page that already shows the same information, never as the only place it appears.

Warning

Your app must be built with Live Activities turned on. This is a build option, and the widget it adds needs its own provisioning profile. An app built without it ignores this command. It also does nothing when the person has turned off Live Activities for your app in iOS Settings.

Note

The layout is fixed. These properties fill in a template that's built into the app, so a page can't change where anything sits.

Note

Activities are started, updated and ended only from the app. There's no server push, so an activity can't change while the app isn't running. An activity that's never ended can stay on screen for up to eight hours, so set `StaleDateTime` or `StaleMinutesFromNow` to mark when its content is out of date.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| ActivityKey | string | A key you choose that identifies the activity across start, update and end. Required. |
| TemplateId | string | The template that shows the activity. Only `generic` is available. Defaults to `generic`. |
| Title | string | The main line of text. Required. |
| Subtitle | string | The second line of text. |
| IconName | string | A Rock icon class for the icon the activity leads with, such as `fa fa-check-circle` or `ti ti-clock`. An icon that can't be shown falls back to the template's default. |
| AccentColor | Color | The brand color for the Lock Screen card, the icon, the progress bar and the Dynamic Island outline. Takes a hex value or `{Rock:PaletteColor ...}`. Transparency is ignored. |
| IconColor | Color | The color of the icon alone. Takes priority over `AccentColor` for the icon. When not set, the icon uses the accent color in the Dynamic Island and the app's primary color on the Lock Screen. |
| Progress | double | A value from 0 to 1, shown as a progress bar. |
| DetailLabel | string | The caption for the detail row, such as Security Code, Room or Seat. Ignored unless `DetailValue` is also set. |
| DetailValue | string | One value shown under the title on the Lock Screen and in the expanded Dynamic Island, such as a check-in code or a room number. Never shown in the compact Dynamic Island. |
| IsDetailSensitive | bool | Hides `DetailValue` while the device is locked and removes it once the activity is out of date. End these activities with `Immediate` set. Set it to `false` for details that are fine to show, like a room. Defaults to `true`. |
| CompactLabel | string | A few characters shown beside the icon in the compact Dynamic Island only, such as Doors or Rm 202. Longer text is cut off. |
| TargetDateTime | DateTime | The end of a countdown. When set, the activity shows a timer that counts down on its own instead of a progress bar. |
| MinutesFromNow | double | The end of a countdown, in minutes from now. Ignored when `TargetDateTime` is set. |
| StaleDateTime | DateTime | When the content stops being accurate. After this time the card dims and sensitive details are removed. Needs iOS 16.2 or later. |
| StaleMinutesFromNow | double | When the content stops being accurate, in minutes from now. Ignored when `StaleDateTime` is set. |
| Immediate | bool | Used only by `EndLiveActivity`. Defaults to `false`. |

## Examples

```
<Button Text="Show Check-in"
    Command="{Binding StartLiveActivity}">
    <Button.CommandParameter>
        <Rock:LiveActivityParameters ActivityKey="checkin"
            Title="Checked In"
            Subtitle="Room 202"
            IconName="fa fa-user-check"
            AccentColor="{Rock:PaletteColor primary-strong}"
            DetailLabel="Security Code"
            DetailValue="4KZ9"
            StaleMinutesFromNow="120" />
    </Button.CommandParameter>
</Button>
```
```
<Button Text="Start Countdown"
    Command="{Binding StartLiveActivity}">
    <Button.CommandParameter>
        <Rock:LiveActivityParameters ActivityKey="service"
            Title="Service Starts Soon"
            IconName="ti ti-clock"
            CompactLabel="Doors"
            MinutesFromNow="45"
            StaleMinutesFromNow="60" />
    </Button.CommandParameter>
</Button>
```

## Related

- [UpdateLiveActivity](https://community.rockrms.com/developer/mobile-docs/commands/updateliveactivity) changes what a running Live Activity shows.
- [EndLiveActivity](https://community.rockrms.com/developer/mobile-docs/commands/endliveactivity) ends a running Live Activity.

---

## StopBeaconMonitoring {#stopbeaconmonitoring}

Mobile7.0  Core17.1

Stops all beacon monitoring on the device and shows a short toast to confirm. Monitoring stays off, including after the app restarts, until StartBeaconMonitoring runs again. Use it on the page where people turn automatic check-in off.

The command takes no `CommandParameter`. Any value you pass is ignored.

Warning

The app must be built with Proximity Attendance enabled (the `EnableProximityAttendance` build option). Without it, the command only shows a "Beacon Monitoring is not enabled." toast.

## Examples

```
<Button Text="Turn Off Automatic Check-in"
    StyleClass="btn, btn-secondary"
    Command="{Binding StopBeaconMonitoring}" />
```

See [Proximity Attendance](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/proximity-attendance) for setup, device requirements and troubleshooting.

## Related

- [StartBeaconMonitoring](https://community.rockrms.com/developer/mobile-docs/commands/startbeaconmonitoring) starts watching for beacons.

---

## StopConfetti {#stopconfetti}

Mobile7.0

Stops the confetti animation in a [Confetti View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/confetti-view) by turning off its `IsAnimationEnabled` property. Use it to end a celebration that runs continuously, such as one with an `Infinite` emitter. Run StartConfetti on the same view to start it again.

The `CommandParameter` must be a reference to the `Rock:ConfettiView` to stop, usually set with `{x:Reference name}`. Any other value is ignored and nothing happens.

## Examples

```
<Grid Rock:Zone.Expands="true">
    <Rock:ConfettiView x:Name="confetti">
        <Rock:ConfettiSystem Colors="Red, White, Blue"
            Emitter="Infinite"
            Shapes="rectangle, circle, star"
            Position="Center" />
    </Rock:ConfettiView>

    <Button Text="Stop Confetti"
        StyleClass="btn, btn-primary"
        VerticalOptions="End"
        Command="{Binding StopConfetti}"
        CommandParameter="{x:Reference confetti}" />
</Grid>
```

See [Confetti View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/confetti-view) for the confetti systems, shapes and emitters you can configure.

## Related

- [StartConfetti](https://community.rockrms.com/developer/mobile-docs/commands/startconfetti) starts the confetti animation.

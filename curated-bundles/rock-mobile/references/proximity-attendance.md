---
description: Use when configuring automatic check-in/check-out via Bluetooth beacons or implementing proximity-based attendance tracking in mobile apps
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M v7.0C v17.1

Proximity Attendance lets people automatically check in and out when they enter or leave a location, using small Bluetooth devices called beacons. This removes the need for manual check-ins at events or services.

These beacons use a technology called iBeacon, which broadcasts a small signal that your phone can detect.

## How It Works

1. A beacon continuously broadcasts its iBeacon signal.
2. A nearby mobile device detects this signal and triggers the app to wake up in the background.
3. The app then automatically checks the person in or out of the event or service.

This is especially helpful for busy check-in stations or children's ministry check-ins where speed and simplicity matter.

Note

For more on Proximity Attendance, and how to configure it within Rock, see our [Proximity Attendance](https://community.rockrms.com/Rock/BookContent/9#proximityattendancemobile) core docs.

## Mobile Shell Configuration 

After configuring your Rock instance and physical beacons, use the following commands in your mobile app:

### StartBeaconMonitoring

Begins monitoring entry and exit events for the RockInstanceId region. This command guides the user through enabling location permissions so the app can begin monitoring nearby beacons.

Examples

This is a basic example to start the beacon monitoring process.

```
<Button Text="Start Beacon Monitoring"
    StyleClass="btn, btn-primary"
    Command="{Binding StartBeaconMonitoring}" />
```

You can also customize the content of the instruction if you wish to do so.

```
<Button Text="Start Beacon Monitoring"
    StyleClass="btn, btn-primary"
    Command="{Binding StartBeaconMonitoring}">
    <Button.CommandParameter>
        <Rock:StartBeaconMonitoringCommandParameters AllowLocationPermissionTitle="Allow Permission Location" />
    </Button.CommandParameter>
</Button>
```

### Properties

| Property | Type | Description |
| --- | --- | --- |
| AllowLocationPermissionTitle | string | The title on the AllowLocationPermission Page |
| AllowLocationPermissionSubtitle | string | The subtitle on the AllowLocationPermission Page |
| AllowLocationPermissionView | View | Your custom view on the AllowLocationPermission Page |
| OpenSettingsTitle | string | The title on the OpenSettings Page |
| OpenSettingsSubtitle | string | The subtitle on the OpenSettings Page |
| OpenSettingsView | View | Your custom view on the OpenSettings Page |
| SuccessScreenTitle | string | The title on the Success Page |
| SuccessScreenSubtitle | string | The subtitle on the Success Page |
| SuccessScreenView | View | Your custom view on the Success Page |

### StopBeaconMonitoring

Stops all active beacon monitoring. When the app is deleted, it also stops monitoring.

Example

```
<Button Text="Stop Beacon Monitoring"
    StyleClass="btn, btn-primary"
    Command="{Binding StopBeaconMonitoring}" />
```

## Beacon Debug View 

After setting up a physical beacon, it can be difficult to know if the area has adequate signal coverage. To help with this, we created a Debug View that measures the signal strength of your organization’s beacons. The Beacon View displays all detected beacons broadcasting the UUID that matches your RockInstanceId.

Important

The view will not work unless beacon monitoring has been started. It refreshes every 6 seconds.

```
<Rock:BeaconRangingDebugView />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67231)

We recommend maintaining at least a Yellow signal strength level.

Note

To learn how to configure Beacon Hardware, see the [Proximity Attendance](https://community.rockrms.com/Rock/BookContent/9#proximityattendancemobile) core docs.

## Merge Field

You can use a merge field to verify whether Proximity Attendance is configured correctly.

- core\_ProximityAttendanceConfigured - This will be a True boolean value if all the necessary permission is configured correctly to enable Proximity Attendance. Otherwise, it will be False.
```
<Label Text="Proximity Attendance is ready." IsVisible="{Binding AppValues.core_ProximityAttendanceConfigured}" />
```

---

## 🎨 Styling {#styling}

We've worked hard for you to be able to leverage your knowledge of CSS to theme mobile applications. Applying these classes will allow you to build beautiful mobile apps with consistent styling.

## CSS Styling

CSS styling is a powerful way to style your applications. It's also a simple way to bring consistency to your project. Unfortunately, there are a few limitations you should be aware of.

- XAML styling is a first-class citizen in .NET MAUI
- CSS plays a side role in providing a familiar approach to styling XAML elements
- One cannot do everything in CSS that is doable in XAML styling
- Not all standard CSS properties from the web are supported in .NET MAUI

Be sure to start your understanding of CSS for .NET MAUI by reading [the Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/styles/css?view=net-maui-8.0).

Warning

CSS properties in .NET MAUI are very picky. If you spell or mistype a property wrong your application could fail to load. Be careful, and test well.

## Downhill Framework

We've given our mobile CSS framework the name Downhill (it's much easier to roll a rock downhill you know). It incorporates standards from Bootstrap, Tailwind, and other CSS frameworks along with our own, so hopefully, it feels somewhat familiar to you.

You can find everything in the public Rock repository here: [https://github.com/SparkDevNetwork/Rock/tree/develop/Rock.DownhillCss](https://github.com/SparkDevNetwork/Rock/tree/develop/Rock.DownhillCss)

---

## Style Guide {#style-guide}

Learn the basics of styling a modern, dark mode responsive application.

M v6.0C v16.7

## Getting Started

All of the built-in Rock components follow a consistent pattern for spacing values, colors and typography.

### Walkthrough

A start-to-finish walkthrough of styling an out of the box application. This encapsulates all of the below topics with progressive examples.

[Walkthrough](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#walkthrough)

### Colors

Understand color theory in Rock Mobile and learn how to leverage built in colors to build truly responsive and beautiful applications.

[Colors](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#colors)

### Typography

Understand how fonts and sizes are determined and utilizing in Rock Mobile.

[Typography](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#typography)

### Margin, Padding and Other Utilities

Utilize built in spacing classes to match the consistency of built-in blocks.

[Utilities](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#margin-padding-and-other-utilities)

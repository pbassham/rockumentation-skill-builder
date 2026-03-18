> **Path:** Mobile Docs > 🧱 Essentials > Advanced Topics > Proximity Attendance

# Proximity Attendance

M v7.0C v17.1

Proximity Attendance lets people automatically check in and out when they enter or leave a location, using small Bluetooth devices called beacons. This removes the need for manual check-ins at events or services.

These beacons use a technology called iBeacon, which broadcasts a small signal that your phone can detect.

## How It Works

1.  A beacon continuously broadcasts its iBeacon signal.
2.  A nearby mobile device detects this signal and triggers the app to wake up in the background.
3.  The app then automatically checks the person in or out of the event or service.

This is especially helpful for busy check-in stations or children's ministry check-ins where speed and simplicity matter.

Note

For more on Proximity Attendance, and how to configure it within Rock, see our [Proximity Attendance](https://community.rockrms.com/Rock/BookContent/9#proximityattendancemobile) core docs.

## Mobile Shell Configuration 

After configuring your Rock instance and physical beacons, use the following commands in your mobile app:

### StartBeaconMonitoring

Begins monitoring entry and exit events for the RockInstanceId region. This command guides the user through enabling location permissions so the app can begin monitoring nearby beacons.

Examples

This is a basic example to start the beacon monitoring process.

```xaml
<Button Text="Start Beacon Monitoring"
    StyleClass="btn, btn-primary"
    Command="{Binding StartBeaconMonitoring}" />
```

You can also customize the content of the instruction if you wish to do so.

```xaml
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

```xaml
<Button Text="Stop Beacon Monitoring"
    StyleClass="btn, btn-primary"
    Command="{Binding StopBeaconMonitoring}" />
```

## Beacon Debug View 

After setting up a physical beacon, it can be difficult to know if the area has adequate signal coverage. To help with this, we created a Debug View that measures the signal strength of your organization’s beacons. The Beacon View displays all detected beacons broadcasting the UUID that matches your RockInstanceId.

Important

The view will not work unless beacon monitoring has been started. It refreshes every 6 seconds.

```xaml
<Rock:BeaconRangingDebugView />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67231)

We recommend maintaining at least a Yellow signal strength level.

Note

To learn how to configure Beacon Hardware, see the [Proximity Attendance](https://community.rockrms.com/Rock/BookContent/9#proximityattendancemobile) core docs.

## Merge Field

You can use a merge field to verify whether Proximity Attendance is configured correctly.

-   core\_ProximityAttendanceConfigured - This will be a True boolean value if all the necessary permission is configured correctly to enable Proximity Attendance. Otherwise, it will be False.

```xaml
<Label Text="Proximity Attendance is ready." IsVisible="{Binding AppValues.core_ProximityAttendanceConfigured}" />
```

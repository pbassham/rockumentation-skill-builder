---
description: Use when configuring automatic check-in/check-out via Bluetooth beacons or implementing proximity-based attendance tracking in mobile apps
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M v7.0C v17.1

Proximity Attendance checks people in and out automatically when they arrive at or leave a location, using small Bluetooth devices called beacons. The person opts in once in the app. After that, their phone records attendance in the background, even when the app is closed.

Beacons broadcast using the iBeacon format, which is the only format iOS can use to wake a closed app. Each broadcast carries three values, and Rock gives each one a meaning:

| iBeacon value | Rock meaning | Set to |
| --- | --- | --- |
| UUID | Your organization | Your Rock Instance ID |
| Major (0 to 65,535) | Campus | The Campus Id |
| Minor (1 to 65,535) | Location | The Location's Beacon Identifier |

Note

See [Use Proximity Attendance](https://community.rockrms.com/documentation/church-management/check-in/additional-check-in-options/use-proximity-attendance) for how to find each value in Rock.

## How Detection Works

The phone watches for your organization's UUID, not for individual beacons.

![](https://community.rockrms.com/GetImage.ashx?Guid=3cf07afe-a9a3-44ac-aac9-b76e715a4735)

1. **Arrival.** When the phone first hears any beacon with your UUID, the operating system wakes the app. The app scans for up to 5 seconds to read the Major and Minor of every beacon in range, then sends them to Rock.
2. **Check-in.** Rock uses the Major to find the campus and the Minor to find the location. It then picks the best matching group and schedule and records attendance with the source "Proximity".
3. **Moving around.** Walking from one room to another inside the building does not send anything new, because the phone is still inside the same organization-wide region.
4. **Departure.** When the phone has not heard any of your beacons for a while, the app sends a check-out for the location it checked into on arrival. The operating system decides this delay; on iOS it is typically around 30 seconds.

## Before You Start

Three things must already be in place, or the commands on this page will run but no attendance will be recorded.

1. **The app must be built with Proximity Attendance enabled.** This is a build option, set separately for each app. It adds the Bluetooth and background location capabilities on both iOS and Android. An app built without it cannot detect beacons, no matter how the server or pages are configured. To have it enabled, coordinate with App Factory when your app is published or updated.
2. **Rock must be configured for proximity check-in.** Follow [Use Proximity Attendance](https://community.rockrms.com/documentation/church-management/check-in/additional-check-in-options/use-proximity-attendance). In short:
	1. Turn on **Enable Proximity Check-in** in exactly one check-in configuration. If more than one has it on, Rock only uses the first it finds.
		2. Give each location a **Beacon Identifier** between 1 and 65,535 that is unique across your whole organization, not just its campus.
		3. Make sure an active group in that configuration is assigned to the location, with a schedule that runs today.
3. **The person must be logged in.** Proximity check-in is always tied to the logged-in person. A phone with no one logged in sends nothing useful, even after monitoring has been started.

## Device Requirements

The phone needs four settings for Proximity Attendance to work. `StartBeaconMonitoring` walks the person through them, and the `core_ProximityAttendanceConfigured` merge field is true only when all four are in place.

| Setting | iOS | Android |
| --- | --- | --- |
| Location access | Always | Allow all the time |
| Precise location | On | On |
| Bluetooth | Allowed for the app | Nearby devices allowed |
| Background activity | Background App Refresh on | Not applicable |

Notification permission is optional. Without it, attendance is still recorded, but the person will not see the check-in notification.

### iOS

- If Background App Refresh is off, `StartBeaconMonitoring` shows an alert and does not start.
- If the person turns Background App Refresh off later, the app stops monitoring and shows an alert. They need to start monitoring again after turning it back on.
- Once started, monitoring resumes on its own each time the app launches.

### Android

- While monitoring is on, Android shows a permanent notification titled **Beacon Monitoring**. This is required by Android for any app that scans in the background, and it cannot be hidden by the app.
- On Android 14 and later, beacon monitoring requires Rock Mobile 19.1 or later. Earlier versions cannot start monitoring on those phones.
- Some manufacturers' battery savers stop background services. If check-ins are missed on a particular phone, check whether battery optimization is limiting the app.

## Choosing and Configuring Beacons

Any beacon that can broadcast iBeacon with a custom UUID, Major and Minor will work. Beacons are configured over Bluetooth with the manufacturer's app, so check that the app is still available before you buy.

| Setting | Recommendation |
| --- | --- |
| Broadcast format | iBeacon. Other formats (Eddystone, AltBeacon) can stay on but are ignored |
| UUID, Major, Minor | Your Rock Instance ID, Campus Id and Beacon Identifier. Many apps want the UUID typed without dashes |
| Transmit power | Start at the manufacturer default, then lower it if the signal reaches areas it should not |
| Advertising interval | Around 1 second is a good balance. Shorter is detected faster but drains the battery sooner |
| Measured power (RSSI at 1 m) | Leave the default. It only affects the distance estimate, which Rock does not use |
| Long range or coded PHY modes | Leave off. Most phones cannot see them, so the beacon will look dead |
| Configuration password | Record it somewhere safe. Some manufacturers have no way to reset a lost password |

**Verifying the UUID.** iPhones hide beacon UUIDs from third-party apps, so manufacturer apps on iOS usually show the UUID as blank. To confirm it, use the Beacon Debug View below (it only shows beacons whose UUID matches), or a Bluetooth scanner app on Android.

**Disconnect after configuring.** Many beacons stop broadcasting normally while a configuration app is connected.

## Commands

### StartBeaconMonitoring

Starts monitoring for your organization's beacons. The command checks the device settings above and shows only the screens needed to fix what is missing:

- **Allow Location** when location has never been requested.
- **Allow Bluetooth** (Android only) when location is granted but Bluetooth is not.
- **Open Settings** when location was denied or is only allowed while using the app. The person has to change it in the system settings.
- **Success** once everything is in place and monitoring has started.

If the app was not built with Proximity Attendance enabled, the command shows a "Proximity Attendance Unavailable" alert instead. On iOS it shows the same alert when Background App Refresh is off.

```
<Button Text="Start Beacon Monitoring"
    StyleClass="btn, btn-primary"
    Command="{Binding StartBeaconMonitoring}" />
```

Every screen can be customized with `StartBeaconMonitoringCommandParameters`. Each `View` property replaces the default instruction image on that screen.

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

| Property | Type | Default |
| --- | --- | --- |
| AllowLocationPermissionTitle | string | Allow Location Access to Start Proximity Check In |
| AllowLocationPermissionSubtitle | string | Explains that location is used only to detect check-in beacons |
| AllowLocationPermissionView | View | Built-in instruction image |
| AllowBluetoothPermissionTitle | string | Allow Bluetooth to Start Proximity Check In |
| AllowBluetoothPermissionSubtitle | string | Please follow these instructions when prompted. |
| AllowBluetoothPermissionView | View | Built-in instruction image |
| OpenSettingsTitle | string | Update Your Location Settings |
| OpenSettingsSubtitle | string | Please select these options in your app settings. |
| OpenSettingsView | View | Built-in instruction image |
| SuccessScreenTitle | string | Success |
| SuccessScreenSubtitle | string | Location-based check-in has been successfully configured. |
| SuccessScreenView | View | Built-in instruction image |

### StopBeaconMonitoring

Stops all beacon monitoring on the device. Deleting the app also stops monitoring.

```
<Button Text="Stop Beacon Monitoring"
    StyleClass="btn, btn-primary"
    Command="{Binding StopBeaconMonitoring}" />
```

## Checking Readiness

`AppValues.core_ProximityAttendanceConfigured` is `true` when every setting in Device Requirements is in place: location Always, precise location, Bluetooth, and (on iOS) Background App Refresh. It updates as the person changes those settings.

It does not tell you whether monitoring has been started, whether the person is logged in, or whether the app was built with Proximity Attendance. Use it to show or hide a "set up automatic check-in" prompt, not as proof that check-in will succeed.

```
<Label Text="Proximity Attendance is ready."
    IsVisible="{Binding AppValues.core_ProximityAttendanceConfigured}" />
```

## Check-in Notification

Rock can confirm a proximity check-in with a notification on the phone. The message comes from the **Proximity Attendance Notification Template** in the check-in configuration, and it is Lava with the new `Attendance` record available as a merge field.

- It is sent only when a new attendance record is created. Returning to the same location later that day updates the existing record and sends nothing.
- The title is always "Check-In Successful". Only the message is templated.
- Leave the template blank to turn notifications off.
- It is shown by the app as a local notification, so it does not use your push notification setup, but it does need notification permission on the phone.
```
You're checked in to {{ Attendance.Occurrence.Group.Name }}. Enjoy!
```

## Beacon Debug View

The debug view lists every beacon the phone can hear that broadcasts your organization's UUID, with live signal readings. Use it after installing beacons to check coverage and to confirm each beacon's values. Put it on a page only staff can reach.

Note

If monitoring is not running when the view appears, it starts `StartBeaconMonitoring` for you. It scans again every 6 seconds; change this with `BeaconRangingTimerInterval`, in milliseconds.

```
<Rock:BeaconRangingDebugView />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67231)

A beacon that is not listed is either out of range, powered off, or broadcasting a different UUID. Each listed beacon shows:

| Field | Meaning |
| --- | --- |
| Major, Minor | The campus and location values the beacon is broadcasting |
| RSSI | Signal strength in dBm. Closer to 0 is stronger |
| Accuracy | The phone's distance estimate in meters, based on RSSI and the beacon's measured power |
| Estimated Distance | The same estimate in feet |

The colored dot is based on RSSI:

| Color | RSSI | Meaning |
| --- | --- | --- |
| Green | Above -70 dBm | Strong |
| Orange | \-70 to -83 dBm | Usable |
| Red | Below -83 dBm | Weak; detection may be unreliable |

Aim for at least orange everywhere people should be checked in. Distance estimates move around a lot with walls, bodies and phone position, so treat them as a rough guide only.

## Planning Your Deployment

Proximity Attendance works best for a building or a few large, well-separated areas, not for individual rooms. These limits are why:

- **The location is chosen once, on arrival.** Moving to another room afterward does not change the check-in, and check-out is recorded against the arrival location.
- **Only one beacon decides the location.** When several beacons are in range at arrival, Rock uses the first one the phone reports, not necessarily the strongest. Two rooms whose signals overlap can produce check-ins in either room.
- **Separate areas need real distance.** As a rule of thumb, beacons for different locations should be at least a minute's walk apart.
- **Overlapping schedules.** If more than one schedule at the location is running, Rock picks the one whose start time is closest to the time of arrival.
- **Major must be the Campus Id.** Rock looks the campus up by its Id. The campus Beacon Id field starts out equal to the Id; if it is changed, beacons for that campus stop matching.

A good first deployment is one beacon per campus entrance or main gathering space, each with its own location, then adding more only where the Beacon Debug View shows gaps.

## Troubleshooting

Work from the beacon outward: confirm the phone hears the beacon, then that the phone is set up, then that Rock can match it to a schedule.

| Symptom | Likely cause | What to check |
| --- | --- | --- |
| "Proximity Attendance Unavailable" alert | App was built without the option, or (iOS) Background App Refresh is off | Coordinate with App Factory; check the phone's Background App Refresh setting |
| Debug View lists no beacons | Wrong UUID, beacon off, out of range, or a configuration app still connected | Compare the UUID to your Rock Instance ID; disconnect the configuration app |
| Beacon listed but no attendance | Person not logged in, or a device setting missing | Check `core_ProximityAttendanceConfigured` and that someone is logged in |
| Server returns "No location was available for check-in" | Minor does not match a location, Major does not match a campus Id, or no schedule is running | Location Beacon Identifier, campus Id, and today's schedule for a group at that location |
| Server returns "No beacons were detected" | The phone's scan on arrival found nothing | Signal strength at the entrance; move the beacon or raise transmit power |
| Checked into the wrong room | Several beacons in range on arrival | Increase separation or lower transmit power; see Planning Your Deployment |
| Check-out arrives late | Expected: the phone waits until it has not heard any beacon for a while | Nothing to fix unless the delay is many minutes |
| Works on some Android phones only | Manufacturer battery saver stopping the background service | Exclude the app from battery optimization |

**Server log.** Each proximity request is logged at the Information level with the UUID, whether the person arrived or left, and every beacon's Major, Minor and RSSI. Turn on Information logging for the check-in API to see exactly what a phone sent.

## Related Docs

- [Use Proximity Attendance](https://community.rockrms.com/documentation/church-management/check-in/additional-check-in-options/use-proximity-attendance): Rock setup, finding your Rock Instance ID, and choosing beacon values.
- [Maintain Locations](https://community.rockrms.com/documentation/core-concepts/rock-fundamentals/locations/maintain-locations): setting a location's Beacon Identifier.

---
description: Use when setting up automatic attendance tracking with Bluetooth beacons and configuring iBeacon signals for mobile check-in
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Proximity Attendance (Mobile)

Proximity Attendance (Mobile)

Sunday mornings are buzzing, volunteers are helping guests, kids are checking in. You’re focused on the message ahead. With Proximity Attendance, your church gains a new kind of presence: quiet, automatic and incredibly powerful. When people walk into your building, their phones (with a [Rock mobile app](https://origin.rockrms.com/rock-mobile) installed and *Beacon Monitoring* enabled) quietly register their arrival. You get real-time, accurate attendance with no lines, no kiosks, no friction.

Using a [Rock Mobile app](https://origin.rockrms.com/rock-mobile), Proximity Attendance brings location-aware check-in to life. Once someone has opted in, their attendance is tracked auto-magically every time they enter your space. It’s fast, invisible and freeing for your team and volunteers. Stop counting heads and start capturing insights.

### How does this work?

The tech powering this effect is... beacons. You can place Bluetooth beacon devices around your chosen space to capture attendance data for those who step into it. It only takes a couple to cover a large space, capturing accurate attendance info based on location.

**How It Works**

1. A beacon continuously broadcasts its *iBeacon signal*.
2. A nearby mobile device detects this signal and triggers the app to wake up in the background.
3. The app then **automatically checks the person in or out** of the event or service.

This is especially helpful for busy check-in stations or children's ministry check-ins where speed and simplicity matter.

#### This Section is Technical!

This configuration includes technical terms and is best suited for users with some IT experience. If terms like "UUID" scare you, you may want to back away slowly. That said, we’ve streamlined the process to make setting up Proximity Attendance as clear and manageable as possible.

### What Is iBeacon?

iBeacon is a protocol developed by Apple that allows Bluetooth Low Energy (BLE) devices in this case the beacon to broadcast small packets of data, known as advertisements.

Each iBeacon signal includes a payload with the following components:

- **UUID (Universally Unique Identifier):** A 128-bit value shared among a group of beacons (e.g., an organization).
- **Major:** A 16-bit integer used to identify a subgroup within the UUID (e.g., a campus).
- **Minor:** A 16-bit integer used to identify a specific beacon within a Major group (e.g., a room or kiosk).

**Major** and **Minor** values are used strictly for identification. They do not transmit any actual data beyond their numeric values.

#### How Rock Uses iBeacon

In our setup:

- **UUID** → *RockInstanceId*: This is shared across all organization-wide beacons and represents the entire church or organization.
- **Major** → *CampusId*: Identifies the specific campus or building.
- **Minor** → Location *BeaconIdentifier*: Identifies a specific location, such as a room, kiosk, or classroom.

Think of it like this: the UUID is the church organization, the Major is the building or campus, and the Minor is the room.

### Beacon Behavior and Boundaries

Beacons are an excellent way to accurately track attendance with just your phone, but we want to note a few boundaries to guide your approach to Proximity Attendance.

#### Limit The Number of Beacons in One Area

A good rule of thumb is this, when two spaces are more than 1 minute in travel time apart, you can have a new beacon set. If they are too close, the beacons may get confused and say you checked into the children's ministry when you accidentally stepped into the wrong hall.

#### Beacon Overload

Sticking to having one or only a few areas tracking attendance rather than capturing many closely-knit areas will keep data simple and accurate. We know you may be tempted to use the power of Bluetooth to track attendance for each individual room: the children's ministry, the green room, the bathroom, but beacon devices aren't yet capable of that intricacy.

#### Be Aware of Overlapping Services

To simplify configuration and reduce confusion, schedule selection happens automatically. This provides ease of use so that attendees don't need to pull out their phone and select which service they are attending. With this in mind, please note that if two services overlap, it may go the one that starts and ends latest. If your attendance history looks a little off, that’s likely the reason.

## Configure Proximity Attendance

To get Proximity Attendance up and running for your organization, there are a couple quick steps.

1. *Rock Configuration* - Checking all the right boxes to use beacons for attendance
2. *Beacon Hardware Configuration* - Getting the info you need to set up a beacon
3. *Mobile Shell Configuration* - See more on this in the [Mobile Docs](https://community.rockrms.com/page/3516?slug=essentials%2fadvanced-topics%2fproximity-attendance)

### Step 1: Rock Configuration

When you're ready to use proximity attendance, start by enabling it for check-in.

Head to Admin Tools \> Settings \> Check-in \> Check-in Configuration, then look under the "General Settings".

![Beacon identifier setting in Rock Check-in Configuration](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/enable-proximity-attendance-v18.png)

Enable Proximity Check-in in General Settings

You must select "*Enable Proximity Check-in*" to use beacons as an attendance tracking method.

**UUID:**

- **No action needed** — the UUID is automatically pushed to the mobile shell.

**Major (Campus)**

- **No action needed** — Rock maps the CampusId to the Major value.

**Minor (Location Beacon Identifier)**

1. Navigate to the *Named Location* where the beacon will be used.
2. In the location settings, set the *Beacon Identifier* to a **16-bit integer** (range: 0–65,535).

This value will be used as the *Minor* value when configuring your physical beacon.

![Setting Beacon Identifier in Named Location](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/beacon-identifier-v18.png)

Beacon Identifier as Minor value

Proximity Attendance is set up in Rock, yay! Now for the beacons themselves.

### Step 2: Beacon Hardware Configuration

Since configuration tools vary by manufacturer, please refer to your beacon’s documentation. Below, we show how to obtain the values you'll need from Rock.

**Beacon UUID (RockInstanceId)**

Use the following SQL query to retrieve the RockInstanceId from your Rock RMS database:

```
SELECT  
    [Guid]
FROM 
    [Attribute]
WHERE 
    [Key] = 'RockInstanceId'
    AND [EntityTypeQualifierColumn] = 'SystemSetting';
```
- Use this value as the UUID when configuring your beacon.

All beacons in your organization should use the **same UUID**, regardless of location. Differentiation happens via Major and Minor.

**Major and Minor**

- **Major:** Set this to the *CampusId* where the beacon will be deployed.
- **Minor:** Use the *Beacon Identifier* value from the *Named Location* you configured earlier. This uniquely identifies the beacon's specific location within the campus.

You can configure multiple beacons with the same UUID/Major/Minor to cover larger spaces (e.g., auditoriums, hallways).

While Bluetooth beacons are opening doors to powerful new ways of tracking attendance, they’re not the only tools on the horizon. Some enterprise Wi-Fi systems—like Cisco Meraki or Juniper Mist—already offer beacon-like tracking through their advanced access points. These systems use signal triangulation to detect nearby devices and can provide location insights with surprising accuracy. As technology continues to evolve, churches have more ways than ever to make check-in seamless, smart and entirely hands-off. Proximity Attendance is just the beginning.

#### Learn More About Proximity Attendance

If you want to start tracking attendance with Rock Mobile or for technical details on configuring your Mobile Shell for Proximity Attendance, see the [Rock Mobile Docs](https://community.rockrms.com/page/3516?slug=essentials%2fadvanced-topics%2fproximity-attendance).


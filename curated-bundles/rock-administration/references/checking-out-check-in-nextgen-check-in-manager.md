---
description: "Use when managing real-time check-in states, understanding check-in phases, or configuring presence tracking for event attendance"
source: "https://community.rockrms.com/documentation/bookcontent/42/350"
sourceLabel: Checking-out Check-in - NextGen
---
> **Path:** Checking-out Check-in - NextGen > Check-In Manager

Check-In Manager

It's critical for growing organizations to be able to view check-in data in real-time and react by opening and closing locations in response. Rock provides a check-in management site that gives your staff a dashboard of live check-in data and lets them respond to needs as they occur in real-time.

# The Phases of Check-in

The check-in process doesn’t necessarily end when someone finishes checking in. Depending on your [settings](#settings) there are different phases of check-in. A person can be *Checked-in*, *Present* or *Checked-out*. Later in this chapter you’ll see how this all gets configured and managed within the Check-in Manager. For now, it’s only important to be aware of the different states a person can be in.

## Checked-in

When a person finishes the check-in process, they will appear as Checked-in on the roster. What can happen next depends on your configuration.

If you don’t have check-out or presence enabled in your [Check-in configuration settings](#settings) then the other states described below don’t apply. The person will be marked as *Present* (see below) unless the Check-in Manager is used to *Delete* their check-in attendance entirely.

![Cancel Check-in](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/check-in-manager-roster-cancel-v14.png)

Cancel Check-in

# Delete Attendance

If you look at the security settings for the Roster block, there is a special *Delete Attendance* security verb. This controls who is able (or not able) to delete attendance as pictured in the screenshot above.

## Present

Being checked-in isn’t always the same as being in the room or location. A lot can happen between checking in on your phone from the parking lot and arriving in the intended space. Rock’s *Presence* feature lets you keep track of who is physically in a seat, making it easy to see how many of your checked-in guests are in the room or not.

To mark someone as present, navigate to the 'Checked In' tab along the top of the roster. A person must be checked in before they can be manually marked as Present in the roster.

![Present](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/check-in-manager-roster-present-v14.png)

Present

From the 'Present' tab of the roster you can check people out individually or, if enabled in the block settings, you can check out all people who are marked present. From the block settings you can also enable the *Staying* feature, which lets you mark a person as staying for the next service, creating a new attendance record for that person. Lastly, you can update the block settings to add a *Not Present* button. This reverts a person back to *Checked In* if, for instance, they were accidentally marked as present but aren't actually in the room.

# Attendance Record Cleanup

When someone checks in, an attendance record is created showing them as having attended. This might not always be true if the person has checked in but has not been marked as *Present*. The Rock Cleanup job has an optional setting to clean up these records. If enabled, the attendance record will still exist, but the person will be marked as not having attended if they were never *Present*. This only applies if *Presence* is enabled.

## Checked-out

At times, people will need to leave earlier than planned. If *Enable Check-out in Manager* is enabled in your Check-in Configuration, you can indicate that someone has left the room. The person will still appear in the Roster as Checked-out and the check-in is not removed from their record. For more details, see the [Manual Checkout](#manualcheckout) section.

To check someone out, you'll navigate to the 'Present' tab along the top of the roster. Only people who are Present can be checked out. If *Presence* is not enabled, then a checked in person is automatically considered as being present.

![Checked-out](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/check-in-manager-roster-checked-out-v14.png)

Checked-out

If enabled in the block's settings, you can also re-mark someone as Present from the 'Checked Out' tab if they have been checked out. Maybe they left the room but decided to come back, or maybe they were checked out by accident.

# Using the Check-in Manager

The check-in manager can be loaded from the address `http://[your-rock-server]/checkinmanager`.

When you access this screen for the first time, you’ll be prompted to select a campus if you have more than one to choose from. Next, you’ll select a Location near the top-left to see the *Room Roster* for that Location. Let’s look at what we can do from there.

# Mobile Friendly

Check-in Manager was designed with kiosk devices of all sizes in mind. That means the pages might look a little different from the below screenshots if you’re working with a smaller screen. For instance, the Tag and Service Times columns will be combined into a single column at some resolutions. Similarly, you’ll notice icons (e.g., ) instead of words (e.g., ‘Present’) for the check-in states.

![Check-in Manager Room Roster](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-roster-v14.png)

Check-in Manager Room Roster

A single person can be checked into the same room for different services. In those cases, you'll see each service listed, and separate states (e.g., 'Present' or 'Checked In') if the person isn't in the same state for both rooms.

# Closing a Room

When you close a room using the Check-in Manager it can take several seconds for the room to show closed on the kiosks, depending on the Refresh Interval setting of the current check-in configuration. If your kiosks aren't reacting fast enough to room closures, it could be that you have the Refresh Interval set too high.

Before we move on from the roster, you'll want to take a look at its block settings. These settings can be used to enable a variety of features to align the roster's functions with your check-in processes.

![Roster Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-roster-block-settings-v16.png)

Roster Block Settings

# Check-in Manager Person Profile

There are lots of ways you can get to the *Check-in Manager Person Profile* page. Whether you arrived here from a *Search*, from the *Room Manager* or from *Live Metrics*, there’s a lot to see and do on this page.

![Check-in Manager Person Profile](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-person-profile-v13.png)

Check-in Manager Person Profile

In the person profile's block settings, there's an option to *Share Person*. If this feature is enabled, you'll see the share icon () next to the person's name. Clicking the icon will generate a link that can be shared to edit that person's profile. This is great for situations where a room attendant needs to send the individual to a roaming staff person in order to quickly edit the person's record in Rock.

# Navigating Check-in Manager

As noted above, you can click the icon at the top-left of the page to expand the Check-in Manger’s navigation menu. From here you can search for individuals, view check-in metrics, change Check-in Types or navigate back to the Room Manager described above in the prior section.

## Searching for Individuals

![Check-in Manager Search](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-person-search-v12.png)

Check-in Manager Search

As pictured above, you can search for individuals and then select them from the list. In this example we searched for 'Decker', and we were provided with two of the four Decker family members. The adults don't have any check-in data for today so won’t appear in this list even though they're still part of the Decker family.

Clicking on any person’s row within the search results will bring you to that person’s Check-in Manager person profile.

# Searching by Code

You can also search for a person by the check-in code assigned to them by the check-in system. To ensure this option is available, check that it's enabled in the Search block's settings. You can then conduct the search in the same way as detailed above, entering the check-in code in the search field rather than the person's name. Remember, check-in codes are only used once per day.

# Person Attribute Settings

Be sure to check out the *Person Profile* block settings to set the *Child Attribute* and the *Adult Attribute* categories to view on each person's check-in profile page. This may be helpful if you offer a snack during class and need to see which type of allergy a child may have. You can link the child attribute category directly with the childhood information on their main profile page.

## Live Metrics

The *Live Metrics* page shows you a lot about who is checked in, where and when they checked in. Let’s take a look at what can be seen here.

At the highest level, pictured below, you can see each of the check-in areas and how many people have checked in to all those areas.

![Check-in Manager Live Metrics - Areas](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-live-metrics-areas-v15.png)

Check-in Manager Live Metrics - Areas

Clicking on any area will show you the groups, and then rooms, under that area. At each stage, the metrics pictured above will change to reflect your selection. In the screenshot above, you can see '3' people are in the test area we’re using. If there was a capacity set for this room, it would appear as it does for the Nursery/Preschool Area and High School Area.

# Filled Spots and Shared Locations

The totals in the screenshot above are the rolled-up values from the areas and groups beneath. Depending on how your locations are shared across areas, these numbers may be confusing as you drill down, because the numbers of checked-in people may not appear to roll-up. That's because some people will be in the same location, but from a different area.

Let’s take a close look below at the page after we’ve navigated all the way down from the areas to the individual room level.

![Check-in Manager Live Metrics - Rooms](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-live-metrics-room-v12.png)

Check-in Manager Live Metrics - Rooms

## Room List

The *Room List* is a great resource for seeing all of your rooms and their statuses at a glance. From here you can see the counts of how many people are checked in/present/checked out for each room. Clicking on any room will bring you to the roster for that room.

![Check-in Manager - Room List](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-room-list-v12.png)

Check-in Manager - Room List

## En Route

The *En Route* page shows a list of people who are Checked In but not yet marked as Present. There are a few things to see and do on this page, as described below.

![Check-in Manager - En Route](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-en-route-v12.png)

Check-in Manager - En Route

## Settings

Lastly, you can select a different Check-in Configuration to view from the Settings menu. So far, in the screenshots above, we’ve just been working with the default 'Weekly Service Check-in' configuration.

![Check-in Manager - Settings](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-settings-v12.png)

Check-in Manager - Settings

# Texting Parents from Check-in Manager

We've all been there—there's always that poor child in the nursery that just really *really* needs Mom or Dad. It's easy enough, using Check-in Manager, for a volunteer to look up the parents' information, but then what? Do they have to use their personal cell phone to text them? Well, not anymore.

The Person Profile block has a setting that lets you specify an SMS number to send texts from. Once that's configured, volunteers with access to Check-in Manager can send the parent a customized message. Or, if any are configured, they can also use a personal or shared SMS Snippet. Easy!

![Texting from Check-in Manager](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-SMS-from-profile-v16.png)

Texting from Check-in Manager

To access the messaging feature, click the SMS icon next to a person’s phone number when you’re looking at their profile in Check-in Manager. As pictured above, this will open a popup window where you can provide your SMS message or Snippet (the Snippet text can be modified) and hit Send to contact the person.

Here's what you need to make sure Rock is set up in order to make this work:

- The SMS Communication Medium needs to be enabled and configured with an enabled SMS Transport (see [SMS: Twilio](https://community.rockrms.com/documentation/bookcontent/8#smstwilio) in the Communicating with Rock manual).
  
- As noted in the above link, you need to add at least one *SMS From Value* to your *Defined Values*
  
- You need to select the SMS number which will be used to send messages from Check-in Manager. To do this, go to `[yourrockserver].com/checkinmanager` and search for someone in your database. Click on their row to load the Check-In Manager Person Profile (the page in the above screenshot). The block settings for the block on this page include a *Send SMS From* setting (see image below) where you can choose one of your SMS numbers. Select one and click "Save".
  
- Finally, the person whose profile you're viewing needs to have a phone number with SMS enabled. If SMS is not enabled, you'll see their phone numbers listed and linked for calling, but you won't see the option to send them an SMS message.
![Check-In Manager Profile Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-person-profile-SMS-block-setting-v16.png)

Check-In Manager Profile Block Settings


---

## Device Manager {#device-manager}

> **Path:** Checking-out Check-in - NextGen > Device Manager

While you can manage many aspects of a kiosk device from the *Check-in Manager* you can also manage the device from the actual kiosk. Below we'll discuss the various capabilities of these features.

# Logging In

To access the Device Kiosk simply press the gear icon at the bottom right of the main check-in screen. This will bring up the screen below.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/devicemanager-auth.png)

Device Manager Authentication

From this screen you can get a quick view of the counts for rooms configured to this kiosk. You can also enter your PIN to access the device manager.

# Setting a PIN

To set a PIN for a person, go to the *Security* tab on the person's Profile and add a new User Account. Choose *PIN Authentication* for the Authentication Provider, and enter the desired PIN as the User Name.

# Device Manager

Once you're in the device manager you will see the screen below. This screen allows you to open/close rooms that have been configured for this kiosk. It also allows you to *Override* a child. This simply means that you can check-in a child to a room without considering the room's age or grade ranges. When you select the *Override* button you will see the standard *Search* screen. Everything will operate the same, but the room's configured age and grade ranges will be ignored.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/devicemanager-main.png)

Device Manager

# Schedule Locations

From the main screen above you can also choose the *Schedule Locations* button. This screen allows you to alter the room schedules. This is normally done in the Rock Admin screens (Admin Tools \> Check-in \> Check-in Configuration \> Schedule) but you can also enable/disable the schedules for the kiosk's configured rooms here too.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/devicemanager-schedules.png)

Device Manager Schedules


---
description: "Use when configuring check-in kiosks, assigning locations to devices, or setting up saved kiosk configurations in Rock's NextGen check-in system"
source: "https://community.rockrms.com/documentation/bookcontent/42/350"
sourceLabel: Checking-out Check-in - NextGen
---
> **Path:** Checking-out Check-in - NextGen > Kiosks

Kiosks are the hardware devices used to check-in. Setting up kiosks allows you to specify the check-in configuration for a specific device or set of devices. This is helpful if, for example, you have a set of kiosks in your youth area and only want them used for the services in that area.

The two main configuration points for the kiosk are:

1. **Locations:** Kiosks are assigned to allow check-in for selected locations.
2. **Printing:** Kiosks also help manage how and where printing takes place. See the [Printing](#printing) section for more options for label printing.

# Configuring Kiosks

You can manage your check-in kiosks under Admin Tools \> Check-in \> Devices. Keep in mind that Rock supports multiple types of devices. Check-in kiosks are just one type. (Printers are also configured here.)

When the check-in system starts up, it lists the kiosk devices so the attendant can select which kiosk configuration to use.

It's also helpful to know that when you define a check-in kiosk configuration, it can be used on multiple physical machines at the same time. This means that when you define a check-in kiosk for use in your youth building, that definition can be used for each check-in computer or tablet in that area. Think of these configuration definitions as kiosk templates, not physical machines.

Whether you are adding a new kiosk or editing an existing one, you'll use the screen below to manage the configuration.

![Kiosk Configuration](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/device-setup-with-camera-2-v18.png)

Kiosk Configuration

# Next-Gen Kiosk Setup

When setting up your kiosk you can save your choices, so you don’t have to provide the theme, configuration template, and area selections every time the kiosk starts. You can even have multiple saved configurations if the kiosk is used for different purposes. When the kiosk is turned on, simply tap the button for the desired configuration, and everything will immediately be ready to go.

# Next-Gen Check-In

The ability to save kiosk configurations is only available with Next-Gen Check-in and requires Rock v16.7 or later.

![Kiosk Saved Configurations](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/next-gen-check-in-saved-configurations-v16.png)

Kiosk Saved Configurations

The saved configurations are simply Defined Values. If you need to delete one and start over, you can do so under the *Saved Check-in Configurations* Defined Type.

For setup, you’ll use the following URLs:

- **Setup Page:** `/nextgen-checkin/setup`
- **Kiosk Page:** `/nextgen-checkin`

If you need to change your kiosk's settings often, point it to the setup page. Otherwise, you can set it to go directly to the kiosk page. The very first time you go to the kiosk page it will take you to the setup page. After that, it will remember your settings and go straight to the kiosk page.

![Kiosk Welcome Page](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/next-gen-kiosk-welcome-page-v16.png)

Kiosk Welcome Page

# Kiosk Ads

Rock’s check-in system provides a convenient and welcoming experience, often with kiosks set up for parents to easily check in their children. When a parent approaches a kiosk, they simply press the "Start" button or use the QR Code button. From there, the kiosk guides them through the check-in steps and prints out the appropriate labels for their children.

When the kiosk isn’t in use, it displays a “Welcome” screen. By default, this screen has a large central “Welcome” image, with Start and QR Code buttons off to the side. But rather than just a simple greeting, Rock offers a way to make this screen space more impactful through Kiosk Ads.

With Kiosk Ads, you can replace or complement the default image with one or more of your own. This lets you promote your organization’s events, make an announcement, or highlight volunteer opportunities—all front and center. Simply upload your custom images at the recommended size of 2200x1400, and you’re ready to capture attention and share what matters most.

 <video id="checkInAds" loop autoplay muted><source src="https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/kiosk-ads-demo-2-v16.mp4" type="video/mp4"> Your browser does not support the video tag.</video>

# Next-Gen Check-In

The Kiosk Ads feature is only available with Next-Gen Check-in.

# Kiosk Ad Permissions

Permissions set on individual *Content Channel Items* are **not enforced** for Next-Gen kiosk ads. All ads in the assigned Content Channel will display on the kiosk welcome screen, regardless of item-level security settings.

If you want to control which ads appear, you can create multiple ad channels and assign them to different check-in areas. You can also filter by campus in the check-in configuration to tailor the ads for each location.

## Setting Up Custom Kiosk Ads

To set up Kiosk Ads in Rock, you’ll use Content Channels. Each ad displayed on the kiosk is a Content Channel Item. Rock provides a pre-configured Content Channel specifically for these ads, called "Default Check-in Kiosk Ads.”

To get started, navigate to Admin Tools \> Content Channels and select the "Default Check-in Kiosk Ads" Content Channel. You’ll see a list of existing ads (Content Channel Items) available to your kiosks.

As pictured below, if you decide to set up a new Content Channel for kiosks, just remember to select "Device Ads" as the Channel Type. This ensures compatibility with the check-in kiosks. After it's created, you'll need to update the Check-in Configuration Type's [*General Settings*](#settings) for the welcome screen to show items from your new Content Channel.

![Content Channel Configuration](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/kiosk-ads-content-channel-configuration-v18.png)

Content Channel Configuration

![Promotions Content Channel for Kiosk Ads](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/kiosk-ads-settings-v18.png)

Check-in Configuration General Settings

Next, let's take a closer look at a Kiosk Ad Content Channel Item. Pictured below you can see a custom Item that's been created.

![Administrating Kiosk Ad](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/add-kiosk-ad-1-v18.png)

Administrating Kiosk Ad

And that’s it! With the above Content Channel Item in place, your welcome screen (located at `/nextgen-checkin`) will automatically pick up the new image and display it according to your configuration.


---

## Locations {#locations}

> **Path:** Checking-out Check-in - NextGen > Locations

Locations configure where individuals can check in. Think of them like buildings or rooms for your check-in. Locations are tied to check-in groups and enabled through schedules. Let's take a look at an example to see how they work.

![Check-in Locations](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-locations.png)

Sample Configuration

The diagram above shows a configuration for a large church's *Three Year Olds* check-in group. As you can see, the church has two campuses it calls *North* and *South* and each of these campuses has multiple locations (aka, rooms) for their three-year-olds. Based on attendance patterns, all of these rooms are not needed during all services. In this configuration, the *Crickets Room* is not set up to be used during the second service of the day.

# Editing Locations

Locations are edited under Admin Tools \> Check-in \> Named Locations. Locations are hierarchical in nature, so build them out to match the structure of your buildings.

![Check-in Locations](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/location-details-v18.png)

Named Locations

# Scheduling Locations

Group/Location pairs are matched to schedules at Admin Tools \> Check-in \> Check-in Configuration (click the Schedule button.)

# Opening / Closing Locations

We've seen how you can enable or disable a location based on a schedule. Each location also has an open/closed state. Say for instance you want the *Bears Room* to be used for your 9:00 am service but need to be able to close it if it reaches capacity. Once it reaches capacity, you can close the room from the [Check-in Manager](#checkinmanager) or the [Device Manager](#devicemanager) (more info on these below) and it will no longer be available as an option for check-in.

Of course, you probably don’t want to keep the room closed forever. If you’ve closed the *Bears Room* for your 9:00 am service, you’ll want it open again for your 10:30 am service. You can manually open rooms the same way that they were manually closed, or you can configure the [Auto Open Locations](https://community.rockrms.com/documentation/bookcontent/9#jobs) job to reopen them for you automatically at certain intervals.

# Location Thresholds

In addition to simply closing rooms manually, you can also configure locations to have threshold limits for the number of people that can be checked into the location at once. These limits are evaluated during check-in and once they are reached, the location will automatically stop being available as an option for people to check into.

1. **Threshold:** If this number is reached, check-in will not allow people to check into the location unless an attendant overrides the threshold.
2. **Threshold (Absolute):** Once this number is reached, check-in will absolutely not allow people to check in to the location at all, ever… even if an attendant attempts to override the threshold.


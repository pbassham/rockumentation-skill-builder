---
description: "Use when user needs to understand how mobile check-in works, configure SMS messaging requirements, or guide people through the mobile check-in process"
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Mobile Check-in

Mobile Check-in

*Mobile Check-in* lets people check in to your services and events using their mobile phone. Rock will automatically determine where the person is physically located. Based on the person’s location, Rock will know which services and areas are available for check-in. As you’ll see, the process is very similar to traditional kiosks, but entirely contactless and mobile-friendly.

# Before You Get Started

Mobile Check-in requires that you have SMS messaging configured in your system. See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information.

# Mobile Check-in Overview

Rock ships with the *Mobile Check-in Launcher* block located at `https://yoursite/mobilecheckin`. If Rock can’t identify the person right away, they’ll be asked to identify themselves.

![Identification](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-identify-person-v11.png)

Identification

As you can see above, the person has different options for identifying themselves. They can use *Phone Lookup* or choose to do a traditional *Login*. For full details on the *Phone Lookup* process, see the [Phone Number Lookup](https://community.rockrms.com/documentation/bookcontent/9#phonenumberlookup) chapter of the [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/)

After the person has been identified they’ll need to give permission to use their device’s location. Or, if location services have been disabled (see [Setting Up Mobile Check-in](#settingupmobilecheckin)) the person will be asked to select a campus instead.

![Select Campus](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-select-campus-v13.png)

Select Campus

If location services have been disabled, then the person will see the screen pictured above. Otherwise, they will see the screen pictured below.

![Allow Location](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-allow-location-v11.png)

Allow Location

After clicking *Next* above, a pop-up window will appear where the person can *Allow* the use of their location. Once permission has been granted, the next screen greets the person by name and allows them to proceed with the check-in process.

![Check-in Start](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-start-checkin-v11.png)

Check-in Start

The screen above is where the process will start if the person has previously identified themselves using this device and allowed location access in the past.

Clicking the *Check-in* button above will take the person to the next screen pictured below. This may look familiar because it’s very similar to other check-in methods.

![Select Individuals](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-select-people-v11.png)

Select Individuals

Noah and Alex have been selected for check-in using the screen above. Clicking *Next* will bring the person to the next step in the process, pictured below, where they can select the service time.

![Select Times](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-select-time-v11.png)

Select Times

After selecting the time above, the person will be able to select which room to check each person into.

![Select Location](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-select-room-v11.png)

Select Location

Once a room has been chosen for each person, the check-in process is complete. At this point a QR code for check-in labels appears, which can be scanned via the [iPad application](#ipadapplication) using the iPad's built-in camera. A person can check in from the parking lot, and then go to a physical location where they can scan the code and get their labels.

# For iPads Only

As noted above, the mobile check-in QR code can only be scanned and used for label printing if you're using the [iPad application](#ipadapplication) and the iPad's built-in camera.

![Checked-in](https://rockrms.blob.core.windows.net/documentation/Books/10/1.11.0/images/mobile-launcher-qr-code-v11.png)

Checked-in

If the person clicks the *Done* button pictured above, or if they close the window and return to the page later the same day, they will see the screen pictured below. Here they can choose to check in additional people or use the QR code to print labels.

![QR Code and Additional Check-in](https://rockrms.blob.core.windows.net/documentation/Books/10/1.11.0/images/mobile-launcher-add-more-checkin-v11.png)

QR Code and Additional Check-in

A single QR code is generated for all the people being checked in. As individuals are added the QR code graphic will become more complex. Again, you'll need the [iPad application](#ipadapplication) and the iPad's built-in camera to scan the QR code for label printing. The iPad Device in Rock will need to have *Has Camera* enabled for this to work.

# Setting Up Mobile Check-in

Getting your system set up for *Mobile Check-in* is easy because it uses many of the same pages and configurations you probably already have in place. Many of the same concepts described throughout this guide will still apply. In this section we’ll cover the specific things you’ll need to know.

First, you’ll need to have a *Google API Key* configured for Google maps. See the [Global Attributes](https://community.rockrms.com/documentation/bookcontent/9#globalattributes) section of the [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/) for instructions on setting that up. The *Google API Key* is required to designate the check-in area, which we’ll talk about next.

# Secure Your Site

You must have HTTPS enabled on your server for geolocation features to work. See the [Other Considerations](https://community.rockrms.com/documentation/bookcontent/1#otherconsiderations) section of our [Internal Hosting](https://community.rockrms.com/documentation/bookcontent/1/) guide for information on setting this up.

With the *Google API Key* in place, your next step will be to create a new Device. Navigate to Admin Tools \> Check-in \> Devices and add a new Device as pictured below.

![Device Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-device-setup-v13.png)

Device Configuration

With the Device configuration in place, you’ll need to add it to the *Mobile Check-in Launcher* block’s settings. This is how the block knows which Device configuration to use when a person goes to check in. Navigate to Admin Tools \> CMS Configuration \> Pages | External Homepage \> Support Pages \> Mobile Check-in Launcher to access the block and its settings.

![Mobile Launcher Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-block-settings-v13.png)

Mobile Launcher Block Settings

As you’ve probably noticed by now, *Mobile Check-in* isn’t very different from other check-in methods. If you need more details on the above settings, see the [Administration Screen](#theadministrationscreen) chapter, and related chapters, of this guide.

# Additional Settings

The block's configuration (the icon) has some other settings you might want to review. For instance, you can change the text that's displayed on each of the screens. These text fields are Lava-enabled, making it easy to customize and personalize each step of the process.

# iPad Has Camera

When you're configuring your iPad as a Device in Rock, be sure to enable the *Has Camera* setting so Rock knows it can read the QR codes.

# Handling Other Scenarios

The *Mobile Check-in* process relies on many factors we can’t control. We don’t know what devices people are using, what settings those devices have or how people will try to check in. Rock knows how to handle each of these situations to make your job easier, and to help those using the feature.

## Services Not Scheduled

Sometimes people might arrive a little too early, or a little too late. If someone tries to check in during a time when there are no services scheduled, they’ll be shown a message letting them know.

![No Services Ready](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-no-services-v11.png)

No Services Ready

## Device Location Disabled

If the person denies location access, as described in the Overview section above, they’ll see the screen pictured below. Clicking the *Next* button will return them to the screen which prompts them to enable location services.

![Device Location Disabled](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-no-device-location-v11.png)

Device Location Disabled

## Outside of Geo-fence

Sometimes a person might try to check in before they leave the house. Or their device’s location may be a little inaccurate, making it look like they’re not close enough to the campus. In either case, they’ll see the screen pictured below.

![Outside of Geo-fence](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/mobile-launcher-outside-location-v11.png)

Outside of Geo-fence


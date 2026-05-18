---
description: "Use when setting up or troubleshooting Rock check-in kiosk platforms, printing options, and iPad/Windows application configuration for attendance check-in"
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Check-In Kiosk Options

Check-In Kiosk Options

The easiest way to run Rock's check-in system is to simply open a web browser on a desktop or tablet and navigate to http://\[yourserver\]/checkin. Rock also provides a native iPad application and a Windows application. Let's explore the different strengths of these three platforms.

| Platform | Print From Server | Local Network Printing | Local USB Printing | Bluetooth printing | Notes |
| --- | --- | --- | --- | --- | --- |
| Browser-Based | X |  |  |  | The easiest method for running check-in, but all printing must be done from the server. (This will only work if your server is on the same network as the printers.) |
| iPad Application | X | X |  | X | This application is available for free from the [Apple App Store](https://itunes.apple.com/us/app/rock-check-in/id879253336?mt=8). The application provides a simple tablet interface to the Rock check-in system. It also allows you to print directly from the iPad to a networked printer, allowing the server to be hosted remotely. |
| Windows Application | X | X | X |  | The Windows check-in application can be downloaded from Admin Tools \> Power Tools \> External Applications. This application allows you to print to a USB-connected printer as well as network-based printers. |

# Externally Hosted Servers

If your Rock server is hosted outside your organization, you will need to use either the iPad application or Windows application to enable local printing.

# iPad Application

While the normal check-in screens run really well in mobile Safari, we have created a native iPad application to host the check-in experience. This application can be downloaded for free from the [Apple App Store](https://itunes.apple.com/us/app/rock-check-in/id879253336?mt=8). The application displays the same Rock check-in screens as the browser but also adds the ability to print straight from the iPad to your network-connected printers. The application can also cache the labels, which increases check-in performance.

# Note

As of Rock v9, the iPad app only runs on **iOS 10** or newer, which means very old hardware like the iPad 2/3 and original iPad Mini will no longer work.

## Configuration

After installing the application from the App Store and running it for the first time, you'll be prompted to enter the address of the check-in start page you want to use for the application. For most organizations this address will be `https://[your-rock-server]/checkin`.

![iPad Launch Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/ipad-checkin-launch-configuration-v11.png)

iPad Launch Configuration

# Navigating Complex Configurations

Organizations with multiple check-in configurations might want to point to a simple navigation page that allows the individual to select the check-in configuration on load.

Once you provide this address, all subsequent launches will load this address on startup. If you want to modify this address later, or access advanced configuration settings, you can select Settings on your iPad and scroll down to the Rock Check-in application settings. From there you can adjust the following settings.

![iPad Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/ipad-app-settings-v11.png)

iPad Configuration

| Setting | Description |
| --- | --- |
| Check-in Address | This is the initial page that will load when the application launches. |
| Enable Label Caching | This setting will cache the loading of check-in labels, which keeps them from being downloaded on each check-in. |
| Cache Duration | This determines how often the labels will be re-downloaded. The cache can also be expired by stopping the application and restarting. |
| Enable Label Cutting | If your label printer has a cutter, enable this feature to automatically perform cuts at the end of each set of labels. See the [Printing](#printing) chapter above for more information. |
| Printer Override | This setting has the effect of always printing from the iPad to the printer IP address you provide. |
| Bluetooth Printing | Determines if the Printer Override setting contains a Bluetooth printer name or an IP address for Wi-Fi printing. |
| Enable in Application Settings | Enables or disables the 5-finger long press gesture to get to the in-app settings screen. You can also change how long a person needs to press before the settings screen appears. |
| UI Colors | You can easily customize the background and foreground colors of the interface by adjusting these settings. |
| Camera | Select whether the iPad should use the front or the rear camera for scanning barcodes. You can also adjust the exposure if the image is too bright or too dark. See the [iPad Barcode Scanning](#ipadbarcodescanning) section below for details on enabling this feature. |

## Bluetooth Printing

The iPad Application supports Bluetooth Low Energy printing to supported Zebra printers. As of this writing, these are the ZQ300, ZQ500, ZD400, ZD600 and ZT600 series printers. Zebra also has some older “Bluetooth Classic” printers, but these are not supported. If you are thinking of buying Bluetooth printers, try just one first to make sure everything works before you buy them all. To configure the use of a Bluetooth printer you need to use the in-app settings screen.

While you are in the Rock Check-in app, press five fingers on the screen for two seconds to access the settings screen pictured below. When you enable Bluetooth Printing, a list will appear that contains nearby Bluetooth devices. Select the name of the Bluetooth printer and it will auto-fill the Printer Override setting for you.

![iPad bluetooth Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/ipad-app-settings-with-camera-v13.png)

iPad Bluetooth Configuration

You may have noticed the *Print Test Label* button pictured above near the bottom of the screen. This feature is enabled if you have a Bluetooth printer name or an IP address in the *Printer Override* field. Tapping this button will print a simple test label to verify the connection to your printer.

# Note About iPad Restrictions

It's not uncommon when using iPad kiosks to "lock down" the iPad as much as possible via the use of iPad Restrictions, to prevent individuals from changing the configuration or using it in a way that wasn't intended. We have discovered a minor issue in iOS 10 where restricting the use of Safari Browser prevents the Rock check-in app from working properly. (Check-in worked fine in iOS 9 and earlier.) So be aware that you won't be able to disable the use of Safari when running iOS 10 or newer if you want the Rock app to function.

## iPad Barcode Scanning

You can use an iPad’s built-in camera to scan barcodes or QR codes for check-in. This speedy option is easy to set up and comes with a variety of customization options.

To start, make sure that you have at least one *Device* set up with the camera feature enabled as shown below. See the [Configuring Kiosks](#configuringkiosks) section for full details on setting up a *Device*. Remember, a single *Device* configuration can be used on multiple physical machines at the same time.

Device Camera Setup

![Device Camera Setup](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/ipad-camera-device-setup-v13.png)

1 Kiosk Type

In this case, be sure iPad is selected as the Kiosk Type.

2 Has Camera

This option must be enabled to use a camera for scanning barcodes or QR codes with the selected *Device*.

3 iPad Camera Barcode Configuration

Select the camera configuration setting that applies best to how it will be used:

- **Off:** If selected, the camera will be off and can’t be used for check-in.
- **Available:** This will add a button to the *Welcome* screen, allowing the person to choose between scanning a code or providing a phone number to proceed with check-in.
- **Always On:** Select this option to require scanning for every check-in. The camera feature will activate immediately when the *Welcome* screen is accessed.
- **Passive:** With this setting the camera is always on, but the camera view isn’t shown on the screen. In this case, the individual will have to know to place the barcode into the camera’s field of view.

If a *Camera Barcode Configuration* option is not chosen in the *Device* settings, then the Welcome block’s settings will be used by default. Those settings can be changed by navigating to Admin Tools \> CMS Configuration \> Pages \> Check-In \> Welcome and editing the Welcome block.

![Welcome Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/welcome-page-block-settings-camera-v17.png)

Welcome Block Settings

# In-App Camera Settings

There are more camera options you can set within the iPad application itself. See the [Configuration](#ipad-configuration) section above for details.

Now that Rock knows about your camera, you’re ready to start using it.

If a camera-enabled device is selected in the [Administration Screen](#theadministrationscreen), the configuration settings described above will impact what you see next. We’ll start with the **Available** option, which adds a button to the *Welcome* screen as pictured below.

![Welcome Screen with Barcode Button](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/welcome-screen-with-barcode-button.png)

Welcome Screen with Barcode Button

When the barcode button is tapped in **Available** mode, the camera will activate and look for a code to scan.

![Camera View](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/ipad-app-scanning-qr-code.png)

Camera View

If **Always On** has been selected, you’ll be taken directly to the camera view pictured above immediately after moving past the *Administration* screen.

The code being scanned should be placed within the semi-transparent brackets to be read properly.

If the **Passive** setting is used, then the barcode button will still appear on the *Welcome* screen as a reminder that scanning is available but tapping it will not take you to the camera view page pictured above. The person scanning the code will need to know where to position it.

# Changing the Barcode Button

The barcode button can be customized in the application’s [Configuration](#ipad-configuration), or by modifying the [Check-in Display Settings](#check-in-display-settings).

When the **Off** setting is used, the process will be the same as if the camera were disabled. The barcode button will not appear, and the camera will not activate.

After a valid code has been scanned, the check-in process will continue according to your overall setup.

# Windows Client

If you're planning on running the check-in kiosk on a PC platform, the Windows Client provides a simple and powerful hosting experience. The client application can be downloaded from your Rock install under Admin Tools \> Power Tools \> External Applications.

## Configuration

After running the setup application, you'll have a Rock Check-in icon in your Start Menu and on your desktop. When you launch the application, you'll see the settings screen. Unlike the iPad application you'll see this screen on every launch, but the settings you select will be remembered for you.

![Windows Client Check-In](https://rockrms.blob.core.windows.net/documentation/Books/10/1.18.0/images/windows-client-check-in.png)

Windows Client

Below is a summary of these settings.

| Setting | Description |
| --- | --- |
| Check-in Address | This is the initial page that will load when the application launches. |
| Enabling Label Caching | This setting will cache the loading of check-in labels, which keeps them from being downloaded on each check-in. |
| Cache Duration | This determines how often the labels will be re-downloaded. The cache can also be expired by stopping the application and restarting. |
| Printer Override | This setting has the effect of always printing from the device to the printer IP address entered here. |
| Printer List | Under the *Printer Override* setting you will see a list of local printers configured in Windows. This allows you to print directly to a USB printer. |

# QR Code Scanning

Don't forget that QR code scanning to identify the person is supported in the Windows application. For details on setting up your device to enable this feature see the [Kiosks](#kiosks) chapter above. Note that scanning of QR codes generated by [Mobile Check-in](#mobilecheckin) is still limited to iPads only.

# Closing the Windows Client

After pressing the Start button, the check-in application will load the initial check-in screen. When you are ready to exit, simply tap or click in the upper left corner of the screen six times in three seconds to close the application.

# URL Parameters

By specifying additional parameters in the URL of the check-in site, it's possible to pass additional information or override the default behavior of check-in.

For instance, if your check-in URL is `examplechurch.com/checkin`, you could use the URL `examplechurch.com/checkin/2/14/18,19` to load the kiosk with the ID of `2`, use the check-in configuration with an ID of `14`, and group types with IDs of `18` and `19`. This is really useful if you have specific devices that always load the same configuration.

However, what if you have a lot of kiosk devices? It can be impractical to provide a unique URL to every kiosk, even if you want all of them to use the same check-in configuration. Luckily, Rock can go get the kiosk ID for you. If a CheckinConfigId is passed into the Check-in Admin block but a KioskId is not passed in, Rock will attempt to look up the KioskId for you using the client's IP address to find a matching Device in Rock. However, because the KioskId is required in all the routes, the only way to have it be blank is to explicitly name the parameters. So, you would use a URL of `examplechurch.com/checkin?CheckinConfigId=14&GroupTypeIds=18,19` instead of something like `examplechurch.com/checkin/_/14/18,19` to enable the kiosk lookup.

If you're explicitly naming the parameters in the URL then the parameter options include:

- KioskId
- CheckinConfigId
- GroupTypeIds
- GroupIds

Keep in mind that you should not provide both Group and Group Type Ids. If you have both then the `GroupTypeIds` parameter will be ignored, and the group types used will be the ones associated with the listed `GroupIds`. If only `GroupIds` are provided, Rock will use the group types of those groups in the configuration.

It's also possible to override the theme by appending a `?theme` parameter to the end of your address. For instance, `examplechurch.com/checkin?theme=CheckinBlueCrystal` will render the Blue Crystal theme. These parameters are configured using *Routes*, which you can learn more about in the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#routes) guide.


---

## Going Deeper With Areas {#going-deeper-with-areas}

> **Path:** Checking-out Check-in > Going Deeper With Areas

Going Deeper With Areas

We've already spent some time on areas in the earlier configuration but let's dig a little deeper. By now you know that areas are a way of categorizing your check-in groups. They also help to:

- Define which tags will be printed when checking into any of the groups assigned to the area.
- Provide configuration templates by setting the group type for the check-in groups. (More on this in a minute.)
- Structure attendance reporting.

# Keep it Simple

We’ve said it before, but it’s worth repeating. Your future self will thank you for keeping your areas streamlined and simple. Before adding a new Area, make sure you wouldn’t be better off adding a new Group to an existing Area.  
  
For instance, it’s possible for a person to check in to more than one area at the same time. But, if a person checks in to “2nd Grade” in the “Elementary” area for the first service and “2nd Grade” in the “Volunteer Kids” area for the second service, only the locations and schedules for one area will be printed on their label. Adding an additional “2nd Grade Kids of Volunteers” group in the “Elementary” area would be better than creating a new area.

# How Areas Assist With Configuration

The check-in system is a rich pairing of Rock's workflow engine and groups system. Under the hood, *Areas* are really just *Group Types* while check-in groups are, well, *Groups*. Before continuing on with this section we highly recommend you stop and read the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7/) guide to get a solid background on Rock's group capabilities, paying special attention to the *Group Types* section. Don't worry, we'll wait...

Now that you have a good understanding of groups and group types let's continue. Since check-in areas determine the group types for their groups, you can configure attributes for the groups by modifying the area group type. That's a mouthful, but it will make more sense when you look at the group types under Admin Tools \> General Settings \> Group Types. Here you'll see each of the areas you've defined using the check-in configuration screens. If you click on them, you'll see some familiar attributes like *Age Range* and *Grade Range*. The check-in configuration screens are really a simplified group type and group editor especially designed for check-in. You could do all of the configuration using the normal group type editor and group viewer, but it would be much more difficult.

# Using Group Type Inheritance

Imagine what a pain it would be to have to add attributes like *Age Range* to every new check-in group you create. Make one typo and your check-in might break. That's where group type inheritance comes to your aid.

Group type inheritance simply means that attributes from one group type are used (inherited) by another group type. For instance, the *Check-in by Ability Level* group type that ships with Rock has an *Inherited Group Type* of *Check-in by Age*. This means that all of the attributes configured for *Check-in by Age* are also set up for *Check-in by Ability Level*. This saves you from having to manually recreate attributes that you use often in your check-in setup.

You might be asking, "I get the inheritance but what if I need a group to inherit attributes from more than one group type?" Brilliant! We have that same problem, too. You might notice that groups like *Jr High* have a need for both the *Age Range* attribute AND the *Grade Range* attribute. But a group type can inherit from only one group type.

From your reading in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7/) guide, you may remember the concept of group type hierarchies. In this case, *Check-in by Grade* inherits from *Check-in by Age*. So, check-in areas (group types) that inherit from *Check-in by Grade* get the attributes from both, allowing your check-in groups to filter by *Age Range* and *Grade Range*. This complicated behind-the-scenes concept really serves to keep things simple for you.

Let's circle back to the pre-configured group types called *Check-in by Age*, *Check-in by Grade* and *Check-in by Ability Level*. You can probably guess by their names what each one does. If you're sharp (and we know that you are) you may have also noticed that these group types have a purpose defined as *Check-in Filter*. A group type’s *Purpose* is really just a way of telling you what it's used for. In this case, giving a group type the purpose of *Check-in Filter* helps Rock know when to show it on certain screens. Nothing magic, we promise.


---

## Check-In Test Area {#check-in-test-area}

> **Path:** Checking-out Check-in > Check-In Test Area

Check-In Test Area

You may have noticed an area called *Check-in Test Area*. This area is used to help you test your kiosk configuration and label printing. Since most areas and groups are only configured to allow check-in during certain schedules, they aren't that helpful for testing. The *Check-in Test Area* is configured to be available all the time.


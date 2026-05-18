---
description: "Use when configuring check-in printing, selecting printers, or troubleshooting label print location and client/server printing options"
source: "https://community.rockrms.com/documentation/bookcontent/42/350"
sourceLabel: Checking-out Check-in - NextGen
---
> **Path:** Checking-out Check-in - NextGen > Printing

As we mentioned in the Welcome section, Rock's check-in is very flexible. This is especially true when it comes to printing. What printer you print to and where the printing takes place (client or server) is completely customizable. While this is very powerful, it can be a bit confusing. To help get you started, we have outlined a simple approach that should work for most organizations. We'll also dive a little deeper for those who want more options.

# A Simple Approach to Printing

The recommended approach to printing is to always print from the client using the printer defined on the client. While this is a simple approach, it should meet the needs of most organizations.

- We recommend that you use either the iPad or Windows client application for running check-in.
- On your check-in kiosk device configuration set the *Print Using* setting to *Device*, leave the *Printer* setting blank and choose *Client* for the *Print From* setting. See the [Kiosks](#kiosks) chapter for more on these settings.
- Configure the iPad/Windows application to print to a specific printer.

# Printers with DPI Settings Other Than 203

Rock assumes your printer’s resolution is 203 Dots Per Inch (DPI) by default. If your printer uses a different DPI—like 300, which is common—you'll need to take additional steps. You'll define a printer with the correct DPI settings and connect it to your Kiosk. Details are provided below.

# Diving Deeper Into Printing

Ok, so the simple approach doesn't work. Never fear, we have many more options for you. When we break down the printing process, there are two bits of information that need to be determined: where to print and how to print. Let's look at each in detail.

## Where to Print

The flowchart below breaks down the logic of how Rock determines where to print the check-in labels.

![Printing Diagram](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/print-location-logic.png)

Determining Where To Print

# Quick Shortcut

This may seem a bit complex. You might be wondering why all this is needed. If you want to get creative, these features will allow you to customize label printing so that some groups print at the device and other groups print inside the actual room. Remember to keep it simple. You can define the printer on the kiosk and forget the chart above. It'll be there when you need it.

## How to Print

Determining *how* to print is much easier than figuring out *where* to print. You can print either from the server or the client. This is determined on the kiosk configuration under Admin Tools \> Check-in \> Devices. But wait, there are a couple of considerations for each of these options:

- **Client:** To be able to print from the client you must use either the iPad or Windows applications. This is the method you will use when your Rock server is hosted externally.
- **Server:** To print from the server you must be sure that the server is on the same network as the printers (or more accurately, the server must be able to route IP to the printers). If you are hosting Rock externally, you won’t be able to print from the server unless you do something crazy like a VPN between your hosted server and local printers. Or, since you're not crazy, you can use the [Rock Cloud Printing](#rockcloudprinting) feature covered in a later chapter.

# Label Size?

Before you get too far into printing labels, we should probably mention that the *size* of the default labels that ship with Rock is 4 x 2 inches. If you plan on using the built-in labels, this is the size you should purchase.  
  
You can of course create your own labels to work on any size stock you choose (as often happens when switching from another system and you already have a bunch of, say, 3 x 2 stock) but more about that in the [Creating Custom Labels](#creatingcustomlabels) section.

# Reprinting

We've all worked with that one volunteer or staff member whose ability to tear off the labels from the printer might not be, shall we say, their calling in life. Okay, maybe it's you…so you have a torn name tag, and we can come up with many reasons why that is an issue. Possibly you can't read a child's name, or the security pick up code is not legible. Either way, you need a solution, and we have just the thing. That's right: label reprinting.

There are two ways to reprint labels. One is through the check-in kiosk device manager (accessed by clicking the gear on the check-in Welcome page), and the other is in Check-in Manager. We will walk through both and show how to enable this option.

# Restrictions on Reprinting

Due to web browser restrictions, Check-in Manager reprinting only works with server printing, while Kiosk Device reprinting works with either server or device printing. Reprinting is not available for mobile check-ins.

## Check-In Kiosk Device Manager

After logging into the Check-In Kiosk Device Manager with a PIN, you'll see a *Reprint Labels* button.

![Device Manager Screen](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/check-in-device-manager-1.png)

Device Manager Screen

Clicking on *Reprint Labels* takes you to a screen to filter by the person's name.

In some cases, you might get more than one result. Simply click on the desired name to reprint.

![Search](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/check-in-device-manager-2-alt.png)

Search

Check out the [Device Manager](#devicemanager) section of this guide for additional kiosk device manager information.

## Check-In Manager

Now let's take a look at using Rock's convenient and oh-so-mobile-friendly Check-in Manager option.

Reprinting is not enabled by default for the Check-In Manager. You'll need to enable *Allow Label Reprinting* from the Check-In Manager Person Profile page, Person Profile block setting, located at CMS Configuration \> Pages \> Check-in Manager \> Person Profile. After enabling, you'll see a reprint button on the Check-In Manager person profile screen.

![Person Profile Block Setting](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-person-profile-reprint-block-setting-v12.png)

Person Profile Block Setting

With the above setting enabled, you'll now see the reprint button on the person profile as shown below.

![Check-In Manager Person Profile Page](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/checkin-manager-person-profile-reprint-button-v17.png)

Check-In Manager Person Profile Page

When you click the *Print* button, a popup will appear to let you know if/when the labels were printed.

Check out the [Check-in Manager](#check-in_manager) section of this guide for additional Check-in Manager information.

# Label Cutting

You can easily configure your cutter-enabled label printer to automatically cut at the end of the set of labels. So, if there are a set of three kids checking in, it will automatically cut once after all labels for each child have been printed. As you’ll see later, you can take this to the next level and control cutting to a great extent.

# Printers with Cutters

If you’re in the market for a label printer with a cutter, see the [Printers](#printers) chapter below for some models we recommend.

Enabling automatic cutting is easy. All you have to do is let Rock know that your printer has a cutter. There are different ways to configure this depending on what you use for check-in. Automatic cutting works with the latest versions of the iPad and Windows Client apps and can also be used with server-side printing.

If you’re using the Windows app, simply enable the *Printer Has Cutter* option in the app settings.

![Enable Windows Label Cutting](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/windows-app-settings-cut-v11.png)

Enable Windows Label Cutting

For the iPad application, you’ll need *Enable Label Cutting* turned on. To do this, go to *Settings* on your iPad and access the *Rock Check-in* application settings.

![Enable iPad Label Cutting](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/ipad-app-settings-with-cutting-v11.png)

Enable iPad Label Cutting

If you’re set up for server-side printing, you’ll use the *Has Cutter* option in the Check-in Device configuration. In Rock, navigate to Admin Tools \> Check-in \> Devices and select your label printing Device.

![Enable Server Side Label Cutting](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/device-settings-has-cutter-v18.png)

Enable Server Side Label Cutting

# One Cut Per Person, Not Per Label

Want one clean cut after each person’s labels? Just switch both settings to *On*:

*Has Cutter* — tells Rock your printer has a cutter (Admin Tools \> Check-in \> Devices then choose your printer).

*Enable Label Cutting* — tells the Check-in app to bundle each person’s labels into one print job.

If *Has Cutter* is *Off*, nothing cuts. If *Enable Label Cutting* is *Off*, the printer snips after every label. Flip them both *On* for a smooth cut between each person's label, even if there are many labels per person.


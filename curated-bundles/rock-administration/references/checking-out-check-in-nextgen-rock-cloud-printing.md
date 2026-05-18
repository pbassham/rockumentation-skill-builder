---
description: "Use when users need to understand label printing options for Rock check-in systems, including VPN, kiosk, local network, and cloud printing solutions"
source: "https://community.rockrms.com/documentation/bookcontent/42/350"
sourceLabel: Checking-out Check-in - NextGen
---
> **Path:** Checking-out Check-in - NextGen > Rock Cloud Printing

Rock Cloud Printing

One of the most important parts of check-in is label printing. When labels print without a hitch, your check-in experience stays as fast and easy as it should be. But if your Rock server lives in the cloud, a firewall might keep your server from connecting directly to your label printer. That’s where Cloud Printing steps in! With Cloud Printing, your labels print directly from the server, keeping check-in smooth and frustration-free, no matter where your server is hosted.

# Options for Printing Labels

Before we dive into Rock’s Cloud Printing solution, let's look at all the options you have available.

## VPN Tunnel

One way to get around the firewall is by using a VPN tunnel. This would open a secure pathway between your printer and your server, which would enable the server to print straight to the printer.

![VPN Tunnel Printing](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/vpn-tunnel-printing-v16.png)

VPN Tunnel Printing

While this method allows communication through the firewall, it has several downsides:

- **Complex Setup:** VPN tunnels can be difficult to configure, requiring technical expertise.
- **Reliability Issues:** They can be prone to interruptions, which can cause delays in printing.
- **Cost:** VPN services can be expensive, especially when factoring in ongoing maintenance.
- **Security Risks:** VPN tunnels, while secure, can introduce vulnerabilities if not properly managed.
- **Maintenance:** Regular upkeep and troubleshooting are often required.
- **Possible Delays:** Printing may take longer, which isn’t ideal during busy check-in times.

## Kiosk Printing

Another option is printing directly from the kiosk. This method allows you to print labels without needing to connect the printer to your Rock server.

![Kiosk Printing](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/kiosk-printing-v16.png)

Kiosk Printing

While this is a valid and simple solution, it also comes with limitations. You need to download special kiosk software for kiosk printing to work.

## Local Network Printing

If your Rock server is locally hosted (i.e., not in the cloud), you can print labels easily because your server and printer are on the same network.

![Local Network Printing](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/local-network-printing-v16.png)

Local Network Printing

This is another straightforward and easily configured method. However, this approach has its own challenges.

- **Difficult Scaling:** As your organization grows, scaling a local network setup can be expensive and complicated.
- **IT Requirements:** Running a local network may require dedicated IT staff for maintenance, backups, and support.
- **Physical Risks:** Local servers are more vulnerable to physical damage, like natural disasters or power outages.
- **Bandwidth:** Your server’s connection to the internet is limited to your local provider’s connection to your building.

## Cloud Printing: A Better Solution

Now that you’ve seen the challenges of other options, here’s the good news: Rock Cloud Printing makes label printing much simpler and more reliable. With Cloud Printing, you don’t have to worry about complex networking setups or direct communication between your server and printers. It’s all managed for you through a *proxy device* and a *proxy service*, two components we’ll introduce here.

Let’s start with the *proxy device*. This is a physical device that handles communication between your Rock server and the printers on your internal network, bypassing any need for direct access to your local IP addresses, as pictured below. The proxy device can be any Windows check-in device you already have, or a small, dedicated computer like an Intel NUC. We recommend a dedicated device. Remember, you can always start small with a single device and scale up as needed, adding more based on performance requirements or redundancy goals.

![Rock Cloud Printing](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/rock-cloud-printing-v16.png)

Rock Cloud Printing

Now, what about the *proxy service*? The *proxy service* is a small program running on your *proxy device* that keeps an open line of communication with your Rock server. Think of it like a web browser. When you visit a page, your browser opens a connection to the website. But unlike a typical browser, the proxy service keeps this connection open continuously. This persistent connection allows the server to send commands to the proxy device in real time. Commands like “please print this label on Printer A.”

The *proxy device* then relays the command to the printer(s) on your local network. For example, Rock might send a message to the *proxy service* saying, “please print this label on Printer A.” Since the *proxy service* is on your local network, it can reach Printer A, send over the label data, and voilà—your label prints without any direct connection between Rock and your internal printer network.

That's a lot of "proxy" talk. It's not critical that you distinguish between *proxy device* and *proxy service*. Going forward, we'll simply refer to them both as *Cloud Print Proxy*.

Be aware that if you are running Rock in a cluster with multiple servers that you need to be aware of label size. If the proxy is connected to server B, and the check-in happens on server A, it will render the label and use the Rock Bus to send the label over to server B for printing (via the proxy). These messages have a 64KB limit with certain providers. Normal labels are less than 1KB, but if you have large images or icons that can grow to a couple KB. Since all labels are sent at once using the bus, if a large family checks in and you have a lot of labels printing for each person it is possible to reach this limit when lots of images or icons are in use.

## Why Cloud Printing Is a Game-Changer

With Cloud Printing, you can say goodbye to complex network configurations. Since the Cloud Print Proxy takes care of all communication, there’s no need for extra VPNs or complicated setups. This feature is flexible and grows with you—one Cloud Print Proxy can handle multiple printers, making it a breeze to expand as your needs increase. And here’s the cherry on top: for larger organizations, adding multiple Cloud Print Proxies builds in a layer of reliability, so if one device goes offline, another jumps right in to keep check-in running without a hitch.

## How Many Cloud Print Proxies Do I Need?

If you’re running a smaller campus with just a few check-in printers, a single Cloud Print Proxy will do the job. But realize that if this device goes down you'll no longer be able to print.

For a larger campus with, say, 30 check-in printers, things are a little different. More printers mean more people checking in, which means lots of labels. If the Cloud Print Proxy goes offline in this scenario, all 30 printers stop printing—a much bigger hassle for your staff and volunteers! This is why it’s helpful to have multiple Cloud Print Proxies.

With multiple Cloud Print Proxies running, one can pick up the load if another goes down. Rock automatically balances the load across all active instances, so no single proxy has to handle everything on its own.

In environments with multiple Rock servers (i.e., a Web Farm setup), Cloud Print Proxies can connect to different servers to create redundancy across the whole setup. If one Rock server fails, Cloud Print Proxies connected to other servers will seamlessly keep things running.

So, how many Cloud Print Proxies should you have? There’s no one-size-fits-all answer; it’s a balance of cost and risk. The cost includes any extra hardware and time to maintain it. The risk is the potential disruption in label printing if a Cloud Print Proxy fails. For a small campus, probably not much of a problem. The traffic is probably such that you can just handwrite labels quickly. A larger campus might not have that option, so may want to invest in multiple Cloud Print Proxies.

## Setting Up Rock Cloud Printing

# Ensure WebSockets Are Enabled

Be sure to review your IIS server configuration if it’s been a while. *WebSockets* must be enabled for *Rock Cloud Print* to function. The [Internal Hosting](https://community.rockrms.com/documentation/bookcontent/1/#installingserverrolesfeatures) guide explains exactly how to configure this. If you're using a *Rock Cloud* server, WebSockets are already enabled for you.

Ready to set up Cloud Printing? Here’s how to get everything up and running.

To set up Cloud Printing in Rock, you’ll need to add a Cloud Print Proxy for each campus or network. Multiple instances of a single Cloud Print Proxy can run on different PCs for load balancing and failover, but you only need one Cloud Print Proxy in Rock per network. For example, if you have three campuses, you’ll need three Cloud Print Proxies in Rock—one for each network—even if each campus has multiple PCs running Cloud Print Proxies.

To add a new Cloud Print Proxy to Rock, go to Admin Tools \> Settings \> Check-in \> Devices. There, create a new device and set the Device Type to "Cloud Print Proxy." Note, you don’t need to specify an IP address; the Cloud Print Proxy will report its own address to the server.

![Set Up Proxy Device](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/set-up-proxy-device-in-rock-v18.png)

Set Up Proxy Device

Next, update each printer you’ll be routing through the proxy. Find the proxy device setting in the printer’s configuration and set it to the proxy device you just created. This lets Rock route printing tasks through the proxy for seamless communication with your printers.

![Add Proxy Device to Printer](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/add-proxy-device-to-printer-v18.png)

Add Proxy Device to Printer

Finally, confirm that your kiosk configuration is set to use *Server* printing instead of *Client* printing. This ensures that all printing requests are handled by the server through the proxy device.

![Cloud Printing Kiosk Configuration](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/cloud-printing-kiosk-configuration-v18.png)

Cloud Printing Kiosk Configuration

## Setting Up the Cloud Print Proxy

To set up the Rock Cloud Print application on the Windows machine you’ll use as the proxy, start by downloading the installer from Admin Tools \> Settings \> Power Tools \> External Applications in Rock. Run the installer, and once it completes, you’ll find the Rock Cloud Print application in your Start Menu, within the Spark Development Network folder. Open it, select Settings, and complete the information shown below.

![Rock Cloud Print Application](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/cloud-printing-rock-app-v16.png)

Rock Cloud Print Application

After saving these settings, navigate back to the Home tab to monitor the connection. It may take a minute or two for everything to sync.

Once you confirm the proxy is connected, you can close the Rock Cloud Print application. The Proxy Service will run in the background and automatically start with Windows, so there’s no need to reopen the app unless you need to change configurations.


---

## Allergies and Legal Notes {#allergies-and-legal-notes}

> **Path:** Checking-out Check-in - NextGen > Allergies and Legal Notes

Allergies and Legal Notes

Watching over someone else's child is a big responsibility and knowing specific details about a child's allergies or legal situations is especially important. Rock lets you easily store these details in a child's record and have them displayed at check-in. Here's how.

# Setting Allergy and Legal Notes

To set an allergy or legal note on a child's record, first bring up their *Person Profile* page in Rock and click on the *Extended Attributes* tab. There you will see a section of attributes labeled *Childhood Information*. Click the icon to edit the values for allergies and legal attributes.

# Note To Self

The text you enter for these attributes will print on the child's note label (see below), so keep the message short and appropriate for volunteers to view. If you get carried away, Rock will automatically truncate it to a reasonable length when printed.

# Viewing Notes at Check-In

The notes you enter above will be printed at check-in in two ways.

On the *Child Label* you'll see a notation that the child has an allergy or legal note in the system. This label will be worn by the child and does not show the details of the allergy or legal note, for privacy reasons.

![Child Tag](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/label-child-text.png)

Child Label

The note label will print the complete note entered above for the benefit of the volunteer assisting with child check-in.

![Child Tag](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/label-notes.png)

Note Label


---

## Ability Levels {#ability-levels}

> **Path:** Checking-out Check-in - NextGen > Ability Levels

Ability Levels

We've already seen that you can filter groups by age ranges and grades. There's one more criterion you can use: ability levels. It's common for infants and preschoolers to stay in certain rooms until they achieve a special milestone activity such as crawling or potty-training. Rock can help you track and select these levels within the check-in process. Let’s see how it works.

![Ability Levels](https://rockrms.blob.core.windows.net/documentation/Books/42/1.17.0/images/ability-level-v17.png)

Ability Level Walkthrough

# How Ability Levels Are Stored

Ability levels are simply a person attribute that can be used as a filter to select a check-in group. If you go to the *Extended Attributes* tab of a *Person Profile* page, you’ll see the *Ability Level* attribute in the *Childhood Information* section. This is the attribute that will be considered when filtering groups. Rock comes with three ability levels configured: Infant, Crawling or Walking and Potty-Trained. You saw in the walkthrough above that an individual, or more likely their parents, could update this ability level during each check-in. You can also change the ability level behind the scenes on the *Person Profile* page.

# Configuring Ability Levels

Not all check-in groups care about ability levels. Once you leave the preschool area, they aren't that useful. (Imagine the responses you'd get if you asked high school students if they were potty-trained!) To enable ability levels, first you need to set your check-in area (the default configuration is *Nursery*) to inherit from *Check-in by Ability Level* under Admin Tools \> Check-in \> Check-in Configuration \> Areas and Groups. This will tell all the groups in this area that they can define an ability level.

A key to ability levels is that you need to configure groups with overlapping age ranges. A child will only be able to check into the groups whose age criterion she meets, even though the parent will be presented with a list of all ability levels.

![Ability Level Area Configuration](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/ability-level-area-v18.png)

Ability Level Area Configuration

Once an area has been configured to inherit from *Check-in by Ability Level*, you'll see that the groups assigned to that area now have an *Ability Level* setting.

![Ability Level Group Configuration](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/ability-level-group-v18.png)

Ability Level Group Configuration

# When Ability Levels Are Shown

Due to the potential awkwardness of the ability level selection with older children you might be wondering when the selection screen is shown. This screen is only shown when the following criteria are met:

1. The kiosk is configured to check-in for an area that inherits from *Check-in Ability Levels*.
2. The individual being checked in matches the age ranges of the groups with ability levels.

# Adding Ability Levels

Adding additional ability levels is a simple process. But you should refrain from adding too many levels because it can confuse your guests. To edit or add levels simply edit the *Ability Level* Defined Type Admin Tools \> Check-in \> Ability Levels.

# Note

The order of the levels is very important. The order that they are shown in the Defined Type is the order they will be displayed on the check-in screens.


---
description: "Use when configuring Internet Information Services (IIS) for Rock, including application pools, recycling, preload settings, bindings, SSL, and compression"
source: "https://community.rockrms.com/documentation/bookcontent/1/358"
sourceLabel: Rock Solid Internal Hosting
---
> **Path:** Rock Solid Internal Hosting > Configuring Internet Information Services (IIS)

Configuring Internet Information Services (IIS)

Now we will configure Internet Information Services for Rock.

# Configuring IIS

Open up the Internet Information Services Manager by clicking Start \> Administrative Tools \> Internet Information Services (IIS) Manager. Expand your server's node in the treeview on the left side, then click on *Application Pools*. Right click on DefaultAppPool and click on Advanced Settings.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/iis-1.png)

Application Pools

Change the *Application Pools*.NET Framework Version to v4.0 (if it's not already) and change the Start Mode to *Always Running*. Then change *Identity* setting to LocalSystem and change *Idle Time-out (minutes)* to *0*. Then click OK.

# Keep Alive

You must enable Rock's "Keep Alive" process, this is disabled by default. This setting is not needed if your AppPool's Idle Time-out is set to 0 - which is highly recommended.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/iis-2.png)

Advanced Settings

Now right-click on *DefaultAppPool* and click on *Recycling*. Un-check Regular Time Intervals and instead provide a convenient time for Rock to restart each day (such as 4:00am or 2:00am) in the *Specific Time(s)* option. Click next and then click Finish.

# Daylight Savings Time

If your Windows server is in a time zone that observes Daylight Saving Time (DST), it's especially important to set a fixed daily restart time. This helps avoid unexpected job behaviors during the DST changeover, which occurs at 2:00 AM local time. Without this, jobs might run twice when the server time shifts.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/iis-3.png)

Recycling

Finally, expand *Sites* (below Application Pools on the left side) and right-click *Default Web Site*. Choose *Manage Website -\> Advanced Settings*. Change *Preload Enabled* to True and click OK.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/iis-4.png)

Turn on preload

Generally the bindings will be configured for you automatically. However, if they're changed and you need to reset them, in most cases you'll use the configuration pictured below. Note that in some cases you must provide a Host Name; You can use an asterisk (\*) in place of a host name.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/iis-port-80.png)

Port 80

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/iis-port-443.png)

Port 443

Click on the SSL Settings padlock icon to view your SSL settings.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.17.0/images/iis-ssl-configuration.png)

SSL Configuration

## Performance Setting: Response Compression Settings

Now let's check that IIS compression is enabled for dynamic content.

To do this, open the *Compression* feature:

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.14.0/images/iis-compression.png)

Compression

If the option *Enable dynamic content compression* is available, select it and click Apply. If the option is grayed out, the dynamic content compression module may not be installed, and you can skip this step.

![](https://rockrms.blob.core.windows.net/documentation/Books/1/1.14.0/images/iis-compression-1.png)

Compression

That was easy! Now let's move on and set up our database.


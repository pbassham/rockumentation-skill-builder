---
description: "Use when you need to generate attendance reports, analyze attendance patterns, or identify attendees by visit frequency and attendance behavior in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/42/350"
sourceLabel: Checking-out Check-in - NextGen
---
> **Path:** Checking-out Check-in - NextGen > Attendance Analytics

Attendance Analytics

While there are a number of ways to access attendance data using Data Views and SQL reports, Rock also provides powerful analytics capabilities that you can access from Tools \> Reporting \> Attendance Analytics. This powerful tool should be able to answer any question you throw at it. Let's see what's possible.

This block operates in two modes: *Chart* and *Attendees*.

# Chart Mode

When in chart mode, the analytics block will report back the count of the attendees who match the criteria you've provided. This is great when you're looking for numbers for a specific weekend or viewing attendance over time.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/attendance-analytics-chart-v18.png)

Chart Mode

# Attendee Mode

Now that you see how you can see how to get numbers, let's look at how you can see the individuals who make up those numbers. Clicking the Attendees button will hide the graph and show you the individuals behind the data.

Much of the block works in the same way as the graph mode, but here are a few of the differences.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/attendance-analytics-attendees-v18.png)

Attendee Mode

# Filters

### By Visit

Many times, you'll want to filter out only the first-time visitors. That's easy! Just use the *By Visit* filter. You can select from the first to fifth visits.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/attendance-analytics-byvisit-v18.png)

Filter By Visit

Note that the date range is important to this filter. It will show anyone who has had a first visit during the provided range.

You'll also notice a *No* visit option at the end. This will show members of the selected groups that did not attend at all during the selected date range. Keep in mind though that children are not members of most weekend service groups. This option is more for small groups or service groups that children are members of.

# Ministry Idea

Hopefully you're already seeing that this filter provides an easy way to send emails or letters to parents of first-time visitors.

### Pattern

Perhaps you want to find kids who have stopped coming or maybe who come often. The pattern filter can help with either case.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/attendance-analytics-pattern-v18.png)

Filter By Pattern

As you can see, you can filter by certain attendance and non-attendance patterns.

# Configuring Attendance Analytics Block Settings

You can configure the Attendance Analytics block to service other types of check-in scenarios, such as volunteer or serving team check-in. In the Group Types section, select which group types you want to use for your analytics. Ensure that the group type you select is a top-level type that contains the groups you wish to report on.

Attendance Analytics block settings is also where you can choose whether to display all of the groups in your organization as a list on the screen, or to use a group dropdown menu instead. If you want to use a dropdown menu, select No in the Show All Groups field.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/attendance-reporting-block-settings-v18.png)

Attendance Analytics Block Settings

## Attendance Analytics for Specific Groups

There are additional *Attendance Analytics* block settings that allow you to filter data by a specific group ID, as well as additional display options. This option is intended for group leaders to use as part of their Group Leader toolbox.

![](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/attendance-analytics-additional-options-v18.png)

Additional Attendance Analytics Block Settings

Selecting "Yes" in the *Group Specific* field will tell the block to only display attendance for a single group, passed to the block through a query string in the URL (e.g. `?GroupId=123`). When a group ID is used, the *Merge People*, *Bulk Update* and *Merge Document* options on the *Attendance Analytics* screen will be hidden.

The *Show Schedule Filter*, *Show Campus Filter* and *Show View By Option* settings give you control over whether or not these options are displayed on the *Attendance Analytics* screen.

# Final Pieces

We have a couple of final items to mention, both of which can be found at the top of the Attendance Analytics screen.

![Final Pieces](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/attendance-analytics-final-pieces-v18.png)

Final Pieces


---

## Printers {#printers}

> **Path:** Checking-out Check-in - NextGen > Printers

Rock's check-in requires the use of specific Zebra printers. Since most models have many SKUs/options, you'll want to be careful when ordering to specify the exact model number that includes the features you need. Working with a vendor that specializes in Zebra printers is often better than "going it alone" and Googling for the cheapest price. Rock has been tested on the following models:

1. **ZD421d/621d** - These are our currently-recommended models (the ZD421d in particular). The cutter module (which we highly recommend) is purchased separately and is user-installable (as is the ethernet port), unlike earlier models. Make sure you purchase the *d*, not *t*— very few (if any) churches need thermal-transfer capability. These models are available with very good dual-band Wi-Fi. The ZD621d is a little faster, but significantly more expensive.
2. **ZD500** - This model (now discontinued) is more expensive than the others as it can do direct thermal *and* thermal transfer, and also comes with Ethernet and dual band 802.11n Wi-Fi. It can be ordered with or without a cutter, but the cutter is not user-installable after the fact. This is a large printer, as it needs to accommodate the thermal transfer roll mechanism, but is proving to be a workhorse in many organizations.
3. **GX420d / GK420d** - Now discontinued, these are de facto standard desktop printers used in countless check-in systems. While they were available with (now) horrible 802.11g Wi-Fi, we do not recommend using that mode with Rock due to the lack of stability with 802.11b/g. That said, if you have them, they still work great via USB (only supported by the Windows check-in client) and Ethernet.
4. **QLn series** - These are battery powered mobile printers for specialized applications (read: you need to walk around with it).
5. **LP2844-Z** - These oldies but goodies have been replaced with newer models, but if you still have them, they should work (although this model does not support extended-character printing). Oh, and the 'Z' in the name is really important, as a plain-old LP2844 doesn't talk ZPL, which is necessary for Rock.

While it's highly likely that other Zebra models could work (technically any printer that supports ZPL should work) we've only tested with the models above.

We recommend that when purchasing these Zebra printers, you get ones with built-in Ethernet ports and/or Wi-Fi. This allows more flexibility such as printing from the server (when self-hosting) or the iPad app. If you currently have models that do not have Ethernet or Wi-Fi, you will need to use the Windows client to enable printing via USB. Some models also support Bluetooth LE, which Rock supports *only* via the iPad app. Bluetooth is a good option if you want to use iPad clients *and* your printers are not networked via Ethernet or Wi-Fi (or the local network does not allow Wi-Fi clients to talk to each other.)

We also *highly* recommend printers with cutters, as this eliminates 99% of the jamming problems you get when visitors have to manually tear-off labels. However, we **do not** recommend trying to mix cutter and non-cutter printers within the same system. It's technically possible to do so, but you have to do some hacky things to make such a system stable.

# Resolution Matters!

It's important to know that several Zebra models are available as different SKUs in 203dpi or 300dpi resolution. These are not like laser printers that can print at 1200, 600, or 300dpi and look great... it is the literal *physical* resolution of the print head.

It might be tempting to assume 300 is better than 203 and you should automatically go with that but realize that the labels that ship with Rock are designed at 203dpi and if you try to print them on a 300dpi model, they will look too small. There is no way to fix this other than to re-design the label at 300dpi in ZebraDesigner. Thus, **our recommendation is to stick with 203dpi models** (which cost less, anyway) and only go 300dpi if you plan on creating your own labels **and** want the extra resolution for things like printing photos on the labels (though photos look decent at 203, too).

We'll also mention that because of the way labels are designed for a specific resolution, it is not practical to mix 203dpi and 300dpi printers in the same system. Whatever you do, pick a resolution and stick with it for every printer in your system. Your future sanity will thank you.

# Other Printer Vendors

While we may add support for other print vendors in the future, we currently support only Zebras. Based on our long experience with check-in systems, we feel that they are the best option. While purchase price can be more expensive than other makes, you'll find that their total cost of ownership will be less over time. Zebras are built to last for many years and their labels can be purchased for much less than other vendors. (The difference in labels alone can make up for the difference in printer price in less than one year.)

# Defining Printers in Rock

# For Simplified Printing

If you are using the simplified printer setup where you are printing from the client and specifying the printer in the iPad or Windows application, you do not need to define the printers in Rock.

To add printers in Rock for selection when configuring locations, group-types or kiosks, follow the steps below:

1. Navigate to the Devices page under Admin Tools \> Check-in \> Devices.
2. Select a printer device to edit or add a new printer.
3. From the device details screen:
	1. Give your printer a name.
		2. Provide the IP address for your printer.
		3. Select the device type of *Printer*.
		4. Set your *DPI* to the selected printer's resolution.
![Printer Details](https://rockrms.blob.core.windows.net/documentation/Books/42/1.18.0/images/printer-device-detail-v18.png)

Printer Details

Now that your printers are defined, you can configure them to be used on either locations Admin Tools \> Check-in \> Named Locations or kiosks Admin Tools \> Check-in \> Devices.


---

## Check-In Relationships {#check-in-relationships}

> **Path:** Checking-out Check-in - NextGen > Check-In Relationships

Check-In Relationships

There will be times when you'll want to allow individuals outside of a family to check in children. To make this easy, Rock allows you to add relationships between individuals.

# Known Relationships

From a *Person Profile* page, you can define *Known Relationships*. The *Allow Check In* relationship allows you to grant check-in rights to a person outside of a child's immediate family.

To add a known relationship to an individual, complete the following steps:

1. Go to the *Person Profile* page for the child.
2. Click the \[+\] button on the *Known Relationship* block.
3. Select the *Relationship Type* of *Allow Check-in by*.
4. Select the person who should be allowed to check the child in.
5. Click the Save button.

After following these steps, anyone in the family of the person you selected will be allowed to check in the child. You may notice that the inverse relationship (can check in) is automatically added to the adult.

# Adding Check-In Abilities to Other Known Relationships

Rock ships with several other *Known Relationships* such as grandparent, step-parent, etc. Out-of-the-box these relationships do not have check-in rights applied to them. You can easily change that behavior by following the steps below:

1. Navigate to Admin Tools \> General Settings \> Group Types \> Known Relationship.
2. Select the role you would like (under Roles) to add check-in capabilities to.
3. Select Yes under Can Check-in.
4. Click the Save button on the role dialog and then Save again on the *Group Type* screen.


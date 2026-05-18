---
description: Use when configuring check-in procedures to organize groups by birthdate ranges instead of age or grade levels
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Additional Check-In Options

Additional Check-In Options

While Rock ships with the check-in configurations we’ve found to be best practice for most organizations, there may be times when you need a different check-in procedure, such as checking in groups by birthdates or manually checking individuals out of events. Let’s look at the additional check-in options available.

# Configuring by Birthdate

Configuring check-in by age range means less work for you when it comes to managing groups. Students simply move up into the next age group or grade without you having to update group names. There may be situations, though, where you want to check in groups by birthdate range, such as when you want to keep a group of children together as they get older. While this configuration allows groups to move together, it will require the group names to be continually updated as the grade level of the group changes.

![Check-in Birthdate Range](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-birthdate.png)

Birthdate Range

To configure check-in groups by birthdate range, follow these steps:

1. Go to Admin Tools \> Check-in \> Check-in Configuration
2. Select the configuration you want to modify.
3. In the Areas and Groups section, click the Area of the group you want to modify. Rock displays the check-in options for that area.
4. From the Inherit from dropdown menu, select either Check in by Age or Check in by Grade. Either option will display the birthdate range option in the group.
5. Click Save.
6. In the Areas and Groups section, click the group you’re modifying. The birthdate range option will now be displayed in the Check-In section.
7. Select the beginning and ending birthdates from the calendars in each field to set the range.
8. Click Save.

For more details on how Rock handles grades and promotion from one grade to the next, see our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#grade).

# Filter Groups By Grade And Age

Rock ships with a Workflow Action called *Filter Groups by Grade and Age*. When implemented in the *Unattended Check-in* workflow, this action can replace the *Filter Groups by Grade* and *Filter Groups by Age* actions within the Person Search activity.

![Filter Groups By Grade And Age](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/filter-groups-by-grade-and-age-v13.png)

Filter Groups By Grade And Age

A key feature of this action is that it has a *Prioritize Grade* option. When this is enabled, a child who meets the age criteria for one group and the grade criteria for a different group will be automatically checked in to the grade-based group. For instance, let's say you have a preschool room (age-based) and a kindergarten room (grade-based). Kindergartners who are also 4 or 5 years old would normally get a choice between the two rooms, even though they really shouldn't be in the preschool room. The *Prioritize Grade* setting would check them into the kindergarten room.

# Manual Check-Out

Out of the box, Rock automatically “checks out” individuals when an event end time has passed (it doesn't actually mark them as checked out, they no longer appear in Check-in Manager). However, you can configure Rock to allow individuals to manually check out and set it up to print a check-out label.

![Allow Checkout](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-configuration-allow-checkout-v14.png)

Allow Checkout

To configure manual check-out, follow these steps:

1. Go to Admin Tools \> Check-in \> Check-in Configuration
2. Select the configuration you want to modify.
3. In the General Settings section, check *Enable Check-out at Kiosk* and/or *Enable Check-out in Manager*.
4. Click Save.

## Kiosk Check-Out

One of the ways to perform a check-out is through the kiosk, similar to checking in. After searching for and selecting a family, you'll see an option to check out individuals who are checked in, or to check in additional people. Simply tap *Check Out* to select individuals to check out.

![Kiosk Check-out](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/kiosk-check-out-v13.png)

Kiosk Check-out

To print a label at check-out, follow these steps:

1. Go to Admin Tools \> Check-in \> Check-in Labels
2. Click to create a new check-in label or select an existing label to modify from the File List.
3. Select Check-Out in the Print for Each dropdown menu.
4. Click Save.
![Print Check-out Label](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-out-label-v13.png)

Check-Out Labels

## Check-in Manager Check-Out

People can also be checked out using the [Check-in Manager](#checkinmanager). From the Check-in Manager Room Roster, navigate to the *Present* tab and click the button as pictured below. This will check the person out.

![Check-in Manager Check-out](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-manager-check-out-v13.png)

Check-in Manager Check-out

If you ever need to undo a check-out, you can mark the person as *Present* from the *Checked-out* tab on the roster. In order to do this, you must enable the *Enable Mark Present* option in the roster's block settings.

# Auto Check-In

Automatic check-in is an option that works with family check-in and creates a speedier check-in process. With this configuration, when a family checks in, Rock pulls information from their previous check-in based on a certain number of days back. For example, if you have a weekly service, you can set up auto check-in to search a family check-in record ten days back and pull the same options as their check-in for the previous week. This saves them time when checking in. If there is no check-in record within the designated number of days, Rock automatically selects the first eligible option for the family based on age, grade and room availability.

![Auto Check-In](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/auto-check-in-v13.png)

Auto Check-In

To set up auto check-in, follow these steps:

1. Go to Admin Tools \> Check-in \> Check-in Configuration
2. Select the check-in you want to modify.
3. Click Edit.
4. In the Check-in Type field, select Family.
5. In the Auto Select Days Back field in the General Settings section, type in the number of days back you want Rock to search.
6. Click Save.

With the above settings in place, the screen pictured below will appear right away for the Decker family based on their prior check-in information.

![Auto-Selected Family and Locations](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/auto-check-in-select-individuals-v10.png)

Auto-Selected Family and Locations

You'll notice the Change button for each family member in the screen above. Clicking that button will bring you to the page pictured below, where you can change the auto-selected location.

![Change Location for Individual](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/auto-check-in-change-location-v10.png)

Change Location for Individual

# Barcode Check-In

You can use barcode scanners in addition to your standard check-in methods as long as the barcode scanner you use supports keyboard wedge. You don't need to direct Rock to search for barcodes, though. Once installed, the scanner waits at the Welcome screen, ready to check people in by barcode key. You do, however, need to match up barcodes with person records in Rock, but this process is easy. See the steps below. When a person's barcode is scanned, Rock automatically identifies their family and checks them in. This system can be used for check-out as well.

# Barcode Scanner Settings

Rock expects a carriage return at the end of the scanned data, which must be automatically added by the scanner. To configure your Zebra/Motorola device, follow the instructions [here.](https://posguys.com/download/ls2208_enable_carriage_return.pdf) Consult the manufacturer's instructions for other brands.

![Check-in Identifier Field](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/person-profile-alternate-identifiers-v13.png)

Check-In Identifiers

To associate barcodes with people, follow these steps:

1. Go to a person's profile page.
2. Click the edit icon at the top right of their person profile page. (In past versions, alternate identifiers were stored on a family rather than an individual—please don't be confused! We're editing the person record itself now, not the family).
3. Click to add an Alternate Identifier in the section shown above.
4. Click in the Alternate Id field in the pop-up dialog to set its focus.
5. Scan the barcode using the barcode reader. The barcode number will be captured in the Check-in Identifier field.
6. Click Save on the pop-up dialog, and then be sure to also click Save on the Edit Person page. It will return you to their profile, and the check-in barcode should work for their family now.

# Barcodes and the Welcome Screen

Barcodes can be scanned at the Welcome screen. One way to make this option clear to members approaching a check-in kiosk is to modify the button on the Welcome screen to indicate barcode scanning is an option. For example, you could customize the button to read "Scan or Search by Name". To customize the button on the Welcome screen, locate the Welcome page in Admin Tools \> CMS Configuration \> Pages. Click the button to view the page's block properties, then change the text in the *Check-in Button Text* field to whatever you'd like the button to say. Click Save to save your changes.

## Barcode Readers

Scanning a barcode printed on paper is easy. Reading a code presented on a mobile device screen is a different story. You’ll want to make sure that the reader you purchase is able to read a code from a device screen. These types of readers typically use cameras for the task instead of the old school laser.

While there are numerous readers on the market that will work, we have found the Zebra DS457 fixed mount scanners to work very well. You’ll often find this exact model from Motorola. In 2014 Zebra purchased Motorola’s scanning business. You’ll also sometimes see the same model from Symbol. Turns out Motorola owned Symbol…

Either way the scanner works well and can be flush mounted to a surface, or you can purchase a moveable arm stand (Symbol part 20-60136-02R) or a wall bracket (Zebra KT-145344-01).

# Buyers Tip

Often these readers do not come with a cable. Be sure to read carefully to see if it’s included. If not, you’ll most likely want to purchase Zebra part CBL-58926-04 USB Cable Assembly, 9-Pin Female Straight Scanner Connector, Straight Cable, 6' Length.

The built-in cameras on recent iPad models can read codes very well. If you’re using an iPad for check-in you won’t need to purchase a separate reader. You might want a reader even if you have an iPad, to support different types of check-in. A reader might be better for weekly services, while an iPad is definitely more practical for checking kids onto a bus.

## Generating QR Codes

Rock has a feature that lets you generate QR codes based on a person's Alternate Identifier using `GetQRCode.ashx`. In most cases you'll probably want to include the QR code in a communication to the person, so they can have it on their phone when they go to check in.

Including a QR code in your communication (or elsewhere) is fairly easy. The key is that you provide a value for the `data` parameter. This is what's used to create the content of the QR code. The below example can be copied into an email, using the person's Alternate Identifier for the `data` parameter. In this example you can control the size of the QR code image by changing the `dim` variable value.

{% assign dim = 200 %}
{% assign altId = Person | GetPersonAlternateId %}
<img src="{{ 'Global' | Attribute:'PublicApplicationRoot' }}GetQRCode.ashx?data={{ altId }}" height="{{ dim }}" width="{{ dim }}"\>

# RFID Check-In

You can also use RFID readers during check-in. Setting up RFID is the same process as setting up a barcode; you’re just using a different input type. To work with Rock, your RFID reader must support keyboard wedge. If your device doesn’t support keyboard wedge, the free Smartlux 232 Key utility can be used to emulate this functionality. Once the RFID is associated with a family, there is no need for further configuration. 232 Key captures information for whichever screen has focus. For example, a member can scan their RFID card from the welcome screen, and Rock will take them through the check-in process.

# Check-In Titles

You can customize the titles on your check-in screens to fit with your organization branding. This is an advanced setting in the Page Map configuration.

![Check-in Titles](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-titles-v13.png)

Check-In Titles

To create unique check-in titles, follow these steps:

1. Go to Admin Tools \> CMS Configuration \> Pages
2. Drill down in the navigation tree to the page you want to modify.
3. Click Edit.
4. Type the custom title in the Page Title field. You can also specify a title for internal use in the Internal Name field, and a browser title in the Browser Title field.
5. Click Save.

# Configuring for Special Needs

If you have a special needs population, Rock makes it easy to set up check-in so they’re guided to the right spot every time. No matter how you want to structure check-in, Rock gives you the tools to make it work smoothly for everyone, making everyone feel welcome.

# Next-Gen Check-in

To use these settings, make sure you’re running Next-Gen Check-in and that your Rock system is updated to version 16.7 or later. (For information on how to configure special needs check-in in previous versions, check the [v15 manual](https://community.rockrms.com/documentation/bookcontent/10/288#configuringforspecialneeds).)

The first thing you’ll need to do is identify individuals with special needs. This is tracked by a Person Attribute called “Special Needs”. As pictured below, setting this attribute to “Yes” is all that’s needed.

![Special Needs Person Attribute](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/special-needs-person-attribute-v16.png)

Special Needs Person Attribute

Next, make sure you have groups set aside for people with special needs. If these groups don’t already exist, you may need to create some, as shown below. Or you can choose to keep your existing groups the way they are and mix special needs people with non-special needs people. However you want to approach it, just be sure that the *Special Needs* setting in your configuration (Admin Tools \> Check-in \> Check-in Configuration) is turned on for each applicable group.

![Special Needs Check-in Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/special-needs-check-in-configuration-v16.png)

Special Needs Check-in Configuration

Finally, decide how you want check-in to work for your special needs groups. Consider questions like, do you want special needs people to be able to check into non-special needs groups? Should special needs groups be available to everyone, or only those marked as special needs?

As pictured below, there are two simple settings in the check-in configuration under Advanced Settings to help you control how check-in will work:

- **Remove Special Needs Groups:** This setting ensures non-special needs people won’t see special needs groups as options during check-in. In other words, only those who are designated as special needs will be able to check in to special needs groups.
- **Remove Non-Special Needs Groups**This setting limits people with special needs to special needs groups only, preventing them from checking in to non-special needs groups.
![Special Needs Advanced Settings](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/special-needs-advanced-settings-v16.png)

Special Needs Advanced Settings

With these configuration settings in place, you’re ready to start checking in special needs populations.


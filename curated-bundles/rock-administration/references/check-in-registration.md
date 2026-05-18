---
description: "Use when a volunteer needs to add new families, register guests, or edit existing family information during check-in kiosk registration"
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Check-in Registration

A check-in kiosk can also be used by a volunteer to register new families or add guests to existing families.

Although the experience is as simple and smooth as can be, it's not intended to be used by your guests. We recommend you pair the kiosk with a friendly volunteer who is good with quick data entry.

On a kiosk with this mode [enabled](#configuringkiosks), after searching for a family you will see new Add Family options whether you find a match...

![results of searching for a family by name](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-families.png)

Select Your Family

...or not.

![results of searching for a family by number](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-search.png)

Select Your Family

To speed up the process, when adding new people you will see only the essential fields -- although you can configure what other optional or required fields (person attributes) you want to capture during these steps. Organizations will typically add additional information not essential to check-in at a later point when there is more time.

![adding a new person](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-addperson.png)

Add Person

# Editing Families

Did Maddie bring her friend Alex to church with her? No problem. Adding guests of a family is a breeze with the 'Can check in' relationship. Just select the new 'Edit Family' button and add Alex with that relationship.

![editing an existing family](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-editfamily.png)

Edit Family

![adding a guest to an existing family](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-addperson-cancheckin.png)

Adding a Guest

![prior to saving existing family changes](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-editfamily-save.png)

Editing Family Members

We've even enabled some duplicate detection so you're less likely to end up with another Alex Decker in your system.

![after saving family changes](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-editfamily-no-duplicates.png)

Select or Edit Family Members

There are a few things to note regarding duplicate detection. When adding multiple 'guest' adults, if one of them matches a person in Rock, the other new adults (and new children) will be added to that person's matching family. Also note, when a matching person is found, only non-blank field values will update the matching person's record. This will prevent accidentally clearing out a person's allergy or legal notes (for example) in the event that they didn't provide the current/correct values.

The check-in registration page can display all family members, but if there is a family member that isn't able to check-in, that family member is greyed out. You'll see the reason they can't be selected (either *No Locations Available* or *No Matching Groups Found*). Also, the Change button will be hidden if a person has only one available schedule.

# Adding Barcodes in Check-In Registration

If your organization uses barcode scanners for rapid check-in, we've also enabled these screens to know where to put the data coming from the scanner. Scanning a barcode on this screen will ensure it will automatically go into the *Alternate ID* field if you have enabled it (as described in the [Configuration](#checkinregistrationconfiguration) section below).

![after scanning a barcode](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-addperson-alternateid.png)

Barcode Scanning

# Check-in Registration Configuration

These registration features are packed with options. To configure these options, follow these steps:

1. First, enable a particular device kiosk by setting its [Registration Mode](#configuringkiosks) to 'Yes'.
2. Then open up the check-in configurator Admin Tools \> Check-in \> Check-in Configuration.
3. Select the configuration you want to enable registration for and then Edit.
4. Change the *Registration Settings* as needed (see below) and then Save.
![Check-in Registration Settings](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-registration-settings-v15.png)

Registration Settings


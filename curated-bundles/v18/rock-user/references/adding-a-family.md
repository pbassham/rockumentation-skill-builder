---
description: "Use when user needs to add a new family to Rock, including family members, campus selection, and address setup"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Adding a Family

Adding a Family

# Important

Before adding a new family be sure to search the database first. No matter how certain you are that they are new, you should always double check.

To add a family to the database, click People \> New Family from the main menu. Rock will display the *New Family* screen.

![Add A Family](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/add-family-v18.png)

Add A Family

# Family Members

First, add the individuals to the family. Completing this section should be fairly easy, but remember these points:

- Only use these fields to add individuals to the family who are not already in the database. If you know that one or more of the individuals are already in the system, just add those who are not. After the family is saved, you can then edit the family and add the existing members.
- Note the marital status selection below the list of family members. This allows you to set the marital relationship of the adults in the family. These options are *Defined Values* so you can rename them or add additional options. You can read more about editing *Defined Values* in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#definedtypes).
- The *Grade* field will only be shown when you're adding a child.
- Additional addresses (work, previous) can be added after saving the family.

# Campus and Address

The final step in adding a family is to select their campus and add their home address. Additional addresses can be added to the family after it has been saved.

# Note

The *Campus* field will be hidden if there's only one campus set up in your system. If a campus value is required by your *Add Family* block settings (see next section) then the only available campus is automatically applied to the family's record behind the scenes.

# Add Family Block Settings

You can customize which options you want to display in the *Add Family* block by customizing the block settings.

![Add Family Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/add-family-block-settings-v18.png)

Add Family Block Settings

Select which options and default settings you want to display and click Save.

# Default Connection Status

As noted above, if a *Default Connection Status* has not been set, then the new family member will be assigned the same status as the family member who is adding them. For instance, a new child will be added with a status of 'Member' if the parent's status is 'Member'. If you have requirements for certain statuses, be sure to set a *Default Connection Status* to ensure people aren't assigned statuses for which they do not qualify.

# Want Even More Info?

For many, the family entry screen will be just what the doctor ordered. Some organizations, however, may want to capture additional information about the family. The good news is you can have both!

The block settings of the *Family Entry* block include a setting for configuring attribute categories. After filling out the family, phone number and email information and selecting Next, you'll see an entry form for the first attribute category you selected. Completing this form and pressing Next takes you to the next attribute category. This will continue until you've entered information for each attribute category. On the last screen, you’ll see the Finish button.

The following example shows this process with the *Education* and *Visitor Information* attribute categories set.

![Adding Attributes](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/family-entry-attributes-v13.png)

Adding Additional Attributes

# Useful Tips

Below are a few tips to help you use this feature to its fullest:

- Remember that attributes can belong to more than one attribute category. This allows you to create custom attribute categories with the sole purpose of being used on the *Family Entry* screen.
- If you configured the attribute to be required, it will also be required on these entry forms. Keep in mind that it will be required when it's edited on the *Person Profile* page, too.

# Duplicates Happen

To help reduce the number of duplicate records, Rock will display a listing of possible duplicates for individuals added to the family.

![Possible Duplicates](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/add-family-possible-duplicate-v18.png)

Possible Duplicates

For more information about duplicates in general, check out the [Duplicates](#duplicates) chapter below.


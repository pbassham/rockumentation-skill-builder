---
description: Use when explaining why duplicate person records are created in Rock and understanding the matching logic that prevents duplicates
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Duplicates

Duplicates

# Where Duplicates Come From

Duplicate records happen - period. It’s important that your organization understands why they occur and has a process to eliminate them by merging duplicate records.

There are two main ways duplicate records are added to the system. The first is by a staff person or volunteer using the internal site. Before you add someone to the database, it’s important that you make sure they haven’t already been added. Even if you’re certain the person or family is new, it’s always a good idea to double check.

The second way duplicates are added to the system is from activities (e.g., contributions, event registration, connection requests) on the external website. While Rock tries to limit the number of duplicates that are created, sometimes there isn’t enough data to know for sure.

At other times a duplicate is created for security reasons. Rock has to be very careful not to allow someone to "hijack" a record. This would allow a person to create an account as another person and gain visibility to their contact and contribution information. In these cases, Rock will create a duplicate record so that a staff person can double-check that the activity is normal before performing a merge.

Finally, it's important to understand that the amount of "friction" you decide to place on people using the public website can affect the number of duplicates generated. For example, you can attempt to limit the number of duplicates created by requiring individuals to log in for things like online giving and event registration. However, this means people will have that extra "friction" of needing to log in. On the flip side, you may choose to not require logins for these things on the web site (thus "low friction"), in which case Rock will attempt to match to an existing person based on Name and Email...but if Rock *doesn't* find such a match, a new (often duplicate) record will be created.

# How Rock Avoids Duplicates

As people are added to Rock, the system will try to look for existing records that might be a match before creating a new record. This logic is used anywhere a person could be added, with very few exceptions. For instance, if you use the REST API, this scoring is not done because a developer may not wish to use it.

When an attempt is made to add a new record, existing records are evaluated and assigned a score based on the logic shown below. If a new record has the same first and last name as an existing record, with nothing else in common, then a score of 30 points (15 + 15) would be assigned.

  

| Matches On | Points |
| --- | --- |
| First Name or Nick Name | 15 |
| Last Name | 15 |
| Last Name doesn’t match, Previous Name matches | 12 |
| Mobile Phone, Email or both | 15 |
| Month and Day of birthdate | 10 |
| Year of birthdate | 5 |
| Gender | 3 |
| Suffix | 10 |

  

If an existing record scores higher than 35 points, it’s considered a match (and possible duplicate) of the new incoming record. If multiple existing records score higher than 35 points, then the record with the highest score will be selected as the match. If there’s a tie, then the “first” record (typically the oldest) will be selected.

Rock will not perform the duplicate checking process described above if the existing record's [Account Protection Profile](#accountprotectionprofiles) is configured to skip duplicate checking based on your [Security Settings](https://community.rockrms.com/documentation/bookcontent/9#securitysettings).

# Merging Records

While Rock will continue to pioneer new ways to prevent duplication, it will continue to happen (though hopefully at a reduced rate). So, let’s learn how to merge duplicate records.

The first step in merging records is to search for the individual who has a duplicate record. Type the search criteria into the Smart Search field at the top of the page. When you get your results, you can check the records that are duplicates and click the icon in the list's footer.

![Merge Select](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/merge-select-v18.png)

Select Individuals To Merge

On the merge screen you’ll see each record side by side as pictured below. There is a column for each person involved with the merge.

![Merge Screen](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/merge-screen-v18.png)

Merge Screen

# Merging Addresses

The address displayed at the top of the merge block is shown for reference only. After selecting the primary/master record, you'll still need to pick which address to carry forward. If the address you pick is not the current address for the primary record, the current (pre-merge) address will be moved to a Previous Address after the merge is completed.

If you don't have permission to view an attribute that has a conflicting value, you'll receive the warning message pictured in the screenshot above, near the top of the merge block. If staff members responsible for merges shouldn’t have access to attributes outside of a merge context, we recommend using the “View All Attributes” Security Verb as pictured below. Roles or individuals with this access will be able to view any attribute values associated with the records being merged, and can select the value to keep, but will not be able to view those attributes in other contexts (like the Person Profile) without additional security.

![Merge Records View All Attributes](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/merge-block-view-all-attributes-v18.png)

Merge Records - View All Attributes

When you’re done, click the Merge Records button and you'll be taken to the *Person Profile* page of the merged master record.

If two records exist with the same name, in cases where either of them has an email address and either of them has an associated user login, Rock will display a hijack warning message. For security purposes it's very important that you verify the validity of email addresses associated with either record, and remove invalid emails *before* you merge the records. Failure to delete invalid email addresses prior to the merge may put a person's information at risk of being exposed to someone else.

After the records are merged, the person will be required to confirm their email address the next time they log in. The *Reset Login Confirmation* option comes enabled out of the box, but you can disable it in the block settings of the *Merge People* screen.

# Merging Records and Family Attributes

If two people being merged have differing family attribute values, the merge will display both values and allow you to select which should be used. If the family name and/or campus are different, both values will be displayed in the *Family Values* section, and you can select which should be used. All other differing family attribute values will be displayed in the *Family Attributes* section. Note that any changes made will update that value for the family, which will affect every member of the family. To learn more about family attributes, see the [Family Attributes](#familyattributes) section below.

If you don’t have Edit access to the merge block, you’ll see a message noting that your request to merge a person has been saved. This *Merge Request* will be listed under Tools \> Data Integrity \> Merge Requests. Out of the box Rock only allows the members of the *RSR - Data Integrity Worker* to complete merges.

![Merge Screen](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/merge-request-v18.png)

Merge Request

# Merging Records Without Enough Security

If you have access to merge but don't have enough security access to view things such as attributes, you won't be able to choose which item survives when the records are merged. Rock will take the value from the primary person/family you choose at the top of the merge panel. This could lead to unintended data being selected during the merge. You should consider giving individuals who process merge requests 'View All Attributes' access as described above.

# Account Protection Profiles

Every person in Rock has an *Account Protection Profile*. This is a way to classify person records, to protect certain accounts from hijack attempts. A person's *Account Protection Profile* is calculated each night by the *Process Elevated Security* job and will be one of the following values:

0. **Low:** There are no risk items associated with this person.
1. **Medium:** The person has a login for Rock.
2. **High:** The person meets one or more of the following conditions:
	- Has an active Scheduled Financial Transaction
		- Has a saved Payment Account
		- Is in a security role with a "High" [Elevated Security Level](https://community.rockrms.com/documentation/bookcontent/9#securityroles)
3. **Extreme:** The person is in a security role that has an [Elevated Security Level](https://community.rockrms.com/documentation/bookcontent/9#securityroles) of "Extreme"

These *Account Protection Profile* levels are used by the [Security Settings](https://community.rockrms.com/documentation/bookcontent/9#securitysettings) described in the [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/).

When performing a merge, if the person being merged has an *Account Protection Profile* of Medium or higher, you'll see a message when attempting to merge the record.

![Merge with Elevated Security Warning](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/merge-with-elevated-security-warning-v18.png)

Merge with Elevated Security Warning

There are restrictions on who can merge records that have High or Extreme *Account Protection Profiles*. This is controlled by your [Security Settings](https://community.rockrms.com/documentation/bookcontent/9#securitysettings) configuration. If the person performing the merge doesn't have the needed security, they'll be presented with a message as pictured below and will not be able to complete the merge.

![Merge with Extreme Record](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/merge-with-extreme-record-v18.png)

Merge with Extreme Record


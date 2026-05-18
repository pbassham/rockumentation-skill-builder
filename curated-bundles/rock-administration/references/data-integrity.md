---
description: "Use when a user needs to find, identify, or merge duplicate person records in Rock database"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Data Integrity

Data Integrity

With data coming into Rock from all directions, it can be a real challenge to keep it all clean, consistent and accurate. To help you out with that, we've built tools that find and fix issues as they arise. You'll find these tools under:

Tools \> Data Integrity.

![Data Integrity](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/data-integrity-menu-v18.png)

Data Integrity

Only individuals in the *Data Integrity Worker* security role will have access to these tools.

Let's look at each one in detail.

# Duplicate Finder

The duplicate finder routinely goes through your database looking for records that could be duplicates. When it finds possible matches, it scores them and lists them for you under:

Tools \> Data Integrity \> Duplicate Finder.

![Duplicate List](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/duplicate-list-v18.png)

Duplicate List

Clicking on a row will take you to the duplicate detail screen.

![Duplicate Detail](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/duplicate-detail-v18.png)

Duplicate Detail

The top row represents the source record, and the rows below represent possible duplicate records. If any of these rows are duplicates, you can select them and select the icon in the grid footer to merge them. Each record has a series of buttons to the right. These buttons perform the actions defined below.

- Opens the *Person Profile* page for this individual in a new window.
- Tells Rock that this record is definitely not a duplicate of the record above.
- Tells Rock that there's currently no way to be sure if this record is a duplicate of the one above. Selecting this will keep Rock from showing it as a possible duplicate until more information is available. If you're uncertain whether two records are duplicates or not, you can simply decide not to do anything yet. As more data is added to the records, Rock will update the match scores to reflect a more accurate prediction.

Detail-minded admins might be interested in how the percentages are calculated for duplicate records. The out-of-the-box logic compares two records based on a points system. Points are awarded based on the following factors:

- Email Match (4pts)
- Partial Name Match (First two characters of the first name plus full last name) (1pt)
- Full First Name Match (3pts)
- Full Last Name Match (3pts)
- Suffix Match (4pts)
- Cell Phone Match (4pts)
- Non-Cell Phone Match (2pts)
- Address Match (2pts)
- Birthday Match (3pts)
- Gender Match (1pt)
- Campus Match (1pt)
- Marital Status (1pt)

A percentage is then calculated by comparing the number of points scored to the total possible points.

# Reports

There are several *cleanup* reports that have been created to help you identify records that need your attention. Feel free to add your own reports here. Each report that ships with Rock is documented below.

| Report Name | Description |
| --- | --- |
| Self-Inactivated Individuals | This report lists individuals who have inactivated themselves from the database. This usually comes from using the unsubscribe link at the bottom of bulk emails. You'll want to go through this list occasionally to inactivate the other individuals in their families. You'll also want to read through the inactive reasons to get a pulse on why individuals are leaving the organization. |
| Pending Individuals | When someone registers on the website, their individual record status is set to *Pending*. This allows you to view the record and determine if it's a duplicate record. Once you go through them all, you'll want to bulk update their statuses to *Active*. |
| Individuals with Duplicate Phone Numbers | This report finds different individuals who share the same phone number. You can also use this report to identify individuals who have the same phone number listed more than once on their profile. |
| Individuals with Duplicate Emails | Like the duplicate phone numbers report, this report finds different individuals who have the same email address. This may be common, especially for families. |

# Workflows

Workflows can be set up to help automate the process of data integrity. Feel free to add your own. We've outlined the ones that come with Rock below.

| Workflow Name | Description |
| --- | --- |
| DISC Request | This drives the DISC assessment request workflow. |
| Person Data Error | This is the workflow that's accessed from the *Actions* list of the *Person Profile* page. |
| Photo Request | This drives the photo request workflow. |
| Request Assessment | This is the workflow that's accessed from the *Actions* list of the *Person Profile* page. |

  

See our [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide for more information.

# Location Editor

The location editor allows you to edit and clean locations in your database. Because there are so many locations in your database (think every address) the list will only show items that match the filters you provide. A common use for this page is to edit the geocoding for a specific address. There's a helpful filter to show you addresses that are not geocoded.

![Location List](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/location-list-v18.png)

Location List

You can select an address to view or edit its details.

![Location Editor](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/location-editor-v18.png)

Location Editor

# Photo Requests

When new photos are submitted by your organization's members they will be displayed here. This allows you to review the photos and ensure that they are appropriate. You can read more about this process in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#photorequests).

# Merge Requests

If a staff member without the needed security tries to merge person records, then a merge request will be created and listed here. By default, you won't have security access until you're listed on the *Merge People* page with read rights.

# Data Automation

Rock ships with a powerful *Data Automation* job that automatically updates person and family records. This makes things a lot easier for you. The job settings are configured here on the *Data Automation* page, located at:

Tools \> Data Integrity \> Data Automation.

![Data Automation Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/data-integrity-settings-v18.png)

Data Automation Settings

The Data Automation job uses these settings to update person and family records in the following ways:
- Reactivating individuals who are currently inactive
- Inactivating individuals who are currently active
- Updating which campuses families are associated with
- Moving adult children to their own families
- Updating Connection Status values
- Updating Family Status values

Updates are made to records when the *Data Automation* job runs. By default, the job is configured to run every Tuesday morning, but you can change that time to what works best for your organization. Also, note that the job is active by default, but the data automation types listed above are all disabled. The updates will run automatically once the settings are enabled.

OK, now that you have an overview of the job, let's take a closer look at the different types of data automation included in the *Data Automation Settings* screen.

## Reactivate People

When the *Reactivate People* option is enabled, every person in the database who matches **any** of the following criteria (according to your selections) will have their record status updated from 'Inactive' to 'Active'.

- **Any family member has made a contribution in the last**: If any family member in any of the person's families has made a contribution during the selected time period.
- **Any family member has attended a group that is considered a service in the last**: If there's an attendance record associated with any family members in any of the person's families, and if the attendance is for a group of a type with the *Weekend Service* option set to 'true'.
- **Any family member has registered for any event in the last**: If any family member in any of the person's families has registered for an event during the selected time period.
- **Any family member has attended a group of this type in the last**: If there's an attendance record associated with any family member in any of the person's families, and if the attendance is for a group that's of any of the selected types.
- **Any family member has logged into Rock in the last**: If any family member in any of the person's families has logged into Rock within the provided time period.
- **Any family member has submitted a prayer request in the last**: If a prayer request has been submitted by any family member in any of the person's families during the selected time period.
- **Any family member has a new value for any of the following person attributes in the last**: If any of the selected person attributes have an updated value for any family member in any of the person's families during the selected time period. The person attributes are based on the *ModifiedDateTime* of the attribute value. You can choose to ignore specific attributes by adding the *Key* of the attribute to the *Data Automation Ignored Person Attributes* Defined Type.
- **Any family member has an interaction of the following type in the last**: If there's an interaction record for any of the selected types for any family member in any of the person's families during the selected time period.
- **The person is in a specified data view**: If the person is included in the selected data view.
- **Exclude any person in a specified data view**: This option acts as an override. Even if a person meets any of the previous criteria, if they are included in this data view, their record won't be updated.

When the *Reactivate People* automation runs, the *Inactive Reason* and *Inactive Note* fields for each person are cleared.

# Allow Automated Reactivation

There may be scenarios where you don't want certain people reactivated even if they meet the conditions you've configured. For instance, someone might have given in the last 90 days but has recently told you they've moved or will no longer be attending. For cases like these you can set *Allow Automated Reactivation* to "No" for certain inactive reasons (e.g., Moved, No Longer Attending) in the Inactive Record Reason Defined Type under Admin Tools \> Settings \> Defined Types \> Inactive Record Reason. This will prevent automatic reactivation for any people with the given inactive reason.

## Inactivate People

When the *Inactivate People* option is enabled, every person in the database who matches **all** of the following criteria (according to your selections) will have their record status updated from 'Active' to 'Inactive'. Each person who's inactivated will also be inactivated in most of the groups to which they belong, including security roles. Once these people have been inactivated in their groups, there's no process to revert that change.

- **The number of days that the records must be older to get considered for Inactivate process**: This setting helps ensure that brand new individuals aren’t made inactive only because they haven’t had a chance to engage in any activities yet.
- **No family member has made a contribution in the last**: If no contributions have been made by any family members in any of the person's families during the selected time period.
- **No family member has attended any group type that takes attendance in the last**: If there are no attendance records associated with any family members in any of the person's families. Any specific group types whose attendance should be ignored by the automated process can be specified in the *Ignore any attendance in the following group types* field.
- **No family member has registered for any event in the last**: If there are no event registrations for any family member in any of the person's families within the provided time period.
- **No family member has logged into Rock in the last**: If there are no Rock logins for any family member in any of the person's families within the provided time period.
- **No family member has submitted a prayer request in the last**: If no prayer requests have been submitted by any family members in any of the person's families during the selected time period.
- **No family member has a person attribute value updated in the last**: If no person attribute values have been updated for any family member in any of the person's families during the selected time period. The person attributes are based on the *ModifiedDateTime* of the attribute value. Specific attributes you want the automated process to ignore can be selected in the *Ignore any updates to the following attributes* field.
- **No family member has an interaction of the following type in the last**: If there are no interaction records for any of the selected types for any family member in any of the person's families during the selected time period.
- **The person is not in the following data view**: If the person isn't included in the selected data view. This option can be used to make sure that certain people, such as staff members, are never inactivated.

When the *Inactivate People* automation runs, the *Inactive Reason* for each inactivated person is updated to 'No Activity' and the *Inactive Note* field is updated to 'Inactivated by the Data Automation Job on mm/dd/yyyy'.

Any person who's inactivated will also be inactivated in all of the groups they belong to, except for those that have a group type with the *Don't Inactivate Members* option selected.

# A Note of Caution

Enabling the *Inactivate People* automation could have pretty significant ramifications if the options aren't configured correctly. For example, if only one criterion is selected, *everyone* who doesn't meet that one criterion will be inactivated. For this reason, it's best to select **all** of the criteria so a person has to match all of the options in order to be inactivated.

## Update Family Campus

The *Update Family Campus* option is available only if you have more than one campus.

When the *Update Family Campus* option is enabled, the attendance for every family will be evaluated. If the family is attending or giving to a campus other than the one that's currently configured for the family, the campus for the family will be updated. Let's look at how this works.

First, the Data Automation job evaluates the attendance records at a specific location for all members of the family in question to determine if that location has the greatest number of attendance records for the family. Next, the job looks at all of the contributions to campus-specific accounts made by members of the family, to determine if that campus has the greatest number of contributions. Finally, the job uses the following settings to help determine if the campus should be updated:

- **Calculate campus based on the most family attendance to a campus-specific location in the last**: Determines how far back attendance records should be evaluated. You can optionally exclude specific schedules from being used in this determination. You can also specify how many times a person should attend a campus before having their family campus updated.
- **Calculate campus based on the most family giving to a campus-specific account in the last**: Determines how far back transaction records should be evaluated.
- **If the calculated campus for most attendance and most giving are different**: Determines which campus to use if the campus to which the family gives the most isn't the same campus the family attends the most.
- **Ignore any family that has had a campus update in the last**: If the campus for a family has been updated within the selected number of days, the DataAutomation job will ignore the family.
- **Ignore any update that would change campus**: There may be scenarios where a family attends or gives to a campus other than the one with which they are associated. Exclusions can be added in this field to make the DataAutomation job ignore any specific campus changes based on attendance and/or giving.

## Move Adult Children

When the *Move Adult Children* option is enabled, the DataAutomation job processes people who have a child role in one or more families, but also are of an "adult" age. The default adult age in Rock is 18. The job processes one person (not a group member) at a time. For each person, the job looks at all of the families that person belongs to and their role in each family.

- If the person is already an adult in any family, then they won't be added to any additional families, but they will be removed from all families where they are a child.
- If they are currently not an adult in any family, the job checks if they are the only person in any of their families.
- If they are in a family by themselves, the person will only be updated as an adult in that family and the job will remove them from any other family where they are a child.
	- If they are not an adult in any family and are not the sole member of any family, a new family will be added, and the person will be added to that family as an adult. The person will also be removed from all other families where they are a child.

The job considers the following options:

- **Should children only be moved if they have graduated?**: If this option is checked, the job will first look at the graduation year for each person considered. If they don't have a graduation year, they won't be moved. If they have a graduation year in the future (according to the Grade Transition Date and the person's graduation year), they won't be moved.
- **The age a child should be considered an adult**: The age to consider a child an adult. The default setting is '18'.
- **An optional known relationship that should be added between the new adult and their parent(s)**: You can add an optional relationship for the other adults in the original family to have with the updated person. The recommended setting, if you use this, is "Parent".
- **An optional known relationship that should be added between the new adult and their sibling(s)**: You can add an optional relationship for the siblings in the original family to have with the updated person. The recommended setting, if you use this, is "Sibling".
- **Should the new adult's home address be the same as their current family?**: Check this box if the updated person's new family address should be the same as the Home address of the original family. The checkbox is selected by default.
- **If the new adult does not have a home phone, should they use same number as their parent?**: Check this box if the updated person's Home phone number should be the same as the Home phone number of the original family. The checkbox is selected by default.
- **The workflow type(s) to launch for each person that is processed**: Indicate any optional workflows that should be triggered for each person who's updated. The updated person will be set as the workflow's Entity. If the workflow has an *OldFamily* and/or *NewFamily* attribute, the job will set those attributes to the old/new family for the person.
- **The maximum number of records that should be processed at a time**: Set the maximum number of people to process on each run of the Data Automation job. The default setting is '200'.

The job also considers the "Lock as Child" option in the [Edit Person](https://community.rockrms.com/documentation/bookcontent/5#editinganindividual) Advanced Settings. If this option is selected on the person, they won't be made an adult by this job.

## Update Connection Status

When the *Update Connection Status* option is enabled, you can update connection status values based on one or more Data Views. The status is set to one of the values listed below if the person meets the conditions of the data view.

- Member
- Attendee
- Visitor
- Participant
- Prospect

## Update Family Status

When the *Update Family Status* option is enabled, you can update family status values based on one or more Data Views. The status is set to either *Participant* or *Unknown* if the family meets the conditions of the data view.

## General Settings - Gender AutoFill Confidence

Included in the *General Settings* section of the *Data Integrity Screen* is an optional DataAutomation task to autofill gender. This task looks for individuals with an unknown gender and attempts to set the correct gender based on the person's first name. The process uses the minimum confidence level (think of this as an accuracy rate) entered in the *Gender AutoFill Confidence* field to automatically set blank genders while running the Data Automation service job. If the number is set to 0, genders won't be automatically determined. If the number is set to 99.9% (the default setting), only names with genders matching that 99.9% confidence level will be determined. If the individual is a child, the job checks the likely match for gender against the minimum confidence level. If the likelihood of finding a match is greater than the confidence level, the gender is updated. Otherwise, it's left unknown. Adults won't autofill with a gender that's already taken by another adult in the same family.

# National Change of Address

The National Change of Address (NCOA) list is a database that the United States Postal Service maintains to reroute your mail to a new address when you move. In other words, it’s a big list of official address changes.

What does that mean for your organization? As you’ve probably experienced, people aren’t always very diligent about letting you know when they move. Even if you notice someone has been absent, it could be that they’re on vacation or have had a change to their work schedule.

Whatever the circumstances may be, as a Rock admin you want to ensure your data is clean and up to date. The NCOA service helps you do that by comparing addresses in your system with their list of address changes.

## NCOA Processing

To get your addresses updated and formatted you'll need to go to Tools \> Data Integrity \> NCOA. If this is your first time there won’t be any data there, but either way you’ll need to click the Process NCOA button near the top-right.

![Access Processing](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/ncoa-access-processing-v18.png)

Access Processing

You’ll arrive at the page pictured below. This is where you create a file of people and addresses to send to NCOA. This is also where you’ll upload the results of NCOA’s processing back into Rock, which we'll see later.

![Rock NCOA Processing](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/ncoa-rock-ncoa-processing-page-v18.png)

Rock NCOA Processing

After you’ve selected a Data View and clicked Export File, you’ll see a message at the bottom of the screen with a link to [TrueNCOA](https://app.truencoa.com/Users/Login), where the process will continue.

# Record Minimum

If fewer than 100 records are returned by your Data View, you won’t be able to proceed with the export.

If you’re curious, the file Rock produces contains the columns listed below. You don’t need to know this, but it is what you should expect to see if you open the file.

1. PersonId
2. PersonAliasId
3. FamilyId
4. LocationId
5. FirstName
6. LastName
7. Address Line 1
8. Address Line 2
9. City
10. State
11. PostalCode
12. Country

Once you’re in TrueNCOA, you’ll need to upload the file that you just downloaded from Rock. TrueNCOA gives you options for how to upload the data and shows previous files if any exist.

# See the Process in Action

Check out [this video from TrueNCOA](https://app.truencoa.com/Users/Register) that walks you through the process you’ll need follow.

When the file upload completes, you’ll see a preview of the data that will be processed. Click the Continue button to proceed. Your next step will be to set the mapping. This takes the fields from Rock and maps them to corresponding fields in TrueNCOA where applicable. If there isn’t a direct equivalent, select *Pass-Through* as pictured below.

![NCOA Field Mapping](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/ncoa-field-mapping-v16.png)

NCOA Field Mapping

# Updating the Field Mapping

Your mapping should pretty much look identical to what's pictured above. The default mapping that TrueNCOA provides will need to be changed in most cases.

When the mapping is completed, you’ll proceed to the next page to confirm everything looks good, or to go back and make corrections if needed. Once you’ve confirmed you’re ready, click the Continue button near the top of the page to proceed.

The processing of the file may take a little while, especially if the file contains many thousands of records. You may need to wait several minutes for completion. Once it’s done, you’ll see a page like the one pictured below. This is where you’ll click the Export button to start the process of getting your results out of NCOA to load back into Rock.

![NCOA Export File](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/ncoa-export-file-v16.png)

NCOA Export File

Click Export, then click Purchase & Download when that option appears. You may be asked to confirm that you’re certain you want to proceed. The export process can take several minutes, especially with larger files, so don’t be surprised if you have to wait.

When the export is finished, you’ll see a button to Download the file. If the download doesn’t start or you don’t see that button, click the Home icon in the top-left corner, where you can see your list of files, including the one that was just exported. Click the file name under *Export Files* then click the Download button pictured below.

![NCOA Download Export File](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/ncoa-download-export-file-v16.png)

NCOA Download Export File

Next, you’ll take that file and import it into Rock, from the same *NCOA Processing* page we saw earlier. Upload the file from TrueNCOA as part of the “Step 2” process. You have some options to work with, but they’re pretty intuitive and you can use the blue info icons to clarify their purpose if needed.

# Don't forget!

If someone is inactivated by this process because of a move, they can be automatically re-activated by the *Reactivate People* portion of the [Data Automation](#dataautomation) job we covered above.

![NCOA Import Into Rock](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/ncoa-import-into-rock-v18.png)

NCOA Import Into Rock

After the file has been processed you can look at the results from the Tools \> Data Integrity \> NCOA page where we started. This page will list every family whose address was checked, so it can get very long very quickly. Be sure to use the *Filter Options* to narrow the list to only the records you want to see.

![NCOA Results Page](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/ncoa-results-page-v18.png)

NCOA Results Page

# Additional Information

You won't need this since we handle everything behind the scenes for you, but if you want more details on the process you can check out the below guides from TrueNCOA:

1. [TrueNCOA Input File Guide](https://truencoa.com/wp-content/uploads/2023/01/TrueNCOA-Input-File-Guide-202301.pdf)
2. [TrueNCOA Output File Guide](https://truencoa.com/wp-content/uploads/2023/11/TrueNCOA-Output-File-Guide-202311.pdf)

# Connection Status Changes

As the name implies, the Connection Status Changes tool lets you see (you guessed it!) changes in connection statuses. Since we’re already clear on its purpose, let’s dive right in and take a look at how to use it:

![Connection Status Changes](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/connection-status-changes-v18.png)

Connection Status Changes


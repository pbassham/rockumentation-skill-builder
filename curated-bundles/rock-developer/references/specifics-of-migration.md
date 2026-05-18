---
description: Use when asking what data can be imported from specific CMS systems into Rock or what fields are supported during migration
source: "https://community.rockrms.com/developer/slingshot"
sourceLabel: Slingshot
---
> **Path:** 

Every CMS system is different, which means the data available to export/import in each CMS system is different. It’s tricky, but Slingshot grabs everything it can. Here’s an overview of different CMS systems and the data Rock can import from each.

### Church Community Builder (CCB)

Here’s what Slingshot is able to import from CCB:

• Families

• Individuals

• Contributions

• Groups

• Attendance

Individuals include a lot of specific data, including:

• Legal first name

• First name

• Last name

• Middle name

• Full name

• Salutation

• Image

• Email

• Addresses

• Phones

• Allergy

• Gender

• Marital status

• Birthday

• Emergency contact

• Anniversary

• Baptized

• Deceased

• Membership type

• Membership date

• Receive email from church

• Active

• Created date

• Modified date

• Custom text, date and pulldowns

Note, the following is **not** able to be migrated.

• Notes

• Logins

• Confirmed No Allergies

• Mobile Carrier ( not needed by Rock to do SMS messages)

• Phone type of ‘Contact’ – this is auto calculated by CCB and not actually

entered (seems to only be shown in the API?)

• Limited access user

• Membership end date

• Person who Created/Last Modified Individual

• Default New Group (Messages, Comments, Digest, SMS)

• Privacy Settings

• Individual MICR information

• Scheduled Giving

• Significant Events – [would require one API call per person](https://yourchurch.ccbchurch.com/api.php?srv=individual_significant_events&id=48)

• Individual communication preferences

• Spiritual Gifts / Passions / Abilities / Personality Style

• Background Checks

• Positions

• Serving

• History

• Friends (would require a unique API call per person)

• Services You Usually Attend

• Social Media Accounts (not in API or export)

---

## Slingshot {#slingshot}

## TL;DR

Migrating from your existing CMS to Rock can be daunting. We built a tool to help make moving your data into Rock a little easier. Slingshot creates a zip-like file of your data and imports it into Rock. It isn’t a total magic bullet—yet. You may need to do some clean up after the import. But Slingshot is simple to use and it will save you loads of time.

## Introduction

Switching CMS systems can feel like a huge undertaking. Kind of like moving house. You have to pack up all of the stuff you’ve amassed over the years, load it into a moving truck, transport it over to the new digs, unpack, organize, and pray you didn’t leave a box of necessities in the back of a closet at the old place.

To help make your move easier, we created Slingshot. Slingshot is a tool that quickly and easily migrates the data from your old CMS into Rock. Think of it as the fastest and most reliable moving company in town. You tell Slingshot where to pick up and where to move your boxes, then sit back and let it do all the work for you—including the unpacking!

---

## About Slingshot {#about-slingshot}

## How Slingshot Works

Slingshot works in a two-step process: 1) grab the data from your old system, and 2) move the data into Rock. When Slingshot pulls the data from the previous CMS, it bundles it into a .slingshot file, then imports that file into Rock. One of the great things about Slingshot is you don’t need to be a Rock expert to use it. All you need to do is tell it which data to pull, and click the button to start the import.

## Features

Here are the things that make Slingshot a great migration tool:

• It’s super simple to use. You don’t need to be a database administrator to use

Slingshot.

• It’s easy to watch the progress of your migration and test if it was successful.

• It allows you to specify the types of records to import and from what time

frame.

• It uses a Foreign System Key to differentiate between files containing the

same data.

• It’s fast. Your data will be migrated in a matter of hours, as opposed to days.

## What to Expect

We think Slingshot is pretty awesome, but it doesn’t do everything we want it to yet. (Don’t worry. We’ll keep working on it until it does.) You can trust it to grab all the data it can from your current system, though, and import it into Rock.

After the import, you may find the data needs some cleaning up. Think again about what it’s like moving houses. After you’ve unpacked your boxes, you need to organize. You need to make sure the cereal bowls aren’t in the bathroom cabinets and the DVDs didn’t get tucked away in the laundry room. It’s the same with Slingshot. The data will need some tidying up. For example, your attendance data will be in Rock, but it will need some configuring before it shows up in analytics. With the help of your database administrator and some SQL scripts, though, analytics (as well as all of your Rock functions) will be up and running in no time.

---

## Best Practices {#best-practices}

database. You’ll also want to verify what Storage Type is selected in the Person Image file type settings in Rock, as this will determine where imported photos will be stored during the import.

After importing your data, you have an opportunity to fix and reconfigure Rock. Use that time to set up Rock so that it’s configured to meet your organization’s needs. Test things and try them out. Rock is really powerful. See how you can make the system work for you.

One thing we caution is not to think of Slingshot as a data sync tool. It isn’t designed to keep multiple systems in sync, but rather to migrate data from one system to Rock. We suggest transitioning to Rock and then leaving your old system behind. Yes, it may take a bit of time to make sure all of your records in Rock are current and to get everyone in your organization on the same page. Once you’re there, though, jump in with both feet. Move in and get comfortable. Put your feet up on the sofa. Leave your socks on the floor. (OK, maybe we’ve pushed the house moving metaphor too far…)

Before using Slingshot, we recommend making a backup of your current CMS

---

## Looking Ahead {#looking-ahead}

We have a lot more functionality planned for Slingshot and we’re working hard to make it the best migration tool it can be. In the meantime, we’re excited to offer this great tool to the Rock community and hope it makes moving house a little easier.

---
description: Use when configuring how person records are tagged with their originating entry point or channel for reporting and workflow optimization
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Record Source

Record Source

*Record Source* is a *Defined Type* used to tag how a person record was created. It stores the originating channel or process so you can report on acquisition, audit data entry, and tune onboarding flows.

## How It’s Used

# Example

You publish a “First-Time Guest” form on your website and also add new families during weekend check-in. Set the website form’s block to “External Website” and the check-in block to “Check-in.” When those people records are created, Rock stamps the matching *Record Source* value. You can then filter reports, dashboards, and workflows by source to see which entry points produce the most accurate or complete records.

## Where It Appears Today

*Record Source* is present in the block settings on any block that can create a new person record (e.g., *Check-in*, *Prayer*, *Event Registrations*, *Workflows*, *Group Registrations*, *Giving*, *Pledges*, *Sign-ups*, *Family Registrations* and more).

![Record Source](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/record-source.png)

Record Source

If you want to add to our defined list of *Record Sources*, you can. Add new values to the *Record Source Defined Type*, then set blocks to use them.

## Setup

1. Go to Admin Tools \> Settings \> Defined Types.
2. Search for *Record Source* and open it.
3. Click the Add button to add a *Defined Value*. Name it clearly (e.g., “Volunteer App,” “Kiosk Signup”). Press the Save button.
4. Open the entry block that creates people (e.g., *Person Entry*, *Group Registration*, *Event Registration*).
5. In the block settings, set *Record Source* to the value you want as the default for that entry point. Press the Save button.

## Advanced Record Sources

You can also track *Record Sources* using page parameters. This lets you choose which *Record Source* to use, no matter which page the person record is created on. Page parameters override any block settings.

##### Page Parameters


?RecordSource=External Website
?RecordSource=1372
?RecordSource=8f2394ae-aff1-4773-8bf8-e4b9c9d5e978

Table of Contents

- [Welcome](#welcome)
- [Rock Homepage](#rockhomepage)
- [Intranet](#intranet)
- [Getting Comfortable](#gettingcomfortable)
- [Learn the Lingo](#learnthelingo)
- [My Settings](#mysettings)
- [Background Checks](#backgroundchecks)
- [Locations](#locations)
- [Email Configuration](#emailconfiguration)
- [Securing Rock](#securingrock)
- [Rock Captcha](#rockcaptcha)
- [Updating Rock](#updatingrock)
- [Data Integrity](#dataintegrity)
- [Interactions](#interactions)
- [Insights](#insights)
- [General Settings](#generalsettings)
- [CMS Configuration](#cmsconfiguration)
- [Security](#security)
- [Communications](#communications)
- [Check-in](#checkin)
- [Power Tools](#powertools)
- [System Settings](#systemsettings)
- [Entity Documents](#entitydocuments)
- [Merge Documents](#mergedocuments)
- [Campuses](#campuses)
- [Jobs](#jobs)
- [Note Types](#notetypes)
- [Electronic Signatures](#electronicsignatures)
- [External Authentication Services](#externalauthenticationservices)
- [OpenID Connect](#openidconnect)
- [Person Tokens](#persontokens)
- [Internationalization & Localization](#internationalizationlocalization)
- [Things You Should Not Do](#thingsyoushouldnotdo)
- [What To Do When Things Go Wrong](#whattodowhenthingsgowrong)
- [Scaling Rock](#scalingrock)
- [Under The Hood](#underthehood)
- [Phone Number Lookup](#phonenumberlookup)
- [User Login & User Accounts](#userloginuseraccounts)
- [Digital Media](#digitalmedia)
- [Real-Time Engine](#realtimeengine)
- [Observability](#observability)
- [API](#api)
- [Entity Search](#entitysearch)
- [Proximity Attendance (Mobile)](#proximityattendancemobile)
- [Automations](#automations)
- [Record Source](#recordsource)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


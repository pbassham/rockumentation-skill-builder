---
description: "Use when configuring calendar displays, event listings, or event detail pages for Rock's external calendar interface"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Event Blocks

Event Blocks

How you decide to display events to your guests will be very unique. Rock provides several blocks to help you craft the experience you desire.

See our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14/) guide for more information on blocks in general.

# Calendar Block

The *Calendar Lava* block is the basic calendar list block for your external calendar. The screen shot below shows the block in its default form, however this block comes with a ton of settings to change the way it is displayed. Below is a list of some of the settings that this block provides.

- **Event Calendar:** The calendar (public, internal, etc.) to pull events from.
- **Default View Option:** Which view option (day, week or month) to initially show.
- **Details Page:** The page to navigate to, to show the event's details.
- **Campus Filter Display Mode:** Options to show a campus filter (Hidden, Plain, Panel Open, Panel Closed).
- **Audience Filter Display Mode:** Options to show an audience filter (Hidden, Plain, Panel Open, Panel Closed).
- **Filter Audiences:** Allows you to filter which audiences you'd like to show as filter options.
- **Show Date Range Filter:** Determines whether a date range filter should be displayed.
- **Show Small Calendar:** Determines whether the small calendar in the upper left should be shown.
- **Show Day View:** Determines whether the day view should be shown as an option.
- **Show Week View:** Determines whether the week view should be shown as an option.
- **Show Month View:** Determines whether the month view should be shown as an option.
- **Enable Campus Context:** Determines whether the campus context should be used to filter the events (assumes that a campus context is in use on your site).
- **Lava Template:** The Lava template that will be used to format the list of filtered events.
- **Start of Week Day:** Determines what day is the start of a week.
- **Set Page Title:** Determines if the block should set the page title with the calendar name.
![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/calendar-block-v13.png)

External Calendar

# Event Item Occurrence Detail

Once you pick an event from the calendar, the *Calendar Event Item Occurrence Lava* block displays the details for the event occurrence. This page is formatted entirely using Lava, so customize at will. Below are the options you have in the block's settings.

- **Registration Page:** The page to navigate to for registration.
- **Set Page Title:** Determines if the block should set the page title with the event item name.
- **Lava Template:** The Lava template that will be used to format the list of filtered events.
![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/event-detail-block-v13.png)

Event Occurrence Detail

# Calendar Item Occurrence List Lava

This is more of a specialty block. It lists upcoming occurrences for a specific event item. This is helpful for events like specific classes (e.g., Starting Point, Stewardship Class) or events that routinely happen (e.g., Baptisms).

- **Event Item:** The event item to show occurrences for.
- **Campuses:** Which campuses to show occurrences for.
- **Use Campus Context:** Determines whether the campus context should be used to filter the events (assumes that a campus context is in use on your site).
- **Date Range:** You can filter the occurrence list by a sliding date range (e.g., upcoming two weeks).
- **Max Occurrences:** The maximum number of occurrences to show.
- **Registration Page:** The page to navigate to for registration.
- **Lava Template:** The Lava template that will be used to format the list of filtered events.
![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/block-event-item-occurrence-list-lava.png)

Calendar Item Occurrence List Lava

# Calendar Item Occurrence List By Audience Lava

This is another specialty block. It lists upcoming occurrences for a specific audience (All Church, Youth, Children, etc.). This is helpful for pages devoted to these audiences. Below are some of the options available in the block's settings.

- **Audience:** The audience to filter on.
- **Calendar:** Which calendar to use.
- **Use Campus Context:** Determines whether the campus context should be used to filter the events (assumes that a campus context is in use on your site).
- **Date Range:** You can filter the occurrence list by a sliding date range (e.g., upcoming two weeks).
- **Max Occurrences:** The maximum number of occurrences to show.
- **Registration Page:** The page to navigate to for registration.
- **Lava Template:** The Lava template that will be used to format the list of filtered events.
![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/block-event-item-occurrence-list-by-audience-lava.png)

Calendar Item Occurrence List By Audience Lava

# Event Calendar Item Personalized Registration

This is a quirky, but insanely cool little block. Its main use is to facilitate internal registrations for special classes from an individual's *Person Profile* page. Let's dig into a sample to understand this better.

Say your organization has a special orientation class called *Starting Point*. Previous attendance in this class is really important to you so you've created a special badge to show if someone has attended this class. But... you also want to easily be able to register people for upcoming classes when they call or email you. You can then set the markup of your badge to link to a page with this block if they have not attended *Starting Point*. This block takes the person and looks up upcoming class dates based on their campus. Once you select a date you can select other members of the family and create a registration to add them to the class.

It should be noted that this block creates an online registration and then redirects to the registration block to complete the process. This allows for the collection of extra fields configured for the registration and also allows for things like confirmation and reminder emails.

- **Include Family Members:** Determines if a list of family members should be displayed to include in the registration.
- **Days In Range:** The number of days in the future to filter event occurrences for.
- **Max Display Events:** The maximum number of occurrences to show.
- **Registration Page:** The page to redirect to, to complete the registration.
- **Start Registration At Beginning:** You can optionally choose to redirect to the beginning of the registration process (a good option if you expect additional custom fields to be needed) or the end (a good option if additional fields are not needed as you can quickly complete the registration).

The block requires the following inputs through the URL:

- **PersonGuid:** The Guid of the person to be registered.
- **EventItemId:** The Id of the event item to process the registration for.
![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/block-personalized-registration-v18.png)

Event Calendar Item Personalized Registration

Table of Contents

- [Welcome](#welcome)
- [Event Registration Overview](#eventregistrationoverview)
- [Event Wizard](#eventwizard)
- [Registration Templates](#registrationtemplates)
- [Registration Instances](#registrationinstances)
- [Registration Fees](#registrationfees)
- [Discounts](#discounts)
- [Payment Plans](#paymentplans)
- [Managing Event Registrations](#managingeventregistrations)
- [Wait Lists](#waitlists)
- [Registration Payment Reminders](#registrationpaymentreminders)
- [Registration Group Placements](#registrationgroupplacements)
- [Registration Finances](#registrationfinances)
- [Calendars](#calendars)
- [iCalendar Feed](#icalendarfeed)
- [Bringing It All Together](#bringingitalltogether)
- [Securing Calendars and Events](#securingcalendarsandevents)
- [Event Blocks](#eventblocks)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


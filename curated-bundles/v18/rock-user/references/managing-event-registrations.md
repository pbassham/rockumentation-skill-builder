---
description: "Use when managing event registrations, promoting registration links, or accessing registration instance details and registrant information"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Managing Event Registrations

Managing Event Registrations

Now that you're comfortable creating event registrations, let's see how to manage them through the registration lifecycle.

# Promoting Your Registration

The easiest way to give your guests access to an event registration is through a calendar event. The [Bringing It All Together](#bringingitalltogether) chapter below covers the process of linking calendar events to registrations. Once linked, the event detail will display the Register button as shown below.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/calendar-detail-v13.png)

Event Detail Page With Registration Link

You can also link directly to an event registration using a URL. The formats for doing so are:

- http://www.yourexternalsite.com/page/999?RegistrationInstanceId=999 (where the page id and registration instance id match the appropriate values)
- http://www.yourexternalsite.com/Registration/<slugname\> (you can find more on *slugs* in the [Bringing It All Together](#bringingitalltogether) chapter below)

# Start at the Beginning

When updating an existing registration, Rock drops the person onto the summary page by default. If you prefer they start at the first step of the registration process, add `StartAtBeginning=true` to the URL. This ensures they review every screen before saving their changes.

# Managing Registrations

You can manage the registrations by going to the *Event Instance Detail Page:*

Tools \> Event Registration \> Registration Detail \> Registration Instance.

At the top of this page, you'll see the details of the registration with an Edit button to modify its settings. You'll also notice a number of tabs toward the bottom of the page, each relating to a different component of the registration process (registrations, payments, etc.). The content on each of the tabs can be filtered using the *Filter Options* link.

## Registrations Tab

The *Registrations Tab* shows all of the registrations that have been entered into the system. Remember these are registrations that could have multiple registrants. If any of the registrations are tied to a campus (e.g., because there is a Campus *linkage* configured, see below) then a campus column will also appear.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-registrations-tab-v18.png)

Registration Instance Detail Page

From this tab you can view and edit an existing registration or manually add a registration yourself (great if you also allow paper registrations).

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-registration-edit-v18.png)

Registration Edit Screen

## Registrants Tab

The next tab shows a listing of all registrants for the event, including summary information about groups, fees and placements. This list is also filterable. Clicking a row will show you the registrant's details as well as the rest of the related registration information. If that screen seems familiar, it's because it's the same screen as the one above except that we scroll down to the selected registrant's information.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-registrants-v18.png)

Registration Instance Registrants

You may notice a icon at the top and bottom of the list of registrants, in addition to the other grid actions. Clicking this will start a new communication, sent to the registrar of any selected registrants. This allows you to filter the list of registrants and then easily contact the associated registrars.

## Payments Tab

The payments tab allows you to view all the payments that have been made for registrations for this instance. Clicking on one of the rows in the list opens a financial transaction for that payment. From this transaction detail screen, you can process a refund for the payment.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-payments-v18.png)

Registration Payments

## Fees Tab

This tab displays all of the registration fees associated with the event. The information can be filtered and exported to a spreadsheet. Be sure to read the [Registration Fees](#registrationfees) chapter to learn how fees work with event registration.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-fees-tab-v18.png)

Registration Instance Fees

## Discounts Tab

This tab displays all of the discounts that have been used, as well as a lot of useful information about the discounts. You can view which codes were used, who used them, how many times each discount was used, and the total costs of the discounts. As with the other tabs, the information provided in this tab is filterable and can be exported to a spreadsheet.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-discounts-tab-v18.png)

Registration Instance Discounts

## Linkages Tab

This tab will make more sense once you read the [Bringing It All Together](#bringingitalltogether) section. Basically, it shows all the related calendar events and groups that are linked to this registration. You can also include a Campus linkage, which will associate registrations with that campus. The *Calendar Item* campus ("All Campuses" in this example) comes from the calendar item event occurrence's campus.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-linkages-v18.png)

Registration Instance Linkages

If you don't have a Campus linkage set up, you can pass a `CampusId` parameter in the URL during registration and the registration will instead be associated with that campus. If you do have a Campus linkage set up, the registration will be associated with the linkage campus regardless of URL parameters used during the registration.

## Wait List Tab

This tab displays registrants on the wait list and allows you to move them off of the wait list. To learn more about wait lists, see the [Wait Lists](#waitlists) chapter below.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/waitlist-tab-v18.png)

Registration Instance Waitlist


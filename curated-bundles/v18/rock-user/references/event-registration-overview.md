---
description: "Use when users need to understand event registration concepts, terminology, features, or setup basics in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Event Registration Overview

Event Registration Overview

For many events it's good to know who will be coming. Rock's event registration features provide a simple tool to not only know who is planning to attend, but also to take care of many of the mundane tasks like event payments. The first thing that people want to know about event registration is the feature list. While not inclusive (you'll have to read further for that), below is a list of the major features contained in event registration:

- Free/Paid Registrations
- Partial Payments
- Additional Fees
- Single or Multiple Registrant Registrations
- Discounts (Percentage and Fixed Amounts)
- Payment Plans
- Notifications
- Custom Entry Forms
- Confirmation and Reminder Emails

Didn't see a feature you need? Keep reading...it's probably in here.

# The Basics of Event Registration

Before getting too deep, let's establish some of the key terms and concepts related to event registration.

## Registrar vs. Registrant

There are two parties involved with every registration that occurs. The registrar, the person who is actually entering the registration, and the registrant, the person who is registered for the event. In some cases, this could be the same person. For instance, Ted Decker may register himself for an upcoming event. Many times, though, this will not be the case. Ted Decker might register his two children for camp. In this latter case, Ted would be the *registrar* while his two children, Noah and Alexis, would be *registrants*. While we're often most interested in the *registrants* for an event, we also need to be able to store and report on the registrars.

## Registration Templates vs. Registration Instances

As you use the event features, you'll find that many of your registrations are actually identical in terms of costs, fees and fields. To simplify the process of creating new registrations in these cases we've created the concept of a Registration Template. The template is where you'll configure the majority of the settings for a registration (things like costs, required entry fields, fees, etc.). Once the template is complete, you can create *instances* of them that configure the settings that would be specific to the event (registration start and end dates, contact info, etc.). Still a little confused? Let’s look at some examples.

It's likely that you'll create an event registration for events like a new members class. These classes happen often, but their event registration configurations will all be the same. You would create a registration template for this class, then create registration instances from this template with the proper dates and contacts.

On the other hand, an event like summer camp is probably different each year. In this case you may have a custom template with a single instance each year.

## The Role of Groups

By this point you've probably seen how important groups are in Rock. Groups also play a role in event registration. In many cases the end point of the event registration process is the placement of the registrants into a group that you configure. While you're not required to have your event registrations add people to groups, in most cases you'll want to so you can enable things like event check-in.

You can also do other clever things with the relationship between registrations and groups. Since nothing is keeping you from having more than one registration linked to a single group, you can handle complex registration scenarios. Say that your summer camp can only take so many boys vs. girls. In Rock you could set up two different registrations with separate caps for boys and girls. Both of these registrations can also put their registrants into the same group, giving you a single list of all children attending camp. After the registration is complete, you can then add the registrants to one or more additional groups using the [Group Placement](#registrationgroupplacements) features.

See our [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7/) guide for more information.

# URL Slug Required

The URL Slug **must be used** in order to have registrants be automatically placed into the correct group. We'll talk more about that [below](#bringingitalltogether).

## A Typical Event Registration

Hang in there - we're almost to the meat. First, we'll do a quick overview of what an event registration will look like to your members. The example below uses the default registration out of the box. While you'll see that this experience is simple and mobile-friendly, we plan to create even simpler experiences for very basic registrations (think: give me your name and we're done).

Let's get some background on the registration we're walking through below. In this case Ted Decker will be registering his two children Noah and Alexis, as well as Alexis' best friend Katie for camp. The camp costs $200 but also has an optional fee for a t-shirt.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-walkthru-1-v17.png)

Registration Walk-through

# Controlling Saved Account Payment Options

Some payment gateways may not support certain payment methods like ACH or credit cards. To control which payment types are available during registration, go to the *Saved Registration Entry* block settings (Obsidian). Use the *Enable ACH* and *Enable Credit Card* options to allow or disallow those methods. To disable saved accounts as a whole, set *Enabled Saved Account* to "No".

# Adding Family Members and Guests

Imagine this: a family signing up for a summer camp, adding their loved ones to the registration with just a few clicks. Rock's registration feature makes it easy to create a smooth, family-friendly experience that includes everyone in one go, whether they’re family members or friends. With a couple of tweaks to your *Registration Template*, you’ll have everything set up so people can effortlessly add everyone they need. (No one’s left out here—not even that friend who’s "basically family!") If you're new to [Registration Templates](#registrationtemplates), check out the chapter on that topic to get a sense of the bigger picture, and then come back here ready to rock your configuration.

When setting up your *Registration Template*, open the Details section. If you select “Yes” for *Registrants In Same Family* and enable *Show Family Members*, the registrar will see a new option called “New Family Member” in the *Family Member to Register* drop-down list. This means that anyone registering will see an easy way to add someone as a new member of their family.

![Add New Family Member Configuration](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-registration-new-family-member-config-v18.png)

Add New Family Member Configuration

If the person selects “New Family Member” as pictured below, Rock will add this new person to their family automatically, making them part of the same family unit in Rock.

![Add New Family Member](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/event-registration-add-new-family-member-v17.png)

Add New Family Member

Let’s say you want registrars to add guests too, just like they add family members. Here’s where things get fun. Go back to your *Registration Template*, set *Registrants In Same Family* to “Ask,” and make sure *Show Family Members* is still enabled. This will give registrars a choice: they can confirm that someone is part of their family, or choose “None of the above” for those outside their family group.

![Add Guest or Family Member Configuration](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-registration-add-guest-config-v18.png)

Add Guest or Family Member Configuration

When *Registrant is in the same immediate family as* is set to the registrar, the drop-down will display existing family members, plus an option to add a “New Family Member.” However, if *Registrant is in the same immediate family as* is set to “None of the above,” a “Guest” option will be selected, perfect for bringing along friends, coworkers, or that favorite neighbor.

Selecting “Guest,” as pictured below, means Rock will add a new person based on the registration details given. This way, you can track everyone accurately, making future interactions a breeze.

![Add New Guest](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/event-registration-add-new-guest-v17.png)

Add New Guest

With just a couple of clicks, registrars can include everyone they want—and with Rock’s setup, you’ve made sure that process is as simple and friendly as possible. After all, the more the merrier!


---

## Event & Calendar Guide {#event-calendar-guide}

> **Path:** Event & Calendar Guide

This skill catalogs the chapters of *Event & Calendar Guide* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Event & Calendar Guide > Welcome

The power of Rock's tools is the synergy they bring when they work together. This is certainly true in the area of event management. So as not to overwhelm though we’ll start by describing each of the available tools as a stand-alone component. Once we have that complete, we'll dive into how you can use them together for mind-blowing results.

# Enable SSL

Be sure to enable SSL on your website before taking registrations with payments.


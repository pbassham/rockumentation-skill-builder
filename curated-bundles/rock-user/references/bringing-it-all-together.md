---
description: "Use when setting up Rock event management with registration, calendar events, and groups, or when configuring URL slugs for event occurrences"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Bringing It All Together

Bringing It All Together

Hopefully you're starting to see the symbiotic relationship between event registrations and calendar events. The fact that they share the same manual should tell you that they go together like peas and carrots (or steak and potatoes). We've also seen that groups can be linked to registrations, and that content channels also have a role with calendar events.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/eventcalendar-components.png)

You might be wondering how you're going to manage all these items for a specific event. We did too, so we worked hard to make it as simple as possible. Here’s how.

While you can link registrations, events, groups and content channel items many different ways, here's the easiest:

1. Create your event group that the registration will place registrants into.
2. Create your calendar event and occurrence.
3. While editing your occurrence select the Add Linkage button. There are a few linkage options for you, which we’ll summarize here and then describe in more detail [below](#adding-calendar-linkages).
1. **No Registration Required:** Select this option if you’re not linking the event to a registration. This lets you link a URL Slug to the event without needing a registration instance.
	2. **Create Registration Instance:** This lets you set up a new registration instance directly from the calendar occurrence instead of creating it separately and having to link them later.
	3. **Use Existing Registration Instance:** If you already have a registration instance created then you can use this option to link it to this event occurrence.
5. After saving the occurrence, you can optionally enter any content channel items you need for your event. See [below](#linking-content-channel-items) for more details.

Once you create these linkages, you can view and manage them from either the calendar occurrence, group or event instance detail screens.

# URL Slug Required

The URL Slug **must be used** in order to have event registrants be automatically placed into the correct group.

# Adding Calendar Linkages

As noted in the section above, you have different linkage options available to you when creating a new calendar event and occurrence. In this section we’ll look at each option in detail.

## No Registration Required

Select this option when you don't need a registration but still want to have a URL slug associated with an event.

![No Registration Required](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-occurrence-add-linkage-no-registration-v18.png)

No Registration Required

In the example pictured above we’re not linking the calendar occurrence to any registration instance. However, we can still create a handy URL slug.

# URL Slugs: Say what?!

A "slug" is a common web term that refers to a part of a web address that identifies a page, or component of a page, using human-readable keywords. If you're not Noah Webster, that means instead of saying `Registration?RegistrationInstanceId=153` you can say `Registration/SummerCamp2021`. In most cases the slug can be whatever you want but try to use only letters and numbers (e.g., SummerCamp2021) if possible because some special characters may cause issues with browsers. Keeping that in mind, dashes are commonly used (e.g., Summer-Camp-2021) without causing problems.

Keep in mind when using the *No Registration Required* option that you might need to add some [page routes](https://community.rockrms.com/documentation/bookcontent/14#routes) on your external site. To get the URL slug to work, you’ll need a page route similar to `events/{slug}` or `campinfo/{slug}` on the page that has the *Calendar Event Item Occurrence Lava* block. The route must include `{slug}` because this tells the system where to look for the linked event occurrence.

## Create Registration Instance

You would use *Create Event Registration Instance* if you want to link the event occurrence to a registration instance that hasn’t been created yet. This means you can create a registration instance directly from the calendar instead of creating it separately and having to link them later.

![Create Registration Instance](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-occurrence-add-linkage-create-registration-v18.png)

Create Registration Instance

If the screen pictured above looks familiar, that’s because it’s the same information you’d use to create a registration instance from outside of the calendar. Just like any time you add a registration instance, you need to have a [registration template](#registration-templates) set up first. If a template doesn’t exist for the instance you’re trying to create, you’ll have to go back and add one.

## Use Existing Registration Instance

You’ll use this option if you already have a registration instance that just needs to be linked to this calendar occurrence.

![Use Existing Registration Instance](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-occurrence-add-linkage-existing-registration-v18.png)

Use Existing Registration Instance

As you can see in the example pictured above, all you’ll need to do is pick the template and instance, and then give it a Public Name. Like the other options, you can also create a slug and link to a group from here.

# Linking Content Channel Items

After saving the event occurrence, you can optionally create or link to any content channel items you need for your event. This is a great way to get the word out about the event. When viewing the occurrence, there is an area at the bottom of the page for *Content Channels*.

![Add Content Channel Item](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/add-content-channel-item-to-event-occurrence-v18.png)

Add Content Channel Item

For more details on creating and working with content channels, check out our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#contentchannels) manual.


---

## Securing Calendars and Events {#securing-calendars-and-events}

> **Path:** Event & Calendar Guide > Securing Calendars and Events

Securing Calendars and Events

There are two security roles that help secure the management of calendars and events. Let's look at each.

# Securing Calendars

While those in the *RSR - Staff Workers* and *RSR - Staff Like Workers* roles can view and add new events, only those in the *RSR - Calendar Administration* can approve events and create new calendars.

# Securing Event Registrations

Like calendars, those in the *RSR - Staff Workers* and *RSR - Staff Like Workers* roles can create new instances of registrations, but only those in the *RSR - Event Registration Administration* can create new registration templates.

Individuals can edit event registration templates in two ways:

- If they have *Administrate"* permissions for the specific template.
- If they have *Edit"* permissions on the block security, allowing them to edit any template using the block.

To limit access, remove the individual from this role and grant them permissions for specific registration templates instead.

From a financial perspective anyone in the staff/staff-like roles can add payments to a registration but out of the box you will need to be in the *RSR - Finance Administration* role to process refunds.


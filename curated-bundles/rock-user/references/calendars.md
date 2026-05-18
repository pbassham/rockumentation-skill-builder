---
description: "Use when users need to set up, manage, or organize calendars, events, and recurring event schedules in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Calendars

There are three components that make up Rock's calendar capabilities: Calendars, Events and Event Occurrences.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/calendar-components-v14.png)

Calendar Components

One might wonder why we need separate events and event occurrences. Couldn't we just put the schedule on the event and be done with it? That would certainly work, but there are cases where the same type of event, say Baptism, happens repeatedly. Having separate event and event items allows us to do things like list all the upcoming baptism dates.

# Event Calendars

Every organization has the need for multiple calendars. Even a small organization will have a public and private (internal) calendar. Most will have several more. You can administrate calendars under Tools \> Calendars.

Out of the box Rock ships with two pre-configured calendars:

- **Internal:** Used for internal events like staff meetings, retreats, etc.
- **Public:** For events targeted towards your members and attendees.

# Events Can Be Placed on More Than One Calendar

Sometimes you'll have an event that should be displayed on more than one calendar. Rock supports this. An event can be on any number of calendars you'd like.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/calendar-calendarlist-v18.png)

Calendar List

You can add additional calendars by selecting the add button in the upper right of the panel, as pictured above. When adding or editing a calendar you will see the screen below:

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/calendar-calendardetail-v18.png)

Calendar Details

## Calendar Security

You can set up security for each calendar you define. This allows you to delegate the management of these calendars and their events. You set security from the *Calendar Details Page* by pressing the button.

# Events

Once you've created your calendar, you're ready to place events on them.

Tools \> Calendars \> Calendar

Shows a list of the current events for a calendar on the *Calendar Details Page*. As you get more and more events, you'll want to start using the filters on this grid to help you manage the events that are displayed.

The event add/edit screen below shows you how to manage the events on the calendar.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/calendar-calendareventdetail-v18.png)

Calendar Details

# Follow An Event

After saving an event you can choose to follow it by selecting the icon in the upper right corner of the details block. This will add it to the list of followed events on [your dashboard](https://community.rockrms.com/documentation/bookcontent/5#mydashboard).

# Event Occurrences

We have our calendar and now, events. All that's left is to add the event occurrences that determine when these events occur. Some events may only occur once, while others apply often. Either way, you'll add the occurrences from the *Event Details Page*.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-occurrence-edit-v18.png)

Event Instance Edit

You might be thinking, *"Hey! Reoccurring schedules? I thought we were supposed to create a new occurrence each time the event occurred?"* Yes... and no... Some occurrences of an event may last two to three weeks (say a single occurrence of a three-week stewardship class). In this case, make a single occurrence with a reoccurring schedule.

Once you save your calendar occurrence, you'll be taken to the occurrence detail screen. From here you'll see that you can click the button to add a new content channel item, or you can click the button to link to an existing content channel item. Adding and connecting with content channel items allows you to enter and track promos for your event.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/calendar-calendareventoccurrence-v18.png)

Event Instance Detail

# Event Occurrence Attributes

You can create specific attributes to assign to event occurrences. For example, you could create a "Lunch Provided?" attribute to use with recurring staff meetings. Then for each meeting assign that attribute a value of "Yes" or "No". As with all attributes, the possibilities are endless and completely customizable for your organization's needs. Keep in mind when creating these attributes, they will be available for every calendar event.

To create an event occurrence attribute value, click the button on the main *Event Calendars* screen to access the Calendar Attributes screen.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/calendar-attributes-v18.png)

Calendar Attributes

In the *Event Occurrence Attributes* section, click the button to create the new attribute. Once saved, the attribute is available in the *Attribute Values* section of the event's *Edit Event Occurrence* screen.

# Event Item Occurrence Attributes

Hang on, what if I know an attribute will ONLY be used for one event occurrence? Well, in this case, you can set your attributes within the Event Details, such as your staff meetings. Scroll to the bottom of the *Event Details* page for the *Event Occurrence Attributes* panel and expand it. Click the button to add a new attribute.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-item-event-occurrence-attributes-v18.png)

Event Item Attributes

Now in the *Attribute Values* section of the event's *Edit Event Occurrence* screen, you will see all the specific event attributes along with the global attributes created in the Calendar Attributes screen.

# Calendar Blocks

Below is what the calendar looks like on the external website. These blocks have a ton of settings (much of the page is rendered in Lava so the possibilities are endless).

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/calendar-block-v13.png)

Calendar Block

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/event-detail-block-v13.png)

Event Detail Block


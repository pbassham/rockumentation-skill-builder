---
description: "Use when setting up iCalendar feeds for external calendar programs like Outlook, Google Calendar, or Apple Calendar"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > iCalendar Feed

iCalendar Feed

Once you have your event calendars up and running, you can use Rock's iCalendar feed feature to create dynamic calendars in Outlook, iOS, OSX iCal, Google Calendar and Android. This means you and the members of your organization can have access to event calendars right in your pocket. The iCalendar feed is accessed by URL, which you add to your email client or calendar program. The process will vary depending on the program you're using, but most programs have an option for adding a calendar from an internet address. Once you add the event calendar URL to your program, it will sync and stay updated with that calendar in Rock.

# Calendar Settings and Formatting

There are a couple of things about the iCalendar feed you should know before going forward. First of all, any security added to calendars is enforced, so you need to have access to any non-public calendars you want to use with the iCalendar feed. Second, Rock takes care of providing and formatting the calendar content. You can, however, customize the calendar's description by adding the following Lava to the Lava template:



                {{ EventItem.Description }}

                {{ EventItemOccurrence.Note }}
            

(Remember, Lava templates can be found at Admin Tools \> Settings \> Defined Types \> Lava Templates.)

OK, let's take a look at the iCalendar URL itself.

# Calendar URL

The calendar URL has a specific format:


http://rocksolidchurchdemo.org/GetEventCalendarFeed.ashx?calendarid=1

This sample URL provides the feed for a calendar located at rocksolidchurchdemo.org with an ID of "1".

There are three parts to the URL: the organization's domain name (i.e., rocksolidchurchdemo.org), the GetEventCalendarFeed function, and the calendar parameters (i.e., calendarid=1). The domain name and the parameters will change according to the organization and the desired calendar options, but the GetEventCalendarFeed.ashx portion **must remain unchanged** in order for the feed to work.

Let's take a closer look at the parameters available for customizing the calendar feed. You can use parameters to tell the feed to pull only events from a specific campus, specified dates, or even from a certain Lava template. The following parameters are available with the iCalendar feed:

| Parameter | Description | Example |
| --- | --- | --- |
| templateid | The Lava template ID for the iCalendar description. If this is not specified, the default is used. The default is a concatenation of the EventItem Description and the EventItemOccurrence Note. | templateid=1234 |
| campusids | A comma separated list of campus IDs. Default is all campuses. | campusids=2,4,12,9 |
| audienceids | A comma separated list of audience IDs. Default is all audiences. | audienceids=5,6 |
| startdate | The earliest date to get calendar info. Format: yyyyMMdd. Default is the current day. | startdate=20180501 |
| enddate | The latest date to get calendar info. Format: yyyyMMdd. Default is two months from the startdate. | enddate=20180701 |

So, using our same URL sample above, if you want to grab the feed for events on the public calendar from April 1, 2018 through July 7, 2018, the URL feed would be:


http://RockSolidChurchDemo.org/GetEventCalendarFeed.ashx?calendarid=1&startDate=20180401&enddate=20180707

To filter the above URL for two audience types, the URL would be:


http://RockSolidChurchDemo.org/GetEventCalendarFeed.ashx?calendarid=1&startDate=20180401&enddate=20180707&audienceIds=147,1698

Now, you could build the iCalendar feed URL yourself; but to make things super easy, you can also quickly grab the URL for the event calendar you want to use by going to the *Event Calendar* screen and clicking the Export Calendar Feed button. This will copy the URL to your clipboard.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/calendar-exportcalendar-v18.png)

Export Calendar Feed


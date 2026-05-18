---
description: "Use when you need to retrieve upcoming calendar events from a specific calendar, optionally filtered by audience, campus, or date range"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Calendar Events

v12.0

Working with calendars can be tricky as recurring events are defined as iCal patterns. While these patterns are very powerful it is difficult to query for upcoming events in a performant way using SQL/Entity Commands.

A cousin of the 'Entity' commands, this Lava command will provide a summary list of `EventScheduledInstances` from the provided calendar.

## The Basics

```
{% calendarevents calendarid:'1' audienceids:'151,152' %}
    {% for item in EventScheduledInstances %}
        {{ item.Name }} 
        on {{ item.Date }}
        at {{ item.Time }}
        for {{ item.AudienceNames | Join:', ' }} 
        Contact: {{ item.EventItemOccurrence.ContactEmail }}
    {% endfor %}
{% endcalendarevents %}
```

By specifying the calendar ID, as well as a few other optional values, you can get an array of summary `EventScheduledInstances` items. Each could contain:

- EventItemOccurrence - the typical model (as seen in the model map)
- Name
- DateTime
- Date
- Time
- EndDate
- EndTime
- Campus
- Location
- LocationDescription
- Description
- Summary
- OccurrenceNote
- DetailPage
- CalendarNames
- AudienceNames

## Parameters

- [calendarid](#calendarid)
- [maxoccurrences](#maxoccurrences)
- [daterange](#daterange)
- [audienceids](#audienceids)
- [campusids](#campusids)
- [startdate](#startdate)

## Calendar ID 

*Required:* The id of the calendar to get the occurrences from.

## Max Occurrences

*Optional:* Default 100. The maximum number of event occurrences that should be returned.

## Date Range

*Optional:* Leaving this blank will result in today and all future items being returned (up to the max occurrences). The date range that should be considered, after *startdate*. The pattern should be 'Xd' where X is the number of units followed by the unit identifier: `d` = days, `w` = weeks, `m` = months.

```
daterange:'4w'
```

## Audience IDs

*Optional:* Default none. A comma separated list of defined value audience IDs (from the *Audience Type* defined type) to filter on.

## Campus IDs

v13.0

*Optional:* Default none. A comma separated list of Campus IDs to filter on. Items that are marked 'All Campus' will be included.

## Start Date

*Optional:* Default is today. The start date of the filter period. The end date is determined by *daterange*.


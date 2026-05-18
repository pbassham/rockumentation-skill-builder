---
description: "Use when querying recurring event instances, scheduling calendars, or displaying upcoming event occurrences with iCal pattern support"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Event Scheduled Instance

v12.0

Working with calendars can be tricky as reoccurring events are defined as iCal patterns. While these patterns are very powerful it is difficult to query for upcoming events in a performant way using SQL/Entity Commands.

A cousin of the 'Entity' commands, this Lava command will provide a summary list of `EventScheduledInstances` of the provided event.

## The Basics

```
{% eventscheduledinstance eventid:'3' maxoccurrences:'25' daterange:'2m' %}
    {% for item in EventScheduledInstances %}
        {{ item.Name }} 
        on {{ item.Date }}
        at {{ item.Time }}
        involving {{ item.AudienceNames | Join:', ' }} <br>
        Contact: {{ item.EventItemOccurrence.ContactPersonAlias.Person.FullName }} 
           at {{ item.EventItemOccurrence.ContactEmail }}
    {% endfor %}
{% endeventscheduledinstance %}
```

By specifying the event ID, as well as a few other optional values, you can get an array of summary `EventScheduledInstances` items. Each could contain:

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

Because some events have multiple event occurrences with their own semi-repeating schedules, this command will also provide an `EventItems` array for each event occurrence which will contain an array for each instance of the occurrence schedule. Let's illustrate with an example.

Suppose you have two, 4-week Rock Solid Finances Classes: one on Tuesday nights and the other on Wednesday nights. This example would output them grouped by each event occurrence -- the Tuesday night classes first, followed by the Wednesday night classes next:

```
{% eventscheduledinstance eventid:'3' maxoccurrences:'25' daterange:'2m' %}
    {% for occurrence in EventItems %}
        <b>Series {{forloop.index}}</b><br>

        {% for item in occurrence %}
            {% if forloop.first %}
                {{ item.Name }}
                <b>{{ item.DateTime | Date:'dddd' }} Nights</b><br>
                <ol>
            {% endif %}
            
            <li>{{ item.DateTime | Date:'MMM d, yyyy' }}
            in {{ item.LocationDescription }}</li>

            {% if forloop.last %}
                </ol>
            {% endif %}
        {% endfor %}
        
    {% endfor %}
{% endeventscheduledinstance %}
```

Which might output something like:

**Series 1**  
Rock Solid Finances Class **Tuesday Nights**  
1. Oct 27, 2020 in Tea Room
2. Nov 3, 2020 in Tea Room
3. Nov 10, 2020 in Tea Room
4. Nov 17, 2020 in Tea Room
**Series 2**  
Rock Solid Finances Class **Wednesday Nights**  
1. Oct 28, 2020 in Wonder Room
2. Nov 4, 2020 in Wonder Room
3. Nov 11, 2020 in Wonder Room
4. Nov 18, 2020 in Wonder Room

## Parameters

- [eventid](#eventid)
- [maxoccurrences](#maxoccurrences)
- [daterange](#daterange)
- [campusids](#campusids)

## Event ID 

*Required:* The id of event to get the occurrences for.

## Max Occurrences

*Optional:* Default 100. The maximum number of event occurrences that should be returned.

## Date Range

*Optional:* Leaving this blank will result in today and all future items being returned (up to the max occurrences). The date range that should be considered. The pattern should be 'Xd' where X is the number of units followed by the unit identifier: `d` = days, `w` = weeks, `m` = months.

```
daterange:'4w'
```

## Campus IDs

v13.0

*Optional:* Default none. A comma separated list of Campus IDs to filter on. Items that are marked 'All Campus' will be included.


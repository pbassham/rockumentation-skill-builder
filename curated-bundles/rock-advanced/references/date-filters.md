---
description: Use when converting dates to UTC format or formatting dates with custom patterns like day/month/year/time elements
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Filters > Date Filters

These date filters allow you to modify the formatting of dates in some pretty cool ways!

**Now!** When working with dates you'll often want to get the current date/time. This is possible with the 'Now' keyword. You can use in places where you'd normally input a date/time to use the current date/time. Consider the example below which would display today's date like '7/5/2026'.
```
{{ 'Now' | Date:'M/d/yyyy' }}
    
<!-- New in V10 - No parameters are required to assign the current date/time.-->
<!-- However, it is advised you always specify the date format to avoid      -->
<!-- international confusion.                                                -->
{% assign now = 'Now' | Date %}
```

 

# AsDateTimeUtc

Server: v14.1

Converts the input to a DateTime value in Coordinated Universal Time (UTC).

**Additional Details**

**Example:**

```
{{ '2018-05-02T03:00:00+04:00' | AsDateTimeUtc | Date:'yyyy-MM-ddTHH:mm:sszzz' }}
```

```
2018-05-01T23:00:00+00:00
```

**Note:**  
If the input date doesn't specify an offset, the current Rock application timezone is assumed.

 

# Date

Server: v1.0 Mobile: v1.0

Displays the date given a format string. The string 'Now' can be used for the current date/time.

**Additional Details**

Value formatting elements include:

**Date Elements**
- sd - Returns the culture's standard shortened date format (m/d/yyyy in the US)
- d - Day of the month 1 - 31.
- dd - Two digit day of the month 01 - 31.
- ddd - Abbreviated day of the week (Mon, Tue, etc.)
- dddd - Full day of the week (Monday, Tuesday, etc.)
- M - The month, from 1 through 12
- MM - The month, from 01 through 12
- MMM - The abbreviated name of the month (Jan, Feb, etc.)
- MMMM - The full name of the month
- yy - The year, from 00 to 99
- yyyy - The year as a four-digit number
**Time Elements**
- st - Returns the culture's standard shortened time format (h:mm am/pm in the US)
- h - The hour, using a 12-hour clock from 1 to 12
- hh - The hour, using a 12-hour clock from 01 to 12
- H - The hour, using a 24-hour clock from 0 to 23
- HH - The hour, using a 24-hour clock from 00 to 23
- m - The minute, from 0 through 59
- mm - The minute, from 00 through 59
- s - The second, from 0 through 59
- ss - The second, from 00 through 59
- tt - The AM/PM designator

When the date is going to be saved to the database as an attribute value, we recommend you use the ISO standard format `yyyy-MM-ddTHH:mm:ss.fffzzz`

For even more options see the [Microsoft .Net Custom Date and Time Formatting Reference Guide](http://msdn.microsoft.com/en-us/library/8kb3ddd4\(v=vs.110\).aspx).

**Example:**

```
"Person": {
    "FirstVisit": "2/13/2011 8am"
}
```

```
Ted's first visit was on {{ Person | Attribute:'FirstVisit' | Date:'dddd, MMMM d, yyyy' }}.
```

```
Ted's first visit was on Sunday, February 13, 2011.
```

 

# DateAdd

Server: v4.0 Mobile: v1.0

Adds a span of time to a provided date (default is in days).

**Additional Details**

By default this filter assumes the amount you pass in is in days. You can also pass in other intervals as a second parameter like:

{{ 'Now' | DateAdd:-12,'h' }}

This would subtract 12 hours from the current date/time.

Valid units are:
- y - Years v8.0
- M - Months v8.0
- w - Weeks v8.0
- d - Days
- h - Hours
- m - Minutes
- s - Seconds

Adding weeks is simply a shorthand for adding by 7 days at a time.

**Example:**

```
"CurrentPerson": {
    "FirstVisit": "2/14/2011"
}
```

```
Your first visit was {{ CurrentPerson | Attribute:'FirstVisit' }}. Two weeks later would be {{ CurrentPerson | Attribute:'FirstVisit' | DateAdd:14 }}.
```

```
Your first visit was 2/14/2011. Two weeks later would be 2/28/2011.
```

**Note:**  

When adding months and years, if you are going from one month with more days than the target month, the day number will be reduced to fit within the new target month.

- 5/31/2018 + 1 month = 6/30/2018
- 2/29/2016 + 1 year = 2/28/2017

 

# DateDiff

Server: v1.0 Mobile: v1.0

Takes two datetimes and returns the difference in the unit you provide. You can provide the value 'Now' for either the start or end date.

**Additional Details**

Valid units are:

- Y - Years
- M - Months
- w - Weeks v17.0
- d - Days
- h - Hours
- m - Minutes
- s - Seconds

**Example:**

```
"Person": {
    "FirstVisit": "2/14/2011",
    "SecondVisit": "3/18/2011"
}
```

```
It was {{ Person.FirstVisit | DateDiff:Person.SecondVisit,'d' }}
days between {{ Person.NickName }} first and second visit.
```

```
It was 32 days between Ted's first and second visit.
```

**Note:**  
If the start date is after the end date a negative number will be displayed. Note, the difference in days between January 1st at 11:59pm and January 2nd at 12:01am is 0 days, while the difference between January 1st and January 2nd (without the time portion) is 1 day.

 

# DateRangeFromSlidingFormat

Server: v13.4

Provides a start and end date from a sliding date range format (typically from the Sliding Date Range control).

**Additional Details**

**Example:**

```
{% assign range = 'Previous|2|Week||' | DateRangeFromSlidingFormat %}
{{ range.StartDate }} - {{ range.EndDate }}
```

```
3/28/2022 12:00:00 AM - 4/10/2022 11:59:59 PM
```

 

# DatesFromICal

Server: v4.0

Returns a list of upcoming dates from an iCal string or List of iCal strings.

**Additional Details**

This filter has some optional input parameters:

- The number of occurrences to display (optional): The default is 1. A text value of 'All' can also be used to return all the occurrences (up to one year's worth).
- enddatetime: (optional) v7.0 if 'enddatetime' is provided, the EndTime property of the iCal's occurrence is returned instead of the StartTime.

**Example:**

```
"EventItemCampuses": {
    [
        { 
            "ContactEmail": "jenny@rocksolidchurchdemo.com",
            "EventItemSchedules": [
                { 
                    "Schedule": {
                        ... ,
                        "iCalendarContent": "BEGIN:VCALENDAR VERSION:2.0 PRODID:-//ddaysof...",
                        ... ,
                    }
                }
            ]
        }
    ]
}
```

```
{% assign upcomingDates =  EventItemSchedules | Select:'Schedule' | Select:'iCalendarContent' | DatesFromICal:2 %}

<ul>
{% for date in upcomingDates %}
    <li>{{ date }}</li>
{% endfor %}
</ul>

{% assign upcomingEndDates =  EventItemSchedules | Select:'Schedule' | Select:'iCalendarContent' | DatesFromICal:2,'enddatetime' %}

<ul>
{% for endDate in upcomingEndDates %}
    <li>{{ endDate }}</li>
{% endfor %}
</ul>
```

```
<ul>
    <li>7/15/2015 7:00:00 PM</li>
    <li>7/16/2015 7:00:00 PM</li>
</ul>

<ul>
    <li>7/15/2015 8:00:00 PM</li>
    <li>7/16/2015 8:00:00 PM</li>
</ul>
```

**Note:**  
This is a complex filter. The example above uses a portion of the input from the calendar items lava file. It's only a sample and may need some changes to work correctly. See the CalendarItem.lava file in the themes folders for a working example.

 

# DaysFromNow

Server: v4.0 Mobile: v1.0

Returns a humanized string of the number of days from now without concern for time.

**Additional Details**

Valid return values are:

- X days ago
- yesterday
- today
- tomorrow
- in x days

**Example:**

```
"Person": {
    "FirstVisit": "2/14/2015",
}
```

```
Visited {{ Person.FirstVisit | DaysFromNow }}.
```

```
Visited 14 days ago.
```

 

# DaysInMonth

Server: v7.0 Mobile: v1.0

Returns the number of days in the month you provide.

**Additional Details**

There are several options on how to provide the month/year combination to check for. Valid methods include:

- {{ 'now' | DaysInMonth }} - Get the days in the current month/year.
- {{ '2/1/2017' | DaysInMonth }} - Get the days in the date provided.
- {{ '' | DaysInMonth:'02','2016' }} - Get the days based on the month/year provided.

**Example:**

```
None
```

```
There are {{ 'now' | DaysInMonth }} days in the current month.
```

```
There are 31 days in the current month.
```

 

# DaysSince

Server: v8.0 Mobile: v1.0

Returns the number of days that have passed since a given date.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker",
    "AnniversaryDate": '12/23/1995',
}
```

```
{{ Person.NickName }} was married {{ Person.AnniversaryDate | DaysSince }} days ago.
```

```
Ted was married 8215 days ago.
```

 

# DaysUntil

Server: v8.0 Mobile: v1.0

Returns the number of days from now.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker",
    "StaffSabbatical": '5/10/2020',
}
```

```
{{ Person.NickName }} can take a sabbatical in {{ Person | Attribute:'StaffSabbatical' | DaysUntil }} days.

There are just {{ '12/25/2018' | DaysUntil }} days until Christmas at Rock Solid Church.
```

```
Ted can take a sabbatical in 690 days.

There are just 188 days until Christmas at Rock Solid Church.
```

 

# HumanizeDateTime

Server: v1.0 Mobile: v1.0

Compares the provided date/time to the current date/time and returns a human friendly string like 'yesterday' or '2 hours ago'.

**Additional Details**

**Example:**

```
"Person": {
    "FullName": "Ted Decker",
    "AnniversaryDate": '12/23/1995',
}
```

```
{{ Person.NickName }} was married {{ Person.AnniversaryDate | HumanizeDateTime }}.
```

```
Ted was married 18 years ago.
```

**Note:**  
Other examples of possible return strings include:
- "yesterday"
- "2 hours ago"
- "4 days ago"
- "2 weeks ago"
- "6 months ago'
It can even work with future dates:
- "tomorrow"
- "2 hours from now"
- etc.

In Rock v4.0 you can optionally add a compare datetime as a parameter HumanizeDateTime:'8/1/2015'.

 

# HumanizeTimeSpan

Server: v1.0 Mobile: v1.0

Takes two datetimes and humanizes the difference like '1 day'. Supports 'Now' in either the start or end date.

**Additional Details**

**Example:**

```
"Person": {
    "FirstVisit": "2/14/2011",
    "SecondVisit": "3/18/2011"
}
```

```
It was {{ Person.FirstVisit | HumanizeTimeSpan:Person.SecondVisit }} 
between {{ Person.NickName }}'s first and second visit.
```

```
It was 4 weeks between Ted's first and second visit.
```

**Note:**  
There is an optional precision value you can apply to the filter to enhance the detail of the description. The default value of precision is 1 which means only the largest time unit is returned.
```
{{ Person.FirstVisit | HumanizeTimeSpan:Person.SecondVisit,2 }}
```
- 3 - 4 weeks, 4 days
- 4 - 4 weeks, 4 days, 3 hours
- 5 - 4 weeks, 4 days, 3 hours, 30 minutes

 

# IsDateBetween

Server: v14.0

Determine if the provided date falls within a given range.

**Additional Details**

This filter will accept input in the following formats:

- String (that can be parsed into a date)
- Date
- DateTime
- DateTimeOffset

The filter will attempt to parse each parameter (input, start of range, end of range) into a valid DateTime and check if the input falls within the range (inclusive). A boolean value will be returned.

**Example:**

```
"Items": [
    { 
        "Id": 1, 
        "Title": "Easter Devotional",
        "FeaturedDates": "4/10/2022 to 4/20/2022" 
    },
    { 
        "Id": 2, 
        "Title": "Christmas Devotional",
        "FeaturedDates": "12/20/2022 to 12/31/2022" 
    },
]
```

```
{% assign today = '2022-04-17 07:00' | Date:'yyyy-MM-dd HH:mm' %}
{% for i in Items %}
    {% assign startDate = i.FeaturedDates | Split:' to ' | First %}
    {% assign endDate = i.FeaturedDates | Split:' to ' | Last %}
    {% if i.FeaturedDates != '' %}
        {% assign isFeatured = today | IsDateBetween:startDate,endDate %}
        {% if isFeatured %}
            {{i.Title}}
        {% endif %}
    {% endif %}
{% endfor %}
```

```
Easter Devotional
```

**Note:**  
C# can make incorrect assumptions about the format of a string when parsing into a DateTime, for best results send a DateTime object.

 

# NextDayOfTheWeek

Server: v8.0 Mobile: v1.0

Advances the date to a specific day in the next 7 days.

**Additional Details**

**Example:**

```
"CurrentPerson": {
    "FirstVisit": "2/9/2011"
}
```

```
{{ CurrentPerson | Attribute:'FirstVisit' | NextDayOfTheWeek:'Friday' }}
```

```
2/11/2011
```

**Note:**  
Optional Parameters:
- includeCurrentDay (default false) - If true, the date's day can match the given day. Example: `{{ "5/1/2018" | NextDayOfTheWeek:'Tuesday', true }}` would result in "5/1/2018" because it was also a Tuesday.
- numberOfWeeks (default 1) - use negative numbers to go back a number of weeks.

 

# SundayDate

Server: v5.0 Mobile: v1.0

Returns the Sunday date portion (without any time portion) of the date provided.

**Additional Details**

Keep in mind that Rock considers Sunday to be the last day of the week. This makes sense when calculating church metrics. The 'Now' keyword can be used in place of a date for the current date.

**Example:**

```
"CurrentPerson": {
    "FirstVisit": "2/14/2011"
}
```

```
You first visited on the week of {{ CurrentPerson | Attribute:'FirstVisit' | SundayDate }}.
```

```
You first visited on the week of 2/20/2011.
```

**Note:**  
To get the previous Sunday simply pipe the filter through DateAdd. `  {{ 'Now' | SundayDate | DateAdd:-7 }}  `

 

# TimeOfDay

Server: v13.1

Returns a description of the time of day for an input value that represents a date/time. The keyword 'Now' can be used to represent the current time.

**Additional Details**

**Example:**

```
"Person": {
    "NickName": "Ted"
    "ThirdVisit": "2/14/2011 1pm",
    "FourthVisit": "3/18/2011 11:30am"
}
```

```
{{ Person.NickName }}'s third visit was in the {{ Person | Attribute:'ThirdVisit' | TimeOfDay }}, and the fourth visit was in the {{ Person | Attribute:'FourthVisit' | TimeOfDay }}.
```

```
Ted's first third was in the Afternoon, and the fourth visit was in the Morning.
```

**Note:**  
The time period returned by this filter is determined as follows:
- Morning - 5:00:00am - 11:59:59am
- Afternoon - 12:00:00pm - 04:59:59pm
- Evening - 05:00:00pm - 08:59:59pm
- Night - 09:00:00pm - 04:59:59am

 

# ToMidnight

Server: v8.0 Mobile: v1.0

Sets the time to midnight for a specific day.

**Additional Details**

**Example:**

```
"Person": {
    "LastOfficeVisit": "2/13/2011 8am"
}
```

```
{{ Person | Attribute:'LastOfficeVisit' | ToMidnight }}
```

```
2/13/2011 12:00:00 AM
```


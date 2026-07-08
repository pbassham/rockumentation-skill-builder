---
description: "Use when a user needs to work with dates in reporting, perform year-over-year calculations, or understand how to use the Analytics Source Date table for date-related queries"
source: "https://community.rockrms.com/documentation/bookcontent/35/353"
sourceLabel: Business Intelligence
---
> **Path:** Business Intelligence > Using Analytics Source Date

Using Analytics Source Date

Working with the calendar in reporting can be difficult. Different months have different numbers of days, there are leap years to account for and individual weeks can cross months or years. Getting year-over-year or quarter-over-quarter calculations is especially challenging given these factors. That's where the *Analytics Source Date* table can help.

# Analytics Source Date Table

The Analytics Source Date table ships with Rock and contains a row for every date from about 100 years ago through to about 100 years from now. So whatever date you're looking for, there should be a row in the table for it. Using the different properties of the Analytics Source Date table provides ways to approach dates and date-related data that would be much more complicated, and less performant, if you had to do all these calculations yourself. It's a powerful tool that you'll find yourself using more as you get more familiar with it.

Many properties for each date are listed in the table. One that you'll want to be aware of is the *DateKey* property, which can be used to link the Analytics Source Date table to a variety of other tables throughout Rock. For instance, the MetricValue table has a property called *MetricValueDateKey* which provides the date associated with a metric value in a format that can be used to join to the Analytics Source Date table's DateKey property.

Besides MetricValue, other tables that have a Date Key property you can use to link to Analytics Source Date include:

- Analytics Tables
- AttendanceOccurrence
- BenevolenceRequest
- Communication
- ConnectionRequest
- FinancialPledge
- FinancialTransaction
- Interaction
- Registration
- Step

Aside from DateKey, you'll find many other useful properties in the AnalyticsSourceDate table. For instance, you can get different formats of the date. You can also see the day of the week that the date is (e.g., '0' for Sunday, '1' for Monday). For each date you can also get the associated Sunday Date, which month the date is in for giving, as well as a variety of Calendar and Fiscal Year data showing things like which quarter or week the date falls in. There are also indicators telling you if the date is a holiday, or if the date falls within the week of a holiday.

The last property of the Analytics Source Date table is called *Count*. Every date in the table has the same value of '1' for this property. This lets you easily do counts against the dates. For instance, if you have two different dates then you could get all the records between those two dates and simply sum up the Count property to give you the number of days between the two dates.

For additional information on the Analytics Source Date table and its properties, check out [this video](https://www.triumph.tech/videos/date-keys).

# Using Week Of Year

Providing year over year comparisons of metrics can be very helpful. Unfortunately, it can also be difficult and taxing on the server to implement. To help ease the creation of these metrics and reduce the processing load on the server you can use the *WeekOfYear* column on the AnalyticsSourceDate model. This field represents the week number of the day within the year for a Monday to Sunday week (just like the name suggests).

Since dates are incredibly difficult to standardize, there are a few points you should understand about how this field is calculated.

1. Date processing is very difficult due to the non-standard nature of time units (7 days in a week and 365.25 days in a year). While there are several 'standardized' (e.g., ISO 8601) ways of calculating the week number, none of them are <cough\> standards. Each has strengths and weaknesses. The calculation described below seeks to provide a standard that works well for churches. While it's not perfect for all use-cases, we feel that it's very helpful when comparing weekly metrics, especially across years (comparing this week to the 'same' week last year).
2. For the sake of comparison, we wanted to ensure that every week number represents a full week.
3. The week of the year is calculated for the Sunday Date and then applied to every day in the week. Keep in mind that Sunday is typically the last day of the week (this can be adjusted in Rock). That means that days at the end of the year could apply to week one of the next year if their Sunday is in the new year.
4. There will be some years with 53 weeks in them. This happens roughly every 5.64 years (when the first of the year is a Sunday or Saturday on a leap year). This week won't have a previous year’s week to compare to. It's up to you how this is addressed in your dashboard. You can choose to show it as an outlier or filter it out.
5. Because of the fact that a week of the year can span two different years, it's important that your date filtering not use the Date property, but instead the SundayDate property. To help with this, use the SundayDateYear property to filter by year. Note that if for some reason you really don't want to include the data from previous years you could use CalendarYear. This will mean, though, that the first month/week of the year might not be a full seven days.

There is also a property called *WeekCounter* that is the week number for all time (at least since 1/1/1870 the first date in the table). This field is helpful to key off of if you want to compare this week to the last x weeks using SQL windowing functions.


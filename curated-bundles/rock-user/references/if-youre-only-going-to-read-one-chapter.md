---
description: "Use when understanding the foundational concepts of report structure, including filter criteria versus display criteria and designing reusable reporting components"
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > If You're Only Going to Read One Chapter

If You're Only Going to Read One Chapter

OK, now that we have your attention... Before diving into the tools let's start with a discussion on strategy. It's tempting to want to start writing your first report. But trust us - this chapter will save you countless hours and the embarrassment that comes from delivering conflicting and incorrect reports.

The usual workflow for application reporting goes something like this:

1. Get a request for a report.
2. Write the report per the request.

Seems pretty logical, right? This is actually a great strategy if you only get one report for the lifecycle of the application. Well, that's never going to happen! We all know you'll need to write hundreds of reports over the lifetime of the application. The problem is that many of these reports will have lots of similar requirements, with just small differences. Eventually, you'll end up wasting a good amount of time writing almost the same reports. If you're not careful, some of them might even conflict with each other. So why not slow down and create a strategy of re-usable reporting components? Ok, that sounds like a plan!

When designing Rock, we resisted the urge to rush and make a traditional ad-hoc reporting tool. We looked back at the years of lessons learned (embarrassingly enough there are many of them) and designed an architecture that allows you to build a reporting strategy.

# What Makes Up a Report?

There are two facets to any report: filter and display criteria. Consider this example. Your organization's leader walks in your door and asks for a list of attendees over the age of 18 who began attending within the last two years. They would like to have the names, contact information and the number of times they have attended. Using this example, let's look at each of the facets of reporting.

1. **Filter Criteria:** These are the criteria that limit the results to display. They answer the "Who" part of the request. In the case of the example, the criteria would be:
	1. Attendees
		2. Greater than 18 years of age
		3. Began attending in the last two years
2. **Display Criteria:** Once the results are filtered you must display them, with the necessary attributes, to the person using the report. In the case of our example, these attributes might be:
	1. Name
		2. Phone
		3. Email
		4. Address
		5. Number of Times Attended

Once you create your handy report for your leader, it's very likely they'll be back asking for further changes. Perhaps now they want another report with the same logic but only showing females. In most systems you'll have to start over and make a copy with the addition of the new criteria. Now you have two very similar reports to maintain.

With Rock, we have deliberately chosen to split the filter and display activities in reporting. You create your filters by defining *Data Views*. You then create your display by creating *Reports* that use the *Data Views*.

# Reporting Strategy

The strategy part of reporting comes from the definition of your *Data Views*. It will be tempting to quick-write a very specific data view for each report. Consider, though, that data views can extend and build off of each other. For instance, you might create a data view that filters *Adult Members & Attendees* and then create a new data view that uses this view and adds the criteria of female gender. You’ve now created two views that can be used for the report at-hand AND in future reports. What’s more, if you ever need to redefine what makes an *Adult Member & Attendee*, you can change it in one place and all reports that are built off of that view will get the new definition. These two data views are available out-of-the-box with Rock. Consider the results of these views on the Rock sample data in the figure below.

![Dataview Sample](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/sample-data-view-v18.png)

Sample Data View

Before starting any report, you should ask yourself:

- What, if any, criteria filter in this report might be reusable in future reports?
- What data views have I already defined that I can start with for this report?

# Warning

You can take the concept of reusable data views too far. Be sure to strike a balance between what is reusable and being overly complex.

Don't worry - we've only scratched the surface of Rock's tools. Now let's get our hands dirty learning about creating data views and reports as well as learning about Rock's other reporting tools.


---

## Taking Off With Reporting {#taking-off-with-reporting}

> **Path:** Taking Off With Reporting

This skill catalogs the chapters of *Taking Off With Reporting* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Taking Off With Reporting > Welcome

There's no use putting data into a system if you can't get it back out. In fact, the tools to report and display your data are much more important than the entry tools. Rock's reporting and analytics tools were some of the first features to hit the drawing board. We based them on years of real-world experiences – previous successes and lessons learned. We hope that you'll take the time to not only learn how to drive the tools, but more importantly, how to build a successful reporting strategy that provides consistent and reliable results.

Let's get started.


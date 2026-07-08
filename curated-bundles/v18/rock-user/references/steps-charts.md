---
description: "Use when understanding how to read and interpret Rock RMS steps activity charts, including stacked vs overlapping areas and filtering options"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Steps Charts

Steps Charts

In prior sections we only briefly mentioned the charts you’ve seen on the administrative screens. Now that we’re more familiar with the data behind those charts, we’re ready for a closer look. It’s important to learn how to read and use these charts because they are truly powerful tools that provide a lot of useful information at a glance.

Unless otherwise noted, the information in this section applies to both the program and step type activity summary charts.

Let’s start by looking at the parts of the chart.

![Step Program Chart](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-program-area-line-chart-v18.png)

Step Program Chart

# Note

By default, the Steps charts are set to display the “Current Year”. This default, and the option to disable the chart entirely, can be changed in block settings.

Let’s focus on the April 2021 section of the chart below. We see the purple area reaches the “17” line on the chart. This doesn't mean that seventeen people completed the Small Group step. In this kind of chart, the Small Group area begins where the Serve area ends…they are stacked on top of each other, hence the term “stacked area chart”.

The Baptism, Starting Point Class, and Small Group steps each had four completions. Five people completed the Baptism step. Adding those up, we get seventeen total completions in April 2021 as pictured below.

![Step Program Area Chart Zoomed](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/step-program-area-chart-zoomed-v12.png)

Example Step Program Chart

# Build a Rainbow

Besides controlling the icon colors on the person profile, the highlight color you assign to a step type is reflected in the program activity summary chart. The colors you choose can make a big difference in how easy (or difficult) it is to read your chart.

Unlike the Step Program area chart, the Step Type area chart is "overlapping" and not "stacked". It's important to know the difference between these two types of charts.

In the example below, the green area (Completed) extends to the “6” line in February 2021. This actually means six people Completed the step. Also in May 2021 we see that four people Started the step, represented in blue. The blue and green areas overlap, hence the term "overlapping area chart".

![Step Type Area Chart Zoomed](https://rockrms.blob.core.windows.net/documentation/Books/39/1.16.0/images/step-type-area-chart-zoomed-v12.png)

Example Step Type Chart

# Chart Filters

Our Step Charts hold a lot of valuable information, so much that it takes some slicing to make sense of it. Let's discuss some ways to filter Step Charts.

![chart-filters screenshot](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-chart-filters-v18.png)

Chart Filters Screenshot

**1\. Measures (Trends, Totals, Campuses)**
- **Steps**: Displays total *step* numbers by type.
- **Total Steps**: Sums all *step types* per period. Ideal for spotting overall engagement.
- **Total Step-Adjusted Impact**: Calculates the total of all *step types* multiplied by their *impact weight*. Useful for understanding overall *impact trends*. Must have an **Impact Weight** set.
- **Impact-Adjusted Steps**: Shows how each *step type* contributes to impact by multiplying *step counts* by *impact weight*. Must have an **Impact Weight** set.
- **Engagement Type**: Breaks down *steps* by *Milestone* and *Rhythm* categories. The *Step Type* must have an **Engagement Type** set.
- **Organizational Objective**: Breaks down *steps* by the *objective* assigned to each type. This helps leaders assess balance across ministry focus areas, such as *Outreach* and *Discipleship*.
- **Program Completions**: Displays total *program completions* for each period.
- **Avg. Total Steps Per Weekend Attendee (Campus Only)**: Displays the average number of total steps each *weekend attendee* has taken during a selected time period. For help setting up calculation of *Average Weekend Attendance*, see the *[Metrics](https://community.rockrms.com/Rock/BookContent/6/364#measurementclassifications)* section of the Admin Hero Guide.
- **Formula:** Campus Total Steps (based on your current filters) ÷ average campus attendance (rounded to the nearest whole number)
**2\. Status (Trends, Totals, Campuses)**
- **All Statuses**: Includes both completed and non-completed steps.
- **All Completion Statuses**: Shows only steps marked as complete.
- **All Non-Completion Statuses**: Shows only steps not yet completed.
- **In Progress**: Steps NOT marked as *Is Complete*.
- **Complete**: Steps marked as *Is Complete*.

The *Measure* toggle is available on the *Trends*, *Totals* and *Campuses* chart, helping you present *step-related data* in ways that make sense depending on the data you need.

The *Status* toggle utilizes the *Statuses* you have already set and filters chart data by the stage each *Step* is in.

The *Start Date* or *Completion Date* is plotted based on the *Status* you choose. For example, when you select the *All Completion Statuses* measure or any status marked *Is Complete*, the chart plots the *Completion Date* instead of the *Start Date*.

# Chart Types

Below are examples of the charts you can view for a *Step Program*.

## Trends

The *Trends* chart helps you see participation momentum over time. Use peaks to identify when engagement is most common and dips to detect potential disengagement. Each line represents a *step type*, letting you compare participation across activities such as *Baptism* or *Small Group*. Filters for *Campus*, *Measure*, and *Status* help you isolate data and uncover key ministry trends. There are two ways to view this chart:

### Line Chart

![line-chart-ss](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-program-area-line-chart-v18.png)

Line Chart Screenshot

# Quick Chart Tips

Click a *Step Type* in the key to temporarily hide its data from the results. This works on both the *Trends* and *Campuses* charts.

### Bar Chart

![bar-chart-ss](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-program-area-bar-chart-v18.png)

Bar Chart Screenshot

# Smart Charts

If your bar chart includes 15 or more bars, they will display horizontally to make them easier to read.

# Ministry Seasons

Our *trend charts* are an effective indicator of when your organization's "seasons" are. In this example, engagement is high right before summer, then drops dramatically. You may have had that feeling already, now you have stats to back it up!

## Totals

*Totals* provide a snapshot of overall engagement volume. Use this chart to see which *step types* dominate participation during a given period. Hover over bars to view specific counts and compare activity across months.

![totals-chart-ss](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-totals-chart-v18.png)

Totals Chart Screenshot

## Campuses

This chart visualizes how each *campus* contributes to total *step completions*. It helps ministry leaders assess which *campuses* have engagement growing steadily and which may need additional engagement strategies.

![campuses-chart-ss](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/campus-chart-v18.png)

Campuses Chart Screenshot

## Flow

*Rock's Step Flow chart* gives you powerful insights into your *step program*. This diagram shows each *step* in your program and visually illustrates how people move from one *step* to another or stop after a certain *step*. Pay close attention to areas where people drop off. We'll show you how to spot those.

![flow-chart-ss](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-flow-page-v18.png)

Flow Chart Screenshot

You'll want to pay special attention to the empty areas to the right of the colored bars. These areas reflect program abandonment, or *step falloff*. You'll want to investigate why people stop participating in the program after certain points. The *Step Flow* lets you visually see where those points of *step falloff* are, to identify areas where changes in your program might be needed.

As you can see, the *Step Flow* provides great insight into how people move from one *step* to another (or stop moving entirely) throughout your program. That might be all you need, but there's more to be seen. Hovering your mouse over the colored bars or over the gray flow lines will give you additional details, providing further insights.

![step-flow-hover-text-v18](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-flow-hover-text-2-v18.png)

Step Flow Hover Text


---

## Steps Badges {#steps-badges}

> **Path:** Engagement > Steps Badges

Steps Badges

You have the option of displaying badges for your step programs, to quickly and easily view an individual’s progress from places like the *Person Profile* page or Connection Requests.

To add Steps badges, first navigate to Admin Tools \> Settings \> General \> Badges and add a row to the badge list. A single badge should be set up for the entire program (and not one badge for each step in the program) using the page below.

![Steps Create Badge](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/steps-create-badge-v18.png)

Edit Badge

![Badge Normal Display](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/pers-profile-steps-badges-normal-v18.png)

Example "Normal" Display Mode

![Badge Condensed Display](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/pers-profile-steps-badges-condensed-v18.png)

Example "Condensed" Display Mode

# Note

The “Show Count on Badge” setting we mentioned in the [Editing Step Types](#editingsteptypes) section only applies to the “Normal” display mode.

After you’ve set up your new badge, the next step is to add it to the *Person Profile* page.

From the person profile, click the button in the *Admin Toolbar*. This will display a block properties button for each block on the page. Hover over the badge container block and select its button. The *Badges* page pictured below will appear, where you can select your new badge to have it added to the bar.

![Badges](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/pers-profile-block-badges-v18.png)

Badges

Check out our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#badges) if you want to learn more about badges in general.


---

## Streaks Overview {#streaks-overview}

> **Path:** Engagement > Streaks Overview

Streaks Overview

Before we get started, you should know we’re not finished with our work on streaks. We’re excited to show you what we have so far, but there are still a lot of features that aren’t quite ready just yet. Still, there’s plenty to see and do, so let’s dive in.

Streaks takes attendance data to the next level by helping you find and analyze meaningful engagement patterns. So, what does that mean? Whether or not you’re into sports, you’ve probably heard people refer to a team or a player as being on a ‘winning streak’ or a ‘losing streak’, which just means they’ve won or lost several times consecutively. Streaks in Rock is similar, except we’re talking about attendance or, in a broader sense, engagement.

The most basic definition of streaks is that it tells you how many times in a row someone engaged at your organization. But, even though it’s very cool to know that someone is showing up for their 16th straight weekend, that definition is insufficient because there’s a whole lot more Streaks can do.


---

## Streaks Maps {#streaks-maps}

> **Path:** Engagement > Streaks Maps

Streaks Maps

To truly understand streaks, you’ll need to understand maps, so that’s where we’ll start. These maps won’t help you navigate the globe, but they will help you navigate streaks like you’re the Magellan of Rock!

We’ve already mentioned that streaks are used to find engagement patterns. Maps are what Rock uses to collect and analyze the data needed to find those patterns.

There are three kinds of maps:

- **Occurrence:** The occurrence map defines when it’s possible to participate in something. This gives a framework for deciding if an individual has been participating regularly or not. After all, how can you tell if someone missed a meeting if you don’t know there was a meeting scheduled?
- **Engagement:** The engagement map tells you when an individual has or has not participated in something. In effect, you can think of it as a person’s attendance. However, it’s important to know that the engagement map isn’t just a fancy new name for attendance. The two share many characteristics but are not the same.
- **Exclusion:** In school you may have been introduced to the concept of ‘excused’ versus ‘unexcused’ absences. An excused absence is acceptable, but an unexcused absence might have negative consequences. The exclusion map is for tracking excused absences. Exclusions don’t prevent a streak from being positively affected by an attendance, but absences are ignored and don’t cause streaks to be broken. Exclusions can be provided for an individual or a location. Exclusions on locations can be used for events like snow days or other circumstances that might close a campus.

All three of these maps are used to calculate streaks. For example, let’s say you want to calculate someone’s streak in a recurring weekly meeting. You would need to know when meetings were held (occurrence map), which meetings someone attended (engagement map) and whether missed meetings should be forgiven (exclusion map).


---

## Streak Types {#streak-types}

> **Path:** Engagement > Streak Types

The streak type tells the system where and when to look for streaks. For example, do you want to track weekend attendance at the Main Campus since it opened? Or do you want to track small group attendance at the West Campus starting six months ago? All that gets built into the streak type setup. A streak type also contains the people for whom you want to track streaks.

To manage your *Streak Types*, head to People \> Engagement \> Streaks. From here you can see streak types you’ve already set up, along with some basic information about each. You can also add or delete streak types.

We’ll start by reviewing what you can see on this page. We’ll explain the setup in the next section.

![Streak Types List](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-types-list-v18.png)

Streak Types List

Don’t worry if you’re not sure exactly what all of this means yet. What’s important for now is to be familiar with the page in general. We’ll get into the details in the next section.


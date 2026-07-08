---
description: "Use when understanding Rock's Business Intelligence tools, their purpose compared to standard reporting, and how BI analytics models work for data analysis and dashboards"
source: "https://community.rockrms.com/documentation/bookcontent/35/353"
sourceLabel: Business Intelligence
---
> **Path:** Business Intelligence

This skill catalogs the chapters of *Business Intelligence* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Business Intelligence {#business-intelligence}

> **Path:** Business Intelligence > Business Intelligence

Business Intelligence

Business Intelligence is a buzz word for tools that allow you to quickly analyze data and present actionable information to leaders. In large organizations, these tools usually are separate from the normal day-to-day systems, but in Rock we’ve simplified the process and built the tools right in.

# Why You Need Rock's BI Tools

With all of the reporting tools in Rock, why do I even need the BI capabilities? That’s a great question! It really comes down to speed and simplicity. Think about your kitchen. It’s nice and neat with everything having its place (even if yours isn’t, pretend it is). For your normal meals, this is great and organized, nothing is ever lost. That’s Rock’s normal mode (we’d say “transactional mode”).

Now let’s consider a Thanksgiving feast for thirty people. To speed up the cooking you’re probably going to pull everything you need out of the cupboards and line it up in the order you’ll need it. As you start wanting to run large reports and find insights into your data, Rock needs to do the same thing to stay efficient. It needs to arrange the data in a different fashion that’s optimized for speed.

Most systems don’t do both the daily cooking and the large meal. They require you to manually design the process for large analytics tasks. Rock’s BI tools simplify this process and automate much of it. You still need to provide it with a little guidance on what you’d like to see, but it’s much easier than traditional systems.

As a part of this process, Rock will create a set of new tables (aka, models) that contain a simplified version of your data that is very fast to process. These tables will need to be updated on a routine basis. We’ll discuss how you set that up a little later. It’s important for you to know, however, that the BI Analytics models are not updated in real-time. They represent a snapshot of the data from the last time the analytics jobs ran (typically nightly).


---

## How The BI Tools Are Used {#how-the-bi-tools-are-used}

> **Path:** Business Intelligence > How The BI Tools Are Used

How The BI Tools Are Used

Once the BI tools are configured and running, they’re ready for you to use them for reporting. There are a couple of areas where you can apply these tools.

1. External BI Tools – There are a host of external BI tools that you can use to create rich reporting and dashboard environments. Two of the most popular are Microsoft’s PowerBI and Tableau. If you don’t already have a tool, we highly recommend Microsoft’s PowerBI for its power and cost. You can use the desktop tool for free and PowerBI Pro is only $3.00 per month per user for non-profits. While these tools will feel a bit overwhelming at first, once you learn the basics, you’ll be making incredible interactive dashboards at the drop of a hat.
  
3. Rock Reporting Enhancements – Many of Rock’s internal reporting tools can also optionally use the BI tables to increase the speed at which they run. (Note, though, that these tables are a snapshot of when they last ran, so they don’t show real-time data). For instance, the *Total Giving* report select can be optionally configured to use the Analytics tables.


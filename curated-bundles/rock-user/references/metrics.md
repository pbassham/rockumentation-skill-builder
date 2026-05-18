---
description: "Use when configuring metrics, understanding metric structure, or setting up performance indicator tracking in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > Metrics

> "What’s measured improves."
> 
> \-Peter Drucker

Using metrics can help provide your organization with a framework for improvement by tracking key performance indicators. Metrics describe what’s going on under the hood of your organization.

Rock includes a full set of features for tracking and displaying metrics. First let's walk through how we define metrics and then we'll look briefly at how we can present metrics in some useful ways.

![Example Metric](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/metric-view-v18.png)

Example Metric

# Anatomy of a Metric

Metrics are defined with categories, very similar to data views and reports. This allows you to organize them in a way that makes sense for your organization. One thing that is unique about metrics is that they can be linked to more than one category. This allows you to re-use them in several areas of your metric hierarchy.

So how do we create a new metric? Administrating metrics is done under Tools \> Metrics. For our example we'll create a new metric that displays the number of adult members and attendees we’ve had each week. Here are the details of the completed metric with callouts for each field.

![Metric Edit](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/metric-edit-v18.png)

Metric Edit

# Supercharge Your Metrics with Lava

Using Lava as the data source for your metrics is powerful. With Lava entity commands you can now access data from external systems and include it in your reporting. For example, you can use the web request command to make remote API calls and pull bank account balances from your accounting system, data from Planning Center, or info from Church Metrics. When it comes to Lava and reporting, the sky is the limit! To learn more about Lava, go to [https://community.rockrms.com/lava](https://community.rockrms.com/lava).

# Measurement Classifications

*Measurement Classifications* help Rock unlock deeper insights from your metrics by adding meaning and context to the data they capture. Each metric in Rock can be assigned a specific classification that indicates exactly what that metric measures. For example, you might classify a metric as "Total Weekend Attendance" to give Rock a clear, consistent understanding of that data point across all systems.

The *Measurement Classifications* that ship with Rock are listed below:

- **Total Weekend Attendance:** This metric measures the total weekend attendance for the organization, partitioned by campus and schedule.
- **Volunteer Attendance:** Measures the number of volunteers that served for the given week. Partitioned by campus and schedule.
- **Prayer Requests:** The number of active prayer requests for the given week. This metric should be partitioned by campus.
- **Prayers:** The number of prayers for the given week. This metric should be partitioned by campus.
- **Active Families:** The number of active families in the given week. This metric should be partitioned by campus.
- **Baptisms:** The number of baptisms in a given month. This metric should be partitioned by campus.
- **Giving:** This metric represents weekly giving. It's up to you to define the financial accounts that make up this metric. This metric should be partitioned by the campus of the financial account. Review the account list in this metric to decide if you want to modify the `@Accounts` variable.
- **eRA Weekly Wins:** Tracks the number of individuals who attained eRA status within the current week. This metric should be partitioned by campus.
- **eRA Weekly Losses:** Monitors the number of individuals who exited eRA status in the current week. This metric should be partitioned by campus.

Using one metric for each classification ensures that we have a single, reliable source of truth for critical data like attendance or giving. This accuracy allows Rock to automate tasks, create reports, and even generate future features that draw directly from your specific metrics, tailored to match what each metric represents. Without *Measurement Classifications*, Rock could only see raw data points. Now, it knows what each one means.

![Measurement Classification](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/metric-measurement-classification-v18.png)

Measurement Classification

To use *Measurement Classifications* effectively, select the correct classification for applicable metrics and be sure to configure your metrics precisely as specified. Each classification is associated with a Defined Value, which outlines essential configuration requirements for that metric. Think of these requirements as a blueprint. They help ensure the data tagged with a classification fits consistently within Rock’s framework. If a metric doesn't exactly match these requirements, it shouldn't carry the classification, since even small discrepancies could lead to inaccurate results.

## Total Weekend Attendance

Total Weekend Attendance is a core metric in Rock. It answers a simple question: how many people attended this weekend. It also powers several features that depend on solid attendance totals.

### How it works

Rock uses the Metric that uses the Measurement Classification intelligently named... *Total Weekend Attendance*.

### How it's calculated

Out of the box, Rock uses a SQL script that does the following calculation.

*Total Weekend Attendance* =  
Total Adult Attendance  
\+ Total Volunteer Attendance  
\+ Total Student Attendance  
\+ Total Children's Attendance

### Where it's currently used

These are only current examples as Rock references Total Weekend Attendance in several areas. Getting this metric right keeps those areas accurate.

- *[Campus Average Attendance](https://community.rockrms.com/Rock/BookContent/9/368#trackingcampusaverageattendance)*
- *[Step Charts](https://community.rockrms.com/Rock/BookContent/39/362#stepscharts)* (Uses Campus Average Attendance)

# Partitions are Important

You can change our SQL if your organization totals attendance differently, but you need to keep the Campus and Schedule partitions so totals roll up and display correctly across reports and dashboards.

We plan to expand how Rock uses this metric over time with more insights and automation.

# Entering Metric Values

There are two types of metric values you can enter. Each one is discussed in detail below.

![Metric Entry](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/metric-entry-v18.png)

Example Metric

## Measures

Measures are the actual values for a metric. In most cases they contain a date/time and a value. You also have the option to provide a note. This is helpful to explain outliers or special situations.

## Goals

It's often good to track goals for your metrics. This lets you see how well you're actually doing. Goals can be entered with broad date ranges if you want. For instance, if you'd like to set a single goal value for the entire year, you could simply add two goal values. One for January 1<sup>st</sup> and the other for December 31<sup>st</sup>.

# Metric Charts

The easiest way to view metrics values is to look at the charts that appear above the metric definition. This will show you all of the values entered for the metric. You can edit the *Metric Detail* block's settings to change what the chart shows and how it looks.

If you would like to have more options for displaying metrics, take a look at the [Metrics Dashboards](#metricsdashboards) chapter below.

# Service Metric Entry

You'll often have the need to enter metrics that follow the partition pattern of "Campus \> Sunday Date \> Service Time". We've created a simple entry page for you to enter these types of metrics into. You'll find this page under Intranet \> Weekly Metrics. Click the drop-down menus along the top of the block to select the service for which you want to add metrics.

![Service Metric Entry](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/weekly-metrics-metric-entry-v18.png)

Weekly Service Metric Entry

Pictured below, there are several block settings that allow you to configure the block, the metrics you wish to enter and how the metric date should be determined. Please note that the image below is an Obsidian block.

![Service Metrics Entry](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/weekly-metrics-entry-v18.png)

Weekly Metrics Entry - Block Settings

Below, you'll find an alternative view of the *Weekly Metrics* page, showcasing the activation of some of the optional block settings mentioned earlier. Specifically, the options related to the metric categories.

![Weekly Metrics Entry - Category Subtotals](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/weekly-metrics-entry-with-category-subtotals-v18.png)

Weekly Metrics Entry - Category Subtotals

# Calculating Metrics

Metric values can be added using the methods described above. However, metrics that use a *Source Type* of SQL, Data View or Lava can be automatically calculated based on a schedule you provide when editing or creating the metric. The calculations are performed when the *Calculate Metrics* job is run. As pictured below, this job runs once every 15 minutes to process any metrics that need to be calculated based on their schedule. If you have a SQL metric that takes a long time to process, you can adjust the *Command Timeout* job setting to allow the calculation to be completed.

![Calculate Metrics Job](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/calculate-metrics-job-v18.png)

Calculate Metrics Job

Metrics can also be calculated on demand, rather than waiting for the Calculate Metrics job to calculate the metric based on its schedule. Simply click the button pictured below to calculate any metric that uses SQL, Data View or Lava as its *Source Type*. Manually calculating a metric in this way will not disrupt the schedule on which it normally calculates.

![Calculate Metrics Run Now](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/calculate-metrics-run-now-v18.png)

Calculate Metrics Run Now


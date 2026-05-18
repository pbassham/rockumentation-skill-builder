---
description: "Use when users need to create or configure metrics dashboards with chart blocks like line charts, pie charts, or Lava templates in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > Metrics Dashboards

Metrics Dashboards

We've seen that metrics provide a limited graphing capability for viewing their values. What if you want to create enhanced dashboards for viewing your metrics? Rock ships with several blocks to help you create rich dashboards based off of metrics.

# Anatomy of a Dashboard

![Dashboard Parts](https://rockrms.blob.core.windows.net/documentation/Books/6/1.17.0/images/dashboard.png)

Dashboard Parts

# Dashboard Blocks

Rock ships with several dashboard widget blocks. Each of these blocks is shown below.

## Line Chart

![Line Chart](https://rockrms.blob.core.windows.net/documentation/Books/6/1.17.0/images/dashboard-linechart.png)

Line Chart

This block displays a line chart for the selected metric. Options include:

| Title | Description |
| --- | --- |
| Name | This is the block name. It is not displayed anywhere on the output of the block. |
| Title | The title that is displayed for the metric. |
| Subtitle | The subtitle for the metric. |
| Column Width | The number of Bootstrap columns the chart should use for its width. (A Bootstrap row, by default, has 12 columns.) |
| Chart Style | The chart style to use. These styles are defined under Admin Tools \> Settings \> Defined Types \> Chart Styles. |
| Metric | The metric to use for the chart. |
| Partition Filter | Determines how the chart will get the series partition value. It can be either hard coded or determined from the page context. |
| Date Range | Determines which values are displayed on the graph. |
| Detail Page | This optional setting will determine which page will be loaded when the graph is clicked. |

# Pie Chart

![Pie Chart](https://rockrms.blob.core.windows.net/documentation/Books/6/1.17.0/images/dashboard-piechart.png)

Pie Chart

This block displays a pie chart for a given metric. Options include:

| Title | Description |
| --- | --- |
| Name | This is the block name. It is not displayed anywhere on the output of the block. |
| Title | The title that is displayed for the metric. |
| Subtitle | The subtitle for the metric. |
| Column Width | The number of Bootstrap columns the chart should use for its width. (A Bootstrap row, by default, has 12 columns.) |
| Chart Style | The chart style to use. These styles are defined under Admin Tools \> Settings \> Defined Types \> Chart Styles. |
| Metric Value Type | Determines what metric value types should be displayed on the chart, goals and/or measures. |
| Metrics | The metrics to use for the chart. Each metric will represent one slice of the pie chart. |
| Date Range | Determines which values are displayed on the graph. |
| Detail Page | This optional setting will determine which page will be loaded when the graph is clicked. |

# Lava Dashboard Widget

![Lava Chart](https://rockrms.blob.core.windows.net/documentation/Books/6/1.17.0/images/dashboard-liquid.png)

Lava Dashboard Widget

This block renders the metric values using a Lava template. Options include:

| Title | Description |
| --- | --- |
| Name | This is the block name. It is not displayed anywhere on the output of the block. |
| Title | The title that is displayed for the metric. |
| Subtitle | The subtitle for the metric. |
| Column Width | The number of Bootstrap columns the chart should use for its width. (A Bootstrap row, by default, has 12 columns.) |
| Round Values | Round Y values to the nearest whole number. For example, display 25.00 as 25. |
| Metric | The metrics to use for the chart. |
| Lava Template | The Lava template to render the output for display. |

  

See our [Lava](https://community.rockrms.com/lava/) documentation for more information.

# Under Construction

Work is still being done on the metrics dashboard features. Expect changes that may impact configuration settings. Feel free to play with these features but don't roll them out in production just yet.


---

## SQL Editor {#sql-editor}

> **Path:** Taking Off With Reporting > SQL Editor

SQL Editor

While not technically a reporting tool, the SQL Editor page (Admin Tools \> SQL Editor) allows you to execute a SQL statement right in the browser. This makes it possible for administrators and developers to perform many tasks without requiring software like SQL Server Management Studio.

# Warning

Special Care should be taken with this tool, since it does permit UPDATES to your database. Since it is possible to quickly wipe out swaths of data, access to this page/block should be minimized to people with something to lose in return.

![SQL Command](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/sql-editor-v18.png)

SQL Editor

For additional details check out the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#sqlcommand).


---

## Business Intelligence {#business-intelligence}

> **Path:** Taking Off With Reporting > Business Intelligence

Business Intelligence

Rock's Business Intelligence features are so cool, they deserve [their own book!](https://community.rockrms.com/documentation/bookcontent/35)

Table of Contents

- [Welcome](#welcome)
- [If You're Only Going to Read One Chapter](#ifyoureonlygoingtoreadonechapter)
- [Filtering Using Data Views](#filteringusingdataviews)
- [Displaying Data Using Reports](#displayingdatausingreports)
- [Dynamic Report Block](#dynamicreportblock)
- [Dynamic Data Block](#dynamicdatablock)
- [Page Parameter Filter Block](#pageparameterfilterblock)
- [Metrics](#metrics)
- [Metrics Dashboards](#metricsdashboards)
- [SQL Editor](#sqleditor)
- [Business Intelligence](#businessintelligence)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


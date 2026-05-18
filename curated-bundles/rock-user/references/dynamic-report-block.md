---
description: "Use when configuring a Dynamic Report Block to display filtered reports that users can modify, or when creating underlying Data Views and Reports for dynamic filtering"
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > Dynamic Report Block

Dynamic Report Block

As you create reports you may find that you need to duplicate Data Views and Reports to solve similar problems. For instance, your organization may want a list of people who have a background check that's expired or about to expire. Let's say the report will be used at each of your campuses. You might be tempted to create a data view and report for each campus, but there is an easier way.

Rock provides a block entitled *Dynamic Report* that shows a specific report but also allows you to display filters of the report’s underlying data view and allows the person viewing the report to modify them. Let’s see our report in action.

![](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/dynamicreport-sample-v18.png)

Dynamic Report Block

As you can see, the block looks like the standard report grid with the addition of a filter from the data view near the top. Let's walk through the steps to recreate this.

# Create Data View

The first step is to create the data view under Tools \> Data Views that will drive the report. Here we have a few filters: campus and our background check logic. Notice that we leave the campus blank. This basically says, "show any campus," which will be our "default."

![](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/dynamicreport-dataview-v18.png)

Data View Configuration

# Create Report

Next, we create the report under Tools \> Reports. Here we add in the columns we’d like to display on the report. Nothing new here.

![](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/dynamicreport-report-v18.png)

Report Configuration

# Set Up Dynamic Report

Finally, we’re ready to add our *Dynamic Report* block. After creating a new page and adding the block, we can set the block's settings. Below is a screenshot of what's possible.

Block Settings for Dynamic Report

![](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/dynamicreport-blocksettings-v18.png)

1 Results Title

The title text to use for the results grid.

2 Results Icon CSS Class

The CSS icon to use for the same grid.

3 Filter Icon CSS Class

The CSS icon to use for the filter panel.

4 Filter Title

The title text for the filter panel.

5 Report

The report we created in step 2.

---

**Filters:**  
After selecting a report, Rock will look at the data view for that report and list its filters. Each filter includes the following options:

6 Filter

The data in "Filter" is what can usually be used in a URL parameter to pre-set a filter where you'd type text. For instance, a "First Name" field might show a filter of `Property_FirstName`, in which case a URL like `/page/123/?Property_FirstName=Ted` would pre-fill and pre-filter the report for people with a first name of Ted. *Note that Campus and Campuses are special cases; since these aren't text boxes, try using `?CampusId=1` or `?CampusId=1,2` to set these.*

7 Options

For each filter in your Data View, you'll be able to configure these options which control whether the person using the report can specify which filters are used:
- **Visible:** This tells the block whether the filter should be shown to the person for them to modify. In our sample we're only letting them change the campus, so only the campus filter would have this checked.
- **Configurable:** Determines if the person should be allowed to modify the criteria of the filter. At first you might think this odd, as when would you ever not want to allow the criteria to change, but it'll make sense when combined with the next option.
- **Toggle Filter:** This setting will show the filter with a checkbox next to it. Unchecking the box will disable the filter entirely.

8 Pre-HTML

This is HTML which will be shown before the filter option at the top of the Dynamic Report block. You can use this to group controls together in a well, or change their widths using Bootstrap classes, for instance.

9 Label

The text you put here will determine what title the person will see associated with the filter. The default value of `{{ Label }}` will display the title of the filter from the source Data View filter.

10 Post-HTML

This is HTML which will be shown after the filter option at the top of the Dynamic Report block. You can use this together with PreHTML to create some neat effects and change the layout of your filters.

The *Dynamic Report* block allows you to control the filtration of multiple data views. If your report uses a data view that is based on another data view, you can set your filter to look at only the top-level data view or to use both.

As you can see, the *Dynamic Report* block is very flexible and powerful. Once you create your first one, you'll find it's one of the most popular tools in your toolbox.


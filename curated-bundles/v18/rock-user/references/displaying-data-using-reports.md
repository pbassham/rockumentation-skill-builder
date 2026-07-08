---
description: "Use when configuring report display fields, formatting data with Lava templates, or customizing how report data appears to users"
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > Displaying Data Using Reports

Displaying Data Using Reports

Now that we've selected the records we need, we're ready to define how we want our report to display. Usually this means adding fields to our report. Let’s see how this is done.

# Reuse Is Good

Separating the filtering from the display also has the added benefit that reports with separate display features can use the same filtering logic. In many systems you would have to redefine the same filters twice. This is a lot of extra work, and it's a nightmare to keep consistent over time.

You define your reports under Tools \> Reports. Like their Data View cousins, reports are also organized using hierarchical categories.

![Report Details](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/report-detail-page-v18.png)

Report Details

# Creating A Report

Let's jump right in and take a look at a report. For our example, we'll look at a report that gives the name and phone numbers of individuals with duplicate phone numbers. The figure below shows what this report would look like. The callouts for the figure explain the various steps used in the creation of our report.

![Editing a Report](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/report-detail-edit-v18.png)

Editing a Report

# The Power of Lava

You'll notice that one of your field options is [Lava](https://community.rockrms.com/Lava). Lava is a templating engine that allows you to customize the way data is presented. With this field type you can mix and match data in lots of different ways.

# One Caveat

Every field you would like to use in your Lava must be included in your report. For instance, if you want to use the *First Visit* date in your Lava, you have to have that field in your report already. (You can disable showing the field in the grid if you wish). You would access your First Visit column using a Lava Merge Field of the name of the column you want to reference, eliminating any spaces. In this case, information in the "First Visit" column would be displayed using the Lava Merge Field *{{ FirstVisit }}*. Also, you can't reference one Lava column's value from another Lava column.

Below are a few examples:

Last Name, Nick Name

{{ LastName }}, {{ NickName }}

Last Name, Nick Name as a link to the ‘Person Profile’ page

<a href="/Person/{{ Id }}"\>{{ LastName }}, {{ NickName }} </a\>

If baptized, show field as a checkmark

{% if BaptismDate != null %}
    <i class="ti ti-check"\></i\>
{% endif %}

For some fields (like Phone Number), use the dot notation to get the property you want

{{ Phone.NumberFormatted }} unlisted: {{ Phone.IsUnlisted }}

Let's pull this all together: this setup would create a report where the person's name links to their profile, and display a check mark if they are baptized:

![Lava Columns in a report](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/report-detail-edit-lava-columns-v18.png)

Editing a Report

We should point out that usually you could simply use the stock *Person Name* field to create a linked name formatted this way, without using Lava. But if you wanted to link to an alternate person profile page, this would give you full control over doing that.

You can find out more about Lava on the [Rock RMS learning](https://community.rockrms.com/lava) website.

If you want more information on using Lava in merge documents, you'll find that in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#mergedocuments).

# Let's Go Farther:

You can also create your own custom report fields with some developer knowledge. See our [developer docs](https://community.rockrms.com/developer) for all the details.

# Persisted Data Views in Reports

As you'd expect from our earlier discussion, if your report is based on a persisted Data View, the report should display much more quickly than if the Data View wasn't persisted. That's because it's not having to figure out which rows to display- that's already been calculated, so it'll just use that list.

And if your report is based on a persisted Data View that also references *other* Data Views, it doesn't actually matter (at the report level) whether those nested Data Views are persisted or not. That's because the "top level" Data View that the report is using, is persisted. So, it's not actually having to go and look up those nested Data Views at all in order to generate the report. Neat, huh?

# Securing Report Data

It’s important to know that anyone with access to a report will be able to view all the data in that report. This includes data they wouldn’t normally be able to access elsewhere in Rock. In effect, report data bypasses the person’s security rights. That might sound alarming at first, but don’t worry. Rock was intentionally designed this way, and we have some suggestions for securing your data.

First, you might be wondering why security is not applied to report data. If Rock were forced to apply a person’s security to the rows returned in a report, there would be two problems:

1. Sometimes you want to bypass security for valid reasons. For instance, let’s say you have a report that lists people who have donated to your organization so you can send handwritten thank you cards. This report doesn’t show specific gifts but does use giving data to list the individuals. The person tasked with writing the cards probably doesn’t have access to financial data in Rock. If the person’s security were applied to the data in the report, the report would not give them results because it references financial data. Now they can’t do their job and the only solution is to give them security they don’t need.
2. Performance. Let’s say your report provides a list of group members and their group. If security were enabled, the system would need to run a security check for each row in the report to see if the person viewing the report has access to the group. Remember, the security on a group is hierarchical on group structure, group member role and on the group type. All of those areas would need to be evaluated. You can see how quickly this adds up, even to the point where the report will time out before results can be returned.

So, what should you do?

It starts with the report’s author. The author is responsible for considering the security of the data they’re providing. However, keep in mind that security is enforced at the time of authoring. For instance, when building a data view the author can’t exclude groups that they don’t have access to. If group data is displayed in the report, then those groups will appear on the report, which might not be desired.

Also, don’t forget you can apply security to the reports themselves. Limiting access to the report ensures the data it contains can only be viewed by the intended individuals.

Another approach is to look for configurations outside of reporting that might provide the security you need. For instance, if there is a certain type of group you’re concerned with (like a recovery group) make sure those groups are all of a specific group type. Then you can “apply security” by limiting the group types shown in your report. You’re not actually doing anything with security but adjusting your configuration in this way can help ensure sensitive data stays secure.

As you can see, planning is important in developing data views and reports. You want to ensure that the individuals who can view the report are identified, and that provisions are made so that sensitive information does not inadvertently leak.


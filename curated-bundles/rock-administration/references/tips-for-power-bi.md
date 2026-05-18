---
description: "Use when configuring Power BI integration, scheduling BI Analytics jobs, or troubleshooting missing data in Rock Business Intelligence"
source: "https://community.rockrms.com/documentation/bookcontent/35/353"
sourceLabel: Business Intelligence
---
> **Path:** Business Intelligence > Tips for Power BI

Tips for Power BI

While a full overview of PowerBI is outside of the scope of this document, we have outlined a few important nuggets you may be interested in.

# Learn More

You should also check out the Power BI videos available at [https://community.rockrms.com/rocku](https://community.rockrms.com/rocku/business-intelligence-bi). They're a great way to learn how Power BI integrates with Rock and what it can do to supercharge your reporting.

# BI Job

Rock’s *Process BI Analytics* job keeps the data that the BI tool uses up to date. The job is located in the *Jobs Administration* screen (Admin Tools \> System Settings \> Jobs Administration). While the job ships with Rock, you need to schedule it and run it at least once for the data to be available. (If you open your BI tools and don’t see any data, this is why.)

Let’s take a look at the BI job settings and what each does.

The BI job runs a number of processes, including:

- **Process Person BI Analytics** – Keeps person tables up to date and processes historical data.
- **Process Family BI Analytics** – Keeps family tables up to date and processes historical data.
- **Process Campus BI Analytics** – Keeps campus information in sync.
- **Process Financial Transaction BI Analytics** – Processes financial transactions and adds any new transactions.
- **Process Attendance BI Analytics** – Updates attendance data.
- **Refresh Power BI Account Tokens** – Keeps account tokens from expiring.
- **Process Giving Unit BI Analytics** - Updates giving unit data.

Account tokens must be refreshed every two weeks, otherwise they expire. If you view a report, the tokens are automatically refreshed. If you go more than two weeks without viewing a report, though, the BI job will refresh the tokens for you to keep them from expiring.

Now let's look at how you can customize the BI job by enabling and disabling these settings.

# Enabling and Disabling BI Job Settings

You may wonder why you’d want to disable the BI job settings since they keep your data up to date. There are some valid reasons for disabling certain settings, though, such as if you decide not to use Power BI.

Keep in mind that the BI tables are only updated when the job runs; so, the tables aren’t 100% up-to-date every minute. You may want to update some data more often than others, running the analytics, say, four times a day as opposed to only once a day. For example, if you want to process person analytics more often than the others, you could disable the Process Person BI Analytics setting and create a separate Process BI Analytics job that runs the person analytics more often, separately from other analytics.

So, you can create multiple versions of the job to run different schedules. This gives you a lot of flexibility when it comes to processing data in a way that’s most useful to your organization.

# On-Premises Data Gateway

As you use PowerBI in the cloud you’ll want to ensure that your data is always up to date. While you can do that manually using the PowerBI Desktop application, you can automate the process using the PowerBI On-Premises gateway. This is a free tool that will keep your data in Rock in sync with the PowerBI cloud. Below are steps for getting this tool configured. If you prefer a video tutorial, this YouTube video from Microsoft covers the steps in detail: [https://www.youtube.com/watch?v=GwuRQhm241c](https://www.youtube.com/watch?v=GwuRQhm241c).

1. Download the ‘On-premises data gateway installer’ to your Rock server from your PowerBI account (located under the Download link).
2. Run the installer and select the ‘On-premise data gateway’.
3. After the install, you’ll be asked to enter an email address that is assigned to your account. This will allow you to link the gateway to your account.
4. Once your gateway is linked, you’re ready to define a source to your Rock SQL Server. To do this follow these steps:
	1. Select the Settings option on the PowerBI web portal (the gear icon), then select ‘Manage Gateways’. You should see the gateway you just named and registered listed.
		2. Place your cursor over the gateway. This should display an ellipsis. Click the ellipsis and select ‘Add a datasource’.
		3. Give your new datasource a name and enter the configuration info needed for a SQL Server Data Source Type. (Tip: you might consider using the same database username and password that is defined in your website’s connection string).
5. Finally, create a new PowerBI project using the desktop application. Connect to the same SQL Server and select the Rock BI models. (Hint, they’re the tables and views that start with the word “Analytics”).

## Considerations for Embedded Reports

Rock includes the awesome ability to embed Power BI reports right onto a page, which provides a great user experience without end users having to learn or use a special reporting client. However, this power comes at a cost. We have compiled the various options for utilizing Power BI reports in Rock and what Microsoft charges for these features below.

| Product | Price | Notes |
| --- | --- | --- |
| Power BI Desktop (Windows app) | Free | This application can be pointed at your Rock database to run BI reports at zero cost. Reports are not shareable and exist only in the local instance of the Power BI desktop app. Any number of users in your organization can run this app for free, but each would need their own local report templates to run (meaning, sharing of reports is difficult.) |
| Power BI Professional | $3/user/month (non-profit) | This is an Office365 subscription that is necessary to publish any Power BI report from the Desktop app to the cloud, which is necessary for sharing any report. You will need at least ONE license of Power BI Pro in order to publish to the cloud, and any additional users that want to see those shared reports would also need a license (unless you embed the report per below). You purchase these subscriptions within your Office 365 Admin portal. |
| Power BI Embedded | $1.0081/hour ($3500/yr non-profit Azure credit can be applied to this) | This is where you might get sticker shock. While embedding a BI report into Rock is pretty amazing (and easy), this feature does not come without cost. While Microsoft lets you get an "embed token" for free, these are ONLY intended to be used for dev/testing purposes. For "production" use, you're supposed to purchase a Power BI Embedded Node via Azure. This concept is explained in the [Power BI FAQ](https://docs.microsoft.com/en-us/power-bi/developer/embedded-faq#how-many-embed-tokens-can-i-create) and the pricing for these nodes can be found [here](https://azure.microsoft.com/en-us/pricing/details/power-bi-embedded/).      As you can see, the cheapest option is A1, which costs just over $1/hr, which comes to a whopping $735/mo if you let the node run 24x7. This puts embedded Power BI reports well out of reach for most churches. The node *can* be paused any time you don't need to use it, and thankfully you only get charged for the actual time you have the node running, but this obviously makes consuming the embedded reports in Rock much less useful, because you'd need to manually start/stop the node every time you wanted to see a report. Unless a way can be found to automate the pausing/starting of the node whenever a report is requested via Rock, this is the current reality for embedded Power BI reports in Rock. |
| Power BI Premium | $1998.00/mo (non-profit) | This option is so far out of reach that we're only mentioning it for the sake of completeness. Power BI premium also allows embedding reports (and gets around the need to purchase an Embedded Node), but the cheapest P1 version is almost $2k/mo so is a complete non-starter. If for some reason you want this version, you can purchase it via your Office365 Admin portal. |

*Prices are as of this writing and subject to change.*

Table of Contents

- [Business Intelligence](#businessintelligence)
- [How The BI Tools Are Used](#howthebitoolsareused)
- [Types of Analytics Tables](#typesofanalyticstables)
- [Using Analytics Source Date](#usinganalyticssourcedate)
- [Historical vs Current](#historicalvscurrent)
- [Customizing the Data Model](#customizingthedatamodel)
- [Tips for Power BI](#tipsforpowerbi)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


---

## Historical vs Current {#historical-vs-current}

> **Path:** Business Intelligence > Historical vs Current

Historical vs Current

You may notice that several entities have a Current and Historical table (e.g., Person and Family). These entities track changes to certain key properties and attributes over time. Let’s dive in a little deeper to understand these tables and how they can be used.

# Historical Tables

As noted, these tables track an entity over time. To do that, a single entity (like a person) may have several records in the historical table, one for each change that was made. A couple of key fields, listed below, help to keep track of these records.

- EffectiveDate – This is the date that the record started. If it’s the first and only record for a person this date will be the date the analytics tables were first loaded. If the record is a subsequent change, it will be the date of the change.
- ExpireDate – This is the date when the record was no longer the current (latest) change. If this record is the current record the date will be 1/1/9999 (which helps you with SQL compares).
- CurrentRowIndicator – This column notes the latest row for the entity.

# Current Tables

The records in these tables represent the most recent record in the Historical tables. The implementation of this is a simple view that looks for records where the CurrentRowIndicator = 1. Elegant, right?


---

## Customizing the Data Model {#customizing-the-data-model}

> **Path:** Business Intelligence > Customizing the Data Model

Customizing the Data Model

There are several ways that you can extend the BI models. Below is a discussion of each.

# Person Attributes

You can determine which person attributes you would like to have added to the BI models. You can also determine which are marked to track history. Tracking history allows you to see the changes to attributes over time.

![Person Attribute Analytics](https://rockrms.blob.core.windows.net/documentation/Books/35/1.18.0/images/person-attributes-enable-analytics-v18.png)

Person Attribute Analytics

# Family Attributes

Like Person attributes, you can also mark specific family attributes to track their changes.

# Calendars

Part of what makes the BI models so fast is how they handle dates. Each day has a row in a large date table. Along with the actual date is stored the year, month, quarter, etc. This allows the data to be filtered, or sliced, very quickly. Because some of the date information centers around fiscal years, which can be different for each organization, Rock allows you to customize the calendar dimension settings. You can configure this under Admin Tools \> System Settings \> Calendar Dimension Settings.

Keep in mind that changing Calendar Dimension Settings can be risky. For instance, changing the Start Date to a date in 2020 means nobody born before 2020 will show up in a data view looking for people by age.


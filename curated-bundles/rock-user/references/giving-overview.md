---
description: "Use when looking up a person's giving patterns, donation history, trends, and financial stewardship metrics in Rock Solid Finances"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Giving Overview

The Giving Overview features provide detailed analyses of a person's giving and provides you with innovative alerts when an individual’s giving patterns change. Keep in mind that this feature is not about money, but instead about shepherding. This feature allows you to respond to life changes as well as celebrate with individuals when they make the decision to trust God with their finances. It's all about measuring heart change.

In this chapter we'll explore the different parts of the Giving Overview, how it can be used and the configuration that drives how it works.

# Person Profile Giving Overview

Giving Overview information for a person can be viewed on the Contributions tab of the *Person Profile* page. There's a lot of important information packed into the Giving Overview that lets you see many details of a person's giving habits, and changes to those habits. For instance, you'll want to keep an eye on the Giving By Month chart, to look for bars that are unusually high or unusually low, as these can be good indicators that maybe something has changed in the person's life.

Let's take a look at an example for Ted Decker. As you read through, keep in mind that each of these items is stored as a person attribute, making it easy to access this data in reporting, communications or workflows.

![Person Profile Giving Overview](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/giving-overview-v18.png)

Person Profile Giving Overview

The Giving Characteristics area of the Giving Overview is calculated by the *Giving Automation* job. The other areas are calculated when the information is accessed.

You might have noticed that we use two different methods to calculate the *Typical Gift* and *Typical Frequency*. A lot of time and effort went into ensuring that we use the right calculations the right way. As you continue to read this chapter, you'll find that anything related to a dollar amount (e.g. *Typical Gift*) uses a [median](https://en.wikipedia.org/wiki/Median) and [Interquartile Range (IQR)](https://en.wikipedia.org/wiki/Interquartile_range) to show the typical giving amount and the amount by which it varies. On the other hand, anything related to giving frequency (e.g. *Typical Frequency*) uses [mean (average)](https://en.wikipedia.org/wiki/Arithmetic_mean) and [standard deviation](https://en.wikipedia.org/wiki/Standard_deviation) to provide the typical frequency and the length of time by which it varies.

## Calculating Community View

The *Community View* is based on a typical yearly giving distribution. In the chart pictured below, the orange line represents giving amounts. The largest gifts are assigned to bin 1, while smaller gifts are assigned to bins 2, 3 and 4.

![Typical Yearly Giving Distribution](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/yearly-giving-distribution-chart.png)

Typical Yearly Giving Distribution

It's important that we not apply judgement to people based on the bins into which they are placed. We don't want to classify people based on their giving. Instead, we just want to recognize that people are in different stages of their giving. For instance, someone in Bin 4 may simply not understand generosity yet or have not yet put trust in God with their finances.

If a person goes from Bin 4 to Bin 3, we often say they've had a change of mind, while going from Bin 3 to Bin 2 is perhaps a change of heart.

If you dive deeply into the numbers, you may find that the placement into bins won't be exactly perfect. It might be off by a percent or two. This is to avoid a scenario where multiple people who gave the same amount are split into different bins. For instance, bin 1 is intended to hold the top 5% of givers but may actually contain 6% of your attendees if many of them have given the same amount or near the same amount.

# Giving Automation Configuration

There are some general settings that control how giving automation features work at a high level. These settings drive much of what you see on the Giving Overview and are used by the *Giving Automation* job. This configuration can be accessed by clicking the icon near the top right of the list of alerts under Finance \> Giving Alerts. Typically, you won't make changes to these settings once they're in place.

![General Settings](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/giving-automation-general-settings-v18.png)

General Settings

# Giving Alerts

Giving data has the potential to help you spot changes in a person's life or circumstances. Bearing that in mind, Giving Alerts are designed to let you know when something has changed in a person's giving habits, so you can take action accordingly. You might want to follow up with someone who has suddenly stopped giving, to make sure everything is okay. Or you might want to show your appreciation for someone who has given more than they usually do. Having two alerts for the same person often signals a significant life change.

There are two types of Giving Alerts. The *Gratitude* alert type is intended to identify when someone has given a large amount or is giving more frequently than they normally do. On the other hand, you'll get a *Follow-up* alert type if the person starts giving less frequently. These alerts are calculated and generated by the *Giving Automation* job and are highly customizable as you'll see below.

# Follow-up Alerts

*Follow-up* alerts should be about the frequency of giving rather than a change to the amount a person gives. For instance, a person might give a smaller amount than normal, but that gift might be in addition to their regular giving and not a sign that they're giving less.

Giving Alerts for an individual can be accessed from the *Person Profile* page under the Contributions tab. A list of all Giving Alerts can be found by navigating to Finance \> Giving Alerts. In either case, you'll be brought to a page like the one pictured below.

![Giving Alerts](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/giving-alerts-v18.png)

Giving Alerts

## Giving Alert Configuration

Now that you're familiar with what Giving Alerts look like, let's see how you can set them up. The configuration for Giving Alerts can be accessed by clicking the icon near the top right of the list of alerts under Finance \> Giving Alerts.

The Giving Alert configuration is near the bottom of the page, below the General Settings and Giving Journey settings. As you review this configuration, keep in mind that you don't want to be bugging people all the time about changes to their giving patterns. Make use of the Repeat Prevention Duration settings as described below to ensure alerts are generated at reasonable frequencies.

![Giving Alerts Configuration](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/giving-alerts-configuration-v18.png)

Giving Alerts Configuration

## Settings for Giving Alerts

Each alert has its own settings, with options that let you control exactly when the alert should occur and what actions to take when it does.

As you set up your alerts there are a few things to keep in mind. The most important part is deciding whether you're creating a *Gratitude* alert or a *Follow-up* alert. *Gratitude* alerts are great for recognizing when someone gives a larger gift than normal, or more frequently than usual. *Follow-up* alerts should be used for tracking when someone starts giving less frequently. In the next section we'll give some suggestions for how to use these settings to set up alerts of different types.

![Giving Alerts Settings](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/giving-alert-settings-v18.png)

Giving Alert Settings

# Deleting Transactions

If you delete a financial transaction that triggered an alert, the alert will also be deleted automatically behind the scenes.

## Giving Alert Examples

Now that you're familiar with the different options you have for Giving Alerts, below are some ways that you might implement them. Keep in mind these are only suggestions based on some common use cases.

- **Late Gift Alert**
- Alert Type is Follow-up
	- Positive number in the Frequency Sensitivity Scale
- **Early Gift Alert**
- Alert Type is Gratitude
	- Negative number in the Frequency Sensitivity Scale
- **Larger Gift Than Usual**
- Alert Type is Gratitude
	- Positive number in the Amount Sensitivity Scale
- **A Single Large Gift**
- Alert Type is Gratitude
	- Frequency Sensitivity Scale and Amount Sensitivity Scale are blank
	- Minimum Gift Amount has a high value
- **Large Gift for People Who Don't Normally Give That Amount**
- Alert Type is Gratitude
	- Frequency Sensitivity Scale and Amount Sensitivity Scale are blank
	- Minimum Gift Amount has a high value
	- Maximum Median Gift Amount has a value lower than the Minimum Gift Amount (first-time giver would be $0.00)

# Giving Journey

Each person can be thought of as being in a certain stage of a giving lifecycle. Has the person just started giving, or have they been giving for a while, or have they stopped giving? Rock's Giving Journey feature helps you identify which stage a person is in. This gives you insight into where their heart is, and helps you identify the changes in heart that are reflected in giving patterns.

There are six stages in the Giving Journey that a person moves through:

1. Non-Giver
2. New Giver
3. Occasional Giver
4. Consistent Giver
5. Lapsed Giver
6. Former Giver

A person is evaluated for each stage, from the top down in the order listed on the page pictured below, until a match is found. For instance, a brand-new giver who gave $1 on Monday and $1 on Tuesday would be evaluated on Wednesday as a *New Giver* even though they technically also meet the requirements for a *Consistent Giver*.

To access the Giving Journey settings, navigate to Finance \> Giving Alerts and click the icon near the top right corner of the block.

![Giving Journey Configuration](https://rockrms.blob.core.windows.net/documentation/Books/15/1.16.0/images/giving-journey-configuration-v13.png)

Giving Journey Configuration

While a lot of thought and effort went into the configuration that ships with Rock, you can customize the conditions that must be met for a person to be placed in each stage according to what makes sense for your organization.

Keep in mind that a person's current and previous Giving Journey stage are both stored as person attributes called *Current Journey Giving Stage* and *Previous Journey Giving Stage*. There's also a person attribute for the date that their stage changed, called *Journey Giving Stage Change Date*. This makes it easy to create data views, reports, SQL queries and targeted communications based on a person's Giving Journey information.

All changes to the *Current Journey Giving Stage* are written to the History table for in-depth analysis. Also, you could enable Analytics and Analytics History on the attribute for BI purposes.


---

## Family Giving {#family-giving}

> **Path:** Rock Solid Finances > Family Giving

Family Giving

By default, giving transactions are summarized by family. This means that spouses share the same giving total even if they split the duties of writing the checks.

# Multiple Families

Since Rock allows people to be in multiple families, you can choose which family their giving applies to. This can be set from their *Person Profile* page by clicking the *Edit Individual* button, then *Advanced Settings.* The *Combine Giving With* allows you to pick a specific family.

# Individual Giving

There are situations where even married couples will want their gifts split onto separate giving statements. If you leave the *Combine Giving With* field discussed above blank, it will mark the individual as giving separate from the family.


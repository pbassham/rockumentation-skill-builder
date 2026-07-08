---
description: "Use when questions involve setting up fundraising opportunities, managing fundraising groups, displaying fundraising campaigns publicly, or tracking fundraising progress and payments"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Fundraising Groups

Fundraising Groups

It's unfortunate, but sometimes it takes money to do good in this world. Whether it's money to pay the travel expenses of a mission trip or the small salary of an internship, costs can become a roadblock for many individuals. But when the community can be made aware of these needs, the burden of costs can be shared. The problem then becomes promoting the need and managing the transactions that are generated. Rock's fundraising features make quick work of both problems. Think of it as a mini Kick-starter just for your organization's needs! Let's dive in and see this feature at work.

Fundraising needs are stored as a new group inside Rock. These groups are created with the group type *Fundraising Opportunity*. This group type provides several group and group member attributes that will drive the fundraising features within Rock.

Each group will represent a specific type of fundraising activity. Examples include:

- A specific mission trip (e.g., *Summer China Mission Trip*)
- A specific type of fundraising (e.g., *Summer Interns*, *Fall Sports Season*)

# Fundraising Walk Through

Keep in mind that each fundraising opportunity is a group. You'll manage the opportunities from the Group Viewer.

![Fundraising Opportunities - Group Viewer](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/walkthrough-group-v18.png)

Fundraising Opportunities - Group Viewer

Ok, but that's the boring part. Let's start looking at how these groups are displayed on your external site! Out of the box Rock configures several pages to view fundraising opportunities. The pages are displayed under the Missions pages (found under the Connect menu item). The missions page lists the various opportunities that are marked *Show Public*. Keep in mind that this block can be filtered by the *Fundraising Opportunity Type* (e.g., Trip, Internship, Project).

![Fundraising Opportunity List](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-opportunitylist-v15.png)

Fundraising Opportunity List

Selecting one of the opportunities will take you to its detail page. In the example below, Ted (who is leading this particular mission trip) is viewing the page. Since we know it's Ted, a summary of his Fundraising Progress is shown. Links are also displayed to take him to his participant's page and for him to make a payment. Also, note that since Ted is a leader for this opportunity, he has access to a leader toolbox.

![Fundraising Opportunity Detail - Leader](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-detail-1-v15.png)

Fundraising Opportunity Detail - Leader

Pictured below is the same page, but with a fundraising group that's configured to use families. In this case both Ted and Cindy are in the group, and their individual fundraising goals become combined into a single family goal. Note there is a single Make Payment button for the family, but each member has their own Participant Page.

![Fundraising Opportunity Detail - Family](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-detail-1-family-v15.png)

Fundraising Opportunity Detail - Family

This page is also used for the general public to view. It allows them to easily register for the opportunity if a registration instance was provided.

![Fundraising Opportunity - Public](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-detail-1-public-v15.png)

Fundraising Opportunity - Public

Fundraising Opportunities can also optionally be configured with a Content Channel for providing updates. When configured, a new tab will be shown to display these updates.

![Fundraising Detail - Updates](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-detail-2-v15.png)

Fundraising Detail - Updates

Another optional setting is to allow commenting on the opportunity. This tab will display a Rock notes control. Keep in mind that this feature currently doesn't allow for approving comments and does not email when new comments are added.

![Fundraising Participant Comments](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-detail-3-v15.png)

Fundraising Participant Comments

Each opportunity participant has a personalized page that they can share with others to help generate interest and help encourage funding.

As pictured below in green, red and yellow, the participant can use this page to track documents that are needed for the trip and, if configured, launch a workflow to upload those documents. These are really just [group requirements](#grouprequirements) that have been added to the fundraising group. They could be used to track things like documents, attendance in classes or background checks. In this example, Ted has a driver's license on file but hasn't provided his passport yet. He hasn't submitted his trip insurance either, but it's not due until a date in the future, so Ted is currently in a warning state.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-profile-1-v15.png)

Fundraising Participant Profile

# Viewing Group Requirements

Requirements are only visible to the individual participants, people in their family (if the fundraising group has a *Participation Type* of Family) and trip leaders.  
  
Note, this means that if Ted is logged in, he should see everyone in his family who is in the group even if he is not in the group himself. This allows him to view the details for his children and make payments.

Each participant can provide a custom opportunity introduction and edit their profile image from their personalized page. This block can also be configured to edit specific person attributes if you wish, such as the Facebook example pictured below.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-profile-2-v15.png)

Fundraising Participant Profile

If the person logged in is the participant, they can also view the gifts that have been given near the bottom of the page by selecting *Contributions*.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-profile-3-v15.png)

Fundraising Participant Transactions

If someone doesn't have a link to a participant's profile page, they can choose to give from the opportunity detail page and select the participant they would like to fund.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-donate-v15.png)

Donate to a Participant

If the fundraising group is set up for families, and if more than one person from the same family is in the group, you can give to the family as a whole.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/walkthru-donate-family-v15.png)

Donate to a Family

After selecting a participant and clicking Next from the page pictured above, the person will be brought to the *Fundraising Transaction Entry* page pictured below. There are many block settings for this block, so be sure to review them to ensure this process matches your organization's needs.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/fundraising-transaction-entry-v15.png)

Donate to a Participant

# Fundraising Opportunity Configuration

As we mentioned earlier, Rock's fundraising features are driven by a set of group and group member attributes. Let's take a look at these settings to see how you can customize each fundraising opportunity to meet your individualized needs.

Keep in mind the group and group member attributes below are specific to a single fundraising opportunity (each one is a group). This allows you to have several types of opportunities, each with their own unique settings and configuration.

## Group Attributes

Below is a detailed discussion of each setting for the group that represents the opportunity (Mission Trip, Internship Season, etc.)

| Name | Type | Description |
| --- | --- | --- |
| Opportunity Title | Text | The group name is mainly used internally. This attribute of *Opportunity Title* is what will show on the external site when opportunities are listed. |
| Opportunity Date Range | Date Range | Used to show the start and end dates of the opportunity. For a mission trip, we would recommend that you put the trip dates here. This date range doesn't control when the opportunity is shown externally; it just describes when the opportunity occurs. |
| Opportunity Location | Text | This is the location of the opportunity. For a mission trip, this would be the city or country. Feel free to leave this blank if it doesn't make sense in your situation. |
| Opportunity Summary | Memo | A brief description of the fundraising opportunity. |
| Opportunity Photo | Image | If a picture is worth a thousand words, then we'd better include one. |
| Opportunity Details | HTML | Now we get to the nitty-gritty of what this opportunity is all about. |
| Individual Fundraising Goal | Currency | This field determines how much money each person is trying to raise. If each person in the opportunity is raising different amounts, you can provide those unique amounts on their group member attribute (discussed below). |
| Opportunity Type | Defined Value | The opportunity type helps group similar opportunities. Rock ships with three options (*Trip*, *Internship* and *Project*). You can add your own under General Settings \> Defined Types \> Fundraising Opportunity Type.      This setting has two roles: - Acts as a filter for opportunities on the external website (e.g., show only mission trips on this list) - Provides a label to describe the opportunity type. For instance, should this opportunity be referred to as a *Trip*, *Project*, etc. |
| Update Content Channel | Content Channel | You may want to provide updates on the status of your opportunity. For example, if your opportunity is a mission trip, you might want to file trip reports. Or if it's a project, you might want to provide updates on the overall funding level or project status. This setting allows you to configure a content channel to manage these updates. If you don't provide a channel the updates tab will be hidden. |
| Enable Commenting | Boolean | Sometimes you want comments, sometimes you don't. When enabled, a notes block will be added to the opportunity detail. Just remember that there is no automatic email when new notes/comments are left and no approval process. These features may be added in a future release. |
| Registration Instance | Number | This is what ties in a registration to the fundraising opportunity. You must provide the registration instance ID (currently there isn't a registration instance picker). |
| Registration Notes | Memo | This short description will show up on the opportunity details page to provide any quick notes about the registration (e.g., *A $200 deposit is required*). |
| Allow Individual Disabling of Contribution Requests | Boolean | Opportunity participants can have their own personalized fundraising pages. Some participants may want to use this page to share the opportunity and provide updates, but not want to communicate the financial needs. This setting allows you the option to allow them to disable the sharing of their funding status. |
| Allow Individual Editing of Fundraising Goal | Boolean | This allows individuals to set their own fundraising goals from their external fundraising profiles. The default for this is not to allow editing. |
| Cap Fundraising Amount | Boolean | This setting determines if an individual can raise more money than their goal. |
| Financial Account | Financial Account | This configures which financial account the fundraising opportunity should use to track their money. |
| Allow Donations Until | Date Picker | An inclusive date that specifies how long to allow donations to participants. Once this date passes no more donations will be accepted by Rock. |
| Show Public | Boolean | This flag determines whether the opportunity should be displayed on the external website. Since it's common for an opportunity to be displayed long before it starts, and for a brief time after it ends, this flag is used to determine when an opportunity should be displayed. |
| Participation Type | Single-Select | This is where you select whether the participant is an individual or a family. This controls much of how people interact with the group, as noted throughout this chapter. |

  

Since many of these attributes drive the external display of the opportunity, let's look at an example and see where each value is shown.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/opportunity-detail-v15.png)

External Display of Attributes

## Group Member Attributes

The following group member attributes are available to help configure the opportunities.

| Name | Type | Description |
| --- | --- | --- |
| Individual Fundraising Goal | Currency | This allows you to provide an individual goal that is unique to each person. This attribute is only available to internal Rock administrators and cannot be edited by the individual. |
| Personal Opportunity Introduction | Memo | This is a short message that the person can provide to provide a personalized note on their individual trip page. |
| Disable Public Contribution Requests | Boolean | This allows an individual to hide their name when listing people to fund. It also hides many of the features on their personal opportunity profile that are intended to encourage someone to give. This allows them to use their personal page to communicate updates if they are self-funding the opportunity. |

# Fundraising Financial Transactions

Financial Transactions that are created from the fundraising features will all default to the *Contribution* type. The account for the transaction will be applied based on the opportunity group setting. It is possible to change the transaction type to a different value than *Contribution*. To do so, you'd need to create a new page with a *Transaction Entry* block on it. This block has a block attribute to set the transaction type on the advanced setting panel. You'd then need to configure your fundraising pages to use this new page for processing financial transactions.

# Moving Transactions

If a participant moves from one fundraising group to another, you can easily transfer the donations that were already made. See the [Moving Group Members](#movinggroupmembers) section above for details.

In Rock, financial transactions can be tied to another entity (event registration, etc.). Donations that are made as a part of fundraising will be tied to the *Group Member* of the *Fundraising Opportunity* group. There is no financial linkage to registrations. This is an important point to understand as there is no way to link money coming in to a registration with that given as a fundraising opportunity. Below we cover several ways you can configure event registration to work with the fundraising tools for maximum impact.

# Financial Transactions Matching

We've already discussed that Financial Transactions for fundraising are Contributions that are tied to the Group Members of the Fundraising Opportunity Group. The Rock tools mentioned above do all of the connecting of the group member to the transactions. You might be asking, "What about checks or gifts that need to be entered manually?" And that...is a GREAT question!

After entering contributions (either scanning and matching or through another process), you can link a contribution to a fundraising opportunity participant using the *Fundraising Matching* page found under Finance \> Fundraising Matching.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/fundraising-matching-v18.png)

Fundraising Matching

# Fundraising Progress

You can quickly track the progress of fundraising campaigns for fundraising groups. Start by going to the *Group Viewer* page (People \> Group Viewer). From this screen you can view the individual fundraising donations for each group member, below the list of group members.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/fundraising-progress-v18.png)

Fundraising Group

You can also quickly view the group's overall fundraising progress. Click the button to display a snapshot of both the combined and individual fundraising progress.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/fundraising-progress-detail-v18.png)

Fundraising Progress

If the fundraising group's *Participation Type* is Family, then the chart combines family members into a single line as pictured below.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/fundraising-progress-detail-family-v18.png)

Fundraising Progress - Family

# How Registration Can Work with Fundraising

As mentioned above, Rock's registration and fundraising tools were meant to work together. That said, financial transactions from these two features don't tie directly together. Below are some use cases to show how you can get these two features to sing in perfect harmony.

## Basic Mission Trip

In a basic scenario you would create a new event registration to capture information about the trip participant and have the registrant drop directly into the fundraising group. To enable this direct link to the fundraising group, be sure you define a linkage on the registration instance to the group. The fundraising blocks are smart enough to use these linkages in the registration process.

# Pro Tip

You can actually provide multiple linkages to have individuals drop into different groups. The linkage name will be used on the registration button on the fundraising page.

## Mission Trip with No Cost Application Process

Say you wanted to configure a mission trip in which a person needed to register and be approved before they could begin fundraising. You could use an event registration to take their application information. Once their application was approved, they would be added to the *Fundraising Opportunity* group (using the group placement tools would help with this) and they could then start their fundraising. They would use the same *Donation* page to submit their own payments for the trip.

## Mission Trip with Required Costs Paid by the Participant

Now let's say that the trip costs $1,000 and that $200 is due upfront and should be paid by the trip participant. Also, suppose that there is an optional post trip safari that a person could choose to add. In this case, you would set up an event registration for $200 with an optional fee for the safari. You would then set up the *Fundraising Opportunity* group to have an *Individual Fundraising Goal* of $800.


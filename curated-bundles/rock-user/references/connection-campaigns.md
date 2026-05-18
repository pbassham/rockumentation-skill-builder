---
description: Use when setting up bulk connection campaigns to contact multiple individuals with one-time or recurring outreach requests
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Connection Campaigns

A connection campaign is a way to generate a set of connection requests in bulk for a special purpose. The goal of this feature is to provide a simple way to create connection campaigns that allow for the contacting of many individuals. It links several of Rock’s most-loved features to work together to achieve this. Connection campaigns have been designed to work as a one-time connection or a reoccurring connection. Keep that in mind as you read through the rest of this chapter.

# Setting Up Connection Campaigns

Before diving into the details, let’s take a high-level tour of how a connection campaign works. The diagram pictured below shows the flow of a campaign.

![Connection Campaign Flow](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-campaign-flow-chart-v18.png)

Connection Campaign Flow

Because the process ends with the creation of a connection request you may wonder, "Why not just create the connection request directly?" The answer is that we realize it may take days or weeks to process through the list. We don’t want the age of the connection requests to be skewed by the date the request was created, especially if it takes several days or weeks for a connector to be assigned. It might be perfectly reasonable for a request to be waiting for someone for several days. We want to be able to measure requests by age as a reflection of how efficiently connectors are working requests. This provides good accountability to the process.

Now that we’ve looked at the feature from a 30,000-foot view, let’s dive into each component in detail.

## Connection Campaigns

We'll start with the *Connection Campaigns* page. This allows us to define as many campaigns as we’d like. You can find this list under People \> Connections \> Connections Configuration \> Connection Campaigns.

![Connection Campaign List](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-campaign-list-v18.png)

Connection Campaign List

As you can see, this lists the campaigns and provides a few metrics about each. These include:

- **Active Requests:** This is the number of active connection requests that are currently open.
- **Pending Connections:** This is the number of people still on the campaign list waiting to be moved to a connection request.

Selecting a campaign will take you to the *Campaign Detail* page.

## Campaign Detail Page

This page is the control center for a campaign’s configuration. Below we'll walk through each section of the setup.

![Connection Campaign Settings](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-campaign-settings-v18.png)

Connection Campaign Settings

# Easy Opt Outs

Consider adding a simple manual workflow on your connection request that will add the requestor to the opt out group. This allows the connector to simply click a button to keep the individual (and their family) from being contacted in the future if your campaign is set to recur.

# Working with Connection Requests

There's nothing special about working with the connection requests. A button at the top of the connections pages allows a person to create more requests from the campaign list for themselves.

![Add Campaign Requests](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-campaign-add-request-button-v18.png)

Add Campaign Requests

Pressing this button will activate a modal to ask how many requests the individual would like to create.

![Get Additional Requests](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/connection-campaign-create-requests-modal-v10.png)

Get Additional Requests

# Note

When creating new requests, the person will be assigned first to any current connection requests that do not have a connector assigned. If all requests already have connectors, then new requests will be made from the Campaign List.

# What to Know About Connectors

# Check Your Group Membership

To receive requests from a campaign, you must be a member of the *Connector Group* configured in the *Opportunity Type*. If you aren't in that group, the requests won't make it to you.

## Connector Group Campus

When the system automatically marks people as connectors, it respects the connector group settings with respect to campus. Individuals in a connector group for all campuses will be available for any new request. Those in a group for a specific campus will only be available for requests that are marked for that campus (determined by the requestor’s primary campus).

## Connector Override Settings

When configured for auto assignments, connectors can have a specified number of requests assigned to them per day. The global setting is configured for the specified campaign. This can be overridden however using group member attributes on the connector groups. The keys for these attributes are required to be:

- **CampaignDailyLimit (Integer):** The number of requests that the individual should be assigned per day.
- **CampaignScheduleDays (Days of Week):** The days that the individual should be assigned requests.

# Sample Recipes

Below are a couple of sample recipes to help you understand connection campaigns in more detail.

## Reoccurring Seniors Check-in

Say you’d like to make a calling campaign to check-in with seniors every two weeks. Below are the high-level steps you’d need to set this up.

1. Create a new Connection Type and Connection Opportunity for this new activity.
2. Add a Connection Group to the Connection Opportunity with the people who will be making the calls.
3. Create a data view with the seniors you’d like to call. This can be something like those over 65, or perhaps members of a group that a workflow from your website adds people to who have requested check-ins.
4. Create the Connection Campaign with the following settings:
	1. Choose the connection opportunity from step 1.
		2. Select the data view from step 3.
		3. Set “Family Limits” to “Everyone in the Data View”.
		4. Set “Create Connection Requests” to “As Needed” with a “Daily Limit of Assigned Connection Requests” to 10 (meaning each connector will get 10 calls a day).
		5. Set the “Number of Days Between Connection” to 14. This will create a new request 14 days after the last request is closed.
		6. Set “Prefer Previous Connector” to true, because who doesn’t like to hear from the same person each time?

A new connection request will be created for each check-in. This helps provide good accountability to how quickly calls are made. Keep in mind that the connections features will show all activity for a person across all their requests. This helps you see previous notes. It’s a win-win!

# Bonus Points

Create a manual workflow to remove the person from the group that the data view uses to create the campaign list. This allows a volunteer to simply click a button if a senior decides that check-ins are no longer required.

## Large Emergency Call List

Say there has been a local emergency and you need to make calls to reach out to numerous people in a specified area. One way to achieve this would be to follow the steps below.

1. Create a new Connection Type and Connection Opportunity for this new activity.
2. Add a Connection Group to the Connection Opportunity with the people who will be making the calls.
3. Create a data view with the individuals who need to be reached.
4. Create the Connection Campaign with the following settings:
	1. Select the connect opportunity from step 1.
		2. Select the data view from step 3.
		3. Select “Family Limits” to “Limit to Head of Household” (each home only needs one call).
		4. Set “Create Connection Requests” to “As Needed” and a “Daily Limit of Assigned Connection Requests” to 0. This will allow people to get calls in batches to fill the amount of time they have to make calls.

# Note

You could also use the setting to create all the requests at once. The only trick to this strategy is that it’s possible that two individuals could assign themselves to the same request at nearly the same time. This could create duplicate calls. In an emergency no one has time to duplicate calls.


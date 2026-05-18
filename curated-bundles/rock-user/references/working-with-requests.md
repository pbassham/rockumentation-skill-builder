---
description: "Use when managing connection requests, viewing connection boards, customizing opportunity cards with Lava, or performing bulk updates on connection statuses"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Working With Requests

Working With Requests

The connections tools can be found under People \> Connections. This page gives you an overview of your organization’s Connection Requests, grouped and summarized by each Connection Opportunity and Connection Type. This is typically how you’ll access individual Connection Requests for specific people, which you can view as either cards or in a list format, but we’ll get to that in a bit. First, let’s take a look at the *Connections* page to see what we have to work with.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-page-v18.png)

Request List

# See More with Lava

If you’re feeling creative (and a little ambitious), this block’s settings let you customize the opportunity cards using Lava. For instance, you can deploy the `OpportunitySummary.StatusCounts` array to display counts by Status. Just keep in mind that with very large volumes of connection requests, certain changes may have performance impacts.

Clicking on any of the Connection Opportunity cards will bring you to the *Connection Board*, pictured below. The *Connection Board* gives you an overview of all the requests for the selected opportunity. Not only can you see each individual request, but you can also manage the Status of those requests without having to access each one individually.

![Connection Board](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-board-2-v18.png)

Connection Board

# List View

As we mentioned above, you can click the icon in the top-right of the block to toggle between the *List* and *Board* views. Since we’ve already seen the board view, let’s shift over to the list view. You can see that both views are similar, but we’ll highlight some key differences you’ll want to know about.

![Connection Board List View](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-board-list-view-v18.png)

Connection Board List View

# Connection Request Bulk Update

You might have noticed the icon pictured in the screenshot above. While you may be used to seeing this icon on other grids, it has a special function for connection requests. Instead of the traditional bulk updates that are normally performed, here you can make updates that are specific to connection requests. Let's take a look at the options.

![Connection Request Bulk Update](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-request-bulk-update-2-v18.png)

Connection Request Bulk Update

# Connection Request Detail

We've seen connection requests at a high level, but now it's time to get into the weeds. Accessing any request from either the *List* or *Board* views will show its details as pictured below.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-board-request-detail-v18.png)

Connection Request Detail

You might be wondering why you'd ever want to see activities from other opportunities. It's not uncommon for overly-ambitious requestors to sign up for multiple connection opportunities at once. Viewing activities from one opportunity in other opportunities allows you to see that they are being contacted by more than one connector.

This functionality can be disabled if needed. More on that later.

# Adding Activities

You can add new activities by selecting the button. This brings up the *Add Activity* window.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-add-new-activity-v18.png)

Adding Activities

You can use [entity attributes](https://community.rockrms.com/documentation/bookcontent/9#entityattributes) to enter additional details related to the activity. Those attributes will be added to the window above according to your setup.

# Transferring a Request

During the connection process it's common that the requestor (or connector) decided that this opportunity isn't a great fit. The transfer feature is a quick and powerful way to ensure the requestor can find a new opportunity that works for them.

Click the Transfer button to bring up the transfer screen below. While it looks pretty simple, it has some powerful capabilities.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-transfer-request-v18.png)

Transfer a Request

Through the transfer process you want to make sure you find each individual the right next opportunity. Otherwise, they might feel like a hot potato. The Search button allows you to look at all the new opportunities to help coach them on what might be best for their personality and situation. Below is the search screen for the Involvement connection type.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-transfer-search-v18.png)

Transfer Search

# Displaying Badges

Badges are a great way to see a lot of information about a person at a glance. Displaying badges on your connection requests can save staff from having to look elsewhere for the information they need to get the right people connected to the right opportunities.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-request-detail-badges-v18.png)

Connection Badges

In the example pictured above we’re displaying the Connection Status, Baptism and In Serving Team badges. You can choose which badges to display by editing the *Connection Request Board* block settings as shown below.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-board-block-settings-badges-v18.png)

Connection Board Block Settings

Select which badges you want to display and click the Save button. Those badges will now be displayed for anyone with those connections. Super easy!

Also within the block settings you can use the *Lava Heading Template* and *Lava Badge Bar* to further customize the page. The *Lava Heading Template* will appear above the person's name, while the *Lava Badge Bar* will appear below the person's details and above the attributes section.


---

## Entering New Requests {#entering-new-requests}

> **Path:** Engagement > Entering New Requests

Entering New Requests

There are three ways to enter new connection requests. Let's look at each one in detail below.

# Self-Service

Rock ships with blocks that allow you to create a self-service entry to the connection process. This has been pre-configured on the external website for the involvement connection type under Connect \> Serve.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/opportunity-search.png)

Opportunity Search

Here you will see the search page for finding involvement opportunities. It allows you to filter by campus and also by various attributes about the opportunity (we'll show you how to configure these below). Selecting an opportunity will display its details.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/opportunity-detail.png)

Opportunity Detail

From the details page, the guest can then choose to Connect with the opportunity. This action creates a connection request.

In the example pictured below, a custom attribute has been added to request "Begin Date" information from the individual.

![Connection Signup Page](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/connection-signup-page-external-website-v13.png)

Connection Signup Page

## Connection Request Attributes

To set up attributes for the connection request, go to Admin Tools \> Settings \> System \> Entity Attributes. Add an attribute with an *Entity Type* of "Connection Request". The attribute's configuration can be used by the signup block to control which attributes will appear. You have different options for controlling this.

You can select specific categories to include or exclude. To set up categories for this, navigate to Admin Tools \> Settings \> General \> Attribute Categories and add a category with the *Entity Type* set to "Connection Request". That category can then be assigned to your connection request attributes, so they can be included or excluded in the signup block's settings.

You can also use the *Public* flag in the attribute's setup to control which attributes are shown. There's a simple setting on the signup block where you can blanketly exclude non-public connection request attributes. This can be used in place of, or in conjunction with, included or excluded categories.

![Connection Signup Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/connection-signup-block-settings-v10.png)

Connection Signup Block Settings

# Staff Entry

As discussed above the staff can also enter requests from the internal site under People \> Connections.

# Workflows

Rock also ships with a workflow action that can create a new request. This is a powerful way of creating your own request screens using the workflow entry actions. See the [Connection Workflows](#connectionworkflows) chapter below for more information on how you can configure workflows to best use the connection features.


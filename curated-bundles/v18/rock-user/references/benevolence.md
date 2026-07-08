---
description: "Use when user needs to view, manage, or track benevolence requests, categorize assistance types, or access benevolence information on person profiles"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Benevolence

The benevolence feature allows you to track the assistance you provide to those in need. This tracking allows you to better understand who is being helped and how much help you are providing. Let’s see what's possible.

# Request List

The benevolence features can be found under Finance \> Benevolence. The first screen shows a list of benevolence requests that have been entered into the system. This list will quickly grow to be quite long so be sure to use the filters at the top to help you find the specific requests you're working on.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/benevolence-list-v18.png)

Benevolence List

# Benevolence Types

Rock lets you create *Benevolence Types* that can be assigned to each Benevolence Request. This is a great way to categorize requests, allowing you to specify the type of benevolence (e.g., Housing, Food Assistance, Utility Bills) that applies to the request.

You can create or maintain *Benevolence Types* by navigating to Finance \> Benevolence and clicking the button near the top-right of the grid. As described below, there are a few features of *Benevolence Types* that you'll want to know about.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/benevolence-type-v18.png)

Benevolence Type

# Benevolence Request View

The screen pictured below is what you'll see when you access a specific Benevolence Request from the request list. This page lets you view all the details surrounding the request and allows for adding Result Types if *Show Financial Results* is enabled for requests of this type. Let's break down what you can see and do on this page.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/benevolence-request-view-v18.png)

View Benevolence Request

# Edit Benevolence Request

Adding a new request or editing an existing request lets you provide specifics of the request as well as the results of the request. Note that in many cases you will be selecting a person in the database that the request is for. Since some requestors may not be in the system, you can also simply enter in their name and contact information here. This keeps you from having to enter a new record in the database for them. It's up to you if you would like to have a record or not.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/benevolence-request-edit-v18.png)

Edit Benevolence Request

# Benevolence on the Person Profile

Those with access to view benevolence information will see a *Benevolence* tab on the *Person Profile* page. The requests shown here are summarized for the entire family. So, if Ted Decker makes a benevolence request, it will also show on Cindy Decker's profile.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/person-profile-benevolence-v18.png)

Person Profile Benevolence List

# Benevolence Security

The benevolence pages are secured to only allow those in the 'RSR - Benevolence' security group access to them. Be sure to add the appropriate people to this group to enable this feature.

# Adding Custom Attributes

Adding custom attributes to benevolence requests is simple using the steps below.

1. Head to the *Entity Attributes* page under Admin Tools \> Settings \> Entity Attributes.
2. Click the add button to add a new attribute.
3. The first thing you'll want to do is set the 'Entity Type' field to 'Benevolence Request'. You can leave the qualifier fields blank as they are not needed.
4. Complete the attribute setup as you would any attribute. Note though that enabling 'Show in Grid' will display the attribute on the benevolence request list block and allow you to filter on it.


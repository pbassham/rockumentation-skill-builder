---
description: Use when understanding the lifecycle states and statuses of connection requests in Rock's Connections feature
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > 10,000 Foot View of Connections

10,000 Foot View of Connections

When we started to work on the Connections features, we were trying to solve a specific problem: connecting people who want to serve. As we progressed through the ideation process, we started to see that this specific problem was really a reoccurring pattern inside of an organization. What we mean is, these features could be used in lots of different ways. With that realization we made the tool to be configurable for many different types of connection processes. Out of the box it's configured for a single *Involvement* (fancy term for serving) process, but we encourage you to build your own connection processes. You're not on your own, though; we'll show you how later.

In most connection processes the goal will be to take a person who wishes to be connected to a high-level *Opportunity* and walk them through a series of steps or activities until they can be connected to a specific group. This will make more sense if we look at an example. Let's consider the *Involvement* connection type.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/connections-overview-diagram.png)

Connections Overview

Okay, now that we've seen all the components of a connection process, let's learn a bit more about the lifecycle of a request. Requests have a couple of different properties that allow us to describe their current state and see a history of previous activities. Each of these properties is discussed below.

# State

The state of a request describes the standing of the request. There are only four options for state:

- **Active:** The request is currently being worked.
- **Inactive:** The request has either been completed or canceled.
- **Future Follow-up:** Often requestors will need more time before they are ready to be fully connected. The future follow-up state allows us to *freeze* the request until a specific date. This is helpful as it allows the connector to remove it from view until the specified follow-up date. The state will be changed back to Active by the *Connection Request Workflow Triggers* job based on the follow-up date.
- **Connected:** The request has completed the full connection process.

# Status

You can define as many different statuses as you'd like for a request. These statuses are defined for each connection type. The statuses that have been configured for the Involvement connection type include:

- **No Contact:** This is the initial status of a request. It basically means nothing has been done with the request.
- **In Progress:** Once a connector has been assigned and communication has been attempted, then the status should be changed to *In Progress*.

Remember you can customize these statuses and add your own. For instance, you could have a status for *In Training* or *Complete*.

You can automate the process of moving individuals from one status to another. See the [Automating Status Changes](#automatingstatuschanges) section below for details.

# Activities

Activities are a listing of events that have occurred during the process of connecting the requestor. You can customize what these activities are. The involvement connection type is pre-configured with the following activities:

- **Called:** A phone call was made, and the requestor answered.
- **Called Left Message:** Pretty much says it all.
- **Called No Answer:** You can probably figure this one out too.
- **Contacted Waiting for Response:** Some type of contact was made, and the request is waiting for a reply.

While each request will only have one value for state and status, they can have as many activities as needed.

Now that we understand the properties of requests, let's see them in action.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/connection-lifecycle.png)

Connection Request Lifecycle

# The Role of Campus

Campus plays an important role in the connection process, particularly for multi-campus sites. As requests come in, they will be attached to a campus. Also, the connectors and assigned connection groups can be partitioned by campus. We'll see how to set this up later. For now, just know that the connection opportunities can be shared for all campuses while still providing support for campus-specific requests.

# Spotting Connections a Mile Away

Connection requests are shown prominently on the person profile page to help give you an overview of a person's connection at a glance. Each connection request listed on the profile page lists the connection type, opportunity, campus and status.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-requests-on-person-profile-v18.png)

Person Profile Connection Requests

You can edit the settings on this block to choose which connection requests to show based on their State.


---

## Engagement {#engagement}

> **Path:** Engagement

This skill catalogs the chapters of *Engagement* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Engagement > Welcome

> "Without continual growth and progress, such words as improvement, achievement, and success have no meaning."
> 
> \-Benjamin Franklin

The ability to grow and adapt in an ever-changing world is a driving factor behind any successful organization. As individuals we also strive for growth, but you can only go so far on your own. At any level, growth requires engagement. That may sound straightforward on the surface, but successful engagement can be a very complex and long-term undertaking.

It’s often better to break up complicated tasks into manageable pieces instead of trying to tackle everything at once. That’s why Rock enables you to approach engagement from different angles using three sets of complimentary tools. With Connections you can move people from being disconnected to being plugged in. With Steps you can lay out a walkable path to the top of the mountain. With Streaks you can monitor engagement patterns. This book will show you how the power of these engagement features can help ensure the growth of your organization and the individuals within it for years to come.


---

## Connections {#connections}

> **Path:** Engagement > Connections

Connections

Many of your organization's strategies are about helping people move from one state to another. Often this movement isn't a straight line, but more of a meandering path. When the path takes an extended period of time it's possible for people to fall through the cracks.

This is where the Connections tool comes to our rescue. While workflows can be a great help by connecting people through automated processes, they can quickly become complicated and unwieldy in complex situations. The Connections tools provide a backbone that allows you to build advanced processes. As you'll soon see, workflows still play an important role in Connections but more so as an extension of the foundation instead of the foundation itself. But enough talk... let's see for ourselves what the Connections feature can do.


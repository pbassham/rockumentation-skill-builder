---
description: Use when prayer team members need to start a prayer session and work through prayer requests in Rock RMS
source: "https://community.rockrms.com/documentation/bookcontent/11/366"
sourceLabel: Raising Up With Prayer
---
> **Path:** Raising Up With Prayer > Prayer Team Power Tools

Prayer Team Power Tools

Put that extra oomph behind your prayer efforts with Rock’s power tools. If you take the time to understand these settings now, you will be set up to maximize your prayer team's very important work.

# Starting a Prayer Session

Once it's time for the prayer team to begin working through the requests, they will find them on the website under Connect \> Prayer \> Prayer Team.

![Starting a Prayer Session](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/team-session-v13.png)

Starting a Prayer Session

When a member of the prayer team starts a prayer session, all categories with active prayers will show on the webpage, along with a number of active prayers in each. Once one or more categories are selected, they will be auto-filled for the next session.

# Selecting Prayer Categories

If your team is small, you should consider selecting most or all categories until you have good prayer coverage.

Press the Start button to begin.

Urgent requests will be at the top, followed by all remaining requests in the order of the *least* prayed for to the *most* prayed for.

![Prayer Session](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/requests-displayed-v12.png)

Prayer Session

After praying for this request, press the Next button to move to the next prayer. Each time you view a request, Rock will record an additional prayer for it.

# Unapproving Requests

If you are concerned about whether a particular request is appropriate, because of danger or abuse for instance, you can flag the request by clicking the Flag button. This will un-approve the request until it has been reviewed by the Prayer Administrator.

# Prayer Team Comment Security

Out of the box, the "RSR - Prayer Access" role by itself doesn't allow adding comments to prayer requests. You could use this role to include people on the [prayer comments email](#prayerrequestcommentsdigest), while keeping comment entry restricted to those with staff-level access.

If your prayer team members with Prayer Access should be able to comment on requests, add the role to the "Edit" rights on the *Prayer Comment* note type in Admin Tools \> Settings \> Note Types.

# About Default Configuration

Just like entering prayer requests for the public, prayer session settings can also be modified on the external website under Connect \> Prayer \> Prayer Team.

## Block Settings

Below are some of the settings for the *Prayer Session* block. You'll want to review these and the other settings for this block to ensure it fits your process and needs.

| Setting | Description | Example |
| --- | --- | --- |
| Welcome Introduction Text | Custom text (HTML) that is shown to the prayer team before they start their prayer session. | Let's get ready to pray |
| Category | Setting a top-level category controls which sub-categories are shown when starting a prayer session. | Health Issues |
| Enable Prayer Team Flagging | If enabled, members of the prayer team can flag prayer requests that they believe are inappropriate and need reviewing or editing by the prayer administrator. | Yes/No |
| Flag Limit | This specifies how many times a request needs to be flagged before it is unapproved. | 1 |

  

That's it. With just a few simple steps you can simply and powerfully raise up the people of your church with prayer. And once you start using it, you'll wonder how you ever got along without it.

By configuring your categories and creating new pages you can create general prayer request systems each with their own requests and categories. This is helpful if you would like to set up a unique prayer area for ministries like teens or missions.

# Prayer Card View Block

An alternate way for your prayer team to pray is to use the *Prayer Card View* block. This block is similar to the *Prayer Session* block described in the prior section above, except prayer requests are viewed as cards on the page. All the person needs to do is click the Pray button to have the prayer counted.

![Prayer Card View](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/prayer-card-view-external-website-v13.png)

Prayer Card View

The Prayer Card View block ships with Rock but isn't added to any pages out of the box, so it will need to be added to a page on your external website. You can add a new page for this block, or you might replace the Prayer Session block on the *Prayer Team* page.

## Block Settings

The block settings for the Prayer Card View block give you several options for how your prayer team will interact with the prayers. You'll find many of these settings have the same functions as the settings we discussed in the prior section above.

![Prayer Card View Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/prayer-card-view-block-settings-v13.png)

Prayer Card View Block Settings


---

## Prayer Requests for Groups {#prayer-requests-for-groups}

> **Path:** Raising Up With Prayer > Prayer Requests for Groups

Prayer Requests for Groups

Prayer requests can be associated with a group. This allows prayer requests to be limited to the group members, so only they pray for the request. In this chapter we'll take a deep dive into how this works, and how these types of prayer requests differ from standard requests.

# Finding a Guid For a Group

Before you create a group-specific prayer request, you need your group's Guid. How do you find a group's Guid you ask? A Globally Unique Id (Guid) isn't easy to come by. They are unique and hard to guess, preventing attackers from impersonating your group.

As an Admin though, you have direct access to any Guid using Lava. To retrieve a group's Guid, try the Lava below — no guessing necessary. Just pass in the GroupId, and it will return the corresponding Guid.

{% group id:'xx' %}
    {{ group.Name }} - {{ group.Guid }}
{% endgroup %}
                

# Creating Group Prayer Requests

All you need to do is pass a group's Guid into the *Prayer Request Entry* block. The block will be looking for a *GroupGuid* parameter in the URL, along with the Guid itself. If it finds this, the prayer request will be associated with that group.

![Enter Prayer Request With Group URL](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/enter-prayer-request-with-group-url-v14.png)

Enter Prayer Request With Group URL

As pictured above, nothing will change or appear differently on the page. The prayer request would be entered and submitted like normal. The only way you'll know that the request is tied to a group is when looking at the request from the internal administrative view under People \> Prayer \> Prayer Requests. Clicking on a request will show you its details as pictured below, including the associated group.

![Prayer Request Detail with Group](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/prayer-request-detail-with-group-v18.png)

Prayer Request Detail with Group

Note that the group associated with a prayer request cannot be changed or removed once it's been set.

# Praying for Group Prayer Requests

In the previous section we talked about how the only difference between a regular prayer request and a group prayer request is having the group's Guid as a parameter in the URL. Nothing else changes. The same is true when praying for group requests; the only difference will be what's in the URL.

Both the *Prayer Session* and *Prayer Card View* blocks are looking for a *GroupGuid* parameter in the URL. If these blocks find a group Guid, the prayer session will be only for requests associated with that group. If there is no *GroupGuid* parameter in the URL then requests associated with a group will not be listed and will not be prayed for.

![Group Requests Not Shown](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/no-prayer-requests-with-url-v14.png)

Group Requests Not Shown

![Group Requests Shown](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/pray-for-group-request-with-url-v14.png)

Group Requests Shown


---

## Prayer Request Comments Digest {#prayer-request-comments-digest}

> **Path:** Raising Up With Prayer > Prayer Request Comments Digest

The importance of prayer and the impact it has can’t be overstated. In times of trouble, it helps just simply knowing that people are out there praying for you. Using the *Send Prayer Comments* job, you can ensure that those who submit prayer requests will know that they have the power of prayer behind them.

# Setting up the Job

As the prayer team comments on requests, you can enable a job to send those comments to the originator. The job is included in your Rock installation but will need to be configured. Below is an example setup:

![Job Detail - Send Prayer Comments](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/job-detail-send-prayer-comments-v18.png)

Job Detail - Send Prayer Comments

For general instructions on setting up jobs, be sure to review the [Admin Hero Guide](https://community.rockrms.com/documentation/BookContent/9/#configuringajob).

To send communications for all prayer requests, regardless of category information, leave the *Prayer Categories* field blank and select “Yes” for *Include Child Categories*. Those settings should only be changed if there are categories for which you don’t want to send communications.

The job will only send communications for prayer requests where *Allow Comments* has been enabled. Requests where *Allow Comments* isn’t enabled will be ignored.

# Prayer Request Comments Communication

The example email pictured below is generated from the “Prayer Request Comments Digest” system communications template.

![Prayer Request Comments Email](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/prayer-request-comments-email.png)

Prayer Request Comments Email

The email address included with the prayer request will be the one used by the job. If the requestor exists in your system, this may or may not be the email address associated with their profile.

See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information on working with communications.


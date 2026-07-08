---
description: "Use when a staff member needs to track specific individuals, receive notifications about people they care about, or manage their personal following list in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Following

For most organizations, the database of individuals in Rock will far exceed the number of people a specific staff person will know. Without tools to help filter relationships, personalizing touch points would be impossible. Rock's *Following* features help filter these relationships so that an individual can be made aware when life events occur with people they know.

# Following an Individual

The first step is to identify people you know. You can do this by clicking the *Follow* button below an individual's photo on their *Person Profile* page.

![Following An Individual](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/following-status-v14.png)

Following An Individual

# Bulk Following

Don't forget our friend, the bulk update tool. Bulk updates also allow you to add or remove a list of individuals from your following list.

![Following Bulk Update](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/following-bulk-update-v18.png)

Following Bulk Update

# Viewing Those You Follow

You can view a complete list of the people you follow under Login Status \> My Settings \> Following (the login status can be found in the top-right corner of the page). From this list you can manage the people you follow and remove any that may have been accidentally added.

![Following List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/following-list-v18.png)

Viewing Followers

# Just the Beginning

Rock's *Following* feature is just a start. Look for lots of new capabilities in upcoming releases. We're providing the basics for now to help you start building your following lists.

# Engaging Following

OK, now that you’re following people, let's use this data to build better connections. Following a person means you have a special interest in that person; that you care about what's going on in their lives. So, wouldn't it make sense that you'd want to know when it's their birthday or wedding anniversary, when they're joining a group or better yet that they were recently baptized? Rock makes this a snap!

You can configure what types of notification events you're interested in under My Settings \> Following Settings (found under the login status in the upper-right corner). Here you can see a list of all the events you can be notified of.

![Following Event Settings](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/following-personalevents-v18.png)

Following Event Settings

Every day, Rock will determine if anyone on your following list has the configured notification events and will send you a personalized email of the results.

![Following Event Email](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/following-eventemail.png)

Following Event Email

Rock Administrators can even set up new types of events that will be displayed here. But more on that in a minute.

# Configuring Following Events

Rock ships with several following events, but it's easy to set up additional ones yourself. You can manage these events under Admin Tools \> Settings \> System \> Following Events.

![Following Event Type List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/following-eventlist-v18.png)

Following Event Type List

As pictured in the screenshot above, you can apply security to Following Events by clicking the icon. The Following Settings block (see prior section above) will only allow subscribing to following events if the person has been granted 'View' access to that following event. If someone was subscribed to a following event that they no longer have access to view, when the following event notification is sent that event won't be included.

# Person Note Added and Joined Group Type Security

Because the security of Notes and groups can't be checked when following events are being determined, each sensitive Following Event should be secured to match its related security configuration. For instance, if you have restrictions on who can view Pastoral Notes, then those same restrictions should be applied to the corresponding Following Event.

To add a new event, click the from the top or bottom of the grid.

![Following Event Configuration](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/following-eventconfig-v18.png)

Following Event Configuration

Each event type has additional settings you'll want to configure. For instance, the *Person Baptized* event type lets you configure an *Anniversary Count* that you can use to commemorate the person's baptism. The *Person Prayer Request* event type also has an option to include non-public requests in the notification. Be sure to review the settings for each event type to maximize its usefulness.

# Never Forget A Birthday

Following events are great for a personal touch but if you want to have a fool-proof way of sending your best wishes to every person on their birthday then you may want to consider configuring a job to send an email to each person celebrating their birthday. Read more about how to do so in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#jobs).  
  
You might also consider setting up a [Reminder](#reminders).

# Person History Following Event

The *Person History* following event is an advanced setting that gives you the option of being notified when there are changes to a person's history, such as a change in their membership or marital status. As with other following event types, you can configure any number of specific events which people can subscribe to and receive notifications for. Let's look at how to set up the *Person History* following event option.

![Following Event Configuration](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-history-following-event-v18.png)

Following Event Configuration

Let's look at an example of why and how you might use the *Person History* following event option.

Say you have a care ministry that helps people who are recently widowed. You can use the *Person History* following event to make sure those working in that care ministry are alerted when a person's marital status changes from 'Married' to 'Widowed'.

To track this change, you would create a new Following Event set with the basic information: Name, Description, Event Type (Person History) and Notification Format. Then you'd set the following options to capture the change in marital status:

- Fields = Marital Status
- Match Both = Yes
- Old Value = (blank)
- New Value = Widowed

These settings will cause a notification to be sent whenever a person's *Marital Status* field changes from any value to 'Widowed'.

This is just one of many uses for the *Person History* following event. You can see what a powerful and useful tool it can be.

# Following Suggestions

Knowing who to follow can turn into a full-time job if you let it. But why? Rock can do the work for you. Administrators can set up suggestion criteria under Admin Tools \> Settings \> System \> Following Suggestions.

![Following Suggestion Type List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/following-suggestionlist-v18.png)

Following Suggestion Type List

Rock ships with two suggestion types: *In Group Together* and *In Followed Group*. You can see how these types can be used in several different ways. You can even add your own suggestion types with a little bit of light development.

To add a new following suggestion, click the button at the top or bottom of the grid. This will bring up the page pictured below.

![Following Suggestion Configuration](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/following-suggestionconfig-v18.png)

Following Suggestion Configuration

## In Group Together and In Followed Group Settings

The settings below are available to the *In Group Together* and *In Followed Group* suggestion types.

- **Group Type:** The group type that's used.
  
- **Group:** The optional group that the person must belong to for the suggestion. Make sure to pick a group of the same type that was selected above.
  
- **Security Role:** This is similar to the group limiter above, but for a specific security role.
  
- **Follower Settings:** Next, we can limit who the follower role will be. To do this we need to provide both the group type and role (we must provide the group type again as this helps to limit the roles that will be displayed in the role dropdown).
  
- **Following Settings:** Lastly, we can limit who will be suggested according to a security role. Only individuals assigned the role provided here will be suggested. Again, we must provide both the group type and the role.

# Reducing the Confusion

The settings above can be a bit confusing. If you're feeling overwhelmed, looking at the settings for the suggestions that ship with Rock can help reduce this confusion.


---

## Strategies for Blended Families {#strategies-for-blended-families}

> **Path:** Person & Family Field Guide > Strategies for Blended Families

Strategies for Blended Families

Families come in all shapes and sizes. Managing the complexities of relationships, whether in real life or a database, can be complicated. Luckily, Rock is very flexible. Below we discuss some of the options for entering blended families.

# Dual Family Approach

When parents have dual custody and both parents are involved with your organization, you may wish to use the dual family approach. In our example below Ben and Sarah Jones divorced a couple of years ago. Both have joint custody of their son Brian. Sarah went on to marry Jim Simmons. This is one way to set up these two families.

![Dual Family Approach to Blended Families](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/blended-dual-family.png)

Dual Family Approach to Blended Families

In this example Brian, the child, is in both families. He is still one record in the database, but he is a member of both families. This approach has some details you should know about.

- In reporting, Brian will be listed as a single record. However, if your reports list families, this pattern will add two families to the results.
- Brian can be checked in using either family’s contact information.
- Mailings will be sent to both home addresses.
- A report showing the parents of Brian will include Ben Jones as well as Jim and Sarah Simmons. Each family will be listed as separate rows on the report.

# Single Family with Relationships Approach

In the single-family approach the children of blended families are only connected to a single family and relationships are used to link them to other individuals (e.g., for check-in).

![Single Family Approach to Blended Families](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/blended-single-family.png)

Single Family Approach to Blended Families

This approach may be preferable in cases where one parent has sole custody or if the other family doesn't participate in your organization. In this approach, reporting and most other features act just like a typical family. Check-in can be allowed by other individuals using the relationship of *Can Check-in*.

# What About Foster Families?

Rock's flexibility also comes in handy when adding foster families. The best approach is to add the children to the family, and then create a [new Known Relationship type](#creatinganewrelationshiptype) that designates them as fosters.


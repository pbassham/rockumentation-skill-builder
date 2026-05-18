---
description: Use when organizing or categorizing communication lists for sending targeted messages to group recipients
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Communication Lists

Communication Lists

The Communication Wizard utilizes communication lists to send messages. Communication lists are kind of like the contact lists or groups you can set up in your own email and messaging apps. Rock's communication lists are simply groups of a specific type. For example, you could create a communication list of all small group members, or everyone registered for summer camp, or anyone serving as an usher. If you can create a group of it, you can create a communication list from it. Using groups as the basis for lists allows you to quickly identify and select recipients from the different areas of your organization.

Communication lists can be found in the *Communication Lists* screen, located at:  
Admin Tools \> Settings \> Communication Lists.  
Click the name of a list to view its members or modify its settings.

![Communication Lists](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-lists-main-page-v18.png)

Communication Lists

Rock ships with the following four lists:

- Members and Attendees
- Parents of Children
- Parents of Youth
- Sports Ministry

These lists are just samples to get your juices flowing and so you can see how lists should be configured. You can use them for your organization if you want, but you'll need to wire them up to sync with your data views. Because these lists are groups, you can add people to them manually...*or* you can use Rock's group sync features to keep them automatically updated. To learn more, see the [Group Sync](https://community.rockrms.com/documentation/bookcontent/7#groupsync) chapter in the Rock Your Groups guide.

You can also create your own communication lists. In the *Communication Lists* screen, click the button to create a new list.

![Communication List Add New](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/add-new-communication-list-v18.png)

Communication List Detail

As you can see, the *Communication List Detail* screen offers a lot of options and flexibility for creating your communication list. To make your new list available to members viewing the *Communication List Subscribe* block on your external site, be sure to click the *Public* checkbox. (To learn more about that block, see the [Communication Preferences](#communicationpreferences) section below.)

Next let's look at how to associate the list with categories and data views.

# Communication List Categories

You can create categories to further identify and filter your communication lists. The *Communication List Categories* page is located at Admin Tools \> Settings \> Communication List Categories.

![Communication List Categories](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-list-categories-v18.png)

Communication List Detail

Rock ships with one category, called "Public", but you can create as many categories as you want. For example, you could create a category called "Staff Only" to use when creating communication subscription blocks you want only to be available to staff members. Categories can have child categories as well. You can use communication list categories in a number of ways: for paring down the recipients in your communication lists, in creating subscribe/unsubscribe blocks in your organization's website, for creating data views to use when filtering communication lists... The more you use them, the more you're going to see how extensive they are. We'll be talking about communication list categories a little later in the [Communication Preferences](#communicationpreferences) chapter.

Keep in mind that the category's security will be used to decide if the individual can see the communication lists associated with that category. This means an administrator can set up a new category (e.g., Staff) and then add security to that category such that people with access to view that category will be able to see any communication lists that are tied to that category. Don't forget, the admin would have to configure the *Communication List Subscribe* block's settings with the new category.

# Segments

Segments provide a way to select and filter your lists based on any field in the system. You can use data views to further pare down, or segment, who you’re communicating with in a particular list. They can be global to all lists or unique to a specific list. When using the Communication Wizard, after selecting a communication list, you can add any segments you want to use to filter that list. For example, if you only want the communication to be sent to members who are age 35 or older, you’d select the segments “Members” and “35 and older”. (More on that in the [next section](#sendingacommunicationusingthecommunicationwizard).)

It's important that you think through your list strategy. A smart use of segments can cut down on the number of lists you will need.

**For The Communication Wizard v1:**

Data views can be created, modified and deleted in the *Communications Segments* category of the *Data Views* screen, located at Tools \> Data Views. For more information about data views, see the [Filtering Using Data Views](https://community.rockrms.com/documentation/bookcontent/6#filteringusingdataviews) section of the Taking Off with Reporting manual.

**For The Communication Wizard v2:**

Create new *Personalization Segments* in Admin Tools \> CMS \> Personalization Segments. Just be sure the segment’s category matches the Personalization Segment Category specified in the block settings. For more details on working with segments, check out the [Personalization Segments](https://community.rockrms.com/Rock/BookContent/14#personalizationsegments) chapter of the Designing and Building Websites Using Rock guide.

# Switching From Communication To Personalization Segments

As of v17, the v2 Communication Wizard (Preview) is released, changing the way *Segments* function. The Data Views you used for segments in the past can be easily used as Personalization Segments. The best part: Personalization Segments give you more control. You can now use Session Filters, Page View Filters and more to refine your communication list.

OK, now for the fun part. Let’s look at how to actually use the Communication Wizard.


---

## Communication Wizard (Legacy) {#communication-wizard-legacy}

> **Path:** Communicating With Rock > Communication Wizard (Legacy)

Communication Wizard (Legacy)

# Communication Wizard (Legacy)

Looking to read up on the legacy version of the Communication Wizard? You can find it in the [legacy documentation](https://community.rockrms.com/documentation/bookcontent/8?Version=330#communicationwizard). The updated Communication Wizard offers a refreshed experience with enhanced features—read on to learn more.


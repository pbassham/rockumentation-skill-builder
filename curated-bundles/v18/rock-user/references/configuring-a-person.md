---
description: "Use when configuring person profile settings like connection status, record types, and record status in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Configuring a Person

Configuring a Person

As you’ve seen, there are a lot of ways you can describe an individual in Rock. However, there are still a few more configuration options available for you to extend. Below we’ll walk through some of these additional settings on a person. Generally, these options are accessed by clicking the icon in the *Person Profile* page.

# Note

Each of these settings is a *Defined Type*. You can add new values for each of these items by editing their *Defined Values*. See the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/) for more on working with [Defined Types](https://community.rockrms.com/documentation/bookcontent/9#definedtypes).

# Connection Status

The *Connection Status* helps categorize a person’s relationship to your organization. While many organizations will want to modify these options, the following statuses are available immediately after installation.

| Status | Typical Usage |
| --- | --- |
| Member | This individual has completed all requirements established by your organization to become a member. |
| Attendee | While not a member, this person is a consistently active participant in your organization’s services and/or events. |
| Visitor | This status is used when a person first enters through your first-time visitor process. As they continue to attend, they will become an attendee and possibly a member. |
| Participant | A participant is indirectly involved with your organization. For example, if a family is part of a church’s youth sports program but doesn't attend that church, they would be entered into Rock as participants. |
| Prospect | Prospect is the default status given to any record that's added from the website. Watch out for duplicate records with these! |

  

It's up to your organization to determine the needed connection statuses. These statuses can be modified by an administrator under Admin Tools \> Settings \> General \> Defined Types \> Connection Status.

# Record Types

Record types help Rock add some capabilities to track certain types of entities within the database. There are five record types included after the install:

- **Person**: A person record
- **Business**: A business record
- **RestUser**: A Rest User (API)
- **Nameless Person**: An unknown person (see [Nameless People](https://community.rockrms.com/documentation/bookcontent/8#namelesspeople))
- **Anonymous Visitor**: A visitor to your website who is not known. This is used with Rock's [Personalization](https://community.rockrms.com/documentation/bookcontent/14#personalization) features.

For the most part, it won’t make sense to add additional types unless you’re adding new functionality by writing plugins.

# Record Status

The record status gives you an idea of the state of the relationship between your organization and the individual. Each option included by Rock is discussed below:

- **Active:** Denotes an individual who is actively participating in the activities or services of the organization.
- **Inactive:** Represents a person who is no longer participating in the activities or services of the organization.
- **Pending:** Is used by the system to mark a record that needs to be verified before becoming active. This state is often used when someone registers online, to allow a staff person to confirm the new individual and check that it isn't a duplicate record.

You can add your own record statuses but realize that some of the features of Rock assume that the values provided have a certain meaning. Consider using connection statuses rather than record statuses if you need to track a person’s status in a more detailed way.

# Making a Person Inactive

In most cases, when you make a person inactive, they will automatically become inactive inside any groups unless the group isn't configured to remove people who are inactivated in the system.

# Inactive Reasons

When someone is marked with the *Record Status* of "Inactive" it’s a good idea to determine the reason. The system comes configured with the following reasons.

- No Longer Attending
- No Activity
- Moved
- Deceased
- Does not attend with family

It’s simple to add more, so by all means feel free to add your own.

# Marital Status

You also have the option of adding additional martial statuses to Rock. The defaults are:

- Single
- Married
- Unknown
- Divorced

Hopefully these cover it, but if not, then adding them is easy.

# Phone Types

We’ve chosen to release Rock with a limited number of phone type options, allowing you to add others that make sense to you. The default values are:

- Home
- Mobile
- Work

# Titles

The following titles are available in Rock: Mr., Mrs., Ms., Miss, Dr., Rev. and Cpt. Feel free to add more to your liking.

# Suffixes

The following suffixes are available: Jr., Sr., Ph.D., II, III, IV, V and VI. Should you have a VII or VIII, you can add them yourself.


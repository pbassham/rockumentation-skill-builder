---
description: "Use when configuring organizational locations, managing multiple campuses, setting up campus details, status and types, or assigning staff roles to campuses"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Campuses

Many organizations operate out of more than one location. While there are many terms for these "sites" we've chosen to call them campuses within Rock.

# Single Campus

Generally, the display and selection of campus information throughout Rock will be hidden if you have only one campus. If a campus value is required by a particular block, then the single campus you have configured is automatically used (otherwise it’s left blank).

# Managing Your Campuses

You can create or maintain campuses from Admin Tools \> Settings \> Campuses. There you'll see a list of campuses that you can manage or add to. Selecting a campus will bring up the campus details screen.

# Locations

Before adding a new campus, you must first add its address under Admin Tools \> Settings \> Named Locations.

![Campus Details](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/campus-detail-screen-v18.png)

Campus Details Screen

## Campus Status & Campus Type

A lot of the setup for Campuses is pretty straightforward, but there are some important points you'll want to keep in mind about the Status and Type fields.

Rock ships with three Campus Status values (Closed, Open and Pending) and two Campus Type values (Physical and Online). These are ready for you to use out of the box as Defined Types. However, these values can't be deleted through Rock and shouldn't be deleted by other means. That said, how you use them is entirely up to you. If needed, you can add new values to the Defined Types lists or change the names of the existing values.

# Note

Even if the Type is "Online" you're still required to have a Location value. As with any campus, the Location Type assigned to the Location you choose must be "Campus". If you’re not sure what Location to use for an online campus, best practice is to choose the one most closely associated with the website.

# Upgrading Rock?

If you’re upgrading Rock from an older version that doesn't have Status and Type configuration, then your existing campuses will have these values automatically assigned. Any active campus will get a Status of *Open* and an inactive campus will get a Status of *Pending*. The assigned Type will be *Physical* for all campuses, except *Online* will be assigned if the name of the campus has "online" or "on-line" in it.

# Campus Teams

Associating people with a campus helps you easily identify key staff, and their roles, at that campus. This is accomplished using the *Campus Team* system group type. Each campus functions like a group, with its own members and roles.

![Campus Team](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/campus-team-campus-detail-v18.png)

Campus Team

Adding a person to a campus is just like adding members to other types of groups. Click the button on the grid to add new members and define their role at the campus.

![Add Campus Team Member](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/campus-team-add-member-v18.png)

Add Campus Team Member

Teams for your campus can be created with either single-campus or multi-campus setups.

# Tracking Campus Average Attendance

If you're using [Metrics](https://community.rockrms.com/documentation/bookcontent/6/331#metrics), specifically the *Total Weekend Attendance* metric, Rock will automatically calculate *Average Weekend Attendance*. You'll find this data on the *Campus Detail* page.

![Campus Detail screen showing Average Weekend Attendance](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/tracking-average-attendance-v18.png)

Campus Detail: Average Weekend Attendance

For more on how to set up *Metrics* see the [Metrics](https://community.rockrms.com/documentation/bookcontent/6/331#metrics) documentation.

# Adding Attributes to Campuses

You can add attributes to your campuses to track information about them beyond the settings described above. To do that, just follow these steps:

1. Go to Admin Tools \> Settings \> Entity Attributes.
2. Click the button to add a new attribute.
3. Select the *Entity Type* of "Campus" and set up the attribute information. You don't need to add a value for the *Qualifier Field* or *Qualifier Value* fields.
4. After clicking Save, you can configure security for the attribute if needed.
5. You'll now be able to set a value for this attribute in the *Campus Details* page described above.


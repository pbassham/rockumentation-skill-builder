---
description: "Use when user needs to archive groups, unarchive archived groups, or access the Archived Groups management interface in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Viewer

Group Viewer

The *Group Viewer* page can be accessed by navigating to People \> Group Viewer. This is the primary page for viewing and editing groups. Below, we will discuss each section of the group viewer in detail.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-viewer-v18.png)

Group Viewer

The group view has a couple of other interesting features you should be aware of. Notice the icons at the top of the "Groups" (Group Tree) block in the figure above. You can click the icon to add a new group, or the icon to search for a group. Clicking the icon will show you several advanced features in the tree view. Let's open it up and see what's inside:

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-viewer-tree-v18.png)

Group Viewer

You'll notice:

- **Show:** This determines if inactive groups should be shown.
- **Public:** This determines if only groups marked 'Is Public' should be shown.
- **Show Count For:** The tree can also display counts of the number of members in the group, or the number of child groups a group has.
- **Filter by Campus:** This lets you narrow down the groups according to a campus you select.
- **Include Groups With No Campus:** If this is set to No then only groups with a campus will be shown.

# Archived Groups

You can Archive a group instead of deleting it. Archiving removes the group from the Group Viewer and other places where groups can be seen but allows you to restore it later. When a group has been marked as Archived and you want to bring it back go to Admin Tools \> Settings \> General \> Archived Groups and click on the icon to unarchive the group.

Note: If a group type has 'Enable Group History' checked, once the 'Process Group History' job runs the 'Archive' button will be enabled on a group.

# Group Maps

Clicking the map marker button will take you to an interactive group map showing the members of the group. Depending on the configuration of the group other features may be enabled.

If the group has a geopoint (determined through the address geocoding process or by selecting the point on the map) the location of the group will also be present on the map.

If the group has a defined geofence this fence will be shown on the map. The presence of the geofence will also enable the display of connection status labels at the top of the map. Clicking these labels will show everyone with that connection status in the database who lives within the geofence. This allows you to view possible 'prospect' group members.

# Limiting The Display of Certain Connection Statuses

In order for a connection status to be displayed as a label, the status must be configured with a 'Color' attribute. This helps determine the pin color for the map marker as well as acts as a global setting to help determine which connection statuses should be mapped. You can set the color for a connection status under Admin Tools \> Settings \> General \> Defined Types \> Connection Status.

Along the top of the block, you can click the labels (e.g., *Decker Group* or *Group Members*) to toggle the display of the group's location or member locations. In the example pictured below we're displaying the location of the *Decker Group* and we clicked the *Group Members* label (with the green circle) to show the locations of individual members.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-map-v18.png)

Group Map

# Adding a Group

You can add a new group to the tree by clicking the icon and then selecting the location from the list. Adding a group using *Add Top-Level* will place the group at the root or top of the tree. Selecting Add Child to Selected will place the group under the currently selected group.

# Note

If you have a group selected but Add Child to Selected is disabled, then this group type does not allow child groups. See the *[Group Types](#grouptypes)* section below for more on group hierarchies.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/add-group-v18.png)

Adding a Group

# Group Details

The group details section displays all of the information about the group. The group type and campus (if configured) will be shown as labels in the banner at the top. A map of the group’s location will also be shown, if configured.

# Editing a Group

Clicking the Edit button from the detail section will allow you to edit information about the group and provide additional configuration settings.

The key features of the edit screen are discussed below.

![Editing a Group](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-viewer-edit-v18.png)

Editing a Group

# More Information Below

You may notice that we skipped over a few sections above. Additional information on these areas is provided in later chapters of this guide.

## Inactivating a Group

If enabled in the [Group Type settings](#commongrouptypesettings), you’ll be prompted to provide additional details after inactivating a group.

![Inactivating a Group](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/inactivating-a-group-v18.png)

Inactivating a Group

The list of Inactive Reasons is maintained under Admin Tools \> Settings \> General \> Defined Types \> Inactive Group Reasons. You can restrict which Group Types the reason can be applied to. If no Group Types are selected, the reason can be used with groups of any type.

![Inactive Group Reasons Defined Type](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/inactive-group-reasons-defined-type-v18.png)

Inactive Group Reasons Defined Type


---

## Rock Your Groups {#rock-your-groups}

> **Path:** Rock Your Groups

This skill catalogs the chapters of *Rock Your Groups* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Overview {#overview}

> **Path:** Rock Your Groups > Overview

Groups are used whenever two or more are gathered. You'll find groups to be simple but incredibly powerful. Rock comes pre-configured with several types of groups, including:

- **Families:** Each family is stored as a group. This is incredibly powerful because families get the same power and functionality as any other Group Type. In the beginning you'll want to leave families configured just the way you found them. As you create new Group Types and gain more experience with groups, keep in mind that you can add new attributes and additional functionality to the family Group Type.
  
- **Security Roles:** These groups help secure Rock data. While you'll use these groups a majority of the time for security, you'll soon discover that any group in Rock can act as a security role.
  
- **Check-in Groups:** Rock's check-in features use groups to store the locations where kids can check in, and to track attendance.
  
- **Serving Teams:** While we have big ideas for how serving teams will work in the future, we have configured a simple group type to get you started with tracking your groups.
  
- **General Groups:** It's likely that you'll be creating several groups that don't warrant their own specific Group Type. In these cases, feel free to create them as 'General Groups'.
  
- **Application Groups:** Rock needs to keep track of various lists of people. For instance, people who have opted out of getting future photo requests. These 'lists of people' are stored as Application Groups. Application groups can be viewed/managed under Admin Tools \> Settings \> System \> Application Groups.
  
- **Small Groups:** We've added a generic Small Group group type. Feel free to use this as a base to build from if your church has a groups ministry.
  
- **Small Group Sections:** This group type works in conjunction with the Small Group type and acts as a leadership level to provide hierarchy for your groups. Again, feel free to use this type as a launching point for getting started.


---

## Searching for Groups {#searching-for-groups}

> **Path:** Rock Your Groups > Searching for Groups

Searching for Groups

As you add more and more groups to Rock, it may be tedious to locate a specific group. Never fear, you can use the Smart Search at the top of each page to help find the specific group you are looking for.

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/smart-search-v18.png)

Smart Search

Be sure to choose the *Group Name* option from the drop down and then enter the group name you are searching for. You don’t need to enter the full group name, since the search will return any group that has the search term you entered. Say you were looking for the Bible Study group that Ted Decker leads (named "Ted Decker's Bible Study Group"). Any of the searches below would be valid, although some may return several other groups in the results, as well.

- Decker
- Bible Study
- Ted Deck

If the search term you provide only matches a single group, you will be taken directly to that group. However, if several groups match, you will have to select one from the list of groups provided.


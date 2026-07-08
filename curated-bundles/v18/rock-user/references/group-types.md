---
description: "Use when setting up or configuring group types, defining group hierarchies (structured vs flexible), or deciding how to organize ministry areas in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Types

Group Types

As you start to customize Rock for your ministry, you'll want to define new group types to match your various ministry areas (small groups, ministry groups, etc.)

# Tip

Once you realize the power of group types, you’ll be tempted to start creating many custom types to fit each of your ministries. Don't do it! Resist this temptation at first. Less is more. Look for common points within your many ministries. This will help you reduce the number of group types that you’ll need. In general, it’s easier to add new group types later than it is to merge group types in the future.

# Group Hierarchy

One of the most important concepts to understand as you create new group types is the relationship that groups have to each other. There are two basic hierarchy types to choose from:

- **Structured Hierarchy:** In this configuration, the levels of hierarchy are defined and limited. For example, you may want to define the hierarchy of your small group ministry to have a single leadership team, under them a level of lay leaders who act as coaches to the groups, and then the groups themselves. In a structured hierarchy you can be sure that this structure is enforced.![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/structured-group-hierarchy.png)
	Example of Structured Group Hierarchy
- **Flexible Hierarchy:** For some ministry types, you want your groups to have a more unstructured hierarchy. An example of this might be how you set up serving teams. You may want serving teams to be able to have sub-teams that might have additional sub-teams themselves. These hierarchies may be very deep in some ministry areas (like First Impressions) but shallow in others.![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/flexible-group-hierarchy.png)
	Example of Flexible Group Hierarchy

You define these hierarchies by configuring what child groups each group type can have. In the structured example, you would create a group type called *Small Group Leadership*, which would allow child group types of *Group Coaches*, which would allow child groups of *Small Groups*. The *Small Groups* would not allow any child types, ensuring that your hierarchy was fixed at the third level.

In the flexible hierarchy example, you would configure *Serving Teams* to have child-types of itself. This guarantees that you can have an unlimited hierarchy.

# Administering Group Types

You administrate group types under Admin Tools \> Settings \> General \> Group Types. When adding or modifying a group type there are many areas of configuration, as pictured below:

![](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-type-setting-v18.png)

Group Type Editor

Let's look at the different Group Types settings you can configure in the *Group Type Detail* block.

## Show/Hide Group Type Settings

The following Group Type settings, located in the General section of the *Group Type Detail* block, control which panels and options should be shown or hidden in that block.

| Setting | Description |
| --- | --- |
| Allow Specific Group Member Attributes | Determines if individual groups of this type are allowed to have their own group member attributes. If selected, the Member Attributes section will be shown when editing the group. |
| Enable Specific Group Requirements | Determines if the Group Requirements section will be shown on the *Group Details* block. |
| Allow Group Sync | Determines if groups of this type are allowed to have Group Syncs. This will show/hide the Group Sync Settings section. If a group of this type already has group syncs, they will be kept. Unchecking this box will **not** prevent them from running. |
| Allow Specific Group Member Workflows | Determines if groups of this type should be allowed to have Group Member Workflows. If selected, the Group Member Workflows section will be shown. |

## Common Group Type Settings

| Setting | Description | Example |
| --- | --- | --- |
| Group Term | This is what Rock will use to describe the group on the various screens. | Group, Family, Event, Team |
| Group Member Term | This is what Rock will use to describe the people in the groups on the various screens. | Member, Individual, Participant |
| Roles | Roles describe the relationship of the individual to the group. Are they a leader? Or just a member? | Leader, Member, Prospect |
| Default Group Role | The default role to use when someone is added to the group. | Selection of one of the roles defined for the group, like Member. |
| Allowed Child Group Types | As we discussed above, child group types help determine the hierarchy of the group tree. This tells Rock what kind of groups can be added as children of the current group. | Serving Teams may allow Child Serving Teams |
| Location Types | The types of locations that can be assigned to the group. | Meeting Location |
| Location Selection Modes | Determines how locations should be selected in Location Picker. | The following options are available: - Named - Allows you to pick from named locations that have been defined under Admin Tools \> Settings \> General \> Named Locations. - Address - Allows the input of a new street address for the location. - Point - Displays a map that allows for the selection of a specific latitude/longitude point. - Geo-fence - Also displays a map that allows for drawing a polygon shape to use as a geo-fence. - Group Member Address - Lists all of the addresses associated with the members of the group. Note that if the address of the group member changes the meeting location will not be automatically updated to this new address. |
| Multiple Locations | Determines if the group can have multiple locations. | True/False |
| Group Attributes | The custom attributes that each group will have. When adding new Group attributes, the explicit authorizations from the Group Type are copied over to the Group attribute. | Meeting Day, Meeting Time, Topic of Study |
| Member Attributes | The custom attributes that each group member will have. | Hours Per Week Serving, Assigned Bus |
| Group Capacity Rule | Rock allows you to set individual capacities for groups. This configuration setting determines how the capacity should be enforced. If *Hard* or *Soft* is chosen, you'll get the option to make capacities required for all groups of this type. | The following options are available: - None - This disables the group capacity features. - Hard - This places a hard limit on the capacity. Once the capacity is reached no additional group members can be added. - Soft - The soft option will warn you when adding a member that is over the group's capacity, but still allows you to add them. This warning only appears in the Group Toolbox, not when adding members from the internal administration pages (e.g., Group Viewer). |
| Groups Require a Campus | This setting will require that all groups of this type have a campus when adding and editing. | True/False |
| Show Administrator | This setting determines if groups of this type support assigning an administrator for each group. Group administrators don't have the security privileges of Leaders, and they aren't members of the group. Generally, the group administrator is only used for internal purposes to identify who is responsible for the group from an organizational perspective. This is super useful in reporting because you can easily identify all the groups associated with an individual without having to add that individual to any of those groups. | True/False |
| Administrator Term | This setting allows you to customize the term used for the administrator of the group. | Administrator, Coordinator, Director |
| Enable Group Tag | This determines if tags are allowed for groups of this type. | True/False |
| Group RSVP Enabled | This setting enables [Group RSVP](#grouprsvp) features for groups of this type. | True/False |
| Enable Inactive Reason | If enabled, an *Inactive Reason* may be provided when inactivating a group. | True/False |
| Require Inactive Reason | Determines whether an *Inactive Reason* must be provided when inactivating a group. | True/False |

## Attendance and Check-in Settings

| Setting | Description | Example |
| --- | --- | --- |
| Takes Attendance | Determines if the group takes attendance. This will help to enable check-in and metrics features. | True/False |
| Weekend Service | Determines if attendance for this group should be counted towards attending a weekend service. For example, the attendance badge on the Person Profile will only consider attendance in groups with this value enabled. | True/False |
| Group Schedule Options | This setting is used when you want to configure a schedule for the groups of this type. The schedule is used for features like group attendance and group member scheduling. The options you select here help determine the types of schedules that can be configured for the groups. | Schedule type options include: - Weekly: This option allows a simple weekly schedule to be selected. When setting up a group of this type, all you'll need to do is select the day of the week the group meets and the start time. We highly recommend that you use this setting as it is the only schedule option that is usable as a filter in the [Group Finder](#groupfinder). - Custom: With this option enabled each group can select its own repeating schedule. This option allows for the most power and flexibility, but the schedule that's created can't be used as a filter in the Group Finder. - Named: The named option allows you to pick the group's schedule from a list of preconfigured schedules. These schedules are configured under Admin Tools \> Settings \> General \> Schedules. Like the *Custom* option this setting can't be used as a filter in the Group Finder. |
| Schedule Exclusions | This setting allows you to define a set of date ranges when all of the groups of this type will not meet regardless of the specific group schedules. This allows you to easily configure breaks and holidays without having to edit each group's schedule individually. | Set of date ranges when groups of this type will not meet. |
| Check-in Rule | Determines how check-in will work if the person is not already in the group. | Add on Check-in (adds the person to the group if they are not already in the group), Already Belongs (the individual must already belong to the group) |
| Group Attendance Requires Location | This option will require that all attendance occurrences have a location. | True/False |
| Group Attendance Requires Schedule | This option will require that all attendance occurrences have a schedule. | True/False |

## Advanced Group Type Settings

These settings will be rarely used, but it's helpful to know they exist as you define your group types.

| Setting | Description | Example |
| --- | --- | --- |
| Purpose | The purpose helps categorize different group types together. This allows you the flexibility of creating multiple group types but at the same time providing a way of 'linking' these various types together with a single 'purpose'. To add a new purpose simply add a new *Defined Value* under Admin Tools \> Settings \> General \> Defined Values \> Group Type Purpose. | While we recommend that you start with a single group type to manage your various serving teams you could over time add new ones. You would then create a purpose to describe them all as serving opportunities. |
| Group Type Attributes | Custom attributes that will be shared by every group of this type. In other words, every group of this type will have the same value of these attributes. | Group Type Attributes are used by the check-in system. Most group types won't have a need for them. |
| Print Using | When printing check-in labels, should the device's printer or the location's printer be used? The options are: - Device Printer - Always print using the device's printer. - Location Printer - Always print at the printer configured for the location. | This setting will have limited value outside of configuring check-ins. |
| Inherited Group Type | This allows you to create a group type that inherits its attributes from another group type. This is helpful when you have two group types that are very similar, but one needs a few more attributes. | Say you have a *Serving Team* group type that covers most of your serving groups. Your worship teams, however, would like to add a special attribute for *Instruments Played*. You want this new group type to have all of the same attributes of the current *Serving Team*. To solve this, add the *Serving Team* group type as the *Inherited Group Type* of the new *Worship Serving Team* group type. |
| Show Connection Status | This allows you to show a person's connection status in a column on group member lists. | This comes in handy for trying to understand a person's connection to your organization at a glance. |
| Show Marital Status | This allows you to show a person's marital status in a column on group member lists. | This comes in handy for quickly viewing a person's marital status. |

# Group Member Roles

People often have special roles in groups. Some are leaders; others have unique duties. To help differentiate the members of a group, you can give each a Group Member Role. The list of possible roles is defined on the group type. For more information on the roles available, you can check out the chapter on [Group Members](#groupmembers).

# Family Roles

As noted above, roles are defined on the group type. While we encourage you to add roles as needed in general, we recommend against adding new roles to Family group types. Using values other than “Adult” or “Child” may cause issues with certain system processes, such as determining Age Classification.


---

## Securing Groups {#securing-groups}

> **Path:** Rock Your Groups > Securing Groups

Securing Groups

Most groups you create will need to have some level of security added to them. They may or may not contain the world’s secrets, but you’ll want to control who can add, edit and/or delete them at the very least.

# Securing Group Types

By adding security to a group type, you control the base security of every group of that type. Let's say your organization adds a new type of group to help manage some classes you're starting. You may want to create a new group type for this initiative where every class is a group of this new type. By adding security to the group type, you can ensure that every group can be viewed and edited by a select handful of people.

To add security to a group type, go to Admin Tools \> Settings \> General \> Group Types. There you will see a list of group types in a table. In the far right column, you will see a button. Clicking this will allow you to set the security for the selected group type.

# Securing A Group

There may be occasions where each group will need different security settings. Don't worry, this is super easy in Rock. To secure a specific group, find the group in the group viewer (People \> Group Viewer). On the group details page, you'll find the same button. Clicking this button will bring up the Rock security dialog where you can adjust the security settings.

Groups have a special *Manage Members* security tab. Anyone with *Manage Members* security can add, edit and delete group members, but they can't edit or delete the group itself. If no permissions are listed under *Manage Members*, it doesn't mean that members can't be managed. Anyone with *Edit* access has *Manage Members* access by default. Also, group Leaders can manage members even if no *Manage Members* permissions are set or if they don't have *Edit* permission.

![Steps Page](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-viewer-edit-security-v18.png)

Group Security

Note the inherited permissions at the bottom of this screen. Inherited security is a very powerful concept with groups. By default, a group will inherit the security of its parent groups and group type. This limits the amount of security configuration each group requires. These inherited rights are only a starting point. You can either build on top of these permissions or override them. The choice, and power, is up to you.

At first you may be tempted to go overboard with your group's security settings. In general, it's best to keep them simple. For instance, in the case of home-based Bible studies you may be tempted to secure each group differently to only allow the leader to edit them. While in certain cases you may need to do this, you could also secure all groups with a generic *Small Group Leader* role. You could then limit which groups a leader was able to navigate to through the configuration of your leader toolbox blocks.

## Group Creator Security

In older versions of Rock, the person who created a new group would automatically have Administrate permissions for the group they added. This behavior can now be controlled via block settings.

The Group Detail block has a setting called *Add Administrate Security to Group Creator*. When this is set to "Yes" then the person who created the group will automatically have the security permission to *Administrate* the new group being added.

The default value for this setting is "No", which means the person creating the group will not be able to administrate the group unless they have permissions from another role that would allow them to do so. If you started off on an older version of Rock, this won't retroactively impact security permissions for any existing groups.

# Group Member Roles

Group member roles play an important part in how groups are secured. Each role can be configured to provide *View* and / or *Edit* rights. This is configured under Admin Tools \> Settings \> General \> Group Types.

# Inherited Permissions

When determining the security of a group it’s important to consider not only the specific permissions of the group but also the inherited permission rules. The inheritance rule for groups is:  
  
Current Group \> Group Type Security \> Parent Group Security \> (continue up the hierarchy until it reaches the root group) \> Group EntityType Security \> Global Default.

The primary inheritance rules come from the group’s hierarchy, but the system has a built in ‘choke point’ check on the security of the group type first. Why is this? Adding a quick check of the group type's security allows specific types of groups to have unique security considerations. Take for example a group type for ‘Addiction Classes’. Adding a check for the group type's security allows a way for limiting visibility to these groups without having to worry about inconsistencies in the security of the group hierarchy. In most cases the group type will not have specific security so this check will not matter, but it’s there if you need it.

If when checking the group’s security, the person is blocked access there’s still one last check to be done. Roles defined on the group type can be configured to provide access to the group. For instance, you can configure the leader of a group to have view/edit rights to that group. Likewise, the member of a group could be set up to have view access. This allows a very simple and flexible way of providing access to external individuals.


---

## Group Strategies {#group-strategies}

> **Path:** Rock Your Groups > Group Strategies

Group Strategies

The flexibility built into Rock groups is very powerful. But like a puzzle when you open the box and dump out the pieces, it can be a little overwhelming to get started. Below are a few strategies for you to consider first. Don’t be afraid to ask others how they have configured their groups. The [Ask](https://www.rockrms.com/Rock/Ask) section of the Rock website is perfect for these kinds of discussions.

# Multiple Group Viewers

Rock comes preconfigured with a general group viewer People \> Group Viewer, but you can add more. Say, for instance, your church has a strong small group ministry. You may want to create a new *Group Viewer* page just for this ministry. You can do this by adding a new page under *People* (or any other page you like) and adding the group viewer blocks to the page as described below.

Group Viewer Blocks

![Group Viewer Blocks](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-blocks-v18.png)

The following blocks are used to make a group viewer page. We recommend that you use the *LeftSidebar Panel* page layout.

1 Group Tree View

Add a group tree view block to the sidebar zone to help you navigate your group hierarchy.

2 Group Detail

Add the group details block to the top of the main zone.

3 Group Member List

Next, add the group member list block under the group details.

When you set up the *Group Tree Block* you can set the root group to start with, and limit which types of groups it will display. This allows you to make a very specific small groups viewer with just a couple of clicks.

# Group Folders

As you start to think about your group hierarchies, make sure that you plan for growth. This might mean that you create special groups in your hierarchy to help categorize your groups. You can think of this like using folders on your computer to help manage all of your files. You could throw all of your files in one folder, but you’d never find anything. Adding folders helps you arrange and sort your groups. While folders add little value to your computer’s file system, these *category groups* can actually be beneficial beyond just organizing. For instance, if you add these category groups to your serving teams, the categories can act as leadership teams for their sub-groups. Take a look at this example of the first impressions serving teams at a large multi-campus church:

![Sample Usher Ministry](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/sample-usher.png)

Sample Serving Hierarchy

Notice how each campus and ministry area has a leadership group. These groups not only help arrange the serving teams, but they can also have members of their own that represent the leadership team for each area.


---

## Group Schedules {#group-schedules}

> **Path:** Rock Your Groups > Group Schedules

Group Schedules

Let's take a brief moment to see the various scheduling options for groups and how these settings affect the features available.

# Types of Group Schedules

There are three types of group schedules that can be configured for a group. To help simplify the editing of a group we allow you to configure which of these options are available to groups of each particular type. For instance, you'll probably want to configure your *Small Groups* to only be configured to allow the *Weekly* schedule. You can select which of these options are available for a specific group type under Admin Tools \> Settings \> General \> Group Types.

## Weekly

This option allows a simple weekly schedule to be selected. When configuring a group, one only needs to select the day of the week the group meets and the start time. We highly recommend that you use this setting because it is the only schedule option that is usable as a filter in the [Group Finder](#groupfinder). For example, if you set your small groups to the *Weekly* schedule option, your website visitors can find groups that meet on a specific day of the week that's convenient for them.

## Custom

With this option enabled, each group can select its own repeating schedule. This option allows for the most power and flexibility, but the schedule created can't be used as a filter in the Group Finder.

## Named

The Named option allows you to pick the group's schedule from a list of preconfigured schedules. These schedules are configured under Admin Tools \> Settings \> General \> Schedules. Like the Custom option, this setting can't be used as a filter in the Group Finder.

# Schedule Exclusions

Picture this: you've just finished entering all of your small groups into the system with their correct schedules and your supervisor just announced that, "groups are taking a two-week break." Not a problem! Adding a *Schedule Exclusion* to the *Small Group* group type will add the exclusion(s) to the schedule of all groups of this type. This is done under Admin Tools \> Settings \> General \> Group Types. This not only keeps the schedule accurate, but it also keeps attendance reminders from being sent while groups are not meeting.


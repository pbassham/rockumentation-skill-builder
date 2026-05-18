---
description: Use when organizing and assigning registrants into groups or teams for events like sports camps after registration closes
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Registration Group Placements

Registration Group Placements

Sometimes registration isn't over once all the information is collected. In fact, sometimes that's just the beginning. That's certainly the case with events like sports teams and camps. After everyone’s registered, you still need to form teams and camp groups. This can be a daunting and laborious task, but that's where *Rock*'s group placement features come to the rescue. They allow you to easily sort registrants into one or more groups with minimal effort.

![Group Placement](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/group-placement-v18.png)

Group Placement

For these tools to kick in, you need to first enable them on your registration template. Let’s take a look at how that’s done.

Registration templates have a panel called *Placement Configuration* where you can define areas into which registrants should be sorted. Ultimately this will mean placing registrants into groups, but those groups can be created and added later in the process. For now, let’s look at the *Placement Configuration* options available in the registration template.

![Registration Template Placement Configuration](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/reg-group-placement-v18.png)

Registration Template Placement Configuration

From the *Placement Configuration* panel pictured above, you can see the list of the template’s placements and a summary of their setup. After your template is configured, each of the items can be accessed in the registration template while placing members into groups, making retrieval easier.  
  
Click the button to add new placements to the list.

![Edit Placement Configuration](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/placement-config-v18.png)

Edit Placement Configuration

To start an *Event Registration* placement, go to the *Registrants* tab for your chosen instance. Then select any icon under *Placements* to view a specific person within a specific placement.

![Alternate Placement Button Screenshot](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/group-placement-start-v18.png)

Alternate Placement Button

Clicking the icon for Alex Decker opens the placement view for her.

![Specific Person Placement Screenshot](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/specific-person-placement-v18.png)

Specific Person Placement

If you’d rather place everyone at once, head to your instance and click a *Group Placement* link to assign the whole group in one go.

![Group Placement From Template Screenshot](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/group-placement-from-template-v18.png)

Group Placement From Template

Now you're in! There are many ways to simplify the *Group Placement* process. Let us assist you.

# Note

You can configure placement views per instance and per template, which keeps large events manageable as you scale.

# Placing From The Template

You can also place multiple instances at once by selecting your *Group Placement* link from the template.

### Event Registration Group Placement

Group Placement Details

![Group Placement Details Screenshot](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/group-placement-details-v18.png)

1 Placement Groups

In the example pictured above, there are three Shared placement areas. This matches the *Placement Configuration* list defined on the template. Group limits and requirements apply, so you can leverage the group’s configuration to help ensure people are placed appropriately.

Press the to make a change.

- **Edit:** Redirects you to the group viewer to edit the group.
- **Detach:** Removes the group from placement without deleting it. (Not shown on Shared Groups)
- **Delete:** Deletes the group from the database. (Not shown on Shared Groups)

2 Sorts and Toggles

- — Sort by name or recent group addition. Defaults to Last Name, First Name.
- — Toggle gender highlighting. Males appear blue with a "Male" label and counter; females appear pink with a "Female" label.
- View Info — View additional info for each registrant. Cards display all selected details from . More on configuring this below.
- — Access more placement options. We'll cover these settings below.

3 Add Group

Click to add a group to the registration instance. You can:

- Add a new group from scratch
- Add Existing Group(s)
- Add multiple child groups from a parent group

**Note:** You can only add groups of the same *Group Type*. Existing group members from your registrants list will be automatically placed.

4 Filters

Use filters to refine visible registrants based on selected attributes. You can filter registrants, groups or group members as long as they have visible attributes. More on this below.

5 Registrants

A searchable list lets you drag and drop individuals into group placements. You can update the configuration icon to display extended info by pressing View Info.

6 Capacity Count/Labels

See group details at a glance, including roles, gender distribution, and data completeness. For example, this Golfing group has 3 people: 2 members, 1 leader, no unknowns (gray), 1 male (blue), and 2 females (pink).

If a group has a capacity, this label appears and updates as registrants are added. Template-based groups inherit capacity from the group type. You can assign individual group capacities as needed. For more, see the [Group Capacity](https://community.rockrms.com/documentation/bookcontent/7#groupcapacity) chapter of the Rock Your Groups guide.

7 Person Search

Search through the people waiting to be placed.

# Multi-Select Functionality

Want to move quicker and place multiple people at once? It's easy!

- **Windows:** Ctrl + Click
- **Mac:** Command + Click

# Real-Time Updates

You don’t need to refresh the page. Group placement updates appear instantly as changes happen across multiple devices.

# Keeping Group Placement Organized

To stay organized, create a Parent Group specifically for placement groups. Place new groups under this parent for simpler configuration and easier management.

Next, let’s look at the placement configuration options available within the instance. These build on the registration template’s placement setup. Click to access them.

## Placement Configuration Settings

![Placement Configuration Settings Screenshot](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/placement-configuration-detail-v18.png)

Placement Configuration Settings

# Wait, where are the attributes?

To see the attributes for people that are configured to display, click View Info. This will display the person's information.

For large groups, filtering helps you focus. Use Filter to refine registrants based on attributes.

### Group Placement Filters

![Group Placement Filters Screenshot](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/group-placement-filter-v18.png)

Group Placement Filters

## Query String Parameters

*Group Placement* just got faster. With query strings, you can pre-fill data and streamline placements. This puts another powerful tool in your belt—use this tool in your belt when you need to jump straight into focused placement flows. This is for users with an advanced knowledge of *Rock*, as it requires knowledge of our URL parameters and the Rock data model.

Choose a mode: *Group*, *Entity Set*, or *Registration*. Each has unique query formats and required parameters.

### URL Formats by Mode

***Group Mode***

```
/GroupPlacement?SourceGroup={GroupId}&DestinationGroupType={GroupTypeId}
```

***Entity Set Mode***

```
/GroupPlacement?EntitySet={EntitySetId}&DestinationGroupType={GroupTypeId}
```

***Registration Mode***

```
/GroupPlacement?RegistrationInstance={InstanceId}&RegistrationTemplatePlacement={PlacementId}
```

### What Each Parameter Does

| Parameter | Description |
| --- | --- |
| `SourceGroup` | ID of the source group. *(Group Mode only)* |
| `EntitySet` | ID of the person entity set. *(Entity Set Mode only)* |
| `DestinationGroupType` | ID of the group type for destination groups. *(Entity Set Mode only)* |
| `SourcePerson` | Optional. Person ID to narrow the source list. |
| `DestinationGroup` | Optional. Comma-separated group IDs that match the `DestinationGroupType`. |
| `AllowMultiplePlacements` | Optional. Set to `true` to allow a person to be placed in more than one group. |
| `RegistrationInstanceId` | ID of the registration instance. *(Registration Mode only)* |
| `RegistrationTemplateId` | ID of the registration template. *(Registration Mode only)* |
| `RegistrationTemplatePlacementId` | ID of the template placement. *(Registration Mode only)* |

### Placement Rules and Defaults

- Always include `DestinationGroupType` unless using *Registration Mode* (it's automatic there).
	- In *Group Mode*, if omitted, Rock defaults to the type of the *Source Group*.
		- In *Entity Set Mode*, `DestinationGroupType` is required.
- Use `DestinationGroup` to manually place people. Separate group IDs with commas.


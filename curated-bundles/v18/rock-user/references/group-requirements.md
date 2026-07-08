---
description: "Use when setting up criteria to determine who can join groups, like background check requirements or other member qualifications"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Requirements

Group Requirements

Group requirements allow you to place criteria on who should be allowed to be in a group. For instance, it's a pretty common feature that to be on a serving team around children you need to have an active background check. Administrating this need manually can be daunting, but with Rock why would you EVER consider doing it by hand?

Setting up group member requirements is a two-step process.

1. Define a Group Requirement.
2. Apply the requirement to each group that needs it.

When a group member is checked to determine if they meet a requirement, the result will be one of the three conditions:

- **Positive:** The group member meets the requirement.
  
- **Negative:** The group member does not meet the requirement.
  
- **Warning:** Something in the middle. The specific definition of warning will depend on the configuration. For a background check, warning might mean that they have a passing background check, but it's about to expire.

Group requirements can be set at the Group Viewer level, which applies member requirements to one specific group, or at the Group Type level, which applies the member requirements to all groups of a certain type. Both options are explained in detail below.

# Defining Group Requirements

You manage group requirements under Admin Tools \> Settings \> General \> Group Requirement Types.

![Group Requirements List](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-requirements-list-v18.png)

Group Requirements List

Editing a requirement allows you to provide the following configuration options.

![Editing Group Requirements](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-requirements-edit-v18.png)

Editing Group Requirements

As noted above, the *Expire Duration* is how many days Rock will wait before checking requirements again. With background checks it typically isn't necessary to re-check every day, or even every week or month. But there are edge cases to consider. For instance, let's say someone passed a background check yesterday and, as a result, shows up as meeting the group requirement. Then today something changes with the requirement (e.g., the Data View is updated) and the person no longer meets the requirement. The *Calculate Group Requirements* job will not re-check this person's requirement until after the *Expire Duration* has passed. In such cases the person will appear as meeting the current requirement, even though they don't.

If someone does not meet a requirement and the due date has not been reached, then the person is considered to be in a warning state.

# Tips for Creating Data Views and SQL Expressions

When creating data views and/or SQL expressions for group requirements keep these two things in mind:

- **Meets** The data view/SQL expression for meets should return a list of all the people in the database that meet this requirement.
- **Warning** This data view/SQL expression should return a list of all the individuals in the database in a warning state. The *Warning* state only applies to people found in both the *Meets* and *Warning* data views.

When you apply a requirement type to a group or group type (see the following sections below for instructions on that) you have the option of allowing group leaders to override the requirement for individual group members. For other staff or volunteers, you can indicate who can override requirements by accessing the security for the requirement type by clicking the icon and adjusting permissions for *Override*.

![Group Requirement Override Permission](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-requirement-override-permission-v18.png)

Group Requirement Override Permission

# Applying Group Requirements to Individual Groups

Once you have defined your requirement, and if *Enable Specific Group Requirements* is enabled at the Group Type level, you can apply the requirement to individual groups. If you have *Administrate* access to a group, you'll notice a panel on the edit screen entitled *Group Requirements*. You can add group requirements from this panel. There is also a setting to keep group members who don't already meet the requirements from being added to a group.

# Limited Restriction

This restriction on adding group members only applies to manually adding people to the group. Workflow actions that add someone to a group will still be able to add people who don't meet the requirement to the group.

![Applying Group Requirements](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-requirements-apply-v18.png)

Applying Group Requirements

# Applying Group Requirements to Group Types

You can also set group member requirements at the Group Type level. This allows you to apply member requirements to all groups of a certain type rather than to each individual group.

![Applying Group Requirements to Group Types](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-type-group-requirements-v18.png)

Group Requirements Section - Group Type Detail Screen

To access your group types, go to Admin Tools \> Settings \> General \> Group Types. Select the group type you want to add requirements to from the Group Type list. In the Group Type Detail screen, expand the Group Requirements section. From here you can either select an existing group requirement to edit or click the button to add a new requirement.

![Adding New Group Requirement](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-requirement-type-v18.png)

Adding New Group Requirement

# Viewing Group Requirements

Once you enable group requirements, you'll notice in the Group Viewer that certain group members may have warning icons next to their names. The yellow icon denotes that the group member is in a warning state, while the red icon indicates that the group requirements are not met.

![Viewing Group Requirements](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-requirements-issue-v18.png)

Viewing Group Requirements

While the icons shown above will give you a general sense of whether a person meets requirements or not, you can switch over to the Requirements tab to view the status of individual requirements.

![Viewing Group Requirements Tab](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-requirements-tab-v18.png)

Viewing Group Requirements Tab

Clicking on a group member will show you details about the group member and the group's requirements. In the group requirements note that you can *Upload Passport* for Ted or mark his Trip Insurance requirement as met.

![Viewing Group Member Details](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/view-group-member-details-v18.png)

Viewing Group Member Details

# Group Requirement Jobs

The Group Requirements features rely on two system jobs. These jobs can be configured under Admin Tools \> Settings \> System \> Jobs Administration.

## Calculate Group Requirements

This job comes pre-configured and running in Rock. Every night it runs to check that all the group members met their requirements.

## Send Group Requirements Notification

This job does not come pre-configured. You can set up this job to send a warning communication to group leaders when a group member does not meet the requirements. These communications will go to group members whose role has been configured with the 'Receives Requirements Notifications' setting. This can be configured under:  
Admin Tools \> Settings \> General \> Group Types.  
Below is a listing of settings for this job.

- **Notification Email Template:** This is the system communication template that you want to use to format the communication. Rock provides a sample communication entitled *Group Requirements Notification* that's configured to meet most needs.
  
- **Group Types:** The group types you want to check the requirements on.
  
- **Notify Parent Leaders:** This setting will notify the roles of parent groups of the group. This follows the hierarchy of the group structure all the way to the top. This ensures that top-level group leaders will receive notifications for all the groups under them.
  
- **Accountability Group:** The group you select here will get a listing of all group members not meeting requirements. Some might call this fascism, but we prefer "inspect what you expect."


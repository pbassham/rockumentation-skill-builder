---
description: "Use when configuring group member roles, permissions, and responsibilities within Rock groups"
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group Members

Group Members

Group members are a key component of groups. Like groups, they come with a ton of options for customization.

# Group Member Roles

People often have special roles in groups. Some are leaders; others have unique duties. To help differentiate the members of a group, you can give each a *Group Member Role*. The list of possible roles is defined on the group type. Each role has the following configuration options:

- **Is Leader:** Determines if the individuals in this role are considered leaders within the group. This option enables additional functionality within Rock.
  
- **Receive Requirements Notifications:** Individuals in this role will receive notifications of group members who do not meet the group's requirements. This only applies if you've configured the [Send Group Requirements Notification](#send-group-requirements-notification) job.
  
- **Can View:** This gives the members of this role the ability to view the group information in various group toolbox blocks.
  
- **Can Edit:** Allows members to edit group information in various group toolbox blocks.
  
- **Can Manage Members:** Individuals with this role will be able to manage group members (e.g., change their role, status, etc.) regardless of the security settings on the group itself.
  
- **Can Take Attendance:** Individuals with this role can take attendance regardless of the group's security settings.
  
- **Can Check In to Group:** This option indicates whether individuals in this role can check in. If disabled, people assigned to this role cannot check in to groups of this type, even if they are members of the group. Note that this only applies if the *Check-in Rule* is set to "Already Enrolled In Group" in your check-in Area configuration. See the [Checking Out Check-in](https://community.rockrms.com/documentation/bookcontent/10#areasandgroups) manual for additional details.
  
- **Minimum Required:** Rock allows you to have rules on how many individuals can have certain roles. This setting configures the minimum number of individuals who must have this role. This will keep you from deleting a group member if the deletion will drop the number of individuals with this role below the minimum.
  
- **Maximum Allowed:** This setting is like the minimum but limits the number of people who are allowed this role. For instance, you might configure a group type to only allow one person to be the leader. You can also use this option to limit the number of adults in a family. A family is a group type.
  
- **Default:** When someone is added to a group, this will be the default role they'll be assigned to. Note: Some blocks will have a block setting that overrides this default. This setting will handle cases when a block does not provide an overriding setting.

# Group Member Status

The status of the group member tells you the person's standing within the group. The available statuses are:

- **Active:** The individual is currently participating in the group.
  
- **Inactive:** The individual is not currently participating in the group. Usually, this status denotes that the person did participate at one point but isn't doing so anymore. How you choose to use this is up to you.
  
- **Pending:** The individual has not yet fully joined the group.

# Group Member Attributes

Group members can also have attributes. This allows you to track custom data points for each person as it relates to their membership in the group. Usually, these *Group Member Attributes* are defined on the *Group Type* under Admin Tools \> Settings \> General \> Group Types. When they're configured here, the attributes will apply to every group member in groups of this type.

You can also add Group Member Attributes to a specific group under People \> Group Viewer \> Group if you have *Administrate* access to the group. This also requires that there is at least one Group Member Attribute defined at the group type level, or that the group type has *Allow Specific Group Member Attributes* enabled.

# Editing a Group Member

Selecting a group member from a group member list will take you to the group member detail screen shown below. From here you can change the role and status of the group member. You will also be able to modify any of the *Group Member Attributes* defined for the group.

![Editing a Group Member](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-member-detail-v18.png)

Editing a Group Member

As pictured above, you'll see a note field for the group member. This is useful for keeping basic notes. Rock uses this field to provide specific information about the group member when processing things like workflows and alternate placements.

If a group member has a note attached, a small note icon will display on the group member list to help identify this fact.

As noted above, you can send a quick communication to the group member from the group member detail screen by clicking the icon. You can send either an email or an SMS text message. This is best used when you just want to send a quick note to a single group member.

![Send Group Member Communication](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/send-group-member-communication-v18.png)

Send Group Member Communication

# Moving Group Members

From the Group Member Detail screen discussed above, it's also possible to move a group member from one group to another by clicking the icon. When you do, you'll be given the option to transfer any group member notes to the new group. If you're working with [Fundraising Groups](#fundraisinggroups) you'll also see an option to move donations to the new fundraising opportunity.

![Moving a Group Member](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/move-group-member-modal-v18.png)

Moving a Group Member

If the group member's current group and the destination group share group member attributes with the same key, then those attributes will be retained. Otherwise, when the group member is moved, the member's attribute information will be lost.

# Group Member Workflows

By now you realize that groups are the backbone of Rock. So, it makes sense that we'd invest in making them as powerful as possible. Group Member Workflows are one of these investments. So, what do they do?

Group Member Workflows are an easy way to trigger workflows to launch when the state of a group member changes for a specific group. These events include:

- Being added to a group
- Being removed from a group
- Member status changes (e.g., status changed from *Pending* to *Active*)
- Member role changes (e.g., role changed from *Attendee* to *Leader*)
- Member attendance
- Member alternate placements (discussed in detail in the next chapter)

The workflows you define for these triggers can be configured for all groups of a specific type under:  
Admin Tools \> Settings \> General \> Group Types or for a specific group under People \> Group Viewer \> Group. Below is the screen you'll see in either case. Note that workflows for a specific group can only be added if *Allow Specific Group Member Workflows* is enabled for the Group Type.

# Required Access

You must have *Administrate* access to a group to be able to configure Group Member Workflows.

![Group Member Workflow Settings](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-member-workflows-v18.png)

Group Member Workflow Settings

See our [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide for more information on working with workflows.

# Tips For Creating Triggered Workflows

When workflows are started from the group member triggers, they will pass in a few attributes for your convenience (as long as the attributes are defined). These include:

- **Person:** The person that the group member represents.
- **Group:** The group that the person is a member of.
- **AttendanceDateTime:** Only applies to the Member Attended Group trigger type and is the date/time that person attended the group.

# Be Persistent

Make sure the triggered workflow is *Automatically Persisted*. This will ensure it works correctly and as intended.

Whenever possible, the workflow will also pass in the *Group Member* model as the entity of the workflow. You can access the group member properties and attributes by using the *Attribute Set From Entity* action combined with Lava like the following:

{{ Entity | Attribute:'HasBook' }}  
{{ Entity.GroupMemberStatus }}  
{{ Entity.GroupRole.Name }}  
{{ Entity.PersonId | PersonById | Property:'PrimaryAlias' | Property:'Guid' }}  

# When Group Member Won't Be Passed

Some member workflow triggers won't pass the group member as the entity. For instance, for the *Member Removed from Group* and *Alternate Placement* workflow types there won't be a group member left to pass when these events are launched.


---

## Group Placement {#group-placement}

> **Path:** Rock Your Groups > Group Placement

Group Placement

It all starts with the icon. Whenever you see this button, you can place a group.

One of the easiest places to start is from the *Group Viewer*, you can place the members of one group into new groups quickly and efficiently.

![Group Placement - Marble Group Screenshot](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-placement-add-group-v18.png)

Group Placement - Add Group

Once you're on the *Placement* screen, you can either add groups manually or use a configured [Registration Template](https://community.rockrms.com/documentation/bookcontent/29#registrationgroupplacements) to streamline the setup.

# Match Group Types Carefully

Be sure the template matches the *Group Type* of the group you're placing to avoid errors.

# Using the Group Placement Block

You can add the standalone *Group Placement* block to any page. To supply the block with the needed group info, you must supply the info through URL parameters (more on that in the [Registration Group Placements chapter of the Event & Calendar Guide](https://community.rockrms.com/documentation/bookcontent/29#registrationgroupplacements)).

For more on Group Placement, see the [Event Registration docs](https://community.rockrms.com/documentation/bookcontent/29#registrationgroupplacements).


---

## Alternate Placements {#alternate-placements}

> **Path:** Rock Your Groups > Alternate Placements

Alternate Placements

In some group usage scenarios, you may want group leaders to be able to remove someone from their group but not have the group member fall to the wayside. Alternate placements allow you to do just that.

The first step is to configure the group type to have an alternate placement group member workflow. We discussed creating these workflows in the previous chapter. The *Member Placed Elsewhere* workflow trigger type has two options: *Show Note* and *Require Note*. This allows the group leader to notate the reason why they are seeking to place the group member elsewhere.

![Configuring an Alternate Placement Workflow](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/alternate-placement-setup-v18.png)

Configuring an Alternate Placement Workflow

The *Group Member Detail* screen contains a button that allows you to initiate an alternate placement workflow. When you click this button, Rock displays the *Move Group Member* window, where you can select which configured workflow to launch (if there is more than one) and allow the leader to enter a note (if it's configured to do that).

![Alternate Placement Button](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/alternate-placement-button-v18.png)

Alternate Placement Button

![Configuring an Alternate Placement Note](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/move-group-member-modal-v18.png)

Alternate Placement

When the Move button is clicked, the workflow is launched, and the person is removed from the group.

# Tips For Creating Triggered Workflows

When workflows are started from the group member triggers, they will pass in a few attributes for your convenience. These include:

- **Person:** The person that the group member represents.
- **Group:** The group that the person is a member of.
- **Note:** The note that was entered by the group leader.
- **Group Member Status:** The status that the group member was when the workflow was launched.
- **Group Member Role:** The role name of the group member when the workflow was launched.
- Any attributes that match those of the group member attributes configured for the group.


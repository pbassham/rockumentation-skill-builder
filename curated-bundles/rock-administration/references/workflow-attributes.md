---
description: "Use when you need to assign values to workflow attributes, including setting them from entities, persons, templates, or user context"
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation > Action Categories > Workflow Attributes

# Workflow Attributes

All the details for the workflow attributes category.

 # Attribute Set File From Lava

Show Details

v7.0

Sets the attribute as a text file that is generated from a Lava template.

This action will create a text file using a Lava template, then assign the resulting file to a workflow attribute. This action is useful when you need to dynamically create a text file using Lava, and then use that file in another workflow action.

![](https://community.rockrms.com/GetImage.ashx?Guid=52783c4f-ccb0-4775-ae4e-090d1811dd45)

 # Attribute Set From Entity

Show Details

v1.0

Sets the attribute from the contents of an entity that has been passed into the workflow.

When some workflows are started, they are passed an entity in the process. As an example, take workflows that are launched from the *Actions* list on the *Person Profile* screen. When these workflows are launched, they are passed an entity; in this case the profile person. This workflow action can assign the passed entity to an attribute, using a Lava template (via `{{Entity}}`), so that it can be used by subsequent activities and actions. Likewise, when a workflow is launched from a trigger the saved/updated object is passed as the entity to workflow.

When working with this action be sure to read the help text as it will guide you through many of the options.

![](https://community.rockrms.com/GetImage.ashx?Guid=10b40b4c-5650-4d57-b05c-9bd7c15ef4c1)

 # Attribute Set From Person

Show Details

v1.0

Sets a workflow attribute to a person you select.

This action will assign a selected person to a workflow attribute. This action is useful when you need to select a specific person to enter into an attribute.

![](https://community.rockrms.com/GetImage.ashx?Guid=c5a9afc9-4be7-4303-a850-daa2652f8c1a)

 # Attribute Set to Current Person

Show Details

v1.0

Sets a workflow attribute to the currently logged in user.

This action sets the selected attribute to the current person. It's only valid if it's being run by a person through their interaction with a Rock page; most often using the *User Entry Form* action. In these cases this action is very helpful in storing the name of the person who completed the form.

![](https://community.rockrms.com/GetImage.ashx?Guid=bfb7f54f-4fa1-496f-a12f-6c0d341a3ffa)

 # Attribute Set to Group Leader

Show Details

v4.0

Sets the workflow attribute to the leader of the group you specify.

This action sets the selected attribute to a group leader. This action is useful when you need to select a group leader in a specific group. If a group has multiple leaders (really a role with IsLeader property), the first one will be selected.

![](https://community.rockrms.com/GetImage.ashx?Guid=488b4d12-643c-41d0-a2aa-c3185723a7f6)

 # Attribute Set to Initiator

Show Details

v1.0

Sets the attribute to the person who initiated the workflow.

The *Initiator* field is a part of every workflow. It defines who started or launched each workflow. While each workflow has an initiator, the initiator field can't be used by most actions until it's assigned to an attribute. That's what this action is all about.

![](https://community.rockrms.com/GetImage.ashx?Guid=c688cdf5-ef1c-498b-9b2c-ff9fbe25e054)

 # Set Attribute Value

Show Details

v1.0

Sets the attribute to text, a Lava expression or another attribute.

While the name of this action is fairly descriptive, it may not be clear as to when you would use it. This action sets the contents of an attribute to either text you provide or the contents of another attribute. The power of setting it to text is that you can use Lava merge fields. This allows you to string together one or more attributes using Lava’s powerful formatting functions.

Setting an attribute to the contents of another attribute might seem a little redundant. However, there are times that you might expect an attribute value to change and you want to keep a copy of its previous value.

When using this action to set a Workflow attribute of type Person via the Text Value, you must return the GUID of the *PersonAlias* record, not the GUID of a *Person* record.

![](https://community.rockrms.com/GetImage.ashx?Guid=01ff4e7e-5e88-4548-9cc9-45d72aede0b0)


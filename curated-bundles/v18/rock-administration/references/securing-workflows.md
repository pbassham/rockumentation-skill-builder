---
description: "Use when configuring workflow type security, permissions, and access controls for Rock administrators and staff roles"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Securing Workflows

Securing Workflows

While we've already covered workflow security in other chapters, we thought we'd summarize workflow security in one place. This should give you a good understanding of what's possible.

# Editing A Workflow Type

To be able to add or edit a workflow type, you’ll need *Edit* access to the workflow configuration page  
(Admin Tools \> General Settings \> Workflow Configuration)  
and the *Workflow Type Detail* block on it. While the *Rock Administrator* role has full access by default, *Workflow Types* inherit security from their parent *Category*. This means anyone with *Edit* permissions at the category level can also manage, clone or delete workflows within that category.

# Simple Security

To simplify administration, security flows from the *Category* down to the individual *Workflow Type*. If a team needs the ability to Clone or Delete forms in the *Form Builder*, you simply need to grant them *Edit* permissions on the parent *Category*. This removes the need to manually add security to every new workflow created.

# Workflow Navigation Page

The workflow navigation page (Tools \> Workflows) is a great place for your staff to start and manage workflows. Below is a summary of the security needed to interact with the various components of this page.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-nav-security-v18.png)

Securing Workflow Navigation

# Workflow Type Not A Link?

You may notice that when some workflow types are listed, they are not linked. This means the workflow type does not have an entry form configured for the current person.

# Workflow Entry and URL Links

The following security is required for the Workflow Entry block:

- The person must be authorized to *View* the workflow type in order to enter information.
- The first active action form that the person is assigned to will be displayed.
- The person must also be authorized to either *Edit* the block or *View* the activity type.

# Workflow List

The Workflow List block requires that a person must be authorized to *Edit* workflow types in order to view a list or add/edit/delete a workflow.

# Workflow Detail

The following security is required on the Workflow Detail block:

- The person must be authorized to *View* the workflow in order to view read-only details.
- The person must be authorized to *Edit* the block, or *Edit* the workflow, in order to edit the workflow.

# My Workflows

The My Workflows block has the following security settings.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/my-workflows-security-v18.png)

Securing My Workflows


---

## Linking To Workflows {#linking-to-workflows}

> **Path:** Blasting Off With Workflows > Linking To Workflows

Linking To Workflows

All of the workflow entry and management tools in Rock should be able to meet all of your needs. If you want to extend some of the functionality, say linking the *Dynamic Data* block with workflows, it's helpful to know some tricks about interacting with workflows using URL links.

# Workflow Entry

The *Workflow Entry* block checks for a *WorkflowId* or *WorkflowGuid* parameter in the URL. If found, it will load the existing workflow. If parameters are not included, or a workflow is not found, a new workflow is created (in this case, a *WorkflowTypeId* query string parameter is required). Either way, the workflow is processed, and the block will look for the first active form action on the first active activity.

If a *command* query string parameter is included, the block will immediately process the form, assuming the person selected the included action.

The out-of-the-box workflow entry page is configured with the route of http://yourservername/WorkflowEntry/17. Note that in this case, 17 is the *WorkflowTypeId*.


---

## A Few Technical Details {#a-few-technical-details}

> **Path:** Blasting Off With Workflows > A Few Technical Details

A Few Technical Details

# Attribute Values

When working with workflows and attributes, it's helpful (actually it's pretty much essential) to know how those attributes store their values. Below is a list of a few commonly used attribute field types, with a description of how the value is stored internally.

| Field Type | Stored Value |
| --- | --- |
| Boolean | 'True' or 'False' |
| Campus | A campus's GUID |
| Defined Value | A comma-delimited list of defined value GUIDs (if attribute is not configured for multiple values, there should only be one GUID) |
| Group | A group's GUID |
| Group Member | A GroupMember Record's GUID |
| Multi-Select | A comma-delimited list of the values (e.g., 1,2,3) of the selected items |
| Person | A person alias GUID |
| Single-Select | The value (e.g., "1") of the selected item |
| Text | The value of the textbox |

  

The full list of field types can be found in our [Workflows & Lava](https://community.rockrms.com/lava/workflows) documentation.

When creating workflow actions that update an attribute value, make sure to reference this list so that your attribute values get set correctly.


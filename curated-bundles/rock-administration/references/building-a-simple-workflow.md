---
description: "Use when configuring workflow details, attributes, activities and actions for approval processes in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Building A Simple Workflow

Building A Simple Workflow

Now let’s build a sample workflow from scratch. We’ll use the sample *Position Approval* as our guide. This process has been pre-configured in your Rock install under the *Samples* category. You might review the overview of the sample workflow in the chapter [What's The Use](#whatstheuse) so you have a good understanding of the purpose and steps of this workflow.

# Workflow Details

Workflow types are configured under Admin Tools \> General Settings \> Workflow Configuration. After adding the workflow, we'll complete the detail section.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-edit-1-v18.png)

Workflow Details

# Workflow Attributes

Next, we will define all the attributes for our workflow. The attributes for the position request workflow are pictured below. Make note of the different field types for these attributes, as this workflow uses several of them.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-edit-2-v13.png)

Workflow Attributes

# Workflow Activities

Finally, we'll define the activities and actions for our workflow. The activities for this workflow are shown below. Note how the *Initial Entry* activity is in green. This means that it's configured to activate when the workflow is initially activated.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-edit-3-v13.png)

Workflow Activities

Let's walk through each activity now to look at its actions. We won't look at each setting of each action, but we'll give you an idea of the purpose of each.

## Initial Entry

The purpose of this activity is to get the person's position request details. Some of these details will depend on whether they are asking for a full-time or part-time request.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-edit-activity-1-v13.png)

Initial Entry Activity

## HR Entry

This activity is responsible for getting additional details from the human resources department. It has the following actions.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-edit-activity-2-v13.png)

HR Entry Activity

## Approval Process

This activity is responsible for getting the approval for the position. Achieving this might be easier than you thought. Consider these actions.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-edit-activity-3-v13.png)

Approval Process Activity

## Approved / Denied Activities

These activities are configured pretty much the same way, so we'll look at them together.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-edit-activity-4-v13.png)

Approved / Denied Activities

# Workflow Tips

Below are some tips to keep in mind when creating new workflows.

- There are different ways to use workflows to send emails to groups. One approach is to set up an attribute that defines the group, then add an Email Send action type pointed to the attribute. Below is an example of what that would look like.
	![Add Workflow Attribute](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-attribute-for-group-emails-v18.png)
	Add Workflow Attribute
	![Configure Email Send Action](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-email-send-for-group-emails-v18.png)
	Configure Email Send Action
- While not required in all cases, it's wise to have your last action set the activity as complete when it's done. If you don't set this, all of the actions will need to be complete before the activity is marked complete. And if you're using action filters, this might not always occur.

- Don't forget that you can activate a workflow from a workflow. If there's something small that isn't working quite right in your big workflow, consider creating a small helper workflow to get the job done.

- There are many resources to help you build the workflow you need. Aside from the [Workflow Actions Documentation](https://community.rockrms.com/WorkflowActions), other guides may give insight into building the right workflow the right way. For example, our [Engagement](https://community.rockrms.com/documentation/bookcontent/39) manual has an entire chapter on [Connection Workflows](https://community.rockrms.com/documentation/bookcontent/39#connectionworkflows).


---

## Built-In Workflows {#built-in-workflows}

> **Path:** Blasting Off With Workflows > Built-In Workflows

Built-In Workflows

Rock ships with a several workflows to help you get started. Hopefully you'll be able to use them in your organization but, if not, they'll act as patterns when you start to write your own. We cover the details of some of these workflows below.

# Remember You Can Copy

Don't forget that you can copy a current workflow to create a clone of it. This clone is a great place to start if your workflow is similar.

# Unattended Check-in

You’ll notice the check-in workflow on the *Workflow Configuration* screen. This is the workflow that runs Rock's check-in system. Unless you know exactly what you’re doing, we recommend that you do not alter this workflow.

# Person Data Error

The *Person Data Error* workflow is an example of a workflow that launches from the action menu on the *Person Details* screen. It allows your organization's staff to note any issues with the data that they might not know how to fix. This is a great pattern to use when you go to create your own person profile actions.

# Photo Request

This is another example of a workflow that launches from the action menu on the *Person Profile* page. After ensuring the person hasn't opted out, this workflow type will present a form to the person who launched it, where a custom message can be provided. The custom message, and a link to upload a photo, will be emailed to the person. The email also contains opt-out and unsubscribe options for the person.

# Request Assessment

This workflow also launches from the action menu on the *Person Profile* page. The purpose of this workflow type is to send an email to a person to request that they take one or more of Rock's assessments. The person who initiates the workflow is asked which assessments should be requested and has the option of providing a custom message that will be included in the email.

# External Inquiry

This workflow is used on the *Contact Us* page of the external website. It's meant to help direct your guest's questions to the correct staff. It also helps to provide accountability that your guest's questions will be answered in a prompt timeframe.

# Facilities Request / IT Support

These two workflows act as a request ticketing system for your facilities and information technology teams. Using them allows your staff to report issues or request new services.

# Profile Change Request

A workflow of this type will be launched from the *My Account* page on the external site when a person clicks the Request Additional Changes button. The person will type their request and submit it, at which point the workflow will alert an assigned staff member or volunteer via email. The staff member or volunteer can then provide a resolution for the item, which will be emailed to the initial requester to notify them that the change has been made.


---

## Workflow Notes {#workflow-notes}

> **Path:** Blasting Off With Workflows > Workflow Notes

Workflow Notes

Workflows are a powerful tool to automate your organization's processes. When you're building them, you'll want to pay close attention to how individuals interact with them. You especially want people to be able to interpret the current state of the workflow and a history of events that have occurred. To help with that we've created workflow notes. Let's look at a few ways that notes can be integrated into your workflows.

# Adding Notes From the Workflow Details

When looking at the details of a workflow you'll notice that you have the option to add notes. This is a great way to be able to provide context or additional information at any time (even after a workflow has been completed).

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/notes-workflow-details-v18.png)

Adding Notes From the Workflow Details

# Adding Notes From Entry Forms

Another way to add notes is from entry forms. You'll notice on the *Form* action there is a setting to *Enable Note Entry*. When it's set, you'll see the note entry form next to the selected form fields.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/notes-entry-form-v18.png)

Adding Notes From Entry Forms

# Adding Notes From Workflow Actions

The final way to add workflow notes is using workflow actions. This allows you, the workflow author, to automatically create notes about the workflow processes.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/notes-actions-v13.png)

Adding Notes From Workflow Actions

# Adding New Note Types

Feel free to add new note types by adding more *Defined Values*. When you add new types, you can customize the note's icon. The name of the note type will also be placed as a CSS class on the note markup to allow you to style it. For example, the note type *System Note* would have the CSS class *system-note* applied.


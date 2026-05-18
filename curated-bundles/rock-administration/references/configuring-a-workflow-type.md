---
description: "Use when configuring or viewing workflow types in Rock RMS, including setting up details, advanced settings, attributes, activities, and actions"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Configuring A Workflow Type

Configuring A Workflow Type

Let's take a tour of the workflow configurator located under Admin Tools \> General Settings \> Workflow Configuration. We'll break the screen down into parts to help simplify our discussion.

# Viewing A Workflow Type

On the *Workflow Configuration* detail screen, you can view important information about your workflow type.

![Workflow Type View](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-config-view-v18.png)

Workflow Configuration

# Editing A Workflow Type

Clicking the Edit button takes you to the edit screen for that workflow type. This screen is made up of several sections, which are explained below.

## Details

The first section is the *Details* section. Let's take a look at what it includes.

![Workflow Type Details](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Workflow-Configuration-v18.png)

Workflow Type Details

## Advanced Settings

The next section is the *Advanced Settings* section.

![Workflow Advanced Settings](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-config-advanced-v18.png)

Workflow Advanced Settings

## Attributes

Next is the *Attributes* section.

![Workflow Type Attributes](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-config-attributes-v18.png)

Workflow Type Attributes

Attributes are the data elements your workflow needs to be able to process. In this section you configure each of these elements and define the types of data they will store (i.e., text, numbers, dates, people, groups, etc.)

While it might be tempting to rush and define your attributes quickly by providing only a name and field type, it's wise to slow down and provide a good description of how the attribute will be used in the workflow. Trust us, you'll thank yourself later. Also, consider if a default value would make sense in your workflow.

# Save Time

Sometimes adding a good default value for your attribute can save steps in your workflow as you will only need to set the value of an attribute if a change is needed.

## Activities/Actions

Finally, there is the *Activities* section.

![Workflow Type Activities](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-config-activities-v18.png)

Workflow Type Activities

Activities and actions are the meat and potatoes of workflows. They control the flow logic that your workflow will use when it's processed. While we'll be talking about activities and actions in detail later, know that this is where you'll configure them for your workflow types.

# Tip

Be sure to check out the Workflow Control section in the [Workflow Actions Documentation](https://community.rockrms.com/WorkflowActionCategory?Category=2) for more details.

As you build more complex workflows you might start to get confused about which box is an activity and which is an action. Just remember activities have a gear and lightning bolt () next to their titles while actions have a single bolt ().


---

## Components Of A Workflow {#components-of-a-workflow}

> **Path:** Blasting Off With Workflows > Components Of A Workflow

Components Of A Workflow

Think of workflows like a big box of Lego® bricks. Each piece has a specific shape that determines how it can be used. To become a *Master Builder*, you must understand the possibilities that lie inside each type of brick. You also need to know how pieces work together. Before we get started with building an actual workflow let's find out a bit more about the blocks we'll be building with.

# Workflow Types vs. Workflows

Let's start with a little vocabulary. *Workflow Types* are the configuration patterns that a specific *Workflow* will use to execute. As an example, you might configure an *HR Position Approval* workflow type that an employee uses to initiate an *IT Director Position Request* workflow.

# Attributes

*Attributes* are the data elements your workflow needs to be able to process. For the *External Inquiry* example workflow type that ships with Rock, we'll need information about the requester (name, email address, phone) as well as the topic, message and campus. Once we have the input from the guest, we'll also need attributes that store the person being assigned to the inquiry as well as any notes that they enter.

Attributes can represent many types of data including text, numbers, images, locations, a person, date and more.

# Activities

*Activities* are groupings of actions that function together to complete a unit of work. How many activities you use in a particular workflow is part science and part art, but in most cases, there is not a right answer. In general, though, think of activities as phases of your workflow. In our *External Inquiry* example there is an activity for the initial entry of the request, and activities for each category of the inquiry (pastoral inquiry, website inquiry, finance inquiry, etc.)

When you configure your workflow, you'll set certain activities to *Activate* at the start of the workflow. These activities can then activate other activities depending on the nature of the input and workflow logic.

While most attributes will be defined for the entire workflow, it is also possible to define attributes that are specific to an activity. This allows for activities to have their own set of data items.

# Actions

Activities are made up of *Actions*. Actions are the smallest unit of work in a workflow. Don't let their size fool you though. Like ants, they may be small, but they can move large objects by working together. Some examples of what actions can do are:

- Send an email.
- Set the value of an attribute.
- Present the person with a form to enter data.
- Run a SQL query.
- Activate a new activity.

# Status

Every instance of a workflow has a *Status*. There's nothing magical about the status. In fact, it's just a text field that's updated by the actions as they process through the workflow. A well-crafted workflow uses the status field to help communicate the stage the workflow is in. For instance, a work request workflow might use statuses like *Pending*, *Open,* or *Closed*.


---

## Workflow Import/Export {#workflow-import-export}

> **Path:** Blasting Off With Workflows > Workflow Import/Export

Sometimes a workflow you create is worth sharing with those outside of your organization to other community members using Rock! You can do this by using the workflow export option.  
Navigate to Admin Tools \> Power Tools \> Workflow Import/Export.

# Import/Export Details

Now we all know that workflows can be complex and very specific to your organization. In the event that you have a workflow that isn’t so custom, this ability can be a game changer for those in the Rock community. Below is a general overview of the Export/Import page.

# Some workflows may not export correctly

Complex workflows may have issues being exported! Be sure to always double check your export before sharing it. Feel free to use the Rock Demo site to test it out if you'd like!

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-import-export-v18.png)

Workflow Import/Export


---

## Activities {#activities}

> **Path:** Blasting Off With Workflows > Activities

Now that we have taken a tour of the workflow configuration screen, let's start talking turkey. Activities are groupings of actions that work together to complete a unit of work. If you think of your workflow as a flow chart on paper, activities would be the boxes (generally speaking) while the actions would be the logical steps needed to execute the task.

There really is no right answer regarding how many activities a workflow should have. Like a box of Lego® bricks, you can use different pieces in different ways and still end up with the same output. The best way to get a feel for activities is experience. Before we walk through building a sample workflow though, let’s look at some of the basic configuration options for activities.

# Activation

Activities won't run until they are activated by the workflow engine. There are two ways that an activity is activated:

1. **Start-up:** You can configure certain activities to be activated when a workflow starts.
2. **Action Activation:** If an activity is not activated at start-up, then it must be activated by an action on an activity that was.

Simply defining an activity doesn't guarantee that it will ever be executed. If it is not activated with the start of a workflow and no action ever activates it, it will never run.

# Activities Don't always Run

It's not uncommon for an activity to never run. In many workflows the flow control logic you define might only run certain activities based on the input provided.

# Configuring Activities

When you add a new activity to a workflow type, you'll see a new blank activity panel. The configuration options are shown below:

![Activity Overview](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/activity-overview-v13.png)

Activity Overview

# Activity Attributes

Like workflow attributes, activity attributes allow you to store the data needed to execute your workflow. Many workflows can get by with using just workflow attributes. But there will be times when a specific activity is run more than once. If you'd like to keep track of data for each execution, you'll need to define activity attributes. The data in these attributes is only available within the specific activity instance.

As an example, say you had an activity that seeks approval for a purchase order. As a part of the approval, you might want to allow the approver to enter notes about their decision. You'd also like your workflow to allow the approval step to be re-run until an approval is received (for instance the approver may deny it at first, it goes back to the requester who edits it and then re-submits it for approval). If the approval note was stored as a workflow attribute, it would be overwritten each time the approval activity is run. When defined as an activity attribute, each instance of the activity would have its own instance of the note attribute.

# Accessing Activity Attributes using Lava

The proper Lava to use when you're working with activity attributes will start with "Activity" rather than "Workflow" as shown in the examples below:  
  
`{{ Activity | Attribute:'ApprovalNote' }}`  
  
`{% assign approvalNote = Activity | Attribute:'ApprovalNote' %}`

# Assignment

Activities can be assigned to a specific person or group. While security determines who's allowed to view or edit an activity, the assignment describes who is responsible for completing it. Assignment only comes into play for activities that must interact with a person (mainly through entry forms). Assignments help workflows prompt the right people to enter the data that is needed. We'll touch more on assignments in the [Working With Entry Forms](#workingwithentryforms) chapter.


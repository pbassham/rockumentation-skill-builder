---
description: Use when setting up automated workflows to trigger actions based on entity changes or chat messages in Rock
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Automations

With Automations, you can set Rock to respond the moment something happens. That means less time repeating the same tasks, Rock will work for you even while you sleep. Whether it’s updating data, launching workflows or notifying your team, automations keep processes moving in the background so your team can stay focused on the big picture.

To start working with Automations, navigate to Admin Tools \> Settings \> Automations.

To understand how automations are configured, we will see an example set up. The following automation runs a workflow and some lava when any adult's connection status switches from that of an Attendee to a Member.

![Automation Detail](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/automation-detail-v18.png)

Automation Detail

There are two big components for every automation:

- *Triggers* - The occurrence or set of occurrences that trigger the start of an automation.
- *Events* - What happens when the automation runs.

This example highlights how an automation is built around two core elements: the condition that causes it to run and the action it takes in response. Let’s start by looking at the first of those elements — the trigger.

## Triggers

For an automation to start, it needs a trigger. In this example we are using an *Entity Change* as the Trigger Type (more on this later). This tracks any addition, deletion or change to an entity. There are other types, but we will highlight this one for now.

![Automation Trigger Detail](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/automation-trigger-detail-v18.png)

Automation Trigger Detail

Selecting *Advanced* for Trigger Criteria allows you to use [Dynamic LINQ Syntax](https://community.rockrms.com/developer/dynamic-linq-syntax) to make more complex dependencies.

Now our actions will run whenever a person in the database is an adult and their status is changed from Attendee to Member.

We will learn more about *Actions* in a moment, but first it's important to understand *Triggers* more deeply.

### Trigger Types

*Trigger Types* are the cranks that spin the gears of Automation. Each have unique configuration and currently there are two types:

- *Entity Change*
- *Chat Message*

For more on how the *Chat Message Trigger Type* works, see the [Fallback Chat Notifications](https://community.rockrms.com/documentation/bookcontent/8/363#fallbackchatnotifications) chapter in the Communications guide.

Once a *Trigger Type* is selected, the criteria for triggering must be defined.

### Trigger Criteria

*Trigger Criteria* filters under what conditions an Automation is triggered. This varies by the *Trigger Type* selected.

### Entity Change Trigger Criteria

![Entity Change Trigger Criteria](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/entity-change-trigger-criteria-v18.png)

Entity Change Trigger Criteria

Once the trigger conditions are met, the *Event* defines the action that Rock takes next.

## Events

Now that we've defined when our Automation will be triggered, let's move to the next part of an Automation, defining what happens when it's launched. Note that *Event* options are the same regardless of *Trigger Type*.

Continuing with our *Adult Connection Status Change* example, we will start the "*Launch Workflow*" event, triggering the "*Member Welcome*" workflow, which will set up the *Person Profile* for new members.

![Event Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/automation-event-settings-v18.png)

Event Settings

In addition to a Workflow Launch our Automation will run a "*Lava Event*".

![Lava Event Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/lava-event-new-v19.png)

Lava Event Settings

This event:

- Saves today’s date to a *MembershipDate* Person Attribute
- Logs a short note to a *MembershipNote* Person Attribute

When using Lava in Automations, you have many valuable fields to draw from to provide context:

- **Entity**: The entity that was added, modified or deleted.
- **Person**: The person that added, modified or deleted the entity.
- **OriginalValues**: The original values of the entity before it was modified. This is only valid if State is Modified.
- **ModifiedProperties**: The names of the properties that were modified on the entity. This is only valid if State is Modified.
- **State**: The state of the entity during the save operation.

And there you have it, we made an Automation that sets up data for new adult members, no human action needed! Now you have seen an example of Lava and Workflows, but there's more *Events* to choose from.

## Automation Events List

Below is a complete list of *Events* that can be run for an Automation.

- Launch Workflow
![Launch Workflow Event](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/automation-event-settings-v18.png)

Launch Workflow Event

- Lava Event
![Lava Event](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/lava-event-new-v19.png)

Lava Event

- Log Message
![Log Message Event](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/automation-event-settings-3-v18.png)

Log Message Event

- Send Fallback Chat Notification
![Send Fallback Chat Notification Event](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/automation-event-settings-4-v18.png)

Send Fallback Chat Notification Event

With a trigger and event configured--and the Save button pressed--the automation runs on its own. Now you are free to lean back in your chair and put your hands behind your head.


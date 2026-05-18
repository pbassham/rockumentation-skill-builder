---
description: Use when managing workflow control actions like activating or resetting activities and actions within Rock workflows
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation > Action Categories > Workflow Control

# Workflow Control

All the details for the workflow control category.

 # Activate Actions

Show Details

v1.0

Reset all of the actions on the activity. A bit like the 'Do Over' button.

The *Activate Actions* activity is like a *clear history* button for the current activity. When this action is run, all actions for the current activity are set back to *Uncomplete*. So next time this activity is processed, all actions will be run again. The current processing will continue however, so further actions will execute and possibly be completed. Normal use of this action would be to place it at the end of your activity.

![](https://community.rockrms.com/GetImage.ashx?Guid=4d73d19c-f694-4527-821c-9b5ef2a37756)  
**Additional Details**

**IMPORTANT NOTES:**

If you have the "Action is Completed on Success" option checked in your 'Activate Actions' action, then the Action will only trigger once. It does not "uncomplete' itself, only the other actions in the activity. So, the Activity will run through exactly twice. To have the Activity endlessly repeat, make sure this option is not checked on the Activate Actions action.

If you make changes to an Activity that is implementing the Activate Actions action (add or remove other Actions, for example), those changes will not be reflected in existing Activity instances. Only instances of the Activity actually created *after* the changes are made will see those changes.

When using this action as part of a looping Activity (Daily Loop with a Delay Action at the start, for example), if you don't blank the 'Delay Activated' Attribute value, the Delay will be essentially skipped. This is because the DateTime value in the attribute will be in the past after the first time through. The Delay Action only sets the value of the 'Delay Activated' Activity Attribute *if* it is blank when the Delay Action processes. Otherwise, the Delay Action just checks the value to see if it should continue delaying or proceed through the Activity. So, you need to blank the 'Delay Activated' Attribute value so it is reset each time through. This is true for any other attribute values that need to be at a known/defined starting state for the Activity.

Also know that the Delay Action will not fire until the next workflow processing window. So, for each time through the Activity *after* the first time, the "real" delay time will be: Remainder Of Workflow Processing Window + Delay Action Value. Example: If your workflows are processed every 10 minutes and you have a Delay Action set for 30 minutes, your non-first times through your Activity will have a 'real' delay to around 40 minutes.

 # Activate Activity

Show Details

v1.0

Starts up a new workflow activity.

This action will launch (aka activate) a new activity of the type that you choose. This action is used heavily to control the branching logic of the workflow. The use of action filters is very powerful with this action.

![](https://community.rockrms.com/GetImage.ashx?Guid=0a9e2513-6a8e-46aa-b3f1-4cb7f78fbc8b)

 # Activate Activity in Other Workflow

Show Details

v6.0

Starts an activity in another workflow

This action activates a specific activity in a specific instance of another workflow. This is really useful for terminating a workflow you've activated using the *Activate Workflow* action. ![](https://community.rockrms.com/GetImage.ashx?Guid=863bac97-dce3-4158-a3d6-309abec0a984)

 # Activate Activity in Other Workflow on Match

Show Details

v6.0

Activates an activity in all workflows where an attribute matches

This action activates a new activity on all workflows that the activity belongs to when a given attribute matches a specific value. This is useful to activate a cleanup activity in a workflow where you don't know the workflow id but you do know about the value of a specific attribute in the workflow you'd like to complete. ![](https://community.rockrms.com/GetImage.ashx?Guid=131f67ce-d7ee-4ecd-8fa2-e4ff8a068f8e)

 # Activate Workflow

Show Details

v6.0

Starts up a new workflow with any attribute values your new workflow needs.

This action launches a new workflow passing in any attribute values from your existing workflow. This action allows you to break up workflows into modular chunks making them easier to maintain, reuse, and build. ![](https://community.rockrms.com/GetImage.ashx?Guid=d369a4dc-dd78-4a30-8501-f4dd82deb4f0)

 # Activity Assign from Attribute Value

Show Details

v1.0

Assigns the activity based on a workflow attribute.

Activities can be assigned to a person or group to help distinguish who is responsible for ensuring that the activity is completed if there are manual steps to complete. This action will set the assignee of the current activity to the value of a workflow attribute.

![](https://community.rockrms.com/GetImage.ashx?Guid=e3bcee5c-d0cf-4f04-8c03-a78dd1201518)

 # Activity Assign to Group / Activity Assign to Person / Activity Assign to Security Role

Show Details

v1.0

Three different actions to assign responsibility for an activity.

These three actions do very similar things, so we'll group them together. Like the previous action, they set the assignee of an activity based on a provided person, group or security role. It’s best to avoid assigning actions to a specific person because you'll need to maintain this assignment as individuals transition into new roles.

![](https://community.rockrms.com/GetImage.ashx?Guid=e5247271-8b0e-4cab-8010-0cd047468999)

 # Activity Complete

Show Details

v1.0

Hit the brakes! This activity is done.

This action is pretty obvious. It marks the current activity as complete. The activity will not execute any more actions.

![](https://community.rockrms.com/GetImage.ashx?Guid=c541fd6f-d645-4763-be40-d3b58727d7ff)

 # Delay

Show Details

v1.0

STOP... hammer time! Delays successful execution of action until the specified value is reached.

Temporarily pauses execution of the current activity until the set value is reached. The three value options are:

- Minutes To Delay: This delays for a set number of minutes.
- Date in Attribute: This delays until the Date in the selected Attribute is reached.
- Next Weekday: This delays until the next selected weekday (next Thursday, for example).

![](https://community.rockrms.com/GetImage.ashx?Guid=074a4244-1abb-4874-aedb-f4bef49e0457)

 # Electronic Signature

Show Details

v14.0

Provides a document to be electronically signed.

This action will present a person with a document that they need to sign electronically. The Signature Document Template must be configured in advance under Admin Tools \> General Settings \> Signature Documents. Person attributes can be used to define the person the document applies to, the person assigned to sign the document and the person who signed the document.

After the electronic signature is captured the person is asked to provide an email address so they can be sent a copy of the document for their records.

![](https://community.rockrms.com/GetImage.ashx?Guid=9c955c01-2b98-4b58-b305-45246bd37230)

 # Form

Show Details

v1.0

Collects information from an individual.

The *Form* action is one of the most powerful actions in Rock. It allows you to take input from a user and place it into the values of workflow attributes. Let's dive down into the details of this incredible action looking at each setting.

- **Notification Email:** This sends a selectable System Email Template out to the activity's assignee(s) when the action is reached during processing. This helps alert them that an entry step is waiting for them. This email can include links to the commands that are defined for the action. For instance, if one of the entry commands is *Approve*, you could include the approve link in your email so that the person could skip the step of visiting the form.
- **Enable Note Entry:** Enabling this will provide an area where the person can write notes in addition to the rest of the form. This is a great way for people to communicate with the next person in the process, or to track information that may not be stored as attributes.
- **Enable Person Entry:** Checking this box will cause the “Person Entry Configuration” section to appear within the Form configuration. Rather than manually creating individual workflow attributes for things like the person’s name, email, phone number or address, you can select what you want to ask and it will be added to the form for you automatically. You also have the option of asking for Spouse information. If the person or their spouse isn’t in Rock then this action will create a record for them. You can set the *Person Attribute*, *Spouse Attribute* and *Family Attribute* fields to store this information for either newly created or existing records, for use later in the workflow. On top of that, you can also enable *Hide if Current Person Known* to hide all the person entry fields if Rock already knows who the person is. Note, the fields will still show on the form if one of them is required and if that piece of information is not in Rock for the person.
- **Form Header:** This is a textbox that allows you to enter HTML combined with lava merge fields. This is a good place to add instructions for the user and help introduce them to the form they are about to complete.
- **Form Fields:** Next you'll see a list of all the workflow and activity attributes available. You can select which are visible, editable and required for the entry form. You can apply conditional logic to each field so that it only appears to the person if they give certain responses on other fields.
- **Form Footer:** Like the header, the footer allows you to enter HTML mixed with lava merge fields to help provide any closing content you would like.
- **Commands:** Finally, you have a list of commands to display at the end of your form. Each of the commands will be displayed as a button at the bottom of your form. The *Command Label* will be the label on the button. The *Button Type* describes what button style to use (these are defined under Admin Tools \> General Settings \> Defined Types \> HTML Button Styles.) Next you can define an activity to run when the button is selected. This is very helpful for providing branching logic in your workflow. Finally, you can provide response text that the user will see when the action has been selected. Note that if a secondary form is available after the current form, this response text may not be shown. Instead the user will be taken directly to the second form.
- **Command Selected Attribute:** This optional setting allows you to insert the command label that was selected into the contents of an attribute. This is helpful when you're not activating activities from the actions.
![](https://community.rockrms.com/GetImage.ashx?Guid=e3f8c1f5-5611-48c6-be09-60f764b76090)

 # Initiator Set from Attribute

Show Details

v1.0

Sets the workflow initiator from a workflow attribute.

This workflow action is the reverse of *Set Attribute to Initiator*. It allows you to change the *Initiator* to the value of an attribute.

![](https://community.rockrms.com/GetImage.ashx?Guid=991176a9-58bb-42fa-834e-47de886b0775)

 # Log Error

Show Details

v1.0

Because things don't always go as planned.

Logs an error into the worflow's error log.

![](https://community.rockrms.com/GetImage.ashx?Guid=e5e8dbea-71bb-470e-bd49-1223a618c179)

 # Redirect to Page

Show Details

v7.0

Redirects the user to a given URL when the workflow action is complete.

This action takes the user to a different screen after the workflow action is complete. You can set the action to redirect to either a URL or a URL Attribute.

The *Processing Options* field allows you to set how the workflow should continue:

- **Always continue:** Sets the workflow to continue processing regardless of the redirect status or if the action is running in the background.
- **Only continue on redirect:** Sets the workflow to only continue processing when the redirect is successful.
- **Fail and Stop** v16.7 (or Never continue): When this option is selected, the action will be marked as failed (error) and will not complete. The workflow will always fail/error at this point unless the "Run If" filter criteria cause this action to be skipped.
![](https://community.rockrms.com/GetImage.ashx?Guid=1b8370bb-0783-423c-b2a0-b5198a351d10)

 # Workflow Add Note

Show Details

v4.0

Adds a new note to the workflow.

This action will add a new workflow note. The note property has the ability to customize the message using Lava. You can also customize the formatting of the note by selecting the *Note Type*. More on using workflow notes is discussed in the [Workflow Notes](https://community.rockrms.com/documentation/bookcontent/12#workflownotes) section of the workflow guide.

![](https://community.rockrms.com/GetImage.ashx?Guid=ee4cf012-ae9d-4f7c-a106-71062bdbdbc0)

 # Workflow Complete

Show Details

v1.0

Our work here is complete. Or, at least the workflow is.

This is the *Game Over* action that marks the entire workflow as complete. No other activities or actions will be processed.

![](https://community.rockrms.com/GetImage.ashx?Guid=f0bae09a-ebd2-4ed3-a448-97d1eb0cab2a)

 # Workflow Delete

Show Details

v4.0

Workflow...? What workflow?

Simply put, deletes the current workflow instance.

![](https://community.rockrms.com/GetImage.ashx?Guid=8f9b54fb-4a63-44a0-b7cd-48f44633165a)

 # Workflow Entry Show HTML

Show Details

v7.0

Shows HTML in the WorkflowEntry block.

This action allows you to display a large amount of information in the WorkflowEntry block, typically on the screen that appears after a person completes and submits a Form action. The HTML field takes either HTML or Lava, which means you have a lot of control over the formatting and display of the content.

![](https://community.rockrms.com/GetImage.ashx?Guid=9d5ac26f-39dc-49a4-8dc9-950e006ef32a)

 # Workflow Persist

Show Details

v1.0

Save your workflow.

See the section on [persistent vs. non-persistent workflows](https://community.rockrms.com/documentation/BookContent/12#persistedvs.nonpersistedworkflows) to get a deeper understanding of this topic. This action marks the current workflow as persistent.

There is an optional parameter called *Persist Immediately*. Normally this action will cause the workflow to be persisted (saved) once all the current activities/actions have completed processing. Set this flag to true if the workflow should be persisted immediately. This is only required if a subsequent action needs a persisted workflow with a valid id.

![](https://community.rockrms.com/GetImage.ashx?Guid=b9205d2a-5e35-440d-a83d-ecb9ac0c0b6e)

 # Workflow Set Campus

Show Details

v13.2

Sets the Campus of the workflow.

This action will set the campus of the workflow using the given Campus attribute or the primary campus of the given Person attribute. If both are given, the Campus attribute will be used. If neither are given, the action will return an error.

![](https://community.rockrms.com/GetImage.ashx?Guid=ecc3b920-03bd-45a6-9c5f-c2b6aef29cf0)

 # Workflow Set Name

Show Details

v1.0

Sets the name of the workflow.

This action will set the name of the workflow. This name will appear in the various workflow lists you use to manage and process your workflows. The text field of this action can use Lava merge fields to help you craft effective names. Many times these names will simply come from an attribute value that is entered through a user entry form.

![](https://community.rockrms.com/GetImage.ashx?Guid=08dfb78b-9097-4100-82c6-db2a71ca8073)

 # Workflow Set Status

Show Details

v1.0

Sets the status of the workflow.

This action sets the status of the workflow. The workflow status is simply a text field so you can set it to any value you choose. This field supports the use of Lava merge fields.

![](https://community.rockrms.com/GetImage.ashx?Guid=64c23be0-d10f-4abe-a7a2-070120989f9e)

 # Workflow Set Status (other Workflow)

Show Details

v7.0

Sets the status of another workflow.

This action allows you to set the status of a different workflow. The workflow status is simply a text field so you can set it to any value you choose. This field supports the use of Lava merge fields. You can also query for the status using SQL commands. The "Process Target Workflow" option allows you to decide whether or not to run the targeted workflow after its status is set.

![](https://community.rockrms.com/GetImage.ashx?Guid=071f3af8-bf6c-43db-a2f1-a2ccb6722666)

 # Write to Log

Show Details

v5.0

Writes a message to the Workflow log.

Every workflow has a log. Usually there's not much in them. But sometimes, it's useful for you to be able to write what's happening or what the value of an attribute is at a certain point in the workflow. Use this action to write an entry in the workflow's log. It supports Lava, of course!

![](https://community.rockrms.com/GetImage.ashx?Guid=6df76849-c168-491e-85cb-e11ca2e95691)


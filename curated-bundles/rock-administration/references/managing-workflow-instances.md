---
description: "Use when managing active workflow instances, viewing workflow status, filtering workflows by criteria, or editing workflow details and attributes"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Managing Workflow Instances

Managing Workflow Instances

Not all workflows run and complete immediately. In fact, most take several hours or days to complete as they wait for input from people or other external events to occur. There are several blocks to help you manage workflows and see them to completion.

# Managing Workflows

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/managing-workflows-link-v18.png)

Manage Workflow Link

On the workflow entry screens you may have noticed a *Manage* link to the right of the workflow name. You’ll only see this link if you have *Edit* access to the workflow type.

Clicking this link will take you to a grid of all the workflows for this workflow type. This grid allows you to filter the workflows by several different criteria including:

- Workflow Name
- Initiator
- Status Text
- Activation Date (the date it was launched)
- Completion Date
- State (is it currently active or completed)

Clicking on a workflow will show you its details.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/managing-workflows-v18.png)

Manage Workflow

You might have noticed the Delete button near the bottom of the grid in the screen pictured above. You can select one or more workflows from the list and use this button to delete them all at once. Keep in mind that because deleting workflows can take some time, the delete is performed in the background.

# Viewing Workflow Details

After clicking a workflow from the grid above you’ll see the details of the workflow instance. From here you can see the state of all of the workflow attributes as well as all the activities that are in process or have completed.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-detail-view-v18.png)

Workflow Details View

# Editing Workflow Details

Viewing the workflow details page gives you a clear view about the status of a specific workflow with the ability to edit any of its settings. Let's take a tour around this page showing each feature.

## Details Tab

The details tab gives you an overview of the state of the workflow.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-details-edit-details-v18.png)

Workflow Details Edit

## Activities Tab

The activities tab shows a listing of each activity that was activated through the life cycle of the workflow.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-details-edit-activities-v18.png)

Workflow Details Edit

## Log Tab

The log tab displays the logging messages from the workflow. The detail of the logging will be dependent on the logging level you configured for the workflow type. You can also define custom logging actions in your activities to display custom log entries. Logging is a great tool for watching your workflow to make sure that the logic you have configured is working as expected.

# My Workflows

The tools described above are great for working on workflows of a specific workflow type. However, there are times you just want to see the workflows that are assigned to you or that you have initiated. You can track active workflows that are related to you under Tools \> My Workflows.

![My Workflows](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/my-workflows-v18.png)

My Workflows

## Mini My Workflows

You'll notice that there is a miniature version of *My Workflows* on the homepage. This acts as a reminder to the individual of their task list as well as providing a quick link to the workflow.

![](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/my-workflows-mini.png)

My Workflows (Mini)

This block has several settings that allow you to customize it. These settings include:

- The ability to filter the results to a specific category(s)
- To include child categories
- To show only workflows you are assigned to
- To show only workflows you initiated
- The markup that is displayed can also be fully customized using HTML and Lava.

Using these settings, along with the power of HTML/Lava, you can reformat this block several different ways. Some organizations might even move it into the main zone on the page to give it more space.


---

## Persisted Vs. Non-Persisted Workflows {#persisted-vs-non-persisted-workflows}

> **Path:** Blasting Off With Workflows > Persisted Vs. Non-Persisted Workflows

Persisted Vs. Non-Persisted Workflows

Persisted. That might seem like a strange term if you don't have a technology background. It simply means to write something down so that it can be remembered in the future. Think of it this way - some thoughts you have are relevant only to the task you're currently working on. Sometimes, though, you have a thought that you know you'd better write down because you'll need it for a task you'll complete in the future. Writing the thought down persists the idea for use in the future.

# Non-Persisted Workflows

Non-persisted workflows are executed but the attribute values are never written down (or in tech terms never written to the database). They exist only in the computer's temporary storage and go away when done. These types of workflows are great when the entire workflow will be processed immediately and will then be completed.

The check-in workflow is a non-persisted workflow. After the check-in process is complete there is no need to store all of the workflow attributes that helped the system pick the right room for the individual. Many of the entity trigger workflows may turn out to be non-persisted. These workflows will be used to make quick decisions about the nature of an update to the data. Keeping the workflow around won't provide benefits in most cases.

# Design Using Persisted Workflows

Even if you're certain that you want a non-persisted workflow it's wise to design the workflow as a persisted workflow. This allows you to check the logging and look at what happened under the hood as it ran. Once you're certain everything is correct you can then check the setting back to non-persisted.

# Persisted Workflows

Persisted workflows write their state and status down. This allows them to run over long periods of time without forgetting their status. Most workflows that individuals interact with will be persisted (e.g., IT Requests, Facility Requests, HR processes, etc.). This allows the workflow to live for hours, days or even years.

Persisted workflows should also be used when a history of what occurred is important. These types of workflows allow you to go back and see what happened when.

# Morphing Persistence

Just because a workflow starts out as a non-persisted workflow doesn't mean it has to stay that way. There is a workflow action called "Workflow Persist" that will change the current workflow to a persisted workflow. This is commonly used with workflow types that start with an entry form.

Picture this - a person comes to the first entry screen of a workflow and then changes their mind and closes the page. What happens? In a persisted workflow the loading of the entry screen started a new workflow that is now stored in the database. In a non-persisted workflow, nothing happens. Because of this, it's common for entry workflows to start as non-persisted and then change to persisted after the first entry screen is completed.

# We Know What You’re Thinking

Ok, so you’re probably thinking: Can I turn a persisted workflow into a non-persisted workflow? The simple answer is no. Once a workflow has been set to persisted it will remain persisted. You can, however, delete a workflow instance from an action inside the workflow by using the 'Delete Workflow' action.


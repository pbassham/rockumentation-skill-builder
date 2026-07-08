---
description: "Use when configuring how to launch workflows through entry blocks, category browsers, or direct workflow entry pages in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Launching Workflows

Launching Workflows

Once you have your workflow types configured, you're ready to start using them. There are several ways you can launch a workflow. Each method is discussed in detail below.

# Workflow Entry Block

Many workflows will start with a person filling out a form. This is certainly the case with workflows like IT requests, facility operations requests, HR approvals, etc. There are a couple of ways you can launch these types of workflows.

## Workflow Category Browser

![Category Browser](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-category-browser-v18.png)

Workflow Category Browser

Rock ships with a workflow entry page under Tools \> Workflows. This page displays a list of workflow categories with the ability to expand the category to view its workflows. Clicking on a workflow will launch it and show its first entry screen. You can configure which categories are displayed by modifying the block's settings. Category and workflow security will also be used to personalize the display to the specific rights of the person viewing the page.

## Direct Workflow Entry

There may be times when you'd like to place a specific page in the navigation that takes you directly to a workflow entry screen. An example of this is the *Contact Us* page on the external website. This page has been configured with the *Workflow Entry* block. One of the block settings of this block type allows you to define a specific workflow type to launch when the page loads. This is a great way to include links to important workflows into your internal and external sites. The magic of this technique is that the person doesn’t even know that they are interacting with a workflow.

![Workflow Entry](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/contact-us.png)

Workflow Entry

## Workflow Entry Block Settings

Above we noted that you can configure the Workflow Entry block's settings to set a specific workflow to launch when the block is accessed. Let's take a closer look at that setting as well as the other block settings available for Workflow Entry.

![Workflow Entry Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-entry-block-settings-v13.png)

Workflow Entry Block Settings

# Person Profile Actions

![Person Profile Actions](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/person-profile-actions-v18.png)

Person Profile Actions

You may have noticed that there is a button on the *Person Profile* page labeled *Actions*. On this menu there is an item entitled *Person Data Error*. Clicking on this menu item launches a workflow that allows the person to report any data integrity issues to the proper team. You can easily add your own workflows to this list.

The first step is to create your new workflow. Be sure one of your first actions uses the *Set Attribute From Entity*. This takes the person whose record is being viewed and places them in a workflow attribute (this attribute should be of type *Person*). Your workflow can then add any processing logic from there.

Once your workflow is defined, you can add the workflow to the action menu. This is done by editing the block settings back on the *Person Profile* page. There you'll see a setting for selecting workflows to add. Workflow security will be considered when building the list so you can make sure that only certain people are able to launch the workflow.

# Entity Triggers

Have you ever thought: "Gee, I wish I could do something every time someone saves a person in the database." Well, with Rock you can! Entity triggers can be configured under Admin Tools \> General Settings \> Workflow Triggers.

![Workflow Triggers](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-trigger-v18.png)

Workflow Triggers

# Caution: Saving While Saving

Be careful not to set up a triggered workflow that updates the entity that is *actively* being saved (for example, a pre-save or immediate-post-save trigger on a person that fires a workflow to update a property on that person). This can cause a loop that creates an out-of-memory condition which will make your server administrator pretty upset.

There are other related combinations that are also unsupported. Just because you can doesn't mean you should.

## Pre vs. Post Trigger Events

You might be wondering what the difference is between a pre and post event trigger. There is a difference and it's pretty important that you select the right type.

Pre triggers launch the workflow before the save or delete occurs. The benefit of a pre trigger is that you can keep the save from occurring through the logic of your workflow. If your workflow returns with an error message, the save or delete will be aborted. Except in a few places, there is no means for these error messages to bubble up for someone to see, so keep that in mind when using pre triggers.

One downfall of pre triggers is that if they are initiated by someone working in Rock, that person must wait for the workflow to launch and complete before the save is completed. Because of this, you'll want to be sure that your workflows are simple and quick.

Post triggers, on the other hand, can’t keep a save or delete from occurring. By the time they launch, the save or delete has already been done. These triggers are launched but Rock does not wait to hear back from them before moving on. This keeps workflow performance quick.

# You Can Have More Than One

You can have more than one trigger for each entity type. This saves you from having to lodge all your logic in one workflow.

# Use Post Triggers Whenever Possible

Because of their speed, try to use post triggers whenever possible.

# Warning: Saved or Not Yet Saved

Even with an immediate-post-save trigger, if you try to fetch the triggered entity from the database in your workflow, there is a possibility that its data has not *yet* been written to the database. If it's critical that you know the exact values of the entity at the moment the workflow runs, you should capture the entity property in question with the [*Attribute Set From Entity*](https://community.rockrms.com/WorkflowActionCategory?Category=9#attributesetfromentity) action using `{{ Entity.*PROPERTYNAME* }}` or capture the whole object into a text attribute using `{{ Entity | ToJSON }}`. You can then safely refer to the correct value in subsequent actions.

## Save the Entity First

When using the [*Attribute Set From Entity*](https://community.rockrms.com/WorkflowActionCategory?Category=9#attributesetfromentity) action, you may be tempted to try to do more than it was designed to do. For example, if the entity you are working with is a *Group Member*, you might try to get the group's name using `{{ Entity.Group.Name }}`. Except the ".Group" property is not guaranteed to be there -- only the .GroupId will be there. In fact, even the `{{ Entity }}` will be gone after the initial activity.

Therefore, we recommend you always collect your Entity properties in your first few actions, before doing anything else. And second, if you need other related items, you should load them explicitly. So, to get that group name you can use `{{ Entity.GroupId | GroupById | Property: 'Name' }}`

# Launch Workflow from Grid

Have you ever wanted to run a workflow for each item on a grid? Perhaps you need to send every person in a data view into an on-boarding process. Or maybe you want to send them an email asking for them to complete a form. If you can write a workflow for it, you can launch it right from a grid.

When you’re looking at a grid, all you have to do is click the button to launch a workflow for each item listed. Let’s look at an example using the *Group Viewer* page to launch workflows for the members of a group.

![Launch Workflow From Grid - Group Viewer](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/launch-workflow-from-grid-group-viewer-v18.png)

Launch Workflow From Grid - Group Viewer

Clicking the icon pictured above will take you to the Workflow Launch page pictured below.

![Launch From Grid - Launch Page](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/launch-from-grid-launch-page-v18.png)

Launch From Grid - Launch Page

When you arrive at the Workflow Launch page you will see that each of the items (in this case, group members) are listed at the top. This lets you check to make sure you have the correct information and the right items.

Beneath the list of items, you’ll notice the *Workflow Type* picker. Use this to select the type of workflow to launch, then click the Launch button. Keep in mind that a new workflow will be launched for **each** item listed above the picker. In our group member example, four new workflows will be launched. Also remember that the workflow we're launching in this example is configured to work with group members (as opposed to person records).

![Launch From Grid - Workflow Launch Success](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/launch-from-grid-workflow-launch-success-v18.png)

Launch From Grid - Workflow Launch Success

You’ll notice above that after clicking the Launch button, you can choose to *Launch Another Workflow* without leaving the page. This makes it easy to quickly launch multiple workflows for the same set of items.

## Extending Workflow Launches

Hopefully you’re already seeing tremendous power of launching workflows from grids. Now, let’s look at how you can extend this feature even further.

In the above *Group Viewer* example, we launched workflows for group members by clicking the icon in the grid. This feature is enabled by default for grids in Rock, so you’ll see the in other places and it will work the same way. But you might not want all of your grids to allow workflow launches. Or you might want to force a specific workflow to be launched instead of having a person choose from the picker. You can configure all this, and more, using the options described below.

### Disable Workflow Launcher

We'll start with the most basic setting. If you want to turn off the launcher for a grid, all you have to do is access the *Custom Grid Options* in the grid’s block settings. Expand the *Custom Actions* area and set *Enable Workflow Launcher* to “No”.

![Enable Workflow Launcher](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/custom-grid-options-disable-launcher-v18.png)

Enable Workflow Launcher

This setting only applies to the workflow launcher that ships with Rock, as described in the [above section](#launchworkflowfromgrid). Custom actions (see [below](#customactions)) are not impacted by this setting, even if those actions will launch a workflow.

### Workflow Launch Block

The workflow launcher takes you to a page with a workflow launch block. This block is the bridge that connects the items in the grid to the workflows you want to launch for those items. Administrators can change the block settings to customize different aspects of the process.

![Launch From Grid - Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/launch-from-grid-block-settings-v18.png)

Launch From Grid - Block Settings

The workflow launch block is programmed to look for a Workflow Type Id in the URL. If it finds one, then the block will automatically lock the workflow picker to that workflow type, and it can’t be changed by the person. This is like specifying a workflow type in the block’s settings, except the block will dynamically change according to the query string in the URL. We’ll show you what this looks like in the [Custom Action Routes](#customactionroutes) section below.

### Custom Actions

Now let’s talk about the doors that open with *Custom Actions*. Custom actions work like the workflow launcher example described above. An icon gets added to the grid (like the icon) and then a person can click it to start your custom action. The key is that this isn’t limited to group members or workflows. Custom actions can take items from any grid and use them wherever you need. In the below example we'll take a look at adding custom actions to a data view results grid.

Custom actions are added in the grid’s block settings, in the same *Custom Grid Options* area as the *Enable Workflow Launcher* setting described above. Click the Add Actions button to create a new custom action.

![Grid Block Settings - Add Custom Action](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/custom-grid-options-with-custom-action-v18.png)

Grid Block Settings - Add Custom Action

Using the configuration pictured above, the grid containing people from the data view now has a new icon for the new action.

![Data View Grid With Custom Action Icon](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/data-view-with-custom-action-icon-v18.png)

Data View Grid With Custom Action Icon

### Custom Action Routes

As noted above, there’s more to the *Route* configuration than just taking the person to a different page. In the example configuration above, the route is `/page/630?WorkflowTypeId=16`. Let’s break that down.

The first part of this action’s route takes the person to a new page, which is `/page/630` in this example. We’ve added a workflow launch block to that page, so that’s all we need for this route to work for launching workflows. In this case, a route of `/page/630` would result in a custom action that’s very similar, maybe identical, to the workflow launch process described in the prior section.

To take it a step further, don’t forget that the workflow launch block checks for a workflow type in the URL. If it finds a workflow type, then it will lock the workflow picker to that type. All you need to do is add a query string parameter in the format of `?WorkflowTypeId=xx` to your route, and the block will automatically pick it up.

# Populating Workflow Attribute Values

The workflow launch block will take any of the parameters that are in the query string and pass them into the workflow's matching attributes. So, if you have a group attribute in your workflow, you can pass the group's Id by including `?GroupId=12` in the route.

The example route we used above has an added parameter of `?WorkflowTypeId=16`. This tells the block to allow only the “Photo Request” workflow type.

![Workflow Launch Block - Locked Workflow Type](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-launch-block-query-string-v18.png)

Workflow Launch Block - Locked Workflow Type

This custom action now provides a dedicated icon people can use to launch only “Photo Request” workflows. Remember, the block itself hasn’t changed. It’s only locked to photo requests in this case because of the route in our custom action.

Keeping that in mind, you can add new icons to launch different types of workflows using the same target page and the same block. In addition to photo requests, you might add a new custom action for assessment requests, giving you an icon for each on the grid as pictured below.

![Multiple Custom Actions](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/custom-grid-options-multiple-actions-v18.png)

Multiple Custom Actions

Note in the screenshot above that both routes point to the same page, and the same workflow launch block. Adding the workflow type to the *Route* means that the icon will launch only photo requests, while the icon will launch only assessment requests.

![Multiple Custom Actions - Launch From Grid Icons](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/data-view-with-multiple-action-icons-v18.png)

Multiple Custom Actions - Launch From Grid Icons

## Working with Launched Workflows

In the above sections we’ve only been using workflow types that ship with Rock, launched from *Group Member* and *Data View* grids. But you can use these features with other workflows, and with other grids.

When you’re building a workflow to launch from a grid, it’s important to know what types of items, or entities, the grid contains. The examples in prior sections were working with *Group Member* and *Person* entities because those are the types of entities contained in those grids. Other grids may have different entities, like groups or financial transactions.

The key is knowing that the entity is passed from the grid to the workflow. That means the grid needs to know the type of entity it’s working with, but it also means your workflow needs to be designed to work with that type of entity. The best way to do that is to use the *Attribute Set from Entity* action, to capture each entity from the grid and assign it to a workflow attribute.

![Attribute Set From Entity - Group Member](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-action-set-attr-from-entity-v18.png)

Attribute Set From Entity - Group Member

You can see above that the group member from the grid will be assigned to the workflow's "Group Member" attribute. Now the entity can be referenced directly in the workflow, and you can use it in other actions. Remember, a workflow is launched for each entity in the grid. We're only processing a single group member in this workflow, not the set of group members.


---

## Lifecycle Of A Workflow {#lifecycle-of-a-workflow}

> **Path:** Blasting Off With Workflows > Lifecycle Of A Workflow

Lifecycle Of A Workflow

Now that you're up to speed on how a workflow is launched you might be wondering how a workflow executes from there. Understanding the life cycle of a workflow is a key to building activities and actions that flow the way you expect them to.

When a workflow is launched, the workflow engine completes the following steps:

1. Activates each of the activities that are configured to be *Activated with Workflow*.
2. Proceeds to each newly activated activity in the order it was defined and runs its actions. If one of the actions does not complete successfully, it stops running the activity's actions. If they all complete, or if one of the actions is configured with *Activity is Completed on Success*, the activity is marked completed.

Now that a workflow is active, and not yet complete, the engine will attempt to re-run it on the interval defined by the workflow type using the following steps:

1. All uncompleted actions on an activity will be run in the order they are defined.
2. If the running of these actions has completed, the activity will be marked complete.

The active workflow will continue to be executed on the polling frequency until the workflow is marked complete.

# Looking Under The Hood

You might be wondering what keeps the workflow engine running on the interval schedule. Rock has a system job called *Process Workflows* that is set to run every 10 minutes. This job can be viewed (but not edited) under Admin Tools \> System Settings \> Jobs Administration. Because this job only runs every 10 minutes, setting your workflow processing interval to less than 10 minutes will have no effect.

# Be Aware of System Performance

While it might seem nice to have your workflows execute on a short processing interval, it could impact system performance if you have a lot of active workflows to run. Consider using a processing interval that best fits the need of your workflow type.

# Auto Closing Workflows

Have you ever wanted to give up on something? Well, this could be the case with certain types of workflows. In situations where it's no longer sensible to continue running a workflow, you now have an option to clear the slate. The `Complete Workflows` job can be added in the *Jobs Administration* screen. You can configure it to run against one or more workflow types that are older than a certain number of minutes. Alternatively, if you leave the *Expiration Age* setting empty, it will complete all workflows when the job is run. This can be useful if you schedule the job to run at certain times of the year. You can also provide a custom *Close Status* (such as 'Expired') to know at a glance why the workflow was completed when you are reviewing them at a later date.


---
description: "Use when configuring step programs, choosing between cards or grid views, setting step statuses, or managing step program display settings in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Next Steps for Steps

Next Steps for Steps

Now that we’re more familiar with the concepts of step types, step programs and step entry, we're ready to see how it all gets maintained. We'll start at the program level, and then move on to setting up individual step types.

# Editing Step Programs

Let’s go back to the *Step Program* page to see how we can edit our programs. Clicking the Edit button lets you update the program and its configurable settings.

![Edit Step Program](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-program-edit-2-v18.png)

Edit Step Program

## Default List View

Steps information for an individual can be viewed under the Steps tab on the person profile, either as cards or in a grid. You can toggle between these views from within the person profile using the and buttons. As noted in the prior section, the default view is set at the step program level.

![Person Profile Steps Cards](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/pers-profile-steps-cards-2-v18.png)

Cards View

The screenshots above (cards) and below (grid) are both for the same person following the Discipleship program.

![Person Profile Steps Grid](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/pers-profile-steps-grid-2-v18.png)

Grid View

While in card view, hovering over a card lets you view additional details as well as access the *Step Entry* page. This is controlled by the Step Type Advanced Settings (see [Editing Step Types](#editingsteptypes)).

# Step Security

A person needs to be in a role with Edit permission for the Steps block in order to add steps from the *Person Profile* page.

![Person Profile Steps Cards Hover](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/pers-profile-steps-cards-hover-v18.png)

Card View Hover

# Cards or Grid?

The cards view will condense multiple occurrences of a step into a single card, whereas the grid view will display a row for every occurrence of the step. For this reason, the grid view may be more appropriate for step programs that allow steps to be repeated often. The grid view also displays a "Summary" column that shows step attributes configured to show on grids.

If you have multiple campuses, you can choose to show or hide the campus associated with a step by changing this block's settings. This applies to both the cards and grid views.

The default view doesn't have to be the same for all of your programs. Choose the one that seems best for each individual program. You can always change it later if you need to.

## Statuses

The values you set up here are used to track an individual’s status for any step type in the program. This list shows each status and whether it is treated as Completing the step.

![Step Program Statuses](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/step-program-edit-statuses-v13.png)

Statuses

The *Create Status* page is used when adding or changing a status.

![Create Status Page](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-program-create-status-page-v18.png)

Create/Edit Status

# Completed But Not Completed

In the [Step Entry](#stepentry) section we discussed the “Date Completed” field. It’s important to note that this date, by itself, is not enough to indicate that the person has finished a step. For a person to truly complete a step, an “Is Complete” status and a completion date should both be present.

## Entity Attributes

If you have an *Entity Attribute* configured for *Step Programs*, it will appear in the settings here.

![entity attribute](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-type-attribute-edit-2-v18.png)

Entity Attributes Screenshot

Using *Entity Attributes* for *Step Programs* lets you apply attributes across all programs. In this example, *Internal Program* is a *Boolean* that can be selected for any *Step Program*. This works well for attributes you need system-wide.

To add a new attribute for this program, go to Admin Tools \> Settings \> Entity Attributes and select *Step Program* as the *Entity Type*.

## Workflows

Here you can add one or more workflows to the program. Keep in mind that workflows added to the program apply to all the steps in program, regardless of the step type.

![Step Program Workflow](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/step-program-edit-workflow-v13.png)

Step Program Workflow

The workflow can be launched according to one of three triggers:

![Workflow Triggers](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-program-add-workflow-v18.png)

Workflow Triggers

See our [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide for more information on creating workflows.

# Why Use Step Program Workflows?

Applying a workflow at the step program level (as opposed to the step type level, described in the next section) is a great way to save yourself time and effort on repetitive tasks. For example, do you have an email that should be sent after the completion of each step in a program? If so, it can be added and maintained once at the program level instead of individually for each step type.

# Editing Step Types

From the *Step Type* page click the Edit button to change the step type settings.

Edit Step Type

![Edit Step Type](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-type-edit-2-v18.png)

1 Name

Provide the name of the step type.

2 Active

Set the step type to active or inactive.

3 Description

Provide a description for the step type.

4 Highlight Color

Choose the color to use for the *step type*. This color appears in the charts and in each chart legend where *Step Types* are displayed.

5 Icon

Choose the *CSS icon* to use for the *step type*.

6 Show Count on Badge

Select this option if you want the number of completions for the *step type* to be shown on the corresponding badge. See the [Steps Badges](#stepsbadges) chapter for full details.

7 Engagement Type

Defines whether the step is a *Milestone* or an ongoing *Rhythm*. *Milestones* mark significant events like *Baptism*, while *Rhythms* track ongoing behaviors such as *Small Group* participation.

8 Organizational Objective

Describes the main focus of the step and how it supports your organization’s mission. This setting uses a *Defined Type* called *Organizational Objective* that includes the following *Defined Values*:
- **Outreach** – Connect with those outside the church to share the love and message of *Christ*.
- **Discipleship** – Guide individuals to grow in their faith and deepen their relationship with *Jesus*.
- **Activation** – Empower individuals to serve others and participate in *God’s* mission.

9 Impact Weight

Indicates how significant the step is in a person’s journey. Higher values show greater impact or investment. To calculate impact, multiply the number of completed steps by each *step type’s Impact Weight* and sum the totals.
- Example: 100 completions × Weight of 3 = Impact Score of 300.

10 Prerequisite Steps

Use this field to require completion of one or more steps before starting this one.

11 Completion Options

Configure how the step can be recorded, tracked, or completed, including:

- **Allow Multiple**: Select whether the step can be completed more than once by the same person.
- **Spans Time**: Select whether the step occurs over a period of time or in a moment of time.
- **Is Date Required**: You can choose whether the date associated with a step is required. This applies to both Start and End dates if the step *Spans Time*.

12 Call to Action Path

The *Step Type*Call to Action Path helps turn *Steps* into clear, actionable invitations. It’s designed for websites and mobile apps so people can easily see what their next step is and how to take it.
- **Call to Action Label:** The text shown on the button (e.g., “Join Now” or “Start Step”). Keep it short, clear, and action-focused.
- **Call to Action Link:** The *URL* where the next step happens, such as a form or registration page.
- **Call to Action Description:** A short explanation of what the action does and why it matters.

The *Call to Action* Path is an exciting way to make *Steps* more actionable. These will be used for websites and mobile apps to make discovering your next step and how to take it effortless.

# Missing Some Prerequisites?

Behind the scenes we have programming that prevents two step types from being set as prerequisites of each other. For example, if Baptism is configured as a prerequisite to the Serve step, then the Serve step won’t appear in the list of available prerequisite steps for Baptism.

The step type configuration also has settings for Step Attributes, Workflows and Advanced Settings. We will cover each of these areas individually in the following sections below.

## Step Attributes

One or more attributes can be associated with a step type, using the page pictured below.

Assigning attributes to step participants is a great way to track details beyond whether a person simply started or finished a step.

![Step Participant Attributes](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-type-attribute-edit-2-v18.png)

Step Attributes

We should pause a moment here to highlight the *Show on Bulk* option pictured above, which is described in the [Bulk Entry](#bulkentry) section. Regardless of whether the *Show on Bulk* option is used, the attribute value can always be set for an individual from the *Step Entry* or *Bulk Entry* pages.

# Baptized Here Attribute

This attribute comes out of the box for the purpose of baptism tracking. Using this as your way to track baptism makes it easier for us to help you track common metrics.

If you need more information on setting up attributes in general, check out our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#managingpersonattributes).

## Workflows

We’ve seen how workflows can be added at the program level, but they can also be added to individual step types. As you might have guessed, the key difference is that workflows added to a step type will only be used for that particular step.

![Step Type Add Workflow](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-type-add-workflow-v18.png)

Add Workflow

For additional details on using workflows in Steps, see the [Editing Step Programs](#editingstepprograms) section. For every other detail you could imagine related to workflows in general, see our [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) manual.

## Advanced Settings

The Advanced Settings panel has options for customization and automation as described below.

![Step Type Advanced Settings](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/step-type-edit-advanced-settings-v11.png)

Step Type Advanced Settings


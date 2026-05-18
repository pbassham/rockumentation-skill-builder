---
description: "Use when explaining how to structure and organize Step Programs, Core Steps, and Organizational Objectives in Rock for spiritual growth pathways"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > First Steps for Steps

First Steps for Steps

Whether it’s getting kids to bed at night or getting ready for work in the morning, many areas of our lives require a series of tasks intended to achieve a single goal. Spiritual growth is no exception. With Rock’s help, you can guide your attendees through customized steps along the path of spiritual development.

But before we dive too deeply into Steps, let’s take a moment to define a few terms and introduce you to some key features you’ll need to know.

A *Step Program* is made up of individual activities and accomplishments called *Step Types*. If the goal is to reach the mountain’s summit, then the Step Program is the mountain, and the Step Types are the basecamps on the way to the top. Let's cover some more fundamentals for understanding *Steps*.

# Anatomy of Steps

Understanding how *Steps* are structured helps you create meaningful pathways for growth. Each part of the *Step Type* *Step Program* setup plays a unique role in guiding people through their journey while keeping your data consistent and useful.

## Core Steps

*Core Steps* form the foundation of your organization’s process. They provide consistent information for reporting and analytics across *Rock*. Without them, it would be difficult to understand engagement or measure progress.

Think of *Core Steps* as essential milestones like *Baptism*, *Small Group*, *Serve*, and *eRA*. These built-in *Steps* can’t be deleted because they support long-term accuracy in reporting and future feature development.

When *Step* data stays consistent, you gain a clearer view of how people are engaging, where they need encouragement, and how to guide them toward their next step. *Core Steps* aren’t only for tracking progress, they help people see what’s next, build momentum and stay engaged in their journey.

If needed, you can move a *Core Step* to another *Program* using the button in the *Step Type* settings.

## Organizational Objectives

*Organizational Objectives* define the intent behind each *Step*. They ensure that *Steps* across your organization align with shared goals such as *Outreach*, *Discipleship*, or *Activation*. While you can rename objectives to better match your language, keeping their purpose consistent helps maintain accurate reporting and helps the core team develop features and reports based on objectives.

You can add new objectives as needed, but avoid creating too many. This keeps your data manageable and meaningful. Existing objectives cannot be deleted to preserve reporting integrity.

## Engagement Type

*Engagement Type* determines whether a *Step* is a *Milestone* or an ongoing *Rhythm*. *Milestones* mark major moments like *Baptism*, while *Rhythms* track continuous activities such as *Small Group* participation.

If the *Engagement Type* is set to *Rhythm*, a person’s *Status* on the *Step Type* page won’t change automatically. *Completed* means the rhythm has stopped, while *In Progress* indicates that it’s active.

## Impact Weight

*Impact Weight* measures how significant a *Step* is in a person’s overall journey. Higher values represent greater influence, allowing your organization to prioritize what matters most. You can configure this value in the *Step Type* settings.

## Prerequisites and Completion Flow

*Prerequisites* define which *Steps* must be completed before starting another. They ensure a logical order in how people move through your process.

*Completion Flow* controls how participants progress through *Steps* within a program:

- **Linear (Required)**: *Steps* must be completed in order. Custom prerequisites are removed.
- **Linear (Preferred)**: *Steps* are ideally completed in order, but prerequisites are still enforced.
- **Non-Linear**: *Step* order is for display only, and prerequisites remain active.

Together, these settings help create a structured, data-driven experience that supports both personal growth and organizational insight.

Let’s explore these concepts further by looking at the program for Discipleship, which is available right out of the box. Once you understand this program, you’ll be able to change it or create an entirely new program to measure anything from your students’ spiritual growth to your volunteers’ progress through training programs, and more.

# Steps

You can access your step programs under: People \> Engagement \> Steps. This is also where you’ll go to create new programs, which we’ll cover later in the [Editing Step Programs](#editing-step-programs) section.

![Steps Page](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/home-step-programs-core-v18.png)

Steps Page

# Step Program

The *Step Program* page has a detail block at the top and a list block below. There’s actually a lot to see and do on this page, so for now we’ll just get familiar with the page itself before diving into the setup and maintenance in later sections.

Let’s take it from the top and look at the detail block first.

![Step Program Detail](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/disciples-prog-chart-v18.png)

Step Program Detail

Next, let’s move down to the list block at the bottom of the page. Here you can see and maintain the step types included in your program.

![Step Types List](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-program-step-types-list-2-v18.png)

Step Types List

# Not Adding Up?

You'll sometimes notice that the counts for Started or Completed steps are higher than the number of people in your program. If you're doing any analysis with these numbers, it's important to keep in mind that a single person can be counted more than once if the step allows multiple completions.

In the [Editing Step Types](#editingsteptypes) section we’ll dive deeper into how the information in this block gets added and maintained.

# Step Types

Next, let's shift our focus to one of the individual step types within our example program.

The layout of the *Step Type* page is very similar to the *Step Program* page. You’ll see a familiar detail block at the top, followed by a list of step participants below. From here you can maintain the list of participants and view their progress as they start and finish the step.

![Step Type Page](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-type-page-2-v18.png)

Step Type Page

In the [Editing Step Types](#editingsteptypes) section we’ll dive deeper into how all of this gets set up and maintained. At this point it's just important to be familiar with the kinds of data shown on this page.

# Step Type Move

You may have heard a wise person in your life say, “Where you start doesn’t determine where you finish.” This is true for many things, including *Step Types*. If you select the button from a *Step Type*, you can move it to another program.

![step-type-move-modal-v18](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-type-move-modal-v18.png)

Step Type Move

When you press , it will ask you to select a *Step Program* to move to, then re-map statuses. It is important that the *status* you map to has a similar purpose as its current one. If not, you may end up considering all people who just started a *step* as far along as those who completed it years ago. Pressing Transfer is the final step, and it will redirect you to the *Step Type* page in the new *Program*.

# Warning for Step Type Moves

Notice the warning for this move, any *Step Type* with *prerequisites* will lose them, meaning in the program it leaves, some people will become eligible to complete new *steps*, and in the program its heading to, new *prerequisites* will need to be set up.

Additionally, *Step Attributes* don't follow when you move a *Step Type*, you must reconfigure them. All other *step data* does follow though.

# Historical Program Completions

Historical program completions stay tied to their original program. They don’t move when a *Step Type* is transferred.

This preserves the integrity of historical data, giving you an accurate picture of how people completed programs as they originally existed, not as they are today.

**Examples:**

1. If you add a new *Step Type* to a program, people who already completed that program keep their completion record.
2. If you move a *Step Type* to a new program, *Program Completions* for either program remain unchanged.

# Step Entry

Shepherding individuals through your program can be done either from the *Step Types* page or from the *Person Profile* page (which we’ll examine in the next section). Whichever path you take, you’ll wind up at a *Step Entry* page like the one pictured below. This is where you'll maintain step type information for an individual.

![Step Entry Page](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-entry-page-with-campus-v18.png)

Step Entry Page

When you add or change a step for a person, a history of those changes can be viewed on the *Person Profile* page under the [History tab](https://community.rockrms.com/documentation/bookcontent/5#historytab) in the *Person History* section.

While the *Step Entry* page is used for manually maintaining step information for individuals, there are automated alternatives. Steps can be updated from [Streak Achievements](#stepconfiguration) or as part of a [Workflow](https://community.rockrms.com/documentation/bookcontent/12#defaultactiontypes).

# Bulk Entry

Sometimes you just need to update a little data. Other times, you need to update a lot. When you're updating a lot, Rock’s bulk update tools for steps are here to help. Instead of making the same change one person at a time, you can apply updates to large groups in a single action.

There are two ways to bulk update Steps:

- Use the icon from the top or bottom of a list grid. Just select the individuals you want to update, then click the icon to launch the *Bulk Update* screen.
- Or, use the icon from the *Step Program* or *Step Type* pages to enter bulk entry mode.
![Step bulk entry interface showing selected program, type, dates, and notes.](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/Bulk-Entry-From-Grid-v18.png)

Bulk Entry from Grid

![Bulk Entry](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/step-type-bulk-entry-v18.png)

Bulk Entry From Step Program/Step Type Page

In our Discipleship example we can use the “Pastor” attribute to record which pastor performed the baptisms. This is great if large groups are baptized by different pastors because you only have to select a pastor once for any number of individuals. We’ll cover how to set up attributes like this in the next chapter [below](#stepattributes).

# Show on Bulk

If the *Show on Bulk* option is not enabled for the attribute, then the attribute will still appear in bulk entry, but it will need to be set for each person individually.


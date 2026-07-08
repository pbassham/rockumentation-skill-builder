---
description: "Use when the user needs to view, access, or filter their reminders including understanding reminder statuses like Active, Complete, Due, or Not Due"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Reminders

Reminders are for those things we always want to do, but often forget. We truly intend to follow up with people or write them a card or send them an email, but then life happens and these things get pushed to the back of our minds where they're eventually forgotten. It happens to all of us. But with *Reminders*, staying organized and on top of all your commitments has never been easier.

By setting up reminders for key events and tasks, you'll never miss an opportunity to make a positive impact on those around you. For instance, by reminding yourself to check in with someone regularly, you're demonstrating that you value relationships. Whether you're a busy volunteer or a church leader, reminders are the perfect tool to help you stay organized and build deeper connections.

# Viewing Reminders

To start, you can access your reminders from any page in Rock by clicking the icon in the header. This is also where you'll add new reminders, but we'll get to that later.

![Current Reminder Alert](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-header-alert-icon-v18.png)

Current Reminder Alert

From there you can choose to *View Reminders* and see a filterable list of your reminders.

Reminders can be in different states. For instance, you either still need to be reminded (*Active*) or you've already been reminded and taken action (*Complete*). *Active* reminders can be *Due* or *Not Due*. This is determined by the *Reminder Date* you select when creating the reminder, which we'll look at shortly.

- **Active:** If a reminder is Active, it means you haven't been reminded yet or you haven't taken action on it yet
- **Complete:** A reminder is Complete if you've already been reminded and taken action
- **Due:** This means that it's time to take action on the reminder, and that you've been reminded via communication or workflow
- **Not Due:** These are Active reminders that have *Reminder Dates* in the future
![Reminder List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-view-reminder-list-v18.png)

Reminder List

In the screenshot above we see three reminders. All of them are both *Active* and *Due*, which we can tell from the filter selections near the top of the block. These are reminders on which you want to focus and take action. With filters like this you won't see *Not Due* reminders, so your screen isn't cluttered with every reminder due in the future.

You can change the filters to see items that aren't due yet. After you've been reminded and have done what you need to do, you'll *Complete* the reminder, taking it off your list.

# Adding Reminders

There are two ways to add reminders. You can add a reminder manually from pages with [context](https://community.rockrms.com/documentation/bookcontent/14#usingcontext), or you can add a reminder in an automated way using a workflow action. We'll look at each method below.

## Adding Reminders Manually

You can view your current reminders from anywhere in Rock by clicking the icon. This is also where you'll go to add new reminders. You can add reminders from just about anywhere, all you need is a reminder type and a page with context.

To add a new reminder for an entity you need to be on a page that has [context](https://community.rockrms.com/documentation/bookcontent/14#usingcontext) for that entity. There will also need to be a corresponding reminder type for the entity. For instance, a reminder of type "Hospital Visit" has an entity type of *Person*, so you can add that reminder from the *Person Profile* page. Similarly, you can add group reminders from the *Group Viewer* page when you have a group selected.

![Add New Reminder](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-add-new-reminder-v18.png)

Add New Reminder

## Adding Reminders via Workflow

Reminders can be added in an automated way using workflows. There's a workflow action type dedicated to this. You can find information about this action in our [Workflow Actions](https://community.rockrms.com/WorkflowActionCategory?Category=8#reminderadd) documentation.

![Workflow Action](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/reminders-workflow-action-v15.png)

Workflow Action

# Reminder Types

Reminder types help group, secure and organize individual reminders. Each reminder type is associated with an entity in Rock, so you can have reminders for just about anything. There are a few examples in the screenshot below to help get you thinking about what reminder types you might configure. To configure reminder types, navigate to Admin Tools \> Settings \> General \> Reminder Types.

![Reminder Type List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-reminder-type-list-v18.png)

Reminder Type List

You have many options for setting up reminder types. For instance, do you want to receive a communication when the reminder becomes *Due*, or should a workflow launch and do something for you? Remember, you can set up reminder types for any entity type. All you need to make a reminder is a reminder type and a page with [context](https://community.rockrms.com/documentation/bookcontent/14#usingcontext).

![Edit Reminder Type](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-edit-reminder-type-v18.png)

Edit Reminder Type

Every reminder you create will be of one of the types you configure as described above. You can create as many as you need, and you can assign security to each one if it's only available for certain roles or individuals. In the next section, we'll see how these reminder types get used to create reminders.

# Notification Types

You can be notified in one of two ways when a reminder's date arrives. You can be sent an email, or you could launch a workflow that performs certain actions and then perhaps notifies you in a different way. We'll look at both of these methods below.

## Communication

If you choose a *Notification Type* of Communication when configuring your reminder type, the person assigned to the reminder will receive a system communication when the reminder date arrives. The template for this communication can be found under Admin Tools \> Settings \> Communications \> System Communications and is called *Reminder Notification*.

![System Communication](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-system-communication-v18.png)

System Communication

If you want to use a different system communication than the one provided, you can change which one is used by updating the *Process Reminders* job configuration. We'll talk more about that below.

## Workflow

You can choose to have the reminder launch a workflow instead of sending you a communication. Of course, you can configure the workflow to send you a communication. When the reminder date arrives for a reminder configured to launch a workflow, the workflow will launch and will be passed the following items if the workflow has matching keys:

1. Reminder
2. ReminderType
3. Person
4. EntityType
5. Entity
![Workflow Attributes](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-workflow-attributes-v18.png)

Workflow Attributes

# Process Reminders System Job

The *Process Reminders* job is what will trigger the communication or workflow that's configured for your reminder type. Depending on the configuration of your reminder type, the job will also mark reminders complete after their notification has been processed. Lastly, the job will recalculate the active reminder count shown near the icon in page headers.

![Process Reminders Job](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/reminders-process-reminders-job-v18.png)

Process Reminders Job

Table of Contents

- [Welcome](#welcome)
- [We Are Family](#wearefamily)
- [Portrait of a Person](#portraitofaperson)
- [Searching](#searching)
- [Person Profile Page](#personprofilepage)
- [Editing an Individual](#editinganindividual)
- [Adding a Family](#addingafamily)
- [Editing a Family](#editingafamily)
- [Family Pre-Registration](#familypreregistration)
- [How Rock Handles People and Families](#howrockhandlespeopleandfamilies)
- [Directory](#directory)
- [Duplicates](#duplicates)
- [Recommendations for Life Events](#recommendationsforlifeevents)
- [Person Notes](#personnotes)
- [Badges](#badges)
- [Tags](#tags)
- [Person Signal Types](#personsignaltypes)
- [My Pages](#mypages)
- [Configuring a Person](#configuringaperson)
- [Person Attributes](#personattributes)
- [Family Attributes](#familyattributes)
- [Person & Family Analytics](#personfamilyanalytics)
- [Managing Known Relationships](#managingknownrelationships)
- [School Grades](#schoolgrades)
- [Bulk Updates](#bulkupdates)
- [Person Profile Editor](#personprofileeditor)
- [Photo Requests](#photorequests)
- [Following](#following)
- [Strategies for Blended Families](#strategiesforblendedfamilies)
- [Reminders](#reminders)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


---
description: Use when user needs to register for a group or configure group registration settings in Rock Mobile
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Allows a person to register for a group.

## Getting Content

Content is passed in through a page parameter, referenced as `GroupGuid`. There are quite a few examples of passing page parameters (also known as query parameters) lying around the documentation, and here is a great [example](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list#using-query-parameters).

### Page Parameters

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to display registration for. |

## Block Configuration

### Group Member Status

The 'Group Member Status' to use when adding a new member.

### Group Type Guid

The group type identifiers which are valid to use as the [page parameter](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-registration#page-parameters). You can use this to limit registration to certain group types.

### Registration Workflow

An optional workflow to start for each individual being added to the group. The GroupMember will be set as the workflow entity. The current/primary person will be passed as the workflow initiator. If you are unfamiliar with workflows, please take a look at [Workflows in Rock](https://community.rockrms.com/documentation/bookcontent/12/244).

### Family Options

Provide additional inputs to register additional members of the family upon the current person's registration.

### Mobile Phone

Determines if the mobile phone field should be hidden, required, or optional.

### Email Address 

Determines if the e-mail address should be hidden, required, or optional.

### Group

The group to provide registration for. If this is left blank, it will be inferred that the guid of the group will be retrieved from the [page parameters](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-registration#page-parameters).

### Connection Status

The connection status to use for new individuals upon registration.

### Record Status

The record status to use for new individuals upon registration.

### Result Page

An optional page to navigate the individual to upon registration. `GroupGuid` will be passed as a query string parameter.

### Registration Completion Message

The lava template that is used to format the result message after a user has been successfully registered. Note that if you set a [result page](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-registration#result-page), this setting will be irrelevant.

### Prevent Overcapacity Registrations

When this is set to true, a user cannot register for groups that are at capacity. If there is only one spot available, none of the family members can be registered.

### Autofill Form

If set to false then the form will not load the context of the logged-in user.

### Register Button Text

The text to display in the save button.

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

---

## Group View {#group-view}

Displays a page to allow the user to view the details about a group.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to view the details of. |

## Settings

| Setting | Description |
| --- | --- |
| Group Edit Page | The page that will be navigated to when the 'edit' button is pressed. GroupGuid will be passed in as a page parameter. |
| Show Leader List | Specifies if the leader list should be shown. This value is made available to the template as ShowLeaderList. |

## Template

The **Deploy** button is not required for content changes.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| Group | Group | The group that is retrieved from the GroupGuid parameter. |
| GroupEditPage | Guid | The Guid of the page that is passed when the Edit button is pressed. Retrieved from the Group Edit Page block configuration. |
| ShowLeaderList | boolean | True or False depending on the Show Leader List setting. |

### Styling

There’s no styling X-Ray available.

---

## Schedule Preference {#schedule-preference}

*Set your preferences for group scheduling.*

### M v4.0C v13.3

This allows an individual to set their scheduling preferences, so an administrator (and auto-scheduling) knows their preferred dates, times, and locations. If you are unfamiliar with group scheduling in Rock, please refer to the [Rock Your Groups - Group Scheduling](https://community.rockrms.com/Rock/BookContent/7#groupscheduling) manual.

## Group Selection

If a user is enrolled in more than one group that has group scheduling enabled, it will first prompt them with a group selection page, provided in the screenshot below. If an individual is not enrolled in any groups, a friendly message is displayed to reach out to the church if they are interested in volunteering.

With "Children's" and "Greeters" being the groups that the individual is enrolled in. This allows a user to set their preferences on a per-group basis.

## Preferences

This is the screen that an individual can update their preferences on. It will automatically update when the user changes the value, with a friendly [ShowToast](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#showtoast) to notify them that it was successful.

## Add Assignment

The 'Add Assignment' button will prompt them with a modal to allow an individual to request exact group scheduling opportunities, as exampled below:

When this form is submitted, it is reflected in the Preferences page with a friendly [ShowToast](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#showtoast) stating it was successful.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71492)

---

## Schedule Sign Up {#schedule-sign-up}

M v4.0 C v13.3 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

This allows an individual to sign up for additional scheduling opportunities, instead of having to be scheduled for a particular location and time through an administrator. This block is heavily dependent on group configuration for scheduling so if you are unfamiliar with group scheduling in Rock, please refer to [Rock Your Groups - Group Scheduling](https://community.rockrms.com/Rock/BookContent/7#groupscheduling).

## Future Weeks to Show

This block setting sets how many weeks into the future you would like an individual to be able to sign-up for. For instance, if today is 6/1/2022, and I have this block setting set to '6', I will be able to sign up for dates and times through 7/15/2022.

## Group Selection 

If a user is enrolled in more than one group that has group scheduling enabled, it will first prompt them with a group selection page, provided in the screenshot below. If an individual is not enrolled in any groups, a friendly message is displayed to reach out to the church if they are interested in volunteering.

## Schedule Sign-Up

When there are available schedules, a user can easily scroll through and click the dates and times that work for them. If there are multiple locations, a friendly action sheet is displayed that allows an individual to specify a location preference, or not.

## Scheduler Receive Confirmation Emails

When enabled, the scheduler will receive an email for each confirmation or decline. Note that if a Group's "Schedule Coordinator" is defined, that person will automatically receive emails.

## Scheduling Response Email

The system communication used to send emails to the scheduler for each confirmation or decline. If a Group's "Schedule Coordinator" is defined, this will also be used when sending emails.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71503)

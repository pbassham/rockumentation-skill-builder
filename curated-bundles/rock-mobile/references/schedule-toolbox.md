---
description: "Use when user needs to accept, decline, or cancel group scheduling attendance requests in Rock mobile"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Accept, decline or cancel scheduled attendances.

### M v4.0C v13.1

This block manages scheduling opportunities for an individual, allowing them to 'Accept' or 'Decline' an attendance request, or cancel a previously accepted or declined request. If you are unfamiliar with group scheduling in Rock, please refer to [Rock Your Groups - Group Scheduling](https://community.rockrms.com/Rock/BookContent/7#groupscheduling).

This block gives an individual the opportunity to confirm their attendance, decline it (and provide a reason), or cancel an attendance that they previously confirmed. All of this is customizable via the Toolbox Template.

## Toolbox Template

Changing this default template allows you to fully customize the schedule toolbox page.

Warning

The default template contains two | characters on Lines 47 and 75 which is invalid. Until a fix is in place, you'll need to modify this template and remove the extra pipes.  

### Merge Fields

Merge fields are fields that the block replaces with applicable information. For instance, in this block, we provide a list of the pending schedules, defined as "ScheduleList". This will provide the entire list of pending, unavailable, and declined attendances. The merge fields we provide for this block are:

| Property | Type | Description |
| --- | --- | --- |
| ScheduleList | List | A list of all of the specific individual's schedule information. |

### Commands

This block offers specific command bindings to use in the Toolbox Template XAML.

| Command | Description |
| --- | --- |
| PushScheduleConfirmModal | Pushes a modal that allows a user to provide a decline reason for the specific attendance. If a decline reason is marked as required in the GroupType settings, it will reflect that. You can customize the content of this modal in the "confirm decline template". |
| ConfirmAttend | Marks an attendance as "confirmed". |
| SetPending | Sets an attendance back to a state of neither "confirmed" nor "declined". |

## Confirm Decline Template

Changing this content allows you to customize the content on the modal that is pushed when a user "declines" an attendance. This is mostly just the header content, as the decline reason picker and button are programmed into the block itself.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| Attendance | Attendance | The specific attendance that the user is attempting to decline. |

## Scheduler Receive Confirmation Emails

When enabled, the scheduler will receive an email for each confirmation or decline. Note that if a Group's "Schedule Coordinator" is defined, that person will automatically receive emails.

## Scheduling Response Email

The system communication used to send emails to the scheduler for each confirmation or decline. If a Group's "Schedule Coordinator" is defined, this will also be used when sending emails.

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

---

## Schedule Unavailability {#schedule-unavailability}

Mark dates to be excluded from when group scheduling.

### M v4.0C v13.3

This block allows an individual to schedule dates that they (or their household members) are unavailable, so an administrator knows not to schedule them on these days. If you are unfamiliar with group scheduling in Rock, please refer to [Rock Your Groups - Group Scheduling](https://community.rockrms.com/Rock/BookContent/7#groupscheduling).

Here is an example of our rendered default template. Here, you can see your previously scheduled "exclusions", or dates that an individual will be unavailable.

## Unavailability Description

You can see above, in the third exclusion, a description was provided and therefore displayed. You can set these as mandatory in the block settings, underneath the "Schedule Unavailability Template".

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

---

## Prayer {#prayer}

This section refers to the 'Prayer' mobile block group.

---

## Answer to Prayer {#answer-to-prayer}

Displays an existing prayer request and allows the user to enter the answer to prayer.

M v3.0

## Getting Started

If you haven't yet set up a block that lists prayer requests in some order, I would recommend starting with that. A couple of examples of those are [Prayer Card View](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view) and [My Prayer Requests](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/my-prayer-requests). Those blocks both have a setting that should link to a page containing this block.

## Query Parameters

The query parameters this block looks for upon initialization are as follows.

| Name | Type | Description |
| --- | --- | --- |
| RequestGuid | Guid | The Guid of the prayer request being answered. |

## Block Configuration

### Return Page

If set then the current page will be replaced with the Return Page on Save. If not set then a Pop Page is performed instead.

## Enforce Security 

Ensures that the person editing the request is the owner of the request.

### Template 

The template for how to display the prayer request.

#### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| PrayerRequest | [PrayerRequest](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view#prayerrequest-type) | The prayer request that is being answered. |

### Styling

There’s no styling X-Ray available.

---

## My Prayer Requests {#my-prayer-requests}

### M v2.0C v12.4

Shows a list of prayer requests that the user has previously entered.

This block is used by an individual to manage the prayer requests that they've previously posted.

## Query Parameters

The query parameters this block looks for upon initialization are as follows.

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | An optional Guid of the group to filter prayer requests to. |

## Block Configuration

### Edit Page

The page that will be used for editing a prayer request. Try setting this to a page containing the [Prayer Request Details](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-request-details) block.

### Answer Page

This page is used for allowing the user to enter an answer to prayer. Try setting this to a page containing the [Answer To Prayer](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/answer-to-prayer) block.

### Merge Fields

In the template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| PrayerRequestItems | List<[PrayerRequest](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/prayer/prayer-card-view#prayerrequest-type)\> | The entire list of prayer requests. |
| EditPage | Guid | The Guid of the page to edit a prayer request. |
| AnswerPage | Guid | The Guid of the page to answer a prayer request. |

### Styling

There’s no styling X-Ray available.

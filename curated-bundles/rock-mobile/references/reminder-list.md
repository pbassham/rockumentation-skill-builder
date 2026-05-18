---
description: "Use when configuring reminder list displays, filtering reminders by status or due date, or understanding reminder settings and parameters"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

## Settings

| Name | Description |
| --- | --- |
| Reminder Edit Page | The page to navigate to when a reminder is pressed. |
| Reminder Types Include | The reminder types to include. Leave all unchecked to include all reminder types (except for the reminder types selected in **Reminder Type Exclude**). |
| Reminder Type Exclude | The reminder types to exclude. This setting is only effective if no specific reminder types are checked in **Reminder Types Include**. |
| Completion Display Delay | This is the amount of time, in milliseconds, that it will take from a reminder that has been completed/incompleted to be removed from the UI. This only actually happens if the reminder should no longer be displayed (e.g. filter is set to Incomplete, and you completed a reminder). This delay provides a window of time to undo an accidental mark of completion/incompletion. |

## Parameters

| Key | Type | Description |
| --- | --- | --- |
| EntityTypeGuid | Guid | The type of entity to display reminders for. |
| EntityGuid | Guid | The entity to display reminders for. |
| ReminderTypeGuid | Guid | The reminder type to limit this list to. |
| PersonGuid | Guid | The specific Person to display reminders for. |
| GroupByType | bool | If enabled, the reminders will be grouped by their ReminderType. Non-grouped is paginated and efficient for long lists. Grouped loads everything upfront, which is fine if counts are small but could be expensive with many reminders. |
| CollectionHeader | string | The text to display at the top of the collection of reminders. |
| CompletionFilter | CompletionFilter | The Completion Filter. |
| DueFilter | DueFilter | The Due Filter. |
| StartDateFilter | DateTime | Only show reminders with a ReminderDate later than the value provided. |
| EndDateFilter | DateTime | Only show reminders with a ReminderDate that precedes the value provided. |
| ReminderTypeFilter | Guid | The reminder type to filter this list to. |
| PageLoadSize | int | The amount of reminders to load at a time. |

### Completion Filter

This object is designed to provide filter information of the completion status of a reminder.

| Name | Value | Description |
| --- | --- | --- |
| None | 0 | No completion filtering (incomplete & complete reminders shown). |
| Active | 1 | Limit to reminders that are currently active. |
| Complete | 2 | Limit to reminders that are completed. |
| Incomplete | 3 | Limit to reminders that are not complete. |

### Due Filter

This object is designed to provide filter information of the due date of a reminder.

| Name | Value | Description |
| --- | --- | --- |
| None | 0 | No due date filtering. |
| Due | 1 | Limit to reminders that are past due. |
| DueThisWeek | 2 | Limit to reminders due this week. |
| DueThisMonth | 3 | Limit to reminders due this month. |

## Delete Reminder

C v16.1

Reminders can be deleted by swiping left on the reminder item.

## Link to Profile Page

C v16.1

To link Person Alias reminders to a Person Profile page, ensure that a `Profile Page` is set in your application settings.

![](https://community.rockrms.com/GetImage.ashx?Id=67292)

That page will be navigated to with `PersonGuid` passed along as the parameter.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71444)

---

## Reminder Edit {#reminder-edit}

*Allows a reminder to be edited or created.*

### M v5.0C v15.1

  

## Block Configuration

### Header Template

This is the template used to display important action-related UI. Unless you have a proficient understanding of data bindings and XAML, you should only really make styling tweaks in here.

### Save Navigation Action

The navigation action to perform when the save button is pressed.

## Page Parameters

This block looks for the following page parameters (query string).

| Key | Type | Description |
| --- | --- | --- |
| ReminderGuid | Guid | The Guid of the existing reminder you wish to edit. |
| EntityTypeGuid | Guid | The Guid of the Entity Type of the Reminder you're creating. |
| EntityGuid | Guid | The Guid of the entity of the Reminder you're creating. |

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71445)

---

## Security {#security}

This section refers to the "Security" mobile block group.

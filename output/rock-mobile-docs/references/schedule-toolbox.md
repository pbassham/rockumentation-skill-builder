> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Schedule Toolbox

# Schedule Toolbox

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

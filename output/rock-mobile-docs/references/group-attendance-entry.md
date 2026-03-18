> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Group Attendance Entry

# Group Attendance Entry

![](https://community.rockrms.com/GetImage.ashx?Id=67259)

This block displays a list of group members that can be selected to mark attendance for a specified date. You can read more about group attendance here in the [Rock Your Groups manual](https://community.rockrms.com/Rock/BookContent/7#groupattendance).

Important

Unlike the web, groups must have a schedule configured in order to use this block.

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to mark attendance for. |

## Settings

| Property | Description |
| --- | --- |
| Number of Days Forward to Allow | The number of days forward to allow attendance to be entered for. |
| Number of Days Back to Allow | The number of days back to allow attendance to be entered for. |
| Save Redirect Page | When the 'Save' button is pressed, this is the page that is navigated back to. If Show Save Button is disabled, this will be irrelevant. |
| Show Save Button | Whether or not you want to display the save button. |
| Allow Any Date Selection | Whether or not any custom date can be selected. |
| Show Attendance Notes | Whether or not the text field for note entry will be visible. |
| Attendance Note Label | The attendance label that appears above the notes field. If Show Attendance Notes is disabled, this will be irrelevant. |

## Styles

| Class | Element | Description |
| --- | --- | --- |
| group-attendance-entry-layout | StackLayout | Outer content wrapper |
| header | ContentView | Header content wrapper |
| divider | [Divider](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/divider) | Applies to all dividers |
| notes | [Text Editor](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/text-editor) | The conditional notes editor |
| save-button | [Button](https://community.rockrms.com/developer/mobile-docs/styling/legacy/styling-components/button) | The conditional save button |

![](https://community.rockrms.com/GetImage.ashx?Id=71504)

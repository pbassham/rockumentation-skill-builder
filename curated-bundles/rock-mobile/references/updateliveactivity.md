---
description: "Use when updating an active Live Activity on iOS Lock Screen or Dynamic Island with new content like progress, timers, or detail values"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mobile20.0  iOS16.1

Changes the content of a Live Activity that's already running, such as moving its progress bar or updating a room number. If no activity is running under the `ActivityKey`, it does nothing. That makes it safe for a page that refreshes on a timer: unlike `StartLiveActivity`, it won't bring back an activity the person has already dismissed.

The `CommandParameter` must be a `LiveActivityParameters` object with both `ActivityKey` and `Title` set. It replaces the activity's content, so include every property you still want shown, not only the ones that changed.

Warning

Your app must be built with Live Activities turned on. This is a build option, and the widget it adds needs its own provisioning profile. An app built without it ignores this command.

Note

Updates only come from the app. There's no server push, so an activity can't change while the app isn't running.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| ActivityKey | string | The key the activity was started with. Required. |
| TemplateId | string | The template that shows the activity. Only `generic` is available. Defaults to `generic`. |
| Title | string | The main line of text. Required. |
| Subtitle | string | The second line of text. |
| IconName | string | A Rock icon class for the icon the activity leads with, such as `fa fa-check-circle` or `ti ti-clock`. An icon that can't be shown falls back to the template's default. |
| AccentColor | Color | The brand color for the Lock Screen card, the icon, the progress bar and the Dynamic Island outline. Takes a hex value or `{Rock:PaletteColor ...}`. Transparency is ignored. |
| IconColor | Color | The color of the icon alone. Takes priority over `AccentColor` for the icon. |
| Progress | double | A value from 0 to 1, shown as a progress bar. |
| DetailLabel | string | The caption for the detail row, such as Security Code, Room or Seat. Ignored unless `DetailValue` is also set. |
| DetailValue | string | One value shown under the title on the Lock Screen and in the expanded Dynamic Island. Never shown in the compact Dynamic Island. |
| IsDetailSensitive | bool | Hides `DetailValue` while the device is locked and removes it once the activity is out of date. Defaults to `true`. |
| CompactLabel | string | A few characters shown beside the icon in the compact Dynamic Island only. Longer text is cut off. |
| TargetDateTime | DateTime | The end of a countdown. When set, the activity shows a timer instead of a progress bar. |
| MinutesFromNow | double | The end of a countdown, in minutes from now. Ignored when `TargetDateTime` is set. |
| StaleDateTime | DateTime | When the content stops being accurate. After this time the card dims and sensitive details are removed. Needs iOS 16.2 or later. |
| StaleMinutesFromNow | double | When the content stops being accurate, in minutes from now. Ignored when `StaleDateTime` is set. |

## Examples

```
<Button Text="Update Progress"
    Command="{Binding UpdateLiveActivity}">
    <Button.CommandParameter>
        <Rock:LiveActivityParameters ActivityKey="checkin"
            Title="Checked In"
            Subtitle="Room 204"
            IconName="fa fa-user-check"
            Progress="0.75" />
    </Button.CommandParameter>
</Button>
```

## Related

- [StartLiveActivity](https://community.rockrms.com/developer/mobile-docs/commands/startliveactivity) starts a Live Activity.
- [EndLiveActivity](https://community.rockrms.com/developer/mobile-docs/commands/endliveactivity) ends a running Live Activity.

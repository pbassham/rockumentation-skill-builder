---
description: "Use when you need to display a person's profile picture or avatar image with customizable styling, colors, and text options"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Mv6.0 Cv15.0   [📔  Avatar](https://community.rockrms.com/styling/components/avatars)

Display a person's avatar using the configured settings. Rock's avatar feature provides the ability to create unique avatar images for each person record within the system.

*Inherits from* [*Microsoft.Maui.Controls.ContentView*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/contentview?view=net-maui-8.0)

Visit the link below to learn more about this Rock feature:

[Avatar Styling](https://community.rockrms.com/styling/components/avatars)

This control constructs an avatar image source based on the provided parameters or displays the current person's avatar.

## Properties

| Property | Type | Description |  |
| --- | --- | --- | --- |
| Source | string | The direct source to the Avatar URL. |  |
| PersonGuid | Guid | The person to display the avatar for. |  |
| Rounded | bool | Whether or not the avatar should be rounded. |  |
| ShowStroke | bool | Whether or not a default stroke shape should be applied to the avatar. |  |
| AvatarBackgroundColor | Color | The background color of the avatar. This is passed along to the GetAvatar request. |  |
| AvatarForegroundColor | Color | The foreground color of the avatar. This is passed along to the GetAvatar request. |  |
| AvatarAgeClassification | AgeClassification | The age classification of the avatar. |  |
| AvatarGender | Gender | The gender of the avatar. |  |
| AvatarBold | bool | Whether or not the avatar should be bolded. |  |
| AvatarStyle | string | The style of the avatar. Typically initials or icon. |  |
| AvatarText | string | The text to use for the avatar. |  |

## Automatic Updates

M20.0

An Avatar refreshes itself when a person's photo is updated through the [UpdatePersonProfilePhoto](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#updatepersonprofilephoto) command, with no extra markup. Which form you use determines whether that happens:

| Form | Refreshes Automatically? |
| --- | --- |
| `<Rock:Avatar PersonGuid="..." />` | Yes, when that person's photo changes |
| `<Rock:Avatar />` | Yes, for the current person |
| `<Rock:Avatar Source="..." />` | No. Displays whatever URL you supplied, and only changes when that value does |
| Styled avatars with no `PersonGuid` (initials, icon,  custom text) | No, they render no photo |

Photo changes made on the website rather than in the app are picked up the next time the app launches.

Important

When using `PersonGuid`, the control may append a cache parameter to the generated `GetAvatar.ashx` URL so the updated photo is fetched instead of a cached copy. Do not strip or parse this parameter in custom Lava.  

## Examples

Both forms below produce a valid avatar. Which one to use depends on whether the photo can change while the page is open.

Pass `PersonGuid` when the photo might be updated in the app while this avatar is on screen. The control builds its own URL, so it refreshes itself when that person's photo changes.

```
<Rock:Avatar PersonGuid="{{ CurrentPerson.Guid }}" />
```

Pass `Source` when you already have a person object and the photo will not change while the page is open, such as a read-only detail view or a long list. This avoids a person lookup on the server for every avatar request, so it is the lighter option at scale, but the image will not update until the value you bound to changes.  

```
<Rock:Avatar Source="{{ CurrentPerson.PhotoUrl | Escape }}" />
```
```
<Rock:Avatar AvatarBackgroundColor="{Rock:PaletteColor App-Primary-Soft}" 
   AvatarForegroundColor="{Rock:PaletteColor App-Primary-Strong}"
   AvatarText="Custom Avatar"
   Rounded="False" />
```

If no properties are set, the component will display the current person's avatar:

```
<Rock:Avatar />
```

---

## Bible Audio {#bible-audio}

*Listen to specific Bible verses on the fly.*

M v2.0C v12.1

This control is a component designed for playing audio content of Bible verses. This is handled via the Spark Data API to retrieve the information about the Bible and the verses to be displayed.

Note

When including Psalms in the reading Reference be sure to use Psalms, notPsalm.  

| Property | Type | Description |
| --- | --- | --- |
| Reference | String | One or more Bible references separated by a semicolon. Example: Genesis 1:1-9; Matthew 2,3. This would result in the contents of Genesis chapter 1 verses 1-9 being displayed, followed by Matthew chapters 2 and 3. |
| WriteInteraction | Boolean | A property that allows you to enable or disable the writing of interactions. |
| WriteInteractionParameters | [InteractionParameters](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#write-interaction) | An object containing parameters that control how the audio is interacted with. This could include behaviors like the audio play speed, volume, etc. |

You can supply custom content to your Bible Audio control, and maintain a reactive UI through bindings and commands.

| Property | Type | Description |
| --- | --- | --- |
| IsPlaying | Boolean | A flag indicating whether audio is currently playing. A value of true means the audio is playing; false means it's not. |
| PlayAudio | ICommand | A command that triggers the playing of the Bible audio. This is used to start the audio. |
| PauseAudio | ICommand | A command that triggers the pausing of the Bible audio. This is used to pause the audio. |
| PlayOrPauseAudio | ICommand | A command that either plays or pauses the Bible audio based on the current state (if it's playing or not). |

Then the content is simply supplied as the direct child of the control:

```
<Rock:BibleAudio Reference="Psalms 1">
    <Rock:Icon IconClass="{Binding BibleAudio.IsPlaying, Converter={Rock:BooleanValueConverter True=pause, False=volume-up}}"
        FontSize="20"
        StyleClass="text-primary"
        Command="{Binding BibleAudio.PlayOrPauseAudio}" />
</Rock:BibleAudio>
```

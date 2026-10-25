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

Important

Starting with Rock v20.1, `GetAvatar.ashx` only shows a person's photo on a URL the server signed. A `PersonGuid` on its own can't unlock a photo, so `<Rock:Avatar PersonGuid="..." />` shows initials for anyone other than the current person. Pass the person's photo URL in `Source` as well, as shown in the examples below. Signed URLs expire after about seven days, so a photo falls back to initials if page content is cached longer than that.

## Properties

| Property | Type | Description |  |
| --- | --- | --- | --- |
| Source | string | The photo URL the server built for the person, such as their `PhotoUrl`. When it points at `GetAvatar.ashx`, the avatar styling properties below are added to it. M19.6 |  |
| PersonGuid | Guid | The person to display the avatar for. Used to refresh the avatar when that person's photo changes. |  |
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
| `<Rock:Avatar Source="..." PersonGuid="..." />` | Yes, when that person's photo changes M19.6 |
| `<Rock:Avatar PersonGuid="..." />` | Yes, when that person's photo changes. On Rock v20.1 and later this shows initials unless it is the current person. |
| `<Rock:Avatar />` | Yes, for the current person |
| `<Rock:Avatar Source="..." />` | No. Displays whatever URL you supplied, and only changes when that value does |
| Styled avatars with no `PersonGuid` (initials, icon,  custom text) | No, they render no photo |

Photo changes made on the website rather than in the app are picked up the next time the app launches.

Important

When using `PersonGuid`, the control may append a cache parameter to the generated `GetAvatar.ashx` URL so the updated photo is fetched instead of a cached copy. Do not strip or parse this parameter in custom Lava.  

## Examples

Which form to use depends on whose avatar you are showing.

For anyone other than the current person, pass both `Source` and `PersonGuid`. `Source` supplies the photo URL the server built, and `PersonGuid` lets the avatar refresh when that person's photo changes. This works on every Rock version. `PhotoUrl` is a site-relative path, so prefix it with the public application root, and use `Escape` since the URL contains `&`.

```
<Rock:Avatar Source="{{ 'Global' | Attribute:'PublicApplicationRoot' }}{{ member.Person.PhotoUrl | Escape }}"
   PersonGuid="{{ member.Person.Guid }}" />
```

For the current person, `PersonGuid` on its own is enough. The app already has their photo URL from the server, so the avatar shows and refreshes their photo without a `Source`.

```
<Rock:Avatar PersonGuid="{{ CurrentPerson.Guid }}" />
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

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Avatar

# Avatar

Mv6.0 Cv15.0   [📔  Avatar](https://community.rockrms.com/styling/components/avatars)

Display a person's avatar using the configured settings. Rock's avatar feature provides the ability to create unique avatar images for each person record within the system.

*Inherits from* [*Microsoft.Maui.Controls.ContentView*](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/contentview?view=net-maui-8.0)

Visit the link below to learn more about this Rock feature:

[Avatar Styling](https://community.rockrms.com/styling/components/avatars)

This control constructs an avatar image source based on the provided parameters or displays the current person's avatar.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Source | string | The direct source to the Avatar URL. |
| PersonGuid | Guid | The person to display the avatar for. |
| Rounded | bool | Whether or not the avatar should be rounded. |
| ShowStroke | bool | Whether or not a default stroke shape should be applied to the avatar. |
| AvatarBackgroundColor | Color | The background color of the avatar. This is passed along to the GetAvatar request.   |
| AvatarForegroundColor | Color | The foreground color of the avatar. This is passed along to the GetAvatar request.   |
| AvatarAgeClassification | AgeClassification | The age classification of the avatar. |
| AvatarGender | Gender | The gender of the avatar. |
| AvatarBold | bool | Whether or not the avatar should be bolded. |
| AvatarStyle | string | The style of the avatar. Typically initials or icon.   |
| AvatarText | string | The text to use for the avatar. |

## Examples

In most cases, you'll want to provide the Avatar source directly to the component. This should be the method utilized whenever you have a person object available.

```xaml
<Rock:Avatar Source="{{ CurrentPerson.PhotoUrl | Escape }}" />
```

Otherwise, you can pass in the parameters to build the Avatar source manually.

```xaml
<Rock:Avatar PersonGuid="{{ CurrentPerson.Guid }}" />
```

```xaml
<Rock:Avatar AvatarBackgroundColor="{Rock:PaletteColor App-Primary-Soft}" 
   AvatarForegroundColor="{Rock:PaletteColor App-Primary-Strong}"
   AvatarText="Custom Avatar"
   Rounded="False" />
```

If no properties are set, the component will display the current person's avatar:

```xaml
<Rock:Avatar />
```

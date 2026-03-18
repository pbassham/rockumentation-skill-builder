> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Login Status

# Login Status

M v1.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

The Login Status control displays an icon and message encouraging individuals to log in. After logging in, it will display their profile image, and tapping will provide the option to capture or upload a new photo.

![](https://community.rockrms.com/GetImage.ashx?Id=67143)

### Properties

| Property | Type | Description |
| --- | --- | --- |
| WelcomeMessage | string Lava | The welcome message displayed when a user is logged in. Defaults to Hello {{ CurrentPerson.FirstName }}! |
| LoginMessage | string Lava | The login message displayed if a user is not logged in. Defaults to Login. |
| EditProfileLabel | string Lava | The edit profile subtext displayed if a user is logged in. Defaults to Edit Profile. |
| LoginLabel | string Lava | The login subtext displayed if a user is not logged in. Defaults to Tap to Personalize. |
| NoProfileIcon | string | The icon displayed if a user is logged in but has no profile photo. Defaults to resource://Rock.Mobile.Resources.profile-no-photo.png. |
| NoProfileIconColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/Xamarin.Forms.Color) | Colors the NoProfileIcon image if set. |
| NotLoggedInIcon | string | Image displayed if no user is logged in. Defaults to resource://Rock.Mobile.Resources.person-no-photo-unknown.svg. |
| NotLoggedInColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/Xamarin.Forms.Color) | Colors the NotLoggedInIcon image if set. |
| ProfilePageGuid | Guid | The profile page unique identifier that the user will be directed to when they tap on Edit Profile. |
| ImageSize | double | Width and height of the profile image. Defaults to 80. |
| ImageBorderSize | double | Width of the profile image border. Defaults to 0. |
| ImageBorderColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Color used for the profile image border. Defaults to White. |
| TitleFont | [Font](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.font) | Font for the Title text. |
| TitleFontSize | double | Font size for the Title text. |
| TitleTextColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Text color for the Title text. |
| SubTitleFont | [Font](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.font) | Font for the SubTitle text. |
| SubTitleFontSize | double | Font size for the SubTitle text. |
| SubTitleTextColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Text color for the SubTitle text. |

### Example

```
<Rock:LoginStatus />
```

### Update Photo

M v5.0

The popup window was replaced with the `[UpdatePersonProfilePhoto](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#updatepersonprofilephoto)` command. Although the command itself supports updating the photo for any individual, the LoginStatus control only changes the photo for the `CurrentPerson`.

M v2.0

Users will have the option to take a new photo or select an existing one from their photo library. These options appear in a popup window that you can style using the CSS classes listed below.

![](https://community.rockrms.com/GetImage.ashx?Id=67142)

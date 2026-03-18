> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Login Status Photo

# Login Status Photo

M v1.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

The [LoginStatus](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/login-status) view is the one you would normally use in the Flyout shell. But what if you want to just present a small icon that indicates to the user if they are logged in or not? The LoginStatusPhoto view does just that. In fact, [LoginStatus](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/login-status) uses this view itself to present the user's photo.

A number of properties allow you to specify how the profile photo will be displayed, and what photos to use if no profile picture is available or if the user is not logged in. Another set of properties allow you to specify the commands to be executed when the user interacts with the profile picture.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| NotLoggedInPhotoSource | string | The image displayed if no user is logged in. Defaults to resource://Rock.Mobile.Resources.icon-person-not-logged-in.svg. |
| NotLoggedInPhotoFillColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Color applied to the "not logged in" image. |
| LoggedInNoPhotoSource | string | Icon displayed if user is logged in but has no profile photo. Defaults to resource://Rock.Mobile.Resources.icon-person-no-photo.png. |
| LoggedInNoPhotoFillColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Color applied to the "logged in no photo" image. |
| ProfilePhotoStrokeColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Border color around the profile image. |
| ProfilePhotoStrokeWidth | double | Width of the border around the profile image. Defaults to 0. |
| ProfilePhotoCircle | boolean | If true, displays the profile photo with a circular mask. Defaults to false. |
| NotLoggedInCommand | ICommand | Command executed when the photo is tapped and user is not logged in. |
| NotLoggedInCommandParameter | object | Parameter passed to NotLoggedInCommand. |
| LoggedInCommand | ICommand | Command executed when the photo is tapped and user is logged in. |
| LoggedInCommandParameter | object | Parameter passed to LoggedInCommand. |

### Example

```
<Rock:LoginStatusPhoto />
```

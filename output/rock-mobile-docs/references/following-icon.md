> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Following Icon

# Following Icon

M v1.0

*Inherits from* [*Xamarin.Forms.Label*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label)

Wouldn't it be nice if your mobile users could follow a content channel item and then later view a list of all their followed items? This view displays one of two icons, depending on the current state. That initial state is determined by the `IsFollowed` property. When the user taps on the icon, the state is toggled and an API call is made to the server to update the followed state of the entity.

This of course assumes that the user is currently logged in. If they are not logged in, then no action will be taken. You can show a message to them using `NotLoggedInText` to encourage logging in.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| EntityId | int | The Id number of the entity to be followed. |
| EntityTypeId | int | The Id number of the entity's type. |
| PurposeKey  
M v2.0C v12.4 | string | The key to identify a custom purpose to the following. *Defaults to* *null**.* |
| IsFollowed | bool | The current followed state of the entity. *Defaults to* *false**.* |
| FontSize | double | The size of the font to use. |
| FollowingIconClass | string | The icon class to display when the entity is being followed. *Defaults to* *star**.* |
| FollowingIconFamily | [IconFamily](https://github.com/SparkDevNetwork/Rock.Mobile/wiki/Developer-Reference#IconFamily) | The icon family to use when the entity is not being followed. *Defaults to* *FontAwesomeSolid**.* |
| FollowingIconColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color to use for the icon when the entity is being followed. |
| FollowingText | string | The text to display to the right of the icon when the entity is being followed. |
| NotFollowingIconClass | string | The icon class to display when the entity is not being followed. *Defaults to* *star**.* |
| NotFollowingIconFamily | [IconFamily](https://github.com/SparkDevNetwork/Rock.Mobile/wiki/Developer-Reference#IconFamily) | The icon family to use when the entity is not being followed. *Defaults to* *FontAwesomeRegular**.* |
| NotFollowingIconColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color to use for the icon when the entity is not being followed. |
| NotFollowingText | string | The text to display to the right of the icon when the entity is not being followed. |
| NotLoggedInText | string | The message that is displayed to the user when they try to follow an item while not logged in. *Defaults to* *You must be logged in to follow this item.**.* |

### Security Considerations

This control uses two API endpoints on your Rock instance. One to start following an entity and one to stop following. By default, the security on these endpoints only allows Staff and Staff-Like or above roles access. If you want to allow others to be able to follow and unfollow things then you will need to adjust the security on these two endpoints.

You can make these changes under Rock > Admin Tools > Security > REST Controllers > Followings. The two endpoints you will need to grant access to are:

1.  DELETE - api/Followings/{entityTypeId}/{entityId}?purposeKey={purposeKey}
2.  POST - api/Followings/{entityTypeId}/{entityId}?purposeKey={purposeKey}

To allow all users to be able to follow and unfollow things you will need to add the `All Authenticated Users` role to the Edit permission for both of those endpoints.

![](https://community.rockrms.com/GetImage.ashx?Id=67042)

### Example

The example below demonstrates how to display a group's name and a following icon to let the user follow that group. We are using the default icons. The first screenshot shows the not followed state and the second screenshot shows the followed state.

```
<StackLayout Orientation="Horizontal">
    {% assign group = 41 | GroupById %}
    <Rock:FollowingIcon EntityTypeId="{{ group.TypeId }}"
        EntityId="{{ group.Id }}"
        FontSize="20"
        IsFollowed="{{ group | IsFollowed }}"
        FollowingIconColor="#ee7725"
        NotFollowingIconColor="#ee7725" />
    <Label Text="{{ group.Name | Escape }}" />
</StackLayout>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67040)

![](https://community.rockrms.com/GetImage.ashx?Id=67041)

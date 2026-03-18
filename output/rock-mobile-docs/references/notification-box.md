> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Notification Box

# Notification Box

M v1.0

*Inherits from [Xamarin.Forms.Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame)*

It happens. Something goes wrong and you need to display an error message to the user. Or perhaps something goes right and you want to be sure the user has feedback that everything is taken care of. Either way, you need a nice way to display a message on the page that has some nice colorful visual indicators.

The NotificationBox allows you to display a color-coded notification on the page. The notification will be colored to match the type of notification and contain the text you specify. You can also include an optional header text to stand out even more.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text to be displayed as the message of the notification. |
| HeaderText | string | An optional bit of text that can be used to give the user context about the message. |
| NotificationType | [NotificationType](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/notification-box#notification-type) | The type of notification to display. Defaults to Information. |

#### Notification Type

-   Information
-   Success
-   Validation
-   Warning
-   Error
-   Primary
-   Secondary
-   Dark
-   Light

### Example

```
<Rock:NotificationBox NotificationType="Information"
                      HeaderText="Information Needed"
                      Text="Please update your information below to keep our records current." />
```

![](https://community.rockrms.com/GetImage.ashx?Id=67158)

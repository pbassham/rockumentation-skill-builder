> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Icon Button

# Icon Button

Displays a Button with an Icon as the content.

Inherits from [Button](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/button?view=net-maui-9.0)

M v6.0

### Overview

Looking to use an icon instead of text on a button? This control is made just for that. While you can usually customize content using a `Border` with a `TapGestureRecognizer`, this control comes in handy when you need to attach a context menu—something you can’t do directly with a `Border`.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| IconClass | string | The icon to display. |
| IconFamily | [IconFamily](https://chatgpt.com/getting-started/controls/content-controls/icon.md#icon-family) | The icon family to use. Defaults to FontAwesome. |
| IsActive | bool | Used to apply special styling when active (e.g., setting this to true when a context menu opens). |
| IsActiveCssClass | string | The CSS class applied when IsActive is true. |
| InactiveCssClass | string | The CSS class applied when IsActive is false. |

```
<Rock:IconButton IconClass="user"
    IconFamily="FontAwesomeSolid"
    HeightRequest="28"
    WidthRequest="28"
    FontSize="14"
    CornerRadius="14"
    StyleClass="btn, btn-outline-primary" />
```

This example creates a circular `IconButton` with a user icon, styled as an outlined primary button.

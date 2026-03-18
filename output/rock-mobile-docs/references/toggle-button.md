> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Toggle Button

# Toggle Button

M v1.0

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

Think of a Toggle Button as a fancy check box. It provides the same basic functionality, an on/off toggle. But it presents it as a large button. An icon is used to indicate state, but the visual state of the button also updates to reflect the state. This makes it very obvious to the user when looking at a list of items which ones are turned on and which are turned off.

## CSS Classes

The construction of a toggle button is made up of multiple controls. A [Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame) contains the entire button. Inside of that is an [Icon](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/icon) and [Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label) which display the contents of the button.

| Class | Description |
| --- | --- |
| toggle-button | Always on the Frame. Can be used to style border and background color for the button. |
| icon | Always on the Icon that shows either the check-circle icon or the circle icon depending on state. |
| title | Always on the Label that contains the text of the button. |
| checked | This will be applied to the Frame when the button is in the checked state and it will be removed when the button is no longer in the checked state. |

## Properties

| Property | Type | Description |
| --- | --- | --- |
| IsChecked | bool | If true then the button is considered to be in the checked state. |
| Text | string | The text to be displayed inside the button next to the icon. |
| Command | ICommand | Can be used to trigger a command each time the state of the button changes. |
| CommandParameter | object | Contains the parameter to be passed to the Command. |

## Example

```
<Rock:ToggleButton Text="Include Completed"
    IsChecked="True" />
```

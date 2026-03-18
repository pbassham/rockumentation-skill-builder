> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Check Box

# Check Box

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The Check Box field allows the user to enter a Yes/No value. It has a number of different display options that will let you control the look and feel of your page.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label associated with this input field. |
| IsRequired | bool | If set to true then the user will be required to fill this in. Only applicable with drop down style. |
| EditStyle | [CheckBoxStyle](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/check-box#check-box-style) | The style to use when displaying the edit control. Defaults to CheckBox. |
| Color | Color | Specifies the highlight color to be used when displaying as a either a CheckBox or Switch. |
| IsChecked | bool? | Gets or sets the current state of the checkbox. Defaults to false. |
| YesText | string | The text to use when displaying the truthy value in the drop down style. Defaults to Yes. |
| NoText | string | The text to use when displaying the falsey valye in the drop down style. Defaults to No. |
| Command | ICommand | Used to set the command to be executed when the value changes. |
| CommandParameter | object | The parameter to pass to the Command when the value changes. |

### Check Box Style

| Value | Description |
| --- | --- |
| CheckBox | Displays the control as a simple checkbox that the user can tap on to toggle the state. |
| Switch | Displays the control as a toggle switch. When on, it is highlighted with a color. |
| DropDown | Displays the control as a drop down. When the user taps on the control they are presented with a popup that lets them pick the option they want. |

### Example

```
<Rock:FieldContainer>
    <Rock:CheckBox Label="Show All"
                   EditStyle="Switch"
                   Color="#ee7725" />
</Rock:FieldContainer>
```

> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > Boolean Value Converter

# Boolean Value Converter

M v1.0

This Value Converter allows you to bind something to a Boolean but then convert that Boolean value to any object you want for truth/false. It might be easier to explain with an example.

Say you have an [Icon](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/icon) control and you want to change the displayed icon class depending on the value of something else like a checkbox. You would bind your Icon.IconClass property to the CheckBox.IsChecked property like normal, but then you apply the Boolean Value Converter inside that binding so you can change the value set in the IconClass based on the IsChecked being either true or false.

### Properties 

| Property | Value | Description |
| --- | --- | --- |
| True | object | Any value you want to use when the expression evaluates to True. |
| False | object | Any value you want to use when the expression evaluates to False. |

### Example

```
<Rock:Icon IconClass="{Binding IsPlaying, Converter={Rock:BooleanValueConverter True=pause, False=play}}"
           IconFamily="MaterialDesignIcons" />
```

This example would change the `IconClass` property to either `play` or `pause` depending on the boolean value we are binding to.

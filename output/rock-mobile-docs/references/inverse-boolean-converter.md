> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > Inverse Boolean Converter

# Inverse Boolean Converter

M v2.0

This simple Value Converter allows you to invert the state of a boolean that you are binding to. A command use case is when you want to provide a checkbox for the user to do something but the underlying property to be set is inverted from how you want the text to read.

Important

The value you're binding to must be an actual boolean, not a string of True or False.

Suppose you want to have the user set a property value for "NotReady". While that is a perfectly good property name that states its purpose clearly, showing a checkbox to the user with the label "Not Ready" might be confusing. You want to show a label of "Ready" and then use this converter to convert the value of the checkbox before storing it in the "NotReady" property.

### Example

```
<Label Text="Something"
       IsVisible="{Binding HideLabel, Converter={Rock:InverseBooleanConverter}}" />
```

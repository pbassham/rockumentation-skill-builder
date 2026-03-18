> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Field Stack

# Field Stack

M v1.0

Inherits from [Xamarin.Forms.Layout](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout-1)

This view cannot be accessed directly from XAML. The FieldStack is used internally by the FormContainer to display multiple fields in a vertical layout.

When displaying a FormField this view is responsible for drawing the border around the group of fields as well as the lines between the fields.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| BorderColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color to be used for the border as well as the inter-field lines. Default value is #c1c1c1. |
| BorderWidth | double | The width, in pixels, to be used when drawing the borders. Default value is 1. |
| CornerRadius | double | The radius to use when drawing the four corners of the outside border. |

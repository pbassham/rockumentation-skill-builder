> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Phone Number Box

# Phone Number Box

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The phone number box is actually a compound view composed of an optional Picker and a text box. The text box is for the actual phone number to be entered. If the Rock server is configured with more than one country code then the picker will become visible for the user to select the country code to use with the phone number.

If the entered country code and phone number match one of the formatting expressions in Rock then the phone number will be formatted according to those rules.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label title to be used when wrapped in a control that displays a label for the field. |
| IsRequired | bool | If True then any validation performed will require that a phone number be entered. |
| CountryCode | string | Contains the selected country code, even if the picker is not visible. |
| PhoneNumber | string | Contains the formatted phone number, not including the country code. |

### Example

```
<Rock:FieldContainer>
    <Rock:PhoneNumberBox Label="Rock Phone Number Box"
                         IsRequired="false"
                         CountryCode="1"
                         PhoneNumber="(800) 555-1234" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67199)

The example above includes the country code so you can see what it looks like. Most Rock installations will probably have only one country code so that picker will not be visible.

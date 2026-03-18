> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Campus Context Picker

# Campus Context Picker

M v1.0

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The Campus Context Picker allows you to display a picker with all the campus choices allowed for a person. The selected campus is sent with every request, even if you leave the page. This then allows blocks to use that information to make default campus decisions, or show content specific to a campus.

If you are familiar with the web control of the same name, this offers pretty much the same functionality for mobile.

*Note: If no context value is set the current person's home campus will be used.*

### Properties

*This control exposes no properties that can be modified.*

### Example

```
<Rock:CampusContextPicker />
```

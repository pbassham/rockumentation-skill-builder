> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Interaction

# Interaction

Mv1.0

*Inherits from [ContentView](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.contentview?)*

Whenever someone views a page in the mobile app, a page view [interaction](https://community.rockrms.com/Rock/BookContent/9#interactions) is automatically logged on the server. These interactions are typically queued and sent in bulk every minute or so.

But sometimes, you might want to log a custom interaction based on what the user did on the page—for example, tracking when they view a specific blog article. And yes, we know content channels now offer built-in ways to handle that too.

Anyway, this control doesn’t take up any space and offers a simple way to log a custom interaction. Just provide the `Operation`, `Summary`, and `ChannelId`, along with either a `ComponentId` or `ComponentName`. Everything else is optional.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| ChannelId | int | The identifier of the channel where this interaction will be recorded. Must already exist. |
| ComponentId | int? | Specifies a specific component identifier where this interaction will be recorded. If used, the component must already exist. Defaults to null. |
| ComponentName | string | Specifies a component name for where this interaction will be recorded. If you use this property to pick the component then the system will look for a matching component and if not found create one. |
| Data | string | Custom data that should be stored with the interaction. There is no specific format requirements, as long as the data is a string. |
| EntityId | int? | Associates the interaction with the specified entity. The entity type will be taken from the channel configuration. Defaults to null. |
| Operation | string | The type of operation that identifies this interaction. There is no specific list of strings that you must use, but a few suggestions are View and Watch. |
| Summary | string | The text that describes this event in a user friendly manner. |

```xaml
<Rock:Interaction Operation="Watched video"
    Summary="Watch"
    ChannelId="28"
    ComponentName="{{ video.Name | Escape }}"
    Data="{{ video.Url | Escape }}" />
```

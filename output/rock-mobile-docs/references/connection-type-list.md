> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Connection > Connection Type List

# Connection Type List

Displays the list of connection types.

M v3.0C v13.3

This block is used to display a list of the connection types. If you are unfamiliar with Connections in Rock, please refer to the [connections manual](https://community.rockrms.com/Rock/BookContent/39#connections).

Note

  This block returns all connection types. Consider filtering by the IsActive property.  

## Block Configuration

### Header Template

This is the content that is rendered above the lists of your requests. This allows you to put a logo, header, or do whatever you like to style the top of this component.

### Type Template

This is the main template that is used to display the entire list of your connection types. You can fully customize this template using the entire list object to do whatever you like with it.

### Merge Fields

In the opportunity template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| ConnectionTypes | List<ConnectionType> | The entire list of the connection types. |
| ConnectionRequestCounts | Dictionary<int, Dictionary<string, object>> | A dictionary containing the total amount of requests for the type, and the amount of requests that are particular to you. |
| DetailPage | Guid | A Guid pertaining to the detail page that is navigated to when a connection type is clicked. |

### No Requests Content

You may have noticed in some other blocks, there is a block setting to provide content when there is nothing to display. Often seen as something like a:

```
<NotificationBox Text="There are currently no connection types. Please check again later." />
```

We have decided to make this an even easier piece of the puzzle to set, by including it in the template itself. If you wish to customize this content, the piece you are looking for is:

```
{% if ConnectionTypes == empty %}
    ... Put your content here!
{% endif %}
```

### Detail Page

This is the page that is linked when a specific request is selected. You can see it being used here in the default template.

```
{% if DetailPage != null %}            
    <Frame.GestureRecognizers>
        <TapGestureRecognizer Command="{Binding PushPage}" 
            CommandParameter="{{ DetailPage }}?ConnectionTypeGuid={{ type.Guid }}" />
    </Frame.GestureRecognizers>
{% endif %}
```

If you are lost, this is within the main for-loop of the [Type Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-type-list#type-template), and by doing this, each opportunity passes its' individual Guid as a query string parameter for the detail page.

Pssst! This setting would be utilized as intended if it was set to a page that contained the [Connection Opportunity List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-opportunity-list) block.

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

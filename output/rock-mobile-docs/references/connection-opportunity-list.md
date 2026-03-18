> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Connection > Connection Opportunity List

# Connection Opportunity List

Displays the list of connection opportunities for a single connection type.

M v3.0C v13.3

This block is used to display a list of connection opportunities for a single connection type. If you are unfamiliar with Connections in Rock, please refer to the [connections manual](https://community.rockrms.com/Rock/BookContent/39#connections).

## Getting Content

### Getting the connection types

In order for the block to know which 'Connection Type' to display opportunities for, you need to give it some context. Navigate to '***Admin Settings > Power Tools > SQL Command***' and execute the following query:

```
SELECT Name,Guid FROM [ConnectionType]
```

If there are any connection types available, this will display a list containing their name and guid. Select and copy the guid of the specific connection type you are trying to display opportunities for. In this walkthrough, I will be using the 'Involvement' connection type guid.

![](https://community.rockrms.com/GetImage.ashx?Id=66900)

### Using Query Parameters

To provide the guid we just obtained to the block, we do so by providing it with 'query parameters', which are context passed to the block when the page containing this block is pushed. This block looks for the following query parameters:

| Name | Type | Description |
| --- | --- | --- |
| connectionTypeGuid | Guid | The guid of the type of connection you want to display opportunities for. |

Conveniently, that is the same value we just obtained by [getting the connection types](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-opportunity-list#getting-the-connection-types). Create a new page that only contains a '[Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content)' block. Provide the following as the content, but change `pageGuid`to represent the guid of the page you just created and the `connectionTypeGuid` to represent the guid that we got earlier.

```
{% assign pageGuid = '' %}
{% assign connectionTypeGuid = 'dd565087-a4be-4943-b123-bf22777e8426' %}

<Button Command="{Binding PushPage}">
    <Button.CommandParameter>
        <Rock:PushPageParameters PageGuid="{{ pageGuid }}">
            <Rock:Parameter Name="connectionTypeGuid" Value="{{ connectionTypeGuid }}" />
        </Rock:PushPageParameters>
    </Button.CommandParameter>
</Button>
```

Deploy, press that button, and voila! The block should display the list of connection opportunities for the specific type. So now you can see how to show the opportunities for one specific connection type... but that would rarely be the actual intended use case.

If only there was some type of list to display all of the types for us... Oh, wait! There is. To fetch all of your connection types, create a new page with a '[Connection Type List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-type-list)' block, and set the '[Detail Page](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-type-list#detail-page)' to a page containing this block.

## Header Template

This is the content that is rendered above the lists of your requests. This allows you to put a logo, header, or do whatever you like to style the top of this block.

### Merge Fields

Merge fields are fields that are available to use within the template. So in the header template, you have access to these objects:

| Field | Type | Property |
| --- | --- | --- |
| ConnectionType | ConnectionType | The connection type of the opportunity list. |

## Opportunity Template

This is the main template that is used to display the entire list of your opportunities. You can fully customize this template using the entire list object to do whatever you like with it.

### Merge Fields

In the opportunity template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| ConnectionOpportunities | List<ConnectionOpportunity> | The entire list of the available opportunities. |
| ConnectionRequestCounts | Dictionary<int, Dictionary<string, object>> | A dictionary containing the total amount of requests for the type, and the amount of requests that are particular to you. |
| DetailPage | Guid | A Guid pertaining to the detail page that is navigated to when a connection opportunity is clicked. |

### No Requests Content

You may have noticed in some other blocks there is a block setting to provide content when there is nothing to display. Often seen as something like a:

```
<NotificationBox Text="You currently have no current requests. Please check again later." />
```

We have decided to make this an even easier piece of the puzzle to set, by including it in the template itself. If you wish to customize this content, the piece you are looking for is:

```
{% if ConnectionOpportunities == empty %}
    ... Put your content here!
{% endif %}
```

### Detail Page

This is the page that is linked when a specific request is selected. You can see it being used here in the default template.

```
{% if DetailPage != null %}            
    <Frame.GestureRecognizers>
        <TapGestureRecognizer Command="{Binding PushPage}" 
            CommandParameter="{{ DetailPage }}?ConnectionOpportunityGuid={{ opportunity.Guid }}" />
    </Frame.GestureRecognizers>
{% endif %}
```

If you are lost, this is within the main for-loop of the [Opportunity Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-opportunity-list#opportunity-template), and by doing this, each opportunity passes its individual Guid as a query string parameter for the detail page.

Psst! This setting would be utilized as intended if it was set to a page that had the [Connection Request List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list) block on it.

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

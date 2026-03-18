> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Connection > Connection Request List

# Connection Request List

Mv3.0Cv13.3

This block is used to display a list of Connection Requests for a single connection opportunity. If you are unfamiliar with Connections in Rock, please refer to the [connections manual](https://community.rockrms.com/Rock/BookContent/39#connections).

Note

Requests that are in a "Connected" state are not pulled down by this block. The purpose is to manage requests that have not been completed yet.

To summarize, this block looks for the `connectionOpportunityGuid` as a [query string parameter](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list#using-query-parameters) upon loading. You can provide this specifically (demonstrated below), or by following these steps below:

1.  Create another page that contains a [Connection Opportunity List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-opportunity-list) (COL) block.
2.  Set the 'Detail Page' setting within the COL block to a page that contains this block.
3.  Navigate to the page containing the COL block, and tap!

### Getting the connection opportunities

In order for the block to know which 'Connection Opportunity' to display requests for, you need to give it some context. Navigate to '*Admin Settings > Power Tools > SQL Command*' and execute the following query:

```
SELECT Name, Guid FROM [ConnectionOpportunity]
```

If there are any connection opportunities available, this will display a list containing their name and guid. Select and copy the guid of the specific connection opportunity you are trying to display requests for. In this walkthrough, I will be using the 'Greeter' connection opportunity guid.

![](https://community.rockrms.com/GetImage.ashx?Id=66901)

### Using query parameters

To provide the guid we just obtained to the block, we do so by providing it with 'query parameters', which are context passed to the block when the page containing this block is pushed. This block looks for the following query parameters:

| Name | Type | Description |
| --- | --- | --- |
| connectionOpportunityGuid | Guid | The guid of the connection opportunity you want to display requests for. |

Conveniently, that is the same value we just obtained by getting the connection opportunites. Create a new page that only contains a '[Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content)' block. Provide the following as the content, but change `pageGuid` to represent the guid of the page you just created and the `connectionOpportunityGuid` to represent the guid that we got earlier.

```
{% assign pageGuid = 'c327bdc5-dc76-4408-baa4-c4a2d022ed36' %}
{% assign connectionOpportunityGuid = 'dd565087-a4be-4943-b123-bf22777e8426' %}

<Button Command="{Binding PushPage}">
    <Button.CommandParameter>
        <Rock:PushPageParameters PageGuid="{{ pageGuid }}">
            <Rock:Parameter Name="connectionTypeGuid" Value="{{ connectionOpportunityGuid }}" />
        </Rock:PushPageParameters>
    </Button.CommandParameter>
</Button>
```

Deploy, press that button, and *voila*! The block should display the list of connection opportunities for the specific type. So now you can see how to show the opportunities for one specific connection type... but that would rarely be the actual intended use case.

If only there was some type of list to display all of the opportunities for us... Oh, wait! There is. To fetch all of your connection opportunities, create a new page with a '[Connection Opportunity List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-opportunity-list)' block, and set the 'Detail Page' to a page containing this block.

## Block Configuration

### Header Template

This is the content that is rendered above the lists of your requests. This allows you to put a logo, header, or do whatever you like to style the top of this block. Please note, that if a ConnectionOpportunity is not found, this content will not display.

#### Merge Fields

Merge fields are fields that are available to use within the template. So in the header template, you have access to these objects:

| Field | Type | Property |
| --- | --- | --- |
| ConnectionOpportunity | ConnectionOpportunity | The specific connection opportunity in reference. |

### Request Content

This is the main template that is used to display the entire list of connection requests. You can fully customize this template using the entire list object to do whatever you like with it.

### Merge Fields

In the request template, you have access to these objects:

| Field | Type | Description |
| --- | --- | --- |
| ConnectionOpportunity | ConnectionOpportunity | The specific connection opportunity in reference. |
| ConnectionRequests | List<ConnectionRequest> | The entire list of the available requests. |
| DetailPage | Guid | The Guid used to reference the detail page. |

### No Requests Content

You may have noticed in some other blocks, there is a block setting to provide content when there is nothing to display. Often seen as something like a:

```
<NotificationBox Text="You currently have no current requests. Please check again later." />
```

### Detail Page

We have decided to make this an even easier piece of the puzzle to set, by including it in the template itself. If you wish to customize this content, the piece you are looking for is:

```
{% if ConnectionRequests == empty %}
    ... Put your content here!
{% endif %}
```

This is the page that is linked when a specific request is selected. You can see it being used here in the default template.

```
{% if DetailPage != null %}            
    <Frame.GestureRecognizers>
        <TapGestureRecognizer Command="{Binding PushPage}" 
            CommandParameter="{{ DetailPage }}?ConnectionRequestGuid={{ request.Guid }}" />
    </Frame.GestureRecognizers>
{% endif %}
```

If you are lost, this is within the main for-loop of the [Request Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list), and by doing this, each opportunity passes its' individual Guid as a query string parameter for the detail page.

Psst! This setting would be utilized as intended if it was set to a page that had the [Connection Request Detail](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-detail) block on it.

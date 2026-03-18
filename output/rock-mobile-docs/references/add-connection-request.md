> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Connection > Add Connection Request

# Add Connection Request

Allows a Person to create a new Connection.

M v5.0C v16.1

## Block Configuration

If you are unfamiliar with Connections in Rock, please first refer to the [connections manual](https://community.rockrms.com/Rock/BookContent/39#connections).

The only thing required for this block to function is the `RequesterId`. This can be the string `IdKey` or `Guid` of the Requester.

### Connection Types

The connection types that will be made available to this block. If none are selected, all available connection types will be shown.

### Post Save Action

The navigation command to execute after a save successfully occurs.

### Post Cancel Action

The navigation command to execute when the "cancel" button is pressed.

## Page Parameters

| Kry | Type | Description |
| --- | --- | --- |
| RequesterId | string | The Id Key of the requester. Really the only "required" data point. |
| ConnectionTypeId | string | When provided, the connection type will be locked to this value and only display opportunities of its' own type. |
| ConnectionOpportunityId | string | When provided, the connection opportunity will be locked to this value. Must be accompanied with a *ConnectionTypeId*.   |
| ConnectorId | string | When provided, the connector list will pre-select to this value. The field will not be locked. |

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

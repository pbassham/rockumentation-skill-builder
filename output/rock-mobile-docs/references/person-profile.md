> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CRM > Person Profile

# Person Profile

### M v5.0C v15.2

Display and edit information about a Person.

## Getting Started

This block is pretty straightforward to get working. The only thing really required is a `Person` context, which can be configured through the page settings.

![](https://community.rockrms.com/GetImage.ashx?Id=67238)

Navigate to `Mobile Applications > Person Profile Page > Edit`.

![](https://community.rockrms.com/GetImage.ashx?Id=67239)

Under `Advanced Settings`, set the `Person Parameter Name` of the `Context Parameters`.

## Block Configuration

### Phone Types

The phone number types to display.

### Header Template

The template that displays at the very top of the block.

#### Commands

The header template has access to the following specialized commands.

| Command | Parameter Type | Description |
| --- | --- | --- |
| ShowEdit | n/a | If allowed (through security authorization checks), displays a cover sheet containing the Person Profile edit information. |

#### Merge Fields

The header template gets supplied the following merge fields.

| Field | Type | Description |
| --- | --- | --- |
| Person | Rock.Model.Person | The Person retrieved from context. |
| CanEdit | bool | A value depicting whether or not the CurrentPerson has authorization to edit the Person retrieved from context. |

### Custom Actions Template

The template that displays underneath the contact buttons supplied by the block.

#### Merge Fields

| Field | Type | Description |
| --- | --- | --- |
| Person | Rock.Model.Person | The Person retrieved from context. |

### Badge Bar Template

The template that displays underneath the [Custom Actions Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/crm/person-profile#custom-actions-template).

#### Merge Fields

| Field | Type | Description |
| --- | --- | --- |
| Person | Rock.Model.Person | The Person retrieved from context. |

### Show Demographics Panel

A boolean value depicting whether or not the demographics panel should be shown.

### Show Contact Information Panel

A boolean value depicting whether or not the contact information panel should be shown.

### Reminder Page

If selected (and there is a valid reminder type), a 'Reminder' button will be shown that shows this page in a cover sheet.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71446)

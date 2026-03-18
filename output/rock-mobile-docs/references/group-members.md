> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CRM > Group Members

# Group Members

### M v5.0C v15.2

Allows you to view the other members of a group person belongs to (e.g. Family groups).

Not to be confused with the [Group Member List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-list) block, this block displays the other members that belong to the same Group Type supplied through block configuration, for the `Person` retrieved from context. The main use-case for this block is to display a Person's family members.

## Getting Started

This block is pretty straightforward to get working. The only thing really required is a `Person` context, which can be configured through the page settings.

![](https://community.rockrms.com/GetImage.ashx?Id=67234)

Navigate to `Mobile Applications > Person Profile Page > Edit`.

![](https://community.rockrms.com/GetImage.ashx?Id=67235)

Under `Advanced Settings`, set the `Person Parameter Name` of the `Context Parameters`.

## Block Settings

### Members Template

This is the template that will be used to display the members.

#### Merge Fields

The members template gets supplied the following merge fields.

| Field | Type | Description |
| --- | --- | --- |
| Groups | A list of an object containing a Group and CanEdit field. | This is an anonymous object that contains the Rock.Model.Group & a CanEdit boolean value that depicts whether or not the CurrentPerson has authorization to edit the Person retrieved from context. |
| Person | Rock.Model.Person | The person retrieved from context. |
| EditPage | Guid | This merge field is supplied from the [Group Edit Page](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/crm/group-members#group-edit-page) block setting. |

### Group Type

The group type to display members for. Defaults to `Family`.

### Auto Create Group

If enabled, a new `Rock.Model.Group` will be created for the `Person` retrieved from context if it does not already exist.

### Group Edit Page

The page to push to when a group is selected. Exposed in the [Members Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/crm/group-members#members-template) through a merge field.

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

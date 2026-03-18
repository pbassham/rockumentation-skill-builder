> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Group Member View

# Group Member View

*Allows the user to view the details about a specific group member.*

![](https://community.rockrms.com/GetImage.ashx?Id=67266)

## Parameters

| Name | Type | Description |
| --- | --- | --- |
| GroupMemberGuid | Guid | The guid of the group member you would like to see details for. |

## Settings 

| Setting | Description |
| --- | --- |
| Group Member Edit Page | The page to navigate to for editing the selected group member. You'll generally use a [Group Member Edit](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-edit) block here. |

## Template 

The **Deploy** button is not required for content changes.

By default, this will output the following:

1.  Group name
2.  Total group member count
3.  Selected group member photo, name, age, and birth date
4.  Visible group member attributes
5.  Contact options including email, SMS, and calling
6.  Edit group member if a page is defined

### Merge Fields 

| Merge Field | Type | Description |
| --- | --- | --- |
| AllowedActions | Custom | Includes View, ManageMembers, Edit, and Administrate. |
| GroupMemberEditPage | Guid | The mobile page selected in the Group Member Edit Page setting. |
| Member | Group Member | The full Group Member object, which can also be used to access the associated Person data. |
| VisibleAttributes | Custom | Group Member attributes that the person signed in has View permissions to see. Returns an object with the Key, Name, Value, and FormattedValue for each. |

### Styling

There’s no styling X-Ray available.

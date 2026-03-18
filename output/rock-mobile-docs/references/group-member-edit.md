> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Group Member Edit

# Group Member Edit

Edits a member of a group.

## Getting Content

Content is passed in through a page parameter, referenced as `GroupMemberGuid`. There are quite a few examples of passing page parameters (also known as query parameters) lying around the documentation, and here is a great [example](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list#using-query-parameters).

### Page parameters

The parameters that this block looks for are as follows.

| Name | Type | Description |
| --- | --- | --- |
| GroupMemberGuid | Guid | The guid of the group you wish to display members of. |

## Block Configuration

### Show Header

If enabled, a header containing a "Group Member Edit" title will be displayed.

### Allow Role Change

If enabled, you will be able to modify a group member's role within this block.

### Allow Member Status Change

If enabled, you will be able to modify a group member's status.

### Allow Communication Preference Change M v5.0

If enabled, you will be able to modify the group member's communication preference.

### Allow Note Edit

If enabled, you will be able to modify the group member's notes.

### Attribute Category

This references the category of attributes that will be displayed and modifiable.

### Member Detail Page

The group member page to return to when the "cancel" button is pressed. So for instance, if you were using a [Group Member List](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-list) to navigate to this detail page, you would want to set this to the page containing that block.

### Enable Delete

This action will show/hide the delete button. If enabled, it will either delete or archive the member based on the group type configuration. More specifically, the Enable Group History setting must be checked and the Process Group History job must run in order for the Archive button to appear.

### Delete Navigation Action

The action to perform after the group member is deleted from the group.

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

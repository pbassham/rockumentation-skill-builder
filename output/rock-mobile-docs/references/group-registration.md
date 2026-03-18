> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Groups > Group Registration

# Group Registration

Allows a person to register for a group.

## Getting Content

Content is passed in through a page parameter, referenced as `GroupGuid`. There are quite a few examples of passing page parameters (also known as query parameters) lying around the documentation, and here is a great [example](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list#using-query-parameters).

### Page Parameters

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The guid of the group you wish to display registration for. |

## Block Configuration

### Group Member Status

The 'Group Member Status' to use when adding a new member.

### Group Type Guid

The group type identifiers which are valid to use as the [page parameter](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-registration#page-parameters). You can use this to limit registration to certain group types.

### Registration Workflow

An optional workflow to start for each individual being added to the group. The GroupMember will be set as the workflow entity. The current/primary person will be passed as the workflow initiator. If you are unfamiliar with workflows, please take a look at [Workflows in Rock](https://community.rockrms.com/documentation/bookcontent/12/244).

### Family Options

Provide additional inputs to register additional members of the family upon the current person's registration.

### Mobile Phone

Determines if the mobile phone field should be hidden, required, or optional.

### Email Address 

Determines if the e-mail address should be hidden, required, or optional.

### Group

The group to provide registration for. If this is left blank, it will be inferred that the guid of the group will be retrieved from the [page parameters](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-registration#page-parameters).

### Connection Status

The connection status to use for new individuals upon registration.

### Record Status

The record status to use for new individuals upon registration.

### Result Page

An optional page to navigate the individual to upon registration. `GroupGuid` will be passed as a query string parameter.

### Registration Completion Message

The lava template that is used to format the result message after a user has been successfully registered. Note that if you set a [result page](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-registration#result-page), this setting will be irrelevant.

### Prevent Overcapacity Registrations

When this is set to true, a user cannot register for groups that are at capacity. If there is only one spot available, none of the family members can be registered.

### Autofill Form

If set to false then the form will not load the context of the logged-in user.

### Register Button Text

The text to display in the save button.

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

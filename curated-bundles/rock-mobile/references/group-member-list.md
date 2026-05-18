---
description: Use when users need to display or view a list of members belonging to a specific group in a Rock mobile application
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Allows the user to view a list of members in a group.

M v5.0 C v15.1 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

## Getting Content

Context is passed in through a page parameter, referenced as `GroupGuid`. There are quite a few examples of passing page parameters (also known as query parameters) lying around the documentation, and here is a great [example](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/connection-request-list#using-query-parameters).

The parameters that this block looks for are as follows.

| Name | Type | Description |
| --- | --- | --- |
| GroupGuid | Guid | The GUID of the group you wish to display members of. |

## Block Configuration

### Group Member Detail Page

The page will display the group member details when selecting a member.

Including a [Group Member View](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-view) block on this page would not be a bad idea.

### Title Template

The value to use when rendering the title text. Lava is enabled.

## Template

The Deploy button is required for content changes.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| DetailPage | Guid | The page selected in the Detail Page setting. |
| Title | String | The text entered in the Title Template setting. |
| Members | Custom | Only included when the Group By Person setting is disabled. Fields include PhotoUrl, Id, Guid, PersonId, PersonGuid, FullName, FirstName, LastName, NickName, GroupRole, PhotoId. |
| People | Custom | Only included when the Group By Person setting is enabled. |

### Commands

| Command | Parameter | Description |
| --- | --- | --- |
| CreateEntitySetAndNavigate   M v5.0 | [CommandReference](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/command-reference) | Create an entity set and performs a navigation command that passes an EntitySetGuid as a query string parameter. |

### Creating an Entity Set

Important

This command requires Edit permissions on the following API endpoint:POST api/EntitySets/CreateFromItems/{entityTypeGuid}

You can create an entity set using the group member list by adding the following functionality into your template:

```
<Button Command="{Binding CreateEntitySetAndNavigate}"
        Text="Create EntitySet and navigate"
        StyleClass="btn,btn-primary">
        <Button.CommandParameter>
            <Rock:CreateEntitySetAndNavigateParameters TimeToExpire="30">
                <Rock:CreateEntitySetAndNavigateParameters.NavigateCommand>
                    <Rock:CommandReference Command="{Binding PushPage}"
                        CommandParameter="f0ef45ac-4eb8-4ad1-b817-408d7d7fe0fc" />
                </Rock:CreateEntitySetAndNavigateParameters.NavigateCommand>
            </Rock:CreateEntitySetAndNavigateParameters>
        </Button.CommandParameter>
</Button>
```

When the button is pressed, it will generate an entity set, and append the `EntitySetGuid` to the `PushPage` command parameter. The command won't execute if the CommandReference isn't a navigation command (i.e. PushPage, ReplacePage, OpenBrowser, etc.)

### Group By Person

When enabled, the [Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-list#template) merge field completely changes to `People` instead of `Members`. This will cause the block to display each distinct `Person` instead of the Group Member occurrence. The object also has an attached `Roles` merge field that you can use to see all of the different roles the distinct Person has.

### Filters

#### Show Include Inactive Members Filter 

When enabled, shows a filter option to limit the member list to include inactive members.

Note

By default, inactive members will never be included. The only way to show them is by enabling this setting and turning on this filter in the app.

#### Show Group Role Type Filter 

When enabled, shows a filter option to limit the member list to a specific group role type (IsLeader).

#### Show Group Role Filter

When enabled, shows a filter option to limit the member list to a specific group role.

#### Show Subgroup Filter 

When enabled, shows a filter option to limit the member list to individuals that also belong in any of the selected child groups.

#### Show Attendance Filter 

When enabled, will show up each of these options for both the [Attendance Filter Short Week Range](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-list#attendance-filter-short-week-range-nbsp-) option and [Attendance Filter Long Week Range](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/groups/group-member-list#attendance-filter-long-week-range-nbsp-) option (x in the examples).

| Option | Description |
| --- | --- |
| Attended | Filters to individuals who have attended within the last x number of weeks. |
| First Attended | Filters to individuals who had their first attendance within the last x number of weeks. |
| No Attendance | Filters to individuals who have had no attendance entries for within the last x number of weeks. |

#### Attendance Filter Short Week Range 

This value will be used to provide options in the Attendance Filter, meant to be used as a shorter duration of time. For instance, a value of three would equal three weeks in the attendance filtering process. If a value isn't provided, the options won't show.

#### Attendance Filter Long Week Range 

This value will be used to provide options in the Attendance Filter, meant to be used as a longer duration of time. For instance, a value of six would equal six weeks in the attendance filtering process. If a value isn't provided, the options won't show.

## Additional Fields

Since the Group Member List block does not provide the full object for the members, Rock Mobile gives you the opportunity to pull in any merge field that is associated with a group member. To do this, you can use either an existing property, attribute, or even add a merge field via a lava expression.

### Lava Expression Syntax

`{{ item }}` will always be the root as that is the Group Member Object. The example below provides the block with the `IsLeader` merge field.

```
{{ item.GroupRole.IsLeader }}
```

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71491)

---

## Group Member View {#group-member-view}

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

1. Group name
2. Total group member count
3. Selected group member photo, name, age, and birth date
4. Visible group member attributes
5. Contact options including email, SMS, and calling
6. Edit group member if a page is defined

### Merge Fields 

| Merge Field | Type | Description |
| --- | --- | --- |
| AllowedActions | Custom | Includes View, ManageMembers, Edit, and Administrate. |
| GroupMemberEditPage | Guid | The mobile page selected in the Group Member Edit Page setting. |
| Member | Group Member | The full Group Member object, which can also be used to access the associated Person data. |
| VisibleAttributes | Custom | Group Member attributes that the person signed in has View permissions to see. Returns an object with the Key, Name, Value, and FormattedValue for each. |

### Styling

There’s no styling X-Ray available.

> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Core > Smart Search

# Smart Search

Allows you to offer search with multiple search components that an individual can switch between.

### M v6.0C v16.5

Note

This block does not provide a XAML template option and can only be styled with CSS. If you need a highly customizable search option, you should consider using the Search V1 block.  

## Supported Search Components

These are the only supported search components by the block. Using an unsupported search component will result in an error message to be displayed in place of search results.

| Component | Entity Type | Description |
| --- | --- | --- |
| Birthdate | Person | Search for a person by birthdate. |
| Name | Person | Search for a person by name. |
| Email | Person | Search for a person by email. |
| Address | Person | Search for a person by address. |
| Name | Group | Search for a group by name. |

## Block Configuration

The following options are available for configuration.

### General Settings

The general settings for this block are as follows.

#### Search Component(s)

Select any number of the supported search components you would like to display as a search option.

#### Header Content

The content to be displayed above the search field. `SearchComponent` is available as a merge field. Lava is processed on the client.

#### Footer Content

The content to be displayed above the search field. `SearchComponent` is available as a merge field. Lava is processed on the client.

### Result Size

The number of results to initially return and with each sequential load (as you scroll down).

### Auto Focus Keyboard

Determines whether or not the keyboard should automatically open when the block comes into view.

### Show Search History

Whether or not to display search history. This will be limited to "per-component".

## Person Search Settings

These settings are specific to search components that return people.

### Show Birthdate

Whether or not to display the Person's birthdate in the search result item.

### Show Age

Whether or not to display the Person's age in the search result item.

#### Person Detail Page

The page to link to when a Person search result item is pressed.

#### Group Search Settings

These settings are specific to search components that return groups.

### Group Detail Page

Group search only. The page to link to when a Group search result item is pressed.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71462)

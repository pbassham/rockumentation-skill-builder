> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Core > Notes

# Notes

Displays entity notes to the user and supports adding new notes or editing of existing notes.

M v2.0 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

## Overview

In order to get content for our notes block, we need to do a couple of things. In this section, we will walk through the steps necessary to display notes of a specific entity by:

1.  Adding a note to a Person entity.
2.  Configuring the block settings.
3.  Configuring the context parameter.
4.  Passing in a GUID as a page parameter.

### Adding a Note to an Entity

In order to get started, we need to make sure that we actually have a note to display. On your Rock server, navigate to a person's profile page (using the search in the top right is a fast and easy way) and press the add button to add a note. I would recommend adding a note to yourself, as you know that you will have permission to view it.

![](https://community.rockrms.com/GetImage.ashx?Id=66921)

From here should be pretty self-explanatory. Go ahead and add a note with whatever text you wish, and press *Save Note*.

### Configuration

Note

The setting User Selectable must be enabled within the Note Type to save new notes.

#### Block Settings

Next, we need to configure our block to actually look for those personal notes. In the block settings, set the `Entity Type` to Person and in the `Note Types`, select *Person: Personal Note*.

![](https://community.rockrms.com/GetImage.ashx?Id=66920)

So now, the block knows the entity type that we are fetching notes for, and also the specific note type we are fetching.

### Enable Group Notification M v5.0C v15.1

If enabled, the block will utilize the `GroupContext` of the page (use the [SetContext](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#setcontext) command) as the group to notify when a note is added. Used in tandem with the [Group Notification Communication Template](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/core/notes#group-notification-communication-template-nbsp-m-nbsp-v5-0c-nbsp-v15-1).

### Group Notification Communication Template M v5.0C v15.1

The communication template to use when a note is added and [Enable Group Notification](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/core/notes#enable-group-notification-nbsp-m-nbsp-v5-0c-nbsp-v15-1) is true. `Note` will be passed in as a merge field to the communication template that you select.

### Show Is Alert Toggle M v5.0C v15.1

If enabled, a toggle will display that allows an individual to mark a `Note` as alert.

### Show Is Private Toggle M v5.0C v15.1

If enabled, a toggle will display that allows an individual to mark a `Note` as private.

### Context Parameter

Next, we need to configure the page settings to look for a `PersonGuid` as a context parameter. We do this by heading to the page settings, which can be navigated to by pressing the *Edit* button above the mobile page builder.

![](https://community.rockrms.com/GetImage.ashx?Id=66919)

Once in the page detail, underneath *Advanced Settings,* you should see a Context Parameters section. If you do not see this setting, please try refreshing the page and potentially clearing your cache. Set this to PersonGuid so the page knows that we are attempting to pass in a person guid as the context parameter.

![](https://community.rockrms.com/GetImage.ashx?Id=66918)

## Passing Context

We're so close! For some of you, this should be easy peasy by now. But for those still getting started, let's go over quickly how to pass in the GUID as a query string parameter. Start by creating a new page with nothing but a [Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content) block on it. For the content, we will supply a simple button that does two things.

1.  Navigate to our page containing the Notes block.
2.  Passes in the PersonGuid as a query string parameter.

For number one, we will need to obtain the `PageGuid` of the page containing our Notes block. Luckily, there is a handy feature that lets you do this easily. Press the little blue icon in the top right of your mobile page editor, as seen here:

![](https://community.rockrms.com/GetImage.ashx?Id=66917)

Once obtained, go back to our blank page with nothing but the content block, and set the content to the following XAML:

```
{% assign pageGuid = 'your page guid' %}

<Button Text="Notes!" Command="{Binding PushPage}">
    <Button.CommandParameter>
        <Rock:PushPageParameters PageGuid="{{ pageGuid }}">
            <Rock:Parameter Name="PersonGuid" Value="{{ CurrentPerson.Guid }}" />
        </Rock:PushPageParameters>
    </Button.CommandParameter>
</Button>
```

Simply replace the `pageGuid` to the one you just copied, and you are good to go.

Launch the application, and tap the button we just created. You should see a similar outcome:

Keep in mind that you must be signed in to add a new note, otherwise the plus is hidden.

![](https://community.rockrms.com/GetImage.ashx?Id=66914)

## Using a Template M v4.0C v14.1

The notes block is typically meant to be used as a full-screen block, with a layout that does not contain a ScrollView. This is due to the usage of a [CollectionView](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/collectionview/), which is a highly performant Xamarin Forms control that allows us to implement things like loading more notes as you continue scrolling down.

In many cases, you may want to incorporate Notes into another layout. That's why we introduced an option for you to customize the Notes block using your own XAML template.

To use a custom template, you must enable the `Use Template` block setting. When this setting is enabled, the `Page Load Size` becomes the amount of notes (ordered by recency) supplied to the template. It is recommended to keep this as a relatively low number. You can set a `Note List Page` block setting that is meant to direct to a page containing the Notes block in a full-screen manner (not using a template). The following commands and merge fields become available to you in the `Notes Template`:

| Notes | List<Note> | The list of notes retrieved. |
| --- | --- | --- |
| ListPage | Guid | The Guid of the Notes List Page to direct to from the "See All' button (in the standard template). |
| AddNote | Command | Displays a cover sheet with the functionality of adding a note. |
| EditNote | Command | Displays a cover sheet with the functionality of editing an existing note. Requires a NoteGuid command parameter. |

## Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71449)

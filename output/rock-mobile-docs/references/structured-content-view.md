> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Structured Content View

# Structured Content View

*Displays a structured content channel item for the user to view and fill out.*

This block displays structured content from Rock in the app. You can use this to display interactive sermon notes with tap-to-reveal areas and note-taking areas.

## Block Settings

| Name | Description |
| --- | --- |
| Document Not Found Content C v15.1 | The XAML content to render when there is no document found. Leave blank to render nothing. |

## Content Channel

You'll see a channel called "Message Notes" that comes out of the box with Rock, so you typically won't need to set this up manually unless you have another purpose in mind. When editing a content channel, you can check the **Is Structured Content** option to enable this functionality. This will change the **Default Content Control** option to **Editor Tool Configuration**.

![](https://community.rockrms.com/GetImage.ashx?Id=66876)

Adding new child items to this content channel will allow you to edit the structured content with a rich editor. Check out the [Supported Formatting](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/structured-content-view#supported-formatting) section to see what's available. In order to link this note item to a Message, simply add it as a child to the content channel item for the Message.

![](https://community.rockrms.com/GetImage.ashx?Id=66877)

### Mobile App

In the app, you'll need a page with the Structured Content View block added. Thankfully there aren't any block settings to worry about, so you'll just need to add a link to this page that passes context using the `ItemGuid` query string with a value of the content channel item GUID. In the case of Message Notes, you can use Lava to look at the ChildItems of a message to get the Notes/Structured Content item.

```
<!-- Set the content channel type Guid of Message Notes -->
{% assign typeGuid = '48951e97-0e45-4494-b87c-4eb9fca067eb' %}

{% assign noteItem = '' %}
{% for childItem in Item.ChildItems %}
    
    <!-- Skip any child items that are not of type Message Notes -->
    {% if childItem.ChildContentChannelItem.ContentChannelType.Guid == typeGuid %}
        
        <!-- Assign the note and skip the remaining child items -->
        {% assign noteItem = childItem.ChildContentChannelItem %}
        {% break %}
    {% endif %}
{% endfor %}

{% if noteItem != '' %}
    {% assign noteGuid = noteItem.Guid %}
    <Button Text="Message Notes"
        Command="{Binding PushPage}"
        CommandParameter="{{ yourMessageNotesPageGuid }}?ItemGuid={{ noteGuid }}" />
{% endif %}
```

### Supported Formatting

Not all formatting options are supported natively in the app, but here's what can be used safely:

1.  Text
2.  Heading
3.  List (ordered and unordered)
4.  Image
    1.  ~Image captions~
5.  ~Checklist~
6.  Quote
    1.  Left-aligned
    2.  ~Center-aligned~ (stays aligned left)
7.  Warning
8.  Code
9.  Note (can be left blank or default content entered)
10.  ~Delimiter~
11.  ~Link~
12.  ~Table~

When highlighting text, the following formatting is supported:

1.  Bold (depending on font support)
2.  Italic (depending on font support)
3.  ~Link~
4.  ~Marker~
5.  Fill-in
6.  ~Code~

### Notes

When using note blocks in structured content, they will only display if a user is logged in. We recommend putting a content block above this one that only displays if a user is not logged in, and prompts them to log in or at least lets them know that the notes are missing until they do so.

### Styling

There’s no styling X-Ray available.

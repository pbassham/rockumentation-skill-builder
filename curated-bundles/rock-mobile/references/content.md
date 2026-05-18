---
description: Use when building Rock Mobile app layouts that display dynamic or static content using Lava and XAML markup
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Arguably the most fundamental block in any Rock Mobile application, this block could be described as a necessity, used to render Lava and XAML within your shell, as provided in the "Content" block setting. If you are unfamiliar with XAML, please refer to the [official Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/maui/xaml/). If you are unfamiliar with Lava, please check out the [Rock Lava Reference](https://community.rockrms.com/lava).

## Block Settings

### Dynamic Content

This setting is incredibly handy. When enabled, it ensures that fresh content is pulled from the server each time the page loads—essentially "refreshing" the content on every initialization.

Tip

It's usually best to keep this set to Yes, unless you have a specific reason to disable it.

If your content is static and doesn’t change often, you can safely leave this set to No. In that case, any updates will require a **Deploy** to reflect in the app. Behind the scenes, this content gets bundled into the shell that's downloaded when the app launches. While Lava will still be processed, the `CurrentPerson` context won't be available.

### Using Lava

After the content, the second block setting to discuss is the "Enabled Lava Commands". If you have a Lava command within your Content, it is important to make sure to check the applicable settings here. It is also just as vital to make sure that you check the "Process Lava on Server" setting within the '*Block Properties \> Mobile Settings*', as seen here:

![](https://community.rockrms.com/GetImage.ashx?Id=66820)

### Entity Context

With just a few settings, you can wire up [entity](https://community.rockrms.com/documentation/bookcontent/9/243#entities) context to the Content block making it even more powerful! Maybe you want to create a profile page for people based on [Search](https://mobiledocs.rockrms.com/essentials/block-reference/core/search) results. Instead of running Lava in the content to pull the needed data, let the block set the person context for you.

Using the **Context Entity Type** setting in the block, you can select any of the available entities.

![](https://community.rockrms.com/GetImage.ashx?Id=66821)

Next, you'll need to set the context parameter for the page. This is how the block will know where to find the context identifier. This setting is found by editing the Page (not the block) and expanding the **Advanced Settings** section. Based on the entity type you chose, you should see a setting labeled **{{ Entity }} Parameter Name**. Add a parameter key that makes sense for your data.

Tip

It's generally recommended to pass context via Guid in Rock Mobile.

![](https://community.rockrms.com/GetImage.ashx?Id=66822)

Now that you've set the block entity type and page context parameter, be sure to Save and **Deploy**. The final step is to simply link to your page and pass the appropriate context via the key you set. Going back to the example of the person profile page, you might end up with something like this:

```
<VerticalStackLayout>
    ...
    <Button Text="Profile"
        StyleClass="btn, btn-primary"
        Command="{Binding PushPage}"
        CommandParameter="3446dcac-0078-4ba4-a19a-65ce8b7fb776?Guid={{ Person.Guid }}" />
</VerticalStackLayout>
```

Within your Content block, you can check that the context isn't `null` and begin accessing the entity. If context wasn't set correctly, consider a graceful fallback to another page via [Redirect](https://mobiledocs.rockrms.com/essentials/controls/content-controls/redirect).

```
<VerticalStackLayout>

    //- If context isn't set, fall back to page and display error message
    {% if Context == null %}
        <Rock:Redirect PageGuid="82370b8d-0fea-4454-8ad7-7e7c950e3345"
            QueryString="Message={{ 'Unable to find person' | UrlEncode }}" />
    {% endif %}
    
    //- Context has been set
    <Label Text="{{ Context.Person.NickName | Escape }}" />
    
</VerticalStackLayout>
```

Note

 Accessing the entity follows this syntax: {{ Context.EntityType.Property }}

### Styling

Since this is a XAML template there is no styling X-Ray

---

## Content Channel Item View {#content-channel-item-view}

Displays a content channel item by formatting it with XAML.

This block is useful for quickly displaying content channel items like messages or promotions. Instead of writing an entity command to get the data, this block will pull the full content channel item for you.

It functions similarly to the [Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content) block in that the XAML template is up to you to define. Its advantage lies in the built-in data pull and optional interaction write so you don't have to wire them up yourself.

## Parameters

Context can be provided to the block via item Id or Guid; you don't need to pass both.

Important

When passing multiple parameters to the page, ensure this one is first, or the block context will not be set.

| Name | Type | Description |
| --- | --- | --- |
| ContentChannelItemId | Int | The Id of the content channel item. |
| ContentChannelItemGuid | Guid | The Guid of the content channel item. |

## Settings

| Name | Description |
| --- | --- |
| Content Channel | Limits the retrieved item to a specific content channel. |
| Log Interactions | If enabled, an interaction associated with the content channel item will be added to the queue. |

## Template

The Lava commands that are enabled for this block will only Lava rendered on the server.

### Merge Fields

| Property | Type | Description |
| --- | --- | --- |
| Item | ContentChannelItem | The full Content Channel Item that was retrieved. |

### Styling

Since this is a XAML template, there’s no styling X-Ray available.

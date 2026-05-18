---
description: Use when designing website page layouts with reusable content templates that allow editors to add formatted content without HTML knowledge
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Content Component

Content Component

In Rock there are lots of ways to put content onto a page. For example, in this manual we have sections covering HTML content blocks and Content Channel blocks. Another option is content components.

Content components can be thought of as a marriage between HTML blocks and Content Channel blocks. They're a blend of content and style. Website designers can create great looking templates and define which elements of information an editor needs to provide, while editors get a simple and clean tool for inputting their content without having to worry about breaking the website.

Each content component has a custom Lava template, so you can do amazing things with their values. Maybe you want to resize an image or add a clickable link to each heading. With Lava the sky is the limit.

Content components exist because your site editors shouldn’t have to learn HTML to update your site. Without content components, an editor needs to memorize specific steps in the text editor to get a certain result or, worse yet, copy precise HTML markup. That approach is dangerous and prone to error. With content components you can template small blocks of content so that even complex markup requirements are easily implemented.

# Content Channels and Content Components

To help understand a little about what's going on behind the scenes, it's important to note that there's a hidden content channel for each component.

# Content Component Templates

With content components you’ll use a set of templates to manage content. Each template provides a set of fields and a matching Lava template, which gives designers control over the output. Rock comes with a few example templates out of the box.

In the example below, the content component is set up with the *Side By Side* template. There are actually two items here, one with text on the left and another with text on the right. You’ll see below how this kind of arrangement can be set up and changed.

![Side By Side Template](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/side-by-side-content-new-v9.png)

Side By Side Template

To achieve this consistent look the editors didn't need to learn HTML, they just entered text into a few fields! Let’s take a peek at how this is set up behind the scenes.

# Configuring Content Components

First, you'll need to set up the page and block settings. Check out the [Page Zone](#pagezone) and [Page Properties](#pageproperties) sections for more details on doing that. When adjusting the *Page Zone* settings, be sure “Content Component” is selected as the page block *Type*.

Then, click the icon for the block to open the content component configuration page.

![Configuration Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/configure-page-content-component-v10.png)

Configuration Page

After the content component block has been set up, the configuration bar will have the icon available to add content.

![Content Edit Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/content-edit-page.png)

Content Edit Page

# Save Item

As noted above, the Save button moves around and changes its name depending on your block settings. Whatever it looks like, don’t forget to find it and save!

## Add/Modify Content Component

Now let’s say we want to change our content component from the Side By Side view to the Card view. Those who have full admin rights can do that on the fly by going back to the content component configuration page and changing the *Content Component Template*.

![Changing The Template](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/card-changed-content-v13.png)

Changing The Template

After the template has been changed the content will automatically be updated and will immediately look similar to this:

![Card Template View](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/card-changed-content-page-new-v9.png)

Card Template View

Simply changing the layout has resulted in a page with identical content but a very different look. Changing this setting, along with the other available block settings, ensures your website can look just how you want it without requiring editors to wade through complex coding.

# Creating Content Component Templates

Three content component templates are available to you right out of the box, but you can create as many as you need.

To create a content component template, navigate to Admin Tools \> CMS Configuration \> Content Component Templates and click the button on the grid.

Content component templates function just like content channel item lists, so all the power of Lava is available to you. To see all of the available attributes and properties just add `{{ 'Lava' | Debug }}` to the *Display Lava* field.

To make things easier we recommend copying an existing content component template (i.e., everything in the *Display Lava* field) to use as a starting point for building your own template. Your Lava will have access to both the content channel items related to the component as well as the configuration settings (like the heading size).

![Content Component Template - Display Lava](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/defined-value-content-component-templates-v10.png)

Content Component Template - Display Lava

# Content Component Item Attributes

Content Components allow you to add attributes flexibly. You can make attributes available to an individual content component, to content components that use a specific template or to all content components.

## Adding Attributes to Content Component Templates

Typically, you'll be adding content component item attributes to a content component template. This allows you to use the attributes in a content component Lava template, guaranteeing that it will be available every time a block is added to the page.

To get started we'll add an attribute category to the setup. Navigate to Admin Tools \> General Settings \> Attribute Categories and add a new category.

In the *Name* field, provide a name that is identical to the content component template name to which the attribute will apply. For example, enter "Hero" for attributes you'd like to add to the Hero content component template. In this case, the attributes would not be available to the "Card" or "Side By Side" templates. You only need to add one category for each content component template you have.

Next, select "Content Channel Item" as the *Entity Type*.

![Content Component Attribute Categories](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-component-attribute-categories-v18.png)

Content Component Attribute Categories

Now, add attributes to your newly-created category by going to Admin Tools \> CMS Configuration \> Content Channel Types and editing the *Content Component* entry to access its *Item Attributes*.

![Content Component Item Attributes](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-component-item-attributes-v18.png)

Content Component Item Attributes

As pictured above, an item attribute for *Image* is already present. Click the icon to add a new Item Attribute.

When adding the new Item Attribute, use the *Categories* field to select the Content Component Template on which you'd like the attribute to appear. The rest of the setup is the same as any other attribute.

## Same Attribute, Different Templates

Making a single attribute available across multiple templates is very similar to the process described above.

First, you'll repeat some of the above steps to create attribute categories for each content component template. Using what ships with Rock, that means adding "Side By Side" and "Card" categories in the same way that we added the "Hero" category. Then, when adding the attribute, you can select multiple categories (instead of just one) and the attribute will appear for each template according to your selection.

This method is the preferred way of adding attributes because it avoids duplication and prevents unnecessary attributes.

## Adding an Attribute for All Content Components

Making an attribute available for all content components is easiest of all. Just like the scenarios described above, you'll start by navigating to Admin Tools \> CMS Configuration \> Content Channel Types. Edit the *Content Component* entry to access its *Item Attributes*.

Then, add a new attribute by clicking the icon as described above. The only difference here is that you'll leave the *Categories* field blank. Because a *Category* isn't specified, the attribute will be available for use with any template.


---

## Managing Dynamic Content {#managing-dynamic-content}

> **Path:** Designing and Building Websites Using Rock > Managing Dynamic Content

Managing Dynamic Content

Rock's advanced dynamic content tools allow you to extend the application without having to write any code. That’s kind of a big deal, right? You can customize Rock for your organization without any programming knowledge!

You may have already read a bit about content channels in the [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/) and [Event & Calendar Guide](https://community.rockrms.com/documentation/bookcontent/29/). We're going to talk about how to manage content that is added to content channels, then dive into how to set those content channels up. But first - a quick overview of the components that make up Rock's dynamic content features.

# Components of Dynamic Content

Rock's dynamic content tools are made up of three components.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/components-dynamic-content.png)

Dynamic Content Diagram

Now, let's jump right into adding and managing content items.

# Managing Content Items

While it's possible to add new content items on the channel configuration page (Admin Tools \> CMS Configuration \> Content Channels), most of your staff won't have access to these screens. For staff, it's easier for them to add their content under Tools \> Content. On this screen they will see a list of each content channel they have *View* access to. Clicking one of the items will display the content items for that channel.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-channels-v18.png)

Content Channels

# Adding Content Items

To add a new content item, click the button in the grid footer. This will bring up the add/edit screen pictured below.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-content-v18.png)

Adding Content Item

OK, now that we have an idea of how dynamic content works, let's take a closer look at content channels and content channel items.


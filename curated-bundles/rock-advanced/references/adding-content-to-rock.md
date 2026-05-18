---
description: Use when adding new pages or blocks to a Rock website from the external site interface
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Adding Content to Rock

Adding Content to Rock

As you work on your site, you’ll want to add new pages. There are two ways to do this: through your external organization site, or through your internal Rock site. Both methods end in the same result (new pages with blocks and content), you just take different paths to get there. Each approach has its pros and cons. Creating pages from your external site allows you to view the pages as you’re creating them. Creating pages from your internal site allows you to create and configure pages faster as well as to easily see how the new pages fit into the overall site structure.

Let’s start by looking at how to add a page from your external site.

# Adding a Page (External Site)

To add a page from your external organization site, follow these steps:

1. Navigate to the parent page that you want the new page to be under.
2. Click the (Child Page) button from the *Admin Toolbar*.
3. From the *Child Page* dialog, click the button to add a new page to the list.
4. The *Add* screen will allow you to provide a name for your page and choose a layout. To configure the page fully you'll need to click on it from the child page list and then click its (Page Properties) button on its *Admin Toolbar*.
![Child Pages](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/child-pages-external-v13.png)

Child Pages Dialog

![Add Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/add-child-page.png)

Add Page Dialog

# Adding a Block to a Page (External Site)

A small part of your content management duties will be to add and configure blocks on a page. To add a block to an existing page, follow these simple steps.

1. Navigate to the page you’d like to add the block to.
2. Select the (Page Zone Editor) button in the page’s *Admin Toolbar*.
3. This will highlight all of the zones on the page for you.
4. Select the fly-out toolbar for the zone you wish to add the block to and click its (Zone Blocks) button. This will bring up the zone's block list.
5. From here you have a decision to make. Do you want the block to live on just this page, on every page that uses this layout, or across your entire site? Decide by picking the appropriate tab at the top of the dialog: Page, Layout or Site. Keep in mind, choosing any option other than Page carries some risk. The Layout and Site options are best used for blocks you're certain belong on multiple pages, such as headers and footers.
6. Next, click the (Add Block) button to add the block to the layout. Like adding a page you'll just provide a name for your block and the type of block you wish to add. You'll add more configuration later.
7. Next, determine in what order you want your block to appear within the zone. You can move it up or down by dragging and dropping the order on the list.
8. Now that you've added your block to the list, click the Done link and reload your page. Your new block will now be on the page.
9. In most cases, you'll now need to configure your block. To do so click the (Block Configuration) button in the *Admin Toolbar*. This will highlight each block on the page.
10. To edit the settings, click the (Block Properties) button from the block's fly-out menu. This will bring up the block properties dialog with all of the settings for the selected block.
![Zone Block List Dialog](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/zone-blocks-external.png)

Zone Block List Dialog

![Add Block](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/add-block-external.png)

Add Block

Now that your page is created and your block structure is set up, it’s time to configure your page properties and add content. To learn how to do this, see the [Managing Content and Pages](#managingcontentandpages) section below.

# Adding a Page (Internal Site)

Adding a page from your internal site allows you to both create a page and configure its properties in the same place.

Begin by going to Admin Tools \> CMS Configuration \> Pages. You’ll see a tree navigation of the pages of your site, as well as a icon. Click the icon and select either "Add Top-Level" or "Add Child To Selected". Rock will then display the *Add Page* screen.

The *Add Page* screen has three tabs: Basic Settings, Display Settings, and Advanced Settings. This is where you set up the new page’s properties.

![Add Page - Basic Settings](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-page-basic-settings-v18.png)

Add Page - Basic Settings

![Add Page - Display Settings](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-page-display-settings-v18.png)

Add Page - Display Settings

![Page editor showing advanced settings including SSL, cacheability, rate limiting, and body CSS class.](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-new-page-advanced-settings-v18.png)

Add Page - Advanced Settings

Click Save when you’re done. Now it’s time to add content to your page. To learn how to do this, see the [Managing Content and Pages](#managingcontentandpages) chapter below.

# Saving Your New Page Configurations

While the Save button appears on each of the Add Page tabs, you only have to click it once to save the configuration settings for all three tabs.

# Editing a Page (Internal Site)

You can also edit a page’s block configuration and properties from the internal site. From the *Pages* screen (Admin Tools \> CMS Configuration \> Pages), click the page you want to edit from the tree navigation.

![Edit Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/edit-page-configuration-v18.png)

Edit Page

From here, you can edit an existing block by clicking the button. You can also add a new block by selecting the zone where you want the block to go from the dropdown menu on the right, then clicking Add Block to Zone to display the Add Block window.

![Add Block](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-block-internal-v18.png)

Add Block

Note here the option to add this block to the Page, Layout or Site. Just like [adding a block to your external site](#addingablocktoapageexternalsite), you need to decide if you want this block to only appear on the current page, on any page using this layout or across your entire internal site. The Layout and Site options are best used when adding a block you know for sure belongs on every page, such as a header or footer. Otherwise, it's best to use the Page option.

To edit an existing block’s properties, click the button. Rock will display the *Block Properties* screen. The options displayed will depend on the kind of block you're editing.

![Edit Block](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/edit-block-properties-v18.png)

Block Properties


---

## Anatomy of Rock CMS {#anatomy-of-rock-cms}

> **Path:** Designing and Building Websites Using Rock > Anatomy of Rock CMS

Anatomy of Rock CMS

Grab your lab partner and let's dig in to what makes the Rock CMS tick. There's no better place than to start at the top with sites and work our way down to the components that make up a page. Pass the scalpel and let's start cutting.

# Sites

The top of the CMS hierarchy is the site. Each website you create should be created as a unique site. Think of sites as a collection of related pages that share a consistent look and feel. Sites aren't limited to external websites though. You can use them to contain your check-in pages or a set of pages for a metrics dashboard.

Sites are created and managed under Admin Tools \> Websites. Be sure to use the chapter [Creating a New Site](#creatinganewsite) before setting out on your own.

# Site Themes

Themes are a set of resources that add styling to the pages of a site. The theme is defined at the site level. This makes it very easy to change the look of an entire site with a single configuration change. You can read more about themes in the [Themes](#themes) chapter.

# Pages

The concept of pages is pretty obvious; they represent a single web page. Unlike many CMS however, the page doesn't exist as a file on the website. Instead, a page is dynamically assembled by Rock with each request. This allows each page to be personalized by the person requesting it and allows you to secure portions of the page based on the person's security rights.

Pages are arranged in a parent-child hierarchy. This hierarchy allows us to build dynamic menus.

# Layouts

Each page is configured to have a specific layout. This determines the content areas (or zones) that the page has. Available layouts are defined by the theme that the site is configured to use. While you can create as many new layouts as you'd like, we strongly recommend that you use the standard names for reasons that will be made obvious in future chapters.

# Zones

Zones are content areas that are defined by the layout. They represent things like the header, navigation menu, footer and content areas.

# Blocks

Blocks make up the actual content of the page. They come in all shapes and sizes. Each has a specific purpose. The most common block is the *HTML Content* block. This block allows you to display and edit HTML content to a specific zone. Other blocks are used to generate navigation menus, list groups, show maps, etc. Think of blocks as your Legos® that you can use to build a world of new inventions.

Blocks can be placed on either a page, a layout or a site. When tied to a layout they're displayed on every page that uses the layout. When tied to a site they're displayed on every page within the site. This is very helpful when adding content like navigation in the header or footer text that should be the same across all pages.

# The Anatomy of a Page

Now that we've covered all of the components of the Rock CMS system let's look at a visual representation of a page. Remember that each page has a layout, and the layout defines what zones are available to place blocks into.

![Anatomy of a Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/anatomy-page.png)

Anatomy of a Page


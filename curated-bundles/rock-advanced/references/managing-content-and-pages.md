---
description: "Use when users need guidance on page load time monitoring, admin toolbar features, or managing website pages and blocks in Rock CMS"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Managing Content and Pages

Managing Content and Pages

The *Admin Toolbar* is the gateway to a majority of Rock's content management features. This bar is displayed at the bottom of each page that the logged in person has rights to manage. It's always available at the bottom of the page, but it's hidden until you hover over it with your mouse.

![Admin Toolbar](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/admin-toolbar-v18.png)

Admin Toolbar

You can find the following buttons/links on the toolbar:

- \- Block Configuration
- \- Page Properties
- \- Child Pages
- \- Page Zones
- \- Page Security
- \- Short Links
- \- Rock Information

# Page Load Time

When we started to plan for Rock, we listed out our high-level goals for the project. One of these was "Speed as a Feature." For us that was more than just words, we wanted it to be real and measurable. One of the first features we added was the page load time in the admin bar. From that moment on speed was put in front of us on every page we loaded. We kept it there, not only as our contract with you, but also so you could measure your custom modifications.

# Block Configuration

Clicking the block configuration button () in the admin toolbar will bring up a fly-out menu over each block on the page. Rolling over these menus will allow you to:

- **Edit Content:** This opens the content for the block to be edited and managed.
- **Block Settings:** This brings up a dialog that allows you to manage the block settings for the block.
- **Block Security:** This item allows you to edit the security of the block. This not only allows you to control who can view a block, but also who can edit and administrate blocks.
- **Move Block:** Selecting this item allows you to move the block to a different zone on a page. You can also move the block from the pages zone to the layouts zone. This will make the block available to each page that uses the layout.
- **Delete Block:** For everything there is a season; a time to add and a time to delete. When it’s time to delete, use this option.
![Block Flyout](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/block-flyout.png)

Block Flyout

# Page Properties

The page properties () dialog allows you to edit all of a page's settings. This uses the same screens, with the same options, as we saw on the internal site in the [prior chapter](#addingapageinternalsite).

# Child Pages

The child pages () dialog allows you to see a list of child pages of the current page. From this list you can reorder the pages, delete a page, copy an existing page or add a new page. You can also use this list to navigate to a page that might not be available in the menu.

When copying an existing page, not only is the page copied, but also the page blocks, child pages, and child page blocks. What a time saver! Even though Rock will re-wire up any references between the new blocks and new pages, it is wise to double check your block settings to verify everything is what you expect.

![Child Pages Dialog](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/child-pages-v13.png)

Child Pages Dialog

# Page Zone

Clicking the Page Zones button () will enable the zone fly-out menu for each zone defined on the page. From this menu you can bring up the zone dialog below.

![Page Zone Dialog](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/zone-blocks-v13.png)

Page Zone Dialog

From the zone dialog you can add or delete blocks in a zone. The tabs at the top of the page determine if the blocks will be added to the current page, the layout or the site. Adding the block to the layout will enable it to be shown on all pages that use that layout. Adding the block to the site will place the block on every page in the site.

# Page Security

The Page Security () dialog allows you to set security for the page. This allows you to determine who can view and administrate the current page. Note that page security is hierarchical. If no specific security rights are defined by a page, it will use the security settings of its parent and its parent's parent. If no page above it defines any specific rights it will use the rights defined for the site. This allows for a robust and flexible security implementation with minimal configuration.

![Page Security Dialog](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/page-security-v13.png)

Page Security Dialog

# Short Links

Short links () are exactly what they sound like: simple, user‑friendly links that replace long, messy URLs. But don’t let their size fool you. These links handle a lot behind the scenes, from tracking engagement with analytics and capturing helpful marketing data. You can even schedule these links to redirect automatically when you need to update or change their destination.  
  
To start, click the button in the Admin Toolbar to display the Shortened Link window.

![Shortened Link](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/short-link-v18.png)

Shortened Link

# Managing Your Short Links:

It's wise to start organizing your links early by pinning or categorizing them. Someday you may have thousands of Short Links, especially if they're automatically created through workflows or integrations. Good organization makes it much easier to quickly check analytics and maintain clarity as your list grows.

# Domain Order

Be sure the domain you want to use for your Short Link appears first in your site's *Domains* list. Rock uses the first domain to build the Short Link.

Go to Admin Tools \> Websites, edit your site and reorder the domains so your desired domain appears first.

To add a new category, make sure it uses the *EntityType* of *PageShortLink*. Only categories with this type are eligible for use with Short Links. You can set this in the Admin Tools \> Settings \> Category Manager.

For example, you might create a *Children's Ministry* category to keep all related Short Links organized. You can also configure security so only Children's Ministry staff can access or manage those links.

## Managing Short Links

As you create short links, they can be viewed and managed in the *Short Links* page found at Admin Tools \> CMS Configuration \> Short Links.

![Short Links](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/short-links-v18.png)

Short Links

As your list of Short Links grows, you can keep things manageable with built-in filtering and sorting. Press for global options, or hover over a column and select to narrow the results.

Click any Short Link in the list to view or edit its details and see where it has been used. To copy a link, click the button. To filter by creator, select the icon.

# Create Short Link Workflow Action

You can also create short links as part of a workflow. For more information see [Create Short Link](https://community.rockrms.com/WorkflowActionCategory?Category=1#createshortlink), located in the Utility section of the Workflow Action Documentation.

## Advanced Short Links

When it comes to short links, there's more than meets the eye. With Advanced Settings, you can tack on UTM codes to track where your traffic’s coming from—perfect for tracking marketing campaigns and collecting valuable data.

When editing or adding a new *Short Link* from the *Short Links List* block, you will notice that the detail screen looks a little different, and has some new features.

![Short Link Advanced Settings](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/short-link-advanced-v18.png)

Short Link Advanced Settings

Once you have started collecting data with UTM parameters, you can track performance similar to other analytics platforms like [Google Analytics](https://marketingplatform.google.com/about/analytics/).

# Streamlining UTM Parameters

The *UTM Source*, *UTM Medium* and *UTM Campaign* fields use a list that preserves the values you use. This process ensures consistency and easy retrieval of UTM values you have used before. Under the hood, these values are being saved as *Defined Values*.

# Using UTM Parameters Manually

You don’t have to use the UTM fields in the interface. You can manually add them to the end of a URL when sharing a link. The *Advanced Settings* are simply provided for convenience.

## Short Link Scheduled Redirects

By utilizing *Scheduled Redirects*, links can dynamically re-route clicks during a specified time period.

Here is an example of the power *Scheduled Redirects* brings:

You might place this URL in a QR code or an NFC token located in your auditorium. The link could change depending on the event. On weekends, it might direct to a giving page, while during weekday events, it could point to your event schedule.

If you toggle *Enable Scheduled Redirects* on when editing a *Short Link*, then click the , you can create a new *Scheduled Redirect*.

Scheduled Redirect

![Scheduled Redirect](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/scheduled-redirect-v18.png)

1 Schedule Type

- ***Custom Schedule***

When using a *Custom Schedule* you can determine a one-time or recurring schedule for when this link will redirect those who click.

- ***Named Schedule***

When using a *Named Schedule* you can select a pre-configured schedule. Create a new one under Admin Tools \> Settings \> General \> Schedules.

2 URL

This is the URL to which the short link will redirect individuals.

3 Purpose Key

Optional parameter used to describe what the specified URL represents. (e.g.: event\_registration)

4 Advanced Settings

UTM settings can be individually configured for each redirect link. See [Advanced Short Links](#advancedshortlinks) for more information.

Make sure to click OK when you are done.

# Using UTM Campaigns With Scheduled Redirects

Imagine your 'Church Information' link is scheduled to redirect to a Small Groups page during weekdays. Setting up a new campaign for that link will allow you to collect more targeted data on who is searching for your church throughout the week versus searching on the weekends.

# Rock Information

Clicking the Rock Information button () will display the System Information window where you can view the version info and diagnostics.

## Version Info

![Info Dialog](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/info-dialog-v18.png)

Info Dialog

## Diagnostics

The diagnostics tab lists the complete configuration of your Rock environment. It’s useful when working with others to debug an issue.

![Diagnostics Dialog](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/info-diagnostics-dialog-v18.png)

Diagnostics Dialog


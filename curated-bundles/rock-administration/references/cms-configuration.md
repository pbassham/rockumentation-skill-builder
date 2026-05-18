---
description: "Use when setting up or managing Rock websites, pages, themes, routes, blocks, and file directories"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > CMS Configuration

CMS Configuration

Rock is built on top of a very powerful Content Management System (CMS). A detailed review of Rock’s CMS tools is outside the scope of this guide, but we do want to provide you with a high-level overview of these settings. For full details on any of these configuration settings, check out the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14/) guide.

![CMS Configuration](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/cms-configuration-v18.png)

CMS Configuration

# Sites

The sites section lists your Rock websites. Rock initially comes configured with several different sites for different purposes. Below are a few:

- **Rock Internal:** The internal site used by the organization’s staff to manage people, groups and the system in general.
- **External Website:** The primary portal for those outside the organization.
- **Check-in:** The site that's used for the check-in system.

You can add as many sites as you wish. For instance, the site that Spark Development Network uses to manage Rock has all of the sites above plus two additional ones. One hosts the Spark site (sparkdevnetwork.org) and the other hosts the Rock site (rockrms.com). Notice that each site looks different and unique from the outside but shares a common set of data and configuration.

# Pages

While most of the configuration for a page can be completed directly on the page itself, there are times when it’s difficult to navigate to a supporting page if it isn’t shown in the main navigation. This screen lists all the pages defined in Rock in a simple tree display to help you get where you’re going. New pages can also be added here.

# File Manager

The *File Manager* allows individuals to upload files and manage directories on your Rock host server.

# Routes

The routes section lists all the routes, or URL page names, in use for both the internal and external pages of your site. Some routes come preconfigured in Rock. The ability to edit these system routes is limited, but custom routes you create are fully editable.

# Block Types

Every page in Rock is made up of several blocks. These blocks are the core unit of functionality. For the most part, anything you see on a page is a part of one block or another. The *Block Types* page lists all the types of blocks available.

# Themes

Rock comes preconfigured with several themes, all of which you can customize using the Theme Styler. You can also get creative, though, and design your own. All themes, both system and custom, will be listed here, and you can access the Theme Styler for each from this page.

# HTTP Modules

HTTP Modules in Rock are technical components that handle specific tasks related to HTTP requests, such as managing deep links for mobile apps, enhancing system observability, and adding custom response headers. These modules are used by developers to extend and customize the behavior of the web server. Administrators typically do not interact with these modules directly.

# Content Channels

The *Content Channels* represent the actual data that's defined for use by the CMS tools.

# Content Channel Types

Rock's dynamic content capabilities are a cornerstone of its content management system (CMS) feature set. The *Content Channel Types* page is where you'll define the data structures for dynamic content.

# Content Collections

Content Collections in Rock allow you to group multiple content channels (like blogs and sermons) and calendars into a single searchable collection, making it easy to find related content across different channels. For details, see the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#contentcollections) manual.

# Content Component Templates

Out of the box, Rock comes with three preconfigured content component templates. Use Lava to create your own.

# Content Channel Item Attribute Categories

Use this page to add or modify categories for content channel item attributes. You can edit the name, description, icon or highlight color.

# Content Channel Categories

*Content Channel Categories* let you group and organize your content channels according to how they're used. This page is where those categories can be configured. A content channel can be in more than one category if it's needed in different areas. See the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#contentchannels) guide for more information.

# Personalization Segments

Content on your Rock website can be personalized to the person viewing it. Personalization Segments let you filter content based on something about the person or based on a person's actions. See the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#personalizationsegments) guide for more information.

# Request Filters

Content on your Rock website can be personalized to the person viewing it. Request Filters relate to the technical characteristics of the visitor's browsing session. You could use a request filter to show content only if the person is on a mobile device, or if they're coming from a certain IP address. See the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#requestfilters) guide for more information.

# Adaptive Message

Adaptive Messages in Rock deliver personalized content, enhancing engagement by showing relevant, tailored content to individuals.

# Lava Shortcodes

Shortcodes are a way to make Lava simpler and easier to read. They allow you to use a simple Lava tag in place of a complex template written by a Lava specialist, which means you can do some really powerful things without having to know exactly how everything works. Rock comes with some Lava shortcodes preconfigured, but you can create your own. All of your shortcodes will be listed on this screen. To read more about shortcodes and how to author them, see the [The Long & Short on Shortcodes](https://community.rockrms.com/Developer/BookContent/33) manual and the [Lava](https://community.rockrms.com/Lava) guide.

# Media Accounts

From here you can manage your media accounts and view analytics for individual media elements. For full details see the [Digital Media](#digitalmedia) chapter below.

# Persisted Datasets

With *Persisted Datasets* you can shape data for speed and reuse demanding queries without worrying about performance. For all the details, see the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#persisteddatasets) guide.

# Short Links

You can create short links for the internal and external pages of your site either from this screen, or by clicking the button in the admin tool bar. All of your short links will be listed here.

For more details on creating Short Links on Rock, check out our [Designing and Building Websites Using Rock Manual](https://community.rockrms.com/Rock/BookContent/14#shortlinks).

# Shared Links

This is where you can create and maintain bookmark links that are accessible by others in your organization. These shared links appear with a person's Personal Links. For full details check out the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#personallinks).

# Cache Manager

The Cache Manager lets you manage the information cached on your Rock server(s) through the use of cache tags. Cache tags work a bit like personal and organizational tags, except in this case you're tagging types of information. Using the Cache Manager, you can tell Rock to clear the cache of information based on those tags. There are two sides when it comes to configuring and using the Cache Manager: the more user-friendly web person side, and the more technical, IT person side. Let's look at the web person side first.

## Clear Cache by Tag

From the Cache Manager screen, you can add and view cache tags, clear the cache by cache tag, view cache statistics, and clear the cache by type.

![Cache Manager](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/cache-manager-v18.png)

Cache Manager Screen

The complete list of cache tags, as well as their descriptions and number of items (called Linked Keys) currently cached by each tag are listed in the Cache Tags section of the screen. To clear cached items by a particular tag, click the button for that tag. Clearing the tagged items from the cache won't change the associated linked key number.

## Add Cache Tags

Click the button to add a new cache tag. Tag names must be all lowercase with no spaces. Once created, they are stored as a defined value of the Cache Tag Defined Type and can't be deleted.

![Cache Manager Add Tag](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/cache-manager-add-tag-v18.png)

Add Cache Tag

## Current Cache Statistics

The *Cache Statistics* section of the screen displays the statistics for the cache type selected in the *Cache Types* field. Here's a breakdown of the stats provided:

- **Hits** – The number of times something was looked for and found in the cache.
- **Misses** – The number of times something was looked for but not found in the cache.
- **Adds** – The number of items added to the cache.
- **Gets** – The number of cache requests (i.e., the total number of hits and misses).
- **Clears** – The number of times a clear was performed on the cache.

Because these statistics aren't used very frequently, they're turned off by default. This helps improve overall system performance. You can choose to *Enable Statistics* using the checkbox near the top of the page. Keep in mind that enabling statistics causes Rock to restart, so it’s best to do this when there isn’t much activity on your site.

## Clearing Cache by Type

You can clear the cache of the item types specified in the *Cache Types* field by clicking the Clear Cache button.

# Asset Manager

The *Asset Manager* allows you to browse and manage assets in the provider.

# Control Gallery

The Control Gallery in Rock is a resource for developers to access and use various input controls for customizing the system.

# Font Awesome Settings

Font Awesome is the easiest way to add icons throughout Rock. There's a free version already linked to Rock that's ready and available for use. You can optionally upgrade to a Pro version for more icons.


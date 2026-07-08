---
description: "Use when configuring Universal Search indexing for person, business, group, content channel, or site entities in Rock administration"
source: "https://community.rockrms.com/documentation/bookcontent/32/371"
sourceLabel: Universal Search
---
> **Path:** Universal Search > Specifics for Entities

Specifics for Entities

# Person

The person entity is pretty basic. Once enabled, all individuals in the database will be sent to the index. You can add specific person attributes to be indexed as well (Admin Tools \> General Settings \> Person Attributes). When you add/delete attributes to the index, you'll want to run a bulk load on the Person index to ensure they are available right away. Otherwise, you'll need to wait until the bulk re-index happens that night. Don't forget; bulk loading is done from Admin Tools \> General Settings \> Universal Search Control Panel.

# Security Warning

Be careful when indexing person attributes because attribute security is not available in Universal Search.

# Business

Businesses don't have their own entity. In Rock businesses actually share the Person entity (which makes sense when you consider how businesses relate to things like giving). In Universal Search we do break them out, so they look like a separate entity to allow you better filter options (sometimes you want businesses in your results; sometimes you don't) but when it comes to setting up indexing and settings, remember that they share with people.

# Group

When you enable groups to be indexed, you may wonder why nothing is displayed. Before groups are displayed, you'll need to configure which group types you want added to the index. You can configure this with the *Group Type Editor* (Admin Tools \> General Settings \> Group Types). Once you enable a group type, a call will be sent to immediately start bulk updating the groups (no extra steps required on your part).

When new groups are added or an existing group is modified, it will be immediately sent to the index.

You can also determine which group attributes you would like indexed. Changing the attributes will require a manual index re-load.

Applying a custom icon to the group type is a good idea, as it will be displayed in the results.

# Content Channel Items

Content Channel Items work much the same way as groups. You'll need to configure which content channels you'd like to be indexed. You can also determine which attributes to include in the index. One other property to note is the *Content Channel Item Publishing Point* for the channel. This setting allows you to determine how to link to the resulting item. When left blank, the internal channel item page will be used. More commonly though, you'll want to provide a template to a custom page (like a blog detail page).

# Site

Sites are quite different from the other entities discussed here. When you index a site, you are really interested in searching all of the pages of the site. To do this, one must crawl the site looking for all of the content of the pages. For instance, a single *Blog Item Detail* page will need to be crawled several times to retrieve each of the blog posts. When you enable the Site entity, you'll need to complete the following steps:

1. Enable each site that you would like to add to the index under Admin Tools \> CMS Configuration \> Sites. Edit the site's Advanced Settings to allow indexing.
2. Once enabled, be sure to add the *Crawling Starting Location* for the site. This is the URL that the crawler will use to start the index process.
3. Set up a new Rock Job to crawl the site on a schedule that you determine is best for your needs. This can be done under Admin Tools \> System Settings \> Jobs Administration. The job type will be *Index Rock Site*.

Indexing processes, even Google’s, use hyperlinks to find and index all the pages on site. So, if a link to a particular page doesn’t exist anywhere on your site, crawlers can’t find that page. To ensure all pages on your site are found and indexed, you could create a new page for the purpose of indexing. The page would contain nothing but links, including the home page of the site. The URL for the links page would then be used as the *Crawling Starting Location* referenced above.

# Securing The Index Page

If you want to keep your page of links (as described above) obscured from public view, we recommend the following procedure:

1. Create a new account called “Rock Crawler” or similar.
2. Give the account a login and password.
3. Create the *Crawling Starting Location* page full of links.
4. Restrict security on the page to the new Rock Crawler account and your Rock Admins.
5. Add the Rock Crawler ID and Password to the Index Rock Site job.

This will allow the Index Rock Site job to find the links page, while keeping the page obscured from the general public.

# Logout Links Can Break Crawling on Secured Sites

If the crawler hits a *Logout* link while crawling a site behind a login, the Rock Crawler user will be logged out. After that, all remaining pages redirect to the *Login* page and won’t be indexed.

Simply unchecking *Allow Indexing* on the *Logout* page won’t prevent this. The crawler logs out before it can evaluate the no-index header. In some cases, wrapping the *Logout* link in a `no-index` class may help—but that won’t work if the link is inside a menu with other items that should be indexed.

To avoid this, consider removing *Logout* page permissions from the Rock Crawler user or role.

# Event Item

Indexing for event items is set at the calendar level. Edit the calendar under Tools \> Calendars to turn on the *Indexing Enabled* setting. With indexing enabled, you can search for keywords that come from the event item’s title, description or summary.

# Document

Documents can also be searched for and included in your search results. Unlike some of the other entities, there isn't a specific *Indexing Enabled* setting you'll need to turn on for different Document Types. Just enable indexing for Documents in the *Universal Search Control Panel* and you're off to the races. You can search for documents by Name or Type.


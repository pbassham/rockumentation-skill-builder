---
description: "Use when user needs to create, configure, or customize a Content Collection View block for searching and filtering across multiple content channels"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Content Collections

Content Collections

Let's say you have a content channel for blog posts, and a content channel for sermons. You can group those two content channels together under a single collection, known as a *Content Collection*. Content collections put the content for those channels in one place, unlocking the ability to search for content across both channels at once. So, if you have a blog post about finances and a sermon about finances, a person could search your content collection for "finances" and find both items. You can add any number of content channels to your collection, as well as calendars.

# Content Collection View

The *Content Collection View* block is where content collections come to life. As pictured below, this block provides robust search and filtering capabilities across all the items in your content collection at blazingly fast speeds. Out of the box this block is not applied to any pages.

![Content Collection View](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/content-collection-view-example-v14.png)

Content Collection View

# Universal Search

For those who are curious about how things work under the hood, the Content Collection View block utilizes the Universal Search feature. This allows for powerful searches at super-fast speeds.

We already mentioned a couple of the settings for this block. Now let's take a detailed look at the other available options. You can change or completely disable different parts of the block, allowing you to customize how it works according to what makes the most sense for your content collection. For instance, if the full-text search wouldn't be as useful because your content is all audio/video then you can simply turn it off.

![Content Collection View Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/content-collection-view-block-settings-v14.png)

Content Collection View Block Settings

# Content Collection Security

Content collections index, store, and display items without regard to their individual security settings. Ignoring security helps greatly with performance, however it can make restricted content accessible to people or groups who wouldn't have access elsewhere in Rock.

# Setting up Content Collections

Now that you've seen what you can do with content collections, let's take a look at how to set one up. The process is simple because you don't have to change anything about your content channels or calendars, or how they're structured. You'll want to think strategically about your collections, to ensure you've got the right content in the right places. For instance, you might have a content collection for resources, or a collection of all of your messages, devotionals, and blogs. You can have as many content collections as you need, and you can use the same content in more than one collection.

We'll start by navigating to Admin Tools \> CMS Configuration \> Content Collections. As pictured below, we'll be looking at an example content collection called "Resource Library".

![Content Collection Detail](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-collection-detail-v18.png)

Content Collection Detail

The items above define the framework of your content collection overall. Next, we need to add actual content to the content collection. Pictured below you can see we've added two content channels and a calendar to the content collection. Keep in mind that we didn't need to change anything with the content channel or the calendar. Your existing configuration will work as-is.

![Content Collection Content Sources](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-collection-content-sources-v18.png)

Content Collection Content Sources

When you're adding a source you have a few options available to you. Primarily, you can select which attributes you want to use as filters on the *Content Collection View* block.

![Content Collection Content Sources](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-collection-edit-source-v18.png)

Edit Content Sources

We're not done with this page yet. If you toggle over to the Search Filters view, you'll be able to see what we can use as filters when searching for content from the *Content Collection View* block.

![Content Collection Content Sources](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-collection-search-filters-v18.png)

Content Collection Content Sources

# Trending

In the prior sections we mentioned some of the "trending" features related to content collections. Below we're going to take a deeper dive into how trending works and how it's calculated.

The *Trending Window* you set on the content collection plays a big role in how trending data is calculated. To determine which items are trending, Rock looks at how many views (interactions) an item in the content collection has had over the time period specified as your *Trending Window*. For instance, if your *Trending Window* is 30 days then Rock will count how many interactions an item in the content collection has had in the last 30 days. Rock then takes that number and divides it by the age of the item (in days), up to a maximum of your *Trending Window*. For instance, if an item is six months old and your *Trending Window* is 30 days, the count of interactions over the past 30 days will be divided by 30. This calculation produces a number that is used to rank the items in the content collection.

The *Trending Gravity* setting is used to apply more weight to items that are newer. The idea of gravity is that an item which is only two days old that has been viewed 10 times is more popular than one that has been viewed 30 times in the last 30 days. Gravity is applied to the number that is calculated as described above, changing that item's score.

# Troubleshooting Content Collections

You might run into a unique scenario where the *Content Collection View* block isn't working exactly as you expected. In those cases, you'll need to review your configuration. Below we have some tips on where to start.

1. **Enable Personalization:** If your personalized content isn't appearing as it should based on the content collection setup, make sure you have personalization enabled at the site level. If you've already checked that, then run through the [troubleshooting personalization](#troubleshootingpersonalization) list in the Personalization chapter.
2. **Run the Index Job:** Rock ships with an *Index Content Collections* system job that runs overnight and automatically re-indexes the items in your content collection. Running this job manually may resolve your issue, especially if changes to the content or content collection have been made during the day.
3. **Block Settings:** Be sure to double-check the settings of the *Content Collection View* block. There are several settings that control how this block works, as detailed [above](#contentcollectionview).
4. **Activated Filters:** Remember that filters activated in the content collection configuration must also be active in the *Content Collection View* block. Be sure to check both places if you're missing a filter
5. **Universal Search:** Content collections utilize Universal Search. That means you'll need an Active index component under Admin Tools \> System Settings \> Universal Search Index Components. For more information check out the [Universal Search](https://community.rockrms.com/documentation/bookcontent/32#gettingstarted) manual.


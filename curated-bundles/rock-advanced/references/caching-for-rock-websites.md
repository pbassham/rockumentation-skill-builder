---
description: Use when understanding what content types can be cached in Rock websites and how different caching mechanisms work
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Caching for Rock Websites

Caching in Rock operates on the principle that once a piece of content has been created it doesn’t need to be created again. So, a copy can be kept around in a cache. Keeping content in a cache means it can be served very quickly, without triggering slow database queries or web requests. With caching you can provide individuals with faster page loads and a better experience when your server is under heavy load.

Caching is a powerful tool to make your Rock site faster. However, caching can be dangerous without understanding how your cache is being handled. All Rock caching takes the output of a template; anything programmatic inside is uncacheable. Think of Rock caches as a copy of how your Lava presents itself when you access it. Tags like `{%- stylesheet -%}`, `{%- javascript -%}` or page redirects will be applied.

When using Rock caching, developers should be aware of performance on the first load, before Rock has cached content. If your content is very slow, caching isn't a solution because content in your cache doesn’t stay there permanently. For content that causes long load times, use Rock’s [Persisted Dataset](#persisteddatasets) feature.

# What can be cached?

Rock has several different types of caching available in different blocks. Caching can also be done through Lava or by using the [Persisted Dataset](#persisteddatasets) feature. Below, we'll break down what can be cached and how.

## HTML Content Blocks

The HTML Content Block is one of the most ubiquitous blocks in Rock and is commonly used for displaying semi-static content on a page. When content is not being customized for individual users, developers should use the block cache Block Properties \> Cache Duration. Even blocks without Lava content can experience increased performance by avoiding querying the database.

## Content Channel View, Content Channel Item View and Content Component Blocks

“Content” blocks display a list of results from a content channel. The block features two different types of cache, accessed through Block Properties, called *Output Cache* and *Item Cache*. The two caches are fundamentally different, and mutually exclusive.

The ***Item Cache*** stores the underlying entity data requested by the block without storing the output of the block. Rendering from this cache is slower because the Lava output is processed when the block is requested.

The ***Output Cache*** stores the output of the entire block. Use the *Output Cache* when the output from the block is not being customized based on the current authenticated person, the current page or any other merge field value. Requests from an *Output Cache* will be faster than an *Item Cache* because no Lava is processed.

## Lava Cache Command

The Lava cache command is one of the most flexible ways to cache in Rock because it can be used anywhere that is Lava-enabled. It can also be used in conjunction with all other cache types. At the most basic level, a Lava cache tag has a `key` and `duration`:



{% cache key:'decker-page-list' duration:'3600' %}
    {% person where:'LastName == "Decker"' %}
        {% for person in personItems %}
                {{ person.FullName }} <br\>
        {% endfor %}
    {% endperson %}
{% endcache %}
                    

In the example pictured above, Lava will query the database for all "Deckers" and store the results in Rock's cache with the key of `'decker-page-list'` for a duration of an hour. After an hour has expired, a fresh query will be made from the database.

Keep in mind that Rock doesn't know where your Lava is running. All it knows is the key you gave it. This can work for you or against you. If you want your cached Lava to be unique, be sure to give it a unique key (e.g., 'page-12-deckerlist'). If you'd like your cached Lava to be reused in several places, such as on a number of different pages, use a shared key (e.g., 'decker-list'). Your key strategy is completely up to you.

Using `twopass` you have the option to cache the contents and personalize the output for an individual person. Setting `twopass:'true'` tells Lava to:

1. Run the Lava, then cache the results.
2. When pulling it from the cache, run the cached version through Lava again.

To set tags to be customized for the current individual with the `twopass` parameter, wrap your personalized tags with the `{% raw %}` tag.



{% cache key:'decker-page-list' duration:'3600' twopass:'true' %}
    Hi {% raw %} {{ CurrentPerson.NickName }}! {% endraw %} 

    {% person where:'LastName == "Decker"' %}
        {% for person in personItems %}
                 <br\>
        {% endfor %}
    {% endperson %}
{% endcache %}
                    

Note that the current person will be correct (because it survives the first pass because it's in a `raw` command) and the results of the database call will be fully cached.

## Toggle Web Cache

While you want things to be cached as much as possible, sometimes caching can present you with challenges. For instance, if you're developing a new site, you'll want to configure the blocks with caching, but the cached items can get cumbersome if you're making changes and need to see how things look right away.

As pictured below, you can enable or disable the web cache for certain blocks by accessing the admin toolbar and clicking the icon. This allows administrators to temporarily disable the cache for certain blocks, via a cookie. As of the time of this writing, this only impacts caching for the following blocks:

- HTML Content
- Content Channel View
- Content Channel Item View
- Internal Communication View
![Toggle Web Cache](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/web-cache-admin-bar-toggle-v12.png)

Toggle Web Cache

# A Different Kind of Cache - Persisted Datasets

Traditional caching in Rock is limited to specific blocks, or to a particular format when using the Lava cache tag. Persisted Datasets are an always-ready cache that allow you to shape data for speed and use across many different blocks, and with different types of markup. Persisted Datasets are cached on the database or in memory using a job, so they’re quick every time.

Persisted Datasets should be used when a large dataset is resource intensive to process, leaving people waiting seconds, or even minutes, for results. They can also be used when certain queries, like getting an attribute of another attribute, would cause issues at scale.

##### Persisted Dataset Example



{% assign data = 'mydataset' | PersistedDataset %}
{%- for item in data -%}
  {{ item.Title }}
{%- endfor -%}
            

If you want more details, we have a whole chapter on [Persisted Datasets](#persisteddatasets).

# Caching & Rock Performance

When working with Rock pay attention to your page load time, located in the lower left-hand corner of the admin bar. Ideally the load time should be under 0.2 seconds. Keep in mind that “Page Load Time” is not an accurate measure of how long it takes to load in a browser, but it is an excellent measure of server processing time. For browser performance metrics, we suggest using the [Network tab in Developer Tools](https://developers.google.com/web/tools/chrome-devtools/network) or performance audits like [Google Lighthouse](https://developers.google.com/web/tools/lighthouse#devtools).

To understand server side performance for Rock pages, add `?ShowDebugTimings=true` to your query string. The page will append performance statistics for each individual block to allow for performance tuning.


---

## Cache Tags {#cache-tags}

> **Path:** Designing and Building Websites Using Rock > Cache Tags

When updating content, you’ll sometimes want your Rock site to instantly reflect the changes you’ve made. To meet this need, Rock provides multiple ways to clear a cache. You can clear the cache of all objects using the global “Clear Cache” button, or you can clear a group of cached objects using cache tags. By using cache tags, you can precisely control what objects are removed from cache; without the performance penalty of completely clearing cache.

# Adding Cache Tags

To add a cache tag, go to Admin Tools \> CMS Configuration \> Cache Manager. On the left column you can see any currently added cache tags. To add new tags, click the button at the bottom of the grid.

![Add New Cache Tag](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-new-cache-tag-v18.png)

Add New Cache Tag

When adding a cache tag, the tag name should be as short and descriptive as possible. We highly recommend using the Description field to describe the purpose of the cache tag in detail. You’ll want to be careful, as cache tags cannot be removed or modified. Also, keep in mind that tag names must be all lowercase without any spaces.

# Using Cache Tags

After adding cache tags, blocks with caching enabled will have an additional attribute of “Cache Tags” populated with the tags you've added.

Open the block settings of a page in your external Rock site and click the button. The cache tags created in the *Cache Manager* are displayed. Select the tag(s) you want to assign and click the Save button.

![Content Channel View Cache Tags](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/content-channel-view-cache-tags.png)

Content Channel View Cache Tags

Now we have the ability to clear the single tag (see [Clearing Cache Tags](#clearingcachetags)) and update all blocks using the “messages” tag.

Optionally, you could set a block to use multiple cache tags. This way, when any of the tags are cleared, the cache for the block would be updated.

# Clearing Cache Tags

To clear all items that are tied to a specific tag, go to Admin Tools \> CMS Configuration \> Cache Manager. Click the button to the right of the tag's row. This will empty the cache of all linked keys.

![Clear Cache Tags](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/clear-cache-tags-v18.png)

Clear Cache Tags


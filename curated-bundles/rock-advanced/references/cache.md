---
description: "Use when configuring caching strategies for Lava commands to improve performance, including setting cache keys, duration, and handling personalized cached content"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Cache

Want your Lava to run like lightning? Enable caching! Wrapping your Lava in a cache command will take the results and store it in Rock's memory cache. Subsequent runs will load faster than a New York minute.

Let's take a look at a simple example:

```
{% cache key:'decker-page-list' duration:'3600' %}
    {% person where:'LastName == "Decker"' %}
        {% for person in personItems %}
                {{ person.FullName }} <br />
        {% endfor %}
    {% endperson %}
{% endcache %}
```

This Lava will query the database for all Deckers and store the results in Rock's cache with the key of 'decker-page-list' for a duration of an hour. After an hour has expired, a fresh query will be made from the database.

Keep in mind the results of your Lava are stored in your server's memory. You don't want to add numerous large items to cache as it may impact system performance.

## Cache Key Tricks

Rock doesn't know where your Lava is running. All it knows is the key you gave it. This can work for you or against you. If you want your cached Lava to be unique, be sure to give it a unique key (e.g., 'page-12-deckerlist'). If you'd like your cached Lava to be reused in several places (such as on a number of different pages), use a shared key (e.g., 'decker-list'). Your key strategy is completely up to you.

You could use Lava to make a key (e.g., 'decker-list-), but this is not recommended as it will create numerous cached objects in memory. But in certain use-cases, this might come in handy. (The gun's loaded. Don't shoot yourself.)

## Cache Tag Tricks

The processing of cache tags can be a bit tricky with locally scoped variables (variables you create using the assign tag). If you update a local variable inside of a cache tag it will only be in effect inside of the cache tag. Below is an example:

```
{% assign color = 'blue' %}
Color 1: {{ color }}

{% cache key:'fav-color' duration:'1200' %}
    Color 2: {{ color }}
    {% assign color = 'red' %}
    Color 3: {{color }}
{% endcache %}

Color 4: {{ color }}
```

Will print:  
Color 1: blue  
Color 2: blue  
Color 3: red  
Color 4: blue  

# Parameters

**Quick Links:**

- [key](#key)
- [duration](#duration)
- [twopass](#twopass)
- [tags](#tags)
- [maxcachesize](#maxcachesize)

## Key

We covered this in detail above. No need to rehash it again here.

## Duration

The time, in seconds, that the cached content should be kept before reloading.

## Twopass

When you cache the contents of your Lava the full results are added to the cache. That's awesome, because reading from the database can be slow; but you wanted to personalize the contents and now that it's cached you can't. Well, you could but the first person to load the content would have their name in the cache and everyone would then see that person's name and not their own. That's a bummer...

...Until you read about the twopass parameter. Setting `twopass:'true'` tells Lava to:

1. Run the Lava, then cache the results.
2. When pulling it from the cache, run the cached version through Lava again.

You might think running the cached version a second time is a waste of computing resources since the Lava has already been rendered. However, you could use `{% raw %}` commands to protect your Lava through the first pass so it could be run on the second. This allows the best of both worlds. You get to cache the expensive stuff, AND personalize the results (which is fairly quick). Let's see an example:

```
{% cache key:'decker-page-list' duration:'3600' twopass:'true' %}
    Hi {% raw %} {{ CurrentPerson.NickName }}! {% endraw %} 
    {% person where:'LastName == "Decker"' %}
        {% for person in personItems %}
                 <br />
        {% endfor %}
    {% endperson %}
{% endcache %}
```

Note that the current person will actually be correct (since it survives the first pass since it's in a raw command) and the results of the database call will be fully cached.

## Tags

Rock's caching engine allows for cache tags to be created, which allows for clearing several cached items at once. You can provide a comma-delimited list of cache tags you would like your lava to be attached to. This allows you to clear the cache without having to come to each page and change the template.

For more on cache tags see the [Designing and Building Websites Using Rock Guide](https://community.rockrms.com/Rock/BookContent/14#cachetags).

## Maxcachesize

To help protect your server's memory, we have added a max size, in bytes, that will restrict what gets cached. The default value is 200000 (200kb). You can raise it, but if you do you should be asking yourself, "Is this really a good idea?"


---
description: "Use when customizing how search results display for entities, including result templates and URL patterns in Rock administration"
source: "https://community.rockrms.com/documentation/bookcontent/32/371"
sourceLabel: Universal Search
---
> **Path:** Universal Search > Customizing Results for Entities

Customizing Results for Entities

How results are returned from the search is important. Luckily, there are numerous ways to customize the results from the search. We cover all the options below.

# Default Entity Results

Each entity has a default result template that you can change. This is a great place to modify what you'd like to be returned across multiple search interfaces. You can edit these templates on a per-entity basis under Admin Tools \> Security \> Entity Administration.

There are two templates available for your customization. The first, *Index Results Template*, is the template for the result row of the search. The other, *Index Document URL Pattern*, is the Lava template for determining the URL for the specific result when used in the Smart Search.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/entity-configuration-v18.png)

Entity Configuration

Let's consider a use case for how you might want to modify these templates. Say you have a custom group type in Rock that you would like to display differently than the normal group result. Perhaps you'd like to add a specific attribute value for the group and link to a different group detail page. This is all possible by updating these two Lava templates.

## Sample Results Template

{% assign url = "~/Group/" | ResolveRockUrl %}

{% assign groupTypeId = IndexDocument.GroupTypeId %}
{% if groupTypeId == 24 %}
    {% assign url = "~/Organization/" | ResolveRockUrl %}
{% endif %}

{% if DisplayOptions.Group-Url and DisplayOptions.Group-Url != null and DisplayOptions.Group-Url != '' %}
    {% assign url = DisplayOptions.Group-Url | ResolveRockUrl %}
{% endif %}

<div class="row model-cannavigate" data-href="{{ url }}/{{ IndexDocument.Id }}"\>
    <div class="col-sm-1 text-center"\>
        <i class="{{ IndexDocument.IconCssClass }} fa-2x"\></i\>
    </div\>
    {% if groupTypeId == 24 %}
        <div class="col-sm-4"\>
            <strong\>{{ IndexDocument.Name }}</strong\> <small\>({{ IndexDocument.GroupTypeName }})</small\>
            {% if IndexDocument.Description != null and IndexDocument.Description != '' %}
                <br\> 
                {{ IndexDocument.Description }}
            {% endif %}
        </div\>
        <div class="col-sm-7"\>
            {{ IndexDocument.MemberList }}
        </div\>
    {% else %}
        <div class="col-sm-11"\>
            <strong\>{{ IndexDocument.Name }}</strong\> <small\>({{ IndexDocument.GroupTypeName }})</small\>
            {% if IndexDocument.Description != null and IndexDocument.Description != '' %}
                <br\> 
                {{ IndexDocument.Description }}
            {% endif %}
        </div\>
    {% endif %}
</div\>

Notice the checking of the group type to customize the URL and the results.

## Sample URL Template

{% assign url = "~/Group/" | ResolveRockUrl %}

{% assign groupTypeId = IndexDocument.GroupTypeId %}
{% if groupTypeId == 24 %}
    {% assign url = "~/Organization/" | ResolveRockUrl %}
{% endif %}

{% if DisplayOptions.Group-Url and DisplayOptions.Group-Url != null and DisplayOptions.Group-Url != ' %}
    {% assign url = DisplayOptions.Group-Url | ResolveRockUrl %}
{% endif %}

{{ url }}/{{ IndexDocument.Id }}

# Custom Lava

When using the default search block, you can process your results through custom Lava you produce. This Lava is provided as a block setting. You'll need to both enable the usage of the custom Lava and provide a Lava template. A very basic template is provided as a starting point.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/search-results-v18.png)

Search Results

# Search Lava Command

When you want 100% control, you can drop down and use the "search" Lava command. This command works very similarly to the entity commands and allows you 100% control of the formatting of your results. See the documentation for this command in the Lava docs at [community.rockrms.com/lava](https://community.rockrms.com/lava).


---

## Smart Search Integration {#smart-search-integration}

> **Path:** Universal Search > Smart Search Integration

Smart Search Integration

If you've been using Rock for more than a day, you've used the *Smart Search* block at the top of the page. Universal Search can be configured to participate in Smart Search, and once it is, you'll find that it's your go-to search type.

Once you have Universal Search up and indexing, you'll need to enable the Smart Search integration. You'll do this under Admin Tools \> System Settings \> Search Services. If it isn't already, move Universal Search to the top of the Component List so it will be the default search option.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/search-services-v18.png)

Search Services

Select the *Universal Search* item to configure its settings.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/universal-search-URL-settings-v18.png)

Universal Search Settings

From here you'll provide the results URL. This should point to a page hosting the *Universal Search* block. The URL should be configured to append the *SmartSearch=true* parameter to tell the block the request came from the Smart search feature. An example URL would be *universalsearch/{0}?SmartSearch=true*.

Note that passing in a parameter of *SmartSearch=true* in the query string also disables the *Refine Search* option on the results page. If you want to show the *Refine Search* option on the search results page, add *ShowRefineSearch=true* to the results URL. An example URL would be *universalsearch/{0}?SmartSearch=true&ShowRefineSearch=true*.

Additional Smart Search settings can be found on the Universal Search Control Panel (Admin Tools \> General Settings \> Universal Search Control Panel).

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/smart-search-settings-v18.png)

Search Services Settings

Here you choose the entities for which you'd like to show results and optionally provide advanced options.


---
description: "Use when building search queries in Lava to filter Rock entities by query terms, entity types, and field criteria with various matching strategies"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Search

The Search command allows you to interact with Rock Universal Search features. Be sure to review the documentation for these tools to help you configure your index.

Using this command allows you to search like right from Lava! Here's a quick example of what's possible.

```
{% search query:'ted decker' %}
    {% for result in results %}
        {{ result.DocumentName }}
    {% endfor %}
{% endsearch %}
```

This is a very basic example of providing a basic query term ('ted decker') to the Universal Search engine and displaying the results. We're just skimming the surface of what's possible. Let's look at our other options.

# Parameters

Below is a complete list of the parameters that are available to the search command.

**Quick Links:**

- [query](#query)
- [entities](#entities)
- [fieldcriteria](#fieldcriteria)
- [criteriasearchtype](#criteriasearchtype)
- [searchtype](#searchtype)
- [limit](#limit)
- [offset](#offset)
- [iterator](#iterator)

## Query

We've already seen this parameter in play above. This field is simply the search term you'd like to provide to the index.

```
query:'ted decker'
```

## Entities

The entities parameter allows you to limit which entities are returned in the results. You can provide several entity's 'friendly names' (lower case) by separating them with a comma.

```
{% search query:'ted decker' entities:'person,group,content channel item' %}
    {% for result in results %}
        {{ result.DocumentName }}
    {% endfor %}
{% endsearch %}
```

## Field Criteria

OK, now it's getting interesting... What if you wanted to search within a specific entity? Say for instance you wanted to search within a specific group type. The filter criteria parameter allows you to provide filters for any property/attribute stored on the index.

```
{% search query:'ted decker' entities:'group'  fieldcriteria:'GroupTypeName^Serving Team' %}
    {% for result in results %}
        {{ result.DocumentName }}
    {% endfor %}
{% endsearch %}
```

Need to provide multiple criteria? No problem... just separate the criteria with a '|'. Need partial matching? Just end your criteria value with a '\*'. < mind blown /\>

When providing multiple criteria the conditional logic is 'Or'. So 'this criteria' OR 'that criteria'.

```
fieldcriteria:'GroupTypeName^Serving Team|Name^Ushers'
```

## Criteria Search Type

If you're following along, we're now cooking with gas. But... what if we want 'And' conditionals for our filter criteria. Well if 'And' criteria is what you want 'And' criteria is what you'll get.

```
{% search query:'ted decker' entities:'group'  fieldcriteria:'GroupTypeName^Serving Team|Name^Usher*' criteriasearchtype:'and' %}
    {% for result in results %}
        {{ result.DocumentName }}
    {% endfor %}
{% endsearch %}
```

## Search Type

Universal Search supports three different search types: Exact Match, Wildcard and Fuzzy. The differences are very esoteric beyond the scope of the Lava docs. We recommend using the default 'exactmatch' for your searching needs.

```
{% search query:'ted decker' searchtype:'wildcard' %}
    {% for result in results %}
        {{ result.DocumentName }}
    {% endfor %}
{% endsearch %}
```

## Limits

This parameter limits the number of results that are returned. The default value is 50.

```
{% search query:'ted decker' limit:'10' %}
    {% for result in results %}
        {{ result.DocumentName }}
    {% endfor %}
{% endsearch %}
```

## Offset

This parameter skips the number of results that you tell it. The default value is 0.

```
{% search query:'ted decker' offset:'10' %}
    {% for result in results %}
        {{ result.DocumentName }}
    {% endfor %}
{% endsearch %}
```

## Iterator

Want to change the name of the iterator variable? No problemo!

```
{% search query:'ted decker' iterator:'matchedItems' %}
    {% for item in matchedItems %}
        {{ item.DocumentName }}
    {% endfor %}
{% endsearch %}
```


---

## Set Culture {#set-culture}

> **Path:** Lava > Commands > Set Culture

v18.0

The `setculture` Lava command allows you to specify the culture (locale) used when rendering values like dates and numbers inside your Lava template. This is especially helpful when you're working in a multilingual or multinational context and need consistent formatting regardless viewer's browser settings.

For example:

```
{% setculture culture:'invariant' %}
   {% assign myDate = '01/02/2020' %}
   {{ myDate | AsDateTime | Date:'MMM d' }} 
{% endsetculture %}
```

Regardless of the viewer's browser culture or the server's settings, the output will always display `Jan 2`.

## Works With

The culture setting only applies to the following Lava filters:

- AsDateTimeUtc
- AsDateTime
- AsDecimal
- AsDouble
- AsInteger
- Date
- Format
- FormatAsCurrency

**Warning:** Nesting the `setculture` command is not supported and will likekly result in unexpected behavior.

# Parameters

Below is a complete list of the parameters that are available to the command.

**Quick Links:**

- [culture](#culture)

## Culture

You can use any of the following values:

- **invariant** – Culture-agnostic formatting, useful for consistency.
- **client** – Uses the culture reported by the viewer's browser.
- **server** – Uses the Rock server's configured culture. (This is determined by the UI culture used when the OS was installed.)
- *or A valid culture code* – Such as **en-US**, **de-DE**, **fr-FR**, **es-ES**, etc.


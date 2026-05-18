---
description: "Use when formatting Lava code, configuring indentation and whitespace, naming variables, or styling comments and HTML attributes"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Formatting > Lava Style Guide

Consistent style and formatting are key to create maintainable projects. By keeping our code style consistent, we not only help ourselves, but we also lighten the load on those that will have to maintain our code.

## General Formatting Rules

### Indentation

Always indent by 4 spaces at a time.

Don’t use tabs or mix tabs and spaces for indentation.

```
{% if Person.NickName %}
    Hello {{ Person.NickName }}!
{% else %}
    Hi! Consider logging in for a more personal experience.
{% endif %}
```

### Linebreaks

Always separate lava tags `{% %}` by new lines. Insert a line break where appropriate for lava objects. `{{ }}`

```
{% for campus in Campuses %}
{% assign campusPastor = campus | Attribute:'Pastor','Object' %}
    <h2>{{ campus.Name }}</h2>
    <p>{{ campus.Description }}</p>
    <span>{{ campusPastor.FirstName }} {{ campusPastor.LastName }}</span>
{% endfor %}
```

### Trailing Whitespace

Remove trailing white spaces. Trailing white spaces are unnecessary and can complicate diffs.

## General Meta Rules

### Comments

Explain code as needed, where possible, using comments.

Comments should always be on their own line.

```
//‐ This is a single line comment

/‐ 
This is a good example of a multi-line comment, that spans multiple lines
when needed.
‐/
```

## Lava Formatting Rules

### Tags

Tags should have one space before and after the tag.

```
{% for item in collection %}
    {{ item.Title }}
{% endfor %}
```

### Filters

Filters should be separated by a single space between the bar and filter name, and no space between the filter name and the filter parameter.

When quoting attribute values inside a lava tag, use single quotation marks.

**Good:**

```
{{ 'Now' | Date:'M/d/yyyy' }}
```

**Bad:**

```
{{ 'Now' |  Date: 'M/d/yyyy' }}
```

### Variable Naming & Capitalization

When assigning a variable use camel case, with a lowercase first letter to differentiate from variables provided directly by Rock.

```
{% assign campus = Campuses | First %}

{% assign firstCampus = Campuses | First %}
```

### Whitespace Control

You can use whitespace control to output minimal, clean and readable HTML code.

In Lava, you can include a hyphen in your tag syntax `{{-`, `-}}`, `{%`, and `%}` to strip whitespace from the left or right side of a rendered tag.

```
{%- for item in collection -%}
    {{ item.Title }}
{%- endfor -%}
```

## HTML Formatting Rules

### HTML Quotation Marks

When quoting attributes values, use double quotation marks.

Use double (`""`) rather than single quotation marks (`''`) around attribute values. Except where absolutely necessary. Single quotation marks (`''`) are used for lava filters and can complicate readability.

```
<a class="btn" href="#">Sign in</a>
```


---

## Intro To Filters {#intro-to-filters}

> **Path:** Lava > Filters > Intro To Filters

There may be times when you'd like to modify the data a bit before you present it on the page. Lava provides a wealth of filters to add to your 'bag of tricks'. Learning about them can really amp up what you can do.

For example:

```
{{ Person.NickName | Upcase }}
--renders --
'TED'
```
But that's just the beginning... consider this example...
```
{{ '1/1/2014' | HumanizeTimeSpan:'1/14/2014',2 }}
-- would return the friendly description of the difference between the two dates of --
'1 week, 6 days'
```
Bam!

You can even chain the filters to make them work together like so:

```
{{ Person.FullName | Upcase | Truncate:9 }}
-- returns --
TED DE...
```

**Tip** While filter parameters are typically enclosed by single-quotes you can optionally use double-quotes for times when your string will contain single-quotes.

So now that you understand filters, what are your waiting for? Check-out all the options available to you by reading about it in the sidebar.


---
description: "Use when styling Rock Mobile pages with CSS-like rules, classes, ids, and TVML formatting syntax"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

## How to Style

Like the web, styling is added at the top of the document.

```
<?xml version="1.0" encoding="UTF-8" ?>
<document>
    <head>
        <style>
            <!-- custom styles -->
        </style>
    </head>
    <stackTemplate>
        <!-- template content -->
    </stackTemplate>
</document>
```

Standard styling rules apply using classes and ids.

```
<document>
    <head>
        <style>
            .lockupTitle {
                tv-text-highlight-style: marquee-and-show-on-highlight;
            }
        </style>
    </head>
    <stackTemplate>
        ...
        <lockup>
            <img src="..." width="..." height="..." />
            <title class="lockupTitle">...</title>
            ...
        </lockup>
    </stackTemplate>
    ...
</document>
```

## Global Styles

To add your configured site-wide styles to a page, simply add the [`SiteStyles`](https://appletv.rockrms.com/tv-pages#content) merge field to your styles section.

```
<?xml version="1.0" encoding="UTF-8" ?>
<document>
    <head>
        <style>
            
            <!-- custom styles -->
        </style>
    </head>
    <stackTemplate>
        <!-- template content -->
    </stackTemplate>
</document>
```

## Styling Syntax

The styling syntax is very similar to CSS. The [TVML documentation](https://developer.apple.com/documentation/tvml) covers the various options well. In the sections below we'll summarize some of the more common/useful concepts that are unique to TVML.

---

## Styling Tips {#styling-tips}

Below are a set of tips to help make getting started easier.

**New Lines in Strings**

If you would like to add a line break to a string simply use `\n` in your string.

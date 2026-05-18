---
description: Use when adding custom CSS styles to a page header or styling content conditionally using the stylesheet Lava command
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Stylesheet

The stylesheet command allows you to place a CSS stylesheet into the page header. While you technically can have inline styles in the body of your HTML it's a best practice to put this into the page header. As you'll see this is a pretty simple command, but don't let its simplicity fool you. This block has some powerful features that allow you to achieve results that aren't possible without it.

```
{% stylesheet %}
#content-wrapper {
    background-color: red !important;
    color: #fff;
}
{% endstylesheet %}
```

We told you it was simple!

Note: This command requires a full page reload in order for your changes to be displayed.

You can also combine this with other Lava commands and filters to do interesting things. For instance the example below changes the background color of the page depending on the time of day.

```
{% assign hour = 'Now' | Date:'H' %}
{% stylesheet %}
#page-content {
    {% if hour == 12 %}
        background-color: PeachPuff !important;
    {% else %}
        background-color: SkyBlue !important;
    {% endif %}
    color: #fff;
}
{% endstylesheet %}
```

# Parameters

Below is a complete list of the parameters that are available to the stylesheet command.

**Quick Links:**

- [id](#id)
- [compile](#compile)
- [import](#import)
- [cacheduration](#cacheduration)

## Id

If you provide an id parameter for your stylesheet Lava will be sure to only add the stylesheet once per id value.

## Compile

We recommend that you not use the LESS compile option as it will be deprecated soon.

CSS is great, but Rock runs on Less, a CSS preprocessor. Using the compile parameter you can tell Rock to run your stylesheet through the Less compiler before adding it to the page header.

```
{% stylesheet compile:'less' %}
#content-wrapper {
    p {
        font-size: 16px;
    }
}
{% endstylesheet %}
```

## Import

Compiling with Less... Sweet! But...the real trick is getting access to variables that have already been defined for the running theme. This allows you to use specific colors and default settings that the theme is set to use. Using the import parameter you can tell the command to import specific less files into your stylesheet. Here are a few tips to consider with this parameter.

- You can prepend `~/` as a shortcut for the application root. So if you wanted to import a Less file in the core styles folder you could do something like `~/Styles/FontAwesome/icons.less`
- Similarly, you can use `~~/` to reference the currently running theme's folder. This allows you to access their \_variables.less file like `~~/Styles/_variables.less`.
- If no ~ is provided then it's assumed that the Less file is in the theme's style folder. In this case `~~/Styles/` will be added to the file.
- Referencing files that are in a theme is a bit risky as it's hard to determine if the theme designer followed the standard pattern. Because of this, Rock ensures the referenced file exists on the filesystem before adding an import for it.
- As noted in the previous point, in case where the file doesn't exist in the theme the file will not be imported. This could cause an issue if you were relying on one of those variabled in your CSS. To make your stylesheet bullet proof we highly recommend that you self-define all the variables you need in your stylesheet. The imports will be added to the end of your stylesheet and will override your default variable values.
- Because most of the themes rely on the core `~/Styles/_rock-variables.less` and `~/Styles/Bootstrap/variables.less` files to define variables we automatically add imports for these files. This helps reduce the amount of Less errors you'll encounter.
```
{% stylesheet compile:'less' import:'_variables.less,_css-overrides.less' %}
@theme-1: green; 

#content-wrapper {
    background-color: @theme-1 !important;
    color: #fff;
}

{% endstylesheet %}
```

## Cache Duration

Compiling Less is fairly quick, but to ensure that your site is as fast as possible you can cache the output of your stylesheets by providing a cache duration (in seconds). This cache will be unique to the id parameter you provide. Because the cache uses the id for the cache key you **must** provide both a cacheduration parameter **and** an id parameter for your stylesheet to be cached. As a point of reference compiling a stylesheet takes about 100ms. Using a cached sheet takes less than 1ms.

```
{% stylesheet id:'group-map' cacheduration:'3600' compile:'less' import:'_variables.less,_css-overrides.less' %}
@theme-1: green; 

#content-wrapper {
    background-color: @theme-1 !important;
    color: #fff;
}

{% endstylesheet %}
```


---

## Tag List {#tag-list}

> **Path:** Lava > Commands > Tag List

v8.0

This is a very basic administrative command to list all of the registered Lava commands on your server. This is helpful if you'd like to find the command name of an entity, especially when working with plugins.

```
{% taglist %}
```

### Results

```
analyticsdimcampus - Rock.Lava.Blocks.RockEntityanalyticsdimfamilycurrent - Rock.Lava.Blocks.RockEntityanalyticsdimfamilyheadofhousehold - Rock.Lava.Blocks.RockEntityanalyticsdimfamilyhistorical - Rock.Lava.Blocks.RockEntityanalyticsdimfinancialaccount - Rock.Lava.Blocks.RockEntityanalyticsdimfinancialbatch - Rock.Lava.Blocks.RockEntityanalyticsdimpersoncurrent - Rock.Lava.Blocks.RockEntityanalyticsdimpersonhistorical - Rock.Lava.Blocks.RockEntityanalyticsfactattendance - Rock.Lava.Blocks.RockEntityanalyticsfactfinancialtransaction - Rock.Lava.Blocks.RockEntityanalyticssourceattendance - Rock.Lava.Blocks.RockEntityanalyticssourcecampus - Rock.Lava.Blocks.RockEntityanalyticssourcefamilyhistorical - Rock.Lava.Blocks.RockEntity...
```


---
description: "Use when needing to retrieve input values from QueryString, page parameters, or Block Attributes in Rock blocks"
source: "https://community.rockrms.com/developer/101\u002D\u002D\u002Dlaunchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Besides getting input values from regular HTML form controls, your blocks can get input from the QueryString and from stored configuration values we call Block Attributes (aka Block Properties).

## QueryString

You're probably pretty comfortable with the QueryString, but we ask that you use the `PageParameter( string )` method as a unified approach for fetching values from the QueryString, page route, etc. This method hides the complexity of having to find the value in any of those places.

```
if ( !Page.IsPostBack )
{
    string itemId = PageParameter( "CategoryId" );
    if ( !string.IsNullOrWhiteSpace( itemId ) )
    {
        ShowDetail( "CategoryId", int.Parse( itemId ) );
    }
    else
    {
        pnlDetails.Visible = false;
    }
}
```

## Block Attributes

The Rock framework gives you an amazingly easy way to keep custom configuration settings for each Block. This feature lets you develop Blocks that are flexible, generic and configurable. We call these Block Attributes.

When a Block class is decorated with one or more Rock.Attribute field attributes, administrators can set values for each instance of the Block. (And thankfully Rock automatically builds the admin UI for setting the values.)

For example, let's say you were creating a block to cache some data and wanted to let the administrator decide how many minutes to keep it cached. Just add an IntegerField attribute above your block class declaration:

```
using Rock.Attribute;
[IntegerField( "Cache Duration", "Number of seconds to cache the content.", false, 0 )]
public partial class HtmlContent : RockBlock
{
    // ...
```

**Rock's Framework UI allows admins to configure block attributes**

![](https://rockrms.blob.core.windows.net/documentation/Books/16/1.1.0/images/block-properties-example.png)

And in your code, use the `GetAttributeValue( attributeName )` method to get the configured value.

```
int duration = Convert.ToInt32( GetAttributeValue( "CacheDuration") );
```

Notice how the key, CacheDuration, is simply the *name* specified in the attribution declaration with the spaces removed? This is a convention in Rock.

There are more than 30 different types of Block Attributes to get values such as booleans, campuses, dates, groups, memo and text fields – to name a few.

Note

You can learn much more about Block Attributes and get a full list of each available type in the Block Attributes reference guide (coming soon).

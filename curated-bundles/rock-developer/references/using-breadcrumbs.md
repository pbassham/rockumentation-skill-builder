---
description: Use when implementing custom breadcrumb navigation trails in Rock blocks or controlling breadcrumb display settings on pages
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Rock has a breadcrumb system which understands the normal parent-child page hierarchy and renders navigation breadcrumbs as you'd expect. You can also control the breadcrumb trail and extend it further as your data/model requires.

For example, consider the case of the Content Channel Item View block (Tools \> Content \> External Website Ads). As you click on one of the sample items, you'll notice that the last item in the breadcrumb trail changes to the name (title) of the item you clicked.

**A block with Breadcrumbs**

![](https://community.rockrms.com/GetImage.ashx?Id=67445)

1\. **Breadcrumb -** Shows a custom breadcrumb that includes the name of the content channel item being edited.

This is possible by overriding the `GetBreadCrumbs( PageReference pageReference )` method in your block.

## Override GetBreadCrumbs

Your `GetBreadCrumbs()` implementation will use the given page reference to get the id of the item in question, use that id to get that item's title, and then add a `new BreadCrumb()` onto a list of breadcrumbs that is returned to the caller.

You can see this happening in the ContentChannelItemView block:

```
public override List<breadcrumb> GetBreadCrumbs( PageReference pageReference )
{
    var breadCrumbs = new List<breadcrumb>();
    int? contentItemId = PageParameter( pageReference, "contentItemId" ).AsIntegerOrNull();
    if ( contentItemId != null )
    {
        ContentChannelItem contentItem = new ContentChannelItemService( new RockContext() ).Get( contentItemId.Value );
        if ( contentItem != null )
        {
            breadCrumbs.Add( new BreadCrumb( contentItem.Title, pageReference ) );
        }
        else
        {
            breadCrumbs.Add( new BreadCrumb( "New Content Item", pageReference ) );
        }
    }
    else
    {
        // don't show a breadcrumb if we don't have a pageparam to work with
    }
    return breadCrumbs;
}
```

## Controlling Page Breadcrumbs Display Settings

Breadcrumbs can be disabled on a page and you can also control other aspects of the breadcrumbs under the Page Properties \> Display Settings.

**Controlling Breadcrumbs via Page Properties**

![Controlling Breadcrumbs via Page Properties](https://rockrms.blob.core.windows.net/documentation/Books/16/1.1.0/images/breadcrumbs-page-properties.png)

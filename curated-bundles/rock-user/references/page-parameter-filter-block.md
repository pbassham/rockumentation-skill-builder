---
description: "Use when configuring a Page Parameter Filter block to add filters, set up block settings, or create URL parameters based on user selections"
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > Page Parameter Filter Block

Page Parameter Filter Block

The Page Parameter Filter block is an easy way to add some powerful functionality to your pages. In short, it works by adding page parameters to a URL according to selections made within the block itself. For instance, if the block is used to select a Connection Opportunity, then the URL will be updated with a page parameter that holds the GUID of the selected Opportunity. With the GUID present in the URL, it can now be referenced by other blocks or features.

# Configure Block Settings

When the block is first added to a page it won't have any functionality until it's configured. The block settings you'll use to do this are described below.

![Page Parameter Filter - Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/page-parameter-filter-block-settings-v18.png)

Page Parameter Filter - Block Settings

# Adding and Using Filters

If you've ever added an attribute to a person, group or other entity, then you're already familiar with adding filters to this block. As pictured below, these filters use many of the same fields as attributes.

![Page Parameter Filter - Create New Filter](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/page-parameter-filter-block-create-new-filter-v18.png)

Page Parameter Filter - Create New Filter

The *Key* value you choose for the filter will appear as the name of the parameter in the URL after the filter is applied. You'll need to reference this value later, so try to pick something unique and descriptive.

In the example pictured above we've added a filter with a field type of "Connection Opportunity". As a result, a person accessing the page will be prompted to select a specific opportunity. We're only using a single filter here, but you can add as many filters as you need. Each filter functions independently from the others, so you can use a variety of different field types.

![Page Parameter Filter - Select Value](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/page-parameter-filter-block-select-value-v18.png)

Page Parameter Filter - Select Value

Now that a value has been selected the person should click the Filter button to apply it. Depending on your setup, the Filter button will do different things. It might redirect the person to a new page, or it could cause data to change in another block on the same page. In any case, it will update the URL with the filter's *Key* and the value of the person's selection.

Using our connection opportunity example, you can see below how the *Key* ("ConnOpp") and the GUID (of the "Greeter" opportunity) have been added to the URL.


Before:
https://rocksolidchurchdemo.com/page/123

After:
https://rocksolidchurchdemo.com/page/123?ConnOpp=6A7935B2-A97D-4F9D-82B3-4F835533325F

If you configured the block to redirect people to a different page, then the filter information will be appended to the URL of the target page in the same way. This can be very useful if the target page has a block that expects this information to already be in the URL, which won't happen until after the person clicks the Filter button.

## Page Parameters and Lava

When combined with Lava, this block becomes a powerful tool that can be used in a variety of ways. All you need to do is add `{{ 'Global' | PageParameter:'ConnOpp' }}` to a workflow, report or anywhere else Lava is used. Just replace "ConnOpp" with the *Key* for your filter, and the doors are open.

Some blocks, like the HTML Content block, will need to have the RockEntity command enabled for this Lava to work. Pictured below is a basic example of an HTML block using the GUID of a connection opportunity to display the number of requests in the opportunity.

![Page Parameter Filter - Use in HTML](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/page-parameter-filter-html-example-v18.png)

Page Parameter Filter - Use in HTML

See our [Lava](https://community.rockrms.com/lava/) documentation for more information.


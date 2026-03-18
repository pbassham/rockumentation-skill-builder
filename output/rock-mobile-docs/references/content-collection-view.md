> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Content Collection View

# Content Collection View

*Universally search across multiple different content sources, with filter and sort options.*

Mv6.0 C v16.5 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

Warning

Content Collections use Universal Search and indexing, which means they do not support entity security.

This Content Collection View block is designed to bring your content collections to life. It offers powerful search and filtering tools that work across all items in your collection, delivering results at incredibly fast speeds. Learn more about Rock's Content Collection feature here in the manual:

[Content Collection View Documentation](https://community.rockrms.com/Rock/BookContent/14#contentcollectionview)

## Bindings

| Name | Type | Description |
| --- | --- | --- |
| IsLastItem | bool | This is true when outputting the last item in the filtered results. It is useful for skipping the divider beneath the final result at the bottom. |

```
<Rock:Divider IsVisible="{Binding IsLastItem, Converter={Rock:InverseBooleanConverter}}" />
```

## Parameters

| Key | Type | Description |
| --- | --- | --- |
| AutoFocus | bool | Determines if the keyboard should open automatically on page load. |

## Settings

| Name | Description |
| --- | --- |
| Content Collection |   The [content collection](https://community.rockrms.com/documentation/BookContent/14/#contentcollections) to search across.   |
| Show Filters | Whether or not the filters should be displayed as an option for this block. |
| Show Full-Text Search | Whether the search field should be enabled for this block. If disabled, enabling Search On Load or passing in a pre-defined search term is advised. |
| Show Sort | Whether or not the sort options should be enabled. |
| Number Of Results | The number of results to load with each search. This block searches as the page is scrolled, so this will be the number of results returned per each load. |
| Search On Load | If enabled, the block will search upon load. |
| Group Results by Source | Whether or not the results returned should be grouped by the content source. You can customize the header of each group by modifying the Group Header Template. |
| Enabled Sort Orders | The options for sort to provide for the block. |
| Trending Term | The term to use for the "Trending" sort option. |
| Filters | This section allows you to customize filters based on the selected Content Collection configuration. |
| Group Header Template | The lava template to use to render the group headers. This will display above each content collection source. Only useful if Group Results By Source is enabled. |
| Item Template | The XAML template to display for each item. The operation of loading XAML for long lists is expensive, so take caution to follow best layout practices. |
| Pre-Search Template | The template to display before someone has searched once. |
| Boost Matching Segments | Determines if the matching personalization segments should receive a boost. |
| Boost Matching Request Filters | Determines if the matching personalization request filters should receive a boost. |
| Segment Boost Amount | The amount of boost to apply to matches on personalization. |
| Request Filter Boost Amount | The amount of boost to apply to matches on personalization. |

## Styling

![](https://community.rockrms.com/GetImage.ashx?Id=67621)

![](https://community.rockrms.com/GetImage.ashx?Id=67622)

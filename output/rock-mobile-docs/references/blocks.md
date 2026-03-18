> **Path:** Mobile Docs > 🧱 Essentials > Blocks

# Blocks

Rock Mobile uses blocks the same way as Rock Web does. You create pages, add blocks to them, and configure them. Then when you deploy your app all that information will get bundled up so the mobile app knows how to communicate with your site.

Important

Note that Page and Block security only works for Roles, not individual User accounts.

Many blocks are self-explanatory, though we're not saying they don't need some documentation too. We'll continue adding some helpful hints about all the blocks, such as what is available in Lava merges and what-not.

If there is missing or unclear documentation, please feel free to file a documentation request on our [issues board](https://github.com/SparkDevNetwork/Rock.Mobile-Issues).

## Integrated Scroll

Some blocks will have built-in scrolling mechanics. This means that the [Zone](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/zone) in which the block resides should not be placed within any sort of layout that provides scrolling (such as `ScrollView`). These blocks will have a special badge in the documentation, that looks like this:

Integrated Scroll

## Mark a block to expand vertically

MV6.0

In some cases, you may want a block to stretch to the full height of the zone (in 99% of cases, this entails the entire screen). In Xamarin, this was achieved by the use of a now-deprecated `FillAndExpand` property.

In MAUI, this is achieved through the use of an attached property. **Within the block, you want to expand** add a `Rock:Zone.Expands="true"` property on the outermost layout.

![](https://community.rockrms.com/GetImage.ashx?Id=66816)

Currently, for other block types (blocks with the Integrated Scroll tag), we have an internal flag that gets set to mark a block to expand.

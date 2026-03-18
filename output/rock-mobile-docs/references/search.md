> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Core > Search

# Search

*Performs a search using one of the configured search components and displays the results.*

M v3.0

## Getting Started

A little bit of forewarning for when jumping into this block is that it has been pre-configured to function with the 'Person Name' search component. If you plan to change the component type, a decent understanding of XAML will have to be incorporated into the Result Item Template to use the ItemType.

The good news is that if that *is* the intended functionality, it works right out of the box, as long as you set the Search Component to `Person Name`.

## Settings

| Setting | Description |
| --- | --- |
| Search Component |   The search component to use when performing searches. This item is passed into the template as the Item and ItemType merge fields.   |
| Show Search Label | Determines if the input label for the search box should be displayed. |
| Search Label Text | The text within the search label. Note that if Show Search Label is set to No, this setting will be irrelevant. |
| Search Placeholder Text | The placeholder text within the search box. |
| Results Separator Content | Content to display between the search input and the results. This content will show with the display of the results. |
| Result Item Template | Content to display for each result item. The entity found in the search is passed in as the Item. |
| Historical Result Item Template M v5.0 | Content to display for each historical result item. Merge fields are populated by the parameters in the AppendToSearchHistory command.   |
| Detail Navigation Action | The navigation action to perform when an item is tapped. The GUID of the item will be passed as the entity name and GUID, such as PersonGuid=value. |
| Auto Focus Keyboard M v4.0 | When enabled, will auto focus someone into the search field when the page is attached. |
| Stopped Typing Behavior Threshold M v5.0 | The amount of time in milliseconds for the user to stop typing to perform an auto-search. (0 to disable). |

## Styles

Since this is a XAML template, there’s no styling X-Ray available.

| Class | Type |
| --- | --- |
| search-layout | Grid |
| search-frame | Frame |
| search-field-layout | Grid |
| search-icon | [Icon](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/icon) |
| results-header | ContentView |
| search-loading-indicator | [Activity Indicator](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/activity-indicator) |
| loading-more | [Activity Indicator](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/activity-indicator) |
| results-collection-layout | Grid |
| results-layout-inner | CollectionView |
| results-layout | Frame |
| results-layout-inner | StackLayout |

## Utilizing Search History M v5.0C v15.0

You can utilize certain block settings to display a 'recently searched for' view that displays when the search field is empty. This is done through a combination of a few things, with the first being the `AppendToSearchHistory` command. This command is available on the Result Item Template. This command saves specific information about the entity to the shell.

```
<StackLayout.GestureRecognizers>
    <TapGestureRecognizer Command="{Binding AppendSearchHistory}">
        <TapGestureRecognizer.CommandParameter>
            <!-- We should pass in the Guid (of the entity that we are saving)-->
            <Rock:AppendToSearchHistoryParameters Guid="{{ Item.Guid }}">
                <!-- These are parameters that become available as merge fields 
                to the Historical Result Item Template -->
                <Rock:Parameter Name="Name" Value="{{ itemName }}" />
            </Rock:AppendToSearchHistoryParameters>
        </TapGestureRecognizer.CommandParameter>
    </TapGestureRecognizer>
</StackLayout.GestureRecognizers>
```

These items then utilize the `Historical Result Item Template`, so you can save any related entity information to have full customization over your recent searches.

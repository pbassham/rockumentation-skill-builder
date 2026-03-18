> **Path:** Mobile Docs > 🧱 Essentials > Performance

# Performance

As you get comfortable with XAML you'll start to see the power of what you can achieve. With this power comes the responsibility to understand the performance implications of your actions. Each view (Grids, StackLayouts, Labels, etc.) adds overhead to the page as it is rendered. You'll want to make sure you limit how many views you add.

## Layouts

The most important aspect of layout-level optimization is knowing when you should be using which layout. As a XAML developer, you should be aware of how each of these layouts work and what the drawbacks are of using each of them.

![](https://community.rockrms.com/GetImage.ashx?Id=67211)

-   **Don't** set the VerticalOptions and HorizontalOptions properties of a layout unless required. The default values of LayoutOptions.Fill and LayoutOptions.FillAndExpand allow for the best layout optimization. Changing these properties has a cost and consumes memory, even when setting them to the default values.
-   **Avoid** deeply nested layout hierarchies. Use AbsoluteLayout or Grid to help reduce nesting.
-   **Prefer** animating views with the TranslationX and TranslationY properties as this avoids the need for layout.
-   **Bypass** transparency — if you can achieve the same (or close enough) effect with full opacity, do so.

### StackLayout

[Link](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/stacklayout)

-   **Don't** use a StackLayout to host a single child. Instead, use the ContentView layout.
-   **Don't** use multiple StackLayouts when a Grid suffices.
-   **Don't** use multiple StackLayouts to simulate a Grid.
-   **Don't** use a StackLayout inside a ScrollView to simulate a ListView.
-   **Don't** set more than one child to LayoutOptions.Expands. This property ensures that the specified child will occupy the largest space that the StackLayout can give to it, and it is wasteful to perform these calculations more than once.

### AbsoluteLayout

[Link](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/stacklayout)

-   **Avoid** using the AbsoluteLayout.AutoSize property whenever possible.

### RelativeLayout

[Link](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/relativelayout)

-   Avoid using a RelativeLayout whenever possible. It will result in the CPU having to perform significantly more work.

### Grid

[Link](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/grid)

-   **Don't** use a Grid when a StackLayout suffices.
-   **Prefer** star-sized columns/rows rather than auto-sized.
-   **Do** use a Grid to achieve layering.

You should use a Grid control instead of nested StackLayouts when you need to create a more complex layout with multiple rows and columns. The Grid control provides a more efficient way to define layouts that have a complex grid structure, with items aligned in both rows and columns.

Using nested StackLayouts can be a viable option for simple layouts with only a few items, but it can become cumbersome and inefficient when the layout gets more complex. For example, if you need to align items in both rows and columns or span items across multiple rows or columns, it can be difficult to achieve this with nested StackLayouts.

As for the performance impact, using a Grid control is generally more efficient than using nested StackLayouts for complex layouts. This is because the Grid control uses a more optimized layout algorithm that is specifically designed for aligning items in both rows and columns. In contrast, using nested StackLayouts can result in more complex layout calculations, which can be slower and more resource-intensive. However, for simple layouts with only a few items, the performance impact of using nested StackLayouts versus a Grid control is likely to be negligible.

## Display Collections

### ListView

[https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/listview/](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/listview/)

-   **Avoid** including a ListView inside a ScrollView as it's a very bad practice. Use the ListView's Header and Footer properties instead.
-   **Don't** use TableView where you can use a ListView. TableViews are usually recommended for a setting like UI.
-   **Do** use DataTemplate selectors to facilitate heterogeneous views within a single ListView. Don’t override OnBindingContextChanged to update and achieve the same effect.
-   **Avoid** passing IEnumerable as a data source to ListViews. Instead, try to use IList, because IEnumerable collections don't support random access.
-   **Use** groups within a single ListView. Nesting ListViews is explicitly unsupported and will break your application.
-   **Do** use HasUnevenRows where your ListView has rows of differing sizes.
-   **Avoid** specific LayoutOptions other than Fill (Fill is the cheapest to compute).

Controls ^^^

### Images

[https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/images?tabs=windows](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/images?tabs=windows)

-   Images on Android do not downsample. Always remember this as it’s one of the reasons your app runs out of memory.
-   Set Image.IsOpaque to true if possible.
-   Load images from Content instead of Resources.

### Labels

[https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/text/label](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/text/label)

-   **Don't** use multiple Labels when one will do (using spans with FormattedText if necessary).
-   **Do** disable Label wrapping if possible (LineBreakMode="NoWrap").
-   **Don't** set the Label.VerticalTextAlignment property unless required.
-   **Don't** update any Label instances more frequently than required, as the change of size of the label can result in the entire screen layout being re-calculated.
-   **Prefer** the VerticalTextAlignment and HorizontalTextAlignment properties of Label over VerticalOptions and HorizontalOptions.
-   **Avoid** sporadic updates to Labels. If the updates are to multiple Labels, update as a batch if possible.

### Additional Resources

1.  Improve Xamarin.Forms Performance
2.  Layout Compression
3.  Jason Smith's Xamarin Forms Performance Tips
4.  Techniques for Improving Performance in a Xamarin.Forms Application

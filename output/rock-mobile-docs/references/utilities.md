> **Path:** Mobile Docs > 🎨 Styling > Style Guide > Utilities

# Utilities

Leverage built-in CSS classes to powerfully style your application.

## Margin & Padding

Applies to: [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view?view=xamarin-forms)

Many elements inherit from [View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view?view=xamarin-forms) and therefore can have margin and padding applied to them. Below are the utility classes for adding margins to your views.

The format for specifying margins is `.m{sides}-{size}` and similarly for padding is `.p{sides}-{size}`.

Where the sizes are represented as:

-   `t` - top
-   `b` - bottom
-   `l` - left
-   `r` - right
-   `x` - left and right
-   `y` - top and bottom
-   blank for all

And the size is one of the following:

-   0
-   4
-   8
-   12
-   16
-   24
-   48
-   80

### Examples

This would produce a margin of 16 on all sides.

```
<Label StyleClass="m-16" Text="Lots of trouble. Lots of bubble." />
```

This would produce a margin and padding of 16 on all sides.

```
<Rock:StyledBorder StyleClass="p-16, m-16">
    <Label Text="Lots of trouble. Lots of bubble." />
</Rock:StyledBorder>
```

This would produce a margin of 8 on top.

```
<Label StyleClass="mt-8" Text="Lots of trouble. Lots of bubble." />
```

## Opacity

Applies to: [VisualElement](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.visualelement?view=xamarin-forms)

You can apply the following classes to change to opacity of an element.

| Class | Properties |
| --- | --- |
| .o-0 | opacity: 0; (invisible) |
| .o-10 | opacity: .1; |
| .o-20 | opacity: .2; |
| .o-30 | opacity: .3; |
| .o-40 | opacity: .4; |
| .o-50 | opacity: .5; |
| .o-60 | opacity: .6; |
| .o-70 | opacity: .7; |
| .o-80 | opacity: .8; |
| .o-90 | opacity: .9; |

## Visibility

Applies to [VisualElement](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.visualelement?view=xamarin-forms)

The following classes can be used to show/hide an element.

| Class | Property | Notes |
| --- | --- | --- |
| .visible | visibility: visible; | Display the element. |
| .invisible | visibility: hidden; | Do not display the element, but reserve space for the element in layout. |
| .collapse | visibility: collapse; | Do not display the element, and do not reserve space for it in layout. |

## Spacing

Applies to StackLayout

The format for specifying spacing is `.spacing-{value}`.

Where the values are represented as:

-   0
-   4
-   8
-   12
-   16
-   24
-   48
-   80

#### Examples

```
<StackLayout StyleClass="spacing-8">
    <Label Text="Hello!" />
    <Label Text="Utility classes are so awesome possum." />
</StackLayout>
```

## Grid Spacing

Applies to Grid and Responsive Layout

-   The format for specifying row spacing is
-   The format for specifying column spacing is
-   To apply row and column spacing, the format is

**Examples**

Adds a row gap to the grid.

```
<Grid StyleClass="gap-row-8"
    RowDefinitions="Auto, Auto">
    <Label Text="Hello!" />
    <Label Grid.Row="1" Text="Utility classes are so awesome possum." />
</StackLayout>
```

Adds a column gap to the grid.

```
<Grid StyleClass="gap-col-4"
    Column="Auto, Auto">
    <Label Text="Hello!" />
    <Label Grid.Column="1" Text="Utility classes are so awesome possum." />
</StackLayout>
```

## Border Width

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [ImageButton](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.imagebutton?view=xamarin-forms), StyledBorder

The following border width classes are provided to help with styling buttons.

| Class |
| --- |
| .border-0 |
| .border-1 |
| .border-2 |
| .border-3 |
| .border-4 |
| .border-5 |

## Border Radius

Applies to: [BoxView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.boxview?view=xamarin-forms), [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame?view=xamarin-forms), [ImageButton](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.imagebutton?view=xamarin-forms), StyledBorder

The following classes are provided to adjust the radius of borders.

| Class | Property |
| --- | --- |
| .rounded-sm | border-radius: 4; |
| .rounded | border-radius: 8; |
| .rounded-lg | border-radius: 16; |
| .rounded-full | border-radius: 1000; (not recommended on iOS) |

## Targeting Device Platforms

If you need to target styling to a specific platform (iOS or Android) you can use the parent classes `.ios` or `.android`.

```
.ios .heading1 {
    font-size: 33; 
}
```

Note

You can also target specific platforms in XAML with an [On Device Platform](https://community.rockrms.com/developer/mobile-docs/essentials/controls/xaml-extensions/on-device-platform) extension.  

## Targeting Device Types

Similar to platforms you can also target device types with `.phone` or `.tablet`.

```
.phone .heading1 {
    font-size: 33;
}
```

## Targeting Pages

When configuring a page you can provide a CSS class you would like to add to the page. This will allow you to scope the styling of elements on that page.

```
.page-aboutus .heading1 {
    font-size: 33;
}
```

## Targeting Blocks

Each Rock mobile block has a CSS class assigned to it. This allows you to target the visual elements within a specific block. The pattern to use is `.block-[block type name lowercase]`. For example, the calendar block would be `.block-calendarview`.

```
.block-calendarview .heading1 {
    font-size: 33;
}
```

## Text Shadow

This property allows you to add a shadow to Labels. The syntax looks like this:

`-rock-text-shadow: [distanceX] [distanceY] [blurRadius] [color]`

**Example**:

```
.hero .hero-title {
    font-size: 24;
    color: white;
    -rock-text-shadow: 2 2 4 black;
}
```

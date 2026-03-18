> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Items Collection

# Items Collection

*Display a highly performant list of views powered by JSON data and an item template.*

M v6.0

Inherits from [Sharpnado.CollectionView](https://github.com/roubachof/Sharpnado.CollectionView/tree/main)

### About

At some point in your mobile development career... there will come a point in which you need to display a list of items, either horizontally or vertically. These items will all look the same and be powered from a singular data source (likely a [Lava entity command](https://community.rockrms.com/lava/commands/entity-commands)).

Like most, your first attempt will likely look something like this:

```
<ScrollView> <!-- Usually in the layout, but I moved here for demo -->
    <StackLayout>
        {% for item in items %}
            <StackLayout>
                <Label Text="{{ item.Name }}" />
                <Label Text="{{ item | Attribute:'FavoriteColor' }}" />
            </StackLayout>
        {% endfor %}
    </StackLayout>
</ScrollView>
```

And who knows, maybe that is enough to get the job done and call it a day... Or maybe it isn't.

You may realize pretty quickly that with a lot of items, the performance starts to deteriorate. Most layouts simply aren't built to handle that many items generated in the form of raw XAML. If you've been in the game a while, you may have experimented with [CollectionView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/collectionview/?view=net-maui-8.0) or [CarouselView](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/carouselview/), which are performant alternatives. The ItemsCollection (this) control is a friendlier, viable and stable alternative to both of those controls.

This control requires an item height (or width). This plays a big factor with performance. If you need a list with differently sized items, take a look at one of the alternatives listed above.

### Properties

| Property Name | Type | Description |
| --- | --- | --- |
| CollectionLayout | [CollectionViewLayout](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/items-collection#collection-view-layout) | Layout of the collection view. |
| ItemsSource | IEnumerable | The source of items for the collection view. |
| ItemTemplate | DataTemplate | Template for items within the collection view. |
| ItemHeight | double | Height of each item in the collection view. |
| ItemWidth | double | Width of each item in the collection view. |
| CollectionPadding | Thickness | Padding around the collection view. |
| ItemSpacing | int | Spacing between items in the collection view. |
| TapCommand | ICommand | Command triggered on tap. |
| ScrollBeganCommand | ICommand | Command triggered when scrolling begins. |
| ScrollEndedCommand | ICommand | Command triggered when scrolling ends. |
| ScrollingLeftCommand | ICommand | Command triggered when scrolling left. |
| ScrollingUpCommand | ICommand | Command triggered when scrolling up. |
| ScrollingRightCommand | ICommand | Command triggered when scrolling right. |
| ScrollingDownCommand | ICommand | Command triggered when scrolling down. |
| DisableScroll | bool | Disables scrolling within the collection view. |

#### Collection View Layout

|   
 | **Description** |
| --- | --- |
| Horizontal | A horizontal layout. |
| Grid | A grid layout. |
| Carousel | A carousel layout. |
| Vertical | A vertical layout. |

### Usage

Let's get into the business... how can we display long lists (horizontally OR vertically) without killing performance and maintaining a smooth scroll experience? The answer can be achieved with four simple steps.

1.  Define your data source as JSON
2.  Bring your JSON into memory
3.  Create a single item template
4.  Set up your Items Collection container

#### Examples

Note

Make sure to use Rock:ViewCell as the base of your template. This control has some special logic to make sure the views are properly dark mode responsive.  

```
//- Load our JSON data from an entity command.
{%- capture people -%}
  [
    {%- person where:'LastName == "Decker"' -%}
    {
      "name": "{{ person.FirstName }} {{ person.LastName }}",
      "campus": "{{ person.Campus }}",
    }{%- unless forloop.last -%},{%- endunless -%}
    {%- endperson -%}
  ]
{%- endcapture -%}

<Grid>
    <Grid.Resources>
        //- Bring the JSON into memory.
        <Rock:FromJson x:Key="People">{{ people }}</Rock:FromJson>

        //- Define the item template for the list.
        <DataTemplate x:Key="PersonItem">
            <Rock:ItemViewCell>
                <Border StrokeShape="RoundRectangle 12"
                        StyleClass="px-16">
                    <Label Text="{Binding name}"
                           StyleClass="title2, text-interface-stronger"
                           VerticalTextAlignment="Center" />
                </Border>    
            </Rock:ItemViewCell>
        </DataTemplate>
    </Grid.Resources>

    //- List the items, with the in memory items.
    <Rock:ItemsCollection ItemHeight="75"
                          ItemSpacing="8"
                          CollectionPadding="16"
                          ItemsSource="{StaticResource People}"
                          ItemTemplate="{StaticResource PersonItem}">
    </Rock:ItemsCollection>
</Grid>
```

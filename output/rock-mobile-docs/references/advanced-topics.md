> **Path:** Mobile Docs > 🧱 Essentials > Advanced Topics

# Advanced Topics

## Static Resources - Dynamic JSON

When working with different DataViews you have the ability to create a ItemSource directly within the page your DataView lives on. In order to create a consumable object, you’ll want to create a JSON object from your dynamic content, such as a Content Channel. Since you are creating the JSON object structure directly, there is not need to use the | TOJSON command on the item within the Rock:Command. You will however still need the | XamlWrap command.

```
{% contentchannelitem where:'ContentChannelId == 21 && StartDateTime <= "{{ 'Now' | Date }}"' sort:'StartDateTime desc' securityenabled:'false' %}

{% assign closeCurly = '}' -%}
{%- capture seriesJSON -%}
    [
        {%- for item in contentchannelitemItems -%}
        {
            "Id": {{ item.Id | ToJSON }},
            "Title": {{ item.Title | ToJSON }},
            "Summary": {{ item | Attribute:'Summary' | ToJSON }},
            "ImageId": {{ item | Attribute:'SeriesImage','RawValue' | ToJSON }},
            "MessageCount": {{ item.ChildItems | Size | ToJSON }}
        {% if forloop.last %}{{ closeCurly -}}{% else %}{{ closeCurly | Append:', ' -}}{%- endif -%}
        {%- endfor -%}
    ]
{%- endcapture -%}

{% endcontentchannelitem %}
<StackLayout.Resources>
    <Rock:FromJson x:Key="Series">
        {}{{ seriesJSON | XamlWrap }}
    </Rock:FromJson>
</StackLayout.Resources>
```

This must be placed on the page ABOVE the View where you need to consume it. Then you’ll be able to access it as a StaticResource.

```
<CarouselView ItemsSource="{StaticResource Series}">
```

From here you would just simply Bind the Key in the item where you would like the data to show.

```
<Label
    StyleClass="heading1"   
    VerticalTextAlignment="Center"
    Text="{Binding Title}" />
```

## Static Resources - DataTemplate

In addition to Dynamic JSON data, it is possible to create a DataTemplate that can be consumed in multiple areas of your layout by defining it as a Static Resource somewhere on the page ABOVE the area where you need to use it.

```
<StackLayout.Resources>
<DataTemplate x:Key="CarouselTemplate"
    <StackLayout WidthRequest="180">
        <Grid>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="2*"/>
                <ColumnDefinition Width="1*"/>
            </Grid.ColumnDefinitions>
            <Grid.RowDefinitions>
                <RowDefinition Height="Auto"/>
                <RowDefinition Height="Auto"/>
            </Grid.RowDefinitions>
            <Rock:StyledView
                CornerRadius="15"
                HasShadow="True"
                Elevation="1"
                Padding="0"
                Grid.Row="0"
                Grid.Column="0"
                Grid.ColumnSpan="2"
                IsClippedToBounds="True">
                <Rock:Image MarginBottom="-64" HeightRequest="220" Source="{Binding ImageId, StringFormat='{{ 'Global' | Attribute:'PublicApplicationRoot' }}/GetImage.ashx?Guid={0}'}" Aspect="AspectFill" VerticalOptions="CenterAndExpand"/>
            </Rock:StyledView>
            <Label Text="{Binding Title}" Grid.Row="1" Grid.Column="0" StyleClass="heading4, leading-none, text-bold"/>
            <Label Text="Jan '20" MarginTop="3" HorizontalTextAlignment="Right" Grid.Row="1" Grid.Column="1" StyleClass="heading4, leading-none"/>
        </Grid>
    </StackLayout>
</DataTemplate>
</StackLayout.Resources>
```

Once this has been defined, it can then be consumed as an ItemTemplate by a View, or multiple Views. Again, this must be declared higher up the page than any Views which will be using it on page.

```
<CarouselView
    ItemsSource="{StaticResource Series}"
    ItemTemplate="{StaticResource CarouselTemplate}"
    HeightRequest="250"
    PeekAreaInsets="20,0,40,0">
```

## Dates and Times

Dates and Times and Zones, oh my! In the Rock Web world, life was simpler. We only had one time zone to worry about. The time zone of the organization. That was it. Now with mobile we have devices from all over the world, each in a different time zone. Why is this an issue in Mobile when it was fine in Web? Because we are now sending dates and times over the wire to be parsed and processed on the Mobile shell itself.

So how do we handle this? Well, the goal is that all dates and times will be in the device's local timezone internally. Meaning, when you process something in Lava you should be able to expect that its in the device's time zone.

For example, lets suppose the Rock Organization Time Zone is set to Eastern (-0400) but you and your phone are in Pacific (-0700). You are looking at an event detail page that is being processed on the Mobile Shell. Rock has this event scheduled for 5/3/2021 at 7pm. The lava object on the Shell will say it is on 5/3/2021 at 4pm.

Why did we do it this way? Because the underlying libraries we are using for API communication automatically convert the date and time into the local device time zone. In other words, we didn't really have a lot of choice without making some pretty invasive changes to the library.

Now, sometimes this is what you want. For example, if your app is showing the start time for your live streaming service on a mobile phone, it might make sense to show the time in their time zone. But what if you are showing the time of a physical event that will be happening on your campus? In that case it probably makes more sense to show the time in the time zone the event is happening in. To help you deal with that we added a new lava filter called `ToOrganizationTime`. This will convert the passed date and time into your organizations defined time zone.

As we said, the goal is for all dates and times to be relative to the mobile shell's time zone. We may have missed some spots. There is a lot going on there, especially since we actually have three time zones to deal with (the physical IIS server time zone, the Rock Organization time zone, and the mobile application's time zone). As we find stuff we have missed we'll work on getting it corrected.

Important

Remember that everything we just mentioned only applies to Mobile Shell side Lava processing. If you are running your Lava server side then it is already in your organization's time zone.

Note

TIP: When you are showing information in your organization's time zone you might consider including the time zone designation (example "Eastern") after the time. Especially if you are expecting people from different time zones to be using your application. So if you are a church that lives right on the edge of a time zone, consider including time zone designations to help people out!

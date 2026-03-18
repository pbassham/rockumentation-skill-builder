> **Path:** Mobile Docs > 🧱 Essentials > Tips and Tricks > Custom Site Attributes

# Custom Site Attributes

C v16.8

### Overview

Ever wanted to add a custom attribute to your mobile application that you can access and utilize in your XAML? Look no further! As of Rock v16.8, you can now configure custom entity attributes for your mobile site to utilize in any fashion you desire.

### Example Configuration

Navigate to `System Settings > Entity Attributes`

In the below example, we are configuring custom Start Gradient Color and End Gradient Color attributes to access in our mobile content.

![](https://community.rockrms.com/GetImage.ashx?Id=67213)

![](https://community.rockrms.com/GetImage.ashx?Id=67214)

In the Mobile Application Detail block, assign a value to your custom attribute—for this example, a hex color value:

![](https://community.rockrms.com/GetImage.ashx?Id=67215)

To access the attributes, use the following Lava syntax in a [Content](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/content) block:

```
{% site id:10 %}
    {% assign StartGradientColor = site | Attribute:'StartGradientColor' %}
    {% assign EndGradientColor = site | Attribute:'EndGradientColor' %}
{% endsite %}
```

Here's an example of using the custom attributes to create a gradient background:

```
<Border>     
    <Border.Background>
        <LinearGradientBrush  StartPoint="0,0" EndPoint="1,1">
            <GradientStop Color="{{ StartGradientColor }}" Offset="0"/>
            <GradientStop Color="{{ EndGradientColor }}" Offset="0.53"/>
        </LinearGradientBrush>
    </Border.Background>
    
    <Label Text="Rock"
       TextColor="White"
       FontSize="18"
       FontAttributes="Bold" />
</Border>
```

Important

Ensure that Rock Entity and Process Lava on Server are enabled for Lava code to function properly. For more information, Read more Content

The result:

Custom attributes, like the gradient color in this example, are just the beginning! They aren't limited to visual design—you can use them to personalize functionality, streamline workflows, or support complex data requirements.

![](https://community.rockrms.com/GetImage.ashx?Id=67216)

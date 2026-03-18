> **Path:** Mobile Docs > 🎨 Styling > Legacy > iOS Shadows

# iOS Shadows

There are two main ways to add shadows to your elements:

1.  [Frame](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/frame)
2.  [Rock:StyledView](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view)

Frame shadows are thick and don't have any configuration settings. The StyledView does have an `Elevation` property that can modify the intensity, but it's still quite limited. Here's a way to add flexible shadows to your elements on iOS.

Important

This shadow effect only works on iOS, meaning Android devices will have no shadow.

Using [this documentation](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/platform/ios/visualelement-drop-shadow) as a reference, here's how to set this up in Rock Mobile. First, you'll need to add an `xmlns` property to a parent element, in this example a StackLayout.

```
<StackLayout xmlns:ios="clr-namespace:Xamarin.Forms.PlatformConfiguration.iOSSpecific;assembly=Xamarin.Forms.Core"></StackLayout>
```

Let's say we want to add a [BoxView](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/boxview) within our content area. Here's how that might look:

```
<StackLayout xmlns:ios="clr-namespace:Xamarin.Forms.PlatformConfiguration.iOSSpecific;assembly=Xamarin.Forms.Core">
    <BoxView Color="Yellow"
        HeightRequest="256"
        WidthRequest="256"
        HorizontalOptions="Center"
        VerticalOptions="Center" />
</StackLayout>
```

Finally, let's add the drop shadow effect with some special properties:

```
<StackLayout xmlns:ios="clr-namespace:Xamarin.Forms.PlatformConfiguration.iOSSpecific;assembly=Xamarin.Forms.Core" >
    <BoxView Color="Yellow"
        HeightRequest="256"
        WidthRequest="256"
        HorizontalOptions="Center"
        VerticalOptions="Center"
        ios:VisualElement.IsShadowEnabled="true"
        ios:VisualElement.ShadowColor="Blue"
        ios:VisualElement.ShadowOpacity="0.75"
        ios:VisualElement.ShadowRadius="12" />
</StackLayout>
```

After loading the page, there should be a yellow square with a blue shadow on iOS, whereas Android will only show a yellow square. You can modify these four `VisualElement` values to tailor the shadow to your liking.

Important

You might try adding the `xmlns` to your Layout, but the shadow effect will only work on elements directly within your Layout and not your page. Unfortunately, you'll need to add this within every block that you want to use it in.

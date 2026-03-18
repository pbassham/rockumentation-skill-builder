> **Path:** Mobile Docs > 🧱 Essentials > Tips and Tricks > Migrating to .NET MAUI (V6)

# Migrating to .NET MAUI (V6)

A helpful guide to follow when upgrading your Rock Mobile Xamarin Forms application (V5 and lower) to .NET MAUI (V6 and later).

## What? Why?

In May of 2024, [Xamarin Forms](https://dotnet.microsoft.com/en-us/apps/xamarin/xamarin-forms), the foundation of Rock Mobile, will [lose support](https://dotnet.microsoft.com/en-us/platform/support/policy/xamarin) from Microsoft. This is why, in Rock Mobile V6, we will be upgrading the framework of our shell to be built on [.NET MAUI](https://dotnet.microsoft.com/en-us/apps/maui), which is the evolution of Xamarin Forms.

There are plenty of benefits to upgrading to .NET MAUI, but to highlight some major ones:

1.  Ongoing support (as stated above)
2.  Performance
3.  Access to the latest iOS/Android SDKs
4.  New features & controls
5.  Bug fixes for old controls

## Pre-caution

As with any new framework, there will be bugs to address. Lots of work has been put in up front to try to ensure this migration was as seamless as possible, but Rock Mobile has a ton of cool features, and it would be impossible for the mobile team to catch every edge case. The great news is, as you come across bugs/suspicions, the team is highly active in monitoring and fixing issues reported on our [issue board](https://github.com/SparkDevNetwork/Rock.Mobile-Issues/). Another great place to collaborate is the Rock Mobile channel on [Rocket Chat](https://community.rockrms.com/chat-intro).

## Migrating

Since .NET MAUI is built on the foundation of Xamarin Forms, most of the XAML written and pages designed should function similarly or the same. Still, there were some breaking changes in .NET MAUI that will inevitably have to be addressed in your Rock Mobile application. This guide should be your first stop when trying to figure out why something looks/behaves differently between Xamarin -> MAUI.

## Layout changes

There were some breaking changes made to a handful of the Xamarin layouts. First and foremost, the Microsoft team has released an [article](https://learn.microsoft.com/en-us/dotnet/maui/migration/layouts) on this exact topic. It is highly recommended to read what changed and why. It goes into much more depth than this article will. The biggest breaking change to address is the behavioral functionality of [StackLayout](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/layouts/stacklayout). The article mentioned above does a great job explaining the changes, but in short, for any sort of complex layout you should avoid StackLayout. If you are an `AndExpand` abuser (which our team has been guilty of plenty of times), a [Grid](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/layouts/grid) is your new best friend.

## Scrolling

Any layout with scrolling mechanics ( `ScrollView`/`CollectionView`/`ListView` etc. ) will not behave correctly if placed in any sort of `StackLayout`, no matter how nested. You should use `Grid` or an alternative.

## WidthRequest & HeightRequest

In .NET MAUI, if you set these values, they will pretty much always be respected. This is much different than Xamarin in which you could get very inconsistent results from setting these values.This has bitten our team a few times where we hard-coded a width or height, thinking that it was working correctly, but in reality the parent layout was calculating the size of the element. In MAUI, this made some things look incorrect.

## Xamarin Community Toolkit (XCT)

There were some cases stumbled across during testing in which the community toolkit is referenced directly in XAML. There is logic in the shell to update the package references correctly, but you need to ensure anything that you are utilizing from XCT is also available in the MAUI Community Toolkit.

## Gradient Brush Transparency

Setting a GradientStop color to `Transparent` worked as expected in Xamarin Forms, but you'll notice that MAUI has a default black color that shows when Transparent is used. To work around this, change the transparent color to the color you're trying to show with 0% opacity. You can use the prefix `#00` for hex codes ([see all](https://mobiledocs.rockrms.com/styling/colors#alpha-transparency-values)).

## Changes in Rock Mobile

To address the .NET MAUI changes, there have been updates made to the mobile shell.

## The Zone control

The [Zone](https://mobiledocs.rockrms.com/essentials/controls/developer-controls/zone), which is used in every single layout, has been updated with specialized behavior. This control was previously inherited from `StackLayout`, but for reasons stated above this control was migrated to a `Grid`, with some unique functionality. This means (if for some reason) you had a `Zone` with the `Orientation` set to `Horizontal`, that would break.Each block that goes in the `Zone` gets a unique row. This row is typically marked with a height of `Auto`, to mimic the old `Zone` behavior. There are some cases in which the height of the row is updated to `*`, which are as follows:

1.  Use of CollectionView/ListView/ScrollView
2.  The block is marked to expand internally
    1.  There are a handful of blocks that are meant to vertically expand. A few examples are login, onboarding, add communication, notes, etc.
3.  You mark a block to expand through [the new supported way.](https://community.rockrms.com/developer/mobile-docs/essentials/blocks#mark-a-block-to-expand-vertically)

## Sayonara, Frame, StyledView

The Xamarin Forms [Frame](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/frame) and Rock Mobile [StyledView](https://mobiledocs.rockrms.com/essentials/controls/content-controls/styled-view) will still exist but are deprecated and won't be supported heavily. The reason is due to the release of the [Border](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/border) control. The Border is a much better alternative than Frame, in terms of performance and features, and allows for pretty much anything that the `StyledView` could do.The `Frame` control has not been consistent for our team when testing .NET MAUI. To assist with that, you can use the new `StyledBorder` control, that works as a good intermediary when transitioning from Frame -> Border.

## Safe Area Padding

To further align with the MAUI paradigm, the `SafeAreaPaddingEffect` has been migrated to a `SafeAreaPaddingBehavior`.

The effect will still work, but all it does under the hood is add the behavior if it doesn't previously exist.

```
<ContentView>
    <ContentView.Behaviors>
        <Rock:SafeAreaPaddingBehavior />
    </ContentView.Behaviors>
</ContentView>
```

## Forcing a Shell Update

Users that haven't updated their shell version to MAUI will encounter an error if you'd added any new elements to a page. In the case where you need everyone to be running MAUI before accessing the app, you can add a `ShellVersion` check to the Homepage Routing Logic found under the Application tab > Edit > Advanced Settings. On this page you can add a message explaining that an update is required to continue.

```
//- Navigate to Shell Upgrade page if version is less than v6 (MAUI)
{% assign majorShellVersion = Device.ShellVersion | Slice:'0' | AsInteger %}
{% if majorShellVersion < 6 %}{{ myUpgradeMessagePageGuid }}{% endif %}
```

## Conclusion

The last point that will be made in terms of migration is that MAUI is much less forgiving with poorly structured XAML. General bad practices, such as nesting tons of layouts, negative margin or padding, etc., typically don't look exactly right. It might seem painful to re-write XAML, but keep in mind the light at the end of the tunnel is that it will likely be easier to read, more maintainable, more performant and fit into the correct paradigm.

Well, that is all! This article will be updated as we hit new stumbling points/discoveries. Good luck, and we all look forward to the day that every Rock Mobile app is surfing on the waves of .NET MAUI!

#### Useful Links

1.  Rock Mobile Issues Board
2.  Rock Mobile Rocket Chat Channel
3.  .NET MAUI Project
4.  Layout behavior changes from Xamarin.Forms

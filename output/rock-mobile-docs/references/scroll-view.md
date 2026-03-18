> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Scroll View

# Scroll View

M v13.5C v4.0

Inherits from [Xamarin.Forms.ScrollView](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/scrollview)

There are certain things on a ScrollView that you wish to customize further than what the default properties allow. This functions the same as a default ScrollView, with additional properties.

We encourage you to read and understand the built-in ScrollView first: [https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/scrollview](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/layouts/scrollview)

## Properties

| Property | Type | Description |
| --- | --- | --- |
| IsBounceEnabled | bool | On iOS, ScrollViews natively have a "bounce" that lets an individual scroll past the content, and then bounces it back. This property is a boolean offering a way to disable that native behavior. Defaults to True. |
| NoSafeArea | bool | On iOS, this removes any ContentAreaInset (safe area padding: [https://mobiledocs.rockrms.com/essentials/controls/effects/safe-area-padding-effect](https://mobiledocs.rockrms.com/essentials/controls/effects/safe-area-padding-effect)) from the ScrollView. |

## Example 

```
<Rock:ScrollView IsBounceEnabled="False">
    <StackLayout>
        <Label Text="This scroll view does not bounce when you scroll past it!" />
    </StackLayout>
</Rock:ScrollView>
```

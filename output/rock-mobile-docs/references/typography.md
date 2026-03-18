> **Path:** Mobile Docs > 🎨 Styling > Style Guide > Typography

# Typography

Understand how fonts and sizes are determined and utilizing in Rock Mobile.

## Fonts

The default font family for iOS is [SF Pro Display](https://developer.apple.com/fonts/) and the default for Android is [Roboto](https://fonts.google.com/specimen/Roboto). They are very similar in appearance, meaning you can style them identically without much visual differentiation.

Each platform has the option to specify additional weights through named font families.

### Android

The following system fonts can be referenced in CSS and XAML and will not affect iOS:

-   monospace
-   serif
-   sans-serif (or sansserif)
-   sans-serif-black (or sansserif-black)
-   sans-serif-condensed (or sansserif-condensed)
-   sans-serif-condensed-light (or sansserif-condensed-light)
-   sans-serif-light (or sansserif-light)
-   sans-serif-medium (or sansserif-medium)

```
<Label Text="Welcome" FontFamily="sans-serif-medium" />
```

```
.font-weight-medium { font-family: sans-serif-medium; }
```

[**Fonts in .NET MAUI - .NET MAUI**](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/fonts?view=net-maui-9.0#consume-fonts)

### iOS

The following system fonts can be referenced in CSS and XAML:

-   .SFUI-Light (also affects Android)
-   .SFUI-SemiBold
-   .SFUI-Bold
-   .SFUI-Heavy
-   .SFUI-Black (also affects Android)

```
<Label Text="Welcome" FontFamily=".SFUI-SemiBold" />
```

```
.font-weight-semi-bold { font-family: .SFUI-SemiBold; }
```

### Cross-Platform

Because each OS has a unique reference for similar outputs, you might consider using the OnPlatform class to set a value for each.

[**Customize UI appearance based on the platform and device idiom - .NET MAUI**](https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/customize-ui-appearance?view=net-maui-9.0#customize-ui-appearance-based-on-the-platform)

```
<!-- Option 1 - XAML -->
<Label Text="Welcome">
    <Label.FontFamily>
        <OnPlatform x:TypeArguments="x:String">
            <On Platform="iOS" Value=".SFUI-SemiBold" />
            <On Platform="Android" Value="sans-serif-medium" />
        </OnPlatform>
    </Label.FontFamily>
</Label>
```

```
<!-- Option 2 - Inline XAML -->
<Label Text="Welcome" FontFamily="{OnPlatform iOS='.SFUI-SemiBold', Android='sans-serif-medium'}" />
```

```
/* Option 3 - CSS */
.ios .font-weight-medium { font-family: .SFUI-SemiBold; }
.android .font-weight-medium { font-family: sans-serif-medium; }
```

Read more about [Targeting Platforms](https://community.rockrms.com/developer/mobile-docs/styling/legacy/custom-css#targeting-platforms) with CSS.

### Sizes

There are numerous, pre-defined helper classes to help easily determine proven and tested font sizes in your application. These classes are based on the [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/typography#Specifications).

| Style | Size |
| --- | --- |
| Title 1 | 28 |
| Title 2 | 22 |
| Title 3 | 20 |
| Headline | 17 |
| Body | 17 |
| Callout | 16 |
| Subheadline | 15 |
| Footnote | 13 |
| Caption 1 | 12 |
| Caption 2 | 11 |

Note

These classes are only used to determine the size of text in Rock Mobile. To learn more about setting the color of your text, take a look at our [colors](https://mobiledocs.rockrms.com/styling/style-guide/colors) documentation.  

```
<VerticalStackLayout>
    <Label Text="{{ CurrentPerson.FirstName | Escape }}" StyleClass="title2" />
    <Label Text="{{ CurrentPerson.Email | Escape }}" StyleClass="subheadline" />
</VerticalStackLayout>
```

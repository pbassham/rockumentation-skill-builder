> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Application Info

# Application Info

M v2.1 C v12.4

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

Somewhere in your application you normally have some sort of *About* page that gives information about your app, such as version numbers. This view provides those version numbers in a quick way without you having to worry about styling. It simply lays out each item as a single Label inside a vertical StackLayout.

The values displayed are:

-   Package Version - This displays the version number of the site package. This is the file that is built when you click the
-   Shell Version - The shell is what provides all the standard code and functionality across all Rock Mobile applications. This helps you know what features are supported on the user's device.
-   App Store Version - This will match the version number of your application bundle as reported by the Google Play Store and Apple App Store.

If you wish to completely customize how this data is presented, you can access the same information via data binding to `Application.PackageVersion`, `Application.ShellVersion`, and `Application.ApplicationVersion`. Such as:

```
<Label>
    <Label.FormattedText>
        <FormattedString>
            <Span Text="App Version: " FontAttributes="Bold" />
            <Span Text="{Binding Application.ApplicationVersion}" />
        </FormattedString>
    </Label.FormattedText>
</Label>
```

## Properties

*This view contains no properties of it's own.*

## Example

```
<Rock:ApplicationInfo />
```

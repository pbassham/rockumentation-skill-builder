> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Icon

# Icon

M v1.0

Inherits from [Xamarin.Forms.Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label)

We're used to having sleek icons on our web pages, and your mobile app should be no exception. Add icons from various libraries, ensuring your pages look polished and visually appealing.

### Icon Family

Rock Mobile currently supports the following font families:

| Font Family | Internal Font Name | Description |
| --- | --- | --- |
| FontAwesome (default) | N/A | Automatically pick the first Font Awesome family that supports the requested icon in order of Regular, Solid and then Brands. |
| FontAwesomeSolid | FontAwesome5Free-Solid | The solid icons from Font Awesome free v5.11: [link](https://fontawesome.com/v5/search?o=r&ic=free&s=solid) |
| FontAwesomeRegular | FontAwesome5Free-Regular | The regular icons from Font Awesome free v5.11: [link](https://fontawesome.com/v5/search?o=r&ic=free&s=regular) |
| FontAwesomeBrands | FontAwesome5Brands-Regular | The brand icons from Font Awesome free v5.11: [link](https://fontawesome.com/v5/search?ic=brands) |
| MaterialDesignIcons | MaterialDesignIcons | Many of the Material Design icons: [link](https://materialdesignicons.com/) |
| TablerIcons | TablerIcons | The outline variant icons from Tabler: [link](https://tabler.io/icons) |

### Properties

| Property | Type | Description |
| --- | --- | --- |
| IconClass | string | The icon class name to use. This can be found on the FontAwesome website. If it specified fas fa-car then you would use car. |
| IconFamily | [IconFamily](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/icon#icon-family) | The icon font family to use to display the icon. Default value is FontAwesome. |
| FontSize | double | The size of the icon. |
| TextColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color of the icon to use by default. |
| Command | ICommand | The command to be executed when the user taps on the icon. |
| CommandParameter | object | The object to be passed as the parameter to Command. |

Note

Use the Font Family name when defining the IconFamily property with Rock:Icon. The Internal Font Name can be used to add an icon as an image within a Button.  

```
<HorizontalStackLayout Spacing="8">
    <Rock:Icon IconFamily="TablerIcons" IconClass="user" />
    <Rock:Icon IconFamily="FontAwesomeSolid" IconClass="user" />
    <Rock:Icon IconFamily="FontAwesomeBrands" IconClass="RockRMS" />
    <Rock:Icon IconFamily="FontAwesomeRegular" IconClass="user" />
    <Rock:Icon IconFamily="MaterialDesignIcons" IconClass="account" />
</HorizontalStackLayout>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67122)

```
<Button Text="Save"
    StyleClass="btn, btn-primary, headline, font-weight-bold"
    ContentLayout="Left, 12">
    <Button.ImageSource>
        <FontImageSource Glyph="&#xeb62;" FontFamily="TablerIcons" Size="20" />
    </Button.ImageSource>
</Button>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67123)

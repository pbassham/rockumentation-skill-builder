---
description: Use when displaying a performant list of items in a mobile app with JSON data and a consistent item template
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

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

|  | **Description** |
| --- | --- |
| Horizontal | A horizontal layout. |
| Grid | A grid layout. |
| Carousel | A carousel layout. |
| Vertical | A vertical layout. |

### Usage

Let's get into the business... how can we display long lists (horizontally OR vertically) without killing performance and maintaining a smooth scroll experience? The answer can be achieved with four simple steps.

1. Define your data source as JSON
2. Bring your JSON into memory
3. Create a single item template
4. Set up your Items Collection container

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

---

## Login Status {#login-status}

M v1.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

The Login Status control displays an icon and message encouraging individuals to log in. After logging in, it will display their profile image, and tapping will provide the option to capture or upload a new photo.

![](https://community.rockrms.com/GetImage.ashx?Id=67143)

### Properties

| Property | Type | Description |
| --- | --- | --- |
| WelcomeMessage | string Lava | The welcome message displayed when a user is logged in. Defaults to Hello {{ CurrentPerson.FirstName }}! |
| LoginMessage | string Lava | The login message displayed if a user is not logged in. Defaults to Login. |
| EditProfileLabel | string Lava | The edit profile subtext displayed if a user is logged in. Defaults to Edit Profile. |
| LoginLabel | string Lava | The login subtext displayed if a user is not logged in. Defaults to Tap to Personalize. |
| NoProfileIcon | string | The icon displayed if a user is logged in but has no profile photo. Defaults to resource://Rock.Mobile.Resources.profile-no-photo.png. |
| NoProfileIconColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/Xamarin.Forms.Color) | Colors the NoProfileIcon image if set. |
| NotLoggedInIcon | string | Image displayed if no user is logged in. Defaults to resource://Rock.Mobile.Resources.person-no-photo-unknown.svg. |
| NotLoggedInColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/Xamarin.Forms.Color) | Colors the NotLoggedInIcon image if set. |
| ProfilePageGuid | Guid | The profile page unique identifier that the user will be directed to when they tap on Edit Profile. |
| ImageSize | double | Width and height of the profile image. Defaults to 80. |
| ImageBorderSize | double | Width of the profile image border. Defaults to 0. |
| ImageBorderColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Color used for the profile image border. Defaults to White. |
| TitleFont | [Font](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.font) | Font for the Title text. |
| TitleFontSize | double | Font size for the Title text. |
| TitleTextColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Text color for the Title text. |
| SubTitleFont | [Font](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.font) | Font for the SubTitle text. |
| SubTitleFontSize | double | Font size for the SubTitle text. |
| SubTitleTextColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Text color for the SubTitle text. |

### Example

```
<Rock:LoginStatus />
```

### Update Photo

M v5.0

The popup window was replaced with the `[UpdatePersonProfilePhoto](https://community.rockrms.com/developer/mobile-docs/essentials/commands/utility-commands#updatepersonprofilephoto)` command. Although the command itself supports updating the photo for any individual, the LoginStatus control only changes the photo for the `CurrentPerson`.

M v2.0

Users will have the option to take a new photo or select an existing one from their photo library. These options appear in a popup window that you can style using the CSS classes listed below.

![](https://community.rockrms.com/GetImage.ashx?Id=67142)

---

## Login Status Photo {#login-status-photo}

M v1.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

The [LoginStatus](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/login-status) view is the one you would normally use in the Flyout shell. But what if you want to just present a small icon that indicates to the user if they are logged in or not? The LoginStatusPhoto view does just that. In fact, [LoginStatus](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/login-status) uses this view itself to present the user's photo.

A number of properties allow you to specify how the profile photo will be displayed, and what photos to use if no profile picture is available or if the user is not logged in. Another set of properties allow you to specify the commands to be executed when the user interacts with the profile picture.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| NotLoggedInPhotoSource | string | The image displayed if no user is logged in. Defaults to resource://Rock.Mobile.Resources.icon-person-not-logged-in.svg. |
| NotLoggedInPhotoFillColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Color applied to the "not logged in" image. |
| LoggedInNoPhotoSource | string | Icon displayed if user is logged in but has no profile photo. Defaults to resource://Rock.Mobile.Resources.icon-person-no-photo.png. |
| LoggedInNoPhotoFillColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Color applied to the "logged in no photo" image. |
| ProfilePhotoStrokeColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | Border color around the profile image. |
| ProfilePhotoStrokeWidth | double | Width of the border around the profile image. Defaults to 0. |
| ProfilePhotoCircle | boolean | If true, displays the profile photo with a circular mask. Defaults to false. |
| NotLoggedInCommand | ICommand | Command executed when the photo is tapped and user is not logged in. |
| NotLoggedInCommandParameter | object | Parameter passed to NotLoggedInCommand. |
| LoggedInCommand | ICommand | Command executed when the photo is tapped and user is logged in. |
| LoggedInCommandParameter | object | Parameter passed to LoggedInCommand. |

### Example

```
<Rock:LoginStatusPhoto />
```

---

## Lottie View {#lottie-view}

*A component that seamlessly displays engaging animations to enhance your mobile app's user experience.*

M v6.0

### Quick Links

1. [Lottie Files Gallery](https://lottiefiles.com/featured)

### Lottie Files

Lottie files are JSON-based animations. These files are lightweight, scalable, and can be rendered natively on mobile and web platforms, allowing for high-quality animations with minimal performance impact. Lottie animations can include complex animations and interactivity, making them an excellent choice for adding visual flair to your applications.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Source | Source | The source of the lottie file. |
| Progress | TimeSpan | The current playback progress of the animation. |
| RepeatCount | int | The number of times to repeat the animation. Default is 0 (no repeat). A value of -1 will repeat forever. |
| RepeatMode | [RepeatMode](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/lottie-view#repeat-mode) | The way in which to repeat the animation. Default is Restart. |
| IsAnimationEnabled | bool | Determines whether the control will play the animation provided. |
| AnimationCompletedCommand | Command | A command that executes once the animation has completed. |
| AnimationCompletedCommandParameter | object | The parameter to pass to the animation completed command. |

#### Repeat Mode

| Value | Description |
| --- | --- |
| Restart | Restarts the animation from the beginning. |
| Reverse | Reverses the animation from the end back to the beginning. |

### Examples

```
<Rock:LottieView Source="https://church.com/lottiefile.json"
    HeightRequest="64"
    WidthRequest="64" />
```

---

## Markdown {#markdown}

M v1.0

*Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)*

Another way that information is often styled in Rock is with something called [Markdown](https://www.markdownguide.org/cheat-sheet). This syntax allows you to indicate that you want things formatted in a certain fashion, but it does not give you the ability to specify exactly how that formatting is done. For example, you can specify that you want a heading, but you don't get to pick exactly how that heading is formatted.

Not everything in the Markdown syntax is supported, for example, tables and footnotes. But most of the basic syntax is supported. As with the [HTML](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/html) component, you will probably want to wrap your content in a `CDATA` tag.

When converting the markdown to XAML the Markdown control will add StyleClasses for you. Headings will get `.heading1-.heading6`, paragraphs will be assigned the `.text` class and links will be assigned the `.link` CSS class.

Note: Links are only clickable at a leaf block level (formatted strings don't support span user interactions). If a leaf block contains more than one link, the user is prompted. This is almost a feature since the text may be too small to be precise enough!

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The markdown text to be displayed. |
| Lava | bool | If true then the Text will be processed for any Lava before final rendering happens. Defaults to **false**. |

### Supported Syntax

| Syntax | Example(s) |
| --- | --- |
| Headings | \# h1 Heading   \## h2 Heading   \### h3 Heading   \#### h4 Heading   \##### h5 Heading   \###### h6 Heading |
| Bold | \*\*This is bold text\*\*   \_\_This is bold text\_\_ |
| Italic | \*This is italic text\*   \_This is italic text\_ |
| Unordered List | \+ Create a list by starting a line with +, -, or \*   \+ Sub-lists are made by indenting 2 spaces:   \- Marker character change forces new list start:         \* Ac tristique libero volutpat at         + Facilisis in pretium nisl aliquet         - Nulla volutpat aliquam velit   \+ Very easy! |
| Ordered List | 1\. Lorem ipsum dolor sit amet   2\. Consectetur adipiscing elit   3\. Integer molestie lorem at massa |
| Inline Code | Inline \`code\` |
| Code Fence | \`\`\`   Sample code here   \`\`\` |
| Links | \[link text\](https://www.rockrms.com)   \[link with title\](https://www.rockrms.com "Visit Rock!") |
| Image | !\[Minion\](https://octodex.github.com/images/stormtroopocat.jpg) |

```
<Rock:Markdown>
    <![CDATA[
    # Heading
    This is some **bold** text.
    ]]>
</Rock:Markdown>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67147)

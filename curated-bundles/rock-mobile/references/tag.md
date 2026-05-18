---
description: Use when implementing pill-shaped tag labels or toggle button controls in Rock Mobile applications with styling and property configuration
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M v1.0

*Inherits from* [*RockMobile.StyledView*](https://mobiledocs.rockrms.com/essentials/controls#styledview)

Tags are pill-shaped labels that help to mark and categorize content. They usually consist of relevant keywords which make it easier to find and browse the corresponding piece of content. These are not directly correlated with Rock Tags.

![](https://community.rockrms.com/GetImage.ashx?Id=67170)

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Text | string | The text to display on the tag. |
| Type | string | The type (color) of the tag. Primary, Secondary, Success, Info, Warning Danger |
| Size | string | The size of tag to display. Small, Default, Large |
| TextColor | Color | Sets text color using any of the supported formats. |
| BackgroundColor | Color | Sets background color using any of the supported formats. |
| BorderColor | Color | Sets border color using any of the supported formats. |
| BorderThickness | Double | Sets the thickness of the border. This can be a single value or a specific value for Left, Top, Right, Bottom. |

```
<Rock:Tag Text="Articles"
     Type="Primary"
     Size="Default" />
```

## Structure

When styling tags via CSS, it's helpful to understand how this control is built. The Tag contains two underlying controls:

1. [Styled View](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/styled-view) – This is the container control
2. Label– This is the text for the tag

All tags have a `.tag` class attached to them.

If you add a type an additional class with the pattern of `.tag-[typename]` will be applied.

Each size (Small, Default, & Large) will have `.tag-sm`, `.tag-default`, and `.tag-lg` appended.

Note

The corner radius for Tags is calculated automatically by the shell to ensure the rounding is always correct regardless of the content or padding.

To style the text of a tag you'd want to have a style similar to:

```
.tag ^Label {
    color: red;
}
```

---

## Toggle Button {#toggle-button}

M v1.0

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

Think of a Toggle Button as a fancy check box. It provides the same basic functionality, an on/off toggle. But it presents it as a large button. An icon is used to indicate state, but the visual state of the button also updates to reflect the state. This makes it very obvious to the user when looking at a list of items which ones are turned on and which are turned off.

## CSS Classes

The construction of a toggle button is made up of multiple controls. A [Frame](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.frame) contains the entire button. Inside of that is an [Icon](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/icon) and [Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label) which display the contents of the button.

| Class | Description |
| --- | --- |
| toggle-button | Always on the Frame. Can be used to style border and background color for the button. |
| icon | Always on the Icon that shows either the check-circle icon or the circle icon depending on state. |
| title | Always on the Label that contains the text of the button. |
| checked | This will be applied to the Frame when the button is in the checked state and it will be removed when the button is no longer in the checked state. |

## Properties

| Property | Type | Description |
| --- | --- | --- |
| IsChecked | bool | If true then the button is considered to be in the checked state. |
| Text | string | The text to be displayed inside the button next to the icon. |
| Command | ICommand | Can be used to trigger a command each time the state of the button changes. |
| CommandParameter | object | Contains the parameter to be passed to the Command. |

## Example

```
<Rock:ToggleButton Text="Include Completed"
    IsChecked="True" />
```

---

## Web View {#web-view}

M v1.0

Inherits from [WebView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview)

Embeds a web page into your mobile app page. This control wraps the standard [WebView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/webview) and should generally be used instead of the .NET MAUI one. It adds an initial [Activity Indicator](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/activity-indicator) that will be visible until the web page actually loads. Otherwise, someone might see a blank area for a few seconds before anything appears.

Important

WebView content is completely contained and cannot affect the app shell or native page. For example, an action within a WebView cannot initiate a native navigation command.

## Display & Troubleshooting

To ensure that the web page displays with the proper scale within the application, add the following meta tag to the of the page.

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Note that the WebView control must not be embedded within a ScrollView; otherwise, the content will be clipped. You do not need to define the `HeightRequest` and `WidthRequest` properties when using the Rock Mobile version.

Note

If the embedded web page contains an iframe and only a blank page is shown, it may be a CORS issue. On iOS, these errors are "swallowed" meaning nothing will be shown.  Keep in mind the domain of your API URL that the shell connects to your server with.

On Android, pinch to zoom is disabled by default. Check out [this article](https://learn.microsoft.com/en-us/dotnet/maui/android/platform-specifics/webview-zoom-controls) on how to enable this.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Source | string | The initial URL to be used when the WebView first loads. |

```
<Rock:WebView Source="https://rock.rocksolidchurchdemo.com/page/482" />
```

---

## Developer Controls {#developer-controls}

# Developer Controls

---

## Execute Command {#execute-command}

*Allows a command to be executed upon initialization (and repeated).*

M v7.0

Inherits from [Microsoft.Maui.Controls.ContentView](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/contentview?view=net-maui-8.0)

The `ExecuteCommand` control is a simple and flexible way to execute commands with customizable timing and repetition. It’s ideal for use cases like delayed actions or periodic updates.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| Delay | int | The delay interval (in milliseconds) before the command executes. |
| Enabled | bool | Can be use to turn on/off the command. |
| Repeat | bool | Indicates if the command should repeat. Repeat indefinitely if RepeatCount is not specified. |
| RepeatCount | int | The number of times the command repeats. Use -1 for unlimited. |
| StartWithExecution | bool | If true, the command executes immediately before starting the delay timer. |
| Command | ICommand | The command to execute. |
| CommandParameter | object | A parameter passed to the command when executed |

## Example

In this example we used in an app to welcome people with a periodic toast message like, "Welcome to Rock Solid Church!!".

```
<Rock:ExecuteCommand
    Command="{Binding ShowToast}"
    CommandParameter="Welcome to Rock Solid Church!!"
    Delay="3000"
    Repeat="true" />
```
- Command: Bound to the `ShowToast` command, which handles the logic for displaying the message.
- CommandParameter: Passes the string `"Welcome to Rock Solid Church!!"` as a parameter to the command.
- Delay: Specifies a 3-second delay (3000 ms) before executing the command.
- Repeat: Ensures the command executes repeatedly (Repeat indefinitely if the `RepeatCount` is not specified).

---

## Bible Book and Chapter Picker {#bible-book-and-chapter-picker}

M v2.0C v12.4

Inherits from [Xamarin.Forms.Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.label)

This control provides a simple UI interface to allow the user to pick a book and chapter from the Bible. This would normally be used with one of the Bible content controls to then display the text from the reference.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Reference | string | The reference text based on the selections the user made. |
| Command | [ICommand](https://docs.microsoft.com/en-us/dotnet/api/system.windows.input.icommand) | The command to be executed after the user has made their selection. |
| CommandParameter | object | The parameter to be passed to the Command. |

### Styling

While this control itself does not have any styling properties that can be set, you can use CSS to style the modal pages that appear to handle user selection.

### Book Page

The book page will have the class `bible-book-picker` applied to it. You can use the following CSS properties to customize how the text appears.

| CSS Property | Description |
| --- | --- |
| font-family | The custom font to use for the text. |
| font-size | The font size to display the book name and chevron-right icon. |
| font-style | The font attribute style to use when rendering the book name. |
| color | The text color for the book name and chevron. |

### Chapter Page

The chapter page will have the class `bible-chapter-picker` applied to it. It does not have any styles directly on itself, but the content elements look roughly like this:

```
<ContentView StyleClass="bible-chapter-content">
    <Frame HasShadow="false" StyleClass="bible-chapter-frame">
        <Label StyleClass="bible-chapter" Text="1" />
    </Frame>
</ContentView>
```

You can style those views as you normally would.

Important

The UI for the Bible Book And Chapter Picker may change in future versions which may break your custom styling. If you are doing anything beyond just setting font size and color be sure to test your styles when and if the UI does change.

---

## Command Reference {#command-reference}

Provide a command as a parameter for something else.

The `CommandReference` object is defined like a normal command reference:

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Command | ICommand | The command to be executed. |
| CommandParameter | object | The parameter to be passed to the command. In M v3.0 this became the default content property, so you can specify the parameter as a direct child node. |

Examples ^^^

```
<Button Text="Tap"
        Command="{Binding AggregateCommand}">
    <Button.CommandParameter>
        <Rock:AggregateCommandParameters>
            <Rock:CommandReference Command="{Binding SetContext}">
                <Rock:CommandReference.CommandParameter>
                    <Rock:SetContextParameters Name="Campus"
                                               Value="0a3a20eb-c4a8-44fe-9daf-d22b88fae377" />
                </Rock:CommandReference.CommandParameter>
            </Rock:CommandReference>
            <Rock:CommandReference Command="{Binding ReplacePage}"
                                   CommandParameter="b06173ed-aa2f-43d8-bd38-eb5becca1cbe" />
        </Rock:AggregateCommandParameters>
    </Button.CommandParameter>
</Button>
```

---

## Field Stack {#field-stack}

M v1.0

Inherits from [Xamarin.Forms.Layout](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout-1)

This view cannot be accessed directly from XAML. The FieldStack is used internally by the FormContainer to display multiple fields in a vertical layout.

When displaying a FormField this view is responsible for drawing the border around the group of fields as well as the lines between the fields.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| BorderColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color to be used for the border as well as the inter-field lines. Default value is #c1c1c1. |
| BorderWidth | double | The width, in pixels, to be used when drawing the borders. Default value is 1. |
| CornerRadius | double | The radius to use when drawing the four corners of the outside border. |

---

## Media Cast Button {#media-cast-button}

M v2.0

Inherits from Xamarin.Forms.View

Renders a button on the screen that can be used by the user to select a Cast (Android) or AirPlay (iOS) device to stream any currently playing media to.

This control currently has no properties that can be customized.

### Example

```
<Rock:MediaCastButton />
```

---

## Media Progress Bar {#media-progress-bar}

M v2.0

Inherits from [Xamarin.Forms.View](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.view)

Functionally, this control behaves just like a [Slider](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.slider). However, the Slider has a few quirks that make it unsuitable for use with tracking progress of a media player. Visually this renders a track bar as well as a thumb that shows the current position of playback. It can also be used by the person to scrub through the media by moving the thumb along the track.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Position | double | The current position of the playback in fractional seconds. |
| Duration | double | The total length of the media being played in fractional seconds. |
| ThumbSize | double | The diameter of the drawn thumb on the play track. Defaults to 12. |
| TrackBackgroundColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color of the track background for the region that has not been played. Defaults to 50% gray at 65% opacity. |
| TrackProgressColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color of the track background for the played region. Defaults to the application's primary color. |
| ThumbColor | [Color](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.color) | The color of the thumb knob. Defaults to White. |

### Example

```
<Rock:MediaProgressBar Duration="{Binding Duration}"
                       Position="{Binding Position}" />
```

---

## Parameter {#parameter}

M v1.0

The parameter control is not actually a visual control. However, you will see it used by various other controls, such as the [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker). Additionally, nearly all commands use the Parameter control to let you pass information to the command handler.

One of the things that makes this such a powerful element is that it supports binding. Both the `Name` and `Value` properties can be bound to another element. For example, you can bind the `Value` property to a text input field that the user fills in and then pass that data back to your block on the server.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Name | string | The name of the parameter. This can be either the displayed name or the name used, for example, in a query string parameter key. |
| Value | object | The value to be associated with the name. |

### Example

```
<StackLayout>
    <Rock:FieldContainer>
        <Rock:TextBox x:Name="tbSearch" Label="Search For" />
    </Rock:FieldContainer>

    <Button StyleClass="btn,btn-primary"
            Text="Search"
            Command="{Binding PushPage}">
        <Button.CommandParameter>
            <Rock:PushPageParameters PageGuid="8fedc079-e133-4577-bc11-35c24d5e439e">
                <Rock:Parameter Name="q"
                                Value="{Binding Source={x:Reference tbSearch}, Path=Text}" />
            </Rock:PushPageParameters>
        </Button.CommandParameter>
    </Button>
</StackLayout>
```

In the above example, we display a text box to the user as well as a button. When the button is tapped, we transition to a new page. That new page is passed a parameter of `q` whose value is whatever the user typed in the search box.

> **Path:** Mobile Docs > 🧱 Essentials > Controls > Developer Controls > Bible Book and Chapter Picker

# Bible Book and Chapter Picker

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

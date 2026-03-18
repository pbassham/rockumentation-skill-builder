> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Bible Browser

# Bible Browser

M2.0  C12.4

*Inherits from [ContentView](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.contentview)*

The Bible Browser control provides a way for you to build a nice interface for the user to browse through the Bible. How that browser looks and behaves is up to you. The intended purpose is to let the user pick the chapter and book they want to read and then let them navigate to the next/previous chapters or books via interface elements.

The primary purpose of this control is to handle much of the logic in regards to navigating within the Bible for you. As an example, you need to know when to show and hide the "move next" and "move previous" buttons. Building in all the logic to determine if there is another book or chapter after the current one is tedious. So we did it for you!

[Deep links to the YouVersion Bible app](https://community.rockrms.com/page/3516?slug=essentials%2ftips-and-tricks#bible-reference) are supported by Rock Mobile, which may provide a better experience than this native Bible Browser control. We'd recommend this option unless you need more control over the experience with more native app integration.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Content | View | The content that will be displayed inside the browser. This is the default property so it can be omitted when creating child elements. *Defaults to* *null*.   |
| Reference | string | A single Bible reference, should not contain any verse information. Example: Genesis 12. This would result in the browser starting on Genesis 12 and then allowing the user to browse to different books and chapters from there.   |
| Translation M7.0 | string | The translation of the Bible to display. ESV, NLT or MSG are supported. *Defaults to* *ESV*.   |

### Default Content

This control provides no default content, so you must provide some content of your own for it to be of any use.

There are some special bindings available for your custom content. In addition to the normal bindings (such as [PushPage](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands)) that you normally have available, there are a few additional ones you can use.

| Property | Type | Description |
| --- | --- | --- |
| Reference | string | The current reference that should be displayed in the browser. |
| Reading | Reading |   The internal state data of the Bible content to be displayed. If using [Bible Reader](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/bible-reader) control as children they should be bound to this property.   |
| CurrentBook | string |   The current book that is displayed in the browser. *read-only* |
| CurrentChapter | int |   The current chapter number that is displayed in the browser. *read-only* |
| HasPreviousBookOrChapter | bool | true if there is a book or chapter before the currently displayed chapter.   |
| HasPreviousBook | bool | true if there is a book before the currently displayed chapter.   |
| HasPreviousChapter | bool | true if there is a chapter *in the current book* before the currently displayed chapter.   |
| HasNextBookOrChapter | bool | true if there is a book or chapter after the currently displayed chapter.   |
| HasNextBook | bool | true if there is a book after the currently displayed chapter.   |
| HasNextChapter | bool | true if there is a chapter *in the current book* after the currently displayed chapter.   |
| ShowPickerCommand | ICommand | Execute this command to show the book and chapter picker to the user for them to select a new reference to read or listen to. |
| ShowPreviousBookOrChapterCommand | ICommand | Execute this command to update the reference to move to the previous book or chapter. If a previous chapter is available it will be used, otherwise the previous book will be used. |
| ShowPreviousBookCommand | ICommand | Execute this command to update the reference to move to the previous book. |
| ShowPreviousChapterCommand | ICommand | Execute this command to update the reference to move to the previous chapter. |
| ShowNextBookOrChapterCommand | ICommand | Execute this command to update the reference to move to the next book or chapter. If a next chapter is available it will be used, otherwise the next book will be used. |
| ShowNextBookCommand | ICommand | Execute this command to update the reference to move to the next book. |
| ShowNextChapterCommand | ICommand | Execute this command to update the reference to move to the next chapter. |

```xaml
<Rock:BibleBrowser Reference="Genesis 1">
    <StackLayout>
        <Label Text="{Binding BibleBrowser.Reference}"
            StyleClass="text-interface-strongest, title1, bold"
            HorizontalOptions="Center">
            <Label.GestureRecognizers>
                <TapGestureRecognizer Command="{Binding BibleBrowser.ShowPickerCommand}" />
            </Label.GestureRecognizers>
        </Label>
    
        <Grid ColumnDefinitions="*,*,*">
            <Rock:Icon IconClass="chevron-left"
                StyleClass="text-interface-stronger"
                IconFamily="MaterialDesignIcons"
                FontSize="36"
                Command="{Binding BibleBrowser.ShowPreviousBookOrChapterCommand}"
                IsVisible="{Binding BibleBrowser.HasPreviousBookOrChapter}"
                HorizontalOptions="Start"
                VerticalOptions="Center"
                Grid.Column="0" />
                      
            <Rock:Icon IconClass="chevron-right"
                StyleClass="text-interface-stronger"
                IconFamily="MaterialDesignIcons"
                FontSize="36"
                Command="{Binding BibleBrowser.ShowNextBookOrChapterCommand}"
                IsVisible="{Binding BibleBrowser.HasNextBookOrChapter}"
                HorizontalOptions="End"
                VerticalOptions="Center"
                Grid.Column="2" />
        </Grid>
        
        <Rock:BibleReader Reading="{Binding BibleBrowser.Reading}"
            ShowReference="false"
            Margin="0,12,0,0" />
    </StackLayout>
</Rock:BibleBrowser>
```

## Styling

### Chapter Selection Sheet

| Style Class | Type | Description |
| --- | --- | --- |
| bible-chapter-picker | FlexLayout | The outer-most wrapper around the chapter elements. |
| bible-chapter-content | ContentView | The wrapper around each chapter element. |
| bible-chapter-frame | StyledBorderView | The element that has default card styling applied. |
| bible-chapter | Label | The text for the chapter. |

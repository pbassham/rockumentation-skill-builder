---
description: Use when building a Bible browsing interface that needs to navigate between books and chapters with automatic logic for next/previous availability
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

M2.0  C12.4

*Inherits from [ContentView](https://learn.microsoft.com/en-us/dotnet/api/microsoft.maui.controls.contentview)*

The Bible Browser control provides a way for you to build a nice interface for the user to browse through the Bible. How that browser looks and behaves is up to you. The intended purpose is to let the user pick the chapter and book they want to read and then let them navigate to the next/previous chapters or books via interface elements.

The primary purpose of this control is to handle much of the logic in regards to navigating within the Bible for you. As an example, you need to know when to show and hide the "move next" and "move previous" buttons. Building in all the logic to determine if there is another book or chapter after the current one is tedious. So we did it for you!

[Deep links to the YouVersion Bible app](https://community.rockrms.com/page/3516?slug=essentials%2ftips-and-tricks#bible-reference) are supported by Rock Mobile, which may provide a better experience than this native Bible Browser control. We'd recommend this option unless you need more control over the experience with more native app integration.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Content | View | The content that will be displayed inside the browser. This is the default property so it can be omitted when creating child elements. *Defaults to* *null*. |
| Reference | string | A single Bible reference, should not contain any verse information. Example: Genesis 12. This would result in the browser starting on Genesis 12 and then allowing the user to browse to different books and chapters from there. |
| Translation M7.0 | string | The translation of the Bible to display. ESV, NLT or MSG are supported. *Defaults to* *ESV*. |

### Default Content

This control provides no default content, so you must provide some content of your own for it to be of any use.

There are some special bindings available for your custom content. In addition to the normal bindings (such as [PushPage](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands)) that you normally have available, there are a few additional ones you can use.

| Property | Type | Description |
| --- | --- | --- |
| Reference | string | The current reference that should be displayed in the browser. |
| Reading | Reading | The internal state data of the Bible content to be displayed. If using [Bible Reader](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/bible-reader) control as children they should be bound to this property. |
| CurrentBook | string | The current book that is displayed in the browser. *read-only* |
| CurrentChapter | int | The current chapter number that is displayed in the browser. *read-only* |
| HasPreviousBookOrChapter | bool | true if there is a book or chapter before the currently displayed chapter. |
| HasPreviousBook | bool | true if there is a book before the currently displayed chapter. |
| HasPreviousChapter | bool | true if there is a chapter *in the current book* before the currently displayed chapter. |
| HasNextBookOrChapter | bool | true if there is a book or chapter after the currently displayed chapter. |
| HasNextBook | bool | true if there is a book after the currently displayed chapter. |
| HasNextChapter | bool | true if there is a chapter *in the current book* after the currently displayed chapter. |
| ShowPickerCommand | ICommand | Execute this command to show the book and chapter picker to the user for them to select a new reference to read or listen to. |
| ShowPreviousBookOrChapterCommand | ICommand | Execute this command to update the reference to move to the previous book or chapter. If a previous chapter is available it will be used, otherwise the previous book will be used. |
| ShowPreviousBookCommand | ICommand | Execute this command to update the reference to move to the previous book. |
| ShowPreviousChapterCommand | ICommand | Execute this command to update the reference to move to the previous chapter. |
| ShowNextBookOrChapterCommand | ICommand | Execute this command to update the reference to move to the next book or chapter. If a next chapter is available it will be used, otherwise the next book will be used. |
| ShowNextBookCommand | ICommand | Execute this command to update the reference to move to the next book. |
| ShowNextChapterCommand | ICommand | Execute this command to update the reference to move to the next chapter. |

```
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

---

## Bible Reader {#bible-reader}

M v2.0C v12.4

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The Bible Reader control allows you to display a set of verses for the user to read. This is handled via the Spark Data API to retrieve the information about the Bible and the verses to be displayed.

### Reference Syntax

Here are some guidelines for creating reference values. It's recommended to test any complex ones in advance to ensure they work as expected. If the reference list is long, consider breaking them up on the page above and load each one individually.

1. Multiple references are supported but must be separated by a semi-colon `;`
2. Consecutive verses from a single chapter are supported with this syntax: `Genesis 1:1-9`
3. Verses cannot span across chapters, so divide them up: `Genesis 1:30-31; Genesis 2:1-3`
4. If a book only contains a single chapter, it still must be included: `Jude 1`
5. Full chapters can be included with this syntax: `Genesis 1,2` or `Genesis 1-2`

Note

When including Psalms in the reading Reference be sure to use Psalms, notPsalm.  

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Reference | string | One or more Bible references separated by a semicolon. Example: Genesis 1:1-9; Matthew 2,3. This would result in the contents of Genesis chapter 1 verses 1-9 being displayed, followed by Matthew chapters 2 and 3. |
| Reading | Reading | The internal state data of the Bible content to be displayed. |
| ShowReference | boolean | Shows the reference text (for example Genesis 1:1-9) above the verses. *Defaults to* *true**.* |
| ShowHeadings | boolean | Shows any headings along with the verse text. For example Genesis 1:1 has the heading The Creation of the World. *Defaults to* *true**.* |
| ShowVerseNumbers | boolean | Show verse numbers inline along with the verse text. *Defaults to* *true**.* |
| ShowCopyright | boolean | Show the copyright text below the verse text. Please do not turn this off unless you are displaying the copyright text elsewhere. For example, if you are displaying multiple BibleReader controls in the page you could put the copyright notice at the very bottom rather than after each individual control. *Defaults to* *true**.* |
| Translation M v7.0 | string | The translation of the Bible to display. ESV, NLT or MSG are supported. *Defaults to* *ESV*. |
| WriteInteraction | boolean | Determines whether the individual's interaction should be recorded. |

### Styling

For details on styling this control see the [Bible Styling](https://community.rockrms.com/developer/mobile-docs/styling/legacy/styling-components/bible#bible-reader) page.

### Examples

```
<Rock:BibleReader Reference="Genesis 1:1-9" ShowHeadings="false" />
```

---

## Campus Context Picker {#campus-context-picker}

M v1.0

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The Campus Context Picker allows you to display a picker with all the campus choices allowed for a person. The selected campus is sent with every request, even if you leave the page. This then allows blocks to use that information to make default campus decisions, or show content specific to a campus.

If you are familiar with the web control of the same name, this offers pretty much the same functionality for mobile.

*Note: If no context value is set the current person's home campus will be used.*

### Properties

*This control exposes no properties that can be modified.*

### Example

```
<Rock:CampusContextPicker />
```

---

## Camera Code Reader {#camera-code-reader}

M v2.0C v12.4

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

This is a special use camera control that allows you to scan specially formatted QR codes. When scanned, the app will automatically direct the user to the appropriate page to display the content.

Since an example usage might make things clearer; suppose you are doing small group signups. You want to provide your app-users an easy way to sign up for a group. Normally you might print out a bunch of sign-up sheets that people can write their name and contact information on so that you can later add them to the group. After service, these get laid out on various tables in the lobby.

For our use, you would include a QR code on the sheet that contained a workflow identifier and the group identifier. When the user opens their app to scan the code it would take them to the workflow entry page, launch that workflow and set the group they want to join. If they are logged in, all you have to do is display a confirmation page so that they can verify the group they are joining.

| Property | Type | Description |
| --- | --- | --- |
| Page M v5.0 | string | The page identifier that the reader will navigate to using the NavigationMode property. Whatever code data is retrieved is passed in as a query string parameter with a Data key. |
| WorkflowPage (Legacy) | Guid | The same as the version 5 property without additional query string parameters. |
| NavigationMode | [NavigateMode](https://community.rockrms.com/developer/mobile-docs/essentials/commands/navigation-commands) | The type of navigation to perform when the code is scanned. *Defaults to* *Push**.* |

Note

When a code is scanned, the scanner will turn off automatically. If you are using Push navigation then when the page becomes visible again the scanner will automatically re-enable itself and start scanning codes again.

### Example

```
<Rock:CameraCodeReader WorkflowPage="2738f829-09a6-4b14-a4b2-4334a47d8de6" />
```

There are currently two types of codes supported.

A workflow code will take the user to the workflow entry page and launch a new workflow. These codes begin with `RK:WF:` and then contain a Guid to identify the workflow type to be launched. If you wish to pass any default values to be set on the new workflow you can pass then as query string parameters after the workflow type Guid.

```
RK:WF:25af66d6-0b7f-41b8-a8ca-bf912574eeb1?GroupId=20&Mode=auto
```

A page code will navigate the user to whatever page Guid is contained in the QR code. These codes begin with `RK:PG:` and then contain a Guid to identify the page to be navigated to. You can also optionally include any query string parameters you wish.

```
RK:PG:6cb5d894-02e1-4868-93b1-6d52d94295de?source=qrcode
```

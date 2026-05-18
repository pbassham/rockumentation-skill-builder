---
description: Use when customizing text sizes in Xamarin.Forms controls with platform-specific sizing standards and user font scaling support
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [DatePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.datepicker?view=xamarin-forms), [Editor](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.editor?view=xamarin-forms), [Entry](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry?view=xamarin-forms), [Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout?view=xamarin-forms), [Picker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.picker?view=xamarin-forms), [SearchBar](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.searchbar?view=xamarin-forms), [TimePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.timepicker?view=xamarin-forms), [Span](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.span?view=xamarin-forms)

Several utility classes have been created to help you size your text. Apple and Google both have styling standards for various types of text in your application. We've provided a set of classes for their UI patterns as well as a general set if you prefer to go your own way.

Regardless of how you proceed, it's recommended to consider the font scaling set by the user in their device settings. For those that are hard of sight, they may increase the overall font size to easily read the content. Setting a fixed font size in XAML or CSS won't respect the scale setting, so things could look a bit wonky or be difficult to read with scaling enabled.

## Named Sizes

The following classes allow you to size your text the way that Apple and Google intended. Using these classes will also allow your app to respect an individual's settings to scale the fonts larger or smaller on their device.

| Class | iOS | Android |
| --- | --- | --- |
| .text | 16 | 14 |
| .text-xs | 11 | 10 |
| .text-sm | 13 | 14 |
| .text-md | 16 | 17 |
| .text-lg | 20 | 22 |
| .text-body | 17 | 16 |
| .text-title | 28 | 24 |
| .text-subtitle | 22 | 16 |
| .text-caption | 12 | 12 |

These classes correspond to [Named Font Sizes](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/text/fonts#understand-named-font-sizes) in Xamarin Forms, which you can set directly via CSS if you desire. Your CSS definition might look like: `.custom-label {font-size: large;}`

## Body Text

The classes below should be used with labels that represent paragraphs. They have a proper line height as well as a margin at the bottom to separate paragraphs. These classes will respect an individual's request to make the text larger.

| Class | iOS | Android |
| --- | --- | --- |
| .body | 16 | 14 |
| .body-micro | 11 | 10 |
| .body-small | 13 | 14 |
| .body-large | 20 | 22 |

## Generic Scaling

In the case where you want to go with custom sizes, but still want to respect the font scaling setting, you can use this syntax in CSS: `.class {font-size: ?shell-font-scale(#);}`

The font size number set in the parenthesis will determine how large the font is at 100% resolution.

For further clarity on this CSS function within the Rock Mobile Shell, please visit [Shell CSS Functions](https://community.rockrms.com/developer/mobile-docs/styling/legacy/custom-css#shell-css-functions)

## Heading Sizes

Not to add yet another sizing pattern, but we've added utility classes for headings. These are helpful when using content that is being converted from HTML or Markdown. You can easily override these sizes in your own CSS. Note that these do not respect scale by default.

| Class | Property |
| --- | --- |
| .h1 | 27 |
| .h2 | 20 |
| .h3 | 18 |
| .h4 | 16 |
| .h5 | 14 |
| .h6 | 14 |

---

## Alignment {#alignment}

Applies to: [Editor](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.editor?view=xamarin-forms), [Entry](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry?view=xamarin-forms), [EntryCell](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entrycell?view=xamarin-forms), [Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout?view=xamarin-forms), [Picker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.picker?view=xamarin-forms), [SearchBar](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.searchbar?view=xamarin-forms)

The following classes are provided to adjust the alignment of text.

| Class | Property | Notes |
| --- | --- | --- |
| .text-center | text-align: center; |  |
| .text-right | text-align: right; |  |
| .text-left | text-align: left; |  |
| .text-start | text-align: start; | Similar to .text-left |
| .text-end | text-align: end; | Similar to .text-right |

---

## Color {#color}

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [DatePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.datepicker?view=xamarin-forms), [Editor](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.editor?view=xamarin-forms), [Entry](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry?view=xamarin-forms), [Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout?view=xamarin-forms), [Picker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.picker?view=xamarin-forms), [SearchBar](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.searchbar?view=xamarin-forms), [TimePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.timepicker?view=xamarin-forms), [Span](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.span?view=xamarin-forms)

We've seen the [colors that the Downhill framework provides](https://community.rockrms.com/developer/mobile-docs/styling/legacy/colors) us for use in our applications. These colors can be used with text also. Below are a listing of the various ways we can colorize the text of our applications.

## Links

You can give links a different color using the `.link` class. This is defaulted to the `Primary` Application Color. This class is applied for you when converting from HTML or Markdown.

## Application Colors

Note that the actual colors you select will be substituted for the `?color-value`.

| Class | Property |
| --- | --- |
| .text-primary | color: ?color-primary; |
| .text-secondary | color: ?color-secondary; |
| .text-success | color: ?color-success; |
| .text-danger | color: ?color-danger; |
| .text-warning | color: ?color-warning; |
| .text-info | color: ?color-info; |
| .text-light | color: ?color-light; |
| .text-dark | color: ?color-dark; |
| .text-white | color: ?color-white; |

## Palette Colors

Each of the palette colors can also be used for text. Use the notation of `.text-color-intensity` to specify the color.

```
<Label StyleClass="text-gray-400" Text="Lots of trouble. Lots of bubble." />
```

---

## Line Height {#line-height}

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [DatePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.datepicker?view=xamarin-forms), [Editor](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.editor?view=xamarin-forms), [Entry](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry?view=xamarin-forms), [Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout?view=xamarin-forms), [Picker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.picker?view=xamarin-forms), [SearchBar](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.searchbar?view=xamarin-forms), [TimePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.timepicker?view=xamarin-forms), [Span](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.span?view=xamarin-forms)

Leading is the amount of space between the lines of a paragraph. Below are utility classes that allow you to select the right amount for your application.

## Leading Classes

| Class | Properties |
| --- | --- |
| .leading-none | line-height: 1; |
| .leading-tight | line-height: 1.1; |
| .leading-snug | line-height: 1.2; |
| .leading-normal | line-height: 1.25; |
| .leading-relaxed | line-height: 1.4; |
| .leading-loose | line-height: 1.6; |

![](https://community.rockrms.com/GetImage.ashx?Id=67107)

---

## Weights & Styles {#weights-styles}

Applies to: [Button](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.button?view=xamarin-forms), [DatePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.datepicker?view=xamarin-forms), [Editor](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.editor?view=xamarin-forms), [Entry](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry?view=xamarin-forms), [Label](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.layout?view=xamarin-forms), [Picker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.picker?view=xamarin-forms), [SearchBar](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.searchbar?view=xamarin-forms), [TimePicker](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.timepicker?view=xamarin-forms), [Span](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.span?view=xamarin-forms)

The following two weights are available as utility classes.

## Bold

Use the `.font-weight-bold` utility class to bold text.

```
<Label StyleClass="font-weight-bold" Text="Lots of trouble. Lots of bubble." />
```

## Italic

Use the `.font-italic` utility class to make the text italic.

```
<Label StyleClass="font-italic" Text="Lots of trouble. Lots of bubble." />
```

## Underline

Use the `.text-underline` utility class to underline text.

```
<Label StyleClass="text-underline" Text="Lots of trouble. Lots of bubble." />
```

## Strikethrough

Use the `.text-strikethrough` utility class to place a line through your text.

```
<Label StyleClass="text-strikethrough" Text="Lots of trouble. Lots of bubble." />
```

> **Path:** Mobile Docs > 🎨 Styling > Legacy > Text > Text Size

# Text Size

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

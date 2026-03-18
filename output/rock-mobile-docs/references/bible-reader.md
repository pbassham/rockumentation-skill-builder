> **Path:** Mobile Docs > 🧱 Essentials > Controls > Content Controls > Bible Reader

# Bible Reader

M v2.0C v12.4

*Inherits from* [*Xamarin.Forms.ContentView*](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The Bible Reader control allows you to display a set of verses for the user to read. This is handled via the Spark Data API to retrieve the information about the Bible and the verses to be displayed.

### Reference Syntax

Here are some guidelines for creating reference values. It's recommended to test any complex ones in advance to ensure they work as expected. If the reference list is long, consider breaking them up on the page above and load each one individually.

1.  Multiple references are supported but must be separated by a semi-colon `;`
2.  Consecutive verses from a single chapter are supported with this syntax: `Genesis 1:1-9`
3.  Verses cannot span across chapters, so divide them up: `Genesis 1:30-31; Genesis 2:1-3`
4.  If a book only contains a single chapter, it still must be included: `Jude 1`
5.  Full chapters can be included with this syntax: `Genesis 1,2` or `Genesis 1-2`

Note

When including Psalms in the reading Reference be sure to use Psalms, notPsalm.  

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Reference | string | One or more Bible references separated by a semicolon. Example: Genesis 1:1-9; Matthew 2,3. This would result in the contents of Genesis chapter 1 verses 1-9 being displayed, followed by Matthew chapters 2 and 3.   |
| Reading | Reading | The internal state data of the Bible content to be displayed. |
| ShowReference | boolean | Shows the reference text (for example Genesis 1:1-9) above the verses. *Defaults to* *true**.* |
| ShowHeadings | boolean | Shows any headings along with the verse text. For example Genesis 1:1 has the heading The Creation of the World. *Defaults to* *true**.* |
| ShowVerseNumbers | boolean | Show verse numbers inline along with the verse text. *Defaults to* *true**.* |
| ShowCopyright | boolean | Show the copyright text below the verse text. Please do not turn this off unless you are displaying the copyright text elsewhere. For example, if you are displaying multiple BibleReader controls in the page you could put the copyright notice at the very bottom rather than after each individual control. *Defaults to* *true**.* |
| Translation M v7.0 | string | The translation of the Bible to display. ESV, NLT or MSG are supported. *Defaults to* *ESV*.   |
| WriteInteraction | boolean | Determines whether the individual's interaction should be recorded. |

### Styling

For details on styling this control see the [Bible Styling](https://community.rockrms.com/developer/mobile-docs/styling/legacy/styling-components/bible#bible-reader) page.

### Examples

```
<Rock:BibleReader Reference="Genesis 1:1-9" ShowHeadings="false" />
```

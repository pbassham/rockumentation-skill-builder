> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Text Editor

# Text Editor

Inherits from [Xamarin.Forms.Editor](https://docs.microsoft.com/en-us/dotnet/api/Xamarin.Forms.Editor)

Like the Text Box, the Text Editor allows the user to enter text into a form. While the Text Box only allows a single line of text, the Text Box allows the user to enter multiple lines of text.

Unlike the related input in HTML, you cannot specify the height in lines of text. Instead you will need to specify the height in pixels.

If you want to set initial text that contains new line characters, you will need to either encode them as an XML escape sequence or use the alternate assignment method. The escape sequences for Carriage Return and Line Feed respectively are `&#x0d` and `&#x0a`.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| IsRequired | bool | If true then the user will be required to enter a value in the field. |
| Label | string | The label that describes what this field is for. |
| Placeholder | string | The text to display when the user has not entered any value yet. |
| Text | string | Sets or gets the value for the text editor. |
| ValidationExpression | string | If not null or empty, specifies a regular expression that the user value must match in order to be considered valid. |
| ValidationExpressionMessage | string | The message to display to the user when the input does not match the ValidationExpression. Defaults to is not valid. |

### Example

```
<Rock:FieldContainer>
    <Rock:TextEditor Label="Comments"
                     IsRequired="false"
                     HeightRequest="200"
                     Text="Some default text&#x0aon two lines." />
</Rock:FieldContainer>
```

As you can see, in the above example we used the inline method to specify the default multi-line text value. Another method to achieve the same exact result that may be a bit easier to read/write, especially if you are hard coding the value in XAML.

```
<Rock:FieldContainer>
    <Rock:TextEditor Label="Comments"
                     IsRequired="false"
                     HeightRequest="200">
        <Rock:TextEditor.Text>
<![CDATA[Some default text
on two lines.]]>
        </Rock:TextEditor.Text>
</Rock:FieldContainer>
```

Whichever method you choose, you will need to ensure that you have encoded any XML characters, such as `<`, `>`, or `&`.

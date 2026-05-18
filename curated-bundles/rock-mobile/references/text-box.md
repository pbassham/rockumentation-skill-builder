---
description: Use when implementing single-line or multi-line text input fields in Rock mobile forms with validation and styling requirements
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

*Inherits from [Xamarin.Forms.Entry](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.entry)*

Come on. Do we really need to explain what a text box is for? But seriously, as the name implies this view provides a place for the user to enter text on a page.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label title to be used when wrapped in a control that displays a label for the field. |
| IsRequired | bool | If True, any validation performed will require that some text be entered. |
| MaxLength | int | The maximum allowed length of the entered text, set to 0 for no limit. |
| ValidationExpression | string | A regular expression that will be used to validate the input. |
| ValidationExpressionMessage | string | The error message to display when input fails the ValidationExpression. |
| Text | string | The content to be displayed inside the text box. |

![](https://community.rockrms.com/GetImage.ashx?Id=67202)

### Example

```
<Rock:FieldContainer>
    <Rock:TextBox Label="Rock Text Box"
        IsRequired="false"
        Text="Rock Lobster!" />
</Rock:FieldContainer>
```

### Disabled Styling

When a TextBox has `IsEnabled` set to `False`, the text color will be black or white depending on the iOS theme. This may be present in Workflow Entry forms, Prayer Request Details, and other blocks that use this TextBox to display an entry form. Use the [Visual State Manager](https://learn.microsoft.com/en-us/xamarin/xamarin-forms/user-interface/visual-state-manager) to override this to your desired color. You can add this to your page or even a Layout to affect all of its child pages.

```
<StackLayout>
    ...
    <StackLayout.Resources>
        <Style TargetType="Rock:TextBox">
            <Setter Property="VisualStateManager.VisualStateGroups">
                <VisualStateGroupList>
                    <VisualStateGroup x:Name="CommonStates">
                        <VisualState x:Name="Disabled">
                            <VisualState.Setters>
                                <Setter Property="TextColor"
                                    Value="{Rock:PaletteColor Gray-500}" />
                            </VisualState.Setters>
                        </VisualState>
                    </VisualStateGroup>
                </VisualStateGroupList>
            </Setter>
        </Style>
    </StackLayout.Resources>
</StackLayout>
```

---

## Text Editor {#text-editor}

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

---

## XAML Extensions {#xaml-extensions}

XAML markup extensions allow you to do some pretty cool things inside the XAML. You have probably already been using them in fact. For example, `x:Name` and `x:Reference` are both markup extensions. An extension is a XML node that entirely replaces itself with a new value after the XML content has been parsed. In the case of the `x:Reference` node, it replaces itself with the item being referenced.

There are a few standard [Xamarin Extensions](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/xaml/markup-extensions/consuming) that you might find useful, but we have also added a few of our own that should make your life a bit easier.

XAML extensions have two formats. I will call them Inline and Element. Let's look at the Binding as an example. While a Binding doesn't normally make sense as an Element style, let's pretend it does:

### Example

```
<Binding Path="Text" Source="{x:Reference textbox}" />
```

In the Element style, the properties are specified just like they are in HTML like you are probably accustomed to. The property name is followed by an equals sign and the value is enclosed by quotes. Then a space and the next property follows the same pattern.

However, the Inline format is different:

```
{Binding Path=Text, Source={x:Reference textbox}}
```

In the Inline format, we see that the property values are not enclosed by quotes, and a comma is used to separate two properties. The reason for the lack of quotes is that these Inline extensions are enclosed in a property value and thus the double-quote character is already in use.

If the value you need to specify includes a space, it is fine to use as the comma is used to note the end of the value (either that or the closing `}` character). Conversely, if the value needs to include the comma character, you can wrap the value in single quotes, such as:

```
{Binding Path='Hello, Daniel', Source={x:Reference textbox}}
```

Obviously, this is a bad example since the Path to a property could neither include a comma or a space, but you get the idea.

---

## Boolean Value Converter {#boolean-value-converter}

M v1.0

This Value Converter allows you to bind something to a Boolean but then convert that Boolean value to any object you want for truth/false. It might be easier to explain with an example.

Say you have an [Icon](https://community.rockrms.com/developer/mobile-docs/essentials/controls/content-controls/icon) control and you want to change the displayed icon class depending on the value of something else like a checkbox. You would bind your Icon.IconClass property to the CheckBox.IsChecked property like normal, but then you apply the Boolean Value Converter inside that binding so you can change the value set in the IconClass based on the IsChecked being either true or false.

### Properties 

| Property | Value | Description |
| --- | --- | --- |
| True | object | Any value you want to use when the expression evaluates to True. |
| False | object | Any value you want to use when the expression evaluates to False. |

### Example

```
<Rock:Icon IconClass="{Binding IsPlaying, Converter={Rock:BooleanValueConverter True=pause, False=play}}"
           IconFamily="MaterialDesignIcons" />
```

This example would change the `IconClass` property to either `play` or `pause` depending on the boolean value we are binding to.

---

## From Json {#from-json}

M v1.0

Parses a JSON string into the appropriate type. Useful to pass data from the server to the client and then being able to use that data in bindings. This will only parse simple JSON types. Meaning, you cannot encode a Group object into JSON and then expect that it will become a Group object on the client. It will be parsed as a generic dictionary object instead. However, you will still be able to reference its child elements by their names when using bindings.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Content | string | The JSON content that will be parsed. This is the default content property so you can also provide the content |

### Example

```
<StackLayout>
    <StackLayout.Resources>
        <Rock:FromJson x:Key="Series">
            {}{{ seriesJSON | XamlWrap }}
        </Rock:FromJson>
    </StackLayout.Resources>

    <Label Text="{Binding Name, Source={StaticResource Series}}" />
</StackLayout>
```

In this example we are going to be pre-parsing the XAML with Lava on the server. The `seriesJSON` variable contains the JSON that identifies a series being viewed. You could use `ToJSON` but that should be used only if you know exactly what properties it contains. For example, using `ToJSON` on a `Group` would be a bad idea as it will generate a huge amount of JSON you don't need, including most likely some sensitive data.

Note

Because the JSON contents might have some special characters in them we are using the XamlWrap to ensure any special characters are taken care of. You should do the same.

Let’s break open that `FromJson` tag a bit and see what it might look like after it's parsed by the server-side Lava.

```
<Rock:FromJson x:Key="Series">
{}{ "Name": "Exploring John", "MessageCount": 7 }
</Rock:FromJson>
```

As you will notice, that `{}` prefix we had is still there. That is required so the XAML system knows that the `{` which starts the JSON data should not be treated as a XAML extension. Basically it sees the `{}` and then knows to just ignore that part and treat the rest as a plain text string.

So once this all runs on the client, we end up with a static resource on the Stack Layout called `Series`. Then, on a Label inside that Stack Layout we use binding to bind to the name of the series. This is obviously a somewhat pointless example as you could do this more easily. But suppose your JSON also included a `Messages` property that contained an array of the messages in the series. You could use a Collection View or something like that to bind to that Messages property for its content and dynamically build the UI to display all those messages.

While the same could be done by rendering the XAML on the server, this allows for reduced bandwidth and offloads some of the processing from the server onto the client. While a page that displays 4 or 5 items probably doesn't save a ton, imagine if you are displaying something with 50+ items, such as a list of upcoming events.

---

## Inverse Boolean Converter {#inverse-boolean-converter}

M v2.0

This simple Value Converter allows you to invert the state of a boolean that you are binding to. A command use case is when you want to provide a checkbox for the user to do something but the underlying property to be set is inverted from how you want the text to read.

Important

The value you're binding to must be an actual boolean, not a string of True or False.

Suppose you want to have the user set a property value for "NotReady". While that is a perfectly good property name that states its purpose clearly, showing a checkbox to the user with the label "Not Ready" might be confusing. You want to show a label of "Ready" and then use this converter to convert the value of the checkbox before storing it in the "NotReady" property.

### Example

```
<Label Text="Something"
       IsVisible="{Binding HideLabel, Converter={Rock:InverseBooleanConverter}}" />
```

---

## Nullable Guid Converter {#nullable-guid-converter}

This converter allows you to change a String to a Guid type. Some properties and bindings in XAML require this type, meaning a string with an actual Guid value within will still fail without this converter.

```
<Rock:Parameter Name="Guid" Value="{Binding ItemGuid, Converter={Rock:NullableGuidConverter}}" />
```

In this example, the string Guid value within `ItemGuid` would be converted to a Guid type.

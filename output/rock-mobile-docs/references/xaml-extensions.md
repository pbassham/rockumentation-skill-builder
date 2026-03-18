> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions

# XAML Extensions

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

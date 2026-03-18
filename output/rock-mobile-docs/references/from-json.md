> **Path:** Mobile Docs > 🧱 Essentials > Controls > XAML Extensions > From Json

# From Json

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

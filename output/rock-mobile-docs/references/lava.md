> **Path:** Mobile Docs > 🧱 Essentials > Lava

# Lava

Reference to the Lava functionalities and in what context they are available.

### Lava Filters

The [Community](https://community.rockrms.com/lava) page has a list of all the available filters. If a filter is available to run locally on the mobile shell (Process Lava On Client under Block Settings > Mobile Settings tab) it will be marked as such in the docs along with the compatible shell version.

### Escape

It is recommended to always include the [Escape](https://community.rockrms.com/lava/filters/text-filters#escape) filter when using Lava text strings in a mobile application. This will encode the string, in case there are special characters included in there that could break things. This often happens with URLs that include an ampersand (`&`), or a Content Channel Item title with a single quote (`'`). Anything that has been user-inputted should be escaped! You can also encode characters manually, for example replacing `&` with `&amp;` works.

```
{{ item.Title | Escape }}
{{ 'https://rockrms.com/GetImage.ashx?Id=1038&w=720' | Escape }}
```

### Whitespace Control

According to the official [Lava Style Guide](https://community.rockrms.com/lava/style), adding hyphens (`-`) to your Lava will strip whitespace from the output.

`{{-`, `-}}`, `{%-`, and `-%}`

While this may be more visually valuable on the web to keep the DOM clean inside the inspector/source, it has merit in Rock Mobile as well. Every line of Lava mixed into your XAML takes up space, which increases the size of the page. In nearly all cases this is insignificant, but at scale, many items may have a larger impact.

Using a [for loop](https://community.rockrms.com/lava/tags/for-tags) can also introduce issues without stripping whitespace. Each iteration of the loop leaves behind some artifacts in the DOM, and with enough items, this can throw an error.

We're not saying you should always add hyphens to your Lava, but if you have a long or complex Lava page, or you're running into an error you can't explain, it may be worth adding them.

Shell Lava Variables ^^^

When executing Lava on the mobile application shell, the following variables and properties are available in all Lava contexts.

-   PageParameter
-   CurrentPerson
-   Device
-   PageValues
-   AppValues
-   DeviceTheme

### PageParameter

To access a page parameter (also known as query strings), follow the syntax below: `{% assign itemId = PageParameter.Id %}`

Page parameters can be passed directly within a `CommandParameter` or a [Parameter](https://community.rockrms.com/developer/mobile-docs/essentials/controls/developer-controls/parameter) control:

```
<Button Text="Navigate"
    Command="{Binding PushPage}"
    CommandParameter="ecebe34d-92c4-4825-81d9-395b4fc3a674?Id=1846&amp;Key=32" />
```

```
<Button Text="Navigate"
    Command="{Binding PushPage}">
    <Button.CommandParameter>
        <Rock:PushPageParameters PageGuid="ecebe34d-92c4-4825-81d9-395b4fc3a674">
            <Rock:Parameter Name="Id" Value="1846" />
            <Rock:Parameter Name="Key" Value="32" />
        </Rock:PushPageParameters>
    </Button.CommandParameter>
</Button>
```

Note

  Use the UrlEncode and UrlDecode filters to pass values safely if needed.  

### CurrentPerson

The `CurrentPerson` object available on the mobile shell is a stripped-down version of what you are used to using on the Server side. It does not support all the same properties, but most of the ones you are most likely to use should be available.

When editing the application settings, there's a selection for Person Attribute Categories that can bring down additional attributes to the local CurrentPerson object.

![](https://community.rockrms.com/GetImage.ashx?Id=67209)

To access these attributes in Lava, ensure that Process Lava On Client is enabled in the block settings and follow this syntax: `{{ CurrentPerson.AttributeValues.AttributeKey }}`

Each attribute has two properties within − Value and FormattedValue. In some cases, you may need to target these directly which you can do with the [Property filter](https://community.rockrms.com/lava/filters/other-filters#property) in Lava.

`{{ CurrentPerson.AttributeValues.AttributeKey | Property:'FormattedValue' }}`

| Property | Description |
| --- | --- |
| PersonAliasId | The primary person alias identifier associated with this person. |
| PersonId | The person identifier that matches up with the Person.Id you would use on the server. |
| FirstName | The given name of the person. |
| NickName | The name the person usually is addresses by. |
| LastName | The family name of the person. |
| Gender | The person's gender, if known. |
| Email | The primary e-mail address of the person. |
| BirthDate | The date the person was born, if known. |
| PhotoUrl | A URL for the person's profile image. If no image is available, this will be an empty string (and not [their avatar](https://community.rockrms.com/styling/components/avatars) like the server returns). |
| MobilePhone | The mobile phone number associated with this person. |
| HomePhone | The home phone number associated with this person. |
| CampusGuid | The GUID that identifies this person's primary campus. |

### Device

The Device variable gives you access to the type of device used by the user:

| Property | Description |
| --- | --- |
| DeviceType | The type of device the shell is running on: Phone, Tablet, Watch, Unknown |
| Manufacturer | The manufacturer of the device (e.g. Apple) |
| Model | The model of the device (e.g. iPhone 7) |
| Name | The name of the device. This is often not a real device name as that is considered confidential information by Apple. |
| ShellVersion M v3.0 | The application version number of the Shell (e.g. 1.2.1.7) |
| ApplicationVersion M v3.0 | The app store application version number (e.g. 2.0.3) |
| DevicePlatform | The platform the shell is running on: iOS, Android, Unknown |
| Orientation | The current orientation of the device: Unknown, Portrait, Landscape |
| Width | The width of the screen (in relation to current orientation) in pixels |
| Height | The height of the screen (in relation to current orientation) in pixels |
| Density | The pixel density of the screen (e.g. on an iPhone 7 this would be 2) |

### PageValues

Page values are used along with Page Events to allow you to customize your user experience. The `PageValues` object is just a dictionary of string/object pairs that you can use any way you want. There is no defined structure to them. You can read more about their use in the [Page Events](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/dynamic-content#page-events) section.

### AppValues

Similar to `PageValues`, the `AppValues` is a simple dictionary that you can store custom data into. However, the major difference is that `AppValues` will persist between application restarts. One simple usage might be to store a preference in how a page is displayed. You might present the user with a show/hide option that shows or hides certain elements on the page - all processed on the mobile shell. You can use `AppValues` for this and the value will persist between different visits to the page as well as a full restart of the application.

### DeviceTheme

Returns the requested OS theme of the current device. Will be either `Dark`, `Light` or `Unspecified`.

### Server Lava Variables

When you are using Lava to customize the experience from the server side, for example in a Content block set to server-side Lava rendering, the following variables are available to you.

-   PageParameter
-   CurrentPerson
-   [Device](https://community.rockrms.com/developer/mobile-docs/essentials/lava#device)

Warning

CurrentPerson requires the standard .ROCK cookie. Rock Mobile is not compatible with other cookie names.  

In addition, the Content block defines these additional variables when processing a callback event. You can check out the [Advanced: Dynamic Content](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/dynamic-content) page for more details on their contents.

-   Command
-   Parameters

### Lava Commands

The mobile application provides a few additional Lava commands that you can use in different circumstances.

### setpagevalue

This command allows you to set a specific value in the [PageValues](https://community.rockrms.com/developer/mobile-docs/essentials/lava#pagevalues) dictionary.

```
{% setpagevalue key, value %}
```

Both `key` and `value` can either be specified as literal values or as variable references, so both of the following are functionally the same.

```
{% assign name = 'MaxLength' %}
{% assign max = 100 %}
{% setpagevalue name, max %}

{% setpagevalue 'MaxLength', 100 %}
```

You can then access your PageValue by simply accessing it like any other Lava object, for example:

```
{% assign oldMax = PageValues.MaxLength %}
```

You can even access PageValues by way of bindings in your XAML:

```
<Label Text="{Binding PageValues.MaxLength}" />
```

### setappvalue

This command allows you to set a specific value in the [AppValues](https://community.rockrms.com/developer/mobile-docs/essentials/lava#appvalues) dictionary.

```
{% setappvalue key, value %}
```

Both `key` and `value` can either be specified as literal values or as variable references, so both of the following are functionally the same.

```
{% assign name = 'MaxLength' %}
{% assign max = 100 %}
{% setappvalue name, max %}

{% setappvalue 'MaxLength', 100 %}
```

You can then access your AppValue by simply accessing it like any other Lava object, for example:

```
{% assign oldMax = AppValues.MaxLength %}
```

You can even access AppValues by way of bindings in your XAML:

```
<Label Text="{Binding AppValues.MaxLength}" />
```

Warning

These application values are persisted in the local database, so you should keep them limited to simple primitive types, such as numbers, strings, and booleans. Any other more complex object or array types may or may not restore from the database as you expect.

### Entity Command Attributes

Having the ability to utilize attributes when building an entity command is a powerful tool. Be cautious when naming the attributes, as the entity command you generate will pull all attributes with that same attribute key, regardless of where it is in the database.

```
{% contentchannelitem where:'ContentChannelId == 10 && Campus _= ""' %}
```

Although the entity command pulls items from content channel 10, the attribute 'Campus' could be used in many other places. Because of this, the information being returned within the entity command could be inaccurate and produce an unwanted result.

Create a unique attribute when planning to check it within an entity command. Creating the unique attribute then limits entity command's check to one value.

```
{% contentchannelitem where:'ContentChannelId == 10 && vidCampus _= ""' %}
```

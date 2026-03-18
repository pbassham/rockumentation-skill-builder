> **Path:** Mobile Docs > 🧱 Essentials > Controls > Form Fields > Attribute Value Editor

# Attribute Value Editor

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

This view takes care of all logic behind deciding which UI to show when editing an attribute value. This is a developer level control. You shouldn't need to use this field unless you are developing a custom block.

Normal usage would be to loop through all the attributes on an entity and build a collection of these views, one for each attribute. All with a unique name that can be used when the data is submitted back to the user to know which attributes to update with what values. As noted below in the examples section, there is a helper method in the `MobileHelper` class that will do all of this for you.

Note: Only a subset of Rock field types are supported. You can find a list of those [here](https://community.rockrms.com/developer/mobile-docs/essentials/field-types).

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The name of the attribute as it should be displayed to the user. |
| IsRequired | bool | If this field should be considered required when performing form validation on the mobile device. |
| FieldType | string | The Rock class name of the field type, such as Rock.Field.Types.DateFieldType. |
| ConfigurationValues | Dictionary<string, string> | The configuration values (sometimes called attribute qualifiers) that help the field define it's options. While this is actually a dictionary, you will most likely be passing in an JSON encoded string. It will be converted for you. When passing JSON you must prefix the JSON with {} to ensure the XAML engine processes it correctly, for example: {}{"maxLength": 100}. |
| Value | string | The current value as it is, or should be, stored in the database. |

### Example

```
<Rock:FieldContainer>
    <Rock:AttributeValueEditor Label="Start Date"
                               Value="2020-07-04T00:00:00-07:00"
                               FieldType="Rock.Field.Types.DateFieldType" />
</Rock:FieldContainer>
```

The above example creates a field on the screen that the user can use to enter a date. For normal uses, you would just use a [DatePicker](https://community.rockrms.com/developer/mobile-docs/styling/legacy/styling-components/form-fields) view instead. But remember this is intended to provide you with a value in the proper format to be stored in an Attribute Value. A more realistic example (in C#) is below.

```
var attr = CurrentPerson.Attributes["BaptismDate"];

var xamlFragment = string.Format( @"<Rock:AttributeValueEditor
    Label=\"{0}\"
    IsRequired=\"{1}\"
    FieldType=\"{2}\"
    ConfigurationValues=\"{{}}{3}\"
    Value=\"{4}\" />",
    attr.Name.EncodeXml( true ),
    attr.IsRequired,
    attr.FieldType.Class,
    attr.QualifierValues.ToDictionary( a => a.Key, a => a.Value.Value ).ToJson().EncodeXml( true ),
    CurrentPerson.GetAttributeValue( attr.Key ).EncodeXml( true ) );
```

The above code is going to get the attribute definition for the `BaptismDate` attribute and then build an Attribute Value Editor field that will edit the value. If you were to use this you would also need to include a way to pass whatever value the user entered back to your form with an `x:Name` attribute or something as well. In fact, we have an entire helper method that will build a form of attributes that you can use. The above could be simplified into:

```
using Rock.Mobile;

var attributes = CurrentPerson.Attributes.Values.ToList();
var xamlFragment = MobileHelper.GetEditAttributesXaml( CurrentPerson, attributes );
```

Check out the mobile Group Edit block to see a good example of how to build a form with editable attributes by using the above method.

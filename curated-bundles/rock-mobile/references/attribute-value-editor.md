---
description: Use when building custom mobile forms that need to render attribute fields with proper Rock field type handling and validation
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

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
| ConfigurationValues | Dictionary<string, string\> | The configuration values (sometimes called attribute qualifiers) that help the field define it's options. While this is actually a dictionary, you will most likely be passing in an JSON encoded string. It will be converted for you. When passing JSON you must prefix the JSON with {} to ensure the XAML engine processes it correctly, for example: {}{"maxLength": 100}. |
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

---

## Address {#address}

*Inherits from FieldStack*

This view provides a field that allows the user to enter an address, or display an address to be updated. Because it has to account for international addresses very little validation is performed.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The title for this input field. |
| IsRequired | bool | If set to true then the user will need to enter a value. |
| SelectedAddress | MobileAddress | Contains the address as entered by the user. Valid child properties are: Street1, City, State, PostalCode, Country. |

Important

The Address field is one of the few fields that should not be displayed in a [FieldContainer](https://mobiledocs.rockrms.com/essentials/controls/content-controls/field-container) that is forced into grouped mode. It is itself a grouped view so if you try to embed it inside another grouped view then you end up with double padding and double borders.  

### Example

```
<Rock:FieldContainer>
    <Rock:Address Label="Rock Address" IsRequired="false" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67190)

If you need to provide a default address to be displayed when the view is rendered, you can do so as follows:

```
<Rock:FieldContainer>
    <Rock:Address Title="Rock Address" IsRequired="false">
        <Rock:Address.SelectedAddress>
            <Common:MobileAddress Street1="1885 Lost Ln"
                                  City="Knowhere"
                                  State="CA"
                                  PostalCode="92710"
                                  Country="USA" />
        </Rock:Address.SelectedAddress>
    </Rock:Address>
</Rock:FieldContainer>
```

---

## Campus Picker {#campus-picker}

Inherits from [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker)

The Campus Picker view is a picker that automatically populates with the campuses configured on the Rock server. The user can then select a campus from the list of items.

### Properties

See [Picker](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/picker) for available properties.

### Example

```
<Rock:FieldContainer>
    <Rock:CampusPicker Label="Rock Campus Picker"
                       IsRequired="false"
                       SelectedValue="76882AE3-1CE8-42A6-A2B6-8C0B29CF8CF8" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67191)

---

## Check Box {#check-box}

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

The Check Box field allows the user to enter a Yes/No value. It has a number of different display options that will let you control the look and feel of your page.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label associated with this input field. |
| IsRequired | bool | If set to true then the user will be required to fill this in. Only applicable with drop down style. |
| EditStyle | [CheckBoxStyle](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/check-box#check-box-style) | The style to use when displaying the edit control. Defaults to CheckBox. |
| Color | Color | Specifies the highlight color to be used when displaying as a either a CheckBox or Switch. |
| IsChecked | bool? | Gets or sets the current state of the checkbox. Defaults to false. |
| YesText | string | The text to use when displaying the truthy value in the drop down style. Defaults to Yes. |
| NoText | string | The text to use when displaying the falsey valye in the drop down style. Defaults to No. |
| Command | ICommand | Used to set the command to be executed when the value changes. |
| CommandParameter | object | The parameter to pass to the Command when the value changes. |

### Check Box Style

| Value | Description |
| --- | --- |
| CheckBox | Displays the control as a simple checkbox that the user can tap on to toggle the state. |
| Switch | Displays the control as a toggle switch. When on, it is highlighted with a color. |
| DropDown | Displays the control as a drop down. When the user taps on the control they are presented with a popup that lets them pick the option they want. |

### Example

```
<Rock:FieldContainer>
    <Rock:CheckBox Label="Show All"
                   EditStyle="Switch"
                   Color="#ee7725" />
</Rock:FieldContainer>
```

---

## Check Box List {#check-box-list}

Inherits from [Xamarin.Forms.ContentView](https://docs.microsoft.com/en-us/dotnet/api/xamarin.forms.contentview)

This field displays a series of check boxes for the user to turn on or off. An example of how this could be used is with a filter of categories where you want to display a list of categories and allow the user to pick which ones to show.

### Properties

| Property | Type | Description |
| --- | --- | --- |
| Label | string | The label associated with this input field. |
| IsRequired | bool | If set to true then the user will be required to fill this in. This value is currently ignored. |
| Options | List | The list of checkbox options that will be presented to the user. The displayed text is taken from the Name property and the stored value is taken from the Value property. |
| SelectedValues | IEnumerable | The options that have been selected by the user. This corresponds to the Value property of the parameter objects. |
| SelectedValueText | string | A comma separated list that represents the current selection as a single string. |

### Example

```
<Rock:FieldContainer>
    <Rock:CheckBoxList Label="Categories">
        <Rock:Parameter Name="All Church" Value="38" />
        <Rock:Parameter Name="Men" Value="39" />
        <Rock:Parameter Name="Women" Value="40" />
    </Rock:CheckBoxList>
</Rock:FieldContainer>
```

---

## Currency Box {#currency-box}

*Inherits from [NumberBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/number-box)*

The Currency Box view provides an input box for the user to enter a currency amount. It ensures the value is a valid decimal amount during validation.

### Properties

See [NumberBox](https://community.rockrms.com/developer/mobile-docs/essentials/controls/form-fields/number-box) for available properties.

### Example

```
<Rock:FieldContainer>
    <Rock:CurrencyBox Label="Rock Currency Box"
                      IsRequired="false"
                      Text="23.98" />
</Rock:FieldContainer>
```

![](https://community.rockrms.com/GetImage.ashx?Id=67192)

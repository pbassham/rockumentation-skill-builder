---
description: "Use when building custom field types or understanding how field types handle viewing, editing, filtering, and configuration functionality"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

Important

This is a work in progress. No other developers should be taking this as final truth yet.

## Introduction

Field types have become rather complex. This document aims to provide understanding for how field types work and the various methods that are used to provide different functionality.

## Functionality

At a high level, a field type provides 4 pieces of functionality:

1. Viewing a value.
2. Editing a value.
3. Filtering on a value.
4. Configuring behavior.

The idea is to abstract all this functionality into a single interface (both in C# and TypeScript) so that you don't have to think about the specifics when working with fields in a block. You simply tell a field type to "display the value" and it does so.

Note

Keep in mind, the field type is the recipe for how the field works, but the values for a field type are generally stored as an Attribute's AttributeValue.

## Viewing a Value

![](https://community.rockrms.com/GetImage.ashx?Id=66774)

The raw value might be naturally formatted (for example a text field type), or it might need to be formatted for human readability (such as a person field type *because the raw value is a GUID*). When viewing a value, it can be presented in one of two ways. Either as a plain text string, or as an HTML formatted string.

For example, a person field type might return just the person's full name when formatting for text display. And when formatting for HTML it might return it as a clickable hyperlink to the person detail page. However, most field types will probably output the same content for both the text formatting and HTML formatting.

## Editing a Value

![Example editing a DefinedValueFieldType attribute value](https://community.rockrms.com/GetImage.ashx?Id=66775)

Because the raw value may not be in a format that can be easily edited by the individual, custom UI controls are used by the field types to edit their values. For example, a group field type stores the value as the unique identifier of the group. But that isn't something the user can edit with just a text box. So a group picker is used to allow the individual to have a friendly interface to the underlying value.

## Filtering on a value

![Example filtering a DefinedValueFieldType attribute](https://community.rockrms.com/GetImage.ashx?Id=67340)

Field types can provide custom filtering logic to either properties or attributes of entities. This filtering is used during database queries to return a subset of results that match what the individual is looking for. Filtering also uses custom UI controls to provide the interface to select the value to filter on.

Field types can also opt-out of filtering if it does not make sense for their data type. For example, a sliding date range field type would not support filtering.

## Configuring behavior

![Example configuring a DefinedValueFieldtype attribute](https://community.rockrms.com/GetImage.ashx?Id=66776)

Finally, custom UI controls are also used to configure the behavior. These controls allow the individual to set the configuration values of the field type - often in the form of an attribute. These configuration values are then used by the other three functionalities above to configure how they behave.

For example, a text field type has options to control the maximum length of the text entry control.

## Intermediate Topics

### Configuration Values

All field types can have a set of configuration values. These take the form of key-value pairs. When used by attributes, these are stored in the `AttributeQualifier` table. The meanings of these values are dictated by the field type itself. But in general, these key-value pairs describe the behavior when viewing, filtering or editing a field type.

For example, a Text field type has a configuration value that specifies the maximum length of text that can be entered. This particular key-value pair changes the behavior of the edit control. While the URL Link field type has a configuration value that specifies if the link should be rendered as a clickable link or plain text, which only affects the viewing of a value.

### Public vs Private

Field types have a concept of public and private data. Private data is what is used by the server and is never transmitted over the wire. Public data is that same information sanitized for transmission over the wire. The private data may contain sensitive information that should not be visible to most people.

For example, the social security number field type has a private value that contains the social security number, such as `111-22-3333`. But that private value shouldn't be sent over the wire when viewing the value since we don't expose the entire value for display purposes. Instead, the public value sent is `***-**-3333`.

This holds true for both actual field values as well as configuration values.

Many field types don't really have sensitive data and can use the default implementations which just pass along the private data. But any time you are implementing a field type or adding "public" functionality to an existing field type you should question if the data is really safe to transmit over the wire.

Public data can also just be the private data formatted for use by Obsidian controls rather than C# controls. For instance, with a C# control, when you select a value from a list, it is generally stored as a GUID or ID in the database and a C# control can directly use a GUID, but Obsidian controls would require an additional call to the server to retrieve more data if they only have the GUID, so it's common to convert GUIDs or IDs into `ListItemBag`s to make it easier for Obsidian to utilize the data. If you need to do this, then you also need to write a corresponding method for converting the `ListItemBag` into a GUID or ID for storage in the database and/or use by the C# control.

Warning

Warning: Public configuration values should be thought of the same way as a public API. You can't just go changing the keys or the meanings of the values without possibly breaking something (like Rock Mobile).

## Obsidian Flow Charts

Below are a number of charts that visually describe the flow of data and the relationship of the various C# and Obsidian methods.

![Viewing a value in Obsidian](https://community.rockrms.com/GetImage.ashx?Id=66777)

![Editing a value in Obsidian](https://community.rockrms.com/GetImage.ashx?Id=66778)

![Filtering a value in Obsidian](https://community.rockrms.com/GetImage.ashx?Id=66779)

![Configuring Behavior / Editing configuration values in Obsidian](https://community.rockrms.com/GetImage.ashx?Id=66780)

## WebForms Flow Charts

Below are a number of charts that visually describe the flow of data and the relationship of the various C# methods.

![Viewing a value in WebForms](https://community.rockrms.com/GetImage.ashx?Id=66781)

![Editing a value in WebForms](https://community.rockrms.com/GetImage.ashx?Id=66782)

![Filtering a value in WebForms](https://community.rockrms.com/GetImage.ashx?Id=66783)

![Configuring Behavior / Editing configuration values in WebForms](https://community.rockrms.com/GetImage.ashx?Id=66784)

## Advanced Topics

Note

This entire section is primarily for the core team as we look at how to extract all the WebForms requirements from existing Field Types.

## C# Reference

Below is the list of methods and properties that make up a field type as well as when they are used. The methods and properties with bold typeface are the ones you are most likely to need to implement when building a new field type.

Any method or property below with the annotation of `[WebForms]` means it has dependencies on WebForms and is not used by newer functionality.

A few items are also annotated with `[Legacy]`. This means it has legacy functionality, such as old method parameters or unclear naming, that might get updated in the future.

### Viewing a Value

- GetPublicValue()
- **GetTextValue()**
- GetHtmlValue()
- GetCondensedTextValue()
- GetCondensedHtmlValue()
- **FormatValue()** \[WebForms\]
- FormatValueAsHtml() \[WebForms\]
- ValueAsFieldType()
- SortValue() \[WebForms\]
- AlignValue \[WebForms\]

The `GetPublicValue()` method is used to convert the private field value into a public one that can be used for viewing/formatting purposes by a remote device.

The 4 `Get…Value()` methods handle converting the raw field type value into one that can be presented to the individual. The "Condensed" versions should be used when space is at a premium, such as in a grid. The 2 `FormatValue…()` methods are used by WebForms for the same purpose.

`ValueAsFieldType()` is used to convert the value into a native object value. For example, the boolean field type returns an actual boolean true/false value from this method rather than a string containing the word.

`SortValue()` is used to provide a value that can be used for sorting purposes, for example an integer field type might return the value cast as an integer data type so that it can properly sort. **NOTE: This really doesn't seem to be used except by DefinedType, DefinedValue and GroupMember. Is it really needed?**

AlignValue is used to determine alignment when displayed in a grid. For example, in a table or grid, text is often left aligned while numbers are often right aligned. **NOTE: This is only used by Currency, Decimal, Integer and RangeSlider. NOTE2: This was implemented using a WebForms enum which is not compatible with NET Core.**

### Editing a Value

- **GetPublicEditValue()**
- **GetPrivateEditValue()**
- **EditControl()** \[WebForms\]
- **GetEditValue()** \[WebForms\]
- **SetEditValue()** \[WebForms\]
- HasChangeHandler() \[WebForms\]
- AddChangeHandler() \[WebForms\]
- IsValid()

The `GetPublicEditValue()` and `GetPrivateEditValue()` methods are used to convert the private value to a public value for editing and the public value back into a private value. This may return a different value than `GetPublicValue()`, but is not required to do so. For example, the social security number field type returns a masked value in `GetPublicValue()` but the entire unmasked value in `GetPublicEditValue()`.

The `EditControl()` method is used to obtain a UI control that can be used in WebForms to edit the value. Then `SetEditValue()` is used to set the initial value of that control from the private value. Finally, `GetEditValue()` is used to retrieve the private value from the control.

`HasChangeHandler()` is used to determine if the control returned by `EditControl()` supports change notification. If it does, then the `AddChangeHandler()` method can be used to add a callback for when the control's value has changed. **NOTE: Because the postback used by a change handler is expensive, not all field types or controls will support this.**

The `IsValid()` method is used to determine if the current edit value is valid for the field type. **NOTE: As far as I can tell, this method is never called and can be removed.**

### Filtering a Value

- GetPublicFilterValue()
- GetPrivateFilterValue()
- **FilterComparisonType**
- HasFilterControl() \[Legacy\]
- **FilterControl()** \[WebForms\]
- SetFilterValues() \[WebForms\]
- SetFilterCompareValue() \[WebForms\]
- **SetFilterValueValue()** \[WebForms\]
- GetFilterValues() \[WebForms\]
- GetFilterCompareValue() \[WebForms\]
- **GetFilterValueValue()** \[WebForms\]
- GetFilterFormatScript() \[WebForms\]
- **FormatFilterValues()** \[Legacy\]
- PropertyFilterExpression() \[Legacy\]
- AttributeFilterExpression() \[Legacy\]
- ApplyAttributeQueryFilter() \[WebForms\]
- GetEqualToCompareValue() \[Legacy\]
- IsEqualToValue() \[Legacy\]
- IsComparedToValue() \[Legacy\]
- AttributeValueFieldName
- AttributeValueFieldType

The `GetPublicFilterValue()` method converts the private filter value into a public value that can be sent over the wire. Then later the `GetPrivateFilterValue()` method will convert that value back to a private value.

`FilterComparisonType` property indicates which comparisons this field type supports. For example, equal to, not equal to, greater than, etc.

`HasFilterControl()` is used to determine if this field type supports filtering. If it does not, then none of their other methods or properties in this section should be considered valid.

The `FilterControl()` method returns a UI control that can be used to enter a value to filter on. The `SetFilterValues()`, `SetFilterCompareValue()` and `SetFilterValueValue()` methods are used to set the initial values from the private value. After the individual makes changes, `GetFilterValues()`, `GetFilterCompareValue()`, and `GetFilterValueValue()` methods are called to get the private value from the filter control.

The `GetFilterFormatScript()` method is used with the above web forms methods to inject script onto the web page to dynamically format the filter into a user friendly string.

`FormatFilterValues()` takes the filter value and formats it into a user friendly string that can be displayed to the individual.

The `PropertyFilterExpression()` and the `AttributeFilterExpression()` methods convert the filter value into a LINQ expression that can be used to perform the filtering on the given property name or attribute.

`ApplyAttributeQueryFilter()`: **NOTE: I don't know what this does, more specifically, why you would use this instead of AttributeFilterExpression() - especially since it takes values directly from the filter control.**

The `GetEqualToCompareValue()` **NOTE: This is always the value of EqualTo or null (in 4 cases). It is unclear why this exists instead of just inspecting the FilterComparisonType value instead.**

The `IsEqualToValue()` method checks if the filter value is an EqualTo comparison type and that the value matches the specified value. **NOTE: This does not appear to be used anywhere.**

The `IsComparedToValue()` method appears to be so it can check if the given value matches the filter value. **NOTE: Logic doesn't seem correct, and this does not appear to be used anywhere.**

The `AttributeValueFieldName` and `AttributeValueFieldType` properties are used to determine which column on the AttributeValue table holds the value for comparison as well as the data type for that value.

### Configuring Behavior

- ConfigurationKeys()
- HasDefaultControl
- **GetPublicConfigurationValues()**
- **GetPrivateConfigurationValues()**
- GetPublicEditConfigurationProperties()
- **ConfigurationControls()** \[WebForms\]
- **ConfigurationValues()** \[WebForms\]
- **SetConfigurationValues()** \[WebForms\]

The `ConfigurationKeys()` method was intended to return a list of all the configuration keys used by a field type. **NOTE: this is not actually used or kept up to date and should be deprecated.**

`HasDefaultControl` indicates if a default value control should be presented when editing the field type configuration values. For example, the Matrix field type does not have a default value as it doesn't make sense.

The `GetPublicConfigurationValues()` method is used to get the configuration values to be made public. It is passed a parameter that indicates if the public configuration values will be used for viewing, editing, or configuring. The *editing* usage configuration values should also include all the same data as *viewing* usage would. Similarly, *configuration* usage values should also include all the same data as *editing* usage would. In this way, they are cumulative to the lower usage levels.

`GetPrivateConfigurationValues()` method does the reverse of the previous method. It takes a set of public configuration values that were created for *configuration* usage and translates them back into private configuration values. For example, translating a defined type Guid to its integer identifier value.

`GetPublicEditConfigurationProperties()` is used to provide custom data to a remote device that is editing configuration values. For example, a defined value field type would include the defined types that can be selected from.

On the WebForms side, `ConfigurationControls()` gets the controls to be displayed when editing the configuration values. Then `SetConfigurationValues()` is called to set the initial values for those controls and later `ConfigurationValues()` is called to get the current values from the controls.

### Misc

- IsSensitive()
- ConvertValueToPropertyType()

The `IsSensitive()` method provides a way for field types to indicate that they work with sensitive data. For example, when logging historical changes this is used to determine if the value should be logged to history or not.

- There is also a `ConvertValueToPropetyType()` method to convert a value to a specified C# data type. **NOTE: This doesn't seem to be used anywhere and can probably be removed.**

### TypeScript Reference

In this section you will find all the methods and properties on the field type's class (found in the `Rock.JavaScript.Obsidian/Framework/FieldTypes/xxXxxField.partial.ts` file, where xxXxx is the camel case name of the field type) required to implement the Obsidian side of a field type. The methods and properties with bold typeface are the ones you are most likely to need to implement when building a new field type.

### Viewing a Value

- **getTextValue()**
- getHtmlValue()
- getCondensedTextValue()
- getCondensedHtmlValue()
- getFormattedComponent()
- getCondensedFormattedComponent()

The `getTextValue()`, `getHtmlValue()`, `getCondensedTextValue()` and `getCondensedHtmlValue()` methods provide simple formatting of the public value into a human friendly representation. The `Text` variations provide a plain text representation while the `Html` versions provide a nicely formatted markup, such as a clickable link.

`getFormattedComponent()` and `getCondensedFormattedComponent()` provide the UI components used to render the formatted (HTML) values. By default, these will simply use the `getHtmlValue()` and `getCondensedHtmlValue()` results to build the component. This allows you to render some incredibly powerful user interfaces.

### Editing a Value

- **getEditComponent()**

The `getEditComponent()` method returns the Obsidian component that will be used to edit the value. It will automatically be passed the current value as well as the configuration values. When the value changes it is emitted to the parent so there no is `getValue()` or `setValue()` methods to go along with this.

### Filtering a value

- isFilterable()
- getFilterComponent()
- getSupportedComparisonTypes()
- getFilterValueDescription()
- getFilterValueText()

The `isFilterable()` method determines if the field type supports filtering. If this returns false then none of the other filtering related methods should be called.

The `getFilterComponent()` method returns an Obsidian component that handles the filter value editing for the field type. It will be passed the initial value and the configuration values automatically.

`getSupportedComparisonTypes()` returns the bit-flag comparison types that are supported by this field type. This is primarily used to populate the drop down to select which filtering operation to perform when editing the filter value.

The `getFilterValueDescription()` and `getFilterValueText()` methods convert the filter value into a user friendly string that represents the filter operation. `getFilterValueText()` returns just the value of the filter value, for example "3". `getFilterValueDescription()` is responsible for returning a more complete string, such as "greater than '3'".

### Configuring Behavior

- **getConfigurationComponent()**
- hasDefaultComponent()

The `getConfigurationComponent()` method provides the Obsidian component that will handle editing the configuration values for the field type. It is passed the current configuration values as well as the configuration properties.

`hasDefaultComponent()` determines if a "Default Value" edit component should be included when editing the configuration values.

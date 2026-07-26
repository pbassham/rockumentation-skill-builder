---
description: Use when updating or inserting entity properties and attributes in Rock RMS databases through Lava commands
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Modify Entity

v18.0

Make changes to properties or attributes of an entity.

## Introduction

Familiar with Lava's `Entity` command for data retrieval? The **Modify Entity** command extends its capabilities, allowing you to update or insert data directly into your database, enhancing your data management toolkit.

**Warning**  
While the Modify Entity command is a powerful tool, it comes with significant security responsibilities. It's crucial to thoroughly understand and implement the security measures outlined in the following section before integrating this command into your Lava workflows.

The `modifyentity` command allows you to update a single entity in your database. Below is a simple example where we are changing the nick name, connection status, and an attribute of a specific person in the database.

```
{% assign personId = 12 %}
{% assign nickName = 'Ted' %}
{% assign connectionStatus = 67 %}
{% assign employer = 'Rock Solid Church' %}

{% modifyperson id:'{{ personId }}' %}

    [[ property name:'NickName' ]]{{ nickName }}[[ endproperty ]]
    [[ property name:'ConnectionStatusValueId' ]]{{ connectionStatus }}[[ endproperty ]]

    [[ attribute key:'Employer']]{{ employer }}[[ endattribute ]]

{% endmodifyperson %}
```

Pretty cool, right?! Let's look at some of the input options at your disposal.

## Parameters

- **id** – *(Required)* Identifies the entity to update. Accepts an integer, GUID, or IdKey. Use `0` to create a new entity instead of updating an existing one.
- **securityenabled** – *(Default: true)* Determines if entity security is enforced. Be cautious with the **Person** entity, which does not apply security checks.
- **clientvalidationenabled** – *(Default: false)* Enables automatic client-side validation when set to true.
- **return** – Specifies the key for the merge field holding the results. Defaults to `ModifyResult`.

## Properties

To edit an entity’s property, specify the property name and value. Ensure the data type and format are valid for the property.

- **name** – The name of the property to update. *Case-sensitive.*
- **injectionpreventionenabled** – *(Default: true)* Validates and blocks potentially dangerous input (e.g. strings containing `</` or script-like content). Only disable if you fully trust the data source. When enabled your value will create a validation error if it contains '<' character followed by any single digit, lowercase letter, uppercase letter, or the '/' character. This matches the logic of other places in Rock. (SQL injection prevention is provided by .Net's Entity Framework.)

## Attributes

To update an attribute, provide its key and a new value. Similar to properties, the value must match the format expected by that attribute type. For guidance on the raw values required by different attribute types, refer to the [documentation on this page](https://community.rockrms.com/lava/workflows).

- **key** – The attribute key for the attribute that you want to update.
- **injectionpreventionenabled** – Same behavior as with properties. Prevents script injection by default. (See above.)

## Property and Attribute Validation

Both properties and attributes support validation rules similar to HTML's form validation features. The Rock data model does enforce some validation for you (e.g. a group must have a name) but these settings allow you to go above and beyond.

- **isrequired** – When set to true, requires the field to have a value.
- **min** – Ensures the value is greater than or equal to the specified minimum (numeric).
- **max** – Ensures the value is less than or equal to the specified maximum (numeric).
- **minlength** – Requires the value to be at least a certain number of characters.
- **maxlength** – Limits the value to a maximum number of characters.
- **pattern** – A regular expression the value must match (valid C# RegEx). In most cases the same pattern you use in HTML will also work here.
- **control** – An optional parameter that identifies which front-end control supplied the value.
- **validationmessage** – Custom message shown when validation fails. Used for client-side validation.

## Result Merge Fields

The command outputs a merge field (default: `ModifyResult` but this can be changed by the `return` parameter) with details about the outcome:

- **Success** – Boolean indicating whether the operation succeeded.
- **Object** – The updated object, keyed by its type (e.g., If you modified a person, the key would be `Person`).
- **ErrorMessage** – Describes any issue that prevented the operation.
- **ValidationErrors** – A list of validation error details.
- **ErrorMessage** – The specific validation message.
	- **SourceControl** – The control tied to the validation rule. This is provided through the `control` parameter.

Here's how to display validation messages in your Lava template:

```
{% if ModifyResult.Success == false %}
    <div class="alert alert-warning">
        <strong>{{ ModifyResult.ErrorMessage }}</strong><br>
        Validation Messages<br>
        <ul>
        {% for message in ModifyResult.ValidationErrors %}
            <li>{{ message.ErrorMessage }}</li>
        {% endfor %}
        </ul>
    </div> 
{% endif %}
```

## Client-Side Validation

**Note:**  
Client-side validation only works with Lava Applications when using the Lava Application Content Block and Endpoint.

When `clientvalidationenabled` is set to `true` and validation settings are added to properties or attributes, the endpoint sends configuration back to the browser to display validation messages and highlight fields that need attention.


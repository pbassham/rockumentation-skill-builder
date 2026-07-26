---
description: Use when user needs to delete database entities in Lava workflows with security controls and validation error handling
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Delete Entity

v18.0

Delete an entity from the database.

## Introduction

Familiar with Lava's `Entity` command for data retrieval? The **Delete Entity** command extends its capabilities, allowing you to delete data directly from your database.

**Warning**  
While the Delete Entity command is a powerful tool, it comes with significant security responsibilities. It's crucial to thoroughly understand and implement the security measures outlined in the following section before integrating this command into your Lava workflows.

The `deleteentity` command allows you to delete a single entity in your database. Below is a very simple example where we are removing a connection request record.

```
{% assign requestId = 12 %}

{% deleteconnectionrequest id:'{{ requestId }}' %}
{% enddeleteconnectionrequest %}
```

Pretty cool, right?! Let's look at some of the input options at your disposal.

## Parameters

- **id** – *(Required)* This tells the command what entity to delete. The value can be an integer, GUID, or IdKey.
- **securityenabled** – *(Default: true)* Determines if entity security should be checked. Be careful when modifying individuals, as the Person entity does not enforce security.
- **clientvalidationenabled** – *(Default: false)* When enabled, the block will automatically wire up client-side validation. See the Results Merge Field "ValidationErrors" and Client-Side Validation section below.
- **return** – Designates a key to hold the command's results as a merge field. This defaults to `DeleteResult`.

## Result Merge Fields

The `DeleteResult` merge field (or the value set via `return`) provides details about the outcome of the delete operation. It includes the following properties:

- **Success** – A boolean value that indicates whether the entity was successfully deleted.
- **ErrorMessage** – A message describing what went wrong, if applicable.
- **ValidationErrors** – A list of validation errors, if any.
- **ErrorMessage** – The specific validation error message.
	- **SourceControl** – The UI control linked to the message (based on the `control` setting on the property or attribute).

Below is some example Lava showing how you might display error information:

```
{% if DeleteResult.Success == false %}
    <div class="alert alert-warning">
        <strong>{{ DeleteResult.ErrorMessage }}</strong><br>
        Validation Messages<br>
        <ul>
        {% for message in DeleteResult.ValidationErrors %}
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


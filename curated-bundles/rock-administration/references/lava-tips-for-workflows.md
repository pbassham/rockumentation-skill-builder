---
description: "Use when you need to access and reference workflow attributes in Lava, including formatting values, retrieving person properties, and working with unformatted attribute data"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Lava Tips For Workflows

Lava Tips For Workflows

Lava is based on Liquid, a simple templating language developed by the folks at [Shopify](http://www.shopify.com/). Rock uses Lava everywhere, so hopefully you're already familiar with it. If not, you can find more information about it on our [Lava](https://community.rockrms.com/Lava) page.

Lava lets you supercharge your workflows, creating powerful and personalized experiences. The goal of this chapter is to open up the toolbox and show you what you can create. You'll definitely want to keep this cheat sheet handy as you make your workflows.

Action fields that support Lava will have a `{{ Lava }}` notation in their help section. When you see this, you’ll have access to any of the data below.

# Attributes

Attributes are the most commonly accessed merge fields for workflows. Let's dig in to see how we can add strength to our workflows using the power of Lava and workflow attributes.

Any attribute value can be referenced using the notation `{{ Workflow | Attribute:'AttributeKey' }}`. By default, the attribute key is the name of the attribute with all of the spaces removed, although you can provide your attribute with a different key if you wish. So, if you want to display the value stored in the Attribute *Position Title*, you’d use `{{ Workflow | Attribute:'PositionTitle' }}`.

Referencing an attribute will always return the formatted value of the attribute. For example, if the *Requester* attribute was a Person type attribute, the `{{ Workflow | Attribute:'Requester' }}` merge field would return the full name of the person.

## Workflow Attributes: Accessing *Their* Properties and Attributes

One thing to keep in mind when you use attributes is that they will always attempt to display the formatted value of the object you've identified. Think of this formatted value as a "friendly value". That works great when you've got a person attribute in your workflow and want to show their name. But if you want to show something other than the person's name, you need to give Lava a bit more information about what you're looking for.

For instance, since *Email* is a person property, you can use a second parameter on the `| Attribute` filter to tell Lava you want to show their email address. Your Lava would look like this: `{{ Workflow | Attribute:'Requester','Email' }}`.

If you need an *attribute* of the person instead (for instance, their Baptism Date), start by loading the full person object from your Requester attribute, and then use a second Attribute filter in your Lava. For example: `{{ Workflow | Attribute:'Requester','Object' | Attribute:'BaptismDate' }}`

## Unformatted Attribute Values

There may be a time when you'd like to retrieve the raw value for an attribute. This would be helpful in creating links to pages that would need to know which person, group, etc. you are interested in. You can retrieve the unformatted attribute value by appending *RawValue* as a second parameter in the attribute filter. For example, using Lava of `{{ Workflow | Attribute:'Requester','RawValue' }}` would return a Person Alias GUID, since that is how the Person type attribute stores its value under the hood.

# Keep In Mind

As noted above, the Person attribute stores the GUID of the PersonAlias record, not the GUID of the Person record. This holds true even if the attribute is associated with a business.

## Link Values

Some attribute types are also considered *linkable* by Rock (currently this only includes the *Person* and *File* attribute types). For these attribute types, you can also append a *Url* to the attribute key to get a URL to the detail page in Rock used to view that type. For example, a merge field of `{{ Workflow | Attribute:'Requester','Url' }}` would return the URL value to the person profile page for the selected person.

## Attribute Security on Triggered Workflows

When Workflow actions access attribute values (for a Person, Group, etc.) via Lava, Rock performs authorization checking. When they are executed by a trigger or Job, Rock requires *All Users - Allow View* to read the values because there is no user (or CurrentPerson) to base security access checking against.

However, you can override the CurrentPerson to a person who has authorization (such as a Rock Administrator) inside your Lava by assigning the CurrentPerson like this:

`{% assign CurrentPerson = Workflow | Attribute:'[AttributeOfAdminPerson]','Object' %}`

Here's a detailed example of a *Set Attribute Value* action setting a Workflow's Boolean attribute based on the age of a person's (Requester) BackgroundCheckDate. In this example an attribute called 'Admin' of type *Person* was added to the workflow with the default person set to the Rock Administrator:

{% assign CurrentPerson = Workflow | Attribute:'Admin','Object' %}
{% assign years = Workflow | Attribute:'Requester','Object' | Attribute:'BackgroundCheckDate','Object' | DateDiff:'Now', 'Y' %}
{% if years and years < 2 %}True{% else %}False{% endif %}

# Warning

Make sure you don't have any extra spaces in your Lava output otherwise you will get unexpected results.

## Checking Boolean Attributes

When checking boolean attributes you'll need to compare the value with the *True Text* or *False Text* used when the attribute was defined. Unless you've changed it, by default a boolean attribute uses the text "Yes" and "No".

Here's an example of a *Set Attribute Value* action checking several Activity attributes in order to set a Workflow boolean attribute:

{% assign isStep1Ready = Activity | Attribute:'Step1Ready' %}
{% assign isStep2Ready = Activity | Attribute:'Step2Ready' %}
{% if isStep1Ready == 'Yes' and isStep2Ready == 'Yes' %}True{% else %}False{% endif %}

# Workflow

The workflow item represents the current workflow instance. The following merge fields are available:

Workflow = {
    "Id":,
    "Guid":,	
    "Name":,
    ""Description":
    "Status":
    "WorkflowType = {
        "Id":,
        "Guid":
        "Name":,
        "Description":
        "Order":
        "WorkTerm":
        "Category": = { 
            "Name": 
            "Description": 
        }
    }
    "Activities":\[\]
    "ActivityTypes": \[\]
}

## Examples:

- `{{ Workflow.Name }}`
- `{{ Workflow.WorkflowType.Name }}`

# Current Activity

The activity merge object has the following fields available.

Activity = {
    "Id":,
    "Guid":,	
    "AssignedPersonAliasId":,
    "AssignedGroupId":,
    "ActivatedDateTime":
    "WorkflowId":,
    "Workflow":,
    "ActivityType = {
        "Id":,
        "Guid":
        "Name":,
        "Description":
        "Order":
        "ActionTypes": \[\]
    }
}

## Examples:

- `{{ Activity.Id }}`
- `{{ Activity.ActivityType.Name }}`

# Current Action

The action has the following merge fields available.

Action = {
    "Id":,
    "Guid":,	
    "ActivityTypeId":,
    "ActivityType":,
    "ActionType = {
        "Id":,
        "Guid":
        "Name":,
        "Order":
    }
}

## Examples:

- `{{Action.Id}}`
- `{{Action.ActionType.Name}}`

# Global Attributes

Rock’s global attributes are also available for actions that support Lava. You can get a full list of these attributes under Admin Tools \> General Settings \> Global Attributes. These attributes can be accessed through Lava using:

`{{ 'Global' | Attribute:'[AttributeKey]' }}`

## Examples:

- `{{ 'Global' | Attribute:'OrganizationName' }}`
- `{{ 'Global' | Attribute:'OrganizationAddress' }}`

# Additional Merge Fields

## Merge Fields for Sending Emails

When using the *Email Send*, or *Email Send Template* actions, and using a person type attribute as the Send To Attribute Value, there will be an additional *Person* merge field that contains the current recipient. This is a full person object and can be used to reference properties of the person. For example, a merge field of `{{ Person.NickName }}` would display the recipient's nick name.

## Merge Fields for Entry Forms

In addition to the merge fields described above, the entry form also has access to the current person who is filling out the form. Merge values for the *CurrentPerson* object are listed below.

{
    "FirstName": "Alisha",
    "NickName": "Alisha",
    "MiddleName": "Mary",
    "LastName": "Marble",
    "IsDeceased": false,
    "PhotoId": 56,
    "BirthDay": 10,
    "BirthMonth": 10,
    "BirthYear": 1961,
    "Gender": 2,
    "AnniversaryDate": "1980-04-09T00:00:00",
    "GraduationDate": null,
    "Email": "alisha@rocksolidchurchdemo.com",
    "IsEmailActive": true,
    "EmailNote": null,
    "EmailPreference": 0,
    "ReviewReasonNote": null,
    "InactiveReasonNote": null,
    "SystemNote": null,
    "PrimaryAliasId": 1,
    "FullName": "Alisha Marble",
    "BirthdayDayOfWeek": "Friday",
    "BirthdayDayOfWeekShort": "Fri",
    "PhotoUrl": "/GetImage.ashx?id=56",
    "BirthDate": "1961-10-10T00:00:00",
    "Age": 52,
    "DaysToBirthday": 45,
    "Grade": null,
    "GradeFormatted": "",
    "CreatedDateTime": null,
    "ModifiedDateTime": "2014-08-26T21:28:56.99",
    "CreatedByPersonAliasId": null,
    "ModifiedByPersonAliasId": 1,
    "Id": 1,
    "Guid": "ad28da19-4af1-408f-9090-2672f8376f27",
    "UrlEncodedKey": "EAAAACE88i304vQJcwoNWW6P7fZ!2bSxiGgjyCooBFy4H332mMnPJoySCsXjQXVMJF87MynUFCAKPz4gIs1RshCy3dL7M!3d",
    "ConnectionStatusValue": {
        "Value": "Member",
    },
    "MaritalStatusValue": {
        "Value": "Married",
    },
    "PhoneNumbers": \[
    {
        "NumberTypeValue": {
            "Value": "Mobile",
        },
        "CountryCode": "1",
        "Number": "5555555555",
        "NumberFormatted": "(555) 555-5555",
        "IsMessagingEnabled": true,
        "IsUnlisted": false,
        "NumberFormattedWithCountryCode": "+1 (555) 555-5555",
    }\],
    "RecordStatusReasonValue": null,
    "RecordStatusValue": {
        "Value": "Active",
    },
    "SuffixValue": {
        "Value": "Ph.D.",
    },
    "TitleValue": {
        "Value": "Mrs."
    }
}


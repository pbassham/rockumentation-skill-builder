---
description: "Use when setting up or managing person attributes in Rock to store individual characteristics, determine if an attribute is needed, or choose appropriate field types"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Person Attributes

Person Attributes

Person attributes are a fundamental strength of Rock, so let’s spend some time unpacking this feature.

# When to Use Person Attributes

Person attributes should be used any time you want to store the characteristics of an individual. There are a couple of situations when a person attribute may not be the best fit though. Ask yourself these questions before you add a new attribute:

- **Is there already a common person element or person attribute that exists?** You’d be surprised how many duplicate attributes get created.
- **Is the attribute related to a specific group?** If so, consider making it a group member attribute instead.
- **Is this attribute really needed?** While there are many interesting things you could track about an individual, you should ask yourself if the data item is helpful to your mission. You don’t want to get overwhelmed with the number of attributes you create.
- **Will I be able to keep this attribute accurate going forward?** If the value of the attribute changes over time you should ask yourself if you’ll be able to keep it updated. Inaccurate data is often worse than no data at all. For instance, tracking a child’s height might be interesting but impossible to keep accurate. Even if it’s accurate, there’s no way for a person to verify it.

# Managing Person Attributes

Person attributes are managed from Admin Tools \> Settings \> Person Attributes. Each element of the person attribute is discussed in detail below.

![Person Attribute Edit](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/attribute-edit-v18.png)

Person Attribute Edit

As promised, let’s take a look at some attribute *Field Type* values and see how they can be used.

| Field Type | Description |
| --- | --- |
| Boolean | That’s just a fancy term for True/False. Use this for situations where the options are Yes or No, Done or Not Done. For instance, the *Baptized Here* attribute that comes with Rock is a Boolean. You were either baptized here or you weren’t. |
| Campus | Don’t use this to denote which campus someone attends. There's already a common element for that. Instead, this might be used to track which campus someone started attending or where they were baptized. Each of these could be different than their current campus selection. |
| Campuses | This allows you to pick several campuses as the value of the attribute. Perhaps you could use this to track every campus they have ever attended. |
| Date | You can probably guess what this does and how to use it. |
| Date Range | Tracks a start and end date. |
| Decimal | Stores a number with a fractional value. |
| Defined Value | Defined values are reusable lists of valid values. *Marital Status*, *Phone Type* and *Record Status* are all examples of defined value lists. You can use any of the pre-defined defined types or create your own. You can read more about defined types/values in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#definedtypes). |
| File | Allows you to upload a document into the person attribute. This is helpful for storing scanned copies of signed membership covenants or other documents you want to keep on hand. If you think you’ll be uploading a lot of documents of a specific type, you might consider adding a new *File Type*. You can read more about this in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#filetypes). When considering storing files in Rock keep in mind the storage implications of the files you’ll be adding to the system. |
| HTML | Allows you to store a fragment of HTML that's specific to the person attribute. While this is uncommon, it's useful in some cases. |
| Integer | Stores a whole number (no fractions or decimals). |
| Memo | A larger text field for entering multiple lines of text. |
| Multi-Select | Allows you to specify a list of values that multiple items can be selected from. You define the list of values by passing in a comma-separated list of items (Red, Blue, Green). You can also choose to store a separate value than the label by using the notation *Value^Text* (1^Red, 2^Blue, 3^Green). The items will be displayed as a checkbox list. |
| Person | Allows you to tie the person attribute to a specific person. Be sure to consider using known relationships before adding a person attribute with a field type of *Person* as they are often a better solution. |
| Single Select | Are very similar to the multi-select field type but only allow a single value to be selected. The single select field type has the added option of displaying the list as either a radio list or dropdown select. |
| Text | A simple single line of text. |
| Time | Allows for the entry of time to a person attribute. |

  

The field types above are the most common for person attributes, but others exist that we don’t cover in this guide. The other types may be useful in certain edge cases, but the ones detailed above should be all you need for most scenarios.

# Securing Person Attributes

The list of person attributes on the screen above also gives you the ability to secure person attributes so only a limited number of people can view and/or edit them.

# Note

By default, *All Users* can view an attribute, but only *Administrators* can edit them.

# Displaying Person Attributes

Person attributes can be viewed and edited from any tab on the *Person Profile* page. This is done by adding the *Attribute Values* block to a zone and setting it to display a specific category of person attributes. This is very flexible because a person attribute can belong to more than one category.

To add a new block to a zone, use the *Admin Toolbar* at the bottom of the page. There you'll use the to bring up the *Zone Editor* which will allow you to add a new block. For more information on the content management features of Rock be sure to see [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14/).

# Tip

Don’t limit yourself to adding *Attribute Value* blocks to only the *Extended Attributes* page. These blocks can be added under any of the tabs on the *Person Profile* page.

# Public Person Attributes

While it’s useful for your staff to see and edit person attributes from the *Person Profile* page, sometimes you may want to let people update their own attributes. For example, if you need to ask questions of people who are interested in serving, you can create person attributes for these questions and then use the *Person Attribute Forms* block on your external Rock site to prompt people for the answers to those questions. This block can be used to display any combination of person attributes and allows the person who’s logged in to fill out their own values. See the Adding Content to Rock section in the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#addingcontenttorock) book for more details on that process.

## Basic Usage

Once you’ve added the *Person Attribute Forms* block to a page, you can configure the forms and fields for it to display. Think of forms as pages that a person will navigate between using Next and Previous buttons. The fields are the person attributes to display on each form. Open the block's edit page to create the forms and select the fields. You can give each form a title to be displayed, and optionally add any header or footer HTML content to each form.

![Person Attribute Forms Settings](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/person-attribute-forms-settings-v13.png)

Person Attribute Forms Settings

When adding a field to a form, there are several options for each field that can be set.

![Field Settings](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/person-attribute-forms-fields-v13.png)

Field Settings


---

## Family Attributes {#family-attributes}

> **Path:** Person & Family Field Guide > Family Attributes

Family Attributes

We've just looked at how to add person attributes to records, so now let's consider how you can add the same functionality to families.

As you consider your data needs, you'll want to evaluate whether the data attribute best describes an individual (person attribute) or the entire family (family attribute). Say, for instance, your organization is involved in the foster care movement. You might want to note which families are participating in this initiative. You might also want to note where they are in the process of getting approved. While you could put this information on the head of household, it would make more sense to instead make these fields family attributes. This will allow both the head of house and the spouse to be able to update them on the [Person Profile](#personprofilepage) page.

# Viewing Family Attributes

Family attributes are displayed in the *Family Members* block of the *Person Profile* page. You'll note that attributes that are marked *Show in Grid* will always be displayed. Attributes not marked in this way will be displayed when the icon is clicked in the upper right of the family bar.

![](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/family-attributes-v18.png)

Family Attributes

# Adding Family Attributes

Since families are simply a group type in Rock, you'll add family attributes in the *Group Type* editor under Admin Tools \> Settings \> General \> Group Types. Family attributes should be added as "Group Attributes" within the Group Type.

# Categories Not Yet Supported

Attribute categories are not currently supported for family attributes. There are plans to add support for categories in a future release.


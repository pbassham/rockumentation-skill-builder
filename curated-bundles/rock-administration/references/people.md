---
description: "Use when needing to manage people records in Rock, including inactivating families, updating addresses, or creating/finding person records from field data"
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation > Action Categories > People

# People

All the details for the people category.

 # Family Inactivate

Show Details

v12.1

Inactivates a given person's entire family.

This workflow action will inactivate a given person's entire family, all of their families or only the individual.

The Multi-Family Logic setting controls exactly who is inactivated:

1. Inactivate individuals in the primary family
2. Inactivate individuals in all families
3. Inactivate just the individual

Additional action settings allow you to set the Inactive Reason and provide an Inactive Reason Note.

![](https://community.rockrms.com/GetImage.ashx?Guid=8ad4e95d-a006-46d0-bc24-1960482a77b5)

 # Person Address Update

Show Details

v5.0

Allows you to update a person's address based on a provided location.

Allows you to update a person's address based on a provided location.

![](https://community.rockrms.com/GetImage.ashx?Guid=63997cd4-1836-4c41-b69f-144241cc7d50)  
**Additional Details**

Here's an overview of the settings available for this action:

- **Person:** This is the workflow or activity attribute that contains the person whose family address should be updated.
- **Location Type:** If an attribute is entered for the *Location Type (From Attribute)* setting, this value will first be checked to see if there is a valid location type specified. If so, it will be used to determine the location type to update. If it is not specified, or is not valid, the *Location Type* setting will be used to determine the location type to update.
- **Location:** The address to set the person's family address to can either be entered explicitly or set from a workflow or activity attribute. If the address is not being read from an attribute, enter the address in this field.
**Location (From Attribute):** If you'd like the address to be set from one of the workflow or activity attributes, select the attribute here. This will only be used if the *Location* field is blank.- **Is Mailing Location:** If you'd like to update the flag that determines if the address is a mailing location, you can enter a value here, or select an attribute. The value you enter or the value returned by the attribute should be either 'True', 'Yes', 'False', or 'No'. Any other value will be ignored.
**Is Mapped Location:** If you'd like to update the flag that determines if the address is a mapped location, you can enter a value here, or select an attribute. The value you enter or the value returned by the attribute should be either 'True', 'Yes', 'False', or 'No'. Any other value will be ignored.

 # Person Attribute From Fields

Show Details

v5.0

Finds or creates a person record based off a provided first name, last name, email, mobile number and birthday.

This action will take a first name, last name, email, mobile number and birthday and search for a matching person in the database. The result will be placed into a selected attribute. If no person was found a new record will be created for you. If a match is found, it does not update the person record with any of the supplied values except the email address if enabled by the action setting.

![](https://community.rockrms.com/GetImage.ashx?Guid=d9607a70-6b2a-4e90-8186-da61256f8dd9)  
**Additional Details**

The record with the highest score greater than 35 points is selected as the match (if no records score more than 35 points a new record will be created).

- First/Nick Name match = 15 points.
- Last Name match = 15 points.
- If Last Name doesn't match but previous name does = 12 points.
- Mobile Phone OR Email match (or both) = 15 points.
- Month/Day match with the birthdate = 10 points.
- Year match with the birthdate = 5 points.

Other similar routines (presumably registration, etc) in Rock also consider:

- Gender Match = 3 points
- Suffix Match = 10 points

 # Person Attribute Set

Show Details

v4.0

Sets a person attribute of a provided person.

Sets the selected person attribute of the person contained in a workflow attribute to either text you provide or the contents of another attribute.

![](https://community.rockrms.com/GetImage.ashx?Guid=b9350f70-413b-4abf-ac3d-8701dd6b7c1b)

 # Person Family Add

Show Details

v10.3

Adds the selected Person to the same family as the 'Add to Family With' person.

This action uses two Person attributes to add a single person to a different family. The person will be added to the family of the person in the 'Add to Family With' attribute.

You can optionally assign a Role (Child or Adult) to the person being added using either a fixed value or a 'Group Role' attribute for the Family group type.

The person being added to the family can either remain in their old family or be removed from it, using the 'Remove Person From Current Family' setting.

![](https://community.rockrms.com/GetImage.ashx?Guid=ba552e90-870a-4545-9f00-b0da139d1143)

 # Person Follow Add

Show Details

v7.0

Sets a person to follow an entity.

This action allows you to set a person to follow a designated entity. The "Entity To Follow" field is where you enter an Entity Id or an attribute that contains the person or group to follow. This field supports Lava.

![](https://community.rockrms.com/GetImage.ashx?Guid=5e823866-10b7-4b7b-b710-4bfe9e7ccbab)  
**Additional Details**

If you are trying to mimic what happens when a person follows another person (by clicking their photo), the *Entity Type* should be set to "Person Alias" and the *Entity To Follow* must be set to the followee's PersonAliasId.

In v13, we made this easier to do. When the *Entity Type* is "Person Alias", if your *Entity To Follow* attribute holds a Person (field type), Rock will automatically use the PersonAlias *Id* from the fieldtype instead of the usual PersonAlias Guid (which would not otherwise work). v13.0

 # Person Get Campus Team Member

Show Details

v11.0

Finds a Campus Team member and stores them in a workflow attribute.

Use this action to find Campus Team members and place them in a workflow attribute for use in later actions. You can provide a person attribute to find team members at that person’s campus.

If a campus attribute is provided, only team members from that campus will be returned. The campus in this attribute will be used regardless of the person’s campus, in cases where both attributes are provided.

![](https://community.rockrms.com/GetImage.ashx?Guid=61f8b15c-c976-434f-9d86-0eed909b2626)

 # Person Get Group Attendance

Show Details

v14.1

Gets attendance information for a specified individual in a specified group.

By providing a person and a group, you can determine if that person has any attendance in that group and when they last attended. This information is stored in the attributes for Attended Boolean and Last Attended date for use later in the workflow. ![](https://community.rockrms.com/GetImage.ashx?Guid=843ae28e-5e89-4286-b842-528c90d557c7)

 # Person Get Group Type Attendance

Show Details

v14.1

Gets attendance information for the specified individual in a specified group type.

By providing a person and a group type, you can determine if that person has any attendance in groups of that type, and when they last attended. This information is stored in the attributes for Attended Boolean and Last Attended date for use later in the workflow. ![](https://community.rockrms.com/GetImage.ashx?Guid=ab42cd72-2c71-4df9-aafc-28ab4f7bedcd)

 # Person Get Head of Household

Show Details

v7.0

Gets the Head of Household of the selected person

This action takes the person identified in a `Person` type attribute and looks up the person considered their "Head of Household" (typically the oldest male). The Head of Household person will be stored in another Person type attribute. ![](https://community.rockrms.com/GetImage.ashx?Guid=233c2bfc-5bfe-4a6c-8b9d-631b98b75a84)

 # Person Get Spouse

Show Details

v5.0

Returns the person's spouse to a selected workflow attribute.

Returns the person's spouse to a selected workflow attribute. When determining the spouse the action will look for an adult in the same family who is of the opposite gender and married. If more than one person is found then the first person will be returned.

![](https://community.rockrms.com/GetImage.ashx?Guid=c2954ab5-e3df-4a82-a33d-16ff58159049)

 # Person In Data View

Show Details

v7.0

Sets an attribute True or False depending on if the person is in the selected Data View.

Sets the configured Boolean workflow attribute to True or False depending on whether or not the configured Person is in the selected Data View.

![](https://community.rockrms.com/GetImage.ashx?Guid=f98a0e4e-c986-464d-9bf5-ede42523dacb)

 # Person Note Add

Show Details

v4.0

Adds a note to a person's record.

This action adds a note to a person record. Optionally, you can set a caption, set the note author or mark the note as an alert.

![](https://community.rockrms.com/GetImage.ashx?Guid=dc9c48eb-51eb-4d70-a3cc-7690659c3a17)

 # Person Phone Update

Show Details

v5.0

Updates a person's phone number.

Updates a person's phone number.

![](https://community.rockrms.com/GetImage.ashx?Guid=6090fa3e-9cae-4012-b76d-3d43f7da6349)  
**Additional Details**

Here's an overview of the settings available for this action:

- **Person:** This is the workflow or activity attribute that contains the person whose phone number should be updated.
- **Phone Type:** If an attribute is entered for the *Phone Type (From Attribute)* setting, this value will first be checked to see if there is a valid phone type specified. If so, it will be used to determine the phone type to update. If it is not specified, or is not valid, the *Phone Type* setting will be used to determine the phone type to update.
- **Phone Number:** The phone number to use when update the person. The number can either be set explicitly or set from a workflow or activity attribute.
- **Unlisted:** If you'd like to update the flag that determines if the phone number is an unlisted number, you can enter a value here, or select and attribute. The value you enter or the value returned by the attribute should be either 'True', 'Yes', 'False', or 'No'. Any other value will be ignored.
- **Messaging Enabled:** If you'd like to update the flag that determines if the phone number has messaging (SMS) enabled, you can enter a value here, or select and attribute. The value you enter or the value returned by the attribute should be either 'True', 'Yes', 'False', or 'No'. Any other value will be ignored.
- **Ignore Blank Values:** If you do not specify a phone number, or you are setting the phone number from an attribute and that attribute is blank, this flag indicates if the phone number should be updated to a blank value or not.

 # Person Property Update

Show Details

v5.0

Updates a property (name, email, connection status, etc.) of a person.

Updates a property (name, email, connection status, etc.) of a person. This action will work with either a value you provide (Lava enabled) or an attribute value. When providing an attribute the value in the drop-down gives you a hint as to what type it should be. See the 'Additional Details' section below for more information.

![](https://community.rockrms.com/GetImage.ashx?Guid=7214b3b4-0da5-4c88-800c-8ecd61f697e8)  
**Additional Details**

Here's a couple of other tips to help you with this powerful action.

- When dealing with a property that is a defined value (like 'Title') you may either provide it with:
	1. An attribute of type Defined Value
		2. The Guid of the defined value
		3. The string representation of the defined value (e.g. 'Mr.')
- With properties that represent Enums (like gender). You can provide either the Enum as a string or an integer. The valid values are listed in the drop down.

 # Person Tag Add

Show Details

v4.0

Tag you're it!

Adds a person, stored as a person attribute, to the provided *Organization Tag*. If the supplied tag does not exist it will be created.

![](https://community.rockrms.com/GetImage.ashx?Guid=89821ffb-f794-48f6-80f1-f1bf6d05381d)

 # Person Tag Remove

Show Details

v4.0

You're not it anymore...

Like the *Person Tag Add*, this action removes a person from an *Organization Tag*.

![](https://community.rockrms.com/GetImage.ashx?Guid=89d9f389-ac4b-4340-9d48-4d56820f3dab)

 # Prayer Request Add

Show Details

v11.0

Adds a Prayer Request based on the attributes and criteria you provide.

This workflow action will add a Prayer Request for a person. The attribute values you provide related to the request, like the Category or Public options, will be included in the Prayer Request that's added.

It's important to note that you can provide the requestor in one of two ways:

1. As a person object through the entity passed to the workflow, or a standard workflow attribute that references a Person.
2. By providing a first name, last name and email address. If you choose this approach, you have additional options. If Person Matching is enabled then you can use the information to create a new person record, or match to an existing record. Or, you can disable Person Matching entirely to prevent the request from being linked to a person's record.
![](https://community.rockrms.com/GetImage.ashx?Guid=3e3de58a-9972-4d6d-b82b-55bb001521e8)

 # Reminder Add

Show Details

v15.0

Adds a reminder to a person's list of reminders.

This action adds a reminder to the provided person's record. You can set the note text, the date for the reminder, how frequently the reminder is repeated, and how many times to repeat the reminder.

![](https://community.rockrms.com/GetImage.ashx?Guid=000e7105-fc05-4fd8-89b8-cde87e4a58d8)


---

## Registrations {#registrations}

> **Path:** Workflow Actions Documentation > Action Categories > Registrations

# Registrations

All the details for the registrations category.

 # Generate Discount Code

Show Details

v8.0

Generates a new discount code on a registration template.

This action allows you to select your Registration Template from the list of all of your templates, and generates a new random discount code that people can use when registering for an event using that template. You can use text or an attribute to determine the code length (minimum length of 3 digits), the amount (in percent or real value), how many times the code can be used (useful for "the first 100 registrants get a discount" type scenarios), the maximum and minimum number of registrants that the discount should apply to, and the date range in which the code is valid. It will store the resulting code in the `Text` type attribute you select in the last box. ![](https://community.rockrms.com/GetImage.ashx?Guid=106f2701-4af9-4d79-a851-ae120a00160e)

 # Update Discount Code

Show Details

v8.0

Updates an existing discount code on a registration template.

Takes an existing registration code (as text) and updates the amount of the discount that it gives. You can optionally have this affect past registrations which used that discount code, in addition to new registrations. ![](https://community.rockrms.com/GetImage.ashx?Guid=5bbb2c63-1711-46c6-8a71-6dbd08b3ddb4)  
**Additional Details**

Be careful using the "Update Past Registrations" option- remember that people will have been told the total amounts that is due (and received a confirmation email proving it), and that if you set this to "Yes", that you're changing that amount on them in mid-stream and with no (automatic) notice. Personal contact is going to be key, if you find you have to do this.


---

## Steps {#steps}

> **Path:** Workflow Actions Documentation > Action Categories > Steps

# Steps

All the details for the steps category.

 # Step Add

Show Details

v10.0

Adds a step for a person.

You can add a Step to a person’s record through a workflow by providing the Step Type, Step Status, Start Date and End Date. As with other workflow actions, you can alternatively use Attribute Value selections. You can optionally provide a workflow attribute in which to store the returned value of the created Step, for use in later actions.

Note that the workflow will encounter an error if you try to use a Status that doesn’t apply to the Step Type.

![](https://community.rockrms.com/GetImage.ashx?Guid=f2f255ad-46d2-40f2-90f2-70f394b15cf1)  
**Additional Details**

- Campus (optional): The campus where the step was completed. v10.3


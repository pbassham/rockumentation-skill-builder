---
description: "Use when configuring event registration templates, setting up registration forms, payment minimums, or managing registration fields and attributes"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Registration Templates

Registration Templates

As you've already read, templates contain a majority of the Event Registration's configuration. There's a lot to cover, so let's get started. To keep it simple, we'll break the screen down into bite-sized chunks. You can edit registrations under Tools \> Event Registration.

# General Settings

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-template-generalsettings-v18.png)

General Settings

## Minimum Due Today and Amount To Pay Today

The *Cost* and *Minimum Initial Payment* fields described in the prior section above have a direct impact on the *Minimum Due Today* and *Amount To Pay Today* fields seen during the payment stage of the event registration process. Let's take a quick look at how these fields work together.

Let's say that you configure your template (or instance) so that it has a total *Cost* of $200 and a *Minimum Initial Payment* of $100. When the person goes to register and pay, they are limited by these settings. The *Minimum Due Today* field, which comes from the *Minimum Initial Payment* setting, means exactly what it says. The person will not be able to pay any less than $100 (in our example) no matter what. However, the person can pay more than the minimum. The limit to how much they can pay is the total *Cost* of $200.

So, in our example, the person can pay any amount between $100 and $200. Whatever amount is chosen would go into the *Amount To Pay Today* field. If a person in this scenario pays $150 today then they will be making a [partial payment](#partialpayments) and will need to provide the remaining $50 at a later time. They could split that $50 into two $25 payments by making another partial payment.

## Electronic Signatures

Let's take a moment to point out a really powerful feature that we glossed over a bit. Rock can automate the process of requiring electronic signatures after each registration. We cover this topic in detail in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#electronicsignatures).

# Forms

Now for the fun part - creating the entry form. When you see the power here, you'll have no choice but to smile.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-template-form-filters-v16.png)

Form Field List

At a minimum you must collect the registrant's first and last name. But in most cases, you'll want to add at least a couple more fields. When adding fields, you have your choice of where and how they're stored. Let's look at the options.

![Form Field Editor](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-formfields-dialog-with-callouts-v18.png)

Form Field Editor

# Add Attributes to Group Members

Only *Group Member Attributes* defined at the *Group Type* level will appear in the registration form field editor. Attributes added directly to an individual *Group* won’t be available for selection. If you need to collect information during registration and store it with group members, be sure to add the attribute to the appropriate *Group Type*.

## Lock Existing Value

As noted above, when adding a form field you can choose to *Lock Existing Value*. This simply means the person's existing record in Rock will not be changed to match what the person enters during the registration process for the given field.

Let's say you enable this feature on the Birthdate field, and Ted Decker is registering his son Noah for camp. Noah has a record in Rock already, with a birthdate of 3/10/2014. If Ted gives a birthdate of 3/11/2014 during the registration process, it will essentially be ignored and Noah's birthdate will remain locked at 3/10/2014.

Enabling *Lock Existing Value* on a form field will sometimes mean the field can be seen but not changed. In the example pictured below, this applies to the First Name, Last Name, and Birthday fields.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/event-registration-form-with-locked-fields-v16.png)

Locked Fields During Registration

In the image above it's important to note that Ted used the *Family Member to Register* drop-down, where he selected Noah Decker. This means Rock knows right away who the registration is for, so the fields with *Lock Existing Value* are not editable.

However, if the registration template is not configured to *Show Family Members* then Ted won't have that drop-down list to choose from. In that case, the *Lock Existing Value* fields will be editable so Ted can provide Noah's information manually. But just because they can be edited on the form doesn't mean the *Lock Existing Value* setting is ignored for these fields. When the registration is submitted and Noah's record is found, his existing data will still be unchanged. The same is true if *Show Family Members* is enabled, but Ted is registering someone outside of his family, as pictured below.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/event-registration-form-with-unlocked-fields-v16.png)

Editable Fields During Registration

Just remember that in the example pictured above, Katie's name and birthdate will not be changed if that information is already in Rock. Those fields can be edited during the registration process, but that's only to allow Ted to complete the form for people outside his family. The *Lock Existing Value* functionality remains in effect.

# Conditional Registration Fields

In many cases unique information will apply to each registrant. Event registration form fields have conditions that control whether they are shown/hidden based on the registrar’s selection of a prior form field value.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/example-conditional-field-regitrar1-v9.png)

Gender Field

The conditional field options will be different based on the Gender selection.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/example-conditional-field-regitrar2-v9.png)

Conditional Field From Gender Selection

First, we'll have to add the form field on the event registration template. After creating the field, a filter icon-button will be shown on the forms grid.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/example-conditional-field-filter-v18.png)

Registrant Attribute

Clicking on the icon on the *Form Field List* will display the criteria selection for that field.

# Limitations on Conditional Fields

You may have noticed in the [Forms](#forms) section above that not every field in our example registration form has the icon next to it. That's because you can’t apply conditions to every type of field on your form.

Only attribute fields that use a control which is text, list, checkbox, person picker, or date pickers can have criteria applied. In other words, if you don’t see the icon then the field type you’re using can’t have conditional logic applied.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/example-conditional-field-criteria-v9.png)

Add Criteria

Click *save.* Now you can see that the fields with conditional rules have a *highlighted filter button.*

# Registration Attributes

While customizing the template for your event, you can add Registration Attributes directly from the same section. This would allow for the collection of attributes about the registration that do not pertain to a specific registrant. Use the icon to open the attributes page.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-attributes-v18.png)

Registration Attribute Editor

Below you can see the Registration Attribute window open. Here you will create the attribute for the event. In the *Categories* drop down, you can choose to show this attribute at the start or end of the registration. If a category is not selected, the attribute will display at the end of the registration.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-attributes-page-v18.png)

Attribute Page

Attribute visibility is mainly controlled by security settings. The 'Public' checkbox pictured above acts as an override for situations where a person has rights to view an attribute, but we want to restrict visibility to attributes on public blocks. To hide a registration attribute, update the attribute's security to staff-only.

Great, now in this event template, every instance will have the same attributes on the registration.

To add a "hidden" or "staff-only" registration attribute to your template, create the desired attribute like normal and save the template. Then, edit the template and click the lock icon next to the attribute. Establish the appropriate permissions (i.e., only staff can view/edit) then save the template again. This will hide the attribute from the general public during registration, while allowing staff to view and edit it when managing registration details.

# Confirmation Email

After completing the registration, you can set up a confirmation email. This email also acts as an emailed receipt. Remember that the below settings are only visible if you enable *Show Communication Settings* at the bottom of the page under the 'Terms/Text' section.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-template-confirmationemail-v13.png)

Confirmation Email Settings

While you're free to modify this email, we've provided a template that should work in most cases. Below we've shown what this sample email will look like. Note that the highlighted section comes from the *Additional Confirmation Details* field of the registration instance.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-confirmation-email.png)

Default Confirmation Email

# Reminder Email

We all appreciate reminders. Especially for events we may have registered for long ago. On this screen you can edit the reminder emails. When you create the registration instance (discussed next), you will configure when this email will be sent. Like the other communications, these settings are only visible if you enable *Show Communication Settings* at the bottom of the page under the 'Terms/Text' section.

Keep in mind that reminder emails go out to everyone who completed a registration, including those on the waitlist.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-template-reminder-email-settings-v13.png)

Reminder Email Settings

Again, we’ve provided you with a capable template. One thing to note here is that the template relies on the registration instance's *Additional Reminder Details* to set when the event will occur. We've highlighted this part in the email below.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-reminder-email.png)

Reminder Email

# Payment Reminder Email

Allowing [partial payments](#partialpayments) is great, but getting the remaining balance has always been difficult. That was until Rock came around. With Rock you have several tools for getting the remaining balance quickly and easily. The configuration items in this section help set up the communication tools for these reminders. For the most part you can leave them as is. You can read more about these tools in the [Payment Reminders](#registration-payment-reminders) section below. Remember that the below settings are only visible if you enable *Show Communication Settings* at the bottom of the page under the 'Terms/Text' section.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-template-paymentreminders-v13.png)

Payment Reminder Email Settings

# Terms / Text

Event registrations can be used for several different kinds of events. To help fit different types of events, we allow you to customize many of the terms used during the registration process. In this section you can also configure the *success* text that displays on the final page of the registration screen.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-template-termsandtext-v13.png)

Terms and Text Settings


---

## Registration Instances {#registration-instances}

> **Path:** Event & Calendar Guide > Registration Instances

Registration Instances

Now that we understand how to make registration templates, we're ready to implement them for specific events. There are several places where you can create registration instances. Since we're already familiar with the registration template screen, let's first create a new instance here.

# Instance Settings

Clicking the from the instance grid will bring up the instance editor shown below.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-instance-settings-v18.png)

Registration Instance Settings

# Setting the Price on the Registration Instance

As we discussed in the chapter on Registration Templates, you can optionally set the cost of an event on the Registration Instance. When configured, the price options will be shown on the screen above.

## Clone Registration Instance

To create a registration instance you can use the process above, or you can use an alternative method described in the [Bringing It All Together](#bringingitalltogether) chapter. There is also a third way to create registration instances, which is to clone them from an existing instance. When viewing an instance, click the button to create a clone of that instance. Many of the settings will be copied from the original instance into the clone, such as Maximum Attendees, Registration Start/End Dates, Contact Information, and more.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/clone-registration-instance-v18.png)

Clone Registration Instance

## Timeout Settings

By default, the registration process will ensure that events don't oversell. The default behavior of the registration process is to check the number of registrants desired against the number of spots available at the start of the process. This can lead to situations where if multiple people are registering at once someone could be left without a spot after completing the registration. If there is a waitlist, they would be placed on it, but they would not know that there wasn't room until the very end.

To provide a better experience for these surge scenarios Rock has added the concept of registration sessions. When enabled, the registration process will hold registration spots for an individual while they are in the process of completing the registration. This ensures that a person has room before they start the process of registering.

When enabled, a session countdown timer will be shown on the registration page. The countdown timer resets after each page of the registration. If a registration expires the person is notified that the session has expired and is given a chance to request an extension. If there is still room for their registrants, the extension will be granted, and they can continue on where they left off. If only a portion of their registrants have slots, a message will be displayed allowing them to determine how to proceed.

# Obsidian Registration Entry Block

It's important to note that the *Timeout Length* and *Timeout Threshold* settings only apply if you're using the Obsidian version of the Registration Entry block (Obsidian \> Event — Registration Entry). Aside from supporting timeout features, this block is also compatible with the new (as of this update) Pushpay plugin. Keep in mind that the Obsidian Registration Entry block does not work with Internet Explorer.

Also, not every kind of attribute field is compatible with Obsidian yet. We're working hard on this too but most of the common ones have been working since this block was released.

# Follow A Registration Instance

After saving a registration instance you can choose to follow it by selecting the icon in the upper right corner of the details block. This will add it to the list of followed instances on [your dashboard](https://community.rockrms.com/documentation/bookcontent/5#mydashboard).

Now that we've shown you how to make a new registration instance from this page, we should tell you that you'll rarely ever create an instance from here. More about that later in the chapter [Bringing It All Together](#bringingitalltogether).


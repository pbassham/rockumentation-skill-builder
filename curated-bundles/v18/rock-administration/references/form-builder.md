---
description: "Use when users need guidance on creating forms with Rock's drag-and-drop Form Builder, configuring form fields, or setting up form-based workflows"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Form Builder

Form Builder

Rock's Form Builder lets you quickly create rich, interactive forms using a simple drag-and-drop interface. You'll be amazed at how easily and intuitively you can create stylish and professional-looking forms with only a few clicks. Of course, there are several options and features that can help bring life to your form, which we'll cover in this chapter. For instance, your forms can be configured to automatically send [communications](#form-builder-communications).

One of the best parts about this feature is that it empowers ministry staff without any technical knowledge or workflow experience to create simple form-based workflows that *could* be extended later by a more technical staff member, if desired. This applies to more than the form itself. Staff can create their own forms, send communications and get their own data analytics without needing any help. All of this is integrated into Rock without the need for a 3rd party.

![Example Form](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/form-builder-example-form-v18.png)

Example Form

As you read through this chapter, keep in mind that the form you build is actually created as a new workflow type. The name you give your form becomes the name of the workflow type, and the fields you add to your form become the workflow's attributes. Every time someone fills out the form, a new workflow of that type is launched.

Each workflow type created from a form is initially built with a single "Form Builder" activity and action. You can build on this basic structure by editing the workflow type and adding activities and actions of your own. Essentially it works the same way as having a *Form* action added to your workflow.

# Getting Started

There's nothing you need to do in advance to start using the Form Builder. You can start creating and using forms right away. In this section we'll walk you through the basic parts of the Form Builder and some of the options you have for your forms. Later we'll cover the details of adding fields to your forms for people to fill out.

Your first step will be to navigate to Tools \> Form Builder. There you'll be able to create a new form or access an existing one. But there's more you can do on this page besides looking for or creating forms.

![Form List](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/form-builder-create-new-form-v18.png)

Form List

# Category Security

Since the *Category* is treated as the parent for security purposes, individuals with Edit permission on a *Workflow Category* can also modify the category itself and manage items within it. This includes deleting workflows and deleting the category if it does not contain any workflows.

## Creating a New Form

Let's start with the basics of creating a new form. First, we'll cover how to create a form, and then we'll go over the different parts of the form that you'll be working with.

![Create new form view in Form Builder](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Create-New-Form-v18.png)

Create a Form

After clicking the Start Building button pictured above, you'll be brought to the main *Form Builder* page pictured below. This is where you'll actually design your form.

![Form Builder home screen with field list and form layout](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Form-Builder-Home-v18.png)

Form Builder Page

As pictured above, you'll see four areas on your new form. There are areas for the form's header, a Person Entry form, your form's fields and the form footer. Each of these areas can be customized by clicking the or icons along the right of each area. We'll look at each of these areas individually below.

To copy a link to your form, click the icon. Want to see what others will see? Click the icon to open a live view of your form. These options are available on most screens in the form builder, so you’ll have quick access wherever you’re working.

### Form Header/Footer

You can optionally add content to your form's header or footer area. This content will appear above (header) and below (footer) the rest of your form, as it's shown on the screen.

![Edit Form Header](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/form-builder-edit-form-header-v18.png)

Edit Form Header

### Person Entry Form

If you've ever worked with the *Form* workflow action, then you might already be familiar with the Person Entry form. This is a mini form that collects a person's information and will match the person to a record in your system or create a new record if needed. In the workflow type that gets created, the result of the information gathered here will be stored in a *Person* attribute. In most cases you'll probably want to use the Person Entry form, but it can be disabled by toggling the *Enable Person Entry* setting on the main Form Builder panel.

![Person Entry configuration in form builder](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Person-Entry-v18.png)

Person Entry Form

### Sections

A section is where you can group the fields that make up your form. You can have a single section or multiple sections. Each section has its own settings that you can use to add content and styling to your form, which we'll look at below.

![Section settings for form fields](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Form-Sections-v18.png)

Section Configuration

Those are the settings for the form section itself. Next, we'll look at adding fields to the section for people to fill out.

# Adding Form Fields

Now that you're familiar with the different parts of the form you're ready to start adding fields. Fields are pieces of input that the person filling out the form is asked to provide. Fields are added to the form by clicking them from the left of the page and dragging them into a section on the right. For instance, you might add a *Boolean* field if you want the person to answer a simple Yes/No question. You might add a *Text* or *Memo* field if you want the person to provide a typed answer to a question. There are many field options for gathering different types of data from the person. Let's look at adding some fields to a form.

![Adding form fields in the Form Builder](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Adding-Form-Fields-v18.png)

Adding Form Fields

## Adjusting Field Settings

There are many types of fields you can add to your form, and each of them has unique settings that are specific to the field. For instance, if you use a *Single-Select* then you'll need to provide a list of values that the person can choose from. We won't cover every possible field and its configuration in this document, but there are elements that all fields on your form share.

![Adjusting field settings for a Number field](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Adjusting-Field-Settings-v18.png)

Field Configuration

Let's pause for a moment to talk a little bit more about the *Column Span* setting referenced above. The width of your form is broken up into 12 equal sized columns. So, adding a field that is 12 columns wide means that the field will be the full width of the form. If you want multiple fields on the same line/row, you can reduce the widths of the fields. For instance, a field that is six columns wide can be on the same line as another field that is six columns wide. In that case both fields would be half the width of the form. Or you could have four fields that are each three columns wide, allowing all four fields to be on the same line. The key is remembering you have 12 columns total to work with.

# Navigating the Form Builder

Each form has settings that are broken down into five areas. These areas can be accessed by clicking the corresponding tab near the top of the page when editing a form, or by clicking on an area when viewing the list of forms under Tools \> Form Builder. So far, we've only been focusing on one of those areas, the Form Builder itself. Now let's take a look at some of the other features and functions that are available in the other areas.

## Submissions

This is where you'll find a filterable list of the form's submissions. Clicking on one of the rows will bring you to the *Workflow Detail* page for that submission. The grid actions let you do powerful things, like launch a workflow for each submission.

![Submissions](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/form-builder-submissions-page-v18.png)

Submissions

## Communications

After a form has been submitted you have two options for sending automatic emails. You can send a *Confirmation Email* to the person who submitted the form, and you can send a *Notification Email* to recipients of your choosing. In either case you have the option of using a pre-configured Email Template or a custom email that you create on the page.

![Communications tab with confirmation and notification email settings](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Form-Communications-v18.png)

Communications

When you're working with an *Email Template*, you can choose from any of your *System Communications* assigned to the *Form Builder* category. To create a new template, or use one you've already set up, go to Admin Tools \> Settings \> System Communications. Be sure to assign the *Form Builder* category when creating the communication so it appears as an option for confirmation or notification emails.

The *Notification Email* is a little unique. Here you have the option of sending the email to a *Campus Topic Address*. Campus Topics and the associated email addresses are configured for each campus under Admin Tools \> General Settings \> Campuses.

## Settings

The settings area is divided into two parts, *General Settings* and *Completion Settings*. You won't make changes here very often, but you should be familiar with some of the options available to you.

![Form settings configuration panel](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/Form-Settings-v18.png)

Settings

## Analytics

The *Analytics* page lets you see, for a selected timeframe, how many times the form has been viewed and how many times it has been submitted. There is also a *Conversion Rate* indicator, showing the percentage of people who viewed the form and then proceeded to complete it.

![Analytics](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/form-builder-analytics-page-v18.png)

Analytics

As noted near the top of the block, these statistics are only collected if the Workflow Entry block hosting the form is configured a certain way. Within the Workflow Entry block's settings, you'll need to enable *Log Interaction when Form is Viewed* and *Log Interaction when Form is Completed* to gather these statistics.

## Form Links

Forms are only effective if people can find them—and Rock makes that simple. You can quickly share a form by clicking the icon and selecting Copy Link. You even have the option to choose which page to share from.

![Form link generation options](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/link-to-a-form-v18.png)

Form Sharing

# Enable Form Sharing

If you don’t see a link to the page where you placed a Workflow Entry block, the block might not be set up for sharing. To generate a shareable link, make sure *Enable for Form Sharing* is turned on in the Workflow Entry block settings.

# Form Builder Templates

Often, you'll have multiple forms that share similar configurations. For instance, you might want a consistent header across several forms, or you might want all of your forms to include specific Person Entry fields. That's where Form Templates come in, saving you time by letting you create a template and then apply that template to your forms. On top of that, the settings you define in your template can't be changed by a person editing the form, so you can rest assured that your template configuration will be applied exactly as intended.

To create or edit form templates, navigate to Admin Tools \> General Settings \> Form Builder Templates. Pictured below is an example template showing the different options you have. These are the same settings, and have the same functions, as the form settings described in previous sections above.

![Form Template](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/form-builder-form-template-v18.png)

Form Template


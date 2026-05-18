---
description: "Use when user needs guidance on configuring workflow entry forms, form commands, activities, or form chaining in Rock administration"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Working With Entry Forms

Working With Entry Forms

Workflow entry forms are one of the most exciting features of Rock's workflow engine. They allow workflows to interact with people in some powerful ways. With them, you can create mini-applications that once required a dedicated developer to produce.

The backbone of form entry is the *Form* action. This is what presents the form to the person. Let's unpack its usage a little more and see what its capabilities are.

# Form Action

To help us understand this action better, let’s go back to the simple *HR Position Request* example from earlier, specifically the first entry form that Ted used to start the request. Below is a screenshot of the entry form action used in that workflow.

![Form Entry Sample](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/form-entry-sample-v12.png)

Form Entry Sample

# Learn More

For even more details about the Form action and the available options, be sure to check out the [Workflow Actions Documentation](https://community.rockrms.com/WorkflowActionCategory?Category=2#form).

# Entry Form Commands

Commands allow people filling out the form to execute different logic based on their selections. For instance, on an approval entry you might add two commands of *Approve* or *Deny*. Depending on which command is selected, different activities and/or actions can be run. There are two different ways commands can trigger logic. Let’s consider both in detail.

## Commands That Launch Activities

You can have your commands activate new activities when they are selected. You do this by selecting the activity using the *Activate Activity* property of the command. When selected, the command will activate the selected activity.

## Commands That Set Attributes

Sometimes you may not want to launch a new activity based on a command. Instead, you can use actions within the same activity to process any next steps. In these cases, simply leave the *Activate Activity* field empty. When empty, the next action in the current activity will be executed when the entry form is completed. You can even have the command that was executed entered into a workflow attribute using the *Command Selected Attribute*. This is helpful when multiple commands are available, and you'd like to know which one was selected.

## When To Launch New Activities

You might be wondering when you should launch new activities and when you should not. The choice is really up to you. But here are a couple of thoughts to help you drive your decision:

- In approval forms it's common for each option to launch a new activity. This allows the decision-making logic to be clearly separated into different activities.
- If you're using form chaining (more info below) based on a person's input, you may elect not to use new activities.

# Entry Form Chaining

In our sample HR workflow, you'll remember that the initial entry form asked if the position was full-time or part-time. Depending on the person's selection, they were taken to a new entry form based on their input. This is a feature called entry form chaining. When the command on the first form is executed, the workflow is activated and processed. If any action in the workflow assigns a new entry form action for the current person, its form will be shown. This is a very powerful feature because it allows you to build complex interactions with the person.

Let's look at how the sample position request form was configured for chaining.

![Entry Form Chaining](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/entry-form-chaining-v13.png)

Entry Form Chaining

Instead of using action filters, we could have launched separate activities to get the details for each position type, one for full-time and one for part-time. In this case though, the action filters seemed a better option.

# Emailing From the Entry Form

In many cases you'll want to email an individual to let them know that a workflow needs their entry before continuing. While you're welcome to configure the *Email Send* action to do this, there is a short-cut built into the *Entry Form* action.

![Entry Form Email](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/entry-form-email-v12.png)

Entry Form Email

## Workflow Email Templates

The default communication template that ships with Rock will list the values of all of the workflow attributes selected on the entry form in the email. If this is not what you'd like, you can either create your own email using the *Email Send* action, or you can create a new template. This new template can be created under Admin Tools \> Communications \> System Communications. In order for the template to be displayed on this list, it must be added to the *Workflow* category.

# Commands In The Default Email Template

As we mentioned above, the default email template will list all of the attributes selected for the entry form. Also, if there are no required fields for the form, it will add buttons for each command. If an entry field is required, the commands won't be shown.

See our [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information on system communications and communications in general.

# Buttons

Buttons on entry forms have several capabilities. Learning to extend them can help you build even more power into your workflows.

## Button Types

You'll notice that Rock ships with several different button types. These provide the basic styles for the buttons. You can define new types under Admin Tools \> General Settings \> Defined Types \> Button HTML. When you define a button, you must provide mark-up for both a normal webpage and an HTML email.

## Cancel Buttons

All buttons on a form will cause 'validation' to occur. This is a fancy term for checking that all the required fields are provided for. Sometimes though you want to provide a cancel button. Having to fill out all of the required fields just to cancel can be annoying. To keep the validation from occurring simply use the *Cancel* button type or change the {{ ButtonClick }} merge field to be "return true;".

# Using Person Entry

Often, one of primary reasons for using the Form action is to collect information about the person who is filling out the form. For instance, you might want their name, email address and phone number. This kind of information is requested so often that Rock has a feature to automate adding these kinds of questions to your form. As if that weren’t enough, this feature will also create a record in Rock if the person doesn’t already have one. If the person is in Rock, this will find their record and it can be used to update their information.

Unlike other items on your form, you don’t need to create workflow attributes for these questions. As described below, all you need to do is *Enable Person Entry* and pick what you want to ask the person for. Let’s take a look.

![Person Entry Configuration](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-form-enable-person-entry-v15.png)

Person Entry Configuration

## Person Entry Matching Logic

Below are a few notes on how person matching will work in certain circumstances. For the most part things will work as you expect, but there are a couple of scenarios to be aware of.

### Spouse Matching

When the person fills out the *Person Entry* fields for themselves and their spouse, Rock will attempt to match both people to existing records in the system. If it finds a match for both people, but if those two people aren't in the same Family, then a new record will be created for the Spouse. This new record will be added to the Family of the person filling out the form.

### Autofill Name Changes

There is some special logic that occurs if *AutoFill Current Person* is enabled, but the Name fields are changed when the form is being filled out. If the person that was used to auto-fill the fields changes the First Name or Last Name, then Rock assumes they mean they mean to create or match a new person. If this happens, this matched or new person won't be added to the current person's family.

For instance, let's say Ted Decker is logged in and filling out a form with *AutoFill Current Person* enabled. Ted's information, including first and last name, will automatically be populated. But what happens if Ted changes the name to fill out the form for someone else? There are different scenarios as described below.

- **Scenario 1:** If Ted changes the Name fields to his son's name, Noah Decker, then Rock will check to see if there's enough data to make a match to the existing Noah Decker. However, a match to the existing Noah Decker would need to match Noah's email and/or cell phone too, so a new Noah Decker record could easily be created.
- **Scenario 2:** If Ted changes the Name fields to NewBaby Decker, he might be thinking he is adding his new baby to the family. Instead, the same logic described above will be used, where Rock will try to match the person or create a new person. In this case, NewBaby Decker will probably be a new person in a new family.
- **Scenario 3:** If Ted changes the Name fields to Bob Smith (Ted's neighbor), Rock will do the same thing as described above. A new person in a new family will be created unless a matching person record is found. In this case, Rock is doing what Ted probably expects to happen.

### Security Exceptions

Don't forget that person matching may be suspended due to Account Protection Profile considerations. It's possible a new record will be created for this reason, even if the person has an existing record. See the [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#securitysettings) for details.

# Conditional Logic

Each of your form's fields can have conditional logic applied. This lets you show or hide the field based on how the person answers other questions in the form. Let's take a look at how this can work in the Position Approval example workflow we've been using.

Let's say we only want the Number of Hours field to appear for the person if the position Type is "Part-Time". All we need to do is click the icon for Number of Hours to add this condition.

![Add Condition to Field](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/add-condition-to-entry-form-field-v18.png)

Add Condition to Field

In the screen that pops up, you'll need to click Add Criteria to start adding the logic for your condition. You have several options available.

![Adding Criteria](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/entry-form-conditional-field-modal-v18.png)

Adding Criteria

When a logical condition has been added to an entry form field, the will turn orange as pictured below. Now the Number of Hours field will only be shown to the person filling out the form if they selected Part-time as the position Type.

![Added Condition to Field](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/entry-form-conditional-logic-added-v18.png)

Added Condition to Field

# Limitations on Conditional Fields

While every field can have conditional logic applied, you may notice that not every field in your form can be used as criteria within your conditions.

Only fields that use a control which is text, list, checkbox, person picker, or date pickers can be used as criteria. In other words, if you don’t see the field you're looking for when setting up conditions then that field type can’t be used.


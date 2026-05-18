---
description: "Use when building forms with validation rules, handling form submission, or implementing required/optional field validation in Obsidian components"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

Forms and validation are tightly coupled in Obsidian. The component that handles the form is also in charge of performing validation and displaying any issues.

Forms are made up of three pieces:

1. The RockForm component. This component controls the validation process.
2. The RockFormField component. This guy is in charge of displaying the standard label, help bubble and CSS classes for indicating an error condition. It is also in charge of performing validation on a specific value.
3. The input field components. These are your text boxes, drop down lists and other components that accept input from the individual. Internally, these wrap themselves inside a RockFormField.

The example below will construct a form with two text boxes. One will be required and the other will be optional.

```
<RockForm @submit="onFormSubmit">
    <TextBox label="Required Field" v-model="requiredValue" rules="required" />
    <TextBox label="Optional Field" v-model="optionalValue" />

    <RockButton type="submit">Save</RockButton>
</RockForm>
```

Validation of field values is rule based. Each input field component has a `rules` property that specifies the validation rules that the value must adhere to. The most common rule you will run into is the `required` rule. This specifies that the value must not be null, undefined, empty string, etc.

Let's look at the TextBox component. Internally, it wraps itself in a RockFormField and passes the current value to the RockFormField along with any rules you define. Whenever the value changes, RockFormField runs that value through all the rules. If any of the rules fail to validate then it will notify the RockForm that it has failed validation. If all the rules pass then it will notify the RockForm that it has passed validation.

Then when a submit button is clicked, RockForm will check all those validation results. If any have failed it will display a standard validation NotificationBox and stop the submission. Otherwise, if no errors are detected, it will emit the `submit` event. You can listen to this event and then handle submitting the data to an API or using it however you need. This also means you don't need to ever check if all the fields are valid, it's handled for you!

Each validation rule has a JavaScript/TypeScript function behind it that is passed the value and can then process it. We already mentioned the `required` rule which is straight forward. The `email` rule uses a regular expression to validate the value and make sure it is a valid e-mail address.

These functions can also be passed parameters to augment their behavior. The `startswith` rule ensures that the string value is either blank or begins with a specific text value which is passed in with the rule. For example, the rule `startswith:fox` requires that the text value must begin with the word `fox`.

Remember that multiple rules can be applied. Because of this, rules tend to be open minded. For instance, the `startswith` rule allows empty strings. The reason is that this allows you to decide if you want it to be required. You can use just the `startswith` rule and allow an empty string. Or you can use the `startswith` rule along with the `required` rule to require them to enter *some* value and also that value must begin with a specific set of characters.

There are many blocks on a page, and even within a single block there might be multiple forms that should not interact with each other. When you place a RockButton on a page whose type is `submit` then it will cause the closest parent RockForm to begin the validation and submit process.

This means if you want to group components together in a form, just make them children of that RockForm. Then create a second RockForm and put other components in that form.

There are some edge cases that prevent you from placing your RockButton inside the actual RockForm. Perhaps the input fields are in one part of the page but you need to place the button somewhere else so that it visually looks correct, but logically is not part of the DOM tree. To account for these situations a prop is exposed called `submit` that allows you to trigger the submit process just as if a submit button was clicked. By setting the value to true it will begin the submit process. Then when the process finishes (either by failure or succeeding) it will change the submit value back to false.

Important

This is not the same as the submit event. If you set the submit property to true, you will still get a submit event emitted to you if the submission should proceed.  

Using this prop, you can do something like the following:

```
<RockForm v-model:submit="isFormSubmitting">...</RockForm>
```

Then if you set the `isFormSubmitting` value to `true` the form will begin the submission process.

Another edge case is knowing when the form has validation errors or not. Sometimes you have multiple forms on the page and you need to make sure all of them are valid before starting some process. The RockForm component will give you access to the current list of validation errors.

This is done by way of emitting the `validationChanged` event. The parameter passed to the event is an array of `FormError` objects. This contains the name of the field and the current validation error. If the array is empty, then no validation errors exist. This event will be emitted any time the internal list of validation errors change, so it will be emitted even before you click the submit button.

Full definition coming soon, but here is the quick list:

- required
- email
- notequal
- equal
- gt
- gte
- lt
- lte
- datekey
- integer
- decimal
- ssn
- url
- endswith
- startswith
- nohtml

Coming soon...

---

## Blocks {#blocks}

## Overview

A block is made usually made up of two parts: a server part and a client part.

The first part is the server part and is written in C#. This part is always required. This contains any logic required to view, edit, and otherwise interact with the person viewing the page. This does not handle any UI, just the logic required to provide the information to the UI.

The second part is the client part. It can either be Obsidian, Rock Mobile, or some future UI framework. This is what handles the UI and the direct interaction with the person viewing the page. This part is optional for a web-based block, though that would be rare. A web block can return raw HTML to be rendered so if it is displaying purely static content with no interactions available then a client-side part is not required.

This can be seen in the image below showing the Queue Detail block. In the top of the solution we have the `QueueDetail.cs` file that provides the server side logic. This lives in the Rock.Blocks assembly, though plugins would have their own assembly and namespace for these classes. In the bottom half of the solution we have the files that make up the Obsidian client side of the block: `queueDetail.obs`, `viewPanel.partial.obs`, `types.partial.ts`, and `editPanel.partial.obs`.

![](https://community.rockrms.com/GetImage.ashx?Id=66766)

By convention, the main Obsidian file (the one without `.partial` in its name) lives in the folder that corresponds to the domain (in this case `Bus`). This matches the location of the C# class (which also lives in a folder called `Bus`). Any additional files that should be compiled into the main Obsidian file (those with `.partial` in their names) live in a sub-directory that matches the main filename. In this case that is `QueueDetail`.

Data flows between these two parts as JSON objects. The server code gathers all the information required to render the UI. Such as the queue name and description. These are placed into a dictionary which is encoded as a JSON object and sent down to the client. In this case the web browser running the Obsidian code.

The client can then render the UI. During the lifetime of the block's UI, it can communicate back to the server code by making block action API calls. These are special API endpoints that get routed directly back to the block. This means your normal block security is enforced and all your block settings are available. Any information that needs to be sent to the server is encoded as JSON data and then automatically decoded before being passed to the C# method.

The C# method handling the block action can perform whatever logic it needs and then return a response to the client, again by way of a JSON encoded object.

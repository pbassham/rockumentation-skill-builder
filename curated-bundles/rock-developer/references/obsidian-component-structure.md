---
description: "Use when building or structuring Rock Obsidian components, including template setup, imports, properties, events, and component architecture"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

## Overview

### File Format

An Obsidian component is essentially an HTML file with some sugar sprinkled into the <script\> tag for you. The HTML markup used as the template is, conveniently, stored in a <template\> tag at the root level.

There are 4 major parts that make up the component.

1. HTML Template (🟥)
2. Imports (🟦)
3. Properties and Events (🟧)
4. Logic (🟩)

The HTML markup used as the template is, conveniently, stored in a <template\> tag at the root level. Everything else will be inside a script tag.

The script tag's "setup" attribute adds the special sugar that makes things magical.

![](https://community.rockrms.com/GetImage.ashx?Id=66765)

## Imports

A component will import other components that it plans to use as well as any directives it will be using. Anything you import will automatically be available for use in the template.

## Properties and Events

Properties describe what information can be passed into a component as well as the allowed data types each property supports.

Each property must be defined with a type that tells the engine what data types are valid to pass in. This is also used by TypeScript to do proper type checking when accessing the values. A property data type can be any valid type such as String, Number, Array, Object or even Function.

Important

While functions are supported, you should probably ask yourself why you are using one. It isn't wrong to use a function, but depending on the use case you might be using a prop function when you should be emitting an event.  
An example of a good use of a function prop would be a function to load items asynchronously that will be used by the component. This allows the component to await the result and provide a clean UX.

Property definitions can also contain one of two other key values to modify the behavior of that property: `required` and `default`.

If a property has a default value specified then it is automatically assumed to not be required. Remember that a default value only applies if the parent component did not specify a value for the property. If the parent component passed in `null` then that is the value you will get and the default will not be applied.

The required value is used to indicate if the value should be required, which primarily indicates to TypeScript that it can safely assume the value won't be `undefined`. A required value should be used with caution because there is no guarantee that the parent component will comply with you indicating the value is required.

```
/** The title to display in the alert. */
title: {
    type: String as PropType<string>,
    default: ""
}
```

The above defined a property called `title`. It must have a string value. It isn't required, and if no value is specified then an empty string will be set as the default value.

So if properties are for handling information that can be passed into a component, events provide the opposite functionality. An event allows a child component to pass information back to the parent component.

This information can be as simple as a plain event without parameters to indicate "something happened" such as an event called "cancel" to indicate the user wishes to cancel the operation. Events can also include one or more arguments that contain additional data. In the example above we have declared an event called `timeout` with a single string parameter that contains the reason for the timeout.

The way you define events may look a little odd, but there is a reason. The event name is the key of the `emits` object. The value of the event is a function that is called to validate the parameters passed to the event. Even though we simply return `true` without performing any validation, TypeScript uses this information to enforce type checking on the event. If you were to try and do something like `emit( "timeout", 5 );` you would get a compile error because `5` is not of type `string`.

```
const emit = defineEmits<{
    (e: "timeout", msg: string): void,
    (e: "update:modelValue", value: number): void
}>();
```

The above defines a single emit function that will emit one of two things: A `timeout` message or an `update:modelValue` message. Each message takes a different parameter type.

## Logic

All the logic of a component is contained in a function called `setup`. Everything else inside the script tag is the custom logic. You can declare functions and variables to use while performing any processing you need. This logic will be executed before the component appears on screen.

If you are coming from a WebForms background, think of everything inside the `template` tag as what would be in your .ascx file and everything inside the `script` tag as what would be in your code behind .cs file.

When you are declaring your values that will be used by the HTML template, or even internally in the `script` tag, remember that you need to use `ref` and `computed` values. Both of these value types allow components (including yourself) to monitor for changes to the actual value.

If you simply declare a variable with `let` and then try to use that in your HTML template, it will appear to work. But if you ever change the value of that variable, nothing will know it changed. Using a `ref` to do the same adds in all the required logic for change notification. Using `computed` is similar, except you are defining a function that computes the value rather than explicitly assigning the value.

## HTML Template

The final piece of your component is the HTML template. When your component is instantiated, the content of the template is compiled into DOM structure. The template consists of a mix of both plain HTML as well as references to other child components that you are using and directives (special attributes) to add control flows and other rendering logic. This can be as simple as a `div` and a couple `spans` or an incredibly complex mix of HTML and child components.

Important

If you find your template becoming quite large then it might be a sign you need to break it up into smaller components. Smaller components are easier to maintain and test and less prone to accidental breakage.

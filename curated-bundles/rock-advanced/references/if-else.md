---
description: Use when you need to implement conditional logic with if/elsif/else statements or compare values in Lava templates
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Tags > If / Else

The `if` tag is the foundation of conditional logic in Lava. While simple in its syntax there are a couple of nuggets of wisdom you'll want to understand to maximize its effectiveness.

## Basics

Below is the basic usage pattern for 'if' conditions.

```
{% if Person.NickName == 'Ted' %}
    Great Guy!
{% elsif Person.NickName == 'Alisha' %}
    Great Gal!
{% else %}
    Who are you?
{% endif %}
```

**Time Saving Tip:** Note that the 'elsif' in Lava does not have a space in it. If you're used to languages like C# that do you could get some frustrating results that may end in premature hair loss. There, you're welcome.

**Warning:** You may be tempted to use filters in your `if` statement. That won't work. You must first create a variable for your filtered content and then use that variable in your if statement.

The if statement takes the following operators:

| \== | equals |
| --- | --- |
| != | not equal |
| \> | greater than |
| < | less than |
| \>\= | greater than or equal |
| <\= | less than or equal |
| or | condition A **or** condition B |
| and | condition A **and** condition B |
| contains | checks for the presence of a substring inside a string (case-sensitive) |

## Checking for Things That Don't Exist

Checking for things that don't exist is a common task. In Lava that's simple... if you know a couple of test options. Let's see...

### Testing If A Property Exists

The first test is to check if a property even exists. Consider this example.

```
Input:
"Person": {
    "FullName": "Ted Decker"
}

{% if Person.CallSign %}
    {{ Person.FullName }} you have a call sign... you must be cool!
{% else %}
    Oh... hi {{ Person.FullName }}
{% endif %}
```

### Testing For An Empty Property

This next test tests if an existing property is empty. Consider...

```
Input:
"Person": {
    "FullName": "Ted Decker",
    "MiddleName": ""
}

{% if Person.MiddleName == '' %}
    {{ Person.FullName }}, what no middle name?!
{% endif %}
```

In the example above the Person has a MiddleName property but it's empty so the message will be displayed.

You can test for the existence of a property and if it contains a value in a single statement like:
```
{% if Person.NickName and Person.NickName != empty %}
```

### Testing For Empty Arrays

To check for an empty array you could test the size of an array, but it would be easier to test with the evaluation below.

```
{% if Person.PhoneNumbers != empty %}
    You have phone numbers
{% endif %}
```

## Checking Non-Text Things

It's nice when things are simple text strings, but sometimes you need to compare things like dates, numbers (integers or doubles), and true or false things (booleans). In these cases you can use the special [*As\*\*\*\*\**](https://community.rockrms.com/lava/filters/other-filters#asboolean) filters to convert something to the correct "type" of data.

```
{% assign isTrained = CurrentPerson | Attribute:'IsTrained' | AsBoolean %}
{% assign age = CurrentPerson | Attribute:'AgeInYears' | AsInteger %}
{% assign date = CurrentPerson | Attribute:'BaptismDate' | AsDateTime %}
```

If you didn't convert your number-string to an actual number, your "3" would be considered greater than the number 10:

```
{% assign AgeInYears = CurrentPerson | Attribute:'AgeInYears' %}
AgeInYears: "{{ AgeInYears }}"<br>

{% if AgeInYears > 10 %} 
    {{ AgeInYears }} is greater than 10???
{% endif %}

-- renders --
AgeInYears: "3"
3 is greater than 10???
```

### True, False, or null

When checking boolean attributes, we recommend you always use the [*AsBoolean*](https://community.rockrms.com/lava/filters/other-filters#asboolean) filter before comparing to `true` or `false`. You might also be interested in knowing that a value could also be `null` if the value has not yet been set.

```
{% assign isTrained = CurrentPerson | Attribute:'IsTrained' | AsBoolean %}
isTrained is : "{{ isTrained }}"<br>

{% if isTrained == true %}
    Evaluates to true
{% elsif isTrained == false %} 
    Evaluates to false
{% elsif isTrained == null %} 
    Evaluates to null -- meaning there is no value stored
{% else %}
    Evaluates to something else?
{% endif %}

-- renders --
isTrained is : ""
Evaluates to null -- meaning there is no value stored
```

## Order of Operations

When using more than one `and` or `or` operator, operators are checked in order from *right to left*. You cannot change the order of operations using parentheses — parentheses are invalid characters and will prevent your tags from working.

```
{% if true or false and false %}
  This evaluates to true, since the 'and' condition is checked first.
{% endif %}
```


---

## Case {#case}

> **Path:** Lava > Tags > Case

The case statement is helpful when you have more than a couple of conditions.

## Overview

The syntax of the `case` statement is simple to comprehend.

```
{% case Person.NickName %}
{% when 'Ted' %}
    Hi Ted!
{% when 'Alisha' or 'Bill' %}
    Hello Marbles!
{% else %}
    Have we met?
{% endcase %}
```
*Case works with strings. If you need to do anything with numbers, etc. then use the if/else tag.*


---

## Cycle {#cycle}

> **Path:** Lava > Tags > Cycle

Often a need will arise to alternate between different values (CSS classes, colors, etc.) While you can do this manually yourself, the cycle tag simplifies this task immensely.

Cycle tags are especially useful when used inside of iterating tags like the for tag.

## Basic Usage

The cycle tag takes a list of strings and alternates which is displayed in order.

```
{% cycle 'red', 'green', 'blue' %}
{% cycle 'red', 'green', 'blue' %}
{% cycle 'red', 'green', 'blue' %}

-- output --
red
green
blue
```

## Cycle Groups

What's better than a single motorcycle rider...? Yep, a biker gang! Lava cycle tags similarly (or maybe not so similarly) can be grouped together. This allows you to have several separate cycle tags going at once.

```
{% cycle 'colors': 'red', 'green', 'blue' %}
{% cycle 'colors': 'red', 'green', 'blue' %}
{% cycle 'colors': 'red', 'green', 'blue' %}

{% cycle 'numbers': 'one', 'two', 'three' %}
{% cycle 'numbers': 'one', 'two', 'three' %}
{% cycle 'numbers': 'one', 'two', 'three' %}

-- output --
red
green
blue

one
two
three
```


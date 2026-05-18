---
description: "Use when building loops in Lava templates to iterate over arrays, control iterations, or access loop helper variables like index and first/last flags"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Tags > For

The for tag is the main iteration (loop) mechanism in Lava. While it's fairly simple to use it does have some powerful tools to allow you to do some creative things.

## Basic Usages

The `for` tag is simple to implement over arrays of objects.

```
{% for campus in Campuses %}
    {{ campus.Name }}
{% endfor %}
```

## Helper Variables

During every for loop the following helper variables are available to assist in building magic.

| forloop.length | total number of times the loop will iterate |
| --- | --- |
| forloop.index | index of the current iteration |
| forloop.index0 | zero based index of the current iteration |
| forloop.rindex | number of iterations left |
| forloop.rindex0 | zero based number of iterations left |
| forloop.first | boolean set to true if this is the first iteration |
| forloop.last | boolean set to true if this is the last iteration |

If you have a for loop within a for loop you can get the same values above for the parent loop using the `parentloop` object. Example: `{{ parentloop.index }}`

## Influencing Iterations

You can control the number, starting position and direction of your iterations. Don't believe us? Try these attributes...

| limit:int | limit to the number of iterations |
| --- | --- |
| offset:int | starts the iteration at the nth item |
| reversed | let the last be first and the first last ([Matt 20:16](https://www.biblegateway.com/passage/?search=Matthew%2020:16)) |

Let's see that in action... all at once now...

```
{% for campus in Campuses limit:2 offset:1 reversed %}
    {{ campus.Name }}
{% endfor %}
```

## An Alternate For Loop

There's a slightly different way to iterate through arrays. Consider the example below.

```
{% assign campusCount = Campuses | Size | Minus:1 %}

{% for i in (0..campusCount) %}
    {{ i | Plus:1 }}. {{ Campuses[i].Name }}
{% endfor %}
```

This is helpful as a replacement for a while loop. Consider this example where we'd like to list years starting from 2 years ago and ending with the current year.

```
{% assign currentYear = 'Now' | Date:'yyyy' %}
{% assign startYear = currentYear | Minus: 2 %}

{% for year in (startYear..currentYear) %}
    {{ year }}
{% endfor %}
```

## Break and Continue Tags

v6.0

These two tags give you a little more control *for* those times when you just don't want to process through a whole list.

### Break Usage

The `break` tag interrupts processing inside a for loop and jumps out of the loop.

```
{% assign list = "1,2,3,4,5,6,7,8,9,10" | Split: "," %}
{% for i in list %}{{ i }}{% if i > 3 %}{% break %}{% endif %}{% endfor %}

-- output --
1
2
3
4
```

### Continue Usage

The `continue` tag interrupts processing inside a for loop and skips to the next item in the loop.

```
{% assign list = "1,2,3,4,5,6,7,8,9,10" | Split: "," %}
{% for i in list %}{% if i == '3' %}{% continue %}{% endif %}{{ i }}{% endfor %}

-- output --
1
2
4
5
6
7
8
9
10
```
More complex example skipping the 'Mobile' type number for Ted Decker
```
{% for phone in Person.PhoneNumbers %}
    {% if phone.NumberTypeValue.Value == 'Mobile' %}{% continue %}{% endif %}
    {{ phone.NumberTypeValue.Value }}: {{ phone.NumberFormatted }}
{% endfor %}

-- output --
Home: (623) 555-3322
Work: (623) 555-2444
```

**Note:** Both break and continue tags, if used outside of a `for` loop, will abort the entire rendering, without any errors. This is not a supported mechanism for flow control.

### Else Usage

Fluid Only

The `else` tag allows you to provide content when the collection you are iterating over does not have any items.

```
{% for group in groups %}
  {{ group.Name }}
{% else %}
  There are no groups available.
{% endfor %}
```


---

## Include {#include}

> **Path:** Lava > Tags > Include

While you can type your Lava syntax right into a block's settings, there will be times when you want to reuse your template in several places (think about a template that renders a navigation menu). The include tag reads the contents of a file and uses the Lava in it as the template.

## Usage

```
{% include '~~/Assets/Lava/PageNav.lava' %}
```

This particular include will look for the file 'PageNav.lava' in the theme's /Assets/Lava folder. The ~~ is a placeholder for the directory of the current theme. A single ~ is a placeholder for the application root.


---

## Unless {#unless}

> **Path:** Lava > Tags > Unless

The unless is the mirror of the if statement. By that we mean it reverses the logic of what is true and false. In most cases you'll want to stick with if as more people are used to its usage. In some cases the unless might be more readable.

## Usage

Unless is very similar to if statement.

```
{% unless Person.NickName == '' %}
    Hi {{ Person.NickName }}
{% endunless %}
```


---

## Comment {#comment}

> **Path:** Lava > Tags > Comment

Some people like to document what their code does for future use (others think their code is self documenting but that's another topic). The comment tag is for that first group.

## Usage

In a sense the `comment` tag swallows up any content that's inside it so it will never be seen again...

```
{% comment %}
   It's nice being able to write here knowing no one will ever be able to read it...
{% endcomment %}
```

**Note:** If you include incorrect Lava inside the `comment` tag it will produce an error. However, you can use the `raw` and `endraw` tags and wrap that with the comment tag to prevent that from happening.

**Warning:** Nesting the `comment` tag is not supported and it will produce an error.

## Single Line and Multiline Lava Comments

v12.0

These are two additional light weight ways to create comments in your Lava. `//-` is for commenting a single line and `/-` with `-/` is for multiline comments.

The comments will be stripped out before anything is sent to the browser.

### Examples

```
//- This is my favorite Lava for creating an array:
{% assign list = '1,2,3,4,5,6,7,8,9,10' | Split: ',' %}
```
```
/- 
    This Lava may seem complex, but let me explain it to you...
    ...
    See, that was not so bad, right?
-/
{% assign sortedCampuses = Campuses | Sort:'Name' %}
{{ sortedCampuses | Map:'Name' | Join:', ' | ReplaceLast:',',' and' }}
```


---

## Raw {#raw}

> **Path:** Lava > Tags > Raw

This tag temporarily disables the processing of Lava tags markup. We wondered why this would ever be needed... then we wrote this documentation and used it all over the place!

## Usage

The `raw` tag is useful when you need to process text that contains { and } characters. This might be needed if you're using Mustache.js or Handlebars.js. Or, perhaps you're writing documentation showing Lava syntax...

```
{% raw %}
    We can use Lava syntax and it shows {{ See }}.
{% endraw %}
```

Without the `raw` tags used in the example above, the text {{ See }} would have been replaced with the value of the "See" variable if one existed (a blank space would appear if there was no "See" variable defined). The `raw` tag tells the system not to try to process the text as Lava, but instead to just display the text exactly as it was written.

Not that you care... but if you think it's hard to think about using the raw tag to show liquid syntax you should try figuring out how to raw the raw tag...

## Email Templates

Raw tags are used in a similar way when you're working with email templates. If you want your template to include Lava so the person doesn't have to add merge fields on their own, simply wrap the Lava in `raw` tags for it to appear as-is when the person creates an email from the template. For an example of this, check out our [Email Template Survival Guide](https://community.rockrms.com/documentation/bookcontent/34#configuringthemecustomization).


---

## Return {#return}

> **Path:** Lava > Tags > Return

v13.0

This tag will cause Lava processing to end when it is encountered.

## Usage

The `return` tag is like a short circuit and stops processing the remaining Lava template similar to the way the `break` option does inside a `for` loop.

s
```
{% if currentRegistrationCount >= maxRegistrationsAllowed %}
    Sorry, this event is full. No additional registrations are possible.
    {% return %}
{% endif %}

It's great to see you {{ CurrentPerson.NickName }}! Let's get you registered for this event.

[[ Additional Registration Logic Here ]]
```

In the example above a friendly error message will be shown when there are no additional registration messages available, otherwise instructions on how to register will be presented.

You might be thinking, "Well, you could just use an `{% else %}` to do the same thing..." and you'd be correct. The return however can make your logic simpler to read, especially when dealing with multiple levels of if statements. This is often referred to as an "early out" pattern. The video below covers this in detail if you're interested in learning more.

![](https://www.youtube.com/watch?v=ldqDpmMkXgw)


---
description: Use when working with Rock's Fluid Lava engine to understand the reversed-syntax lava tag for logic-heavy code with less repetitive bracket notation
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Tags > Lava

v13.7 Fluid

Ever feel like you type {% %} too much? Perhaps, text on those keys on your keyboard are worn off? The `lava` tag may be able to help. Syntax inside of the `lava` tag is basically reversed. Instead of 'tagging' keywords, and everything else is text to be displayed, you need to 'tag' text to display (using the `echo` command) and everythinge else is assumed to be code.

Confused...? Don't worry an example will help!

**Note** This tag is only available with the Fluid Lava engine.

## Traditional Lava

The example below shows how we'd normally format our Lava. This Lava takes the number of groups an individual is in and determines if that number is a recommended number. It also prints a friendly message based on the number.

```
{% case numberOfGroups %}
    {% when 0 %}
        {% assign recommendedNumber = false %}
        It's time to get into a group
    {% when 1 %}
        {% assign recommendedNumber = true %}
        It's great that you're in a group!
    {% when 2 %}
        {% assign recommendedNumber = true %}
        Wow, two groups, that's great!
    {% when 3 %}
        {% assign recommendedNumber = false %}
        Hey there over-achiever, it may be time to slow down!
    {% else %}
        {% assign recommendedNumber = false %}
        Please see a pastor, you're in way too many groups
{% endcase %}
Recommended Number: {{ recommendedNumber }}
```

## Using the Lava Tag

The same code is now shown using the `lava` command. Note that there is no closing "endlava" tag.

```
{% lava 
    case numberOfGroups
        when 0
            assign recommendedNumber = false
            echo "It's time to get into a group"
        when 1
            assign recommendedNumber = true
            echo "It's great that you're in a group!"
        when 2
            assign recommendedNumber = true
            echo "Wow, two groups, that's great!"
        when 3
            assign recommendedNumber = false
            echo "Hey there over-achiever, it may be time to slow down!"
        else
            assign recommendedNumber = false
            echo "Please see a pastor, you're in way too many groups"
    endcase %}
Recommended Number: {{ recommendedNumber }}
```

## When To Use

You should consider using this command in areas of your code that focus on logic vs formatting output. In these use cases your code will be easier to read.

## Tips

Below are a couple of tips to remember:

1. At first you'll find it hard to write code in the `lava` tag. For the most part just remember that every tag is still needed. Often you'll find that you forget to use the end tag. Don't worry the Lava compiler will remind you 😉.
2. You can `echo` the contents of variables like so:  
	```
	echo numberOfGroups
	```
	  
	Note that you can't echo the contents of a variable and literal text in one echo tag. In these cases you'll need two echo tags on separate lines.


---

## Getting Started {#getting-started}

> **Path:** Lava > Commands > Getting Started

Lava, on its own, is quite amazing. Enabling Commands adds great power, and with that comes... you know... great responsibility. Commands let you do several things that can bypass the built-in security and business logic inside the code.

## Security

To help keep things secure you must enable Lava Commands when you'd like to use them. Let's take a quick look at how to configure them.

#### HTML Blocks

Each HTML block that you place on a page has a block setting that will enable specific Commands for the content of the block. By default the blocks will not have any Commands enabled.

#### Communication Entry

Like the HTML block, you'll need to enable Lava Commands for the Communication Entry block. This allows you to enable some Commands for your staff on the internal portal while disabling them for those that may send emails from your website's leader toolboxes.

#### Default Commands

As you're aware, there are a million places that use Lava. Adding block settings to each one would be difficult to administer. Because of this, we've added a 'Default Enabled Lava Commands' Global Attribute. What you enable here will be used in all the places that don't have block settings.


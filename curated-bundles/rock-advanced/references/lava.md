---
description: "Use when you need to understand Lava templating syntax, output markup, filters, tags, or how to dynamically generate content in Rock"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava

![](https://community.rockrms.com/Content/RockExternal/Lava/LavaLogoV2.svg?optimizer=image)

#### Ending Support for DotLiquid Lava Engine

Support for DotLiquid is coming to an end with the release of version v17. Don't miss out on the opportunity to experience the enhanced speed and innovative features of the new Fluid engine. Make the transition today!

[Learn More](https://community.rockrms.com/connect/ending-support-for-dotliquid-lava-engine)

# What Is Lava

Rock is about power and flexibility. Lava adds both by allowing you to tailor the application to meet your specific needs. Lava is based on the Liquid templating engine (get it... lava is liquid rock...) developed by Shopify for their e-commerce platform. It is now used in numerous web applications. We’ve taken it and added a ton of new features specific to Rock.

Learning Lava's simple syntax will make you unstoppable as you work more closely with Rock. Lava truly is simple. In fact, there are only two types of markup in Lava, output and tags. This markup is placed inside of your HTML content to make it more dynamic as you mix in your data.

# Output Markup

Like the name portrays, output tags are used to put data into your markup. Say you're working on some content for your external website and you wanted to personalize the page’s content for the currently logged in user. Luckily the HTML control gives you access to the logged in user via the 'Person' property. Using this we could use an output tag like:

```
Hello {{ Person.NickName }}!
```
This would place the nick name of the currently logged in user into the message. Pretty simple, right? In fact the hardest part about output tags is knowing what data you have access to use with them. We’ve tried to provide you with that by allowing you to display the data using the [debug filter](https://community.rockrms.com/lava/filters/other-filters#debug) `{{ 'Lava' | Debug }}` anywhere you can use Lava. We’ve also added documentation here to help assist you.

Output markup is great, but when you use filters they become supercharged goodness! Learn about filters under [Intro To Filters](https://community.rockrms.com/lava/filters).

# Tags

Sometimes your desired output won't be as straight forward as placing output tags in your HTML. There will be times when you need to add a bit more logic. For instance in our hello example... what would happen if no one was logged on that page? Based on the way it was written the user would see 'Hello !'. Not horrible, but we can do better! Tags allow us to add logic to our markup. Consider for a moment the 'if' tag below.

```
{% if Person.NickName %}
    Hello {{ Person.NickName }}!
{% else %}
    Hi! Consider logging in for a more personal experience.
{% endif %}
```

If the user is currently logged in they see a nice personalized message. If not, they’re reminded that they're missing something.

This is just the tip of the iceberg on tags. Drill into each tag available in Rock by clicking on them in the sidebar.

# Lava Shortcodes

Shortcodes are a way to make Lava simpler and easier to read. They allow you to replace a simple Lava tag with a complex template written by a Lava specialist. This means you can do some really powerful things without having to know all the details of how things work. To learn how to create and use Lava shortcodes, check out [The Long & Short on Shortcodes](https://community.rockrms.com/developer/bookcontent/33).

# Helix

Helix redefines what you thought was possible with Lava. You can turn static scripts into dynamic content, update data without using SQL and create simple forms with ready-to-use Shortcodes.  
[Helix](https://community.rockrms.com/developer/helix)


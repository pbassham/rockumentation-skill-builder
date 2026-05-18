---
description: "Use when implementing context-aware content in Rock pages, such as displaying dynamic group-specific information or configuring HTML blocks to access contextual data through query parameters"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Using Context

Using Context

Pages are very dynamic. Take for example a page that is a part of a group toolbox which is used to display a roster for the group. When Ted logs in and navigates to the roster page it will show the contents of his group, but when Bill comes to the same page his roster is displayed. This all works because, while the page is the same, the "context" of the page is specific to their group. This context can be set through either a parameter in the page address query string (e.g., `yourserver.com/page/387?GroupId=12`) or by the internal code of a block (the query string method is most common).

You're probably thinking, "Yeah that all makes sense. The page loads with a query string of `GroupId=12` so the roster block shows the member list of that group. Simple." And you would be right, but you can also have more fun with the page. Say you wanted to have a custom message on the page for that specific group. How could you make that happen? Luckily some blocks, including our friend the HTML editor, are context aware. This awareness allows them to look at the context of the page and adjust their content accordingly.

# HTML Block

To implement our group-specific message, we would first set the HTML block's Context setting to *Group*.

![HTML Block Context Setting](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/html-block-context-setting-v18.png)

HTML Block Context Setting

The HTML block is now aware that it's working with groups. That's step one. Next, we need to tell it how to find the specific group you're working with.

To do that, you'll go to the Page Properties. Under the Advanced Settings you'll find a section for Context Parameters. This is where you'll tell the page the name of the query string parameter that indicates the group. So, in our example, the group is identified in the URL by a parameter of `GroupId`. So, that's what we'll use as our Group Parameter Name.

![Page Context Configuration](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/page-context-configuration-v18.png)

Page Context Configuration

Now we can use the HTML block to do all kinds of things. With Group context you have access to data for group types, attributes, and group members.

For instance, let's say you want to show the campus associated with the group. To show that on the HTML block using Lava, use a special "Context" formatting: `{{ Context.Group.Campus }}`. That will display the group's campus on the page with the group context (in this case, the Group Toolbox). The example pictured below is for a group from the Main Campus. That will automatically change to show the name of a different campus if the group you're looking at is at a different campus.

![Display Group Campus](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/display-group-campus-v14.png)

Display Group Campus

# Campus Context Setter

Rock's context aware features mean that campuses can share many of the same pages while still providing campus-specific content. Using the *Campus Context Setter* block allows you to set the campus context in these scenarios. 

Take, for example, the below screenshot. We have a *Campus Context Setter* block on the left, and an HTML block on the right. We've selected the "Main Campus" on the left, and we're being shown content for that campus on the right.

![Campus Context Setter - Main Campus](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/campus-context-setter-1-v14.png)

Campus Context Setter - Main Campus

Now all we have to do is change the selection from "Main Campus" to "Sun City" and we see unique content specific to the Sun City campus, even though we're still on the same page.

![Campus Context Setter - Sun City Campus](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/campus-context-setter-2-v14.png)

Campus Context Setter - Sun City Campus

To set this up, you'll need to access the HTML block's settings and set the *Context Entity Type* to "Campus" just like we set it to "Group" in the prior example. Unlike the prior example, you won't need to set anything on the page's configuration. Rather than pointing to a query string parameter, the *Campus Context Setter* block determines which campus is being viewed.

With the HTML block configured, separate your HTML content by campus. In the below example we used the Campus Id to distinguish campuses, but you could also use the GUID of the campus. Notice how on the first line we used the `Context` syntax to get to the Campus Id.

![Campus Context Setter - HTML](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/campus-context-setter-3-v14.png)

Campus Context Setter - HTML

While you're there, be sure to review the block settings for the *Campus Context Setter* block. Typically you won't need to make changes here, but you can do things like set a default campus, or restrict which types of campuses can be shown. There's also a setting to be aware of called *Update Family Campus on Change*. If this is enabled, the person's Family Campus will change based on the campus they select, regardless of where this block is placed or how it's being used.

# Context on the Person Profile

The *Person Profile* page ships with blocks that are already set up with Person context. For instance, if you edit the settings for the *Person Bio* block, you can use the `Context` syntax in the Custom Content field to access information about the person.

![Person Bio Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/person-bio-block-settings-v18.png)

Person Bio Block Settings

Notice that nothing was done to set the context here. This makes the *Person Bio* block unique. In fact, you can add an HTML block anywhere (any zone, any tab) on the Person Profile and the `Context` syntax will automatically work for you. You don't have to do any extra configuration.


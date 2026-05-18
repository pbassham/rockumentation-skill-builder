---
description: "Use when users need guidance on editing HTML content blocks in Rock, including editor modes, date-range settings, and WYSIWYG vs code editor options"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > HTML Content Block

HTML Content Block

The HTML Content block is one of the most powerful blocks provided by Rock. As someone who creates and maintains websites, you're going to love it. Let's walk through each of its features in detail.

# Basic Usage

To edit an HTML block, click the icon in the *Admin Toolbar* at the bottom of the page where the block has been placed. Next, move your cursor over the (Block Fly-out) toolbar and select the (Edit) button. This will bring up the edit modal (shown below). This modal allows you to edit the contents of the HTML.

![HTML Editor](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/html-editor-v18.png)

HTML Editor

Near the top-right of the block, you can also set a date range for which the content is valid. This is great for adding date-sensitive messages. Just keep in mind that the dates are based on midnight. So, if you want to see content from January 1 to January 7, you would set the first date to January 1, and the second date to January 8. In other words, the content will be displayed until, but not on, the second date.

# HTML Content Block Settings

While the default HTML block settings are great for typical usage, you have a ton of extra options that you can use to do some really cool things. Like any block, to get to the settings click the icon in the *Admin Toolbar* at the bottom of the page and then select the button from the block fly-out menu. This will bring up the block settings dialog. Let’s look at each setting in detail.

## Editor Mode

The HTML editor has two different edit modes: code and WYSIWYG (What You See Is What You Get). The code editor mode (default) gives you a very powerful and rich code editor that allows you to modify your HTML in a highly controlled manner. If you're comfortable writing HTML, you'll love this mode as it will feel like your favorite code editor. Really, there are so many features. Check out the [keyboard shortcuts](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts) #mindblown

If you are more comfortable using a rich text editor that creates the HTML for you, change *Use Code Editor* to No. This will change the edit to a WYSIWYG editor. This editor includes a very nice image and file uploader that makes it simple to move your files to the server. And of course, the asset manager to upload a file already stored in your cloud. There is also a merge field {} button that lists all of the personalized merge fields you can add to your content.

# WYSIWYG Has Its Limitations

While the WYSIWYG editor is very powerful it does have its limits. The HTML markup it produces may frustrate the advanced web designer. We recommend using it to allow non-technical staff the ability to edit small portions of content. It works great for limited non-technical use. As you start to edit large portions of the page you may want to have more control of the HTML markup. This is where the code editor mode excels.

## Document and Image Root Folders

The next two settings set the root folder for the image and document uploaders. This allows you to customize the location per block. This is helpful when you give a specific department access to edit a portion of their website. Instead of giving them access to the default contents folders, you can give them their own sub-directory. This helps keep things nice and tidy (OCD'ers unite!)

# What’s Up With the Tilde?

You may notice that many file paths in Rock start with the ~ character. This is a shortcut character that represents the application's home directory.

## User Specific Folders

In some rare cases, you may want each person using the HTML editor to have access to their own directory when editing. We do this on the Rock website for the Q&A. Each person can upload images to include in their posts. However, we don't want individuals to see/edit/delete each other's photos on the server. By enabling the *User Specific Folders* option, each person will be given their own folder under the document and image root folder for placing their images.

## Cache Duration

Caching is your friend, but to understand it you have to know what's going on behind the scenes. Whenever a person visits a page, Rock has to dynamically create the page by querying the database for all kinds of content. Rock must ask for and receive the most recent content from the database for each HTML block on the page. While this is relatively quick, it does take time. Caching speeds this up by keeping a copy of the content in memory so a trip to the database isn't needed. This can dramatically decrease the load time of a page. You may notice that the first time a page loads it's not as fast as subsequent visits. That’s caching in action.

The *Cache Duration* setting tells Rock how long to store this copy, in seconds, before going back to the database for a new copy. This value is set to one hour by default. It's safe to increase this number because when the content is updated the cache is automatically expired. Setting it too high, though, could increase the size of the cache.

# When to Avoid Caching

If the cache contains a Lava Command (like `{% stylesheet %}` or `{% javascript %}`), the command will not run. Split this code into a separate block that has caching disabled.

Also, don’t cache Personalized Content. If you have used merge fields in your content (similar to the baptism example in the introduction) it's important that you disable caching by placing "0" in this setting. Otherwise, individuals will see the personalized message from the first person who visits the page. That’s embarrassing...

For more information on caching in general, check out the [Caching for Rock Websites](#cachingforrockwebsites) chapter of this guide.

## Context Parameter

Context parameters can be tricky. For each Context Parameter, you must enter unique content (Edit HTML). The content is not shared between parameters. Adding content for each parameter allows you to use features like Display from dates, versioning, and approval. Before we discuss how they can be used in the HTML editor be sure to first read about them in the [Using Context](#usingcontext) chapter below.

The HTML Editor can dynamically merge in the contents of the context parameter. Say for instance your page allows the guest to switch the *Campus* context. You may wish to have the campus name appear in the content of your page. This is also useful when you have a page set with a group context.

The merge field format is `Context.[ObjectTypeName].[ObjectField]`. For example, to display the current campus context name, you'd use a merge field of `{{ Context.Campus.Name }}`. Make sure that the HTML Content block is not caching, otherwise the content will not be dynamic.

# Note

It's not required to set the "Entity Type" setting under the Context section of the HTML Content block settings for this to work. However, you may need to do that in some cases so that the page knows to load a particular object type into context.

## Context Name

In many cases you might have content that you would like to be the same across a wide number of pages. A good example of this might be a copyright statement in the footer of each page. Adding this to each and every page would be a painful task, not to mention having to update it every year. Remember that while blocks live in a specific zone they can be applied to a page or a layout. When assigned to a layout, the content will appear on every page that uses that layout. That gets us closer to our desired state, but we still need to update the content on every layout. Enter *Context Names*. When you provide a context name, you are able to link HTML content across HTML editor blocks. All blocks that use the same name in the *Context Name* setting will share the same content. Edit in one place and it will change in all blocks.

So, for our footer example we could put the name "website-footer" into the *Context Name* of each HTML block in every layout. After setting this up we can easily update it on every page with a single edit. Pow!

## Require Approval

There is a leadership principle that says, "Trust, but verify." That's especially true when you give a non-technical staff member access to edit your external site. There are times when you'll want to see their changes before those changes go live.

By enabling the *Require Approval* box, all edits made by individuals without *Approve* rights to the block will not be shown until someone who does have rights approves them. This approval can be done under Tools \> HTML Content Approval.

# Keep Your Eye On This Page

There are currently no notifications that content needs approval, so keep your eye on the *HTML Content Approvals* page. Notifications are coming soon.

When you enable approvals, versioning is automatically enabled too. Otherwise, the content would disappear from the page until the approval takes place. With versioning enabled, the previous content will show until the new content is approved.

## Versioning

When you make an edit, sometimes you may want to keep a copy of the previous content. Enabling versioning will keep all previous copies of the content. While this is nice to have for use as a backup, it's even more powerful when used with date ranges. When versioning is enabled, Rock will pull the most recently approved content that meets the date range. This is very powerful when adding seasonal or temporary messages to a page.

Say for instance you want to add a highlighted message about an upcoming event. You could add a new version of the content with the highlighted message and provide a date range of when it should be shown. Working ahead (with Rock you'll actually have time to), you might add the content two weeks before it should be shown. Rock will keep the current content visible until the start date. Then the new event-specific content will be shown. After the end date, the previous content will again be what your visitors see. No need to remember to take it down. See all the time you're going to save?

## Validate Markup

This option determines whether or not Rock will check your work and validate that you have accurate markup. If something's wrong, you'll get a warning message indicating the problem. But sometimes, especially if you're using Lava or SQL, what you wrote may be valid but is viewed as incorrect HTML during validation. In those cases, you can turn validation off, to avoid misleading error messages.

## Pre/Post HTML

You might be thinking, "That’s a lot of features." But wait, there's more. Switching over to the *Advanced Settings* tab you'll find a couple more options. Sometimes you might want to give your staff access to edit portions of the page, but you don't want them to mess up parts of the content. For instance, there may be a start and end paragraph you don’t want them to change or some special markup that's needed for styling. While you could add a secured HTML block before and after to hold this content, there's a much simpler solution. Content you add to the Pre/Post settings will be placed - you guessed it - before and after the content they can modify. This saves you from having to add additional blocks.

# Merge Fields

It's time to change the paradigm of how you write content. With Rock, content doesn't have to be impersonal any longer. Using merge fields, you can customize the content for the logged-in person. Not only can you add their name, but you can look at all of the person attributes and make the content relevant to their relationship with your organization. Let's revisit the example from the introduction.

Adding the following on a baptism page allows for personal and actionable content:

{% if Person %} 
    {% if Person.BaptismDate != '' %}
        {{ Person.NickName }}, remember the joy of your baptism? Share that joy
        with a friend who hasn't yet taken the plunge at one of our upcoming
        baptism events!
    {% else %}
        {{ Person.NickName }}, now is the time! Don't put off baptism any longer,
        take the plunge at one of our upcoming events!
    {% endif %}
{% else %}
    Take the plunge at one of our upcoming baptism events!
{% endif %}

Note the use of Lava syntax to add logic to the page. Here's how the markup above would look:

- If the person is logged in and has been baptized it shows the message: "Alisha, remember the joy of your baptism? Share that joy with a friend who hasn't yet taken the plunge at one of our upcoming baptism events!"
- If the person hasn't been baptized yet they will see: "Alisha, now is the time! Don't put off baptism any longer, take the plunge at one of our upcoming events!"
- Otherwise, if the person is not logged in, they are greeted with: "Take the plunge at one of our upcoming baptism events!"

Besides information on the current person, you also have access to all organization attributes and items in the context of the page. For more information on Lava syntax see the [Lava Basics](https://community.rockrms.com/lava).

# Pages vs Layouts

While it's already been noted before, remember that blocks can be assigned to either a page or a layout. When a block is assigned to a layout, it will be displayed on all pages that use that layout. This is especially useful with the HTML editor block as you'll often want bits of content to be consistently applied to several pages.

You can also apply the HTML editor block to the site level, though this is done only rarely. Adding the block at the site level will cause the block to appear on every page in the site. This could be useful for header or footer content you want applied to all pages site-wide.


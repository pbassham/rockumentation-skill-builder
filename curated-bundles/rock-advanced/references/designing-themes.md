---
description: "Use when you need to understand the structure and components of Rock themes, including directories, assets, layouts, scripts, styles, and how to create a custom theme using the Stark template"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Designing Themes

Designing Themes

Themes are beautiful things. They allow you to quickly and easily change the look of your site using the latest web best practices. Before we get too far, let's look at the contents of a theme.

# Contents of a Theme

![Theme Directory](https://rockrms.blob.core.windows.net/documentation/Books/14/1.8.0/images/theme-directory.png)

Theme Directory

- The *.system* file tells Rock that this theme is a system theme. This prevents it from being deleted in the Themes list.
- The *Assets* folder is used for all of the images, icons and other support files needed by your theme. This folder also contains a *Lava* child folder for all of the Lava files needed for your theme.
- The *Layouts* folder contains all of the layouts your theme supports. For external sites, your theme should define implementations for all of the standard layouts covered in the [Looking Deeper At Layouts](#lookingdeeperatlayouts) chapter.
- The *Scripts* directory will be used for any custom scripts your theme requires. Be sure to only place unique scripts here that are not contained in the global scripts folder.
- Finally, the *Styles* folder contains all of the files needed to generate your CSS. Specifics of these files are discussed in depth below.

# Using Images in Themes

When using images in your theme design, they will typically be implemented as an IMG tag or a CSS background. Use of an IMG tag, with accompanying ALT attribute text, is optimal if the image is part of the page content or has semantic meaning. This will allow search engines as well as screen readers to interpret the image.

# Stark

No, this is not our Ironman theme, but this theme will become your go-to for custom theme development. Stark gets its name from the fact that it is basic and minimally styled. In fact, it comes with the least amount of styling possible. We created it as a starting point for you to create new works of art. Think of it as your blank canvas.

To start a new theme, you should start by copy/pasting the Stark theme and then renaming it. Then start restyling the theme using the .less files.

# Warning

Because the Stark theme will be updated with future versions of Rock you won't want to make changes to this theme. Instead copy and paste the Stark theme to create your own theme.

# How Rock Uses Less

There are two sets of .less files. Those in the core *Styles* folder and the theme .less files. The purpose of the core styles is to provide the basic structure and look/feel to the various Rock blocks. The theme's .less files add the final polish to the blocks and override any of the CSS attributes you desire. Let's take a quick look at each Less file that makes up a theme.

- **.nocompile:** This file tells Rock's Less compile tools to ignore this theme. This file should only be used in cases where a custom theme designer wishes to manually compile the theme's Less files (rare).
- **\_css-overrides:** This file contains the Theme Styler's CSS overrides. It should not be manually edited.
- **\_print.less:** This Less style file helps set specific print styles that make Rock pages look better when printed. The contents of this file are imported (appended) into the theme.less file. For the most part, you should not need to modify these styles unless there is a specific print styling you would like to add.
- **\_variable-overrides:** This file contains the Theme Styler's variable overrides. It should not be manually edited.
- **\_variables.less:** This is a very powerful file. It contains a rather large list of style settings that you can change. Simply changing a couple of colors can make your theme match the brand colors of your organization. We highly recommend that you make a copy of the Stark theme and start playing with the variables in this file. You’ll be surprised how easy it is to make some dramatic changes.
- **bootstrap.less:** This is the core Bootstrap Less file. You should not change this file. If you need to modify a style setting in Bootstrap, you should either identify the variable that Bootstrap uses to control that style in the \_variables.less file or write a specific override in your theme.less file.
- **theme.less:** This is the file that contains all of your theme's custom styling. If you can’t style it with a variable change in the \_variables.less file, it should be added here.

Once you make changes to your Less files, you’ll need to compile them to .css files for the browsers to use. There are a number of Less compilers you can use for this.

# Themes Are More Than Looks

Keep in mind as you develop your theme that you need to be concerned with more than just how your theme looks in the visitor's browser. You should also be testing to ensure your theme works well with Rock's in-page editing features. Zone and block editor features should work well with your theme to allow web administrators access to edit the pages.

To help you with this Rock will add classes to the <body\> tag when the zone and block editors are enabled. These classes are 'zone-highlight' and 'block-highlight' respectively. With these classes you can adjust your layouts when these editors are at work.

Rock will also add the class 'modal-open' to the <body\> tag when a modal is open. This allows you to do special styling when this event occurs.

# Lava

Every theme should include some implementations of the standard Lava files in the theme’s ./Assets/Lava folder. Each of these files is covered below.

- **AdList.lava:** This is used to render HTML for the various lists of ads on pages.
- **AdDetails.lava:** This is used to render HTML for the details of a specific ad.
- **AdRotator.lava:** This provides the markup for the large ad rotator on the homepage.
- **BlogItemList.lava:** Renders markup for a list of content channel blog entries.
- **BlogItemDetail.lava:** Renders markup for a content channel blog entry.
- **PageListAsBlocks.lava:** This Lava is for rendering a list of pages as blocks like the ones on the various *Admin Tools* pages.
- **PageListAsTabs.lava:** This renders markup for showing a list of pages as a Bootstrap tab or pill navigation.
- **PageNav.lava:** Used for a page's main navigation.
- **PageSubNav.lava:** Renders markup for a page's sub-navigation.
- **RSSFeed.lava:** Renders markup for a content channel RSS Feed.
- **RSSFeedItem.lava:** Renders markup for an item in a content channel RSS Feed.

# Testing Your Theme

As you're working on your theme you might be wondering how you can view it without everyone seeing what you’re working on. Well prepare to have your mind blown. Because you're a Rock Genius, you know that when a page loads it gets the active theme by looking at the site's theme setting. Pretty simple. You can, however, override this setting by adding the query parameter theme='themename'. For instance, if your page is available at:

*http://www.rocksolidchurchdemo.com/page/1*  
you can have that page display your new theme by typing in:  
*http://www.rocksolidchurchdemo.com/page/1?theme=MyStarkTheme*

The best part is that only you will see it. Everyone else will see the current theme defined on the site. Pretty James Bond, huh?

# Important Note About Rock's Less Compiler

As a theme developer it's your responsibility to ensure your theme compiles correctly with Rock's Less compiler. Most client-based compilers use the same JavaScript based Less compiler provided by the Less reference organization ([http://lesscss.org/](http://lesscss.org/)). Because Rock needs to compile the Less on the server it uses a C# implementation called [dotLess](http://www.dotlesscss.org/). DotLess does a good job, but it is a little less forgiving with things like circular variable referencing. Also, since the compiling is done on the server, it's more difficult to present Less errors.

Please take time to ensure that your Less is compiling correctly before moving it to the server or publishing it to the Rock Shop.

As an example to the warning above, if you're using certain CSS filters, you may find that you need to escape them. For instance, if you add the CSS below:

`  .item {     filter: blur(8px) !important; }          `

You may find that your compiled CSS is blank. To fix this you'll need to escape the filter by appending a ~ and wrapping the filter in quotes like:

`  .item {     filter: ~"blur(8px) !important"; }          `

# Theming for the Styler

As you have already seen, Rock's Theme Styler is a powerful tool for allowing others to edit your theme. It's easy for you to enable others to change your theme by making a few small changes to your *\_variables.less* file. Below is a side-by-side comparison of the *\_variables.less* file for the internal Rock theme and the UI created from it in the Rock Styler.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.8.0/images/side-by-side.png)

\_variables.less File for the Rock Theme

Let's look at a few lines to see how the *\_variables.less* file is magically transformed into this nice editor.

- **Line 1:** Adding a '//' followed by text will create a new variable grouping. To turn this grouping into a panel in the styler you'll also need to append *\*show in editor\**. This allows you to also create groups that are not editable.
- **Line 2:** Line two and we're already adding our first variable. The label for the variable will be the variable name (minus the @ character). All dashes in the variable names will become spaces. The values in the comments will be used for the help text. Finally, if the comment ends with #color, Rock will render it as a color field. The color field is smart enough to render as a plain ol' textbox if it contains less functions like darken.
- **Line 4:** Placing the characters '//--' will insert line breaks in the editor. This allows you to easily sub-group your variables.
- **Lines 7-28** These lines were omitted to simplify the illustration.
- **Line 29:** Note that there is no end marker for variable groupings. When you're done with one, simply start a new one.

# Lava On Layouts

As you create your themes and layouts you might start to see a pattern of having to create HTML blocks to provide content that won't change often. For example, you might add an HTML block at the top of every page to place an image from a page attribute, or some sort of welcome message. Luckily, there is a way of adding content using Lava right on your layout. (You've always been able to do these types of things in C#, but honestly, who wants to resort to C#?!)

When creating your layouts, you can add Lava right in your .aspx files. To do this use the *Rock:Lava* tag. Below is a quick example of what you can achieve.

##### Sample Lava Template on a Layout File


<Rock:Lava ID\="lavaHeader" runat\="server"\>
    {{ CurrentPage | Attribute:'HeaderImage' }}

    {% if CurrentPerson %}
        Hello {{ CurrentPerson.FullName }}
    {% endif %}

    {% cache key:'external-header-grouplist' duration:'3600' %}
        {% sql %}
            SELECT \[Id\], \[Name\] FROM \[Group\]
            WHERE \[GroupTypeId\] = 25 AND \[IsActive\] = 1
        {% endsql %}

    
        {% for group in results %}
            {{ group.Name }}
        {% endfor %}
    {% endcache %}
</Rock:Lava\>

The example above is a bit of a kitchen sink script showing all sorts of functionality. Let's look at some of the features packed in there to see what's possible.

- **Page Attributes:** One of the best uses of Layout Lava is interacting with page attributes. It's a great idea to add a page attribute for things like page header images. You can then place them right on your layout. Bonus points if you provide a default image in your attribute settings so if a page doesn't provide an image a default one is used instead.
- **Custom Messages** Remember, this is Lava. You have access to common objects like the *CurrentPerson*. Use this for your fame and fortune.
- **Lava Commands** We assume that anyone who is allowed to edit a file on your server has administrative rights (because they do, if you can edit a file on the web server you can pretty much do what you want if you know C#) so we've enabled all of the Lava commands when using Lava templates on the layout. This simple example lists all active small groups using the SQL command.
- **Think Speed** You want your website to be fast right? Think about how you can use the Lava cache tag to remember content that comes from the database. In this case we cache the group list for one hour (3600 seconds). Be careful though. You don't want to cache personalized messages, or if you do use the two-pass option in the Lava cache command.


---

## Things You Should Not Do {#things-you-should-not-do}

> **Path:** Designing and Building Websites Using Rock > Things You Should Not Do

Things You Should Not Do

Rock is about freedom and empowerment. There are only a couple of things you should not do under any circumstances, for your own good.

1. **Update Global Styles:** You do not want to update any of the .less files contained in the ~/Styles/ folder. We guarantee that these files will be overwritten by each update. If you would like to override a specific styling you will want to do that in the CSS/Less files of your custom themes.
2. **Change the Rock Theme:** The Rock theme will also be updated in new releases. This theme serves the internal site and should not be altered.
3. **Change the Stark Theme:** The Stark theme will also be updated in new releases. If you would like to make changes to this theme, please copy and paste it to create a new theme.
4. **Create a New Internal Site Theme:** If you would like to alter the look of the internal site, you could create a new internal theme. We highly recommend that you refrain from doing so. As we add new functionality, we will be extending the internal theme to work specifically with these new features. It's likely that your custom internal theme will not have the correct styling to properly display these new pages and blocks. Remember this theme is only viewed by your internal staff and some volunteers. We recommend putting all your effort into your external themes which are viewable by a much wider audience.
5. **Add Scripts to the Global Scripts Folder:** You should not add any custom JavaScript files to the *Scripts* folder located at the root of the file system. Instead use either the scripts folder under a specific custom theme or add a script folder in the *Plugins* folder.
6. **Use the External Site as Your Site:** You might be tempted to jump in and start using the external site that comes with Rock as your external (public-facing) site. Keep in mind that we add pages and blocks to this site as we create new features in Rock, and those changes could conflict with changes you’ve made. Think of the out-of-the-box external site as a “best practice” site to reference when you’re creating your own site.  
	  
	To build your own site, you’ll need to [create a new site]( #creatinganewsite) and start adding pages to it. If you want your site to start off like the one that ships with Rock, you can copy the External Homepage and child pages, then point them to the new site. This is similar to the process described for [copying the Landing Page](#gettingstartedwithlandingpages). As we add new pages and blocks to Rock, you may need to manually copy those pages or blocks to your new site to see the updates. Updates to existing blocks will generally not require any action unless, for instance, new required block settings fields are added.

We have a few other suggestions for things to avoid in our [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#thingsyoushouldnotdo).


---

## Rock Directory Structure {#rock-directory-structure}

> **Path:** Designing and Building Websites Using Rock > Rock Directory Structure

Rock Directory Structure

So now that you know the parts and pieces of Rock, let's learn where each lives.

# Rock Folders

![Rock Directory](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/rock-directory.png)

Rock Directory Structure

- `App_Browsers/` – You should not need to worry about this directory. It's a special directory that allows ASP.Net to identify specific browsers and determine their capabilities.
- `App_Code/` – This directory contains un-compiled code for Rock. You do not want to alter or add files in this directory.
- `App_Data/` – This directory allows you to store data without having to worry that a client could browse directly to it. For instance, Rock writes a log of severe error messages to this directory (specifically ~/App\_Data/Logs/RockExceptions.csv). But, because the webserver blocks requests to access these files directly, you do not need to worry about someone being able to access them. You'll also notice that Rock keeps a cache of binary files in ~App\_Data/Cache/. For the most part you don't need to know about this, but it’s good to know how things work under the hood.
- `Assets/` – This is the global assets folder where Rock stores images, icons, fonts, etc. that are a part of the core install. You should refrain from storing your files in this directory.
- `Bin/` – ASP.Net keeps its compiled assemblies (aka .dlls) in this folder. If you have custom plugins with compiled assemblies, you'll want to add them here. Keep in mind that if you add/modify/delete any file in this directory Rock will restart which could impact people using Rock at the time. You should only do this after hours.
- `Blocks/` – These are the core Rock blocks. As you can see, they are organized by function. You should not modify any of these blocks nor add your own. This location is reserved for the core blocks.
- `Content/` – This is where you'll add your custom content for your various sites. While it's up to you to determine the best file and folder structure, we recommend that you at least keep the content for the various sites separate. Over time these folders can get quite messy so it's best to come up with a good filing structure from the beginning.
- `Plugins/` – The plugins folder is where you'll place all of your custom blocks. The organization of the files in this folder is very important. To help keep things straight the following pattern should be used.
![Plugin Directory](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/plugin-directory.png)

Plugin Directory Structure

1. The top-level should start with a reverse domain organization notation. For instance, if your organization uses the domain rocksolidchurchdemo.org your top-level folder should be org\_rocksolidchurchdemo.
	2. Under your root folder you’ll have a child folder for each plugin that you develop.
	3. Under the plugin folder you’ll have folders for things like Assets, Styles and Scripts. You’ll also put the blocks themselves in the root folder.
- `Scripts/` – This is the core scripts folder. You should not add scripts to this folder. Instead add your scripts to your custom theme folders.
- `Styles/` – The styles folder is for Rock's core .less files. You should not edit these files as they will be overwritten during updates. If you need to modify the properties of a certain style you should override them in your custom theme files.
- `Themes/` – This is the location of all the themes for your Rock install. See the [Themes](#themes) chapter for more information on themes.
- `Webhooks/` – Webhooks are HTTP handlers (Web 2.0 geek-speak for very basic webpages) that receive requests from Internet services like Mandrill and Twilio. For instance, Twilio will call a specific webhook every time someone responds to your SMS message to notify you of the details of the response. When you write a custom webhook you can place it in this folder.

# Couple of Important Files

While we won't cover every file in the root Rock folder, below are a couple that you should be aware of.

- **License.aspx:** Rock uses several open-source projects in its core. Attribution for each of these projects is given here. We also note each of their licenses so as to show that our license (Apache) is not in conflict with theirs.
- **Web.config:** This is the core settings file for any ASP.Net application. Unless you know exactly what you're doing you should stay away from editing this file. Keep in mind that any change to this file will cause Rock to restart.

# File Manager

The file manager provides a basic interface to help you to upload and delete files and manage directories without having to set up or share FTP credentials. Its root folder can be configured allowing you to enable a specific user or security role to manage a specific part of a folder hierarchy. By default, a File Manager block can be found at Admin Tools \> CMS Configuration \> File Manager.

![File Manager](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/file-manager-v18.png)

File Manager


---

## Email Form Block {#email-form-block}

> **Path:** Designing and Building Websites Using Rock > Email Form Block

Email Form Block

Rock provides several tools to get information from your site's guests. The *Workflow Entry* block is super powerful because it can present fields to your guests and then launch a workflow based on their submissions. But sometimes you just need a simpler approach. The *Email Form* block is just that - simple.

This block allows you to show a simple, but customizable, form whose content will be emailed to a recipient of your choice. Once you add this block to your page, you'll notice it has several block settings so that it can be easily customized. Let's take a detailed look at each one.

![Email Form Block](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/email-form-block.png)

Email Form Block Settings

# Tips for Creating Your Form

When you're creating your form, you can use any HTML you'd like. We provide an inclusive sample that shows you many of the advanced features. Below are a few points to consider:

- You have access to Lava in your form. If the guest is logged in, you can personalize your message.
- If they are logged in, you can also pre-enter many of the fields. In some cases, you may want to simply add their name to the name field and allow them to change it. In other cases, you can put their information in as text that can't be changed. When you do this, you can pass the value of their name in a hidden field. The sample shows both cases. It's up to you to determine which one will work best.
- Your email form can include attachments. This is shown at the bottom of the sample form.
- You do NOT need to have an HTML <form\> tag in your markup. Don't add one or you'll break the page.


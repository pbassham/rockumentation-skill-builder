---
description: Use when a developer needs to create a basic Rock block plugin and add it to a Rock CMS page
source: "https://community.rockrms.com/developer/quickstart-tutorials"
sourceLabel: Quickstart Tutorials
---
> **Path:** 

# Hello World

Important

As of Rock v17 you'll want Visual Studio 2022 or Visual Studio Community 2022 (free), and a Microsoft SQL Server database version 2019 or newer (including the free SQL Server 2019 Express editions).As of Rock v13 you'll need the Node.js developlment tools/Workload installed via Visual Studio Installer. See this Technical Release Note for v13 here.      

Everyone knows the HelloWorld tutorial. We'll create a do-nothing, barebones Hello World Block from scratch and show you how to load it onto a page in your own Rock.

We strongly encourage you to get started and actually perform each step as you're reading. The easiest way to get your custom development environment up and running is to pull the `develop` branch from the [Rock repo on Github](https://github.com/SparkDevNetwork/Rock).

Note

Throughout the rest of the tutorial you'll see variations of the domain "RockSolidChurch.org". This is just a generic placeholder. You should replace it with your organization's domain name.

## Step 1 - Add New Item

In the Solution Explorer pane (to the right of your main window by default), find your RockWeb\\Plugins\\org\_rocksolidchurch\\ then right click it and select `Add New Item`. Next, under Visual C#, choose "Web User Control" and give it the name HelloWorld.ascx.

![Add New Item](https://community.rockrms.com/GetImage.ashx?Id=67471)

Press `Add `so you can start editing.

## Step 2 - Add Markup

Edit the markup in the HelloWorld.ascx and add the defacto text, Hello World. You can spice it up with a little HTML markup if you wish - but don't go too crazy yet.

![Editing your markup in the .ascx](https://community.rockrms.com/GetImage.ashx?Id=67472)

## Step 3 - Edit Code

Edit the code file called HelloWorld.ascx.cs (which can be made visible by expanding HelloWorld.ascx in the Solution Explorer) and change its inheriting class from the default System.Web.UI.UserControl to Rock.Web.UI.RockBlock. Doing that gives your standard ASP.Net usercontrol the super-powers of a Rock block. We'll show you how that happens a little bit later.

![Editing your markup in the .ascx](https://rockrms.blob.core.windows.net/documentation/Books/19/1.1.0/images/hello-world-edit-codefile.png)

That's it. Now we'll show you how easy it is to register your new block and add it to a page so you can see it in action.

## Step 4 - Add the block to a zone

Start Rock from inside Visual Studio by pressing `F5 `and log in as the Admin.

Note

Logging into your RockitThe default password for the Admin user is admin.  

You could create a new page and so forth, but let's keep this simple and just add your new block to the main home page. You can read more about adding blocks and pages in the [Designing and Building Websites Using Rock](https://community.rockrms.com/Rock/BookContent/14/14#addingcontenttorock) guide.

1. Select the ti ti-layout-columns (Page Zone Editor) button in the page’s Admin Toolbar, which can be found as you hover the cursor at the bottom right of your screen.
2. (That should highlight all of the zones on the page for you.)
3. Hover over the fly-out toolbar for the zone you wish to add the block to and click its fa fa-th-large (Zone Blocks) button. This will bring up the zone's block list.

![](https://community.rockrms.com/GetImage.ashx?Id=67474)

4.  Next, click the fa fa-plus-circle (Add Block) button to add the block to the layout. Skip the Name field for the moment and select your new "Hello World" block from bottom of the Type dropdown list (hint: you can type "Hello" to find it quicker).

![](https://community.rockrms.com/GetImage.ashx?Id=67475)

5\. Click the `Save `button.

6. Now that you've added your block, click the `Done `link and the page will reload with your Hello World block now on the page.

Note

You may have noticed you never actually registered your new block the way you have to with other CMS systems. That's because Rock automatically registers blocks when they are discovered in your Plugins folder. Pretty cool, right?

![Hello World](https://rockrms.blob.core.windows.net/documentation/Books/19/1.3.0/images/hello-world-results-v15.png)

Tip

If you want the code for this section you can download it right from Github.

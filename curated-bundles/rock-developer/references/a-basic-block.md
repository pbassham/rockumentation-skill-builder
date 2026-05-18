---
description: "Use when a developer needs to understand Rock block fundamentals, structure, markup, code-behind files, or how to create a basic reusable block component"
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

When you look at Rock you're basically viewing a collection of blocks on a page. This was described a bit in the [Designing and Building Websites](http://www.rockrms.com/Rock/BookContent/14/14#anatomyofrockcms) guide. A well-built block can be used over and over again for slightly different situations. Let's get started with the basics.

A block is simply a small, reusable chunk of functionality, and it can do nearly anything you can dream up. It can be added to one or more pages, and depending how it's designed, it can be added multiple times to the same page. In ASP.NET terms, a block is really just a *User Control* and it is comprised of a file containing the HTML/markup (\*.ascx) and a file containing some code (\*.ascx.cs).

**Example of a block's markup file**

```
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="HelloWorld.ascx.cs" Inherits="RockWeb.Plugins.org_RockSolidChurch.Utility.HelloWorld" %>

<h1>Hello World</h1>
```

**Example of a block's code-behind file.**

```
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace RockWeb.Plugins.org_RockSolidChurch.Utility
{
    [DisplayName( "Hello World" )]
    [Category( "org_RockSolidChurch > Utility" )]
    [Description( "This is where you put your block's description." )]
    
    public partial class Plugins_org_RockSolidChurch_HelloWorld : Rock.Web.UI.RockBlock
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // This is where your code normally goes.
            // Don't use this as an example block! Try looking at the
            // StarkDetail block under the Blocks\Utility folder.
        }
    }
    
    // more code would be here...
    
}
```

As seen in the QuickStart Tutorials, all custom Rock blocks inherit from the Rock.Web.UI.RockBlock base class. This allows them to be used on a page and have access to properties that tell: what page it's on, who's viewing the block, how to navigate to the parent page, etc. We'll cover those things a bit later in the Class Properties and Class Methods section.

Those three lines that come before the block's class declaration are important for giving your block a friendly/public name, description and for categorizing your block in Rock's admin screens. The category is especially important for keeping your custom blocks grouped together inside Rock.

Note

Be sure to follow these [Naming Conventions](https://community.rockrms.com/developer/101---launchpad/naming-conventions) when creating your own blocks to avoid namespace or filesystem collisions.  

Tip

For a more complete example of a block check out the example in the [202 Ignition](https://community.rockrms.com/page/3554?slug=) guide, or the StarkDetail block, or one of the hundreds of other blocks in the Blocks folder of your Rock install. Always follow the patterns.  

## FileSystem Location

Your custom blocks should be stored under the RockWeb\\Plugins folder in a sub folder for your organization/domain.

**Location of your custom Rock plugins for your organization**

![](https://community.rockrms.com/GetImage.ashx?Id=67440)

Put your javascripts in a Scripts folder and your CSS stylesheets in a Styles folder as depicted here:

```
RockWeb
\---Plugins
    \---org_rocksolidchurch
        +---MyProject
        |   |   WidgetBlock.ascx
        |   |
        |   +---Assets
        |   +---Scripts
        |   |       widget.js
        |   |
        |   \---Styles
        |           widget.css
        |
        +---Scripts
        \---Styles
                myshared.css
```

You can share your common styles and scripts across all your projects by putting them into a `Styles` and `Scripts` folder at your domain root folder. However, you will probably want to keep things simple since it could affect the dependencies and complexity of packaging and sharing your work later.

## Class Properties

All blocks have the following properties. Some of them, such as `CurrentPerson`, are especially important and you'll find yourself using them often.

- **BlockId** \- The Id of the current instance of the block.
- **BlockValidationGroup** \- The unique validation group that the framework assigned to all the controls on the block.
- **BreadCrumbs** \- The Breadcrumbs created by the page. A block can add additional breadcrumbs as described in the Breadcrumbs section.
- **CurrentPageReference** \- URL for the page where the current block is located.
- **CurrentPerson** \- The currently authenticated (logged in) person. If this is null, then the person viewing the block is not logged in yet.
- **CurrentPersonAlias** \- The alias of the current person. In general you’ll want to use the PersonAlias when storing references to people. See the Using PersonAlias vs Person section below for additional details.
- **CurrentPersonAliasId** \- The Id of the primary alias of the current person.
- **CurrentPersonId** \- The Id of the current person.
- **CurrentUser** \- The currently authenticated (logged in) user. This property has other properties such as: UserName and Person.
- **RockPage** \- The page the block is currently on.
- **RootPath** \- The fully qualified URL path to the root of the website running Rock.

## Class Methods

The table below lists all the public methods available to use in your blocks. You can review them quickly since we'll cover some of the more important methods in the sections below.

**AddConfigurationUpdateTrigger( UpdatePanel upanel)**: Adds an update trigger to the given panel for when the block properties are updated.

**AddHistory(string key, string state, string title)**: Adds a history point to the ScriptManager.

**ContextEntity(string entityTypeName)**: Returns the ContextEntity of the entityType specified.

**ContextEntity()**: Return the ContextEntity for blocks that are designed to have at most one ContextEntity.

**GetAdministrateControls(bool canConfig, bool canEdit)**: Adds icons to the configuration area of a Block instance. Can be overridden to add additional icons.

**GetAttributeValue( string key )**: Gets the value of an attribute key.

**GetAttributeValues( string key )**: Gets the value of an attribute key - splitting that delimited value into a list of strings.

**GetBreadCrumbs( PageReference pageReference )**: Returns breadcrumbs specific to the block that should be added to navigation based on the current page reference. This function is called during the page's OnInit to load any initial breadcrumbs.

GetUserPreference( string key ) **(Obsolete; see [Person Preferences](https://community.rockrms.com/developer/101---launchpad/person-preferences)**): Returns the user preference value for the current user for a given key.

GetUserPreferences( string keyPrefix ) **(Obsolete; see [Person Preferences](https://community.rockrms.com/developer/101---launchpad/person-preferences))**: Gets the preferences for the current user where the key begins with the specified value.

**HideSecondaryBlocks( bool hidden )**: Sets the visibility of the secondary blocks on the page.

**IsUserAuthorized( string action )**: Evaluates if the CurrentPerson is authorized to perform the requested action.

**LinkedPageUrl( string attributeKey, Dictionary<string, string\> queryParams )**: Builds and returns the URL for a linked page from a 'linked page attribute' and any necessary query parameters.

**LogException( Exception ex )**: Logs the given exception.

**NavigateToLinkedPage( string attributeKey, Dictionary<string, string\> queryParams)**: Navigate/redirect to a linked page with the given parameters.

**NavigateToLinkedPage( string attributeKey, string itemKey, int itemKeyValue, string itemParentKey, int? itemParentValue )**: Navigate/redirect to a linked page with the given key, key-value and parent key, parent key-value. This is useful when navigating to a page that has a treeview that needs to expand the given parent item.

**NavigateToPage( Guid pageGuid, Dictionary<string, string\> queryString )**: Navigate/redirect to the page specified by the provided Guid.

**NavigateToPage( Guid pageGuid, Guid pageRouteGuid, Dictionary<string, string\> queryString )**: Navigate/redirect to the Page specified by the given page Guid using the PageRoute specified by the given page route Guid.

**NavigateToPage( PageReference pageReference )**: Navigate/redirect to the page.

**NavigateToParentPage( Dictionary<string, string\> queryString )**: Navigates/redirects to the parent Page.

**PageParameter( PageReference pageReference, string name )**: Returns a specified page parameter from the specified PageReference. If a match is not found, an empty string is returned.

**PageParameter ( string name )**: Returns the specified page parameter value. The page's PageRoute is checked first and then query string values. If a match is not found an empty string is returned.

**PageParameters()**: Returns a Dictionary {String, Object} representing all of the page's page parameters.

**ResolveRockUrl( string url )**: Resolves a rock URL. Similar to the System.Web.UI.Control ResolveUrl method except that you can prefix a Url with '~~' to indicate a virtual path to Rock's current theme root folder.

**ResolveRockUrlIncludeRoot( string url )**: Resolves the rock URL and includes its web root.

**SaveAttributeValues()**: Saves the block attribute values.

**SetAttributeValue( string key, string value )**: Sets the value of a block attribute key in memory. Once values have been set, use the SaveAttributeValues() method to save all values to database.

SetUserPreference( string key, string value ) **(Obsolete; see [Person Preferences](https://community.rockrms.com/developer/101---launchpad/person-preferences))**: Sets a user preference for the current user with the specified key and value.

**SetValidationGroup( ControlCollection controls, string validationGroup )**: Sets the validation group for the given collection of controls.

---

## Developer 101 {#101---launchpad}

## Introduction

Hopefully you've worked through the [QuickStart Tutorials](https://community.rockrms.com/page/3556?slug=) to get exposed to a few of the basics. Rock has so much to offer developers so we've broken down the remaining essentials into a 101, 202 and 303 series.

This book, *101 - Launchpad*, will cover just about everything you would want to know about Rock's most fundamental building component – the Block. We'll also describe the details on how to load and save data for any of Rock's built-in data entities.

In the second book, we'll show you how to save your own custom data. Then we'll explain the primary Rock *Entities* you'll want to become familiar with, as well as important performance topics. Lastly, we'll touch on the other components you can develop for Rock.

In the last book, we'll cover the advanced features to help you go deep with your Rock development.

When finished, you'll have your Rock developer diploma and be ready to start contributing to the Rock store.

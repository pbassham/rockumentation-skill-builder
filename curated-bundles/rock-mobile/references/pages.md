---
description: "Use when building custom Roku TV app pages with Lava scripting, configuring page settings, caching behavior, and merge fields for personalized content display"
source: "https://community.rockrms.com/developer/roku-docs"
sourceLabel: Roku Docs
---
> **Path:** 

*Display custom, Lava-driven content as a subset of your application.*

## Page Settings

When creating or editing a Roku page, you have access to the following configuration options.

![](https://community.rockrms.com/GetImage.ashx?Id=66729)

Page configuration options

### Show in Menu

Whether or not this page should be used in navigation menus. Note, this is not actually utilized anywhere in the Roku shell, but instead empowers you to create navigation menus in Lava.

### Scenegraph Content

The Scenegraph content to display on the Roku device. To learn more about Scenegraph check out [Roku Resources](https://community.rockrms.com/developer/roku-docs/resources/roku-resources). Each page should have an outer-most component of `[Rock:Page](https://community.rockrms.com/developer/roku-docs/resources/controls/page)`. This allows you to set the initial focus of the content.

The following Lava merge fields are available to you.

- CurrentPerson - Information on the current person logged into the TV App.
- Context - Any context objects.
- Campuses - Listing of all campuses.
- CurrentPage - This field allows you to get the default RockPage information about the current page.
- CurrentPersonCanEdit - Determines if the current person has edit access to the page.
- CurrentPersonCanAdministrate - Determines if the current person can administrate the page.
- PageParameter - Returns a collection of page parameters.
- TvShellVersion - Returns a decimal value of the version of the TV Shell.

### Cacheability Type

Determines how the page will be treated in cache.

- Public - The item can be cached in any network cache like a CDN.
- Private - The item can only be cached in the application.
- No-Cache - The item will be checked on every load, and if deemed that the item has not changed then the last item will be used.
- No-Store - The item will not be cached.

### Max Age

The maximum amount of time the item will be cached.

### Max Shared Age

The maximum amount of time the item will be cached in a shared cache.

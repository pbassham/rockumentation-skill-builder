---
description: "Use when you need to implement page navigation in Rock mobile apps, including pushing, replacing, or popping pages from the navigation stack"
source: "https://community.rockrms.com/developer/roku-docs"
sourceLabel: Roku Docs
---
> **Path:** 

Used to navigate between different sections of content.

## Push Page

Pushes a page on to the navigation stack.

```
<Rock:ContentNode 
    title = "Push Page"
    rockCommand="pushPage"
    rockPageGuid="4c294b37-fcc1-4432-87ff-3ce73f14a482" />
```

| Parameter | Type | Description |
| --- | --- | --- |
| rockPageGuid | String | The GUID of the page to load with optional query string parameters. |
| rockPageCacheControl | String | This determines how you'd like the contents of the page cached by CDNs. Your options are: Public - The contents of the URL will have a public cache control header placed on them. Append ':600' to provide a seconds value for determining how long to cache the response. Personal - The URL will be appended with the logged in person's guid. This makes the URLs specific (cached) by the person. Append ':600' to provide a seconds value for determining how long to cache the response. Private - The page response will have a private cache control header applied. |
| rockPageShowLoading | Boolean | When enabled this setting will show a loading screen while a page is being loaded. The default value is false. |
| rockPageSuppressInteraction | Boolean | Suppresses writing an interaction record. The default value is false. |

### Replace Page

Replaces the top-most page of the navigation stack while keeping other parts screens in tact.

```
<Rock:ContentNode 
    title = "Replace Page"
    rockCommand="replacePage"
    rockPageGuid="4c294b37-fcc1-4432-87ff-3ce73f14a482" />
```

| Parameter | Type | Description |
| --- | --- | --- |
| rockPageGuid | String | The GUID of the page to load with optional query string parameters. |
| rockPageCacheControl | String | This determines how you'd like the contents of the page cached by CDNs. Your options are: **Public** \- The contents of the URL will have a public cache control header placed on them. Append ':600' to provide a seconds value for determining how long to cache the response. **Personal** \- The URL will be appended with the logged in person's guid. This makes the URLs specific (cached) by the person. Append ':600' to provide a seconds value for determining how long to cache the response. **Private** \- The page response will have a private cache control header applied. |
| rockPageShowLoading | Boolean | When enabled this setting will show a loading screen while a page is being loaded. The default value is false. |
| rockPageSuppressInteraction | Boolean | Suppresses writing an interaction record. The default value is false. |

### Pop Page

Pops the top-most page off of the navigation stack.

```
<Rock:ContentNode 
    title = "Pop Page"
    rockCommand="popPage" />
```

### Clear Navigation Stack

Clears every page except for the root page.

```
<Rock:ContentNode 
    title = "Clear navigation stack"
    rockCommand="clearNavigationStack" />
```

---

## ⚡ Commands {#commands}

## Overview

Executing commands in your Roku TV application.

You can execute commands by specifying a `rockCommand` and the necessary parameters to an applicable control (such as the Rock [ContentNode](https://community.rockrms.com/developer/roku-docs/resources/controls/content-node) and [Button](https://community.rockrms.com/developer/roku-docs/resources/controls/button)).

### Multiple Commands

Typically, commands will be fired one at a time. There may be cases where you'll want to fire two commands once. This can be done by separating the commands with a comma. For instance, you may want to set a context value and also navigate to a different page.

```
<Rock:ContentNode rockCommand="setContext, pushPage"
    rockPageGuid="0406785c-2c00-4553-931f-cbca5c338796?GroupId=12"
    rockContextKey="Campus"
    rockContextValue="FC0001DF-4F5E-45F3-B0EA-A780AF75E7E9" />
```

### Table of Contents

The following pages display information on the commands applicable to the category.

### Navigation

Manage the flow of your application by pushing/popping views on to the stack.

**[Navigation](https://community.rockrms.com/developer/roku-docs/commands/navigation)**

### Media

Play videos and audio, track interactions and more.

**[Media](https://community.rockrms.com/developer/roku-docs/commands/media)**

### Utility

Useful commands that can be used to enhance various parts of your application.

**[Utility](https://community.rockrms.com/developer/roku-docs/commands/utility)**

### Personal

Commands relating to a person, such as login or logout.

**[Personal](https://community.rockrms.com/developer/roku-docs/commands/personal)**

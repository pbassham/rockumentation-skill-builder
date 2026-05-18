---
description: "Use when configuring Apple TV navigation commands to push, replace, or present pages and modals in rock-mobile applications"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

The commands below are used to show and hides pages on the screen.

## Push Page

Pushes a new page onto the navigation stack.

```
<menuItem 
    rockCommand="pushPage" 
    rockPageGuid="0406785c-2c00-4553-931f-cbca5c338796?GroupId=12">
    <title>Product Page</title>
</menuItem>
```

Additional options include the following parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| rockPageGuid | String | The GUID of the page to load with optional query string parameters. |
| rockPageCacheControl | String | This determines how you'd like the contents of the page cached by CDNs. Your options are: **Public** \- The contents of the URL will have a public cache control header placed on them. Append ':600' to provide a seconds value for determining how long to cache the response. **Personal** \- The URL will be appended with the logged in person's guid. This makes the URLs specific (cached) by the person. Append ':600' to provide a seconds value for determining how long to cache the response. **Private** \- The page response will have a private cache control header applied. |
| rockPageShowLoading | Boolean | When enabled this setting will show a loading screen while a page is being loaded. The default value is false. |
| rockPageSuppressInteraction | Boolean | Suppresses writing an interaction record. |

## Replace Page

Replaces the current page on the navigation stack.

```
<menuItem 
    rockCommand="replacePage" 
    rockPageGuid="0406785c-2c00-4553-931f-cbca5c338796?GroupId=12">
    <title>Product Page</title>
</menuItem>
```

Additional options include the following parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| rockPageGuid | String | The GUID of the page to load with optional query string parameters. |
| rockPageCacheControl | String | This determines how you'd like the contents of the page cached by CDNs. Your options are: **Public** \- The contents of the URL will have a public cache control header placed on them. Append ':600' to provide a seconds value for determining how long to cache the response. **Personal** \- The URL will be appended with the logged in person's guid. This makes the URLs specific (cached) by the person. Append ':600' to provide a seconds value for determining how long to cache the response. **Private** \- The page response will have a private cache control header applied. |
| rockPageShowLoading | Boolean | When enabled this setting will show a loading screen while a page is being loaded. The default value is false. |
| rockPageSuppressInteraction | Boolean | Suppresses writing an interaction record. |

## Present Modal

Displays a modal with the content from the provided page.

```
<menuItem 
    rockCommand="presentModal" 
    rockPageGuid="0406785c-2c00-4553-931f-cbca5c338796?GroupId=12">
    <title>Product Page</title>
</menuItem>
```

Additional options include the following parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| rockPageGuid | String | The GUID of the page to load with optional query string parameters. |
| rockPageCacheControl | String | This determines how you'd like the contents of the page cached by CDNs. Your options are: **Public** \- The contents of the URL will have a public cache control header placed on them. Append ':600' to provide a seconds value for determining how long to cache the response. **Personal** \- The URL will be appended with the logged in person's guid. This makes the URLs specific (cached) by the person. Append ':600' to provide a seconds value for determining how long to cache the response. **Private** \- The page response will have a private cache control header applied. |
| rockPageShowLoading | Boolean | When enabled this setting will show a loading screen while a page is being loaded. The default value is false. |
| rockPageSuppressInteraction | Boolean | Suppresses writing an interaction record. |

## Pop Page

Will remove the current page from the navigation stack showing the previous page.

```
<menuItem 
    rockCommand="popPage">
    <title>Product Page</title>
</menuItem>
```

## Dismiss Modal

Will dismiss the currently displayed modal.

```
<button rockCommand="dismissmodal">
    <text>Dismiss</text>
</button>
```

## Clear Navigation Stack

Will clear all documents from the navigation stack.

```
<menuItem rockCommand="clearNavigationStack">
    <title>Product Page</title>
</menuItem>
```

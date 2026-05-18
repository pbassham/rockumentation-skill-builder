---
description: Use when building a full-screen image gallery with left/right navigation and expandable captions for Rock tvOS applications
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display a single, full-screen image. Users can navigate left or right on the remote to select another image. Activating an up action on the remote will shrink the image and allow a description to be displayed.

![](https://community.rockrms.com/GetImage.ashx?Id=66423)

## Tips & Tricks

- Default theme: `dark`

## Templates

**Default**

![](https://community.rockrms.com/GetImage.ashx?Id=66424)

```
<document>
   <head>
      <style>
         * {
            tv-transition: push;
         }
      </style>
   </head>
   
   <oneupTemplate mode="oneup caption">
      <section>
         <lockup>
            <img src="/resources/images/background/background.jpg" />
            <title>Title 1</title>
            <subtitle>Subtitle</subtitle>
         </lockup>
         
         <lockup>
            <img src="/resources/images/background/background_1.jpg" />
            <title>Title 2</title>
            <subtitle>Subtitle</subtitle>
         </lockup>
         
         <lockup>
            <img src="/resources/images/background/background_2.jpg" />
            <title>Title 3</title>
            <subtitle>Subtitle</subtitle>
         </lockup>
         
         <lockup>
            <img src="/resources/images/background/background_3.jpg" />
            <title>Title 4</title>
            <subtitle>Subtitle</subtitle>
         </lockup>
      </section>
   </oneupTemplate>
</document>
```

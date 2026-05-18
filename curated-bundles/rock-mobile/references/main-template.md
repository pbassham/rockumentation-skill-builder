---
description: "Use when creating a main landing page template with background images, audio, and a bottom menu bar for navigation options"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Use this template to display options to the user; for example, the main page for a series with options to play the first message, see extra content, and jump to specific messages. The background area contains an image relating to the product, and the options are contained in a menu bar along the bottom of the screen.

![](https://community.rockrms.com/GetImage.ashx?Id=66412)

## Tips & Tricks

- Default theme: `dark`

## Templates

Default

![](https://community.rockrms.com/GetImage.ashx?Id=66413)

```
<document>
  <head>
    <style>
      * {
        <!-- To cutomize the interval image is displayed on screen -->
        tv-transition-interval:8.0;
      }
    </style>
  </head>
  
  <mainTemplate>
    <background>
      <img src="/resources/images/background/background.jpg" />
      <img src="/resources/images/background/background_1.jpg" />
      <img src="/resources/images/background/background_2.jpg" />
      <img src="/resources/images/background/background_3.jpg" />
      <audio>
        <asset id="main_audio" src="/resources/audio/Building_Blocks.mp3" />
      </audio>
    </background>
    
    <menuBar>
      <section>
        <menuItem>
          <title>Tab 1</title>
        </menuItem>
        
        <menuItem>
          <title>Tab 2</title>
        </menuItem>
        
        <menuItem>
          <title>Tab 3</title>
        </menuItem>
      </section>
    </menuBar>
    
  </mainTemplate>
</document>
```

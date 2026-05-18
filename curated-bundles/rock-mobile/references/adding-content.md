---
description: "Use when building Apple TV app interfaces and need guidance on adding TVML content, menu bars, templates, and background images to application screens"
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Let's add some content to our application.

Note

This article is a section in the [Building Your First App](https://appletv.rockrms.com/building-your-first-app) walkthrough, so if you skipped here, some parts may be in reference to earlier sections of that. This article will still cover the ins and outs of creating a page and adding TVML content to it.  

## Adding Content to the Start Screen

Let's add some basic content to our application, in particular, we will use our *Start Screen*. To navigate into the editor for the start screen, go to `Admin Tools > Apple TV Apps > Your App > Start Screen`.

Now comes the fun part... Let's take a look at our list of [templates](https://community.rockrms.com/developer/apple-tv-docs/building-your-first-app/templates) to see which one is fitting for a start screen. The [Main Template](https://community.rockrms.com/developer/apple-tv-docs/building-your-first-app/templates/main-template) is good for a start screen, and is what this tutorial will use.

### The Menu Bar

Let's begin by adding a simple menu bar.

```
<document>
    <head>
        <!-- Our document styles -->
        <style>
        </style>
    </head>
    <mainTemplate>
        <menuBar>
          <section>
            <!-- Tab 1 -->
            <menuItem>
              <title>Content</title>
            </menuItem>
            
            <!-- Tab 2 -->    
            <!-- If someone is already logged in, we want to show a Profile button.
             If someone isn't, we want to show a Log In button -->
            
            <menuItem>
              <title>Log In</title>
            </menuItem>
            
          </section>
        </menuBar>
    </mainTemplate>
</document>
```

Launch the application, and cool! That was pretty easy. You should see an outcome like this:

![<br>](https://community.rockrms.com/GetImage.ashx?Id=66387)

### The Background

That's great and all... But it looks pretty bland. Something neat about the Main Template is the implementation of rotating images as the background, so let's go ahead and add in a background with four photos. This tutorial will use four randomly selected photos using [PicSum](https://picsum.photos/).

```
<document>
    <mainTemplate>
        <background>
            <!-- Four random background images -->
            
                
            	    <img src="https://picsum.photos/id/4/5000/3333" />
                
            	    <img src="https://picsum.photos/id/5/5000/3334" />
                
            	    <img src="https://picsum.photos/id/6/5000/3333" />
                
            	    <img src="https://picsum.photos/id/7/4728/3168" />
                
              
        </background>
        <menuBar>
            ...
        </menuBar>
    </mainTemplate>
</document>
```

Cool! We can also add a tv-transition-interval to our styles to set the duration in seconds that we would like each image to rotate, like such. Two is a pretty short interval for the sake of demonstration.

```
<document>
    <head>
        <style>
            * {
                tv-transition-interval: 2;
            }
        </style>
    </head>
    <mainTemplate>
        ...
    </mainTemplate>
</document>
```

### The Start Screen

Your TVML should look like this when it's complete:

```
<document>
    <head>
        <style>
            * {
                tv-transition-interval: 3;
            }
        </style>
    </head>
    <mainTemplate>
        <background>
            <!-- Four random background images -->
            
                
            	    <img src="https://picsum.photos/id/4/5000/3333" />
                
            	    <img src="https://picsum.photos/id/5/5000/3334" />
                
            	    <img src="https://picsum.photos/id/6/5000/3333" />
                
            	    <img src="https://picsum.photos/id/7/4728/3168" />
                
              
        </background>
        <menuBar>
          <section>
            <!-- Tab 1 -->
            <menuItem>
              <title>Content</title>
            </menuItem>
            
             <!-- Tab 2 -->    
            <!-- If someone is already logged in, we want to show a Profile button. If someone isn't, we want to show a Log In button -->
            
            <menuItem>
              <title>Log In</title>
            </menuItem>
            
          </section>
        </menuBar>
    </mainTemplate>
</document>
```

Which produces an outcome of:

![](https://community.rockrms.com/GetImage.ashx?Id=66388)

Sweet!

### Creating a Page

To start this process, let's create a page by clicking the add button in the bottom right of our application detail.

![](https://community.rockrms.com/GetImage.ashx?Id=66389)

You should see the screen editor. It looks like this:

![](https://community.rockrms.com/GetImage.ashx?Id=66390)

Let's break this screen down.

#### Page Name

The name of the page you are creating/editing.

#### Description

An optional description of the page.

### Page TVML

The TVML content that is rendered on the page.

#### Cacheability Type

Determines how the object will be treated in cache. There are currently four options:

**Public** \-This item can be cached on the browser or any other shared network cache like a CDN.

**Private** - This item can only be cached in the browser.

**No-Cache** -The item will be checked on every load, but if it is deemed to not have changed since the last load it will use a local copy.

**No-Store** -This item will never be stored by the local browser. This is used for sensitive files like check images.

---

## Creating An App {#creating-an-app}

Creating a TV application from scratch.

### Creating an Application

In your Rock instance, go ahead and navigate to `Admin Tools > CMS Configuration > Apple TV Apps`. Once there, create a new site.

![<br>](https://community.rockrms.com/GetImage.ashx?Id=66385)

Let's break this down.

**Name** \- the name of your application. This is private to your Rock Instance, and isn't what it has to be named when published to the App Store.

**Description** \- An optional description of the application.

**Application Styles** - These are the global styles that you can use throughout your application. If you're just getting in there to poke around, you can leave these blank initially.

**Enable Page Views** - Whether or not you want interaction data to be recorded.

**API Key** - The API key you plan to access the server with while testing your application.

**Page View Retention Period** - The number of days to keep page views logged. Keep empty for indefinitely.

**Authentication Page** \- The page in your application that contains a Remote Authentication block.

After filling in these values, press *Save* and voila! You should see an outcome similar to this:

![<br>](https://community.rockrms.com/GetImage.ashx?Id=66384)

The *Start Screen* page is auto-generated and cannot be deleted, and is intended to be used as the home page for your application.

---

## Testing Your App {#testing-your-app}

How to test your application throughout the development process.

## Getting a Demo Key

The testing process has never been easier! You can test real-time changes to your app, without being required to publish it to the App Store or TestFlight.

How? Simply fill out the [Apple TV demo request form](https://www.rockrms.com/appletvdemo) on the Rock site. Once this form has been submitted, you will receive a response containing your demo key shortly.

### What do I do with it?

To use your demo key, download the Rock community app on to your Apple TV (search up *Rock Core*). On the home screen of the application, navigate into the Demo tab. Enter the key there, and restart your application. Like magic, it will now be pointed towards your application.

Note

To reset your demo settings and point back to the community application, take a look at the [Clear Demo](https://appletv.rockrms.com/javascript/commands/demo-commands#clear-demo) command.

---

## Tips {#tips}

Rough set of tips that we've learned along the way.

### General Tips

1. Don't mistake TVML for HTML.
2. Styling is very similar to CSS but much more basic.
3. The autoHighlight property is a great way to set the initially selected object on a screen.
4. There is no implementation of a *WebView* in TvOS. ([why?](https://medium.com/bpxl-craft/apple-tv-a-world-without-webkit-5c428a64a6dd))

### Markup

#### Images

1. SVG images are not supported.
2. Image URLs can't have
3. Try to avoid using huge images. This can cause slow load times. Remember that you can be a little bit more lenient with compression because usually someone sits much further back from a TV than a monitor. Having a CDN that allows you to compress images with a query string parameter in the URL is a great option, and might save you future headaches.

### Text Overflow

TV 2.0

In the Apple documentation, you can see the [<description\>](https://developer.apple.com/documentation/tvml/handlesoverflow) tag has access to a `handlesOverlow` attribute. This is defaulted to `true`. This changes the behavior of the element. When the text becomes too long, this makes the element focusable and highlightable, with a "MORE" label attached to the end of it. We added some additional logic for this to be functional right out of the box, by pushing a modal on to the stack containing the overflow content.

We added some additional attributes for you to customize this even further.

| Attribute Key | Type | Description |
| --- | --- | --- |
| overflowTitle | string | The title to pass into the overflow modal. Appears above the content. |
| overflowShowDismissButton | bool | Whether or not to show the dismiss button. The back button on the remote will always be functional. Defaults to true. |
| overflowDismissButtonText | string | Only valid if overflowShowDismissButton is true. Set this to change the text of the dismiss buton. Defaults to dismiss. |

```
<description overflowTitle="Overflow!"
    overflowDismissButtonText="Got it.">Churchly ipsum dolor amet bind fellowship brought it slippery slope. Bless his heart lostness free, marvelous light worship leader dig in secular seeker friendly K-LOVE guard your heart. Orthoparodoxical theology good good good good Father volunteer hyper-spiritual sermon seeing the fruit slippery slope father, I just father. Orthoparodoxical apostolic worship leader, small group sermon skinny jeans oceans contemporary bless his heart. Guard your heart rich mahogany ESV potluck secular. Wrecked lostness God-thing Sunday anointed community group
</description>
```

### QR Code

If you need to display a QR code, use the [built-in tool](https://community.rockrms.com/Rock/BookContent/10#generatingqrcodes) to generate one via URL:

```
<img src="https://www.rockrms.com/GetQRCode.ashx?data=UrlGoesHere&amp;outputType=png" />
```

---

## TV Pages {#tv-pages}

## Content

The content for your page must be valid TVML. The following Lava merge fields are available to you.

- **CurrentPerson** \- Information on the current person logged into the TV App.
- **Context** \- Any context objects.
- **Campuses** \- Listing of all campuses.
- **SiteStyles** \- This variable allows you to apply the global site styles to your page.
- **CurrentPage** \- This field allows you to get the default RockPage information about the current page.
- **CurrentPersonCanEdit** \- Determines if the current person has edit access to the page.
- **CurrentPersonCanAdministrate** \- Determines if the current person can administrate the page.
- **PageParameter** \- Returns a collection of page parameters.
- **TvShellVersion** \- Returns a decimal value of the version of the TV Shell.
- **DeviceData** \- Returns information about the device. Example data below:
	- DeviceType: 20
		- Manufacturer: Apple
		- Model: x86\_64
		- Name: Apple TV 4K (at 1080p) (2nd generation)
		- Version: 15.2
		- DevicePlatform: 0 (0 = TvOS)
		- DeviceIdentifier: 37002498-F3B3-4500-BC86-44BA12398CB6
- **TvAppTheme** \- The theme of the application (Light or Dark)
- **IsDemoModeEnabled** - Boolean flag that tells you if the client shell is running demo mode.

---

## Application Images {#application-images}

# Application Images

---

## App Icons {#app-icons}

The icon for the TV app will be used in two places: inside the app and in the Apple TV App Store. These icons are create using three different layers to create a Parallax effect.

![ttt](https://community.rockrms.com/GetImage.ashx?Id=66397)

[More Info](https://developer.apple.com/design/human-interface-guidelines/tvos/icons-and-images/app-icon/)

Note

Each of the icon sizes below will need to be delivered as separate layers with the foreground layers in PNG format and background layer in JPG format.

### In App Icons

The app icon will need to be created in three different sizes. Two of these sizes will be used by the App itself for display on the Apple TV (one @1x and the other for @2x). The final size is used by the Apple TV store. All of the App icons are in the same.

Sizes:

- 800x480 px @2x
- 400x240 px @1x

![](https://community.rockrms.com/GetImage.ashx?Id=66398)

### App Store Icon

The icon for the App Store is the same ratio as the In App icons but is much larger. There is only one size needed.

Size: 1280x768 px

![](https://community.rockrms.com/GetImage.ashx?Id=66399)

---

## Top Shelf Image {#top-shelf-image}

When your app is in the top row of applications it has the ability to present content at the top of the screen when the app icon has focus. While this content can be dynamic you can also provide static images to be displayed. These images are not layered so the format will be PNG.

Below are the two different sizes of images needed.

[More Info](https://developer.apple.com/design/human-interface-guidelines/tvos/overview/top-shelf/)

![<br>](https://community.rockrms.com/GetImage.ashx?Id=66400)

## Top Shelf Wide

This new size was introduced in TvOS v10.0. It's much wider than the actual screen. This allows it to slide as you switch from one app to the next.

Sizes:

- 2320x720 px @1x
- 4640 x 1440 px @2x

## Top Shelf

This was the standard image provided in TvOS v9.0 and older.

- 1920x720 px @1x
- 3840 x 1440 px @2x

---

## Launch Image {#launch-image}

A launch image displays when your app starts up. It appears instantly and is quickly replaced with the first screen of your app, giving the impression that your app is fast and responsive. A launch image isn’t an opportunity for artistic expression. It’s solely intended to enhance the perception of your app as quick to launch and immediately ready for use. Launch images are static, and don’t include layers.

[More Info](https://developer.apple.com/design/human-interface-guidelines/tvos/icons-and-images/launch-image/)

You will need to supply two sizes.

- @1x - 1920px × 1080px
- @2x - 3840px × 2160px

![](https://community.rockrms.com/GetImage.ashx?Id=66401)

---

## Parallax Images {#parallax-images}

Using Parallax images in your application.

## What are parallax images?

"Layered images are at the heart of the Apple TV user experience. The system combines layered images, transparency, scaling, and motion to produce a sense of realism and vigor that evokes a personal connection as people interact with onscreen content.

**Parallax Effect**

*Parallax* is a subtle visual effect the system uses to convey depth and dynamism when an element is in focus. As an element comes into focus, the system elevates it to the foreground, gently swaying it while applying illumination that makes the element's surface appear to shine. After a period of inactivity, out-of-focus content dims and the focused element expands." (Source: [Apple TvOS Documentation: Images](https://developer.apple.com/design/human-interface-guidelines/foundations/images/#:~:text=Parallax%20effect,element's%20surface%20appear%20to%20shine.) - this article also includes lots of great information on standards while creating and then utilizing these images).

![](https://community.rockrms.com/GetImage.ashx?Id=66402)

## How do I use them?

To use parallax images in your application, you must first host a LCR file on your Rock File Manager, or somewhere else.

Note

You must host a direct link to your LCR file, or else TvOS will render it as a standard flat image. LSR files will not work.

To use them, simply set the image source to be directly your Parallax image. For example:

```
<img src="https://example.com/Content/MyEpicImage.lcr" />
```

---

## Context {#context}

The Rock TV framework supports setting contexts. You can put any Rock `Entity` into the context by using it's friendly name as the context key and it's `Id` or `Guid` as the value.

Context's are saved across viewing sessions. This is most commonly used for the concept of Campus, but could be used for other use cases.

## Context Commands

There are two commands to know when setting context:

[Set Context](https://community.rockrms.com/developer/apple-tv-docs/javascript/commands/utility-commands)

[Clear Context](https://community.rockrms.com/developer/apple-tv-docs/javascript/commands/utility-commands)

## Using Context in Page Lava

Once set the context can be used in the page loads. An example of this is below using the campus context.

## Campus Context Details

The campus context is not linked to a person's campus. If a person is logged in and you want to personalize the context based on campus you should:

1. Check to see if there is a campus context. If so use that.
2. If there is no campus context then use the Person's campus.

---

## Templates {#templates}

While the documentation for TVML is a little light, Apple does provide a fairly [robust sample application](https://developer.apple.com/library/prerelease/tvos/samplecode/TVMLCatalog/TVMLCatalogUsingTVMLTemplates.zip). The problem is the sample app requires you to download, compile and run the app locally to view the screens. To make this easier we have taken screen captures from each screen and provided the TVML for it.

Warning

Beware, trying to do something custom in any template besides the [Div Template](https://community.rockrms.com/developer/apple-tv-docs/building-your-first-app/templates/div-template) (and even in that one) can prove to be tricky and misleading. Apple documentation is not very sufficient and it can be hard to find examples online.  

Each template processes elements differently and may have custom behavior with animations or scrolling. We'll do our best to document these details in the **Tips & Tricks** section for each one.

---

## Licensing {#licensing}

*Apple licensing for the following templates*

Sample code project: TVML Catalog: Using TVML Templates Version: 2.1

IMPORTANT: This Apple software is supplied to you by Apple Inc. ("Apple") in consideration of your agreement to the following terms, and your use, installation, modification or redistribution of this Apple software constitutes acceptance of these terms. If you do not agree with these terms, please do not use, install, modify or redistribute this Apple software.

In consideration of your agreement to abide by the following terms, and subject to these terms, Apple grants you a personal, non-exclusive license, under Apple's copyrights in this original Apple software (the "Apple Software"), to use, reproduce, modify and redistribute the Apple Software, with or without modifications, in source and/or binary forms; provided that if you redistribute the Apple Software in its entirety and without modifications, you must retain this notice and the following text and disclaimers in all such redistributions of the Apple Software. Neither the name, trademarks, service marks or logos of Apple Inc. may be used to endorse or promote products derived from the Apple Software without specific prior written permission from Apple. Except as expressly stated in this notice, no other rights or licenses, express or implied, are granted by Apple herein, including but not limited to any patent rights that may be infringed by your derivative works or by other works in which the Apple Software may be incorporated.

The Apple Software is provided by Apple on an "AS IS" basis. APPLE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, REGARDING THE APPLE SOFTWARE OR ITS USE AND OPERATION ALONE OR IN COMBINATION WITH YOUR PRODUCTS.

IN NO EVENT SHALL APPLE BE LIABLE FOR ANY SPECIAL, INDIRECT, INCIDENTAL OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) ARISING IN ANY WAY OUT OF THE USE, REPRODUCTION, MODIFICATION AND/OR DISTRIBUTION OF THE APPLE SOFTWARE, HOWEVER CAUSED AND WHETHER UNDER THEORY OF CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, EVEN IF APPLE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Copyright (C) 2017 Apple Inc. All Rights Reserved.

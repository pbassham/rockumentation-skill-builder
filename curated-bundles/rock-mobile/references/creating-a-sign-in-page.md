---
description: Use when setting up mobile/computer sign-in for Rock TV apps with QR codes and remote authentication
source: "https://community.rockrms.com/developer/apple-tv-docs"
sourceLabel: Apple TV Docs
---
> **Path:** 

Create a seamless sign-in from a mobile device or computer, and cut out the clunky TV keyboard.

Note

This article is a section in the [Building Your First App](https://community.rockrms.com/developer/apple-tv-docs/building-your-first-app) walkthrough, so if you skipped here, some parts may be in reference to earlier sections of that. This article will still cover the ins and outs of creating a sign-in page.  

### Setting up the server

In your Rock instance, we're going to need to set up a Remote Authentication block. To start, create a new external page and put a Remote Authentication block on it, like such:

![](https://community.rockrms.com/GetImage.ashx?Id=66391)

Click the settings icon, and select the site that represents your TV application:

![](https://community.rockrms.com/GetImage.ashx?Id=66392)

Copy the URL to the page, or create a route that directs to it. When you navigate to that URL, you should see an output like this:

![](https://community.rockrms.com/GetImage.ashx?Id=66393)

## Configuring the TVML

Great! We've made some good progress. Next, let's configure our TV application.

In the application settings, change the authentication page to match the page you just created.

![](https://community.rockrms.com/GetImage.ashx?Id=66394)

#### The Login Page

To start, we're going to create two new pages, the first page will be our login page.

Paste this in as the TVML content.

```
<document>
    <head>
        <style>
            .row {
                margin-top: 30px;
            }
        </style>
    </head>

    <divTemplate>
        <row class="row" style="tv-align: center; tv-position: top;">
            <img src="{ authQrCodeUrl }" width="500" height="500" style="border-radius:12;" />
        </row>
            
        <stack style="tv-align: center; tv-position: top; margin-top: 32;">
            <row>
                <text style="tv-text-style: title2; color: white;">Scan QR Code</text>
            </row>
            
            <row class="row">
                <text style="tv-text-style: subhead;">OR</text>
            </row>
            <row class="row">
                <!-- CHANGE THIS! -->
                <text style="tv-text-style: subtitle1; color: white;">Sign-in or create an account at <span style="font-weight: bold;">https:/example.com/page/123</span></text>
            </row>
            
            <row class="row">
                <text style="tv-text-style: subtitle1; color: white;">Enter the code below:</text>
            </row>
            
            <row class="row">
                <text style="tv-text-style: subtitle2: color: white; tv-font-spacing: 100; font-weight: bold;">{authCode}</text>
            </row>
        </stack>
    </divTemplate>
</document>
```

Change the URL from `https://example.com/page/123` to match the URL of the page you just configured. This page receives a special set of merge fields, usable as:

| Field | Description |
| --- | --- |
| { authQrCodeUrl } | The URL of the generated QR code image. |
| { authCode } | The authorization code to pass into the Remote Authentication block. |

Please note the single curly braces '{' and '}', not to be confused with Lava's double curly brace ' and '.

**The Login Timeout Page**

Create another page that will be pushed to when the login times out. Paste this in as the TVML content

```
<document>
    <alertTemplate>
        <title>Login Timed Out</title>
        <description
            title=""
            handlesOverflow="true" >Your login has timed out.</description>
        <!-- Put in your start screen Guid here -->
        <button rockCommand="replacePage" rockPageGuid="">
         <text>Home</text>
      </button>
    </alertTemplate>
</document>
```

Replace `rockPageGuid `with the Guid of your start screen.

Next, let's wire up the button that actually pushes to this page in our start screen. In your start screen change:

```
<menuItem rockCommand="login" >
   <title>Log In</title>
 </menuItem>
```

To:

```
<menuItem rockCommand="login" 
    rockLoginPageGuid="" 
    rockLoginTimeoutPageGuid=""
    rockLoginSuccessPageGuid="">
    <title>Login</title>
</menuItem>
```

With the `rockLoginPageGuid` being the login page we created, the `rockLoginTimeoutPageGuid` being the login timeout page we created, and the `rockLoginSuccessPageGuid` being the Guid of the start screen.

Now, when you navigate to the page from your start screen, you should see an output similar to this:

![](https://community.rockrms.com/GetImage.ashx?Id=66395)

When you scan the QR code, it will direct you straight to your external website to log-in, or if already logged in, will immediately authenticate you. The other option is to go to the link manually, and enter the authentication code.

---

## Control Reference {#control-reference}

TVML is exceptionally powerful, but it has limitations. There are cases in which Rock has to provide a custom control to acheive a desired effect consistently.

---

## Countdown {#countdown}

Lava Error: End of tag '%}' was expected at (5:138)  
Source:  
<pre class="language-xml"\><code class="language-xml"\>{% assign exampleDate = 'Now' | DateAdd:3, 'd' | Date:"yyyy-MM-ddTHH:mm:ss.fffffffK" }}

---

## Control Styling {#control-styling}

# Control Styling

---

## RockStackView {#rockstackview}

*A layout element used within custom controls, to allow for custom styling.*  

## Example Styling

```
<style>
    .rockStackView {
        background-color: red;
    }
</style>
```

## Custom Styles

| Style | Type | Description |
| --- | --- | --- |
| background-color | Color | The color of the background of the view. |
| tint-color | Color | The color of the tint of the view. |
| tv-interitem-spacing | Integer | The amount of spacing to include between the children. |
| margin | 4-Tuple | The margin of the view. Applies the same logic as standard CSS margin, so 4 would be a valid input, as would 4,4,4,4. |
| width | Integer | The width of the frame of the stack view. |
| border-radius | Integer | The border radius to apply to the view. |
| layout-direction | String | Accepted values are horizontal or vertical. Represents the layout direction of the content within. |

---

## RockLabel {#rocklabel}

The primary text element used within custom controls.

## Example Styling

```
<style>
    .rockLabel {
        tv-text-style: title2;
        color: green;
    }
</style>
```

| Style | Type | Description |
| --- | --- | --- |
| background-color | Color | The color of the background of the view. |
| tint-color | Color | The color of the tint of the view. |
| color | Color | The color of the font. |
| margin | 4-Tuple | The margin of the view. Applies the same logic as standard CSS margin, so 4 would be a valid input, as would 4,4,4,4. |
| width | Integer | The width of the frame of the label. |
| font-size | Integer | The font size of the label. |
| font-weight | [Font Weight](https://developer.apple.com/documentation/uikit/uifontweight) | The weight of the font of the label. |
| tv-text-style | tv-text-style | [TV Text Style](https://community.rockrms.com/developer/apple-tv-docs/styling/tv-text-style)  |

---

## 💻 Javascript {#javascript}

# 💻 Javascript

---

## Commands {#commands}

## Multiple Commands

Typically, commands will be fired one at a time. There may be cases where you'll want to fire two commands at once. For instance you may want to set a context value and also navigate to a different page. Below is a sample

```
<buttonLockup rockCommand="setContext, pushPage"
    rockPageGuid="0406785c-2c00-4553-931f-cbca5c338796?GroupId=12"
    rockContextKey="Campus" 
    rockContextValue="FC0001DF-4F5E-45F3-B0EA-A780AF75E7E9">
    <badge src="resource://button-preview" />
    <title>Multiple commands!</title>
</buttonLockup>
```

---

## Demo Commands {#demo-commands}

There are a set of commands that allow a TV app to change the configuration of the server and application that it points to. For these commands to work the application has to be compiled with support for demo mode.

## Show Demo

This command brings up the demo mode screen. This screen allows you to enter a code to retrieve the demo settings from the Triumph server.

```
<menuItem rockCommand="showDemo">
    <title>Demo</title>
</menuItem>
```

*This command has no options.*

This command will clear the demo settings from the application and bring the compiled settings back. This command is built into the demo settings screen.

```
<menuItem rockCommand="clearDemo" >
    <title>Demo</title>
</menuItem>
```

*This command has no options.*

## Update Demo

This command will update the demo settings based on the code entered in the demo settings screen. This command should not be used outside of the demo settings screen.

```
<button rockCommand="updateDemo">
    <text>Clear Settings</text>
</button>
```

*This command has no options.*

---

## Personal Commands {#personal-commands}

## Login

*This allow for an individual to login to the TV Application.*

Important

Be sure that your application has defined a Login page before using this command. That setting is used to configure the QR code.

```
<menuItem rockCommand="login" 
    rockLoginPageGuid="0C64D387-0A87-ECAA-48A5-B38A62CC704C" 
    rockLoginTimeoutPageGuid="E6F3553B-6270-04AD-4882-F6A99FB3875D"
    rockLoginSuccessPageGuid="C1EAA112-B225-74AA-4F2D-3EA0E72560FE">
    <title>Login</title>
</menuItem>
```

| Parameter | Type | Description |
| --- | --- | --- |
| rockLoginPageGuid | string | This tells the shell where to navigate to to show the login information. This page will be passed a set of merge fields which are documented below. |
| rockLoginTimeoutPageGuid | string | The page to display after the login period expires. |
| rockLoginSuccessPageGuid | string | The page to display after a successful login. Consider displaying a personalized welcome to navigate back to the homepage. |
| rockLoginTimeoutDuration | int | The amount of time in seconds (default to 600, 10 mins) that the login will wait until it times out. |
| rockLoginCheckDuration | int | The number of seconds between the requests to the server to check to see if the authentication has completed (default 5 seconds). |
| rockLoginClearNavigationStack | bool | Determines if the navigation stack should be cleared after successfully logging in. This ensures that if the individual hits back that it does not show impersonalized information (default true). |

Below is a listed of merge fields that will be passed to your login page. You can reference them in your page via `{ mergeFieldKey }` (note the single braces not to be confused with Lava's double). Note that the keys are case sensitive.

| Key | Description |
| --- | --- |
| authCode | The code that the individual will need to enter into the web based authorization page. |
| authQrCodeUrl | The URL to the QR code for authentication. This SVG code is generated by Rock. |

## Logout

This allows for a person to logout from the app.

| Parameter | Type | Description |
| --- | --- | --- |
| rockLogoutPageGuid | string | The GUID of the page to show once the person has been logged out. |
| rockLogoutClearNavigationStack | bool | Determines if the navigation stack should be cleared before logging out (default true). |

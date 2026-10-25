---
description: "Use when troubleshooting Rock Mobile app errors, connection issues, blank pages, XAML errors, or Lava rendering problems"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Troubleshooting an issue in Rock Mobile can be a bit tricky since you don't have an inspector or a way to debug. Sometimes the error message won't be particularly helpful either. We'll include some common issues here and potential solutions to try, as well as some best practices.

Note

If there's no error message shown and the page is blank, that could indicate an issue with the Layout XAML. It's generally good practice to keep your Layout(s) simple.

## Error Messages

### RockError #1000

"You appear to be disconnected from the internet."

This is most common when connected to Wi-Fi and the network goes down.

### RockError #1001

![](https://community.rockrms.com/GetImage.ashx?Id=67219)

This connection error is shown on app startup if the shell is unable to connect to the Rock server. The most common cause of this issue would be the Rock server itself going down.

Another issue that might arise is if your Public Application Root global attribute value is incorrect. This URL is used to reference resources the shell needs, so when it can't find them, you'll see this.

Note

The shell cannot connect to localhost without additional tooling like [ngrok](https://ngrok.com/) or something else that can expose Rock to the web.

If you're only seeing an issue on Android, there may be a problem with the SSL certificate. Check out [this comment](https://chat.rockrms.com/channel/mobile?msg=iB9GxBDCavo6L6B9w) from RocketChat for more details.

### XAML Errors

#### One of the identified items was in an invalid format.

Sometimes shown when a property has an invalid value, for example a Grid's `RowDefinitions`.

#### Arg\_ObjObjEx, System.String, Microsoft.Maui.IView

You may have client-side Lava defined with Lava tags, but the block doesn't have **Process Lava On Client** enabled. See Client-Side Lava Not Running below for this and the other common causes.

## Common Issues

### Client-Side Lava Not Running

If Lava meant for the device is showing up as literal text, rendering empty, or throwing a filter error, check these in order:

1. **Process Lava On Client is unchecked.** The device never runs a Lava pass, so client-side tags are handed to the XAML parser as text.
2. **Both Process Lava On Server and Process Lava On Client are checked, but the client-side Lava is not wrapped in `{% raw %}` `{% endraw %}`.** The server processed it first and there was nothing left for the device to run. Client-only filters such as `PersonImpersonationToken` fail on the server for the same reason.
3. **The block ignores the settings.** Most mobile blocks show these checkboxes but do nothing with them. Only Content and Hero honor both; a few template blocks honor only the client setting. See the block table under Mixing Server and Client Lava in the [Render Pipeline](https://community.rockrms.com/essentials/advanced-topics/render-pipeline) article.

### API Key Missing After a Person Merge

If the app stops loading content after someone merged person records, the app's API key may have been deleted or moved to another person. The API Key field on your mobile application's detail page is often blank, and saving a new value fails. See [API Key](https://community.rockrms.com/essentials/advanced-topics/api-key) to find out what happened and restore it.

### Signed In, but CurrentPerson Is Empty

If a person signs in successfully but server-side Lava still sees no `CurrentPerson`, check the name of your authentication cookie. A common sign is a Content block that shows nothing for `{{ CurrentPerson.NickName }}` right after sign in, even with Lava processed on the server and caching turned off.

Rock Mobile always sends the person's sign-in token in a cookie named `.ROCK`, which is Rock's default. If your server's `web.config` gives the forms authentication cookie a different name, Rock never finds the token on mobile requests and treats every request as anonymous. The login itself still succeeds, because signing in does not depend on that cookie.

When the cookie name doesn't match, you may also see:

- Pages and blocks that require a signed-in person act as if no one is signed in.
- Some screens still show the person's name or details, because the app keeps a copy of the profile from sign in. This can make the problem look specific to one block.
- The person is signed out the next time the app is fully closed and reopened.
- Secured images and real-time features (such as chat or live updates) don't load for the person.

To fix it, set the cookie name back to `.ROCK` in `web.config`:

```
<authentication mode="Forms">
  <forms name=".ROCK" loginUrl="Login" defaultUrl="Page/12" timeout="43200" />
</authentication>
```

Changing `web.config` restarts Rock, and anyone signed in on the web will need to sign in again. People using the app may need to sign in again once the change is live.

Note

Rock Mobile does not currently support a custom authentication cookie name. The app cannot read the configured name from the server, so the cookie must be named `.ROCK`.

---

## 🎨 Styling {#styling}

We've worked hard for you to be able to leverage your knowledge of CSS to theme mobile applications. Applying these classes will allow you to build beautiful mobile apps with consistent styling.

## CSS Styling

CSS styling is a powerful way to style your applications. It's also a simple way to bring consistency to your project. Unfortunately, there are a few limitations you should be aware of.

- XAML styling is a first-class citizen in .NET MAUI
- CSS plays a side role in providing a familiar approach to styling XAML elements
- One cannot do everything in CSS that is doable in XAML styling
- Not all standard CSS properties from the web are supported in .NET MAUI

Be sure to start your understanding of CSS for .NET MAUI by reading [the Microsoft documentation](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/styles/css?view=net-maui-8.0).

Warning

CSS properties in .NET MAUI are very picky. If you spell or mistype a property wrong your application could fail to load. Be careful, and test well.

## Downhill Framework

We've given our mobile CSS framework the name Downhill (it's much easier to roll a rock downhill you know). It incorporates standards from Bootstrap, Tailwind, and other CSS frameworks along with our own, so hopefully, it feels somewhat familiar to you.

You can find everything in the public Rock repository here: [https://github.com/SparkDevNetwork/Rock/tree/develop/Rock.DownhillCss](https://github.com/SparkDevNetwork/Rock/tree/develop/Rock.DownhillCss)

---

## Style Guide {#style-guide}

Learn the basics of styling a modern, dark mode responsive application.

M v6.0C v16.7

## Getting Started

All of the built-in Rock components follow a consistent pattern for spacing values, colors and typography.

### Walkthrough

A start-to-finish walkthrough of styling an out of the box application. This encapsulates all of the below topics with progressive examples.

[Walkthrough](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#walkthrough)

### Colors

Understand color theory in Rock Mobile and learn how to leverage built in colors to build truly responsive and beautiful applications.

[Colors](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#colors)

### Typography

Understand how fonts and sizes are determined and utilizing in Rock Mobile.

[Typography](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#typography)

### Margin, Padding and Other Utilities

Utilize built in spacing classes to match the consistency of built-in blocks.

[Utilities](https://community.rockrms.com/developer/mobile-docs/styling/style-guide#margin-padding-and-other-utilities)

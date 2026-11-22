---
description: "Use when troubleshooting errors, connection issues, or unexpected behavior in Rock Mobile app including XAML errors and Lava rendering problems"
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

If the app stops loading content after someone merged person records, the app's API key may have been deleted or moved to another person. The API Key field on your mobile application's detail page is often blank, and saving a new value fails. See [API Key](https://community.rockrms.com/developer/mobile-docs/essentials/advanced-topics/api-key) to find out what happened and restore it.

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

### Made for Older Android

**If people see "This app isn't available for your device because it was made for an older version of Android" in Google Play, your app's shell has fallen behind.**

Every Rock Mobile shell is built to target a specific Android API level. Google requires apps to keep up with new Android releases. When a published app's target API level gets too old, Google Play stops offering it to people on newer versions of Android. They can't find or install the app, and they see this message instead. People who already have the app installed can usually keep using it, so you may not hear about the problem until someone gets a new phone.

Nothing on your Rock server causes this, and nothing on your Rock server can fix it. The only fix is to publish a newer shell to the Play Store. Shell updates aren't published automatically. If your app is on App Factory, submit a [shell update request](https://www.triumph.tech/services/app-factory/mobile-shell-update-request). Once Google approves the new version, the app shows up again for people on newer devices.

To keep this from happening, plan on requesting a shell update at least once a year. See [Shell Update Requirements](https://community.rockrms.com/developer/mobile-docs/app-factory/shell-update-requirements) for how often Apple and Google require updates, and how to pick a shell version that matches your Rock server.

---
description: "Use when building custom mobile block types in Rock with C# instead of Lava, including configuration, mobile UI markup, and callback handling"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Okay, maybe all of this still isn't quite enough for what you need. Or maybe it works, but you are building such [complicated](https://community.rockrms.com/developer/database-sharing/database-cleaning) entity [commands](https://community.rockrms.com/developer/developer-codex/app-laws) and SQL queries in Lava that it's just not performant enough. Maybe you are just far more familiar with C# so you'd rather go that way. Possibly you want to build a plugin that provides a new block type with some settings for the admin to configure and then it magically does what it does.

Let's start with the most basic block configuration:

```
[DisplayName( "My Custom Block" )]
[Category( "Rock Solid Church > Mobile" )]
[Description( "A custom block to do magical things." )]
[IconCssClass( "fa fa-square" )]
public class MyCustomBlock : RockMobileBlockType
{
    #region IRockMobileBlockType Implementation

    int IRockMobileBlockType.RequiredMobileAbiVersion => 1;

    string IRockMobileBlockType.MobileBlockType => "Rock.Mobile.Blocks.Content";

    object IRockMobileBlockType.GetMobileConfigurationValues()
    {
        string content = "<Label Text=\"Hello World\" />";

        return new Rock.Mobile.Common.Blocks.Content.Configuration
        {
            Content = content
        }
    }

    #endregion
}
```

So here is what we got. We are specifying that in order for this block to render, the mobile app needs to support ABI version 1. Next we are specifying the CLR class name on the mobile app that will handle the rendering, we are going to use the `Rock.Mobile.Blocks.Content` block so that we can update things. This block will render a simple text label that says `Hello World`.

But that is rather boring. Instead, lets have it render out something a bit more expressive.

```
object IRockMobileBlockType.GetMobileConfigurationValues()
{
    string content = @"
<StackLayout>
    <Rock:FormGroup Title=""Search"">
        <Rock:FormField>
            <Rock:TextBox x:Name=""SearchTerm"" />
        </Rock:FormField>
    </Rock:FormGroup>

    <Button Text=""Search"" StyleClass=""btn, btn-primary"" Command=""{Binding Callback}"">
        <Button.CommandParameter>
            <Rock:CallbackParameters Name="":Search"">
                <Rock:Parameter Name=""Term"" Value=""{Binding Source={x:Reference SearchTerm}, Path=Text}"" />
            </Rock:CallbackParameters>
        </Button.CommandParameter>
    </Button>
</StackLayout>
";

    return new Rock.Mobile.Common.Blocks.Content.Configuration
    {
        Content = content
    }
}
```

If you look very carefully, you'll notice that we prefixed the action command `Search` with a `:`. Here is the difference. Without the `:` prefix, the mobile block will call a single method:

```
[BlockAction]
public string GetCallbackContent( string command, Dictionary<string, object> parameters)
```

That is perfectly fine and you can do it that way if you want. However, with the `:` prefix then it calls a method named for the `Name` and passes the parameters as actual method parameters. So in our case, our search method would be:

```
[BlockAction]
public string Search( string term )
```

Either will achieve the same result, but the latter form might be easier to read in your code - especially if you have multiple commands being handled. The return type of these methods is a simple string that contains the XAML code used to render the UI. Let's use the latter form and build our search results:

```
[BlockAction]
public object Search( string term )
{
    var searchClient = IndexContainer.GetActiveComponent();
    var searchEntities = new List<int> { EntityTypeCache.Get( SystemGuid.EntityType.GROUP.AsGuid() ) };
    var results = searchClient.Search( term,
        SearchType.Wildcard,
        searchEntities,
        "GroupTypeName^Serving Team",
        5,
        0,
        out int totalResults );

    var sb = new StringBuilder();
    sb.AppendLine( "<StackLayout>" );
    foreach ( var result in results )
    {
        var button = $@"
    <Button Text=""{result.DocumentName}""
            StyleClass=""btn, btn-primary""
            Command=""{{Binding Callback}}"">
        <Button.CommandParameter>
            <Rock:CallbackParameters Name="":ShowGroup"">
                <Rock:Parameter Name=""GroupId"" Value=""{result.Id}"" />
            </Rock:CallbackParameters>
        </Button.CommandParameter>
    </Button>";
        sb.AppendLine( button );
    }
    sb.AppendLine( "</StackLayout>" );

    return new Rock.Mobile.Common.Blocks.Content.CallbackResponse
    {
        Content = sb.ToString()
    };
}
```

So we use the Universal Search component to get a list of all matching serving team groups. Then we loop over those results and build a stack layout of buttons. Each button will trigger the `:ShowGroup` command with a different `GroupId` value. A handler for such a command might look like:

```
[BlockAction]
public object ShowGroup( int groupId )
{
    return new Rock.Mobile.Common.Blocks.Content.CallbackResponse
    {
        Content = "<Rock:NotificationBox NotificationType=""Error"" Text=""Not Implemented"" />"
    };
}
```

This is a simple handler that just displays a notification on the screen stating it hasn't been implemented yet. Obviously you will want to have to actually do something. For example, you might have it display some information about the group and then display two buttons: `Cancel` and `Join`.

## Dynamic Initial Content

What we described above will leave you with a block whose initial content is static, that is it never changes unless the admin deploys a new application bundle. That might work for you, but you probably want to change that content based on query string parameters and such. Let's modify our block so that it instructs the mobile application to be dynamic.

```
[DisplayName( "My Custom Block" )]
[Category( "Rock Solid Church > Mobile" )]
[Description( "A custom block to do magical things." )]
[IconCssClass( "fa fa-square" )]
public class MyCustomBlock : RockMobileBlockType
{
    #region IRockMobileBlockType Implementation

    int IRockMobileBlockType.RequiredMobileAbiVersion => 1;

    string IRockMobileBlockType.MobileBlockType => "Rock.Mobile.Blocks.Content";

    object IRockMobileBlockType.GetMobileConfigurationValues()
    {
        return new Rock.Mobile.Common.Blocks.Content.Configuration
        {
            Content = null,
            DynamicContent = true
        }
    }

    #endregion

    [BlockAction]
    public object GetInitialContent()
    {
        return new Rock.Mobile.Common.Blocks.Content.CallbackResponse
        {
            Content = "<Label Text=\"Hello World\" />"
        };
    }
}
```

---

## OS Version Requirements {#os-version-requirements}

*The minimum OS version requirements for each Rock Mobile shell version.*

| Shell | Release Date | Android SDK | Android Version | iOS Version |
| --- | --- | --- | --- | --- |
| v7.0 | 07/16/2025 | 25 | 7.1 | 14.0 |
| v6.0 | 10/20/2024 | 25 | 7.1 | 12.0 |
| v5.0 | 10/31/2023 | 25 | 7.1 | 12.0 |
| v4.1 | 05/09/2023 | 25 | 7.1 | 12.0 |
| v4.0 | 02/03/2023 | 25 | 7.1 | 12.0 |
| v3.0 | 06/17/2022 | 23 | 6.0 | 12.0 |
| v2.2 | 01/19/2022 | 23 | 6.0 | 12.0 |
| v2.1 | 12/15/2021 | 23 | 6.0 | 12.0 |
| v2.0 | 09/15/2021 | 23 | 6.0 | 12.0 |
| v1.0 | 08/24/2020 | 23 | 6.0 | 8.0 |

Note

View the official release notes here: [https://www.rockrms.com/mobilereleasenotes](https://www.rockrms.com/mobilereleasenotes)

---

## 🏭 App Factory {#app-factory}

![](https://community.rockrms.com/GetImage.ashx?Id=67047)

Compiling the shell and publishing apps to the stores is a complicated process that requires a good deal of technical proficiency. Because most churches aren't equipped to do this on their own, Spark has partnered with Triumph Tech to provide the [App Factory service plan](https://www.triumph.tech/app-factory) to make this process easy for you.

Whether the apps are hosted under your developer store accounts or under Triumph's, you'll be able to opt into the latest Rock Mobile shell updates and continue gaining access to the latest features.

The pages in this section will provide information about the publishing process, app store requirements, and other aspects of a Rock Mobile app that are dependent on App Factory.

![](https://community.rockrms.com/GetImage.ashx?Id=67048)

On average, 50% of iOS apps are reviewed by Apple in 24 hours and over 90% are reviewed in 48 hours. Google boasts similar stats, meaning if all goes well, your apps will be ready to release quickly. If issues are found and the apps are rejected, App Factory will communicate with their team (and yours) to clarify or resolve the problem.

---

## Android Keystore {#android-keystore}

Java Keystores (.jks or .keystore) are binary files that serve as repositories of certificates and private keys. In the context of Android, these are used to digitally sign and secure an app. This provides a layer of security that prevents, among other things, remote attackers from pushing malicious updates to your application to market (all updates must be signed with the same key).

The keystore is generated and uploaded with the initial publish to Google Play and is used for all subsequent updates. It essentially denotes ownership, meaning it should not be shared and if it is lost, unless the app is enrolled into Play App Signing, access to the app is also lost.

If you'd like to publish a Rock Mobile app over an existing Android app, the original keystore must be provided to the App Factory team (.jks or .keystore). If you worked with a development partner, you may need to reach out and get the keystore from them. In some cases, development partners use the same keystore to publish multiple apps, meaning they will not release the keystore to you. In this case, you will be required to publish a brand new app in the Google Play store.

### Android App Bundle

As of August 2021, all new apps published to Google Play must use [Android App Bundle](https://developer.android.com/guide/app-bundle) which is a publishing format that includes all your app’s compiled code and resources, and defers APK generation and signing to Google Play.

Google Play uses your app bundle to generate and serve optimized APKs for each device configuration, so only the code and resources that are needed for a specific device are downloaded to run your app. You no longer have to build, sign, and manage multiple APKs to optimize support for different devices, and users get smaller, more optimized downloads.

App Factory will configure your Android app to use Android App Bundle for publishing.

### Play App Signing

With [Play App Signing](https://developer.android.com/studio/publish/app-signing#app-signing-google-play), Google manages and protects your app's signing key for you and uses it to sign your APKs for distribution. And, because app bundles defer building and signing APKs to the Google Play Store, you need to configure Play App Signing before you upload your app bundle. Doing so lets you benefit from the following:

- Use the Android App Bundle and support Google Play’s advanced delivery modes. The Android App Bundle makes your app much smaller, your releases simpler, and makes it possible to use feature modules and offer instant experiences.
- Increase the security of your signing key, and make it possible to use a separate upload key to sign the app bundle you upload to Google Play.
- One time key upgrade for new installs lets you change your app signing key in case your existing one is compromised or if you need to migrate to a cryptographically stronger key

App Factory will enroll your Android app into Play App Signing.

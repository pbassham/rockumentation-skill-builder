> **Path:** Mobile Docs > 📱 Building Your First App > App Configuration

# App Configuration

Now it's time to configure your app. There are some options that are not covered below; they are beyond the scope of this walkthrough. Start by filling in the **Application Name** and optional **Description**.

Note

Don't worry too much about the name you enter. It will be used to identify your application in Rock but has no effect on the official app name once deployed to the app stores.

## Application Type

You have three options when it comes to the **Application Type**. Choose what makes the most sense for your app; you can always change your selection later.

### Blank (not recommended)

This option will not provide a Flyout panel or tabbed navigation. Generally you'll want one of those, so **Blank** should only be selected when you need to remove those elements for a specific use case.

### Flyout (recommended)

This is the most common type of application and one your users will be familiar with. A menu icon (three horizonal bars) will be displayed in the top left of your app and when pressed will reveal a slide out panel form the left side. Users can also swipe from the left side of the screen to reveal the Flyout panel.

![](https://community.rockrms.com/GetImage.ashx?Id=66803)

The menu icon can be seen in the navbar on the left.

![](https://community.rockrms.com/GetImage.ashx?Id=66802)

The Flyout panel can contain links, Login information, and more.

### Tabbed

When this option is selected users will be shown a tabs at the bottom of the app. If your app only has a few top-level pages this can be a great alternative to the Flyout. Each page can have a custom image associated with it which is displayed above the name.

![](https://community.rockrms.com/GetImage.ashx?Id=66801)

## Lock Orientation

You can force the application to be locked in Portrait or Landscape mode for both phones and tablets. **Portrait** is recommended for both, unless you're putting additional development effort into a landscape experience for tablets.

Note

Changing the tablet orientation lock may not apply immediately on devices where the app is already installed—it can take up to two full app reloads before the change takes effect. On a fresh install, the lock applies right away.

## Application Pages

You'll have the option to set the Login, Profile, and Communication View pages here... but we haven't created them yet. Although this guide won't dig into setting these up, know that coming back to add these page links is important for the app to understand where these fundamental areas exist for navigation.

## API Key

Think of this key like a credential to connect to your mobile app. You'll use it with some other fields to access your application in a [future section](https://community.rockrms.com/developer/mobile-docs/building-your-first-app/deploying-your-app). Set the value to something relatively complex and unique to your organization, but still easy to type on a mobile keyboard.

Important

Be aware that certain special characters will not compile when it's time to publish through App Factory. We recommend sticking to letters and numbers for your API Key.

**Bad**: mobileapp, Rock, testing

**Better**: Gr33nToolb0x, ctr2p7

## Flyout XAML

If you've selected an Application Type of Flyout then you can customize what appears inside via XAML. The default template will include a `<ListView>` that references a `{Binding MenuItems}` source; this will automatically add any pages with the Display In Navigation option checked. It is recommended to leave this alone unless you need custom functionality.

Important

Lava will not work inside the Flyout XAML; if you add some the app will crash upon opening.

## Homepage Routing Logic

This is the logic to use to determine which page someone lands on when opening the application. Make sure to output a valid mobile page Guid as the destination.

Client-side Lava is enabled including access to [Shell Lava Variables](https://community.rockrms.com/developer/mobile-docs/essentials/lava).

Typically, this is used to force authentication by checking for CurrentPerson and navigating to the Login or Onboarding pages if null.

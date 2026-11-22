---
description: "Use when building Rock Mobile user interfaces with .NET MAUI XAML, including Rock controls, commands, styling and understanding the mobile app architecture"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Rock Mobile is built on .NET MAUI, Microsoft’s framework for building iOS and Android apps from one codebase. Every page you write in Rock Mobile is .NET MAUI XAML. The shell downloads it from your Rock server and turns it into a native screen on each phone.

We don’t repeat Microsoft’s documentation here. These docs cover what Rock adds, and the [.NET MAUI docs](https://learn.microsoft.com/dotnet/maui/) are the source of truth for everything underneath.

## What MAUI Provides

**MAUI supplies the building blocks.** That includes:

- Layouts like `Grid`, `VerticalStackLayout` and `ScrollView`.
- Views like `Label`, `Button`, `Image`, `Border` and `CollectionView`.
- Data binding, triggers and gesture recognizers.
- The properties shared by all of them, like `Margin`, `HorizontalOptions` and `IsVisible`.

## What Rock Adds

**Rock builds the app around those pieces:**

- **Controls** in the `Rock:` namespace, like `Rock:FieldContainer`, `Rock:Icon` and `Rock:Avatar`.
- **Commands** like `PushPage` and `ShowToast`, which do the work behind a tap.
- **Blocks and pages**, configured on your Rock server, plus the app’s navigation, tabs and flyout.
- **Styling** through utility classes like `p-16` and `text-interface-strong`, which handle light and dark mode.
- **Lava**, which builds your XAML on the server before the app sees it.

## Which Docs to Use

**A `Rock:` prefix means these docs. No prefix means Microsoft’s.**

| You’re looking for | Look in |
| --- | --- |
| `Grid`, `Label`, `Border`, or any element without a prefix | .NET MAUI docs |
| Bindings, triggers and layout rules | .NET MAUI docs |
| `Rock:` elements | [Controls](https://community.rockrms.com/developer/mobile-docs/essentials/controls) |
| `{Binding PushPage}` and other commands | [Commands](https://community.rockrms.com/developer/mobile-docs/commands) |
| `StyleClass` values | [Styling](https://community.rockrms.com/developer/mobile-docs/styling) |

Here’s how a typical snippet splits:

```
<VerticalStackLayout StyleClass="p-16">
    <Label Text="Upcoming Events"
        StyleClass="title2" />

    <Rock:Icon IconClass="calendar" />

    <Button Text="See All"
        StyleClass="btn, btn-primary"
        Command="{Binding PushPage}"
        CommandParameter="2cda9cfc-4717-4455-bfc2-633735cda86f" />
</VerticalStackLayout>
```
- **From .NET MAUI:** `VerticalStackLayout`, `Label`, `Button` and their `Text` and `Command` properties.
- **From Rock:** `Rock:Icon`, the `PushPage` command and every `StyleClass` value.

**Rock controls build on MAUI controls.** Each control page names its base class in an “Inherits from” line, and every property of that base class works too. Our page lists only what Rock adds, so check the base class in the MAUI docs for the rest.

## Two Shells

**Rock’s shell isn’t MAUI’s Shell.** In these docs, the shell is the Rock Mobile app itself, the part you publish through App Factory. .NET MAUI also has a feature called Shell for building navigation, tabs and flyouts. Rock Mobile doesn’t use it, so Microsoft’s Shell docs and properties that start with `Shell.` don’t apply.

## No Code-Behind

**Your XAML runs without C#.** In a typical MAUI app, each XAML file has a C# file behind it. Rock pages don’t, because the shell loads your XAML while the app runs. That changes a few things:

- **Use Commands, not event handlers.** `Clicked="OnTapped"` has no C# method to call. Use `Command` instead, or the [Event To Command Behavior](https://community.rockrms.com/developer/mobile-docs/essentials/controls/behaviors/event-to-command-behavior) for events that have no command.
- **Logic lives on the server.** Lava and block settings shape the XAML before it’s sent.
- **Copy the XAML, not the C#.** MAUI examples that rely on a `.cs` file won’t work as written, but their XAML usually will.

## Your MAUI Version

**Match Microsoft’s docs to your shell.** Each shell version is built on a specific .NET MAUI version, listed in [Shell Platform Support](https://community.rockrms.com/developer/mobile-docs/developers/shell-platform-support). Microsoft’s docs default to the newest .NET, so use the version picker at the top of their pages. A feature added in a newer MAUI version won’t work in a shell built on an older one.

## Native Controls

**MAUI draws each element with the phone’s own controls.** A `Button` becomes an iOS button on an iPhone and an Android button on Android. That’s why the same XAML can look a little different on each platform, and it’s what makes the app feel native.

## Xamarin.Forms

**Shells before 6.0 were built on Xamarin.Forms**, MAUI’s predecessor. Older examples, including ones shared in community chat, may be written for it. Most of that XAML still works. See [Migrating to .NET MAUI (V6)](https://community.rockrms.com/developer/mobile-docs/essentials/tips-and-tricks/migrating-to-net-maui-v6) for the differences.

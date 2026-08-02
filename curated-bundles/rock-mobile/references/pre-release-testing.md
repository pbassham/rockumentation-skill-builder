---
description: Use when a user asks about testing pre-release versions of Rock Mobile or how to install beta builds through TestFlight or Firebase App Distribution
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

*Rock Mobile Latest (the "blue app") has been retired as our pre-release distribution method as of July 2026.*

Pre-release builds are distributed through the orange **Rock Core** app with the platforms Apple and Google provide:

1. **TestFlight** for iOS
2. **Firebase App Distribution** for Android

## How pre-release testing will work

When a new Rock version is released, we'll plan to make the **next major and next minor version** available in advance as a pre-alpha, alpha, or beta build. For example, when 19.2 ships, both 19.3 and 20.0 may be available to test in the future.

A few things to keep in mind:

- **Server dependencies:** Some features in a pre-release build may depend on a matching pre-release version of Rock server. You may not get the full experience of a new feature until both sides are in sync.
- **Change log:** We're not currently releasing update notes for these pre-release versions. Typically, you'll be testing these versions in response to a specific bug fix or new feature you're already aware of.
- **Delays are expected:** There's often a gap between when a Rock version is tagged (or Rock core cuts a pre-release), and when the matching Rock Mobile build is available to testers. This can be caused by several factors, including Apple's TestFlight review process.
- **Things may be broken.** New features and fixes are not finalized in these builds, so expect to see issues. New reports on the GitHub board should be focused on regressions.

If you have any questions, post in the #mobile RocketChat channel and someone will assist you.

## Reporting issues

We only respond to and address issues reported on the [Rock Mobile Issues board](https://github.com/SparkDevNetwork/Rock.Mobile-Issues). Testing platforms may let you report issues or send crash info directly, and you're welcome to use that. It doesn't replace a report on the board, though. If you already submitted something through TestFlight, mention it in your board report. That extra detail can help us.

## iOS: TestFlight

1. Install the [TestFlight app](https://apps.apple.com/us/app/testflight/id899247664) from the App Store, if you haven't already.
2. Join the Community Testers group: open this link on your iOS device and tap Start Testing (or Accept, then Install): [https://testflight.apple.com/join/Q6nTq83v](https://testflight.apple.com/join/Q6nTq83v)
3. Once installed, you'll notice the app icon shows a small dot before the app name on your home screen — this is how you know you're running a TestFlight build rather than the App Store version.
4. Switching between available versions: open the TestFlight app, select the Rock Core app, and scroll down to **Previous Builds** to choose a different version to install.

Apple's own guide covers installing TestFlight, accepting invitations, and general tester behavior in more detail:  
[Testing Apps with TestFlight](https://testflight.apple.com/)

## Android: Firebase App Distribution

![](https://community.rockrms.com/GetImage.ashx?Id=75332)

1. Join the Community Testers group: open this link on your Android device: [https://appdistribution.firebase.dev/i/88ce459a5eccaddf](https://appdistribution.firebase.dev/i/88ce459a5eccaddf)
2. Sign in with a Google account and accept the invitation.
3. We're distributing APK files, so after accepting the invite you'll download and install the APK directly rather than going through the Play Store. Android may prompt you to allow installs from this source the first time — approve that prompt to continue.
4. **When moving to a different APK versions, it's best to:**
	1. Force stop the app
		2. Clear its cache and storage/data
		3. Uninstall it completely before installing the new APK. This avoids leftover data or config issues between versions.

Firebase's tester guide covers accepting invitations and installing builds in more detail: [Get set up as a tester with App Distribution](https://firebase.google.com/docs/app-distribution/get-set-up-as-a-tester). If you run into installation problems, check their [troubleshooting & FAQ](https://firebase.google.com/docs/app-distribution/troubleshooting).

## When you're done testing

Once you're finished testing a pre-release build, we recommend switching back to the production version of Rock Mobile from the App Store or Play Store:

- iOS: TestFlight builds expire after 90 days, and installing the App Store version will replace your TestFlight build (both use the same app, so only one can be installed at a time).
- Android: the production Play Store app will keep itself updated automatically, unlike a sideloaded APK. As above, fully clear and uninstall the test APK first to avoid any conflicts before installing the store version.

---

## ✨ Releases {#releases}

# ✨ Releases

---

## Release v19.1 {#release-v191}

## Overview

This release moves the Rock Mobile Shell from **v7.0 straight to v19.0**. There is no public v8.0 (and nothing in between). Going forward, the Shell version line matches the **Rock core version**, so the app and the server now share the same version number (v19) instead of the old mismatched scheme where Shell v7 ran against Rock core v18. If you have automation, documentation, or theme logic that keys off the Shell version string, expect it to report **19.0** now rather than 7.0 or 8.0.

**We recommend running a Shell version that matches your Rock core version** (for example, Shell v19.x against Rock core v19.x). The Shell and Core ship contracts to each other, and a large mismatch between the two can cause features to behave incorrectly or fail to load. Aligning the version numbers is exactly what this jump is meant to make easy: keep them on the same major version. In general, dot releases will only contain bug fixes and minor enhancements, not new features.

## Breaking Changes

1. **Version line realigned to Rock core**. The Shell jumped from v7.0 to v19.0, skipping v8.0 and everything up to v18, to stay in step with Rock core versioning. Anything that compares or parses the Shell version (release pipelines, "what version am I on" checks, conditional theme logic) needs to account for the jump. There is no functional downgrade. v19.0 contains everything that was in v7.0, plus the work below.
2. **Avatar control now renders with a native border.** The Avatar control was rebuilt on the native border control rather than the previous rounded frame. Avatars look the same out of the box, but if you authored a custom theme or page XAML that styled the avatar's old inner frame directly, review those screens after upgrading to confirm shape and spacing still look correct.

## Styling Change

The default card styling no longer draws a border, and we added a drop shadow for a cleaner card look. If you prefer the previous bordered and no shadow look, you can restore it by adding the following to your styles

```
.default-card {
  border-color: ?color-interface-soft;
  border-width: 1;
  -rock-box-shadow: false;
  border-radius: 8;
}
```

> **Path:** Mobile Docs > 🧱 Essentials > Blocks > Security > Onboard Person

# Onboard Person

M v2.0 [Integrated Scroll](https://community.rockrms.com/page/3516?slug=essentials%2fblocks#integrated-scroll)

Warning

Rock Security Settings are utilized to limit account access via passwordless login. The disabling of duplicate checking and passwordless login for specific profile protection levels is recommended.

This is a powerful block (commonly referred to as "account onboarding") with many configuration options, so we'll explain all of the screens below and the settings available for each. The purpose of this block is to walk users through a step-by-step process of creating an account (or signing in) and confirming demographic information, campus, and notification preferences.

## Hello Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67307)

This screen welcomes people and kicks off the account verification flow. From here, people can:

-   Enter their email or mobile number to verify their account
-   Skip the onboarding process entirely
-   Head straight to the Login page

When you’ll see each veriification option:

-   **Email Address** shows up only if you’ve got an active email transport configured and your system communication isn’t null.
-   **Mobile Number** appears only when there’s an active SMS transport set up and a non-null “From” number in your system communication.

Note

After making changes to either transport or communication settings, hit “Deploy” and do a full app reload so those options display correctly.

You can tweak the Title and Subtitle for this (and any) screen in the block settings. The button to "Skip" is optional—handy if you want everyone to run through onboarding (for example, if your app needs people to be signed in or tied to a campus).

### Verification

You'll need to create a new system communication in Rock for verification to work. In the Message Template for Email and SMS, you'll need to include the `{{ Code }}` merge field, which will insert a unique six-digit number into each person's communication. They'll be asked to enter it on the next screen.

Don't forget to update the System Communication in the block settings. We recommend keeping these messages brief and putting the code towards the beginning so that it can be easily read within the mobile notification.

## Code Sent Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67306)

This screen is straightforward - it confirms the correct code is entered and proves the person is who they say they are. This is an important step to complete first since we don't want accounts being highjacked. If the code is invalid, they'll be sent back to the [Hello Screen](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/security/onboard-person#hello-screen) to try again. You can configure the time limit, IP throttle limit, and attempt limit in the block settings to prevent malicious behavior.

## Name Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67305)

This screen is shown once a code has been verified. These fields will be pre-filled if a person match was found, otherwise a new account will be created. This gives everyone the opportunity to correct any issues with their name.

### Person Matching

The phone number or email address that was verified may belong to an existing account. If so, we can safely assume this is the same person and fill in their information in advance.

Note

If the verified contact method is linked to more than one account in Rock, we can't be sure who it is. A new account will be created instead, which may need to be merged later.

## Personal Information Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67304)

This screen has a few block settings available. You can set both the Gender and Birthday questions to `Hidden`, `Optional`, or `Required`. You can also hide the fields if a person match was found and the value is already known. If both questions are set to be skipped, this screen will also be skipped.

## Contact Information Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67303)

## Interests Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67302)

This screen will only appear when Communication List Categories has been set in the block settings.

## Notifications Screen

By default, your app will prompt for push notification permission the first time someone opens it. If you’d rather wait and ask as part of onboarding (often a smoother UX), you can:

-   Go to **Application Settings → Advanced Settings**
-   Toggle off **Enable Notifications Automatically**

With that disabled, consider using this onboarding screen to explain why people should opt in and describe the kinds of notifications they’ll get.

![](https://community.rockrms.com/GetImage.ashx?Id=67301)

Once a request has been made for push notifications, a new [App Value](https://community.rockrms.com/developer/mobile-docs/essentials/lava#appvalues) is created with the following key: `core_PushNotificationHasBeenRequested`

In the case onboarding is optional or someone signs in without seeing this screen, you can check this value and show a button to enable push notifications elsewhere. Read more about [this here](https://community.rockrms.com/page/3516?slug=essentials%2ftips-and-tricks#push-notification-state).

## Campus Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67299)

This screen is shown to those that do not have a campus selected, or when the Hide Campus if Known setting is `No`. The campuses available for selection can be set to `Physical` or `Online` with a status of `Closed`, `Open`, or `Pending`. You can also select a single campus for the Online and Do Not Attend options, which will make the associated buttons appear.

## Create Login Screen

![](https://community.rockrms.com/GetImage.ashx?Id=67298)

This screen can be set to `Hidden`, `Optional`, or `Required` in the block settings with Create Login.

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71460)

![](https://community.rockrms.com/GetImage.ashx?Id=71458)

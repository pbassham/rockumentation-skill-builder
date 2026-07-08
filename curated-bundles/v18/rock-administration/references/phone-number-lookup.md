---
description: Use when users need to understand how phone number lookup works for identifying people without traditional login methods
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Phone Number Lookup

Phone Number Lookup

The *Phone Number Lookup* feature is a great alternative to traditional methods of identifying a person. Instead of logging in or providing personal information, all the person needs to do is enter their mobile phone number and confirm they’re in possession of the device with that number.

# Overview

To start, the person enters their mobile phone number in the screen pictured below.

![Phone Number Lookup Block](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/phone-id-block-enter-phone-number-v11.png)

Phone Number Lookup Block

After clicking Lookup, the person will receive a text message with a verification code. They’ll need to copy or type that code into the next screen pictured below. This confirms they are in possession of the device with that phone number.

![Enter Confirmation Code](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/phone-id-block-enter-confirmation-code-v11.png)

Enter Confirmation Code

If the person didn’t receive the text, or needs to re-enter their number, they can tap the Resend button pictured above to try again.

After providing the confirmation code and clicking Next in the screen above, the person will be returned to the area where they started the process. For instance, if this is being used with Mobile Check-In then the person would be automatically directed to the next steps for checking in.

# Phone Number Matching

Behind the scenes, Rock will check the provided phone number against records in the system. If only one person has that phone number, then Rock’s job is pretty easy. But, sometimes more than one person has the same phone number in Rock. Or the person’s phone number might not be in Rock at all. Rock can still handle either scenario.

If more than one person has the phone number, Rock will ask the person with the device to indicate who they are. Remember, this happens *after* the confirmation code is entered in the prior screen above.

![Select Person](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/phone-id-block-select-person-v11.png)

Select Person

After tapping their name, the person will then proceed with next steps for the process they originally started (like Mobile Check-In).

If Rock can’t find the provided phone number in the system, then the person will see the screen shown below. Again, this only happens after they’ve provided the confirmation code.

![Phone Not Found](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/phone-id-block-phone-not-found-v11.png)

Phone Not Found

In the next section we’ll show you how to configure the instructions that appear on this screen.

# Not Just Mobile

Don’t forget that this block can be placed anywhere on your site. It can be accessed from a computer, laptop or other types of devices.

# Phone Number Lookup Block Settings

Now that you’re more familiar with the process, let’s look at some of the configuration options you have. These settings let you tailor the experience to your needs.

![phone-number-lookup-block-settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/phone-id-block-block-settings-v11.png)

Phone Number Lookup Block Settings

## Authentication Level - Identified or Trusted?

Just like a bank, your external website has certain areas that are open to the public and other areas that are restricted to known people. Anyone can walk into a bank's lobby, claiming to be a customer of that bank, but the bank (hopefully) won't just take their word for it when they ask to make a withdrawal.

This is why Rock has different *Authentication Levels*. Sometimes it's enough that the person has simply *Identified* themselves, but in other cases we want to fully *Trust* that they are who they say they are. In other words, these levels decide who stays in the lobby for a nice chat, and who gets to make a withdrawal from the vault.

### Identified

If a person is only *Identified*, it means they're claiming to be someone and we're pretty much taking their word for it. This is the safer of the two *Authentication Levels* described above in the Phone Number Lookup block. This means they can do certain things like check in or report attendance in a service, but not much else. In other words, you recognize they might not be who they claim to be, but their access is restricted so they really can't do much damage.

### Trusted Login

The next level of authentication is *Trusted Login*. This opens the vault, and means you truly trust that the person is who they claim to be. A *Trusted* person has access to their profile, giving and other potentially sensitive areas of your site.

---

The appropriate *Authentication Level* will vary depending on your organization and your community. If a person really wanted to impersonate someone else in your external site there might be ways to do it, but those risks can be minimized with certain data policies and practices. If you're not sure which *Authentication Level* is right for you, play it safe and use *Identified*. The person can still log in like normal if there are secured areas of the site they need to access.


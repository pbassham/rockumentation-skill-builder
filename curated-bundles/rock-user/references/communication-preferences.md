---
description: "Use when helping users manage email subscription preferences, unsubscribe settings, or configure communication preference controls in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Communication Preferences

Communication Preferences

Rock's communication tools provide powerful functionality not only to senders but also those receiving communications. Recipients can control not only which communications they receive but also how they receive them. Let's look at how Rock handles communication preferences.

# Setting Subscription Preferences

When someone is taken to the *Unsubscribe* page on the external site, they’ll see the Unsubscribe page, pictured below. Upon arriving at the page, they can proceed to set their email preference.

There are two different modes:

- **Communication Preferences Mode** - Often a static page on your site, allowing communication recipients to change their preferences.
- **Unsubscribe Mode** - Navigated to using a link, generally from an email. Check out the tips to get it perfect.

## Communication Preferences Mode

![Communication Preferences Mode](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/email-preference-block-v18.png)

Communication Preferences Mode

All changes to Email Preferences are logged in the *Person History* section of the *Person Profile*.

For more control over what actions can be taken from the *Email Preference Entry* block, head to the block settings.

![Basic Settings Tab](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/email-preference-settings-1-v18.png)

Basic Settings Tab

You can also change the text in each section of the *Email Preference Entry* block using the Customize Text tab. This helps you match your brand voice, personalize the experience, or explain what action was taken. Lava is supported for all text fields.

If you leave any text box blank, that text will not appear in the *Email Preference Entry* block.

Next, let’s look at the other side of this block.

## Unsubscribe Mode

If the *Email Preference Entry* block is accessed from an unsubscribe link, it will look a little different.

![Unsubscribe Mode](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/email-unsubscribe-mode-v18.png)

Unsubscribe Mode

Unsubscribe Mode is typically reached from an Unsubscribe link in an email. It includes a header showing which list or flow the user unsubscribed from.

There are different levels of unsubscription. For example, if someone unsubscribes from a personal email, their Email Preference changes from All Email to Personal Email. If it’s already set to Personal Email, unsubscribing changes it to No Email. This approach respects each person’s choice while taking the smallest unsubscribe step possible.

There’s always a balance between organizations sending important updates and recipients wanting fewer irrelevant messages. The unsubscribe process helps reduce unwanted emails while avoiding a full disconnect between your organization and its people.

Most recipients secretly still want those key updates even after unsubscribing, but prefer control over what they receive. Giving them the option to resubscribe or unsubscribe from specific lists creates a better experience and keeps your communication relevant.

The Available Communication Channels section appears when someone unsubscribes from at least one channel. It lets them resubscribe or view other available channels they’re not currently subscribed to.

The following page displays when Deactivate is selected as an *Opt-Out Option* in *Unsubscribe mode*.

![Unsubscribe Deactivation Page](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/unsubscribe-deactivation-page-v18.png)

Unsubscribe Deactivation Page

# Communication List Subscribe Block

Rock ships with the *Communication List Subscribe* block ready for you to use on your external website under Connect \> Subscribe. This block will display the communication lists a person is subscribed to or can be subscribed to. Pictured below is an example of this block on the external website.

![ Sample Subscribe Page](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/subscribe-v13.png)

Sample Subscribe Page

In this example, the block shows the three communication lists that ship with Rock under the *Public* category: Parents of Children, Parents of Youth and Sports Ministry. Additional lists unique to your organization would be displayed here as well if the person is subscribed or is able to subscribe to them.

You can further configure the *Communication List Subscribe* block in the block settings. This is one area where Communication List Categories come into play. You can specify a category in the block settings if you want the *Communication List Subscribe* block to target only a particular segment of the communication lists. By default, this is set to display lists in the *Public* category.

![Communication List Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-list-block-settings-v14.png)

Communication List Block Settings

Remember, the "Public" category ships with Rock, but you can create as many categories as you want. Whichever categories you select here will affect the functionality of the *Communication List Subscribe* block. For example, you could select Staff Only to display lists only available to staff members. If you don't select a category, Rock will display all of the lists the person is authorized to view.

Now let's look at how a person interacts with the *Communication List Subscribe* block to set their communication preferences.


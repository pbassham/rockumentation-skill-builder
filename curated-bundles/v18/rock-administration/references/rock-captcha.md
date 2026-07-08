---
description: "Use when configuring Captcha security settings in Rock, enabling bot protection on forms, or managing Captcha keys and block configuration"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Rock Captcha

Rock Captcha

Captcha adds an extra layer of security to certain tasks, helping to ensure the actions are performed by real people and not bots. This makes your online transactions more secure from spam and fraudulent activities. In this chapter we’ll walk you through the simple steps to use Captcha in Rock.

![Rock Captcha](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/captcha-workflow-example-v15.png)

Rock Captcha

# Using Captcha

There are several blocks that support Captcha, and more may be added in the future. Pictured above is an example workflow entry block with Captcha enabled. Keep in mind that the person will not always need to check that box. Often, the validation occurs behind the scenes and the person won't have to do anything extra. We'll look at different ways to configure this in the next section.

Use of Captcha is optional, though it is turned on by default. You can disable Captcha by accessing the block settings for any block where Captcha is used.

![Rock Captcha Block Setting](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/captcha-block-setting-v15.png)

Rock Captcha Block Setting

Below is a list of blocks that have Captcha support. Please note that this list may expand to include other blocks. If you don't see Captcha on one of these blocks, you may need to switch to the Obsidian version of the block or to a more recent Rock version.

### Blocks with Captcha Support:

- Workflow Entry
- Transaction Entry v2
- Utility Payment Entry
- Account Entry
- Forgot Username
- Change Password
- Family Pre-Registration
- Registration Entry
- Group Registration (Obsidian)
- Connection Opportunity Signup
- Prayer Request Entry (Obsidian)
- Group Simple Register
- Email Form
- Sign-Up Register (Obsidian)

# Configuring Captcha

You’re going to need a free [Cloudflare account](https://dash.cloudflare.com/sign-up) to use Captcha in Rock. Luckily the signup process only involves providing an email and creating a password. Once you’re logged in and looking at your dashboard, select *Turnstile* along the left. You’ll need to click the “Add widget” button to get started, then fill out the short form pictured below.

![Add Widget](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/captcha-add-site-v16.png)

Add Widget

At the end of the process, you’ll see a *Site Key* and a *Secret Key*. Keep these handy because they’ll both need to be copied into Rock.

![Site Key and Secret Key](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/captcha-site-key-secret-key-v16.png)

Site Key and Secret Key

Back in Rock, navigate to Admin Tools \> Settings \> System Configuration Under the UI Settings panel, paste the two Keys.

![Add Keys to Rock](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/captcha-site-key-secret-key2-v18.png)

Add Keys to Rock

And that’s it! With your keys in place, the Workflow Entry and Transaction Entry v2 blocks will automatically perform a Captcha validation when they’re visited.


---

## Updating Rock {#updating-rock}

> **Path:** Rock Admin Hero Guide > Updating Rock

Updating Rock

We know how important Rock is to your organization. That’s why we dedicate so many resources to providing you with timely bug fixes and a steady stream of new features. That’s also why we’ve built a sophisticated, yet simple, update process.

The update screen can be found under:  
Admin Tools \> Settings \> Rock Update.  
From this screen your server will initiate a quick check to Rock’s server to see if there are any new updates available. If there are, the updates and their descriptions will be displayed. Once you decide you’re ready, simply click the Install button and Rock will do the rest.

# Warning

Updates can't be undone, so be sure you have a backup of your system before installing the updates.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/rock-update-v18.png)

Rock Updates

# Questions About Updating

Do I have to update to the latest version?

Depending how often you update, you may see several updates available. You don’t necessarily need to update to the latest and greatest version. You can update to any version you wish. Doing so will install all of the previous updates up to that point.

Can I skip a specific update?

No, updates are cumulative. You can't skip over a specific update or patch.


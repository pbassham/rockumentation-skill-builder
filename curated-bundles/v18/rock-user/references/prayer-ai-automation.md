---
description: "Use when configuring automated AI processing for prayer requests, including formatting, categorization, and content moderation settings"
source: "https://community.rockrms.com/documentation/bookcontent/11/366"
sourceLabel: Raising Up With Prayer
---
> **Path:** Raising Up With Prayer > Prayer AI Automation

Prayer AI Automation

Do you wish you had someone to handle small tasks like fixing typos, removing last names, or tidying up incoming prayer requests—but lack the resources? No problem! We have a solution for you.

Rock has a built in artificial intelligence (AI) automation system that can streamline your process effortlessly. For example, it can transform a request like this:

- pls pray for my dad he sick n no money to buy medicine its so hard for us

To this newly formatted request that is ready to be viewed publicly:

- Please pray for my dad; he is sick and has no money to buy medicine. It's so hard for us.

With AI Automation, your prayer requests will be clear, polished, and ready for ministry without any extra work on your part.

# Configure AI Automations

With an *AI Provider*, you can streamline prayer request management by automatically processing tasks each time a new request is submitted. These automations are configured on the Prayer Categories page under Administration \> Settings \> Prayer Categories. An active AI provider is required to use AI automations. Setting up AI Providers is covered in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#aiproviders).

Settings can be customized for specific categories, or a parent category can be configured to pass its settings to child categories.

Let's breakdown all the available options.

![Configuring AI Automation for Prayer Categories](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/prayer-category-ai-automation-v18.png)

Prayer Request Categories - AI Automation Configuration

When setting up *Prayer Categories* you may be tempted to create a new child category for every type of prayer, but trust us—keep it simple and go only **one level deep**! Here’s why: Let’s say you break down the **Nations** category into 195 individual countries. If **Nations** (a child category) inherits settings from **All Church** (the parent), those settings won’t trickle down to **Rwanda** (a grandchild). That means you’ll have to manually configure all 195 nations. Yikes. On top of that, volunteers entering prayer requests for **Rwanda** need to locate the category. Make it easier for everyone, no grandchildren!

# AI is Not Perfect

AI can be a helpful tool to streamline tasks, enhance automation, and act as an additional safety net for detecting concerns—such as potential self-harm. However, AI is not foolproof. Always review and monitor AI-generated results carefully. Use AI as a support tool, not a replacement for human oversight, especially when handling sensitive or urgent matters.

# Prayer Request Default Category

The *Prayer Request Entry* block defaults to the "General" category, meaning the AI will only sort requests into its child categories. If you want the AI to categorize requests under a different parent category—like "All Church"—you need to select it as the *Default Category* in the block settings. This ensures the AI categorizes requests based on the chosen parent category’s subcategories.

## AI Disclaimers

It can be nice to let your prayer team know when AI automation has modified a prayer request. To support this, the *Prayer Session* block and the *Prayer Request Detail* block include settings that allow you to display a disclaimer whenever AI modifications have been applied.

![Special settings on the Prayer Session block](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/prayer-session-block-settings.png)

Prayer Session - Block Settings

![An example of a Prayer Request showing the disclaimer](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/prayer-session-example-disclaimer.png)

Prayer Session - Example Prayer Request Disclaimer

![Special settings on the Prayer Request Detail block](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/prayer-request-detail-block-settings-v18.png)

Prayer Request Detail - Block Settings

![An example of a Prayer Request Detail showing the disclaimer](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/prayer-request-detail-example-disclaimer-v18.png)

Prayer Request Detail - Example Prayer Request Disclaimer

The original, unaltered request can be seen in the internal *Prayer Request Detail* block when editing the prayer request.

![An example of a Prayer Request Detail showing the original, unaltered request](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/prayer-request-detail-example-internal-edit-v18.png)

Prayer Request Detail - Edit

# Lastly...

Even with all the AI magic, there’s a chance a prayer request might slip through the cracks or not get scrubbed enough. If you spot something that doesn't seem right, send us the original prayer request along with a screenshot of your AI settings. That way, we can fine-tune the system and help our AI get a little smarter.

Table of Contents

- [Welcome](#welcome)
- [All About Prayer](#allaboutprayer)
- [Getting Started](#gettingstarted)
- [Entering Prayer Requests](#enteringprayerrequests)
- [Administrating Prayer Requests](#administratingprayerrequests)
- [Prayer Team Power Tools](#prayerteampowertools)
- [Prayer Requests for Groups](#prayerrequestsforgroups)
- [Prayer Request Comments Digest](#prayerrequestcommentsdigest)
- [Prayer AI Automation](#prayeraiautomation)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


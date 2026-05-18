---
description: "Use when users ask about how text giving works, the registration process for text donations, or what to expect when giving via SMS"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Text Giving

Text Giving

What could be more convenient than texting your financial gift straight from your phone? Text Giving provides a simple process, making giving via text quick and easy.

![Text Giving](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-phone-screenshot-v14.png)

Text Giving

As pictured above, all a person needs to do is text the word “give” and then the amount they wish to donate. If they entered the wrong amount, then they can just text "refund" and it will be like the gift never happened.

You can customize which keywords a person texts to donate or request a refund. The keywords are case-insensitive, so it doesn’t matter if someone texts “give” or “Give”. Similarly, the person can either add the dollar sign or not. If the amount is in the thousands, they can include the comma ($1,500) or not ($1500).

Before a person can start Text Giving, though, they’ll need to register. We’ll walk you through the registration and giving process, and then show you how to set it all up.

# The Text Giving Experience

Below we’ll look at what a person can expect as they go through the Text Giving process. It starts with a one-time registration each person needs to complete (or you can do it for them, more on that later). Going forward they can text a keyword and an amount, to give at the push of a button.

## Text Giving Registration

When a person first texts a giving keyword to your SMS Pipeline they’ll get a response containing a link to the registration page. This is where people go to complete the one-time setup needed to give by text and to complete their first gift.

![Text Giving Registration Response](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-phone-registration-v14.png)

Text Giving Registration Response

Out of the box, the setup page is configured for you on the external site template we provide. Located under the *Give* area, a person could navigate there directly rather than accessing it by text. The page comes with the *Utility Payment Entry* block. The *Utility Payment Entry* block is the money block, literally, for Text Giving. However, an administrator must configure this block before Text Giving can be used. We’ll cover that configuration a little later.

If the person is logged in, most of the form is filled in for them. They'll just need to provide a payment method. Otherwise, the form is short and easy to complete.

![Text Giving Setup](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-setup-external-website-v14.png)

Text Giving Setup

After submitting the form pictured above, the person sees the confirmation page pictured below. The text near the top of the block lets them know their next gift can be sent by texting the word “Give” followed by an amount.

![Text Giving Setup Confirmation](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-reg-confirmation-page-v14.png)

Text Giving Setup Confirmation

You can configure what the message along the top says by updating the *Finish Lava Template* block setting for this block. You’ll want to update this if your SMS Pipeline is configured with giving keywords other than “Give”. We’ll dive into the SMS Pipeline configuration in a bit, but for now just know that’s where giving keywords (like "Give" or "Gift") are configured.

## Continued Giving

After the above setup is complete, the person can give simply by texting a keyword and an amount.

![Text Giving](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-phone-screenshot-v14.png)

Text Giving

If they need to access the setup page again, perhaps because they want to change their payment method, all they need to do is text “Setup” and they’ll be sent a link to the setup page. Like the giving keyword, you can configure what Setup keyword(s) a person can text. You can also customize the response the person receives. We'll show you how to set that up in the configuration section below.

![Text Giving Setup Keyword](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-phone-setup-v14.png)

Text Giving Setup Keyword

## Other Scenarios

What we’ve described will be the experience for most people. They will text a giving keyword and will receive a response confirming the gift or requesting they register. Occasionally they may text “Setup” if they need to make changes. However, there are other scenarios. Below is what comes with Rock out of the box, but for each of these scenarios you can customize the response.

| **Help Response** | Because people can text just about anything, the text a person sends may not be what Rock is expecting. Or perhaps an error occurred. In those cases, Rock sends a response providing directions on how to use Text Giving. | ![Help Response](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-help-response-v14.png) |
| --- | --- | --- |
| **Max Amount Response** | You can optionally set a maximum allowed amount for Text Giving. If the person tries to give over that amount, they'll receive this response. | ![Max Amount Response](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-max-amount-response-v14.png) |
| **Refund Failure Response** | Text Giving also allows people to request a refund of their last texted donation. However, there are scenarios where the refund can’t be processed via text (see below). In those cases, the person receives the response seen here. | ![Refund Failure Response](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-refund-fail-response-v14.png) |
| **Refund Success Response** | If the refund is requested within a configurable amount of time, the person can text a refund keyword and it will be like the donation never happened. That’s because there’s a configurable delay between the person’s text and sending the transaction through your financial gateway. | ![Refund Success Response](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-refund-success-response-v14.png) |
| **Missing Amount Response** | If Rock picks up a giving keyword in the person’s text, but can’t determine the amount, the person receives this response. All the person needs to do here is respond with the amount they wish to give (no keyword is needed). | ![Missing Amount Response](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-missing-amount-v14.png) |
| **Transaction Failure Response** | If the transaction can't process or encounters an error, this is the message the person may receive. However, if you delay processing (see *Processing Delay Minutes* below) then the message configured in the *Charge Future Transactions* job will be sent instead. | ![Transaction Failure Response](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/text-to-give-transaction-failure-response-v16.png) |

  

# Configuring Text Giving

The above is all made possible with just a few configuration steps. Generally, you'll use what ships with Rock out of the box, but there are opportunities for customization.

## Utility Payment Entry Block

The registration page we showed in the prior section is simple for the person using it, but there are many settings driving this block. That's because the *Utility Payment Entry* block can be used for purposes besides Text Giving. For now, we'll just highlight the settings that are needed for Text Giving to work. The rest of the settings for this block should be kept as-is to avoid any issues with Text Giving.

![Utility Payment Entry Block Settings - 1](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-ttg-1-v14.png)

Utility Payment Entry Block Settings

# Refund Instructions

There's another block setting called *Finish Lava Template* that controls what's displayed on the setup confirmation page. You'll want to update this if your giving keywords don't include "give" or if you want to provide instructions on how to request a refund.

On the *Advanced Settings* tab of the block settings, you'll find the option to enable this block for Text Giving as pictured below. This is enabled on the Text Giving setup page by default, but you may want to double-check it if you're having issues with Text Giving.

![Utility Payment Entry Block Settings - 2](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/utility-payment-entry-block-settings-ttg-2-v14.png)

Utility Payment Entry Advanced Settings

## SMS Pipeline Setup

The next step in enabling Text Giving requires configuring your SMS Pipeline. There's a special *Give* action that is added to the pipeline to support Text Giving. For details on setting up and using the SMS Pipeline in general, see our [Communicating Using Rock](https://community.rockrms.com/documentation/bookcontent/8#smspipeline) manual.

Navigate to Admin Tools \> Settings \> SMS Pipeline and select the pipeline you want to use for Text Giving. While editing the pipeline, click and drag the *Give* action from the panel on the left into the center of the page under *Incoming SMS Message*. As pictured below, the *Give* action is now included in your pipeline and is ready to be configured.

![SMS Pipeline Give Action](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/sms-pipeline-give-action-v18.png)

SMS Pipeline Give Action

# Failed Transaction Notifications

The person will get an SMS text message if their gift fails to process successfully. If you're using the *Processing Delay Minutes* setting described above, you must add a *Send SMS Response From* number in the *Charge Future Transactions* job for this to work. If *Processing Delay Minutes* is set to "0" and the transaction fails, then the *Transaction Failure Response* configured in the SMS Pipeline will be sent.

If the person uses Text Giving, you can see that information on the *Person Profile* page under the *Contributions* tab.

![Text Giving on the Person Profile](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/text-to-give-person-profile-v18.png)

Text Giving on the Person Profile

You can also come here to manually add or edit Text Giving settings for an individual. This is where you can set or change the default financial account to which the person gives. The person must have a saved account (e.g., credit card, checking account) on file to use Text Giving.


---

## Accounts {#accounts}

> **Path:** Rock Solid Finances > Accounts

Accounts determine what a transaction is for. In our examples above, both the *General Fund* and the *Building Fund* are accounts. These accounts usually tie into your accounting system. Accounts are managed under Finance \> Accounts.

# Account List

This page shows a list of all the accounts defined in Rock.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/account-list-v18.png)

Account List

Note the hierarchical navigation tree on the left side of the screen. Like with the Group Viewer, this structure allows you to quickly and easily organize and view your accounts. Click the icon to filter by Active or All accounts. If you have many accounts, you can search for an account using the *Quick Find* field above the tree.

# Account Details

From the list of accounts, you can add or update an account using the account details screen.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/account-detail-v18.png)

Account Details

# Custom Account Attributes

To add custom account attributes, go to Admin Tools \> Settings \> Entity Attributes. Once there add a new attribute and set the *Entity Type* field to *Financial Account* and set the other settings as needed. Once you do this, the account's attribute value can be edited near the bottom of the *Account Detail* page.


---

## Giving Analytics {#giving-analytics}

> **Path:** Rock Solid Finances > Giving Analytics

Giving Analytics

The giving analytics block provides a powerful tool for analyzing and reporting giving information. Let's look at how we can use this block to empower your organization.

# Chart Mode

Chart mode allows us to get summary information on the transactions that meet our search criteria. While the main view is the chart, we can also get the numbers behind the chart.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/giving-analytics-graph-v18.png)

Giving Analytics Chart Mode

# Details Mode

The details mode shows us the individuals behind the data. Note that the data is shown by 'Giving Unit'. If an individual combines their giving with their family, then the head of household will be listed instead of the individual matched to the transaction.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/giving-analytics-details-v18.png)

Giving Analytics Details Mode

# Last Gift Ever

Quick note on the 'Last Gift Ever' column on the Giving Analytics block. If spacing weren't an issue this column would really be named 'Last Tax-Deductible Gift Ever to Any Account'. When using patterns to exclude people with certain giving trends this column can be a little confusing until you realize it is not filtered by any account.

  

It's important to keep in mind that Rock's *Giving Analytics* reporting is focused on reporting on **people and ministry weeks**, not reporting on **dollars and transaction dates**. For that reason, Rock groups contributions together according to a Sunday date. Rock's weeks, for the purpose of attendance and giving, run on a Monday to Sunday timeframe by default. This provides insight into giving by people during a specific week. However, this means the results won't line up entirely with a calculated total of transactions grouped by the transaction date. For instance, December 31 was on a Monday in 2018. Giving analytics for 2018 split by week would therefore show contributions from December 31, 2018 in the week of January 6, 2019.


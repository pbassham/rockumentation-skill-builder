---
description: "Use when setting up online giving pages, configuring donation transactions, or managing recurring and one-time payment options in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Online Giving

Online Giving

In this fast-paced world, people are always looking for a way to save time. Online donations are a great way to provide flexible options to your attendees, while bringing consistency to your weekly giving. Let’s tour the online transaction options included in Rock.

# These Tools Can Be Used For More Than Giving

While the tools we'll discuss in this section were created mainly for online donations, they can be used for any type of online payment or transaction.

# Types of Giving Transactions

As we’ve seen earlier there are two types of giving transactions:

- **One-Time Transactions:** A single specific gift given on a single date.
- **Scheduled Transactions:** A recurring transaction that follows a set schedule (weekly, monthly, etc.)

# External Website Tools

Rock provides several pages for your website guests to use to set up and manage their online transactions. These pages can all be found under the *Give* section.

## Giving Homepage

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/online-giving-v13.png)

Giving Homepage

# Give Now Page

The give now page is a flexible page that walks a person through the process of giving in a wizard-like fashion.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/online-giving-flow.png)

Online Giving Flow

The entry step is by far the most complex. Let’s look at it in more detail.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/give-now.png)

Give Now Page

This block has a few other settings that you should know about. These include:

1. **Batch Name Prefix:** When the transactions are downloaded from the gateway, they're assigned to a batch. You can configure the names of these batches to all start with a certain prefix.
2. **Source:** For reporting, it’s good to know where a transaction came from. For instance, you might use this block on your main website or a web-based kiosk in your lobby. Knowing the source for every transaction will help you determine the success of each platform. New source options can be set up under Admin Tools \> Settings \> Defined Types \> Transaction Source.
3. **Address Type:** You'll want the address information the guest entered to be for their home address in most cases, but you can change this if you wish.
4. **Layout Style:** This setting determines if the layout should be:
	- **Vertical:** Sections are stacked vertically (default)
		- **Fluid:** Sections flow in a horizontal layout as they fit.
5. **Additional Accounts:** Determines if the *Add Another Account* option is shown.
6. **Impersonation:** This setting allows staff with proper security to enter gifts for individuals in the database. This is helpful in cases where the block is used internally.
7. **Prompt For Phone:** Determines if the guest should be asked to provide their phone number on the entry screen (default is no).
8. **Prompt For Email:** Determines if the guest should be asked for their email address on the entry form (default is yes).
9. **Enable Business Giving:** This setting displays the option to give as a business. When enabled, the individual can toggle between their personal and business information on the Give Now and Giving History screens.
10. **Confirm Account Email Template:** When a guest decides to create an account after confirming the gift, you can send them an email confirming this action. This setting allows you to select the email template to use for this email.
11. **Receipt Email Template:** When a guest's gift has been processed, you can send them an email receipt. This setting allows you to select the template to use for this email. If this setting is left blank no receipt will be sent.
12. **SMS Opt-in:** If you're asking for the person's phone number, this gives you the option of allowing them to opt in to receiving text messages. The message the person sees can be customized by going to Admin Tools \> Settings \> System Configuration | UI Settings.

Transactions that occur from the *Give Now* page will be immediately processed through the payment gateway and added to a batch using the *Batch Name Prefix* block setting.

## Giving History

This page shows all other previous transactions for the logged-in user. Note the Show Giving For tabs which allow you to toggle between individual and business giving history.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/giving-history-v13.png)

Giving History

## Manage Giving Profiles

This page allows the guest to manage any scheduled transactions they have created.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/manage-giving-profile.png)

Manage Giving Profiles

# Moving To A New Payment Gateway

If your organization decides to move your online giving to a new payment gateway, this block has settings to help you transfer your scheduled transactions to the new gateway. See the [Transferring Gateways](#transferringgateways) section of the *Payment Gateways* chapter for details on how to handle this scenario.

## Saved Payment Accounts

Your website guests have the option to save their credit card and bank accounts for later use. This screen allows them to manage these accounts. The options on this screen will vary depending on your gateway provider. At the very least your guests will be able to delete these accounts from this page. Some providers may allow you to also edit the saved payment accounts.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/giving-saved-payment-accounts.png)

Payment Accounts

# Batches For Online Transactions

Unlike processing on-site transactions, which are manually entered, the creation of online transactions in Rock is an automated process. The steps differ a bit depending on whether the transaction is a one-time transaction or a scheduled recurring transaction.

## One-Time Transactions

When a one-time transaction is created online, it's immediately sent to the payment gateway and processed. If the gateway accepts the payment, a transaction is immediately created in Rock. The transaction is added to an *Online Transaction* batch. The transaction will be placed in an existing batch if one is available with the following criteria:

- Is open
- Has a matching prefix to the one defined on the Utility Payment Entry block
- The current date and time falls in between the batch’s start and end date

Otherwise, a new batch will be created for the transaction with a start and end date of the current day.

# Future One-Time Gifts

If a one-time gift is configured to process on a day other than the current day, it will be processed like a scheduled transaction.

## Schedule Recurring Transactions

Scheduled transactions work a bit differently than one-time gifts. These transactions must be downloaded at a later date from the payment gateway. See the [Downloading Transactions](#downloadingtransactions) section for details on how to download these transactions.


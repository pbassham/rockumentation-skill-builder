---
description: "Use when a user asks about setting up, managing, or viewing recurring/repeating donations and payments in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Scheduled Transactions

Scheduled Transactions

Many transactions occur once and then they're done. However, sometimes your guests will want to set up automatic repeating payments that run on a selected schedule (weekly, monthly, etc.). Rock calls these *Scheduled Transactions*.

# Administrating Scheduled Transactions

You can view all of the scheduled transactions in Rock under Finance \> Scheduled Transactions.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/scheduled-transaction-v18.png)

Scheduled Transactions

From there you can choose a scheduled transaction to edit.

# Adding A New Scheduled Transaction

Scheduled transactions must be entered from the individual’s *Person Profile* page. They can also be added by your guests on your external website.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/scheduled-transaction-detail-v18.png)

Scheduled Transaction Detail

# Personal Profile

Scheduled transactions can also be viewed on the individual's *Person Profile* page under the *Contributions* tab.

See our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#contributionstab) for more information.

# Scheduled Transaction Frequencies

The following options are available as frequency patterns for scheduled transactions. Each payment gateway will support only a subset of these options. Each gateway will also have some special rules for how they calculate the schedules. Notes on these rules can be found at the end of this document under the chapters for each gateway.

- **Weekly:** Every seven days starting on the start date.
- **Bi-Weekly:** Every two weeks starting on the start date.
- **Twice A Month:** Twice a month. Usually this is used with the start date of the first of the month. Payments will then come out on the 1st and 15th of the month.
- **Monthly:** Once a month on that day of the month established by the start date.
- **Quarterly:** Every three months on the same date as the first payment.
- **Twice A Year:** Every six months on the same date as the first payment.
- **Yearly:** Once a year on the same date as the first payment.

# Downloading Transactions

There are two ways to configure this download. The first way is to set up a *Get Scheduled Payments* job to run every night. This can be done under Admin Tools \> Settings \> Jobs Administration. This job will run each night (or when you decide you want it to run) and create batches and transactions for new payments.

# Don't Forget To Set Up The Download Job

It's important to remember to set up the *Get Scheduled Payments* job if you want the transactions to download automatically (highly recommended).

The download job has a few settings that you should review. These include:

1. **Batch Name Prefix:** When the transactions are downloaded from the gateway, they're assigned to a batch. You can configure the names of these batches to all start with a certain prefix.
2. **Days Back:** The number of previous days that the download job should use when querying the gateway for processed transactions. We recommend a value of seven. This allows for times that the job may not run every day. There is no risk in downloading the same transaction on multiple days as Rock keeps track of which transactions have already been added.
3. **Receipt Email:** Each time a new transaction is downloaded for a person, Rock can send them a receipt of that transaction. Use this setting to specify the system communication that should be sent when new transactions are downloaded.
4. **Failed Payment Email:** You can send a communication to specific recipients if a scheduled payment fails. Choose which system communication you want to send from the dropdown menu.
5. **Failed Payment Workflow:** You can launch an optional workflow if a scheduled payment fails. Choose the workflow you want to run in this field.

You can also choose to manually download the new payments from the payment processor. You can do this under Finance \> Download Payments. This does the same thing as the Rock job but requires you to manually run the download. This block also has settings that are similar to the job settings for setting the batch prefix and email receipt.

# Setting a Payment Reversal Notification Workflow

The Scheduled Job Detail screen also includes an option to trigger a workflow when a scheduled transaction is declined (called a "reversal"). You can configure the workflow to perform any necessary follow-up task, such as sending an automated communication. Simply configure the workflow in your General Settings, then select it from the Failed Payment Workflow dropdown menu.

Downloading transactions from the gateway is actually a bit trickier than you might think because of certain edge-cases and advanced features. We'll cover some of these next.

## Recent Scheduled Transaction Changes

Consider this example. Ted has a scheduled transaction set that takes $120 out of his account every week and puts it to the *General Fund* account. Early in the morning the payment gateway creates a new transaction for this amount. Ted arrives at work and changes his giving to $100 per week. Finally, later in the day, the church's *Get Scheduled Payments* job runs and pulls that day's transactions down from the gateway. The gateway's transaction says it's for $120 but Rock's information only has $100 allocated. When this happens (certainly a rare edge-case) Rock will apply any extra amount to a *default* account. This default account is the first active account that does not have a parent account and where the current date falls between the account's start/end dates.

## Naming Batches for Online Giving

The way that Rock calculates the *Batch Name* is by combining a *batch prefix* and a *batch suffix*. The prefix is usually set by a block or job setting (the default value used by the *Utility Payment Entry* block, *Scheduled Payment Download* block, *Get Scheduled Payments* job etc. is *Online Giving*). The suffix depends on the currency type (*Tender Type* Defined Type). If it is not a credit card transaction, then the currency type value is used (e.g., *ACH*). If it is a credit card transaction, then the *Credit Card* type value is used (e.g., Visa, MasterCard, etc.). However, the *Credit Card* defined value also has a *Batch Name Suffix* that can be used to override this value. For example, if you want to combine Visa, MasterCard and Discover transactions into the same batch, you can set the *Batch Name Suffix* for all three to the same value (e.g., *VMD*) and then transactions of these types will be combined into the same batch.

# Expiring Credit Card Notification

By default, a *Send Credit Card Expiration Notices* job is configured to run once a month. This can be found under Admin Tools \> Settings \> Jobs Administration.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/job-config-expiring-credit-card-notice-v18.png)

Expiring Credit Card Job Configuration

The purpose of this job is to let people know that their credit cards are about to expire. Typically, this will mean that the job will send an *Expiring Credit Card Notice* system communication (Admin Tools \> Settings \> System Communications) to the person whose credit card will expire the following month. However, some organizations may use a bus message to signal their system to send an email by enabling the *Enable Sending Bus Event* option.

If you wish to do additional processing for each expiring scheduled credit card transaction, the job can optionally be configured to launch a custom workflow. You can also choose to delete any saved accounts with credit cards that have expired after the provided number of days.


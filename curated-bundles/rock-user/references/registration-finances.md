---
description: "Use when managing event registration payments, processing refunds, or setting up partial payment options in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Registration Finances

Registration Finances

Paid registrations come with the additional complexity of having to work with money. Rock provides several tools to make this as simple as possible while also ensuring that there are good protections in place for proper accountability.

# Adding Payments

While most of the time payments for events will be handled by the registrar during the registration process, you can manually enter payments on their behalf from the registration details page:

Tools \> Event Registration \> Registration Template \> Registration Instance \> Registration (ok... that seems complex, but it's really not as bad as it looks on paper...)

From the *Registration Details* page, you can manage payments using the *Payments* tab pictured below.

![Registration Payments](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-payments-manage-v18.png)

Registration Payments

Once you click the link you will see the *Payments Edit Panel*. The screenshot below shows you all the options on this screen.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-payments-add-v18.png)

Payments Edit Panel

# Refunds

Processing full or partial refunds through Rock is simple. Simply click the *Date / Time* link shown in call-out #1 above to proceed to the financial transaction detail page for the payment. From here you will see the screen below. Note the refund button at the bottom of the page.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-financial-detail-v18.png)

Financial Transaction Detail

Clicking the Refund button will show the refund modal below.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/registration-refund-detail-v18.png)

Payments Edit Panel

# Partial Payments

Partial payments are a popular feature for events with higher costs, like camps. The age ol' problem with them comes when it's time to complete the payments. Many times, people want to pay off the balance, but they're not sure how. Other times... well... they just need a reminder. Let's look at several strategies on how to make partial payments work for you.

# Allowing Partial Payments

To allow partial payments, a *Minimum Initial Payment* amount must be provided in either the registration template or the registration instance (wherever the cost is being set).

## Reminder Emails

The default email template for event reminders will provide a summary of the amount due with a link to complete the payment. Remember that the reminder emails can be sent out more than once by changing the send date to the future after the initial reminder goes out.

## Recent Registration Block

Rock also ships with a *Recent Registration* block on the *My Account* page of the external website. This block, located under the Assessments list along the right of the page, shows registration information and notes if a payment is due. Clicking the link will take them to a page where they can complete the payment or apply a discount code. Note: this block only displays registrations that have an attached Calendar Event Item.

You'll want to review this block's settings. It can display registrations based on various criteria: recent registrations, future events, balances due, or any combination thereof. It's not limited to recent registrations only. There's also a Lava Template, which means you can customize how the block appears and what information it shows.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-recent-registrations-v12.png)

Recent Registration Block

## Post-Registration Discount Codes

Not only does the *Recent Registration* block allow individuals to make payments against an outstanding balance, they can also apply a discount code (see [Discounts](#discounts)). This is great if they find out about the discount after registering, or if they simply forgot to apply the code when they first registered.

To apply the discount code the individual needs to access the *Review Registration* page from the *Recent Registration* block, the same way they would to make a payment as described above.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/registration-review-registration-discount-code.png)

Review Registration Page

Individuals who have already paid in full will not be able to enter a discount code after registering. Similarly, individuals who have already used a discount code can’t apply an additional discount code.

If the discount ends up deducting more than the individual owed, the result will be a negative balance on their account. In that case you’ll need to manually issue a refund (see [Refunds](#refunds)) to get the balance back to zero.

# Event Registration Matching

If you need to match event payments to transactions in a batch, *Event Registration Matching* is exactly what you’re looking for. You’ll find it under Finance \> Event Registration Matching.

This lets you select a batch and a registration instance, then match transactions from that batch to individual registrations. This can be particularly helpful if you’re using [Check Scanning](https://community.rockrms.com/documentation/bookcontent/15#scanningchecks) to process a set of registration payments, but it works with any transaction from any open batch.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/event-registration-matching-v18.png)

Event Registration Matching

You’ll notice there is no *Save* button on this page. As soon as a transaction is matched to a registration, the registration itself is updated behind the scenes in real time. For instance, we could view Noah Decker’s registration right now and see that it has been paid in full. If we were to un-match that transaction from Noah’s registration, that too would be updated in real time and anyone viewing the registration would see a balance owed.


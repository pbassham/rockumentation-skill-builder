---
description: "Use when answering questions about setting up, configuring, or managing payment plans for event registrations in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Payment Plans

Payment Plans let you spread out your payments over time, making it easier to afford activities like camps or other events. With options to customize how often payments are made, Payment Plans offer flexibility and peace of mind, ensuring everyone can participate in your events.

# Obsidian Block

The Payment Plan feature is available only when using the Obsidian version of the Registration Entry block.

# Starting a Payment Plan

Registering for an event with a Payment Plan is simple. The registration process stays the same as it is without Payment Plans. There's only a slight change during the final step, where you’ll have the option to create a Payment Plan.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/payment-plan-create-new-plan-v16.png)

Create a New Plan

When you reach the payment step, you can either pay in full or set up a Payment Plan by clicking the *Set Up Payment Plan* button. From there, you’ll be asked to choose:

1. **Payment Frequency:** How often you want to make payments (weekly, monthly, etc.)
2. **Start Date:** When you’d like your payments to begin.
![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/payment-plan-configure-new-plan-start-v16.png)

Set Up Payment Plan

Once you’ve made your selections, you’ll move to the next screen where you can customize your Payment Plan further.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/payment-plan-configure-new-plan-v16.png)

Set Up Payment Plan

Please note that Payment Plans can only be created during the registration process. Your staff or volunteers won’t be able to set one up on behalf of someone else. While administrators can modify payment plans, they can't create them.

Once your plan is set, you can manage it by going to the Recent Registrations section from your *My Account* page. You’ll have the option to cancel your Payment Plan if needed.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/payment-plan-change-or-cancel-v16.png)

Change or Cancel a Plan

If you want to make changes to your Payment Plan, you’ll need to cancel the current plan and set up a new one. Again, you can do this on your *My Account* page under Recent Registrations.

If a new fee is added after you’ve set up your Payment Plan (like an additional t-shirt), the plan won’t automatically adjust to cover the new amount. The additional fee will need to be paid separately.

# Configuring Payment Plans

Now that you’ve seen how a Payment Plan works, let’s talk about how to configure it. Payment Plans are enabled in the registration template settings (under Tools \> Event Registration).

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/payment-plan-enable-plan-v18.png)

Enable Payment Plans

Next, set a *Payment Deadline* for the registration. This is the date by which all payments must be completed. The number of payments available will depend on the frequency selected and the time remaining before this deadline.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/payment-plan-set-payment-deadline-v18.png)

Set Payment Deadline

# Payment Plan Administration

Payment Plan management happens in the same screens used for managing event registrations, with added features. If a Payment Plan is in place, you’ll see a calendar icon next to the *Balance Due* on the Registrations tab.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/payment-plan-icon-for-balance-due-v18.png)

Payment Plan In Event Registration

# Payment Plan Changes Won’t Auto-Sync

If you're using the Payment Plan feature, be aware that changes to a registration's balance (like applying discount codes) won’t update the registrant's payment plan. Payment schedules are controlled by the external payment gateway (e.g., My Well), not by Rock. To adjust an individual's payment schedule, you’ll need to do the following...

Administrators can make changes to existing Payment Plans by accessing the registration details.

Deleting a plan will cancel the plan and any remaining payments will not be made. If the person wants to continue to use a Payment Plan after it’s been deleted, they must create a new plan. Note that the *Change* and *Delete* options pictured below are only available if the block's security is updated to allow *Edit Payment Plan* access.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/payment-plan-admin-change-or-delete-v18.png)

Payment Plan In Event Registration

The *Number of Payments* field, pictured below, differs for administrators. While registrars can only select a certain number of payments based on frequency, start date and payment deadline, administrators can choose any number. This allows extending the Payment Plan beyond the deadline, which can help if someone is worried about making the current payments.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/payment-plan-admin-change-plan-v18.png)

Administrative Change to Plan

Please note that changes cannot be made on the date a payment is due. Also, if additional fees are added, the Payment Plan won’t automatically update to reflect the new total, so the person will need to pay the fee separately. However, administrators can adjust the Payment Plan manually to reflect the updated balance.


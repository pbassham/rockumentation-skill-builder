---
description: Use when user asks how wait lists work during event registration or what happens when events reach capacity
source: "https://community.rockrms.com/documentation/bookcontent/29/365"
sourceLabel: "Event & Calendar Guide"
---
> **Path:** Event & Calendar Guide > Wait Lists

We know your events are going to be popular. So popular, in fact, that you probably won't be able to fit everyone. Don't worry, Rock's wait list features will ensure that you can manage the crowds. Let's take a look at how these features work.

# Registration Entry

You can enable the wait list features on registration templates. Then, you'll configure the maximum number of registrants on registration instances. When the event is full, individuals will see the message below when they attempt to register.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/waitlist-warning-v13.png)

Wait List Warning

At this point, the individual can decide not to register or to add themselves to the waitlist. Let's look at a slightly more complex scenario. What if there is only one spot left and the person is hoping to register two individuals? When they arrive at the page, they'll see a normal registration page. But, when they select more people than there are slots available, they'll get the message below.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/waitlist-warning-partial-v13.png)

Wait List Warning (Partial)

In this case, let's assume that they would like to continue with registering both kids for camp. You'll notice that the registrant entry screen below looks fairly normal but has an additional notice at the top reminding them that this individual will be fully registered for the event.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/waitlist-registration-registrant-v13.png)

Registrant Screen

As they move to register the second child, they will notice that the reminder is now warning them that this individual will be on the wait list. Careful observers may have noticed that the number of entry fields has changed. (We're not asking for Leader Preference, etc.) You have the option to configure registration form fields for the wait list or to hide them.

# Group Member Entry Fields

Because individuals on a wait list haven't been added to the group yet, the system cannot store Group Member Attributes for them. These fields will be hidden automatically during the initial wait list sign-up. Don't worry, though—you’ll be able to collect this information later when you move the individual to a full registration.

As of Rock v18.3, Rock requires the First Name and Last Name fields to have "Show on Wait List" enabled. This prevents "anonymous" records from being created and ensures your data remains clean.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/waitlist-registration-onwaitlist-v13.png)

Wait List Screen

As they move to the payment screen, note that those on the wait list are not charged for the registration. They are simply holding a spot.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/waitlist-payment-v13.png)

Wait List Payment

It's very important that we're clear about who is on a wait list and who is a full registrant. To this end, both the confirmation screen and the email reflect the individual's registration status.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/waitlist-registration-complete-v13.png)

Wait List Confirmation Screen

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.17.0/images/waitlist-registration-confirmation-email.png)

Wait List Confirmation Email

# Wait List Administration

Now that we're familiar with the process of registering for a wait list, let's look at how you can administer wait lists.

From the registration instance screen, you'll notice that registrations with individuals on a wait list are clearly noted on the list. There is also a *Wait List* tab to help you view and manage the wait list.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/waitlist-registration-list-v18.png)

Registration List

The Wait List tab allows you to view those on the wait list with their placement order. If you would like to move an individual from the wait list to a full registrant, simply select the checkbox in front of their name and select the *Move From Wait List* button at the bottom of the grid.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/move-from-wait-list-v18.png)

Wait List Tab

After you select to move them, you'll see the screen below confirming that they have been moved. At this point the new full registrant will be added to any groups that were configured.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/waitlist-move-confirm-v18.png)

Wait List Move Confirmation

If you'd like to send them an email to confirm the move and request additional fields simply select the *Send email to individuals* checkbox.

When moving an individual, you should almost always select *Send email to individuals*. This email shares the good news and provides a link to finalize their registration. This step is critical because it collects any payment due and asks the questions that were skipped during the initial sign-up (like Group Member Attributes). If the individual doesn't complete this step, their registration data will remain incomplete.

This email might be crafted already in the Registration Template, but if not, you can click the *Source* toggle to create it here. Don't forget you can use Lava to personalize the content.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/waitlist-move-email-v18.png)

Wait List Move Email

While this feature makes moving people from the wait list a simple process, you can also convert a full registrant to a wait list member or a wait list member to a full registrant from the registration details screen.


---

## Registration Payment Reminders {#registration-payment-reminders}

> **Path:** Event & Calendar Guide > Registration Payment Reminders

Registration Payment Reminders

Allowing [partial payments](#partialpayments) is great, but getting the remaining balance has always been difficult. That was until Rock came around. Now there are several tools for getting the remaining balance quickly and easily. Let's look at all your options!

# Manual Reminders

One way to remind individuals of remaining balances is to manually send them a reminder. You can do this from the *Registration Instance* page.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/payment-reminder-link-v18.png)

Send Payment Reminders

Once you click the Send Payment Reminders link, you'll see the page below. This page allows you to customize the reminder text and who should receive the email.

![](https://rockrms.blob.core.windows.net/documentation/Books/29/1.18.0/images/payment-reminder-manualsend-v18.png)

Payment Reminder Communication

# Automatic Reminders

Manual reminders are nice, but automatic ones…well they're even better! If you provide a *Payment Reminder Time Span* on the registration template, Rock will send an automatic reminder to the registrations based on that timeframe. So, for example, if you provide the value of 30 for the *Payment Reminder Time Span*, they will receive a reminder every 30 days until their balance is paid. Reminders will not be sent if the *Payment Reminder Time Span* is set to "0" or left blank.

This sending is done through the *Event Payment Reminders* job under System Settings \> Jobs Administration. This job does have one configuration parameter you should be aware of. The job *Cut-off Date* is the number of days past the registration close date to send reminders. After this cut-off, reminders will need to be sent manually to prevent eternal reminders.


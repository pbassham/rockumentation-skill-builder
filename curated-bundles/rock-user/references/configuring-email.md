---
description: "Use when configuring Rock's email system, setting up SMTP transports, defining communication mediums, or managing safe sender domains"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Configuring Email

Configuring Email

When it comes to email configuration, much of the heavy lifting will be done outside of Rock. We have information in the Integrations chapter to help you with some of those processes. In this chapter, we’ll cover the basic Rock settings you’ll need to get email up and running. There are two main configuration areas, called Communication Transports and Communication Mediums.

# Communication Transports

Communication Transports (Admin Tools \> Settings \> Communication Transports) are where you provide the necessary details for Rock to connect with your email service provider. These details are typically provided by your service. Check out the [Integrations](#integrations) chapter for assistance with this setup.

![Communication Transports](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-transports-v18.png)

Communication Transports

# SMTP Relaying May Bite You

For development and testing you might decide to use SMTP as your transport. If you do, be sure that the server/service you use is configured to allow the Rock server to relay. If you're using Google Apps, see the tips in the [Integrations](#integrations) section below.

# Communication Mediums

Communication Mediums (Admin Tools \> Settings \> Communication Mediums) represent the available communication methods in Rock, including email.

![Communication Medium Email Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-medium-configuration-v18.png)

Communication Medium Email Settings

For more information on the “unsubscribe” settings, see the [Unsubscribing](#unsubscribing) section below.

# Safe Sender Domains

Many email service providers have implemented new restrictive policies on emails that are sent from a person's account (e.g., Yahoo.com) but did not originate from their email server. Because Rock sends email on behalf of others these emails can bounce in these situations. To prevent this, if an email communication is created with a From Address that is not in the Safe Sender Domains defined type, the Organization Email global attribute value will be used instead for the From Address and the original value will be used as the Reply To address.

You'll want to add all of your organization's email domains to the Safe Sender Domains defined type under:  
  
Admin Tools \> Settings \> Safe Sender Domains

# Adding Domains

Be sure that only your organization's domains are added to the Safe Sender Domains list. Adding gmail.com, yahoo.com, or any other domain you don’t control or have SPF records for will result in your email being dropped because you'd be forging 'From' addresses.

# Broken Images

If you’re finding that some of your images aren’t appearing in your email, be sure your Public Application Root setting is configured with the proper URL. This can be modified under:  
  
Admin Tools \> Settings \> Global Attributes \> Public Application Root

![Broken Email Image](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/broken-email-image-example-v16.png)

Broken Email Image

Your Public Application Root will be formatted like `https://www.organization.com/` or `https://rock.organization.com/` or similar, depending on your web address. Note that the forward-slash at the end is required.

# Unsubscribing

Configuring email in Rock involves more than just sending messages; it's about about balancing access to your people's inbox while maintaining a positive sender reputation. Why? Because when your emails are unsubscribed from, it can harm your reputation and impact whether your messages reach their intended recipients.

Consider this: even if someone signed up for your emails, they might still report them as spam if they can't easily find the unsubscribe option. Or worse, they might start to unsubscribe but then resort to marking your emails as spam if the process isn't straightforward. That's why it's crucial to make unsubscribing as effortless as possible.

This is especially true for Gmail accounts. Gmail specifies that everyone must *make it easy for recipients to unsubscribe* and *if you send more than 5,000 messages per day, your marketing and subscribed messages must support one-click unsubscribe*. Gmail also indicates that if your unsubscribe method involves sending an email, the request to unsubscribe must be processed within two days. Why all the focus on Gmail? Well, with over 1.5 billion active accounts, it’s probably used by many in your target audience, so we want to ensure we're sticking to their guidelines.

# Learn More

To read more about Gmail’s spam requirements, with links to additional resources, check out our [blog post](https://community.rockrms.com/connect/gmail-spam-requirements) on the topic.

We also look to Gmail's rules because they will help cover you from a legal perspective. Gmail policies are more stringent than the [US CAN-SPAM Act](https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business), which also has requirements related to unsubscribing. Adherence to the CAN-SPAM Act is crucial. Otherwise you expose your organization to potential legal action and hefty fines from the FTC.

Now, let's talk about how Rock can help you comply with these requirements. We've designed features to streamline the unsubscribing process. For more details on these settings, see the [Communication Mediums](https://community.rockrms.com/documentation/bookcontent/8/363#communication-mediums) section above.

![Email Unsubscribe Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/email-unsubscribe-settings-v16.png)

Email Unsubscribe Settings

# Not Gmail-Compliant

If Enable One-Click Unsubscribe is set to “No” and if the Unsubscribe URL is blank, nothing will be added to the header of the email.

With the above configuration in place, your emails will have an “Unsubscribe” option as pictured below.

![Email Unsubscribe - Gmail](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/unsubscribe-header-example-email-v18.png)

Email Unsubscribe - Gmail

When someone is taken to the Unsubscribe page on the external site, they’ll see the page pictured below. Upon arriving at the page, they can proceed to set their email preference.

![Email Preference - Unsubscribe Mode](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/email-unsubscribe-v18.png)

Email Preference - Unsubscribe Mode

For more on setting subscription preferences, see the [Communication Preferences](#communication-preferences) section below.


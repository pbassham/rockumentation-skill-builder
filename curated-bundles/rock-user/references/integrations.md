---
description: "Use when configuring email delivery through Mailgun in Rock, including setup, features, analytics, and pricing options"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Integrations

# Email: Mailgun

We've already touched on just how great we think Mailgun is, but let's dig deeper into the benefits of their service.

# Note:

We are not in a business partnership with Mailgun, nor do we receive any form of compensation from them. We are just passing along helpful tips about some quality products and services we’ve discovered along the way. While Rock ships with the Mailgun transport, other integrations and plug-ins may be available in the Rock Shop.

Mailgun is an email delivery service that provides several advanced features. Mailgun is operated by the popular web hosting company Rackspace and is used by numerous online businesses like Stripe, GitHub, Lyft, Slack and many many more. We think you'll find that using a service like Mailgun is more than worth the small cost. The main benefits of Mailgun are:

- Improved deliverability of your emails through advanced reputation features like SPF records, domain-keys and reputation monitoring. If all of this sounds Greek to you, don’t worry, they handle all of the technical details. You just need to know that they know what they're doing so you don't have to. Whew!
- Email analytics that help you keep track of trends. Through Mailgun, Rock can show you how many of your emails made it to their destination and, even more importantly, how many were opened, and internal links clicked. All of this happens for you behind the scenes so you can just sit back and view the reports.
- Not all email addresses work. Mailgun can notify you about incorrect email addresses so you can follow up. These bounced emails will be reported, and the person’s profile will be flagged to show the incorrect address.
- Mailgun also offers to inline your emails for you as you send.

## Costs

As of this writing, Mailgun has a free starter package that generously gives you 5,000 emails a month for your first three months. After that you can pay by the number of emails you send or purchase a different plan. For full details and up-to-date pricing visit their [website](https://www.mailgun.com/pricing/). In our experience, Mailgun's pricing has been very competitive, and their features are among the best in their class.

While the starter package will save you money, keep in mind that you will be given a shared IP address with other organizations. In addition to sharing that IP address, you'll share their reputation, and in some cases, their blacklist. If you find that your emails are not always getting through, or if you want to be on the safe side, you might consider purchasing a plan with a dedicated IP address. And if you've already found yourself on a blacklist, Mailgun has provided [documentation](https://help.mailgun.com/hc/en-us/articles/115005365027-What-is-a-blacklist-) about blacklists and how to follow up with their support.

## Setting Up Mailgun

Mailgun has spent time making their service easy to configure. Follow the steps below to enable and configure a new Mailgun account for Rock.

# Mailgun Updates

In late 2023, Mailgun changed its key structure, providing both *Mailgun API keys* and an additional *HTTP webhook signing key*. In Rock versions 14.4, 15.4, 16.1, and later, separate fields in the Communication Transport settings accommodate these keys. For new Mailgun accounts, you'll use either the standard account-wide *Mailgun API keys* or domain-specific *Sending API keys* as the *API Key* in Rock. Additionally, the *HTTP Webhook Signing Key* should be added to the corresponding field just below the *API Key*. Existing accounts only need action if you've changed your Mailgun API keys.

1. Sign up for a new account on the [Mailgun website](http://mailgun.com/).
2. Once setup is complete, head to the main Dashboard page in your Mailgun account to start collecting what you’ll need to get Mailgun set up with Rock.
	1. In the box near the bottom-right of the Dashboard page, click on the “API Keys” link.
		2. On the API Keys page, reveal the full *HTTP Webhook Signing Key* by clicking the eye-shaped icon. Keep track of this key, you will need it in Rock.
		3. Below the webhook key you’ll find a section called *Mailgun API Keys* that you'll use to create your API key by clicking the *Create API Key* button. You'll need to provide the key a short name and click *Create Key* to continue.
		4. Be sure to immediately copy the API key that appears on the screen. Not only will you need it in Rock, but this is the only time you get to see it. It is not the same as the *Key ID* listed in Mailgun.
		5. If you lose your key, you’ll need to create a new one by clicking the *Add new key* button.
3. Set up your domain.
	1. Head back to the Dashboard page and click the *Add a custom domain* link near the middle-right of the page.
		2. Provide your domain name and choose an IP assignment option. You may need to upgrade your plan before you can use a dedicated IP, as noted in the prior section above.
		3. On the following page, Mailgun will walk you through the DNS changes that need to be made to ensure the best delivery and spam protection.
4. Next, return to the Dashboard and scroll to the bottom to see your list of domains.
	1. Click the gear icon to the right of your domain and go to Settings. On the new page click the *SMTP credentials* tab.
		2. Under the *SMTP credentials* heading, note the login and password. You might need to reset the password.
		3. On the same page, below the Login information, note the value under *SMTP settings* (it will probably be “smtp.mailgun.org”).
5. Take a breather! You're almost done. The last step in Mailgun is to configure the webhooks. To do this select *Webhooks* from the left-hand navigation. On the webhooks page, click the *Add webhook* button near the top-right of the page.
	1. You’ll need to add a webhook for each “Event type” in the list.
		2. Put *https://\[yourserver.com\]/webhooks/Mailgun.ashx* as the URL for all events (see image below).
		3. The Open and Click tracking options need to be turned on in the Domain Settings in the Mailgun site. It's located in the Tracking section under the Domain Settings tab. Once you turn these on, the data will be tracked.

Mailgun Webhooks

![Mailgun Webhooks](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/mailgun-webhooks-v16.png)

Here's what your webhooks screen should look like once you've got it configured in Mailgun.

*Long-time users of Rock and Mailgun may recall the "Legacy Webhooks" section. As of April 2023, Mailgun no longer supports the Legacy Webhooks configuration. If you only have Legacy Webhooks set up, you'll need to move the addresses to the "Webhooks" section as shown. It's likely that Mailgun has automatically done this for you, but you may want to check to be sure.*7. Let's head back to your Rock server. First, let's enable the Mailgun Transport under  
	Admin Tools \> Settings \> Communication Transports \> Mailgun HTTP.  
	Start by changing the *Active* setting to "Yes". Next, provide the *Mailgun API* key and the *HTTP Webhook Signing Key* from above. Finally, add the domain that you want your email to come from (this must match the domain that was configured in Mailgun).
8. Last step and we're done. Now that the email transport is configured, we need to tell Rock to use it for the email medium under  
	Admin Tools \> Settings \> Communication Mediums \> Email.  
	Select "Mailgun HTTP" under *Transport Container*.

## On Behalf Of

Following the instructions on Mailgun’s site may lead to a scenario where your emails are sent “on behalf of” your domain. In short, this happens when the domain of the Sender field and the domain used in the From field are different. For instance, the Sender field would be something like `mg.rocksolidchurchdemo.com` while the From field would be `rocksolidchurchdemo.com`.

![Email With On Behalf Of](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/example-on-behalf-of-email.png)

Email With On Behalf Of

In order to resolve this, the domains should match. The domain that you're sending emails from needs to be added to your Mailgun account and verified. In the above example, the domain `rocksolidchurchdemo.com` would need to be configured in Mailgun, and your DNS records (all except MX) would need to be updated accordingly. When you're finished, your domain overview in Mailgun will look similar to the example pictured below.

![Mailgun Domain Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/mailgun-domain-settings-for-on-behalf-of.png)

Mailgun Domain Settings

Lastly, make sure the new domain is added to your Mailgun Communication Transport configuration under Admin Tools \> Settings \> Communication Transports \> Mailgun HTTP per the instructions in the prior section above. With the new domain set up and ready to go, your emails will no longer have the "on behalf of" notation. If you had an old domain that you were using (like `mg.yourserver.com`) it's no longer needed in Mailgun.

![Email Without On Behalf Of](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/example-on-behalf-of-removed.png)

Email Without On Behalf Of

# SMS: Twilio

Twilio is the leading SMS provider. Period. They not only provide the best service, but they are also one of the least expensive options available. Again, we don’t have a relationship with this organization, but we do know a good thing when we see it! Below are instructions on setting up this service for Rock.

1. From the Twilio website click the sign-up link, then provide your account information. You'll then need to verify that you have a pulse by typing in a verification code they text to you. Finally, select a phone number to tie to your account and proceed to your account information.
2. On your account page note your *Account SID* and *Auth Token*. You'll need this for Step 5 below.
3. In order to receive replies from your SMS messages you'll need to provide a 'callback' (aka webhook) address for your SMS number. This tells Twilio how to tell Rock when this event occurs. You can set this by clicking 'Numbers' from the main menu, selecting the SMS number you wish to configure, then adding the URL format below to the 'Messaging Request URL'.
	*https://-yourserver-/Webhooks/Twilio.ashx*
	# SMS Pipeline
	To set your number up for the SMS pipeline, use the 'Messaging Request URL'  
	*https://-YourServer-/Webhooks/TwilioSMS.ashx?SmsPipelineId=-YourPipelineId-*
	![Configuring the Twilio Webhook](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/twilio-webhook-setup.png)
	Configuring the Twilio Webhook
	# Make It Accessible
	It's important that this address be accessible from the Internet so Twilio can access it.
4. Before you can actually use Twilio for real communications, you'll need to upgrade from the free trial.
5. From Rock navigate to  
	Admin Tools \> Settings \> Communication Transports \> Twilio.  
	Enter in your *Account SID* and *Auth Token* and activate the transport. Click Save when done.
6. Next set the Twilio transport as the default transport for the SMS medium under  
	Admin Tools \> Settings \> Communication Mediums \> SMS.
7. Finally, add your Twilio phone number under  
	Admin Tools \> Settings \> System Phone Numbers.  
	You can add as many Twilio numbers here as you wish. Be sure that the phone number is in the *Phone Number* field and that it is in the format of “+15555555555” (or similar for international numbers). If you select an Assigned to Person, be sure the individual you select has a valid SMS phone number on their record.

## Twilio Signature Validation

When you’re setting up your Twilio transport as described above (step 5), you’ll have an option to Enable Signature Validation. You’ll want to enable this if you're concerned that a system other than Twilio might try to send incoming SMS responses to your Rock server. Enabling this is a small step you can take to possibly avoid a lot of unwanted messages, and it helps keep your data secure.

In short, Signature Validation compares your *Public Application Root* (this is a [Global Attribute](https://community.rockrms.com/documentation/bookcontent/9#globalattributes) in Rock) to the webhook that’s set in Twilio. If they match, the validation is successful, and the message will come through as usual. If they don’t match, then the message won’t reach Rock. There’s a bit more to it than that, and it gets a little technical, but we strongly recommend checking out the details on [Twilio’s site](https://www.twilio.com/docs/usage/webhooks/webhooks-security#validating-signatures-from-twilio) so you can get this set up.

---

That's it! Now you’re set to send SMS messages from the Rock communications features.

# Twilio's Impact Access Project for Non-Profit Organizations

Twilio offers a $100 kickstart credit to non-profit organizations. To learn more, visit [www.twilio.org](https://www.twilio.org/).

# Twilio, Short Codes and MMS Messages

If you're using a Twilio short code, keep in mind that it doesn't automatically support MMS messages. You can add MMS capabilities for a one-time fee of $500. This is different than regular "long codes" (phone numbers) where MMS is usually automatically supported.

If you're not sure whether your account supports MMS messaging, check your Twilio Console. If you only see "Capabilities: SMS" and MMS is not listed, then it's likely you haven't purchased MMS for your short code.

# Email: Google Apps

# Note

Gmail is not a commercial Email Delivery Service and has significant limitations on how many messages can be sent per day, how many identical messages can be sent to different addresses, etc. Using Gmail as your email delivery service is not a viable solution for most organizations and should only be used for testing. You will want to implement one of the other email transports discussed in this section for production use.

This technically isn't an integration as much as tips for configuring SMTP Relaying for Google Apps. The basic steps are covered in this link from Google [https://support.google.com/a/answer/2956491?hl=en](https://support.google.com/a/answer/2956491?hl=en). A couple of tips are below.

- The link above notes you will find the relaying settings under the 'Apps' menu setting. That setting appears to have been moved. Instead search for 'SMTP Relay' in the admin search.
- We've found success with the following Google Relay options.
	1. Allowed Senders: Any Addresses
		2. Authentication: Require SMTP Authentication
		3. Encryption: Require TLS encryption
- On the Rock side use the following SMTP settings.
	1. Sever: smtp-relay.gmail.com
		2. Port: 587
		3. Username: The admin account username
		4. Password: The admin account password
		5. Use SSL: Yes

# Email: SendGrid

SendGrid is another supported Transport you can use in Rock. Like the other options described above, be sure to evaluate each service before deciding which is the best fit for your organization’s needs.

Most of the configuration you’ll need to do will be with SendGrid. You can learn more and get started for free by visiting [https://sendgrid.com/](https://sendgrid.com/). After you’re set up with SendGrid, you’ll need to provide the following in Rock:

- **Base URL:** The default URL `https://api.sendgrid.com` should work in most cases. You can change this if needed based on your setup in SendGrid.
- **API Key:** SendGrid will provide this when you’re set up with their service. This is required for Rock and SendGrid to communicate.

Like other Communication Transports, you can also choose whether SendGrid should track email opens, clicks and unsubscribes. Note that Rock only supports HTTP/S (and not SMTP) for SendGrid.

# Setting up SendGrid

The first step will be getting your API Key. Log in to your SendGrid account and navigate to Settings \> API Keys. Click the button for Create API Key.

![Create API Key](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/sendgrid-create-api-key-v11.png)

Create API Key

We recommend giving *Restricted Access* permission. Also, make sure *Mail Send* is assigned full access as pictured below.

![API Key Configuration](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/sendgrid-api-key-configuration-v11.png)

API Key Configuration

Be sure to copy the API key when it is presented to you. SendGrid warns that you won’t see it again, and that's true. If you lose the key, you’ll have to create a new one.

Once you’ve got your API key, you’ll need to add it to Rock. Inside Rock, navigate to Admin Tools \> Settings \> Communication Transport \> SendGrid HTTP and add the *Base URL* and your *API Key* as pictured below.

![Communication Transport](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sendgrid-rock-communication-transport-v18.png)

Communication Transport

Next, you’ll need to update the Communication Medium configuration in Rock. Navigate to Admin Tools \> Settings \> Communication Mediums and access the *Email* entry. Change the *Transport Container* to the *SendGrid HTTP* transport configured in the prior step.

![Communication Medium](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sendgrid-rock-communication-medium-v18.png)

Communication Medium

With the above configuration in place, head back over to SendGrid to set up the *Event Webhook*. You can access this in SendGrid under Settings \> Mail Settings \> Event Settings. Click the pencil icon for the *Event Webhook* row to access its settings.

![Edit Event Webhook](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/sendgrid-edit-event-webhook-v11.png)

Edit Event Webhook

The *Event Webhook* settings in SendGrid will look like those pictured below. The *HTTP Post URL* will be formatted as shown, with your Rock URL followed by `Webhooks/TwilioSendGrid.ashx`. Twilio owns SendGrid, so don’t be concerned about the Twilio part of the webhook.

![Event Webhook Configuration](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/sendgrid-event-webhook-configuration-v11.png)

Event Webhook Configuration

Note that *Processed* and *Deferred* currently have no functionality in Rock and can be left disabled. Be sure that the *Event Webhook Status* is set to *Enabled* before saving.

To track opens and clicks, you’ll want to enable those Tracking options in SendGrid. Under *Settings* click on *Tracking* to enable these options by clicking the pencil icon. The example below shows what the page will look like after open and click tracking have been enabled.

![Tracking Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/sendgrid-tracking-settings-v11.png)

Tracking Settings

Lastly, add your information to the *Sender Authentication* settings. This helps with deliverability. An example of the setup is pictured below, but if you’re not sure what you need there’s a helpful link at the top of page.

![Sender Authentication](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/sendgrid-sender-authentication-v11.png)

Sender Authentication

Don’t be discouraged if your emails aren’t popping into inboxes right away. There are a variety of factors that can cause delays ranging from a few minutes to several hours. You can click on the *Activity* menu item in SendGrid to search for emails you’ve sent and view details on what may be holding them up. Be patient, because sometimes there’s a delay between sending an email and seeing it in the *Activity* list.

# Email Spam Reporting

When you send an email, the recipient can report the email as spam. When this happens, Mailgun and SendGrid can report it back to Rock through their APIs. Rock will then find the person and inactivate their email address in the system and add a note to their record. The note indicates that the email address was deactivated due to a spam complaint and includes the date of the complaint.

In order for this to happen, in Mailgun you would need to set up a webhook of type *Spam Complaints*. In SendGrid you'll want to update the *Event Webhook* to include "Spam Reports" under Engagement Data.

Check out the [Unsubscribing](#unsubscribing) section of the [Configuring Email](#configuringemail) chapter above to see how Rock can help your emails avoid being reported as spam.


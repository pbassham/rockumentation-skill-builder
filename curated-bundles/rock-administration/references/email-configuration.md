---
description: "Use when configuring email delivery services, setting up SMTP or Mailgun integration, or troubleshooting email transport settings in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Email Configuration

Email Configuration

Email is an important part of your communication strategy. Getting it configured in Rock should be one of your first priorities after install.

Like many aspects of Rock, you have choices when it comes to email. We highly recommend using an email service that will provide additional services like bounced mail processing, the ability to track when emails have been opened and when links have been clicked. Rock ships with Mailgun and SendGrid, but others are available in the Rock Shop.

# Email Settings

The configuration items you provided during the install can be updated under  
Admin Tools \> Settings \> Communication Transports.  
Email is sent from Rock using a communication transport. Think of this as a delivery service. Just as you might pick between sending your package via UPS or FedEx, Rock gives you options when sending out your emails.

# CSS Inlining

CSS Inlining of Email Templates is only available if the email Communication Transport supports it. Currently only Mandrill supports CSS Inlining.

## Mailgun Email Service

Mailgun is an email delivery service that provides several advanced features. Mailgun is operated by the popular web hosting company Rackspace and is used by numerous online businesses.

## Mailgun HTTP

Mailgun HTTP is the quickest and easiest way to send emails. This transport sends the email to Mailgun with their newer HTTP API. Below are the settings Rock needs from your Mailgun account.

| Setting | Description |
| --- | --- |
| Base URL | You can view or change the API URL from Mailgun. |
| Active | This setting turns the Mailgun service on or off. |
| Resource | This will be populated with a URL provided by Mailgun. |
| Domain | Enter your organization's domain for email. |
| API Key | The API key is provided to you by Mailgun. |
| Track Opens | If enabled, this setting allows Rock to report whether an email was opened. |

## Mailgun SMTP

This transport delivers the emails to Mailgun with their SMTP API. Below are the Mailgun SMTP settings in Rock.

| Setting | Description |
| --- | --- |
| SMTP Hostname | This is the SMTP host. The default setting will work here in most cases. |
| API Key | The API key is provided to you by Mailgun. |
| Active | This setting turns the Mailgun service on or off. |
| Domain Login | Enter your Mailgun provided username. |
| Domain Password | Enter your Mailgun provided password. |
| Port | Indicate the port on your server that should be used for communications. Ports 587 or 2525 are often used, especially if you're encrypting the sending. |
| Use SSL | Set whether your mail server supports sending emails via an encrypted SSL session. |
| Track Clicks | If enabled, clicks on sent emails will be tracked. |

## SMTP

Below are the configuration items that are needed to enable SMTP emails to work. If you're unsure what these values should be, consult with your ISP or your organization’s IT support.

| Setting | Description |
| --- | --- |
| Active | This setting turns the SMTP service on or off. |
| Server | Provide the SMTP email server that Rock should use to send the emails through. |
| Port | Indicate the port on your server that should be used for communications. This will typically be port 25 but port 587 is often used if you're encrypting the sending. |
| Username | If your email server requires you to authenticate to relay email, this is where you'll provide the username. |
| Password | When enabling authentication, this will be where you set the password. |
| Use SSL | Set whether your mail server supports sending emails via an encrypted SSL session. |

  

Most organizations will set these values to their established email server, but some very small organizations might not have a central or common server. For example, some might run completely off of a Gmail account. Below is what you would enter for each of these settings.

# Warning

Using Gmail settings is not a recommended configuration for organizations sending out large bulk emails. We're providing these settings only as a service for small organizations.

- **Server:** smtp.gmail.com
- **Port:** 587
- **Username:** (your Gmail username "xxxx@gmail.com")
- **Password:** (your Gmail password)
- **Use SSL:** True (checked)

Sending bulk email is difficult in today’s age of spam and spam filters. Simply configuring an ISP or Internal Exchange Server isn't enough if you want to ensure all your messages will make it to their intended recipients. To do that, you need to confirm your DNS has proper SPF and Domain Key records and ensure that you're not on any blacklists. Even for the largest organizations, this can be an overwhelming task.

Wherever a problem exists, a new service will be created to help solve it. That has certainly been the case in the area of email deliverability. With the importance of email and the complexity of getting your environment right, it makes sense for most organizations to outsource the sending of their emails. These services specialize in getting it right and the pricing is fairly reasonable. Rock ships with Mailgun and SendGrid transports, but you can check the Rock Shop for integrations with other transports.

# Tip

Some of these vendors have free accounts that may work for smaller organizations. For example, Mailgun currently offers a free plan capped at 100 emails per day, up to 3,000 emails a month. To send higher volumes you’ll need to upgrade to one of their paid plans. For full details and up-to-date pricing visit their [website](https://www.mailgun.com/pricing/).

# Note

We realize that a list of recommended vendors is helpful, but sometimes it can also be overwhelming. If you’re looking for a single recommendation, we’d say start with Mailgun. We use them ourselves for the Rock site and have been very happy with the setup and deliverability to-date.

These services do require some minor changes to your organization’s DNS settings, but they walk you through the process online to make it easier.

## Configuring Deliverability Services

While each of the vendors listed above have their own custom API for sending emails, they also allow you to send via SMTP using their servers. Once you get set up, they will provide you with the values needed for the SMTP settings above.

Currently, the only email transport provided by Spark that supports these features is the Mailgun transport. For more information on configuring this transport see the [Integrations](https://community.rockrms.com/documentation/bookcontent/8#integrations) chapter of the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide.


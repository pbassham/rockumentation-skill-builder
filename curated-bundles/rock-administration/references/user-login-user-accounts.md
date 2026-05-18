---
description: "Use when users need help with external website login pages, user account creation, login history tracking, or troubleshooting login failures in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > User Login & User Accounts

User Login & User Accounts

Logging in to your organization’s external Rock website provides many benefits to your visitors. Knowing who the person is makes it easier for them to fill out forms, allows them to manage their account and allows for extensive personalization.

In order to log in, the person needs to have an account in Rock. For an account to exist, the person needs a record in Rock, and they’ll need a username and password. This can be done on behalf of the person by having a staff member or volunteer manually [create a record](https://community.rockrms.com/documentation/bookcontent/5#addingafamily) and [User Account](https://community.rockrms.com/documentation/bookcontent/5#securitytab). However, the person can set this up themselves from your external website.

# Login Page

The Login page pictured below can be accessed different ways. Typically, the page is reached by clicking the Login button near the top right of your external website pages. The login page can also be accessed directly by going to `https://yourchurch.com/Login`.

![Login Page](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/external-site-login-page-v12.png)

Login Page

# Login History

The *Login History* block lets you audit who is accessing Rock and assist those who might be having trouble by showing detailed records of successful and unsuccessful login attempts.

To view login history, go to Admin Tools \> Settings \> Security \> Login History.

![Login History](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/login-history-v18.png)

Login History

You can filter login history by date and time, from the year down to the hour, using the filter icon. Additionally, hovering over a column and selecting the *Column Filter* button lets you refine your results even further.

The *Login History* block is also visible on the *[History Tab](https://community.rockrms.com/documentation/bookcontent/5#historytab)* of the *Person Profile* page.

![Login History Person Profile](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/login-history-person-profile-v18.png)

Login History Person Profile

The *Person Profile Login History* block differs from the general *Login History* block by displaying only the login attempts of the currently viewed profile.

# Login Failure Reasons

Go to the *Model Map* at Settings \> Power Tools \> Model Map then click on *Security*. Under 'History Login' you will see the *LoginFailureReason* property and a list of different possible reasons for login failure. These populate the 'Status' column of the *Login History* block.

Below is a list of every Login Status:

| Login Status | Description |
| --- | --- |
| Success | Successful login attempt. |
| Requires Verification | Additional verification is required, such as two-factor authentication. |
| User Not Confirmed | The account is not confirmed. |
| User Not Found | The username or email does not exist. |
| Invalid Credentials | The provided username or password is incorrect. |
| Password Change Required | The password has expired. |
| Locked Out | The account is locked due to multiple failed login attempts. |
| Invalid OIDC Client Id | The request is from an invalid OIDC ClientId source. |
| Other | See the LoginFailureMessage for more details. |

# Passwordless Login (Obsidian)

Say goodbye to the hassle of remembering passwords and hello to seamless access. With passwordless login, everyone can easily and securely log in to your site with minimal friction. There are different ways to set it up, but you can give people the option of either a traditional login or a passwordless login, as pictured below.

![Passwordless Login Option](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/passwordless-login-option-v15.png)

Passwordless Login Option

After clicking “Sign in with Email or Phone” the person is prompted for an email address or phone number. Rock recognizes which one is provided.

![Passwordless Login](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/passwordless-login-v15.png)

Passwordless Login

In this case, Alisha will receive an email because she provided her email address. The email will have instructions and a button to Continue. All she needs to do is click the button to log in.

If the person provides a phone number, they’ll get a text message with a code that they’ll need to enter to complete the sign in process.

![Passwordless Confirmation Code](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/passwordless-confirmation-code-v15.png)

Passwordless Confirmation Code

If more than one person shares the same email address, which happens often with families, the person will be prompted to indicate who they are.

![Shared Email Address](https://rockrms.blob.core.windows.net/documentation/Books/9/1.15.0/images/passwordless-login-shared-email-v15.png)

Shared Email Address

## Configuring Passwordless Login

Passwordless login relies on emails and SMS text messaging. If you’re not set up to send and receive communications in Rock, check out the [Communicating Using Rock](https://community.rockrms.com/documentation/bookcontent/8/) manual before proceeding.

# Obsidian Blocks

You’ll need the Obsidian version of the Login and Account Entry blocks to use passwordless login. See our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#addingcontenttorock) manual for details on adding blocks to pages.

## System Communication

When a person provides their phone number or email address for passwordless login they’ll get a response in the same medium. One of the first steps is to provide the SMS number from which that communication will be sent under Admin Tools \> Settings \> System Communications. Edit the Passwordless Login Confirmation system communication and, under the SMS panel, select your phone number.

![System Communication SMS Setup](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/2fa-update-system-communication-v18.png)

System Communication SMS Setup

# Twilio Shortcodes

Keep in mind that, by default, Twilio 10-digit numbers cannot receive SMS messages from short code numbers. So, you can't use a Twilio long code phone number for passwordless login if the message is coming from a short code number based on your configuration above.

## Login Block

The Login block is where the person will go to log in. Here is where you’ll turn on passwordless logins, by opening the settings for the Login block and enabling *Passwordless Authentication*.

![Login Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/passwordless-login-block-settings-v15.png)

Login Block Settings

## Passwordless Login Security Settings

Rock ships with the recommended security settings. You may want to familiarize yourself with how they apply to passwordless login.

![Security Authentication Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/passwordless-security-authentication-settings-v18.png)

Security Authentication Settings

## Account Entry Block

The Obsidian version of the Account Entry block has a couple of settings related to passwordless login that you probably won’t need to change but should be aware of.

![Account Entry Block](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/passwordless-account-entry-block-v18.png)

Account Entry Block

# Two-Factor Authentication

Two-Factor Authentication (2FA) is your extra layer of login security. With 2FA, logging into Rock involves more than just a username and password; you'll also need to verify your identity via email or text. However, this doesn’t apply to everyone. You get to control who is required to use 2FA based on their [Account Protection Profile](https://community.rockrms.com/documentation/bookcontent/5#accountprotectionprofiles).

If you're using Passwordless Login on your site, people needing 2FA will still need to enter their username *and password* after completing the Passwordless process.

# External Authentication

Built-in external authentication providers like Google or Facebook do not support Two-Factor Authentication. So, they can’t be used if 2FA is turned on. There is a customizable message in the Login block that the person will see in this case.

In the below example, the person initially logged in with a traditional username and password. Now they must provide their email or phone number to proceed.

![2FA Provide Email or Phone](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/2fa-email-or-phone-v16.png)

Provide Email or Phone

If the person uses their phone number, they will be sent a verification code via SMS text message.

![Phone Login Confirmation](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/2fa-phone-login-verification-v16.png)

Phone Login Confirmation

Then, back in Rock, the person will need to enter the verification code from their phone to finish logging in.

![Enter Confirmation Code](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/2fa-enter-confirmation-code-v16.png)

Enter Confirmation Code

If they provide an email address instead of a phone number, there’s a button in the email they receive that they need to click to finish the sign-in process. This will log them in promptly and does not require that they manually enter the code.

![Verification Email](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/2fa-verification-email-v16.png)

Verification Email

If the email address or phone number they provide doesn’t match what they have in Rock, or if they don’t have a phone number or email at all, they’ll be instructed to contact you for assistance, as pictured below.

![Missing Email or Phone](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/2fa-missing-email-or-phone-v16.png)

Missing Email or Phone

## Two-Factor Authentication Setup

We’ll start with the communication configuration. Two-Factor Authorization utilizes some of the same functionality as the Passwordless Login process. This includes sending the person an email or SMS message. So, if you've set up Passwordless Login already, you can skip updating your communication configuration. If not, then go to Admin Tools \> Settings \> System Communications and add a "From" number to the SMS section of the Passwordless Login Confirmation system communication.

![Update System Communication](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/2fa-update-system-communication-v18.png)

Update System Communication

Two-Factor Authorization is turned off by default, partially because it won’t work without the above configuration. So, your last step is to enable 2FA. You’ll need to update your Security Settings under Admin Tools \> Settings \> Security Settings. There you’ll choose which Protection Profile(s) should be required to use 2FA.

# Check Login Block Settings

If the Login block’s settings have *Show Internal Database Login* set to "No", and *Redirect to Single External Auth Provider* set to "Yes", then you should **NOT** enable 2FA. If you do, you may lock yourself or others out of Rock.

![Enable for Protection Profiles](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/2fa-enable-for-protection-profiles-v18.png)

Enable for Protection Profiles

At a minimum, you may want to require Two-Factor Authentication for people with Extreme Protection Profiles. This helps prevent fraudulent attempts to log in using accounts with higher levels of access to Rock.

# When to Turn On

In the rare event that you turn on 2FA while people are actively logged in to Rock, and if those people require 2FA, they will be automatically logged out and must sign in again using 2FA. For this reason, you may want to turn this on during periods of low activity.

The Login block itself has a few settings directly related to Two-Factor Authentication. These are messages that the person will see if things don’t go exactly as planned. The messages include the following topics/scenarios:

![Login Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/2fa-login-block-settings-v16.png)

Login Block Settings

# Passwordless with Passwords

Note that Passwordless Login will require the person to establish a username *and password* as part of that process if 2FA is turned on.

## Things to Remember:

1. Configure an SMS "From" number for the *Passwordless Login Confirmation* communication in Admin Tools \> Settings \> System Communications.
2. Activate 2FA in Security Settings under Admin Tools \> Settings \> Security Settings, selecting relevant Protection Profiles.
3. For people using Passwordless Login, note that enabling 2FA requires establishing a username *and password* as part of the process.

# Account Registration

The *Account Registration* block can be accessed by clicking the Register button from the *Login* page, or by going to `https://yourchurch.com/NewAccount`.

As pictured below, the person will be asked to create a Username and Password, as well as some information about themselves. This page is simple and easy to understand, which is by design. If account creation is a complex process, people may be less likely to complete it.

![Login Page](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/account-registration-page-v12.png)

Account Registration Page

While the page looks simple, there’s actually quite a bit going on behind the scenes. The block settings pictured below give you an idea of what this block does, and lets you change it to suit your needs.

![Account Registration Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/account-registration-block-settings-v16.png)

Account Registration Block Settings

After an account has been created it can be viewed from the [Person Profile Security tab](https://community.rockrms.com/documentation/bookcontent/5#securitytab) and the [User Accounts](#useraccounts) page. Staff can add new accounts or modify existing accounts from these pages.

# Unrecognized Browsers

Rock is always looking out for your safety. One of the ways it does this is by keeping track of the browser you normally use to log in. If Rock notices that you’re logging in from a new or different browser, it will send you a friendly email to double-check if it’s really you. It’s like having a security guard who’s always making sure no one else is trying to access your account. Think of it as Rock saying, “Hmm, this looks like a new browser—just checking if it’s you!”

To do this, Rock uses something called browser cookies. These cookies safely help Rock remember which browser you normally use. The cookies expire after a year, but don’t worry—Rock automatically renews them every time you log in.

# Obsidian Only

This feature is available in the Obsidian version of Rock’s Login block.

## Configuring Browser Checks

By default, this feature is turned off, but it’s easy to turn it on. Just follow the steps to update the block settings for the Obsidian version of the Log In block, as shown below:

![Login Block Browser Checking](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/login-block-browser-checking-v18.png)

Login Block Browser Checking

And that’s all there is to it! As soon as Rock detects a new browser, the email alert will be sent. So, next time you switch browsers, you can relax knowing Rock is keeping an eye out. It’s always working in the background to make sure your account stays safe and secure.


---
description: "Use when setting up or configuring Checkr integration for background checks in Rock RMS, including account creation and webhook configuration"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Background Checks

Background Checks

Background checks are an important requirement for most organizations these days. They involve the coordinated efforts of staff, security teams, service providers and other resources. Because of all these points of contact, it can take quite a while for background checks to process.

Using workflows to expedite the process helps prevent delays and maximizes the efficiency of your organization.

Rock seamlessly integrates with two background check providers, Checkr and Protect My Ministry. The procedure is similar for each, but we'll look at them separately beginning with Checkr.

# Configuring Checkr

The first option for running background checks on individuals is Checkr. Once configured, Rock will default to using Checkr for background checks. You can easily change this default, however, which we'll look at shortly. First, though, let's look at the steps to set up your Checkr account.

## Step 1: Sign-up

The first step in the process is to sign up for a Checkr account. You'll start from your rockrms.com account.

1. Log in at [www.community.rockrms.com](https://community.rockrms.com/login), and then click on the menu in the top right corner with your picture on it.
2. Click on "Your Organizations". In the center you'll see the organization(s) with which your account is associated.
3. Click on the organization you wish to set up with Checkr. Then, beneath the organization logo in the *Integrations* section, click the "Checkr" option.
4. Click the Create New Checkr Account button.
5. Once your account is set up, your organization page in the Rock RMS site will update with an Account ID and Access Token.
![Organization Page on rockrms.com](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/checkr_new.png)

Organization Page on rockrms.com

## Step 2: Set Up Webhook Inside Checkr

The next step is to set up a webhook inside Checkr. This tells Checkr where to send updates when background checks are complete. Begin by logging into your Checkr account at [dashboard.checkr.com](https://dashboard.checkr.com), then navigate to:

Account Settings \> Developer Settings.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/checkr-webhook.png)

Checkr Account Settings

Type your Rock URL appended with `/webhooks/checkr.ashx` in the *Webhooks URL* field, select *Live*, then click Add. Finish by selecting the subscriptions shown in the above screenshot.

# Note:

If background checks are successfully submitted to Checkr but results are not returned, Checkr may need to enable account-level webhooks on your account in order for everything to work correctly. You'll want to make a request to Checkr support to enable them in this case.

## Step 3: Configuration

Now that Checkr is active, it's time to link your account to Rock. From within Rock, access the *Checkr* screen located at:

Admin Tools \> Settings \> Checkr

Enter your *Checkr Access Token* (from the Rock RMS website) into the field provided. Click Save. The Background Check Types list is automatically downloaded when you enter the access token. If you want to download an updated Background Check Types list, click the Update Packages button.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/checkr-v18.png)

Checkr Background Checks

Checkr is now active by default in Rock. You can view Checkr's status in the *Background Check Providers* page in Settings under Admin Tools.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/checkr-active-v18.png)

Background Check Providers Screen

The Access Token should already be filled in for you at this point, since you provided it on the Checkr configuration page. Pictured below, you can see the Background Check Types list and the Update Packages button mentioned above.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/checkr-update-packages-v18.png)

Enabled Background Check Types

## Viewing Checkr Requests

You can view all the requests that Checkr has processed in the *Checkr* page. This list is provided to help you see what's being processed at a high level. As you'll see soon, you can also view the results of a specific background check request from the *Workflow* and *Person Profile* pages.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/checkr-view-requests-v18.png)

Checkr Requests

# Configuring Protect My Ministry

The second option for background checks is Protect My Ministry. Below are the steps for setting up and configuring this provider in Rock.

## Step 1: Sign-up

The first step in the process is to sign up for the Protect My Ministry service. To do this, start at the *Protect My Ministry* page in Rock under:

Admin Tools \> Settings \> Protect My Ministry.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/pmm-getstarted-v18.png)

Protect My Ministry Start Page

Should you choose to register for a new account, click the Register For An Account button. You'll be taken to the *Protect My Ministry* website to complete the registration.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/pmm-registration-page.png)

Protect My Ministry Registration Page

After completing the registration, come back to the Rock *Protect My Ministry* page and enter in the username and password you created. You'll then be taken to the *Protect My Ministry Detail Page*.

## Step 2: Configuration

Once you've entered your account information in Rock, you’ll see the details of your account on the *Protect My Ministry* page.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/pmm-detailpage-v18.png)

Protect My Ministry Registration Page

# Important

The **Result Webhook** setting will be populated automatically using your Rock *Public Application Root* Global Variable. However, this can be changed here if needed by clicking the Edit button. This address must be secured using SSL/TLS (must start with https://).

Know that you can't simply change the http:// to https:// here, though, without having a valid SSL/TLS certificate installed and your web server configured properly. Google is your friend if you need help obtaining and installing a certificate.

You'll now want to configure the packages that are tied to your account. The most popular packages have already been made available to you through the integration. Each package has a brief description that outlines its specific merits.

There are several configuration settings for each package. Let's look at each setting and what it means.

- **Package Name** This is the PMM name for the package. It must be an exact match to what's in their system, so please don't change it unless instructed to.
- **County Criminal Default County** Depending on your state it may be recommended that you provide a county on your request. If so, this will be the default county to use if one isn't present on the address of the person you're checking. You can check your state’s requirements using [this map from PMM](http://criminal-background-checks.info/).
- **Use Home Address for County Criminal** This too will depend on the state in which you live. If your state is recommended for the county search, you'll want to enable this option.
- **State Criminal Default State** This is the default state to use when doing a state criminal request. This option is defaulted to the state that's most common in your database, but feel free to change it.
- **Use Home State for Statewide Criminal** This setting determines if the state from the address should be sent.
- **MVR Jurisdiction Code** This setting determines jurisdiction to use for MVR (Motor Vehicle Records) searches. You can select your area from the list provided. This is only needed for MVR type searches.
- **Use Home State for MVR Search** This determines if the state from the home address should be sent for the MVR search. This is only needed for MVR type searches.

While you can add new packages using the settings above, the packages provided should meet all your needs. You may need to edit some of the configurations to meet the recommendations for your state. This decision centers around whether you should be doing a state or county search.

## Viewing Protect My Ministry Requests

From the *Protect My Ministry* page you can also view requests that have been processed. This list allows you to see what's being processed from a high-level perspective. However, it's much easier to see the results of a specific background check request from the *Workflow* and *Person Profile* pages. We'll talk about that next.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/pmm-requests-v18.png)

Protect My Ministry Requests

# Background Check Administrators

Background check admins have access to all background check details and the ability to approve or deny them at several points in the process.

Before you start processing, you'll want to configure the person or people who will be included in this security role under Admin Tools \> Settings \> Security Roles \> RSR - Background Check Administration.

# Processing Requests

Several different organizational needs kick off a background check request workflow. For instance, you may be hiring a new staff member, screening a potential volunteer, updating person profile records or transferring someone into a new position. Whatever the reason, it’s usually a staff member who needs to start the request for a background check.

To see if an individual has completed a background check, go to the *Person Profile* page and look under the *Extended Attributes* tab.

Staff will be able to see either a *Yes* or *No* in the *Background Checked* field. Background check administrators can see additional fields and have editing privileges.

![Background Check Person Attributes](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/backgroundcheck-person-attributes-v9.png)

Background Check Person Attributes

# Make It Quick

If you want greater visibility for Background Checks on your *Person Profile* page, consider adding a badge to the *Badge Bar*.

# How It Works

## Initiating A Request

Background checks can be initiated from an individual’s *Person Profile* page. Below the person's photo is an Actions button, which you can click to display available actions. Click on the *Background Check* option. The initial request will save both the person and the requestor, while prompting the requestor to provide any key missing details such as social security number, campus, type, etc.

# Just A Double Check

Rock will automatically look for previous background checks for that individual within the last year. If it finds another check within that timeframe, it will notify the requester, who will have to confirm that they want to request another background check before proceeding.

# Workflow

The background check workflow has eight possible activities. Like many other aspects of Rock, it's customizable. You may find that you'd like to configure your background checks a little differently for your organization. For instance, you could add a step to the process after a staff member requests a background check that notifies a volunteer to provide their own social security number.

To review or modify the workflow configuration, go to:

Admin Tools \> Settings \> Workflow Configuration \> Safety & Security \> Background Check.

For more details on workflows in Rock, see [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/). A chart of the out of the box workflow is below.

## The Lifecycle Of A Request

![Background Check Overview](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/backgroundcheck-overview-v12.png)


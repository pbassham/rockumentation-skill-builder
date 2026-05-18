---
description: Use when configuring Microsoft Entra authentication for Rock Mobile applications
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Provide Microsoft Entra (formerly Azure AD) as an authentication provider within your Rock Mobile application.

M v6.0 C v16.3

### What is Microsoft Entra

If you are building your app utilizing the orange/blue Rock Mobile application and would like to test Entra, you should coordinate your efforts with the [App Factory](https://community.rockrms.com/developer/mobile-docs/app-factory) publishing service.

[Microsoft Entra ID](https://www.bing.com/search?q=microsoft+entra&cvid=1e6618deb54e427fbe0b517685f7bbbc&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE2MDVqMGo0qAIAsAIA&FORM=ANAB01&PC=DCTS) is a cloud-based identity and access management service that is typically used for employees. It can be used to effectively manage authentication, security and much more at an extremely scalable level.

### Setup

To ensure Entra works perfectly in Rock Mobile, follow this step-by-step guide.

1. Create and configure a new [App Registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) in the Azure AD Portal.
2. Add permissions for our mobile application to retrieve necessary data points.
3. Ensure our authentication returns enough information to the Rock server.
4. Configure your Rock Mobile to support Entra.

### 1\. Registering The App

a. In the [Entra admin portal](https://entra.microsoft.com/), navigate to `Applications > App registrations > New registration`.

![](https://community.rockrms.com/GetImage.ashx?Id=66862)

b. Configure the `Register an application` screen considering the information below.

![Register an application configuration.](https://community.rockrms.com/GetImage.ashx?Id=66863)

**Name**

Provide a name for your Rock Mobile app registration. Nothing really hinges on this.

**Supported Account Types**

This is really up to you. If you're limiting Entra login to staff, then the `Accounts in this organizational directory only` is likely the right choice.

**Redirect URI**

If you need assistance acquiring the <BundleId/PackageName\> please reach out to the App Factory team.

This is important. This needs to be formatted like `<BundleId/PackageName>://entra/callback`, otherwise authentication won't work. If your bundle identifier and package name differ, you'll have to add a Redirect URI for both (`App Registrations > Your App > Authentication`).

Ensure that the type of Redirect URI is set to `Public client/native (mobile & desktop)`.

### 2\. Add Necessary Permissions

We need to ensure that our mobile application has permission to see the necessary data of a newly authenticated user.

a. Navigate to your newly created app registration, then to `API permissions > Add a permission`.

![Add a permission button.  ](https://community.rockrms.com/GetImage.ashx?Id=66864)

b. Select `Microsoft Graph`.

![  Select Microsoft Graph as the API.  ](https://community.rockrms.com/GetImage.ashx?Id=66865)

c. Select `Delgated permissions`, check `email`, `openid` and `profile` permissions. Press `Add permissions`.

![](https://community.rockrms.com/GetImage.ashx?Id=66866)

### 3\. Add Optional Claims

Note

Rock requires a First Name, Last Name and either a valid Phone Number or Email to process external authentication. You should take steps to ensure that those specific data points are always returned from Entra authentication.  

Out of the box, Entra will not return the first name and last name of an authenticated person to the shell. Rock needs this information to process/person match etc., so we need to go in and add these data points.

a. Under your newly created app registration, navigate to `Token configuration > Add optional claim`.

![  The Add Optional Claim button.  ](https://community.rockrms.com/GetImage.ashx?Id=66867)

b. Select `ID` as the `Token type`, and check `email`, `family_name` (last name) and `given_name` (first name). Press `Add`.

![  Select the email, family_name & given_name claims.  ](https://community.rockrms.com/GetImage.ashx?Id=66868)

### 4\. Configuring Rock Mobile

a. Jump into your Rock Mobile application (`CMS Configuration > Mobile Applications > Your application > Edit`).

![](https://community.rockrms.com/GetImage.ashx?Id=66869)

b. In the `Authentication Settings` section, we're going to be configuring the `Microsoft Entra` settings.

![The Rock Mobile configuration for Microsoft Entra.](https://community.rockrms.com/GetImage.ashx?Id=66870)

**Entra Client ID & Entra Tenant ID**

To retrieve your `Entra Client ID` and `Entra Tenant ID`, jump into the [Entra portal](https://entra.microsoft.com/), your newly created app registration, into `Overview`. The values will be displayed.

![](https://community.rockrms.com/GetImage.ashx?Id=66871)

The overview of an `Entra` app registration.

**Microsoft Entra Authentication Provider**

Select the same authentication provider that provides Entra login on web. In almost all cases, this component is either the [Triumph Tech Azure AD Sync & SSO](https://www.rockrms.com/rockshop/plugin/156/azure-ad-sync-sso) plugin or [BEMA Single Sign On plugin](https://www.rockrms.com/rockshop/plugin/107/single-sign-on).

c. Configure the `Login` block to provide Entra as an SSO option.

![Configure the login block to show Entra.](https://community.rockrms.com/GetImage.ashx?Id=66872)

### Supported Claims

The following identity claims are supported and can be utilized to supply additional information about a Rock Person. Since Entra configurations can vary, we supply a few different keys that are recognized and translated accordingly.

| Key(s) | Type | Value |
| --- | --- | --- |
| firstname, first\_name, given\_name | string | The FirstName of the Person. |
| lastname, last\_name, family\_name | string | The LastName of the Person. |
| phone, phonenumber, phone\_number | string | The PhoneNumber of the Person. |
| campus, campus\_guid | Guid | The Guid of the Person campus. |
| photo, picure, profile\_image, avatar | string | The source of the Person profile image. |
| nickname | string | The nickname of the Person. |
| birthday, birth\_date, birthdate, date\_of\_birth | DateTime | TheDateTime representation of the Person date of birth. |
| gender | string | The Gender representation of the Person. Can be interpreted as the enum integer or corresponding string value. |

---

## Profile Details {#profile-details}

*Allows the user to edit their account on a mobile application.*

This block is pretty self-explanatory. It can be used to edit the profile details of the currently logged-in individual.

### Block Configuration

#### Connection Status

The connection status to use for new individuals. Defaults to `Prospect`.

#### Record Status

The record status to use for new individuals. Defaults to `Pending`.

#### Showing/Requiring Fields

In the *Mobile Local Settings*, each field follows a specific pattern. There is one setting for whether or not to show a field, and another that determines whether or not the field is required. If show is set to `No`, then the required field is irrelevant. This takes place for every field on that list, although the `Gender` field follows a newer style, the concept is the same (because it was added later).

![](https://community.rockrms.com/GetImage.ashx?Id=66873)

#### Modifying Another Person Profile

In order to modify another person's profile, you must pass in the `PersonGuid` as a page parameter. Note that you must have access to make modifications.

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

---

## Register {#register}

Allows the user to register a new account on a mobile application.

M v3.0 C v13.0

This block allows an individual to register for a new account. There are a number of options that control what information you collect and which bits are required.

Important

Be careful about what information you require. Because of recent changes in both Apple and Google's app stores, it is getting more difficult to require personal information. You may have to argue with either Apple or Google (or both) for why you are requiring certain personal information to be entered.    

## Block Configuration

#### Person Matching

In order for person matching to work, there are a few things that must come together:

1. Block Settings
	1. Check For Duplicates (Enabled by default)
		2. Confirmation Page (You must configure this)
		3. Confirm Account Template (Configured by default)
2. Mobile Shell Version 3 or Later
3. E-mail Address Provided by Individual

The first is, obviously, that you must turn on `Check For Duplicates`. This is the primary setting that dictates if the entire feature is enabled or not.

Once that is enabled, you also need to specify the `Confirmation Page` that the user will be sent to from their e-mail. This is a web page and not a mobile page, for example on your External Website you would select the "Support Pages \> Account Confirmation" page.

Third, you must select the system e-mail that will be used as the template when generating the e-mail. This is selected by default.

In addition to the above block settings, there are two other things. First, as is pretty clear from the above, your users must be using version 3 or later of the Mobile Shell. This is because additional support was added in the shell to handle the UI to inform the user that the account was created but they need to confirm it. If an individual is running version 2 or below of the Mobile Shell then they will get the old behavior, which is no person matching.

Finally, they must provide an e-mail address. Because we need to send an e-mail when performing person matching the user must enter an e-mail address. This causes strict matching to be enabled in the search which means only people whose current, or previous, e-mail matches the one being searched for are considered for the duplicate search. Since adding a new user login to an existing person is a security-sensitive process, we need to be more strict about these things.

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

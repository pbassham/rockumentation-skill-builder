> **Path:** Mobile Docs > 🧱 Essentials > Blocks > CMS > Login > Using Entra

# Using Entra

Provide Microsoft Entra (formerly Azure AD) as an authentication provider within your Rock Mobile application.

M v6.0 C v16.3

### What is Microsoft Entra

If you are building your app utilizing the orange/blue Rock Mobile application and would like to test Entra, you should coordinate your efforts with the [App Factory](https://community.rockrms.com/developer/mobile-docs/app-factory) publishing service.

[Microsoft Entra ID](https://www.bing.com/search?q=microsoft+entra&cvid=1e6618deb54e427fbe0b517685f7bbbc&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDE2MDVqMGo0qAIAsAIA&FORM=ANAB01&PC=DCTS) is a cloud-based identity and access management service that is typically used for employees. It can be used to effectively manage authentication, security and much more at an extremely scalable level.

### Setup

To ensure Entra works perfectly in Rock Mobile, follow this step-by-step guide.

1.  Create and configure a new [App Registration](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app) in the Azure AD Portal.
2.  Add permissions for our mobile application to retrieve necessary data points.
3.  Ensure our authentication returns enough information to the Rock server.
4.  Configure your Rock Mobile to support Entra.

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

If you need assistance acquiring the <BundleId/PackageName> please reach out to the App Factory team.

This is important. This needs to be formatted like `<BundleId/PackageName>://entra/callback`, otherwise authentication won't work. If your bundle identifier and package name differ, you'll have to add a Redirect URI for both (`App Registrations > Your App > Authentication`).

Ensure that the type of Redirect URI is set to `Public client/native (mobile & desktop)`.

### 2\. Add Necessary Permissions

We need to ensure that our mobile application has permission to see the necessary data of a newly authenticated user.

a. Navigate to your newly created app registration, then to `API permissions > Add a permission`.

![Add a permission&nbsp;button.&nbsp;&nbsp;](https://community.rockrms.com/GetImage.ashx?Id=66864)

b. Select `Microsoft Graph`.

![&nbsp; Select&nbsp;Microsoft Graph&nbsp;as the API.&nbsp;&nbsp;](https://community.rockrms.com/GetImage.ashx?Id=66865)

c. Select `Delgated permissions`, check `email`, `openid` and `profile` permissions. Press `Add permissions`.

![](https://community.rockrms.com/GetImage.ashx?Id=66866)

### 3\. Add Optional Claims

Note

Rock requires a First Name, Last Name and either a valid Phone Number or Email to process external authentication. You should take steps to ensure that those specific data points are always returned from Entra authentication.  

Out of the box, Entra will not return the first name and last name of an authenticated person to the shell. Rock needs this information to process/person match etc., so we need to go in and add these data points.

a. Under your newly created app registration, navigate to `Token configuration > Add optional claim`.

![&nbsp; The&nbsp;Add Optional Claim&nbsp;button.&nbsp;&nbsp;](https://community.rockrms.com/GetImage.ashx?Id=66867)

b. Select `ID` as the `Token type`, and check `email`, `family_name` (last name) and `given_name` (first name). Press `Add`.

![&nbsp; Select the&nbsp;email,&nbsp;family_name&nbsp;&amp;&nbsp;given_name&nbsp;claims.&nbsp;&nbsp;](https://community.rockrms.com/GetImage.ashx?Id=66868)

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
| firstname, first\_name, given\_name | string | The FirstName of the Person.   |
| lastname, last\_name, family\_name | string | The LastName of the Person.   |
| phone, phonenumber, phone\_number | string | The PhoneNumber of the Person.   |
| campus, campus\_guid | Guid | The Guid of the Person campus.   |
| photo, picure, profile\_image, avatar | string | The source of the Person profile image.   |
| nickname | string | The nickname of the Person.   |
| birthday, birth\_date, birthdate, date\_of\_birth | DateTime | TheDateTime representation of the Person date of birth.   |
| gender | string | The Gender representation of the Person. Can be interpreted as the enum integer or corresponding string value.   |

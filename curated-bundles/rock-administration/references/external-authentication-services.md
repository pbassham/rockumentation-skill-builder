---
description: "Use when configuring external authentication services in Rock, particularly Active Directory integration, Facebook login, or other non-native credential providers"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > External Authentication Services

External Authentication Services

Rock allows individuals to log in using several different authentication services. The only one active after an install, however, is the Rock database provider. This provider gives individuals their own Rock username and password. For many organizations this will be the default service they’ll use for authenticating an individual, as no additional configuration is required to enable it. Each of the additional services is discussed in more detail below.

# Active Directory

Many organizations already have a Microsoft Active Directory (AD) infrastructure in place for their employees to log into the network, email and other resources. Rock can use this as an additional authentication source once configured.

You can set up Rock to use your Active Directory under  
Admin Tools \> Settings \> Authentication Services \> Active Directory

![AD Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/active-directory-services-v18.png)

Active Directory Setup

Once the service is configured, you're ready to create logins in Rock. Active Directory logins can't use the normal Rock registration process. Instead, you must add the login manually to the user on the *Person Profile* page.

# Facebook Authentication

Password fatigue is a common problem with sites that require registration. In fact, a recent study found that 92% of shoppers abandon a website rather than go through the process of recovering a lost or forgotten password! However, if the website has a social media login option, they are 65% more likely to return. The same study showed that a majority of individuals prefer Facebook as their credential of choice. Luckily setting up a Rock website to use Facebook authentication is quick and easy.

## Step 1: Create a Facebook App

Before you can add a Facebook login, your organization will need a Facebook "App". Visit the Facebook Developer website ([https://developers.facebook.com/apps](https://developers.facebook.com/apps)) to see the Apps that have been configured for your Facebook account. You'll need to designate someone’s personal Facebook account in your organization to use as the 'admin', but you can choose an organization’s email to be the contact email when setting this up. If you don't already have an App, follow these steps in the Facebook site to add one:

1. At the top of the screen click the Register Now button. This will begin the quick start setup.
2. You might need to verify your account with a phone number and provide some additional personal information.
3. Click the Create First App button.
4. You'll be presented with a screen asking for a Display Name and Contact Email for your app. Once you've entered a name and email, click Create App ID.
5. You'll then have to go through a "captcha" step, just to make sure you're not a robot.
6. The next screen will be the Product Setup screen. Click the Set Up button for "Facebook Login".
7. Next, choose the "WWW" Web option.
8. On the "Tell Us about Your Website" panel, enter in your site URL and click Save and then Continue.
9. You can then just keep clicking Next to continue past the "Set Up the Facebook SDK for JavaScript", "Check Login Status", "Add the Facebook Login Button" and "Next Step" panels. Rock takes care of all these things for you.
10. Now that you've navigated through all the panels under the "Web" setup, over in the left sidebar under Products, under "Facebook Login", click the Settings option.
11. In the Client OAuth Settings section, enter the URL for your site in the "Valid OAuth redirect URIs" field. You need to include the port your website runs on (default is 80) such as `http://rocksolidchurch.org:80/`. Currently, Facebook has Force HTTPS enabled by default. As of October 6, 2018, this is required. Port 443 will need to be used instead of 80. You'll also need to add the page that has the Facebook login button onto the end of the domain (i.e., `https://rock.rocksolidchurch.com:443/page/207` or `https://rock.rocksolidchurch.com:443/Login`) (Note: Only the Web OAuth Login needs to be enabled in this section. You can turn off the 'Client OAuth Login' option). Click Save Changes when you're finished.
12. Now, back in the left sidebar, click the "Settings" option (not the "Settings" option under Facebook Login, but the main "Settings" section above). From the "Basic" screen, note the "App ID" and "App Secret" values. You'll need these two values when configuring Rock.
13. Before you make your app public, Facebook recommends submitting any additional features or permissions for App Review -- user\_friends is one such feature that will need to be submitted if you would like to use the Facebook Friend Known Relationship within Rock.
14. To submit an item for approval, click App Review on the left-hand menu and then click “Permissions and Features”.
15. A new page will present you with a list of available Permissions and Features. Permissions you can submit. Scroll down to user\_friends and click the Request button.
16. Click the “Continue” link that appears in place of the Request button.
17. You'll be redirected to a Request for App Review page. You may need to add Business Verification.
18. Click each section on the page to provide the requested details according to the instructions provided.
19. Provide "App Verification Details" by describing how a person can test the integration. An example template is provided.
20. For "Requested Permissions and Features" you’ll need to tell Facebook how you'll use the desired permission. You'll also need to upload a screencast demonstrating how the permission is being used. For user\_friends, for example, we did a quick 10 second screencast showing a Facebook Friend Known Relationship in the Known Relationship block on the person profile page (essentially just scrolling down the page and highlighting the known relationship). You’ll need to do this for each requested permission.
21. For "Complete App Settings" you’ll need to provide several configuration pieces. Add an icon for your app, and provide the URL to your privacy policy for the app. Then, select the appropriate “Business Use” (probably “Support my own business”). Lastly, you’ll need to select an App Category from the list provided.
22. After all of the steps on the Request for App Review page have been completed, you can click the Submit for Review button at the bottom of the page.

## Step 2: Configure Rock

Now that you have a Facebook App, you can start configuring Rock to use the Facebook authentication. Follow these steps:

1. Activate the Facebook Authentication Service by navigating to the  
	Admin Tools \> Settings \> Authentication Services \> Facebook page.  
	Enter the Facebook "App Id" and "App Secret" that you saved from the previous steps, and make sure that the service is Active. Save your changes.
2. Now enable the Facebook login on any of your login pages by updating the block settings of the login control to enable the "Facebook" external service provider. Having this block setting allows you to decide which of your sites allow Facebook to be used (some organizations may prefer not to allow Facebook to be used to login to their internal Rock site). Also make sure the "Redirect Page" setting is pointed to the default home page for your site. Once enabled, your login screen will now have an additional button to allow individuals to login using their Facebook account.![Login Screen](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/login-screen-fb.png)
	Login Screen

Now that you've enabled Facebook login, when someone logs in using Facebook, they will see a screen similar to the one below that links their Facebook account to your server.

![Facebook Login](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/facebook-login.png)

Facebook Account Link Page

When an individual's Facebook account is used for the first time Rock will apply the following logic to attempt to match the Facebook account to a Rock record.

1. If a person record can be found with the same First Name, Last Name and Email, the login is attached to this record. As an extra bonus, if no photo exists in Rock for this person their photo from Facebook will be added to their record in Rock.
2. If an exact match can't be made, a new record is created in Rock using the information from their Facebook account. The record status of this new individual is set to "Pending" so they will show up under the "Pending Individuals" report Tools \> Reports | Organization \> Data Integrity \> Pending Individuals.

When a new person record is created as a result of a Facebook login, we'll pull the following information from Facebook:

- First Name
- Last Name
- Email
- Gender

Whenever they log in, we'll also do the following:

1. If the person doesn't have a photo in Rock and they do in Facebook, their Facebook photo will be added to Rock.
2. Their Facebook Media Link will be updated.
3. Any of their friends that have also logged into Rock using Facebook will be added as a *Facebook Friend* known relationship.

# Google Authentication

With the popularity of Gmail, Google authentication is an attractive alternative for many guests. Below are the steps necessary for Rock to use your guests' Google passwords for authentication.

1. Visit [console.developers.google.com/start](https://console.developers.google.com/start) and create a new project for your organization. If you already have a Google Maps API key, then you'll want to use that project.
2. Navigate to the *APIs and auth* page, then click on the *OAuth consent screen*.
3. Select *Get Started* then fill out this screen with your organization’s information. The information given here will be presented to your users when they sign in for the first time. A preview of the screen your users will see should be on the righthand side of your screen. You’ll want to include branding that your users will recognize and trust.
4. Now you can select *Create OAuth Client* tab and then select *Web Application*.
5. Under *Authorized redirect URLs*, you'll need to place the full URL of all the login pages you configure to use Google authentication. For example, *http://rock.rocksolidchurchdemo.com/page/3* for the internal site. When you've finished adding URLs click *Create*.
6. You should be presented with a Client ID and a Client Secret. Note these values and add them to the Google service configuration under Admin Tools \> Settings \> Authentication Services \> Google.

# Twitter Authentication

Rounding out the list of popular sites to use for authentication, we also support Twitter. The directions below will get you up and running quickly.

1. Visit [apps.twitter.com](https://apps.twitter.com/) and create a new app for your organization.
2. Give your app a name and a description. This will appear to your users, so make it recognizable. Also put in your organization's forward-facing website URL, and in the callback URL field put the URL for your primary login page. This will be overridden but the callback URL field needs to have a value for the authentication service to work (for example: *http://rock.rocksolidchurchdemo.com/page/3*). Click *Create*.
3. Navigate to the *Keys and Access Tokens* tab at the top and note the Consumer Key and Consumer Secret values. Add these to the Twitter service configuration under:  
	Admin Tools \> Settings \> Authentication Services \> Twitter.
4. In order for your application to connect Rock user accounts to Twitter accounts, you need to request elevated permission for your application to access email information associated with Twitter accounts. You can do this via this link [https://support.twitter.com/forms/platform](https://support.twitter.com/forms/platform) and select the *I need access to special permissions* option.

# Auth0 Integration

Auth0 is a single-sign-on service that provides a layer of extensibility to your authentication strategy. Why would you need a service like this? Auth0 solves three primary needs:

1. It allows for a centralized authentication service outside of Rock. For most organizations centralizing their authentication inside of Rock is a great feature. Others prefer to have all authentication reside in an independent service. This is often desirable if you have several other systems needing shared authentication and you don’t want to write Rock integrations for each.
2. The second scenario where Auth0 makes a lot of sense is enabling social logins. Out of the box Rock supports most of the popular services, but Auth0 supports far more.
3. Finally, if you need passwordless authentication (via SMS, email, etc.) or two-factor authentication Auth0 can provide that for you.

Enough talk, let's get Auth0 configured for Rock. The instructions below assume that you have an Auth0 account with the desired connections and administrative settings pre-configured.

1. The first step is to create a new ‘Client’ in the Auth0 administrator site. Select ‘Clients’ from the left-hand navigation to get started.
2. Give your client a name and select the ‘Regular Web Applications’ option.![Auth0 Create Client Screen](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/auth0-screen1.png)
	Creating a Client
3. The next screen will show ‘Quick Start’ options. It’s much easier to just fill in the settings so head over to the ‘Settings’ tab. Here you’ll find the ‘Domain’, ‘Client ID’ and ‘Client Secret’. Keep track of these as you’ll need them in the Rock configuration. On this screen you’ll need to provide the following settings:
	- Allowed Callback URLs – This is a list of Rock Login URLS that will be using Auth0. You can provide as many URLs here as you need, separated by a comma.
		- You can also optionally add logos for the connection. This will help the individual logging in better understand what's happening.
	![Auth0 Rock Internal Screen](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/auth0-screen2.png)
	Configuring a Client
4. Finally, you need to give your client some extra permissions. In the Auth0 manager head over to the APIs link and select the 'Auth0 Management API'. From the tabs at the top select 'Non Interactive Clients'. You should see your client listed here. Be sure that your client is 'Authorized'. Next, select the down arrow to authorize specific scopes. You'll need to enable both the 'read:users' and 'read:users\_app\_metadata' scopes.![Auth0 Rock Internal Screen](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/auth0-screen3.png)
	Authorizing a Client

# External Authentication Services

After activating the service in Admin Tools \> Settings \> Authentication Services, open the login pages you wish to enable the authentication on (`/page/207` for External Login and `/page/3` for Internal Login), edit the *Login Block Property*, and turn on *Remote Authorization Types* for the services that you activated.


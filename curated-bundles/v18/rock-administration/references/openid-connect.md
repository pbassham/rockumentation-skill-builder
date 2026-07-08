---
description: Use when configuring Rock as an OpenID Connect authentication server to allow external systems and members to log in with Rock credentials
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > OpenID Connect

OpenID Connect

In the [External Authentication Services](#externalauthenticationservices) chapter above we talked about how people can use different external accounts to log in to Rock. But what about the flip side of the coin, where people can use Rock to log in to other external systems?

That's where *OpenID Connect* (OIDC) comes in. OIDC is an open standard for verifying the identity of an individual in one system based on the authentication performed by another system. Rock ships with an OIDC Server feature that can allow a third-party system to use Rock as an authorization server. That means your members can log in to an external site like Church Online Platform using their Rock username and password.

In the sections below we’ll cover how these features work and what you’ll need to set them up.

# Servers and Clients

Before we get too far, it’s important to keep in mind the distinction between *server* and *client*.

*Server* applies to the system that’s doing the authentication. The *client* system uses the authentication provided by the server to grant access.

For instance, let's say a person is using their Rock username and password to log in to Church Online Platform. In that case, Rock would be the server and Church Online Platform would be the client.

# Rock OpenID Connect Server

Let's see how to configure Rock as the authentication server for an outside system. You'll probably want to set up Rock at the same time you're setting up the client system. There's information Rock will need about the client, and the client will need some things from Rock, so it makes sense to have both up at once if you can.

## Adding OIDC Clients in Rock

Each external system you're working with will need their own OIDC Client configuration in Rock. In the below example, we'll be setting up Rock to interact with Church Online Platform (ChOP). A little later in the next section we'll show you how things look in ChOP so you can see how everything connects.

To start, navigate to Admin Tools \> Settings \> OpenID Connect Clients. From here you can view the clients you already have set up or add new ones to the list. In this example we'll be adding a new client for ChOP.

![OpenID Connect Client Setup](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/oidc-client-setup-v18.png)

OpenID Connect Client Setup

# Changing Scopes and Claims

If you want to get really advanced, Rock lets you change the list of Scopes and Claims. You can access the *OpenID Connect Scopes* configuration from the *OpenID Connect Clients* page at Admin Tools \> Settings \> OpenID Connect Clients. Just remember that this requires coordination with (and possible changes to) the client system, to support the updates you make.

## Example Client System Setup

Each client will be a little different, so it’s challenging to provide specific instructions that apply to any system that’s out there. In this section we’ll use Church Online Platform (ChOP) as an example client, but the same key points will apply to any system that supports OpenID Connect.

First, you’ll need to log in to ChOP. If you don’t have a login, you can create one [here](https://online.church/signup/user). When you’re logged in, you'll need to access the Admin menu. If you're not already there, there's a button near the top-left where you can "Go to Admin". From the Admin menu, click "Integrations" on the left, then select "OpenID Connect” and click the “Set Up” button. You’ll then be brought to the page pictured below.

This page has fields for information you’ll need to get from Rock, and it also provides information you’ll need to add to Rock. As we mentioned earlier, this is why it's a good idea to set up both systems at the same time.

![OpenID Connect Client-Side Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/oidc-chop-setup-v12.png)

OpenID Connect ChOP Settings

With the above setup in place, your staff and guests can immediately start using their Rock credentials to log in to Church Online Platform. Again, we've been using ChOP in this example, but you'll find any system that supports OIDC uses similar (if not identical) terminology and configuration.

# Unique Email Addresses

Be aware that ChOP has a 'unique email' policy so only one person can have any particular email address. If people have shared email addresses in Rock, they will receive an error message when the second person attempts to log in using OpenID Connect with ChOP.


---

## Person Tokens {#person-tokens}

> **Path:** Rock Admin Hero Guide > Person Tokens

Person Tokens

There may be times when it’s useful to view either the internal Rock site or the external organization site as an individual other than yourself. For example, if someone calls needing technical support because of a problem with their person profile, an admin may want to view the page while logged in as that person. This allows the admin to see exactly what the person sees. Rather than creating a new login—which can result in duplicates in the database—Rock uses person tokens, which allow Rock admins to log in as (i.e., impersonate) users without requiring passwords. This not only makes troubleshooting easier, but it also helps keep your database tidy. Anytime an admin impersonates another user, a record of the login is kept in the user's history tab.

Tokens are configurable, so you have control over how long they’re valid for and how many times they may be used before expiring. Let’s take a look at how to do this.

# Configuring Person Tokens

Person tokens come preconfigured in Rock and can be found in the Global Attributes screen  
(Admin Tools \> Settings \> Global Attributes).  
There are three Person Token attributes: Person Token Expire Minutes, Person Token Usage Limit, and Person Token Use Legacy Fallback. Click on an attribute to open its configuration settings.

The **Person Token Expire Minutes** attribute is the length of time the person token is valid, configured in minutes. The default setting is 43200, or 30 days. If you want the person token to be valid for a shorter amount of time, enter the value in minutes in the *Person Token Expire Minutes* field.

The **Person Token Usage Limit** is the default maximum number of times a person token can be used. By default, the value is blank, meaning there's no limit to the number of times the token can be used. If you want to set a limit, enter a numerical value in the Person Token Usage Limit Value screen.

The **Person Token Use Legacy Fallback** tells Rock whether or not to use pre-v7 legacy person token settings if they come through the system. If the Person Token Use Legacy Fallback Value is set to No, those legacy tokens will be rejected. We recommend keeping the value set to Yes for a few months after updating to v7, just to be on the safe side.

You can also configure and read person tokens using the [PersonTokenCreate](https://www.rockrms.com/lava/person#persontokencreate) and [PersonTokenRead](https://www.rockrms.com/lava/person#persontokenread) Lava filters. To learn more about how to use Lava for Person Tokens, see the [Lava](https://www.rockrms.com/Lava) guide.

Now let’s look at how you put the person tokens to use by impersonating another user.

# Impersonating Another Person

Impersonation is enabled in the Bio block settings of the Person Profile page.

![Enable Impersonation](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/enable-impersonation-v18.png)

Enable Impersonation

Once you’ve saved your block settings, you’re ready to impersonate another person. To do this, search for the profile page of the person you want to impersonate, click the Actions button in the upper right corner of the screen, and select Impersonate from the menu options. Rock will take you to the page specified as the Impersonation Start Page, and you’ll now view the site as that person. Keep in mind this means you’ll only be able to see what that person can see based on their security roles and permissions.

Keep in mind that not every person can be impersonated. People with certain [Account Protection Profile](https://community.rockrms.com/documentation/bookcontent/5#accountprotectionprofiles) levels can't be impersonated, based on your [Security Settings](#securitysettings).

![Admin Toolbar Restore](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/admin-toolbar-impersonate-v13.png)

Admin Toolbar Restore Button

Impersonation remains in effect until the browser session ends, you log out of Rock, or you click the Restore button in the admin toolbar at the bottom of the screen as pictured above.

# Note

It's recommended that you set the *Impersonation Start Page* on the block to point at your public-facing Rock site if your primary use of this feature will be to impersonate attendees interacting with your public Rock pages. Failure to set a start page will cause Rock to remain on the internal site when you impersonate someone, which can lead to "access denied" errors necessitating a browser restart, because the person you're impersonating (most likely) doesn't have rights to the internal Rock site.


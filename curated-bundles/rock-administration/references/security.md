---
description: "Use when managing user accounts, security roles, REST API access, or configuring security settings in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Security

Due to the sensitive nature of the data in Rock, it's important that you secure it wisely. This next section displays configurations specific to customizing the security of Rock.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/security-settings-v18.png)

Security

# User Accounts

While you can find a specific user’s accounts on their *Person Profile* page, you can see a list of all user accounts on these screens. This helps determine which person is tied to a specific account and allows you to monitor general login activity.

# Security Roles

Security roles are used to lock down features and data in Rock. While you can configure Rock at the user level (allow and deny specific users), it's much easier to assign people to roles and then build security around those groups. This adds consistency to your security model, which leads to fewer mistakes. The security role pages allow you to manage your roles and to add individuals to them.

It's important that you think strategically as you create security roles for your organization. A little planning in the beginning can prevent a jumbled mess of roles in the end. You’ll also want to think about a naming scheme for your roles. While it sounds trivial, a good naming convention can significantly reduce confusion. We suggest using a naming convention of:  
prefix – area action (RSR – Prayer Administration)

We've added helpful prefixes for you to use:

- **RSR** – This stands for 'Resource Role'. Roles with this prefix are used to secure various 'Resources' in Rock.
- **APP** – These roles are used to secure various applications that use Rock. For example, Rock ships with a role of 'APP – Check-in Devices' that's used to provide security to the check-in site.
- **WEB** – You'll quickly find the need to add several new roles that allow your staff and volunteers to edit parts of the website. Adding the 'WEB' prefix to these roles allows you to group these roles together.
- **GROUP** – While not technically a prefix, Rock will dynamically add this prefix for you when it lists groups that, while not a 'Security Role' group type, are marked to be considered a 'Security Role'.

Feel free to add new prefixes that make sense to your organization.

# REST Controllers

One way you can build applications that extend Rock is through a technology called REST (REpresentational State Transfer, [http://en.wikipedia.org/wiki/Representational\_state\_transfer](http://en.wikipedia.org/wiki/Representational_state_transfer)). If this seems Greek to you, don’t worry. Most developers are familiar with it. The screens in this area help document all of the REST APIs that are available to you. From these screens you can also manage REST API security to ensure only authorized applications can access the data.

# Audit Information

Most changes to the Rock database are tracked in a special audit table. The information in these tables is presented in the screens of this section. This is a helpful tool for you to see what changes are being made and by whom. You can also use these logs to write custom SQL reports or create custom jobs that take action after certain changes.

Auditing can be enabled under Admin Tools \> Settings \> Global Attributes | Enable Auditing. However, note that enabling auditing will cause a significant impact to Rock's performance. You may want to enable this only for brief periods.

# Entity Administration

Entities are specific types of data. A person is a type of entity. So is a group, an email communication and a financial transaction. For those of you familiar with databases, an entity is like a table in your database. In fact, many entities do have a corresponding table in the database. These sets of screens allow you to view and configure the entities in Rock.

There are only two configuration items that you need to worry about. The first is whether the entity is "common." Common entities are shown at the top of the list when you need to select from a list of entities. We've preconfigured *Groups* and *People* to be common, but you may wish to add more (especially if you start adding custom entities of your own).

The second configuration item you’ll want to note is related to security. You can also add security to entities to help protect the data they contain. For instance, we've configured the *Financial Transactions* entity to only be viewable by those in the finance security roles. This is especially useful when it comes to using the reporting features of Rock. The security you define here will be used by the reporting engine to ensure that only authorized individuals can access sensitive data.

## Track Interaction

Use this setting to link new records of an Entity Type to the active page interaction that created them. When enabled, Rock writes a record to the *InteractionEntity* table each time a new entity is created, letting you see the source interaction.  
  
This can help you track when and how new records are created, though it may introduce a small performance impact and increase storage usage.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/entity-track-interaction-v18.png)

Track Interaction Setting

To start tracking, head to Admin Tools \> Settings \> Entity Administration then select an Entity Type and check *Track Interaction*.  
  
Now you have fresh data at your disposal!

# Performance Impact

Enabling this setting does have a performance impact. Use it only when you have a defined reporting need and the entity will not be created at high volume.

# Viewing Tracked Interactions

These entries do not appear in the Interactions UI. Query the *InteractionEntity* table directly or join it to the *Interaction* table for reporting. See the [Interactions](https://community.rockrms.com/documentation/bookcontent/9/368#interactions) documentation for details.

##### Example SQL to View InteractionEntity Data



SELECT 
    ie.Id AS InteractionEntityId,
    ie.EntityId,
    et.Name AS EntityTypeName,
    i.Id AS InteractionId,
    i.Operation,
    i.InteractionDateTime,
    i.InteractionSummary,
    p.NickName,
    p.LastName
FROM InteractionEntity ie
JOIN EntityType et 
    ON ie.EntityTypeId = et.Id
JOIN Interaction i 
    ON ie.InteractionId = i.Id
LEFT JOIN PersonAlias pa
    ON i.PersonAliasId = pa.Id
LEFT JOIN Person p
    ON pa.PersonId = p.Id
ORDER BY i.InteractionDateTime DESC;


Running this query returns:

- The entity type and entity ID
- The interaction’s operation and summary (what action was taken, and on what page it occurred)
- The date and time it occurred
- The person linked to the interaction

# Authentication Services

Rock can be configured to allow several types of authentication during the login process. The available options out of the box are:

- **Auth0:** Auth0 provides authentication and authorization as a service. For full details, see the [Auth0 Integration](#auth0integration) section.
- **Database:** This is the most common authentication type for most organizations. This stores the user's username and password in the database. The user's password is stored in a one-way encrypted format so it can't be retrieved by any means.
- **Active Directory:** If your organization uses a Microsoft Active Directory for network logins, Rock can use it to authenticate your staff. To enable this service, you'll first need to activate it and provide the address of a Domain Controller server along with the Domain Name of your network. Then, you'll then be able to configure Active Directory logins for your staff under the *Security* tab on their *Person Profile* pages.
- **PIN Authentication:** This authentication service is primarily used in the Check-in Manager to provide a quick way to authenticate on touch devices. This authentication only requires a username made up of numbers.
- **Facebook:** You can also enable the use of an individual's Facebook account as authentication to Rock. This makes their life a little easier because they have one less password to remember. In order to enable this, you'll need to configure a Facebook application.
- **Google:** This authentication provider allows guests to use their Google account with Rock.
- **Twitter:** As you can probably guess... yes, you can use Twitter as an authentication source.
- **OidcClient:** OpenID Connect (OIDC) is an open standard for verifying the identity of an individual in one system based on the authentication performed by another system. In this case, Rock would be the *Client*, allowing people to log in to Rock using credentials from another system. For more information on using Rock as an OIDC *Server* see the [OpenID Connect chapter](#openidconnect) of this guide.

# Implementing Authentication

Once you implement a new authentication service, you'll need to enable it on each login page where you want it used.

# REST Keys

When writing applications that use Rock's REST API, you'll need to use keys for authentication. These keys can be set up and configured here. See Rock's developer documentation for more information on using REST keys in your applications.

REST keys function as a type of person record, allowing you to assign them to any roles as needed. When adding a REST key to a role, use the key's name to search for it.

# REST CORS Domains

Writing secure web applications requires that all domains that use your server's REST API be authorized using Cross-Origin Resource Sharing (CORS). You can define these allowed domains here.

# Inspect Security

The *Inspect Security* page does just what the name implies: allows you to quickly verify a person's security settings. It also allows admins to "pop the trunk" on their own security settings when they lock themselves out of Rock. (It happens sometimes.) To read more about verifying permissions, see the [Securing Rock](#securingrock) chapter of this manual.

# Person Signal Types

Signals are discreet flags that can be assigned to a person to bring attention to a sensitive or private matter. As with most aspects of Rock, signals are highly customizable. They can be used to flag anything from security concerns to high-level lay leads and everything in between. Check out the [Person Signal Types](https://community.rockrms.com/documentation/bookcontent/5#personsignaltypes) chapter of the Person & Family Field Guide to learn more about this powerful feature.

# OpenID Connect Clients

When you're using Rock's OpenID Connect server feature, this is where you'll go to add your clients. We cover this area in detail in the [OpenID Connect](#openidconnect) chapter below.

# Security Settings

From the *Security Settings* page you can manage how people with different [Account Protection Profiles](https://community.rockrms.com/documentation/bookcontent/5#accountprotectionprofiles) are handled by Rock.

These settings are in place to help avoid account hijack attempts, and to avoid someone logging in as someone else by using things like a tokenized link in an email or Rock's impersonation feature. For instance, people with higher Protection Profile levels will have duplicate records created whenever a check for an existing record would otherwise be performed, like when filling out an online form. This helps ensure the existing account is secured and protected against malicious activities. We know duplicates stink, but you can't come down to zero duplicates and have good security.

As described below, there are also protections around who can merge certain duplicate records when they're created. If an account has a Protection Profile of High or Extreme, then the person doing the merge will need the specified security role to combine the records. To protect these accounts, the roles you assign should be ones that are limited to a small number of trusted and trained people.

![Security Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/security-setting-update-v18.png)

Security Settings

# Passwordless Login

More details on Passwordless Login can be found in the User Login & User Accounts chapter [here](#passwordlessloginobsidian).

# Enabling 2FA Without Passwordless Sign In

If *Passwordless Sign In* is disabled for a protection profile, enabling *Two-Factor Authentication* (2FA) for the same profile will lock them out from Rock during their next sign in attempt. Don't worry though, Rock won't let you enable both settings at the same time.

## Reject Authentication Cookies

In the screenshot above we briefly looked at the *Reject Authentication Cookies Issued Before* setting. Here are some additional details on this setting and when you'll need it.

Often, you'll want to send communications which include a link to a page in Rock. That link sometimes includes a Person Token, using the [PersonTokenCreate Lava filter](https://community.rockrms.com/lava/filters/person-filters#persontokencreate). It's a low-friction way to get people quickly logged in and directed to the relevant page. However, the link is unique to each communication recipient. So, if the person forwards the communication to someone else, or posts the communication publicly, others can potentially use it to log in as them.

This shouldn't scare you away from using these tokens. The *PersonTokenCreate* Lava filter lets you restrict usage of the token to a certain timeframe, a maximum number of uses, or a specific page, so there are built-in safeguards. However, browser cookies introduce a potential loophole in those safeguards. If a person logs in while the token is still valid, they get an authentication cookie. This cookie can allow them to stay continuously logged in, even after the token is no longer valid. When this happens, you need a way to force the person to log out.

Forcing people who have used the token to log out is a two-step process. First, you'll need to use some SQL to delete the token from Rock. Then, you can adjust the *Reject Authentication Cookies Issued Before* setting to be the date and time you deleted the token, or slightly after. To delete the token you can use the following SQL:

##### Delete Person Token



DECLARE @PersonId AS INTEGER = 12345; --Replace "12345" with the Person Id

DELETE FROM 
    \[PersonToken\]  
WHERE 
    \[PersonAliasId\] IN  (
                            SELECT 
                                \[Id\] 
                            FROM 
                                \[PersonAlias\] 
                            WHERE 
                                \[PersonId\] = @PersonId
                        );

Deleting the token ensures it can no longer be used. With the *Reject Authentication Cookies Issued Before* date and time set, you ensure anyone who is already using the token will be forced to log out. Both steps should be taken, because the *Reject Authentication Cookies Issued Before* feature alone does not disable impersonation tokens.

# Disclosure of Incident

If an impersonation token or other sensitive information has been shared, it’s important to inform those affected and other stakeholders as soon as possible. Transparency allows people to take additional security steps, such as changing their passwords or reviewing account activity.

Note that future dates cannot be used to reject authentication cookies, ensuring that logouts occur based on authentication cookies that have already been issued. Also, keep in mind that people are not logged out immediately when the *Reject Authentication Cookies Issued Before* date is set. Instead, they will be logged out when they next interact with the system, such as navigating to a page, refreshing a page, or accessing any functionality in Rock.

# Security Change Audit

This page was designed to assist when troubleshooting security permission changes. Keep in mind that this tracks changes to item permissions, not changes to an individual's security. For instance, granting the role "RSR - Staff Worker" permission to view a page would appear in the audit log. Adding the role "RSR - Rock Administration" to Ted Decker's account would not appear in the audit log. However, an addition to the log would be made if Ted Decker were granted access as an individual (using Add User instead of Add Role) to the list of an item's permissions.

![Security Change Audit](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/security-change-audit-v18.png)

Security Change Audit

# Cloning Security Role Groups

We’ll wrap up our Security chapter by circling back to the *Security Roles* page we reviewed earlier. To save you time (and possibly a headache), you can access the *Security Roles* page to clone security role groups. Cloning allows you to make a copy of an existing group along with all of its security configuration. Group members are not copied over to the new group.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/clone-security-role-v18.png)

Clone Security Role Group

Cloning groups is a quick and easy process. Simply choose the group you want to clone in the Security Roles Group List and click the button. The word “Copy” will be appended to the name of the new group. Click the Edit button to change the name and description of the group, and to make any further changes to the group’s settings. Then click Save. When you return to the Group List, the newly-cloned group will be listed among the other security roles.


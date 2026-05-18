---
description: "Use when configuring user access control, security roles, permission settings, or protecting sensitive information in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Securing Rock

Securing Rock

Many items in Rock can be secured to protect access to sensitive information. While we hope that you find the default security configuration and roles to be a good start, it’s important that you understand how security works so that you’re able to configure it in a way that makes sense for you and your organization.

# Security Roles

While you can provide detailed security for every person individually, it's often tedious and problematic. Security roles, on the other hand, are much more flexible and far less prone to error.

# Tip

We highly recommend learning the Rock pattern for security before making changes or additions. It's always easier to swim downstream than upstream, but you must first know which way the river is flowing before you dive in.

Having a well thought out strategy for security roles is critical. Too simple and individuals might have more rights than they need; too complex and security will be difficult to maintain.

We've worked hard to lay a security foundation that makes sense for you to build on. We strongly recommend you closely review the security roles that ship with Rock before you start setting up your organization’s security. You can find those roles under Admin Tools \> Settings \> Security Roles.

# Tip

Do you have an existing group whose members also need access to a particular page or item? You can enable any group to also act as a security role. In the group viewer, simply check the group's *Security Role* property and it will show up in the security role lists.

## Elevated Security Levels

Each security role has an *Elevated Security Level* setting. This setting is used by Rock to calculate a person's [Account Protection Profile](https://community.rockrms.com/documentation/bookcontent/5#accountprotectionprofiles). There are three *Elevated Security Level* values to choose from.

- **None:** The role has no elevated security. This should be used sparingly, and only for roles that don't grant access to any areas that could expose any part of a person's information.
- **High:** The role has a low level of elevated security and doesn't grant access to sensitive areas.
- **Extreme:** We recommend using this level for any new roles you create that give access to anything inside Rock. This helps protect staff and volunteers from account hijack attempts and makes it more difficult to perform merges on their records.

# Permissions

Wherever you see the icon you can manage the security of the item being displayed. Clicking the icon will bring up the *Security Editor* shown below.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/security-editor-v18.png)

Security Editor

# Note

The Inherited Permissions list tells you which parent item has set the security. This allows you to easily find the parent and fix any incorrect security.

## Setting Permissions

When setting permissions, you'll add either an individual or, more commonly, a security role to the permissions list with either *Allow* or *Deny* access. The order of these permissions is very important. The way the system works is that it starts at the top and works its way down the list looking for a matching rule. The first rule that matches the logged in individual will be implemented, either granting or denying access. Crafting the order of these permissions is important.

Let’s look at an example. First, we’ll look at a case where a page should only be viewed by staff members (and not volunteers or other individuals accessing Rock).

| **Name** | **Allow / Deny** |
| --- | --- |
| **All Users** | Deny |
| **All Staff** | Allow |

The above setup might look correct at first because both roles exist with the proper access. It’s true that staff should have access and other non-staff users should be denied. However, remember that Rock works through security from the top down. Because Staff are also Users, the system will stop at the “All Users | Deny” level and won’t allow access.

| **Name** | **Allow / Deny** |
| --- | --- |
| **All Staff** | Allow |
| **All Users** | Deny |

Now the logged in staff person will match on the first rule and be granted access. Processing of the subsequent rule won't occur for this person, so even though the staff person is also in *All Users*, they will still be granted access. An individual without the *All Staff* role will cause the system to keep checking down the list, where it will find a match at the *All Users* level and deny access accordingly.

## Verifying Permissions

There may be times when you want to view a quick snapshot of a person's security permissions. You can do this in the *Verify Security* block, found in  
Admin Tools \> Settings \> Inspect Security.

![Verify Security Block](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/verify-security-block-v18.png)

Verify Security Block

This snapshot view allows you to do a couple of handy things.

First, it allows you to view the source of a person's effective security permissions. If, for example, someone should have access to a particular page or function but doesn't, the *Verify Security* block allows you to quickly view where the Deny rule is coming from. Keep in mind that the security permissions of particular entities (e.g., pages, groups, etc.) not listed here may cause additional limits to the person's access.

Second, and perhaps more importantly, it allows you to restore your own permissions when you accidentally lock yourself out. Don't be embarrassed; it happens to everyone. The *Verify Security* block allows you to quickly unlock your access without having to go into the database. Simply click the button.


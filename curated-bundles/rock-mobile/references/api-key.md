---
description: "Use when users need to manage, protect, or troubleshoot their mobile app's API key, including setup, security best practices, and fixing broken keys"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Your mobile app's API key is what lets every phone running your app talk to Rock. Keep it safe and you'll never think about it again. This article shows how to protect the key, how to tell when something has gone wrong with it and how to restore it without publishing a new version of your app.

## How the API key works

When your app is published through App Factory, its API key is built into the app itself. Every installed copy sends that key with each request, and Rock uses it to recognize the app. That's why the key can't change once the app is live. If the key in Rock goes missing or gets a new value, every installed copy stops working until a new version reaches the app stores.

Rock keeps the key in three linked pieces:

1. A *Rest User* person, named after your application. A Rest User is a person record that stands for an app or an integration rather than a human being.
2. A login on that person, which holds the key value.
3. Your mobile application's settings, which point to that login.

As long as those three pieces stay connected, the key works. Most problems start when one of them gets merged or deleted.

## What can break the key

The most common cause is a merge. Say Ted Decker is cleaning up duplicate records and a duplicate report suggests merging your app's Rest User person with another record. A merge can break the key in two ways:

**The login is deleted** - When a merge's surviving record is one of Rock's reserved records, such as Anonymous Giver or Anonymous Visitor, Rock removes every login on the merged people. That includes your app's key.

**The login moves to a real person** - In a normal merge, logins follow the surviving record. If that record belongs to a real person, every request from your app now runs as that person, with that person's permissions.

Deleting the Rest User person or its login by hand has the same effect as the first case.

You'll usually notice one of these signs:

- The API Key field on your mobile application's detail page is blank.
- Saving a new key value on that page fails.
- The app won't load content, or shows errors when it opens.

## Protect your key

We suggest taking all three of these steps for every app your organization publishes.

**Keep a copy of the key** - This is your first line of defense. Store each app's API key somewhere safe outside Rock, such as your organization's password manager. With a copy on hand, you can restore a lost key yourself in a few minutes.

**Never merge a Rest User person** - Rest Users aren't people, even when a duplicate report suggests them as a match. Check the record type before you merge any record.

**Leave the Rest User person alone** - Don't inactivate, rename or delete it, and don't remove it from the RSR - Mobile Application Users security role. That role is what gives your app access to the parts of Rock it needs.

## Find out what happened

Before you fix anything, confirm which problem you have. You'll need your application's site Id and a way to run SQL against your Rock database.

1. Go to `Admin Tools > CMS Configuration > Mobile Applications` and open your application.
2. Note the Id shown in the page address.
3. Run the following query, replacing `@SiteId` with your application's Id.
```
SELECT s.[Id] AS [SiteId], s.[Name] AS [SiteName],
       JSON_VALUE(s.[AdditionalSettings], '$.ApiKeyId') AS [ApiKeyId],
       ul.[Id] AS [UserLoginId], ul.[ApiKey], ul.[PersonId],
       p.[FirstName], p.[LastName], dv.[Value] AS [RecordType]
FROM [Site] s
LEFT JOIN [UserLogin] ul ON ul.[Id] = TRY_CAST(JSON_VALUE(s.[AdditionalSettings], '$.ApiKeyId') AS INT)
LEFT JOIN [Person] p ON p.[Id] = ul.[PersonId]
LEFT JOIN [DefinedValue] dv ON dv.[Id] = p.[RecordTypeValueId]
WHERE s.[Id] = @SiteId
```

The query returns one row. Use the following table to read it.

| What you see | What it means | What to do |
| --- | --- | --- |
| `UserLoginId` is empty | The login was deleted. | Follow **Restore a deleted key**. |
| `RecordType` is Rest User | The key is intact. | The problem lies somewhere else. |
| `RecordType` is Person | The login moved to a real person. | Follow **Restore a key that moved to a person** right away. |

## Restore a deleted key

You'll need the original key value, exactly as it was. Start with your saved copy. If you don't have one, App Factory also keeps the key for each app it publishes. Don't generate a new key, because the installed apps won't recognize it.

First, clear your application's link to the deleted login. Run the following, replacing `@SiteId` with your application's Id.

```
UPDATE [Site]
SET [AdditionalSettings] = JSON_MODIFY([AdditionalSettings], '$.ApiKeyId', NULL)
WHERE [Id] = @SiteId
```

Then finish the restore in Rock:

1. Go to `Admin Tools > CMS Configuration > Cache Manager` and select Clear Cache so Rock reads the updated settings.
2. Open your application under `Admin Tools > CMS Configuration > Mobile Applications`, enter the original key value in the API Key field and select Save. Rock creates a new Rest User person and login for the key.
3. Double-check that the new Rest User person is in the RSR - Mobile Application Users security role, and add it if it isn't. The app can't reach the parts of Rock it needs without that role.
4. Close the app completely on a phone and open it again. It should load normally.

## Restore a key that moved to a person

Warning

Fix this right away. Until you do, every request from your app runs as that person, with that person's permissions.

The goal is to give the login back to a Rest User person. You'll create one, move the login to it and remove the extra login Rock creates along the way.

Start by going to `Admin Tools > Settings > REST Keys` and selecting Add to create a new key. Its value doesn't matter, since you'll remove it shortly. Note the new Rest User person's Id.

Next, move your app's login to the new Rest User person. Replace `@NewRestPersonId` with the new person's Id and `@ApiKeyId` with the `UserLoginId` from the diagnostic query.

```
UPDATE [UserLogin]
SET [PersonId] = @NewRestPersonId
WHERE [Id] = @ApiKeyId
```

Then remove the extra login the new REST key created. Don't delete the key from the REST Keys list instead, because that removes every login on the person, including your app's.

```
DELETE FROM [UserLogin]
WHERE [PersonId] = @NewRestPersonId AND [Id] <> @ApiKeyId
```

To finish:

1. Add the new Rest User person to the RSR - Mobile Application Users security role, then double-check that it's there. The app can't reach the parts of Rock it needs without that role.
2. Clear the cache from `Admin Tools > CMS Configuration > Cache Manager`, then close and reopen the app on a phone to confirm it works.

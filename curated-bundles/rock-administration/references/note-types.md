---
description: "Use when configuring notes functionality on Rock entities like batches, people, or prayer requests, or creating custom note types for specific organizational needs"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Note Types

Note Types

You've probably seen Rock's notes features in use on the *Person Profile* page and also with the workflow features. What most people don't know is that notes can do much more than you think. Rock allows any entity type (People, Financial Batches, Prayer Requests, etc.) to have notes attached to them. In fact, it even goes further to allow different types of notes on a single entity.

# Adding Notes to a New Entity

Let's say your finance team asks you to be able to enter notes on batches. Your first response might be that you'll have to *find a developer to add that functionality*. That in itself is a pretty cool option...right? The fact that you have a system that you can extend to meet any need...cool! But in this case, you can play the part of the hero (that's the name of this guide, remember?) and configure it yourself.

Any entity detail page is a candidate for adding notes. Looking at the address for the page will tell you which entity you can attach the note on. For example, if the address has `BatchId=X` then the note can be on the batch entity. Let's walk through the steps of adding notes to the Finance \> Batches \> Batch Detail page.

1. Once you’re on the batch detail page, add a new Core \> Note block to the main zone (see the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#addingablocktoapageexternalsite) guide for details).
2. Edit the block settings of this new block. There are several possible configurations so look through the list. The key, however, is setting the *Context Entity Type* to be *Financial Batch*.
3. Reload the page for the block settings to be enabled. You should now see an empty note block.
4. The last step is to add the note type under Admin Tools \> Settings \> Note Types. You can add a note type from the bottom of the grid. Be sure to set the entity to *Financial Batch*.

After following these steps your batch screen should look something like the one pictured below, with a shiny new place to put notes at the bottom of the page.

![Adding Notes to Batches](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/notes-to-batches-v18.png)

Batches Note Type

# Adding Multiple Note Types to a Single Entity

When you add a note to a person on the *Person Profile* page, you're adding a generic *Person Note* to the person entity. What if you wanted to be able to add a new type of note to a person? Say for instance your organization has a hospital visitation team and they want to have their own notes that stand out from the default ones. Developer needed...? Nope! You got this. Let's walk through the steps of adding this new *Hospital Visitation* note type.

The first step is to add the new note type under Admin Tools \> Settings \> Note Types. From the bottom of the grid select the Add button and the *Add Note Type* page will be displayed.

![Adding a Note Type](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/new-note-type-v18.png)

Adding a Note Type

Once your new note type has been defined it's ready to be used. At this point you may consider adding security to it to control who has access to view and edit these notes.

# Security for Notes

It's important to understand who will be able to see or edit notes. Below is a full breakdown of what you can expect.

- **Private:** Private notes are only viewable by the creator. No one else, no matter what their permissions are, can see them.
- **Approve:** The Approve security verb lets you approve notes. You can view any notes for which you have Approve permission.
- **View:** You can view a note if you have View security to the note itself. You can also view notes you have created or modified in the past. Lastly, you can view a note if you have rights based off of the Note Type.
- **Edit:** Edit access gives you rights to add a new note and to edit notes that you have created. Edit access DOES NOT give you rights to edit notes that were created by someone else.
- **Administrate:** Administrate permission will let you edit notes, including notes you did not create.

# Watching Notes

You can specify whether a note type *Allows Watching*. If it does, anyone who can view a note can choose to “watch” it. This means they will automatically be notified if the note gets any replies. You can also specify whether authors will automatically watch their own notes.

But that's not all! There's a page in *System Settings* called "Note Watches". Here, administrators can see everyone who's watching a note, but you can also add new "watches".

![New Note Watch](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/note-watch-detail-v18.png)

New Note Watch

You can select either a single person or all members of a group to watch the notes you specify, by selecting them in either the *Watcher Person* or the *Watcher Group* fields.

Next, we can specify a specific person to watch by picking them as the *Watching Person*, or we can instead choose a note type to watch. If you want to get very specific, you can select both a person and a note type to watch; that will serve to only notify people of that type of note when it's added to that specific person.

You can also create exclusions to the note watch by creating a new note watch and un-checking the *Watching* option. For instance, if you wanted a group of your staff to be notified whenever a communication type note is added to anyone, you would set that up as normal using the process described above. But maybe you don't want them to know when someone said they contacted your senior pastor. In that case, you'd add a second note watch and select your staff group as the *Watcher Group*, but un-check *Watching* and specify your senior pastor as the *Watching Person*. Now your staff group won't be notified of any notes added to your senior pastor's profile, but they'll still be notified of all other communication type notes added to other people.

# Exceptions to the Rule

In the above example, if the Note Watch that caused your staff to get notifications of all communication notes had *Allow Override* un-checked, the second rule with "Watching" un-checked would no longer apply to the first rule. Use this option if there's a watching rule you want to be really sure won't get turned off by another rule.

All note notifications use the *Note Watch Notification* System Communications template, so edit that template if you'd like. You can specify additional recipients of all notifications by adding them to the *To* field in the template, or on the *Send Note Notifications* job itself. Note notifications will always be sent as a digest, rather than sending one email for every single watched note reply, which could quickly overwhelm your inbox.

# Note Attributes

You can add attributes to the *Note* entity to track additional details about the note or to help with automation and data tracking.

![Attribute for Person Note](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/person-note-with-attribute-v18.png)

Attribute for Person Note

In almost all cases you'll want to configure the attribute to only show for certain types of Notes. As pictured below, you can specify a *Note Type Id* to make sure the attribute only applies to the notes you want.

![Entity Attribute for Person Note](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/entity-attribute-setup-for-notes-v18.png)

Entity Attribute for Person Note

For more information on setting up attributes for entities like Notes, see the [Entity Attributes](#entityattributes) section of this guide.


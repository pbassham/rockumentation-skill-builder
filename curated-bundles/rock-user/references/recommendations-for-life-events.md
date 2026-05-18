---
description: "Use when handling life event procedures like deaths, divorces, or marriages in a Rock organization's database management"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Recommendations for Life Events

Recommendations for Life Events

Below are some suggested processes for common life events. While these are just suggestions, you’ll want to have documented processes for each of these events so your staff handles them consistently.

# Coming Soon!

In an upcoming update to Rock, you'll be able to automate some of these processes. Keep your eye on Rock’s workflow features as they are released.

# Death of a Family Member

The death of a loved one is a very hard thing. It’s made even harder, though, when the remaining person is constantly reminded of their loss. When someone notifies your organization about a death, we suggest taking the following steps:

1. Mark the individual’s record as *Inactive* with the reason of *Deceased*.
2. Move the deceased individual to a new family by clicking the button from the *Edit Family* page.
3. Remove all contact information from the record.
4. Add a note to the deceased person marked as *Alert* with the text of "Deceased" and the date they died.
5. If married, create a *Previous Spouse* relationship back to the spouse. It's generally best to leave the surviving spouse as *Married* as a matter of respect unless they indicate otherwise.
6. Don’t forget to talk to your finance department about how to deal with regular contribution records. We recommend that the contributions assigned to the deceased person be moved to the surviving spouse. This can be done from the *Person Profile* page.

For optimal data management, we recommend removing deceased individuals from their original families in all scenarios. While this may have minor impacts on certain features, the overall benefits outweigh these considerations.

# Divorce

Before making these changes, be sure to discreetly get as much information about the family situation as you can. This will ensure you get the information right and not create an awkward situation in the future.

1. From the *Edit Family* screen, click the icon for one of the adults to move them to a new family.
2. Depending on the custody status, you may want to ensure the children are in both families. To do this, find the new family and add any children to it, without removing them from their current family.
3. Create a *Former Spouse* relationship to both adults.
4. Update phone and address information.
5. Add any name changes on the *Edit Individual* screen (under *Advanced Settings*).
6. Update the *Marital Status* for both individuals.
7. You may need to use the Reassign Transactions button to transfer financial transactions from one spouse to the other. This can be found under the *Contributions* tab in the *Person Profile* page, at the bottom of the transaction list.

# Marriage

After the wedding, you'll want to complete the following steps.

1. Go to the primary record (usually the husband or person with the primary address).
2. From the *Edit Family* screen click the Add Person button and select the individual from the database, removing them from their current family.
3. Update the female’s title to "Mrs."
4. Update both adults’ marital status to "Married."
5. Add the anniversary date, if known.
6. Add the wife's maiden name as a previous name on the *Edit Individual* screen (under *Advanced Settings*).

# Child Turns 18

When a child reaches adulthood it’s a good idea to move them to a new family, even if they are still living in their parents’ home.

1. From the *Edit Family* screen, click the icon.
2. Create *Parent* relationships back to the parents.
3. Update the individual’s status from *Child* to *Adult*.

You can use the notes to document the reasons for the changes. While it may seem obvious now, it won’t in a couple of weeks, especially for the next person who views the records.

# Process Adult Children Job

Rock ships with a job that updates children to adults automatically, which not only makes things easier for you but also helps keep the person data in Rock accurate. The job only processes people who have a child role in one or more families, but also is of an "adult" age. The default adult age in Rock is 18, but you can change this. There are several settings the job uses to process individuals, which you can manage by navigating to Tools \> Data Integrity \> Data Automation | Move Adult Children. With these settings, the job looks at all the families a person belongs to and their role in each of those families, then decides whether or not the person should be updated as an adult and/or added to a new family.

You can learn more about jobs and how to configure them in the [Jobs](https://community.rockrms.com/documentation/bookcontent/9#jobs) chapter of the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/).


---

## Person Notes {#person-notes}

> **Path:** Person & Family Field Guide > Person Notes

Person Notes

You just can’t take too many notes! Documenting key conversations and important details is vital to the success of your organization. Here are some examples:

- Information on life events like hospitalization of a loved one
- Interest in a specific serving area
- Likes or dislikes (i.e., preferences related to your organization)
- Time and date of phone calls

These notes help the staff to be on the same page and help make an organization of any size feel small and caring. There are different types of notes:

![Types of Notes](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/note-types-v18.png)

Types of Notes

Sometimes you might want to enter a note that only you can see. There are a couple of ways to do this. The first, and easiest, is to make the note private. When you do this, you’ll be the only one who can view it. If you would like to share the note with a limited group of people (like *Pastoral Staff*), click the button and enable viewing for only the *Pastoral Staff* group.

# Note

Because we can't add security to an item before it's been created, the security icon will only be visible after the note is saved.

![Note Editor](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/note-editor-v18.png)

Adding A Note

Sometimes a note is very important, and you want everyone to see it. Checking the *Alert* checkbox will keep the note at the top of the list and highlight it in red. These types of notes can be used to warn staff of a potential issue.

# Warning

If you’re creating an alert note, then it’s probably related to unpleasant or sensitive circumstances. As you consider your wording for an alert, try to be as discreet as possible while still getting your point across.

We mentioned above that *Alert* notes will stay at the top of the list of notes. Below the *Alert* notes will be notes marked as *Pin to Top*. If there are multiple Alert, Pin to Top, or regular notes, then the most recent notes will be displayed first.

# Security for Notes

It's important to understand who will be able to see or edit notes. We touched briefly on note security above, but here is a full breakdown of what you can expect.

- **Private:** Private notes are only viewable by the creator. No one else, no matter what their permissions are, can see them.
- **Approve:** The Approve security verb lets you approve notes. You can view any notes for which you have Approve permission.
- **View:** You can view a note if you have View security to the note itself. You can also view notes you have created or modified in the past. Lastly, you can view a note if you have rights based off of the Note Type.
- **Edit:** Edit access gives you rights to add a new note and to edit notes that you have created. Edit access DOES NOT give you rights to edit notes that were created by someone else.
- **Administrate:** Administrate permission will let you edit notes, including notes you did not create.


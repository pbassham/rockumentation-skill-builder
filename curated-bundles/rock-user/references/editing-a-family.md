---
description: "Use when managing family records, including editing family names, campus assignments, record status, and family membership changes"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Editing a Family

Editing a Family

To edit a family, click the button in the upper-right corner of the *Family* section of the *Person Profile*. This will take you to the screen pictured below.

![Edit Family](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/edit-family-v18.png)

Editing A Family

Each of the areas noted above are discussed in greater detail below.

# Overview Section

The top section of the page allows you to edit the family's name, campus and record status. The family name is used as a title for the family.

Since a person is tied to a campus through the family unit, this is where you would change the campus for all members of a family. If you only have one campus, then the *Campus* field won't be visible.

# Note

If a person is in two different families, each tied to a different campus, they will be counted and reported in both campuses.

While the *Record Status* is typically set on a specific person, we know you’ll sometimes need to change it for a whole family at once. When you mark the family *Inactive*, you’ll be asked to provide a reason. Like inactivating an individual, this helps the organization understand why groups of people are leaving and helps the next person who looks at this specific record understand why this change was made.

Keep in mind that marking the family *Inactive* will also inactivate each member of the family. The individuals in the family will also be made *Inactive* in any groups to which they belong.

# Family Members Section

The next section allows you to manage the members of the family. To add a new person to the family, click the Add Person button in the header. This will allow you to either select a person who's already in the database (say you're building a blended family) or add a new person (common if you're adding a new baby).

You can also move a family member to a new family. This is commonly done by some organizations when a child turns 18. We’ll discuss this more in the [Recommendations for Life Events](#recommendationsforlifeevents) section.

When you add an existing person to a family, you’re given the option of removing them from other families. If this is a blended family situation with joint custody, you’ll probably want to keep them in their current families. But, if the child is transitioning families, you’ll most likely want to remove them from the first one.

When an existing person is a member of more than one family a small delete button will appear, which allows you to remove them from the family.

# Note

These are sensitive situations! Please take care when making these family changes. Ask extra questions and invest in getting this right from the start. Consider adding notes to the *Person Profile* records of those involved to explain the situation in a positive way. This will help future staff understand the family make-up better and keep them from making changes that could upset a family member.

# Addresses Section

This final section lists all the current and past addresses for a family. Several different address types can be attached to a family. Ask your administrator for help with adding new address types if needed.

When a family moves, it may be tempting to simply change the home address and save the record. Instead, you should click the Family Moved button. This will automatically move the home address to a previous address and start a new home address for you. Having a previous address is very helpful. When someone moves there’s a period of transition when both addresses could be floating around (online form submissions, checks, etc.) Having both addresses in the system helps staff understand the transition. This also helps reduce the chance that someone would change the new address back to the old. Trust us, it happens!

# Map Location

Rock requires that one (and only one) address be used for showing on the map. The *Map Location* flag indicates which address is being used for this purpose. The flag doesn't necessarily mean that the location can be mapped. For instance, if a family has only one address in the system, that address will always be tagged as the *Map Location* because there is no other location to reference.

# Important

Please keep in mind that none of your changes on the *Family Edit* screen are actually saved until you click the Save button. This includes actions like Move to New Family and Add Person.


---

## Family Pre-Registration {#family-pre-registration}

> **Path:** Person & Family Field Guide > Family Pre-Registration

Family Pre-Registration

Available on the external website under *Connect*, the *Family Pre-Registration* page is often where people are directed to create a new record in Rock. Having a place where people can add themselves to Rock saves your staff and volunteers from having to manually create new people and families. The form is simple and easy to use, as shown below.

![Family Pre-Registration Entry](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/family-pre-registration-entry-v16.png)

Family Pre-Registration Entry

After everyone’s information is entered, all the person needs to do is click Save to complete the process.

![Family Pre-Registration Confirmation](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/family-pre-registration-confirmation-v12.png)

Family Pre-Registration Confirmation

At this point, you’ll find the person/family in Rock. This means, for example, they can show up to your next service ready to check in without needing to be manually entered by staff or volunteers.

There are many block settings to customize the *Family Pre-Registration* experience. For instance, you can launch a workflow for each parent and for each child when the form is completed. Or, you can choose to ask for race and ethnicity information. This is also where you'll set whether or not to show the SMS Opt-in option. Administrators are encouraged to review this block's settings to ensure you’re collecting all the information you need from new guests.

As noted above, you can launch different types of workflows for each submission of the Family Pre-Registration form. The workflow(s) you select under *Workflow Types* will be passed the primary family as the entity, which is going to be a group entity. If the selected workflow type has workflow attribute values set up with keys of ParentIds, ChildIds, or PlannedVisitDate, these will be populated automatically. The *Parent Workflow* you choose will be launched once for each parent, so if there is more than one parent you’ll get more than one workflow. In this case the parent (a Person record) will be passed to the workflow. The selected *Child Workflow* works similarly to the Parent Workflow except the child’s Person record will be sent to the workflow as the entity.


---

## How Rock Handles People and Families {#how-rock-handles-people-and-families}

> **Path:** Person & Family Field Guide > How Rock Handles People and Families

How Rock Handles People and Families

Now that you've seen how individuals and families are added and edited in Rock, let's talk about how Rock helps you keep that information current.

Imagine having to manually update the ages of individuals in your organization whenever birthdays occur, or the grades of children at the start of each new school year. It would be a daunting, never-ending task! Thankfully, Rock uses automated calculations to update people and families, so you don’t have to. Let's look at which information is automated and how Rock makes the calculations.

# Age

Rock calculates an individual’s age by comparing their birthdate to the current date. Why make things more complicated than they need to be?

# Age Classifications

In Rock, an Adult is anyone over the age of 18 or marked as an adult in one or more families. A Child is anyone less than 18 or a child in all families. If either of those conditions aren't met, the individual is marked as Unknown.

Rock calculates age each time a person is saved and re-calculates it every time the *Rock Cleanup* job is run. The value is then saved in the *Age Classification* property on the Person model, where it's made available to use in Data Views, Reports and other filtering operations.

# Grade

Rock calculates a person's grade using their graduation year and the global attribute *Grade Transition Date*. When an individual’s graduation year is entered into their *Person Profile*, Rock compares that year to the *Grade Transition Date* to determine the individual’s grade. You can configure the *Grade Transition Date* in the *Global Attributes* screen, located at Admin Tools \> Settings \> General \> Global Attributes.

# A Word to the Wise

The transition occurs at the *end* of the specified date, so if you enter today's date, the promotion to the next grade will take place tonight at midnight. Because this is simply a calculation, and nothing is changed on a person's profile, you can freely change the date back and forth and observe that the grade changes.

For more details on grades in Rock, see the [School Grades](#schoolgrades) chapter below.

# Primary Family

Individuals belonging to more than one family will be assigned a primary family. This is recorded behind the scenes as the *Primary Family ID* and is initially associated with the family that was entered into Rock first.

Because it’s stored behind the scenes, you typically won’t see the *Primary Family ID*. However, on the *Person Profile* page, the primary family will be whichever family is at the top of the list for the individual. So, you can change the primary family by clicking and dragging the icon for the desired family to the top of the list. While the *Primary Family ID* isn’t visible, behind the scenes it will be updated in real time according to your changes on the *Person Profile*.


---

## Directory {#directory}

> **Path:** Person & Family Field Guide > Directory

Many smaller organizations like to have a directory of all the people in the database. The Directory feature allows this and much, much more.

![Directory](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/directory-v18.png)

Directory

Out of the box, the directory is configured to display a simple search screen. However, you can change the “Show All People” block setting to show the first 1,500 people in the database if you prefer.

That's not all this block can do though. Let's check out all the features found under the block settings.

| Setting | Description |
| --- | --- |
| Data View | The results of the directory are driven by a provided Data View. This gives you the power to use the block in many different ways. You may implement it to show *All Members and Attendees* (which is the default) or perhaps limit it to group leaders, or youth. The sky's the limit. |
| Opt-out Group | The block allows people to opt out of being shown in the directory. This setting allows you to configure the group that will hold those who wish to opt-out. |
| Show By | Here you have the option to show the results as individuals or as families. |
| Show All People | This setting determines if all people should be displayed when the page is loaded or if the person viewing the page will need to first search to find the results. |
| Person Profile Page | Adding a page to this field will change people’s names into links when viewing the directory search results. Clicking a person’s name will then take you to the specified page. |
| First Name Characters Required | This setting determines the minimum number of characters that need to be entered in the *First Name* field for searching. These types of limits are helpful if you'd like people to be able to find people but not be able to see or print the entire list. |
| Last Name Characters Required | Like the first name setting, but for the last name. |
| Show Email | This setting determines whether the email field should be displayed. |
| Show Address | This setting determines whether the address field should be displayed. |
| Show Phones | This setting determines which phone types should be displayed. |
| Show Birthday | Determines if the birthdate field should be shown. If shown, only the month/day will be displayed. |
| Show Gender | This setting determines whether the gender field should be shown. |
| Show Grade | This setting determines whether the grade field should be shown. |
| Show Envelope Number | If applicable (see [Rock Solid Finances](https://community.rockrms.com/documentation/bookcontent/15#givingenvelopes)) you can select to have a person’s envelope number shown. |
| Max Results | You can limit the max number of results to display with this setting. This keeps your server from crashing if you have hundreds of thousands of records. |

  

So, there you have it. Once you consider all the features of this block, we're sure you'll be using it all over your sites.


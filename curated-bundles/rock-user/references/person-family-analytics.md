---
description: "Use when understanding Rock's person and family analytics tools, eRA (Estimated Regular Attender) calculations, and engagement metrics for tracking member involvement"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Person & Family Analytics

Person & Family Analytics

An important role for leaders is to care for and support the people who engage with their organization. As an organization grows this can become a difficult task as you may lose track of many of the details that make your larger organization feel small. Rock’s person and family analytics tools help summarize all these details and provide predictive alerts when certain key behaviors change.

These tools provide a very clear picture of a family’s involvement. As you’ll see, this opens the door to some incredible opportunities for your organization. It can also, if not guarded, be somewhat creepy. Most tools in life can be used as a weapon (think of a hammer). We know we don’t need to say this but be careful that these tools aren’t used as a weapon. There… that’s done… let’s jump in!

# Well, Almost Done...

You'll note that in several places we use the icon to represent these analytic tools. Just another subtle reminder that these tools are a guardian for good.

# eRA – Estimated Regular Attender

Wouldn’t you love to know each and every one of your regular attenders? Get a reminder every time a new one showed up and another when someone left? Well, without divine intervention, that’s just not possible today. With all the data in Rock, though, we can make a decent prediction of a regular attender. This is what we call eRA (no… not Earned Run Average… Estimated Regular Attender).

## Recipe for an eRA

The key data points for calculating an eRA are giving and attendance. Neither is treated as more important, as each is a good reflection of activity. While researching the best algorithm, we tried to have a bias toward the speed of detection without having too many false positives. The result should determine a regular attender within four months of the first activity.

There are actually two recipes for determining an eRA. The first determines how one becomes (enters) an eRA, the other determines how one exits from being an eRA.

**Criteria for Becoming an eRA**

- Have given at least four times in 12 months, once being in the last six weeks
- (or) have attended at least eight times in the last 16 weeks

Keep in mind that every giving transaction counts toward eRA. So, if a person gave twice last Sunday and twice this Sunday, that counts as four transactions and the person will become an eRA.

# Families and eRA

If a person meets either of the criteria above then the eRA status is applied to all Active family members, including children.

**Criteria for Exiting an eRA:**

- Haven't given in over eight weeks
- (and) have attended less than eight times in the last 16 weeks
- (and) haven't attended at all in the last four weeks

# Inactive Records

Inactive family members will not receive an eRA status. However, making a person Inactive after they have been established as an eRA will not immediately remove their eRA status. The same “exiting” rules apply as described above.

You might be thinking, "Those are a great start, a little tweaking for our organization and we'll be set." Another goal of the eRA metric is to have a well-defined measure that churches can use to help benchmark. Because of this, we don't allow the recipe to be configured.

If you're not sure why standard benchmarks are needed, let’s use an example. If you ask a church what their attendance is, the need for standard benchmarks becomes clear. Without asking at least four qualifying questions (is that just weekend services, does it include volunteers, etc.) you won't know what this number really represents. For that reason, and to establish that well-defined measure, when calculating eRA Rock looks at the attendance for groups whose attendance counts as 'Weekend Service'.

# What's This About "Weekend Service"?

You may be wondering what counts as "Attendance" when it comes to Family Analytics. This is determined by the *Weekend Service* setting on any Group Type used for check-in. Out of the box, Rock ships with the Kids/Youth and Serving Team Group Types configured with the *Weekend Service* option enabled.

If you have another Group Type you wish to count as "attendance at a Weekend Service" (and thus, count towards Family Analytics) go to Admin Tools \> Settings \> General \> Group Types and edit the desired Group Type to enable Weekend Service under the Attendance/Check-in tab.

# Viewing the Analytics

## Person Profile Page

Most of the information will be viewed on the person's *Profile Page*, specifically the *Extended Attributes* tab. Let's take a look.

![](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/analytics-attributes.png)

Analytics Attributes

# Security

By default, all these values are viewable by the RSR - Staff Workers and RSR - Staff Like Workers. You can adjust the security of each of these attributes under Admin Tools \> Settings \> General \> Person Attributes.

# eRA Badge

The state of the person's eRA can also be seen on the badge bar. The eRA badge has three states.

![](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/era-badges.png)

eRA Badge

- **Is eRA:** The person currently is an eRA
- **Was Recently eRA:** Was an eRA but exited the eRA criteria in the last 30 days.
- **Is Not eRA:** Does not meet the eRA criteria. This badge is simply blank.

# eRA History

It's possible that a family can start and stop being an eRA multiple times. To help you see this type of activity we log each time a person enters and exits the eRA status on their history (Person Profile \> History Tab).

# eRA Workflows

Would it concern you if someone who has had regular activity in the past suddenly becomes irregular? Of course it would! You’d probably want to be notified or send them a communication, right? Well, we’ve thought of that for you. The *Family Analytics* job can be configured to launch a new workflow (you’ll still need to create the workflow) anytime a family enters or exits from being an eRA. To help simplify your workflow, the job will pass in the following information:

| Attribute Key | Attribute Type | Description |
| --- | --- | --- |
| Family | Group | This is a reference to the family group who has entered or exited. |
| HeadOfHouse | Person | The head of the household of the family. |
| Spouse | Person | The spouse of the family (could be empty). |
| Campus | Campus | The home campus of the family. |

A couple of things to think about as you configure your workflow:

- If the family doesn't have any adults configured, no workflow will be launched.
- Remember the "e" in eRA stands for *Estimated*. It's not perfect. If you have a communication as a part of your workflow, be sure not to make any assumptions. It's possible that they are still attending but are not giving or having kids check in. Try to make the tone of your communications more of a "Just checking in…" instead of "We miss you…"

See our [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide for more information on workflows.

# Calculating the Analytics

All these measures rely on the *Family Analytics* job to be enabled and scheduled to run regularly. This job is available for you out of the box but isn’t automatically enabled. To enable it, simply go to Admin Tools \> Settings \> System \> Jobs Administration. From there you can select the *Family Analytics* job and activate it. You'll also want to consider when and how often it's set to run.

The job can also be configured to launch workflows when a family enters or exits the eRA status. See the [eRA Workflows](#eraworkflows) section for more information on these settings.

Let's look at all the settings of this job in detail.

![Family Analytics Job](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/era-job-v18.png)

Family Analytics Job

The logic for setting *Visit Dates* is fairly complex as it doesn't only look at attendance. The job also considers when the person's record was created. This prevents the system from adding a date to a record that has been around for a while. This could happen when adults who have attended for some time check in a new child for the first time. So, the first *Visit Dates* is only calculated if it's within 14 days of the person's record being created.

Visit Dates are based on *Weekend Service* check-in records for all family members. For adults, *Rock* combines their own check-ins with those of their children to measure overall family engagement, while a child’s Visit Dates are calculated only from their own *Weekend Service* check-ins.


---

## Managing Known Relationships {#managing-known-relationships}

> **Path:** Person & Family Field Guide > Managing Known Relationships

Managing Known Relationships

Known relationships are a great way to pattern real-world relationships in your database. While Rock comes with several relationship types already configured (Grandparent, Invited By, etc.), you can create new relationships as needed.

# Creating A New Relationship Type

Known relationships actually use groups to store their values. Each person in the database has a hidden group that contains all of the individuals with whom the person has a relationship. When you configure known relationships, you’re really configuring the *Known Relationship* group type.

To add a new relationship type, follow these steps:

1. Navigate to the *Group Types* editor Admin Tools \> Settings \> General \> Group Types and select the *Known Relationship* group type.
2. Open the *Roles* section and add the new relationship role.
3. Save the group type
4. **Optional:** If your relationship has an inverse relationship (grandparent <\-\> grandchild), you can automate the creation of the inverse relationship by editing the role you created and selecting the inverse relationship. In order to pick the inverse, you must first create the relationship roles and save the group type. Then you can go back and edit the inverse types.

When adding a new relationship, you can decide if this type of relationship should allow an individual to check-in the other. For instance, you may decide that grandparents should be allowed to check in their grandchildren.


---

## School Grades {#school-grades}

> **Path:** Person & Family Field Guide > School Grades

School Grades

Rock provides a customizable system for determining the grade or year of an individual's education and automating promotion from one grade to the next. For most organizations in the US, the out-of-the-box configuration should meet all their needs. For international organizations or those in locales where customization is required, it's easy to adjust the system.

When adjusting the grades, the first thing to keep in mind is that Rock only stores the year that someone graduates from the educational system. In the US, that's their high school graduation. Rock dynamically calculates a person's grade by:

1. Comparing the current date to their graduation year which provides an offset in years. Rock also uses the *Grade Transition Date* Global Attribute to help determine the start of the school year.

3. The year offset from step 1 is then compared with the grades in the *School Grades* defined type. The first Defined Value (grade) whose value is greater than or equal to the offset is selected. For systems that have one grade for each year, this is a simple setup. The last grade (senior year in the US) would have a value of 0, the next (junior) a value of 1, etc. For systems where a grade spans multiple years, you would "skip" years. For example, to have a *Middle School* grade level instead of separate 7th and 8th grades, you would set the *Value* of *Middle School* to 5, and the next higher grade level (Freshman) to 3.

When adding a new person to the system you're asked to provide their grade. The person’s graduation year is initially determined by the grade provided, using the reverse of the above logic.

Knowing that not every system uses the term *Grade*, Rock allows you to configure the term that’s used by editing the *Grade Label* global attribute under Admin Tools \> Settings \> General \> Global Attributes. So, if you’re more familiar with “year” or “level” it’s easy to adjust accordingly.


---

## Bulk Updates {#bulk-updates}

> **Path:** Person & Family Field Guide > Bulk Updates

Bulk Updates

Sometimes you have to update a little bit of data. Sometimes you need to update a lot. When you find yourself in the latter situation, you'll want to use Rock’s bulk update capabilities. Bulk update is used to make changes to large populations all at once, instead of making the same change repeatedly one person at a time.

You may have noticed the icon at the top and bottom of table grids that list people. Selecting people on the grid and pressing the icon will take you to the *Bulk Update* page.

![](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/bulk-select-v18.png)

Select Individuals for Bulk Updates

# Power Tip

If you would like to select all the individuals, even those on previous/next pages, you can leave selection blank (don't select anyone) and press the bulk update button. This adds everyone in the grid to the *Bulk Update* page.

Once on the *Bulk Update* page, you can select various data points to update. You must first select the data item you wish to update by clicking the icon next to the item.

![Bulk update screen for managing multiple people, including details like groups, tags, and steps.](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/Bulk-Update-Block-v18.png)

Performing Bulk Update

Once you've made your updates, click the Next button and you'll be shown a summary of your changes. If everything looks good, click Confirm and your changes will be applied.

![](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/bulk-update-confirm-v18.png)

Bulk Update Confirm


---

## Person Profile Editor {#person-profile-editor}

> **Path:** Person & Family Field Guide > Person Profile Editor

Person Profile Editor

The *Person Profile Editor* is an external page that's dedicated to allowing individuals to update their own information. You can find this page on the external website by selecting My Account from the *Login Status* block. You'll notice that individuals are able to edit their details at the top of the page. They can also update each of the individuals in their family.

![](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/person-profile-external-v12.png)

Person Profile Editor

There are several block settings that you should be aware of for this block. Some of them include:

- **Show Family Members:** This determines whether the block should allow viewing and editing of the family members.
  
- **Address Type:** The type of address that should be displayed for viewing and editing.
  
- **Phone Types:** The type of phone numbers to show for viewing and editing.
  
- **Workflow Launch Page:** This block can be configured to show a button labeled Request Additional Changes. When this button is clicked, it will navigate to the page provided to launch the workflow.
  
- **Family Attributes:** The family attributes you would like to configure for viewing and editing.
  
- **Person Attributes (Adults):** The person attributes you would like to configure for viewing and editing for adults in the family.
  
- **Person Attributes (Children):** The person attributes you would like to configure for viewing and editing for children in the family.
  
- **Require Gender:** If this is set to 'No' then the *Gender* field will still be required, but an additional option of 'Unknown' will be made available.
  
- **View Template:** The power of [Lava](https://community.rockrms.com/Lava) is at your disposal. With this block setting you can use a Lava template to control the view mode of the page.

These are only some of the options. Again, we strongly encourage you to review all the settings for this block to ensure it's meeting your needs.


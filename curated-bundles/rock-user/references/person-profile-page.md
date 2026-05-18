---
description: "Use when users need to understand the Person Profile page layout, find contact information, view demographic details, or manage person bio data in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Person Profile Page

Person Profile Page

The *Person Profile* page is by far the most used and powerful page in Rock. This one page gives you a detailed picture of a person's involvement in your organization and the relationships between people.

![Person Profile Page](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-page-v18.png)

Person Profile Page

The page can be broken down into four main areas, which we'll discuss in detail below.

# Person Bio

The *Person Bio* gives you details and contact information about the individual. Here's a breakdown of this section.

Bio Section

![Bio Section](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-bio-section-v18.png)

1 Photo

If a photo is available, it's shown here. If no photo is available, a gender/age appropriate silhouette image is shown.

2 Labels

Labels are a quick way of categorizing a person's involvement. After installation the following labels will be active on the page, but you can add custom labels.
- **Connection Status:** Member, Attendee, Visitor, Participant, Pending.
- **Campus:** Which campus the member's family attends. This label isn't shown if you only have one campus.
- **Record Status:** This label is only shown if the record is *Inactive* (i.e., they are no longer attending).
- **Account Protection Profile:** The small padlock icon below the profile picture references the person's [Account Protection Profile](#accountprotectionprofiles) level. You can control who can see this by editing the block's security.

# Edit Security

If you’d like to control who can view the account protection profile you can do so by editing the block's security. Here you’ll have the ability to allow or deny access to all users using the View Protection Profile. This allows you to protect the users Login, Finances and Staff Role Status.

3 Demographic Information

This includes age, gender and marital status.

4 Contact Information

This section contains phone numbers and the person's email address. Note that if the phone number has SMS enabled, you'll see a speech bubble icon. Also, if this page is loaded on a mobile device, the phone numbers will appear as links to enable 'Click-To-Call'.

5 Email Address

Clicking the email address will launch a new communication to the individual. You may also see icons next to the address noting the individual's email preferences. If they have asked not to receive bulk emails, you'll see a . If they have asked not to receive any emails the address will not be a link and the icon will be displayed.

6 Actions

The action list allows you to launch workflows for the individual. See the [Blasting Off With Workflows](https://community.rockrms.com/documentation/BookContent/12#personprofileactions) manual for details on creating custom actions for your organization. More details on the *Photo Request* action can be found in the *[Photo Requests](#photorequests)* section below. This list is also where you can download a person's vCard, or virtual business card, to store on another device, such as the contacts on your cell phone. Rock automatically generates a person's vCard based on the contact information provided on their profile.

7 Edit Link

The edit button allows you to edit the person's personal and contact information and gives you the advanced option of combining their giving with another person's. In the Edit Person block, there is an setting that allows you to set a person's SMS opt-in preferences. This drop down determines if the SMS checkbox should be automatically checked when a new mobile phone number is entered. Please make sure your organization has consent to send SMS messages when making this change.

8 Social Media Icons

The icons of any social media accounts that have been configured in the person attributes and completed for the individual will appear below the photo. For more information about configuring and editing a person's social media information, see the [Extended Attributes Tab](#extendedattributestab) section below.

# Note About Emails and SMS Phone Numbers

You are limited to entering only a single email and SMS phone number for an individual.

# Extending the Person Bio

There are a lot of options available in the *Person Bio* block settings that allow you to customize the *Person Profile* page. For example, you can use the *Additional Custom Actions* field to add buttons, link to workflows or add personalized content, or the *Custom Content* field to add almost any content you wish that is not in the core Bio block.

NOTE: When using the *Custom Content* area, you need special "context" syntax. For example, to display a Person Attribute here, you would use `{{ Context.Person | Attribute:'AttributeKey' }}`

The possibilities are endless. Be sure to explore these powerful options and consider how you might use them to create a unique profile page that meets the needs of your organization.

# Badge Bar

The next section is what we call the *Badge Bar*, with icons (i.e., badges) indicating a person's activity. While Rock comes preconfigured with several badges, you can add more. For more information on badges, including how to create new ones, see the [Badges](#badges) chapter below.

![Badges of the Badge Bar](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-badge-bar-v18.png)

Badge Bar

# Family Section

The next section outlines the individual's family or families. The *Family Section* lists each family member's name, age and *Person Profile* page link, along with an address and editing link for each family.

![Family Section](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-family-section-v18.png)

Family Section

The address section of the family area has a couple of interesting features. Clicking on the to the left of the address will bring up an interactive map. Also, when you roll over the address a will appear to the right. This icon will standardize and geocode the address when clicked. Lastly, you can click the icon to edit the address and its configuration.

# Note

In Rock, an individual can be in more than one family. In these cases, both families will be shown in the family section. Behind the scenes one family is classified as the [Primary Family](#primaryfamily), but for the most part each family is treated as an equal.

# Tabs Bar

The lower area of the page is devoted to subsections, with tabs that are visible according to your security level. We'll talk about each one below.

![Subsections Bar - Person Profile](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-subsections-bar-v18.png)

Subsections Bar - Person Profile

# Peer Networks

The *Peer Networks* feature provides a method to measure the relationship between two people in your database. Think about the connections we make in life. You sit in a small group with someone, sharing stories and prayers. Years later, you run into them at a coffee shop, and it's like no time has passed--you pick up right where you left off. *Peer Networks* understand how relationships grow and decay, supplying you with a number that reflects the relationship two members share.

Head to any *Person Profile* page. If this person has ties with others through a Follow or their groups, the *Peer Networks* block will display those relationships. These connections, like bread dough, grow over time when nurtured, rising. When ignored, they fade, returning to their original, flat state.

![Peer Networks Person Profile](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-peer-networks-v18.png)

Person Profile Peer Networks Block

Trendlines indicate the direction a relationship is heading. If you are in a group that has *Enable Relationship Growth Over Time* checked, your relationship score with members will rise over time . If you recently left a long-term commitment to a group, the relationship score will decay over time . If the connection is through a follow, the trend will be flat .

The *Peer Graph* maps relationships in a network-style view, showing how a person is linked to others across different groups.

![Peer Graph](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/peer-graph-v18.png)

Peer Graph

# Dynamic Graph

If you want a closer view, try ctrl+scroll on the peer map.

## When Peer Networks Bring Great Value:

- Launching a mentorship program? Pair mentees with mentors they already know and trust.
- Messaging a volunteer after a tragedy? Have the staff member who knows them best make contact.
- Hiring a new team member? Consult with those who know the applicant well..

# When should I enable Peer Networks?

Attending the same conference as a peer doesn't guarantee a shared conversation. When group participation doesn't correlate to personal connection, the *Peer Networks* feature may indicate a false connection. Not all groups benefit from enabling *Peer Networks*. More on configuring relationships later.

## Enabling Peer Networks in Groups

Settings \> General \> Group Types

![Peer Network Group Type Detail](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/peer-network-detail-v18.png)

Peer Network Group Type Detail

Once your *Group Type* settings have been configured, overriding the score for a single Group is easy. Go to People\>Group Viewer and Edit

![Override Relationship Strength](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/group-viewer-peer-networks-v18.png)

Group Viewer Peer Networks

Some groups naturally foster deeper connections. For example, an accountability group requires strong bonds (select "Deep" relationship strength). On the other hand, an online prayer group may not create close relationships (select "Casual" or "None"). If a group's connection differs from its default *Group Type* settings, you can override its relationship strength.

# Leaving a Group

In the top right of the Group Viewer, notes when Relationship Strength has been overridden. indicates when Enable Relationship Growth is on.

## Peer Networks Score Calculation

You might be wondering, *"A score for relationships? How does that work?"*. Don't worry—we’re taking you behind the scenes to show you exactly how this score is calculated.

### Simple Explanation:

- Attending the same Bible Study? Your score goes up the longer you're in a group.
- Following a friend? Up, but the score doesn't increase over time.
- Left a group? Down.

# Leaving a Group

Relationship scores don’t disappear the moment someone leaves a group. Think of it like a star player leaving your favorite sports team—your memories of them don’t vanish overnight, and neither do their relationship scores.

### Nerdy Explanation:

Were you looking for a bit more math, less words? The full breakdown on how relationships are scored is below.

#### Relationship Strength Base Scores

- None = 0, Casual = 5, Close = 10, Deep = 20
- Adjusted by *Connection Score* table position (e.g., if a 'Close' relationship score is weighted at 50% in the table, it becomes 5 points)
- Following a friend = 5 points (score does not change over time)

#### Growth & Decay

- Relationship scores naturally grow over time if maintained (+10% per month), it declines rapidly (-20% per month) until it disappears. Once a score reaches 0 the relationship is removed from your *Peer Network* list. It is recalculated once a month, on the first day of the month.
- *Peer Networks* Formula: Base Score x (1+(Growth/Decay Percentage))^month

### Relationship Score Table

Group dynamics determine how often different roles interact. Some roles connect frequently, while others rarely engage. In this table model, a 100% connection means constant interaction, while 0% means none.

For example, in a large greeting team, leaders may not interact with each other (0%) but occasionally connect with their team members (50%). On the security team, non-leaders often work alone but take direction from leaders. As a result, their connection with other non-leaders is non-existent (0%), while their interaction with leaders is common (100%).

![Connection Score Table](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/connection-score-table-v17.png)

Connection Score Table

#### Interaction Levels

1. **Leader to Leader:** How often group leaders connect.
2. **Leader to Non-Leader:** How much leaders interact with their teams..
3. **Non-Leader to Leader:** How often a non-leader engages with a leader.
4. **Non-Leader to Non-Leader:** Host often non-leaders interact with each other.

# Default Table Numbers

Many group types don't require a change to their table numbers. If each member works hand in hand, the default settings will do.

### Exclude Group Roles From Peer Networks

If a group has a role such as administrator, someone who neither leads nor participates in group operations, they can be excluded from *Peer Networks* calculation. To remove a role from calculation, enable *Exclude from Peer Network* when editing a role in Settings \> General \> Group Types under the Roles section.

![Exclude Group Roles From Peer Networks](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/group-role-peer-networks-v18.png)

Group Viewer Peer Networks

# Peer Networks Calculation Job

In Admin Tools \> Settings \> Jobs Administration the Scheduled Job *Calculate Peer Network* runs once a month, on the first day of the month. If you're feeling impatient, refresh the connection sooner by clicking the button.

# Person Profile Tab

The first tab is the *Person Profile*, with notes and key attributes. Let's break each of these areas down.

## Timeline

The Timeline shows notes about a person, some of which are system-generated whenever the individual completes certain actions like joining a group. Most of them, however, are entered by staff and key volunteers. Notes are an important part of Rock and we've devoted an [entire chapter](#personnotes) to their usage below.

## Bookmarked Attributes

As we discussed earlier, person attributes are an important part of Rock. Over time, your list of attributes will grow according to your organization’s needs. Each staff member, however, only works with a limited set of attributes, depending on their position. To help simplify this, we’ve added a Bookmarked Attributes section. Each staff member can choose a list of person attributes they want to display in this box. Every time they visit a *Person Profile* page, their chosen attributes will be displayed.

You can configure which attributes are displayed in this section by selecting the button in the header. You can also edit the values of the attributes by clicking the button. Each person can adjust the order of the attributes on their bookmark list by clicking the button, then dragging the attributes into the desired order.

## Connection Requests

This section shows a list of Connection Requests that have been made by the individual. This block’s settings let you change the detail page that’s viewed when a request is clicked, and lets you hide Connection Requests in specified States. You can read more about Connection Requests in the [Engagement](https://community.rockrms.com/documentation/bookcontent/39#connections) manual.

## Known Relationships

Just like in real life, relationships describe connections between two people. Some of the known relationship types provided are:

- Grandparent
- Parent
- Child
- Invited by
- Allow check-in by

To add a new relationship, click the button on the *Known Relationships* header. Select the relationship type you want to add from the dropdown, then select the person who matches the relationship you're trying to build.

Many of these relationships have an inverse relationship (e.g., Grandparent to Grandchild). When adding one of these relationships, the system will automatically add the inverse relationship for you. What a timesaver!

You can add custom relationship types if you want. In fact, we have a [whole chapter](#managingknownrelationships) on how to manage known relationships.

## Peer Networks

Some relationships are known, but others are implied through the data. For example, if two people are in the same group, we can imply a relationship. Rock highlights these kinds of relationships in the Peer Networks area.

# Note

The Peer Networks feature will get more powerful with time as we add more and more capabilities to Rock.

# Extended Attributes Tab

The next subsection of the *Person Profile* page contains all the added attributes, grouped by category. Only attributes with values are displayed. To add or edit the value of an attribute, just click the button in the category header.

![Extended Attributes Subsection](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-extended-attributes-v18.png)

Extended Attributes Subsection

## Social Media

The *Social Media* category is where you can enter and view social media account information for a person. By default, Facebook, Twitter, Instagram and Snapchat are included, but you can add other social media platforms by creating new *Person Attributes* in the *Person Attributes* screen with the *Social Media Account* field type. The *Person Attributes* screen is located at:  
Admin Tools \> Settings \> General \> Person Attributes.

Any *Person Attribute* using the *Social Media Account* field type will be displayed as an option in this category, and the icon of any social media options completed for the person will appear below the person's photo in the *Bio Bar*. The *Person Attributes* screen also contains options that allow you to control what the icons look like and how they are displayed.

As you create new groups of person attributes, you'll want to be sure you keep this page updated. See your administrator for help.

# Steps Tab

The *Steps* subsection lets you view and manage steps for the person. For full details on Steps, check out our [Engagement](https://community.rockrms.com/documentation/bookcontent/39#firststepsforsteps) guide.

![Steps](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-steps-v18.png)

Steps Subsection

# Groups Tab

The *Groups* subsection displays a timeline of the person's history with groups, as well as a grid view of all the groups the person is involved with. The grid lists important facts like the type of group, the individual's role in the group and the date they were added to the group.

![Groups](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-groups-v18.png)

Groups Subsection

## Schedule Toolbox

The schedule toolbox is used to update and display information that intertwines with the group scheduler. Each person will have their confirmed and requested schedule, their preferences and a sign up button.

Schedule Toolbox - My Schedule

![Schedule Toolbox - My Schedule](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-schedule-toolbox-v18.png)

This area shows the person's confirmed and requested schedule. This same information can also be seen if that person is signed in on the external site under My Account \> Schedule Toolbox.

Schedule Toolbox - Preferences

![Schedule Toolbox - Preferences](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-schedule-toolbox-preferences-v18.png)

An internal staff member can set a person’s schedule preferences, or the person can set their own preferences and sign up for events using the *Sign Up* tab from the external website.

Learn more about the group schedule toolbox and group scheduling in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#groupscheduling) guide.

# Documents Tab

The *Documents* tab lets you view and manage person documents.

![Person Profile Documents Tab](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-documents-v18.png)

Person Profile Documents Tab

At the top of the panel pictured above you can see a summary of the documents associated with the person. At the bottom is a list of all the signature documents associated with the person. For details on signature documents, check out the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#electronicsignatures). For now, let's focus on the Documents block.

For each document in the Documents block, the icons to the right allow you to view the document’s description as well as download, secure or delete the document. Some types of documents (PDF, PNG, JPG or GIF) can also be viewed directly from the browser. Click on any row to manage details about the document or click the button to add a new document.

![Person Profile Add New Document](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-add-new-document-v18.png)

Person Profile Add New Document

# Entity Documents

Documents can be added to any entity, not just people. To see how documents can be used with other entity types, see the [Entity Documents](https://community.rockrms.com/documentation/bookcontent/9#entitydocuments) section of the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/).

# Contributions Tab

This subsection shows the contributions made by the individual (or family, if combined as a family) and any repeating giving profiles that they have. Staff members can be granted access to create new recurring giving profiles or edit existing ones from this page. The [Giving Overview](https://community.rockrms.com/documentation/bookcontent/15#givingoverview) section provides details and analysis of the person's giving.

![Contributions](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-contributions-v18.png)

Contributions Subsection

# Benevolence Tab

Those with access to view benevolence information will see a *Benevolence* tab on the *Person Profile* page. The requests shown here are summarized for the entire family.

![Benevolence Tab](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-benevolence-v18.png)

Benevolence Tab

For additional details related to benevolence, see the [Rock Solid Finances](https://community.rockrms.com/documentation/bookcontent/15#benevolence) guide.

# Security Tab

Rock takes security very seriously and offers several ways to protect both information and people. The *Security* tab is one location where you can view and access Rock's security settings and data.

![Security](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-security-tab-v18.png)

Security Subsection

## Signals

Signals are discreet flags that can be assigned to a person to bring attention to something. They can be used to flag anything from security concerns to high-level lay leads and everything in between. Click the button to add a new signal. Click the button to delete an existing one.

## Security Roles

In the *Security Roles* section, you can view, add and delete the person’s security roles. The [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#securingrock) has all the details you’ll need for understanding these roles and their meanings.

## User Account List

Each account (i.e., username) associated with a person is listed here. Over time a person can obtain multiple accounts if they forget one and re-register on the website. You can manage accounts in this section.

For more information on user accounts and logging in, check out the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#userloginuseraccounts).

## Profile Viewed By

The *Profile Viewed By* section contains a record of people who have viewed this person's profile. The information in this section can't be modified, but it can be exported into an Excel report if needed.

## Profiles Viewed

The *Profiles Viewed* section contains a record of the profiles this person has viewed. The information in this section can't be modified, but it can be exported into an Excel report if needed.

# History Tab

The *History* tab includes such things as:

- **Communication History** - A list of all the communications of any type that have been sent to the individual, with full details of each communication available to view.
- **Attendance History** - A list of all the events and services the person has attended.
- **Person History** - A list of all the changes that have been made on the individual's record, including Connection Request and Steps updates. This area is helpful for identifying what was changed and who made the changes.
- **Assessment History** - A history of assessments that have been taken and/or requested.
- **Login History** - A list of recent login attempts, showing whether each was successful or failed. This helps troubleshoot login issues more efficiently.
![History](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-login-history-v18.png)

History Subsection

  

Don't forget, you can easily switch between family members. When you scroll down on any of the pages described above, you'll notice a drop-down menu near the top left of the screen where you can select other family members to view.

![Select Family Member](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-profile-switch-family-member-v18.png)

Select Family Member


---

## Editing an Individual {#editing-an-individual}

> **Path:** Person & Family Field Guide > Editing an Individual

Editing an Individual

To edit the bio and contact information for an individual, click the button in the upper-right corner of the *Person Profile* page. Rock will display the edit screen for that person's profile.

![Edit An Individual](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/edit-person-v18.png)

Edit An Individual

Most of this screen should be pretty simple, but we have a few helpful tips to share.

When you mark an individual *Inactive*, you’ll be asked to provide a Reason and a Note. This information helps the organization understand why groups of people are leaving and it helps the next person who looks at the record understand why this change was made.

Near the top of the screen, you'll notice a warning indicating that changes to this record should be made with caution. This is due to the person's account protection profile level. You can control who can see this warning by editing the block's security settings.

Near the bottom of the screen is the *Alternate Identifiers* section, where you can assign an individual an alternate identifier to use during check-in to speed up the process. Alternate identifiers may include barcode or fingerprint IDs, or any other text you care to use. The [Checking-out Check-in](https://community.rockrms.com/documentation/bookcontent/10#barcodecheckin) manual has more information about this process.

# Before Now

In previous versions of Rock, these identifiers were assigned at the family level. Now they are assigned to individuals, and any previous identifiers you may have created have been moved to the family's "head of household", which is typically the oldest male. Rock runs a job every night to find anyone who hasn’t been assigned an Alternate Identifier and assigns them one. So, you can count on the fact that everyone in Rock will have at least one alternate identifier within a day of when their record is created. You can create any number of alternate identifiers, and you can [use Lava](https://community.rockrms.com/lava/filters/person-filters#personbypersonalternateid) to look up a person record by any of their alternate IDs, so you can do all kinds of fun things with them!

In the *Advanced Settings* section, you'll find the *Combine Giving With* field. This helps describe how the individual would like their contributions tracked. In most cases individuals would like to have the contributions tracked as a family (the default option). If someone wants contributions to be tracked separately, just select the blank option.

Here you'll also see an option to *Lock as Child*. This overrides the automated process of updating a person to an adult when they turn 18. By default, individuals in Rock are considered adults when they turn 18 or are designated an adult in a family. The *Lock as Child* option may be useful for situations where, although an individual is 18, it's best for Rock to continue to consider them a child in a family. This setting will also keep the "Move Adult Children" part of the [Data Automation job](https://community.rockrms.com/documentation/bookcontent/9#dataautomation) from reclassifying them within their family automatically.

Finally, there's a *Search Keys* section you'll want to note. Rock is configured to support additional email addresses in this area. These could be outdated email addresses or simply alternate email addresses. Rock will consider these alternate email addresses when looking for matching person records but will **not** use these alternate addresses for communications. This helps prevent some duplicate records from getting created.


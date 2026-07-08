---
description: "Use when user asks about Rock badges, badge types, badge configuration, or how to summarize person information visually in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Badges

Badges are one of Rock’s most exciting features. As you add more and more information into Rock, you can quickly become overwhelmed with the amount of data you collect on a person. Badges allow you to summarize key points of information in a graphical way. This allows you to quickly scan the page and familiarize yourself with the individual.

Badges come in two forms: an iconic badge that shows in the *Badges* block and a label badge that shows in the *Person Bio* area. While they look very different, they share the same configuration and settings.

# Note

There may be some confusion about when to add a label to the *Person Bio* area and when to add a new badge. We suggest that if you're categorizing a person into general groups that you use a label in the bio section. If you're describing a person’s activity or achievements, then consider a new badge.

Let’s look at the badges that come pre-configured and the steps to add your own new badges.

# Pre-configured Badge Types

Rock comes with several badge types pre-configured and ready for you to use. That said, be sure to see the [Defining a New Badge](#defininganewbadge) section below to learn how to set the badges up and add them to a person's profile. While some of these badges are pre-installed and already visible for you when you first log into Rock, other badges exist as a badge *type* and will require you to configure and add them before they are visible.

## Alert Note Badge

![Alert Note](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-alert-note-v14.png)

Alert Note Badge

This badge displays when a note for the person exists that's marked *Is Alert*. This is helpful when you want to highlight at the top of the page that an important note should be read below. This badge has the following settings:

- **Note Types** - Determines which note types to consider as alerts
- **Badge Content** - The HTML to display when an alert note exists

## Assessments

![Assessments Badge](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-assessments-v9.png)

Assessments Badge

This badge displays assessment information. The individual icons within the badge will be filled in with color if the assessment has been taken. You can hover over the badge to see a summary of results, from the following assessments:

- **Conflict Theme**
- **EQ Self Aware**
- **Motivators**
- **DISC**
- **Spiritual Gifts**

There's so much to know about assessments in Rock that we gave it its own book. Check out [Assessments](https://community.rockrms.com/documentation/bookcontent/37/) for all the details you'll need.

## Attending Duration

![Attending Duration](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-attending-duration.png)

Attending Duration Badge

The *Attending Duration* badge shows you how long the individual has been a part of the organization. Using the *First Visit* person attribute it calculates the time span that the person has been attending and then summarizes it by either weeks (if less than 8), months (if less than 24) or years. If the person has started attending in the last week it shows the value as *New*.

## Person Signal Type

![Person Signal Type Badge](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badges-person-signal-type.png)

Person Signal Type

The *Person Signal Type* badge shows how many and what type of Person Signal Types are assigned to an individual. To learn more about Person Signal Types, see the [Person Signal Types](#personsignaltypes) chapter below.

## Personal Devices

![Personal Devices](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-personal-devices.png)

Personal Devices

The *Personal Devices* badge shows how many devices have been detected for the individual. Clicking on the badge will take you to a screen where you can view all the devices linked to the individual. From there, you can select a specific device to view all the visits that device has made to your organization’s Wi-Fi network.

## 16 Week Attendance

![16 Week Attendance](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-16-week.png)

16 Week Attendance Badge

It’s often useful to measure how often a family attends. This information will be displayed on the *16 Week Attendance* badge. The top bold number is the number of times the family has engaged (e.g., checked in a child, served) in the last 16 weeks.

You'll find that the graph shifts a bit as you look at the various individuals in the family. On adult records the graph shows a summary of all the individuals in the family. A child's record shows just their check-in events.

## Family Attendance

![Family Attendance](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-family-attendance.png)

Family Attendance Badge

While the *16 Week Attendance* badge gives you a concrete metric, the *Family Attendance* badge gives you a wider picture of the attendance patterns over the last 24 months. With this chart, each bar represents one month. The taller the bar, the more often the family attended a weekend service that month. This chart gives you an excellent picture of the attendance trend.

The bar graph on an adult will aggregate attendance for the whole family, while child records will only show attendance for the specific child. However, the badge's configuration can be updated to show individual attendance for adults too.

## Baptism Badge

![Baptism Badge](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-baptism-v14.png)

Baptism Badge

The *Baptism Badge* shows if the individual has been baptized, using the *Baptism Date* person attribute. If the person has been baptized, the water droplet will be bright, and the rollover text will show the date of the baptism. If they haven’t been baptized yet, the droplet will be light.

## Serving Badge

![Serving Badge](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-serving-v14.png)

Serving Badge

Similar to the *Baptism Badge*, the *Serving Badge* shows if the person is a member of a serving team. If so, the clock is dark. Otherwise, it's light.

## eRA Badge

![](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/era-badges.png)

eRA Badge

This badge shows the eRA status of the current person. See the [Person And Family Analytics](#personfamilyanalytics) chapter for more information on this badge.

## Labels

![Badge Labels](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-labels-v14.png)

Badge Labels

Each label in the *Person Bio* area indicates a separate badge. These badges show:

- **Connected Status:** Shows the individual's connected status in green.
- **Campus:** Shows the individual’s campus in purple. This is hidden if only one campus exists.
- **Record Status:** This label only shows if the person is marked *Inactive*.

## Last Visit On Site

![Last Visit On Site](https://rockrms.blob.core.windows.net/documentation/Books/5/1.17.0/images/badge-last-on-site.png)

Last Visit on Site

The *Last Visit on Site* badge displays the number of days since a person's last visit to a selected site. If the person hasn't visited the site, it won't be displayed. The badge can be configured to link to a page that displays the visitor's sessions and pages that they visited. Rock comes installed with this badge configured for the external site.

## Defining a New Badge

You define new badges under Admin Tools \> Settings \> General \> Badges. Here you'll see a list of currently configured badges. You can also choose to create a new badge from this screen.

![Badge List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/badge-list-2-v18.png)

Badge List

![Add Badge](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/add-badge-v18.png)

Add Badge

When you add a badge you’ll provide it with a name, description, entity type and badge type. You can choose to associate the badge with any entity, like a person or a group. The entity type you choose will affect the badge type options available to you. Some badge types require additional configuration.

Let’s look at each badge type and how it can be used.

### Achievement

A badge of this type will be displayed when a person has earned the provided [Achievement Type](https://community.rockrms.com/documentation/bookcontent/39#achievements). The badge's icon will be the icon configured for the Achievement Type or will be a generic medal icon if the Achievement Type doesn't have an icon configured.

### Steps

This badge type allows you to display progress in a step program. You can choose which step program to display and the *Display Mode* (normal or condensed) for the badge icons. If you want to learn more about Steps badges, there’s a whole chapter for them in our [Engagement](https://community.rockrms.com/documentation/bookcontent/39#stepsbadges) manual.

### Assessment

This type of badge shows the results of assessments taken through Rock. This badge is pre-installed on person profiles out of the box.

### Streak Engagement

If you have any streak types set up, you can create badges for them. Badges of this type are somewhat similar to the family attendance badge. This is a great way to quickly and easily show Streak data (in the form of a bar graph) for a person on the *Person Profile* page.

### Giving

This badge type will show up when the person has given at least the amount you specify to specified accounts, within a specific date range. You get to use Lava to determine how the badge looks; by default, it's an icon type badge.

### Attended Group of Type

This badge type will show up when the person has attendance in a group of the type you specify, within a set date range. You get to use Lava to determine how the badge looks; by default, it displays the same icon as the group type uses.

### In Data View

This badge can be reused any time you have a Person based Data View that contains the people you want to badge. You provide a *Data View*, and it will show the badge if they are included in it. The icon that's used for the badge is whatever you wish because it comes from whatever HTML or Lava you put into the Badge Content setting. Note that the *Person* will be included into the Lava merge fields so you can use any property of the person in the display logic of your badge.

This badge type can also be used with *Groups* or other entities besides *Person*.

### Top Person Signal

A badge of this type will show the top signal that you have stored for the person whose profile you're viewing. Read more about signals [here](#personsignaltypes), but remember that signals are ranked. This badge will examine all the signals you have for a person and display the highest-ranked one.

The *Icon CSS Class* setting does not affect *Top Person Signal* badges. These badges always display the flag icon by design, regardless of custom CSS classes.

### Personal Device

A badge of this type will show how many devices are linked to the person and take you to the page you specify in the badge when it's clicked, so you can see their devices or interactions.

### Interaction in Range

A badge of this type will show how many interactions the person had with a specific channel, within a specific date range. When clicked, it will take you to the page you specify (usually the interactions page for the channel, but it could also be a report or another page you create) so you can get more information.

This is useful to see how many times someone visited your website in the last month, or how many communication interactions (received, opened, clicked, etc.) were seen from them in the last week.

### Geofenced By Group

The *Geofenced By Group* badge displays a label of the group name that has a geo-fence that the individual lives within.

### Alert Note

This badge type will show up when a type of note which you specify has been added to the entity and marked as "Alert".

### Attending Duration

Like the *Campus Badge*, the *Attending Duration* is fixed in nature and isn't meant to be re-used.

### Campus

The *Campus Badge* displays a label of the individual's current campus. There’s not much more it does, so it’s re-use is very limited. The *Campus Badge* isn't shown if you only have one campus in your system.

### Family Attendance

This badge drives the *24 Months of Attendance* chart. It also provides several settings to allow you to customize it. For instance, if you find the animation on the bars distracting, you can disable it. You can also change the duration from the default of 24 to whatever you wish.

### Family Weeks Attended In Duration

This badge powers the *16 Week Metric Badge*. It’s probably not that re-usable, but you can change the duration from 16 weeks to whatever value you desire.

### In Group Of Type

Unlike the others, this badge type was made to be used often. The *Serving Badge* uses this badge type. Here’s how it works. You provide a *Group Type*, and it will show the badge enabled if they are a member of a group of that type or disabled if they aren’t. The icon that’s used for the badge comes from the *Group Type's* "Icon CSS Class". You can also set the color of the icon.

You can use this badge for all types of groups (think Bible Studies, specific classes, etc.)

### In Group with Purpose

A badge of this type will show an icon if they are a member of a group with a specific purpose specified. Out of the box, the most likely purpose you could use this for would be "Serving Area", but since you can create any number of purposes, you can have a different badge for any of them. You don't even need to know Lava to configure badges of these types; just specify the icon and the color you want it to have.

### Last Visit on Site

This badge type drives the *Last Visit on Site* badge. The *Last Visit on Site* badge displays the number of days since a person's last visit to a selected site. It’s unlikely that this badge type can be repurposed for any other use, but you can choose which Site should be tracked and details of which pages were viewed.

### Lava Badge

The *Lava Badge* is the Swiss Army Knife of badges. This badge takes a Lava template and renders it to the screen. You can learn more about Lava [here](https://community.rockrms.com/Lava), but for now think of it as Microsoft Word’s mail merge feature for web development. The badge takes the data on the entity and merges it with your template.

Many of the label badges and the *Baptism Badge* use this badge type. Feel free to look at their templates to see how they work. You can develop some very powerful badges using this badge type.

# Note

As you create new badges, note the order they appear on the list. Badges will display in this order when you place them on the *Person Profile* page.

To learn more about styling badges in Rock, check out our [Rock Badges](https://community.rockrms.com/styling/components/badges) styling page.

## Adding Badges to The Person Profile Page

Once you've defined a new badge the next step is to add it to the *Person Profile* page. From this page click the button in the *Admin Toolbar*. This will display a block properties button for each block on a page. Hover over the badge block and select its button. Finally, select the badge you wish to add in the container you want to see it in (e.g., Top Left, Bottom Right), and press Save.

![Add Badge To Page](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/badge-add-to-page-v18.png)

Adding Badge to Person Profile Page

# Warning

As you can see, badges are a very powerful way to display useful data about an individual. There is such a thing as too much of a good thing. Adding too many badges can diminish their value by overwhelming the viewer.

## Viewing Badges Using Custom Security Roles

If you create a new security role that should be able to view badges, there's a little extra configuration you'll need to do for the badges to work properly. Without the right setup in place the person will be able to see the badge icons, but the icons won't light up as expected.

Navigate to Admin Tools \> Settings \> Security \> Rest Controllers \> Badges and click the icon to add the new role to each badge that the role should be able to view.

Also don't forget that the person will need permissions for viewing the parts that make up a badge. For instance, a person needs permission to view the Baptism Date attribute in order for the Baptism badge to appear properly. The person also needs permission to view the badge itself.


---

## Tags {#tags}

> **Path:** Person & Family Field Guide > Tags

If you’re familiar with tags in photo-sharing sites like Flickr or notes applications like Evernote, then you already understand how to use them in Rock. Tags offer a way to categorize people, content channels or any other entity type. You can literally tag anything. For the purposes of this manual, we'll be talking about tags as they relate to the Person entity. Maybe you want to label a person as a future volunteer for recruiting or maybe you’d like to tag active military personnel. While you could create a group, that approach might be a little too cumbersome if you simply want to use it as a label for a person, so you might consider a tag instead. This helps keep your list of groups to a minimum, making them easier to manage.

Tags are added to a person in the bio section of the Person Profile page. You can add a tag to a person by clicking the icon in the bottom-left portion of the badge block and typing in the name of a tag directly onto the page. To save the tag link, simply press enter (i.e., there is no “Save” button). If a tag already exists, it will be displayed in the auto-complete area. If you type a new tag, it will confirm that you wish to create a new tag before adding it.

# Your Tags vs. Our Tags

There are two types of tags in Rock, personal tags and organizational tags. Personal tags are only seen by the creator, while organizational tags are viewable by everyone in your organization. When you create new tags, they are created as personal tags by default, so they can only be seen by you (and your system administrator). Your administrator can promote personal tags to organizational tags upon request. When they are promoted, they keep all the people tagged, so it’s a good idea to get started with a personal tag.

# Tip

Instead of requesting a new organizational tag from your administrator and waiting for it to be added, consider creating a personal tag yourself and then requesting that it be promoted to an organizational tag.

# Viewing Tags

To view all the individuals in a specific tag, go to People \> Tags.

![Tags List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/tags-v18.png)

Tags List

The *Tag List* page displays all your tags with the option at the top to switch between personal and organizational tags. Clicking on a specific tag will display all the individuals in the selected tag. You can also manage the individuals within a specific tag by adding or removing them from the list here (as opposed to using the person profile for each person individually). If you want to filter tags even further, you can select a type from the *Type* dropdown menu near the top-right of the block.

# Administrating Tags

Tags can be managed by an administrator under Admin Tools \> Settings \> General \> Tags. The two most common reasons to administrate tags are to delete tags that no longer serve a purpose and to promote personal tags to organizational tags.

Administrators, or those with tagging rights, can also secure tags, limiting who can view them. Add security by clicking on the button in the tag's detail screen. This applies only to organizational tags, since personal tags are already limited to the tag creator and administrators by default. For more information about security settings, see the [Securing Rock](https://community.rockrms.com/documentation/bookcontent/9#securingrock) chapter of the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/).

# Tag Security

Some administrative tasks related to tags (like deleting them) operate off the security of the Entity. Be sure to set the entity security for tags (Admin Tools \> Settings \> Security \> Entity Administration \> Tag) to reflect your needs. Out of the box, the *Staff Workers* and *Staff Like Workers* have permissions to view, edit and delete tags.


---

## Person Signal Types {#person-signal-types}

> **Path:** Person & Family Field Guide > Person Signal Types

Person Signal Types

Signals are discreet flags that can be assigned to a person to bring attention to a matter. As with most aspects of Rock, signals are highly customizable. They can be used to flag anything from security concerns to high-level lay leads to anything and everything in between. Some examples of how your organization might use signals are:

- Safety and Security - to flag someone who shouldn't be around children or on campus.
- Pastoral Care - to bring attention to someone who needs extra or specialized care.
- Administrative Tasks - to alert staff of a missing form or other administrative matter.

Signals differ from tags in that tags are meant only to provide information while signals are meant to prompt you to further action. They're a quick, visual way of saying, "Hey, there's something here you should know about."

![Person Signal Types](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-signal-types-v18.png)

Person Signal Types

Signals are managed from Admin Tools \> Settings \> Security \> Person Signal Types. You can create as many signals as you need for your organization, giving each a specific color and icon to differentiate them. As you set your signals up, keep the following in mind:

- The list order of the signals in the *Person Signal Types* screen is important. The color of the top-most signal is used as the color for the *Person Signal Type* badge displayed on the *Person Profile* page, so it's best to keep the most important signal types at the top of the list.
  
- It's best to use general names for signals. For example, "Safety Team Recommendation" is general without being too vague. This helps to avoid the problem of labeling people, something that not only isn't kind but could also pose future legal issues. Consider using an appropriate color and icon for signals as well.
  
- Configuring the security settings for each signal type is essential. Signals aren't meant for everyone to see. Likewise, the information provided on the *Person Profile* page (particularly in the tabs subsections) is sensitive and should only be viewed by those with the appropriate security permission.

# Note Security

To view Person Signal Type notes, you must have access to the Security tab on the *Person Profile* page and have View access to the Person Signal Type.

![Add Person Signal Type](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/add-person-signal-type-v18.png)

Person Signal Types

For individuals, signals are managed on the Security tab of the *Person Profile* page. Each signal has a type, owner, expiration date, and note. The owner is the person to contact for follow-up details and defaults to the person currently logged in.

When a person is assigned a signal, a flag-shaped badge appears on their Person Profile page. The flag's color reflects the highest-priority signal type assigned. The flag also displays a number indicating the total signals assigned. Hover over the flag to see a list of the person's signals. A detailed view is available in the Security tab. Signals also appear on group member lists as an icon of the top-level signal next to the person's name.

![Person Signal Type Badge](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/person-signal-type-badge-v18.png)

Person Signal Type Badge


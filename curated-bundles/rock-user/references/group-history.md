---
description: Use when enabling group history tracking for specific group types or viewing timeline and historical changes to groups
source: "https://community.rockrms.com/documentation/bookcontent/7/361"
sourceLabel: Rock Your Groups
---
> **Path:** Rock Your Groups > Group History

Group History

As you work with groups—adding and removing members, adjusting schedules and member roles, etc.—there may be times when you want to get a 40,000ft view to see how they're doing. Rock's Group History feature allows you to do just that.

Group History takes all of the configurations and changes made to a group and compiles them into timeline and table views that let you easily view the life and health of that group. Here's an example of a Group History timeline view.

![Group History](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-history-timeline-v18.png)

Group History

Rock ships with Group History enabled for small groups and serving groups. You can enable and disable Group History for any group type. However, because a lot of data can build up quickly, we recommend using it only with your more regular, stable groups. For example, enabling Group History for a Sunday School group where different children are in attendance each week would lead to crowded (and potentially messy) timelines and tables. Enabling it for a security team or other serving group that experiences fewer fluctuations makes a lot more sense.

OK, let's take a closer look at how to set up and use Group History.

# Enable Group History

To enable Group History for all groups of a certain group type, begin by locating the group type in:  
Admin Tools \> Settings \> General \> Group Types.  
In the *General* section of the *Group Type Details* screen, check the *Enable Group History* checkbox. You can customize the group type's display options in the *Display Options* section by assigning it a color and icon. These options come into play in a number of the Group History views, but we'll get into that later. For now, click Save and Rock will enable the history and options for that group.

![Enable Group History](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-type-detail-enable-group-history-v18.png)

Enable Group History

# View Group History

Now that you have Group History enabled, you can jump to that 40,000ft view. Locate the group in the Group Viewer and click the button.

![View Group History](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-hisotry-new-v18.png)

View Group History

# Archived Groups

You can Archive a group instead of deleting it. Archiving removes the group from the Group Viewer and other places where groups can be seen but allows you to restore it later. When a group has been marked as Archived and you want to bring it back go to: Admin Tools \> Settings \> General \> Archived Groups Click on the icon to unarchive the group.

Note: If a group type has 'Enable Group History' checked, once the 'Process Group History' job runs the 'Archive' button will be enabled on a group.

This brings up the group's timeline view, shown earlier, including both member and group history information. The Group History screen shows the history of the group by day for the lifetime of that group. Each event on the timeline has an icon that corresponds to a type of action.

- \- Member added
- \- Member removed
- \- Group edited
- \- Other/general group action

If there is more information than space available for an event on the timeline, you can view the entire contents by hovering your mouse over the text. For multiple occurrences on the same day, Rock will display a link to expand the area to display all of the actions for that day.

To hide member history and view only actions made on the group level, click the button.

You can also zoom in from that 40,000ft view and get a closer look at the history of the members of a group. Click Member History to display a group's members and the history/dates of their involvement in the group. Click on a specific person to view a timeline of their involvement with the group.

![Group Member History](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/group-member-history-v18.png)

Group Member History

# View Group History in a Person's Profile Page

Individual group history is also available on the *Person Profile*, under the *Groups* tab.

![Person Profile Group History](https://rockrms.blob.core.windows.net/documentation/Books/7/1.18.0/images/person-profile-group-history-v18.png)

Group History in Person Profile

Hover your mouse over any of the events on the person's timeline to display the details of that event. Note the timeline colors correspond to the color assigned to the group back when Group History was enabled. If the person is a group leader, the color will be slightly darker. You can also click on a specific event to drill down into the group. As with all of the tabs on the *Person Profile*, the information is filterable. Click the button to display the filter options.


---

## Group Leader Toolbox {#group-leader-toolbox}

> **Path:** Rock Your Groups > Group Leader Toolbox

Group Leader Toolbox

The group leader toolbox can be found on the external site under *My Account*. The toolbox is made up of just a couple of pages and blocks that provide a ton of options. The out-of-the-box configuration is meant more as a sample of what's possible rather than a *one size fits all* model. Let's look at each of the blocks in detail to give you an idea of what you can achieve.

# My Account - Groups

Along the right of the *My Account* page is a listing of groups to which the person belongs. The individual can also see their role within the group. Through block settings you can configure which group types to show or hide. Using Lava, you can adjust the look of this block to your heart's content.

![Group List in My Account](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/group-list-in-my-account-v12.png)

Group List in My Account

Clicking on any group in which the person is a leader will open the group leader's toolbox.

# Group Toolbox

![Group Toolbox](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/group-toolbox-v16.png)

Group Toolbox

This is the money block. With this block, you have access to every detail of a group that's accessible in a Lava template. It also has some special *Postback Commands* that allow you to enable editing of the group details and its members. If enabled in the block settings, you can even allow individuals to set their communication preference for the group. The sky really is the limit when it comes to customizing this block, so be sure to check out all its settings.

# Note on Security

When adding a person to the group the default view allows you to select the new individual from those already in the database. In order for this search to work you will need to adjust the security on the API/People/Search REST endpoint. You can find this under:  
Admin Tools \> Settings \> Security \> REST Controllers \> People.

If you would prefer not to allow group leaders to search the list of people in the database, you can provide an alternate *Group Member Add Page* in the block settings. On this new page you may choose to set up a workflow entry form, a group registration block or a simple email form.

# Group Attendance List and Detail

![Group Attendance List](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/external-attendance-list-v10.png)

Group Attendance List

![Group Attendance Entry](https://rockrms.blob.core.windows.net/documentation/Books/7/1.17.0/images/external-attendance-entry-v15.png)

Group Attendance Entry

These two blocks allow you to track the attendance of a group. By default, these options will only show for groups of a type with attendance enabled.


---
description: "Use when users need guidance on how attendees can self-report their attendance at online services, including family members watching together"
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Attendance Self Entry

With the advancement of online services, getting accurate engagement data can be a challenge. To address this need, Rock lets attendees report their own attendance from your external site. All a person needs to do is check a few boxes to indicate who’s watching the service with them.

![Attendance Self Entry - Known Person](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-known-person-v10.png)

Attendance Self Entry

Pictured above, Ted is watching the service at home with Cindy and Alex. Noah is at grandma’s house this weekend, so isn’t selected. Below the family you can see Jim and Sarah Simmons are over at the Decker house watching the service too.

With everyone in the room accounted for, all Ted needs to do now is click the Check-in button near the bottom of the page to have their attendance recorded.

# Using with Moments

The Attendance Self Entry feature pairs very nicely with Church Online Platform’s “Moments” feature. Check out the details [here](https://support.online.church/category/9yx9qvdlha-moments) to learn more.

# Attendance Self Entry In Detail

In the above example, Ted was logged in to the external website. That’s how Rock was able to find him and his family. There’s a little more to the process if Rock doesn’t know who the person is.

In this section, we’ll walk through the full attendance self-entry process for Alisha. Alisha is new to the organization and is watching an online service with her family for the first time. Rock can’t track attendance for someone who’s not in the system, so we’ll ask her for some basic information to get started.

![Attendance Self Entry - Person Information](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-unknown-person-v10.png)

Attendance Self Entry - Person Information

On the next page, Alisha is asked to provide similar information for anyone who's joining her. Because Alisha is new to the church and doesn’t have a record in Rock, she’ll need to add each of her family members manually. Ted Decker is joining the Marble family for this service, so Alisha will need to add him too.

Pictured below, Alisha is adding Ted Decker as an ‘Online Watcher’ to indicate that Ted is watching with her and her family. For those who are curious, ‘Online Watcher’ is a *Known Relationship* in Rock and is used to connect these individuals to each other.

As many watchers as needed can be added by clicking the Add Additional Individual button. Each new person is added to the list on the right, where we can see Alisha has already added Bill and Matthew.

![Attendance Self Entry - Other Watchers](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-other-watchers-v10.png)

Attendance Self Entry - Other Watchers

After everyone has been added to the list, the person clicks Next to proceed. Because she’s new, Alisha is prompted to create an account so she can log in next time and save herself a few steps.

![Attendance Self Entry - Create Account](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-create-account-v10.png)

Attendance Self Entry - Create Account

Account creation is optional but should be encouraged. Whether or not the person creates an account, they can proceed by clicking the Next button.

# Do I Have To Do This Every Week?

A person only needs to provide their information once, even if they never log in. That’s because Rock will place a cookie on their device to identify them for future services. So, *identified* individuals will have the same experience as *authenticated* individuals. But remember, being identified isn’t the same as being authenticated. Individuals must log in to access other areas of the site that require authentication.

The last step, pictured below, is where Alisha will indicate who is watching the current service. Rock assumes that everyone who was added in the prior step is still watching, so everyone from her list is selected. Individuals can be de-selected here if they’re no longer watching.

This is the last step in the process for Alisha, but you might recall from the start of the chapter that it was the first step for Ted. Any identified or authenticated person will always start on this page.

![>Attendance Self Entry - Current Watchers](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-confirm-current-watchers-v10.png)

Attendance Self Entry - Current Watchers

After Alisha clicks Check-in, the below page confirms that the attendance has been successfully submitted.

![Attendance Self Entry - Check-in Success](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-check-in-success-v10.png)

Attendance Self Entry - Check-in Success

It’s important to note that this process has created person and family records in Rock for Alisha and her family. Ted already had a record, otherwise one would have been created for him too. This is required because a person needs to be in Rock for their attendance to be added.

# What About In-Person Attendance?

*Attendance Self Entry* works the same way for any type of service. The same pages and processes can be used to track attendance for services that are in-person, online or a combination of both.

# The Attendance Self Entry Block

Now that you’re familiar with the process, let’s take a closer look at the *Attendance Self Entry* block itself. This block handles the entire process from start to finish, so there are a lot of configuration options to cover. We’ll break down the block’s settings into pieces below.

First, there’s some terminology you should know. The block’s settings refer to a *Primary Person*, who is the person that’s filling out the form. In the prior section, Alisha Marble was the *Primary Person*. There are also settings for *Other Person*, which apply to anyone other than the *Primary Person*.

![>Attendance Self Entry - Block Settings 1](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-block-settings-1-v17.png)

Attendance Self Entry - Block Settings 1

As noted above, Rock uses the *Check-in Configuration* setting to know where to add attendance. There’s some complex logic behind how this works, which we won't get into here. In short, the block looks for the appropriate service by comparing the selected check-in configuration to the time when the person is checking in. For instance, Rock will automatically determine that the person checking in at 9:55am is watching the configured 10:00am service.

# Additional Logic for Adding Attendance

If the block can’t find an appropriate schedule with respect to the person’s check-in time, then the attendance will be added to the first group that’s found without a location or schedule. If no such group exists, then the attendance can’t be recorded.

Pictured below are the next set of configuration options for the *Attendance Self Entry* block.

![>Attendance Self Entry - Block Settings 2](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-block-settings-2-v17.png)

Attendance Self Entry - Block Settings 2

The last set of configuration options lets you change the text that’s shown near the top of each attendance entry panel. As pictured below, you can edit the *Title* and *Text* for each panel described in the prior sections.

![>Attendance Self Entry - Block Settings 3](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/attendance-self-entry-block-settings-3-v17.png)

Attendance Self Entry - Block Settings 3

You might have noticed the Lava in the title for *Known Individual Panel 1*. That’s right, you can personalize the experience by adding [Lava](https://community.rockrms.com/Lava) to any panel’s *Title* or *Text* content. Remember, not all the panels will know who the person is.


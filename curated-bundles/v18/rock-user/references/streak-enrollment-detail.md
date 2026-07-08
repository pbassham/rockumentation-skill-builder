---
description: "Use when a user needs to manually track or rebuild individual engagement streaks, update enrollment dates, or modify attendance records in the engagement map"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Streak Enrollment Detail

Streak Enrollment Detail

You can access the *Enrollment Detail* page either by clicking on an existing person from the enrollment list block, or after manually adding a new person to the list.

In the prior section we added Ted Decker with an Enrollment Date of 8/1/2021. After clicking Save we’re brought immediately to Ted’s *Enrollment Detail* page.

![Enrollment Detail Page - New Add](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-enrollment-detail-new-add-v18.png)

Enrollment Detail Page - New Add

# Manual Tracking

We know from attendance records that Ted should have streak numbers higher than zero. But we’re taking the manual path, so we need to manually feed that into Ted’s streak data. Take a look at how the page changes after selecting the “Sep 05” week in the engagement map.

![Enrollment Detail Page - Manual](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-enrollment-detail-page-manual-tracking-v18.png)

Enrollment Detail Page - Manual

# Map Updates

After updating the engagement or exclusion maps be sure to save and then refresh the page to verify the changes.

That’s the manual route for Ted. But what if you want to build streaks in a more automated way according to actual attendance records? As we mentioned earlier, you can do that by using the *Rebuild* feature.

# Individual Rebuild

Let’s see how Ted’s data has changed after clicking the Rebuild button.

# Individual Rebuild

The rebuild process will delete the individual’s engagement map data and rebuild it from attendance records. Any manual changes you’ve made to the engagement map will be lost.

Enrollment Detail Page - Rebuild

![Enrollment Detail Page - Rebuild](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-enrollment-detail-page-rebuild-v18.png)

1 Engagement Graph

At the top of the block, we see several new bars have popped up. From left to right, this graph shows:
- Two consecutive weeks of attendance (8/8 – 8/15)
- One week absent (8/22)
- Two consecutive weeks of attendance (8/29 – 9/5)
- One week absent (9/12)
- One week of attendance (9/19)

2 Streak Data

As a result of the rebuild, the *Current Streak* and *Longest Streak* were both updated from Ted's attendance records.

3 Enrollment Date

Notice that Ted's enrollment date was changed from 8/1 to 8/8 by the rebuild process. Even though Ted has attendance data prior to that date, 8/8 was chosen because individual streaks can't go any earlier than the streak type start date.

4 Engagement Map

When building from attendance data, you’ll see three different types of date selections in the engagement map:

- **Selected, Editable:** Weeks where Ted has small group attendance data have been selected with a checkmark (e.g., “Sep 05”). You can manually remove these engagements from the streak data by unchecking these boxes.
- **Not Selected, Editable:** In this example Ted didn’t attend the weeks of “Aug 22” or “Sep 12” so they are not selected. You can manually add engagements to streak data by selecting these boxes.
- **Not Selected, Not Editable:** This applies to dates before the person’s enrollment date, or dates in the future.

What if we want to include Ted's attendance data from June and July? We've already established that this streak can't go any earlier than 8/1 due to the streak type start date, and that the start date can't be changed. So, at this point, if we want to include earlier attendance, we'll need to rebuild the streak type. Aside from creating an entirely new streak type, rebuilding is the only way to alter the start date. We'll cover what that looks like in the [Streak Type Rebuild](#streaktyperebuild) chapter.

Don't forget that the streak type occurrence map (see [Occurrence Map Editor](#occurrencemapeditor)) applies to a person's individual enrollment data. Only dates that are selected on the occurrence map will be reflected in an individual's streak data.

# Exclusions

Looking closer at the *Engagement Map*, we can see Ted didn’t attend the week of August 22nd. We know Ted’s car broke down in a storm that week, and we’re feeling generous, so we’ve decided to ignore that absence in Ted’s streak data. All we need to do is select the "Aug 22" week in the exclusion map and click the Save button. Now it’s like the absence never happened.

![Enrollment Detail Page - Exclusion](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-enrollment-detail-page-exclusion-v18.png)

Enrollment Detail Page - Exclusion


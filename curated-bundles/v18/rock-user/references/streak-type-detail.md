---
description: Use when configuring occurrence maps for streak types to manage meeting dates and exclude locations from streak calculations
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Streak Type Detail

Streak Type Detail

After saving your new streak type, you’ll be brought to the streak type detail page. You can also access this page by clicking on a streak type from the list (see [Streak Types](#streaktypes)).

We’ll look closely at the detail block before moving down the page to check out the list block at the bottom.

![Streak Type Detail Block](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-type-detail-block-v18.png)

Streak Type Detail Block

You may notice that the *Start Date* changes from what you originally entered when creating the streak type. The date may be rounded up to the next Sunday. This happens if the streak type is weekly because weeks end on Sunday by default. To put it another way, if you’re tracking streaks on a weekly basis then it doesn’t really matter which specific day of the week someone engaged.

# Occurrence Map Editor

Click on the Map Editor button to edit the occurrence map for the streak type.

When you add a new streak type the occurrence map will initially be blank as pictured below. The map can be populated manually through the editor, or it can be built from attendance or interaction data using the streak type Rebuild button (see [Streak Type Rebuild](#streaktyperebuild)).

![Occurrence Map Editor](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-occurrence-map-editor-v18.png)

Occurrence Map Editor

When you update the occurrence map, you’re changing the list of possible meetings. The most common reason to do that would probably be to remove dates where a regularly scheduled meeting isn’t taking place due to things like weather events. Removing dates from the occurrence map ensures nobody’s streak is broken for missing something that never actually took place. It's important to know that changes to the occurrence map will not be reflected in everyone's streak data in the blocks until the nightly cleanup job runs.

In our small group example, we’ll manually select all of the weeks that are available as pictured above. Any absences in any of those weeks will count against a person’s streak.

You might find it odd that the current week (or day) is not shown in the streak graph. Not to worry, we did this intentionally to avoid scaring anyone into thinking their streak had been broken, when in reality they simply haven't had a chance to engage yet. By default, streak calculations and graphs exclude the current day or week.

# Location Exclusions

Click the Exclusions button from the *Streak Type* page to access the list of excluded locations. Excluding a location means a person’s streak won’t be broken if they missed an event or meeting at that location for the date(s) specified. You could use this for snow days, or other similar events that might close a campus or location.

![Location Exclusion](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-location-exclusion-v18.png)

Location Exclusion

# Streak Type Enrollment

Below the streak type detail block is the enrollment list block. Here you can see all the participants in the streak type and their streaks.

When you first create a new streak type the enrollment list will be empty. The list pictured below has individuals on it for example purposes only. We’ll review the block first, and then show you how to get individuals added.

![Streak Type Page - Enrollments](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-type-page-enrollments-v18.png)

Streak Type Page - Enrollments

There are two ways to enroll individuals into a streak type. We mentioned earlier that you can click the Rebuild button to add individuals from attendance records. We’ll look closely at that method in the [Streak Type Rebuild](#streaktyperebuild) chapter. The other method is to manually add a single person to the list.

![Add New Streak](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/add-new-streak-v18.png)

Add New Streak

As soon as you save, you’ll be brought to the *Enrollment Detail* page.


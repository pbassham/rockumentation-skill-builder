---
description: Use when users need to understand how to rebuild streak types and what data changes occur during the rebuild process
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Streak Type Rebuild

Streak Type Rebuild

We’ve already covered streak types, but we didn’t go into detail on what happens when you use the *Rebuild* feature. Now that you’ve seen what rebuilding an individual’s enrollment looks like, you can apply those concepts to rebuilding the streak type.

Let’s go back in time to when we first added our new streak type. As a reminder, this is how the page originally looked before we added Ted:

![New Streak Type](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-new-streak-type-for-rebuild-v18.png)

New Streak Type

# Streak Type Rebuild

Occurrence and enrollment map data will be deleted and rebuilt from attendance records if you rebuild the streak type. Any changes you made to the occurrence map or to individuals’ enrollment maps will be lost.

After clicking the Rebuild button you’ll notice several changes.

![Streak Type Rebuild](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-type-after-streak-rebuild-v18.png)

Streak Type Rebuild

If we compare Ted’s data now to what it was when we rebuilt him in the [Individual Rebuild](#individualrebuild) section, we can see some obvious differences. Mostly these differences are because Ted now has an earlier enrollment date. However, there’s one other difference you should know about.

Let’s do a quick comparison of Ted’s enrollment pages, paying close attention to the engagement graph near the top of the block.

![Enrollment After Individual Rebuild](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-enrollment-detail-graph-indiv-rebuild-v18.png)

Enrollment After Individual Rebuild

![Enrollment After Streak Type Rebuild](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-enrollment-detail-graph-type-rebuild-v18.png)

Enrollment After Streak Type Rebuild

There was a gap in attendance that has seemingly disappeared from the graph after the streak type was rebuilt. Ted had two recent gaps, but now he only has one. If the Rebuild button is supposed to pull from attendance data, and if the attendance data hasn’t changed, then what caused this discrepancy?

This can be traced back to the *Occurrence Map*. Since we were originally taking the manual route for this streak type, we manually selected all available weeks in the map. Then we rebuilt Ted's streak from attendance data. Because Ted didn’t have attendance data for the weeks of “Aug 22” or “Sep 12” we saw two gaps.

Now, on the other hand, we’ve rebuilt the entire streak type and not just one person's data. The rebuild process updated both the *Occurrence Map* and Ted's engagement according to attendance data.

![Rebuilt Occurrence Map](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-rebuilt-occurrence-map-v18.png)

Rebuilt Occurrence Map

Notice that the week of “Sep 12” isn’t selected. The rebuild process knew to skip this week because the attendance record shows the group “Didn’t Meet” as pictured below.

![Group Attendance](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/streak-group-attendance-v18.png)

Group Attendance

Because the group didn’t meet at all, that week was removed from the occurrence map and ignored in streak data. The remaining gaps in Ted’s attendance are truly the result of an absence.


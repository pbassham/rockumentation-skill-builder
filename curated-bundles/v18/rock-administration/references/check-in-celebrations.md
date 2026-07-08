---
description: Use when configuring check-in achievement celebrations and animations to recognize member accomplishments and engagement at your organization
source: "https://community.rockrms.com/documentation/bookcontent/10/372"
sourceLabel: Checking-out Check-in
---
> **Path:** Checking-out Check-in > Check-in Celebrations

Check-in Celebrations

If you’ve accomplished a goal, you deserve to celebrate it! Check-in celebrations are a recognition the person sees (and hears) when their check-in results in an achievement being earned. This is a great way to track and encourage engagement at your organization.

![Check-in Celebration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-celebration-v13.png)

The check-in confirmation screen shows more than just a celebration when an achievement has been earned. The person can also see their history of earned achievements, and their progress toward the next time they will earn an achievement. Let's break down all the information below.

![Check-in Celebration Screen](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/checkin-celebration-page-v13.png)

Check-in Celebration Screen

How a celebration is displayed is built into each check-in theme. Each core theme that ships with Rock has its own celebration, as detailed below. Each celebration has both an animation and a sound effect, giving the person something to see and hear. Your custom themes will need to implement their own celebrations using CSS and JavaScript.

| ![Adventure Kids](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/adventure-celebration-v13.png) | **Adventure Kids Theme**   Watch out for the lion that jumps across the screen with a mighty roar! |
| --- | --- |
| ![Aero](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/aero-celebration-v13.png) | **Aero Theme**   See a colorful display of confetti bursting from the screen as trumpets proclaim the achievement has been earned. |
| ![Blue Crystal](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/blue-crystal-celebration-v13.png) | **Blue Crystal Theme**   Watch as blue and white confetti falls to the sound of majestic trumpets. |
| ![Electric](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/electric-light-celebration-v13.png) | **Electric Theme**   A burst of multi-colored confetti rains down the screen as trumpets play to celebrate the achievement. |
| ![Electric (Dark Mode)](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/electric-celebration-v13.png) | **Electric Theme (Dark Mode)**   Trumpets sound as a flurry of blue and white confetti pops from the screen. |
| ![Park](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/park-celebration-v13.png) | **Park Theme**   Balloons of many different colors float up the screen while trumpets play. |

  

# Setting Up Celebrations

Check-in celebrations occur when an achievement’s goal has been met for the person checking in. So, before you get started, you’ll need to have at least one achievement type in place. Because we’re working with check-in, the achievement type you pick will most likely be tied to a streak.

## Streaks and Achievements

The first thing you'll need to do is set up the streak type you'll be using under People \> Streaks. The example pictured below will track weekly attendance.

![Streak Type Configuration](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/streak-type-config-for-celebration-v13.png)

Streak Type Configuration

With a streak type in place, we can now configure achievements by navigating to People \> Achievements. As it relates to check-in, you’ll probably want to use one of two basic kinds of achievements.

The first type is for attending a certain number of times in a row. For instance, you might have an achievement that’s earned if the person attends ten weeks in a row. Your achievement type would be set up as pictured below.

![Achievement Type Configuration - Consecutive](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/achievement-type-consecutive-config-for-celebration-v13.png)

Achievement Type Configuration - Consecutive

The second type of achievement you might use would track attendance over a certain period of time. For instance, you might configure an achievement that’s earned if the person attends twenty weeks within a year. The achievement type in that case would be configured as shown below.

![Achievement Type Configuration - Accumulative](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/achievement-type-accumulative-config-for-celebration-v13.png)

Achievement Type Configuration - Accumulative

# Keeping the Streak Alive

People will get excited as they see their progress toward earning achievements. But some might need a little grace if they miss a week through no fault of their own. In those cases, you can use the Engagement Exclusion Map on a person’s streak to forgive missed attendances. This is the best way to keep an unbroken streak going if the person was unable to attend a given week.

For full details on setting up streaks and achievements, check out our [Engagement](https://community.rockrms.com/documentation/bookcontent/39#streaksoverview) guide.

## Check-in Configuration

Once you have an achievement type configured, head to your check-in configuration at Admin Tools \> Check-in \> Check-in Configuration. This is where you’ll connect each check-in type to one or more achievement types. For instance, you might track some achievements for your volunteer check-in, and others for weekly service check-in.

![Check-in Configuration for Achievement Type](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-configuration-for-achievement-type-v13.png)

Check-in Configuration for Achievement Type

Each achievement type you add will trigger a celebration if the check-in results in the achievement being earned. Even if the check-in doesn’t result in a celebration, the person will still see their progress toward each achievement type you’ve configured here.

That’s all you need for check-in celebrations to work. Once you’ve added achievement types to your check-in configuration, you’ll start seeing them in check-in right away. However, there’s more you can do to customize the experience.

## Achievement Type Configuration

The achievement type itself has some configuration you’ll want to know about. Navigate to People \> Achievements then select an achievement type to edit. Under the *Advanced Settings* you’ll find configuration items for celebrations.

![Achievement Configuration for Celebrations](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/achievement-type-config-for-celebrations-v14.png)

Achievement Configuration for Celebrations

## Check-in Theme Configuration

To change the colors of the balloons or confetti for each theme's celebration, navigate to Admin Tools \> CMS Configuration \> Themes and expand the *Celebrations Configuration* area for the selected theme. Here you can choose what colors to show. You can change the colors to match your organization’s branding, or you can pick colors that you think best fit the check-in theme.

![Theme Configuration for Celebrations](https://rockrms.blob.core.windows.net/documentation/Books/10/1.17.0/images/check-in-theme-edit-celebration-colors-v13.png)

Theme Configuration for Celebrations

Don’t forget that custom themes can have their own celebrations. Creating your own celebrations might require some help from a developer, but it would allow you to have an entirely custom celebration experience.


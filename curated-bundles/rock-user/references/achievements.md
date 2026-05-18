---
description: Use when users ask about defining and configuring achievement goals based on engagement metrics like attendance or interaction patterns
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Achievements

> *"What you get by achieving your goals is not as important as what you become by achieving your goals."*
> 
> \-Henry David Thoreau

With *Achievements* you can define goals that are measured against things like engagement and interaction data. For instance, you may want to recognize when a person has attended services three times in a row in a single month. You could wade through the raw data looking for that kind of pattern, but *Achievements* will do that for you automatically.

Before we jump in too deep let’s define a few terms for you.

- **Achievement Type:** Each achievement type represents a specific goal and defines what a person (or any entity) must do to reach that goal. You can have several types of achievements to track different kinds of goals.
- **Achievement Attempt:** When a person tries to meet the goal of an achievement type, an achievement attempt is created for the person. Depending on how the achievement type is configured, a person can have one or many attempts. If the achievement type’s goal is to attend services three weeks in a row, then an attempt will be created the first time a person attends a service.
- **Achievement – Successful Attempt:** An attempt is successful, and the achievement is earned, if the person meets the conditions of the achievement type. So, if the goal is to attend three services in a row, then the person will have successfully attempted the achievement after they’ve attended their third consecutive service.
- **Closed Attempt – Not Successful:** Reaching any goal in life can be challenging, and we’re not always successful. If the achievement type’s goal is to attend three services in a row, then the attempt will not be successful if the person attends the first week but not the second. In this case, the attempt is not successful and is closed. The next time the person attends a service, a brand new attempt toward that achievement type will be created.
- **Attempt Progress:** There’s usually a period of time between starting and finishing an achievement attempt. During this time, the attempt is considered in progress because we can’t know in advance if the attempt will be successful or not. Rock tracks a person’s progress toward the goal along the way. Continuing with the service attendance example we’ve been using above you can track that a person who has attended two consecutive weeks is two-thirds (or 66%) of the way toward earning the achievement.

# Achievement Types

Let’s look at an example achievement type with some data already added, so you can get an idea of what to expect. In this example we’re tracking an achievement that’s earned when a person has attended ten times consecutively. In later sections we’ll go into the details and cover how this all gets set up.

![Achievement Type](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/achievement-type-v18.png)

Achievement Type

# Adding Achievement Types

To get started with achievements, navigate to People \> Engagement \> Achievements. You’ll be brought to the *Achievement Types* page pictured below.

![Achievement Types](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/achievement-type-list-v18.png)

Achievement Types

From here you can add as many achievement types as you want or look at the attempts for an existing achievement type, as described in the prior section. Let’s look at what makes an achievement type work.

![Add Achievement Type](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/add-achievement-type-v18.png)

Add Achievement Type

# Overachievement and Max Accomplishments

You can either enable *Allow Overachievement* or set a *Max Accomplishments Allowed* value, but you can’t use both. For example, if your achievement type requires someone to attend three times in a row, and if someone attends six times in a row, the system needs to know if the fourth engagement should count toward overachievement or toward a second accomplishment.

# Achievement Attempts

Now that the Achievement Type is set up, we can start tracking attempts. Attempts, as you might have guessed, are instances of individuals trying to meet the conditions of the Achievement Type. Although there isn’t a formal “status” for attempts, they can be thought of as either successful, unsuccessful or in progress.

If the person satisfies the achievement type’s conditions, then the attempt is *Successful*. If the person fails to meet the conditions, then the attempt is not *Successful*. If the person is in the middle of working toward the achievement, then their attempt is in progress.

Even though achievements are automated, you can add or change individual attempts manually from the *Achievement Type* screen. Simply click on the attempt row for a person and then click the Edit button. Manual adjustments should be rare but may be needed occasionally due to unusual circumstances or overrides.

![Manage Achievement Attempt](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/manage-achievement-attempt-v18.png)

Manage Achievement Attempt

Adding a new attempt is similar to managing an existing attempt. In addition to the fields above, you'll also need to provide the Achiever Id (the Person Alias Id) and the Achievement that the attempt should be applied to.

# Step Configuration

No, you haven’t jumped to the wrong section in the manual. Rock lets you add step data automatically using achievements. When the achievement has been successfully accomplished, a step gets added. You can access the configuration described below when creating or editing an achievement type.

![Achievement Type Step Configuration](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/achievement-type-step-configuration-v18.png)

Achievement Type Step Configuration

The date on which the achievement was completed successfully will be the date used for adding the step. The date may be used as the step’s start or end date, depending on how the step type and achievement type are configured.

The conditions you’ve configured for your step types will still apply when steps are added from achievements. Steps with prerequisites won’t be added if the individual hasn’t completed the required prerequisite steps. If an achievement is earned more than once it will only add multiple steps if the step type allows multiple completions.

# Advanced Settings

You can access the advanced settings while creating or editing an achievement type. As described below, you can use this configuration to do things like create achievement badges or add prerequisite achievements.

![Achievement Type Advanced Settings](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/achievement-advanced-settings-v13.png)

Achievement Type Advanced Settings


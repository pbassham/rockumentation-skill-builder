---
description: "Use when configuring learning plan activities or understanding available activity types like assessments, acknowledgments, and file uploads"
source: "https://community.rockrms.com/documentation/bookcontent/43/354"
sourceLabel: Learning Management System
---
> **Path:** Learning Management System > Learning Plans

Learning Plans

Depending on the selected Activity Type, a *Configure* section will appear with options specific to that type. A learning plan has up to four distinct views:

1. **Configuration View** The interface used to create and set up the activity within the learning plan.
2. **Student Completion View** What the student sees while working on the activity.
3. **Facilitator Scoring View** If the activity requires scoring, this is where facilitators evaluate and rate the student's work.
4. **Summary View** The final view displayed once the activity is completed.

For now, we'll focus on *Configuration View*. Let's begin by reviewing the common elements of an activity. Details specific to each activity type will be covered in the next section.

![Adding a learning plan activity](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plans-adding-v18.png)

Adding a Learning Plan Activity

# Learning Plan Activity Types

Each activity type provides unique fields and options to customize the activity.

## Acknowledgment

Enter the text you want displayed in the activity into the Content field. If desired, use the *Confirmation Text* field to provide text that will appear next to the acknowledgment checkbox.

![Acknowledgment Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-acknowledgment-configure-v18.png)

Configuration View

![Acknowledgment Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-acknowledgment-student-completion-v18.png)

Student Activity View

## Assessment

For this activity type, you'll see a form for adding items such as a *Multiple Choice* question, a *Section* separator, or a *Short Answer* item.

![Assessment Activity Type no items](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-assessment-configure-v18.png)

Configuration View (Assessment Items)

You can add as many items as you need. With the Multiple Choice type of question, you can supply the correct answer so the assessment can be graded automatically. However, adding a Short Answer type will require a Facilitator to score each participant's answers.

![Assessment Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-assessment-configure-1a-v18.png)

Configuration View

![Student Completion View for Assessment Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-assessment-student-completion-v18.png)

Student Activity View

![Facilitator Scoring View for Assessment Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-assessment-facilitator-scoring-v18.png)

Facilitator Scoring View

## File Upload

The File Upload activity enables students to submit a file with the required content to complete the activity. You can provide additional instructions and attach a grading rubric to outline the evaluation criteria, if applicable.

![File Upload Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-fileupload-configure-v18.png)

Configuration View

![Student Completion view for File Upload](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-fileupload-student-completion-v18.png)

Student Activity View

![Student Completion view for File Upload](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-fileupload-facilitator-scoring-v18.png)

Facilitator Scoring View

## Point Assessment

The Point Assessment activity is similar to the File Upload activity, but students do not upload anything. It is ideal for scenarios where students present something physical or deliver an in-person presentation.

Here, the grading rubric is intended as a guide for facilitators, helping them stay on track with the rules and criteria for grading the assignment.

![Point Assessment Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-point-assessment-configure-v18.png)

Configuration View

![Student Completion view for Point Assessment](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-point-assessment-student-completion-v18.png)

Student Activity View

![Facilitator Completion view for Point Assessment](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-point-assessment-facilitator-completion-v18.png)

Facilitator Scoring View

## Content Article

The *Content Article* activity lets students engage with instructional content by reading text or watching a video. They can then reflect by writing personal notes or answering a prompt—neither of which are graded.

These notes are private and visible only to the student.

![Content Article Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-contentarticle-student-completion-v18.png)

Configuration View

![Student Completion view for Content Article](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-content-article-student-completion-v18.png)

Student Activity View

## Video Watch

The Video Watch activity lets you share a video from your Digital Media Accounts in Rock. You can set how much of the video a student needs to watch before they can mark it as completed. See the Digital Media section of the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#digitalmedia).

![Point Assessment Activity Type](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-videowatch-configure-v18.png)

Configuration View

![Student Completion view for Point Assessment](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-plan-activity-type-videowatch-student-completion-v18.png)

Student Activity View


---

## Grading Systems {#grading-systems}

> **Path:** Learning Management System > Grading Systems

Grading Systems

Found under Admin Tools \> Settings, this is where you can define or customize the grading system to fit your needs. For example, Rock ships with the "Rigorous" Letter Grade system. In less rigorous organizations, when using the Letter Grade system, one must only reach a 90% or higher grade to receive a "A" grade. This is where you can make those adjustments.

![List of available grading systems](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/grading-systems-v18.png)

Grading Systems

# Completion Grading Systems

If your course uses a completion grading system, the name you enter will appear as the label once the course is finished. Keep in mind that any grading system with only one scale is treated as a *completion* type.

![The Rigorous Letter Grade System showing letters A-F](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/grading-system-letter-grade-rigorous-v18.png)

Rigorous Letter Grade System


---

## Behind the Scenes {#behind-the-scenes}

> **Path:** Learning Management System > Behind the Scenes

Behind the Scenes

## The Inner Workings of Learning Classes

If you were to peek behind the curtains of Rock, you would discover that a *Learning Class* is essentially a specialized type of *Group*. What does this mean? For one, *Students* and *Facilitators* are simply a specific type of *GroupMember*. That means you can leverage many of Rock's features that work with groups and group members.

- Learning Class Group
- Learning Participant (Students, Facilitators) GroupMember

For example, you could use the *Group Member Add From Attribute* action in a Workflow to add students (or facilitators) into a class.

# No SQL Please

Although a Learning Class is just a specialized Group under the hood, please don't write custom SQL that attempts to use/access these special tables. The link between LearningClass and Group, as well as LearningParticipant and GroupMember, is tightly managed in code. Querying or manipulating these connections outside of Rock's built-in tools could break expected behavior.

## Background Jobs

Rock includes background jobs to handle various automated tasks related to the LMS.

- **Send Learning Activity Notifications:** This job sends notifications to students for newly available activities.
- **Update Program Completions:** This job updates learning program completion records for programs that track completion status.

Table of Contents

- [Overview](#overview)
- [Walkthrough: Creating a Learning Program](#walkthroughcreatingalearningprogram)
- [Academic Calendar Configuration Mode](#academiccalendarconfigurationmode)
- [LMS Learning Hub](#lmslearninghub)
- [Program Administration Modes](#programadministrationmodes)
- [Learning Plans](#learningplans)
- [Grading Systems](#gradingsystems)
- [Behind the Scenes](#behindthescenes)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


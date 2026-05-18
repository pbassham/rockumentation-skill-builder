---
description: "Use when users want to learn about the Learning Hub, how to enroll in courses and programs, or how to access class workspaces and learning activities"
source: "https://community.rockrms.com/documentation/bookcontent/43/354"
sourceLabel: Learning Management System
---
> **Path:** Learning Management System > LMS Learning Hub

LMS Learning Hub

If you visit the */learn* page on the Rock site, you'll find what we call the Learning Hub. This page showcases the Learning programs and courses that you've configured as *Public*.

# Learn

While we've created a set of pages which will work for most churches, you are welcome to create unique pages tailored to your specific needs using these LMS blocks and the Lava templates in their block settings.

![An example Learning Hub page](https://rockrms.blob.core.windows.net/documentation/Books/43/1.17.0/images/learning-hub-example.png)

Learning Hub Page

Potential students can read about each course for the programs you offer and enroll in them. Selecting a program redirects them to the program's course list page.

![An example Program Courses page](https://rockrms.blob.core.windows.net/documentation/Books/43/1.17.0/images/learning-hub-program-courses.png)

Program Courses

As expected, this page shows all the courses for the program. If the person is logged in, it will also indicate courses they have completed or are currently enrolled in. Selecting a course directs them to the course detail page.

![An example Program Course description](https://rockrms.blob.core.windows.net/documentation/Books/43/1.17.0/images/learning-hub-program-course-description.png)

Course Description

This page provides all the necessary information about the course. It will also allow the individual to sign-up for any classes that are open for enrollment.

![An example class enrollment](https://rockrms.blob.core.windows.net/documentation/Books/43/1.17.0/images/learning-hub-program-class-enrollment.png)

Class Enrollment

Once enrolled, a participant student will have a *Class Workspace* which serves as the main portal for taking the class.

![An example class enrollment](https://rockrms.blob.core.windows.net/documentation/Books/43/1.17.0/images/learning-hub-program-class-enrollment-success.png)

Class Enrollment Success

# On-Demand Class Workspace Example

A set of learning plan activities might look like this in the student's *Class Workspace*.

![An example 'video watch' activity](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-hub-class-activity1-v18.png)

Video Watch Activity

![An example 'Acknowledgment' activity](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-hub-class-activity2-v18.png)

Acknowledgment Activity

![An example 'Assessment' activity](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/learning-hub-class-activity3-v18.png)

Assessment Activity

# Academic Calendar Class Workspace Example

The workspace for a class under a program using the Academic Calendar mode looks slightly different. It includes a tab bar at the top that shows an overview of the class and class progress, along with tabs for Activities/Assignments and the class Syllabus.

![An example Academic Calendar class workspace](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/academic-calendar-workspace-example-v18.png)

Academic Calendar Class workspace

# Sending Class Announcements Immediately

To send a class announcement right away, run the *Send Learning Notifications* job (it runs once daily by default).  
  
To ensure SMS messages work smoothly, go to Settings \> System Communications \> Learning Activity Available, and in the SMS section, enter a *From Number* in the *From* field. If the *From Number* is missing, the job will throw an exception with the warning: “A From Number was not provided.”


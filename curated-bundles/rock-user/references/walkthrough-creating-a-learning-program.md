---
description: "Use when a user needs to learn how to create a learning program, course, or class in Rock's Learning Management System"
source: "https://community.rockrms.com/documentation/bookcontent/43/354"
sourceLabel: Learning Management System
---
> **Path:** Learning Management System > Walkthrough: Creating a Learning Program

Walkthrough: Creating a Learning Program

Let's walk through the process of creating a simple learning program using the *On-Demand* mode. We'll create a program, a course, a class, and a learning plan for that class.

# Step 1: Create a Program

First, we'll create our program, "Volunteer Training".

![Creating a program](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/walk-through-create-program-2-v18.png)

Creating a Program

Once saved, you are in 'Configure Program' mode. You'll notice a Back to Program Overview button which would let you switch to the other administration mode. We'll cover both *Configure Program* and *Program Overview* modes in the [Program Administration Modes](#programadministrationmodes) chapter later.

![In Configure Program mode](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-mode-v18.png)

Program Administration Mode: Configure Program

For now, stay in the *Configure Program* mode to set up a new course for the program.

# Step 2: Create a Course

When you're in *Configure Program* mode, you can create a course.

![In Configure Program mode](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-mode-v18.png)

Configure Program Mode

Click the button to open a form where you can name the course. If you want to provide a more in-depth description, you can add it under the Description tab.

Here, we're creating the Child Protection and Safety course, and for this example, we will prevent people from enrolling unless they've already completed the 'Bible Study Essentials' course. This can be set up as a Prerequisite Requirement.

![Creating a course](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-course-v18.png)

Creating a Course

# Images

If you intend to show these courses on your website to your volunteer public, it's a good idea to include a simple image that represents the course.

# Step 3: Editing the Class

Once you save, an initial class will be automatically created for you. Select this class so we can set up the required learning activities and assign a facilitator (if needed) to oversee grading for the class.

![The initial class for a course](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-course-initial-class-v18.png)

Course Initial Class

First, edit the "Initial Class" to rename it to something more appropriate. Next, choose a grading system that suits your needs. For *On-Demand* classes, the *Completion* grading system is commonly used.

![Editing the initial class to rename and choose a grading system](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-class-edit-v18.png)

Editing the Initial Class

Rock includes the following grading systems out of the box:

- **Completion:** A simplified system that assesses whether participants have fulfilled all required tasks or activities.
- **Pass/Fail:** Pass/Fail: This system evaluates whether participants meet a minimum standard to pass, without assigning specific scores or grades. It simplifies assessment into two outcomes: "Pass" or "Fail."
- **Letter Grade:** A traditional system that assigns a letter grade (e.g., A, B, C) based on performance, reflecting varying levels of achievement according to a predetermined scale.

It's also possible to customize these grading systems or create your own. You can learn more about this in the [Grading Systems](#gradingsystems) chapter.

# Managing Assessment Retakes

If you’re using a grading system other than *Completion*, be aware that the LMS marks the class as complete even if the participant fails.

We’ve intentionally left this flexible, since organizations differ significantly in how they manage retakes for Pass/Fail assessments. Depending on your organization’s policies, you might consider one of the following options:

- Create a workflow to reset completion and allow retakes.
- Build a Lava-based page or button for assessment retries.
- Use an admin process to manually manage retakes.

Evaluate your organization’s needs and select the approach that best aligns with your internal processes.

# Step 4: Creating the Learning Plan

Next, let's set up a quick 'watch a required video' activity as the learning plan for our class.

![Create a Learning Plan](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-class-learning-plan-v18.png)

Create a Learning Plan

Here, we've selected the *Video Watch* Activity Type and chosen a video from our Media Account. The *Completion Threshold* is set to 95%, requiring students to watch at least that much before progressing to the next activity. You can also assign a point value to the video if needed.

![Creating a Learning Plan activity](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-class-learning-plan-activity-v18.png)

Creating a Learning Plan Activity

While some fields are common across all Activity Types, each type also includes unique fields tailored to its purpose. In this example, we've configured additional options to complete the Learning Plan.

![A Learning Plan activities](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/create-learning-program-class-learning-plan-activities-v18.png)

Learning Plan Activities

# Learning Plans and Classes

Learning Plans are tied to Classes, not directly to Courses. This design allows for easier adjustments to *classes* over time. If Learning Plans were tied to Courses, changes could disrupt existing and completed class student assignments.

But don't worry! We've made it simple to copy a class, enabling you to make quick adjustments for future sessions. This process will be covered in a later section.

Finally, use the other two tabs to add facilitators who will grade assignments and enroll students. Alternatively, you can enable students to sign up directly on your website—this process is explained in the Learning Hub chapter.

If you've made your Program *Public*, you'll see it when you visit the Learning Hub page on your website.


---

## Learning Management System {#learning-management-system}

> **Path:** Learning Management System

This skill catalogs the chapters of *Learning Management System* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Overview {#overview}

> **Path:** Learning Management System > Overview

Starting in v17, the Learning Management System (LMS) in Rock RMS provides tools to create and manage educational content, training programs, and courses within your organization. This will allow you to assign training, track progress, and maintain training records.

Rock's LMS is designed to support two distinct scenarios:

1. **On-Demand:** This mode is designed for flexibility, allowing classes to run continuously without being tied to a specific time frame. Students can join and complete courses at their own pace. This straightforward structure makes it ideal for ongoing or self-paced learning environments.
2. **Academic Calendar:** This mode is designed for programs that require strict time-based semesters, often found in more traditional academic settings. This introduces some additional complexity, and while it provides features like a class progress bar, a syllabus for detailed course planning, and a notifications area for managing assignments, these tools are most beneficial for structured, residency-style programs. For simpler or ongoing courses, these additional features may not be necessary, and the flexibility of *On-Demand* mode is likely a better fit.

When in doubt keep it simple and use On-Demand. Academic mode is really intended for organizations that have residency/university programs.

## Terms

Before we get started, let's clarify a few terms:

- **Program:** The Learning Program is the highest level of the learning hierarchy and represents a collection of related courses. Examples of a program could include Biblical Studies, Student Residency, or Volunteer Training.
- **Course:** The Learning Course represents a specific type of class that is offered in the program. Examples of a course might be Torah, Gospels, Biblical Hermeneutics, or Emergency Response Training. For each course, you will have one or more instances of a class, depending on the mode or desired class size.
- **Semester:** The Learning Semester is a time block used to group classes for programs that are in the *Academic Calendar* mode. Examples might include Fall 2024, Spring 2025, etc. This won't apply to *On-Demand* mode since those classes typically don't need to be bound by a timeframe.
- **Class:** The Learning Class is an occurrence of the course for a given time. Examples of a class would be Torah – Spring 2025 or Gospels – Spring 2025. The class is generally tied to a collection of the following:
	- **Learning Plans:** These are the building blocks of your class, consisting of activities that guide students through the course. Rock provides several *Activity Types* to accommodate different learning styles and objectives. For example, an activity might involve watching a video, completing an assessment (quiz or test), uploading a written paper, or delivering a presentation in front of a teacher or class. The *Activity Types* are:
		- **Acknowledgment:** An activity that collects the student's acknowledgment of a statement you configure.
				- **Assessment:** A configurable activity that presents multiple-choice and short-answer questions to evaluate the student's understanding.
				- **File Upload:** An activity that allows students to submit files, such as written papers, to the teacher or facilitator.
				- **Point Assessment:** An activity that provides the student and teacher/facilitator with instructions and a grading rubric for an assignment.
				- **Video Watch:** An activity that ensures students watch a specified portion of a video as part of the coursework.
		- **Students:** Individuals enrolled in the class.
		- **Facilitator(s):** Teachers or assistants who grade learning activities.
- **Grading System:** The LMS offers flexible grading systems (Completion, Pass/Fail, Letter Grade) to evaluate and track student progress in a class. These can be customized to suit your organization's needs and are detailed in a later chapter.
![A relationship diagram of the LMS anatomy](https://rockrms.blob.core.windows.net/documentation/Books/43/1.17.0/images/overview-relationship-diagram.png)

LMS Relationship Diagram

## What You'll See

Now that we've covered the basics, let's explore what you'll encounter when working with the LMS. Keep in mind that LMS features can be accessed in two areas: internally within the Rock system (/people/learn) and externally through the [Learning Hub](#lmslearninghub) (/learn), which we'll cover in a later chapter.

![The internal Learn page](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/overview-learn-internal-v18.png)

Internal - People/Learn

Once your classes are set up, the external-facing Learning Hub page will showcase all the programs and classes you offer.

![The external Learning Hub page](https://rockrms.blob.core.windows.net/documentation/Books/43/1.17.0/images/overview-learning-hub-external.png)

External - Learning Hub Page


---

## Academic Calendar Configuration Mode {#academic-calendar-configuration-mode}

> **Path:** Learning Management System > Academic Calendar Configuration Mode

Academic Calendar Configuration Mode

We walked through the *On-Demand Learning* configuration mode. Now, let's take a brief detour to explore the differences with the *Academic Calendar* mode.

# Academic Calendar

Creating an *Academic Calendar* program is very similar to setting up an *On-Demand Learning* program. The key difference is the addition of semesters. Semesters have a start date, an end date, and an enrollment close date, which prevents new students from enrolling in classes associated with that semester after the specified deadline.

![Screenshot showing Configuration Mode 'Academic Calendar'](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/academic-calendar-configuration-mode-2-v18.png)

Academic Calendar Configuration Mode

Under the program details, you'll find a tab that lists the semesters associated with the program.

![Screenshot showing a list of Semesters](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/academic-calendar-semesters-v18.png)

Academic Calendar Semesters

![Screenshot showing the creation of a Semester](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/academic-calendar-semesters-creating-v18.png)

Creating a Semester

Additional tabs will also be shown when viewing the class detail. A Content tab will allow you to create additional pages that will appear in the Student's *Class Workspace*. The Annoucements tab will be shown depending on the *Enable Annoucenements* found under Advanced Settings in the *Course* details.

![Screenshot showing additional tabs on the class details](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/academic-calendar-class-tabs-v18.png)

Additional Tabs on Class Details

Students enrolled in *Academic Calendar* program classes will have a different experience in their *Class Workspace*, which we'll explore at the end of the [Learning Hub](#lmslearninghub) chapter.


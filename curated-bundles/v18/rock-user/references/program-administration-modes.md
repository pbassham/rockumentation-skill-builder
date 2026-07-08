---
description: Use when user asks about switching between Program Overview and Configure Program modes or understanding LMS administration roles and permissions
source: "https://community.rockrms.com/documentation/bookcontent/43/354"
sourceLabel: Learning Management System
---
> **Path:** Learning Management System > Program Administration Modes

Program Administration Modes

When administering programs, you can operate in one of two modes:

- **Program Overview:** Focused on the day-to-day tasks of running a class, such as grading assignments, reviewing student comments, and monitoring progress.
- **Configure Program:** Used for configuring program details, such as setting up courses, classes, and the learning plan for a class. When you initially set up courses and classes, you were working in Configure Program mode.

# With Permission

If you have the required permissions, a toggle button will appear, allowing you to switch between modes. However, once the course and learning activities are set up, you'll generally stay in Program Overview mode for day-to-day management.

![Configure Program mode](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-modes-program-settings-v18.png)

Configure Program Mode

![program overview mode](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-modes-program-operations-v18.png)

Program Overview Mode

Notice how the content changes beneath the course depending on the selected mode. For some roles, such as Facilitators, they will only ever use *Program Overview* mode.

# Security

Rock includes two new roles for the LMS:

- **RSR - LMS Administration:** This role is for those overseeing the entire LMS system. They can edit nearly all LMS components except grades. Permissions for viewing and editing grades are controlled separately with two security actions: *View Grades* and *Edit Grades*.
- **RSR - LMS Workers:** This role is for individuals needing internal access to the Learning Management System, such as class Facilitators, Program Editors, and Course Editors.

# Remember

Facilitators added to a class automatically gain permissions to view and edit grades, even without additional security rights. However, ensure they are assigned the *RSR - LMS Workers* role to access class and program pages.

# External Site Access

If *Enforce Public Security* is enabled on a program, anyone with program access on your external site can also view potentially sensitive info on the program if they can reach your internal site. To prevent this, enforce page security under People \> Learn.

As in other areas of Rock, LMS security settings can be granular, but we recommend keeping them as simple as possible. To grant certain people or roles the ability to edit programs or courses, use the security button on the relevant Program or Course.

Security is inherited within the LMS hierarchy:

- The Learning Class inherits security from the Learning Course.
- The Learning Course inherits security from the Learning Program.

This inheritance allows you to apply security settings at the highest necessary level, eliminating the need to configure each layer individually.

![Learning course inherited security](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-security-v18.png)

Learning Course Security

If someone other than the Facilitator needs permission to view or edit grades, set this security at the appropriate level based on your requirements.

# Facilitators

Facilitators must be assigned to the *RSR - LMS Workers* role after being approved to serve in this capacity. That role grants them access to the internal LMS system, enabling them to grade student assignments and related activities.

After logging in, facilitators can view the class details, including the learning plan and student information. The LMS highlights activities that need their attention with clear indicators, helping facilitators prioritize tasks that require attention.

![Learning Plan alerts](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-modes-program-operations-learning-plan-alerts-v18.png)

Learning Plan Alerts

# Configure Program

This is the mode used when setting up new courses, semesters, classes and class learning plans.

![Learning Plan alerts](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-program-settings-editing-program-2-v18.png)

Editing a Program

# Semesters (Academic Calendar Mode Only)

When viewing a program that uses *Academic Calendar* mode, an additional *Semesters* tab will appear for listing and editing semester details.

![semester list](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-modes-academic-calendar-semesters-v18.png)

Semesters

In *Academic Calendar*, mode you must set up semesters with start and end dates as a place to put the course and classes.

![Editing a semester](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/academic-calendar-semesters-creating-v18.png)

Editing a Semester

# Courses

Courses are a specific type of class that is offered in the program. You can create one or more instances of these depending on the settings or desired class size.

![Editing a course](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/lms-course-settings-v18.png)

Editing a Course

# Classes

A class represents a specific instance of a course offered during a particular time period. Each class has its own Learning Plans, students, and facilitator(s).

![Editing a class](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-modes-program-settings-class-edit-v18.png)

Editing a Class

# Cloning Classes

When the day comes when you must make a new version of an existing class, save time by using the Copy button. This duplicates the class and its learning plan activities but excludes students and facilitators.

For always-active (On-Demand) classes, remember to uncheck the *Public* checkbox on the newly cloned class until it's fully prepared. This prevents enrollment before it's ready. Once the new class is complete, re-check the *Public* option for the new class and uncheck it on the old class.

![Copying a class](https://rockrms.blob.core.windows.net/documentation/Books/43/1.18.0/images/program-administration-clone-class-v18.png)

Copying a Class

Once the class is set up, the final steps are to create Learning Plans and add facilitators, and optionally, students. Adding facilitators and students is simple, and details about creating Learning Plans are covered in the next chapter.


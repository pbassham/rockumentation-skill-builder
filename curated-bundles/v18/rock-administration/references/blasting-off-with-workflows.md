---
description: "Use when learning about workflow automation basics, use cases, and how to implement request systems, data change triggers, or scheduled background tasks in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows

This skill catalogs the chapters of *Blasting Off With Workflows* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Blasting Off With Workflows > Welcome

Workflows are all around Rock. Do you want to know what workflows do? They're used for check-in, requests, even to authorize changes to data. You have a choice: embrace workflows or deny the truth. The truth is that without them you are a slave to repetition. Stuck in a virtual prison of repetitive time-wasting activity.

.... dramatic pause... sigh...

Unfortunately, you can't just hear about what workflows can do, you must see them for yourself.

This is your last chance. After this there's no turning back. You can take the blue pill—the story ends and it's back to a life of manually clicking through screen after screen. Or you can take the red pill—you'll enter a wonderland and discover the power that automation can bring to your life.

The choice is yours. You must decide.

Confused about all this pill talk? [This might help.](https://www.youtube.com/watch?v=zE7PKRjrid4)


---

## What's The Use? {#whats-the-use}

> **Path:** Blasting Off With Workflows > What's The Use?

What's The Use?

Workflows. That word can be confusing. So, let's simplify it. Workflows are a series of steps that can be automated. We all know computers are better at repetitive tasks than humans. Rock workflows provide a framework for getting computers to do what they're good at so we can focus on what we humans do best - relationships.

So, what can Rock do? We’re glad you asked!

- **Request Systems:** One common use for Rock workflows is to create request systems that can take information from a person and provide automated flow based on their input. An HR Position Request or IT Request are good examples of these functions.
- **Data Changes:** Workflows can be launched in response to data changes in Rock. For instance, you could configure a workflow to be launched whenever a group is added to the system. This workflow could email an administrator, or even prevent that creation if certain information about the group is not provided.
- **Background Tasks:** By using a Rock Job, you can enable a workflow to run on a specified schedule.

When you're done with this manual, we think you'll see how workflows empower you to create powerful application logic without needing to become a programmer. Once you understand the basics, your mind will start racing with all of the ways you can put them to use.

These are just the tip of the iceberg of how workflows can be used within an organization. Our fear is the list above will pigeonhole your thinking of when and how to use workflows. When you're looking to solve an organizational need, be sure to think out-of-the-box when it comes to using workflows.

# A Sample Workflow

Let's take a look at a sample workflow to get an idea of what's possible. In our sample, the fictitious "Rock Solid Church" has implemented a human resources process to help manage new position approvals. With this process in place let's say that Ted Decker wants to get approval to hire a part-time event planner. Let's walk through the workflow that has been defined.

![Sample Workflow](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/hr-process-overview-v12.png)

Sample Workflow

This is just a quick example of one workflow. We'll look behind the scenes of this specific workflow later in the chapter [Building a Simple Workflow](#buildingasimpleworkflow).


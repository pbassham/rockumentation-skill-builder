---
description: "Use when configuring workflow actions in Rock, including action order, filters, conditional execution, and attribute-based matching criteria"
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Actions

As previously mentioned, actions are the worker bees of workflows. They are broken down into categories to make them easier to find. Let's take a look at the basic configuration settings of actions and then look at the actions that come out of the box.

# Action Order Is Important

Be careful to define your actions in the right order because that's the order in which they'll execute.

# Action Configuration

While each action type will have configuration settings unique to its purpose, all actions do share some similar configuration settings. Let's look at these common settings. They can be found by clicking on an activity in a workflow configuration.

![Action Overview](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/action-overview-v13.png)

Action Overview

# Action Filters

We learned about ways we can control the flow of actions inside an activity in the previous section. *Action Filters* provide us with another powerful way of controlling the flow logic of a workflow. They allow you to only run an action if the value of an attribute meets a criterion you define.

![Action Filter](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/action-filter-open-v11.png)

Action Filter Configuration

When an action has a filter configured, the filter icon will display in yellow to help you know that a filter is present.

![Action Filter Notation](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/action-filter-closed.png)

Action Filter Notation

Although most of the filter match criteria are self-explanatory, the *Regular Expression* is possibly unfamiliar to you. Simply put, a regular expression is a sequence of characters that define a search pattern and using them you can achieve powerful *text* matching. For example, if you wanted to match a prayer request text for the phrases "suicide", "SUICIDE", "kill himself", "kill herself", or "kill myself" you could use a regular expression value of `(?i)(suicide|kill (h|m)(\S+)(\s*)self)`. You can find [a Microsoft Regular Expression Quick Reference](https://msdn.microsoft.com/en-us/library/az24scfc\(v=vs.110\).aspx) online and use a tool like [https://www.debuggex.com/](https://www.debuggex.com/) for testing your new creations.

# Important

Knowing the text value of an attribute is key when setting up filters. For text attributes this is pretty straight forward. For other types of attributes, you need to know more about their internals. For instance, a 'Boolean' attribute's text value would be 'True' or 'False' while a person attribute would be the GUID of the person alias. The full list of different [attribute field types can be found here](https://community.rockrms.com/lava/workflows).

Sometimes, a workflow action might not be able to finish its job. This could happen because the "Run If" conditions needed to run the action aren't met. To help your workflow run smoother in this case, you may consider enabling the *Complete Action If Criteria Unmet* option. When you turn this on for a specific action, Rock will automatically mark the action as "Completed" even if the conditions aren't met. This way, you won't have to worry about unfinished business.

![Complete Action If Criteria Unmet](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-config16-v18.png)

Complete Action If Criteria Unmet

Note, when an action is completed this way, Rock will keep a record of it in the workflow log. The log will show that the action couldn't be finished but was marked as complete.

# Default Action Types

For a listing of Rock's workflow actions, see the [Workflow Actions Documentation](https://community.rockrms.com/WorkflowActions). There we outline a number of actions that come with Rock, providing tips on when and how to use them. Screenshots of the settings are also provided.

# A Note About Check-in Actions

Many of Rock's workflow actions are specifically used for check-in workflows. We won't be covering them in this manual since very few people will be using them.


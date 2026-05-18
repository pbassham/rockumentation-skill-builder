---
description: Use when you need to launch a new workflow or activate activities on existing workflows using Lava commands
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Commands > Workflow Activate

v7.0

This Lava command can launch a new workflow or activate a new activity on a current workflow.

## The Basics

Let's take a simple example of launching a new workflow.

```
{% workflowactivate workflowtype:'21' %}
  Activated new workflow with the id of #{{ Workflow.Id }}.
{% endworkflowactivate %}
```

Bam! A new workflow, of type 21, has been launched. The Id of this new workflow is provided by {{ Workflow.Id }}

**Tip** This command requires you to know the Id of the workflow type and activity types. These numbers can be found on the workflow configuration screen.

As you've seen, a variable called 'Workflow' is available inside of the command block. This allows you access to the full workflow object. In fact, three different objects are provided for your use.

- **Workflow** The new/existing workflow that was processed.
- **Activity** The new activity that was processed (if activating an activity).
- **Error** Contains an error message if something went wrong, empty if no error.

## Parameters

With the basics under our belt, let's see what else is possible.

- [workflowtype](#workflowtype)
- [workflowid](#workflowid)
- [workflowname](#workflowname)
- [activitytype](#activitytype)

## Workflow Type

We already saw this one in action above, but we should note that this parameter takes either the Id of the workflow type OR the Guid.

```
{% workflowactivate workflowtype:'21' %}
  Activated new workflow with the Id of #{{ Workflow.Id }}.
{% endworkflowactivate %}
```
```
{% workflowactivate workflowtype:'8fedc6ee-8630-41ed-9fc5-c7157fd1eaa4' %}
  Activated new workflow with the id of #{{ Workflow.Id }}.
{% endworkflowactivate %}
```

## Workflow Id

This parameter loads up an existing workflow with the provided Id. This allows you to run specific activities on it (more on that later).

```
{% workflowactivate workflowid:'121' %}
  This workflow is named #{{ Workflow.Name }}.
{% endworkflowactivate %}
```

## Workflow Name

This parameter makes it easy to provide a name for your workflow.

```
{% workflowactivate workflowtype:'21' workflowname:'My Workflow' %}
  Activated new workflow with the id of #{{ Workflow.Id }} and name of {{ Workflow.Name }}.
{% endworkflowactivate %}
```

Note that you can make your name dynamic by using Lava.

```
{% workflowactivate workflowtype:'21' workflowname:'{{ CurrentPerson.FullName }} Workflow' %}
  Activated new workflow with the id of #{{ Workflow.Id }} and name of {{ Workflow.Name }}.
{% endworkflowactivate %}
```

## Activity Type

Already have a workflow instance and want to launch an activity on it? No problem!

```
{% workflowactivate workflowid:122 activitytype:'34' %}
  Activated new activity {{ Activity.Name }} with id #{{ Activity.Id }} in workflow {{ Workflow.Name }}.
{% endworkflowactivate %}
```

The value for activitytype can also be a Guid.

## Ok... But What About Attributes?!

Super glad you asked! Attributes are a key part of workflows. Any other key/value you provide in your command will be assumed to be an attribute. The command will then set the value of the workflow attributes, or workflow activity attributes, with the same key.

```
{% workflowactivate workflowtype:'21' color:'Red' requester:'{{ CurrentPerson.PrimaryAlias.Guid }}' %}
  Activated new workflow with the id of #{{ Workflow.Id }} and name of {{ Workflow.Name }}.
{% endworkflowactivate %}
```

**Important** To correctly set attribute values on a workflow, it's important that you know what type that attribute expects. See the [Workflows and Lava page](https://www.rockrms.com/page/736) for details on the stored values for each of Rock's field types.


---

## Intro to Shortcodes {#intro-to-shortcodes}

> **Path:** Lava > Shortcodes > Intro to Shortcodes

Shortcodes are a way to make Lava simpler and easier to read. They allow you to replace a simple Lava tag with a complex template written by a Lava specialist. This allows you to do some really powerful things without having to know how everything works.

While shortcodes are super powerful, they're also easy to develop. Everything you'll need to get up and running is right here in this short manual.


---

## Types of Shortcodes {#types-of-shortcodes}

> **Path:** Lava > Shortcodes > Types of Shortcodes

There are only two types of shortcodes: inline and block. Selecting the correct type is important as changing them in the future will break other people's Lava templates. Both short code types use the syntax: `{[ shortcode ]}`

The first type is an 'inline' shortcode. This is a simple shortcode that does not require an end tag. Just reference the shortcode and provide a list of parameters and you’re done!

**Inline Example:**

```
{[ youtube id:'8kpHK4YIwY4' showinfo:'false' controls:'false' ]}
```

The second type of shortcode is the 'block' type. Like other Lava commands it has both a start and an end tag. The content you provide inside the tags will be passed to the shortcode for use in its template.

**Block Example:**

```
{[ parallax image:'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/star-wars-wallpaper-4.jpg' speed:'0.2' height:'400px' position:'top' contentpadding:'20px' ]}
<h1>Hello World</h1>
{[ endparallax ]}
```


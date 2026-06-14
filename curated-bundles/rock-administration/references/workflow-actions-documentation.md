---
description: Use when configuring workflow actions to execute AI prompts and send text to AI providers for generating responses
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation

Workflow actions are the worker bees of workflows. True power comes from understanding your tools so you can best bring them together to build something great.

#### Workflow Documentation

For more information on workflows and how to use workflow actions please check out our [Workflow Documentation](https://community.rockrms.com/documentation/core-concepts/workflows).


---

## AI {#ai}

> **Path:** Workflow Actions Documentation > Action Categories > AI

# AI

All the details for the ai category.

 # AI Completion

Show Details

v17.1

Executes a specified AI prompt.

Takes a prompt as an input, runs it through your selected AI provider, and provides a response.

You must have an AI provider configured in order to use this action. For setup instructions, check out the [AI Providers](https://community.rockrms.com/documentation/bookcontent/9/#aiproviders) documentation in the **Rock Admin Hero Guide**.

![](https://community.rockrms.com/GetImage.ashx?Guid=08eeb775-11c6-4bc7-93cf-b555d548fee3)  
**Additional Details**

Here's an overview of the settings available for this action:

- **Prompt:** The text you want to send to the AI provider. Can be set from an **Attribute Value** if you prefer flexibility.
- **Provider:** Choose the AI provider to use for the completion. Leave blank to use the default provider.
- **Temperature:** Set how random or creative your prompt output is. Most providers range from 0-2. Check your selected AI provider's documentation for exact values.
- **Output Attribute:** Select the activity or workflow attribute to save the AI prompt output to.


---

## Assessments {#assessments}

> **Path:** Workflow Actions Documentation > Action Categories > Assessments

# Assessments

All the details for the assessments category.

 # Assessment Request Create

Show Details

v9.0

This action will create and save an assessment request.

This action will create and save an assessment request for each of the assessments provided, for the given person according to the attribute selected. You can also optionally provide a Due Date, and an attribute to define the person who is making the request.

![](https://community.rockrms.com/GetImage.ashx?Guid=144c58cc-445e-42bc-a162-389d6b779e3f)


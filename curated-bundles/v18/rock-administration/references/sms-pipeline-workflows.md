---
description: Use when configuring workflows triggered by SMS messages in the SMS Pipeline feature or migrating from Text to Workflow
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > SMS Pipeline Workflows

SMS Pipeline Workflows

In this chapter we'll describe how to configure workflows that are launched from the [SMS Pipeline](https://community.rockrms.com/documentation/bookcontent/8#smspipeline).

# Looking for Text to Workflow?

Before the SMS Pipeline was introduced, Text to Workflow was the go-to solution for automating SMS processes in Rock. If you're already using Text to Workflow your configuration will still work, but we recommend using the [SMS Pipeline](https://community.rockrms.com/documentation/bookcontent/8#smspipeline) feature going forward. You'll find it's even more powerful and flexible than Text to Workflow.

Workflows initiated from the *SMS Pipeline* page are configured like other types of workflows described in this guide. The only difference is that these workflows will need to be configured to receive information about the SMS message from the pipeline. We'll walk you through that process below.

# Workflow Configuration for SMS Pipeline

As you've learned throughout this guide, there are lots of different ways to configure your workflow types. The example below is not intended to be a set of instructions that you must follow exactly for your workflow to function. We'll go over other options a little later. For now, we'll walk through an example just to explain the features.

First, keep in mind that the pipeline can send the information it has to your workflow automatically. For instance, your workflow configuration doesn’t require an action to identify the person. You’ll still need workflow attributes to store that information, so that’s where we’ll start. In this example we’ve set up only a few attributes that the pipeline can populate. See [below](#sms-pipeline-workflow-merge-fields) for the full list.

![Configure Workflow Attributes](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-for-pipeline-workflow-attributes-v18.png)

Configure Workflow Attributes

These attributes allow the person, their phone number and the content of their SMS text message to be sent directly to the workflow. From there, you can perform any number of Actions or Activities using those attributes.

In the example pictured below, we’ll add a Person Note that contains the person’s name and the text of the SMS message they sent.

![Example Workflow Action](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-for-pipeline-workflow-action-example-v18.png)

Example Workflow Action

As you can see in the above example, your workflow configuration for pipelines won’t be very different from other kinds of workflows. Actions and Attributes are set up and used in the same ways. However, there is some configuration you’ll need within the SMS Pipeline itself to make it all work. We’ll cover that in the next section.

# Working with the SMS Pipeline

After your workflow has been configured, you're ready to add it to the *SMS Pipeline*. In this section we'll highlight the pipeline configuration related to workflows.

For information on *SMS Pipelines* in general, see the [SMS Pipeline](https://community.rockrms.com/documentation/bookcontent/8#smspipeline) chapter of our [Communicating with Rock](https://community.rockrms.com/documentation/bookcontent/8) guide.

Pictured below is a basic example of a workflow configuration in the pipeline. Keep in mind the workflow configuration that was described in the prior section, because it will be referenced here.

![SMS Pipeline - Workflow Configuration](https://rockrms.blob.core.windows.net/documentation/Books/12/1.18.0/images/workflow-for-pipeline-set-up-pipeline-v18.png)

SMS Pipeline - Workflow Configuration

As described above, your pipeline configuration can send attribute values directly to your workflow's attributes. In the next section, we'll look at the details of how this works and the different attributes you can set.

## SMS Pipeline - Workflow Merge Fields

The SMS messages that you receive have more information associated with them than you might think. You can use [Lava](https://community.rockrms.com/Lava) to send that information directly from the pipeline to the workflow.

In the example pipeline above we used `{{ FromPerson.PrimaryAlias.Guid }}` in the *Workflow Attributes* Merge Template field. Using `{{ FromPerson.PrimaryAlias.Guid }}` identifies the person who sent the SMS message in a way that the workflow can receive it. This will be assigned to the 'Person' workflow attribute when the workflow is launched, using the attribute's *Key* as a reference point between the pipeline and the workflow. Similarly, we used `{{ FromPerson.FullName }}` to set the name of the launched workflow. Adding `.FullName` gives you the name of the person, as text.

# Warning: FromPhone is automatic

Don't add an attribute called `FromPhone` to the Workflow action in the pipeline unless you are intentionally trying to overwrite it. The one that is automatically placed there is the 'raw' value which has the '1' (country code) prepended onto it. If you manually add `FromPhone`, it will overwrite the value and use the one without the country code. That could lead to [unexpected behavior](https://github.com/SparkDevNetwork/Rock/issues/4431) in your workflow.

The table below lists other merge fields you can use to pass different types of information from the pipeline to your workflow's attributes.

| Merge Field | Description | Field Type |
| --- | --- | --- |
| {{ FromPerson.PrimaryAlias.Guid }} | The pipeline uses the person's phone number to look up the first person with that phone number. If it finds a match, it assigns that individual's record to FromPerson. If the phone number is used in more than one profile, the pipeline defaults to the first record of an adult with children. | Person |
| {{ FromPhone }} | The person's phone number, pulled from the inbound message, from the SMS gateway. This will automatically get added to the workflow as FromPhone and will include the country code (i.e., the raw phone number 18645555555). | Phone Number |
| {{ ToPhone }} | The SMS gateway number where the message was sent | Phone Number |
| {{ ReceivedDate }} | The date the message was received. | Date |
| {{ ReceivedTime }} | The time the message was received. | Time |
| {{ ReceivedDateTime }} | The date and time the message was received. | Date Time |
| {{ MessageBody }} | The content of the SMS message that was received. | Text or Memo |
| {{ MatchedGroups }} | If the RegEx expression provided contains matched groups, they are loaded into an array here. This is an advanced feature, so if you’re not sure what this means, don’t worry. You probably don’t need it. | Typically, you fill in a text field with a merge expression of a single result from the MatchedGroups array. |

  

In your workflow, avoid naming any attributes *SMSResponse*. If the workflow type that is initiated by the pipeline has an attribute with a key of `SMSResponse`, the contents of that attribute will be immediately sent to the person who texted in, bypassing any workflow processing.

# Using Attribute Set to Initiator

There are some reasons why you might want to have the workflow find values for its attributes instead of sending them from the pipeline. The first consideration is maintenance. The workflow attributes and the pipeline configuration must be kept in sync to work properly. Using the *Attribute Set to Initiator* approach instead, you don't have to worry about changes to the pipeline impacting your workflow's functionality as long as your workflow accounts for different scenarios.

The above point leads to the second consideration, which is flexibility. Using a method like *Attribute Set to Initiator* means the workflow can be launched from a variety of different sources. It will be more difficult to use the workflow in other contexts if it's designed to rely on specific data from the pipeline.

![Get Person and Name](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-for-pipeline-get-person-name-v13.png)

Get Person and Name

Let's pause here for a moment to mention *Nameless People*. When an SMS message is received, Rock will automatically try to identify the person. If the person isn't in Rock, a *Nameless Person* record is created. This special type of record gives Rock a way to keep track of the person even though all we have is their phone number. For more details, see the [Nameless People](https://community.rockrms.com/documentation/bookcontent/8#namelesspeople) section of our [Communicating with Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide.

The next workflow action, pictured below, is where we'll check for a *Nameless Person*. Your workflow options are limited if you don’t have a person’s record to work with. However, that doesn’t mean your process needs to exclude *Nameless People*. For instance, you can send the person a link to create a profile as pictured in the example below.

![Nameless Person - Send SMS](https://rockrms.blob.core.windows.net/documentation/Books/12/1.17.0/images/workflow-for-pipeline-reply-to-nameless-person-v13.png)

Nameless Person - Send SMS

If it's not a *Nameless Person* record, then the workflow action described above wouldn't run. Instead, we now know the workflow has a complete person record in-hand. You can use that information to perform any other actions or activities you need. At this point in the workflow configuration, we've left the pipeline behind. From here, the same tools and features described earlier in this guide can be used to build the rest of your workflow according to your needs.

Table of Contents

- [Welcome](#welcome)
- [What's The Use?](#whatstheuse)
- [Components Of A Workflow](#componentsofaworkflow)
- [Configuring A Workflow Type](#configuringaworkflowtype)
- [Workflow Import/Export](#workflowimportexport)
- [Activities](#activities)
- [Actions](#actions)
- [Launching Workflows](#launchingworkflows)
- [Lifecycle Of A Workflow](#lifecycleofaworkflow)
- [Working With Entry Forms](#workingwithentryforms)
- [Form Builder](#formbuilder)
- [Managing Workflow Instances](#managingworkflowinstances)
- [Persisted Vs. Non-Persisted Workflows](#persistedvs.nonpersistedworkflows)
- [Building A Simple Workflow](#buildingasimpleworkflow)
- [Built-In Workflows](#builtinworkflows)
- [Workflow Notes](#workflownotes)
- [Lava Tips For Workflows](#lavatipsforworkflows)
- [Securing Workflows](#securingworkflows)
- [Linking To Workflows](#linkingtoworkflows)
- [A Few Technical Details](#afewtechnicaldetails)
- [Webhook to Workflow](#webhooktoworkflow)
- [SMS Pipeline Workflows](#smspipelineworkflows)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


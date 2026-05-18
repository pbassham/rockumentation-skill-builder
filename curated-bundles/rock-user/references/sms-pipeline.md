---
description: "Use when configuring how Rock processes incoming SMS messages through pipelines, actions, and filters"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > SMS Pipeline

SMS Pipeline

In this chapter we’ll look at how Rock handles incoming SMS messages using Rock’s SMS Pipeline feature.

Rock’s SMS Pipeline is the entry point for all incoming SMS messages. Think of it as a switchboard operator that's directing each message to its intended action.

# The Fundamentals

Below is an overview of how the SMS Pipeline feature works. If some of these concepts are foreign to you right now, don’t worry. We’ll go over all the details in the next section.

1. An incoming SMS message is received into the pipeline.
2. The message flows down the pipeline, through a series of *Actions*. Actions are activities that the system performs, like launching a workflow.
3. Each action has filters. The pipeline uses filters to analyze the message and its contents against criteria you provide. If the message meets your criteria, then the action is performed. If not, the message moves to the next action. This process repeats until an action is performed.
4. When an action is performed, the pipeline looks at the action’s *Continue* setting. This determines if the message should continue down the pipeline to the next action, or if the matched action is all that’s needed.
5. If a message continues down the pipeline after an action has already been performed, it works the same way as described in #3 above. Satisfying the filter criteria for one action does not mean the message automatically satisfies the filters on the remaining actions.

These general steps are repeated for each new message you receive. That means you can use a single pipeline to perform different actions for a variety of scenarios.

# Anatomy of Actions

Actions automate many of the tasks you would want to perform in Rock after receiving a text message. For instance, you might want to send the person an automated reply message. Or you might want to launch a workflow if the person’s message contains certain keywords.

Each action you add has its own settings and filters, giving you full control over what should happen and when.

There are four SMS Pipeline actions:

- Give
- Launch Workflow
- Reply
- SMS Conversations

We’ll use the Reply example pictured below to describe the properties of actions in general. Then in the following sections we’ll dive into each type of action individually. The below page can be accessed from Admin Tools \> Settings \> SMS Pipeline.

![SMS Pipeline](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-anatomy-of-actions-v18.png)

SMS Pipeline Actions

# SMS Pipeline Webhooks

You might have noticed the *Webhook URL* at the top of the *SMS Pipeline Detail* page. This identifies the pipeline you’re viewing. You’ll use this URL to link your phone numbers to a specific pipeline. See [below](#configuringtwilioforsmspipeline) for details.

# SMS Pipeline Actions

As noted in the prior section, all actions share some common properties. However, each type of action has unique features and properties that we’ll describe in detail below.

## SMS Conversations

This action will send the message over to the [SMS Conversations](#smsconversations) page, at which point you’re messaging with the person directly. There is only one filter for this action, and no additional unique properties.

Remember, the phone number filter references the number to which the person sent the message, not the person’s phone number. If this is left blank, then every message that reaches this action will go to the *SMS Conversations* page.

![SMS Conversations](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-sms-conversations-action-v18.png)

SMS Conversations

As pictured above, the SMS Conversations action is typically at the bottom of the pipeline. If the person’s message doesn’t meet the criteria for any of the other actions, this is how you can ensure it doesn’t fall through the cracks.

## Reply

The *Reply* action is an easy way to automate responding to an incoming text. You can customize the content of your response and personalize it for the recipient using Lava. The reply action can in some cases eliminate the need for a workflow if a specific message is always to be returned.

![Reply](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-connect-response-v18.png)

Reply

The example pictured above will only perform the Connect Response action if the words "serve" or "volunteer" are somewhere in the message's text. If the incoming text says "I would like to serve" then the contents of the *Response* field will be sent to the person as a text message. In this particular example a workflow might also be launched for this message, because the *Continue* option is enabled.

# Reserved Keywords

If one of the below keywords is received (as the entire body of the message), the SMS Pipeline will uncheck the *SMS* box for the person's phone number, and add the following icon next to the mobile number as seen when editing the *Person Profile*. In this case, any additional SMS message processing that may be in the pipeline will be skipped.

- **STOP**
- **STOPALL**
- **UNSUBSCRIBE**
- **CANCEL**
- **END**
- **QUIT**
- **REVOKE**
- **STOPALL**

## Launch Workflow

As the name implies, this action will launch a workflow. You’ll want to configure your workflow to receive information from the pipeline, using the same workflow attribute merge fields we cover in the [SMS Pipeline Workflows](https://community.rockrms.com/documentation/bookcontent/12#smspipelineworkflows) chapter of the [Blasting Off with Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide.

![Launch Workflow Action](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-launch-workflow-action-v18.png)

Launch Workflow Action

## Give

This action enables *Text Giving* functionality, allowing a person to send a text to donate using their phone.

The *Give* action isn't ready to use out of the box. An administrator will need to configure the settings for the *Utility Payment Entry* block in addition to SMS Pipeline setup. For details on *Text Giving* and the required configuration, head over to the [Rock Solid Finances](https://community.rockrms.com/documentation/bookcontent/15#text-giving) manual.

![Give Action](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-give-action-no-callouts-v18.png)

Give Action

# SMS Pipeline In Action

Let’s look at a completed pipeline to see how this all comes together. This pipeline has four actions and was designed to handle inquiries about small groups and connecting. Below each screenshot we’ll highlight the key points.

![Response](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-reply-action-group-response-v18.png)

Response

As pictured above, when an incoming text contains the word 'group', an auto-response will be sent to the person with more information about joining a group. In this case the processing stops, because the *Continue* option is not enabled.

If the SMS message doesn't contain the word 'group' then the "Connect Response" action will be evaluated because it's the next in line. If the message contains the word 'volunteer' or 'serve' an auto response gets sent with more information about getting connected to a serving team. The arrow on the action indicates that the continue functionality is enabled, and the next action will run if the message meets the requirements.

![Launch Workflow](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-launch-workflow-no-callouts-v18.png)

Launch Workflow

You'll note in the screenshot above that the workflow action has the same filters as the "Connect Response" action. That means any message which activates the "Connect Response" action will also launch this workflow.

Lastly, the pipeline continues down to the “SMS Conversations” action so that a staff member can directly connect with this person.

In this case, the "SMS Conversations" action has no filters applied. Knowing this, and looking at the pipeline as whole, all incoming SMS messages will end up in the *SMS Conversations* page except messages that contain the word 'group'.

If we enabled *Continue* in the "Group Response" action, then every incoming SMS message would go to the *SMS Conversations* page. In that case, a message containing the word 'group' would not satisfy the "Connect Response" and "Launch Workflow" filter criteria, so those actions won’t be performed.

In this example pipeline, if an SMS message is received that says "I'd like to learn more about your services" it would pass through the pipeline straight to the "SMS Conversations" action. No automated replies would be sent, and no workflows would be launched for that message because it does not meet the criteria for those actions.

## SMS Pipeline Lava

You can use [Lava](https://community.rockrms.com/Lava) to customize and personalize your pipeline’s actions. There are different merge fields depending on whether you're working with the Reply or Launch Workflow action.

![SMS Pipeline Response Lava](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-response-lava-v18.png)

SMS Pipeline Response Lava

### Launch Workflow Action Lava

Below is a list of Lava merge fields you can include in your pipeline when you're working with the Launch Workflow action. These are the same workflow attribute merge fields we cover in the [SMS Pipeline Workflows](https://community.rockrms.com/documentation/bookcontent/12#smspipelineworkflows) chapter of the [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide.

| Merge Field | Description | Field Type |
| --- | --- | --- |
| {{ FromPerson.PrimaryAlias.Guid }} | The pipeline uses the person's phone number to look up the first person with that phone number. If it finds a match, it assigns that individual's record to FromPerson. If the phone number is used in more than one profile, the pipeline defaults to the first record of an adult with children. | Person |
| {{ FromPhone }} | The person's phone number, pulled from the inbound message, from the SMS gateway. This will automatically get added to the workflow as FromPhone and will include the country code (i.e., the raw phone number 18645555555). | Phone Number |
| {{ ToPhone }} | The SMS gateway number where the message was sent. | Phone Number |
| {{ ReceivedDate }} | The date the message was received. | Date |
| {{ ReceivedTime }} | The time the message was received. | Time |
| {{ ReceivedDateTime }} | The date and time the message was received. | Date Time |
| {{ MessageBody }} | The content of the SMS message that was received. | Text or Memo |
| {{ MatchedGroups }} | If the RegEx expression provided contains matched groups, they are loaded into an array here. This is an advanced feature, so if you’re not sure what this means, don’t worry. You probably don’t need it. | Typically, you fill in a text field with a merge expression of a single result from the MatchedGroups array. |

### Reply Action Lava

Below is a list of Lava merge fields you can use when you're working with the *Reply* action. Note that each uses a prefix of `Message`.

| Merge Field | Description |
| --- | --- |
| {{ Message.FromNumber }} | The person’s phone number from the inbound message |
| {{ Message.ToNumber }} | The SMS number where the message was sent |
| {{ Message.FromPerson }} | The pipeline uses the person's phone number to look up the first person with that phone number. If it finds a match, it assigns the value to FromPerson. If the phone number is used in more than one profile, the pipeline defaults to the first record of an adult with children. This is the full Person object, so, for instance, you'll need `{{ Message.FromPerson.FullName }}` to get the person's full name. |
| {{ Message.Message }} | The content of the SMS message that was received |

# Adding New Pipelines

Technically a single pipeline is all you need in Rock. After a while though, you might find that your single pipeline becomes complex, especially if you have multiple numbers that you are supporting. In this case you can create additional pipelines. Please note though that a single SMS phone number can only work with a single pipeline, but a pipeline can service multiple SMS numbers.

To start, navigate to Admin Tools \> Settings \> SMS Pipeline. From here you can add, delete or edit your list of pipelines.

![SMS Pipeline List](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-pipeline-list-v18.png)

SMS Pipeline List

Click the button to add a new pipeline or click an existing pipeline to access its details. You can edit the 'Default' pipeline that ships with Rock, or you can create your own. In this example we’ll add a new pipeline from scratch so you can see the process.

The first thing you’ll need to do is provide a name and description for the pipeline. If you have multiple pipelines, be sure to make the name and description clear.

![Add New Pipeline](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-pipeline-add-new-pipeline-v18.png)

Add New Pipeline

Click the Save button, and that's all you need to start configuring your new pipeline using the instructions in the above sections. Remember, each pipeline can be associated with its own webhook (see [below](#configuringtwilioforsmspipeline)) for added flexibility.

# From One to Many

If you started using SMS Pipeline before Rock v11, you don't need to change anything. The webhook you have in place will continue to work. However, don't forget that a webhook will stop working if the associated pipeline is deleted.


---

## Under the Hood of Communications {#under-the-hood-of-communications}

> **Path:** Communicating With Rock > Under the Hood of Communications

Under the Hood of Communications

# Rock's Communication Engine

Like a car engine, Rock's communication tool has a number of different parts or components. Most of them can be found in the *Communications* screen (Admin Tools \> Communications). We'll be talking about many of them in depth throughout this guide, but you can read an overview of all of the parts in the [Communications](https://community.rockrms.com/documentation/bookcontent/9#communications) chapter of the Admin Hero Guide.

# Mediums and Transports

Like everything in Rock, the communications features are designed to be extensible for the future. That means the messages of tomorrow won't be limited by the messages of today. The communications engine is based on two types of components: mediums and transports. Let's look at how that works.

## Mediums

Think of mediums as methods of communicating. Today Rock provides an email medium, an SMS medium and a push notification medium. Other mediums could easily be added in the future. These mediums can be written by either the core developers of Rock or by third-party developers. If you don’t like it, change it! Mediums can be configured under: Admin Tools \> Settings \> Communication Mediums.

## Transports

Transports, on the other hand, can be thought of as the worker bees of the mediums. They do the actual work of getting the messages to their recipients. This is typically where you reach out to a third-party service like Mailgun (for email) or Twilio (for SMS messaging). Settings for the different transports are configured under Admin Tools \> Settings \> Communication Transports.

Some transports let you control how many recipients will be processed at the same time by adjusting the *Concurrent Send Workers* value. This lets you throttle your communications. High volumes of emails sent in a short period can be a red flag for spam activity. Also, large email bursts can potentially overload servers, possibly impacting Rock's performance.

A medium can only use one transport at a time. So, you can't have your email medium set up to use both Mailgun and SendGrid. Because the transport gets attached to the medium, you usually set up transports first.

# Communications Send Job

Usually when you send a communication, it will be sent immediately to a communication queue that gets processed in almost real-time. There is, however, a Rock Job that runs every 30 minutes to look for communications with a pending status. You can view this under: Admin Tools \> Settings \> Jobs Administration \> Send Communications.

You don’t need to worry about this job, but we wanted to point it out, so you know more about how communications are sent.

# Unsubscribing From Emails

It's very important that recipients of your emails have a way to unsubscribe from future emails, and that requests to unsubscribe are processed in a timely manner. Failure to do so can have legal implications, including fines of up to $51,744 for each individual email sent. Not to mention, your email reputation (a metric used by ISPs to help determine if your organization's email is spam) will suffer, resulting in a loss of deliverability.

To learn more about unsubscribing and what you can do to ensure you remain in compliance and stay off of spam lists, check the [Unsubscribing](#unsubscribing) section in the [Configuring Email](#configuringemail) chapter below.

# Bounced Mail

We know you have much to share, so let's make sure you have the opportunity to do that. You have to process bounced mail to keep your email addresses accurate and improve your email reputation.

Bounced messages are emails that are returned back to you after you send them because an email address is incorrect or no longer valid. Rock can automate this process if you use an email integration (i.e., Communication Transport) that supports the notification of these messages. Currently, the only core integration that supports bounced mail processing is Mailgun. You can read more on this integration in the [Integrations](#integrations) chapter of this manual. Third-party provided solutions may be available for other services.


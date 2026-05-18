---
description: "Use when users need guidance on setting up SMS functionality, configuring phone numbers, customizing opt-in messaging, or implementing SMS communication strategies in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > SMS in Detail

SMS in Detail

Before you can start using the SMS features Rock has to offer, you need to set up a phone number. This chapter provides the information you’ll need to get started.

# Boosting Engagement with SMS

In the modern era, SMS messaging has become the predominant means of communication, surpassing phone calls and emails in popularity. SMS messages are typically read promptly and are more likely to elicit swift responses. However, it is not permissible for any organization to send an SMS message to an individual unless the recipient has explicitly given their consent by opting in. As a result, Rock has incorporated an SMS Opt-in Checkbox in most areas where mobile phone numbers can be entered.

Furthermore, we recognize that every organization is unique and may have distinct legal requirements. Therefore, the verbiage for the SMS Opt-in checkbox can be completely customized to meet your specific needs. You can customize the SMS Opt-in message at Admin Tools \> Settings \> System Configuration under the UI Settings Tab.

# Add SMS Phone Number

You need to have a phone number before you can start sending and receiving texts. We recommend Twilio, and have a whole section for [setting up Twilio](#smstwilio) in a later chapter. Even if you don’t have a phone number set up yet, it’s important to be familiar with the *System Phone Number* settings because they are referenced later in this chapter.

These settings can be accessed and maintained from Admin Tools \> Settings \> System Phone Numbers.

![System Phone Number](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/system-phone-number-detail-v18.png)

System Phone Number

In addition to the Assigned to Person settings described above, you can apply security to each System Phone Number individually. Simply click the icon when viewing the Phone Number to apply security for that number. Please note that the security does not transfer over to *SMS Conversations*, *Communication Wizard* and *Simple Communication* blocks.

You may also want to review the block settings for [SMS Conversations](#smsconversations) to further refine how your numbers are used and who can see them.

# SMS Number Strategies

Now that you've seen how SMS replies are handled in Rock, let's touch briefly on strategies to implement this effectively in your organization.

SMS services like Twilio make it very inexpensive to rent phone numbers for SMS. (A number from Twilio runs only $1 per month.) Don't limit your organization to a single number if you need more than one. Think about getting a number for each department and/or heavy SMS user. It's also very easy to turn an SMS number on and off. You might grab a number for a large event and remove it after the event is over. You can also reuse a number internally by changing the *Response Recipient* as described above.

# MMS Considerations

Standard MMS (aka, Multimedia Messaging Service) messages allow you to send images, slideshows, videos and audio clips as attachments. While this means you can do some creative things with your communications, there are some limitations to keep in mind.

The biggest limitation is that the recipient's phone may not support all multimedia files. So, while you may be able to send a short video, not all of your recipients may be able to view it.

Another thing to keep in mind is that some mobile carriers limit the file size of attachments being sent over their network. For example, Twilio limits messages that combine text and images to 5MB. If you try to send, say, an MMS message combining text and video, and the total size is greater than 5MB, Twilio will prevent the message from sending. Before sending out a large number of messages, it's a good idea to test your communications on various handsets using different file formats and sizes. See what works and what doesn't.

## Twilio, Short Codes and MMS Messages

If you're using a Twilio short code, keep in mind that it doesn't automatically support MMS messages. You can add MMS capabilities for a one-time fee of $500. This is different than regular "long codes" (phone numbers) where MMS is usually automatically supported.

If you're not sure whether your account supports MMS messaging, check your Twilio Console. If you only see "Capabilities: SMS" and MMS is not listed, then it's likely you haven't purchased MMS for your short code.

See the [setting up Twilio](#smstwilio) section for more information on configuring Twilio as your SMS provider.

# Long Code Throttling

It's still a bit like the Wild West out there when it comes to SMS and MMS. Each carrier has its own rules and practices. For many carriers, sending or receiving too many messages too quickly will set off spam warnings, which results in messages either not being sent or not being received. This can be a real problem when you need to send information to a lot of people at once.

Fear not. We've got you covered. Out of the box, Rock comes configured with Long Code Throttling. This slows the delivery of non-short code numbers. By default, it is set to 500 milliseconds, or half of a second, which is the rate we've found works best for both speed and reliable delivery. You can modify the rate, though, by changing your Twilio transport settings (Admin Tools \> Settings \> Communication Transports). You can also disable Long Code Throttling altogether. Keep in mind, though, that this may result in your messages not being delivered.

# Configuring Twilio for SMS Pipeline

In the past, each SMS feature included its own webhook. The SMS Pipeline condenses those features into one place, so you only have to use one webhook. That means you can use a single phone number for a variety of different purposes.

To set your number up for the SMS pipeline in Twilio, set the *A Message Comes In* URL to:  
`https://YourServer/Webhooks/TwilioSMS.ashx?SmsPipelineId=YourPipelineId`

If you need multiple SMS Pipelines, you can link each one to your phone numbers by specifying the pipeline’s ID in the URL.

See the [Integrations](#smstwilio) chapter for more information on setting up Twilio in general.

# SMS Conversations

In the prior chapter we explain why many of your incoming SMS messages will end up getting passed from the *SMS Pipeline* into *SMS Conversations*. Now, let’s take a step back and see how to manage those messages, or messages that are sent to *SMS Conversations* directly. Navigate to People \> Communications \> SMS Conversations to start.

![SMS Conversation Page](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-conversations-v18.png)

SMS Conversations Page

We realize that every organization is different, so we added in settings allowing you to customize each feature for your needs.

Suppose you have the Students Director and First Impressions Director messaging their own volunteers. You can create multiple pages with the *SMS Conversations* block on them. Then on each page you can specify who has access and which number(s) can be used. Each ministry could have their own *SMS Conversations* page. To learn more about creating pages and adding blocks check out the [Designing and Building Websites using Rock](https://community.rockrms.com/documentation/BookContent/14#addingcontenttorock) guide.

# Real-Time SMS Responses

You no longer need to refresh the page to see new SMS messages. The system updates in Real-Time, displaying replies right away.

# Nameless People

Sooner or later, you’ll start receiving SMS messages from people and phone numbers you don’t recognize. If you’re worried that this will cause a snag in your processes, don’t be.

Rock will try to match the phone number of a new incoming SMS message to a person in the system. If it can’t find anyone with that number, Rock will create a *Nameless Person* record instead. This allows your processes to continue as normal, without knowing their name or other contact information. In most cases this will result in the message being passed from the SMS Pipeline to the *SMS Conversations* page. Other possible actions are limited because we don’t know who the person is.

![Nameless People in SMS Conversations](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-conversation-nameless-person-v18.png)

Nameless People in SMS Conversations

As new texts come in, you might lose track of your nameless people in the *SMS Conversations* page. Luckily, you can go to Admin Tools \> Settings \> Nameless People to see and manage your list of nameless records.

![Nameless People Page](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/nameless-people-page-v18.png)

Nameless People Page

# Where Did My Nameless Person Go?

Each night, the *RockCleanup* job will go through the Nameless record types to look for a matching person record. If it finds a match it will merge them for you and the Nameless record will be removed.

## Linking to an Existing Person

Once you know for sure who you’re talking to, you'll want to link the phone number (and the conversation) to an actual person in Rock. You'll do this from the *Link Phone Number to Person* page. You can get there from the *SMS Conversations* page or from the *Nameless People* page as described above.

![Link Phone To Person](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/link-phone-to-person-v13.png)

Link Phone Number to Person

# Respond from a Device

When you send an SMS message (see the [Communication Wizard](#communicationwizard) chapter) you'll select an SMS number to send from. When *Response Recipient Forwarding* is enabled as described earlier, responses will be forwarded to the response recipient's mobile phone with the sender's name and a response code.

The response code consists of the @ symbol followed by a three-digit number (e.g., @347). If further follow-up is required, the response recipient can use this code to reply back.

If your mind is swimming a bit, that’s OK. Let's look at an example. In our example Jenny has just sent out a bulk SMS message to several attendees reminding them of the car show that afternoon. Let's walk through a conversation she has with Alisha.

![SMS Example](https://rockrms.blob.core.windows.net/documentation/Books/8/1.17.0/images/sms-example.png)

SMS Example

Notice that both sides of the conversation are texting to Rock's SMS number (555) 351-5392. Little does Alisha know that Jenny's real number is 867-5309.

# SMS Snippets

The SMS Snippets feature allows you to streamline messaging by creating prewritten responses for future SMS conversations. Instead of typing repetitive messages manually, you can select from existing snippets directly within the *SMS Conversations* page and the Check-in Manager app (described in the [Checking-Out Check-in](https://community.rockrms.com/documentation/bookcontent/10#checkinmanager) guide).

Go to Admin Tools \> Settings \> SMS Snippets to start adding snippets for your organization.

![SMS Snippets](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-snippets-v18.png)

SMS Snippets

In the *Snippet Detail* view, you’ll see everything that makes up a snippet—its content, settings and options for managing it.

![Snippet Detail](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/snippet-detail-v18.png)

Snippet Detail

Admins can configure snippets with either *Personal* or *Shared* access, categorize them, and customize their content using Lava (remember to toggle the Text | Lava switch).

- *Shared* snippets are available to your entire organization.
- *Personal* snippets are private and help you create quick, reusable prompts for yourself (e.g., *"Ted, don't forget to turn off the lights before you leave the building tonight!"*).

# Snippet Categories

Using a lot of snippets? Keep them organized by creating categories in Admin Tools \> Settings \> Category Manager. Some blocks, including the one in the Check-in Manager's SMS feature, include a category selection setting. Configuring this ensures the right snippets are available in the right context.


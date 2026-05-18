---
description: "Use when configuring workflow actions to send communications via email, chat channels, direct messages, or on-demand communication flows"
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation > Action Categories > Communications

# Communications

All the details for the communications category.

 # Activate Communication Flow

Show Details

18.0

Triggers an On-Demand Communication Flow

#### Inputs

- **Communication Flow** – The On-Demand communication flow to trigger.
- **Person** – The individual(s) to include in the communication flow (e.g., the requestor or approver).

Triggers an **On-Demand** Communication Flow for the list of people you provide.

To use this action, you must have an **On-Demand Communication Flow** already configured. For setup instructions and details, see the [Communication Flows](https://community.rockrms.com/documentation/bookcontent/8/#communicationflows) section of the **Communicating With Rock Guide**.

![](https://community.rockrms.com/GetImage.ashx?Guid=09b96d4e-55c3-46e2-95fc-ebb71d09453f)

 # Chat Channel Message Send

Show Details

v19.0

Sends a chat message to a specified channel.

Takes a Group (linked to a chat channel) and a Sender, then sends a custom message.

You must have Rock Chat configured in order to use this action. For setup instructions, check out the [Rock Chat](https://community.rockrms.com/Rock/BookContent/8#rockchatmobile) documentation.

In your Message content, *mentions* should be in the format of @{ personId } (e.g. @123).

![](https://community.rockrms.com/GetImage.ashx?Guid=c1be6443-8c6f-4efd-a11a-71f97a8537f5)  
**Additional Details**

**Attachment**: Optional attachment to include with the message. Note: the attribute type you specify will determine the attachment type in the chat message. For example, if you use an attribute type of "Image," the attachment will be sent as an image

 # Chat Direct Message Send

Show Details

v19.0

Sends a chat message via a direct message to the recipient.

Takes a Recipient and a Sender, then sends a direct message.

You must have Rock Chat configured in order to use this action. For setup instructions, check out the [Rock Chat](https://community.rockrms.com/Rock/BookContent/8#rockchatmobile) documentation.

In your Message content, *mentions* should be in the format of @{ personId } (e.g. @123).

![](https://community.rockrms.com/GetImage.ashx?Guid=dad2d49a-6935-4d50-b430-1a663c229c85)  
**Additional Details**

**Attachment**: Optional attachment to include with the message. Note: the attribute type you specify will determine the attachment type in the chat message. For example, if you use an attribute type of "Image," the attachment will be sent as an image

 # Email Send

Show Details

v1.0

Sends an email (with lots of options).

This action obviously sends an email of your design. It does have quite a few interesting options. The email can be configured to be sent to an email address you provide (multiple address can be separated by a comma) or the value of an attribute in the workflow. You can also add email addresses to CC and BCC fields. If you're using attributes to set any email address field, the attribute you provide must contain either a valid email address or the attribute must be of type *Person* or *Group*. See the [Workflow Tips](https://community.rockrms.com/documentation/bookcontent/12#workflowtips) section of our [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide for a basic example of emailing a group using workflows.

If the Send To Email Addresses is a group or security role, you have the option of limiting the recipients of the email based on the group role attribute in the Send to Group Role field.

You also have the option of including up to three attachments. First, upload the file as a File type attribute, then select the workflow attribute that contains the file from the Attachment dropdown. The file size that can be sent is limited by both the sending and receiving email services, and is typically 10-25 MB.

The subject line, from address, and body of the email can contain Lava merge fields, so be creative. Also note that the email can be configured to be saved to the recipient's history.

In v14, we made have added new fields for From Name, this is displayed as the email sender's Name when the email is sentv14.1 If one is not provided and the From Email is derived from a Person then their fullname is used.

![](https://community.rockrms.com/GetImage.ashx?Guid=54d389ea-962d-4fc9-bfef-9202191c2227)

 # Email Send (System Email)

Show Details

v1.0

Sends a System Email.

Writing the contents of a workflow email using Lava templates can be a little daunting. Also, many of these emails will be the same in similar workflow types. That's why you have an option to send an email using the contents of a system email. Just like the Send Email action, you can save the message to the recipient's history.

The system email shown on the list can be added from Admin Tools \> Communications \> System Communications.

![](https://community.rockrms.com/GetImage.ashx?Guid=5cd96630-2e3b-448d-b215-1a89069fbb76)

 # Email Send with Events

Show Details

v4.0

Sends an email with the ability to react to events like opens and clicks.

This action is a bit different than most in that it is designed to continually check timeout parameters, therefore it never completes until a Unopened and/or No Action timeout occurs. Once the timeout occurs, it will complete and stop processing.

The first time it processes, it sends an email, and then creates two activity attributes. The first is a "DateTime Sent". It will set this to the time that the email was sent. It then checks this attribute in future processing to determine if it is the first process or not, and to evaluate timeout parameters.

The second activity attribute that is created is an "Email Status" attribute. This is used to store the last event status received by the Mandrill Webhooks.

During subsequent processing, this action will only check for timeouts.

If the "Unopened Timeout Activity" has an activity and "Unopened Timeout Length" has a value, it will check to see if status does not have "Opened" or "Clicked." If not, it will activate the "Unopened Timeout Activity" activity and then mark the action as complete.

If the "No Action Timeout Activity" has an activity and "No Action Timeout Length" has a value, it will check to see if status does not have "Clicked." If not, it will activate the "No Action Timeout Activity" activity and then mark the action as complete.

In addition to the action, the Mailgun.ashx and TwilioSendGrid.ashx webhooks have been updated to evaluate any events that occur for the email that was sent. When the webhook receives an event, it will attempt to find the corresponding workflow action and update the workflow action's "Email Status" activity attribute and then activate any configured activities.

When a Send event is received the attribute value will be updated to "Sent".

When an Opened event is received the attribute value will be updated to "Opened" (if not already "Opened" or "Clicked") and if an On Open Activity is configured, that activity will be activated.

When a Clicked event is received the attribute will be updated to "Clicked" and if an On Clicked Activity is configured, that activity will be activated

When a HardBounced, Rejected, SoftBounced, Spam, or Unsubscribe event is received the attribute will be updated to "Failed", and if an "On Failed Activity" value is set, that activity will be activated.

The above only applies if the workflow is still Active. Inactive workflows will not have events recorded.

The subject line, from address and body of the email can contain Lava merge fields, so be creative.

![](https://community.rockrms.com/GetImage.ashx?Guid=2bf2bdff-c732-4d8f-ad06-989ae62bc324)

 # Push Notification Send

Show Details

v7.0

Sends a push notification.

If you have a Firebase app for Rock, this action will let you send a notification to users. You can send it to either a person or a group. ![](https://community.rockrms.com/GetImage.ashx?Guid=ce710ca3-8531-4b3f-8812-cccbe0d2ed32)

 # SMS Communication Process Response

Show Details

v8.0

Injects an inbound message into the two-way SMS system as if it was just received from the SMS provider.

This action creates an SMS Response message with the From and To number you specify.

This is *not* for sending a message out (use the `SMS Send` action for that). This action lets the workflow admin create an *incoming* message into the Person-to-Person SMS system.

For example, say you have a text-to-workflow set up to handle certain incoming keywords. With SMS Communication Process Response, if no keyword is found, the workflow injects the message into the person-to-person text system.

![](https://community.rockrms.com/GetImage.ashx?Guid=da8e6b4b-c9a3-4ceb-af4f-e02240a50da4)  
**Additional Details**

If the SMS system returns an error, the error message will be placed in the Error Attribute. Currently, the only error that would be returned is the standard 'Could not deliver' message. Consider checking to see if the value is non-blank, and if so, send it as a response to the user.

 # SMS Send

Show Details

v1.0

Sends a SMS message.

This action is very similar to the *Send Email* action but it sends a SMS text message instead. This action assumes there is a valid SMS text subscription available. See the [Communicating with Rock](http://www.rockrms.com/Rock/Book/8) manual for more details on SMS text message configuration.

You can also include an attachment. To include a dynamically generated attachment (for example, a contact card), use the *Set Attribute From Lava* workflow action.

![](https://community.rockrms.com/GetImage.ashx?Guid=952971b0-71ce-4628-8a2f-9598bced6405)  
**Additional Details**

Either the From field should be set with a SMS From Number or the corresponding From (From Attribute) of type DefinedValue should hold the selected SMS From Number. v12.5


---

## CMS {#cms}

> **Path:** Workflow Actions Documentation > Action Categories > CMS

# CMS

All the details for the cms category.

 # Content Channel Item Add

Show Details

v8.1

Creates a content channel item for a specified channel.

This action creates a content channel item for the channel you specify. It can set the start date, expiration date (if applicable to your channel), the content and status. The title, dates, and content can use Lava to create dynamic values. You can optionally provide a workflow attribute in which to store the returned value of the created item, for use in later actions.

This action can also set any content channel item *attribute* values you provide. You can do this by providing the attribute key of the workflow's source attribute and the key of the content channel item's target attribute.

As of Rock v17, if an attribute of type *Structure Content Editor* is selected for the Content "Attribute Value" dropdown, this action will automatically convert the Structured Content into the *Content* of the Content Channel Item. It will also set the Content Channel Item's *Structured Content* property.

![](https://community.rockrms.com/GetImage.ashx?Guid=02d7f367-44ae-4343-8b50-b6581094535f)


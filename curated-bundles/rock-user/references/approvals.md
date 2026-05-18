---
description: "Use when user asks about approval workflow for bulk communications, pending approval status, or RSR - Communication Approvers group notifications"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Approvals

Approvals

By default, emails that are sent to 300 or more recipients require approval. You can change this limit in the block settings for either the *Communication Entry* block (simple editor) or the *Communication Entry Wizard* block (wizard editor).

![communication-entry-wizard-v18](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-entry-wizard-v18.png)

Communication Wizard Settings

Within these block settings, you will find two key options that control how approvals and sending behave:

**Maximum Recipients**

- Defines the number of recipients allowed before a communication requires approval.
- The default is 300, but you can adjust this number to fit your organization’s needs.

**Send When Approved**

- Determines what happens after a communication has been approved.
- If enabled, the communication is sent immediately once it is approved.
- If disabled, Rock defers sending the message until the next run of the *Send Communications* job.

When someone without approval rights creates a communication, the message is always held for approval before it can be sent.  
Here is an example.

![communication-entry-wizard-v18](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-wizard-approval-v18.png)

Communication Wizard Approval Submission

At this point, the message is not sent, but it's ready for approval.  
When a message requires approval, its status will be set to *Pending Approval* and members of the *RSR - Communication Approvers* group will receive an email. Note that this is the only group that receives the approval emails.

A communication will not be sent until it's approved by a person with approval access. By default, these are the *RSR - Communication Administration* and *RSR - Communication Approvers* roles. Before a communication is approved these roles have the ability to edit the communication to ensure it meets the standards of your organization.  
Any individual with approval access can view all communications waiting for approval from the Communication History page. Approvers can find these messages by navigating to People \> Communication Reports \> Communication History, then filtering by status to select *Pending Approval* and review unsent messages.

![communication-approval-v18](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-approval-v18.png)

Communication Approval

If *Send When Approved* is enabled and the message is scheduled for now, selecting Approve sends the communication right away. If not, the communication will be sent next time the "Send Communications" job runs. Selecting Deny returns the communication to the sender, who can make changes in the Communication Wizard and resubmit it for approval.

Additional security roles can be added to approve communications by adjusting the block security of the *Communication Entry Wizard* and *Communication Entry* blocks. Simply add the new role to the *Approve* permission of these blocks.

# Approver Notification Emails

By default, the [System Communication](#systemcommunications) for approval emails is *Communication Approval Email*. Just like other communications, you can customize the content of your approval notifications to suit your needs.

# Email Only

The approval notification communication currently only works with emails and cannot be used with the *SMS* or *Push* features.

If you need to take it a step further, you can use an entirely different System Communication for these approvals. Simply go to Admin Tools \> Settings \> Communication Settings and select the System Communication you want to use instead.

![Communication Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-settings-v18.png)

Communication Settings


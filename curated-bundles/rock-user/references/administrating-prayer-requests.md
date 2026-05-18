---
description: "Use when managing flagged prayer requests, reviewing inappropriate content, or approving prayer requests for the prayer team"
source: "https://community.rockrms.com/documentation/bookcontent/11/366"
sourceLabel: Raising Up With Prayer
---
> **Path:** Raising Up With Prayer > Administrating Prayer Requests

Administrating Prayer Requests

After requests have been entered, and before the Prayer Team can pray for them, the Prayer Administrator needs to take a look at them. One exception to this process is if the requests are set to auto-approve when they are entered. In that case, the Prayer Team has immediate access to new requests.

All administration work is done under People \> Prayer. Here, you can select to add a new prayer request, view current requests or view all the comments in the system.

![Prayer Home](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/prayer-home-v18.png)

Prayer Administration Tools

## Prayer Requests List

Selecting the *Prayer Requests* option will display a list of all the prayer requests in the system.

![](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/request-list-v18.png)

Prayer Request List

Using the *Filter Options*, you can narrow the list down to exactly what you want to see. This is useful if you have hundreds of requests and only need to worry about the ones that are flagged or unapproved.

# Flagged Requests

If you find a request that is flagged, it's a good idea to read it carefully. Requests can be flagged if a member of your prayer team feels like there is something inappropriate in the request. For instance, if it's considered dangerous to use a global worker's full name or list the exact country name where they are stationed.

From this list you can click the approved switch from yes to no (or vice versa) to quickly change its approval status. Otherwise, you can select an item to view all the details or press the Delete button to permanently remove it from the system.

Clicking the Edit button will allow you to change the request including its approved or urgency status, expiration date, and other details about the request. It also brings up a box for recording an answer to that prayer. Say, for example, if the Prayer Administrator knows that the prayer has been answered. They can note that here, so it then becomes a praise.

![Request Detail](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/editing-request-v18.png)

Prayer Request Detail

Once you've made all your changes, you can check the *Approved* checkbox and press the Save button to return back to the list. If a request was previously flagged, checking the approved checkbox clears the flags so that it can be included in prayer sessions once again.

## Prayer Comments List

Selecting the *Prayer Comments* option will display a list of all the prayer comments in the system. This is a good way to help moderate the comments that are coming in without having to view each prayer request. Selecting a comment will take you directly to the prayer request page.

![](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/comments-list-v18.png)

Prayer Comments List

## Prayer Comments AI Approvals

If you configured an AI Provider as outlined in the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#aiproviders), you can enable an advanced feature to automatically approve (or reject) inappropriate prayer comments using AI.

To activate this feature, navigate to Administration \> Settings \> Note Types, then edit the *Prayer Comment* note type. Check the *Enable Approvals* and *Enabled AI Approvals* boxes. Next, provide clear guidelines to help the AI determine which comments should be approved or disapproved.

![](https://rockrms.blob.core.windows.net/documentation/Books/11/1.18.0/images/comments-ai-approvals-v18.png)

Prayer Comment Note Type Configuration

Now, when someone posts a comment on a prayer request, AI will review the note. If the comment is deemed inappropriate based on the provided guidelines, it will be automatically removed.

# Crafting Your Approval Prompt

The *AI Approval Guidelines* sample text above provides a solid foundation for your prompt, but be sure to tailor them to your specific needs. If it's acceptable for individuals to include their phone numbers in a prayer request, clarify this with a statement like, "Phone numbers are allowed." If you want to prohibit gossip, simply state, "Don't include gossip." Simple, right?

# Advanced Ideas

You may want to take special action for certain categories of prayer requests. With Rock's workflow engine, you can trigger a particular action based on some criteria of the prayer request.

For example, if someone enters a *Hospitalization* request, you can notify the person in charge of hospital visits by sending a system message with a link to that request directly to their email address. See the [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide for more details on creating these automatic actions.

The possibilities are endless.


---

## Entering Prayer Requests {#entering-prayer-requests}

> **Path:** Raising Up With Prayer > Entering Prayer Requests

Entering Prayer Requests

So now that you understand how prayer functions in Rock, let's look at the details of entering and managing requests.

# Adding a Request

Most people will enter prayer requests online through the *Prayer Request Entry* block on your website under Connect \> Prayer. Prayer administrators can also add prayer requests internally from People \> Prayer \> Add Prayer Request.

![Adding a Prayer Request](https://rockrms.blob.core.windows.net/documentation/Books/11/1.17.0/images/adding-request-v14.png)

Adding a Prayer Request

# About Default Configurations

Don't forget to check Rock's settings. Our out-of-the-box configurations will be a great fit for most organizations, but they are all customizable. Modify the configuration on the external website under Connect \> Prayer using the *Prayer Request Entry* block settings.

## Block Settings

Here are some of the settings for these request blocks, right out of the box.

| Setting | Description | Example |
| --- | --- | --- |
| Category Selection | This controls which categories the requestor can choose for their prayer request. Selecting a top-level category enables all the categories underneath as options. Leaving this option blank will hide the category control from the requester and assign all prayer requests entered here to the Default Category you choose (see the next option). | All Church |
| Default Category | This is the default category that will be assigned to the request unless it is changed at the time the request is entered. | General |
| Enable Auto-Approve | The system can be configured to *auto-approve* any prayer requests entered by people on the website. This means a request will be immediately available for the prayer team. Otherwise, you will have to approve (and optionally edit) each request before the team will see them. | Yes/No |
| Expires After (Days) | This controls how long a prayer request remains active once it's approved. This setting is only used if auto-approve is enabled. | 14 |
| Default Allow Comments Setting | If *Enable Comments Flag* is enabled, then this setting controls whether the checkbox the requester sees for "Allow Encouraging Comments?" is checked or not. If this is set to "Yes" then comments will be allowed by default. | Yes/No |
| Enable Urgent Flag | If enabled, the person entering the prayer request has the option to mark it as urgent, which keeps it at the top of the prayer stack. | Yes/No |
| Enable Comments Flag | If enabled, requestors will be able to set whether or not they want to allow comments on their requests. | Yes/No |
| Enable Public Display Flag | This allows the requester to say whether their request can be shown on the public website for a wider audience to pray for. | Yes/No |
| Character Limit | This controls the maximum permitted length of the prayer request. Setting this to a reasonable value will cause the requestor to focus their request on the essential details. | 250 |
| Navigate to Parent On Save | Checking this causes the website visitor to be returned to the page they were on before they entered the request. | Yes/No |
| Save Success Text | This text will be shown after the request is saved (unless the previous setting is checked). You can use both HTML and Lava here. | Thank you for allowing us to pray for you. |
| Workflow | If a workflow is selected here, then the workflow will launch following a prayer request being submitted. You can then access the request's information from within the workflow. | Photo Request |

# Prayer Attributes

Need to capture some additional info with the request like Campus or a "Please Tell" field to let the sender indicate a specific Pastor or Staff Member to inform about the request? We've got you covered. Go to People \> Prayer \> Prayer Request Attributes and add any attributes you want. Can we get an Amen!?


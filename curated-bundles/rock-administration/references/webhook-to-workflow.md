---
description: Use when configuring webhooks from external services to automatically launch and trigger Rock workflows with data mapping
source: "https://community.rockrms.com/documentation/bookcontent/12/369"
sourceLabel: Blasting Off With Workflows
---
> **Path:** Blasting Off With Workflows > Webhook to Workflow

Now that you're a workflow guru, let's turn up the volume to 11. As you've seen, there are several ways that you can launch workflows built into Rock. But what if we told you you could launch workflows from Twitter, Wufoo, Formstack, Dropbox, Evernote, Email, or... basically any modern web service? That's the power of Webhooks to Workflows.

Most modern Web Services use the concept of webhooks. This allows the service to make calls out to other systems when certain events occur. For instance, Formstack can call out to Rock, using a webhook, every time a form is completed. There are also services like [Zapier](https://zapier.com/app/explore) or [Flow](https://flow.microsoft.com/en-us/) that help to manage the flow of webhooks from service to service.

# Configuring a Webhook to a Workflow

You configure the linkage from a webhook to a workflow using a *Defined Value*. These are configured under  
Admin Tools \> General Settings \> Defined Types \> Workflow Webhook.  
Each webhook that comes in will go through this list to determine which workflow types to launch. That determination is made by evaluating the Lava in the *Process Request* attribute of the *Defined Value*. If the Lava returns 'True' a workflow of that type will be started.

All of the *Defined Values* will be considered for each webhook that is called. All of the defined values whose *Process Request* Lava returns 'True' will run. It's important that this template is very discerning in making sure that only the correct workflow types are launched. One way to simplify this matching is to use query string parameters in the URL you define in your webhook. The default URL you provide for the webhook is:  
`http://rock.yourchurch.com/Webhooks/LaunchWorkflow.ashx`  
To help in your matching you could tack on a query string parameter such as:  
`http://rock.yourchurch.com/Webhooks/LaunchWorkflow.ashx?WorkflowTypeId=12`  
You could then provide the following template for your *Process Request*.


{% if QueryString.WorkflowTypeId == "12" %} True {% else %} False {% endif %}

This makes the selection of the workflow type very easy.

# When No Workflow Is Found

For security reasons if no workflow is matched a 404 error will be returned. This can be confusing at first when you are attempting to debug, but it's a best practice to help ward off evildoers.

Ok, we've now discussed how to select the workflow type to launch. Now let's look at ways we can pass information to those workflows. You'll first notice that you can configure a Lava template for setting the Workflow Name. This allows you to customize the name on each run based on information from the webhook call.

You can also list attribute keys from the workflow and provide Lava templates for setting their values. The challenge here is knowing what data is available to you. The *Defined Type* screen has a feature that shows/hides these available fields. The basic items are:

- Url
- RawUrl
- Method
- QueryString
- RemoteAddress
- RemoteName
- ServerName
- RawBody
- Headers
- Cookies

Each of these items can have a lot of child properties. The documentation on the *Defined Type* screen shows some of these details, but the actual values will change greatly based on the calling service. We recommend that you start by setting various test attributes with items like 'RawBody' to see what is available.

While you can put Lava into the Workflow Attribute configuration on the *Defined Value* it's recommended that a majority of that logic be done inside of the workflow using the RawBody. The Lava on the *Defined Value* can't contain special characters like a | that are required in Lava filters.

**Example**  
For instance if you passed the RawBody into the workflow using the attribute key of 'Body', then the Lava below could be used to access properties of the body.

  
{% assign body = Workflow | Attribute:'Body' | FromJSON -%} {{ body.propertyname }}


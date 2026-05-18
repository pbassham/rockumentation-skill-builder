---
description: "Use when users need to understand how electronic signatures work in Rock, including their components, workflow integration, and event registration implementation"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Electronic Signatures

Electronic Signatures

Many events and activities require waivers and releases to be signed by participants. Rock allows you to easily gather these signatures electronically without the need for a third party service. The requirement of a signed document can be added to a registration or a workflow. We'll cover how to configure these, and then we'll walk you through the configuration of the electronic signatures environment.

![In Workflows](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/electronic-signature-in-workflow-v18.png)

In Workflows

![In Event Registration](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/electronic-signature-in-event-registration-v14.png)

In Event Registration

# Anatomy of an Electronic Signature

Before we jump in to see electronic signatures in action, let's look at what makes up an electronic signature in Rock.

- **Signing Document:** The person electronically signs a document, which is based on a template. Each electronic signature will produce a signed document.
- **Applies To:** Since the documents that go out for signatures can often be for minors, Rock distinguishes between the person to whom the document applies and the person who needs to sign the document. In the case of a camp waiver, the *Applies To* field would be the child going to camp.
- **Assigned To:** The *Assigned To* field represents the person who has been assigned to sign the document. In the camp example, this would be the parent or person who completed the registration.
- **Signed By:** This represents the person who electronically signed the document. This will be the same person that the document was *Assigned To*. Continuing with the camp example, this would be the parent or person who completed the registration.

# Electronic Signatures and Workflows

Often, you'll want to have someone electronically sign a document as part of a workflow. This is super easy because there's a Workflow Action Type designed just for that. The *Electronic Signature* action type will present the person with a document to sign from within the workflow, similar to a workflow form.

![Electronic Signature Workflow Action](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/electronic-signature-workflow-action-v16.png)

Electronic Signature Workflow Action

After the electronic signature is captured, the person is asked to provide an email address so they can be sent a copy of the document for their records.

# Electronic Signatures and Event Registrations

Electronic signatures often come in handy for event registrations. When someone signs up for an event, they can easily sign the form or waiver electronically. The neat thing? If, say, Cindy Decker is registering Noah Decker for an activity that requires "Release Form A," and Noah already has a valid signed "Release Form A," we won't make them sign it again. Rock's standard person matching logic helps us figure out if the person matches someone in Rock who has already signed the document. Easy and efficient!

# Obsidian Registration Entry

For your electronic signatures to work with event registrations, you must use the Obsidian version of the *Registration Entry* block on your external website. Similarly, if you try to use the Obsidian version of the block with a legacy signature document, your registration process will break. Stick with the most up-to-date block and Electronic Signature features to keep things running smoothly.

You can define the signature document that's required for an event registration on the registration's template. You can find this under Tools \> Event Registration and then by editing the registration template you wish to configure. Under the *Details* panel select the signature document you want to use by picking one from the *Required Signature Document* list.

The logic for determining the *Assigned To* and *Applies To* is as follows:

1. **Applies To:** Will always be the registrant of the registration. Each registrant will have their own form that needs to be signed.
2. **Assigned To:** This is a bit more complex. If the registrant is an adult, then the *Assigned To* will be the registrant. If the registrant is a child, the *Assigned To* will be the person completing the registration.

# Adults and Children

Because the signature logic distinguishes between adults and children, you may want to include a required Birthdate field on your registration form.

You can monitor the results of the electronic signature from the registration instance under the *Registrants* tab. From this screen you can see the completed documents.

![Registration Signature Document Example](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/electronic-signature-in-event-registration-v14.png)

Registration Signature Document Example

After the electronic signature is captured, the person is asked to provide an email address so they can be sent a copy of the document for their records.

# Required Login

We recommend that you require logging in if you want to include the current person's name in the text portion of signature document. This is because the "typed name" won't otherwise be known until after it's signed.

# Setting Up Electronic Signatures

Now that you've seen what electronic signatures can do, let's look at how to set them up.

Your first step in gathering electronic signatures will be to create a *Document Template* by navigating to Admin Tools \> Settings \> Signature Documents. The template will be used to generate the individual documents a person will sign. Out of the box, Rock ships with an example *Photo Release* template and a *Field Trip Release* template. You can use these templates as a reference for creating your own.

# Signature Input Type

As described below, we very strongly recommend using a *Typed* signature and not a *Drawn* signature. Both are equally valid in terms of legal representation, however a drawn signature is considered Personally Identifiable Information (PII) and storing it in Rock may have additional legal consequences.

![Signature Document Template](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/edit-signature-document-template-v18.png)

Signature Document Template

# Using Multiple Signatures

By default, the template places a signature at the bottom of your PDF. To change its location, or add a signature in multiple different spots in your document, use <!-- \[\[ SignatureDetails \]\] --\>. Each instance of this keyword will be replaced with the signature instead of a single signature appearing at the bottom.

The legacy method of setting up a Signature Document (using a third-party provider like SignNow) can still be accessed from the page above. Simply edit the block settings and set *Show Legacy Signature Providers* to "Yes". Keep in mind that support for these signature providers is ending, so you need to transition your documents now if you haven't already. For instance, the *Registration Entry* block (Obsidian) does not work with the legacy documents.

# PDF Generation

After a document is signed, a PDF is generated containing both the document's content and the person’s signature. This is done so the person can be sent a PDF copy of the signed document. In most cases, Rock handles this process automatically. However, some organizations may require an external service for PDF generation.

Generating a PDF on the Rock server is resource-intensive, especially during high-traffic events. For instance, on the day your Kids Camp sign-up launches, the system might be processing thousands of registrations, collecting signatures, and generating PDFs simultaneously. This added load can impact server performance. To avoid this, we recommend offloading PDF generation to a third-party service such as [browserless.io](https://www.browserless.io/sign-up/). Once you're signed up, all you need to do is add a *PDF External Render Endpoint* to your *System Settings* under Admin Tools \> Settings \> System Configuration as pictured below.

# For Some, It's a Must

If you're running Web Services on Azure or operating Rock in an environment that doesn’t support running Puppeteer/Chrome on the server, using a third-party service is essential.

![PDF External Render Endpoint](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-configuration-pdf-endpoint-v18.png)

PDF External Render Endpoint

# Managing Signature Documents

OK, so now we've seen how to create electronic signature templates and how to use them in workflows and event registrations to gather signatures. Let's wrap it up by looking at how you can view these documents.

To view signed documents, navigate to Admin Tools \> Settings \> Signature Documents and select the document template you wish to view.

![Managing Documents](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/signature-document-template-details-v18.png)

Managing Documents

We mentioned viewing documents from the page pictured above. To do this, you'll need the appropriate security permissions. View access to completed Electronic Signature Documents is based on the associated *binary file type* and not the *document template* security.


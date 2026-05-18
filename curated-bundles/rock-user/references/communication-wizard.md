---
description: "Use when users need to send communications to Rock contacts using the Communication Wizard, including recipient selection, template choice, and message customization"
source: "https://community.rockrms.com/documentation/bookcontent/8/363"
sourceLabel: Communicating With Rock
---
> **Path:** Communicating With Rock > Communication Wizard

Communication Wizard

When you think of a robust, efficient, all-in-one communication platform... your mind may have drifted towards your daily drivers like *Brevo*, *Mailchimp* and *Beefree*. You may like their features: a drag-and-drop email builder, templates, customization, personalization, analytics, etc. You may have even jumped between services to get the feature list you desire. Are you tired of jumping? Are your legs wearing out? No more jumping. Rock has you covered on all communication fronts.

**Why choose Rock for communication?**

- You have access to all your data to empower personalization
- All interactions with communications are stored in your database
- No integration needed

The wizard works just like you'd expect, guiding you step-by-step with forward and back buttons. Let’s walk through how to send a communication using the wizard.

# Sending a Communication Using the Communication Wizard

To begin a new communication, go to People \> New Communication. The first screen you'll see, pictured below, is where you'll pick who you want to send the communication to.

There are many ways to arrive at the Communication Wizard,

- Select from a grid
- Navigate to the page yourself then you can:
- Add individuals manually with a *Manual Recipient List*
	- Use a [Communication List](#communicationlists)
![Configure Communications](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/configure-communications-v18.png)

List Selection

Click Next to advance to the *Choose Template* screen. This is where you’ll select the email template you want to use to create your communication. You can imagine how, after you’ve created a number of templates, having a Template Image Preview (i.e., thumbnail) will help you easily locate the template you want.

![Communication Template](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/choose-templates-v18.png)

Communication Template

Use the category filter dropdown to help you locate your template. If you don’t see a template listed, you may not have permission to use it, or it might not be set up for use with the wizard. You can learn more about template security and support in the [Email Template Survival Guide](https://community.rockrms.com/documentation/bookcontent/34/).

Rock ships with these three templates out of the box, but the list will expand as you create your own. Remember, these templates are a starting point for your communications, later, you can customize them to your heart's content.

Once you have a well-crafted email, SMS message or push notification, you can use it as a template. To learn more, see the *Templates* section below.

# Starter Templates

To save your template under *Starter Templates*, find your desired template in the *Communication Templates* settings and check the box *"Is Starter"*. Also you can select Starter when saving a new template. Pick the 20% of templates you use 80% of the time.

After selecting your template, click Next to advance to the *Email Settings* screen. This is where you specify the sender, the subject and any files you want to attach to the message.

![Email Settings](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/email-settings-v18.png)

Email Settings

# CC, BCC and Personalization

If you use the CC or BCC fields, be aware that each communication is personalized for each recipient, so each email is unique. That means your CC/BCC recipients will receive many messages. Be careful about providing a value here as the recipient can get overwhelmed.

Click Next to advance to the *Email Builder*. If your communication will be sent by SMS or Push only, then the wizard will skip this screen.

## Email Builder

If you spent time coding your email templates in the past, get ready to take a big sigh of relief. The *Email Builder* gives you complete creative freedom, with no coding involved (unless you want to) and you can save your build as a template! There are three unique screens (Blocks, Sections and Styles) used to configure your email with simple drag-and-drops.

**Blocks** - Drag-and-drop email content directly to quickly structure your email.

**Sections** - Create or re-use groups of content, streamlining email building.

**Styles** - Customize the style of your email from the text to the buttons.

### Blocks

![Blocks](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/blocks-v18.png)

Blocks

*Blocks* are the content components themselves. To add an element, simply drag it from the *Blocks* bar to its resting place in your message.

### Content Components

Once you place a component, you can click on it for editing. Try implementing *Lava* to add a personal touch, change how round your button corners are or insert image and video with ease.

After placing a component, you can edit it by clicking on the section it's in. The options associated with that component are displayed on the right side of the screen. Notice that the section you’re editing is highlighted with a blue border, and you can view your changes in real time. If you want more of a component or layout, once you have selected one, click . If you decide you don’t want that element after all, click .

### Column Layouts

*Column Layouts* group content in an elegant format. They can be edited to display unique column spacing and alignment. Each layout can be saved as a *Section* for re-use. That means not only is the format saved, the content is saved as well. More on that below.

At any point while working in the *Email Builder*, you can send a test email to yourself by clicking the Send Test button. Click to see both desktop and mobile previews of your design. Click to save a draft of your email. Select the ellipsis () in the top right to save your built email as a template.

# RSVP Button Setup

We should pause a moment here to note the *RSVP* button, indicated by the icon. This element is used to send RSVP requests to groups, and it requires some setup in advance. For full details check out the [Group RSVP](https://community.rockrms.com/documentation/bookcontent/7#grouprsvp) section of the Rock Your Groups guide.

# Adding Videos to Email

Because of how different email clients work, we can't reliably embed a video within an email. Using the *Video* component will let you provide a link to a video, with an associated image, but the video can't play from inside the email itself. Instead, viewers are redirected to your video hosting provider (e.g.: YouTube, Vimeo and Wistia).

### Sections

![Sections](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sections-v18.png)

Sections

*Sections* house groups of content that speed up and structure your email building. Drag one in, and you've saved yourself from some serious work.

**When to use a section:**

- If you have a unique paragraph with lots of Lava
- When using a common "Hero" section
- For an often-used header or footer

This can be done quickly by selecting a column and clicking Save, the following screen will pop up.

![Save Section](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/save-section-v18.png)

Save Section

Save yourself some trouble by adding a *Name* and a *Usage Summary*, which describes the intended use of your section.

### Styles

![Styles](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/builder-style-v18.png)

Styles

Styling is where you, well... style your email. Each change you make here will affect the entire email, giving you consistent style from top to bottom.

This allows you to select the overall design of your email and provide default values for things like heading, text and buttons.

- **Body Settings**

Configure the color, alignment and spacing of the body.

- **Background Settings**

Change your background color or upload an image to alter your email's backdrop.

- **Text Styling**

Edit text font, size and color globally, or refine styling for each heading.

- **Button Styling**

Globally alter button color, font, padding, size and even corner radius.

- **Divider Styling**

Change the style, color, alignment and size of each divider.

### Templates

You can now save your built email as a template, no more HTML coding! Communication is rinse and repeat, when you save this template it will take a screenshot as a thumbnail, and you can access this layout in the future with ease. To start, select the ellipsis in the top right (), then *"Save As Template"* to open the *"Save As Template"* screen.

![Template](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/save-as-template-v18.png)

Template

## Preview As

By selecting the icon, you can preview any communication in Rock. To add a personal touch, you can even view it as a specific person in your database, or even a segment, giving you the opportunity to test personalization features such as Lava or Adaptive Messages.

### Preview As Person

![comm-wiz-preview-as-person-v18](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/comm-wiz-preview-as-person-v18.png)

Communication Wizard Preview As Person

Select an individual with the handy picker and see exactly how it will look in their inbox.

### Preview As Segment

![comm-wiz-preview-as-segment-v18](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/comm-wiz-preview-as-segment-v18.png)

Communication Wizard Preview As Segment

When a segment is selected, the system will display a preview using a random person from that segment. Note that this individual may not be an actual email recipient. They may also belong to multiple segments, which could influence how personalization appears in your preview depending on your settings.

## Emailing a Login Link

As you're crafting your communication you may find it necessary to include a link that will automatically log the person in to your website. This is easy to do using the [PersonTokenCreate](https://community.rockrms.com/lava/filters/person-filters#persontokencreate) Lava filter.

Simply add `?rckipid={{ Person | PersonTokenCreate }}` to the URL of the page you want the person to visit.

The example pictured below will log the person in and take them to the external site's homepage using a URL of `https://yoursite.org/page/1?rckipid={{ Person | PersonTokenCreate }}`.

![Email Link with Person Token](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/email-login-link-v18.png)

Email Link with Person Token

A link like the one pictured above can be added to your email by using the button near the top of the editor. Unlike the example above, you'll want to provide friendly text for the link (e.g., "Click Here") instead of the URL itself. Using the URL as pictured above would result in a very long and ugly looking link in the recipient's email.

You can optionally add parameters to your *PersonTokenCreate* filter, to control:

- How long the token is valid
- How many times it can be used
- Which page it should be used for

Check out our [PersonTokenCreate](https://community.rockrms.com/lava/filters/person-filters#persontokencreate) Lava documentation for full details.

Depending on your [Security Settings](https://community.rockrms.com/documentation/bookcontent/9#securitysettings) a tokenized link may not be able to be generated for all of your recipients. Out of the box, a person token can't be created for people with an Extreme level [Account Protection Profile](https://community.rockrms.com/documentation/bookcontent/5#accountprotectionprofiles).

---

When everything is set up and looks the way you want, click Next to go to the *SMS Editor* screen. If your communication will be sent by email only, the wizard will skip this screen. The *SMS Editor* is similar to the *Email Editor*. This is where you design how your SMS message will appear.

![SMS Editor](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/sms-editor-2-v18.png)

SMS Editor

Click Next when you are ready to move on. If you're sending the communication via a Push Notification, then you'll see the *Push Notification Editor* screen instead of the Email and SMS screens described above.

![Push Notification](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/push-notification-editor-2-v18.png)

Push Notification

# SMS and Push Templates

Emails aren't the only medium that benefits from a template, SMS and Push Notifications can do it too. Go to Settings \> Communication \> Communication Templates and press to create a new template. Fill in the SMS or Push section with relevant details. Next time you send an SMS or Push Notification with your new template, you can skip a few steps.

With the last of the communication methods configured, click Next to go to the *Confirmation* screen. This is the last stage in the process before we actually send the communication.

![Confirmation](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/review-and-confirm-v18.png)

Confirmation

This screen will give a snapshot of your communication's final look, when it is getting sent, and who will see it.

After clicking Send, the communication is on its way to your faithful audience, but it doesn't stop there.

![Wizard Complete](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/communication-queue-v18.png)

Communication Queue

# Re-send the Same Communication

Your time is valuable, you don't have to churn out duplicates of the same email. Instead, click the button from the [Communication History](#communicationhistory) page. This will take you back to the beginning of the *Communication Wizard*, keeping the settings and design options of the original communication.

Pretty cool, right? With the Communication Wizard, you’re going to be rocking email and SMS messages in no time.

# Communication Templates

*Communication Templates* make it easy to send polished, on-brand messages every time. They help your team stay consistent and efficient—so you can focus on what really matters. Instead of rewriting the same message for the hundredth time, just use a template and give your fingers a break.

![Template selection screen displaying starter and custom templates for communication.](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/choose-template-v18.png)

Choose Template

As you build your template collection, finding the right one can get tricky. That’s where *categories* come in. By filtering templates by *Category*, you can zero in on exactly what you need.

To begin, go to Admin Tools \> Settings \> Communication Templates, then press the button to create a new template.

![Form for creating a new communication template, including email, SMS and push options.](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/new-communication-template-v18.png)

Communication Template Detail

Once you click Save, your template is ready for use.

### Organizing and Securing Templates

*Categories* help you group templates by theme—like *General*, *Children's Ministry* or *Finance*—so it’s easier to find what you need.

If certain templates are especially important, you can restrict access using security settings. From the *Communication Template List* page, click the icon to choose who can View, Edit or Administrate each template.

Keep in mind: you'll only see templates you have *Edit* permission for on your *My Settings* page.

# Using the Communication Template Preview Image

When selecting a template from the Communication Wizard or *My Settings*, a preview image helps you quickly recognize the template’s purpose. If you're using the Email Builder, Rock will automatically generate a screenshot—no need to upload one manually.


---

## Simple Editor {#simple-editor}

> **Path:** Communicating With Rock > Simple Editor

Simple Editor

Looking to reach out in a snap? With the Simple Editor, you’re ready to create messages and get them out the door quickly and easily. Think of it as your shortcut to connecting with your audience—no fancy words or complicated settings to figure out. Just follow a few easy steps, and your message is on its way.

Let's dive in and explore the power of the Simple Editor. By the end of this chapter, you'll be a pro at using this tool to enhance your communication efforts.

# Sending a Communication Using the Simple Editor

There are many ways to start a new communication. Perhaps one of the most popular methods is to click the button at the top or bottom of any grid of people. This will take you to the *New Communications* page and add all the individuals from the grid to the communication as recipients. This is particularly powerful when the list of people comes from Data Views or groups. If you prefer, you can also start a new communication from People \> New Communication and enter all recipients by hand.

# Hide the New Communications Button

If a person does not have view access to the *New Communication* page the *Communicate* button at the bottom of grids will be hidden.

Whichever method you use, the Simple Editor can be accessed by clicking the Use Simple Editor button near the top right of the screen.

![Use Simple Editor](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/new-communication-use-simple-editor-v18.png)

Use Simple Editor

Once on the *Simple Editor* page, you’re ready to start crafting your message. We'll walk through each section of this page highlighting some of the features you have at your disposal.

# But I just want to send a quick email...

You don't have to use all the features of the Simple Editor. All you need are recipients, the name and email address of the person sending it (automatically filled in for you), a subject line, and then your actual message.

![New Communication](https://rockrms.blob.core.windows.net/documentation/Books/8/1.18.0/images/new-communication-v18.png)

New Communication

# Prevent Duplicate Communications

To prevent duplicate messages when family members share an email or SMS number, go to the block settings for the *Communication Entry* block and set *Show Duplicate Prevention Option* to “Yes”. This adds a checkbox to the block that, when selected, ensures only one message is sent per shared email or phone number. The message will still be personalized—so if spouses share an email, only one will receive it, addressed to them.

# Resolving Relative Links

By default, Rock will convert relative URLs in links and images to absolute URLs using the *Public Application Root* global attribute.


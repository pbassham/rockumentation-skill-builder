---
description: "Use when staff need to customize Rock's homepage with announcements, metrics, quick links, and organizational resources"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Rock Homepage

Rock Homepage

The Rock homepage is the first screen most of your staff will see, so use that to your advantage. This is a great place for you to add organizational announcements, tips for using Rock and links to common resources. We've provided a great starting template for you to use and edit. Let's walk through some things you can do to make this page a useful resource.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/rock-homepage-v18.png)

Rock Homepage

# Staff Updates

The main area of the homepage is dedicated to staff updates. This is a great place to post news items and announcements for your staff. Learn how to customize this area for your organization in the [Customizing Your Rock Homepage](#customizingyourrockhomepage) section below.

# Metrics

Below the articles in the staff updates section, you'll see the metrics section. This section displays *Active Records*, *Active Families* and *Active Connection Requests*. Learn more about these metrics and how to customize this section in the [Configuring Homepage Metrics](#configuringhomepagemetrics) section below.

# Quick Links

The *Quick Links* section on the right side of the screen is a great place to provide staff with links that your organization uses most often. For example, organizations have used this section to provide links to:

- The online catalog for ordering office supplies
- Referral lists for counseling or pastoral needs
- The organization's webmail site
- Project management tools like Basecamp or Asana
- Facility management tools like ServiceU
- Frequently used forms

You can update the *Quick Links* section by editing the HTML, which is accessed the same way block settings are accessed.

# Tip... Be Careful

When adding links, be careful with the HTML since its format is fairly specific. The best way to avoid mistakes is to simply copy an existing list item (<li\>) and change the URL and name. Don't worry, HTML may look complex but changing what's already been done is a great way to start learning. You can do it!

# Active Users

Under the quick links section, you'll see blocks listing active individuals on the internal and external websites. This allows you to see staff who are currently working and individuals browsing your website. You can click on a name to view the individual's *Person Profile* page.

# Administrator Checklist

After you first install Rock, you'll see an *Administrator's Checklist* on the homepage. Don't worry, only Rock administrators can see this block.

This is a list of tasks you'll want to complete before you get too far along in your Rock deployment. Once you've checked all items off the list the block will disappear, but not forever. After an update you may need to add or change certain settings in order to use a new feature, and those steps will be listed in the block. Think of it as an old friend who shows up in your hour of need (not like your old college roommate who only shows up at the worst possible times).

# Be Creative

Don't limit yourself to what's provided out of the box, or even the suggestions we give in this guide. We crafted these features just for you, because we want to enable you to take what Rock provides and make it your own. Manage the content on your homepage to reflect the unique needs, resources and vision of your organization.

# Customizing Your Rock Homepage

To manage the content of your Rock homepage, go to:

Tools \> Content \> Internal Communications - Homepage.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/internal-communications-homepage-v18.png)

Internal Communications - Homepage

You can edit existing content items, or add new items, from the block at the bottom of the page. Doing either will bring you to the *Edit Content Channel Item* page.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/edit-content-channel-item-v18.png)

Edit Content Channel Item

# Viewing Updates

Content channel updates might not display on the homepage right away. If this happens, it’s because of the block’s *Cache Duration* setting. If you want to see updates immediately, change the duration to “0” seconds in the block properties.

See our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#managingcontentitems) guide for more information on working with content channels and content channel items.

# Configuring Homepage Metrics

Rock ships with three metrics ready to display on your Rock homepage:

- **Active Records**: The number of active person records in the database
- **Active Families**: The number of active families in the database
- **Active Connections**: The number of active connection requests in the database

We've supplied these metrics—which will automatically update weekly—as a way of getting you started. We encourage you to customize this section and select different metrics by editing the block settings.


---

## Rock Admin Hero Guide {#rock-admin-hero-guide}

> **Path:** Rock Admin Hero Guide

This skill catalogs the chapters of *Rock Admin Hero Guide* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Rock Admin Hero Guide > Welcome

We hope that by the time you finish this guide you will not only be able to survive, but thrive in your role as a Rock administrator. Our goal is to make you the hero of your team, the one person everyone goes to for answers. So, what are we waiting for? Let's get started.


---

## Intranet {#intranet}

> **Path:** Rock Admin Hero Guide > Intranet

The Intranet tab is one area of Rock that will be unique to every organization. Rock ships with a few intranet items already set up, but we encourage you to customize the list. This is a great place to share information with your staff and key volunteers. Your intranet might include items like:

- Office Information
	- Holiday Schedule
		- Common Links (ordering office supplies, etc.)
		- Referral Lists
- Staff Phone Lists
- Human Resources Content
	- Payroll Calendars
		- Timesheet Templates
		- Employee Forms
		- Org Charts
		- Benefits Information
		- Employee Manual
- Finance Information
	- Chart of Accounts
		- Expense Report Templates
		- Forms (W-9, etc.)
- IT Resources
	- FAQs
		- How to set up email on mobile devices

# Keeping It Up-To-Date

It’s important to know who will be responsible for keeping each area of your intranet up-to-date. It's easy enough to add the information, but there's no point in adding it if you don't have a plan for keeping it updated.

# Org Chart

Under the *Intranet* tab you’ll find an *Org Chart* page. This is simply a group viewer that's designed to help you develop your own organization chart. It's often helpful to have an org chart in Rock that you can easily reference, like when you’re setting up security. If you don't think you'll need this, you can simply hide it from the navigation by changing the *Display When* setting to Never under *Page Properties*. Or you can always just delete it.

# Going Deeper

The group type for the Org Chart areas/departments is *Organization Unit*. Feel free to add additional attributes to groups of this type if it makes sense for your organization.


---

## Getting Comfortable {#getting-comfortable}

> **Path:** Rock Admin Hero Guide > Getting Comfortable

Getting Comfortable

Hopefully by now you've had some time to poke around Rock - window shopping at all the features. Let's discuss a couple of tips and tricks that will make you feel more at home.

# Keyboard Shortcuts

In an effort to speed up your interaction with Rock, we've added several keyboard shortcuts. We made changes to our shortcut keys to be standardized for both Obsidian and Web Forms. Let's look at what's available:

- Alt + Q **Quick Search:** Sets focus to the search box at the top of the page.
- Alt + S **Save:** Presses the save button on the given page.
- Alt + E **Edit:** Presses the edit button on the given page.
- Alt + C **Cancel:** Presses the cancel button on the given page.
- Alt + N **New:** Presses the add button on any grid on the page.
- Alt + E **Edit Individual:** On the Person Profile page this allows you to edit the individual's information.
- Alt + O **Edit Family:** On the Person Profile page this allows you to edit the family's information.
- Alt + R **Refresh:** Presses the refresh button on the given page.
- Alt + → **Next:** Presses the Next button on the given page.
- Alt + ← **Previous:** Presses the Previous button on the given page.

We also have keyboard shortcuts specifically for admin bar functions:

- Alt + B **Block Configuration:** Enables the Block Configuration fly-outs.
- Alt + Z **Page Zones:** Enables the Page Zones fly-outs.
- Alt + P **Page Properties:** Opens the Page Properties modal window.
- Alt + L **Child Pages:** Opens the Child Pages modal window.

If you're using a Mac, press Ctrl + Opt (instead of Alt) and the letter key of the shortcut you want to perform. We will continue using Alt + M as a legacy shortcut for "Edit".

# Working with Rock's Settings

Throughout this manual you'll find frequent references to the administrative settings located at Admin Tools \> Settings. Let's go over the features in this area to help you get comfortable finding the settings you need.

![Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/page-serach-block-v18.png)

Settings


---

## Learn the Lingo {#learn-the-lingo}

> **Path:** Rock Admin Hero Guide > Learn the Lingo

Learn the Lingo

Why do techies always seem to speak another language? We’ve worked hard to limit the tech babble, but there are a few words we’d like to define to help build a shared vocabulary.

# Entities

The word "entity" is used to describe the classification unit of different types of data in Rock. For instance, *People*, *Groups*, *Financial Transactions*, *Locations* and *Pages* are all entities in Rock. If you’re familiar with databases, entities are very similar to tables. In fact, most entities in Rock have an associated table in the database.

You might be asking, "Why do I need to know this?" For the most part, you don’t have to know a thing about entities to successfully use Rock. You'll see the term in many of the configuration screens so it’s good to know what it is.

# Defined Types / Defined Values

Many of the configuration items in Rock are made up of a list of valid values. Think about the *Marital Status* of a person. While we could have made this a textbox where anyone could type in the marital status of a couple, in today’s world that could be a disaster. You’d probably get a million different answers to that question. Instead, it's better to limit the options to a finite list that makes sense to your organization.

The "valid value" concept is prevalent in numerous areas (*Record Status*, *Phone Types*, etc.) Instead of creating separate screens and logic for each of these, we came up with the concept of *Defined Types*. These are lists made up of values (*Defined Values*) that you get to configure according to your organization’s needs.

Check out the [Defined Types](#definedtypes) section of the [General Settings](#generalsettings) chapter below for more information.


---

## My Settings {#my-settings}

> **Path:** Rock Admin Hero Guide > My Settings

My Settings

Rock offers several types of personal settings for each logged in individual. To help manage this, Rock has a *My Settings* page which lives under the *Login Status* dropdown in the upper right of the internal pages. This page is a one stop shop for personalizing settings and configurations.

![My Settings Page](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/my-settings-v19.png)

My Settings Page

# Change Password

This is where the individual can change their password. Simple enough.

# Communication Templates

This page allows the individual to access communication templates they are permitted to edit. You might find it convenient to secure certain templates so only a single person can edit them; they can edit those templates here even if they don't have access to the *Settings* page on the Admin Tools menu. For more information on templates, check out the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) and [Email Template Survival Guide](https://community.rockrms.com/documentation/bookcontent/34/) manuals.

# Merge Templates

The *Merge Templates* feature allows you to take a table of data and convert it into a formatted report or set of labels.

This page allows the individual to view, add, edit and delete personal merge templates. Merge Templates are covered in the [Merge Documents](#mergedocuments) chapter of this manual. In general, though, templates uploaded here won't be available for use by other people.

# Following Settings

Rock's following features allow an individual to be notified of activities in which they are interested.

From here, an individual can customize their *Following Settings*. You can read more about these features in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#following)

# Following

This page allows the person to view their current following list (the list of people and other items they have chosen to follow). You can read more about these features in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#following).

# Personal Links

From here you can add, remove or organize your bookmarked pages and sections. We go into detail about Personal Links in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#personallinks).

# Dark Mode

On another note, if you're down with the dark side, but your device isn't yet, you can click the and see Rock like you've never seen it before:

![Dark Mode Toggle](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/my-settings-dark-v19.png)

To clarify:

- Inherits the mode your browser is on.
- Is dark mode, no matter what.
- Is light mode, no matter what.


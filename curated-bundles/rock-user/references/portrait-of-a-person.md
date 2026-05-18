---
description: "Use when understanding the core structure of person records in Rock, including hard-coded fields, custom attributes, adding families, and inactivating records"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > Portrait of a Person

Portrait of a Person

# What Makes a Person

Before we start diving into the features, let's look at what makes up a person in Rock.

There are two main sources of data when looking at a person's record. First are the common data elements that are "hard-coded" into the system. These include basic fields like *First Name*, *Last Name*, *Email*, etc. These fields are common to all organizations, so they have been provided from the beginning of Rock and can't be removed.

# Field Limitations on Rock

When a person enters their name into a Rock profile, they will receive a warning message if they use any unsupported characters. Unsupported items in the name fields include special fonts, emojis and the following characters: ( **, { **, \[ **, ) **, } **,\] **or ".************

Second, since every organization is different, Rock also allows you to add new data items to a person. We call these *Person Attributes*. You can add as many as you like, selecting a data type for each one. Common data types include:

- Text
- Date
- Number
- Dropdown of provided values (think of an attribute of T-Shirt Size with the values of S, M, L, XL)
- Boolean (aka, True/False, Yes/No)
- Document

While there are quite a few other data types you can use, those are the common ones.

Over time, your list of added attributes can become quite large. To help with this, we've provided the ability to group them into categories. You'll see these attribute categories later when we look at the *Person Profile* page.

# Note

See your administrator to help define new person attributes and categorize them into groups.

# Adding a Person

As you’re getting started, one of the first things you’ll want to do is add someone (perhaps yourself) to the database. While it might be intuitive to look for a menu item labeled "Add Person", you won’t find one. Because people are members of families, you must start with adding a family. You’ll find that under:  
People \> New Family.

# Deleting a Person

While it might seem like a natural thing to do, deleting a person is not allowed in Rock. Why? The history of a person must be maintained for historical records to be accurate. Think about giving and check-in. If a person was deleted, you would lose their contributions and attendance information. Instead of deleting people, you can inactivate them in the database (more on how to do this later).

Let's look at some common situations where you might want to delete a record, and how to handle them in Rock.

**Scenario:** John Doe no longer attends and has asked to be removed from the database.

**In Rock:** You can consider John removed when he has been marked inactive. This should remove him from all future emails.

# Note

When writing custom reports, be careful not to include inactive records.

**Scenario:** You added a duplicate record and want to delete the new one.

**In Rock:** Instead of deleting the record you'll need to merge it with the existing record. See the [Duplicates](#duplicates) section below on how to do this.

**Scenario:** You added a test record and now want to delete it.

**In Rock:** It would be best not to add test records to your production environment. You might consider creating a test environment that you can treat as a sandbox. If you added a sample record to your database, you have two options. The first option is to inactivate it like it was a normal person. The second would be to merge the record with an existing record.


---

## Person & Family Field Guide {#person-family-field-guide}

> **Path:** Person & Family Field Guide

This skill catalogs the chapters of *Person & Family Field Guide* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Person & Family Field Guide > Welcome

Welcome to the Rock field guide for managing people. Individuals and families are at the core of what we do. In this guide we'll look at the people-managing tools you'll find in Rock. We'll also dig a little deeper to give you a glimpse into how Rock stores information about individuals to help you best use Rock in your organization.


---

## We Are Family {#we-are-family}

> **Path:** Person & Family Field Guide > We Are Family

Every person in the database belongs to a specific *group type* called Family. It’s impossible to add a person to the system without either creating a new family or adding them to an existing family. However, an individual isn’t limited to membership in a single family. They can belong to many families, but they will always have at least one. Below we look at some of the other unique things about the family.

# Addresses

Addresses are tied to the family, not the individual. There are several different types of addresses defined in Rock, and you can add more if you’d like. The ones that are available out-of-the-box include:

- Home
- Work
- Previous

## Adding an Address Type

If you'd like to add a new address type, follow these steps:

1. Add a new group location type under:  
	Admin Tools \> Settings \> General \> Defined Types \> Group | Location Type.  
	Be sure you select the Group | Location Type as there's also a Location | Location Type.
2. Add your new group location type to the Family group type under:  
	Admin Tools \> Settings \> General \> Group Types.  
	From this screen select the *Family* group type and add the new address type to the Location Types list in the *General* section.

# Configuring Address Fields

If needed, you can make specific parts of an address required, optional or hidden. Navigate to Admin Tools \> Settings \> General \> Defined Types \> Countries and edit the entry for your country according to your needs.

# Campus

If you’re a part of a multi-site organization, the campus is also tied to the family. Interestingly, if a person is a member of two families that attend separate campuses, the individual will be tied to two different campuses as well. This is a powerful pattern for blended families to use.

If you’re not a multi-site organization then the campus is still tied to the family, but it’s done behind the scenes. This is needed just in case a new campus is ever added.


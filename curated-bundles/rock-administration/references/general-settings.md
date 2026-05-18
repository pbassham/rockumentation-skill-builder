---
description: "Use when configuring Rock system settings, organization details, global attributes, or installing Rock software updates"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > General Settings

General Settings

To make Rock a configurable and flexible tool, we’ve added a lot of settings you can tweak to make it work for your organization. While these settings may seem intimidating at first, once you learn more about them, you’ll become more and more comfortable. Let’s look at each of the major configuration sections and we’ll briefly explain what each one does. All of these areas can be found under the *Admin Tools \> Settings* menu item.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/general-settings-v18.png)

General Settings

# Rock Update

Updates are one of Rock’s best features. Many systems require tedious software updates only the vendor can complete. Not so with Rock. When an update is made available, all you need to do is visit this screen to check the details. When you’re ready, simply click the Install button. Rock will then download and install the updates for you. How easy is that?!

# Global Attributes

Global attributes (Admin Tools \> Settings \> Global Attributes) are the basic configuration settings that are used to customize Rock. Each has a default value that you can override. Many of these are set up during the installation process. Below is a list of some of the core settings and descriptions.

| Setting | Description |
| --- | --- |
| Organization Name | The name of the organization that's running Rock. This was set for you during the install, but you can modify it at any time. |
| Organization Abbreviation | There will be times when you want to refer to your organization in a less formal manner. Enter an *Organization Abbreviation* to provide this value. |
| Organization Address | The primary address of the organization. If you're a multi-site organization, this should be the address of your central team location. Each of your campuses will have its own address elsewhere. |
| Organization Email | The default email bucket for the organization. This will be the default address used in the *From* field of bulk emails. This is commonly info@organizationdomain.com |
| Organization Phone | The primary phone number for the organization. |
| Organization Website | The primary website for the organization. |
| Public Application Root | Many times, this will be the address of your external website, if it's hosted on Rock. It's the address that will be used in links that are sent out to the public, such as www.organizationname.com. If your organization's primary website isn't hosted on Rock, it's important that this setting remain the public address of the Rock server (not your organization's primary website) as this setting is used for providing linkbacks for things like images and webhooks. |
| Internal Application Root | Similar to the Public Application Root setting above, this is the address of the internal Rock website. It will be used to construct links on the internal site. Many organizations configure their DNS to be rock.organizationdomain.com. |
| Update Server URL | This is the address that Rock uses to look for updates. It should not be changed. |
| Google API Key | Rock uses Google Maps for many of its features. This requires what's known as an API key to use the maps. While there was a setup step in the post-install checklist, you can change this key at any time. See [below](#creating-a-google-maps-api-key) for details on setting up this key. |
| Google Maps Id | This relates to how your maps in Rock are styled. We discuss this field in greater detail in the [Google Map Styles](#google-map-styles) section below. |
| Google ReCaptcha Site Key | This is one of the two API keys needed to use ReCaptcha in Rock. To obtain this key, go to [https://www.google.com/recaptcha/about/](https://www.google.com/recaptcha/about/) and click “v3 Admin Console” near the top of the page. You’ll need to log in with a Google account. Select reCAPTCHA v2 as the reCAPTCHA Type and complete the rest of the form. Upon submission, you’ll be provided with your Site Key and Secret Key. |
| Google ReCaptcha Secret Key | This is one of the two API keys needed to use ReCaptcha in Rock. See the above entry for directions on obtaining this key. |
| Email Exceptions List | "Exceptions" is a technical term for errors. This setting is a list of email addresses that should receive an email when these errors occur. Keep in mind that errors do happen, and don’t worry if you get a notification email occasionally. Rock also keeps a list of every exception in the database, so you don’t need to keep these emails. Just think of them as an FYI. |
| Email Exceptions Filter | Oftentimes exceptions will occur when search indexes (like Google or Bing) scan your site and reference pages incorrectly. While these exceptions will always get logged, you can use this setting to prevent a notification email from being sent for these (and any other) types of exceptions. When any exception occurs, Rock will evaluate the client's HTTP Server variables for any variable you specify in the Key. If that server variable exists, and its value contains what you entered in the Value, the notification won't be sent. In addition to server variable names, if you use a key of 'Type', 'Source', 'Message' or 'StackTrace', Rock will check to see if the current exception's values for those keys contain what you entered for the value and if so, the notification won't be sent. |
| Grade Transition Date | The date your organization uses to promote kids to the next grade level. Grades are calculated in Rock based on the future graduation date from the 12th grade. This date is used to update the grade each year. While the default date of 6/1 will probably work for most organizations, you can modify it to match the needs of your community. |
| Email Header / Email Footer | The HTML that makes up the header and footer for emails that are sent from Rock. These settings are only used for system communications. You can create multiple different email templates to use in Rock. See the [Communicating With Rock](https://community.rockrms.com/documentation/bookcontent/8/) guide for more information on best practices in email templates. |
| Email Header Logo | This is the logo that should be used in the email header. If the logo displays as a broken link, be sure to check that your Public Application Root setting is correct since this is used to help generate the link to the logo. |
| Password Regular Expression | A secure password means different things to different people. By default, all passwords in Rock need to be at least six characters long and can only contain letters and/or numbers. If you like to require passwords to include special characters and/or mixed case letters, you can provide a regular expression that all passwords are required to match. |
| Password Rules Friendly Description | When you change the regular expression required for passwords, you’ll want to change the description of the password requirements that people see on the website. Use this setting to describe what a valid password must contain. |
| Job Pulse | This isn't really a setting; it continuously displays the date and time that jobs last ran. You can use this to confirm that jobs are running correctly. |
| Log 404s As Exceptions | This tells Rock whether File Not Found errors (404s) should be treated as exceptions. For the most part, you'll want to leave this off. You can enable it if you’d like to find all of the broken links on your website. |
| Preferred Email Link Type | This setting is used to configure the type of email links you'd like Rock to use. 'New Communication' will cause Rock to link to the New Communication page, while 'Mailto' will configure Rock to use a mailto tag which will take the individual to their configured mail client. |
| Lava Support Level | This setting allows you to choose your support level for old Lava syntax. In short, you can either allow legacy Lava or not. Generally, and especially for organizations new to Rock, this should be set to "NoLegacy". |

## Editing A Global Attribute

You can click the row to edit the attribute's value. This is the standard way to, for example, change your organization’s phone number or enable auditing.

You’ll also notice a icon for each row. While clicking the row will let you edit the attribute’s value, clicking allows you to update the attribute itself. Typically, there won’t be any reason to do this.

## Creating a Google Maps API Key

Let’s take a moment to look more closely at the “Google API Key” global attribute. We’re giving this particular attribute a lot of attention because there are several steps involved with setting it up correctly.

Rock's *Group Viewer* can display a static map showing a group's location, but to do so it requires you to set up a Google Maps API Key and activate the Google Maps JavaScript and Static APIs. Below are the steps you’ll need to get started.

# Note

Google provides a large number of free credits each month, so you shouldn’t be charged for using maps in Rock.

  
1. Go to the [Google Maps Platform](https://cloud.google.com/maps-platform/) welcome page then click Get Started.
2. You'll need to log in with a Google account.
3. If prompted, provide the requested account information:![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/google-maps-step1-v14.png)
	Account Information
4. If prompted, provide the requested payment information. Your card will not be charged unless you manually upgrade to a paid account.![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/google-maps-step2-v14.png)
	Payment Information Verification
5. Answer the provided questions according to your organization.![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/google-maps-step3-v14.png)
	Google Maps Platform Questions
6. Click the copy button next to the API key to copy it to your clipboard.![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/google-maps-step4-v14.png)
	Copy API Key
7. In Rock, on the Global Attributes page (Admin Tools \> Settings \> Global Attributes) click the "Google API Key" row to edit and add the key value.

# Protect Your API Key

After obtaining your key, you may optionally choose to implement a restriction type, to limit where the API key works. For instance, you might choose *HTTP referrers* and provide your website as `yourdomain.com/*` to limit its use to only your website. If you're not sure what to choose we recommend consulting with your IT department.

Back in Google, navigate to the "dashboard" on the API manager and click on the button labeled "ENABLE API". This brings you to a page listing all the available API's. Under the Google Maps API click on the JavaScript API. Then you'll choose your project, and once that's loaded, you'll select the "ENABLE" button near the top center of the page. You'll also need to enable the Static API for static maps used by blocks like Group Finder.

## Google Map Styles

Maps in Rock serve many purposes—from locating your church to guiding small groups and service projects. Rock’s built-in map themes offer customization, but what if you have a unique vision? If the default templates don’t fit your style, or you want to showcase your design skills, try *Google Map Styles* to create a look that’s truly yours.

![Google Map Styling](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/map-style-editing.png)

Google Map Styling

Check out this bright orange map above. Google's *Map Styles* makes it easy to change how land, road, and water are themed, or whether they are even visible.

### Customizing Your Map Style

When you're ready to create a custom map, access the [Google Maps Platform](https://console.cloud.google.com/google/maps-apis/studio/maps/) . Once there, you can start dreaming in the *Map Styles* tab.

![Google Maps Create New Style](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/add-map-style-v17.png)

Google Maps Create New Style

Now edit and edit to your heart's desire. When your map is ready, go to the *Map Management* tab. Here you'll find Google's tool to create your *Map ID*. This string of characters tells other systems how you want your Google maps to look.

![Create Map ID](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/create-map-ids-v17.png)

Create Map ID

To get the key to your custom map, start by generating a *Map ID* and selecting "JavaScript" as the Map Type. After saving, navigate to the *Map Styles* section and click "Change Style." Choose your custom design, then save once more to apply your changes.

Now that you have your *Map ID* handy, go back to Rock, (Admin Tools \> Settings \> Defined Types.

![Map Style Defined Type](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/map-style-defined-type-v18.png)

Map Lava Shortcode

In *Map Styles*, many pre-configured options exist. Now, it's time to add a new one. Update the *Google Map ID* attribute, save, and you have a fresh look to use on any map you desire. Update the block settings for any map block, and you can select your new theme.

![Map Style Defined Value](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/map-style-defined-values-v18.png)

Map Lava Shortcode

### Map Style Lava Shortcode

Maps in Rock aren't confined to specific blocks. The Google Map shortcode lets you drop a map onto any page, giving you complete creative freedom.

Here's how it works: If you've set a *Google Maps ID* in the "Map Types" Defined Type, that styling automatically applies to any shortcode map you create. But let's say you want a particular map to have its own unique look. You can use the 'mapid' parameter in your shortcode to override the global setting. This allows you to fine-tune maps for special use cases without affecting the rest of your system.

![Map Lava Shortcode](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/map-lava-shortcodes-v18.png)

Map Lava Shortcode

Rock's Lava shortcode is also pretty smart. It checks for a 'mapid' parameter in your shortcode first. If it finds one, that style is applied. If not, it falls back to the Defined Type. And if you've skipped both, you can still provide local styling directly in Lava.

# Defined Types

*Defined Types* are settings that are specific to a certain feature. In the list, you’ll find settings for *Check-in*, *Giving*, *Marketing Campaigns*, *Metrics* and *People*. Each of these will be discussed more in sections relevant to each feature, but let’s look quickly at how you can edit these settings.

Each *Defined Type* can have multiple values (cleverly called *Defined Values*). To edit the values for a *Defined Type*, simply click on the item in the grid you want to edit. You'll then be taken to a new screen where you can edit its values.

A basic example is the “Ability Level” Defined Type. There are three ability levels that can be used in the system (Infant, Crawling or Walking, or Potty Trained) and each is set up as a Defined Value within the Defined Type.

# Inactive Values Staying Visible

Inactive values are preserved on existing records to prevent data loss. If a record includes an inactive value, it will still appear in the edit control for review or updates. However, inactive values won’t appear for records where they were never used.

## Defined Value Categories

Each *Defined Type* has an option that allows you to categorize its *Defined Values*. For instance, if you're using a person attribute of type *Categorized Defined Value* then this lets you find and select a *Defined Value* based on its category, without having to go through the full list of all available *Defined Values*. The categories are maintained within the *Defined Type* itself if *Enable Categorized Values* is enabled, as pictured below. Each category can have child categories if needed.

![Defined Value Categories](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/defined-type-edit-defined-value-categories-v18.png)

Defined Value Categories

Keep in mind that when a *Defined Value* doesn't have a category, it will always be available. If a *Defined Value* has a category in cases where there are child categories beneath it, it will appear in the list when looking at the child categories.

# Group Types

The *Group Types* screen is used to add new types of groups and to modify those that already exist. These settings are discussed in detail in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#grouptypes) guide.

# Campuses

If your organization has several sites, you can manage them here. Check out the [Campuses](#campuses) chapter to see the various options available to you.

# Tags

Tags allow you to categorize any entity (person, content channel, etc.) into groupings based on a descriptive label. The default entity is Person, but you can change it to any entity you want. The possibilities here are endless, and the results can be super beneficial to your organization.

Tags are discussed in detail in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#tags).

As an administrator, you'll be responsible for the classification of organizational and personal tags. Only administrators can create an organizational tag and convert a personal tag to an organizational tag. Only those with tagging rights can add security to tags.

## Create A New Organizational Tag

To create a new organizational tag, first be sure that your filter settings are set to view only organizational tags. Once this is set, simply click the button in the footer of the grid.

## Converting A Personal Tag to An Organizational Tag

Before converting the tag, be sure that the filter for the tag list is set to show only personal tags. Next, find the tag you want to convert and click its row on the grid. You'll then be taken to the edit screen where you can convert it to an organizational tag.

## Securing Tags

Organizational tags can be secured, which limits who can see them. Tagging rights are based on security configuration, and this advanced usage is typically done by administrators. You can add security to a tag by clicking on the button in that tag's detail screen, located at Admin Tools \> Settings \> Tags. For more information about security configuration, see the [Securing Rock](#securingrock) chapter.

# Workflow Configuration

Rock is built on top of a powerful workflow engine. These workflows can be configured using the screens found in this section. Creating and configuring workflows is covered in the [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide.

# Workflow Triggers

You can configure a workflow to be launched whenever an entity record is changed or deleted. See the [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12#entitytriggers) guide for more information on configuring workflow triggers.

# File Types

Rock can be made to store and manage several different types of files. These include things like images for marketing campaigns, label templates for check-in and the pictures of individuals that display on the *Person Profile* page. These files can be saved in different storage types. The two main storage types are:

- **Database:** The files are stored as BLOBs (Binary Large OBjects) in the database. Database storage is a good solution for items that you’d like backed up with your data. Database storage is also a bit more secure since the files are stored in an additional layer of security in the database.
- **File System:** Files using this storage type are stored on the webserver’s file system. They are securely stored in a directory that can't be directly linked to. This storage type is best for large files that might eat up your valuable database storage space.
![File Type Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/binary-file-type-configuration-v18.png)

File Type Settings

In the screenshot above you may have noticed settings related to Caching. Caching files can improve the performance of your Rock application, especially for file types that are frequently accessed. When you enable caching for a file type, Rock stores a cached copy of the file on the server's file system. This cached version can be accessed more quickly than the original file, reducing load times and improving overall performance. Caching is particularly beneficial for images. Rock can resize images on the fly, which can be resource-intensive. By caching resized images, you can avoid unnecessary resizing operations and improve performance.

Below is some general information related to the *Cacheability Type* options:

1. **Public:** The file can be cached on the browser or any other shared network cache like a CDN. This is for files that can be shared and cached by multiple people, such as static assets like images. This can reduce network traffic and improve page load times.
2. **Private:** This item can only be cached in the browser. Private is best for files that should only be cached by the individual's browser, such as user-specific data or personalized content. This helps ensure privacy and prevents unauthorized access to sensitive information.
3. **No-Cache:** Files of this type will be checked on every load, but if it is deemed not to have changed since the last load, a local copy will be used. No-Cache means that people will always see the most up-to-date version of the file.
4. **No-Store:** The file will never be stored by the local browser. This is used for sensitive files like check images or background check documents, to ensure files of this type are protected from unauthorized access.

Lastly, when working with File Types, you have the option to make *Preferred Settings Required*. This simply means that the values you provide for *Max File Size*, *Maximum Width*, or *Maximum Height* must be respected or the file won't upload.

# Named Locations

This configuration screen allows you to define specific locations with a name. You'll want to use this to define your campuses, buildings and rooms. These *Named Locations* can then be used with configuring groups, check-in, etc.

# Devices

The *Devices* page is used to manage devices that interact with Rock in some way. Today this is primarily used to help manage check-in kiosks and label printers, but in the future, we hope to add support for all types of devices.

# Schedules

Several features require the configuration of repeating schedules. For instance, check-in needs to know your organization’s schedules to be able to configure the time check-in should start. These screens allow you to create those schedules.

# Attribute Categories

Everything stored in Rock can have attributes added to it. For example, we can add numerous attributes to a person according to what's important to your organization. In an effort to keep this from becoming unmanageable, you can group your attributes into categories. These screens help define these categories and provide some basic configuration for each.

The first step in adding a category is to filter by the data entity you wish to work with. The default, and most often used, is Person. For each category you can provide a description and give it an icon to use on the Rock screens.

# Prayer Categories

The prayer features use categories to help organize and classify prayer requests. See the [Raising Up With Prayer](https://community.rockrms.com/documentation/bookcontent/11/) guide for more information on configuring prayer features.

# Person Attributes

This screen allows you to manage the person attributes you've configured in the system. See our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#personattributes) for more information.

# Badges

Badges are simple icons that express details about a person’s involvement or activity with your organization. Examples of badges would be baptism or attendance rate. You can view badges in places like the *Person Profile* or in *Connection Requests*. See our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#badges) for more information.

# Merge Templates

This is where you'll manage the systemwide merge templates. You can find out more about merge templates in the [Merge Documents](#mergedocuments) chapter of this guide.

# Group Requirement Types

This page allows you to manage the group requirements for your organization. You can learn more about group requirements in the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#grouprequirements) guide.

# Signature Documents

This page allows you to house templates for documents that require signatures, such as registration forms. Click the button to add a new document. You can learn more about electronic signatures in the [Electronic Signatures](#electronicsignatures) chapter of this guide.

# Universal Search Control Panel

This screen allows you to configure the Universal Search settings. To learn more about Universal Search, see the [Universal Search](https://community.rockrms.com/documentation/bookcontent/32/) manual.

# Attribute Matrix Templates

The Attribute Matrix Templates screen allows you to create a dynamic layout of multiple field types of your choosing. Like a spreadsheet, the matrix is made up of rows and columns. You can use Lava to customize the fields, but what's provided out of the box will likely fit most of your needs. Keep in mind that attribute matrix templates aren't reportable (yet), but this powerful tool allows you to dynamically populate pages with just about any information you want. For example, you can create a matrix of phone number attributes, then customize a page to display those numbers on the fly.

Creating an attribute matrix is a two-step process. First, create your template in the Attribute Matrix Templates screen, then configure the page to display the matrix. You can learn more about page customization in the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14/) guide.

# Tag Categories

This screen allows you to view and configure tag categories. To learn more about tags, see the Tags chapter of the [Person & Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#tags).

# Archived Groups

This screen allows you to view groups that have been archived and allows you to unarchive them. To learn more, see the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#grouphistory) manual.

# Group Member Schedule Templates

This allows you to add or modify group member volunteer/serving schedule preferences. Examples include every week, every other week, etc. To learn more, see the [Rock Your Groups](https://community.rockrms.com/documentation/bookcontent/7#groupscheduler) manual.

# Document Types

Use the *Document Types* page to manage documents for use by any entity. This block provides a summary of the document types, the file type and the associated entity type.

See the [Entity Documents](#entitydocuments) chapter for full details.


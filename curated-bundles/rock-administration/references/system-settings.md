---
description: "Use when configuring geocoding services, address standardization, or setting up location-based features in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > System Settings

System Settings

While system settings are rarely modified, understanding them will give you better insight into how Rock works and what's possible.

![System Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-settings-v18.png)

System Settings

# Location Services

Knowing the locations of those who engage with your organization can be very powerful. In order to do this, you need to be able to convert a person's address (3120 W Cholla St Phoenix, AZ 85029) to a latitude / longitude point (33.590795 , -112.126459). To do that, you’ll need to run your addresses through a geocoding process. Rock will handle all of the work; all you need to do is provide a geocoding service to handle the requests. Rock has a couple of services for you to pick from. More information on geocoding can be found in the [Locations](#locations) chapter of this document.

Like the geocoding services, you can also send your addresses through a standardization process. These processes can fix the following for your addresses:

- Fill in any missing items (555 W Main to 555 W Main St)
- Fix any case issues (555 w main st to 555 W Main St)
- Standardize elements (555 West Main Street to 555 W Main St)
- Append Zip+4 info (85383 to 85383-3622)

The standardization process helps increase the quality of the addresses in your database. More information on address standardization can be found in the [Locations](#locations) chapter.

# Entity Attributes

We’ve already discussed how attributes can be attached to common entities like people or groups. By now you know about those attributes and the power they bring to Rock. But that's only the tip of the iceberg. From the *Entity Attributes* page, you can add attributes to any entity that exists in Rock.

Sometimes you won't want the attribute applied everywhere the entity exists. For instance, you might want a group attribute to apply only to groups of a certain type. You can narrow the scope of the attribute using the *Qualifier Field* and *Qualifier Value* fields. Using these fields, the attribute pictured below will only be attached to Connection Request Activity entities within the "Children's" connection opportunity. Rock's [Model Map](#modelmap) can help you identify what properties you can use as qualifier fields.

![Entity Attributes](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/entity-attributes-v18.png)

Entity Attributes

Although there's a dedicated page for this, you can also create *Global Attributes* from the *Entity Attributes* page. For the most part, you shouldn't need to do this unless you're writing your own code to run inside Rock. To add a *Global Attribute*, simply create a new entity attribute that isn't tied to any entity.

# Adding New Options from Attributes

When adding an attribute with a *Field Type* of "Defined Value" you'll be given the option to *Allow Adding New Values*. If enabled, this lets you add to the *Defined Type's* list of values from anywhere the attribute is accessed.  
  
The same concept applies to attributes with a *Field Type* of "Location List", which has the option to *Allow Adding New Locations*.

# Search Services

Rock’s *Smart Search* box at the top of every page allows you to search for people and groups using various criteria like name, phone and email. These screens allow you to manage those search types. For the most part you’ll want to leave them set as-is, but you can inactivate one if you find it isn't helpful. A key concept is that you can write your own search services with some custom coding. If you do, they will appear on this list for you to enable and configure.

# Jobs Administration

While much of Rock works through the interaction of individuals within the system, there are times when you’ll want to run functionality in the background. For example, you may want to run a process to clean up or update data in the system in an automated fashion. These background tasks are called *Jobs* and can be managed and scheduled through the screens in this area. See the [Jobs](#jobs) chapter for additional details.

# Data Filters

*Data Filters* are an integral part of Rock’s reporting strategy. Hopefully you’ve already read about them in the [Taking Off With Reporting](https://community.rockrms.com/documentation/bookcontent/6#filteringusingdataviews) guide. At a high level, data filters allow you to narrow down your view of data by providing specific criteria. These filters can be enabled, disabled and secured in this set of screens. Like many things in Rock, you can develop your own *Data Filters* that can be managed here.

# Data Transformations

Once you’ve filtered your data, you can add a transformation to it before it's displayed. Say you've filtered to see only children who have attended twice in the last two months, but you really want to display information about the parents of these children. A transformation (in this case the *Person Parent Transformation*) would convert the child data to parent data. You can manage these transformations here. Just like with filters, you can also develop your own transformations.

# Data Selects

Data selects are used in reporting. When you create a report, you provide it with a data view to act as a filter. You also add columns to your report. Many of these columns will be attributes of the person or group. You can also choose to add some powerful dynamic columns. These dynamic columns are managed and secured from this screen.

# File Storage Providers

In the [File Types](#filetypes) section we discussed file storage providers. These providers help Rock manage the saving and retrieving of files to different storage media. The two default storage types are *Database* and *File System*, but others like Amazon, Cloudinary, Azure or Google can be used. Under the *File System* configuration, you can change the default location for file storage. For the most part, you can leave these settings as you found them.

# Exception List

Despite all of our work to eliminate bugs, some will sneak by us. Exceptions, also known as errors, can occur as a result of software bugs or when blocks and pages are misconfigured. While you can set these errors to be emailed to you (see Admin Tools \> Settings \> Global Attributes \> Email Exceptions List), you can also view the history of these errors here.

Exceptions are sorted chronologically. Instead of showing you every error in a large list, we've grouped them by type. This helps you determine how often an error is occurring.

# Protect My Ministry

Rock provides a seamless integration with Protect My Ministry to provide reliable background checks for your organization. See the [Background Checks](#backgroundchecks) chapter for specifics on this integration.

# Checkr

Checkr provides modern and compliant background checks for use with Rock. With your Checkr token from RockRMS.com you’ll be able to initiate background checks using Checkr’s scalable, cost-effective and rapid screening solutions. See the [Background Checks](#backgroundchecks) chapter for specifics on this integration.

# Financial Gateways

Financial gateways allow Rock to move money from individuals’ accounts to the organization. Information on these gateways and their configuration is provided in detail in the [Rock Solid Finances](https://community.rockrms.com/documentation/bookcontent/15#paymentgateways) guide.

# Background Check Providers

These screens allow you to configure different background check providers. You can read more about Rock's background check features in the [Background Checks](#backgroundchecks) chapter.

# Category Manager

The *Category Manager* allows you to add categories for any entity type in Rock. Think of it as your one stop shop for any category. To help simplify the process be sure to use the entity type filter.

# System Configuration

This screen allows you to change some technical configuration settings in Rock. For the most part you should never need to worry about these settings, but we've provided this page to help you change them if needed.

# Warning

Changing these settings will cause Rock to restart. This means that all sites will be unavailable for a few minutes during the restart. Use caution when changing these settings.

![System configuration settings page including timezone, cookie duration, and keep alive options.](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-configuration-general-v18.png)

General Configuration

![UI Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-configuration-ui-settings-v18.png)

UI Settings

# Observability

Configuring Observability can be found in the [Observability Chapter](#configuringobservability).

![Experimental Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-configuration-experimental-settings-v18.png)

Experimental Settings

![Web.Config Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-configuration-web-config-settings-v18.png)

Web.Config Settings

![Family Rules](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/system-configuration-family-rules-v18.png)

Family Rules

# Application Groups

Application groups are, as the name suggests, groups that are used by the Rock application. This way, Rock can refer to the members of a group instead of running through complex logic to identify certain individuals. These groups are listed here for administrator access.

# Merge Template Types

Rock allows you to have several different merge template types (think 'HTML', 'Word', etc.) You can manage these provider types with these screens.

# Note Types Settings

Rock allows any entity type (People, Financial Batches, Prayer Requests, etc.) to have notes attached to it. In fact, you can even have different types of notes on a single entity. These screens allow you to set up this powerful feature. You can read more about these features in the [Note Types](#note-types-chapter) chapter of this manual.

# Following Events

This section allows you to define new *Following Events*. You can read more about these features in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#following)

# Following Suggestions

This section allows you to define new *Following Suggestions*. You can read more about these features in the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#following)

# Universal Search Index Components

This page is used to view and maintain the available Universal Search Index Components. Universal Search allows you to search multiple types of data at once in a full-text manner. In a sense, it's like Google for Rock. To learn the ins and outs of Universal Search, check out the [Universal Search](https://community.rockrms.com/documentation/bookcontent/32/) guide.

# Calendar Dimension Settings

These settings are used to support Rock’s Business Intelligence (BI) features. In short, these settings relate to date-based information that may be impacted by your organization’s fiscal year. Check out the [Business Intelligence](https://community.rockrms.com/documentation/bookcontent/35/) guide for full details.

# Phone Systems

This page is part of the framework for linking Rock to PBX phone systems. The features added here allow for plug-ins to be created for specific phone systems to allow for features such as creating interactions from call detail records and click to call.

# Note Watches

Here, administrators can see everyone who's watching a note, and can add new "watches". See the [Watching Notes](#watchingnotes) section for full details.

# Asset Storage Providers

An asset storage provider basically refers to storage space in the cloud for things like pictures or videos that are used by your website. Check out the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#assetmanagersystem) guide for more information on configuring the asset manager.

# Assessment Types

Rock ships with Assessment Types already configured and ready to use for each available assessment. Generally, you won't need to change these settings, but you may want to adjust the *Minimum Days to Re-take* or *Requires Request* options.

- **Minimum Days to Re-take:** The minimum number of days after the test has been taken before it can be taken again by the same person.
- **Requires Request:** If enabled, a person is required to receive a request before the assessment can be taken.

Our [Assessments](https://community.rockrms.com/documentation/bookcontent/37) guide has all the details you'll need on each of Rock's assessments.

# Rock Logs

Rock provides a simple, easy to use logging tool. Most of the time you won't need this but having logs can be helpful when troubleshooting or researching. The Rock Log is similar to the [Exception List](#exceptionlist), except you can track more than just errors.

Logs are turned off by default, and typically should only be turned on if there is a specific need. To enable Rock logging, simply select the *Verbosity Level* and the domain or domains you want to output. You have the following choices for the *Verbosity Level*:

- **Off:** No logging should be performed.
- **Fatal:** Very severe error events that will presumably lead Rock to abort.
- **Error:** Error events that might still allow Rock to continue running.
- **Warning:** Potentially harmful situations.
- **Info:** Defines the default set of levels recognized by the system.
- **Debug:** Fine-grained informational events that are most useful for debugging Rock.
- **All:** Log everything.

# Message Bus

Larger organizations may have more than one Rock server. A Web Farm allows multiple servers to talk to each other. They talk to each other over what's known as a Message Bus. The Message Bus can talk to external systems in a two-way conversation. This gets complex and you'll need a developer to set that up, but it unlocks a lot of capabilities within Rock.

Two bus services are currently supported by Rock. They are:

1. **Azure Message Bus**
2. **Rabbit MQ**

To set up the Message Bus, navigate to the Message Bus page under System Settings and click the Configure Transports button. Then click on the transport you want to use, make it active and provide the needed details from either the Azure Service Bus server or the Rabbit MQ server. Ensure only one transport is active by inactivating any you're not using.

# Web Farm

Large organizations soon reach the point where a single server will no longer be able to support peak loads. When this happens, the need for a server cluster, or Web Farm, becomes evident. From the Web Farm page, you can view or edit your Web Farm settings, nodes and a log of certain activities. Benefits of using the Rock Web Farm include:

- It's a more reliable form of cache invalidation
- Takes less resources than the Redis backplane
- Allows the nodes of the cluster to better work together
- Shows basic alerts and server health metrics
- Will allow for more robust clustering features in the future

For full details on Rock's Web Farm feature see our [Hyper Scaling Rock](https://community.rockrms.com/documentation/bookcontent/40#configuringarockwebfarm) guide.

# AI Providers

An AI Provider is a service, such as OpenAI, that offers tools powered by artificial intelligence (AI) to help automate tasks. For example, Rock's Prayer Request system can tap into this power to fix grammar, suggest categories, and other things for prayer requests. Check out the [Raising Up With Prayer](https://community.rockrms.com/documentation/bookcontent/11#prayeraiautomation) guide for more information on configuring Prayer AI Automation.

Rock includes two AI providers: the official OpenAI provider and a generic OpenAI-compatible provider. Setup steps may vary depending on which provider you choose. Here, we'll focus on configuring the basic OpenAI provider.

## Configuring OpenAI

Although we can't describe how all AI providers work, this is how you would get the required keys from OpenAI for use inside Rock.

### Step 1: Sign-up

Visit [OpenAI's Platform website](https://platform.openai.com/settings/organization/general). Log in using your credentials. If you don’t have an account, sign up for one.

### Step 2: Copy your Organization ID

After logging in, navigate to the Organization \> General page. Copy your Organization ID for use later in Rock.

### Step 3: Access the API Keys Page

Next, navigate to the *API keys* page. Note this can be found under Organization or under Project.

### Step 4: Create a New API Key

On the API Keys page, click the \+ Create new secret key. A popup will appear with your newly generated secret API key.

# Important

This key will only be shown once. Be sure to copy and securely save it (e.g., in a password manager or a secure document).

### Step 5: Use the API Key in Rock

Once you have your API key, navigate to Admin Tools \> Settings \> AI Providers.

Select the "Open AI" provider from the list.

Enter the API key *Secret Key* field and the Organization Id in the *OpenAI Organization Id* field.

![Copy the API Key into Rock](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/openai-step5-v18.png)

Copy API Key into Rock

Select the Default Model you'd like to use. GPT-4o-Mini is the most affordable model; while GPT-4o is the most performant.

# Pricing and Other Info

OpenAI charges usage based on the volume of tokens (words) processed. Check their [pricing page](https://openai.com/pricing/) for details. Keep your API key private. Never expose it in public repositories or unsecured environments. For further details, consult the [OpenAI API documentation](https://platform.openai.com/docs/).


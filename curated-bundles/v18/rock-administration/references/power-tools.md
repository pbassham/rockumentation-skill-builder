---
description: Use when the user needs to execute SQL queries directly against the Rock database or run UPDATE/DELETE commands for advanced data manipulation tasks
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Power Tools

Power Tools

Tools that are not used very often, or that need to be used with caution, can be found in the Power Tools area.

![Power Tools](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/power-tools-v18.png)

Power Tools

# SQL Command

The *SQL Command* page is very powerful and should therefore be used with great caution. Rock is built on top of Microsoft’s SQL Server database. While for most people this is a detail they don’t need to know, at times administrators may want to use SQL to get direct access to their data.

The *SQL Command* block allows you to write SQL statements and have them executed directly in the database. When used with a SELECT command, the results of your query will be displayed in a grid below the command.

# Warning!

Whatever SQL command you type in this box will be run on your database. Treat it as a loaded gun. Both DELETE and UPDATE commands will run, regardless of the *Selection Query?* setting. If you're unsure of SQL, you might stay away from this page.

![](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/sql-script-sample-v18.png)

SQL Query

You can also enter UPDATE and DELETE commands if you wish. To see the results of these commands, you’ll need to flip the *Selection Query?* toggle.

# External Applications

We've worked hard to make as much of Rock available through a web interface as possible. Some functionality, though, requires interaction with devices, like check scanners, that don’t work through today’s web browsers. Other times there are situations, like creating giving statements, where the processing of a request could take a while to complete. In these cases, we’ve developed Windows applications to run on your desktop. These applications can be downloaded from the links provided in this section.

# Sample Data

Whether you’re just starting out with Rock or setting up a training environment to share your expertise with others, it's helpful to have some sample data to play with. The *Sample Data* block is a one-step way to import a consistent set of sample data. You'll recognize many of the names from the examples in the Rock documentation. Feel free to run the import repeatedly to keep time-sensitive data like attendance current.

# Warning

We do not recommend that you import this sample data into your production database. This will cause fictitious data to appear in unexpected places like reports.

# Model Map

The *Model Map* is used to access a complete list of every property an entity has. Feel free to explore this area, but keep in mind it's pretty much only used by developers.

# API Docs

This area shows you all entities that have REST endpoints you can use with your custom code. Like the *Model Map*, as an admin you should be aware that this page exists, but it’s really for developers to use.

# API v2 Docs

This page shows you all entities that have REST endpoints relating to the API v2. Like the *Model Map*, as an admin you should be aware that this page exists, but it’s really for developers to use. See the [API](https://community.rockrms.com/documentation/bookcontent/9/#api) section for more details.

# Power BI Registration

Business Intelligence (BI) is a buzz term for tools that allow you to quickly analyze data and present actionable information to leaders. The *Power BI Registration* page is where you’ll go to set up and register your Power BI account. If you want to learn more about BI, start with our [Business Intelligence](https://community.rockrms.com/documentation/bookcontent/35) manual.

# Workflow Import/Export

This tool allows you to share workflows with individuals outside your organization, and to import workflows created by other organizations. There’s a whole chapter dedicated to this feature in the [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12#workflowimportexport) guide.

# CSV Import

Do you have data from another system that you want to get into Rock in an automated way? If so, the *CSV Import* feature is just what you need. This feature lets you add data to Rock from a CSV file. Currently only Person data can be imported this way. In most cases you would use this to import Person data from an external system, such as a previous ChMS. This is a quick and efficient tool, with features that help you troubleshoot problems with your import if any errors are encountered.

## Preparing the Import

The first steps in Rock are pretty straightforward. You'll select a *Data Type* (which will be "People") and then a short description of where the data is coming from. Then you can upload your CSV file and start your import.

![Initial Setup](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/csv-import-initial-setup-v18.png)

Initial Setup

Note that the steps above only apply to your very first import. As pictured below, the process will be slightly different if you've done an import already.

![Previous Source Descriptions](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/csv-import-previous-source-descriptions-v18.png)

Previous Source Descriptions

## Field Mapping

The next step in the process is to map the columns in your CSV file to fields in Rock. As pictured below, each column in your CSV file will be listed on the screen, with a drop-down menu underneath it. All you need to do is pick the field in Rock that corresponds with the column in your file. For instance, if your file has a `first_name` column then you would pick "First Name" as the field in Rock that it should map to.

![Field Mapping](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/csv-import-field-mapping-v18.png)

Field Mapping

After all of the mapping has been completed click the Import button at the bottom of the page to start the import.

## Final Steps

After clicking Import as described above, Rock will arrange and import your data. If everything went well, you'll see a success message as pictured below.

![Import Success](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/csv-import-success-v18.png)

Import Success

There may be cases where the data doesn't import smoothly into Rock. If that happens, Rock will give you a new CSV file that contains the errors that were encountered. Click the Download CSV File With the Errors button to get this file. The file will contain a column named "CSV Import Errors" which will give you details on the issue that was encountered. The best part is, you can take that error file, make your edits directly inside it, and then re-import it as-is. This lets you re-process only the records that hit an error.

![Import Error](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/csv-import-error-v18.png)

Import Error

If a person record is successfully found or created in Rock, but if that record hit an error during the import, a special note will be added to the person's record. In the example pictured below, the import process encountered an error with the person's Gender. This alerts people who are viewing the profile to potentially incorrect or missing data, prompting them to update the record if the correct values are known.

![Import Error Person Note](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/csv-import-error-person-note-v18.png)

Import Error Person Note

# Entity Search

*Entity Search* lets you create reusable searches for Rock entities like people or groups. Instead of rewriting search logic every time, you define it once and reference it wherever you need—keeping your searches consistent, centralized, and easier to manage.

Entity Search integrates with *Lava* and our *API v2* to extend their power. For more see the [Entity Search](https://community.rockrms.com/documentation/bookcontent/9/#entitysearch) section below.


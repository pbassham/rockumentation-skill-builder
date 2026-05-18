---
description: Use when users need to install or set up the Rock Statement Generator software for creating PDF contribution statements
source: "https://community.rockrms.com/documentation/bookcontent/15/367"
sourceLabel: Rock Solid Finances
---
> **Path:** Rock Solid Finances > Contribution Statements

Contribution Statements

When it's time to generate contribution statements, we've created some tools to make the process simpler. Since you may need to be able to both email and mail printed statements, the best file format will be a PDF, and we have just the tool for the job. Let's walk through the process of generating PDF statements with our statement generator software.

# Installing the Statement Generator Software

Installing the statement generator software is easy. It does require a Windows machine running Windows 7 or better to run. It will not work with other operating systems. To install, follow the steps below:

1. Download the setup application under Admin Tools \> Settings \> External Applications \> Rock Statement Generator.
2. Run the setup. The statement generator setup is a breeze with just three quick screens.

# Using the Statement Generator Software

Once you have it set up, it's pretty simple to operate the statement generator software.

Start by launching it and logging in. Users must be a member of one of the groups below to log in with this software:

- RSR - Finance Administration
- RSR - Finance Worker
- RSR - Rock Administration

# First Time Use

Please note that if this is your first time logging in, you'll also be asked for the web address of your Rock server in addition to the Username and Password. Be sure to use HTTPS and not HTTP.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-login-screen-v12.png)

Login Screen

If you need to change the Rock URL, you can do so from the Statement Generator screen pictured below by clicking the *Tools* button in the upper-left corner and selecting *Options*.

To generate statements, click the Start button.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-home-screen-v12.png)

Home Screen

**Step 1:** The *Who Needs a Statement* screen lets you select whether you want to generate statements for *All individuals with transactions and/or pledges*, filtered by a *dataview*, or for a specific individual.

There are several options to consider when selecting *All individuals with transactions and/or pledges*.

- **Exclude inactive individuals:** Select this option if you don't want to generate statements for people with an inactive status.
- **Include Businesses:** This option, which is selected by default, allows you to generate statements for businesses.

# Adding Children to Families and Giving Groups

If your Rock system has a custom job or workflow to move children to new families, don't forget that it will also need to set the child's person record's giving group to the new family (or `null` to indicate giving individually). If this step isn't done, the statement will go to the address of both the old and new family with the transactions still combined.

The *Move Adult Children* portion of the [Data Automation](https://community.rockrms.com/documentation/bookcontent/9#dataautomation) job that ships with Rock will take care of this automatically.

If you select *Single individual*, you'll be prompted with a search box where you can type in a person's name. If more than one person is listed in the grid, click on the person you want to generate the statement for. Press Next to go to the next step.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-who-needs-a-statement-v12.png)

Who Needs a Statement

**Step 2:** Select the template you want to use for the statement output. Rock ships with a default template, which you can customize with your own logo, wording, etc. You can also create your own. The Statement Generator templates are located in Finance \> Financial Settings \> Contribution Templates.

If you select a data view, it's filters will be in addition to the configuration of the "Statement Template".

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-statement-lava-template-v12.png)

Statement Layout

**Step 3:** The *Statement Date Range* screen is where you specify the date range of the statements you want to generate. The generator defaults to the current year-to-date.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-date-range-v13.png)

Date Range

**Step 4:** The *Individual Save Settings* screen is where you can optionally choose to save statements to the person's profile under the *Documents* tab. You can control things like the name of the document, and which members of the family (technically, the Giving Group) should have the document added.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-individual-save-settings-v12.png)

Individual Save Settings

**Step 5:** The *Report Settings* screen allows you to choose the location where you want to save the statements, designate a base Filename Prefix to use when saving, and determine how the statements will be sorted. You can also choose how the statements are broken up into chapters by entering the number of statements you want to include per chapter in the Max Statements in Chapter field. These settings and others can be updated by clicking the icon, described below. You can also choose to *Save Settings* so the configuration you choose will be set up for you the next time you generate statements.

Enabling *Page Count Pre-Determination* runs each statement twice, increasing generation time and overhead. So, why use it? It helps create a cleaner, more professional statement layout, especially for multi-page statements. Pre-determining the page count allows template adjustments to ensure consistent and appealing design across pages. However, for simple, one-page statements, the benefits may be minimal and not worth the extra processing.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-report-settings-v13.png)

Report Settings

You can access the settings described below by clicking the icon shown above. How you configure these settings determines how the PDF statements will be created.

You might want more than one report. Often it can be useful to have one for mailing, sorted by zip code, and one for internal or auditing purposes, perhaps sorted by Last Name. You can create as many reports as you need, each with its own settings and sort order.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-edit-report-settings-v12.png)

Edit Report Settings

# Opt-Out/In Strategies

Rock includes a person attribute named 'Suppress Sending Contribution Statements,' which enables individuals to opt out of receiving paper statements. By default, if any member within a giving group selects 'Yes' for this attribute, the family won't receive a printed statement.

To transition to an 'opt-in' strategy, ensure that the default value for 'Suppress Sending Contribution Statements' is set to 'Yes.' In this configuration, statements will only be generated for giving groups where at least one person has chosen 'No.' If you're switching from an opt-out to an opt-in approach, consider clearing all existing attribute values. This can be accomplished using SQL queries or bulk updates.

The statement generator will start to process the statements after you press Generate Statements. When the process is complete, the generator will display a summary with the number of statements generated and related details.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/sg-process-complete-v13.png)

Process Complete

An additional file called *@Summary of Results* will be saved along with the generated statements. This file contains all of the run information pictured in the screen above.

# Display Scaling

If you notice the statement generator results are the wrong size (e.g., the font is very small) it could be related to your display's scale setting. The recommended setting is 100%. For Windows computers the Scale and Layout can be adjusted under Settings \> Display.

## Speeding up Generation

The Statement Generator typically runs quickly, but larger organizations may notice long processing times. Below are some tips to help reduce the time it takes for the process to finish.

- **Fast Disk:** The hard drive on the computer where the Statement generator is installed can have an impact on how long the process takes. We recommend an SSD (M2s) for the computer that's running the application.
- **Page Count Pre-Determination:** In Step 5 of the process described above you have an option to *Enable Page Count Pre-Determination*. The generation process will take longer if this is enabled.
- **Multiple Processors:** Having multiple processors will significantly reduce the generation time. The Statement Generator will utilize all of them.
- **Logo:** The file size of the image used for your logo has an impact on the size of the PDF files that are generated. A smaller image file, and a logo with a Base64 (inline) source will help speed up the process.
- **Broken Links:** Broken links in the template will cause performance problems. For instance, if the logo can't be loaded due to a broken link, PDF generation can take up to four times longer.

# Online Contribution Statements

Your website visitors can get access to their contributions online from the *Giving History* page. Statement links will be available for years in which they gave. The *Transaction Report* block settings allow you to pick which accounts to consider (by default all tax-deductible accounts are used). The output is all customizable using Lava, so feel free to change it.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/contribution-statement-list-v12.png)

Contribution Statement List

The resulting contribution statement is shown below. This is produced using the *Contribution Statement Generator* block.

# Legacy Configuration

The *Contribution Statement Generator* block uses the Contribution Templates described in Step 2 above to generate statements. This block is intended to replace the 'Contribution Statement Lava' blocks found on both the internal and external sites in prior versions of Rock, but it will not replace that block if you've customized the settings.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.17.0/images/contribution-statement-sample-v12.png)

Contribution Statement Sample

# Giving Outside Pledge Date Range

Contributions that occur outside of a Pledge’s date range won't count toward the Amount Given or Pledge Progress on the Contribution Statement. This could happen if someone is able to give sooner than they had planned. If the gift should count toward the Pledge on the Contribution Statement, you could adjust the Pledge’s date range to include the date of the gift.

# Contribution Statements on the Person Profile Page

You can view the same contribution statement above on the *Person Profile* page. You'll find a listing of contribution statements on the 'Contributions' tab.

![](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/contribution-statement-personprofile-v18.png)

Contribution Statement List

# Contribution Statement Templates

Rock ships with a default template that’s used by the Statement Generator to create statements. This template is also used by the web versions of the statements, like those accessed from the Person Profile page. The settings on the template drive what goes into the statement and how it looks. You can create a template of your own under Finance \> Financial Settings \> Contribution Templates to customize the statement to your needs. For instance, you’ll probably want to change the logo at a minimum.

![Contribution Statement Template](https://rockrms.blob.core.windows.net/documentation/Books/15/1.18.0/images/contribution-template-v18.png)

Contribution Statement Template

# Customize Displayed Content With Lava

Want your template content to change depending on whether it's viewed as a PDF or in a browser? Use the RenderMedium Lava merge field to control what appears based on the output format—like showing a salutation only in print or hiding links in a PDF. For example:

{% if RenderMedium == 'Html' %}
{% else %}
<table style='width: 100%; margin-left: 5mm; margin-right: 5mm;'\>
    <tr\>
        <td style="text-align:left; font-size:8px; opacity:.5"\>
            {{ Salutation }}
        </td\>
        <td style="text-align:right; font-size:8px; opacity:.5"\>
            Page <span class='pageNumber'\></span\> of <span class='totalPages'\></span\>
        </td\>
    </tr\>
</table\>
{% endif %}


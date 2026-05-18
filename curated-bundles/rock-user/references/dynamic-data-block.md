---
description: Use when users need to create custom data displays with SQL queries and Lava templates in Rock reporting
source: "https://community.rockrms.com/documentation/bookcontent/6/364"
sourceLabel: Taking Off With Reporting
---
> **Path:** Taking Off With Reporting > Dynamic Data Block

Dynamic Data Block

Most of your reporting needs can be met using Data Views and Reports. However, if you have unique requirements that can't be addressed with these tools—or if you want a more customized experience—the Dynamic Data Block provides a flexible solution. You should be able to use data views and reports to meet most of your reporting requirements. If you have a special requirement that can’t be met, or you prefer a different user experience than what reports provide, there is the Dynamic Data block.

When you add a Dynamic Data block to a page (see the [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#addingablocktoapageexternalsite) guide for details on adding blocks to pages), you have the ability to craft the display of filtered data. Let's walk through the various options of this block.

Some settings depend on whether you're using Grid or a Lava Template for *Results Formatting*. We'll start with the *Lava Template* option which covers the first six common settings.

![Dynamic Data Block with Lava Template selected](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/dynamic-data-block-v17-lava-template-v18.png)

Dynamic Data Block - Lava Template

This version of the Dynamic Data block makes it easy to tap into the power of Rock's new grid system, allowing you to create a great viewing experience when using the *Grid* Results Formatting option.

![Dynamic Data Block with Grid selected](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/dynamic-data-block-v17-grid-v18.png)

Dynamic Data Block - Grid

# Source From the Example

Below is an example like the one above.

**SQL**



SELECT 
    \[Id\]
    , \[NickName\]
    , \[LastName\]
    , \[Email\]
FROM 
    \[Person\]
WHERE
    \[BirthMonth\] = MONTH(GETDATE()) 
    AND \[BirthDay\] = DAY(GETDATE())
    AND \[RecordStatusValueId\] = 3

**Lava**


<strong\>Today's Birthdays</strong\>
<ul\>
    {% for row in rows %}
        <li\>
            <a href="/Person/{{ row.Id }}"\>
                {{ row.NickName }}
                {{ row.LastName }}
            </a\>
            <a href="/Communication?person={{ row.Id }}"\>
                <i class="ti ti-mail"\></i\>
            </a\>
        </li\>
    {% endfor %}
</ul\>

**Important!** When writing your query, it is important the \[Id\] field for the person starts with a capital 'I'. If not, links to send communications will not work.

# That Figure Is More Than an Example...

The settings for the example above will list out all the people in the database whose birthday is the current date as a bulleted list linked to send an email. Throw that on your internal homepage and go buy yourself a coffee!

Now that you're familiar with how to set up the Dynamic Data block, you might want to know about the block settings that are available.

![Dynamic Data Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/6/1.18.0/images/dynamic-data-block-settings-v18.png)

Dynamic Data Block Settings

# Extra Power from Stored Procedures

OK, we're going to geek out here for a second... By using SQL Server Stored Procedures, it can get even more powerful. When calling a stored procedure, you can pass the procedure any of the query string parameters from the URL. For instance, if the page the block is placed on is accessed from the URL:

https://<your server\>/page/123?GroupId=12

You can pass the value of the GroupId to your stored procedure as a parameter. The stored procedure can then use this value to help return relevant data (say group members for the group).

You can also pass in the current person's person Id field. This allows you to further personalize the data to the person requesting the page. Just think of all the fun you can have with this block!

In order to make this all work, you'll need to define each of the parameters you want passed to your stored procedure in the *Parameters* field discussed above. Rock will look for each of these parameters in the URL’s query string and, if found, pass in the value to the procedure. If you would like the current person’s Id to pass in, you'll likewise need to add in the parameter *CurrentPersonId*.

# Inception Time

This functionality gets truly powerful when you have dynamic data blocks calling dynamic data blocks. So, you might have one dynamic data block that lists every serving group in your database. Then it links to a different page passing the selected group id, with a dynamic data block that shows the group members. Using the Lava template option, all of this can be designed to make the pages look like custom application logic. BAM!


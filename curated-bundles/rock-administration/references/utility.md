---
description: "Use when user needs to create short links, run jobs, update datasets, execute Lava code, or run SQL queries in Rock workflows"
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation > Action Categories > Utility

# Utility

All the details for the utility category.

 # Create Short Link

Show Details

v7.0

Creates a short link for a designated page's URL.

This action will create a short link for a designated page's URL. You can set the following parameters:
- Site Id or Guid: This is where you choose which site you want to use for the short link.
- Token: This is the value appended to the site's domain to make the short link unique. If left blank, a random token will be generated. Tokens must be unique in order for the short link to function correctly.
- Target URL: This is the URL the short link will redirect users to.
- Category: Pick the category that best fits your Short Link to keep things organized.
- Is Pinned: Select this for your most-used Short Links. Pinned links appear at the top of your list.
- Attribute: This is the attribute the generated short link's URL will be associated with.
- Random Token Length: This is the number of characters to use when generating a random unique token.
- Allow Token Re-Use: If a short link already exists with the same token, selecting Yes will update the short link with the new URL. Selecting No will result in the action failing because that short link already exists.
![](https://community.rockrms.com/GetImage.ashx?Guid=3baf21f8-bd11-43ff-be59-bee3d2ead228)

 # Job Run

Show Details

v6.0

Will launch a selected job when executed.

Will launch a selected job when executed.

![](https://community.rockrms.com/GetImage.ashx?Guid=1b0a641d-9d7a-489c-9821-36953af5fb03)

 # Persisted Dataset Update

Show Details

v15.0

Updates the provided Persisted Dataset

This action will run the 'Build Script' of a Persisted Dataset and update its value through using the provided Persisted Dataset's 'Access Key'.

If you select Delay Processing Until Complete, the action will wait until the persisted dataset is done being updated. Otherwise it will trigger the update to begin then continue before it's complete.

![](https://community.rockrms.com/GetImage.ashx?Guid=a3c37874-3925-4c18-a7a3-150e978b22a2)

 # Run Lava

Show Details

v6.0

This block provides a large Lava editor for writing into an attribute.

This block provides a large Lava editor for writing into an attribute.

![](https://community.rockrms.com/GetImage.ashx?Guid=4ccbd4b7-2177-4120-9960-f17edfb9187e)

 # SQL Run

Show Details

v1.0

Know SQL? Then the world is your oyster.

The *Run SQL* action is one of the most powerful actions in Rock workflows. It allows you to execute any SQL query you provide and store the results into an attribute on the workflow. This action is great for looking up data in the database and using it to make decisions in the workflow.

![](https://community.rockrms.com/GetImage.ashx?Guid=72f86a81-b464-4265-8cd8-d26076b83f8d)  
**Additional Details**

Note that the SQL you provide can contain Lava merge fields to help pass in attribute values for your SQL. Consider this example.

Say you wanted to get the gender of the person stored in the attribute *Requester*. You could use the SQL below to achieve this.

```
DECLARE @PersonAliasGuid uniqueidentifier = '{{ Workflow | Attribute:'Requestor','RawValue' }}'
SELECT [Gender] 
FROM [Person] p
INNER JOIN [PersonAlias] pa ON pa.PersonId = p.Id
WHERE pa.[Guid] = @PersonAliasGuid
--note gender is stored in the database as a number where 0 = Unknown, 1 = Male and 2=Female
```

When the action places the result of the SQL into the configured workflow attribute, the returned result must match the data type of the attribute. For instance, your SQL can not return text if the attribute configured is expecting a number. A few common attribute types that you will use often are listed below, each with what they are expecting as input.

- **Boolean:** True/False
- **Person:** Guid of a person alias
- **Group:** Guid of a group

Note: If you *update* something directly via SQL, the cache manager won't know about it so you'll need to take care of flushing it from cache yourself.

 # Web Request

Show Details

v8.0

Need data from another website? Then this action is for you.

This action will make a `Get`, `Post`, `Put`, `Delete`, or `Patch` request to the web address you specify. You can provide any number of parameters or headers, optionally provide a username/password set of credentials, specify the request and response content type, and provide the body of the request. The action will make the request and store the response as text in the attribute you specify. ![](https://community.rockrms.com/GetImage.ashx?Guid=86aafe3c-c9fc-4eae-8470-81900baf0a23)

 # Write to Interactions

Show Details

v7.0

Write to Interactions or it didn't happen!

This activity will write a record in the interactions table for the person you specify. Interactions can be as varied as "called", "visited the website", etc. (check [the documentation](https://community.rockrms.com/documentation/BookContent/9/#interactions) for a refresher). You can write to any interaction channel (or create a new one—be careful!) and specify the Component any way you'd like. You can also provide the summary, data, and entity as appropriate to populate the interaction record. Lastly, you can specify the DateTime of the interaction, and store the created interaction for use later in your workflow. ![](https://community.rockrms.com/GetImage.ashx?Guid=8215eba5-a035-4e84-9024-bafbf57e96f7)  
**Additional Details**

In v14, in addition to a CurrentPerson lava object, there is also a new CurrentVisitor object which represents a person who is not yet known (not logged in). We just wanted to remind you about this in case you were trying do record an interaction for that 'person alias'.v14.0


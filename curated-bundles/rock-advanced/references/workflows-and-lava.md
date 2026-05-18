---
description: "Use when building Rock workflows and needing to understand attribute value storage formats, field types, and how to access raw data identifiers in Lava"
source: "https://community.rockrms.com/Lava"
sourceLabel: Lava
---
> **Path:** Lava > Misc > Workflows and Lava

Workflows and Lava goes together like peas and carrots.

## Attribute Values

There may be a time when you'd like to retrieve the data identifier for an attribute. This would be helpful in creating links to pages that would need to know which person, group, etc. you are interested in. You can retrieve the unformatted attribute value by appending a RawValue to the attribute syntax. For example, using a merge field of `{{ Workflow | Attribute:'Person','RawValue' }}` would return a person alias GUID since that is how the Person type attribute stores its value.

It's important that you understand the internal types of many of the fields you'll be using. Below is an overview of the internal type for each field provided in Rock.

## Field Types

Below is a listing of each field type available in your workflow, and how it's stored internally.

The last column indicates whether an attribute of a given type can be used to query for properties and attributes. For instance, you can use `{{ Workflow | Attribute:'PersonAttribute','FirstName' }}` since that attribute type represents a full entity. But you can't do something like  
`{{ Workflow | Attribute:'CampusesAttribute','Id' }}` since that attribute type only contains a comma-separated list of GUIDs, and no full entities.

| Field Type | Stored Value | Full Entity? |
| --- | --- | --- |
| Achievement Type | The GUID of the Achievement Type | Yes |
| Adaptive Message | The GUID of the Adaptive Message | No |
| Address | The GUID of the location associated with the address | Yes |
| Assessment Types | A comma-delimited list of assessment type GUIDs | Yes |
| AI Provider | An AI Provider's GUID | Yes |
| Asset | A string containing the properties of an asset | No |
| Asset Storage Provider | An asset storage provider's GUID | No |
| Attendance | An attendance record's GUID | Yes |
| Attribute | An attribute's GUID | No |
| Audio File | The audio file's GUID | Yes |
| Audio URL | The URL of the audio file | No |
| Background Check | - For the legacy Protect My Ministry provider, this is the GUID of the document binaryfile. - For Checkr, this is the EntityTypeId and RecordKey value, separated by a comma. - For other background check providers, this is the provider's EntityTypeId and the GUID of the document binaryfile, separated by a comma. | No |
| Badges | A comma-delimited list of badge GUIDs | No |
| Benevolence Request | A benevolence request's GUID | Yes |
| Benevolence Type | A benevolence type's GUID | Yes |
| Binary File | A binary file's GUID | Yes |
| Binary File Type | A binary file type's GUID | Yes |
| Binary File Types | A comma-delimited list of binary file type GUIDs | No |
| Block Template | If the default template is being used then the stored value is the block template's GUID followed by a bar. If a custom template is being used then the stored value is a placeholder GUID followed by a bar, with the content of the block (XAML/Lava) after the bar. | No |
| Boolean | 'True' or 'False' | No |
| Campus | A campus's GUID | Yes |
| Campuses | A comma-delimited list of campus GUIDs | No |
| Captcha | 'True' or 'False' depending on whether or not the person is verified | No |
| Categories | A comma-delimited list of category GUIDs | No |
| Categorized Defined Value | The Id of the selected Defined Value | No |
| Category | A category's GUID | Yes |
| Check List | The GUID for each selected item in the list | No |
| Checkin Configuration Type | The GUID of the Group Type for the selected Checkin Configuration Type | No |
| Code Editor | The text of the code editor | No |
| Color | The rgb string for the color, or the name of the named color | No |
| Color Selector | The hex string for the color (e.g. "#EE7725"). If multiple selection is allowed in the future, a pipe-delimited list of hex colors will be stored (e.g. "#EE7725\|#F3F3F3"). | No |
| Communication Flow | The GUID of the Communication Flow | Yes |
| Communication Preference | The value of the communication preference (e.g. "1" for email, "2" for SMS) | No |
| Communication Template | A communication template's GUID | Yes |
| Comparison | '1' for Equal To, '2' for Not Equal To, '4' for Starts With, '8' for Contains, '16' for Does Not Contain, '32' for Is Blank, '64' for Is Not Blank, '128' for Greater Than, '256' for Greater Than or Equal To, '512' for Less Than, '1024' for Less Than Or Equal To, '2048' for Ends With, '4096' for Between, or '8192' for Regular Expression | No |
| Component | The GUID of the Entity Type for the selected component | Yes |
| Components | A pipe-delimited list of Entity Type GUIDs for the selected components | No |
| Conditional Scale | The value of the provided number | No |
| Connection Activity Type | A connection activity type's GUID | Yes |
| Connection Opportunity | A connection opportunity's GUID | Yes |
| Connection Request | A connection request's GUID | Yes |
| Connection Request Activity | A connection request activity's GUID | Yes |
| Connection State | '0' for Active, '1' for Inactive, '2' for Future Follow Up, or '3' for Connected | No |
| Connection Status | A connection status's GUID | Yes |
| Connection Type | A connection type's GUID | Yes |
| Connection Types | A comma-delimited list of connection type GUIDs | No |
| Content Channel | A content channel's GUID | Yes |
| Content Channel Item | A content channel item's GUID | No |
| Content Channel Type | A content channel type's GUID | Yes |
| Content Channel Types | A comma-delimited list of content channel type GUIDs | No |
| Content Channels | A comma-delimited list of content channel GUIDs | No |
| Currency | A decimal value | No |
| Data Entry Requirement Level | '1' for Optional, '2' for Required, or '3' for Hidden | No |
| Data View | A data view's GUID | Yes |
| Data Views | A comma-delimited list of GUIDs for each selected data view | No |
| Date | The selected date formatted as 'YYYY-MM-DDTHH:MM:SS' or 'CURRENT:#' where # represents a day offset from the current day. To set this using Lava you can use the following: `{{ 'Now' \| Date:'yyyy-MM-ddTHH:mm:ss' }}` . | No |
| Date Range | Two comma-delimited dates where first date is lower value, and second date is upper value formatted as 'YYYY-MM-DDTHH:MM:SS,YYYY-MM-DDTHH:MM:SS' To set this using Lava you can use the following: `{{ 'Now' \| Date:'yyyy-MM-ddTHH:mm:ss' }}` | No |
| Date Time | The selected date formatted as 'YYYY-MM-DDTHH:MM:SS' or 'CURRENT:#' where # represents a minute offset from the current time. To set this using Lava you can use the following: `{{ 'Now' \| Date:'yyyy-MM-ddTHH:mm:ss' }}` | No |
| Day of Week | 0' for Sunday, '1' for Monday, '2' for Tuesday, '3' for Wednesday, '4' for Thursday, '5' for Friday, or '6' for Saturday | No |
| Days of Week | A comma-delimited list of Day of Week numbers (see previous) | No |
| Decimal | A decimal value | No |
| Decimal Range | Two comma-delimited decimal values where first number is lower value, and second number is upper value | No |
| Defined Type | A defined type's GUID | Yes |
| Defined Value | A comma-delimited list of defined value GUIDs (if attribute is not configured for multiple values, there should only be one GUID) | No |
| Defined Value Range | Two comma-delimited GUID values where first GUID is the lower defined value GUID, and second GUID is the upper defined value GUID | No |
| Document Type | The document type's Id. If multiple document types are selected, a comma-delimted list of document type Ids. | No |
| Device | The Device's GUID | Yes |
| Email | An email address | No |
| Email Template | The value of the textbox | No |
| Encrypted Text | The text value encrypted using Rock's Encryption.EncryptString() static helper method | No |
| Entity | A pipe-delimited GUID and integer, where the GUID is an entity type's GUID, and the integer is the Id of the selected entity | Yes |
| Entity Type | An entity type's GUID | Yes |
| Event Calendar | An event calendar's GUID | Yes |
| Event Item | An event item's GUID | Yes |
| File | The file's GUID | Yes |
| Filter Date | The value of the textbox. This field type is intended to only be used for report filters when specifying date comparisons. | No |
| Financial Account | A financial account's GUID | Yes |
| Financial Accounts | A comma-delimited list of financial account GUIDs | No |
| Financial Gateway | A financial gateway's GUID | Yes |
| Financial Transaction | The Id of the Financial Transaction | Yes |
| Financial Statement Template | A financial statement template's GUID | Yes |
| Gender | The value of a gender (e.g. Male returns "1") | No |
| Group | A group's GUID | Yes |
| Group And Role | Three pipe-delimited GUID values where first GUID is a group type's GUID, second GUID is a group's GUID, and third GUID is a group type role's GUID | No |
| Group Location Type | One of the configured group type's location type defined value's GUID | No |
| Group Member | A GroupMember Record's GUID | Yes |
| Group Member Requirement | A GroupMemberRequirement Record's GUID | Yes |
| Group Role | A group type role's GUID | Yes |
| Group Type | A group type's GUID | Yes |
| Group Type Group | Two pipe-delimited GUID values where first GUID is a group type's GUID, and second GUID is a group's GUID | No |
| Group Types | A comma-delimited list of group type GUIDs | No |
| HTML | The full HTML markup for the HTML provided | No |
| Image | The GUID of the image file | Yes |
| Integer | An integer value | No |
| Integer Range | The provided start and end values for the range, separated by a comma | No |
| Interaction Channel | An interaction channel's GUID | Yes |
| Interaction Channel Interaction Component | The GUID of the Interaction Channel and the GUID of the Interaction Component, separated by a pipe | No |
| Interaction Channels | A comma-delimited list of interaction channel GUIDs | No |
| Key Value List | A pipe-delimited list of two caret-delimited values where first is the selected key, and second is the selected value (ex: 'key1^value1\|key2^value2\|key3^value3'). If attribute is configured to use a defined type, the values should be the Ids of the selected defined values | No |
| Label | The label's GUID | Yes |
| Lava | The output/result of the provided Lava | No |
| Lava Commands | A comma-delimited list of the names of the selected Lava commands | No |
| Location | A location's GUID | Yes |
| LocationList | A location's GUID | Yes |
| Markdown | The markdown text | No |
| Matrix | A matrix's GUID | No |
| Media Element | A media element's GUID | Yes |
| Media Selector | A caret-delimited name^url value of the selected item. To get the Url using Lava, you can use the 'Url' option: `{{ ... \| Attribute:'<KEY>', 'Url' }}` | No |
| Media Watch | A number representing the percentage of the Media Element that has been watched | No |
| Memo | The value of the textbox | No |
| Merge Template | A merge template's GUID | No |
| Metric | The metric's GUID | Yes |
| Metric Categories | A comma-delimited list of two pipe-delimited GUIDs where the first GUID is a metric's GUID, and the second is a category's GUID (ex: MetricGUID1\|CategoryGUID1,MetricGUID2\|CategoryGUID2) | No |
| Metric Entity | Five pipe-delimited values where first is the metric's GUID, second is the entity's Id, third is a 'True' or 'False' indicating if metric should be gotten from page context, fourth is a 'True' or 'False' indicating if multiple values should be combined, and final value is a metric category's GUID (ex: 'MetricGuid\|EntityId\|False\|False\|CategoryGuid') | No |
| Metrics | A comma-delimited list of metric GUIDs | No |
| Mobile Navigation Action | The action Type, the Pop Count and the Page Guid. Note that this field type is not meant to be used directly in places like workflows or person attributes, and is intended for use as a block setting. | No |
| Month Day | The selected month and day, formatted as: M/d | No |
| Multi-Select | A comma-delimited list of the values (e.g. 1,2,3) of the selected items | No |
| Note Type | A note type's GUID | Yes |
| Note Types | A comma-delimited list of GUIDs for each selected type of note | No |
| Open AI Model Picker | The selected Open AI model as a text string | No |
| Page Reference | Value is in format 'Page.Guid,PageRoute.Guid' but only 'Page.Guid' is required. | No |
| Persisted Dataset | The persisted dataset's GUID | No |
| Person | A person alias GUID | Yes |
| Person Badges | A comma-delimited list of person badge GUIDs | No |
| Phone Number | A formatted phone number | No |
| Prayer Request | A prayer request's GUID | No |
| Range Slider | The integer value of the selected number | No |
| Rating | The integer value of the selected rating (e.g. four stars is stored as "4") | No |
| Registration Instance | The registration instance's GUID | No |
| Registration Template | A registration template's GUID | No |
| Registration Templates | A comma-delimited list of registration template GUIDs | No |
| Registry Entry | The values for the volume, page and line of the registry entry, separated by commas (e.g. "2,39,7") | No |
| Reminder Type | The GUID of the Reminder Type | Yes |
| Reminder Types | A comma-delimited list of the GUIDs of the Reminder Types | No |
| Remote Auths | A pipe-delimited list of entity type GUIDs (entity types should only be active authentication components that require remote authentication) | No |
| Report | A report's GUID | Yes |
| Schedule | A schedule's GUID | Yes |
| Schedules | A comma-delimited list of schedule GUIDs | No |
| ScheduleBuilder | A schedule's GUID | \- |
| Secondary Auths | A list of authentication method (e.g., Passwordless Authentication) GUIDs | No |
| Security Role | A security role (group) GUID | Yes |
| Sequence | The value of the textbox | No |
| Signature Document Template | A signature document template's GUID | Yes |
| Single-Select | The value (e.g. "1") of the selected item | No |
| Site | A site's Id | Yes |
| Sliding Date Range | Five pipe-delimited values where first value is the mode ('All', 'Last', 'Current', 'DateRange', 'Previous', 'Next', or 'Upcoming'), second value is number of time units (may be blank depending on mode), third value is the time units ('Hour', 'Day', 'Week', 'Month', or 'Year'), fourth value is start date if mode is Date Range, fifth value is end data if mode is Date Range (ex: 'DateRange\|\|\|5/22/2016 12:00:00 AM\|5/24/2016 12:00:00 AM' or 'Previous\|3\|Week\|\|' ) | No |
| Social Media Account | The URL or text string provided for the social media account | No |
| SSN | A string representing the encrypted value of a social security number | No |
| Step | A step's GUID | Yes |
| Step Program | A step program's GUID | Yes |
| Step Program Step Status | A step program's GUID and a step status GUID, pipe-delimited | No |
| Step Program Step Type | A step program's GUID and a step type's GUID, pipe-delimited | No |
| Streak Type | A streak type's GUID | Yes |
| Structure Content Editor | Code representing the contents of the editor | No |
| System Communication | A system communication's GUID | No |
| System Phone Number | A system phone number's GUID | Yes |
| Text | The value of the textbox | No |
| Time | A timespan value formatted as 'd.hh:mm:ss.fff' | No |
| Time Zone | The worded description of a time zone (e.g. "US Mountain Standard Time") | No |
| Url Link | The text of the Url | No |
| Value Filter | A string representing the expression type and filter conditions | No |
| Value List | A pipe-delimited list of values (ex: 'value1\|value2\|value3'). If attribute is configured to use a defined type, the values should be the ID of the selected defined values | No |
| Video File | A video file's GUID | Yes |
| Video Url | A video file's URL, or a text string provided | No |
| Workflow | A workflow's GUID | Yes |
| Workflow Activity | A workflow activity type's GUID | Yes |
| Workflow Attribute | The key of the selected attribute | Yes |
| Workflow Text Or Attribute | The contents of Text field or the GUID of selected attribute | No |
| Workflow Type | A workflow type's GUID | Yes |
| Workflow Types | A comma-delimited list of workflow type GUIDs | No |


---

## About Lava Fluid {#about-lava-fluid}

> **Path:** Lava > Misc > About Lava Fluid

## A New Engine Under the Hood

Rock v13 introduces a new Lava engine called Fluid. What does that mean? It means the way your Lava is processed behind the scenes will be changing. We’re making this change because the new Fluid engine is faster than the old DotLiquid engine, and because the change to Fluid sets up Rock to move to the new .NET Core framework more easily. Generally you shouldn’t notice a big difference, but there are a few things you should know about the transition.

First, keep in mind that the old DotLiquid engine will go away entirely in the future. Everyone running Rock will eventually need to be using the new Fluid engine. Instructions for transitioning are provided below.

Also, while most of your Lava will work the same as it always has, there are a few specific changes to look out for. We have those [documented here](https://community.rockrms.com/lava/fluid/differences). You’ll also want to check out this [RX presentation](https://community.rockrms.com/subscriptions/rx2021/lava-20-transition-to-the-fluid-engine) which talks more about the transition to Fluid and the changes you’ll see.

## Transitioning Rock to Fluid

In your Rock instance you’ll find a Global Attribute (Admin Tools \> General Settings \> Global Attributes) named “Lava Engine Liquid Framework”. When you first install v13 this attribute will be blank, which means Rock is running the old DotLiquid engine. You'll have the following options for setting this value.

1. **DotLiquid**: This is the old engine that Rock has been using historically.
2. **Fluid**: This is the new engine you’ll eventually transition to.
3. **DotLiquid (with Fluid verification)**: This will run your Lava twice (once for each engine) and record any problems as Exceptions.

To start, you’ll want to select the **DotLiquid (with Fluid verification)** option. You’ll need to restart Rock for the change to take effect, so you might wait for a period of low activity to do this. Once Fluid verification is in place, any Lava that you run will be processed twice. First it will run through the DotLiquid engine, then through the Fluid engine. If the output isn’t the same or if there are any errors an Exception will be recorded in your Exception List (Admin Tools \> System Settings \> Exception List). This Exception indicates that the Lava you’re using is not compatible with Fluid and will need to be updated.

#### Running Lava Twice

Remember that using Fluid verification will cause all Lava to be run twice. So, any updates your Lava performs, including SQL updates, will be performed twice. This could cause problems or confusion if, for instance, the Lava you’re running is in a Workflow that updates a counter. You might need to consider the implications for any updates you might be doing in your Lava, because you might not have been expecting it to run twice.

You’ll want to keep Rock running in Fluid verification mode for a little while, perhaps a week or two, until you no longer get Exceptions and you’re confident all of your Lava is ready for Fluid. At that point you’re ready to set the “Lava Engine Liquid Framework” Global Attribute value to **Fluid** and restart Rock.

If you find you’re running into problems you can always change it back to **DotLiquid (with Fluid verification)** and check your Exception List to see where the issue is. Of course if you’ve found a bug it can be reported in [GitHub](https://github.com/SparkDevNetwork/Rock/issues).

Lastly, if you’re the developer of a custom plugin you’ll want to make sure it’s v13 and Fluid compatible. For details on the changes you’ll need, check out [this page](https://community.rockrms.com/page/2305).


---

## Lava With Obsidian {#lava-with-obsidian}

> **Path:** Lava > Misc > Lava With Obsidian

![](https://community.rockrms.com/Content/RockExternal/Lava/obsidian.svg)

# Lava With Obsidian

There are a handful of Lava filters that attempt to modify the HTTP response data directly, such as adding Meta tags or performing redirects. These types of actions are often not supported by Obsidian blocks. The reason for this lies in how Obsidian can gain so much performance over legacy blocks. Since the entire page is not reloaded when an action is performed in Obsidian, the page response has already been sent. As such, there is no page to perform the Redirect on and no header section to insert new Meta tags into. Some of these operations may be supported in the future, though for some it may not be possible to add support.


---
description: "Use when developer needs to follow naming conventions for Rock CMS projects, blocks, tables, stored procedures, attributes, and other code components"
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Here are some rules to follow so your stuff doesn't collide with other's stuff. We've decided to standardize on using your organizations's domain name as the main naming prefix. Keep reading, you'll see what we mean below.

## Quick Reference

Important

In all cases below the "domain" (reversed.domain, etc.) MUST be lowercase.

| Item | Rule | Example |
| --- | --- | --- |
| Project Naming | <reversed.domain\>.<Project Name\> | org.mychurch.MyProjectName (domain is always lowercase) |
| Tables | \_<reversed\_domain\>\_<project\>\_<tablename\> | \_org\_mychurch\_MyProjectName\_Book |
| Stored Procedures | \_<reversed\_domain\>\_sp<project and/or component\> | \_org\_mychurch\_spWidgetGet |
| User Functions | \_<reversed\_domain\>\_unf<project and/or component\> | \_org\_mychurch\_unfWidgetCalc |
| Action Categorization | <Organization Name\>: <category name\> | \[Category( "My Church: MyActionCategory" )\] or include a locality/identifier if your organization's name is common\[Category( "My Church (AZ): MyActionCategory" )\] |
| Lava Shortcodes | <reversed\_domain\>\_<shortcode tag-name\> | {\[ org\_mychurch\_supermap ... \]} |
| Block Categorization | <Organization Name\> \> <category name\> | \[Category( "My Church \> My Category" )\] or include a locality/identifier if your organization's name is common\[Category( "My Church (AZ) \> My Category" )\] |
| Block Location | RockWeb/Plugins/<reversed\_domain\>/<project\>/ | RockWeb/Plugins/org\_mychurch/MyProject/ |
| Block Namespace | RockWeb.Plugins.<reversed\_domain\>.<project\> | RockWeb.Plugins.org\_mychurch.MyProjectName |
| Class Namespace | <reversed.domain\>.<project\> | org.mychurch.MyProjectName |
| Assemblies | <reversed.domain\>.<project\>.dll | org.mychurch.MyProjectName.dll |
| API path | api/<reversed.domain\>/ | api/org.mychurch/ |
| API v2 path | api/v2/plugins/<reversed.domain\>/<project\>/api/v2/plugins/<reversed.domain\>/<project\>/controls/api/v2/plugins/<reversed.domain\>/<project\>/models/ | api/v2/org.mychurch/myplugin/api/v2/org.mychurch/myplugin/controls/api/v2/org.mychurch/myplugin/models/ |
| Attribute "Key" names (except Block Attributes) | <reversed\_domain\>\_<variable\> | org\_mychurch\_AmazingWidgetFoo |
| Private Class Property | \_<property\> | \_fooId |
| Querystring Parameters | use field/property case (Pascal Case) | GroupId |
| Webhook filename | \_<reversed\_domain\>\_... or <org initials\>\_... (again, to prevent collisions with other plugin developers) | \_org\_mychurch\_Mailgun.ashx or mc\_Mailgun.ashx |
| Or Webhook folder | Webhooks/<reversed\_domain\>/Mailgun.ashx | Webhooks/org\_mychurch/Mailgun.ashx |

Note

The domain name is always in lowercase.For blocks, block location, attributes, and sql stuff, the reversed domain uses an underscore (\_) instead of a dot. This is intentional to help prevent namespace resolution conflicts. Also, using a dot can be problematic when used in Lava.

Important

To avoid collisions with admin created attributes, the Rock core team will prefix attribute's attribute \[Key\] with "core\_". Example: `core_LastSendDate`

## SQL: Custom Tables, Stored Procedures, User Functions

Custom tables should be **prefixed with an underscore** followed by your reversed, lowercase domain name, then your ProjectName -- replacing all dots with underscores.

## Custom Namespaces, Classes & Assemblies

Prefix your namespaces/classes & assemblies with your reversed, lowercase domain name, then your ProjectName.

```
namespace org.rocksolidchurch.MyProjectName
{
    public class Book
    {
        public int Id { get; set; }
        // ...
```

Private class properties should be **prefixed with an underscore** as illustrated here.

```
#region Fields

private int? _fooId;
private Note _note;

#endregion
```

## Custom API

When developing custom API extensions, you must use a folder convention `api/<com.domain>/` (such as `api/org.rocksolidchurch/`) to avoid collisions with other custom developer APIs.

## Standard Control Variable Naming

If you really want to make the core team happy, you can follow these naming conventions on your entity property/fields:

| Control Type | Prefix | Example |
| --- | --- | --- |
| AccountPicker | acctp |  |
| AutoCompleteDropDown | ac | acPersonSelect |
| AttributeEditor | edt | edtGroupMemberAttributes |
| Badge | badge | badgeNotice |
| BinaryFilePicker | bfp |  |
| BinaryFileTypePicker | bftp |  |
| BirthdayPicker | bdayp |  |
| BootstrapButton | bbtn | bbtnSearch |
| Button | btn | btnSendLogin |
| ButtonDropDownList | bddl |  |
| CampusesPicker | mcamp |  |
| CampusPicker | camp |  |
| CategoryPicker | catp | catpCategory |
| CheckBox | cb | cbUnlisted |
| CheckBoxList | cbl |  |
| CodeEditor | ce |  |
| CompareValidator | coval |  |
| ComponentPicker | comp |  |
| ConfirmPageUnload | conpu |  |
| CustomValidator | cval |  |
| DataDropDownList | ddl | ddlDataView |
| DataPager | dpgr |  |
| DataTextBox | dtb | dtbDescription |
| DatePicker | dp | dpAnniversaryDate |
| DateRangePicker | drp |  |
| DateTimePicker | dtp | dtpFutureSendAt |
| DropDownList | ddl |  |
| EntityTypePicker | etp |  |
| FieldTypeList | ftl |  |
| FileUpload | fup |  |
| FileUploader | fupr |  |
| GeoPicker | geop |  |
| Grid | g | gMembers |
| GridFilter | gf | gfSettings |
| GroupPicker | gp |  |
| GroupRolePicker | grp |  |
| GroupTypePicker | gtp |  |
| HelpBlock | hb |  |
| HiddenField | hf | hfValue |
| HighlightLabel | hlbl | hlblUrgent |
| HtmlEditor | html |  |
| HyperLink | hl |  |
| Image | img |  |
| ImageButton | imb |  |
| ImageUploader | imgup | imgupPhoto |
| Label | lbl | lblApprovedByPerson |
| LinkButton | btn | btnLoginLogout |
| ListView | lv |  |
| Literal | l | lPostText |
| LocationItemPicker | locip |  |
| LocationPicker | locp |  |
| MergeFieldPicker | mfp |  |
| ModalAlert | ma | maDeleteWarning |
| ModalDialog | md | mdPreview |
| ModalPopupExtender | mpe |  |
| MonthDayPicker | mdp |  |
| MonthYearPicker | myp |  |
| NewFamilyMembers | nfm | nfmMembers |
| NoteContainer | note | noteComments |
| NotificationBox | nb | nbError |
| NumberBox | numb |  |
| NumberRangeEditor | nre |  |
| PagePicker | pagep | pagepRedirectTo |
| Panel | pnl | pnlValue |
| PanelWidget | pnlw | pnlwDisplay |
| PersonPicker | pp | ppGroupMemberPerson |
| PersonProfileBadgeList | badgel |  |
| PlaceHolder | ph | phSuccess |
| PostBackTrigger | trgr |  |
| RadioButtonList | rbl |  |
| Repeater | rpt | rptCompletedPledges |
| RockBulletedList | blst |  |
| RockCheckBox | cb | cbValue |
| RockCheckBoxList | cbl |  |
| RockControlWrapper | wrap |  |
| RockDropDownList | ddl | ddlGender |
| RockLiteral | l |  |
| RockRadioButtonList | rbl | rblStatus |
| RockTextBox | tb | tbEmail |
| ScheduleBuilder | schedb |  |
| SecurityButton | sbtn |  |
| SlidingDateRangePicker | sdrp | sdrpFeeDateRange |
| StateDropDownList | statep |  |
| Table | tbl |  |
| TagList | tagl |  |
| TermDescription | termd | termdTransactionCode |
| TextBox | tb | tbNewNote |
| TimePicker | timep | timepStartTime |
| Toggle | tgl |  |
| UpdatePanel | upnl | upnlSettings |
| ValidationSummary | val | valSummaryTop |
| Xml | xml | xmlContent |

Note

Items shown in bold are the most frequently used controls.

We'd also recommend these naming conventions on your entity property/fields:

| Data | Field Name Convention | SQL Datatype | C# Datatype | Note |
| --- | --- | --- | --- | --- |
| Name | Name | nvarchar(100) | string | Grids, Unique, Not Null, Not Empty |
| Description | Description | nvarchar(max) | string | NoGrid, NotUnique, Optional |
| Date "Key" | ..DateKey | int | int | This is *essentially* a FK to the AnalyticsSourceDate.DateKey (yyyymmdd) table/column for additional date analytics (useful for cases like 'select only Sunday dates'). |
| Date/Time | ..DateTime | DateTime | DateTime |  |
| Date | ..Date | DateTime | DateTime |  |
| Time | ..Time | DateTime | DateTime |  |
| Url | ..Url | nvarchar(2000) | string | [http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url](http://stackoverflow.com/questions/417142/what-is-the-maximum-length-of-a-url) |
| Birthdate - Month | BirthMonth | int | int |  |
| Birthdate - Day | BirthDay | int | int |  |
| Birthdate - Year | BirthYear | int | int | optional, null means not disclosed |
| email | ..Email | nvarchar(254) | string | [http://stackoverflow.com/questions/386294/maximum-length-of-a-valid-email-address](http://stackoverflow.com/questions/386294/maximum-length-of-a-valid-email-address) |
| boolean | Is.. (unless obvious) | bit | bool | 0 = false, 1 = true (try to avoid double negatives, for example "NotEnabled") |
| First,Middle,Last name | ..Name | nvarchar(50) | string |  |
| FullName | ..FullName | nvarchar(152) |  |  |
| Guid | Guid | uniqueidentifier | Guid | Unique, Not Displayed, Not Null, Not Empty, Required Column for Rock Tables |
| Duration (OBSOLETED) | ..Duration | int | int | a field that implies a number of seconds or minutes of something |
| Duration (as of v11) | ..Duration{UnitOfTime} | int, decimal (18,2) or float | int, decimal or double | where {UnitOfTime} is Seconds, Milliseconds, Days, Hours, Weeks, etc. |
| Path/FileName | ..Path/Filename | nvarchar(260) | string | [http://msdn.microsoft.com/en-us/library/aa365247.aspx](http://msdn.microsoft.com/en-us/library/aa365247.aspx) |
| Order | ..Order | int | int |  |
| Currency | ..Amount | decimal (18,2) | decimal | US Dollar Only |
| Percent |  |  |  | TBD 100%, 1 or 100. 100 reads better |
| Password | Password | nvarchar(128) | string |  |
| Html | ..Html | nvarchar(max) | string |  |
| PhoneNumber | PhoneNumber | nvarchar(20) | string | store unformatted, no spaces, no dashes, no parentheses |
| PhoneNumberExtension | \[PhoneNumber\]Extension | nvarchar(20) | string | store unformatted, no spaces, no dashes, no parentheses |
| PrimaryKey | Id | int | int |  |
| ForeignKey | \[optional\]+<ParentTableName\>+Id | int | int | ex. see Note's NoteTypeId |
| DefinedValue Foreign Key | <DefinedType.Name\>+ValueId |  |  | a ref to a DefinedValue of a DefinedType |
| BinaryFile Foreign Key | \[optional\]+BinaryFileId or \[optional\]+FileId |  |  | ex. Page's IconBinaryFileId |

## Utility Class Naming Conventions

Lastly, here are a few conventions for any UI controls you might create:

| Class Name Convention | Description | Example |
| --- | --- | --- |
| ..Picker | users selecting and picking an item | CampusPicker |
| ..Uploader | editor control for selecting or uploading | ImageUploader |
| ..List | used for simple list/grid-like controls | ButtonDropDownList |

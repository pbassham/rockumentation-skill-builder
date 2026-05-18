---
description: "Use when developer needs to simplify data migration code using Rock's helper methods for adding/updating blocks, pages, attributes, groups, and defined types"
source: "https://community.rockrms.com/developer/202\u002D\u002D\u002Dignition"
sourceLabel: 202 — Ignition
---
> **Path:** 

Creating data migrations can be a bit of a chore, but we created some migration helper methods to give you super powers. These methods will help you to add/register new blocks, add pages, add blocks to pages, add groups, add defined types, etc. So instead of writing something like this:

```
Sql( string.Format( @"     
DECLARE @FieldTypeId int
SET @FieldTypeId = (SELECT [Id] FROM [FieldType] WHERE [Guid] = '{1}')
DELETE [Attribute] 
WHERE [EntityTypeId] IS NULL
AND [Key] = '{2}'
AND [EntityTypeQualifierColumn] = '{8}'
AND [EntityTypeQualifierValue] = '{9}'
INSERT INTO [Attribute] ( 
    [IsSystem],[FieldTypeId],[EntityTypeId],
    [EntityTypeQualifierColumn],[EntityTypeQualifierValue],
    [Key],[Name],[Description],
    [Order],[IsGridColumn],[DefaultValue],[IsMultiValue],
    [IsRequired],[Guid])
VALUES(
    1, @FieldTypeId, NULL,
    '{8}', '{9}',
    '{2}', '{3}', '{4}',
    {5}, 0, '{6}', 0, 
    0, '{7}')
    ",
    "",
    "C28C7BF3-A552-4D77-9408-DEDCF760CED0",
    "Safe Sender Domains".Replace( " ", string.Empty ),
    "Safe Sender Domains",
    "Delimited list of domains that can be used to send emails. It's simple.".Replace( "'", "''" ),
    0,
    "",
    "CDD29C51-5D33-435F-96AB-2C06BA772F88",
    "",
    "")
);
```

You can just write it like this:

```
RockMigrationHelper.AddGlobalAttribute( "C28C7BF3-A552-4D77-9408-DEDCF760CED0", "", "", "Safe Sender Domains", "Delimited list of domains that can be used to send emails. It's simple.", 0, "", "CDD29C51-5D33-435F-96AB-2C06BA772F88" );
```

## Helper Method Reference

We've listed all the helper methods for you by entity type for your review.

**ActionTypeAttributeValue**

| Helper Method | Description |
| --- | --- |
| AddActionTypeAttributeValue( string actionTypeGuid, string attributeGuid, string value ) | Adds the action type attribute value. |

**ActionTypePersonAttributeValue**

| Helper Method | Description |
| --- | --- |
| AddActionTypePersonAttributeValue( string actionTypeGuid, string attributeGuid, string value ) | Adds an action type person attribute value. Person values default to the first alias in the target DB (likely Admin, Admin). |

**Attribute**

| Helper Method | Description |
| --- | --- |
| DeleteAttribute( string guid ) | Deletes the attribute. |

**AttributeQualifier**

| Helper Method | Description |
| --- | --- |
| AddAttributeQualifier( string attributeGuid, string key, string value, string guid ) | Adds the attribute qualifier. |

**AttributeValue**

| Helper Method | Description |
| --- | --- |
| AddAttributeValue( string attributeGuid, int entityId, string value, string guid ) | Adds a new attribute value if it does not exist. |

**BinaryFileType**

| Helper Method | Description |
| --- | --- |
| UpdateBinaryFileType( string storageEntityTypeId, string name, string description, string iconCssClass, string guid, bool allowCaching, bool requiresViewSecurity ) | Updates the binary file type. |

**Block**

| Helper Method | Description |
| --- | --- |
| AddBlock( string pageGuid, string layoutGuid, string blockTypeGuid, string name, string zone, string preHtml, string postHtml, int order, string guid ) | Adds a Block. Inserts admin auth if only layout is used. |
| DeleteBlock( string guid ) | Deletes the block and its auth records. |

**BlockAttribute**

| Helper Method | Description |
| --- | --- |
| DeleteBlockAttribute( string guid ) | Deletes the block attribute. |

**BlockAttributeValue**

| Helper Method | Description |
| --- | --- |
| AddBlockAttributeValue( string blockGuid, string attributeGuid, string value, bool appendToExisting ) | Adds or overwrites the block attribute value. |
| DeleteBlockAttributeValue( string blockGuid, string attributeGuid ) | Deletes the attribute value. |

**BlockType**

| Helper Method | Description |
| --- | --- |
| AddBlockType( string name, string description, string path, string category, string guid ) | Adds a new block type. |
| UpdateBlockType( string name, string description, string path, string category, string guid ) | Updates or inserts the block type. |
| DeleteBlockType( string guid ) | Deletes the block type. |

**BlockTypeAttribute**

| Helper Method | Description |
| --- | --- |
| AddBlockTypeAttribute( string blockTypeGuid, string fieldTypeGuid, string name, string key, string category, string description, int order, string defaultValue, string guid, bool isRequired ) | Adds a block type attribute. |
| UpdateBlockTypeAttribute( string blockTypeGuid, string fieldTypeGuid, string name, string key, string category, string description, int order, string defaultValue, string guid ) | Updates or inserts the block type attribute. |

**Category**

| Helper Method | Description |
| --- | --- |
| UpdateCategory( string entityTypeGuid, string name, string iconCssClass, string description, string guid, int order ) | Updates the category. |
| DeleteCategory( string guid ) | Deletes the category. |

**DefinedType**

| Helper Method | Description |
| --- | --- |
| AddDefinedType( string category, string name, string description, string guid, string helpText ) | Adds a defined type. |
| DeleteDefinedType( string guid ) | Deletes the defined type. |

**DefinedTypeAttribute**

| Helper Method | Description |
| --- | --- |
| AddDefinedTypeAttribute( string definedTypeGuid, string fieldTypeGuid, string name, string key, string description, int order, string defaultValue, string guid ) | Adds the defined type attribute. |

**DefinedValue**

| Helper Method | Description |
| --- | --- |
| AddDefinedValue( string definedTypeGuid, string value, string description, string guid, bool isSystem ) | Adds a defined value. |
| UpdateDefinedValue( string definedTypeGuid, string value, string description, string guid, bool isSystem ) | Updates or adds the value. |
| DeleteDefinedValue( string guid ) | Deletes the value. |

**DefinedValueAttributeValue**

| Helper Method | Description |
| --- | --- |
| AddDefinedValueAttributeValue( string definedValueGuid, string attributeGuid, string value ) | Adds a defined value attribute. |
| UpdateDefinedValueAttributeValue( string definedValueGuid, string attributeGuid, string value ) | Updates a defined value attribute. |

**DefinedValueAttributeValueByValue**

| Helper Method | Description |
| --- | --- |
| AddDefinedValueAttributeValueByValue( string definedTypeGuid, string definedValueValue, string attributeKey, string value ) | Adds an attribute value by defined value name. |

**DefinedValueByValue**

| Helper Method | Description |
| --- | --- |
| UpdateDefinedValueByValue( string definedTypeGuid, string value, string description, int order, bool isSystem ) | Updates a defined value by name. |

**EntityAttribute**

| Helper Method | Description |
| --- | --- |
| AddEntityAttribute( string entityTypeName, string fieldTypeGuid, string entityTypeQualifierColumn, string entityTypeQualifierValue, string name, string category, string description, int order, string defaultValue, string guid ) | Adds a new EntityType Attribute for the given EntityType, FieldType, and name (key). |
| UpdateEntityAttribute( string entityTypeName, string fieldTypeGuid, string entityTypeQualifierColumn, string entityTypeQualifierValue, string name, string description, int order, string defaultValue, string guid ) | Updates the Entity Attribute for the given EntityType, FieldType, and name (key); inserts if not present. |

**EntityType**

| Helper Method | Description |
| --- | --- |
| UpdateEntityType( string name, string guid, bool isEntity, bool isSecured ) | Updates or inserts the EntityType. |
| DeleteEntityType( string guid ) | Deletes the EntityType. |

**EntityTypeMultiValueFieldType**

| Helper Method | Description |
| --- | --- |
| UpdateEntityTypeMultiValueFieldType( string entityTypeName, string fieldTypeGuid ) | Updates the EntityType MultiValueFieldType. |

**EntityTypeSingleValueFieldType**

| Helper Method | Description |
| --- | --- |
| UpdateEntityTypeSingleValueFieldType( string entityTypeName, string fieldTypeGuid ) | Updates the EntityType SingleValueFieldType. |

**FieldType**

| Helper Method | Description |
| --- | --- |
| UpdateFieldType( string name, string description, string assembly, string className, string guid, bool isSystem ) | Updates or inserts the FieldType. |
| DeleteFieldType( string guid ) | Deletes the FieldType. |

**GlobalAttribute**

| Helper Method | Description |
| --- | --- |
| AddGlobalAttribute( string fieldTypeGuid, string entityTypeQualifierColumn, string entityTypeQualifierValue, string name, string description, int order, string defaultValue, string guid ) | Adds a global Attribute and deletes an existing one if present. |

**Group**

| Helper Method | Description |
| --- | --- |
| DeleteGroup( string guid, bool orphanAnyChildren ) | Deletes the group. |

**GroupMemberAttributeDefinedValue**

| Helper Method | Description |
| --- | --- |
| AddGroupMemberAttributeDefinedValue( string groupTypeGuid, string fieldTypeGuid, string attributeName, string attributeKey, string categoryGuid, string defaultValue, string guid ) | Adds or updates a group member Attribute constrained by a defined type. |
| UpdateGroupMemberAttributeDefinedValue( string groupTypeGuid, string fieldTypeGuid, string attributeName, string attributeKey, string categoryGuid, string defaultValue, string guid ) | Adds or updates a group member Attribute constrained by a defined type. |

**GroupType**

| Helper Method | Description |
| --- | --- |
| DeleteGroupType( string guid ) | Deletes the GroupType. |

**GroupTypeGroupAttribute**

| Helper Method | Description |
| --- | --- |
| AddGroupTypeGroupAttribute( string groupTypeGuid, string fieldTypeGuid, string name, string key, string categoryGuid, string description, int order, string defaultValue, string guid ) | Adds a Group Attribute for the given GroupType. |

**GroupTypeRole**

| Helper Method | Description |
| --- | --- |
| AddGroupTypeRole( string groupTypeGuid, string name, bool isLeader, bool canView, bool canEdit, int order, string guid ) | Adds or updates a GroupTypeRole. May set it as default. |
| UpdateGroupTypeRole( string groupTypeGuid, string name, bool isLeader, bool canView, bool canEdit, int order, string guid ) | Adds or updates a GroupTypeRole. May set it as default. |
| DeleteGroupTypeRole( string guid ) | Deletes the GroupTypeRole. |

**HtmlContentBlock**

| Helper Method | Description |
| --- | --- |
| UpdateHtmlContentBlock( string blockGuid, string htmlContent, string guid ) | Adds or updates HTML content for an HTML Content Block. |

**Layout**

| Helper Method | Description |
| --- | --- |
| AddLayout( string siteGuid, string fileName, string name, string description, string guid ) | Adds a new Layout to the given site. |
| DeleteLayout( string guid ) | Deletes the Layout. |

**Page**

| Helper Method | Description |
| --- | --- |
| AddPage( string parentPageGuid, string layoutGuid, string siteGuid, string pageTitle, string internalName, string browserTitle, string pageIcon, string pageDisplayDescription, string pageDisplayTitle, string pageDisplayBreadCrumb, string pageRequiresEncryption, string pageEnableViewState, string pageMenuDisplayDescription, string pageMenuDisplayIcon, string pageMenuDisplayChildPages, string order, string outputCacheDuration, string pageHeaderContent, string pageFooterContent, string guid ) | Adds a new Page as the last child under a parent. |
| MovePage( string pageGuid, string parentPageGuid ) | Moves the Page to a new parent. |
| DeletePage( string guid ) | Deletes the Page and associated views. |

**PageContext**

| Helper Method | Description |
| --- | --- |
| AddPageContext( string pageGuid, string entity, string idParameter, string guid ) | Adds PageContext. |
| UpdatePageContext( string pageGuid, string entity, string idParameter, string guid ) | Adds or updates PageContext. |
| DeletePageContext( string guid ) | Deletes the PageContext. |

**PageRoute**

| Helper Method | Description |
| --- | --- |
| AddPageRoute( string pageGuid, string route ) | Adds a PageRoute if the route does not already exist. |

**PersonAttribute**

| Helper Method | Description |
| --- | --- |
| UpdatePersonAttribute( string fieldTypeGuid, string entityTypeQualifierColumn, string entityTypeQualifierValue, string name, string key, string category, string description, int order, string defaultValue, string guid ) | Updates or inserts the BlockType Attribute. |

**PersonAttributeCategory**

| Helper Method | Description |
| --- | --- |
| UpdatePersonAttributeCategory( string attributeGuid, string categoryGuid ) | Updates the person attribute category. |

**PersonBadge**

| Helper Method | Description |
| --- | --- |
| UpdatePersonBadge( string name, string description, string entityTypeGuid, string guid ) | Updates or inserts the PersonBadge. |

**PersonBadgeAttribute**

| Helper Method | Description |
| --- | --- |
| AddPersonBadgeAttribute( string badgeGuid, string fieldTypeGuid, string name, string key, string category, string description, int order, string defaultValue, string guid ) | Adds (or replaces) the person badge attribute. |

**PersonBadgeAttributeValue**

| Helper Method | Description |
| --- | --- |
| AddPersonBadgeAttributeValue( string badgeGuid, string attributeKey, string value ) | Adds or updates the badge attribute value. |

**Report**

| Helper Method | Description |
| --- | --- |
| AddReport( string entityTypeGuid, string name, string description, string categoryGuid, string transformedEntityTypeGuid, string dataViewGuid, string guid ) | Adds a report. |
| DeleteReport( string guid ) | Deletes the report. |

**ReportField**

| Helper Method | Description |
| --- | --- |
| DeleteReportField( string guid ) | Deletes a report field. |

**RestAction**

| Helper Method | Description |
| --- | --- |
| AddRestAction( string controllerName, string controllerClass, string actionMethod, string actionPath ) | Adds the rest action. |

**RestController**

| Helper Method | Description |
| --- | --- |
| AddRestController( string controllerName, string controllerClass ) | Adds the rest controller. |

**SecurityAuth**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuth( string entityTypeName, string action, string groupGuid, string authGuid ) | Adds the security auth record for the given entity type and group. |
| DeleteSecurityAuth( string guid ) | Deletes the security auth record. |

**SecurityAuthForAttribute**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForAttribute( string attributeGuid, int order, string action, bool allow, string groupGuid, int specialRole, string authGuid ) | Adds the attribute security authentication. Set GroupGuid to null when setting to a special role. |
| DeleteSecurityAuthForAttribute( string attributeGuid ) | Deletes the security authentication for the attribute. |

**SecurityAuthForBinaryFileType**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForBinaryFileType( string binaryFileTypeGuid, int order, string action, bool allow, string groupGuid, Rock.Model.SpecialRole specialRole, string authGuid ) | Adds the BinaryFileType security authentication. Set GroupGuid to null when setting to a special role. |

**SecurityAuthForBlock**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForBlock( string blockGuid, int order, string action, bool allow, string groupGuid, Rock.Model.SpecialRole specialRole, string authGuid ) | Adds the block security authentication. Set GroupGuid to null when setting to a special role. |
| DeleteSecurityAuthForBlock( string blockGuid ) | Deletes the security authentication for the block. |

**SecurityAuthForCategory**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForCategory( string categoryGuid, int order, string action, bool allow, string groupGuid, int specialRole, string authGuid ) | Adds the category security authentication. Set GroupGuid to null when setting to a special role. |
| DeleteSecurityAuthForCategory( string categoryGuid ) | Deletes the security authentication for the category. |

**SecurityAuthForEntityType**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForEntityType( string entityTypeName, int order, string action, bool allow, string groupGuid, int specialRole, string authGuid ) | Adds the security auth record for the given EntityType and group. |

**SecurityAuthForGroupType**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForGroupType( string groupTypeGuid, int order, string action, bool allow, string groupGuid, Rock.Model.SpecialRole specialRole, string authGuid ) | Adds the GroupType security authentication. Set GroupGuid to null when setting to a special role. |
| DeleteSecurityAuthForGroupType( string groupTypeGuid ) | Deletes the security authentication for the GroupType. |

**SecurityAuthForPage**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForPage( string pageGuid, int order, string action, bool allow, string groupGuid, int specialRole, string authGuid ) | Adds the page security authentication. Set GroupGuid to null when setting to a special role. |
| DeleteSecurityAuthForPage( string pageGuid ) | Deletes the security authentication for the page. |

**SecurityAuthForRestAction**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForRestAction( string restActionMethod, string restActionPath, int order, string action, bool allow, string groupGuid, Rock.Model.SpecialRole specialRole, string authGuid ) | Adds the security authentication for the REST action. |

**SecurityAuthForRestController**

| Helper Method | Description |
| --- | --- |
| AddSecurityAuthForRestController( string restControllerClass, int order, string action, bool allow, string groupGuid, Rock.Model.SpecialRole specialRole, string authGuid ) | Adds the security authentication for the REST controller. |

**SecurityRoleGroup**

| Helper Method | Description |
| --- | --- |
| AddSecurityRoleGroup( string name, string description, string guid ) | Adds the security role group. |
| DeleteSecurityRoleGroup( string guid ) | Deletes the security role group. |

**Site**

| Helper Method | Description |
| --- | --- |
| AddSite( string name, string description, string theme, string guid ) | Adds a new layout to the given site. |
| DeleteSite( string guid ) | Deletes the layout. |

**SystemEmail**

| Helper Method | Description |
| --- | --- |
| DeleteSystemEmail( string guid ) | Deletes the SystemEmail. |

**WorkflowActionEntityAttribute**

| Helper Method | Description |
| --- | --- |
| UpdateWorkflowActionEntityAttribute( string actionEntityTypeGuid, string fieldTypeGuid, string name, string key, string description, int order, string defaultValue, string guid ) | Updates the workflow action entity attribute. |

**WorkflowActivityTypeAttribute**

| Helper Method | Description |
| --- | --- |
| UpdateWorkflowActivityTypeAttribute( string workflowActivityTypeGuid, string fieldTypeGuid, string name, string key, string description, int order, string defaultValue, string guid ) | Updates the workflow activity type attribute. |

**WorkflowTypeAttribute**

| Helper Method | Description |
| --- | --- |
| UpdateWorkflowTypeAttribute( string workflowTypeGuid, string fieldTypeGuid, string name, string key, string description, int order, string defaultValue, string guid ) | Updates the workflow type attribute. |

Note

When creating your SQL migrations be sure to watch out for the common gotchas in the next section.

## Double The Quotes

Be sure to double any quotes that you have within your own SQL as seen here:

```
Sql( @"
  UPDATE 
     [Attribute]
  SET 
     [Description] = 'He said ""Rock"" is fun. Don''t you agree?'
  WHERE 
     [Guid] = 'ABCDEFG9-1111-2222-3333-1213456789ABC'
" );
```

## Don't Quote Your Nulls

Just pass the null keyword as seen below:

```
RockMigrationHelper.UpdateGroupTypeRole( "E0C5A0E2-B7B3-4EF4-820D-BBF7F9A374EF", "Facebook Friend", "A Facebook friend.",
0, null, null, "AB69816C-4DFA-4A7A-86A5-9BFCBA6FED1E" );
```

## Migration Generation Tools

You may find yourself creating a new page with child pages that use your new blocks, or your block may use a new custom workflow that you need to distribute with your package. Depending on the situation, creating a migration by hand can be a daunting task. We've felt that pain too and created a few more helper tools.

If you look in the Rock\\Dev Tools\\Sql folder, you'll notice several sql scripts that start with the prefix `CodeGen*_`. These scripts can help generate many of the needed MigrationHelper methods for your stuff.

For example, when executed, the `CodeGen_PagesBlocksAttributesMigration_ForAPage.sql` script takes the PageId parameter (which you set to the id of your choice):

```
DECLARE @PageId int = 226
```

...and outputs the needed MigrationHelper methods for the Up() and Down() methods of your migration.

```
// MigrationUp
// -----------
// Page: Layout Detail
RockMigrationHelper.AddPage("A2991117-0B85-4209-9008-254929C6E00F","D65F783D-87A9-4CC9-8110-E83466A0EADB","Layout Detail","","E6217A2B-B16F-4E84-BF67-795CA7F5F9AA","fa fa-th"); // Site:Rock RMS
RockMigrationHelper.UpdateBlockType("Layout Detail","Displays the details for a specific layout.","~/Blocks/Cms/LayoutDetail.ascx","CMS","68B9D63D-D714-473A-89F2-62EB1602E00A");
RockMigrationHelper.UpdateBlockType("Layout Block List","Lists blocks that are on a given site layout.","~/Blocks/Cms/LayoutBlockList.ascx","CMS","CD3C0C1D-2171-4FCC-B840-FC6E6F72EEEF");
RockMigrationHelper.AddBlock("E6217A2B-B16F-4E84-BF67-795CA7F5F9AA","","68B9D63D-D714-473A-89F2-62EB1602E00A","Layout Detail","Main","","",0,"C04C6905-C156-49D3-832D-D09F3B0E1BF1"); 

RockMigrationHelper.AddBlock("E6217A2B-B16F-4E84-BF67-795CA7F5F9AA","","CD3C0C1D-2171-4FCC-B840-FC6E6F72EEEF","Layout Block List","Main","","",1,"5FB1CC3B-4550-4099-8C83-044FF57CEAD8"); 

// MigrationDown
// -------------
RockMigrationHelper.DeleteBlock("5FB1CC3B-4550-4099-8C83-044FF57CEAD8");
RockMigrationHelper.DeleteBlock("C04C6905-C156-49D3-832D-D09F3B0E1BF1");
RockMigrationHelper.DeleteBlockType("CD3C0C1D-2171-4FCC-B840-FC6E6F72EEEF");
RockMigrationHelper.DeleteBlockType("68B9D63D-D714-473A-89F2-62EB1602E00A");
RockMigrationHelper.DeletePage("E6217A2B-B16F-4E84-BF67-795CA7F5F9AA"); //  Page: Layout Detail
```

Warning

Don't forget to really look closely at the code these scripts generate. It's always a good idea to verify that it did not include any extra bits, pages, items, etc.

You may need to experiment with each one to become familiar with how it works, but they all work similarly. Scripts like `CodeGen_WorkflowTypeMigration.sql` can save you tons of hours, but you need to know it works a little differently. That script outputs all Workflow related records except the ones defined in its `#knownGuidsToIgnore` table.

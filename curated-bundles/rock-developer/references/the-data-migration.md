---
description: "Use when learning how to create or modify database tables, schema, and data migrations for Rock plugins"
source: "https://community.rockrms.com/developer/202\u002D\u002D\u002Dignition"
sourceLabel: 202 — Ignition
---
> **Path:** 

There's one more important piece of the puzzle. It's the part that adds any new tables, schema, and data to the database needed for your plugin/application. We call them data migrations.

If you had tried running the example code from the previous chapter without the corresponding data migration, you would have run into trouble. We sorta snuck them in there for you, but now it's time to learn how to handle this yourself.

## Behind The Scenes

When Rock starts it looks for any Migration classes inside any plugin assemblies. Without trying to explain all the magic that goes on, let's just say it figures which ones have not yet been run and calls their `Up()` methods.

All you really need to know is:

- Migrations are ordered.
- Migrations can be marked to require a minimum version of Rock.
- Migrations must have an `Up()` and a `Down()` method.
- Your `Up()` method must add any needed tables and data.
- Your `Down()` method must remove any corresponding data and tables it added.
- You should not use a RockContext to accomplish any of your data movement.

Warning

This rule is 100% true for the core Entity Framework migrations but we've had mixed concerns with trying to use a RockContext in a plugin migration. So, we highly advise not doing it because it may not work in the future.

## Anatomy of a Migration

Migrations should be added into your org.rocksolidchurch.SampleProject under the Migrations folder. The files should also follow the 000\_ClassName.cs naming convention so they are sorted in your folder appropriately.

The class name may be what ever you wish but it must extend Rock's base `Rock.Plugin.Migration` class as seen here:

```
namespace org.rocksolidchurch.SampleProject.Migrations
{
    [MigrationNumber( 1, "1.0.13" )]
    public class CreateDb : Migration
    {
        public override void Up()
        {
            Sql( @"..." );
        }

        public override void Down()
        {
            Sql( @"..." );
        }
    }
}
```

The `[MigrationNumber(1, "1.0.13")]` indicates it is the first migration and it requires Rock version 1.0.13 in order to be installed.

You can include any general SQL statements in the `Sql( string )` calls and you can also use one of the many helper methods Rock has for adding pages, adding blocks, attributes, entities, etc. You'll find a list in the [Data Migration Helper Methods](https://community.rockrms.com/developer/202---ignition/data-migration-helper-methods) section of the next book or by examining the methods in the RockMigrationHelper class.

## 001\_CreateDb Migration

For our ReferralAgency class we created a migration to add a new table, columns, constraints and foreign key references as seen in this `Up()` method below.

You will notice several columns listed below that were not part of the model we defined. Properties for each of these comes from the Rock base Model class and they are required to be defined in your table's columns:

- Id \[int\] IDENTITY(1,1) NOT NULL
- Guid \[uniqueidentifier\] NOT NULL
- CreatedDateTime \[datetime\] NULL
- ModifiedDateTime \[datetime\] NULL
- CreatedByPersonAliasId \[int\] NULL
- ModifiedByPersonAliasId \[int\] NULL
- ForeignKey \[nvarchar\](50) NULL
- ForeignGuid \[uniqueidentifier\](50) NULL
- ForeignId \[nvarchar\](50) NULL
```
public override void Up()
{
        Sql( @"
CREATE TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency](
    [Id] [int] IDENTITY(1,1) NOT NULL,
    [Name] [nvarchar](100) NOT NULL,
    [Description] [nvarchar](max) NULL,
    [ContactName] [nvarchar](100) NULL,
    [PhoneNumber] [nvarchar](100) NULL,
    [Website] [nvarchar](100) NULL,
    [CampusId] [int] NULL,
    [AgencyTypeValueId] [int] NULL,
    [Guid] [uniqueidentifier] NOT NULL,
    [CreatedDateTime] [datetime] NULL,
    [ModifiedDateTime] [datetime] NULL,
    [CreatedByPersonAliasId] [int] NULL,
    [ModifiedByPersonAliasId] [int] NULL,
	[ForeignKey] [nvarchar](50) NULL,
	[ForeignGuid] [uniqueidentifier] NULL,
    [ForeignId] [nvarchar](50) NULL,
 CONSTRAINT [PK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency] PRIMARY KEY CLUSTERED 
(
    [Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency]  WITH CHECK ADD  CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.DefinedValue_ReferralAgencyTypeValueId] FOREIGN KEY([AgencyTypeValueId])
REFERENCES [dbo].[DefinedValue] ([Id])

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] CHECK CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.DefinedValue_ReferralAgencyTypeValueId]

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency]  WITH CHECK ADD  CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.Campus_CampusId] FOREIGN KEY([CampusId])
REFERENCES [dbo].[Campus] ([Id])

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] CHECK CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.Campus_CampusId]

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency]  WITH CHECK ADD  CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.PersonAlias_CreatedByPersonAliasId] FOREIGN KEY([CreatedByPersonAliasId])
REFERENCES [dbo].[PersonAlias] ([Id])

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] CHECK CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.PersonAlias_CreatedByPersonAliasId]

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency]  WITH CHECK ADD  CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.PersonAlias_ModifiedByPersonAliasId] FOREIGN KEY([ModifiedByPersonAliasId])
REFERENCES [dbo].[PersonAlias] ([Id])

ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] CHECK CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.PersonAlias_ModifiedByPersonAliasId]
" );
}
```

The `Down()` method in that migration drops the constraints and table:

```
public override void Down()
{
    Sql(@"
ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] DROP CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.PersonAlias_ModifiedByPersonAliasId]
ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] DROP CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.PersonAlias_CreatedByPersonAliasId]
ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] DROP CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.Campus_CampusId]
ALTER TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency] DROP CONSTRAINT [FK_dbo._org_rockSolidChurch_SampleProject_ReferralAgency_dbo.DefinedValue_ReferralAgencyTypeValueId]
DROP TABLE [dbo].[_org_rockSolidChurch_SampleProject_ReferralAgency]
" );
}
```

## 002\_AddSystemData Migration

In a second migration we added the data we wanted to include with our plugin. We wanted to:

1. add some new pages
2. set some page settings
3. explicitly add our new block types to Rock (versus letting Rock auto add them)
4. add instances of the new block types to our new pages
5. set block attributes on those new block instances
6. add our "Referral Agency Type" DefinedType
7. add the possible values for our new DefinedType
```
namespace org.rocksolidchurch.SampleProject.Migrations
{
    [MigrationNumber( 2, "1.0.8" )]
    public class AddSystemData : Migration
    {
        public override void Up()
        {
            RockMigrationHelper.AddPage( "7F2581A1-941E-4D51-8A9D-5BE9B881B003", "D65F783D-87A9-4CC9-8110-E83466A0EADB", "Referral Agencies", "", "223AC4F2-CBED-4733-807A-188CFBBFA0C8", "" ); // Site:Rock RMS
            RockMigrationHelper.AddPage( "223AC4F2-CBED-4733-807A-188CFBBFA0C8", "D65F783D-87A9-4CC9-8110-E83466A0EADB", "Referral Agency Details", "", "4BF8FA57-AE86-4103-B07E-80ECE0000AEE", "" ); // Site:Rock RMS

            // Since the Referral Agency Details block handles displaying the breadcrumb for the page, we need to turn off the default breadcrumb rendered by the page
            Sql( @"
    UPDATE [Page] SET [BreadCrumbDisplayName] = 0 WHERE [Guid] = '4BF8FA57-AE86-4103-B07E-80ECE0000AEE'
" );
            RockMigrationHelper.UpdateBlockType( "Referral Agency Detail", "Displays the details of a Referral Agency.", "~/Plugins/org_rocksolidchurch/SampleProject/ReferralAgencyDetail.ascx", "rocksolidchurch > Sample Project", "2F130DF6-1EE4-45CE-9410-CBB0517EB33E" );
            RockMigrationHelper.UpdateBlockType( "Referral Agency List", "Lists all the Referral Agencies.", "~/Plugins/org_rocksolidchurch/SampleProject/ReferralAgencyList.ascx", "rocksolidchurch > Sample Project", "53F447CE-4B91-470A-A15D-B60DCAAB29CB" );
            // Add Block to Page: Referral Agencies, Site: Rock RMS
            RockMigrationHelper.AddBlock( "223AC4F2-CBED-4733-807A-188CFBBFA0C8", "", "53F447CE-4B91-470A-A15D-B60DCAAB29CB", "Referral Agency List", "Main", "", "", 0, "A0B53736-4132-4D1B-8300-9F9FB1A5DC21" );
            // Add Block to Page: Referral Agency Details, Site: Rock RMS
            RockMigrationHelper.AddBlock( "4BF8FA57-AE86-4103-B07E-80ECE0000AEE", "", "2F130DF6-1EE4-45CE-9410-CBB0517EB33E", "Referral Agency Detail", "Main", "", "", 0, "B69EBD0E-A1B4-47C5-AAE7-B40BEA37965F" );
            // Attrib for BlockType: Referral Agency List:Detail Page
            RockMigrationHelper.AddBlockTypeAttribute( "53F447CE-4B91-470A-A15D-B60DCAAB29CB", "BD53F9C9-EBA9-4D3F-82EA-DE5DD34A8108", "Detail Page", "DetailPage", "", "", 0, @"", "5B480350-663C-4789-BF4D-33EC8DF882E8" );
            // Attrib Value for Block:Referral Agency List, Attribute:Detail Page Page: Referral Agencies, Site: Rock RMS
            RockMigrationHelper.AddBlockAttributeValue( "A0B53736-4132-4D1B-8300-9F9FB1A5DC21", "5B480350-663C-4789-BF4D-33EC8DF882E8", @"4bf8fa57-ae86-4103-b07e-80ece0000aee" );
            RockMigrationHelper.AddDefinedType( "Global", "Referral Agency Type", "The type of agency (e.g. Counseling, Food, Financial Assistance, etc.)", "150478D4-3709-4543-906F-1F9496B4E7D0");
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Counseling and Therapy", "", "83F9A59C-DBE5-4E1A-B33C-F701FA8175E1", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Financial Assistance or Counseling", "", "7A30D312-996E-4823-B1FF-AA27C1806521", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "24 Hour Crisis Hotlines", "", "EDBE6DCE-313F-4648-8D97-A39520A54BFC", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Youth Resources", "", "BB666FA1-5391-40B1-B334-3A27575AD9D5", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Food and Clothing", "", "E15AE7DE-3555-437B-99B0-B28601C4EA2D", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Homeless Resources/Housing", "", "F6E4D78C-E05A-4AEF-AF8C-09B3B8FDDEBF", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Substance Abuse", "", "AD01D370-7CB6-4261-ACF6-8EE21CB353AA", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Residential Drug Treatment Centers", "", "57F4BCC8-B80F-48E5-93E2-A76E3F572C0C", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Domestic Violence Resources", "", "AE95FD8A-FD9E-4EDD-9689-5491725FEFE6", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Mediation", "", "40C66BE2-CE13-4E7D-980A-A2D66968CE57", false );
            RockMigrationHelper.AddDefinedValue( "150478D4-3709-4543-906F-1F9496B4E7D0", "Miscellaneous", "", "62AB4A35-6E72-4BCD-BF6A-5B0D2052BACA", false );
        }

        public override void Down()
        {
            Sql( @"
    UPDATE [_org_rockSolidChurch_SampleProject_ReferralAgency] SET [AgencyTypeValueId] = NULL
" );
            RockMigrationHelper.DeleteDefinedType( "150478D4-3709-4543-906F-1F9496B4E7D0" );
            
            // Attrib for BlockType: Referral Agency List:Detail Page
            RockMigrationHelper.DeleteAttribute( "5B480350-663C-4789-BF4D-33EC8DF882E8" );
            
            // Remove Block: Referral Agency Detail, from Page: Referral Agency Details, Site: Rock RMS
            RockMigrationHelper.DeleteBlock( "B69EBD0E-A1B4-47C5-AAE7-B40BEA37965F" );
            
            // Remove Block: Referral Agency List, from Page: Referral Agencies, Site: Rock RMS
            RockMigrationHelper.DeleteBlock( "A0B53736-4132-4D1B-8300-9F9FB1A5DC21" );
            RockMigrationHelper.DeleteBlockType( "53F447CE-4B91-470A-A15D-B60DCAAB29CB" ); // Referral Agency List
            RockMigrationHelper.DeleteBlockType( "2F130DF6-1EE4-45CE-9410-CBB0517EB33E" ); // Referral Agency Detail
            RockMigrationHelper.DeletePage( "4BF8FA57-AE86-4103-B07E-80ECE0000AEE" ); // Page: Referral Agency DetailsLayout: Full Width, Site: Rock RMS
            RockMigrationHelper.DeletePage( "223AC4F2-CBED-4733-807A-188CFBBFA0C8" ); // Page: Referral AgenciesLayout: Full Width, Site: Rock RMS

        }
    }
}
```

Tip

You generally want to explicitly add new block types so that you can set well-known Guid values for them. Doing that let's you maintain control -- so you can find them in other Rock installations, refer to them by guid when you're adding instances of them to pages, or setting attributes for them, etc. In fact, you should think about doing this for anything you may need to update at a later date.

## Migration Resources

Although the examples above show stuff like inline SQL directly in the migration class file, there is another way which lets you avoid the need to escape everything for a string.

It is the Resource File. Just right-click your Migration folder and choose Add New Item... Select Resource File and name it MigrationResources.

**Add New Item... Resource File**

![](https://community.rockrms.com/GetImage.ashx?Id=67465)

**Your New Resource File**

![](https://community.rockrms.com/GetImage.ashx?Id=67466)

Next, just put your raw SQL or Lava file next to the migration you want to include it in. We recommend you prefix it with a name that matches the first part of your migration name. So if your my migration was called `007_UpdatedReceiptTemplate7`, name the SQL/Lava file `007_UpdatedReceiptTemplate7_MyLavaFile.lava`.

Now, double-click to open your MigrationResource.resx file and drag your `007_UpdatedReceiptTemplate7_MyLavaFile.lava` into the resx. If Visual Studio doesn't know what type of file the resource is, it may default to a byte\[\] array. If the file is actually just text (such as a .lava file) then change the FileType from byte\[\] to Text.

**Check FileType after adding a new resource**

![](https://community.rockrms.com/GetImage.ashx?Id=67467)

That's everything you need to know to get started. Now you can use the details in the [Packaging Plugins & Themes](https://community.rockrms.com/developer/packaging-plugins-and-themes) to start sharing all your amazing plugins in the RockShop.

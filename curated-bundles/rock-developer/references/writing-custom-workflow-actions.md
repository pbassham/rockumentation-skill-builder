---
description: Use when developers need to create custom workflow actions in Rock RMS beyond the built-in options
source: "https://community.rockrms.com/developer/303---blast-off"
sourceLabel: 303 — Blast Off
---
> **Path:** 

While Rock has an ever increasing number of Workflow actions (listed here [https://community.rockrms.com/WorkflowActions](https://community.rockrms.com/WorkflowActions)) you may run into a situation where you just need to create your own custom action. No problem. Rock’s built with this level of extensibility in mind. Here’s how you do it…

We recommend you create a project named appropriately as per the [Naming Convention](https://www.rockrms.com/Rock/Developer/BookContent/16/16#namingconventions). For our example we’ll create a project called `org.rocksolidchurch.Workflow` and put our custom Action classes there.

Typically your custom action will extend the `ActionComponent` class, however if you’re writing a custom check-in action, you may wish to extend the `CheckInActionComponent` which will give you access to the `GetCheckInState()` method for easily checking check-in state.

Let’s create an action called RunSQL that executes some configurable SQL and sets the results to the value of a configurable attribute. Here’s what the final class looks like. As you can see, similar to the Rock Job class, you only need to override the `Execute()` method in your class and your action can also have admin configurable settings like nearly everything in Rock.

```
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.Composition;

using Rock.Attribute;
using Rock.Data;
using Rock.Model;

namespace org.rocksolidchurch.Workflow.Action
{
    /// <summary>
    /// Runs a SQL query
    /// </summary>
    [ActionCategory( "org_rocksolidchurch: Utility" )]
    [Description( "Runs the specified SQL query to perform an action against the database." )]
    [Export( typeof( Rock.Workflow.ActionComponent ) )]
    [ExportMetadata( "ComponentName", "Run SQL" )]
    [CodeEditorField( "SQLQuery", "The SQL query to run. <span class='tip tip-lava'></span>", Web.UI.Controls.CodeEditorMode.Sql, Web.UI.Controls.CodeEditorTheme.Rock, 400, true, "", "", 0 )]
    [WorkflowAttribute( "Result Attribute", "An optional attribute to set to the scalar result of SQL query.", false, "", "", 1 )]
    [BooleanField( "Continue On Error", "Should processing continue even if SQL Error occurs?", false, "", 2 )]
    public class RunSQL : ActionComponent
    {
        /// <summary>
        /// Executes the specified workflow.
        /// </summary>
        /// <param name="rockContext">The rock context.</param>
        /// <param name="action">The action.</param>
        /// <param name="entity">The entity.</param>
        /// <param name="errorMessages">The error messages.</param>
        /// <returns></returns>
        public override bool Execute( RockContext rockContext, WorkflowAction action, Object entity, out List<string> errorMessages )
        {
            errorMessages = new List<string>();

            var query = GetAttributeValue( action, "SQLQuery" );

            var mergeFields = GetMergeFields( action );
            query = query.ResolveMergeFields( mergeFields );

            try
            {
                object sqlResult = DbService.ExecuteScaler( query );
                action.AddLogEntry( "SQL query has been run" );

                if ( sqlResult != null )
                {
                    string resultValue = sqlResult.ToString();
                    var attribute = SetWorkflowAttributeValue( action, "ResultAttribute", resultValue );
                    if ( attribute != null )
                    {
                        action.AddLogEntry( string.Format( "Set '{0}' attribute to '{1}'.", attribute.Name, resultValue ) );
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                action.AddLogEntry( ex.Message, true );

                if ( !GetAttributeValue( action, "ContinueOnError" ).AsBoolean() )
                {
                    errorMessages.Add( ex.Message );
                    return false;
                }
                else
                {
                    return true;
                }
            }

        }
    }
}
```

Here are a few important things to note. Besides putting your class into your proper namespace, you’ll want to set your organization's name in the class attribute `[ActionCategory()]` to avoid naming collisions and is categorized appropriately. The ExportMetadata class attribute is where you specify the actual name of your action.

```
[ActionCategory( "org_rocksolidchurch: Utility" )]
[ExportMetadata( "ComponentName", "Run SQL" )]
```

![](https://community.rockrms.com/GetImage.ashx?Id=66716)

To fetch any of your action’s attribute setting values you’ll use the `GetAttributeValue(action, key)` method:

`var query = GetAttributeValue( action, "SQLQuery" );`

If you want to write to the action log use the AddLogEntry() method of the action class:

`action.AddLogEntry( "SQL query has been run" );`

To set the value of the admin configured workflow attribute you simply use the SetWorkflowAttributeValue as seen here:

`var attribute = SetWorkflowAttributeValue( action, "ResultAttribute", resultValue );`

Normally, if your action completes without errors, you’ll simply return `true`. If you return `false` the workflow will not mark the action as complete and no further actions will execute in the workflow. Consider this wisely. In our case we’ve allowed the administrator to control whether or not we return true (when an error occurs) via the “Continue On Error” BooleanAttribute.

## Registering your Actions

There’s really only one more thing you’ll want to do -- especially if you’re going to share your new handy custom Action -- and that’s register your action’s attribute settings. You’ll want to do this so that you have well known Guids in the event that you need to update those settings in other people’s Rock server once they’ve installed your action plugin.

```
using Rock.Plugin;

namespace org.rocksolidchurch.Workflow.Migrations
{
    [MigrationNumber( 1, "1.6.0" )]
    public class AddRunSQLWorkflowActions : Migration
    {
        /// <summary>
        /// The commands to run to migrate plugin to the specific version
        /// </summary>
        public override void Up()
        {
            // Add the new Action to the EntityType table
            RockMigrationHelper.UpdateEntityType( "org.rocksolidchurch.Workflow.Action.RunSQL", "8A7C0000-0000-0000-0000-000000000943", false, true );

            // Add the new action’s Attributes
            RockMigrationHelper.UpdateWorkflowActionEntityAttribute( "8A7C0000-0000-0000-0000-000000000943", "1D0D3794-C210-48A8-8C68-3FBEC08A6BA5", "SQLQuery", "SQLQuery", "The SQL query to run. <span class='tip tip-lava'></span>", 0, @"False", "A5631111-1111-1111-1111-11111111A19A" );
            // Qualifiers for Code Editor attribute
            RockMigrationHelper.AddAttributeQualifier( "A5631111-1111-1111-1111-11111111A19A", "editorMode", "7", "20371212-1212-1212-1212-12121212A360" );
            RockMigrationHelper.AddAttributeQualifier( "A5631111-1111-1111-1111-11111111A19A", "editorTheme", "0", "AFD51313-1313-1313-1313-131313137EDF" );
            RockMigrationHelper.AddAttributeQualifier( "A5631111-1111-1111-1111-11111111A19A", "editorHeight", "400", "7E211414-1414-1414-1414-1414141444EE" );
            RockMigrationHelper.UpdateWorkflowActionEntityAttribute( "8A7C0000-0000-0000-0000-000000000943", "99B090AA-4D7E-46D8-B393-BF945EA1BA8B", "Result Attribute", "ResultAttribute", "An optional attribute to set to the scalar result of SQL query.", 1, @"", "C1032222-2222-2222-2222-2222222204A0" );

            RockMigrationHelper.UpdateWorkflowActionEntityAttribute( "8A7C0000-0000-0000-0000-000000000943", "1EDAFDED-DFE6-4334-B019-6EECBA89E05A", "Continue On Error", "ContinueOnError", "Should processing continue even if SQL Error occurs?", 0, @"False", "D13B3333-3333-3333-3333-33333333274C" );
        }

        /// <summary>
        /// The commands to undo a migration from a specific version
        /// </summary>
        public override void Down()
        {
            RockMigrationHelper.DeleteEntityType( "8A7C0000-0000-0000-0000-000000000943" );
        }
    }
}
```

You may find the Data Migration Helper Methods listed in the 202 guide ([https://www.rockrms.com/Rock/Developer/BookContent/17#datamigrationhelpermethods](https://www.rockrms.com/Rock/Developer/BookContent/17#datamigrationhelpermethods)) as a helpful reference.

## Last Step

Once you’ve created your project, remember to add a reference to the RockWeb project. See the **Adding the Project to RockWeb** chapter for those details.

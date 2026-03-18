> **Path:** Developer Codex > Coding Standards > Known ''Gotchas' > Removing Columns From a Grid

# Removing Columns From a Grid

Do not remove columns that exist in the Grid’s Html definition. This will cause the event binding for row buttons to be lost. For example, if you have a grid that has a campus column declared:

```html
<Rock:Grid ID="gSteps"
  runat="server"
  DisplayType="Full"
  AllowSorting="true"
  OnRowSelected="gSteps_Edit"
  CssClass="js-grid-step-list"
  OnRowDataBound="gSteps_RowDataBound"
  ExportSource="ColumnOutput" >
  <Columns>
  ...
  <Rock:RockBoundField
    DataField="CampusName"
    HeaderText="Campus"
    SortExpression="Campus.Name"
    ExcelExportBehavior="AlwaysInclude"/>
  <Rock:DeleteField OnClick="DeleteStep_Click" />
</Rock:Grid>
```

And then you have the following code somewhere in the code behind:

```csharp
var campusCount = CampusCache.All().Count;
if (campusCount <= 1 )
{
   var campusColumn = gSteps.ColumnsOfType<RockBoundField>()
    .Where( a => a.DataField == "CampusName" )
    .FirstOrDefault();
   if ( campusColumn != null )
   {
      gSteps.Columns.Remove(campusColumn);
   }
}
```

Removing the column will cause the delete field to lose its binding to `DeleteStep_Click`.

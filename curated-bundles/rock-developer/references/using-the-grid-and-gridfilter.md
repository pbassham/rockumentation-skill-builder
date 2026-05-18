---
description: "Use when implementing data grids, sortable tables, or filtering interfaces in Rock blocks"
source: "https://community.rockrms.com/developer/101\u002D\u002D\u002Dlaunchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

Although the Rock Grid and GridFilter are just two reusable UI controls out of more than a hundred we created for you, they are worth mentioning here since you'll probably use them pretty often.

The markup for a Grid is simple but you also have many other rock controls that can be bound in your grid columns. Here's an example from the SiteList block:

```
<div class="grid grid-panel">
    <Rock:Grid ID="gSites" runat="server" AllowSorting="true" OnRowSelected="gSites_Edit">
        <Columns>
            <Rock:RockBoundField DataField="Name" HeaderText="Name" SortExpression="Name" />
            <Rock:RockBoundField HeaderText="Description" DataField="Description" SortExpression="Description" />
            <Rock:RockTemplateField HeaderText="Domain(s)">
                <ItemTemplate><%# GetDomains( (int)Eval("Id") ) %></ItemTemplate>
            </Rock:RockTemplateField>
            <Rock:RockBoundField HeaderText="Theme" DataField="Theme" SortExpression="Theme" />
            <Rock:BoolField DataField="IsSystem" HeaderText="System" SortExpression="IsSystem" />
            <Rock:SecurityField TitleField="Name" />
            <Rock:DeleteField OnClick="gSites_Delete" />
        </Columns>
    </Rock:Grid>
</div>
```

In your code you bind the grid's `DataSource` to a set of data as seen below. As you'll see, we're also using the Grid's SortProperty to sort the data:

```
SiteService siteService = new SiteService( new RockContext() );
SortProperty sortProperty = gSites.SortProperty;
var qry = siteService.Queryable();
if ( sortProperty != null )
{
    gSites.DataSource = qry.Sort(sortProperty).ToList();
}
else
{
    gSites.DataSource = qry.OrderBy( s => s.Name ).ToList();
}
gSites.DataBind();
```

When it's rendered it looks like this:

**Example of a rendered Rock Grid**

![](https://community.rockrms.com/GetImage.ashx?Id=67443)

Tip

You'll typically want to wrap your Grid in a div with the `grid grid-panel` classes for proper grid styling.  

## Filter Options

If your grid potentially has too much data, you'll want to include a GridFilter control above your grid. Inside the GridFilter add any controls you'll use to collect filtering criteria from the user. Here is an example as seen in the PledgeList block which uses a PersonPicker to allow filtering by person, an account picker, and a date range picker.

```
<div class="grid grid-panel">
    <Rock:GridFilter ID="gfPledges" runat="server">
        <Rock:PersonPicker ID="ppFilterPerson" runat="server" Label="Filter by person" IncludeBusinesses="true"/>
        <Rock:AccountPicker ID="apFilterAccount" runat="server" Label="Filter by account" AllowMultiSelect="True"/>
        <Rock:DateRangePicker ID="drpDates" runat="server" Label="Date Range" />
    </Rock:GridFilter>
    <Rock:Grid ID="gPledges" runat="server" AutoGenerateColumns="False" AllowSorting="True" AllowPaging="True" OnRowSelected="gPledges_Edit">
        <Columns>
            ...
        </Columns>
    </Rock:Grid>
</div>
```

It will render a small Filter Options menu item in the top right corner above the grid.

**Example of a rendered Rock Grid Filter**

![](https://rockrms.blob.core.windows.net/documentation/Books/16/1.1.0/images/grid-filter-collapsed.png)

Once expanded, it displays all the inner controls in the filter.

**An expanded Rock Grid Filter**

![](https://community.rockrms.com/GetImage.ashx?Id=67444)

Of course, you still need to actually use the selected criteria to filter your data set – but don't worry it's pretty simple. Here's an example from the PledgeList block showing the user's criteria saved in a person preference and then used to filter the data in a `BindGrid()` method:

```
protected void gfPledges_ApplyFilterClick( object sender, EventArgs e )
{
    gfPledges.SetFilterPreference( "date-range", drpDates.DelimitedValues );
    gfPledges.SetFilterPreference( "person", ppFilterPerson.PersonId.ToString() );
    gfPledges.SetFilterPreference( "accounts", apFilterAccount.SelectedValues.ToList().AsDelimited(",") );
    BindGrid();
}
private void BindGrid()
{
    var pledgeService = new FinancialPledgeService( new RockContext() );
    var sortProperty = gPledges.SortProperty;
    var pledges = pledgeService.Queryable();
    int? personId = gfPledges.GetFilterPreference("person").AsIntegerOrNull();
    if ( personId.HasValue )
    {
        pledges = pledges.Where( p => p.PersonAlias.PersonId == personId );
    }
    var accountIds = gfPledges.GetFilterPreference( "accounts" ).Split( ',' ).AsIntegerList();
    if ( accountIds.Any() )
    {
        pledges = pledges.Where( p => p.AccountId.HasValue && accountIds.Contains( p.AccountId.Value ) );
    }
    // Date Range
    var drp = new DateRangePicker();
    drp.DelimitedValues = gfPledges.GetFilterPreference( "date-range" );
    var filterStartDate = drp.LowerValue ?? DateTime.MinValue;
    var filterEndDate = drp.UpperValue ?? DateTime.MaxValue;
    // exclude pledges that start after the filter's end date or end before the filter's start date
    pledges = pledges.Where( p => !( p.StartDate > filterEndDate ) && !( p.EndDate < filterStartDate ) );
    gPledges.DataSource = sortProperty != null ? pledges.Sort( sortProperty ).ToList() : pledges.OrderBy( p => p.AccountId ).ToList();
    gPledges.DataBind();
}
```

Note

For full details on using the Rock Grid and Grid Filter see the UI Toolkit.

---
description: Use when a developer needs to create custom database entities in Rock using Entity Framework and the code-first approach
source: "https://community.rockrms.com/developer/202\u002D\u002D\u002Dignition"
sourceLabel: 202 — Ignition
---
> **Path:** 

There's so much more we can do with just blocks, but we suspect you want to create your own custom entities that can be saved to the database. Since Rock uses Microsoft's Entity Framework we'll show you how simple this is with a "code first" approach.

Important

Although what we're about to do is pretty simple, we can't turn you into an experienced C# web-developer. You should have a basic understanding of [ASP.NET Web Forms](http://www.asp.net/web-forms/what-is-web-forms) otherwise you'll probably be a bit lost in this chapter.  

## Referral Agency Sample Project

The Rockit SDK comes with a reference project called "Sample Project". It includes a custom entity called ReferralAgency and also included in your plugin folder are two custom blocks, one to list existing referral agencies and one to add/edit/view the details of a referral agency. In this section we'll walk you through the code for the custom ReferralAgency entity that belongs to the generic org.rocksolidchurch.SampleProject so you have a solid foundation for creating your own custom entities.

Let's say we want to keep track of agencies that your church/organization refers people to. We are going to create a `ReferralAgency` class that models an agency with its properties and a very simple `ReferralAgencyService` to act as our liason with the database. These classes will rely on the base Rock classes but We won't go too deeply into those inner workings so we can keep this chapter simple. Then we're going to create two blocks to help us manage our ReferralAgency items.

Note

Depending on your exact needs you might be able to use Rock's super-flexible Groups system along with Rock's general purpose Attributes system. If so, it will mean you won't have to write any code. However for the purpose of this chapter we'll pretend you really needed to create your own custom model.

## Step 1 - Add a Project

Let's create a class library project to hold our model classes. Make sure nothing is running in Visual Studio and then right-click the solution in the Solution Explorer. Select 'Add \> New Project...' Create it as a new Visual C# Class Library with a name of `org.rocksolidchurch.SampleProject`.

Let's create some folders to keep our stuff organized. Right-click the project in the Solution Explorer and select 'Add \> New Folder' and create:

- Migrations
- Model
- Rest
- SystemGuids

We're going to be using several other libraries in our classes so let's add references to a few key assemblies.

- From the Framework Assemblies, select:
	- System.ComponentModel.DataAnnotations
		- System.Runtime.Serialization
- From the Browse, navigate to your RockWeb/bin folder and select the following items or add them from the Tools | NuGet Package Manager | Manage NuGet Packages for Solution (except the Rock and Rock.Rest assemblies, you'll need to add them from RockWeb/bin):
	- EntityFramework.SqlServer.dll
		- EntityFramework.dll
		- Microsoft.Data.Edm.dll
		- Microsoft.Data.OData.dll
		- Newtonsoft.Json.dll
		- DotLiquid.dll
		- Rock.dll
		- Rock.Lava.Shared.dll
		- Rock.Rest.dll

## Step 2 - Build a Model

Open your org.rocksolidchurch.SampleProject and create a class called ReferralAgency.cs under the Model folder. Put this class in your `org.rocksolidchurch.SampleProject.Model` namespace and have it extend `Rock.Data.Model` with the type ReferralAgency and extend `Rock.Security.ISecured`as shown below. You'll also want to add the `[DataContract]` class decorator in order to explicitly control serialization of your class properties.

```
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Runtime.Serialization;

using Rock.Data;
using Rock.Model;

namespace org.rocksolidchurch.SampleProject.Model
{
    [DataContract]
    public class ReferralAgency : Model<ReferralAgency>, IRockEntity
    {
    }
}
```

Before we add the properties for our class, let's tell the framework which table to use to store our data. Do this by adding the `[Table( "TABLE-NAME" )]` decorator above the class name. Use proper Rock [Naming Conventions](https://community.rockrms.com/page/3553?slug=naming-conventions) and name it like this:

```
[Table( "_org_rocksolidchurch_SampleProject_ReferralAgency" )]
// That line goes right above the class definition...
[DataContract]
public class ReferralAgency : Model<ReferralAgency>, IRockEntity
{
    //...
```

Now we can add properties for contact name, phone number, website, campus and agency type. We're going to tie our campus and agency type properties to the existing Rock Campus and DefinedValue entities. When we do this we'll create "virtual" properties to hold the reference to the object and regular int properties to store the related entity object's Id.

Note

A DefinedValue represents one of the possible values for a DefinedType. And, you can think of a DefinedType like a custom field. You can review [the details about DefinedTypes](https://community.rockrms.com/developer/book/17/17/content#definedtypedefinedvalue) in an earlier chapter.In our case, we'll create a referral agency 'type' that holds our possible pre-set values such as counseling, financial assistance, crisis hotline, food and clothing, etc. Later below, we'll force the block that manages our agencies to only use this particular DefinedType when setting the type of an agency.

```
public class ReferralAgency : Model<ReferralAgency>, IRockEntity
{
    // Now we'll add all our classes properties
    // except Id, Guid, CreatedByPersonAliasId, CreatedDateTime, 
    // ModifiedByPersonAliasId, and ModifiedDateTime because
    // the Rock base Model class implements them for all models.

    [MaxLength( 100 )]
    [Required( ErrorMessage = "Name is required" )]
    [DataMember]
    public string Name { get; set; }
    
    [DataMember]
    public string Description { get; set; }
    
    [MaxLength( 100 )]
    [DataMember]
    public string ContactName { get; set; }
    
    [MaxLength( 100 )]
    [DataMember]
    public string PhoneNumber { get; set; }
    
    [MaxLength( 100 )]
    [DataMember]
    public string Website { get; set; }
    
    [DataMember]
    public int? CampusId { get; set; }
    
    [DataMember]
    public int? AgencyTypeValueId { get; set; }
    
    public virtual Campus Campus { get; set; }
    
    [DataMember]
    public virtual DefinedValue AgencyTypeValue { get; set; }
    
    //...
}
```

That's all there is to our class, but we do need a configuration class that tells [Entity Framework](http://msdn.microsoft.com/en-us/data/jj591620.aspx) how the virtual Campus and AgencyTypeValue properties relate to the int properties of our class. Just add this to the ReferralAgency.cs file just after the closing brace of your class (but before the closing brace of the namespace).

```
public partial class ReferralAgencyConfiguration : EntityTypeConfiguration<ReferralAgency>
{
    public ReferralAgencyConfiguration()
    {
        this.HasOptional( r => r.Campus ).WithMany().HasForeignKey( r => r.CampusId).WillCascadeOnDelete( false );
        this.HasOptional( r => r.AgencyTypeValue ).WithMany().HasForeignKey( p => p.AgencyTypeValueId ).WillCascadeOnDelete( false );
        
        // IMPORTANT!!
        this.HasEntitySetName( "ReferralAgency" );
    }
}
```

Note

If you're new to the Entity Framework and you want to learn more about what's going on behind the scenes in Rock, you should read the [Get Started with Entity Framework](http://msdn.microsoft.com/en-us/ee712907) and/or the [Working With DbContext](http://msdn.microsoft.com/en-us/jj729737) MSDN articles.  

## Step 3 - Service Class

Now we'll create a `ReferralAgencyService` class which extends the `Rock.Data.Service` and uses the RockContext to communicate with the database. This is the class that you'll use in your blocks to fetch and store the referral agencies. Don't worry if this seems complicated to understand. This is just boilerplate code that you don't really have to worry too much about. It just glues our models to Rock's models.

```
using Rock.Data;

namespace org.rocksolidchurch.SampleProject.Model
{
    public class ReferralAgencyService : Service<ReferralAgency>
    {
        public ReferralAgencyService( RockContext context ) : base( context ) { }

        public bool CanDelete( ReferralAgency item, out string errorMessage )
        {
            errorMessage = string.Empty;
            return true;
        }
    }
}
```

It's pretty hard to believe, but that's really all there is to it. Rock's Entity Framework and LINQ does all the heavy lifting. Now, if you wanted to implement a method that only fetches a very specific set of data using your own custom LINQ, this is where you would put it.

Let's also create a constant to use in our code to refer to our new referral agency type DefinedType. We'll put these into a static class called DefinedType in our `org.rocksolidchurch.SampleProject.SystemGuid` namespace under the SystemGuid folder in our project.

```
using System;

namespace org.rocksolidchurch.SampleProject.SystemGuid
{
    public static class DefinedType
    {
        /// <summary>
        /// Types of Referral Agencies
        /// </summary>
        public const string REFERRAL_AGENCY_TYPE = "150478D4-3709-4543-906F-1F9496B4E7D0";
    }
}
```

Note

The Guid you generate for your constants are permanent and they will follow your application wherever it goes. You will include them (along with any other data that's needed in your new application) in something called a data "migration". Rock uses your data migration when it installs your application into Rock. You'll learn more about data migrations later.You can [generate Guids](http://www.uuidgenerator.net/version4) any way you wish as long as they're unique.  

Check your work by building the project in Visual Studio. `Ctrl+Shift+B`

Now go to the RockWeb/bin folder and add a reference to your new org.rocksolidchurch.SampleProject project.

In the next section we'll use what we learned in the previous guides to build blocks to add and edit agencies and to list them.

## Step 4 - Back to Blocks: ReferralAgencyDetail Block

Following the Rock block convention, we need a block to add/view/edit an agency and one block to show the list of agencies. We'll also make these blocks follow common Rock UI patterns.

Find your RockWeb\\Plugins\\org\_rocksolidchurch\\SampleProject folder and create a `ReferralAgencyDetail` web usercontrol with an asp:UpdatePanel and with the necessary `using` statements to include your new data and model classes as shown here:

```
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;

using Rock;
using Rock.Constants;
using Rock.Data;
using Rock.Model;
using Rock.Web.Cache;
using Rock.Web.UI;
using Rock.Web.UI.Controls;
using Rock.Attribute;

using org.rocksolidchurch.SampleProject.Model;

namespace RockWeb.Plugins.org_rocksolidchurch.SampleProject
{
    [DisplayName( "Referral Agency Detail" )]
    [Category( "rocksolidchurch > Sample Project" )]
    [Description( "Displays the details of a Referral Agency." )]

    public partial class ReferralAgencyDetail : Rock.Web.UI.RockBlock
    {
    }
}
```
```
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ReferralAgencyDetail.ascx.cs" 
            Inherits="RockWeb.Plugins.org_rocksolidchurch.SampleProject.ReferralAgencyDetail" %>
<asp:UpdatePanel ID="upnlContent" runat="server">
    <ContentTemplate>

        <asp:Panel ID="pnlDetails" runat="server" Visible="false">

        </asp:Panel>

    </ContentTemplate>
</asp:UpdatePanel>
```

## Markup (ReferralAgencyDetail.ascx)

This block will show the details of a selected agency, so we need some usercontrols and markup inside the pnlDetails panel of our .ascx to display:

- a hidden field to keep track of the id of the agency
- the action the user's performing
- a validation summary area
- notification boxes for a possible warning/error and edit mode message
- a field for each of our agency's properties
- the save and cancel action buttons

Rock comes with a variety of user controls we'll use for making perfectly styled form fields. Use the `Rock:NotificationBox` for the notification boxes, a `Rock:CampusPicker` for the campus selector and `Rock:DataTextBox` for most of the remaining property fields. The generic `Rock:DataDropDownList` will be good to use for selecting the agency type.

Tip

The DataTextBox is great because it can perform automatic validation based on your entity model. So, if you have a `[MaxLength( 100 )]` attribute decorator on your Name property, it won't let the user enter more than 100 characters.  

**ReferralAgencyDetail**

![](https://community.rockrms.com/GetImage.ashx?Id=67460)

1. **Action Title Banner** - Shows the action and the name of the item being edited.  
2\. **Validation and Notification Area** - Displays any validation errors and edit or warning messages.  
3\. **Form Fields** - The main area for the edit fields.  
4\. **Action Buttons** - Location for the save, cancel, done, etc. buttons.

```
<asp:HiddenField ID="hfReferralAgencyId" runat="server" />

<div class="banner">
    <h1><asp:Literal ID="lActionTitle" runat="server" /></h1>
</div>

<asp:ValidationSummary ID="valSummaryTop" runat="server" HeaderText="Please Correct the Following" CssClass="alert alert-danger" />
<Rock:NotificationBox ID="nbWarningMessage" runat="server" NotificationBoxType="Warning" />
<Rock:NotificationBox ID="nbEditModeMessage" runat="server" NotificationBoxType="Info" />

<div class="row">
    <div class="col-md-6">
        <Rock:DataTextBox ID="tbName" runat="server" SourceTypeName="org.rocksolidchurch.SampleProject.Model.ReferralAgency, org.rocksolidchurch.SampleProject" PropertyName="Name" />
    </div>
    <div class="col-md-6">
    </div>
</div>

<Rock:DataTextBox ID="tbDescription" runat="server" SourceTypeName="org.rocksolidchurch.SampleProject.Model.ReferralAgency, org.rocksolidchurch.SampleProject" PropertyName="Description" TextMode="MultiLine" Rows="4" />

<div class="row">
    <div class="col-md-6">
        <Rock:CampusPicker ID="cpCampus" runat="server" Label="Campus" />
        <Rock:DefinedValuePicker ID="dvpAgencyType" runat="server" Label="Agency Type" />
    </div>
    <div class="col-md-6">
        <Rock:DataTextBox ID="tbContactName" runat="server" SourceTypeName="org.rocksolidchurch.SampleProject.Model.ReferralAgency, org.rocksolidchurch.SampleProject" PropertyName="ContactName" />
        <Rock:DataTextBox ID="tbPhoneNumber" runat="server" SourceTypeName="org.rocksolidchurch.SampleProject.Model.ReferralAgency, org.rocksolidchurch.SampleProject" PropertyName="PhoneNumber" />
        <Rock:DataTextBox ID="tbWebsite" runat="server" SourceTypeName="org.rocksolidchurch.SampleProject.Model.ReferralAgency, org.rocksolidchurch.SampleProject" PropertyName="Website" />
    </div>
</div>

<div class="actions">
    <asp:LinkButton ID="btnSave" runat="server" Text="Save" CssClass="btn btn-primary" OnClick="btnSave_Click" />
    <asp:LinkButton ID="btnCancel" runat="server" Text="Cancel" CssClass="btn btn-link" CausesValidation="false" OnClick="btnCancel_Click" />
</div>
```

Now the real coding begins.

## Code (ReferralAgencyDetail.ascx.cs)

Create an `OnInit` method and add the code to bind our agency type drop-down list to the particular referral agency type DefinedType that we defined in our `org.rocksolidchurch.SystemGuid.REFERRAL_AGENCY_TYPE` constant. We'll read it from Rock's cache for increased performance.

```
protected override void OnInit( EventArgs e )
{
    base.OnInit( e );

    this.BlockUpdated += Block_BlockUpdated;
    this.AddConfigurationUpdateTrigger( upnlContent );

    var definedType = DefinedTypeCache.Get( org.rocksolidchurch.SampleProject.SystemGuid.DefinedType.REFERRAL_AGENCY_TYPE.AsGuid() );
    if (definedType != null)
    {
        dvpAgencyType.DefinedTypeId = definedType.Id;
    }
}

protected void Block_BlockUpdated( object sender, EventArgs e )
{
    ShowDetail();
}
```

In the `OnLoad` event we'll just bind the campuses to the campus picker and then call a `ShowDetail()` method that we will create next to show all the details of the selected agency.

```
protected override void OnLoad( EventArgs e )
{
    base.OnLoad( e );

    if ( !Page.IsPostBack )
    {
        var campuses = CampusCache.All();
        cpCampus.Campuses = campuses;
        cpCampus.Visible = campuses.Any();

        ShowDetail();
    }
}
```

The `ShowDetail()` will need to:

- Fetch agency id given in the querystring. Use the
- Load the agency object using our ReferralAgencyService class
- Set the page and action title on the page.
- Bind the hidden id value and all the edit field values to the respective agency property values.
- Check the viewer's `EDIT `authorization.
- If not authorized to edit, display the read-only notification box, set the edit fields `ReadOnly`, property to true and hide the `Save `button.
```
private ReferralAgency _referralAgency = null;

private void ShowDetail()
{
    pnlDetails.Visible = true;

    int? referralAgencyId = PageParameter( "referralAgencyId" ).AsIntegerOrNull();
    int? campusId = PageParameter( "campusId" ).AsIntegerOrNull();
    int? agencyTypeValueId = PageParameter( "agencyTypeId" ).AsIntegerOrNull();

    ReferralAgency referralAgency = null;
    if (referralAgencyId.HasValue)
    {
        referralAgency = _referralAgency ?? new ReferralAgencyService( new RockContext() ).Get( referralAgencyId.Value );
    }

    if (referralAgency != null)
    {
        RockPage.PageTitle = referralAgency.Name;
        lActionTitle.Text = ActionTitle.Edit( referralAgency.Name ).FormatAsHtmlTitle();
    }
    else
    {
        referralAgency = new ReferralAgency { Id = 0, CampusId = campusId, AgencyTypeValueId = agencyTypeValueId };
        RockPage.PageTitle = ActionTitle.Add( ReferralAgency.FriendlyTypeName );
        lActionTitle.Text = ActionTitle.Add( ReferralAgency.FriendlyTypeName ).FormatAsHtmlTitle();
    }

    hfReferralAgencyId.Value = referralAgency.Id.ToString();
    tbName.Text = referralAgency.Name;
    tbDescription.Text = referralAgency.Description;
    cpCampus.SelectedCampusId = referralAgency.CampusId;
    dvpAgencyType.SetValue( referralAgency.AgencyTypeValueId );
    tbContactName.Text = referralAgency.ContactName;
    tbPhoneNumber.Text = referralAgency.PhoneNumber;
    tbWebsite.Text = referralAgency.Website;

    bool readOnly = false;

    nbEditModeMessage.Text = string.Empty;
    if ( !IsUserAuthorized(Rock.Security.Authorization.EDIT) )
    {
        readOnly = true;
        nbEditModeMessage.Text = EditModeMessage.ReadOnlyEditActionNotAllowed( ReferralAgency.FriendlyTypeName );
    }
    
    if (readOnly)
    {
        lActionTitle.Text = ActionTitle.View( ReferralAgency.FriendlyTypeName );
        btnCancel.Text = "Close";
    }

    tbName.ReadOnly = readOnly;
    tbDescription.ReadOnly = readOnly;
    tbContactName.ReadOnly = readOnly;
    tbPhoneNumber.ReadOnly = readOnly;
    tbWebsite.ReadOnly = readOnly;

    btnSave.Visible = !readOnly;
}
```

You may have noticed we also declared a new `_referralAgency` private ReferralAgency property for this block, and we try getting the agency object from there first before we attempt to load it using our ReferralAgencyService. We're doing this for performance reasons. As you'll see in a few minutes, we may have already loaded it inside the `GetBreadCrumbs` method we're going to create.

Now let's write the `btnSave_Click` code that handles the Save button click event. In here we need to:

- Create a database context. We'll use this dataContext with our ReferralAgencyService to save the changes we're about to make to a referral agency.
- If we're editing a new agency we use the service's `.Add(object)` method, otherwise we fetch the agency fresh from the database using the service's `.Get(int)` method.
- Set the agency's property values using the values in the edit fields.
- Check to see if the agency is valid and the page is also valid.
- Save our changes to the database and navigate back to the parent page.
```
protected void btnSave_Click( object sender, EventArgs e )
{
    ReferralAgency referralAgency;
    var dataContext = new RockContext();
    var service = new ReferralAgencyService( dataContext );

    int referralAgencyId = int.Parse( hfReferralAgencyId.Value );

    if ( referralAgencyId == 0 )
    {
        referralAgency = new ReferralAgency();
        service.Add( referralAgency );
    }
    else
    {
        referralAgency = service.Get( referralAgencyId );
    }

    referralAgency.Name = tbName.Text;
    referralAgency.Description = tbDescription.Text;
    referralAgency.CampusId = cpCampus.SelectedCampusId;
    referralAgency.AgencyTypeValueId = dvpAgencyType.SelectedValueAsId();
    referralAgency.ContactName = tbContactName.Text;
    referralAgency.PhoneNumber = tbPhoneNumber.Text;
    referralAgency.Website = tbWebsite.Text;

    if ( !referralAgency.IsValid || !Page.IsValid )
    {
        // Controls will render the error messages
        return;
    }

    dataContext.SaveChanges();

    NavigateToParentPage();

}
```

Let's tap into [Rock's breadcrumb](https://community.rockrms.com/developer/book/16/16#usingbreadcrumbs) system. Just override the `GetBreadCrumbs` method and add the name of the agency we're displaying or editing into the breadcrumbs. When we're just adding a new agency we'll set the crumb's name to the default 'add' action title for the general type name of the ReferralAgency class. The code looks like this:

```
public override List<BreadCrumb> GetBreadCrumbs( Rock.Web.PageReference pageReference )
{
    var breadCrumbs = new List<BreadCrumb>();

    string crumbName = ActionTitle.Add( ReferralAgency.FriendlyTypeName );

    int? referralAgencyId = PageParameter( "referralAgencyId" ).AsIntegerOrNull();
    if ( referralAgencyId.HasValue )
    {
        _referralAgency = new ReferralAgencyService( new RockContext() ).Get( referralAgencyId.Value );
        if ( _referralAgency != null )
        {
            crumbName = _referralAgency.Name;
        }
    }

    breadCrumbs.Add( new BreadCrumb( crumbName, pageReference ) );

    return breadCrumbs;
}
```

Lastly, if someone clicks the Cancel button we'll just write a handler to navigate back to the parent page.

```
protected void btnCancel_Click( object sender, EventArgs e )
{
    NavigateToParentPage();
}
```

## Step 5 - ReferralAgencyList Block

Now we need a block to list the agencies. Find your RockWeb\\Plugins\\org\_rocksolidchurch\\SampleProject folder and create a `ReferralAgencyList` web usercontrol with an asp:UpdatePanel and with this template code in your code-behind file as shown here:

```
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web.UI;

using Rock;
using Rock.Attribute;
using Rock.Data;
using Rock.Model;
using Rock.Web.Cache;
using Rock.Web.UI.Controls;

using org.rocksolidchurch.SampleProject.Model;

namespace RockWeb.Plugins.org_rocksolidchurch.SampleProject
{
    [DisplayName( "Referral Agency List" )]
    [Category( "rocksolidchurch > Sample Project" )]
    [Description( "Lists all the Referral Agencies." )]

    [LinkedPage( "Detail Page" )]
    public partial class ReferralAgencyList : Rock.Web.UI.RockBlock
    {
    }
}
```

Notice that we've added a `LinkedPage` block attribute. Once it's on a page, we'll configure it to the page that has an instance of the ReferralAgencyDetail block we just created.

## Markup (ReferralAgencyList.ascx)

This block will show a list of agencies, so we need a Grid and let's also add a GridFilter to make it easy to filter agencies by type. This block will also allow for:

- deleting agencies
- navigating to an agency detail when selected
- adding a new agency
- saving the viewer's filter settings

**ReferralAgencyList**

![](https://rockrms.blob.core.windows.net/documentation/Books/17/1.1.0/images/saving-custom-data-agency-list.png)

1\. **Rock GridFilter** - Collapsible region that holds the filter for the grid that includes a Rock CampusPicker and a RockDropDownList.

2\. **Rock Grid** - A Rock Grid showing a list of items.

3\. **A row with ASP BoundFields** \- A selectable row showing desired BoundFields for an item and with the Grid's TooltipField set to show the item Description on hover-over.

4\. **Rock DeleteField** - Standard delete button for deleting an item in a grid row.

5\. **Grid Action Bar** - Location for any actions associated with the grid items including, add, export, etc.

```
<%@ Control Language="C#" AutoEventWireup="true" CodeFile="ReferralAgencyList.ascx.cs" Inherits="RockWeb.Plugins.org_rocksolidchurch.SampleProject.ReferralAgencyList" %>
<asp:UpdatePanel ID="upnlContent" runat="server">
    <ContentTemplate>

        <Rock:GridFilter ID="gfSettings" runat="server">
            <Rock:CampusPicker ID="cpCampus" runat="server" Label="Campus" />
            <Rock:DefinedValuePicker ID="dvpAgencyType" runat="server" Label="Agency Type" />
        </Rock:GridFilter>

        <Rock:ModalAlert ID="mdGridWarning" runat="server" />

        <Rock:Grid ID="gAgencies" runat="server" AllowSorting="true" OnRowSelected="gAgencies_Edit" TooltipField="Description">
            <Columns>
                <asp:BoundField DataField="Name" HeaderText="Agency Name" SortExpression="Name" />
                <asp:BoundField DataField="Campus.Name" HeaderText="Campus" SortExpression="Campus.Name" />
                <asp:BoundField DataField="AgencyTypeValue.Value" HeaderText="Type" SortExpression="AgencyTypeValue.Value" />
                <asp:BoundField DataField="ContactName" HeaderText="Contact Name" SortExpression="ContactName" />
                <asp:BoundField DataField="PhoneNumber" HeaderText="Phone Number" SortExpression="PhoneNumber" />
                <asp:BoundField DataField="Website" HeaderText="Website" SortExpression="Website" />
                <Rock:DeleteField OnClick="gAgencies_Delete" />
            </Columns>
        </Rock:Grid>

    </ContentTemplate>
</asp:UpdatePanel>
```

## Code (ReferralAgencyList.ascx.cs)

In the `OnInit` method we will:

- Check the viewer's EDIT authorization.
- If authorized to edit, enable the Add button on the grid and the row's' delete item button.
- Register grid filter event handlers for when the `Apply `button is pressed and for when the grid filter summary is being built.
- Tell the grid which key/identifier property to use from the row's item.
- Tell the grid the friendly name of the items that will be displaying.
- Bind the agency types and campuses in the filter.
```
protected override void OnInit( EventArgs e )
{
    base.OnInit( e );

    bool canEdit = IsUserAuthorized( Rock.Security.Authorization.EDIT );

    gfSettings.ApplyFilterClick += gfSettings_ApplyFilterClick;
    gfSettings.DisplayFilterValue += gfSettings_DisplayFilterValue;

    gAgencies.Actions.ShowAdd = canEdit;
    gAgencies.IsDeleteEnabled = canEdit;
    gAgencies.Actions.AddClick += gAgencies_Add;
    
    gAgencies.RowItemText = "Agency";
    gAgencies.DataKeyNames = new string[] { "id" };
    
    BindFilter();
}
```

The `BindFilter()` method binds the campuses to the CampusPicker control and the agency type drop-down list to our `REFERRAL_AGENCY_TYPE`.

```
private void BindFilter()
{
    var campuses = CampusCache.All();
    cpCampus.Campuses = campuses;
    cpCampus.Visible = campuses.Any();

    var definedType = DefinedTypeCache.Get( org.rocksolidchurch.SampleProject.SystemGuid.DefinedType.REFERRAL_AGENCY_TYPE.AsGuid() );
    if ( definedType != null )
    {
        dvpAgencyType.DefinedTypeId = definedType.Id;
    }
}
```

The `OnLoad` method uses any previously saved filter settings to select the correct filter items before it calls a `BindGrid()` method.

```
protected override void OnLoad( EventArgs e )
{
    base.OnLoad( e );

    if ( !Page.IsPostBack )
    {
        var preferences = GetBlockPersonPreferences();
        cpCampus.SetValue( preferences.GetValue( "Campus" ).AsIntegerOrNull() );
        dvpAgencyType.SelectedValue = preferences.GetValue( "Agency Type" );

        BindGrid();
    }
}
```

Our `BindGrid()` method uses our ReferralAgencyService to fetch the agencies and the grid filter settings to intelligently exclude any that don't match our filter. It also sorts the data using any sort option set on the grid by the viewer.

```
private void BindGrid()
{
    var service = new ReferralAgencyService( new RockContext() );
    SortProperty sortProperty = gAgencies.SortProperty;

    var query = service.Queryable( "Campus,AgencyTypeValue" );
    
    var preferences = GetBlockPersonPreferences();
    int? campusId = preferences.GetValue( "Campus" ).AsIntegerOrNull();
    if ( campusId.HasValue )
    {
        query = query.Where( a => a.CampusId == campusId.Value );
    }

    int? definedValueId = preferences.GetValue( "Agency Type" ).AsIntegerOrNull();
    if ( definedValueId.HasValue )
    {
        query = query.Where( a => a.AgencyTypeValueId == definedValueId.Value );
    }

    // Sort results
    if ( sortProperty != null )
    {
        gAgencies.DataSource = query.Sort( sortProperty ).ToList();
    }
    else
    {
        gAgencies.DataSource = query.OrderBy( a => a.Name ).ToList();
    }

    gAgencies.DataBind();
}
```

We'll implement the `gfSettings_ApplyFilterClick` handler to save the user's filter preferences when they press the Apply button in the filter before calling `BindGrid()`.

```
protected void gfSettings_ApplyFilterClick( object sender, EventArgs e )
{
    gfSettings.SetFilterPreference( "Campus", ( cpCampus.SelectedCampusId != null ?
        cpCampus.SelectedCampusId.Value.ToString() : string.Empty ) );
    gfSettings.SetFilterPreference( "Agency Type", dvpAgencyType.SelectedValue );

    BindGrid();
}
```

You wouldn't want the filter summary to show you're currently filtering on agency type "3", right? For this reason, it's the job of the `gfSettings_DisplayFilterValue` handler to turn the selected id for each filter item into a user readable "name".

```
protected void gfSettings_DisplayFilterValue( object sender, GridFilter.DisplayFilterValueArgs e )
{
    switch ( e.Key )
    {
        case "Campus":
            {
                if ( !string.IsNullOrWhiteSpace( e.Value ) )
                {
                    e.Value = CampusCache.Get( int.Parse( e.Value ) ).Name;
                }
                break;
            }

        case "Agency Type":
            {
                var preferences = GetBlockPersonPreferences();
                int? valueId = preferences.GetValue( "Agency Type" ).AsIntegerOrNull();
                if ( valueId.HasValue )
                {
                    var definedValue = DefinedValueCache.Get( valueId.Value );
                    if ( definedValue != null )
                    {
                        e.Value = definedValue.Value;
                    }
                }
                break;
            }

        default:
            {
                e.Value = string.Empty;
                break;
            }
    }
}
```

The `gAgencies_Add` and `gAgencies_Edit` methods are similar except we'll pass a "0" to the detail page when we're about to add a new agency and we'll pass the selected row's agency Id to edit an existing agency.

```
protected void gAgencies_Add( object sender, EventArgs e )
{
    NavigateToDetailPage( 0 );
}

protected void gAgencies_Edit( object sender, RowEventArgs e )
{
    NavigateToDetailPage( e.RowKeyId );
}
```

Our `NavigateToDetailPage` method will build an appropriate querystring and then navigate to the detail page. The detail page is determined by the LinkedPage block attribute we named "DetailPage".

```
private void NavigateToDetailPage( int referralAgencyId )
{
    var preferences = GetBlockPersonPreferences();
    var queryParams = new Dictionary<string, string>();
    queryParams.Add( "referralAgencyId", referralAgencyId.ToString() );
    queryParams.Add( "campusId", preferences.GetValue( "Campus" ) );
    queryParams.Add( "agencyTypeId", preferences.GetValue( "Agency Type" ) );
    NavigateToLinkedPage( "DetailPage", queryParams );
}
```

We're almost done! The `gAgencies_Delete` handler will check the selected agency to verify we can delete it and show a warning if we can't. Otherwise it uses a database context and our ReferralAgencyService once again but this time to delete and save the changes. After saving, we'll rebind the grid to reflect the change.

```
protected void gAgencies_Delete( object sender, RowEventArgs e )
{
    var dataContext = new RockContext();
    var service = new ReferralAgencyService( dataContext );
    var referralAgency = service.Get( (int)e.RowKeyValue );
    if ( referralAgency != null )
    {
        string errorMessage;
        if ( !service.CanDelete( referralAgency, out errorMessage ) )
        {
            mdGridWarning.Show( errorMessage, ModalAlertType.Information );
            return;
        }

        service.Delete( referralAgency );
        dataContext.SaveChanges();
    }

    BindGrid();
}
```

All we have to do for our `gAgencies_GridRebind` handler is rebind the data to the grid.

```
protected void gAgencies_GridRebind( object sender, EventArgs e )
{
    BindGrid();
}
```

## Step 6 - Page and Block Setup

The last thing we'll do is add two pages where we can see the list of all agencies and the details for a selected (or new) agency.

1. Add a new page under your favorite test-menu-page and call it "Referral Agencies".
2. Under it, add a child page called "Referral Agency Details".
3. Add the ReferralAgencyDetail block to this Referral Agency Details page.
4. Add the ReferralAgencyList block back on the Referral Agencies parent page.
5. Configure this ReferralAgencyList block instance. Set the LinkedPage to the Referral Agency Details page.
6. Don't try to load the block yet- you may need to include a migration that we'll cover in the next section to avoid getting an exception

This is a very common parent-child page pattern in Rock. It makes the navigation between list and detail a predictable and easy thing to code using the `NavigateToParentPage()` method.

Tip

The code for this chapter is already in your Rockit SDK. You're welcome. :)

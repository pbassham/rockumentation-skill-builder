---
description: "Use when implementing role-based UI visibility in Rock blocks, such as showing Add buttons only to users with Edit authorization"
source: "https://community.rockrms.com/developer/quickstart-tutorials"
sourceLabel: Quickstart Tutorials
---
> **Path:** 

Sometimes you want to show certain features only to certain people or people with a certain role. Let's add a standard Add button to the bottom of the grid that only shows up for people who are authorized with "Edit" rights to our block.

![Enabled Add button on grid](https://community.rockrms.com/GetImage.ashx?Id=67484)

## Step 1 - Check the user's authorization

Use the `IsUserAuthorized()` method by passing it the name of an action. That method returns true if the person viewing the block is authorized for that action. When true, we'll set the grid's Action bar to show the Add button.

Add the `using Rock.Security;` in the top section of your block to get access to the Authorization class and add the authorization check to the `OnInit` method like this:

```
using Rock.Security;
// ...
protected override void OnInit( EventArgs e )
{
    base.OnInit( e );
    
    if ( IsUserAuthorized( Authorization.EDIT ) )
    {
        gPeople.Actions.ShowAdd = true;
    }
    
    // ...
```

Note

If it makes more sense for the authorization check to be based on the page where the block lives, you can do a page authorization check like this:

```
var currentPage = Rock.Web.Cache.PageCache.Read( RockPage.PageId );
currentPage.IsAuthorized( Authorization.EDIT, CurrentPerson );
```

## Step 2 - Handle the button click

Let's wrap this up by handling the click action for your new Add button. We'll register a click handler called `gPeople_Add`in the `OnInit()` method and then create the handler method in the appropriate code region.

```
protected override void OnInit( EventArgs e )
{
    base.OnInit( e );

    if ( IsUserAuthorized( Authorization.EDIT ) )
    {
        gPeople.Actions.ShowAdd = true;
        gPeople.Actions.AddClick += gPeople_Add;
    }
    
    // ...
    
}

protected void gPeople_Add( object sender, EventArgs e )
{
    Response.Redirect( "~/NewFamily/" );
    
    // prevents .NET from quietly throwing ThreadAbortException
    Context.ApplicationInstance.CompleteRequest();
    return;
}
```

Once again, we can rely on a built-in named route used for adding new people/families.

Note

For information about using "Page\_Load (OnLoad) vs OnInit" read the Performance Considerations in the Blocks documentation.

## Step 3 - Code cleanup

For best practice sake, let's move our grid data binding code into it's own method called `BindGrid()`. This will set us up for one more little improvement we'll cover in the next step.

```
protected override void OnLoad( EventArgs e )
{
    base.OnLoad( e );

    if ( !Page.IsPostBack )
    {
        BindGrid();
    }
}

// ...

protected void BindGrid()
{
    var genderValue = GetAttributeValue( "GenderFilter" );

    var query = new PersonService( new RockContext() ).Queryable();

    if ( !string.IsNullOrEmpty( genderValue ) )
    {
        Gender gender = genderValue.ConvertToEnum<Gender>();
        query = query.Where( p => p.Gender == gender );
    }

    gPeople.DataSource = query.ToList();
    gPeople.DataBind();
}
```

## Step 4 - That little improvement

Have you noticed that you've had to reload the page after you change a block property in order to see it take effect? Let's fix that so the grid refreshes immediately when the property changes.

The Stark block you started with comes with the necessary event handlers that allows you do something when the block's properties change. You may have even seen those extra lines in the `OnInit` method and an empty `Block_BlockUpdated()` code block. This `Block_BlockUpdated()` method is being called but it won't do anything until you add some appropriate code.

Now that we moved our data binding code to its own `BindGrid()` method, we can call it in `Block_BlockUpdated()` like this:.

```
protected void Block_BlockUpdated( object sender, EventArgs e )
{
    BindGrid();
}
```

Now go and change the gender setting and watch the magic.

Tip

  It's a best practice to handle the BlockUpdated event intelligently whenever possible.  

Here is the final, complete code:

```
using System;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;

using Rock;
using Rock.Data;
using Rock.Model;
using Rock.Web.Cache;
using Rock.Web.UI.Controls;
using Rock.Attribute;
using Rock.Security;

namespace RockWeb.Plugins.org_rocksolidchurch.Tutorials
{
    /// <summary>
    /// Template block for developers to use to start a new block.
    /// </summary>
    [DisplayName( "Hello World Fetching Data" )]
    [Category( "rocksolidchurch > Tutorials" )]
    [Description( "A simple block to fetch some data from Rock." )]

    [CustomRadioListField( "Gender Filter", "Select in order to list only records for that gender",
         "1^Male,2^Female", required: false )]
    [LinkedPage( "Related Page" )]
    public partial class HelloWorldFetchingData : Rock.Web.UI.RockBlock
    {
        protected override void OnInit( EventArgs e )
        {
            base.OnInit( e );

            if ( IsUserAuthorized( Authorization.EDIT ) )
            {
                gPeople.Actions.ShowAdd = true;
                gPeople.Actions.AddClick += gPeople_Add;
            }

            // This event gets fired after block settings are updated.
            this.BlockUpdated += Block_BlockUpdated;
            this.AddConfigurationUpdateTrigger( upnlContent );
        }

        protected override void OnLoad( EventArgs e )
        {
            base.OnLoad( e );

            if ( !Page.IsPostBack )
            {
                BindGrid();
            }
        }

        protected void Block_BlockUpdated( object sender, EventArgs e )
        {
            BindGrid();
        }

        protected void gPeople_Add( object sender, EventArgs e )
        {
            Response.Redirect( "~/NewFamily/" );
            
            // prevents .NET from quietly throwing ThreadAbortException
            Context.ApplicationInstance.CompleteRequest();
            return;
        }

        protected void gPeople_RowSelected( object sender, RowEventArgs e )
        {
            NavigateToLinkedPage( "RelatedPage", "PersonId", (int)e.RowKeyValues["Id"] );
        }

        protected void BindGrid()
        {
            var genderValue = GetAttributeValue( "GenderFilter" );

            var query = new PersonService( new RockContext() ).Queryable();

            if ( !string.IsNullOrEmpty( genderValue ) )
            {
                Gender gender = genderValue.ConvertToEnum<Gender>();
                query = query.Where( p => p.Gender == gender );
            }

            gPeople.DataSource = query.ToList();
            gPeople.DataBind();
        }
    }
}
```

Tip

  The code for this section can be downloaded right from Github.

---

## Appendix {#appendix}

# Appendix

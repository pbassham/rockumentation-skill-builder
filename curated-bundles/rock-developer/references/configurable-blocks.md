---
description: Use when developer needs to add configurable block attributes to customize block behavior through Rock's admin interface
source: "https://community.rockrms.com/developer/quickstart-tutorials"
sourceLabel: Quickstart Tutorials
---
> **Path:** 

You're making great progress. Now let's continue with the previous tutorial and show you how to make the block configurable using Block Attributes.

## Reviewing Your Options

The grid we created might list thousands of records. Perhaps we should limit it to include only males? You could hardcode that logic into a `Where` clause like this:

```
var items = new PersonService( new RockContext() ).Queryable()
    .Where( p => p.Gender == Gender.Male ).ToList();
```

However, it would be smarter to make the gender choice a configurable setting. This is where Block Attributes come in handy. They are one of Rock's amazingly powerful features.

Let's see how easy it is to add a configuration setting to the block.

## Step 1 - Add an Attribute

Edit the HelloWorldFetchingData.ascx.cs file and add a CustomRadioListField attribute just above the class definition like this:

```
using Rock.Attribute;

// ...

[CustomRadioListField( "Gender Filter", "Select in order to list only records for that gender",
     "1^Male,2^Female", required: false )]
public partial class HelloWorldFetchingData : Rock.Web.UI.RockBlock
{
    //...
```

Note

The using Rock.Attribute; gives you access to all kinds of different block attributes in Rock.  

Adding the CustomRadioListField allows the administrator to optionally pick either Male or Female in the block property settings. It's optional because we've set the 'required' parameter to false.

In a few minutes once you're done and the block is on a page, you can access these settings by clicking the  (Block Configuration) button in the Admin Toolbar followed by the  (Block Properties) button from the block's fly-out menu.

![HelloWorldFetchingData.ascx](https://community.rockrms.com/GetImage.ashx?Id=67480)

But first let's continue and write the code that fetches that value set by the administrator.

## Step 2 - Get and Use the Attribute Value

Fetch the selected gender value using Rock's `GetAttributeValue()` method by passing it the attribute's key, `GenderFilter`. The key is just the attribute name with all spaces removed.

```
protected override void OnLoad( EventArgs e )
{
    base.OnLoad( e );

    if ( !Page.IsPostBack )
    {
        var genderValue = GetAttributeValue( "GenderFilter" );
```

Now use the value to limit the query. Let's change our variables a bit so we only perform the `Where()` clause when the administrator actually selected a particular gender. Then call the `ToList()` method last, right as we're setting it to the grid's data-source.

```
var query = new PersonService( new RockContext() ).Queryable();

if ( ! string.IsNullOrEmpty( genderValue ) )
{
    Gender gender = genderValue.ConvertToEnum<Gender>();
    query = query.Where( p => p.Gender == gender );
}

gPeople.DataSource = query.ToList();
gPeople.DataBind();
```

Note

Notice the use of the handy ConvertToEnum() extension method to convert our 1 and 2 string values into a proper Gender enumeration? The using Rock; gives you access to many useful extension methods we've created for you.  

## Final Code

When finished, your entire \*.cs file should look something like this:

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
    public partial class HelloWorldFetchingData : Rock.Web.UI.RockBlock
    {
        #region Base Control Methods

        /// <summary>
        /// Raises the <see cref="E:System.Web.UI.Control.Load" /> event.
        /// </summary>
        /// <param name="e">The <see cref="T:System.EventArgs" /> object that contains the event data.</param>
        protected override void OnLoad( EventArgs e )
        {
            base.OnLoad( e );

            if ( !Page.IsPostBack )
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

        #endregion
    }
}
```

Depending how you set the block property, you'll see different results.

When the block property is set to male you'll see only the men:

![Gender block property set to Male](https://community.rockrms.com/GetImage.ashx?Id=67481)

...and only women when the block property is set to female:

![Gender block property set to Female](https://community.rockrms.com/GetImage.ashx?Id=67482)

Tip

The code for this section can be downloaded right from Github.

---
description: "Use when building a Rock block that fetches and displays data from the Rock database, such as listing records in a grid"
source: "https://community.rockrms.com/developer/quickstart-tutorials"
sourceLabel: Quickstart Tutorials
---
> **Path:** 

Now that you've seen your code run in Rock, let's actually fetch some existing data from Rock. We're going to build a block that lists all the names of everyone in the database.

**A block that fetches data**

![](https://community.rockrms.com/GetImage.ashx?Id=67477)

## Step 1 - Copy Sample Block

Let's create a new block but this time let's save some time by starting with the example Stark block that comes shipped with Rock.

Create a new `Tutorials` folder in RockWeb\\Plugins\\org\_rocksolidchurch\\ and copy the StarkDetail.ascx file (along with its .ascx.cs file) from the RockWeb\\Blocks\\Utility\\ into it. Rename the StarkDetail.ascx file `HelloWorldFetchingData`.

Tip

We're using a "Tutorials" folder to keep our related code blocks nice and organized. It's a good idea to organize your associated blocks together in a common folder and project name.

## Step 2 - Update classname/namespace

Now let's make this our own. We need to edit the classname and namespaces so that our code does not collide with any other existing code. Edit the HelloWorldFetchingData.ascx file and change the `Inherits="RockWeb.Blocks.Utility.StarkDetail"` to `Inherits="RockWeb.Plugins.org_rocksolidchurch.Tutorials.HelloWorldFetchingData"`, remembering to replace org\_rocksolidchurch with our own organization's namespace.

![HelloWorldFetchingData.ascx](https://community.rockrms.com/GetImage.ashx?Id=67478)

Similarly, update the namespace in the HelloWorldFetchingData.ascx.cs from `RockWeb.Blocks.Utility` to `RockWeb.Plugins.org_rocksolidchurch.Tutorials` and update the class name from `StarkDetail` to `HelloWorldFetchingData`.

You'll also need to ensure that the code has the following `using` statements:

- `using System;`
- `using System.ComponentModel;`
- `using System.Linq;`
- `using System.Web.UI;`
- `using System.Web.UI.WebControls;`
- `using Rock.Data;`
- `using Rock.Model;`
- `using Rock.Attribute;`

You probably noticed the three lines just above the class definition called DisplayName, Category, and Description. These class decorator attributes are used to organize the list of blocks in Rock. Set the DisplayName with an appropriate name for your block and the Category using the convention of "OrganizationName \> Project". Don't forget to include a concise explanation of the block in the Description field too.

![HelloWorldFetchingData.ascx.cs](https://community.rockrms.com/GetImage.ashx?Id=67479)

## Step 3 - Markup

We need a place to put all those names we're about to fetch. The Rock:Grid is a perfect UI control for this sort of thing. Edit the markup in the HelloWorldFetchingData.ascx and replace the `<ContentTemplate>` section with this:

```
<ContentTemplate>

    <Rock:Grid ID="gPeople" runat="server" AllowSorting="true">
        <Columns>
            <asp:BoundField DataField="FirstName" HeaderText="First Name" />
            <asp:BoundField DataField="LastName" HeaderText="Last Name" />
        </Columns>
    </Rock:Grid>

</ContentTemplate>
```

That's a grid with two columns. One for the person's first name and one for their last name.

## Step 4 - Code

Now we can add code to go and fetch the people data. We'll use Rock's `PersonService()` class to get all people, and then bind it to the data-source of our grid. Edit the code in `HelloWorldFetchingData.ascx.cs`. Find the `OnLoad()` Base Control Method. Replace it with the following code:

```
protected override void OnLoad( EventArgs e )
{
    base.OnLoad( e );

    if ( !Page.IsPostBack )
    {
        var items = new PersonService( new RockContext() ).Queryable().ToList();
        gPeople.DataSource = items;
        gPeople.DataBind();
    }
}
```

## Step 5 - Go Look

Press `F5 `in Visual Studio to start Rock then add the block to a page just like you did in the first tutorial. You should see a simple grid listing all the people in your database.

![The results](https://rockrms.blob.core.windows.net/documentation/Books/19/1.3.0/images/fetching-data-person-results.png)

Important

Don't see anyone listed? Try adding some fake people data to your database. Use the Sample Data block found under Admin Tools \> Power Tools.

Note

The code for this section can be downloaded right from Github.

---

## Blocks {#blocks}

# Blocks

---
description: Use when implementing clickable grid rows to navigate to related entity details pages with event handlers and linked page properties
source: "https://community.rockrms.com/developer/quickstart-tutorials"
sourceLabel: Quickstart Tutorials
---
> **Path:** 

It would be nice if our block would take you to the person's details when you click a name, right? Let's make that happen.

## Step 1 - Add an event handler to the grid

First we'll set an event handler named `gPeople_RowSelected` for the `OnRowSelected` property of the grid. We also need to let the grid know that the `Id` property of an item in the grid represents the key/identifier for the item in each row. We do this by adding `DataKeyNames="Id"` to the grid's markup. We'll use the key value when we handle the OnRowSelected event in our code.

```
<Rock:Grid ID="gPeople" runat="server" AllowSorting="true"
    OnRowSelected="gPeople_RowSelected" DataKeyNames="Id">
```

## Step 2 - Handle that event in code

Now we can write code to do something when a particular row is clicked. Since Rock already has a page with a named route "~/Person/{0}" for viewing a person's details, all we need to do is take the person's Id (for the selected row's key) and redirect to the route.

Edit the \*.cs file and add this event handler:

```
protected void gPeople_RowSelected( object sender, RowEventArgs e )
{
    int personId = (int)e.RowKeyValues["Id"];
    Response.Redirect( string.Format( "~/Person/{0}", personId ), false );

    // prevents .NET from quietly throwing ThreadAbortException
    Context.ApplicationInstance.CompleteRequest();
    return;
}
```

That's all there is to it!

That was a bit too easy. What will you do when there is no named route available? Let's try a different, configuration based approach for those cases. Yep, you guessed it. Another block property attribute to the rescue.

## Step 2 redux - Use a LinkedPage block property

It's a common situation to link your block to another page where a related block lives. By adding the LinkedPage attribute to your block, the administrator can wire up your block to the page of their choosing.

```
[LinkedPage( "Related Page" ) ]
```

![LinkedPage block property](https://community.rockrms.com/GetImage.ashx?Id=67483)

The string "Related Page" is the attribute name and its key is just "RelatedPage".

Change your `gPeople_RowSelected` handler to call the special `NavigateToLinkedPage()` method and pass in the attribute key that has the linked page, the name of a query string parameter and the value for that parameter. Since we're expecting the admin to link the block to the Person Profile page, we'll use the `PersonId` as the parameter and the person's Id will be the parameter value.

Our code would look like this:

```
protected void gPeople_RowSelected( object sender, RowEventArgs e )
{
    NavigateToLinkedPage( "RelatedPage", "PersonId", (int)e.RowKeyValues["Id"] );
}
```

Rock will automatically build a redirect link in the form of .../Page/\[id-of-related-page\]?PersonId=\[id-of-selected-person\] (E.g. http://rock.rocksolidchurchdemo.com/page/93?PersonId=2)

And yes, I tricked you because this new event handler code is even easier than the previous code.

Note

The code for this section can be downloaded right from Github.

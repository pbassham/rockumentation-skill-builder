---
description: "Use when implementing security checks in Rock blocks to authorize user actions like View, Edit, and Administrate"
source: "https://community.rockrms.com/developer/101---launchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

A block need not worry about hiding itself if a user shouldn't be allowed to view it. The page framework handles that. However, it does have to check security for other situations. Thankfully securing functionality access within your block is easy to do.

To test whether the current user is allowed to perform a certain action, use the `IsUserAuthorized (string action)` method where action is one of "View", "Edit", or "Administrate".

Consider a block that might allow the user to edit some content. Before it allows this, or even shows the edit button, it should use the `IsUserAuthorized( *Rock.Security.Authorization.EDIT* )`method. Consider this example:

```
if ( IsUserAuthorized(Authorization.EDIT ) || IsUserAuthorized( Authorization.ADMINISTRATE ) )
{
    rGrid.Actions.ShowAdd = true;
    // ...
}
else
{
    message = "You are not allowed to edit this content.";
}
```

Since the `IsUserAuthorized(...)` method is also available on many securable entities in Rock besides Blocks, it can be called to check for authorization against a particular entity. Consider this example where authorization is being checked for a particular group in addition checking general block security:

```
// user must have EDIT to both the Block and the group
if ( IsUserAuthorized( Authorization.EDIT ) && 
        group.IsAuthorized( Authorization.EDIT, this.CurrentPerson ) )
{
   grid.Actions.ShowAdd = true;
}
```

Did you notice how we called our "group" object's `IsAuthorized()` method too?

Note

You will need to include `using Rock.Security;` in your block. Once you do this, you can then use the `IsUserAuthorized( string action )` method to verify user authorization.  

Here are the standard security actions and their meanings:

**Standard security action names**

| Name | Description |
| --- | --- |
| View | Grants the ability to view the item's public properties. |
| Edit | Includes view access and the ability to change the item's name and other properties. |
| Administrate | This means the block's security and block's settings can be changed. |
| Approve | Authorization to approve the item (html, prayer, ads, etc). |

If you need to define additional action names to control your custom functionality, you can simply decorate your block with `[SecurityAction(...)]` like this:

```
[SecurityAction( "Cancel", "The roles and/or users that have access to cancel existing orders." )]
```

This will also cause Rock to include your new action in the Block Security settings window so you can allow or deny particular roles or users to the action.

**Block Security modal popup showing a custom "Cancel" action.**

![](https://community.rockrms.com/GetImage.ashx?Id=67442)

---

## Validation {#validation}

When validating a user's input, you'll need to provide some feedback to let them know when they've entered something incorrectly. Use a ValidationSummary control at the top of an edit panel with the Bootstrap standard “alert alert-danger” CSS classes:

```
<asp:ValidationSummary ID="ValidationSummary1" runat="server" CssClass="alert alert-danger" />
```

The RockBlock base class automatically adds a ValidationGroup property unique to each block instance for any RockControls, Validators, ValidationSummary controls, and Buttons that you have on your block. If one of these has already had a ValidationGroup declared, the RockBlock will update it so that it is prefixed with its unique ValidationGroup name.

Because of this, you should only need to add a ValidationGroup to any areas of your block that are validated separately from the main block (i.e. Modal Dialogs, or Panels that are shown and hidden).

Note

See the GroupTypeDetail block for a good example of how to use validation group for modal dialogs.

Also, while the ASP.NET validators will perform client-side validation, any validation done by Entity Framework (i.e. data annotations and the DataValidator used by the DataTextBox, and DataDropDownList controls) is only done server-side. So if you are validating input from a ModalDialog, you may need keep that dialog shown through a postback so that the validation summary can be displayed to the user.

## Preventing Validation

You can prevent a button, link, etc. from causing validation by setting the CausesValidation property to false:

```
<asp:LinkButton ID="btnCancel" runat="server" Text="Cancel"
   CssClass="btn btn-link" CausesValidation="false" OnClick="btnCancel_Click" />
```

You'll usually want to do this on cancel buttons, etc.

## Custom Validation Group

If you need to add your own custom validators on controls, you should set the `ValidationGroup` property on the `ValidationSummary` control and then use that group name in controls on your block:

```
<asp:ValidationSummary ID="valSearchOrganization" runat="server" ValidationGroup="SearchOrg"
    HeaderText="Please Correct the Following" CssClass="alert alert-danger block-message error" />

<Rock:RockTextBox ID="tbSearchPostalCode" runat="server"
    Label="Zip/Postal Code" Required="true" 
    RequiredErrorMessage="Enter a zip or postal code to search"
    ValidationGroup="SearchOrg" />
    
<asp:RegularExpressionValidator ID="regSearchPostalCode" runat="server"
    ErrorMessage="Enter at least 4 characters" ControlToValidate="tbSearchPostalCode"
    ValidationGroup="SearchOrg" ValidationExpression="\w{4,12}" 
    CssClass="validation-error" Display="None" />
...
<div class="actions">
    <asp:LinkButton ID="lbSearch" runat="server" Text="Search" CssClass="btn btn-primary" OnClick="lbSearch_Click" ValidationGroup="SearchOrg" />
</div>
```

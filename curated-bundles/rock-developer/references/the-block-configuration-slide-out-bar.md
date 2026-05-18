---
description: Use when implementing custom edit buttons or configuration controls in the Rock block slide-out bar
source: "https://community.rockrms.com/developer/101\u002D\u002D\u002Dlaunchpad"
sourceLabel: 101 — Launchpad
---
> **Path:** 

## Your Own Edit Button

To use the edit button in the slide-out bar that opens when you click on the Block Configuration toolbar you can extend the `RockBlockCustomSettings` class instead of the usual `RockBlock` class. Once you do this, you only need to override and implement your own `ShowSettings()` method. That method will be called by Rock when a person with edit access clicks the edit button.

**The Side-Out Bar**

![](https://community.rockrms.com/GetImage.ashx?Id=67446)

1\. **Slide-Out Bar** - Shows a custom edit icon element added into the slide-out bar.

This example code from the DynamicReport block illustrates the concept. Here the block loads some data, binds some filters and then calls the `Show()` method of a model where all the custom stuff exists.

```
protected override void ShowSettings()
{
    pnlConfigure.Visible = true;
    LoadDropDowns();
    ddlReport.SetValue( this.GetAttributeValue( "Report" ).AsGuidOrNull() );
    txtResultsTitle.Text = this.GetAttributeValue( "ResultsTitle" );
    txtResultsIconCssClass.Text = this.GetAttributeValue( "ResultsIconCssClass" );
    txtFilterTitle.Text = this.GetAttributeValue( "FilterTitle" );
    txtFilterIconCssClass.Text = this.GetAttributeValue( "FilterIconCssClass" );
    BindDataFiltersGrid( false );
    ddlPersonIdField.SetValue( this.GetAttributeValue( "PersonIdField" ) );
    mdConfigure.Show();
}
```

Additionally, any block property you've given a category of CustomSetting will be hidden in the normal block settings. This is handy when you want to do something beyond the basics provided by the normal block settings area.

## I Need More Control, Captain!

If you need more than a single edit pencil button, you can insert your own controls into the slide-out bar by overriding the `GetAdministrateControls()` method. This is exactly how the `RockBlockCustomSettings` class did it to get an edit button in the slide-out bar for you in the simple case.

This example code from a block illustrates the details:

```
public override List<control> GetAdministrateControls( bool canConfig, bool canEdit )
{
    List<control> configControls = new List<control>();
    // add edit icon to config controls if user has edit permission
    if ( canConfig || canEdit )
    {
        LinkButton lbEdit = new LinkButton();
        lbEdit.CssClass = "edit";
        lbEdit.ToolTip = "Edit HTML";
        lbEdit.Click += new EventHandler( lbEdit_Click );
        configControls.Add( lbEdit );
        HtmlGenericControl iEdit = new HtmlGenericControl( "i" );
        lbEdit.Controls.Add( iEdit );
        lbEdit.CausesValidation = false;
        iEdit.Attributes.Add("class", "fa fa-pencil-square-o");
        ScriptManager.GetCurrent( this.Page ).RegisterAsyncPostBackControl( lbEdit );
    }
    configControls.AddRange( base.GetAdministrateControls( canConfig, canEdit ) );
    return configControls;
}
```

In a nutshell, here's what's going on:

1. Create an empty list of controls.
2. Use the canConfig and canEdit boolean flags to decide if you want to add your items.
3. Create an appropriate control with an event handler.
4. Add it to the list of controls.
5. Register the control with the script manager.
6. IMPORTANT: add the standard set of controls by calling the base.GetAdministrateControls() method (unless you decide it's not appropriate for your block).
7. Return the list of controls.

That's all there is to it -- well, almost. You still have to write the code to actually do something when someone clicks the button you've added. In the example above, you would need to implement the `lbEdit_Click()` method.

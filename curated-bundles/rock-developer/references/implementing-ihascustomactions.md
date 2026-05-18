---
description: Use when implementing custom configuration settings for Rock blocks using the IHasCustomActions interface
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

## Overview

If your block needs special configuration settings (similar to the webforms `RockBlockCustomSettings` class use to provide), you'll want to implement the `IHasCustomActions` interface and create a separate .obs file to handle displaying the configuration screen. 

![](https://community.rockrms.com/GetImage.ashx?Id=73761)

![Example from the Universal Search Configuration](https://community.rockrms.com/GetImage.ashx?Id=73760)

Implement a IHasCustomActions.GetCustomActions(...) method similar to this straightforward example, replacing the ComponentFileUrl with the location of your custom .obs template:

```
#region IHasCustomAdministrateActions

/// <inheritdoc/>
List<BlockCustomActionBag> IHasCustomActions.GetCustomActions( bool canEdit, bool canAdministrate )
{
    var actions = new List<BlockCustomActionBag>();

    if ( canAdministrate )
    {
        actions.Add( new BlockCustomActionBag
        {
            IconCssClass = "ti ti-edit",
            Tooltip = "Settings",
            ComponentFileUrl = "/Obsidian/Blocks/CMS/contentCollectionViewCustomSettings.obs"
        } );
    }

    return actions;
}

#endregion
```

You'll also want the block actions for `GetCustomSettings()` and `SaveCustomSettings(...)` as seen here:

```
/// <summary>
/// Gets the values and all other required details that will be needed
/// to display the custom settings modal.
/// </summary>
/// <returns>A box that contains the custom settings values and additional data.</returns>
[BlockAction]
public BlockActionResult GetCustomSettings()
{
    ...
}

/// <summary>
/// Saves the updates to the custom setting values for this block.
/// </summary>
/// <param name="box">The box that contains the setting values.</param>
/// <returns>A response that indicates if the save was successful or not.</returns>
[BlockAction]
public BlockActionResult SaveCustomSettings( CustomSettingsBox<CustomSettingsBag, CustomSettingsOptionsBag> box )
{
    ...
}
```

> **Path:** Developer Codex > Coding Standards > JavaScript

# JavaScript

Write JavaScript so that multiple instances of the block can co-operate on a single page.

When writing a large amount of JavaScript for a library or a specific component (i.e., assetManager.js) put it into an appropriate folder under RockWeb\\Scripts\\Rock\\. The files under the Controls folder are put into the “RockUi” bundle, files under the Extensions folder are put into the “RockLibs” bundle, and these bundles are cached on the client.

Add unbundled or individual JavaScript files into a block using the AddScriptLink like this:

```javascript
RockPage.AddScriptLink( "~/Scripts/jquery.signalR-2.2.0.min.js", fingerprint: false );
RockPage.AddScriptLink( "~/Scripts/Chartjs/Chart.js", true );
```

When JavaScript is needed in a block, put it into the whenever possible similar to what is shown here.

Example 1:

```javascript
string script = string.Format( @"
new Clipboard('#{0}');
$('#{0}').tooltip();", btnCopyToClipboard.ClientID );
ScriptManager.RegisterStartupScript( btnCopyToClipboard, btnCopyToClipboard.GetType(), "share-copy_" + this.ClientID, script, true );
```

Example 2:

```javascript
var script = string.Format( @"
Rock.controls.bootstrapButton.onCompleted({0})", this.ClientID );
ScriptManager.RegisterStartupScript( this, this.GetType(), "BootstrapButton_" + this.ClientID, script, true );
```

If the script is not specific to an instance of the block and only one script is needed per page (regardless of how many instances of the block are on the page) then use the same key (i.e., rock-colorpicker) when calling RegisterStartupScript like this:

```javascript
string script = $@"$('.rock-colorpicker-input').colorpicker({{
colorSelectors: {definedValues.ToJson(Newtonsoft.Json.Formatting.Indented).Replace("\"","'")}
}});";
ScriptManager.RegisterStartupScript( this, this.GetType(), "rock-colorpicker", script, true );
```

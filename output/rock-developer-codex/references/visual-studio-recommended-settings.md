> **Path:** Developer Codex > Coding Standards > Tips, Tricks, and Recommendations > Visual Studio Recommended Settings

# Visual Studio Recommended Settings

To reduce the amount of time to load and debug Rock in Visual Studio. You should set ‘Enable Diagnostic Tools while debugging’ to false, ‘Show elapsed time PerfTip while debugging’ to false, and ‘Enable IntelliTrace’ (Only available in some versions of Visual Studio). In Rock’s case, these can noticeably slow things down due to the large number of database roundtrips that Rock does to setup Attributes. However, if you need these features to help troubleshoot a performance issue, they can be turned on as needed.

![](https://community.rockrms.com/GetImage.ashx?Id=66695)

To enable editing of a block’s source when RockWeb is running, **disable** ‘Edit and Continue’ (Yes, disable it to make it work!)

![](https://community.rockrms.com/GetImage.ashx?Id=66697)

To reduce the amount of time that it takes to Build Rock (either on startup of a debug session or when doing a Build Solution), right click on the RockWeb project and select ‘Property Pages’ from the context menu to change RockWeb’s build settings. Set ‘Before running startup page’ to ‘Build Page’ and turn off ‘Build Web site as part of solution’. This will speed up builds significantly, but you’ll want to manually build the RockWeb project once in a while to make sure all the blocks compile. Note that the ‘Build Page’ option will also build the currently active UserControl (Rock Block) that you are editing.

![](https://community.rockrms.com/GetImage.ashx?Id=66698)

If you often get Out of Memory exceptions when debugging Rock, it could be caused by "overlapping" debug sessions (you temporarily have multiple instances of Rock running because one app domain is still shutting down). To help prevent this, you can add a 'Terminate All' button to your Debug menu and use that to stop debugging instead of the ‘Stop Debugging’ button.

![](https://community.rockrms.com/GetImage.ashx?Id=66699)

![](https://community.rockrms.com/GetImage.ashx?Id=66701)

VS will automatically format pasted text by default. This can be a problem when creating migrations containing lava or other text that should be left alone. Ctrl+Z will undo the correction. Alternatively, VS can be configured to not format pasted text. Under Tools > Options > Text Editor uncheck “Automatically format on paste”.

![](https://community.rockrms.com/GetImage.ashx?Id=66702)

Also, set up IIS Express to run in 64bit mode. This will also reduce memory issues and most closely matches production (regular IIS runs in 64bit mode by default)

![](https://community.rockrms.com/GetImage.ashx?Id=66703)

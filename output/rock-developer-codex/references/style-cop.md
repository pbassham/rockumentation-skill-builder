> **Path:** Developer Codex > Coding Standards > Style Cop

# Style Cop

*StyleCop analyzes C# source code to enforce a set of style and consistency rules*

StyleCop is configured using a Setting.StyleCop configuration file that is part of your Rock repo.

![](https://community.rockrms.com/GetImage.ashx?Id=66665)

You can download the (classic) extension from Visual Studio.

![](https://community.rockrms.com/GetImage.ashx?Id=66666)

Once installed you can Run a full scan from **Tools> Run StyleCop** which may take some time and it will give you a lot of formatting warnings in your Error List window in Visual Studio since some files may not be directly related to the Core Rock code you are working with.

So it is recommended you run StyleCop on each document\\.cs file you are working with by right-clicking on a blank area in your file and running Style Cop.

![](https://community.rockrms.com/GetImage.ashx?Id=66667)

Alternatively you can bind a hot-key in Visual Studio to make the part of your development routine just like formatting your code.

So you can then press CTRL-K,CTRL-D to format your document then for example press CTRL-R,CTRL-C to run StyleCop on the current document.

To do this from Visual Studio go to **Tools > Options > Environment > Keyboard** search for **stylecop** and create and assignment for the EditorContextMenus.CodeWindow.RunStyleCop and assign the global hot key to it.

![](https://community.rockrms.com/GetImage.ashx?Id=66668)

An example of StyleCop warnings

![](https://community.rockrms.com/GetImage.ashx?Id=66669)

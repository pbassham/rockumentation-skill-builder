---
description: "Use when setting up or troubleshooting VS Code debugging for Obsidian development, including attaching debuggers to existing Chrome instances"
source: "https://community.rockrms.com/developer/obsidian"
sourceLabel: Obsidian
---
> **Path:** 

*Using VS Code's debugger with Obsidian, and setting up to attach it to an existing Chrome instance.*

## Running VS Code's Debugger

Visual Studio Code (VS Code) has some debugging tools built into it that are very similar to some of the developer tools built into your browser. By using these debugging tools, you gain access to breakpoints within the editor, making debugging that little bit easier.

To run the debug tools in VS Code for Obsidian code, make sure you have opened the `Rock.code-workspace` workspace in VS Code. The workspace will include configurations for debugging (among other things), so if you (1) click the `Run and Debug` icon on the action bar, then (2) click the dropdown to choose which debugger configuration to use, then click the green arrow to start running it.

![](https://community.rockrms.com/GetImage.ashx?Id=66759)

Start the debugger

There are currently 4 different configurations listed:

| Type | Description |
| --- | --- |
| Framework | Debug the base Obsidian project folder. Opens a new browser. |
| Framework (Attach) | Debug the base Obsidian project folder. Attaches the debugger to an existing browser. |
| Blocks | Debug the Obsidian Blocks project folder. Opens a new browser. |
| Blocks (Attach) | Debug the Obsidian Blocks project folder. Attaches the debugger to an existing browser. |

We currently need to have separate debuggers for the Obsidian Framework and for the Obsidian Blocks projects. In addition to needing to choose the project you're debugging, you can choose between starting a new browser and debugging there, or attaching to an existing browser with tabs already opened to their local Rock instance.

Note: attaching to an existing browser requires that the browser has been started with remote debugging on, which doesn't happen by default. There is a section below that describes how to set up your system so that it always starts Chrome with the remote debugger port open.

## Using the Debugger

To create breakpoints, click to the left of the line number of the line.

![](https://community.rockrms.com/GetImage.ashx?Id=66760)

In the sidebar and the bottom panel, you'll find familiar tools: in-scope variables, watch, call stack, loaded scripts, breakpoints, a console, and step controls.

![](https://community.rockrms.com/GetImage.ashx?Id=66761)

If you have questions about how any of these work, the best place to look is probably the [VS Code documentation](https://code.visualstudio.com/Docs/editor/debugging).

## Set Up Chrome for Remote Debugging

In order to run Chrome with the remote debugger port open, you need to edit the properties of the shortcut you use to open your browser. If you're running Windows 11, you can't directly edit the shortcut on your taskbar. Instead, you'll need to edit a different shortcut, run Chrome from that shortcut, then pin the open Chrome to the taskbar.

If your shortcut is on the desktop, jump to the paragraph right after the next picture. Otherwise, if your only non-taskbar shortcut(s) to Chrome is in the start menu, then you'll need to right-click on the shortcut and click "Open file location". If you're inside "All apps", you'll find that option under the "More" submenu.

![](https://community.rockrms.com/GetImage.ashx?Id=66762)

While viewing the folder or the desktop, right-click the shortcut and click Properties. On Windows 10, you can also do this to your taskbar shortcut if Chrome is closed and you Shift + Right-Click and then click Properties.

![](https://community.rockrms.com/GetImage.ashx?Id=66763)

Inside the properties window, open the "Shortcut" tab. Then, inside the `Target` box, append the following to the end: `--remote-debugging-port=9222 -- "%1"` (make sure to include the space at the front).

![Adding the remote debugging flag](https://community.rockrms.com/GetImage.ashx?Id=66764)

Click OK, and now when you run Chrome via that shortcut, you'll be able to attach remote debuggers to it. As mentioned earlier, once Chrome is running, you can pin it to your taskbar to have a taskbar shortcut that can start Chrome with these options.

---

## Obsidian {#obsidian}

![](https://community.rockrms.com/GetImage.ashx?Id=67317)

This documentation is primarily for the core developer team right now. Many sections refer to items and patterns that only apply to core development rather than plugins. However, some information is valid for both, such as the information on Grids, so it is being made available for public reading.

Please use your best judgement when translating this for plugin development purposes.

Important

This documentation is a work in progress and subject to change. Just because something is written about in here does not necessarily mean it is guaranteed to work the way it is described or even be implemented.

---

## Core Development Environment {#core-development-environment}

This page discusses things you should have configured in your environment for core development. Before you begin writing Obsidian code you will want to configure your development environment. Many things will be enforced by ESLint once it is enabled, but a few things you will want to configure in your editor.

### Visual Studio Code

VS Code provides a rich development experience for Obsidian. While you can't work with the entire Rock solution in Visual Studio Code, you can work with the two Obsidian projects there. This does provide some additional benefits as you can have the VS 2022 debugger running and still be able to build the Obsidian projects over in VS Code.

In the root folder of the repository is a file called `Rock.code-workspace`. This is roughly the equivalent of a solution file. When you open it for the first time it will recommend some extensions be installed. You will want those extensions. You'll also want to

You don't need to configure any custom settings in VS Code for formatting, such as spacing. All recommended settings will be placed in the workspace file so they automatically get applied when you open the workspace.

### Building

While there are full-build tasks, the normal way to handle building in VS Code is with the watch tasks. To get to these you can use the command pallet (CTRL+SHIFT+P) and the "Tasks: Run Task" command. You can then pick which build task you want. In this case, you probably want the "Watch All Obsidian" task. This will build Obsidian Controls and Obsidian Blocks and then watch for changes. Whenever a change is detected it will automatically start recompiling everything that depends on what you changed.

## Visual Studio 2019/2022

Warning

Visual Studio IDE should not be used for editing .obs files. This is older documentation from when both were supported. Only VS Code is supported now.

The following options should be enabled under `Tools > Options`.

- Enable ESLint under `Text Editor > JavaScript/TypeScript > Linting`.
- Set your Module Specifier Preference under `Text Editor > JavaScript/TypeScript > Formatting > General` to the value "Prefers using a non-relative import only if the relative import path would leave the package or project directory".
- Configure Spacing to match what is in the picture below under `Text Editor > JavaScript/TypeScript > Formatting > Spacing`:

![](https://community.rockrms.com/GetImage.ashx?Id=66758)

- Additionally, you may want to turn a setting off. Though not required, it makes it much easier to fix and continue with TypeScript projects. Under `Projects and Solutions > Web Projects` turn off "Stop debugger when browser window is closed, close browser when debugging stops". This allows you to stop debugging and build the TypeScript projects after making changes without having to perform a full restart of Rock.

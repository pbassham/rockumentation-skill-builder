> **Path:** Developer Codex > Coding Standards > Code Generator > Model Changes

# Model Changes

Any time you make a change to an existing model or create a new model, the code generator tool should be run. With the addition of the Obsidian TypeScript files that also need to be generated, there are a few steps that must be performed in sequence:

1.  Model Generation
2.  Obsidian View Models

The first step is to build Rock. In the rare case you're *removing* properties from a model, you'll first need to manually edit any corresponding, previously-auto-generated class files in order to get the project to build. Next, within the main menu of the Code Generation tool, select the "Model Generation" option. Take a quick glance at the information, especially which DLL it is using and how old it is. If everything looks correct, you can click the "Generate" button. This will take a few moments to run. If all goes well it will have generated a number of new C# files. You should quit the code generator tool now.

Now, you need to go back over to the Rock solution and add any *new* files that were created to the projects. A good way to do this is open up SmartGit and see which files are new. Then go through in Visual Studio and make sure each of the new files are part of the project. If you need to add any, remember to use the "Save All" command in the File menu. This forces all the project files to save.

Next, build the Rock solution (specifically, you need to build Rock and Rock.ViewModels projects) and once that completes go back over to the Code Generator tool and build and run it again.

We are now into step 2. This time, select the "Obsidian View Models" option. Click the "Preview" button. This will generate all the new file data and compare it to what is on disk. The new page that comes up will show you which files need to be written to disk. It's good practice to glance at the list of changed files. If you see stuff you don't expect, take a look at it to be sure you didn't change something you did not intend to. Once you are ready click "Save" to write all the files. Any new files will automatically be added to Visual Studio this time.

A green check-mark means the file is up to date and no changes will be made.

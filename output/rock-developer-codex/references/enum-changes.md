> **Path:** Developer Codex > Coding Standards > Code Generator > Enum Changes

# Enum Changes

All new enums should live in the Rock.Enums project — unless they are encapsulated in a class and not exported from that class (rare).

If you add a new Enum or update an existing Enum in the Rock.Enums project, you should run the Code Generator tool. From the main menu, select the "Obsidian Enums" option. Then click the "Preview" button and finally the "Save" button to save all the updated files to disk. Any new files will automatically be added to Visual Studio.

Remember: This will only generate enums that are part of the Rock.Enums project. If you are creating an enum in another project, you might be creating it in the wrong place. Check with the PO on that.

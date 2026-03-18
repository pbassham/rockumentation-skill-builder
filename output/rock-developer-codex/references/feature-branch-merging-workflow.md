> **Path:** Developer Codex > Coding Standards > Writing Migrations > Standard EF Migrations > Feature Branch Merging Workflow

# Feature Branch Merging Workflow

Before merging your feature branch into develop or a hotfix branch do the following:

1.  From your feature branch copy the migration **Up\\Down** code you were testing with to a text editor temporarily.
2.  Check out the destination branch (develop, hotfix, etc.) in SmartGit.
3.  Obtain the [migration token](https://community.rockrms.com/Developer/MigrationToken).
4.  From PackageManager console run `Add-Migration <your migration name>` against the destination branch you checked out in SmartGit.
    1.  Make sure to select the **Rock.Migrations** project before running the command.
5.  Paste in the code from the text editor into the new migration .cs file and adjust the method name if applicable.
6.  **DON'T COMMIT AND PUSH YET**
7.  Run `Update-Database` from PackageManager console in your destination branch and test your migration thoroughly (also extend the migration token if required).
8.  **IF ALL IS WELL** commit and push your code.

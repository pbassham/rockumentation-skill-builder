> **Path:** Developer Codex > Coding Standards > Testing > Unit Testing

# Unit Testing

We have multiple unit test projects that are used to automate testing of various classes and functionality in Rock:

-   Rock.Tests– these are fast; do not require a database; tests one unit of functionality.
-   Rock.Tests.Performance - these are slow; do not require a database; used to verify the performance of something in Rock.
-   Rock.Tests.Integration – these require a working database (via Docker image); inter-operate/use multiple parts of Rock.
-   Rock.Tests.Integration.Performance - these are slow; require a working database (via Docker image); used to verify the performance of something in Rock.

Each project has a README that discusses any specific information you should know for how to write or run tests in that project.

![](https://community.rockrms.com/GetImage.ashx?Id=66689)

> **Path:** Developer Codex > Coding Standards > Service Layers

# Service Layers

Rock uses multiple service layers to provide the ability to re-use code when possible.

Code re-use decreases the amount of time it takes to build new functionality in the long run. A second benefit is that when a bug is found, we only need to fix the one method that provides that logic rather than hunt for all variations that have been copied and pasted.

In the Rock world, we define 4 layers:

1.  **Data Service Layer**
    1.  Methods related to loading and filtering data from the database.
    2.  Methods related to filtering on security, though these should be kept separate from the above methods.
    3.  No attempt at formatting, other than some basic things like Person.FullName.
    4.  Minimal calculations performed, other than what is strictly required. For example, you might need to run a calculation to store a value into a database column
2.  **Client Service Layer**
    1.  Methods related to taking data already loaded in memory (or an IQueryable<>) and converting it into something usable by the client: view models.
    2.  Most calculations performed, such as item counts, totals, etc.
    3.  Some formatting performed, such as taking a Group object and getting a string that contains both the group name and the group type if required: "Ted's Group (Small Groups)".
3.  **Block Layer**
    1.  Additional calculations and formatting required before transmission to the client.
    2.  Conversions to and from custom block view models.
4.  **Client Layer** (Mobile shell, Obsidian)
    1.  Final formatting and rendering.
    2.  End-user calculations that should be performed on the fly (e.g. a total field below a form that allows the individual to specify quantities).

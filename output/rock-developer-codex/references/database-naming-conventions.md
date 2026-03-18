> **Path:** Developer Codex > Coding Standards > Naming Conventions > Database Naming Conventions

# Database Naming Conventions

*Follow all the property/field/database naming conventions described in the Developer guide:*

[Developer Guide](https://community.rockrms.com/developer/book/16/16/content#standardfieldpropertynaming)

**Additionally:**

-   Fields ending with ‘`Id`’ must be int (if you need a field ending with ‘`Id`’ that is not an `int` consider ending with ‘`Key`’ instead.)
-   Properties that refer to other entity's should be 'fully' qualified.
    -   in `Interaction`, use `InteractionChannelId` and not `ChannelId`.
    -   in `StepType`, use `StepProgramId` and not `ProgramId`
-   **Data View** should be two separate words when not in a parameter / class / method name.

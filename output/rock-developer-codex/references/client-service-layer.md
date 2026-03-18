> **Path:** Developer Codex > Coding Standards > Service Layers > Client Service Layer

# Client Service Layer

The client service layer has two primary responsibilities:

1.  Translating data into a common format that can be used by all lower layers.
2.  Performing common logic operations that can be reused by other components.

Think of it this way: The data service layer is responsible for the question "what data am I working with?" while the client service layer is responsible for "what do I do with this data?"

All client service layer classes should reside in the **Rock.ClientService** namespace and folder structure inside the **Rock** project.

**Example**

![](https://sparkdevnetwork.gitbook.io/rock-developer-codex/~gitbook/image?url=https%3A%2F%2Fstatic.slab.com%2Fprod%2Fuploads%2F3xqnyj9y%2Fposts%2Fimages%2FkTLOZOtOQ1dHs1sagGFcYdqb.png&width=768&dpr=4&quality=100&sign=99a2709&sv=2)

ConnectionTypeClientService.cs

The folder structure for the client service layer follows that of the data service layer, that is: **Rock\\ClientService\\\[Domain\]\\\[Entity\]\\**. The namespace should match the folder structure. All service classes should have the suffix ClientService. For example, the primary class to handle ConnectionType client service methods would be:

-   Class: ConnectionTypeClientService
-   Namespace: Rock.ClientService.Connection.ConnectionType
-   File: Rock\\ClientService\\Connection\\ConnectionType\\ConnectionTypeClientService

As with the Method Behavior Parameters pattern, any options POCOs should go in a **\*.Options** sub-namespace.

> **Path:** Developer Codex > Coding Standards > Service Layers > Data Service Layer

# Data Service Layer

The data service layer is responsible for loading data from and storing data into the database. This includes common filtering methods that will be used by multiple client services and/or blocks.

All Data Service Layer classes should reside in the **Rock.Model** namespace and folder structure inside the **Rock** project. The Model and ModelService classes should be placed directly in the **Rock.Model** namespace, but follow the **Rock\\Model\\\[Domain\]\\\[Entity\]\\** folder structure. For instance, ConnectionType and ConnectionTypeService classes go in the Rock.Model namespace, but reside as the files Rock\\Model\\Connection\\ConnectionType\\ConnectionType.cs and Rock\\Model\\Connection\\ConnectionType\\ConnectionTypeService.cs.

Any additional classes, such as ConnectionTypeQueryOptions, should go in the namespace **Rock.Model.Connection.ConnectionType** (in the case of this specific class, to follow the Method Behavior Parameters pattern it would go in Rock.Model.Connection.ConnectionType.Options namespace).

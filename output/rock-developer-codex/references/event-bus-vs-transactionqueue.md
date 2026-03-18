> **Path:** Developer Codex > Coding Standards > Rock Architecture > Event Bus vs TransactionQueue

# Event Bus vs TransactionQueue

Rock has two *primary* approaches for performing a run-time (non-job initiated) task:

-   via an ITransaction added into the TransactionQueue or
-   via a Message (BusStartedTaskMessage) 'sent' or 'published' into the

See [Event Bus](https://triumph.slab.com/posts/event-bus-65nk4duh) for details on how the bus works.

The TransactionQueue (only local to the particular Rock server instance) is processed every minute or so, but the Event Bus can happen nearly immediately.

Because of the speed of the Event Bus, care needs to be taken to ensure the corresponding related message data has truly be saved/committed before attempting to use that data. For this reason, it is often best to use `SendWhen(...)` when triggering bus "Send" messages from a SaveHook.

The Event Bus is typically used if the 'event' needs to be consumed by an external system listening to the bus, and/or when an event could be handled by *any one* of the Rock servers in a Web Farm. Note: Internally, Rock uses the Event Bus to "Publish" and consume when the Rock cache is cleared.

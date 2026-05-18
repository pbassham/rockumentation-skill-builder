---
description: "Use when automating connection request workflows, managing connector assignments, updating request status/state, or adding activities to connection requests"
source: "https://community.rockrms.com/WorkflowActions"
sourceLabel: Workflow Actions
---
> **Path:** Workflow Actions Documentation > Action Categories > Connections

# Connections

All the details for the connections category.

 # Connection Request Activity Add

Show Details

v4.0

Adds a connection activity to the connection request.

This action adds a new connection activity to the connection request referenced in the provided attribute. The type of connection activity and note can be provided as additional settings. The person attribute is the person doing the activity. The optional Connection Request Activity Attribute field can be used to store the GUID of the newly-added activity, for use in later actions.

![](https://community.rockrms.com/GetImage.ashx?Guid=a816a749-d5fa-4a19-93f8-ed206cf0ccef)

 # Connection Request Create

Show Details

v5.0

Creates a new connection request.

Creates a new connection request.

![](https://community.rockrms.com/GetImage.ashx?Guid=2b4d55fe-958a-4f6e-9e3f-98cecea1ebb6)

 # Connection Request Set Connector

Show Details

v7.0

Update the connection request connector.

Sets the connector for the provided connection request. Optional settings are provided for controlling whether an existing connector should be overwritten.

![](https://community.rockrms.com/GetImage.ashx?Guid=0808cb3a-ed6a-4fd1-9020-0d80c138ab13)

 # Connection Request Set State

Show Details

v4.0

Updates the connection request state.

Sets the state of the provided connection request. Optional settings are provided for setting the future follow-up date.

![](https://community.rockrms.com/GetImage.ashx?Guid=049e360e-ce4d-4e75-8847-c2dd8121232a)

 # Connection Request Set Status

Show Details

v4.0

Sets the status of the connection request.

Sets the status of the provided connection request.

![](https://community.rockrms.com/GetImage.ashx?Guid=d83e8746-ee83-4694-a214-4f500d6d8918)

 # Connection Request Transfer

Show Details

v4.0

Transfers the provided connection request to a new connection opportunity (of the same connection type).

Transfers the provided connection request to a new connection opportunity (of the same connection type).

![](https://community.rockrms.com/GetImage.ashx?Guid=92dcb62d-dba2-43d1-92f0-087a04fabacb)


---

## Entity {#entity}

> **Path:** Workflow Actions Documentation > Action Categories > Entity

# Entity

All the details for the entity category.

 # Entity Attribute Set

Show Details

v7.0

Can be used to set any attribute value on any entity.

The *Entity Attribute Set* action can set any attribute value on any entity. It is a powerful action that should be used carefully as it requires a thourough understanding of how entities and their attributes are used in Rock.

![](https://community.rockrms.com/GetImage.ashx?Guid=3db29373-2fc5-400d-9d88-a87898d2c769)

 # Entity Document Add

Show Details

v11.2

Can be used to add a file/document to any entity.

The *Entity Document Add* action can add a given document to any entity. It's a powerful action that should be used carefully because it also requires a thourough understanding of how entities relate to the field types in Rock.

![](https://community.rockrms.com/GetImage.ashx?Guid=3c95f082-5937-483b-a31d-b5965303cd27)  
**Additional Details**

You will need to make sure that the Document Type you set is valid for the given Entity Type. Otherwise the action will log an error.

As seen in the [Field Types section in this reference guide](https://community.rockrms.com/lava/workflows), if the field type represents a 'Full Entity' then that field type can be used as the "Entity Attribute" to get the correct entity. There is one small exception: We've eased the burden of converting the Person (picker) field type's PersonAlias into the underlying person entity so this action will do what you want.

 # Entity Property Set

Show Details

v7.0

Set any value on anything... be careful!

The *Entity Property Set* action can set any property on any entity. It is a powerful action that should be used carefully as it requires a thourough understanding of how property values are used in Rock.

![](https://community.rockrms.com/GetImage.ashx?Guid=d9d07b8c-d511-436c-b32c-cc85095ed1a5)


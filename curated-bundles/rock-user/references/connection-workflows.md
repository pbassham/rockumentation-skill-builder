---
description: "Use when configuring automated workflows triggered by connection request events like assignments, status changes, or follow-up dates in Rock RMS"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Connection Workflows

On their own, the connection features are very powerful. Adding workflows to the mix, though, magnifies what you can do. Let's take a look at how you can set up workflows for your connections.

You can define workflows for your requests for the connection type (in which case they will be applied to all requests in all opportunities) or for a specific opportunity. In either case the configuration is the same.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.17.0/images/connection-workflow.png)

Connection Workflows

There are two basic items that you'll need to configure:

- **Trigger:** This defines when the workflow should be started. The options are:
	- **Request Started:** Executed when the request is first started.
		- **Request Assigned:** The workflow will launch when a connector has been assigned to the request.
		- **Request Transferred:** The workflow will launch when the request has been transferred.
		- **Request Connected:** Fired when the request is marked as connected.
		- **Placement Group Assigned:** This workflow will be launched when a placement group is assigned.
		- **Status Changed:** This workflow is launched when a status change has occurred. You optionally have the ability to limit this trigger to certain pre/post status values.
		- **State Changed:** Like the status change trigger but this time for state.
		- **Activity Added:** This trigger will be launched every time an activity is added to a request. You can also filter this to a specific kind of activity. The entity passed to the workflow will be the connection request activity.
		- **Manual:** This workflow will be added to the request detail screen to allow the connector to manually execute it. You can optionally limit which workflows display on the request based on the status of the request.
		- **Future Follow-up Date Reached:** In this case, the workflow is launched by the *Connection Request Workflow Triggers* job. Depending on how the job is configured, the workflow will launch on or after the request's Future Follow-up date.
- **Workflow Type:** This is the simple part. This defines which workflow will be executed when the trigger condition is met.

# Building Connections Workflows

When the workflows above are executed, the initial activity of the workflow will have access to the connection request through the workflow entity property. It's important that this initial activity gets the information it needs to process from the request. The main action you'll use to get the properties from the request is *Attribute Set From Entity*. You can use the *Lava Template* field of this action to pull different properties of each request. Below are a few samples:

**Get The Requestor – Attribute Type: Person**  
{{ Entity.PersonAlias.Guid }}  

**Get the Connector Person (if any) – Attribute Type: Person**  
{{ Entity.ConnectorPersonAlias.Guid }}

**Get the Placement Group – Attribute Type: Group**  
{{ Entity.AssignedGroup.Guid }}

**Opportunity Type – Attribute Type: Text**  
{{ Entity.ConnectionOpportunity.Name }}

**Status – Attribute Type: Text**  
{{ Entity.ConnectionStatus.Name }}

**State – Attribute Type: Text**  
{{ Entity.ConnectionState }}

# The 'Activity Added' Workflow Trigger is a Bit Different

While most of the workflow triggers send the Connection Request to the workflow, the 'Activity Added' trigger only sends the new Activity. So, if your workflow is triggered by 'Activity Added' then you will need an extra step to get the Connection Request associated with that activity. You can derive the Connection Request from the Activity by using the following Lava:  
{{ Entity.ConnectionRequest.Guid }}

# Connection Attribute Types

Rock provides several attribute types to help you build workflows. These include:

- Connection Request - Set by Guid
- Connection Status - Set by Guid
- Connection State - Set by Enum value
- Connection Type - Set by Guid
- Connection Opportunity - Set by Guid
- Connection Activity Type - Set by Guid

# Automatically Persist

Be cautious when disabling auto-persistance for workflows manually triggered from a connection request, as it might lead to unexpected behavior.

# Connection Workflow Actions

To facilitate even more power with connections we've added several workflow actions. They're outlined below.

## Create Connection Request

Creates a new connection request with the following settings.

1. **Person Attribute** - The Person attribute that contains the person that connection request should be created for.
2. **Connection Opportunity Attribute** - The attribute that contains the type of connection opportunity to create.
3. **Connection Status Attribute** - The attribute that contains the connection status to use for the new request.
4. **Connection Status** - The connection status to use for the new request (when Connection Status Attribute is not specified or invalid). If neither this setting nor the Connection Status Attribute setting are set, the default status will be used.
5. **Campus Attribute** - An optional attribute that contains the campus to use for the request.
6. **Connection Comment Attribute** - An optional attribute that contains a comment that should be added to the request.
7. **Connection Request Attribute** - An optional connection request attribute to store the request that is created, for use later in the workflow.

## Transfer Connection Request

Transfers a connection request to a new opportunity type.

1. **Connection Request Attribute** - The attribute that contains the connection request.
2. **Connection Opportunity Attribute** - The attribute that contains the type of the new connection opportunity.
3. **Transfer Note** - The note to include with the transfer activity.

## Set Connection Request Status

Changes the status of a connection request.

1. **Connection Request Attribute** - The attribute that contains the connection request.
2. **Connection Status Attribute** - The attribute that contains the connection status.
3. **Connection Status** - The connection status to use (if Connection Status Attribute is not specified).

## Set Connection Request State

Changes the state of a connection request.

1. **Connection Request Attribute** - The attribute that contains the connection request.
2. **Connection State Attribute** - The attribute that contains the connection state.
3. **Connection State** \- The state to set the request to, if a Connection State Attribute is not provided.
4. **Follow Up Date Attribute** - The attribute that contains the follow-up date when state is being set to Future Follow Up.
5. **Follow Up Date** - The follow-up date when state is being set to Future Follow Up (if Follow Up Date Attribute is not specified).

## Add Connection Request Activity

Adds a new connection request activity.

1. **Connection Request Attribute** - The attribute that contains the connection request.
2. **Connection Activity Type Attribute** - The attribute that contains the activity type to add.
3. **Note** - The note or an attribute that contains the note for the new activity.
4. **Person Attribute** - An optional Person attribute that contains the person who is adding the activity.
5. **Connection Request Activity Attribute** - An optional connection request activity attribute that contains the created activity, for use later in the workflow.

  

See our [Blasting Off With Workflows](https://community.rockrms.com/documentation/bookcontent/12/) guide for more information on working with workflows.


---
description: "Use when users need to configure connection types, set up connection statuses, automate status changes, or manage connection opportunities in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/39/362"
sourceLabel: Engagement
---
> **Path:** Engagement > Configuring Connection Types

Configuring Connection Types

Out of the box Rock ships with a single connection type for Involvement. But that's just a starting point for all the options within connections. Let's walk through the configuration capabilities of the connections features to see what's possible.

# Connection Type Configuration

The first step is to see a listing of all the connection types that have been configured in the system. You can see this screen by clicking the from the *Connections* page under People \> Connections.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-types-v18.png)

Connection Type List

Selecting a connection type from the list pictured above will display the details for the type as well as a list of all the connection opportunities that have been defined.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-type-detail-page-v18.png)

Connection Type Detail

Let's start by looking at the configuration options available for a connection type.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-type-configuration-v18.png)

Connection Type Edit

After setting up a connection type, you can duplicate it to create additional types. To duplicate an entire connection type, click the button on the *Connection Type Detail* screen.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-type-copy-example-v18.png)

Connection Type Copy

Once copied, the duplicated connection type is displayed in the *Connection Types* screen. From there you can edit its settings in the *Connection Type Detail* screen. Note, if you need to delete the duplicated connection type, you'll need to first delete all of the Connection Opportunities listed in its *Connection Type Detail* screen.

## Automating Status Changes

As noted above, the Connection Type is where you define the *Statuses* that are available for connection requests. For instance, you might have statuses like "In Progress" or "Pending Interview" to track different stages as the connection request moves through your process. Statuses can be manually assigned by editing a request, but in many cases, you might find it's more efficient to automatically move a connection request from one status to another.

To set up rules for automating status changes, edit the Connection Type and access the Statuses section. By either updating a status or adding a new one, you can access the list of status automations. Click the icon to add a new automation, or the icon to edit an existing automation.

![Connection Type Status Automation](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-type-status-automation-v18.png)

Connection Type Status Automation

The automations you configure will be performed after saving a connection request, or when the *Connection Requests Automation* job is run.

Keep in mind that the automations are performed in the order that they're listed. If you need to change the order, click the icon and drag the automation to the desired location. Once an automation criterion is matched, no further automations will be processed for that status.

So, there is the Connection Type. Next let's look at creating and editing Connection Opportunities within this Connection Type.

# Connection Opportunity Configuration

When viewing a Connection Type, you can select an existing opportunity or click the icon to add a new one. Either way you'll be brought to a screen like the one pictured below.

![](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-opportunity-detail-edit-v18.png)

Connection Opportunity Detail


---

## Placement Group Configuration {#placement-group-configuration}

> **Path:** Engagement > Placement Group Configuration

Placement Group Configuration

An important part of the connection process is the selection of a group to place the person in when they are connected. The definition of these 'selectable' groups is highly configurable. Knowing all of your options will increase the power of your connections processes.

# Configuration

Let's say for instance that we’d like our *Children's* connection opportunity to allow placement into three different serving teams. We'd also like the connector to be able to place them into groups as either a *Leader* or a *Member*. Finally, if they are a *Member* of the group, we'd like for the connector to be able to place them with the member status of *Active* or *Pending*. That's quite a list of requirements... let’s see how we can configure the *Children's* opportunity to do just that.

You can set up placement groups in the *Connection Opportunity* configuration screen. Here you'll find a panel for setting placement group options. The screen below shows the configuration for the example given above.

![Placement Group Configuration](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/placementgroup-configuration-v18.png)

Placement Group Configuration

In our example above we specifically picked each placement group that is an option for the connection opportunity. This will work in most cases. But if you wanted the list to show every group of a specific group type, you could configure that as well by enabling the *Use All Groups of This Type* option. This eliminates the need to configure new groups when they are added.

# Results

With our configuration in place, let's see the fruits of our labor. The screen below shows the editing of a connection request for Helen Evans who is interested in helping in the *Children's* area. Let's walk through how the placement group settings drive the process of selecting a group.

![Placement Group Example](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-request-placement-group-example-v18.png)

Placement Group Example

# Group Requirements

If a group has specific requirements to join, these will be checked before saving the placement group. If the person does not meet the requirements, you will see a warning message like the one pictured below.

![Placement Group Requirements Not Met](https://rockrms.blob.core.windows.net/documentation/Books/39/1.18.0/images/connection-placement-group-reqs-not-met-v18.png)

Placement Group Requirements Not Met


---
description: "Use when displaying detailed information about a specific connection request including its status, activities, and contact options in a Rock mobile application"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

C20.0S20.0

Displays a single connection request and lets connectors work it from their phone.

## What it does

1. Shows the requester with their photo, connection status, and a due badge, plus the request's status, age, and due date.
2. Provides Call, SMS, and Email buttons for the requester.
3. Shows and edits the request's state, connector, campus, source, placement group, comments, and custom attributes.
4. Changes the status, with an optional or required note depending on how the status is configured. When the connection type enforces sequential statuses, earlier statuses cannot be chosen.
5. Connects the request. When a placement group is assigned, the requester is added to the group, and the person confirms any manual group requirements first.
6. Reassigns the connector, updates the requester, and transfers the request to another opportunity of the same type.
7. Adds, edits, and deletes activities, and adds request notes.
8. Records a celebration story for the request, which shows a celebration badge on the list blocks.
9. Adds reminders for the requester.
10. Launches manual workflows configured on the opportunity or connection type.
11. Shows an Activity Feed with logged activities, status changes, system updates, communications, and notes, newest first.

## Settings

| Setting | What it does |
| --- | --- |
| Person Profile Page | The page opened when the requester's name is tapped. The requester is passed as the `PersonGuid` page parameter. |
| Group Detail Page | Not used by this block. It is kept for compatibility. |
| Workflow Page | The page opened when a launched workflow has an entry form for the person to fill out. The workflow is passed as the `WorkflowGuid` and `WorkflowType` page parameters. Point it to the page that hosts Workflow Entry. |
| Reminder Page | The page opened by the Reminder card. Point it to the page that hosts the Reminder block. When empty, the Reminder card is hidden. |

## How it links to other blocks

1. Opened from Connection Request List or My Connection Requests, which pass the `ConnectionRequest` page parameter.
2. Tapping the requester goes to Person Profile Page.
3. A launched workflow with an entry form goes to Workflow Page, which leads to Workflow Entry.
4. The Reminder card opens Reminder Page as a sheet. The reminder is tied to the requester, not the request, to match the website.

## Notes

1. This block replaces [Connection Request Detail (Legacy)](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/legacy/connection-request-detail-legacy). It renders natively, so there are no Header or Activity templates, and the legacy style classes do not apply. It reads the `ConnectionRequest` page parameter instead of `ConnectionRequestGuid` or `ConnectionRequestId`.
2. Unlike the legacy block, the Group Detail Page setting is not used. Tapping the placement group opens the placement editor instead.
3. Place this block on a page with Show Full Screen turned on. The block has a floating footer that overlaps the tab bar if the tab bar is showing.
4. Anyone who can view the request can open it. Editing requires one of the following:
	1. Edit permission on the request (when Enable Request Security is on) or on the opportunity.
		2. Being the request's assigned connector.
		3. Being an active member of one of the opportunity's connector groups whose campus matches the request.
5. People who can only view the request see it read-only, but they can still launch workflows.
6. The Reminder card needs both the Reminder Page setting and the Reminders feature turned on for the connection type.
7. The Celebrate card needs the Celebrations feature turned on for the connection type. Saving an empty story removes the celebration.
8. Connect only checks manual group requirements, and only when a new group member is created.
9. Deleting an activity happens immediately, without a confirmation.
10. Call and SMS use the requester's mobile number.
11. Attributes the app cannot edit are shown read-only, with a note that they can only be updated on the website.

---

## My Connection Requests {#my-connection-requests}

C20.0S20.0

Displays every connection request assigned to the current person, across all opportunities, in one worklist.

## What it does

1. Lists every Active, Inactive, and Future Follow Up request where the current person is the connector.
2. Filters by connection type, and groups the list by Opportunity (the default), Due Status, State, Status, or Campus.
3. Searches by the requester's name.
4. Provides a Customize sheet with filters for State, Campus, and Due. When a type is selected, it also filters by Opportunity and Status.
5. Shows each request's requester, status, due badge, comments, opportunity, and a celebration badge when one has been recorded.
6. Remembers the person's filter and grouping choices between visits.

## Settings

| Setting | What it does |
| --- | --- |
| Detail Page | The page opened when a request is tapped. Point it to the page that hosts Connection Request Detail. The request is passed as the `ConnectionRequest` page parameter. |
| Add Page | The page opened by the Add button. Point it to the page that hosts Add Connection Request. No page parameters are passed, so the wizard starts at the Type step. When empty, the Add button is not shown. |

## How it links to other blocks

1. Tapping a request goes to Detail Page, which leads to Connection Request Detail.
2. The Add button goes to Add Page, which leads to Add Connection Request. The list refreshes after a request is saved.

## Notes

1. This block is new. There is no legacy version.
2. The person must be logged in.
3. Only requests where the person is the assigned connector are shown. Requests they made as the requester, or can merely view, are not included.
4. Connected requests are not included.
5. The Type, Campus, Opportunity, and Status options come from the requests in the person's list, not from every option in Rock.
6. The whole list loads at once, without paging. Filtering, grouping, and search all happen on the device.

---

## Legacy {#connection-legacy}

This section refers to the legacy "Connection" mobile block group. These blocks are still available in Rock with a "(Legacy)" suffix, but have been replaced by the new Connection blocks.

---

## Add Connection Request (Legacy) {#add-connection-request-legacy}

Allows a Person to create a new Connection.

M v5.0C v16.1

## Block Configuration

If you are unfamiliar with Connections in Rock, please first refer to the [connections manual](https://community.rockrms.com/Rock/BookContent/39#connections).

### Connection Types

The connection types that will be made available to this block. If none are selected, all available connection types will be shown.

### Post Save Action

The navigation command to execute after a save successfully occurs.

### Post Cancel Action

The navigation command to execute when the "cancel" button is pressed.

## Page Parameters

| Key | Type | Description |
| --- | --- | --- |
| RequesterId | string | The Id Key of the requester. |
| ConnectionTypeId | string | When provided, the connection type will be locked to this value and only display opportunities of its' own type. |
| ConnectionOpportunityId | string | When provided, the connection opportunity will be locked to this value. Must be accompanied with a *ConnectionTypeId*. |
| ConnectorId | string | When provided, the connector list will pre-select to this value. The field will not be locked. |

### Styling

This block consisted of mostly fields, please refer to this [style guide](https://community.rockrms.com/page/3516?slug=styling%2fstyle-guide%2fforms) for styling.

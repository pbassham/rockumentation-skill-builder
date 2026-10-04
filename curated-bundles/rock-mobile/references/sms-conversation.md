---
description: "Use when a user needs to display, configure, or style SMS text message conversations in a Rock mobile app interface"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

Manage an SMS message conversation with a modern UI.

M v5.0 C v15.0

## Configuration

### Snippet Type

The type of snippets that will be made available via the snippet keyboard button.

### Message Count

The number of messages to be returned each time more messages are requested.  

### Database Timeout

The number of seconds to wait before reporting a database timeout.

## Page Parameters

The following query string parameters are recognized and utilized by this block.

| Name | Type | Description |
| --- | --- | --- |
| PhoneNumberGuid | Guid | The Rock phone number that should be used for this conversation. |
| PersonGuid | Guid | The Guid of the Person to be communicated with. |

## Styling

![The SMS Conversations CSS X-Ray.](https://mobiledocs.rockrms.com/~gitbook/image?url=https%3A%2F%2F1618311306-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-LnfHr7q46y6lOQNgsA4%252Fuploads%252Fk7iya2nTxabJdteQjSOu%252FSMS%2520Conversations%2520XRay.png%3Falt%3Dmedia%26token%3D48b493af-8844-4ee9-ac8a-7e1ef9878277&width=768&dpr=4&quality=100&sign=62f8fbe8&sv=2)

### Message Bubbles

To style message bubbles, we introduced the following custom CSS classes.

| Value | Type | Description |
| --- | --- | --- |
| \-rock-inbound-background-color | Color | The color of the inbound messages background. |
| \-rock-inbound-text-color | Color | The color of the inbound messages text. |
| \-rock-outbound-background-color | Color | The color of the outbound messages background. |
| \-rock-outbound-text-color | Color | The color of the outbound messages text. |

You can target these elements by using the `^MessageBubble` selector.

```
^MessageBubble {
  -rock-inbound-background-color: orange;
}
```

### Styling

![](https://community.rockrms.com/GetImage.ashx?Id=71452)

---

## Connection {#connection}

This section refers to the "Connection" mobile block group.

---

## Add Connection Request {#add-connection-request}

C20.0S20.0

Creates a new connection request through a step-by-step wizard.

## What it does

1. Walks the person through up to five steps: Type, Opportunity, Main Details, Additional Details, and Custom Attributes.
2. Skips the Type step, or both the Type and Opportunity steps, when it is opened from a list that already knows them.
3. Only offers the types and opportunities the person is allowed to add requests to.
4. Captures the requester, state (Active, Inactive, or Future Follow Up with a follow-up date), status, campus, and source.
5. Captures the connector, an optional placement group with its role, member status, and group member attributes, and comments.
6. Shows the opportunity's custom request attributes the person is allowed to edit, grouped by category.
7. Defaults the campus to the requester's primary campus once a requester is picked.
8. Records an "Assigned" activity when a connector is set.

## Settings

| Setting | What it does |
| --- | --- |
| Post Save Action | The navigation performed after the request is saved. Leave it on the default to return to the previous page, or point it to the page that hosts Connection Request Detail so the person lands on the new request. The new request is passed as the `ConnectionRequest` page parameter. |

## How it links to other blocks

1. This block is usually opened as a sheet from another block's Add Connection Request Page setting. The block that opens it decides how much is already filled in:
	1. **Connection Type List** and **My Connection Requests** pass nothing, so the wizard starts at the Type step.
		2. **Connection Opportunity List** passes `ConnectionType`, so the wizard starts at the Opportunity step.
		3. **Connection Request List** passes `ConnectionOpportunity`, which locks the Type and Opportunity and starts the wizard at Main Details.
2. After saving, the lists on the page behind it refresh automatically, and Post Save Action controls where the person goes next.

## Notes

1. This block replaces [Add Connection Request (Legacy)](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/legacy/add-connection-request-legacy). The legacy Connection Types and Post Cancel Action settings are gone. The legacy `RequesterId`, `ConnectionTypeId`, `ConnectionOpportunityId`, and `ConnectorId` page parameters are not read, so the requester and connector can no longer be prefilled from a link. Pass `ConnectionType` or `ConnectionOpportunity` instead.
2. There is no setting to limit which types or opportunities are offered. What the person sees is driven entirely by security. A person can add a request to an opportunity when they have Edit on it, or when they are an active member of one of its connector groups. When the connection type has Enable Request Security turned on, Edit is checked at the request level instead.
3. The connector list is made up of the opportunity's connector group members for the chosen campus. The current person is always included so they can assign themselves.
4. The Source row only appears when the connection type has sources. The Placement section only appears when the opportunity has placement groups.
5. The Campus list includes every active campus, not only the campuses the opportunity serves.
6. A new request cannot be created in the Connected state.
7. Attributes the app cannot render are left out, with a note that they may only be edited on the website.

---

## Connection Type List {#connection-type-list}

C20.0S20.0

Displays the connection types the person can view, with request counts for each.

## What it does

1. Lists each active connection type the person can view, with its icon, description, and badges for Unassigned, Active, Due Soon, and Overdue requests.
2. Shows a count of requests assigned to the current person on each row.
3. Provides a Mine/All toggle. Mine (the default) only shows types with at least one active request assigned to the person, and limits the counts to those requests.
4. Filters by campus, sorts alphabetically or by any of the counts, and searches by name.
5. Remembers the person's filter and sort choices between visits.

## Settings

| Setting | What it does |
| --- | --- |
| Detail Page | The page opened when a connection type is tapped. Point it to the page that hosts Connection Opportunity List. The type is passed as the `ConnectionType` page parameter. |
| Add Connection Request Page | The page opened by the Add button. Point it to the page that hosts Add Connection Request. No page parameters are passed, so the wizard starts at the Type step. When empty, the Add button is not shown. |

## How it links to other blocks

1. This is usually the starting point of the Connection flow.
2. Tapping a type goes to Detail Page, which leads to Connection Opportunity List.
3. The Add button goes to Add Connection Request Page, which leads to Add Connection Request.

## Notes

1. This block replaces [Connection Type List (Legacy)](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/legacy/connection-type-list-legacy). It renders natively, so there are no Header or Type templates to customize. Unlike the legacy block, it only shows active connection types. Its Detail Page passes `ConnectionType` instead of `ConnectionTypeGuid`, so point it at a page that hosts the new Connection Opportunity List, not the legacy one.
2. Only Active requests are counted.
3. The count on the right side of each row always shows requests assigned to the current person, even when the toggle is set to All.
4. The Add button only shows when a page is set and the person is allowed to add a request to at least one opportunity.
5. The counts use the same logic as the web connection blocks, so the numbers should match what staff see on the website.

---

## Connection Opportunity List {#connection-opportunity-list}

C20.0S20.0

Displays the opportunities of a connection type with request counts and type-level metrics.

## What it does

1. Shows the connection type's icon and name, and a health bar that splits active requests into On Track, Due Soon, and Overdue.
2. Lists each active opportunity the person can view, with its summary and badges for Unassigned, Active, Due Soon, and Overdue requests.
3. Shows a count of requests assigned to the current person on each row.
4. Provides a Mine/All toggle. Mine (the default) only shows opportunities with at least one active request assigned to the person, and limits the counts to those requests.
5. Filters by campus, sorts alphabetically or by any of the counts, and searches by name.
6. Provides a Details sheet with the type description, a count of requests by status, and completion metrics for the last 7 days compared to the 7 days before: Timeliness, Responsiveness, Completed, and Avg Completion.
7. Remembers the person's filter and sort choices between visits.

## Settings

| Setting | What it does |
| --- | --- |
| Detail Page | The page opened when an opportunity is tapped. Point it to the page that hosts Connection Request List. The opportunity is passed as the `ConnectionOpportunity` page parameter. |
| Add Connection Request Page | The page opened by the Add button. Point it to the page that hosts Add Connection Request. When empty, the Add button is not shown. |

## How it links to other blocks

1. Opened from Connection Type List, which passes the `ConnectionType` page parameter.
2. Tapping an opportunity goes to Detail Page, which leads to Connection Request List.
3. The Add button goes to Add Connection Request Page, which leads to Add Connection Request. The connection type is passed along, so the wizard starts at the Opportunity step.

## Notes

1. This block replaces [Connection Opportunity List (Legacy)](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/legacy/connection-opportunity-list-legacy). It renders natively, so there are no Header or Opportunity templates to customize. It reads the `ConnectionType` page parameter instead of `connectionTypeGuid`, and its Detail Page passes `ConnectionOpportunity` instead of `ConnectionOpportunityGuid`. Legacy and new blocks cannot be mixed in the same chain of pages.
2. Only Active requests are counted. Inactive, Future Follow Up, and Connected requests are not included in any count.
3. The count on the right side of each row always shows requests assigned to the current person, even when the toggle is set to All.
4. The Details metrics follow the campus filter but always cover the whole connection type. They ignore the Mine/All toggle.
5. The Add button only shows when a page is set and the person is allowed to add a request to at least one opportunity.
6. The counts use the same logic as the web connection blocks, so the numbers should match what staff see on the website.

---

## Connection Request List {#connection-request-list}

C20.0S20.0

Displays the connection requests of a single opportunity with search, filters, sorting, and infinite scroll.

## What it does

1. Shows the opportunity's icon and name as the title.
2. Lists requests with the requester's photo, name, status, due badge (Overdue or Due Soon), comments, and a celebration badge when one has been recorded.
3. Searches by the requester's name.
4. Provides a Filter & Sort sheet:
	1. **Connector:** My Requests (the default) or All Requests.
		2. **State:** All, Active (the default), Inactive, or Future Follow Up.
		3. **Campus**, **Status**, and **Due** (Overdue, Due Soon, or On Track).
		4. **Sort By:** requester name, A-Z or Z-A.
5. Loads more requests as the person scrolls.
6. Remembers the person's filter and sort choices between visits.

## Settings

| Setting | What it does |
| --- | --- |
| Detail Page | The page opened when a request is tapped. Point it to the page that hosts Connection Request Detail. The request is passed as the `ConnectionRequest` page parameter. |
| Add Connection Request Page | The page opened by the Add button. Point it to the page that hosts Add Connection Request. The current opportunity is passed so its Type and Opportunity are locked. When empty, the Add button is not shown. |
| Page Size | The number of requests loaded at a time as the person scrolls. Defaults to 15. |

## How it links to other blocks

1. Opened from Connection Opportunity List, which passes the `ConnectionOpportunity` page parameter.
2. Tapping a request goes to Detail Page, which leads to Connection Request Detail.
3. The Add button goes to Add Connection Request Page, which leads to Add Connection Request with the Type and Opportunity already locked.

## Notes

1. This block replaces [Connection Request List (Legacy)](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/connection/legacy/connection-request-list-legacy). It renders natively, so there are no Header or Request templates to customize. It reads the `ConnectionOpportunity` page parameter instead of `connectionOpportunityGuid`, and its Detail Page passes `ConnectionRequest` instead of `ConnectionRequestGuid`. Legacy and new blocks cannot be mixed in the same chain of pages.
2. Connected requests are never shown. The State filter's All option means Active, Inactive, and Future Follow Up.
3. Inactive requests are always treated as On Track by the Due filter.
4. The person needs View on the opportunity. When the connection type has Enable Request Security on, a connector can still open the list to see the requests assigned to them.
5. Filter choices are shared across opportunities. A saved status that does not belong to the current connection type is cleared automatically.
6. The Add button only shows when a page is set and the person is allowed to add a request to this opportunity.

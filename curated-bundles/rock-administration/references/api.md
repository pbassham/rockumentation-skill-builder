---
description: "Use when a user needs guidance on Rock API operations, security configuration, endpoint methods, or integrating third-party apps with Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > API

API

Whether you're a developer or someone integrating a third-party app with Rock, the APIs unlock Rock’s full potential. With built-in tools to secure, test, and extend your endpoints, you can integrate and innovate with ease—no extra setup required.

## Why would I use an API with Rock?

- **Data Integration:** Connect Rock to other apps and services for seamless data exchange.
- **Custom Development:** Build custom tools and features to meet your unique needs.
- **Data Access:** Programmatically retrieve and update Rock data for reports, syncing, and dashboards.
- **Automation:** Save time by automating tasks like imports, user management, and reporting.
- **User Experience:** Create custom interfaces that fit your ministry’s needs.
- **Flexibility:** Build solutions that grow and adapt as your needs change.

To start using APIs in Rock, notice there are two different options:

### API v1

Navigate to Admin Tools \> Settings \> API Docs. For new integrations, we recommend using API v2, as it offers expanded capabilities and improved consistency.

### API v2

Navigate to Admin Tools \> Settings \> API v2 Docs. You will find a list of entities and the corresponding endpoint. Each one has a list of methods available such as:

- **Get:** Gets a single item from the database
- **Put:** Performs a full update of the item. All property values must be specified.
- **Delete:** Deletes a single item from the database
- **Patch:** Performs a partial update of the item. Only specified property keys will be updated.
- **Post:** Creates a new item in the database.

# Understanding API Operations

If you're unsure about what an operation does, check out the help text in the API documentation. It explains each operation clearly and even lets you test it out with real values!

## Secure API Endpoints

Your Rock database holds sensitive information. In Rock, sensitivity equals security. Here's how to secure your REST API endpoints.

See the Rest Controllers settings at Admin Tools \> Settings \> Security \> REST Controllers. Select to configure the settings.

![List of REST controllers with lock icons for security configuration](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/Rest-Controller-Security-v18.png)

REST Controllers

You will notice that a different settings page pops up depending on whether you are securing a v1 or v2 API controller.

### v1 API

![Permission settings view for REST API v1 showing inherited roles](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/v1-Security-v18.png)

v1 API Security

### v2 API

![API v2 permission screen with no matching rules set for users](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/v2-Security-v18.png)

v2 API Security

## Understanding v2 API Controller Security

By default, the v2 API Controllers are locked down for all users. That’s intentional, we wanted to start with strong security so you have full control over who gets access to your data. Before you open things up, it’s important to understand what each permission does:

- **Execute Read:** Allows users to view data when executing any read statement (e.g.: `GET`) with the v2 API.
- **Execute Write:** Allows users to edit data when executing a write (e.g.: `PUT`, `DELETE`, `PATCH`, `POST`) statement with the v2 API.
- **Execute Unrestricted Read:** Allows users to view data—*without performing entity security checks*—when executing any read statement (e.g.: `GET`) with the v2 API.
- **Execute Unrestricted Write:** Allows users to edit data—*without performing entity security checks*—when executing a write statement (e.g.: `PUT`, `DELETE`, `PATCH`, `POST`) with the v2 API.
- **Administrate:** The classic permission, allowing selected users to administrate all things related to this controller, including security permissions.


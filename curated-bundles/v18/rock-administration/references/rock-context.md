---
description: "Use when configuring read-only database replicas, setting up separate analytics databases, or managing Rock RMS connection strings for performance optimization"
source: "https://community.rockrms.com/documentation/bookcontent/40/344"
sourceLabel: Hyper Scaling Rock RMS
---
> **Path:** Hyper Scaling Rock RMS > Rock Context

Rock Context

Some organizations may find that it's worthwhile to maintain a separate database for Rock that's only used for reading (and not writing) data. A read-only database gives people a place to go besides your primary database, helping to lighten the load on that database.

You may already have a database for this purpose. Any Azure customer using a Business Critical or Premium SQL tier is automatically provided with a read-only replica of the production database that matches the compute and storage performance of the primary server.

# Data Views and Plugins

Some plugins provide data view filters that make updates to the database. That won't work in a read-only environment, so a *Disable Use Of Read Only Context* setting will appear when editing data views. This allows an administrator to disable the read-only feature for that particular data view.

# Updating Connection Strings

Rock needs to know that a read-only database exists, so it can direct traffic there when certain blocks are accessed. This will be done by updating your `web.ConnectionStrings.config` file. You'll want to leave the existing file content unchanged, and add the additions shown in the examples below.

The RockContextReadOnly context will be used by Data Views and Reports. An example connection string for this context is provided below. Aside from the "name" you'll need to update the other parts of the connection string, like "Data Source" and "Initial Catalog", according to your setup.

##### RockContextReadOnly



<connectionstrings\>
    <add connectionString="Data Source=localhost;
    Initial Catalog=RockDB; User Id=RockUser; 
    password=123456789; MultipleActiveResultSets=true" 
    name="RockContext" 
    providerName="System.Data.SqlClient" /\>

    <add connectionString="Data Source=localhost;
    Initial Catalog=RockDB\_READ; User Id=RockUser; 
    password=123456789; MultipleActiveResultSets=true" 
    name="RockContextReadOnly" 
    providerName="System.Data.SqlClient" /\>
</connectionstrings\>


The three analytics blocks listed below have been updated to use the RockContextAnalytics context:

- Giving Analytics
- Attendance Analytics
- Pledge Analytics

To make use of this context, add a connection string like the one shown below to your `web.ConnectionStrings.config` file. Again, you'll want to change the "name" to RockContextAnalytics and update the other items according to your setup.

##### RockContextAnalytics



<connectionstrings\>
    <add connectionString="Data Source=localhost;
    Initial Catalog=RockDB; User Id=RockUser; 
    password=123456789; MultipleActiveResultSets=true" 
    name="RockContext" 
    providerName="System.Data.SqlClient" /\>

    <add connectionString="Data Source=localhost;
    Initial Catalog=RockDB\_READ; User Id=RockUser; 
    password=123456789; MultipleActiveResultSets=true" 
    name="RockContextAnalytics" 
    providerName="System.Data.SqlClient" /\>
</connectionstrings\>


Table of Contents

- [Introduction](#introduction)
- [Rock Web Farm](#rockwebfarm)
- [Rock Context](#rockcontext)

Improve

<iframe id="modal-popup_iframe" scrolling="no"></iframe>


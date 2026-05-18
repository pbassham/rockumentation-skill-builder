---
description: Use when setting up or configuring search providers like Lucene or Elasticsearch in Rock RMS Universal Search
source: "https://community.rockrms.com/documentation/bookcontent/32/371"
sourceLabel: Universal Search
---
> **Path:** Universal Search > Getting Started

Getting Started

Ready… set… let's get started! (Note: if you choose to use Elasticsearch, it will need to be installed before continuing.)

# Enable a Search Provider

First, we'll need to tell Rock which search provider we'd like to use and provide the configuration details needed to connect. We do this under Admin Tools \> System Settings \> Universal Search Index Components.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/provider-list-v18.png)

Provider Component List

Next, select the provider type you'd like to enable.

If you choose Lucene as your search engine, Rock displays the following configuration window.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/lucene-configuration-v18.png)

Lucene

If you choose Elasticsearch, Rock displays the following configuration window.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/elasticsearch-configuration-v18.png)

Elasticsearch

# Enabling Entities for Universal Search

Now that we have a provider configured, we're ready to enable entities to be indexed. To do this, navigate to Admin Tools \> General Settings \> Universal Search Control Panel.

![](https://rockrms.blob.core.windows.net/documentation/Books/32/1.18.0/images/control-panel-v18.png)

Universal Search Control Panel

At the top of this page, you'll see a few details about the provider you selected. Below you'll find a list of the entities that are able to be indexed.

To enable a new entity type, click the row of the entity and select Enable Indexing on the dialog that pops up. This entity is now enabled for Universal Search and a request has been queued to bulk index this entity.

|  | This button will do a bulk re-index of all the documents. |
| --- | --- |
|  | This button will delete the index and re-create it. This is good if you want to ensure all of the previous attributes have been purged from the index. |

# Keeping Entities in Sync

As you'll read later, the entities should keep the index up-to-date as changes are made. A system job has also been created to re-index every night (this ensures that items added through SQL or other means are addressed). The settings of this job can be adjusted under Admin Tools \> System Settings \> Jobs Administration \> Universal Search Re-Index.

# Site Entity

The Universal Search Re-Index job will keep all entities except the Site indexed. The Site entity is a bit different and is discussed in detail below.


---

## Universal Search {#universal-search}

> **Path:** Universal Search

This skill catalogs the chapters of *Universal Search* from the Rock RMS documentation.

Each chapter below is available as a separate reference file. Load only the chapters relevant to the task at hand.


---

## Welcome {#welcome}

> **Path:** Universal Search > Welcome

The basic search capability in Rock is quite powerful, but sometimes you may need more. That's where Universal Search comes in. Universal Search allows you to search multiple types of data at once in a full-text manner. In a sense, it's like Google for Rock. With this great power comes some additional technical knowledge, but don't worry we'll unpack it all here in this guide.


---

## Overview {#overview}

> **Path:** Universal Search > Overview

The first thing that you'll need to enable Universal Search is a search provider. All data in Rock is stored in a SQL Server relational database. Relational databases are great for storing and retrieving large amounts of data stored as records, but they're not so great for doing full-text search. Rock's Universal Search feature relies on a different type of software for hosting the search. We currently support two options: Lucene and Elasticsearch.

# Lucene Provider

Lucene is your go-to for universal search because it requires no additional software to use. Just activate and you're done.

# Elasticsearch Provider

Elasticsearch is an open-source search index used by many of the largest websites including Netflix, eBay and the New York Times. It's free to use but does require that you have the ability to install software on your server. We provide a guide to installing Elasticsearch [in the appendix of this guide](#installingelasticsearch).

If Lucene is the recommended provider, you might ask, "Why would I ever need Elasticsearch?" Good question! Elasticsearch allows you to pass the overhead of indexing and searching to another server. It's also the recommended approach if you are running in a clustered environment. For most organizations, however, it is overkill.

# Understanding How Universal Search Works

Rock is made up of numerous types of data called entities. Entities are things like Person, Group, Group Member, etc. Universal Search supports indexing the following entity types (more could be added in the future based on community response).

- Site
- Person
- Group
- Content Channel Item
- Event Item
- Document
- Business

You might ask, why not index all entities? Working with search is a delicate balance between providing the information the user wants and overloading them with random results. For instance, does anyone want to see results for Workflow Action Types in their search response?

# Custom Entities Are Supported

As a developer, you can enable your own entities to participate in Universal Search. More information on this will be coming in the future.

# Avoiding Global Items, Tags and Repetitive Items

You can use the following CSS classes to tell Rock not to crawl content that is wrapped by the element using them:

- `no-index`
- `nav`
- `navbar`

Content within HTML tags that use these as CSS classes will not be indexed.


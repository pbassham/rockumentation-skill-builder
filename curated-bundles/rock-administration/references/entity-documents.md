---
description: Use when configuring document types and adding document management blocks to entities like people and groups in Rock
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Entity Documents

Want to track documents for a person or group? The *Entity Documents* feature lets you add documents just about anywhere in Rock. You can even add multiple documents of the same type to the same entity, quickly and easily.

If you want to cut to the chase and see what adding a document for a person looks like, we have an example in our [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5#documentstab). In this chapter we're going to dive straight into the configuration, and then see how that configuration can be used to add documents to other types of entities in Rock.

# Configuring Entity Documents

The first step is to define what types of documents you can add to entities. Navigate to Admin Tools \> Settings \> Document Types to manage the types of documents that can be stored for each entity. Pictured below, you can see we've already configured three types of documents, all for people.

![Document Type List Block](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/document-type-list-block-v18.png)

Document Type List Block

You might be wondering why we didn't mix it up a little and show you some example document types for other entities besides people. We're starting with the Person entity on purpose, and you'll see why in a bit.

Click on any row to manage details about a document type or click on the button to add a new document type.

![Add New Document Type](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/add-new-document-type-v18.png)

Add New Document Type

Person documents are the easiest to configure because all you need to do is define your document types as described above. Rock ships with everything else you'll need to start adding documents to people right away. See the [Person and Family Field Guide](https://community.rockrms.com/documentation/bookcontent/5/#documentstab) for an example.

Setting up documents for other types of entities is still pretty easy, but there's an extra step or two you'll need to take. We'll show you what you need in the next section below.

# Adding the Documents Block

In the above section we described how to configure types of documents. That's all you need for Person documents because the *Person Profile* page ships with a dedicated tab for managing documents. However, for entity types other than Person, there's a little more to it. In this section we'll show you what else needs to be done, using the Group entity as an example.

First, you still need to set up a document type as described in the prior section above. In this case, we'll add one with an *Entity Type* of *Group*.

![Document Type Detail - Group](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/document-type-detail-group-v18.png)

Document Type Detail - Group

Now that we have a document type that we can use with groups, we need a way to actually manage those documents. This is where the *Documents* block comes in.

Because we're working with groups in this example, we’ll add the *Documents* block to the *Group Viewer* page in Rock. You can do this from the *Group Viewer* page by using the admin toolbar to edit the page’s zones.

Pictured below, we’ll add the *Documents* block to the Main page zone by clicking the button to add a row.

![Add Block to Main Zone](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/add-documents-block-to-main-zone-v18.png)

Add Block to Main Zone

Adding the block is easy. As pictured below, simply provide a name and select *Documents* as the *Type*. Click Save and then Done to finish.

![Add Group Documents Block](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/add-group-documents-block-v18.png)

Add Group Documents Block

When you first add the *Documents* block to a page, there’s a good chance you’ll see a warning message telling you to “configure a valid context entity” for the block. That just means you need to let the *Documents* block know what kind of entity it’s working with.

To do that, we’ll use the admin toolbar again to access the settings for the *Documents* block. In this example you’ll need to provide an *Entity Type* of "Group" to ensure the block works with groups. While we're here, there are some other block settings you might want to be aware of, as described below.

![Documents Block Settings](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/entity-documents-block-settings-v18.png)

Documents Block Settings

The *Documents* block is now ready to start handling documents for groups. We'll walk through what that looks like in the next section below.

# Managing Entity Documents

With the new block added, we can start adding documents to our groups. Start by clicking the icon in the *Documents* block to add your first document as shown below.

![Add a New Document](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/documents-block-group-viewer-add-doc-v18.png)

Add a New Document

After you add one or more documents for the group (or the entity you're working with) there are several ways to manage those documents from the block. In the example below, we've added two documents that we can now manage.

![Manage Documents - Group Viewer](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/manage-documents-group-viewer-v18.png)

Manage Documents

We've been using groups in the above examples, but don't forget that the *Documents* block works with any entity in Rock.

# Adding Documents Using Workflows

The [Entity Document Add](https://community.rockrms.com/WorkflowActionCategory?Category=15#entitydocumentadd) workflow action lets you add documents to any entity using a workflow. There are a few things to keep in mind when you’re doing this.

As described in the sections above, each *Document Type* is associated with both an entity and a File Type. This means your workflow might get tripped up if it’s working with the wrong type of entity or with a file that doesn’t align with the File Type configuration.

For instance, if the Document Type is configured for the Group entity, and if your workflow is trying to add a document for a Person, it won’t work. The workflow entity and the Document Type entity must match or else you’ll get an error.

Similarly, the document you’re trying to add needs to conform to the [File Type](#filetypes) configuration for the File Type that’s associated with the Document Type you’re using. This will probably only be a concern if the File Type configuration has *Preferred File Settings* that are required. For someone to upload a Person document they need Edit access to both a Person Document Type and the File Type Person Document.

Lastly, don’t be surprised if you’re able to add a document in cases where you think you shouldn’t be able to. For instance, the *Media File* File Type that ships with Rock is intended to be used for audio or video files but there’s nothing stopping you from adding a Word document using that File Type.


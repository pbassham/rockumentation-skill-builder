---
description: "Use when configuring cloud storage providers (AWS S3, Azure, Google Cloud, local file system) for Rock's Asset Management System"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Asset Manager System

Asset Manager System

The Asset Management system gives you first class integration between your Rock system and a remote cloud storage system (such as Azure or Amazon S3). With the Asset field type, you can add an attribute to existing things (such as a Content Channel, Person, Group, etc.) and give your content editors the ability to select files and images stored in your cloud accounts.

# Storage Provider

# Access

Before you get started, you'll need to set up your Asset Storage Provider. Amazon S3, Google Cloud Storage, Azure Cloud Storage and your local Server File System are currently supported out of the box. More asset storage providers may be available in the Rock Shop.

The asset provider is configured under Admin tools \> System Settings \> Asset Storage Providers. This page is where you will configure providers. Depending on the storage type you choose, additional fields will be required as pictured below. This is why it's important to set up your provider first, because you'll need that information to complete the configuration in Rock.

![Asset Storage Provider - File](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/asset-storage-provider-detail-file-v18.png)

Asset Storage Provider Detail - Server File System

![Asset Storage Provider - S3](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/asset-storage-provider-detail-s3-v18.png)

Asset Storage Provider Detail - Amazon S3

# Warning: Signed URLs

If you've chosen to use Amazon S3, you'll be given the option to use signed URLs. Signed URLs are unique on every request, so be careful when using them in RSS feeds or with other content that might be scraped or cached by other 3rd parties. It's possible that these 3rd parties will see that these URLs are constantly changing, and will keep downloading them, which will cause your storage costs to get high. In these cases, use an unsigned URL because they are always the same across all requests.

![Asset Storage Provider - Azure Cloud Storage](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/asset-storage-provider-detail-azure-v18.png)

Asset Storage Provider Detail - Azure Cloud Storage

![Asset Storage Provider - Google](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/asset-storage-provider-detail-google-v18.png)

Asset Storage Provider Detail - Google Cloud Storage

## Google Cloud JSON Key

If you're using Google, you'll need to provide a *Service Account JSON Key* in Rock. To get your key, log in to your Google console and access your *Service Accounts*. Under the *Actions* column for your account click the three dots and choose *Create key*.

![Create Key](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/gcp-setup-create-key.png)

Create Key

You'll need to export your key as a JSON file, so it can be added to Rock. Select JSON as pictured below and click "Create" to download the file.

![Output Key to JSON](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/gcp-setup-output-to-json.png)

Output Key to JSON

Open the downloaded JSON file and copy all of its contents. The full content of the entire file needs to be copied, not just the elements labeled as keys. A quick Ctrl + A and Ctrl + C is all you need.

With the contents of the JSON file copied to your clipboard, you can finish your setup in Rock. Paste the file contents into the *Service Account JSON Key* field as pictured below.

![Add JSON Key to Rock](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/gcp-setup-add-json-key-to-rock-v18.png)

Add JSON Key to Rock

# Asset Management

You can view and manage the files in the Asset Manager under Admin tools \> CMS Configuration \> Asset Manager. This block allows you to view and manage documents in the providers you have configured. Think of this as your file manager for your cloud storage and Rock server.

![Asset Manager](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/asset-manager-v18.png)

Asset Manager

# Adding Content

You might be wondering, when should I use the asset manager and when should I use a file attribute? The difference is subtle. File attributes are best used to attach files to content channel items or people where you don't care about the details of where the file is stored (this is all handled for you in the file type setup). Using the asset manager gives you much more control of where and how the file will be stored. It allows you to select files that are already stored in your cloud provider. This is handy in cases where someone has already uploaded an asset that you want to use. This is common in many media arts workflows.

With that said, there are two ways you can use assets. One is using an asset attribute, and the other is through the HTML editor. We'll touch briefly on both options below.

## Asset Attribute

When you configure an attribute of type *Asset*, you'll be given the option to *Select Asset*. Selecting this will display a modal where you can select or upload the asset.

![Asset Content](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/Asset_attribute_v18.png)

Asset Manager

## HTML Editor

Rock's "WYSIWYG" editor tool also allows you to work with assets. On the toolbar you will see a icon which opens the asset manager to search for your files.

![HTML Content](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/asset_manager_v9_HTML.png)

Asset Manager

These settings are available on both the internal and external editor tools.


---

## Podcasting {#podcasting}

> **Path:** Designing and Building Websites Using Rock > Podcasting

Instead of writing dedicated podcasting tools we added powerful features to Rock’s content channels to enable podcasting. Rock ships with a basic implementation. Feel free to add to it by adding attributes to either the Podcast Series or Podcast Messages content channels.

To help give you an idea of what’s possible we’ve added a few series and messages. Special thanks to Central Christian Church (Arizona) and NewSpring for donating their series graphics. Below is a quick walk through of the various external pages that make up podcasting.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/podcast-homepage.png)

Podcast Watch Page

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/podcast-series.png)

Podcast Series Page

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/podcast-message.png)

Podcast Message Page

Keep in mind these pages are using the Stark theme which is devoid of styling. What you see is a blank canvas for you to create from.

# Podcasting File Types

While you’ll probably host your podcast files on a video hosting platform / content delivery network you may want to change the file type that the series graphics are hosted with. Out of the box we configured the graphics to use the default 'Unsecured' file type. This, however, saves the graphics to the database. There are advantages to doing this, but it does take up valuable database space. You may consider moving to a file type that uses the file system or better yet use one of the plugins in the Rock Shop to store the files on Amazon S3 or Azure.

So, get out there and spread your message!


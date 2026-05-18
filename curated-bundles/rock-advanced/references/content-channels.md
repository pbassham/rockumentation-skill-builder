---
description: "Use when creating or configuring structured content types in Rock, such as blogs, bulletins, ads, and custom content containers for dynamic website content"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Content Channels

Content Channels

Rock's static content tools are great. We've already seen how we can customize our messaging using the HTML editor. Sometimes though, you still need the ability to add structured dynamic content to your site. In the old days that meant firing up a development tool and writing your own code. While custom coding is certainly an option in Rock, in many cases it's simply not needed.

Let's take a look at how Rock's dynamic content tools can have you extending Rock in no time (and without learning C#). Here are the three main components we'll review:

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/components-dynamic-content.png)

Dynamic Content Diagram

# Channel Types

The first concept we'll discuss is channel types. As you work on your site, look for repeating data patterns. Items like web promotions are well-structured, having data items like *title*, *image*, *summary text*, *intended audience* and *content*. While you could edit all of this content with the HTML editor, hopefully you can already see how that would be very tedious and prone to error. Here's where content channel types come into play.

Content channel types help define reusable data structures (think of a container for specific types of data). Rock ships with a couple of these channels already defined. Let's look at a few to see their role and purpose:

- **Website Ads:** This channel type is used to help manage your website promotions. It allows your staff to enter promotion information that your website administrator can approve, with the option to edit, and then publish to the site.
- **Bulletins:** This content type is used to help manage the bulletin creation process.
- **Content Component:** Gives web designers a great tool to control the look and layout of content on a page while allowing content creators the ability to create this structured content on-the-fly directly on the website.
- **Blogs:** The blog content type is useful to build blogs for your organization.
- **Universal Channel Type:** Rock ships with three Universal Chanel Types. Each is a unique and powerful tool to help you from having to create 'One-off' channel types. We discuss these channel types in more detail below.

# Anatomy of a Content Channel Type

As we mentioned before, the role of the content channel type is to define the container and settings for a particular type of content. Let's walk through the administration screen found under Admin Tools \> CMS Configuration \> Content Channel Types.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-channel-type-v18.png)

Content Channel Type

# Content Channels

If content channel types define the structure, content channels represent the implementation. Here's an example: you might have a channel type of *Blog* and channels *Pastor Foster's Blog* and *Rock Solid Church's Blog* that implement this type. You might be wondering why channel types are even needed. The answer is that they help enable reuse. In our blog example above, if you didn't have channel types you would have to define the structure every time you wanted to create a new blog - yuck!

Create a new channel under Admin Tools \> CMS Configuration \> Content Channels.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/edit-content-channel-detail-v18.png)

Add Content Channel

You’re not limited to *HTML* just because a *Content Channel* started that way. By enabling *Is Structured Content*, you can start using the *structured content* editor right away for every new item you add. This means team members who aren’t comfortable with *HTML* can jump in to help write blog posts, update external website ads or collaborate on ministry updates. It’s a great way to share the workload and invite more voices into your communication without losing the work you've already done.

Note that *Content Items* that were originally created with *HTML* will stay that way, but all *new* items will use *Structured Content*.

# Content Channel Tags

Just as you can tag people in Rock, you can also use tags to help identify and categorize content channels. One small difference, though, is only organizational tags can be used with content channels (as opposed to personal tags), and those tags must belong to a category specified when the content channel is configured.

Let's take a closer look at how to set this up.

1. The first thing you need to do to start using tags with content channels is set up tag categories. Categories are created in the Category Manager, found at Admin Tools \> General Settings \> Tag Categories. Create as many categories as you want. Once a category is created you will need to add a Role to the security under the Tag section for each. Otherwise added tags in that category will not be saved.
  

# Using Categories

Each category will have a list of tags. Say you have a "Sermon" category and a "Podcast Sermon" category you would create two tags for each category. Tags are all about how you want to organize your Content Channels. The power is in your hands to create the categories the way it makes sense for your organization.

  
5. The next step is enabling tagging in your content channels. Select the content channel you want to tag from the list found at Admin Tools \> CMS Configuration \> Content Channels and click Edit to modify its configuration. Check the Enable Tagging box, then select the category you'd like to be available for the content channel.
  
7. The final step is creating the tags you'll use with your content channel items. You can create as many as you need. Tags are created in the Tags screen, located at Admin Tools \> General Settings \> Tags. For each tag you create, use the Entity Type of "Content Channel Item" and select "Organizational" for the Owner. Leave the Qualifier Column and Qualifier fields blank. Alternatively, you can add tags directly from the content channel. You will be able to view and edit those tags in the general settings after they've been created if need be.

Now that your categories and tags are set up, you can add tags to content channel items. Simply type the tags you want to use in the "add tag" area of the Content Detail screen and click Save when you're done.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-channel-tags-v18.png)

Content Detail

# Block Settings

You can create a page dedicated to viewing all your content channel tags using the block settings.

# Content Channel Items

Once you have your channels set up, it’s time to bring it all together and add some content. This is done by adding *Content Channel Items* to your *Content Channel*. If your channel is a blog, then the channel item would be a single blog post. You can add items in one of two ways:

1. You can enter content right on the Admin Tools \> CMS Configuration \> Content Channels screen under the channel details by adding a row. This is more of an administrative screen.
2. Specific content entry pages can be found under Tools \> Content. These are the pages that your staff can use to enter content, and your communications team will use to approve and manage entries. These screens are covered in the [Communicating with Rock](https://community.rockrms.com/documentation/bookcontent/8/) manual in detail.

The example pictured below is a sample content channel item entry for a Podcast series. The fields you see on this page may vary according to your configuration as described in the prior sections.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-item-detail-edit-v18.png)

Content Channel View Configuration

# Lava In Your Content

You can use Lava in the *Content* area of the content channel item. However, for it to render on a Content Channel Item View block, the block's settings must be updated. The *Lava Template* block setting needs to contain `{{ Item.Content | RunLava }}`.

# Security Rights on Content

So now that we have covered content channel items, you might be wondering are there permissions that I can set up for these content channels? If you said yes, perfect you’re in the right place. If not, maybe check it out – just in case!

Rock provides special security rights, also known as verbs – that work to grant users permissions to specific pages. Right out of the box, Rock offers the traditional three settings – view, edit and administrate.

In addition to the basic three security rights, content channel items also have interact. Now on face value you might be thinking isn’t that the same thing as view or edit? Interact is similar – but totally different – in the best way possible.

Think of it this way…Say your organization creates high quality content that you want to offer to your website visitors. You want every individual who views your site to see that the content exists, so you give them view rights. However, only those who have interact rights will be able to watch or read the full details.

# Another Lava Tip

For the Lava enthusiasts, there is Lava short code to make this happen for you. Try out the Lava filter “Has Rights To”.

# Allow Approvals

If you have a staff member who needs to approve items before they go live, you'll set that up at the *Content Channel Type* entity level. Simply create a *Security Role* for your team, navigate to Admin Tools \> Settings \> Entity Administration \> "Rock.Model.ContentChannelType" and allow the *Approve* permission for that role.

# The Universal Channel Type

As you start brain-storming ideas for using content channels you'll find yourself needing to create one-off channel types that will be used by a single content channel. For instance, when we set out to create the [Lava documentation](https://community.rockrms.com/lava) we first needed to create a new channel type called 'Lava Channel Type'. We could then add a new content channel 'Lava Documentation' that implemented that type. Creating the type for use with a single content channel was wasted effort, especially since content channels can add their own item attributes.

Hence the generic *Universal Channel Types* were born. These channel types are generic types that you can use to build your one-off content channels from. They have no attributes defined, so your channel will define all of the item attributes you need. No wasted effort. The only difference between each type is what date fields are available, or if no dates will be used.

# No Magic Here...

There's nothing special about the Universal Channel Types. We created them to save you time and also provide a consistent (well known) type that we (and plugin developers) can use to add new content channels from in the future. Yep... we're always thinking ahead!

# Showing a Channel on a Page

Now that you understand how to create content channels and items, the next step is adding them to your external website. The main block you will use to format channel content is the *Content Channel View* block. Adding this block to a page zone will allow you configure the settings listed below.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/content-channel-view-block-settings-v16.png)

Content Channel View Configuration

# But Wait... There’s More

The settings above provide a ton of capabilities when adding dynamic data to a page. This block can also respond to specific query string parameters to alter its behavior. Let’s look at each of them:

- **Item:** If you pass in an item’s numeric id, the block will only load that specific item into the Lava merge fields. The query string parameter you add to the end of the URL would look something like `?Id=27`.
  
- **Page:** If you have more items than fit on a single page, you can navigate between pages using the *Page* query parameter. Simply pass in the page number you wish to display, like `?Page=2`. If you pass in a page number beyond the last page, the last page will be shown. If the page number is less than 1, the first page will be displayed.
  
- **Attributes:** Content channel items can have attributes, and you can reference those attributes in the query string parameters. You'll use the attribute's *Key* and *Value* to do this. For instance, let's say you have an attribute indicating the general topic of content channel items. If you just want to see items related to "Finances" then your query string might look like `?Topic=Finances` (or `?Topic=2` if the attribute is a single/multi-select field coded with numeric values).  
	  
	Rock also supports passing in multiple values for Defined Value attributes that have 'Allow Multiple' enabled. In that case, the value you want in the query string parameter will be the GUID of the Defined Value you're looking for. Multiple values (i.e., multiple GUIDs) can be separated by a comma in the query string. This will return any items that have at least one of the provided values.

# Showing a Single Item on a Page

Your *Content Channel View* block is great for showing all of the posts in a channel, but what about a block to show a single content item? You can use the Content Channel View block and use an ID or Title parameter, but we really want more SEO-friendly URLs. Enter the *Content Channel Item View* block, which brings you this and more.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/ContentChannelViewDetail-v13.png)

Content Channel Item View Configuration Options

This block gives you the option to "lock" it to a specific channel so that you can have a sermon series called "Moneywise" and a blog post titled "Moneywise" without having to worry about your pages getting confused about which item to show. To limit its search to a single channel, simply specify the *Content Channel* in the top input.

The *Lava Template* is the template which will be used to determine what shows up on the page. Initially, this will simply show the title of the item and the content below, but you can get really detailed in specifying how this page will be laid out. Using the `Item` object, you can access the properties and attributes of your content item for display on the page and even provide links to other pages.

In the *Visitor Settings* section, you can choose whether an interaction is logged every time someone views an item on a page with this block. You can also specify a Workflow Type that should be launched whenever this block is used to show an item. The workflow will be passed a *Person* entity which you can use to store the person who viewed the page (if they're logged in). If your workflow has a *Content Channel Item* attribute with a key of `ContentChannelItem`, that attribute will be automatically filled in as well. You can use that attribute to discover which item they viewed, and optionally perform different actions based on that information.

The *Social Media Settings* section will let you link any item attributes you added to the channel to special meta tags on the page. For instance, if your blog post has an image they've provided in an attribute, you might want that image to be shown on the preview that appears in Facebook when someone shares your post there. But you might want to ask your post author to provide a different image for Facebook than the image for Twitter, so you can use these fields to specify which attribute will be used for each social network.

Finally, in *Advanced Settings*, you can specify what this block calls a slug, if you use that parameter in the URL. For example, if you wanted to provide a URL with `?sermon=MoneyWise` at the end instead of `?slug=MoneyWise`, you could type "sermon" into this box, and it would look for an item with a slug matching the "sermon" parameter in the URL. (Of course, using parameters like this would break the SEO friendliness that this block was designed for, so it would be an unusual case that you would want to put anything in this field). Usually, you'll just want to access the page using an address like "/sermon/MoneyWise" which would match a Page Route of `sermon/{slug}`.

You can also specify whether the output and the item content itself is cached to speed up page loads. You can also allow the item being viewed to set the page title so that your users aren't seeing a generic title like "Our Sermons" when they load a page that is showing a sermon called "Our Cloud of Witnesses".

# Tips and Tricks

Below are some tips and tricks to help you maximize your usage of dynamic data:

- When you enable the ability to use Lava in content items, be sure that your Lava is set up to display data when the current user or other merge items are not available. When the content is made available via RSS, many of the merge fields will not be available.
- The RSS feed for a channel can be linked to from the address: `http://yourserver/GetChannelFeed.ashx?ChannelId=N` where *N* is the channel id.

# Publishing Content Through Feeds

Once you enter your content, you may want to make it available through feed systems like RSS. Rock provides an endpoint that allows you to push your content in this way. The URL for this end point is:  
`http://yourserver.com/GetChannelFeed.ashx?ChannelId=X`

The only required parameter is the ChannelId of the channel you want to publish. This channel must be configured to *Enable RSS* for the feed to return content.

The structure of the feed is defined by a Lava template. The RSS template is used by default, but you can create and configure additional templates to suit your needs. These templates are managed under Admin Tools \> General Settings \> Defined Types \> Lava Templates. Once you create a new template, you can enable it by placing the *TemplateId=* parameter in the query string. The TemplateId will be the Defined Value's Id. Note that the defined value can also set the MIME type that should be used with the template.

Other query string parameters you can pass into the handler include:

- **Count:** Limits the number of content items to return. The default value is 10.
- **TemplateId:** The defined value id of the Lava template you wish to use.
- **EnableDebug:** If present on the query string (with any value), the feed will output all available merge fields for you to view.

# Child Content Channel Items

Content channel items can have child items. These child items can be from other channels. For instance, the podcasting feature in Rock uses this capability. The 'Podcast Series' content channel items are configured to have child items from the 'Podcast Messages' content channel. This concept is powerful as it allows the series items to have their own attributes and settings, yet they can work together to create robust applications.

When adding a child content channel item, you have the ability to select an existing item, or to create a new item. This is helpful as it minimizes the amount of clicking required to add child items.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/contentchannelitem-addchild-v18.png)

Adding A Child Item

Keep in mind that a single channel item can have more than one parent. Child items can also have their own children. The sky's the limit on what you can create.

# Content Channel Item Self Update

You already know from the sections above that content channel items will appear in the content channel on or after the Start date and before the Expire date. But what if you have an item that needs to be shown or removed more dynamically, perhaps based on an event that only happens every few months? You could manually update the Start and Expire dates every time the event approaches and passes, but that can be a pain. That’s where the Self Update feature comes to the rescue.

Content channel items can be [shown on your website](#showingachannelonapage) in several different ways. It’s all driven by the [Lava](https://community.rockrms.com/Lava) template you provide. Because Lava can look at the content channel item’s attributes, you can use those attributes to control how items display on your site. The best part is that the *Content Channel Item Self Update* job automates changing those attribute values for you, automatically changing what’s shown on your site.

## Getting it Set Up

There are a few steps to this process, but the automation that comes with it makes it worth the effort. You’ll need to get some attributes set up for your content channel items, and then you’ll need to tell the *Content Channel Item Self Update* job how to find those attributes. There are a couple more steps along the way, and we’ll walk you through it all below.

### Adding Content Channel Item Attributes

You’ll start by adding at least two new attributes to your content channel items. One of the attributes must be of type [Lava](https://community.rockrms.com/Lava). We’ll talk about the second attribute in a bit, but let’s focus on the Lava attribute for now. Pictured below is an example of how you might set this up from Admin Tools \> System Settings \> Entity Attributes using an Entity Type of *Content Channel Item*.

![Lava Attribute](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-item-self-update-lava-attribute-v18.png)

Lava Attribute

You might notice there isn’t a *Default Value* provided in the example pictured above. You can certainly add your Lava here so that it automatically gets applied to your content channel items. Just keep in mind that changing the *Default Value* Lava here will not automatically change the Lava that’s already been applied to existing items.

Next, let’s add our second attribute. In this example we’re going to keep it simple and use an attribute of type Boolean. This will give us a basic ‘Yes’ or ‘No’ to work with. We’ll use this attribute to indicate whether the content channel item should be displayed on the website.

![Boolean Attribute](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-item-self-update-boolean-attribute-v18.png)

Boolean Attribute

### Setting the Attribute Values

With both attributes in place, we’re ready to see how they look on the content channel item itself. You’ll need to access the item to fill in values for these attributes initially, unless they have been populated by a *Default Value* configured on the attributes.

![Attribute Values](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-item-self-update-attributes-v18.png)

Attribute Values

Pictured above you can see the Lava we’re using for this item, and the *Show Item* attribute we also added.

The Lava in this example will return either 'True' or 'False' depending on whether an event’s date is in the future. This Lava will be evaluated by the *Content Channel Item Self Update* job when it runs. The result is used by the job to update the *Show Item* attribute, which can accept a value of 'True' or 'False'. Remember, the Lava must produce an output that makes sense to the attribute being updated by the job. If our Lava produced a date, then this wouldn’t work because a date doesn’t make sense to our Boolean *Show Item* attribute.

### Setting up the Job

With the attributes and their values in place, the hard part is over. All we need to do now is tie it all together by setting up the job.

![Job Configuration](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/content-item-self-update-job-v18.png)

Job Configuration

With the job and attributes in place, our webpage can now reference the *Show Item* attribute’s value to have Rock automatically display or hide this content channel item.


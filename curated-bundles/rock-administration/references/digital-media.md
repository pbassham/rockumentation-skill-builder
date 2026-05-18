---
description: "Use when a user needs to understand video engagement metrics, view play analytics, track viewer behavior, or analyze digital media performance data in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Digital Media

Digital Media

Video is a must in any modern digital strategy. Not only do Rock's media features help with the playback of digital assets, they also give you full access to data about plays, engagement and overall effectiveness of your videos. Not to mention, Rock can automatically create a Content Channel Item to post videos you've uploaded to a video service provider. This makes it easy to get videos on your site and to track engagement for those videos, all within Rock. In this chapter we'll look at the media features available to you, but to see more on implementation check out our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#PublishingDigitalMedia) manual.

# Media Analytics

Let's start by taking a look at the wealth of information available at your fingertips from the *Media Element* analytics page. From here you can see who engaged with a video. As you learn about this page, you'll find it quickly becoming a critical part of your digital strategy. You can navigate to this page by going to Admin Tools \> Settings \> Media Accounts \> \[Your Account\] \> \[Your Folder\] \> \[Your Media Element\].

For instance, in the screenshot below you can see engagement on a sample training video. The graphs overlayed on top of the video show us a spike in engagement and rewatches near the beginning of the video, telling us something important happened there (that's where the navigation to the Campus configuration is provided). Pretty insightful, right? Imagine how your digital strategy could be informed by the knowledge you gain about what people are actually watching in each of your videos. What's more, you can move your mouse over the video to view the thumbnail at any given point in the video, telling you exactly what content people are engaging with.

We can also see overall engagement, a play count, and the total minutes watched. The *Plays Per Day* graph is a great tool for easily monitoring engagement with your video over time. Down below we can also see Ted Decker watched 100% of the video and, shown in dark blue, rewatched certain portions near the end. On the other hand, an unknown person watched 88% of the video, having skipped over the first part. Having this level of detail for each individual is something you won't find with other digital media services.

![Media Analytics](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/rm-media-element-with-callouts-v18.png)

Media Analytics

Bringing this all together, simply looking at the analytics and engagement patterns brings you insight into why some videos are more popular than others. It could be that certain speakers or specific topics garner more engagement than others. With all of this data provided for you, you can easily find where to refine your digital strategy to increase engagement.

There's another feature we should mention here that you can't actually see but is very important (and pretty cool). Rock's Media features work across platforms. That means someone can start watching a video on mobile, then switch over to web and pick up right where they left off, even days later. You can choose to have those separate watches combined into a single watch or multiple watches on the analytics page by a simple update to the Media Player shortcode Lava, which we'll discuss later.

# Configuring Media Accounts

It all starts with the *Media Account*. If you have media coming from different sources, like YouTube or Vimeo, then you’ll need a separate *Media Account* for each.

Typically, your first step will be a visit to the Rock Shop. There you'll find the plugins you'll need to sync Rock with your external video hosting provider. Our examples in this guide use the Vimeo plugin, but you could also use the YouTube plugin. More may be added in the future by plugin developers.

To add or manage accounts, navigate to Admin Tools \> Settings \> Media Accounts. Click the button to add a new account. Refer to the plugin documentation for details on initially setting up your *Media Account*, typically requiring getting an API key.

Out of the box Rock ships with a Local Media Account *Account Type* that you can use to manually set up video and audio assets. To add this account simply give it a name and select *Local Media Account* as the *Account Type*. Keep in mind that if you're using the Local Media Account it will be a very manual process. You'll need to create the folders and meta data yourself, which is all automated if you're using a video provider plugin.

## Media Folders and Media Elements

Rock uses *Media Folders* to group and organize individual *Media Elements*. For instance, the screenshot below shows the "RockU - Core" folder, which contains several videos (i.e., Media Elements) like the one for Campuses described at the start of this chapter.

The video service provider plugin that you're using will automatically create and manage your folders and elements for you. This is done through Rock's *Sync Media* job. This job will go out to your external video provider account and update Rock with additions or changes you've made. That means when a new folder or video gets uploaded to your account you don't need to do anything to get it added to Rock.

For each *Media Folder* you can choose what happens when new videos are added. For instance, you can have Rock automatically create a new Content Channel Item for the new video. You can also launch a workflow to perhaps alert someone that the new Content Channel Item needs their review. Let's take a closer look at these options.

![Media Folder](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/rm-add-new-media-folder-v18.png)

Media Folder

# Publishing Media

Once you have your media in Rock, you'll want to give people access to it. Depending on your digital strategy, there are different options for doing this.

As described in the prior section above, you can automatically create a new Content Channel Item whenever a new media element is added to a folder. This is a great way to publish your content using familiar tools and features that ship with Rock. Just remember that your Content Channel needs an Item Attribute of type "Media Element" to store the video.

For more details on publishing your media using the methods described above, see our [Designing and Building Websites Using Rock](https://community.rockrms.com/documentation/bookcontent/14#PublishingDigitalMedia) manual.

# Digital Media in Workflows

For many organizations, digital media is part of a training process. For instance, a new volunteer might need to watch certain videos to better understand the organization and how it works. Or you might have employees or volunteers who are required to watch a video as part of their job. Either way, you can accomplish tasks like these using Rock's media features and workflows.

All you need to do is use an attribute of type "Media Watch" in your workflow's form, and you're ready to go. The way it works is you can set a Completion Percentage, which indicates how much of the video the person is supposed to watch. This means the workflow form won't validate until the person has reached the percent of completion you set. The individual must actually watch that percentage of the video...skipping ahead doesn't count because the percentage represents unique seconds of the video.

![Media Watch Workflow Attribute](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/rm-media-watch-workflow-attribute-v13.png)

Media Watch Workflow Attribute

# Media Watch on Workflow Entry Form

When you're setting up the Form action on your workflow, make sure that the media watch attribute is both *Visible* and *Editable*.


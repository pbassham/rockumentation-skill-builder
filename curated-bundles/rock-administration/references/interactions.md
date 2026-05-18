---
description: "Use when you need to understand how Rock tracks user interactions across websites and communications, including mediums, channels, components, and sessions"
source: "https://community.rockrms.com/documentation/bookcontent/9/368"
sourceLabel: Rock Admin Hero Guide
---
> **Path:** Rock Admin Hero Guide > Interactions

Picture this: your website is a mystery, and you're the detective. How do you know what people are doing? Are they clicking, exploring, or just passing through?

Interactions in Rock let you track every move. Each page visit, email click, and session detail gets recorded. It's your backstage pass to understand how people engage with your content. But here’s the twist—it’s not just about tracking behavior. With Interaction Intents, you also discover why people engage. What brought them to that page? What’s their motivation?

Under Tools \> Interactions, you’ll find the answers. Interactions help you uncover deeper insights to improve your website, communications, outreach strategies and much more.

# Overview

Think of the process like a flowing stream, with each part naturally leading into the next. As we follow the flow, we’ll use the diagram below to guide us.

![Interactions Diagram](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/interactions-diagram-v16.png)

Interactions Diagram

At the source, we have *Mediums*. These are very broad categories like "Website" or "Communication" that start the flow of information. From here, the stream moves into *Interaction Channels*, which give us more specific details. For example, under the "Website" medium, you have channels like "External Website" or "RockRMS" (your internal site), showing which website is involved.

As the stream continues, we hit *Interaction Components* which represent specific webpages or communications. At this point we should also mention *Sessions*, which capture a single visit to a site. Communication interactions, though, don’t have sessions because they’re quick, one-time actions.

Finally, the stream reaches its endpoint: the Interaction. This is where the details flow together, showing who did what, when, and how.

Remember, the goal is to understand the big picture. Don't be overwhelmed by the details.

# Interaction Channels & Mediums

Let’s take a closer look at *Interaction Channels*, which are like the doorways to all the data we gather from interactions in Rock. Interaction channels provide a broad container where we will store sets of related interactions. For websites, an Interaction Channel represents the specific site someone visited, like your external public site or your internal admin site.

Now, to make things easier to manage, Interaction Channels are grouped using a *Medium*. A Medium is a way of saying, "Where is this data coming from?" For example, "Website" is a Medium for interactions that occur online, like page visits, while "Communication" covers things like someone opening an email. By grouping channels this way, it becomes a breeze to figure out where specific activities come from.

![Interaction Channels](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/interaction-channels-v18.png)

Interaction Channels

# Interaction Components

Let’s break it down a little further with *Interaction Components*. Components represent the specific parts within a Channel that people engage with. Think of them as sets of interactions.

For Channels under the Website medium, Components are the individual pages that someone views. For communication channels, Components track individual emails and SMS messages. Pictured below is an example of a Communication channel where each Component represents an email.

![Interaction Components](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/interaction-components-example-v18.png)

Interaction Components

By understanding Interaction Components, you can dive deep into the details of what someone interacted with. This helps you see which page was viewed or which email was opened.

# Interactions

Now, the fun part—when you get to interactions, you can see even more details. For instance, you’ll find out that on 10/18/2024 at 5:21 PM Ted Decker opened an email you sent. If you’re looking at a channel with a Medium of Website, then the interactions it contains will tell you who visited a page, which page was visited, and when it was visited. These details give you a deeper understanding of how people are engaging with your content.

The image below shows a list of Interactions coming from an email. Here we can see that several people opened the email at the date and time shown on the screen.

![Component Detail](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/interactions-example-v18.png)

Component Detail

This same structure applies to all types of interaction channels. Whether it’s a website, a communication, or something else entirely, each channel holds components which contain sets of interactions.

# Interaction Sessions

An *Interaction Session* is like a snapshot of the person's entire visit to your site. It groups all the interactions that took place during a single browsing session, capturing important details like which device the visitor used, when the session began, and how long they stayed. Interaction. Sessions give you a full picture of a person’s overall experience during their visit, even if they hop between multiple pages.

![Interaction Sessions](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/interaction-sessions-v18.png)

Interaction Sessions

In some cases, when a someone accesses something specific (like a group in the Group Viewer) clicking the “Group Viewer” link will not only take you to the Group Viewer, but it will also take you directly to that group. Pretty nifty, right?

It’s important to note that not all interaction channels track session information. For instance, in the case of the Communication channel, the concept of a session doesn’t really make sense because the person is just opening an email, not browsing your site over a period of time.

# Interaction Intents

What if you could not only track what pages people visit, but also why they’re visiting? That’s exactly the magic of Interaction Intents. These powerful little tags let you attach purpose to your pages and content, giving you a whole new layer of insight into your web traffic. Whether someone’s checking out your youth ministry page or diving into discipleship resources, you’ll know not just that they visited, but what drew them in or kept them there.

Rock comes with a couple of pre-loaded intents, and a Content Channel for tracking them. The intents are "Discipleship" and "Youth Interest."

![Interaction Intents](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/interaction-intents-v18.png)

Interaction Intents

You can tag pages or content channel items with these intents. So, let’s say you have a page packed with resources for young people or their parents—you’d tag it with “Youth Interest.” Before Interaction Intents, all we could say was “Person A visited Page B.” Now, we can add: “…because of the youth ministry content!”

So, are you ready to dive into crafting your own list of Interaction Intents? In Rock, Interaction Intents are managed through a Defined Type Admin Tools \> Settings \> Defined Types called *Interaction Intent*. Initially, you’ll see some predefined intents, but don’t stop there—be sure to add your own. Tailor your intents to match the specific goals and priorities of your ministry, ensuring your interactions tell the full story of what matters most to you.

![Interaction Intent List](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/interaction-intent-list-v18.png)

Interaction Intent List

Once your list of intents is good to go, you can start assigning them to Content Channel Items and Pages. And if you want to get even more creative, you can use Lava to capture intent data beyond just pages and content items. We’ll get into that fun stuff a little later.

## Adding Intents to Content Channel Items

Now let’s talk about using Interaction Intents with Content Channel Items. It’s a breeze! Once you’ve got your Intents all set up, putting them to work is very simple.

Head over to Admin Tools \> Settings \> Content Channels and select the channel that contains the items you want to tag with an Intent. As pictured in the image below, you’ll see a list of your Intents. Just pick the ones that match the purpose of the content. Now you have a way to gain insight into why someone engaged with that content channel item.

![Content Channel Item Intent](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/content-channel-item-intent-v18.png)

Content Channel Item Intent

Don’t forget to ensure that the block displaying the item has interaction logging enabled (see screenshot below). Otherwise, you’ll miss out on capturing all that amazing data!

![Enable Interaction Logging](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/enable-interaction-logging-v16.png)

Enable Interaction Logging

## Adding Intents to Pages

Now, let’s move on to adding Intents to web pages—because why should Content Channel Items have all the fun? This process is just as easy, but now we’re talking about tagging whole pages with your carefully crafted Intents.

To start, go to Admin Tools \> Settings \> Pages and edit the page you want to tag with an Intent. Under the Advanced Settings panel (pictured below), you’ll find the place to add Intents. Just select the ones that best match the purpose of the page, and boom—you’re giving your data an extra layer of meaning.

![Add Intent to Page](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/add-intent-to-page-v18.png)

Add Intent to Page

With just a few clicks, you’re not only tracking where people go, you understand why they go there!

## Logging Interaction Intents with Lava

We know flexibility is key, and we didn’t want to box you in when it comes to logging Interaction Intents. That’s why we’ve introduced a Lava command that lets you write an Interaction Intent wherever Lava is in play. Yep, that means you can track intents beyond just pages and content channel items. Basically, anywhere you can write Lava, you can record those valuable insights.

For all the details on how to harness this feature and start logging Intent interactions with Lava, head over to our [Lava documentation](https://community.rockrms.com/lava/commands/interaction-intent-write).

![Interaction Intent Write](https://rockrms.blob.core.windows.net/documentation/Books/9/1.17.0/images/interaction-intent-write-v16.png)

Interaction Intent Write

## Reporting on Intents

Let’s look at how you can easily access and analyze your Interaction Intents data.

Rock comes equipped with a built-in Data View filter designed specifically for Interaction Intents. All you need to do is select the intents you’re interested in, set the frequency of interactions, and apply date criteria. In just a few clicks, you’ll have valuable insights into member engagement data.

![Interaction Intent Data View](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/interaction-intent-data-view-v18.png)

Interaction Intent Data View

For more details on how to work with Data Views, be sure to check out our [Taking Off With Reporting](https://community.rockrms.com/documentation/bookcontent/6#filteringusingdataviews) manual.

# PBX CDR Records

A PBX, or Private Branch Exchange, is a telephone system in an organization that switches calls between people in that organization on local lines while allowing them to share several external phone lines. In short, it allows Rock to talk to the phones within your organization. PBX CDR Records downloads phone call detail records for the calls made on those phones and stores them in interaction tables. This valuable data helps you map the real-life relationships that exist within your organization. It also allows you to use click-to-call technology, where Rock places your calls for you with the click of a button.

You'll need a plug-in to let Rock talk to your phone system. You can write your own, or you can use one of the plugins available in the Rock Shop, such as Digium Switchvox. Additional PBX plugins will be added as this technology becomes more widely used.

# IP Address Geocoding

Rock includes a built-in component called *GeoLite2 Data* created by MaxMind ([https://www.maxmind.com](https://www.maxmind.com)). This tool maps an IP address to a rough, physical location. Why would you want that? Well, there are a wealth of IP address data in your Interaction's `InteractionSession` table that you could use to "see" where your visitors are coming from. For instance, you can get the person's IP address, the country, and more, as detailed in the chart below.

Using what's called the *Rock Gateway* HTTP Module, Rock efficiently updates geocoding details in the `InteractionSessionLocation` table for all incoming web requests.

The table below outlines the specific properties available in this data.

| Property | Description | Example |
| --- | --- | --- |
| CountryCode | This is a two-letter code that represents a country. | US = United States   CA = Canada   MX = Mexico |
| GeoPoint | The geopoint is the geographical location (latitude/longitude) associated with the IP address, telling you where visitors to your site are coming from. | \-121.88996 37.33262   31.1326 -26.31511   9.49101 51.29926 |
| Location | For the United States, the location will be the city and the state associated with the IP address. For other countries you may see a region, province or country. | Sun City, Arizona   London, England   Sydney, New South Wales |
| PostalCode | This will be the zip code for visitors from the United States. For other countries you may see different types of codes. Some locations will not have a PostalCode. | 85029   SL1   114 46 |
| RegionCode | For the United States, this will be the abbreviation for the state the person is in. In other countries this code may represent a region, province or country. | AZ = Arizona   EN = England   QC = Quebec |

As an added bonus, a `Geolocation` merge field will be available for use in your Lava that runs on a Rock page:

# Lava Example


Hi {{ CurrentPerson.NickName }}... looks like you're in {{ GeoLocation.RegionCode }}.

Hi Ted... looks like you're in AZ.

Currently, the only place you'll see this data will be in [Media Analytics](#mediaanalytics). Otherwise, to use this data you'll need to do a little coding and reference the `InteractionSessionLocation` table.

# Ipregistry Service No Longer Needed

If you previously set up IP Address Geocoding using Ipregistry in an earlier version of Rock, you can now cancel that service. Starting with this version, Rock no longer relies on Ipregistry for IP address geocoding. Geocoding is now handled internally, so no additional configuration is needed.

## Blocking Access by Country

Much like your church might have security guards to protect the building or limit access to specific rooms, your site can have the same. Geo-blocking lets you control who gets in based on location. Whether you’re safeguarding the entire site or just certain pages, this feature can help you stay compliant with regulations, protect user privacy, and most importantly, keep bots from flooding your site with spam. Think of it like installing a gate around your website. Bad actors see the barrier, but your invited guests are welcomed right through the door.

Now let's look at how to set it up, both for your entire site and individual pages.

### Page-Level Blocking

Block access at a page level—probably pages with more sensitive info like missionary details or financial information. Hover over the bottom of your screen to bring up the Admin Toolbar, then select to access Page Properties. From there, click to block a country.

![Page properties showing the restricted countries field in advanced settings.](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/Page-Properties-Restricted-Countries-v18.png)

Page-Level Country Restriction

### Global Blocking

Go to Admin Tools \> Settings \> System Configuration. Under General Configuration, select to block a specific country.

![System configuration highlighting the Countries Restricted from Accessing setting.](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/System-Configuration-Restricted-Countries-v18.png)

Site-Level Country Restriction


---

## Insights {#insights}

> **Path:** Rock Admin Hero Guide > Insights

> "You can't manage what you can't measure."
> 
> \-Peter Drucker

Ask any ministry leader and they’ll tell you how crucial it is to understand the makeup of your congregation. The Insights feature gives you a powerful tool to do just that. With easy-to-read graphs and statistics, you can gain valuable insights (see why we called it that?) into the completeness of your church’s data and the demographics of your congregation.

But it's not just about collecting data. Insights are used to make informed, data-driven decisions about how to best serve your congregation. For instance, if you notice that there is a disproportionate number of men versus women, you can develop specific outreach programs to attract more women to your church. Or you might notice that you’re not collecting enough of the right types of information. Either way, Insights help you target areas of potential growth.

To access Insights, navigate to Tools \> Insights.

![Insights](https://rockrms.blob.core.windows.net/documentation/Books/9/1.18.0/images/insights-v18.png)

Insights

Many of these items has a corresponding metric under the Insights Metrics category. Having this data in metrics means you can see changes over time.


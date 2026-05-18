---
description: "Use when setting up and configuring personalization segments to display dynamic content based on visitor characteristics, behaviors, or Rock database attributes"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Personalization

Churches need to focus on getting the right content to the right people, both during the weekend and throughout the week. That's why Rock's personalization features are critical to your digital strategy. They enable you to have content on your site that is dynamic and custom tailored for the person viewing it. This ensures visitors to your site are seeing relevant content personalized for them, even when the person isn't logged in.

For instance, you might want to prominently feature information about childcare to adults who have visited your children's ministry page recently. Or you might want a special welcome message that only shows if it's the first time the person has visited your site. These are just a couple of simple examples to get you thinking about how personalization can be used in your organization to show relevant content that directly applies to the person viewing it. The pictures below show an example of personalization that's based on an IP address of a college campus.

![Showing Content for Students](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/personalization-aggies-example-v14.png)

Showing Content for Students

![Showing Content for General Public](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/personalization-standard-example-v14.png)

Showing Content for General Public

Before you can start using Rock's personalization features there is some configuration you'll need to do. You'll need to set up *Personalization Segments* and *Request Filters*.

*Personalization Segments* have to do with the characteristics about the individual. These characteristics can be related to any data in Rock (e.g., location, status, gender, age, class participation, etc.) or their recent browsing behaviors (e.g., pages they've visited, time since their last visit, etc.). You could use a personalization segment to identify males over 35 who have recently visited your small groups page. This lets you customize content based on the person and their actions.

*Request Filters* relate to the technical characteristics of the visitor's browsing session. You could use a request filter to show content only if the person is on a mobile device, or if they're coming from a certain IP address.

Aside from your segments and filters, you'll also need to make an update to your site configuration. We'll walk you through all these items below.

# Personalization Segments

As we mentioned earlier, personalization segments let you filter content based on something about the person (think Data View) or based on a person's browsing history. We have data about people in Rock, so it's only natural we would personalize content using Rock data. For instance, you might want information on baptisms to display only if the person visiting your site has not been baptized. As an extension of that, you could have content that only shows to people who have been baptized but haven't taken a next step class. Or you may want some content to target men who have visited your men's retreat info page but have not yet registered. Similarly, you could have special content for people who have visited your camp webpage but don't have a camp registration. These are just a sample of the options we'll cover in this section.

You'll want to think strategically about how your segments are configured. The best configuration is to have simple segments that can be reused in different contexts. Some segments will last longer than others depending on the content they're applied to. Remember, you can filter on attributes about a person AND their previous activities on your website.

To view or configure personalization segments, navigate to Admin Tools \> Settings \> Personalization Segments.

![Personalization Segments](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/personalization-segment-detail-v18.png)

Personalization Segments

# Data Views

The data view for *Person Filters* must be persisted. This keeps things fast, but means the data is not in real time.  
  
Also note that if you're using a data view then it's impossible to use the segment with [anonymous visitors](#howpersonalizationhandlesanonymousvisitors).

Every filter area where you have conditions listed must match for a person to meet the conditions of the segment. For instance, if you have a Person filter and a Session filter, the person must meet both requirements to be selected by the segment. This is pointed out on the page itself, reminding you that these filters are linked together with an `AND` condition.

You can, however, use `OR` logic within each of the filter areas by toggling the Any/All button. Select *Any* if any one of the filter's conditions can be met or use *All* if they all need to be met. For instance, you might use the segment to filter for people who have visited your *New Here* page OR your *Connect with Us* page. Combine that with a data view that pulls only females, and you have a segment for women looking for information about your church.

# Request Filters

Request Filters relate to the technical characteristics of the person's visit to your site. You can use Request Filters to show content only if the person's IP address falls within a certain range, or only if certain query string parameters are present in the URL. With Request Filters, you don't need to know who the person is.

To access request filters, navigate to Admin Tools \> CMS Configuration \> Request Filters.

![Request Filters](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/request-filter-detail-v18.png)

Request Filters

# Site Configuration

The last step in getting Rock ready for personalization is to update your site's settings under Admin Tools \> Websites. For each site that you want to work with, check the box for *Enable Personalization*. While you're there, you'll also want to check the box for *Enable Visitor Tracking*, which we'll talk more about in the next section below.

![Enable Personalization](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/personalization-enable-personalization-v18.png)

Enable Personalization

# How Personalization Handles Anonymous Visitors

If someone comes to your site and we don't know who they are (i.e., they're not logged in) we consider them an anonymous visitor. Even though we don't know who this visitor is, we can still personalize content for them using a browser cookie.

When an anonymous visitor comes to your site, they'll get a cookie placed on their browser. This will start tracking certain actions, like page views. Using a cookie allows us to personalize the content they see even though we don't know who they are. Then, Rock will recognize them and know where they've been when they come back later. By default, this cookie lasts 365 days, but you can change that by navigating to Admin Tools \> System Settings \> System Configuration and updating the *Visitor Cookie Persistence Length*.

For all of this to work, you'll need to turn on *Enable Visitor Tracking* for each site where you want tracking to occur. This setting can be found under Admin Tools \> Websites.

![Enable Visitor Tracking](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/personalization-enable-visitor-tracking-v18.png)

Enable Visitor Tracking

Ideally visitors won't stay anonymous forever. We want them to log in. When they do, their page views are seamlessly switched over to the known person.

You won't need to know this, but for those who are curious, what's happening behind the scenes is your anonymous visitor is tracked under a Person Alias record. When the person logs in, that Person Alias record is linked to their Person record.

# Personalizing Content Channel Items

Often, content is published to your site using Content Channel Items. Rock provides a built-in way to show, hide or prioritize Content Channel Items based on whether the person viewing them meets the criteria of the personalization segments or request filters you've created.

Personalization for Content Channel Items is enabled at the Content Channel level under Admin Tools \> CMS Configuration \> Content Channels. Edit the Content Channel and check the box for *Enable Personalization*.

![Enable Personalization on Content Channel](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/personalization-enable-on-content-channel-v18.png)

Enable Personalization on Content Channel

With personalization enabled, you can now start updating your Content Channel Items. Each item can be assigned one or more personalization segments and request filters. How these segments and filters are applied to the Content Channel Item is determined later, which we'll talk about in a minute.

The Content Channel Item configuration is accessed under Tools \> Content or by drilling down from the Content Channel.

![Filters and Segments on Content Channel Items](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/personalization-in-content-channel-item-config-v18.png)

Filters and Segments on Content Channel Items

With the above pieces in place, you'll head over to your external website where the content is being shown. You'll want to update the settings for the *Content Channel View* block, as pictured below. This is where you decide how the segments and filters configured above should be applied to the Content Channel Items.

![Content Channel View Personalization Options](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/personalization-content-channel-view-options-v14.png)

Content Channel View Personalization Options

# Personalizing Content Using Lava

Using [Lava](https://community.rockrms.com/Lava) you can personalize content in many places, such as the *HTML Content* block. But you're not limited to blocks. Personalization can also be used in communications too, so feel free to personalize content within an email.

There are two ways to get personalization using Lava. The first is the [Personalize](https://community.rockrms.com/lava/commands/personalize-commands) command. This is the most straightforward option, because all you need to do is provide the segment key or request filter key, and the content will be shown if the person/action meets the configured conditions for that segment/filter. Don't forget, this command can be used in emails!

The second option is to use the [PersonalizationItems](https://community.rockrms.com/lava/filters/person-filters#personalizationitems) Lava filter. You can use this to apply logic such that content only shows if the person is in a particular segment or request filter.

See the [Lava](https://community.rockrms.com/Lava) documentation using the links above for examples and details related to these items.

# Update Personalization Data Job

The *Update Personalization Data* job keeps the people returned by your personalization segment up to date and accurate. The job adds or removes people from the list based on whether they currently meet the conditions of the segment.

If you ever need to check the current list of who meets the conditions of a segment, just click the button on the *Personalization Segments* page located at Admin Tools \> CMS Configuration \> Personalization Segments. The *Update Personalization Data* job updates this list.

![View Segment Members](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/personalization-view-segment-members-v18.png)

View Segment Members

If you're curious about what's happening behind the scenes, what this job is actually doing is updating the *PersonAliasPersonalization* table. This table is very basic and acts as a link between the person (*PersonAliasId*) and the segment. The *PersonalizationType* field on this table has a value of "0" for all rows, which represents personalization segments. The *PersonalizationEntityId* field is simply the Id of the segment the person has been matched to.

# Troubleshooting Personalization

You might encounter a scenario where personalization appears to be working differently from how you intended. In that case, the tips below should help you resolve any problem you're facing.

1. **Check the Person:** It's always a good first step to double check that the person actually meets the requirements of your segments and filters. For instance, segments looking for "males" or "females" would overlook people with an "unknown" gender, so you'd want to make sure the person actually has a gender recorded in Rock.
2. **Enable Personalization:** You can have everything set up perfectly, but it won't work if personalization hasn't been enabled for the site. This simple step is easy to overlook, so it's worth checking.
3. **Active Segments and Filters:** Be sure to check that the segments and filters you're working with are Active. Don't assume...you'd be surprised how often this ends up being the culprit. Note that you'll need to turn on the *Include Inactive* block filter setting to see inactive items.
4. **Persisted Data Views:** The data views used in your segments must be persisted. This ensures great performance, and means the data isn't in real time. So, if your segment isn't working as expected, it could be that the underlying data view needs to be refreshed.
5. **Update Personalization Data Job:** As noted in the section above, this job keeps the lists of people returned by your personalization segments up to date and accurate. You may need to run this job to get the latest data, especially if you recently updated or refreshed data views used by your segments.
6. **Content Channel Items:** Keep in mind that content channel items without any segments or filters will always display regardless of the Personalization Option chosen in the *Content Channel View* block settings. Also, double check the filters you're using to ensure the content channel item isn't being filtered out for other reasons (e.g., due to a Start date in the future). Lastly, ensure you're not viewing a cached version of the content.
7. **Browser Session/Cookies:** As a last resort, logging out, closing all browser windows, then logging back in can resolve some issues. Clearing your browser's cookies will have the same effect. But this should really only be needed if you're testing by logging in and out as different people.

# Segment Cookie

There is a cookie that gets placed on the person's browser called `ROCK_SEGMENT_FILTERS`. This stores the segments that the person meets. By default, this data is refreshed every five minutes, so it will not change in real time. You can change this refresh interval by adjusting the *Personalization Segment Cookie Affinity Duration* setting under Admin Tools \> System Settings \> System Configuration.

# Adaptive Messages

Being able to personalize content is great but what if you want to vary a particular personalized message slightly, based on nuances within the data or a period of time? *Adaptive Messages* take content personalization to the next level, allowing you to tailor messages based on differences in an individual’s data, view counts, and date ranges. Building on the foundation of *Personalization Segments*, *Adaptive Messages* introduces features you may not have considered possible.

Suppose you want to communicate about the topic of “giving” but adapt the message for different audiences:

![Scheduled Recurring Gift](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/Scheduled-Recurring-Gift-v17.png)

Active Giver with a Scheduled Recurring Gift

![No Scheduled Recurring Gift](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/Without-Scheduled-Recurring-Gifts-v17.png)

Active Giver without a Scheduled Recurring Gift

![Non-Active](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/Non-Active-Giver-v17.png)

Non-Active Giver

![Default](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/Real-Default-Message-v17.png)

New or Default Audience

Using multiple Lava *Personalize* commands to handle these segments can get tricky, especially when a person overlaps into more than one segment. For example:

{% personalize segment:IsActiveGiverWithScheduledGive %} … {% endpersonalize %}
{% personalize segment:IsActiveGiverWithNoScheduledGift %}…{% endpersonalize %}
{% personalize segment:NotAnActiveGiver %} … {% endpersonalize %}
{% personalize segment:IsNoneOfTheAbove %} … {% endpersonalize %}

Not only can overlapping segments cause issues, but managing these messages over time can also become cumbersome.

## Adaptive Messages to the Rescue

With Adaptive Messages, you can handle these scenarios elegantly and efficiently using a single Lava command:

{% adaptivemessage messagekey:'personalized-giving' adaptationspermessage:'1' %}
  <h2\>{{ messageAdaptation | Attribute:'CallToAction' }}</h2\>
  <p\>{{ messageAdaptation | Attribute:'Details' }}</p\>
  <div class="well"\> Continue giving or start today: {{ messageAdaptation | Attribute:'CallToActionLink' }}</div\>
{% endadaptivemessage %}

This single Lava command delivers multiple benefits:

1. **Reusability:** A single Lava snippet can be used across your website.
2. **Centralized Management:** All content is managed within the *Adaptive Messages* feature.
3. **Flexibility:** New adaptations can be added without requiring changes to your Lava snippets.
4. **Time-Based Messaging:** Adaptations can include start and end dates, allowing you to schedule messages in advance.
5. **Message Saturation Control:** *Adaptive Messages* can track how often a message is shown and stop displaying it once the optional saturation limit is reached.

For more information, see the [Adaptive Messages Lava documentation](https://community.rockrms.com/lava/commands/adaptivemessage-commands).

## Setup

Let’s look at how to set this up for the example described above. We’ll assume you’ve already created Personalization Segments for the first three groups of people mentioned above. No need to create a segment for the default group. Simply include a fallback message directly in the Adaptive Message configuration.

Let’s navigate to Admin Tools \> Adaptive Message and set up a message called **Personalized Giving**:

![Adaptive messages Personalized Giving Overview](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/Adaptive-messages-Personalized-Giving-Overview-v18.png)

Adaptive messages "Personalized Giving" Overview

Now let’s add those specific adaptations for the first three segments.

![Active Giver with Scheduled Gift](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/Message-Adaptation-Details-New-v18.png)

Message Adaptation Detail

*Saturation* ensures that a viewer isn’t repeatedly shown the same message. You can define the maximum number of views and the timeframe (in days) before a message is considered "saturated."

This feature works with the adaptivemessage Lava command. When trackviews is enabled, an adaptation will stop being displayed to a viewer once it reaches its saturation point, based on the combination of the View Saturation Count and View Saturation Date Range.

In the example above, we will do the same for the *Active Giver Without a Scheduled Recurring Gift* and the *Non-Active Giver*

![Personalized Giving Adaptive Messages](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/Personalized-Giving-Messages-v18.png)

Personalized Giving Adaptive Messages

Arrange the order of adaptations to prioritize which message to show if someone belongs to multiple segments.

By using *Adaptive Messages*, you ensure a personalized, organized, and scalable communication strategy that engages your audience meaningfully while saving time and effort.


---

## Looking Deeper at Layouts {#looking-deeper-at-layouts}

> **Path:** Designing and Building Websites Using Rock > Looking Deeper at Layouts

Looking Deeper at Layouts

As we discussed earlier, layouts are what give pages their structure. They define zones that tell where blocks can live on a page. While layouts are assigned to a page they are defined by the theme. We've standardized the name of layouts so when you change the theme of a site, the page knows what layout to use in the new theme. These standard layouts are shown below.

![Standard Layouts](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/layouts-zones.png)

Standard Layouts

By following this pattern, you can update the entire look of your site simply by changing the theme for your site.

We know what you're thinking though (because we thought the same way too). You're thinking that there's no way you could possibly limit yourself to these predefined layouts. We think, though, once you understand the level of attention that went into them, you will find that they meet a vast majority of your needs. That said, breaking free of these standard layouts is certainly possible. You can create your own new layout types with their own zone names. You will be giving up the ability to quickly and easily change the look of your site. We'd strongly recommend coloring within the lines until you fully understand the architecture and understand what you’re giving up by breaking free.


---

## Standing On the Shoulders of Giants {#standing-on-the-shoulders-of-giants}

> **Path:** Designing and Building Websites Using Rock > Standing On the Shoulders of Giants

Standing On the Shoulders of Giants

Rock leverages several web design frameworks to help provide industry best practices. Knowing about these frameworks will help you get a jump start on customizing Rock's user experience for your visitors.

# Bootstrap

Bootstrap is a front-end framework that brings consistent styling to Rock. We are currently using Bootstrap version 3.4.1. Whether you're tweaking content on a page or writing a custom template, you’ll want to get familiar with the standard HTML/CSS mark-up that Bootstrap provides. Reading through their excellent [documentation](http://getbootstrap.com/) in its entirety is a great way to get started.

# Interested in a Template?

If you're interested in creating a new Rock theme based on an existing template, make sure it uses Bootstrap 3.4. This will save you a lot of time.

# Font Awesome

Rock uses icons in several areas of the application. These fonts all come from the [Font Awesome library](https://fontawesome.com/icons?d=gallery). Since these icons are all font-based vectors, they can be colorized and resized very easily. To see a listing of all the icons in the collection visit [http://fontawesome.com](http://fontawesome.com/).

# jQuery

jQuery is a JavaScript framework that's used by a majority of Internet sites. If you’re only interested in making minor changes it’s likely you'll never need to work with jQuery, but if you plan to make custom themes or blocks, you'll want to get familiar with it. Rock currently uses version 3.5.1. You’re welcome to use a newer version in your theme but be sure that your version is backwards compatible to 3.5.1 to ensure Rock's core jQuery plugins work correctly. You can find out more about jQuery at [jquery.com](http://jquery.com/).

# Less

If you're familiar with Cascading Style Sheets (CSS), you've probably experienced the frustration of repeating selectors and duplicate color definitions. Less blends a programming language and CSS. It offers concepts like reusable variables and object-oriented mix-ins. If you're worried about learning another new technology, don't be. Less is super simple. Soon you'll be able to brag to your friends about your knowledge of Less! You can read up on what's available in Less at [http://lesscss.org/](http://lesscss.org/).

# A Hint About Less Files

You'll notice that some Less files are prepended with an underscore (e.g., \_print.less). That underscore helps to identify Less files that are not directly compiled into related .css files but are instead used as imports to other Less files. For instance, the \_print.less file is never compiled into a \_print.css file. Instead, its contents are imported (appended) to the theme.less file which is compiled into theme.css.

# Liquid

Liquid is a templating engine written by Shopify. We've extended and customized Liquid in Rock to form our own templating engine called Lava (get it... liquid rock...). You've already been briefly exposed to the power of Lava in the introduction of this manual. Lava is used in several places in Rock, so it's worth your time to learn it well. Below are just a few of the places it's used:

- **HTML Editor:** Used for dynamically mixing in personal merge fields with your content.
- **Menus:** Navigation menus and page lists use Lava to assemble the HTML that is used to display them on the page.
- **Email Content:** Emails and SMS communications use Lava to personalize their content.

Learning Lava will make you feel like a superhero. Definitely take the time to master it. We've provided some [great resources for you to learn Lava on our website](https://community.rockrms.com/Lava).

# Lava Shortcodes

Shortcodes are a way to make Lava simpler and easier to read. They allow you to replace a simple Lava tag with a complex template written by a Lava specialist. This means you can do some really powerful things without having to know all the details of how things work.

For example, instead of writing out Lava code to display a Google map with custom pins and styles, you can insert a Lava shortcode where you want the map to be displayed, and let Rock do the work for you. Rock will replace the shortcode with the full Lava code, which will then be displayed as a customized map when rendered by the browser. Shortcodes put the power of Lava in your hands without you needing to be a coding expert.

To learn how to create and use Lava shortcodes, check out [The Long & Short on Shortcodes](https://community.rockrms.com/developer/book/33/121/content).


---

## Less is More {#less-is-more}

> **Path:** Designing and Building Websites Using Rock > Less is More

Less is More

The chapter title, while cheesy, is very true! Less is a technology that brings scripting capabilities to CSS. This allows you to do things like create variables and reusable styling nuggets (for a complete overview of what is possible see the Less website at [lesscss.org](http://lesscss.org).) The power of Less has always come at the price of having to manually compile your Less files to CSS, that is until Rock came to town. In fact, Rock has several different tools to help you keep your Less files compiled. Let's crack open the toolbox and see what we can do.

# Methods to Compile

## Compiling on Start

By default, Rock will compile all of the master .less files found in the theme folders. A master file is one that does not start with an underscore. Each of these masters will be compiled to ensure that the latest compiled CSS is available after each update and Rock Shop install.

# Performance Is Unaffected

If you care about performance as much as we do, you might be concerned about slowing down the startup time. We've taken that into consideration. To reduce startup time, the Less compile is performed on a separate thread.

## Compiling from the Site Detail Page

You can compile the Less files for a specific site at any time from the Site detail page found under Admin Tools \> Websites \> Site Details. From this page you will notice the *Compile Theme* link on the right side. Clicking this link will compile the site's Less files.

## Using the Theme Styler

A theme's Less files can also be compiled by the built-in Theme Styler found under Admin Tools \> CMS Configuration \> Themes. From this page you will see a grid that lists each theme. Next to each theme is a compile button. For more information on this page see the Theme Styler section below.


---

## Themes {#themes}

> **Path:** Designing and Building Websites Using Rock > Themes

As we’ve already seen, the Theme Styler provides an easy way to compile our themes. That's just scratching the surface of what's possible. Let's now go a bit deeper into all of the power of Rock's theme tools.

# Theme List

You can view a list of installed themes under Admin Tools \> CMS Configuration \> Themes.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/theme-list-v18.png)

Theme List

# Theme Styler

Selecting a theme from the list will take you to the Theme Styler. Below is the theme styler for the Check-in Adventure Kids theme.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/theme-styler-v18.png)

Theme Styler

# Not All Themes Support Variables

It is up to the theme developer to add support for modifying variables. You may encounter some themes that do not support changing the styling.


---

## Tabler Icons {#tabler-icons}

> **Path:** Designing and Building Websites Using Rock > Tabler Icons

Tabler Icons

Use *Tabler Icons* to add clear visual cues across Rock RMS. You can add icons to pages, blocks, badges, groups and websites. No installation is needed in Rock. Just use the CSS class in your HTML or *Icon CSS Class* settings.


<i class\="ti ti-settings"\></i\>

### What is Tabler

*Tabler* is a free, open-source SVG icon set. Each icon sits on a 24×24 grid with a 2 px stroke. You can change its size and color with CSS. You can also use it as a webfont with CSS classes.

# Learn More

See the full gallery and documentation at [tabler.io/icons](https://tabler.io/icons)

### Pick an icon with the icon CSS picker

Insert the icons without guessing the class. Use the picker.

![Icon Picker](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/icon-css-class.png)

Icon Picker

It lists all available *Tabler* classes, and you can still add custom icons. Select *Custom* to use any icon you’d like. The picker isn't available everywhere, though you can type the custom Icon CSS Class (e.g., ti ti-class) anywhere you need an icon.

# Note

If you need help navigating from Font Awesome to Tabler, read this [article](https://community.rockrms.com/connect/goodbye-font-awesome-hello-tabler).


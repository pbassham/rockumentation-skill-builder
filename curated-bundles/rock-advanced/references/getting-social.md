---
description: Use when optimizing Rock website pages for social media sharing with meta tags and page descriptions
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Getting Social

Getting Social

Read any blog on web design and you'll find plenty of posts on the importance of search engine optimization. While it's certainly true that your site must be search engine friendly, it also needs to be social media friendly. Below are some tips on how to ensure your Rock pages play nicely with the most popular networks.

# One Thing You Must Do

If you can only do one thing, we highly recommend adding a description to each page you believe will be shared on social media. This is quick and easy to do by accessing the Page Settings from the Admin Toolbar at the bottom of each page.

Without a page description, the social shares will try to figure out a description for your page by stripping the first chunk of text from your page that looks to be the main content. But why make the social networks guess when you can give them the exact description you'd like?

# Getting Deeper

Setting the Page Description is nice, but that's just the start. Each social network allows you to describe how your page should be shared using meta tags in the page's header. Unfortunately, there is little consistency in how this is done. Below we show you how to optimize each page's social network share information using Lava. Simply put these tags in any HTML block on the page and your site will be *socially beautiful*.

# Adding Make Up For Facebook

Let's start with Facebook. The three main attributes you want to set for an attractive Facebook share are the title, description, and an image. Below we show you the Lava for each. Again, these Lava statements can be on any HTML block on your page.

- **Title** `{{ 'Title for Page Here' | AddMetaTagToHead:'property','og:title' }}`
- **Description** `{{ 'Description for Page Here' | AddMetaTagToHead:'property','og:description' }}`
- **Image** `{{ 'URL to image here' | AddMetaTagToHead:'property','og:image' }}`  
	***Note:** You'll need to upload the image to the website and link to it for the URL. Your image should be sized to: 1200px x 630px.*

After setting these values, your share should look something like the example below.

![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/facebook-share.png)

Don't simply trust that it'll look right though. Use the [Facebook Share Validator](https://developers.facebook.com/tools/debug/sharing/) to see your formatted share along with tons of debugging information.

# Terrific Tweets

Just like Facebook, Twitter has several custom page attributes for you to use to make great looking shares. In fact, Twitter allows you to control even more settings. Let's take a look at the basic settings and we'll move on from there.

- **Title** `{{ 'Title for Page Here' | AddMetaTagToHead:'property','twitter:title' }}`
- **Description** `{{ 'Description for Page Here' | AddMetaTagToHead:'property','twitter:description' }}`
- **Image** `{{ 'URL to image here' | AddMetaTagToHead:'property','twitter:image' }}`  
	***Note:** You'll need to upload the image to the website and link to it for the URL. Your image should be sized to: 440px x 220px (well that's one recommended size at least, read on...)*

Very similar to Facebook, no? But wait... there's more... Twitter allows you to define two different formats of shares which they call summary cards. One card has a large image and the other a smaller.

**Large Image**  
![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/twitter-share-large.png)  
`{{ 'summary_large_image' | AddMetaTagToHead:'property','twitter:card' }}`

**Small Image**  
![](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/twitter-share-small.png)  
`{{ 'summary' | AddMetaTagToHead:'property','twitter:card' }}`

Twitter also has a [helpful validator](https://cards-dev.twitter.com/validator) to help visualize what your share will look like. You can also read more about what's possible by [reading their documentation](https://dev.twitter.com/cards/types/summary).

# Calendar Events

Of all the content on your site calendar, events are probably one of the most shared types of content. To assist you in making this easy we've added the social attributes Lava above in the Lava templates for calendar events. We've also added two new event attributes on the public calendar to help you upload specifically formatted images for both Facebook and Twitter. If you've created a custom theme before Rock v6, you'll want to copy and paste this Lava code into yours.


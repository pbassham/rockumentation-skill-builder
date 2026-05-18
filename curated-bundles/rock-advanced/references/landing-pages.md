---
description: "Use when user wants to create a focused single-topic page for events, registrations, or calls-to-action in Rock"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Landing Pages

Landing Pages

Now that you have the tools in your belt for adding content to pages, let's look at a special type of page that you can use for specific purposes: Landing Pages.

# What Are Landing Pages and Why Should I Use Them?

Landing pages are designed to drive people to a single focus, usually for a specific event or resource. For instance, you might set up a landing page with information about your Christmas services, to register for a conference, or to join a small group.

It's different from your external website's homepage because your homepage has a lot of information about your church in general, with links to more specific areas the visitor might be interested in. A Landing Page is designed to be self-contained, with very few links off of the page, and usually gives all of the information someone might need about the topic on a single page.

This is important because it helps you make sure that you're providing your visitors with exactly the information they're looking for, without making them search through your entire site for it. It's a better experience for them, and helps your message reach the people who are looking for it - talk about a win-win!

If your goal is to get your visitors to take a specific action, such as joining a group or filling out a form (referred to as a "Call To Action"), you'll be able to add those items to these pages as well so that they can take action as soon as they have the information they need.

# A Sample Landing Page

Enough talk! Let's take a look at the sample Landing Page that comes with Rock, and you can start to see what you can do with these types of pages.

![Sample Landing Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/sample-landing-page.png)

Sample Landing Page

# Getting Started with Landing Pages

Hopefully your imagination is already running with all of the ways you will be able to use these simple and beautiful pages! The best part is all of the complex styling to get the text in the correct positions over the images is already done for you. All of the content on this sample page can be added using the HTML block WYSIWYG editor - no knowledge of HTML needed.

So, let's get started! Your Rock installation already has a Landing Page site with the *LandingPage* theme installed. Your landing pages will usually be a page on this site, rather than being an entire Rock site of their own. You can find this page from your internal site by clicking on Admin Tools \> CMS Configuration \> Pages and choosing "Landing Pages Home Page" in the menu on the left.

Now click the copy button shown below, and de-select "Include Child Pages".

![Copy Landing Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/landing-page-copy-v18.png)

Copy Landing Page

Once the page is created, click Edit and you can fill in a little bit of information about the new landing page.

![Edit Landing Page](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/new-landing-page-v18.png)

Edit Landing Page

Once you've updated all of the information for the new page, click Save. When the page reloads, you'll see a link (e.g., /page/123) to your new Landing Page. Click that link and you'll be taken to your new landing page, with the logo and graphics already in place, and content copied from the initial demo page, ready for you to edit as you wish.

Wasn't that easy? Now you can use the "Zones" button on the Admin Toolbar and start adding blocks and content to your page

# More Information on Landing Page Layout Options

As we mentioned above, Landing Pages have a few more layouts than other site templates. Here are some thumbnails of the layouts available to you along with the available zones, so you can decide which layout to use for your new page.

Notice that some pages are designed not to scroll (those called "Simple") and will adjust to the height of the browser they're loaded on whenever possible. Most of the "Full" layouts have hero image sections based on the height of the browser (which is labeled "Viewport Height" on these thumbnails). You don't have to have content in all of the zones shown; they're simply available to you to make sure you can easily add any blocks to the page where you want them to lay out. Any of the layouts with two image placeholders will use both the Header Image and the Secondary Image you specify in the Page Attributes.

![Landing Page Layouts](https://rockrms.blob.core.windows.net/documentation/Books/14/1.17.0/images/landing-page-layouts.png)

Landing Page Layouts


---

## Strategies for Managing Your Site {#strategies-for-managing-your-site}

> **Path:** Designing and Building Websites Using Rock > Strategies for Managing Your Site

Strategies for Managing Your Site

As you're working through your content strategy for your site it's important to think about how you will maintain each page. There are several tools you can use to reduce the burden of keeping your site up-to-date.

# Let Dynamic Content Do the Work

The dynamic content tools discussed above can save you a lot of time by giving you an easy workflow for adding content to pages. Think of these tools as structured bits of content that can be scheduled to display on your site. On each page think about how dynamic content could be used to keep the content fresh.

# Remove the Bottleneck through Delegation

It sounds scary but allowing your ministry leaders to edit their content on the website can be safe. The secret is in the configuration. Below are some tips to make this a success.

- Give the ministry leaders access to small pieces of content, not the whole page.
- Use the HTML editor's pre/post text to ensure that the wrapping markup cannot be changed. Say for instance you give the ministry access to edit a Bootstrap alert box on the page. Be sure that the markup for the alert is in the pre/post text so the user cannot remove or edit it.
- Enable the HTML editor's approval system. This will allow you to review the changes before they are published to the site.
- Use security wisely. Don't give a single user access to edit a specific content block. Instead, consider creating reusable security roles (e.g., *Website Editors – Childrens*). This will allow you to add similar user permissions in the future.


---

## Routes {#routes}

> **Path:** Designing and Building Websites Using Rock > Routes

As we've discussed, webpages in Rock don't exist as files on the server's file system. Instead, they are dynamically created as they are requested from the database to be individually tailored to the permissions of the current user. In the past this meant some really ugly URLs with numerous query parameters. For instance, some similar systems may have used an address like this:

`http://www.mysite.com/index.php?page=152&groupId=12`

Not only are these addresses unattractive, they are also not very friendly for search engines visiting your site (aka SEO friendly). Rock uses the concept of *Routes* to help beautify its addresses. The default route for a page will look something like:

`http://www.rocksolidchurchdemo.com/page/123`

But you can do better. Let's say page 123 in the example above was actually a promotional page for an upcoming car show. You could add a new route on the page property dialog ( on the page's admin bar then look under *Advanced Settings*) with the value of *carshow*. This would enable the link `http://www.rocksolidchurchdemo.com/carshow` to also work for this page.

# Multiple Routes

In fact, you could create several routes for the same page. This is especially helpful in tracking the success of each of your marketing pieces. If the mailers, mass email and invite cards each have a different address, you can measure which is more successful at getting people to your site.

# Avoid Multiple Page Routes for Indexed Pages

Having multiple routes present for a page that you wish to be indexed by search engines can be significantly damaging to that page's ranking. This is because the search engine is unable to detect that each individual route is pointing to the same page, and instead interprets them as duplicate pages, with identical content. The result is that a page with multiple routes will essentially be competing with itself, diluting its page ranking in the process.

# Advanced Routes

So far, we've looked at how to create simple routes. Pages that contain dynamic content might have one or more required query parameters to be able to display. Consider a page that displays calendar events. Its default route might be *http://www.rocksolidchurchdemo.com/page/234?EventId=12*. Creating a route with the value of *Event/{EventId}* would add the ability to load the page with the address of *http://www.rocksolidchurchdemo.com/Event/12*. This new address is not only visually more appealing but is also SEO friendly.

You can add as many query parameters to your route as you like. For instance, the route of *Event/{EventId}/{TabId}* would enable the address of *http://www.rocksolidchurchdemo.com/page/234?EventId=12&TabId=3* to be represented as *http://www.rocksolidchurchdemo.com/Event/12/3*.

If you would like to manage all routes defined in Rock, you can see them listed under Admin Tools \> CMS Configuration \> Routes. From here you can edit or delete any route in the system.

# Global Routes

From the *Routes* page you can designate certain routes to be *Global*. Global routes ignore a site's *Enable Exclusive Routes* setting.

# Routing Order

Rock uses the following order to choose what page is displayed for a provided URL. In cases where there is no matching route on a given site the oldest matching route from any site is used.

1. Page ID *(/page/12)*
2. Matching page route and matching site
3. Matching Shortlink and matching site
4. Oldest matching page route from other site
5. Oldest matching shortlink from other site
6. Page not found (404)

# Site Scoped Routes

Keep in mind that routes are scoped to the site. That means you can use the same route more than once as long as each instance is on a different site.


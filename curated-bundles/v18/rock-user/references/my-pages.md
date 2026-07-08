---
description: "Use when a user needs to customize their personal Rock dashboard, manage settings, bookmark pages, or access their personalized views and assignments"
source: "https://community.rockrms.com/documentation/bookcontent/5/360"
sourceLabel: "Person & Family Field Guide"
---
> **Path:** Person & Family Field Guide > My Pages

My Pages

*My*... *mine*... some of our first words as a child. In Rock, though, the *My Pages* aren't a selfish grab for more, but rather a place where you can retreat to experience a personalized view of Rock. These pages are found under the login status on the internal site.

![My Settings](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/mysettings-nav-v18.png)

Finding My Settings

# My Settings

Every person has a *My Settings* page on the internal site. This is a place where each person can manage their Rock settings. Pictured below is a listing of the settings available. Note that many plugins install new pages here, so your options may appear differently.

![My Settings](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/mysettings-screen-v18.png)

My Settings

For details on the settings pictured above, see the [Rock Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#mysettings).

# My Dashboard

*My Dashboard* is a central location for you to review all your assignments and open requests, as well as followed groups, items and suggestions.

![My Dashboard](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/my-dashboard-v18.png)

My Dashboard

# My Profile

This is simply a quick link to go directly to your *Person Profile* page.

# Personal Links and Quick Returns

Rock’s Personal Links feature makes navigating to your frequently used pages quick and easy. Just click the bookmark icon next to the search bar at the top of any page in Rock to instantly access your *Personal Links* and *Quick Returns*. This feature also allows administrators to create shared groups of links for individuals in the organization.

![Bookmark List](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/bookmark-list-v18.png)

Bookmark List

*Personal Links* are pages that you’ve bookmarked inside Rock. The links are divided up into sections that you can name and reorder to your liking.

The *Quick Returns* are pages that automatically get bookmarked for you. For instance, viewing a group or a person’s profile will add it to your list so you can get back to it easily. Items get automatically added to your Quick Returns from the following pages:

- Person Profile
- Data View Detail
- Report Detail
- Group Detail
- Financial Batch
- Workflow Detail
- Dynamic Data block (if enabled in the block's settings)

# Dynamic Data Block

If you have pages with multiple dynamic data blocks on the same page, you might end up with multiple quick links you wouldn't expect if they all have *Enable Quick Return* enabled. In these cases, it's best to have only one dynamic data block on the page with *Enable Quick Return* enabled.

*Quick Returns* will keep up to 20 items from your browsing history. This could be 10 people and 10 groups, or five each of people, data views, reports and groups, or any other combination that adds up to 20. When you navigate to a new page the oldest item in the list is removed, so you'll always see a list of your 20 most recent activities.

Administrators can add new types of pages to *Quick Returns* using the *AddQuickReturn* Lava filter.

Also, keep in mind that *Quick Returns* are stored in your browser. If you switch browsers, they will not follow you.

You can add any page in Rock to your *Personal Links*. When you’re on a page you want to bookmark, simply open your *Personal Links* and click the button, then select *Add Link*. The URL of the page you’re on will automatically get copied to the screen, including any query string parameters. Feel free to modify this if you'd like.

You can also organize your links into sections. Think of sections as folders for your links. Adding a section is just like adding a link. Just click the button and select *Add Section* to add a new section.

Your links and sections are managed using the *Personal Links* page. To access this page, you can click the icon within the *Personal Links* window and select *Manage Links*, or you can navigate to the page by going to the *My Settings* page and clicking *Personal Links*.

![Personal Links Page](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/personal-links-page-v18.png)

Personal Links Page

Using the page pictured above you can add new sections, arrange the order of your sections or view the links within a section by clicking one of the rows.

![Personal Links Section Detail](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/personal-links-section-detail-v18.png)

Personal Links Section Detail

From here you can manage all of your links within a section. You can rearrange their order, add new links or modify existing links. You can also Edit the section to change its name.

## Shared Links

Administrators have access to similar pages for managing *Shared Links*. These are links which are shared with others in the organization and will appear in people’s bookmark list. Shared sections will have a icon next to them, to distinguish them from sections you’ve created for your own use.

Shared links can be managed by navigating to Admin Tools \> Settings \> CMS \> Shared Links. Shared sections and links work the same way as personal sections and links, with the same options available for managing them or adding new ones.

![Shared Links](https://rockrms.blob.core.windows.net/documentation/Books/5/1.18.0/images/shared-links-page-v18.png)

Shared Links

Using security, administrators can manage who can see each section. This allows you to personalize who can see the links based on roles within your organization. Keep in mind that this works at the section level, not for individual links.


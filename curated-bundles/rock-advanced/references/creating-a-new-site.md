---
description: "Use when configuring and managing Rock website sites, including activation status, site attributes, page attributes, and setting up new sites in the CMS"
source: "https://community.rockrms.com/documentation/bookcontent/14/370"
sourceLabel: Designing and Building Websites Using Rock
---
> **Path:** Designing and Building Websites Using Rock > Creating A New Site

Creating A New Site

Creating a new site in Rock is simple. But it helps to do things in the proper order. Following the steps below will lead to a well-configured site every time.

1. First, navigate to the site list page Admin Tools \> Websites
2. Click the (add) button at the bottom of the grid of sites.
3. Fill in the site configuration outlined below:
![Add Site](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-site-1-v18.png)

Add Site

# Active - Inactive

You can mark web sites inactive. This is handy if you have older websites that you still want to keep around but are not actively being used. Marking them inactive removes them from the site list. There is a filter to allow them to be displayed if needed. An inactive website will still function, it just won't be displayed on the list of sites.

![Add Site 2](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-site-2-v18.png)

Add Site 2

![Add Site 3](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/add-site-3-v18.png)

Add Site 3

8. Once you've provided the above information and clicked Save, your site is ready for the next step, which is to start creating pages. The best way to get to your new default page is to use the *Page Map* under Admin Tools \> CMS Configuration \> Pages. From here you can click on your default page.

# Site Attributes

Attributes can be added to any entity in Rock, including Sites. If you've added any site Attributes, you'll be able to see and provide values for them from the Site Detail block. See the [Entity Attributes](https://community.rockrms.com/documentation/bookcontent/9#entityattributes) chapter of the [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9/) for more details.

# Page Attributes

The Page Attributes section of the Add Site screen is an advanced setting that gives you a ton of control over your layout of your site. The attributes you create here will apply across all of the pages of your site, but each page will have its own attribute value. For example, you create an image attribute for a page, then dynamically access that attribute in your header, as shown in the following sample code:

##### Set Banner Image



                <script runat\="server"\>
                    protected void Page\_Load( object sender, EventArgs e )
                    {
                    var page = ( RockPage ) this.Page;

                    var bannerImage = page.GetAttributeValue( "BannerImage" );
                    headerMainText.InnerHtml = bannerImage;
                    }
                </script\>

                <header id\="headerMain" runat\="server"\>
                </header\>


---

## Cookies {#cookies}

> **Path:** Designing and Building Websites Using Rock > Cookies

Rock is designed to use cookies (the electronic kind, not chocolate chip) to store and transmit information. Cookies are packets of data carrying identification information, such as logins and passwords, which are sent from ISPs to browsers and back to track server access. This is why sometimes when you browse to a website, it already knows who you are. That site has stored a cookie containing your identification information. Typically, cookies are created when you click a "remember me on this computer" option when logging into a site. Some cookies are site-specific, meaning they only apply to a certain website address. Other cookies are global, meaning they apply to all sites at a specified domain.

By default, Rock doesn't share login info across domains, but you can override this setting to allow your sites to use global cookies. This can come in handy when you have both an internal and external site, and you want your members to be able to move easily between them without having to log in twice. It also may be useful to admins when they need to impersonate another person. (For more information about impersonation, see the [Impersonating Another Person](https://community.rockrms.com/documentation/bookcontent/9#impersonatinganotherperson) section of the Rock Admin Hero Guide.) Global cookies are configured in the Domain Login Sharing screen, located at Admin Tools \> General Settings \> Defined Types.

![Domain Login Sharing](https://rockrms.blob.core.windows.net/documentation/Books/14/1.18.0/images/domain-login-sharing-v18.png)

Domain Login Sharing

Enter the common domain in the Value field to allow login access for all sites with that domain name. For example, entering a value of "rocksolidchurchdemo.com" would allow a person to log in at http://www.rocksolidchurchdemo.com and be logged into http://admin.rocksolidchurchdemo.com simultaneously.

One thing to be aware of when using global cookies is it can lead to instances where both a global and a site-specific cookie are in use. When this happens, a person may be required to log out twice in order to clear out both cookies.

# Authentication Cookie Persistence Length

The authentication cookie length is set in Admin Tools \> System Settings \> System Configuration and is in minutes. By default, the timeout will occur after 43,200 minutes, or 30 days. See the [Admin Hero Guide](https://community.rockrms.com/documentation/bookcontent/9#systemconfiguration) for more information.


---

## SEO {#seo}

> **Path:** Designing and Building Websites Using Rock > SEO

Many people ask about Rock's SEO features. While we've worked hard to ensure many of the SEO best-practices, the requirements in this area change on a daily basis (just being honest). If there's something you think is missing, or you'd like more information on let us know.

Below are the topics people ask us most about:

- **Google Analytics** The analytics token is set on the site. Rock then applies it to each page on that site for you.
- **Friendly URLs** These are the routes mentioned in the [Routes](#routes) chapter above. They are configured on the Page Properties modal (the gear in the admin toolbar at the bottom of each page) on the ‘Advanced Settings’ tab.
- **Page Description** This is also set on the Page Properties screen.
- **Keywords** This and all other meta tags can be set using the Header Content field on the page properties. Basically, whatever you add to this field will be placed into the HTML HEAD tag. We didn’t add a special field for keywords because [search engines stopped supporting them a while back](http://stackoverflow.com/questions/7124329/seo-meta-tags-html).


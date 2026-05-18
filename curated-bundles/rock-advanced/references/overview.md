---
description: "Use when building dynamic web pages with HTMX, creating Lava Applications and endpoints, or using Lava Commands for data modification in Rock's Helix framework"
source: "https://community.rockrms.com/developer/helix"
sourceLabel: Helix
---
> **Path:** 

Helix is the codename for an upcoming project that represents the next evolution of Lava for web development, integrating four distinct technologies.

- [HTMX](https://community.rockrms.com/developer/helix/overview#htmx)
- [Lava Applications](https://community.rockrms.com/developer/helix/overview#lava-applications)
- [Lava Commands](https://community.rockrms.com/developer/helix/overview#lava-commands)
- [Control Shortcodes](https://community.rockrms.com/developer/helix/overview#control-shortcodes)

Important

Before diving into the exciting aspects, it's important to be aware that developing applications entails increased responsibility for security and data integrity. While we've made significant efforts to address these concerns, additional responsibilities accompany the use of Helix.

## HTMX

Ever felt limited by Lava's single opportunity to construct a page at load time? Imagine the flexibility of refreshing parts of the page without a full reload. That's precisely what HTMX offers. Here's a brief overview of the HTMX library.

![](https://www.youtube.com/watch?v=r-GSGH2RxJs)

Helix seamlessly incorporates HTMX into Rock. Just drop a Helix content block onto your page, and you're all set. From there, you can use HTML snippets like the one below, which effortlessly interact with the endpoint, updating the target element—such as a div with the 'group-list' CSS class—with the endpoint's contents.

```
<a class="btn btn-primary" hx-get="^/group-toolbox/my-groups" hx-target=".group-list">

<ul class="group-list"></ul>
```

## Lava Applications

You might be intrigued by HTMX and wondering where to obtain the necessary endpoints. While Lava Webhooks or custom APIs are options, they have drawbacks that might not make them ideal for HTMX. That's where Lava Applications come in.

Lava Applications offer a comprehensive framework for crafting Lava endpoints that generate HTML snippets for HTMX use. Begin by defining an application for your project, which simply requires a name, description, optional configurations, and a slug (as seen in the 'group-toolbox' example above).

The next step involves setting up endpoints within your application, which is where the core development takes place. These endpoints specify the Lava template to be executed upon a Helix request, are identified by slugs (like 'my-groups'), and are associated with an HTTP method (e.g., GET, POST) to dictate their execution context. Additionally, endpoints include security features to control access.

![](https://community.rockrms.com/GetImage.ashx?Id=66737)

## Lava Commands

Once you familiarize yourself with HTMX, you'll likely recognize its vast potential. Soon enough, you'll be imagining all sorts of features you could create. A common hurdle, however, is Lava's complexity in updating data—until Helix came along. Helix introduces new Lava commands designed for data modification. For example, consider the Entity Command that enables data updates. Key commands include:

- **Modify Command**: The core of Helix's new offerings, enabling you to alter or add to entity data. [Read More](https://community.rockrms.com/developer/helix/lava-commands/modify-entity)
- **DB Transaction**: Facilitates updates across multiple entities with transaction support, allowing for rollbacks if necessary. [Read More](https://community.rockrms.com/developer/helix/lava-commands/db-transaction)
- **HTTP Response**: Leverages HTMX's capability for server-side logic execution with straightforward HTTP response construction. [Read More](https://community.rockrms.com/developer/helix/lava-commands/http-response)

## Control Shortcodes

Armed with HTMX and the latest Lava commands, you might feel quite empowered. However, to achieve forms that seamlessly blend with Rock's native aesthetic, you'll need to delve into custom logic and markup, possibly even picking up some JavaScript. To ease this process, we've developed a series of Lava Shortcodes designed to streamline form creation.

So instead of this:

```
<div class="form-group campus-picker {% if isrequired %}required{% endif %}">
    <label class="control-label" for="{{ id }}">Primary Campus</label>
    <div class="control-wrapper">
        <select name="{{ name }}" id="{{ id }}" class="form-control">
            {% assign campuses = 'All' | FromCache:'Campus'  %}
            {% for campus in sc-campuses %}
                <option value="{{ campus.Id }}">{{ campus.Name }}</option>
	    {% endfor %}
	</select>
    </div>

    {% if isrequired %}
        <span id="rfv-{{ id }}" class="validation-error help-inline" style="display:none;">{{ validationmessage }}</span>
    {% endif %}
</div>
```

You can simply to this:

```
{[ campuspicker label:'Primary Campus' value:'1,2' types:'768' statuses:'765' selectablecampuses:'1' ]}
```

---

## 🧬 Helix {#helix}

Redefine the boundaries of what you believed possible with Lava.

**ti ti-wand Dynamic Content without the Need for JavaScript** Infuse your web pages with live content updates using Lava, bypassing the complexity of JavaScript. [HTMX](https://community.rockrms.com/developer/helix/htmx)

**ti ti-database Elevate Lava Beyond Reading to Updating Data** Transform Lava into a powerful tool that not only reads but also updates data seamlessly within your applications. [Lava Commands](https://community.rockrms.com/developer/helix/lava-commands)

**ti ti-edit Simplified Forms with Shortcodes** Streamline the creation of sophisticated forms using our toolkit's simple shortcodes, enhancing functionality with minimal effort. [Control Shortcodes](https://community.rockrms.com/developer/helix/overview#control-shortcodes)

Important

Helix is currently in an early alpha phase. Be prepared for changes, some of which may disrupt your initial projects. Think of this as cutting-edge technology (there may be some blood).

Note

Report Issues Please report issues through the Helix GitHub repository. Avoid using this repo for training or Q&A purposes. For general support or questions, Rocket Chat is a more suitable platform.

---

## Customizing Rock {#customizing-rock}

There are several levels of customization available for your Rock instance, described below in basic categories. While it might seem desirable to aim for the highest level, it's often better to aim lower. Each new level, while offering more power and capabilities, also introduces greater complexity and increased support costs. We advise staying as low on the pyramid as possible.

![](https://community.rockrms.com/GetImage.ashx?Id=66738)

Lava Applications provide enhanced capabilities without necessitating a move to the highest level of customization.

## A Step Too Far

As with many aspects of life, it's possible to take customization too far. Lava Applications are no exception. When developing with them, it's crucial to know when to start and when to stop. Often, opting for a custom solution developed specifically for you is the best course of action. Here are a few warning signs that you may be overextending with Lava Applications:

- You're considering adding custom models to your application (don't).
- Your application requires 50+ endpoints.
- The development of your application feels overly complex and fragile.

---

## Plugin Installation {#plugin-installation}

**Helix Is Currently in Limited Beta**

With great power comes a great amount of testing. Helix is currently being tested by a few select organizations. Keep checking back for the latest details. 

Helix operates seamlessly with the aid of two complimentary plugins, both freely available. Simply navigate to the Rock Shop to install the following:

1. Helix Plugin - This is the main plugin that contains all of the logic described on this site.
2. Magnus Plugin - Magnus is required to install and utilize Helix. Otherwise, the plugin will fail to load. Be sure to read through the

---

## FAQ {#faq}

Here you'll find a comprehensive list of frequently asked questions about the Helix project, accompanied by detailed answers.

**Why is Helix not a part of core?**

~~Helix is a R&D project by Triumph Tech. Only Spark Development Network can decide to put code into core.~~

It is now in core!

**Is Helix available in Rock Mobile?**

We like the way you think! Helix would be very powerful if it was a part of Rock Mobile. Since Rock Mobile however is a closed framework at this point we're not able to add support as a plugin. With community adoption and support perhaps that could change if Helix was ever added to core.

---

## Roadmap {#roadmap}

We're just getting started with Helix. There a lot of plans and thoughts in the future. Below is just the beginning of what we're considering.

Note

These are just ideas. Some may not see the light of day.

1. More recipes and how-tos.
2. Additional form controls.
3. Simplify advanced concepts like annimation and drag-drop.
4. Provide a toast framework.
5. Potential use-cases for Rock's Real-time Engine.
6. Support for [idiomorph](https://github.com/bigskysoftware/idiomorph/blob/main/test/demo/rickroll-idiomorph.gif) .
7. Support for [Hyperscript](https://hyperscript.org/) and/or [Alpine.js](https://alpinejs.dev/) .
8. [Client-side templates](https://v1.htmx.org/extensions/client-side-templates/) powered by the new Rock v2 Search API

---

## Security {#security}

We can't stress enough the importance of considering security when using Helix tools.

## Points to Consider

Here are some key points to keep in mind when building Helix applications.

Warning

Application security covers a wide range of topics. While it's impossible to document every safeguard, this list provides an overview of the major considerations you should keep in mind.

1. Remember that your endpoints might be accessed externally, not just through your frontend. Savvy users could intercept these calls and replicate them using tools like curl or Postman, modifying parameters. Ensure your endpoints are well-secured and that you rigorously validate all input data.
2. When passing entity identifiers in the query string, consider using IdKeys or GUIDs. This approach makes it much harder for someone to guess an identifier.
3. Do not rely solely on obfuscating entity identifiers for security. Always verify that individuals have the appropriate rights to view or edit the data you are presenting.
4. Don't use the GET method when you are modifing data. GET's are less secure than other methods as they can be easily initiated from cross-site links.
5. If you're using SQL in your endpoints be sure that all data coming from the querystring or body is sanitized for SQL injection.

---

## HTMX {#htmx}

# HTMX

---

## Learning More {#learning-more}

Want to go deeper on HTMX? The [HTMX website](https://www.htmx.org/) provides a much deeper understanding of what's passible. There's also two ebooks you can check-out.

## Examples

The best way to understand is to see it in action. Triumph has created a small gallery of simple examples for you to see the power and jumpstart you on your way to implementing HTMX yourself. If you know of any other HTMX galleries for Helix, [please let us know](mailto:info@sparkdevnetwork.org?subject=Helix%20HTMX%20Gallery)!

[Triumph Helix Gallery](https://gallery.triumph.tech/helix)

The creators of HTMX also have their own examples page that provides other examples of what's possible with their framework. While these examples are not specific to Rock that should be easily transferable.

[HTMX Examples Page](https://v1.htmx.org/examples/)

## E-Books

### Server-Driven Web Apps with htmx

This e-book is a great supplement for the HTMX website. It provides a deeper understanding of HTMX. Be careful though as the server-side discussion is not accurate to using Lava Applications.

[Purchase](https://pragprog.com/titles/mvhtmx/server-driven-web-apps-with-htmx/)

![](https://community.rockrms.com/GetImage.ashx?Id=66741)

#### Hypermedia Systems

This book also digs in deeper into how HTMX works and provides an understanding of the history and theory of hypermedia. You can read the e-book for free on-line or purchase a hardcopy version.

[Ebook Site](https://hypermedia.systems/)

![](https://community.rockrms.com/GetImage.ashx?Id=66742)

---

## Syntax Style Guides {#syntax-style-guides}

They say if you're going to do something, do it with style—and we believe that applies to coding as well. HTMX's strength lies in its preference for attributes over coding, though this can be a bit overwhelming at first. To enhance readability, we recommend adopting the following syntax style.

```
<a class="btn btn-primary btn-xs"
    hx-post="^/cato/link-client?ClientGuid={{ client.Guid }}&OrganizationGuid={{ organization.Guid }}"
    hx-target="closest .unlinked-client"
    hx-swap="outerHTML swap:1s"
    hx-swap="outerHTML">{{ organization.Name }}</a>
```

Note the following:

1. Put one attribute per line.
2. The first attribute should be for CSS style classes.

---

## Lava Applications {#lava-applications}

HTMX empowers you to build responsive and dynamic applications by creating server-side endpoints that return HTML snippets. Managing multiple endpoints is common, even in basic applications. To simplify this, we introduced Lava Applications, which consist of two key components: the Application and its Endpoints.

Below is a diagram of a very basic Lava Application:

![](https://community.rockrms.com/GetImage.ashx?Id=66744)

The example showcases an application with five distinct endpoints and a simple configuration setup, including a name, description, and slug. You can customize security and additional settings for your application. The main logic is housed in the endpoints, activated by routes formed from the application and endpoint slugs, for instance, `/group-toolbox/my-groups`. It's important to note that while several endpoints might use the same route, such as `/group-toolbox/member`, the uniqueness of a route is also determined by the HTTP method.

---

## Applications {#applications}

Configuring a Lava Application is quite straightforward. Below is a screenshot of the editing panel.

![](https://community.rockrms.com/GetImage.ashx?Id=66745)

Below are the properties that are required:

- **Name** \- A friendly name for you to keep your applications organized.
- **Description** - To serve as a place for some documentation about your application.
- **Slug** \- Helps to tell HTMX what application to use (in the example above the application slug is 'group-toolbox').
- **Configuration** \- The configuration rigging is an optional way for you to define variables for your application at a global level. You should provide JSON here that will be converted to a dynamic object for use in both your backend endpoint as well as your frontend Content blocks. This configuration rigging for an application is not meant to be a dynamic structure. If you need that we recommend that you use a Persisted Dataset. The properties of the configuration object can be read as `{{ ConfigurationRigging.[PropertyKey] }}`.

## Application Security

Like most entities in Rock, you should secure your applications. However, applications have a few additional security configuration options.

### Security Verbs

Most entities in Rock come with the standard security verbs: View, Edit, and Administrate, which control access to editing the entity. Lava Applications include these verbs as well, adding layers of control over the application’s modifications.

Additionally, Lava Applications feature three unique security verbs:

- Execute View
- Execute Edit
- Execute Administrate

These verbs allow you to set permissions that are verified when the endpoints are executed, giving you the flexibility to define what View, Edit, and Administrate mean within your application. For more details on how these verbs are used, refer to the Lava Endpoint documentation.

## Enhances Security Login

By default, Rock grants View access to all entities. However, for Lava Applications, we've overridden this behavior to require you to configure the security settings according to your specific needs.

To prevent you from being locked out of your newly created applications, we've implemented a few new patterns for Lava Applications.

1. We've added a new role called *RSR - Lava Application Developers*
2. When you add a new Lava Application, members of both the *RSR - Lava Application Developers* and *RSR - Rock Administration* are given View, Edit and Administrate permissions.
3. No matter what permissions you provide for your application, members of these two roles will have full View, Edit and Administrate access.

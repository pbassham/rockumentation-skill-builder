---
description: "Use when building or troubleshooting Lava Applications in Rock Mobile, including rendering XAML screens, configuring Helix endpoints, and managing application-level settings"
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

C20.0M20.0

Displays content from a Lava Application and hosts its Helix interactions.

## What it does

1. Renders a XAML screen built by a Lava template on the server, with the selected application's `LavaApplication` and `ConfigurationRigging` merge fields available.
2. Or, instead of a template, loads its first screen from a Helix endpoint when the block loads.
3. Lets every Helix request inside it use the short `^/endpoint-slug` route form, resolved against the selected application.
4. Shows a loading indicator until its first content arrives.

## Settings

| Setting | What it does |
| --- | --- |
| Application | The Lava Application this block belongs to. Helix requests inside the block can then use the short `^/endpoint-slug` route form, and Initial Template gets the `LavaApplication` and `ConfigurationRigging` merge fields. Optional, but recommended. |
| Initial Template | The Lava template rendered on the server to produce the block's first XAML. Rendered each time the block loads, with the common merge fields (such as `CurrentPerson` and `PageParameter`), `CurrentPage`, and the application's merge fields when an Application is set. |
| Initial Endpoint | A Helix route, such as `^/endpoint-slug`, that the app fetches with a GET when the block loads. When set, it is used instead of Initial Template. |
| Enabled Lava Commands | The Lava commands available while rendering Initial Template. Endpoints use their own Enabled Lava Commands setting, not this one. |

## Using it with Helix

Helix attributes work in any block, including a plain Content block. What this block adds is a home for an application: a known application to resolve routes against, a server-rendered first screen with the application's merge fields, and a first load that can itself be a Helix request. See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting) for the attributes themselves.

### The ambient application

When Application is set, any Helix route inside the block can name just the endpoint. The app fills in the application's slug:

```
<!-- Inside a Lava Application Content block whose Application is Group Toolbox. -->
<Button Text="Join" Hx.Post="^/join" Hx.Target="JoinStatus" />

<!-- The same request, written in the long form that works anywhere. -->
<Button Text="Join" Hx.Post="^/group-toolbox/join" Hx.Target="JoinStatus" />
```
- The short form resolves against the **nearest** enclosing Lava Application Content block that has an Application set.
- It also applies to routes the endpoint sends back, such as an `X-Helix-Next` page route for a list inside the block. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging).
- Outside such a block, or when Application is empty, a short route fails with a message telling you to use the long form, and no request is sent.
- The long form `^/application-slug/endpoint-slug` always works, inside this block or not, and can call endpoints in a different application from the one selected.

### Choosing the first screen

The block's first screen comes from one of the two. Initial Endpoint wins when both are set.

|  | Initial Template | Initial Endpoint |
| --- | --- | --- |
| Where the Lava lives | In the block setting | In the endpoint's Code Template |
| Rendered by | The block, through its own block action | The endpoint, through a Helix GET request |
| Merge fields | Common merge fields, `CurrentPage`, `LavaApplication`, `ConfigurationRigging` | The endpoint's merge fields: `QueryString`, `Headers`, `ClientType`, `ConfigurationRigging`, and the rest |
| Page parameters | Available as `PageParameter` | Not passed. The route is sent exactly as typed. |
| Response headers | Not applicable | Honored, the same as any Helix response |

**Use Initial Template when the screen depends on the page.** It can read `PageParameter` and write those values into the routes of the controls it renders, which is how a detail screen passes its id on to its endpoints.

**Use Initial Endpoint to keep a screen's Lava in one place.** The first screen comes from the same application as the requests that follow, so it is edited and secured alongside them, and one endpoint can serve both the web and the app by branching on `ClientType`. The route is a plain setting: Lava in it is not resolved, and nothing from the page is added to it.

When the first screen needs both, use Initial Template for a light frame and let an element inside it load the rest:

```
<ContentView Hx.Get="^/member-detail?id={{ PageParameter.GroupMemberId | EscapeDataString }}"
             Hx.Trigger="load" />
```

### The initial load

With Initial Endpoint set, the block itself is the request's initiator and its target, so the response is swapped into the block in place of the loading indicator. It behaves like any other Helix response from there:

- A 2xx body is the block's XAML.
- A non-2xx response, or a network failure, shows an error notification in the block.
- `HX-Redirect`, `HX-Refresh`, and `X-Helix-Command` are honored. See [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/endpoint-responses).

Initial Template content arrives through the block's own block action instead, the same way a Content block's dynamic content does, and a failure there also shows as an error notification in the block.

## Notes

1. Requires Rock Mobile 20.0 or later.
2. With neither Initial Template nor Initial Endpoint set, the block shows *Invalid configuration data.*
3. Initial Template does not get the endpoint merge fields, such as `QueryString`, `Headers`, or `ClientType`. It runs as a block action, not as an endpoint.
4. The Application list shows every Lava Application, active or not. Requests to an inactive application fail with a *Could not find Lava Application* error.
5. Initial Endpoint must point at an endpoint whose HTTP method is GET.
6. Commands sent with `X-Helix-Command` run against the block, so `PopPage`, `ShowToast`, and the other standard commands work from any endpoint the block calls.
7. For ways to structure a Lava Application across screens, see [Tips and Tricks](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/tips-and-tricks).

---

## Check-in {#blocks-check-in}

This section refers to the 'CMS' mobile block group.

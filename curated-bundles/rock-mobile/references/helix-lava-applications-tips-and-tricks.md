---
description: Use when optimizing Rock mobile app screen performance and reducing network round trips during initial page load
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

The reference pages answer "what does this attribute do." This one answers "how do I make the screen feel right," which is mostly a question of how many round trips the person waits through and what moves on screen while they wait.

## Inline the first screen

A `load` trigger is the obvious way to fill a region when the screen opens, and it is the wrong default for anything you already know at page-render time.

Here is a group toolbox whose top card is "your next meeting," written the obvious way:

```
<!-- In the block's Initial Template. -->
<VerticalStackLayout Spacing="12">
    <ContentView Hx.Get="^/next-meeting" Hx.Trigger="load" Hx.Target="this" Hx.Swap="outer" />

    <Label Text="Roster" StyleClass="title2" />
    ...
</VerticalStackLayout>
```

What the person actually sees: the app fetches the page, the screen paints with an empty gap where the card belongs, a second request goes out, and a moment later the card lands and shoves the roster down. On a cold cellular connection both the gap and the shove are obvious.

Rock's server-side `{% renderlavaendpoint %}` Lava command runs the endpoint in-process *while the page is rendering* and writes its output into your template, the way a shortcode would. No request leaves the device, because the work is already done by the time the page is sent:

```
{% comment %} In the block's Initial Template. {% endcomment %}
<VerticalStackLayout Spacing="12">
    {% renderlavaendpoint route:'^/group-toolbox/next-meeting' %}

    <Label Text="Roster" StyleClass="title2" />
    ...
</VerticalStackLayout>
```

Note

`renderlavaendpoint` needs the full `app-slug/endpoint-slug` route. The short `^/endpoint-slug` form only works on an element, where the app resolves it against the enclosing Lava Application Content block. The command has no such context, and a route it cannot split in two renders nothing at all, with no error. That is why this example spells out `group-toolbox` and the `load` version above does not.

One request, the card is already in the XAML the app parses, and nothing moves after the screen paints. The endpoint stays reusable either way: the same route can still be fetched over Helix from elsewhere, or called from a web page's template, because inlining is just another caller.

### Request counts

One card costing one extra request is easy to shrug off. Real screens rarely have one card.

Say the toolbox grows the way real screens do: a next-meeting card, an unread count, a serving reminder, and a giving summary. On `load` triggers that is four more requests on top of the page fetch, and they do not arrive together. Each one lands whenever its endpoint happens to finish, so the person watches the screen rearrange itself four separate times as the slower regions drop in above the faster ones.

Inline those same four and the number of requests does not move at all:

| Regions filled this way | With a `load` trigger on each | Inlined |
| --- | --- | --- |
| 1 | 2 requests | 1 request |
| 4 | 5 requests | 1 request |
| 10 | 11 requests | 1 request |

The server renders all of them while it is already building the page, and they ship inside the one response the app was waiting for anyway. A tenth region costs that render a little more time on the server; it does not cost another trip across the network.

**That is the real argument for inlining.** A `load` trigger charges you once per region. Inlining charges you once for the whole screen, no matter how many regions are on it.

See the [Render Lava endpoint documentation](https://community.rockrms.com/page/3761) for the command's own reference: its `route` and `method` parameters, how the route resolves, and how it behaves when the endpoint is missing or the person cannot Execute it.

### When to use load

Inlining makes the page render wait for the endpoint. That is the whole trade, and it is a bad one when:

- **The content is slow and the rest of the screen is not.** This is the flip side of the table above. Inlined regions render one after another as the template is processed, so their times add up, and the person sees nothing at all until the slowest one has finished. A tile backed by an expensive query should not hold the whole page hostage; let the page paint and have that tile fill itself in.
- **The content has to change later.** Inlined output is fixed at page-render time, so refreshing it means re-rendering the page. An element that fetched its own content owns a request it can fire again.
- **The content depends on something only the device knows**, such as a value the person picked or the current state of a form.
- **The endpoint depends on a third party** whose latency you do not control. Inlining hands your page's paint time to someone else's uptime.

Inline what is fast and certain. Fetch what is slow or changeable.

### Mobile differences

**Inlined output is not a fragment.** It is written into your template as text before the app ever sees it, so the [one-root-element rule](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/writing-fragments) does not apply. It can emit siblings, as long as the surrounding XAML makes that valid. Anything it declares, `Hx.Id` values included, becomes an ordinary part of the page.

**No Helix request means no Helix headers.** The endpoint renders against the request already in flight for the page, so `X-Helix-Client`, `X-Helix-Shell-Version` and `X-Helix-Prompt` are absent. An endpoint that branches on those, or on `ClientType`, will not necessarily behave the same inlined as it does when fetched. Write endpoints you intend to inline so they do not care.

Note

If a block's entire content comes from one endpoint, you do not need a template at all. The [Lava Application Content block](https://community.rockrms.com/developer/mobile-docs/essentials/blocks/cms/lava-application-content)'s **Initial Endpoint** setting takes a route the app fetches when the block loads, and it is used instead of the Initial Template. The block skips its usual initial content request, so the endpoint is the only request, the same count as inlining. It also saves you maintaining a template whose only job is to call one endpoint.

## Refresh on return

The person taps into a detail screen, changes something, and comes back. The summary they return to was rendered before they left, and it is now wrong. `load` will not help, because it fires once per element and never again. There are two ways to fix it, and they are not the same size:

|  | What it does | Cost |
| --- | --- | --- |
| `Hx.Trigger="appear"` | Re-fetches that one element every time the page appears | One request for one region |
| `HX-Refresh: true` | Reloads the page, so every block on it re-renders | A full page rebuild |

Prefer `appear` and keep the refresh scoped to the part that actually goes stale. On a screen people bounce in and out of, add `throttle` so a quick there-and-back does not fire a second request. [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers) has examples of both.

When the content should stay current while the person is still looking at it, not just when they come back, `Hx.Trigger="every 30s"` is the tool, since it polls on that interval while the page is on screen.

Reach for `HX-Refresh` when a write invalidated more of the screen than you can reasonably point at, or when the change came from a cover sheet, which cannot target ids on the page it covers. See [Endpoint Responses](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/endpoint-responses).

---

## Security {#helix-lava-applications-security}

The endpoints your fragments call are the **same** Lava Application endpoints a browser calls, so the [Helix security guidance](https://community.rockrms.com/helix/overview/security) applies unchanged: Execute verbs are the real boundary, never modify data on a GET, never treat an IdKey or Guid as the authorization mechanism, and sanitize anything you interpolate into SQL. Read that page first.

This page is only the part that is different because the client is an app.

## Application edit access

**Granting Edit on an Application is a privileged grant.** This is the one to internalize before you open Application editing to a wider group.

On the web, a fragment is HTML rendered in a browser. On mobile, **a fragment is XAML, and XAML can invoke the app's commands.** So anyone who can edit a Lava Application can run app commands for anyone who opens the screen that hosts it.

That is the same trust model the Content block has always had, where server-supplied XAML is trusted. What Helix changes is *who* can author it: not just a block developer, but anyone with Edit on an Application.

The mitigations are the security defaults that already ship: deny-all View on Applications, and the `RSR - Lava Application Developers` role. Leave them in place, and treat adding someone to that role the way you would treat giving them a code deploy.

## Calls to other routes

A verb is not limited to `^` routes. Any absolute server path is sent as-is, carrying the signed-in person's credentials:

```
<ContentView Hx.Post="/api/v2/some-endpoint" Hx.Trigger="load" />
```

**This is not privilege escalation.** The request is still authorized as that person, and they cannot reach anything they could not already reach.

What it does mean is that a fragment can make an authenticated request **on their behalf without them tapping anything**, since a `load` trigger fires as soon as the screen renders. Reading data back out is awkward, because a JSON response fails to parse as XAML and lands as an error notification, but writes go through fine.

It is the same trust model as the section above: anyone with Edit on the Application can author it. Worth knowing explicitly when you decide who gets that grant.

## Client type hints

The app sends `X-Helix-Client: RockMobile`, and the server derives the `ClientType` merge field from it. The server also treats any request carrying `X-Rock-DeviceData` as Mobile, and the app sends that header on every request. Any caller can send either header with curl.

Branch **presentation** on it. Never gate **data access** on it.

```
{% comment %} Fine. Chooses markup. {% endcomment %}
{% if ClientType == 'Mobile' %}...{% endif %}

{% comment %} Not fine. This is not a security check. {% endcomment %}
{% if ClientType == 'Mobile' %}{% sql %}SELECT ...{% endsql %}{% endif %}
```

## Untrusted values

Automatic value inclusion collects values from controls by name, which makes it easy to forget that what arrives is just an HTTP request. A caller can send whatever `Form` and `QueryString` values they like, and the `IsRequired` and `ValidationExpression` rules you configured are a UX feature, not enforcement.

Validate on the server regardless of what the app "should" have sent.

---

## Limitations {#limitations}

Helix follows the web Helix subset that makes sense in MAUI, not the full HTMX spec. This page covers the pieces that are only partly there, and the behaviors most likely to surprise you, so you can plan around them instead of discovering them halfway through a build.

## Partial support

| Feature | The subset you get |
| --- | --- |
| `Hx.Params` | `none` only. You cannot include or exclude by name. |
| `Hx.Swap` animations | `fade`, the four `slide-*` directions and `scale`. The height-based `collapse` and `expand` are deferred: they warn and swap instantly. |
| `Hx.Trigger` | Named events, `load`, `appear`, and `every` polling with a five second minimum, plus the `once`, `changed`, `delay`, and `throttle` modifiers. `revealed` and `intersect` wire nothing, and other modifiers are ignored. |

## Rough edges

These are not missing features, they are behaviors that will surprise you. Each is covered in detail on its own page.

- **`Border` cannot be an `inner` target.** It is neither a `ContentView` nor a `Layout`. Target a layout inside it. See [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations).
- **A request with no `Hx.Target` swaps into the element that made it.** On a `Button` or another control that cannot hold content, a response body shows an error. Name a target. See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/requests-and-targeting).
- **A failed request that was going to `append` replaces the target's contents** with the error, because errors are placed with an `inner` swap. Declare an `Hx.Notification` slot on anything that appends. See [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors).
- **`changed` silently blocks every request on a control that has no value**, such as a `Label`, a layout, or a bare MAUI `Picker`. It only works on inputs. See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers).
- **`Unfocused` wires on anything but only fires on focusable controls.** See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers).
- **An unknown trigger event name silently becomes a tap.** See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers).
- **`appear` is not `revealed`.** `appear` fires when the *page* comes into view and is implemented; `revealed` is about the *element* scrolling into the viewport and is not. An element low on a long page fires its `appear` as soon as the page opens. See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/triggers).
- **An error placed next to a trigger can land in the wrong `Grid` cell**, overlapping the first cell rather than appearing below the trigger. Most likely on a Load More button using `outer` on `this`. An `Hx.Notification` slot avoids it. See [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors).
- **Id lookups are case-sensitive** while almost everything else is not. See [Attribute Reference](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/attribute-reference).
- **`after` does not give you infinite scroll on its own.** See [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations). For scroll paging in a list, `items-append` with an `X-Helix-Next` response header covers it. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging).

## Common patterns

These patterns come up often when building a screen. Each one is covered on the page that owns it:

- **Load More** without stranding the button: `outer` targeting `this`. See [Swaps and Animations](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/swaps-and-animations).
- **Scroll-paged lists**: `items-append` with an `X-Helix-Next` header. See [Data Lists and Paging](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/data-lists-and-paging).
- **Inline field validation**: `Hx.Target="this"` on a layout that wraps the `FieldContainer`, not on the input or the container itself. See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/forms-and-values).
- **An error slot** so a failed `append` does not wipe the list it was appending to. See [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/indicators-and-errors).
- **Declaring the target once** on a container and letting swapped-in fragments inherit it. See [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/helix-lava-applications/inheritance).

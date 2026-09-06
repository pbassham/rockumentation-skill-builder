---
description: Use when optimizing mobile app performance by reducing network requests and preventing screen layout shifts during page load
source: "https://community.rockrms.com/developer/mobile-docs"
sourceLabel: Mobile Docs
---
> **Path:** 

The reference pages answer "what does this attribute do." This one answers "how do I make the screen feel right," which is mostly a question of how many round trips the person waits through and what moves on screen while they wait.

## Paint the first screen in one request

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

One request, the card is already in the XAML the app parses, and nothing moves after the screen paints. The endpoint stays reusable either way: the same route can still be fetched over Helix from elsewhere, or called from a web page's template, because inlining is just another caller.

### Every region you add is another request

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

### When load is still right

Inlining makes the page render wait for the endpoint. That is the whole trade, and it is a bad one when:

- **The content is slow and the rest of the screen is not.** This is the flip side of the table above. Inlined regions render one after another as the template is processed, so their times add up, and the person sees nothing at all until the slowest one has finished. A tile backed by an expensive query should not hold the whole page hostage; let the page paint and have that tile fill itself in.
- **The content has to change later.** Inlined output is fixed at page-render time, so refreshing it means re-rendering the page. An element that fetched its own content owns a request it can fire again.
- **The content depends on something only the device knows**, such as a value the person picked or the current state of a form.
- **The endpoint depends on a third party** whose latency you do not control. Inlining hands your page's paint time to someone else's uptime.

Inline what is fast and certain. Fetch what is slow or changeable.

### Two things that differ on mobile

**Inlined output is not a fragment.** It is written into your template as text before the app ever sees it, so the [one-root-element rule](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/writing-fragments) does not apply. It can emit siblings, as long as the surrounding XAML makes that valid. Anything it declares, `Hx.Id` values included, becomes an ordinary part of the page.

**No Helix request means no Helix headers.** The endpoint renders against the request already in flight for the page, so `X-Helix-Client`, `X-Helix-Shell-Version` and `X-Helix-Prompt` are absent. An endpoint that branches on those, or on `ClientType`, will not necessarily behave the same inlined as it does when fetched. Write endpoints you intend to inline so they do not care.

Note

If a block's entire content comes from one endpoint, you do not need a template at all. The Lava Application Content block's **Initial Endpoint** setting takes a route the shell fetches when the block loads, and it is used instead of the Initial Template. It costs the same second request a `load` trigger would, and it saves you maintaining a template whose only job is to call one endpoint.

## Refresh on return without rebuilding the page

The person taps into a detail screen, changes something, and comes back. The summary they return to was rendered before they left, and it is now wrong.

`load` will not help: it fires once per element, ever, and does not fire again when the element re-attaches. There are two ways to fix it, and they are not the same size:

|  | What it does | Cost |
| --- | --- | --- |
| `Hx.Trigger="appear"` | Re-fetches that one element every time the page appears | One request for one region |
| `HX-Refresh: true` | Reloads the page, so every block on it re-renders | A full page rebuild |

Prefer `appear` and keep the refresh scoped to the part that actually goes stale:

```
<ContentView Hx.Get="^/group-toolbox/pending-count"
             Hx.Trigger="appear"
             Hx.Target="this"
             Hx.Swap="outer" />
```

On a screen people bounce in and out of, add `throttle` so a quick there-and-back does not fire a second request:

```
<ContentView Hx.Get="^/group-toolbox/dashboard" Hx.Trigger="appear throttle:30s" Hx.Target="this" Hx.Swap="outer" />
```

Reach for `HX-Refresh` when a write invalidated more of the screen than you can reasonably point at, or when the change came from a cover sheet, which cannot target ids on the page it covers.

Note

Because `appear` fires on the first appearance too, it is a superset of `load` rather than an alternative to it. You do not need both on the same element. See [Triggers](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/triggers).

## Patterns documented elsewhere

These come up just as often, but each belongs to one attribute and is covered where that attribute lives:

- **Load More** without stranding the button: `outer` targeting `this`. See [Requests and Targeting](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/requests-and-targeting).
- **Inline field validation**: `Hx.Target="this"` on the `FieldContainer`, not the input. See [Forms and Values](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/forms-and-values).
- **An error slot** so a failed `append` does not wipe the list it was appending to. See [Indicators and Errors](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/indicators-and-errors).
- **Declaring the target once** on a container and letting swapped-in fragments inherit it. See [Inheritance](https://community.rockrms.com/developer/mobile-docs/essentials/lava/lava-application/inheritance).
